
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
	commentAction,
	btnSendWarning,
	modalAttach,
	modalAttachContentWrap,
	selReason,
	warningReason,
	selSearchTypeInAction,
	keywordInAction,
	actionEmojiWrap,
	rdoActionAttachType,
	actionEmojiCategory,
	previewActionEmoji,
	commentTalk,
	previewEmoji,
	commentAttachmentWrap,
		actionAttachmentWrap,
} from "../modules/elements.js";
	import {
	initSelectOption,
	overflowHidden,
	onErrorImage,
	paginate,
	fadeoutModal,
	limitInputLength,
	initDayBtn,
		onChangeValidateImage, onChangeValidationVideo, onChangeValidationAudio
	} from "../modules/common.js";
	import {api, fileApiV2} from "../modules/api-url.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {g_doit_uuid, isSponsorDoit} from "./doit-detail-info.js";
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from "../modules/alert.js";
	import {isDisplay, isEmpty, uuidv4} from "../modules/utils.js";
	import {ajaxRequestWithJson, isSuccessResp, invalidResp, ajaxRequestWithFile} from "../modules/ajax-request.js";

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
		keywordInAction.val('');
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
			"search_type" : selSearchTypeInAction.val(),
			"keyword" : keywordInAction.val().trim(),
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
				const {idx, comment_uuid, created, nickname, is_company, profile_uuid, comment_body, is_del, is_blind, comment_cnt, recomment_data, attach, emoticon } = obj;
				const parent_comment_uuid = comment_uuid;
				if (arr.length - 1 === index)
					g_action_comment_last_idx = idx;

				const isDel = is_del === 'Y';
				const delComment = '<p class="text-danger">삭제된 댓/답글입니다.</p>';
				const btnBlindComment = isDel ? delComment : is_blind === 'Y'
					? `<button type="button" class="btn-xs btn-orange btn-display-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}">
                         <i class="fas fa-eye"></i> 블라인드 해제
                       </button>`
					: `<button type="button" class="btn-xs btn-warning btn-blind-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}">
                         <i class="fas fa-eye-slash"></i> 블라인드 처리
                       </button>`;
				const btnDeleteCommentEl = isDel ? delComment : `<button type="button" class="btn-xs btn-danger btn-delete-action-comment" data-uuid="${comment_uuid}">삭제</button>`;
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
						${buildCommentEmoticon(emoticon)}
						${buildCommentAttachment(attach)}
						${buildCommentBody(comment_body)}

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
		$('.action-comment-attach-wrap').on('click', function () { onClickAttachActionComment(this); });
		$('.rdo-action-reply-attach-type').on('change', function () { onChangeActionReplyAttachType(this); });
		$('.btn-action-reply-emoji').on('click', function () { onClickBtnActionReplyEmoji(this); });
	}

	function buildCommentBody(comment)
	{
		return isEmpty(comment) ? '' : `<div class="detail-data">${comment}</div>`;
	}

	function buildCommentEmoticon(emoticon)
	{
		let emojiElement = '';
		if (!isEmpty(emoticon) && emoticon.length > 0)
			emoticon.map(obj => emojiElement += `<div class="emoticon-view-wrap"><img src="${obj.emoticon_file_url}" alt="이모티콘"></div>`);

		return emojiElement;
	}

	function buildCommentAttachment(attach)
	{
		let attachElement = '';
		if (!isEmpty(attach) && attach.length > 0)
		{
			attach.map(obj => {
				const {contents_type, contents_url, thumbnail_url} = obj;
				attachElement += contents_type === label.audio
					? `<audio controls="controls"><source src="${contents_url}"/></audio>`
					: `<div class="img-wrap action-comment-attach-wrap" data-type="${contents_type}" data-url="${contents_url}"><img src="${thumbnail_url}" alt="첨부 파일"></div>`;
			})
		}

		return attachElement;
	}

	function onClickAttachActionComment(obj)
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
			const {comment_uuid, is_del, is_blind, is_company, parent_comment_uuid, created, nickname, profile_uuid, comment_body, emoticon, attach} = obj;
			const isDel = is_del === 'Y';
			const delComment = '<p class="text-danger">삭제된 댓/답글입니다.</p>';
			const btnBlindReply = isDel ? delComment : is_blind === 'Y'
				? `<button type="button" class="btn-xs btn-orange btn-display-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
				: `<button type="button" class="btn-xs btn-warning btn-blind-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
			const btnDeleteReply = isDel ? delComment : `<button type="button" class="btn-xs btn-danger btn-delete-action-comment" data-uuid="${comment_uuid}">삭제</button>`;
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
					${buildActionReplyEmoticon(emoticon)}
					${buildActionReplyAttachment(attach)}
					${buildActionReplyBody(comment_body)}
					<div class="add-comments">
						${isSponsorDoit ? buildCreateReplyActionComment({parent_comment_uuid, profile_uuid, nickname, is_company}) : ''}
					</div>
				</li>`
		})

		return repliesEl;
	}

	function buildActionReplyBody(comment)
	{
		return isEmpty(comment) ? '' : `<div class="detail-data">${comment}</div>`;
	}

	function buildActionReplyEmoticon(emoticon)
	{
		let emojiElement = '';
		if (!isEmpty(emoticon) && emoticon.length > 0)
			emoticon.map(obj => emojiElement += `<div class="emoticon-view-wrap"><img src="${obj.emoticon_file_url}" alt="이모티콘"></div>`);

		return emojiElement;
	}

	function buildActionReplyAttachment(attach)
	{
		let attachElement = '';
		if (!isEmpty(attach) && attach.length > 0)
		{
			attach.map(obj => {
				const {contents_type, contents_url, thumbnail_url} = obj;
				attachElement += contents_type === label.audio
					? `<audio controls="controls"><source src="${contents_url}"/></audio>`
					: `<div class="img-wrap action-comment-attach-wrap" data-type="${contents_type}" data-url="${contents_url}"><img src="${thumbnail_url}" alt="첨부 파일"></div>`;
			})
		}

		return attachElement;
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
			const {comment_uuid, is_del, is_blind, is_company, created, nickname, comment_body, emoticon, attach} = obj;
			const isDel = is_del === 'Y';
			const delComment = '<p class="text-danger">삭제된 댓/답글입니다.</p>';
			const btnBlindReply = isDel ? delComment : is_blind === 'Y'
				? `<button type="button" class="btn-xs btn-orange btn-display-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
				: `<button type="button" class="btn-xs btn-warning btn-blind-action-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
			const btnDeleteReply = isDel ? delComment : `<button type="button" class="btn-xs btn-danger btn-delete-action-comment" data-uuid="${comment_uuid}">삭제</button>`;

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
					${buildActionReplyEmoticon(emoticon)}
					${buildActionReplyAttachment(attach)}
					${buildActionReplyBody(comment_body)}
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
		const uuid = uuidv4();

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
							<tr class="emoticon-wrap">
								<th>
									첨부파일
								</th>
								<td>
									<div class="radio-wrap file-value">
										<input id="r${uuid}a" type="radio" class="rdo-action-reply-attach-type" name="${uuid}" value="" checked>
										<label for="r${uuid}a"><span></span>첨부파일 없음</label>
	
										<input id="r${uuid}b" type="radio" class="rdo-action-reply-attach-type" name="${uuid}" value="image">
										<label for="r${uuid}b"><span></span>사진</label>
	
										<input id="r${uuid}c" type="radio" class="rdo-action-reply-attach-type" name="${uuid}" value="video">
										<label for="r${uuid}c"><span></span>영상</label>
	
										<input id="r${uuid}d" type="radio" class="rdo-action-reply-attach-type" name="${uuid}" value="audio">
										<label for="r${uuid}d"><span></span>음성</label>
	
										<i class="far fa-smile emoticon-open_btn btn-action-reply-emoji"
											data-radio="${uuid}"
											data-emoji="${uuid}Emoji"
											data-preview="${uuid}Preview"
											data-cancel="${uuid}Cancel"></i>
									</div>
									<div class="action-reply-attachment-wrap"></div>
								</div>
	
								<div class="emoticon-modal-wrap" style="display: none;" id="${uuid}Emoji">
									<ul class="emoticon-tab">
									</ul>
									<div class="emoticon-list">
									</div>
								</div>
								</td>
							</tr>
							<tr class="preview-reply-emoji" style="display: none;" id="${uuid}Preview">
								<th></th>
								<td>
									<div class="emoticon-view-wrap">
										<img class="emoticon-view" src="" alt="이모티콘 미리보기">
										<i class="fas fa-times-circle icon-delete-attach" id="${uuid}Cancel"></i>
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<div class="right-wrap">
										<button type="button" 
												class="btn-sm btn-primary btn-submit-reply-action"
												data-radio="${uuid}"
												data-preview="${uuid}Preview"
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
	let actionReplyFileElement;
	let paramActionReplyAttachType = '';
	function onSubmitActionReply(obj)
	{
		const replyEl = $(obj).parents('.reply-action-table');
		g_action_reply_parent_uuid = $(obj).data('parent');
		g_action_reply_target_profile_uuid = $(obj).data('profile');
		g_action_reply_target_nickname = $(obj).data('nickname');
		g_action_reply_company = $(obj).data('company');
		g_action_reply_value = $(replyEl).find('.reply-action').val();

		const rdoAttachElement = $(`input[name=${$(obj).data('radio')}]`);
		paramActionReplyAttachType = $(`input[name=${$(obj).data('radio')}]:checked`).val();
		const replyAttachWrap = $(rdoAttachElement).parent().siblings('.action-reply-attachment-wrap');
		actionReplyFileElement = $(replyAttachWrap).find('input[type=file]');
		previewActionReplyEmojiWrap = $(`#${$(obj).data('preview')}`);

		let fileCount = 0;
		if (actionReplyFileElement.length > 0)
		{
			actionReplyFileElement.each(function (index, element) {
				fileCount += element.files.length;
			})
		}

		if (actionReplyFileElement.length !== fileCount)
		{
			sweetToast(`파일을 ${message.addOn}`);
			return;
		}

		if (isEmpty(g_action_reply_value) && !isDisplay(previewActionReplyEmojiWrap) && fileCount === 0)
		{
			sweetToast(`답글은 ${message.required}`);
			return false;
		}

		const callback = isEmpty(paramActionReplyAttachType) ? createActionReplyRequest : createActionReplyAttachReq;
		sweetConfirm(message.create, callback);
	}

	function createActionReplyAttachReq()
	{
		let param  = new FormData();
		switch (actionReplyFileElement.length) {
			case 1 :
				actionReplyFileElement.each(function (index, element) {
					param.append('main_attach', $(element)[0].files[0]);
				})
				break;
			case 2 :
				actionReplyFileElement.each(function (index, element) {
					if (index === 0) param.append('sub_attach', $(element)[0].files[0]);
					if (index === 1) param.append('main_attach', $(element)[0].files[0]);
				})
				break;
			default :

		}
		ajaxRequestWithFile(true, fileApiV2.double, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createActionReplyRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`첨부파일 등록${message.ajaxError}`));
	}

	function createActionReplyRequest(data)
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"action_uuid" : g_action_uuid,
			"comment" : g_action_reply_company === 'Y' ? g_action_reply_value.trim() : `@${g_action_reply_target_nickname} ${g_action_reply_value.trim()}`,
			"mention" : [{ "profile_uuid": g_action_reply_target_profile_uuid, "nickname": g_action_reply_target_nickname}],
			"parent_comment_uuid" : g_action_reply_parent_uuid,
		}

		if (!isEmpty(data))
		{
			const talkAttachObj = {
				"contents_type" : paramActionReplyAttachType,
				"path" : data.image_urls.main_attach
			}

			if (paramActionReplyAttachType === label.video)
				talkAttachObj['thumbnail_path'] = data.image_urls.sub_attach;

			param["attach"] = [talkAttachObj];
		}

		if (isDisplay(previewActionReplyEmojiWrap))
		{
			const targetPreview = $(previewActionReplyEmojiWrap).find('.emoticon-view');
			param["emoticon"] = [{
				"category_id": targetPreview.data('category'),
				"emoticon_id": targetPreview.data('imojiid'),
				"emoticon_file_url": targetPreview.data('url'),
			}]
		}

		ajaxRequestWithJson(true, api.createActionComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				sweetToastAndCallback(data, createActionReplySuccess);
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
		const fileElement = actionAttachmentWrap.find("input[type=file]");
		let fileCount = 0;
		if (fileElement.length > 0)
		{
			fileElement.each(function (index, element) {
				fileCount += element.files.length;
			})
		}

		if (fileElement.length !== fileCount)
		{
			sweetToast(`파일을 ${message.addOn}`);
			return;
		}

		if (isEmpty(commentAction.val()) && !isDisplay(previewActionEmoji) && fileCount === 0)
		{
			sweetToast(`댓글 또는 이모티콘/첨부파일은 ${message.required}`);
			return false;
		}

		const callback = isEmpty(getCommentAttachType()) ? createActionCommentRequest : createActionCommentAttachRequest;
		sweetConfirm(message.create, callback);
	}

	function createActionCommentAttachRequest()
	{
		let param  = new FormData();
		param.append('main_attach', $("#commentAttachment")[0].files[0]);
		if (getCommentAttachType() === label.video)
			param.append('sub_attach', $("#commentAttachThumbnail")[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.double, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createActionCommentRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`첨부파일 등록${message.ajaxError}`));
	}

	function createActionCommentRequest(data)
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"action_uuid" : g_action_uuid,
			"comment" : commentAction.val().trim(),
		}

		if (!isEmpty(data))
		{
			const talkAttachObj = {
				"contents_type" : getCommentAttachType(),
				"path" : data.image_urls.main_attach
			}

			if (getCommentAttachType() === label.video)
				talkAttachObj['thumbnail_path'] = data.image_urls.sub_attach;

			param["attach"] = [talkAttachObj];
		}

		if (isDisplay(previewActionEmoji))
		{
			const targetPreview = previewActionEmoji.find('.emoticon-view');
			param["emoticon"] = [{
				"category_id": targetPreview.attr('data-category'),
				"emoticon_id": targetPreview.attr('data-imojiid'),
				"emoticon_file_url": targetPreview.attr('data-url')
			}]
		}

		ajaxRequestWithJson(true, api.createActionComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				sweetToastAndCallback(data, createActionCommentSuccess);
			})
			.catch(reject => sweetError(`댓글 등록${message.ajaxError}`));
	}

	function createActionCommentSuccess()
	{
		rdoActionAttachType.prop('disabled', false);
		rdoActionAttachType.eq(0).prop('checked', true);
		onChangeActionAttachType();
		previewActionEmoji.hide();
		commentAction.val('');
		initActionCommentLastIdx();
		initActionCommentWrap();
		getActionComments(g_view_page_length);
		increaseActionCommentCountWithoutRequest();
	}

	export function onClickBtnActionEmoji()
	{
		if (isDisplay(actionEmojiWrap))
		{
			actionEmojiWrap.hide();
			rdoActionAttachType.prop('disabled', false);
		}
		else
		{
			const hasCommentAttachThumbnail = $("#commentAttachThumbnail").length > 0 && $("#commentAttachThumbnail")[0].files.length > 0
			const hasCommentAttachment = $("#commentAttach").length > 0 && $("#commentAttach")[0].files.length > 0;
			(hasCommentAttachThumbnail || hasCommentAttachment)
				? sweetConfirm( '첨부 파일을 삭제하고 이모티콘을 추가합니다.', openEmojiWarp)
				: openEmojiWarp();
		}
	}

	function openEmojiWarp()
	{
		rdoActionAttachType.eq(0).prop('checked', true);
		onChangeActionAttachType();
		rdoActionAttachType.prop('disabled', true);
		actionEmojiWrap.show();
		getEmoji(buildEmojis)
	}

	function getEmoji(callback)
	{
		ajaxRequestWithJson(false, api.emojiList, null)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? callback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이모티콘 목록${message.ajaxLoadError}`));
	}

	let commentEmojis = [];
	function buildEmojis(data)
	{
		if (!isEmpty(data) && data.data.length > 0)
		{
			commentEmojis = [];
			actionEmojiCategory.empty();
			data.data.map((category, index) => {
				const {category_id, category_image_url, category_title, emoticon} = category;
				const liElement = `<li class="${index === 0 ? 'active': ''}" data-category="${category_id}"><img src="${category_image_url}" alt="${category_title}"></li>`;
				actionEmojiCategory.append(liElement);
				commentEmojis.push({
					"category_id" : category_id,
					"emojis" : emoticon
				})
			})

			onClickEmojiCategory(actionEmojiCategory.children().eq(0));
			actionEmojiCategory.children().off().on('click', function () { onClickEmojiCategory(this); });
		}
		else
			commentEmojis = [];
	}

	function onClickEmojiCategory(obj)
	{
		actionEmojiCategory.children().removeClass('active');
		$(obj).addClass('active');

		const targetElement = actionEmojiCategory.siblings('.emoticon-list');
		const categoryId = $(obj).data('category');

		targetElement.empty();
		if (commentEmojis.length > 0)
		{
			commentEmojis.map(emojiData => {
				const {category_id, emojis} = emojiData
				if (categoryId == category_id && emojis.length > 0)
				{
					emojis.map(emoji => {
						const {emoticon_id, emoticon_thumb_url, emoticon_file_url} = emoji;
						targetElement.append(`<img data-category="${category_id}" data-imojiid="${emoticon_id}" data-url="${emoticon_file_url}" src="${emoticon_thumb_url}" alt="이모티콘">`);
					})

					targetElement.children().off().on('click', function () { onClickEmoji(this); });
				}
			})
		}
	}

	function onClickEmoji(obj)
	{
		actionEmojiWrap.hide();
		const targetPreview = previewActionEmoji.find('.emoticon-view');
		targetPreview.attr('src', $(obj).data('url'));
		targetPreview.attr('data-imojiid', $(obj).data('imojiid'));
		targetPreview.attr('data-category', $(obj).data('category'));
		targetPreview.attr('data-url', $(obj).data('url'));
		previewActionEmoji.show();
	}

	export function onClickBtnCancelActionEmoji()
	{
		rdoActionAttachType.eq(0).prop('checked', true);
		onChangeActionAttachType();
		rdoActionAttachType.prop('disabled', false);
		previewActionEmoji.hide();
		const targetPreview = previewActionEmoji.find('.emoticon-view');
		targetPreview.attr('src', '');
		targetPreview.attr('data-imojiid', '')
		targetPreview.attr('data-category', '')
		targetPreview.attr('data-url', '')
	}

	let actionReplyEmojiCategoryElement;
	let rdoActionReplyAttachType;
	let actionReplyEmojiWrap;
	let previewActionReplyEmojiWrap;
	let btnCancelPreviewActionReplyEmoji;
	function onClickBtnActionReplyEmoji(obj)
	{
		rdoActionReplyAttachType = $(`input[name=${$(obj).data('radio')}]`);
		actionReplyEmojiWrap = $(`#${$(obj).data('emoji')}`);
		previewActionReplyEmojiWrap = $(`#${$(obj).data('preview')}`);
		btnCancelPreviewActionReplyEmoji = $(`#${$(obj).data('cancel')}`);
		actionReplyEmojiCategoryElement = actionReplyEmojiWrap.children('.emoticon-tab');

		if (isDisplay(actionReplyEmojiWrap))
		{
			actionReplyEmojiWrap.hide();
			rdoActionReplyAttachType.prop('disabled', false);
		}
		else
		{
			const replyAttachWrap = $(obj).parent().siblings('.action-reply-attachment-wrap');
			const fileElement = $(replyAttachWrap).find('input[type=file]');

			let hasFile = false;
			if (fileElement.length > 0)
			{
				fileElement.each(function (index, element) {
					if (element.files.length > 0) hasFile = true;
				})
			}

			hasFile ? sweetConfirm( '첨부 파일을 삭제하고 이모티콘을 추가합니다.', openActionReplyEmoji) : openActionReplyEmoji();
		}
	}

	function openActionReplyEmoji()
	{
		rdoActionReplyAttachType.eq(0).prop('checked', true);
		onChangeReplyAttachType(rdoActionReplyAttachType);
		rdoActionReplyAttachType.prop('disabled', true);
		actionReplyEmojiWrap.show();
		getEmoji(buildActionReplyEmojis)
	}

	function buildActionReplyEmojis(data)
	{
		if (!isEmpty(data) && data.data.length > 0)
		{
			commentEmojis = [];
			actionReplyEmojiCategoryElement.empty();
			data.data.map((category, index) => {
				const {category_id, category_image_url, category_title, emoticon} = category;
				const liElement = `<li class="${index === 0 ? 'active': ''}" data-category="${category_id}"><img src="${category_image_url}" alt="${category_title}"></li>`;
				actionReplyEmojiCategoryElement.append(liElement);
				commentEmojis.push({
					"category_id" : category_id,
					"emojis" : emoticon
				})
			})

			onClickReplyEmojiCategory(actionReplyEmojiCategoryElement.children().eq(0));
			actionReplyEmojiCategoryElement.children().off().on('click', function () { onClickReplyEmojiCategory(this); });
		}
		else
			commentEmojis = [];
	}

	function onClickReplyEmojiCategory(obj)
	{
		actionReplyEmojiCategoryElement.children().removeClass('active');
		$(obj).addClass('active');

		const targetElement = actionReplyEmojiCategoryElement.siblings('.emoticon-list');
		const categoryId = $(obj).data('category');

		targetElement.empty();
		if (commentEmojis.length > 0)
		{
			commentEmojis.map(emojiData => {
				const {category_id, emojis} = emojiData
				if (categoryId == category_id && emojis.length > 0)
				{
					emojis.map(emoji => {
						const {emoticon_id, emoticon_thumb_url, emoticon_file_url} = emoji;
						targetElement.append(`<img data-category="${category_id}" data-imojiid="${emoticon_id}" data-url="${emoticon_file_url}" src="${emoticon_thumb_url}" alt="이모티콘">`);
					})

					targetElement.children().off().on('click', function () { onClickActionReplyEmoji(this); });
				}
			})
		}
	}

	function onClickActionReplyEmoji(obj)
	{
		actionReplyEmojiWrap.hide();
		const targetPreview = $(previewActionReplyEmojiWrap).find('.emoticon-view');
		targetPreview.attr('src', $(obj).data('url'));
		targetPreview.attr('data-imojiid', $(obj).data('imojiid'));
		targetPreview.attr('data-category', $(obj).data('category'));
		targetPreview.attr('data-url', $(obj).data('url'));
		previewActionReplyEmojiWrap.show();
		btnCancelPreviewActionReplyEmoji.off().on('click', function () { onClickBtnCancelPreviewActionReplyEmoji(); });
	}

	function onClickBtnCancelPreviewActionReplyEmoji()
	{
		rdoActionReplyAttachType.eq(0).prop('checked', true);
		onChangeReplyAttachType();
		rdoActionReplyAttachType.prop('disabled', false);
		previewActionReplyEmojiWrap.hide();
		const targetPreview = $(previewActionReplyEmojiWrap).find('.emoticon-view');
		targetPreview.attr('src', '');
		targetPreview.attr('data-imojiid', '')
		targetPreview.attr('data-category', '')
		targetPreview.attr('data-url', '')
	}

	function buildPagination(data)
	{
		const totalCount  = data.count;
		const lastPage = Math.ceil(totalCount / selActionPageLength.val());

		totalActionCount.text(totalCount);
		pagination.html(paginate(_actionCurrentPage, lastPage));

		$(".btn_paginate").not('.disabled').on('click', function () { onClickPageNum(this); })
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

	export function onChangeActionAttachType()
	{
		let attachEl = '';
		switch (getCommentAttachType()) {
			case label.image :
				attachEl =
					`<p class="desc-sub">이미지 ( 크기 : 650 이상 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="commentAttachment">업로드</label>
						<input type="file" id="commentAttachment" class="upload-hidden" data-width="650" data-compare="이상">
					</div>`;
				actionAttachmentWrap.html(attachEl);
				$("#commentAttachment").on('change', function () { onChangeValidateImage(this); });
				break;
			case label.video :
				attachEl =
					`<p class="desc-sub">썸네일 ( 크기 : 650 * 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="commentAttachThumbnail">업로드</label>
						<input type="file" id="commentAttachThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="commentAttachment">업로드</label>
						<input type="file" id="commentAttachment" class="upload-hidden">
					</div>`;
				actionAttachmentWrap.html(attachEl);
				$("#commentAttachThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#commentAttachment").on('change', function () { onChangeValidationVideo(this); });
				break;
			case label.audio :
				attachEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="commentAttachment">업로드</label>
						<input type="file" id="commentAttachment" class="upload-hidden">
					</div>`;
				actionAttachmentWrap.html(attachEl);
				$("#commentAttachment").on('change', function () { onChangeValidationAudio(this); });
				break;
			default :
				actionAttachmentWrap.html(attachEl);
		}
	}

	function onChangeActionReplyAttachType(obj)
	{
		const uuid = uuidv4();
		const radioName = $(obj).attr('name');
		const attachType = $(`input[name=${radioName}]:checked`).val();
		const replyAttachmentWrap = $(obj).parent().siblings('.action-reply-attachment-wrap');
		let attachEl = '';
		switch (attachType) {
			case label.image :
				attachEl =
					`<p class="desc-sub">이미지 ( 크기 : 650 이상 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="${uuid}">업로드</label>
						<input type="file" id="${uuid}" class="upload-hidden" data-width="650" data-compare="이상">
					</div>`;
				replyAttachmentWrap.html(attachEl);
				$(`#${uuid}`).on('change', function () { onChangeValidateImage(this); });
				break;
			case label.video :
				attachEl =
					`<p class="desc-sub">썸네일 ( 크기 : 650 * 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="${uuid}Thumbnail">업로드</label>
						<input type="file" id="${uuid}Thumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="${uuid}">업로드</label>
						<input type="file" id="${uuid}" class="upload-hidden">
					</div>`;
				replyAttachmentWrap.html(attachEl);
				$(`#${uuid}Thumbnail`).on('change', function () { onChangeValidateImage(this); });
				$(`#${uuid}`).on('change', function () { onChangeValidationVideo(this); });
				break;
			case label.audio :
				attachEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="${uuid}">업로드</label>
						<input type="file" id="${uuid}" class="upload-hidden">
					</div>`;
				replyAttachmentWrap.html(attachEl);
				$(`#${uuid}`).on('change', function () { onChangeValidationAudio(this); });
				break;
			default :
				replyAttachmentWrap.html(attachEl);
		}
	}

	function onChangeReplyAttachType(obj)
	{
		const uuid = uuidv4();
		const radioName = $(obj).attr('name');
		const attachType = $(`input[name=${radioName}]:checked`).val();
		const replyAttachmentWrap = $(obj).parent().siblings('.action-reply-attachment-wrap');
		let attachEl = '';
		switch (attachType) {
			case label.image :
				attachEl =
					`<p class="desc-sub">이미지 ( 크기 : 650 이상 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="${uuid}">업로드</label>
						<input type="file" id="${uuid}" class="upload-hidden" data-width="650" data-compare="이상">
					</div>`;
				replyAttachmentWrap.html(attachEl);
				$(`#${uuid}`).on('change', function () { onChangeValidateImage(this); });
				break;
			case label.video :
				attachEl =
					`<p class="desc-sub">썸네일 ( 크기 : 650 * 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="${uuid}Thumbnail">업로드</label>
						<input type="file" id="${uuid}Thumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="${uuid}">업로드</label>
						<input type="file" id="${uuid}" class="upload-hidden">
					</div>`;
				replyAttachmentWrap.html(attachEl);
				$(`#${uuid}Thumbnail`).on('change', function () { onChangeValidateImage(this); });
				$(`#${uuid}`).on('change', function () { onChangeValidationVideo(this); });
				break;
			case label.audio :
				attachEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="${uuid}">업로드</label>
						<input type="file" id="${uuid}" class="upload-hidden">
					</div>`;
				replyAttachmentWrap.html(attachEl);
				$(`#${uuid}`).on('change', function () { onChangeValidationAudio(this); });
				break;
			default :
				replyAttachmentWrap.html(attachEl);
		}
	}

	function getCommentAttachType()
	{
		return $("input[name=radio-action-attach-type]:checked").val();
	}
