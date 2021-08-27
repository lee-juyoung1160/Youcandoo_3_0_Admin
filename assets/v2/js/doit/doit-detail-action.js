
	import {
		actionCommentCount, actionDesc, actionCreated, actionDetailForm, actionLikeCount, actionListForm,
		actionsWrap, selActionDateType, chkActionStatus, modalBackdrop, modalWarning, searchActionDateFrom,
		searchActionDateTo, selActionMissions, pagination, selActionPageLength, totalActionCount,
		actionNickname, actionContentWrap, actionCommentWrap, commentAction, btnSendWarning, modalAttach,
		modalAttachContentWrap, selReason, warningReason,
	} from "../modules/elements.js";
	import {
		initSelectOption, overflowHidden, onErrorImage, paginate, fadeoutModal, limitInputLength, initDayBtn
	} from "../modules/common.js";
	import {api} from "../modules/api-url.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {g_doit_uuid, isSponsorDoit} from "./doit-detail-info.js";
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from "../modules/alert.js";
	import {isEmpty} from "../modules/utils.js";
	import {ajaxRequestWithJson, isSuccessResp, invalidResp} from "../modules/ajax-request.js";

	let _actionCurrentPage = 1;

	export function showActionListForm()
	{
		actionListForm.show();
		actionDetailForm.hide();
	}

	export function showDetailAction()
	{
		actionDetailForm.show();
		actionListForm.hide();
	}

	export function initSearchActionForm()
	{
		searchActionDateFrom.datepicker("setDate", "-6D");
		searchActionDateTo.datepicker("setDate", "today");
		chkActionStatus.eq(0).prop('checked', true);
		chkActionStatus.eq(1).prop('checked', true);
		chkActionStatus.eq(2).prop('checked', true);
		initSelectOption();
		initDayBtn();
	}

	export function onChangeSearchActionDateFrom()
	{
		searchActionDateTo.datepicker("option", "minDate", new Date(searchActionDateFrom.datepicker("getDate")));
		initDayBtn();
	}

	export function onChangeSearchActionDateTo()
	{
		searchActionDateFrom.datepicker("option", "maxDate", new Date(searchActionDateTo.datepicker("getDate")));
		initDayBtn();
	}

	export function onSubmitSearchActions()
	{
		_actionCurrentPage = 1;
		initDayBtn();
		getActionList();
	}

	export function getMissionListForAction()
	{
		const param = { "doit_uuid" : g_doit_uuid }

		ajaxRequestWithJson(false, api.missionList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					await buildSelActionMission(data);
					await onSubmitSearchActions();
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`미션 목록 ${message.ajaxLoadError}`));
	}

	function buildSelActionMission(data)
	{
		const missions = data.data;
		let options = '<option value="all">전체</option>';
		if (missions.length > 0)
			missions.map(obj => { options += `<option value="${obj.mission_uuid}">${obj.mission_title}</option>` });

		selActionMissions.html(options);
	}

	export function getActionList()
	{
		let actionStatus = [];
		chkActionStatus.each(function () {
			if ($(this).is(":checked"))
				actionStatus.push($(this).val())
		})
		const param = {
			"doit_uuid" : g_doit_uuid,
			"date_type" : selActionDateType.val(),
			"from_date" : searchActionDateFrom.val(),
			"to_date" : searchActionDateTo.val(),
			"mission_uuid" : selActionMissions.val(),
			"action_status" : actionStatus,
			"page" : _actionCurrentPage,
			"limit" : selActionPageLength.val()
		}

		ajaxRequestWithJson(true, api.actionList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getActionListCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.list + message.ajaxLoadError));
	}

	function getActionListCallback(data)
	{
		buildActions(data);
		buildPagination(data);
	}

	function buildActions(data)
	{
		let actionEl = '<div class="card"><p class="message">인증 정보가 없습니다.</p></div>';
		if (!isEmpty(data.data) && data.data.length > 0)
		{
			actionEl = '';

			data.data.map( (obj, index) => {
				const {idx, action_date, action_uuid, contents_type, contents_url, doit_title, nickname, report_count, thumbnail_url, is_yellow} = obj;
				const hasWarning = is_yellow === 'Y';
				const warningEl = hasWarning ? `<strong class="red-card"><img src="${label.redCardImage}" alt=""></strong>` : '';
				const disabled = hasWarning ? 'disabled' : '';

				let actionContentImage;
				if (contents_type === label.image)
					actionContentImage = contents_url;
				else if (contents_type === label.audio)
					actionContentImage = label.voiceImage
				else if (contents_type === label.video)
					actionContentImage = thumbnail_url;

				if (index===0 || index%6 === 0)
					actionEl += '<div class="row">';

				actionEl +=
					`<div class="col-2 auth-item">
						<div class="card">
							<div class="top clearfix">
								<div class="checkbox-wrap">
									<input id="action_${index}" type="checkbox" name="chk-action" data-uuid="${action_uuid}" ${disabled}>
									<label for="action_${index}"><span></span></label>
								</div>
								<div class="right-wrap">
									<span><i class="fas fa-exclamation-triangle"></i> ${report_count}</span>
								</div>
							</div>
							<div class="img-wrap action-content" data-idx="${idx}">
								<img src="${actionContentImage}" alt="">
							</div>
							<p class="title">${doit_title}</p>
							<span class="nick-name">${nickname}</span>
							<span class="date">${action_date}</span>
							${warningEl}
						</div>
					</div>`

				if (index>0 && (index+1)%6 === 0)
					actionEl += '</div>';
			})
		}

		actionsWrap.html(actionEl);

		onErrorImage();
		$(".action-content").on('click', function () { onClickAction(this); })
	}

	const g_action_comment_page_length = 10;
	let g_view_page_length = 10;
	let g_action_comment_last_idx = 0;
	let g_action_comment_page_num = 1;
	let g_action_comment_page_size = 1;
	let g_action_uuid;
	let g_action_idx;
	function onClickAction(obj)
	{
		g_action_idx = $(obj).data('idx');
		g_view_page_length = 10;
		initActionCommentPageNum();
		initActionCommentLastIdx();
		initActionCommentWrap();
		showDetailAction();
		getDetailAction(obj);
	}

	function getDetailAction()
	{
		const param = { "idx" : g_action_idx };

		ajaxRequestWithJson(true, api.detailAction, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					g_action_uuid = data.data.action_uuid;
					await buildDetailAction(data);
					await getActionComments();
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	function buildDetailAction(data)
	{
		const {action_date, action_description, comment_cnt, like_count, nickname, is_yellow, yellow_reason} = data.data;

		toggleTextBtnSendWarning(is_yellow);
		actionNickname.text(nickname);
		actionCreated.text(action_date);
		actionLikeCount.text(like_count);
		actionCommentCount.text(comment_cnt);
		actionContentWrap.html(buildActionContent(data.data));
		actionDesc.text(action_description);
		warningReason.text(isEmpty(yellow_reason) ? label.dash : yellow_reason);

		$(".view-detail-action").on('click', function () { onClickAttachAction(this); });

		onErrorImage();
	}

	function getActionComments(_pageLength)
	{
		const param = {
			"action_uuid" : g_action_uuid,
			"size" : isEmpty(_pageLength) ? g_action_comment_page_length : g_view_page_length,
			"last_idx" : g_action_comment_last_idx
		};

		ajaxRequestWithJson(false, api.actionCommentList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildActionComments(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`댓글 목록${message.ajaxLoadError}`));
	}

	function buildActionComments(data)
	{
		if ($('#btnViewMore').length > 0) $('#btnViewMore').remove();

		if (!isEmpty(data.data) && data.data.length > 0)
		{
			g_action_comment_page_size = Math.ceil(Number(data.count)/g_action_comment_page_length);

			data.data.map((obj, index, arr) => {
				const {idx, comment_uuid, created, nickname, is_company, profile_uuid, comment_body, is_blind, comment_cnt, recomment_data } = obj;
				const parent_comment_uuid = comment_uuid;
				if (arr.length - 1 === index)
					g_action_comment_last_idx = idx;

				const btnBlindComment = is_blind === 'Y'
					? `<button type="button" class="btn-xs btn-orange btn-display-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}">
                         <i class="fas fa-eye"></i> 블라인드 해제
                       </button>`
					: `<button type="button" class="btn-xs btn-warning btn-blind-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}">
                         <i class="fas fa-eye-slash"></i> 블라인드 처리
                       </button>`;
				const btnDeleteCommentEl = `<button type="button" class="btn-xs btn-danger btn-delete-action-comment" data-uuid="${comment_uuid}">삭제</button>`;
				const commentEl =
					`<div class="card">
						<div class="top clearfix">
							<p class="title">
								${is_company === 'Y' ? label.bizIcon + nickname : nickname} <span class="desc-sub">${created}</span>
							</p>
							<div class="right-wrap">
								${is_company === 'Y' ? btnDeleteCommentEl : btnBlindComment}
							</div>
						</div>
						<div class="detail-data">
							${comment_body}
						</div>
						<div class="bottom">
							<span><i class="fas fa-comments"></i>  <a class="link">${comment_cnt}</a></span>
							${(isSponsorDoit) ? buildCreateReplyActionComment({parent_comment_uuid, profile_uuid, nickname, is_company}) : ''}
						</div>
			
						<div class="comments-wrap">
							<ul>
								${(recomment_data.length> 0) ? buildReplyActionComment({recomment_data, comment_cnt}) : ''}
							</ul>
						</div>
					</div>`

				actionCommentWrap.append(commentEl);
			})

			buildCommentPagination();
		}
		else
		{
			actionCommentWrap.html(`<div class="card"><p class="message">작성된 댓글이 없습니다.</p></div>`);
		}

		$('.length-input').on("propertychange change keyup paste input", function () { limitInputLength(this); });
		$('.btn-reply-action').on('click', function () { onClickModalReplyActionOpen(this); });
		$('.btn-action-reply-close').on('click', function () { onClickModalReplyActionClose(); });
		$('#btnViewMore').on('click', function () { onClickViewMore(); });
		$('.btn-submit-reply-action').on('click', function () { onSubmitActionReply(this); });
		$('.btn-delete-action-comment').on('click', function () { onSubmitDeleteActionComment(this); });
		$('.btn-blind-action-comment').on('click', function () { onClickBtnBlindActionComment(this); });
		$('.btn-display-action-comment').on('click', function () { onClickBtnBlindActionComment(this); });
		$('.btn-viewmore-action-reply').on('click', function () { onClickBtnViewMoreReplyAction(this); });
	}

	function buildCommentPagination()
	{
		let btnViewMoreEl = ''
		if ($('#btnViewMore').length === 0 && g_action_comment_page_num !== g_action_comment_page_size)
			btnViewMoreEl =
				`<button id="btnViewMore" type="button" class="btn-more">더보기(${g_action_comment_page_num}/${g_action_comment_page_size}) 
					<i class="fas fa-sort-down"></i>
				</button>`;

		actionCommentWrap.append(btnViewMoreEl);
	}

	function onClickViewMore()
	{
		g_action_comment_page_num++
		g_view_page_length += 10;
		getActionComments();
	}

	function buildReplyActionComment({recomment_data, comment_cnt})
	{
		let repliesEl = ''
		recomment_data.slice(0).reverse().map((obj, index, arr) => {
			const {comment_uuid, is_blind, is_company, parent_comment_uuid, created, nickname, profile_uuid, comment_body} = obj;
			const btnBlindReply = is_blind === 'Y'
				? `<button type="button" class="btn-xs btn-orange btn-display-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
				: `<button type="button" class="btn-xs btn-warning btn-blind-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
			const btnDeleteReply = `<button type="button" class="btn-xs btn-danger btn-delete-action-comment" data-uuid="${comment_uuid}">삭제</button>`;
			const lastIdx = recomment_data[arr.length - 1].idx;

			if (comment_cnt > 5 && index ===0)
				repliesEl +=
					`<button type="button"
							 class="btn-more btn-viewmore-action-reply"
							 data-parent="${parent_comment_uuid}"
							 data-last="${lastIdx}"
							 data-size="${comment_cnt}">이전 답글 더보기 <i class="fas fa-sort-down"></i></button>`;

			repliesEl +=
				`<li>
					<div class="top clearfix">
						<p class="title">
							ㄴ ${is_company === 'Y' ? label.bizIcon + nickname : nickname} 
							<span class="desc-sub">${created}</span>
						</p>
						<div class="right-wrap">
							${is_company === 'Y' ? btnDeleteReply : btnBlindReply}
						</div>
					</div>
					<div class="detail-data">
						${comment_body}
					</div>
					<div class="add-comments">
						${isSponsorDoit ? buildCreateReplyActionComment({parent_comment_uuid, profile_uuid, nickname, is_company}) : ''}
					</div>
				</li>`
		})

		return repliesEl;
	}

	let appendReplyActionCommentTarget;
	function onClickBtnViewMoreReplyAction(obj)
	{
		appendReplyActionCommentTarget = $(obj);

		const param = {
			"parent_comment_uuid" : $(obj).data('parent'),
			"last_idx" : $(obj).data('last'),
			"size" : $(obj).data('size')
		}

		ajaxRequestWithJson(true, api.actionReplyList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? appendReplyActionComment(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`답글 목록${message.ajaxLoadError}`));
	}

	function appendReplyActionComment(data)
	{
		let appendReplyEl = ''
		data.data.slice(0).reverse().map(obj => {
			const {comment_uuid, is_blind, is_company, created, nickname, comment_body} = obj;
			const btnBlindReply = is_blind === 'Y'
				? `<button type="button" class="btn-xs btn-orange btn-display-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
				: `<button type="button" class="btn-xs btn-warning btn-blind-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
			const btnDeleteReply = `<button type="button" class="btn-xs btn-danger btn-delete-action-comment" data-uuid="${comment_uuid}">삭제</button>`;

			appendReplyEl +=
				`<li>
					<div class="top clearfix">
						<p class="title">
							ㄴ ${is_company === 'Y' ? label.bizIcon + nickname : nickname} 
							<span class="desc-sub">${created}</span>
						</p>
						<div class="right-wrap">
							${is_company === 'Y' ? btnDeleteReply : btnBlindReply}
						</div>
					</div>
					<div class="detail-data">
						${comment_body}
					</div>
				</li>`
		})

		appendReplyActionCommentTarget.after(appendReplyEl);
		appendReplyActionCommentTarget.remove();
		$('.btn-delete-action-comment').on('click', function () { onSubmitDeleteActionComment(this); });
		$('.btn-display-action-comment').on('click', function () { onClickBtnBlindActionComment(this); });
		$('.btn-blind-action-comment').on('click', function () { onClickBtnBlindActionComment(this); });
	}

	function buildCreateReplyActionComment({parent_comment_uuid, profile_uuid, nickname, is_company})
	{
		return (
			`<a class="link btn-reply-action">답글달기</a>
				<!-- 답글달기 -->
				<div class="modal-content comments-creat">
					<div class="modal-header clearfix">
						<h5>답글달기</h5>
						<i class="modal-close btn-action-reply-close">×</i>
					</div>
					<div class="modal-body">
						<table class="detail-table reply-action-table">
							<colgroup>
								<col style="width: 20%;">
								<col style="width: 70%;">
							</colgroup>
							<tr>
								<td colspan="2">
									<div class="textarea-wrap">
										<textarea class="length-input reply-action" maxlength="200" rows="4" placeholder="답글을 입력해주세요."></textarea>
										<p class="length-count-wrap"><span class="count-input">0</span>/200</p>
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<div class="right-wrap">
										<button type="button" 
												class="btn-sm btn-primary btn-submit-reply-action"
												data-parent="${parent_comment_uuid}"
												data-profile="${profile_uuid}"
												data-company="${is_company}"
												data-nickname="${nickname}">등록</button>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>`
		)
	}

	let g_action_reply_parent_uuid;
	let g_action_reply_target_profile_uuid;
	let g_action_reply_target_nickname;
	let g_action_reply_value;
	let g_action_reply_company;
	function onSubmitActionReply(obj)
	{
		const replyEl = $(obj).parents('.reply-action-table');
		g_action_reply_parent_uuid = $(obj).data('parent');
		g_action_reply_target_profile_uuid = $(obj).data('profile');
		g_action_reply_target_nickname = $(obj).data('nickname');
		g_action_reply_company = $(obj).data('company');
		g_action_reply_value = $(replyEl).find('.reply-action').val();

		if (replyActionValid())
			sweetConfirm(message.create, createActionReplyRequest);
	}

	function replyActionValid()
	{
		if (isEmpty(g_action_reply_value))
		{
			sweetToast(`답글은 ${message.required}`);
			return false;
		}

		return true;
	}

	function createActionReplyRequest()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"action_uuid" : g_action_uuid,
			"comment" : g_action_reply_company === 'Y' ? g_action_reply_value.trim() : `@${g_action_reply_target_nickname} ${g_action_reply_value.trim()}`,
			"mention" : [{ "profile_uuid": g_action_reply_target_profile_uuid, "nickname": g_action_reply_target_nickname}],
			"parent_comment_uuid" : g_action_reply_parent_uuid,
		}

		ajaxRequestWithJson(true, api.createActionComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createActionReplySuccess);
			})
			.catch(reject => sweetError(`답글 등록${message.ajaxError}`));
	}

	function createActionReplySuccess()
	{
		onClickModalReplyActionClose();
		initActionCommentLastIdx();
		initActionCommentWrap();
		getActionComments(g_view_page_length);
		increaseActionCommentCountWithoutRequest();
	}

	let g_delete_action_comment_uuid;
	function onSubmitDeleteActionComment(obj)
	{
		g_delete_action_comment_uuid = $(obj).data('uuid');
		sweetConfirm(message.delete, actionCommentDeleteRequest);
	}

	function actionCommentDeleteRequest()
	{
		const param = { "comment_uuid" : g_delete_action_comment_uuid }

		ajaxRequestWithJson(true, api.deleteActionComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, deleteActionCommentSuccess);
			})
			.catch(reject => sweetError(`댓글 삭제${message.ajaxError}`));
	}

	function deleteActionCommentSuccess()
	{
		initActionCommentLastIdx();
		initActionCommentWrap();
		getActionComments(g_view_page_length);
		decreaseActionCommentCountWithoutRequest();
	}

	let g_is_blind_action_comment;
	let g_action_comment_uuid;
	let btn_id;
	function onClickBtnBlindActionComment(obj)
	{
		btn_id = obj.id;
		g_is_blind_action_comment = $(obj).hasClass('btn-blind-action-comment') ? 'Y' : 'N';
		g_action_comment_uuid = $(obj).data('uuid');
		const msg = $(obj).hasClass('btn-blind-action-comment') ? message.blind : message.display;
		sweetConfirm(msg, blindActionCommentRequest);
	}

	function blindActionCommentRequest()
	{
		const param = {
			"is_blind" : g_is_blind_action_comment,
			"board" : [],
			"board_comment" : [],
			"action_comment" : [g_action_comment_uuid]
		}

		ajaxRequestWithJson(true, api.blindTalk, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, blindActionCommentSuccess);
			})
			.catch(reject => sweetError(`블라인드${message.ajaxError}`));
	}

	function blindActionCommentSuccess()
	{
		const btnEl = $(`#${btn_id}`);
		if (g_is_blind_action_comment === 'Y')
		{
			btnEl.removeClass('btn-warning btn-blind-action-comment');
			btnEl.addClass('btn-orange btn-display-action-comment');
			btnEl.html(`<i class="fas fa-eye"></i> 블라인드 해제`);
		}
		else
		{
			btnEl.removeClass('btn-orange btn-display-action-comment');
			btnEl.addClass('btn-warning btn-blind-action-comment');
			btnEl.html(`<i class="fas fa-eye-slash"></i> 블라인드 처리`);
		}
	}

	export function onSubmitActionComment()
	{
		if (isEmpty(commentAction.val()))
		{
			sweetToast(`댓글은 ${message.required}`);
			commentAction.trigger('focus');
			return;
		}

		sweetConfirm(message.create, createActionCommentRequest);
	}

	function createActionCommentRequest()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"action_uuid" : g_action_uuid,
			"comment" : commentAction.val().trim(),
		}

		ajaxRequestWithJson(true, api.createActionComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createActionCommentSuccess);
			})
			.catch(reject => sweetError(`댓글 등록${message.ajaxError}`));
	}

	function createActionCommentSuccess()
	{
		commentAction.val('');
		initActionCommentLastIdx();
		initActionCommentWrap();
		getActionComments(g_view_page_length);
		increaseActionCommentCountWithoutRequest();
	}

	function buildPagination(data)
	{
		const totalCount  = data.count;
		const lastPage = Math.ceil(totalCount / selActionPageLength.val());

		totalActionCount.text(totalCount);
		pagination.html(paginate(_actionCurrentPage, lastPage));

		$(".paginate_button").not('.disabled').on('click', function () { onClickPageNum(this); })
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		_actionCurrentPage = $(obj).data('page');

		getActionList();
	}

	let isWarningList
	export function onClickModalWarnOpen(obj)
	{
		isWarningList = obj.id === 'btnSendWarnings';
		if (isWarningList)
		{
			if (hasCheckedAction()) fadeinModalWarning();
		}
		else
			$(obj).hasClass('btn-send-warning') ? fadeinModalWarning() : onSubmitCancelWarning();
	}

	function fadeinModalWarning()
	{
		modalWarning.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

	function hasCheckedAction()
	{
		const checkedActionEl = $("input[name=chk-action]:checked");
		const checkedCount = checkedActionEl.length;
		if (checkedCount === 0)
		{
			sweetToast(`발송대상을 ${message.select}`);
			return false;
		}

		return true;
	}

	export function onSubmitSendWarning()
	{
		sweetConfirm(`경고장을 ${message.send}`, sendWarningRequest);
	}

	export function sendWarningRequest()
	{
		let action_uuids = [];
		if (isWarningList)
		{
			$("input[name=chk-action]:checked").each(function () {
				action_uuids.push($(this).data('uuid'));
			})
		}
		else
			action_uuids.push(g_action_uuid);

		const param = {
			"action_uuid" : action_uuids,
			"reason" : selReason.val()
		};

		ajaxRequestWithJson(true, api.sendWarning, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, sendWarningSuccess);
			})
			.catch(reject => sweetError(`발송${message.ajaxError}`));
	}

	function sendWarningSuccess()
	{
		if (!isWarningList)
			getDetailAction();

		getActionList();
		fadeoutModal();
	}

	function onSubmitCancelWarning()
	{
		sweetConfirm(message.cancel, cancelWarningRequest);
	}

	function cancelWarningRequest()
	{
		const param = { "action_uuid" : [g_action_uuid] }

		ajaxRequestWithJson(true, api.cancelWarning, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, getDetailAction);
			})
			.catch(reject => sweetError(`경고장 발송 취소${message.ajaxError}`));
	}

	function initActionCommentPageNum()
	{
		g_action_comment_page_num = 1;
	}

	function initActionCommentLastIdx()
	{
		g_action_comment_last_idx = 0;
	}

	function initActionCommentWrap()
	{
		actionCommentWrap.empty();
	}

	function onClickModalReplyActionOpen(obj)
	{
		$('.modal-content').hide();
		$(obj).siblings('.modal-content').fadeIn();
		$(obj).siblings('.modal-content').find('.reply-action').trigger('focus');
		$(obj).siblings('.modal-content').find('.reply-action').val('');
	}

	function onClickModalReplyActionClose()
	{
		$('.modal-content').fadeOut();
	}

	function onClickAttachAction(obj)
	{
		modalAttach.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		modalAttachContentWrap.empty();
		let contentEl = ''
		switch ($(obj).data('type')) {
			case label.image :
				contentEl = `<div class="image-wrap"><img src="${$(obj).data('url')}" alt=""></div>`;
				break;
			case label.video :
				contentEl = `<div class="video-wrap"><video controls><source src="${$(obj).data('url')}"></video></div>`;
				break;
		}
		modalAttachContentWrap.html(contentEl);
		onErrorImage();
	}

	function toggleTextBtnSendWarning(isFail)
	{
		btnSendWarning.removeClass('btn-danger btn-orange btn-send-warning');
		if (isFail === 'Y')
		{
			btnSendWarning.addClass('btn-orange');
			btnSendWarning.html(`<i class="fas fa-exclamation-triangle"></i> 경고장 발송 취소`);
		}
		else
		{
			btnSendWarning.addClass('btn-danger btn-send-warning');
			btnSendWarning.html(`<i class="fas fa-exclamation-triangle"></i> 경고장 발송`);
		}
	}

	function buildActionContent(data)
	{
		const {contents_type, contents_url, thumbnail_url} = data;

		switch (contents_type) {
			case label.image :
				return `<div class="detail-img-wrap talk-file-img view-detail-action" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${contents_url}" alt="">
						</div>`;
			case label.audio :
				return `<audio controls><source src="${contents_url}"></audio>`;
			case label.video :
				return `<div class="detail-img-wrap talk-file-img view-detail-action" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${thumbnail_url}" alt="">
						</div>`;
		}
	}

	function increaseActionCommentCountWithoutRequest()
	{
		actionCommentCount.text(Number(actionCommentCount.text())+1)
	}

	function decreaseActionCommentCountWithoutRequest()
	{
		actionCommentCount.text(Number(actionCommentCount.text())-1)
	}
