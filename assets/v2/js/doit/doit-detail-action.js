
	import {
	actionCommentCount,
	actionDesc,
	actionCreated,
	actionDetailForm,
	actionLikeCount,
	actionListForm,
	actionsWrap,
	selActionDateType,
	chkActionStatus,
	modalBackdrop,
	modalWarning,
	searchActionDateFrom,
	searchActionDateTo,
	selActionMissions,
	pagination,
	selActionPageLength,
	totalActionCount,
	actionNickname,
	actionContentWrap,
	actionCommentWrap,
	commentAction, btnSendWarning, modalAttach, modalAttachContentWrap, selReason,
} from "../modules/elements.js";
	import {
	initSelectOption,
	overflowHidden,
	onErrorImage,
	paginate,
	fadeoutModal,
		limitInputLength
	} from "../modules/common.js";
	import {api} from "../modules/api-url.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {g_doit_uuid, g_leader_profile_uuid, isSponsorDoit} from "./doit-detail-info.js";
	import {ajaxRequestWithJsonData, isSuccessResp} from "../modules/request.js";
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from "../modules/alert.js";
	import {isEmpty} from "../modules/utils.js";
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
	}

	export function onSubmitSearchActions()
	{
		_actionCurrentPage = 1;
		getActionList();
	}

	export function getMissionListForAction()
	{
		const url = api.missionList;
		const errMsg = `미션 목록 ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getMissionListForActionCallback, errMsg, false);
	}

	function getMissionListForActionCallback(data)
	{
		isSuccessResp(data) ? buildSelActionMission(data) : sweetToast(data.msg);
	}

	function buildSelActionMission(data)
	{
		const missions = data.data;
		let options = '<option value="all">전체</option>';
		if (missions.length > 0)
			missions.map(obj => { options += `<option value="${obj.mission_uuid}">${obj.mission_title}</option>` });

		selActionMissions.html(options);

		onSubmitSearchActions();
	}

	export function getActionList()
	{
		const url = api.actionList;
		const errMsg = label.list+message.ajaxLoadError;
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

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getActionListCallback, errMsg, false);
	}

	function getActionListCallback(data)
	{
		if (isSuccessResp(data))
		{
			buildActions(data);
			buildPagination(data);
		}
		else
			sweetToast(data.msg);
	}

	function buildActions(data)
	{
		let actionEl = '<div class="card"><p class="message">인증 정보가 없습니다.</p></div>';
		if (data.count > 0)
		{
			actionEl = '';

			data.data.map( (obj, index) => {
				const {idx, action_date, action_uuid, contents_type, contents_url, doit_title, nickname, report_count, thumbnail_url, is_yellow} = obj;

				const warningEl = is_yellow === 'Y' ? `<strong class="red-card"><img src="${label.redCardImage}" alt=""></strong>` : '';

				let actionContentImage;
				if (contents_type === 'image')
					actionContentImage = contents_url;
				else if (contents_type === 'voice')
					actionContentImage = label.voiceImage
				else if (contents_type === 'video')
					actionContentImage = thumbnail_url;

				if (index===0 || index%6 === 0)
					actionEl += '<div class="row">';

				actionEl +=
					`<div class="col-2 auth-item">
						<div class="card">
							<div class="top clearfix">
								<div class="checkbox-wrap">
									<input id="action_${index}" type="checkbox" name="chk-action" data-uuid="${action_uuid}" data-warning="${is_yellow}">
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
		const url = api.detailAction;
		const errMsg = label.detailContent + message.ajaxLoadError;
		const param = { "idx" : g_action_idx };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailActionCallback, errMsg, false);
	}

	function getDetailActionCallback(data)
	{
		if (isSuccessResp(data))
		{
			g_action_uuid = data.data.action_uuid;
			buildDetailAction(data);
			getActionComments();
		}
		else
			sweetToast(data.msg);
	}

	function buildDetailAction(data)
	{
		const {action_date, action_description, action_uuid, comment_cnt, like_count, nickname, is_yellow} = data.data;

		toggleTextBtnSendWarning(is_yellow);
		actionNickname.text(nickname);
		actionCreated.text(action_date);
		actionLikeCount.text(like_count);
		actionCommentCount.text(comment_cnt);
		actionContentWrap.html(buildActionContent(data.data));
		actionDesc.text(action_description);

		$(".view-detail-action").on('click', function () { onClickAttachAction(this); });

		onErrorImage();
	}

	function onClickAttachAction(obj)
	{
		modalAttach.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		modalAttachContentWrap.empty();
		let contentEl = ''
		switch ($(obj).data('type')) {
			case 'image' :
				contentEl = `<div class="image-wrap"><img src="${$(obj).data('url')}" alt=""></div>`;
				break;
			case 'video' :
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
			case 'image' :
				return `<div class="detail-img-wrap talk-file-img view-detail-action" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${contents_url}" alt="">
						</div>`;
			case 'voice' :
				return `<audio controls><source src="${contents_url}"></audio>`;
			case 'video' :
				return `<div class="detail-img-wrap talk-file-img view-detail-action" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${thumbnail_url}" alt="">
						</div>`;
		}
	}

	function getActionComments(_pageLength)
	{
		const url = api.actionCommentList;
		const errMsg = `댓글 목록${message.ajaxLoadError}`;
		const param = {
			"action_uuid" : g_action_uuid,
			"size" : isEmpty(_pageLength) ? g_action_comment_page_length : g_view_page_length,
			"last_idx" : g_action_comment_last_idx
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getActionCommentsCallback, errMsg, false);
	}

	function getActionCommentsCallback(data)
	{
		isSuccessResp(data) ? buildActionComments(data) : sweetToast(data.msg);
	}

	function buildActionComments(data)
	{
		if ($('#btnViewMore').length > 0) $('#btnViewMore').remove();

		if (!isEmpty(data.data) && data.data.length > 0)
		{
			g_action_comment_page_size = Math.ceil(Number(data.count)/g_action_comment_page_length);

			data.data.map((obj, index, arr) => {
				const {idx, comment_uuid, created, nickname, profile_uuid, comment_body, comment_cnt, parent_comment_uuid, recomment_data } = obj;

				if (arr.length - 1 === index)
					g_action_comment_last_idx = idx;

				let repliesEl = ''
				if (recomment_data.length > 0)
				{
					recomment_data.map(replyObj => {
						repliesEl +=
							`<li>
								<div class="top clearfix">
									<p class="title">
										ㄴ ${replyObj.nickname} <span class="desc-sub">${replyObj.created}</span>
									</p>
								</div>
								<div class="detail-data">
									${replyObj.comment_body}
								</div>
							</li>`
					})
				}

				const createReplyEl = isSponsorDoit
					? `<a class="link btn-reply-action">답글달기</a>
					<!-- 답글달기 -->
					<div class="modal-content comments-creat">
						<div class="modal-header clearfix">
							<h5>답글달기</h5>
							<i class="modal-close btn-action-reply-close">×</i>
						</div>
						<div class="modal-body">
							<table class="detail-table reply-table">
								<colgroup>
									<col style="width: 20%;">
									<col style="width: 70%;">
								</colgroup>
								<tr>
									<td colspan="2">
										<div class="textarea-wrap">
											<input type="hidden" class="parent-comment-uuid" value="${comment_uuid}">
											<input type="hidden" class="target-profile-uuid" value="${profile_uuid}">
											<input type="hidden" class="target-nickname" value="${nickname}">
											<textarea class="length-input reply-action" maxlength="100" rows="4" placeholder="답글을 입력해주세요."></textarea>
											<p class="length-count-wrap"><span class="count-input">0</span>/100</p>
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<div class="right-wrap">
											<button type="button" class="btn-sm btn-primary btn-submit-reply-action">등록</button>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</div>`
					: '';

				const btnDeleteCommentEl = isSponsorDoit && (g_leader_profile_uuid === profile_uuid)
					? `<button type="button" class="btn-xs btn-danger btn-delete-action-comment" data-uuid="${comment_uuid}">삭제</button>`
					: '';

				const commentEl =
					`<div class="card">
						<div class="top clearfix">
							<p class="title">
								${nickname} <span class="desc-sub">${created}</span>
							</p>
							<div class="right-wrap">
								${btnDeleteCommentEl}
							</div>
						</div>
						<div class="detail-data">
							${comment_body}
						</div>
						<div class="img-wrap">
							<img src="/assets/v2/img/profile-1.png" alt="">
						</div>
						<div class="bottom">
							<span><i class="fas fa-heart"></i> 111</span>
							<span><i class="fas fa-comments"></i>  <a class="link">${comment_cnt}</a></span>
							${createReplyEl}
						</div>
			
						<div class="comments-wrap">
							<ul>
								${repliesEl}
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

	let g_parent_uuid;
	let g_target_profile_uuid;
	let g_target_nickname;
	let g_reply_value;
	function onSubmitActionReply(obj)
	{
		const replyEl = $(obj).parents('.reply-table');
		g_parent_uuid = $(replyEl).find('.parent-comment-uuid').val();
		g_target_profile_uuid = $(replyEl).find('.target-profile-uuid').val();
		g_target_nickname = $(replyEl).find('.target-nickname').val();
		g_reply_value = $(replyEl).find('.reply-action').val();

		if (replyActionValid())
			sweetConfirm(message.create, createActionReplyRequest);
	}

	function replyActionValid()
	{
		if (isEmpty(g_reply_value))
		{
			sweetToast(`답글은 ${message.required}`);
			return false;
		}

		return true;
	}

	function createActionReplyRequest()
	{
		const url = api.createActionComment;
		const errMsg = `답글 등록 ${message.ajaxError}`;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"action_uuid" : g_action_uuid,
			"comment" : g_reply_value.trim(),
			"mention" : [{ "profile_uuid": g_target_profile_uuid, "profile_nickname": g_target_nickname}],
			"parent_comment_uuid" : g_parent_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createActionReplyCallback, errMsg, false);
	}

	function createActionReplyCallback(data)
	{
		sweetToastAndCallback(data, createActionReplySuccess);
	}

	function createActionReplySuccess()
	{
		onClickModalReplyActionClose();
		initActionCommentLastIdx();
		initActionCommentWrap();
		getActionComments(g_view_page_length);
	}

	let g_delete_action_comment_uuid;
	function onSubmitDeleteActionComment(obj)
	{
		g_delete_action_comment_uuid = $(obj).data('uuid');
		sweetConfirm(message.delete, actionCommentDeleteRequest);
	}

	function actionCommentDeleteRequest()
	{
		const url = api.deleteActionComment;
		const errMsg = `댓글 삭제 ${message.ajaxError}`;
		const param = {
			"comment_uuid" : g_delete_action_comment_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteActionCommentReqCallback, errMsg, false);
	}

	function deleteActionCommentReqCallback(data)
	{
		sweetToastAndCallback(data, deleteActionCommentSuccess);
	}

	function deleteActionCommentSuccess()
	{
		initActionCommentLastIdx();
		initActionCommentWrap();
		getActionComments(g_view_page_length);
	}

	export function onSubmitActionComment()
	{
		if (commentActionValid())
			sweetConfirm(message.create, createActionCommentRequest);
	}

	function commentActionValid()
	{
		if (isEmpty(commentAction.val()))
		{
			sweetToast(`댓글은 ${message.required}`);
			commentAction.trigger('focus');
			return false;
		}

		return true;
	}

	function createActionCommentRequest()
	{
		const url = api.createActionComment;
		const errMsg = `댓글 등록 ${message.ajaxError}`;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"action_uuid" : g_action_uuid,
			"comment" : commentAction.val().trim(),
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createActionCommentReqCallback, errMsg, false);
	}

	function createActionCommentReqCallback(data)
	{
		sweetToastAndCallback(data, createActionCommentSuccess)
	}

	function createActionCommentSuccess()
	{
		commentAction.val('');
		initActionCommentLastIdx();
		initActionCommentWrap();
		getActionComments(g_view_page_length);
	}

	function buildPagination(data)
	{
		const totalCount  = data.count;
		const lastPage = Math.ceil(totalCount / selActionPageLength.val());

		totalActionCount.text(totalCount);
		pagination.html(paginate(_actionCurrentPage, lastPage));

		$(".paginate_button ").on('click', function () { onClickPageNum(this); })
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
			if (hasCheckedAction())
				fadeinModalWarning();
		}
		else
		{
			$(obj).hasClass('btn-send-warning') ? fadeinModalWarning() : onSubmitCancelWarning();

		}
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

		let hasWarning = 0;
		checkedActionEl.each(function () {
			if ($(this).data('warning') === 'Y')
				hasWarning++;
		});
		if (hasWarning > 0)
		{
			sweetToast(`선택한 발송대상에 ${message.alreadyWarning}`);
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
		const url = api.sendWarning;
		const errMsg = `발송 ${message.ajaxError}`;
		let action_uuids = [];
		if (isWarningList)
		{
			$("input[name=chk-action]:checked").each(function () {
				action_uuids.push($(this).data('uuid'));
			})
		}
		else
		{
			action_uuids.push(g_action_uuid);
		}

		const param = {
			"action_uuid" : action_uuids,
			"reason" : selReason.val()
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), sendWarningReqCallback, errMsg, false);
	}

	function sendWarningReqCallback(data)
	{
		sweetToastAndCallback(data, sendWarningSuccess);
	}

	function sendWarningSuccess()
	{
		if (!isWarningList)
		{
			fadeoutModal();
			getDetailAction();
		}

		getActionList();
	}

	function onSubmitCancelWarning()
	{
		sweetConfirm(message.cancel, cancelWarningRequest);
	}

	function cancelWarningRequest()
	{
		const url = api.cancelWarning;
		const errMsg = `경고장 발송 취소 ${message.ajaxError}`;
		const param = {
			"action_uuid" : [g_action_uuid],
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), cancelWarningReqCallback, errMsg, false);
	}

	function cancelWarningReqCallback(data)
	{
		sweetToastAndCallback(data, getDetailAction);
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

