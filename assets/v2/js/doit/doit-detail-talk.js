
	import {
	modalCreateTalk,
	modalBackdrop,
	talkDetailForm,
	talkListForm,
	talkUpdateForm,
	talk,
	searchTalkDateFrom,
	searchTalkDateTo,
	modalAttach,
	modalAttachContentWrap,
	talkAttachmentWrap,
	rdoAttachType,
	selTalkDateType,
	selTalkPageLength,
	talkTable,
	chkNoticeTalk,
	infoTalkNickname,
	infoTalkCommentCount,
	infoTalkLikeCount,
	infoTalkContent,
	infoTalkCreated,
	infoTalkIsBlind,
	infoTalkAttachWrap,
	talkCommentWrap,
	commentTalk,
	updateTalk,
	rdoUpdateAttachType,
	chkUpdateNoticeTalk,
	updateTalkAttachWrap,
	btnBlindTalk,
	btnDisplayTalk,
	btnDeleteTalk,
	btnUpdateTalk,
	isDel,
	chkNoticeType,
	chkSpecialNoticeTalk,
	chkUpdateSpecialNoticeTalk,
	commentEmojiWrap,
	commentEmojiCategory,
	commentAttachmentWrap,
	previewEmoji,
	rdoCommentAttachType, actionAttachmentWrap,
} from "../modules/elements.js";
	import {
		overflowHidden, onErrorImage, onChangeValidateImage, onChangeValidationVideo,
		onChangeValidationAudio, fadeoutModal, initDayBtn, limitInputLength, calculateInputLength
	} from "../modules/common.js";
	import {api, fileApiV2} from "../modules/api-url.js";
	import {g_doit_uuid, isSponsorDoit} from "./doit-detail-info.js";
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from "../modules/alert.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {buildTotalCount, toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";
	import {isDisplay, isEmpty, numberWithCommas, uuidv4} from "../modules/utils.js";
	import {ajaxRequestWithFile, ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";

	export function showTalkListForm()
	{
		talkListForm.show();
		talkDetailForm.hide();
		talkUpdateForm.hide();
	}

	export function onClickBtnUpdateTalk()
	{
		talkListForm.hide();
		talkDetailForm.hide();
		talkUpdateForm.show();
	}

	export function showTalkDetailForm()
	{
		talkListForm.hide();
		talkDetailForm.show();
		talkUpdateForm.hide();
	}

	export function onClickBtnCreateTalk()
	{
		modalCreateTalk.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		initCreateTalkModal();
	}

	export function initSearchTalkForm()
	{
		chkNoticeType.eq(0).prop('checked', true);
		chkNoticeType.eq(1).prop('checked', true);
		chkNoticeType.eq(2).prop('checked', true);
		searchTalkDateFrom.datepicker("setDate", "-6D");
		searchTalkDateTo.datepicker("setDate", "today");
		initDayBtn();
	}

	export function onChangeSearchTalkDateFrom()
	{
		searchTalkDateTo.datepicker("option", "minDate", new Date(searchTalkDateFrom.datepicker("getDate")));
		initDayBtn();
	}

	export function onChangeSearchTalkDateTo()
	{
		searchTalkDateFrom.datepicker("option", "maxDate", new Date(searchTalkDateTo.datepicker("getDate")));
		initDayBtn();
	}

	export function onClickChkNoticeTalk()
	{
		const isChecked = chkNoticeTalk.is(':checked');
		chkSpecialNoticeTalk.prop('disabled', !isChecked);
		chkSpecialNoticeTalk.prop('checked', false);
	}

	export function onClickChkUpdateNoticeTalk()
	{
		const isChecked = chkUpdateNoticeTalk.is(':checked');
		chkUpdateSpecialNoticeTalk.prop('disabled', !isChecked);
		chkUpdateSpecialNoticeTalk.prop('checked', false);
	}

	export function initCreateTalkModal()
	{
		talk.trigger('focus');
		talk.val('');
		rdoAttachType.eq(0).prop('checked', true);
		chkNoticeTalk.prop('checked', false);
		chkSpecialNoticeTalk.prop('checked', false);
		chkSpecialNoticeTalk.prop('disabled', true);
		onChangeAttachType();
	}

	let g_is_blind_talk;
	export function onSubmitBlindTalk(obj)
	{
		g_is_blind_talk = $(obj).hasClass('btn-blind') ? 'Y' : 'N';
		const msg = $(obj).hasClass('btn-blind') ? message.blind : message.display;
		sweetConfirm(msg, blindTalkRequest);
	}

	function blindTalkRequest()
	{
		const param = {
			"is_blind" : g_is_blind_talk,
			"board" : [g_board_uuid],
			"board_comment" : [],
			"action_comment" : []
		}

		ajaxRequestWithJson(true, api.blindTalk, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, getDetailTalk);
			})
			.catch(reject => sweetError(`블라인드${message.ajaxError}`));
	}

	export function onSubmitSearchTalk()
	{
		const table = talkTable.DataTable();
		table.page.len(Number(selTalkPageLength.val()));
		table.ajax.reload();
		initDayBtn();
	}

	export function buildTalkTable()
	{
		talkTable.DataTable({
			ajax : {
				url: api.talkList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					let noticeType = [];
					chkNoticeType.each(function () {
						if ($(this).is(':checked'))
							noticeType.push($(this).val())
					})
					const param = {
						"doit_uuid": g_doit_uuid,
						"date_type" : selTalkDateType.val(),
						"from_date" : searchTalkDateFrom.val(),
						"to_date" : searchTalkDateTo.val(),
						"notice_type" : noticeType,
						"page" : (d.start / d.length) + 1,
						"limit" : Number(selTalkPageLength.val())
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분",    	data: "is_important",  	width: "10%",
					render: function (data, type, row, meta) {
						switch (data) {
							case 'Y' :
								return label.specialNotice;
							default :
								return row.is_notice === 'Y' ? label.notice : label.general;
						}
					}
				}
				,{title: "작성자",    data: "nickname",  		width: "15%",
					render: function (data, type, row, meta) {
						return row.is_company === 'Y' ? label.bizIcon + data : data;
					}
				}
				,{title: "내용", 	data: "board_body",		width: "25%",
					render: function (data, type, row, meta) {
						return `<a data-idx="${row.idx}" data-notice="${row.is_notice}" class="line-clamp-1" style="max-width: 400px;">${isEmpty(data) ? label.dash : data}</a>`;
					}
				}
				,{title: "댓글수", 	data: "comment_cnt",	width: "5%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "좋아요",    data: "like_count",  	width: "5%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "작성일",    data: "created",  		width: "15%",
					render: function (data, type, row, meta) {
						return data.substring(0, 10);
					}
				}
				,{title: "블라인드",   data: "is_blind",  	width: "5%" }
				,{title: "삭제",   	data: "is_del",  		width: "5%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selTalkPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				if (aData.is_del === 'Y')
					$(nRow).addClass('text-danger');

				$(nRow).children().eq(2).find('a').on('click', function () { onClickDetailTalk(this); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	const g_talk_comment_page_length = 10;
	let g_param_view_page_length = 10;
	let g_talk_comment_last_idx = 0;
	let g_talk_comment_page_num = 1;
	let g_talk_comment_page_size = 1;
	let g_talk_idx;
	function onClickDetailTalk(obj)
	{
		g_talk_idx = $(obj).data('idx');
		g_param_view_page_length = 10;
		g_talk_comment_page_num = 1;
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		showTalkDetailForm();
		getDetailTalk();
	}

	function getDetailTalk()
	{
		const param = { "idx" : g_talk_idx };

		ajaxRequestWithJson(true, api.detailTalk, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
				 	await buildTalkDetail(data);
					await getTalkComments();
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_board_uuid;
	let g_talk_attach_type;
	function buildTalkDetail(data)
	{
		const {board_uuid, created, nickname, is_company, board_body, comment_cnt, like_count, is_notice, is_important, is_blind, is_del, contents_type,} = data.data;

		g_board_uuid = board_uuid;
		g_talk_attach_type = contents_type;

		infoTalkNickname.html(is_company === 'Y' ? label.bizIcon + nickname : nickname);
		infoTalkCreated.text(created);
		infoTalkIsBlind.text(is_blind);
		isDel.text(is_del);
		infoTalkCommentCount.text(comment_cnt);
		infoTalkLikeCount.text(like_count);
		infoTalkContent.text(board_body);
		infoTalkAttachWrap.html(buildTalkAttachWrap(data));
		if (is_del === 'Y')
		{
			btnDeleteTalk.remove();
			btnUpdateTalk.remove();
			btnDisplayTalk.remove();
			btnBlindTalk.remove()
		}
		else
		{
			if (is_company === 'Y')
			{
				btnDeleteTalk.show();
				btnUpdateTalk.show();
				btnDisplayTalk.hide();
				btnBlindTalk.hide()
			}
			else
			{
				btnDeleteTalk.hide();
				btnUpdateTalk.hide();

				if (is_blind === 'Y')
				{
					btnDisplayTalk.show();
					btnBlindTalk.hide()
				}
				else
				{
					btnDisplayTalk.hide();
					btnBlindTalk.show()
				}
			}
		}

		/** 수정폼 **/
		updateTalk.val(board_body);
		rdoUpdateAttachType.each(function () {
			$(this).prop('checked', $(this).val() === contents_type);
		})
		buildUpdateAttachWrap(data);
		chkUpdateNoticeTalk.prop('checked', is_notice === 'Y');
		chkUpdateSpecialNoticeTalk.prop('disabled', is_notice === 'N');
		chkUpdateSpecialNoticeTalk.prop('checked', is_important === 'Y');
		calculateInputLength();
		onErrorImage();

		$(".view-detail-talk-attach").on('click', function () { onClickTalkAttach(this); });
	}

	function getTalkComments(_pageLength)
	{
		const param = {
			"board_uuid" : g_board_uuid,
			"size" : isEmpty(_pageLength) ? g_talk_comment_page_length : g_param_view_page_length,
			"last_idx" : g_talk_comment_last_idx
		};

		ajaxRequestWithJson(false, api.talkCommentList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildTalkComments(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`댓글 목록${message.ajaxLoadError}`));
	}

	function buildTalkComments(data)
	{
		if ($('#btnViewMoreTalkComment').length > 0) $('#btnViewMoreTalkComment').remove();

		if (!isEmpty(data.data) && data.data.length > 0)
		{
			g_talk_comment_page_size = Math.ceil(Number(data.count)/g_talk_comment_page_length);

			data.data.map((obj, index, arr) => {
				const {idx, comment_uuid, created, nickname, is_company, profile_uuid, comment_body, is_del, is_blind, comment_cnt, recomment_data, attach, emoticon } = obj;
				const parent_comment_uuid = comment_uuid;
				if (arr.length - 1 === index)
					g_talk_comment_last_idx = idx;

				const isDel = is_del === 'Y';
				const delComment = '<p class="text-danger">삭제된 댓/답글입니다.</p>';
				const btnBlindComment = isDel ? delComment : is_blind === 'Y'
					? `<button type="button" class="btn-xs btn-orange btn-display-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
					: `<button type="button" class="btn-xs btn-warning btn-blind-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
				const btnDeleteCommentEl = isDel ? delComment : `<button type="button" class="btn-xs btn-danger btn-delete-talk-comment" data-uuid="${comment_uuid}">삭제</button>`;
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
							${(isSponsorDoit) ? buildCreateReply({parent_comment_uuid, profile_uuid, nickname, is_company}) : ''}
						</div>
			
						<div class="comments-wrap">
							<ul>
								${(recomment_data.length > 0) ? buildReplyComment({recomment_data, comment_cnt}) : ''}
							</ul>
						</div>
					</div>`

				talkCommentWrap.append(commentEl);
			})

			buildTalkCommentPagination();
		}
		else
		{
			talkCommentWrap.html(`<div class="card"><p class="message">작성된 댓글이 없습니다.</p></div>`);
		}

		$('.length-input').on("propertychange change keyup paste input", function () { limitInputLength(this); });
		$('.btn-reply-talk').on('click', function () { onClickModalReplyTalkOpen(this); });
		$('.btn-talk-reply-close').on('click', function () { onClickModalReplyTalkClose(); });
		$('#btnViewMoreTalkComment').on('click', function () { onClickViewMoreTalkComment(); });
		$('.btn-submit-reply-talk').on('click', function () { onSubmitTalkReply(this); });
		$('.btn-delete-talk-comment').on('click', function () { onSubmitDeleteTalkComment(this); });
		$('.btn-blind-comment').on('click', function () { onClickBtnBlindComment(this); });
		$('.btn-display-comment').on('click', function () { onClickBtnBlindComment(this); });
		$('.btn-viewmore-reply').on('click', function () { onClickBtnViewMoreReply(this); });
		$('.comment-attach-wrap').on('click', function () { onClickAttachComment(this); });
		$('.rdo-reply-attach-type').on('change', function () { onChangeReplyAttachType(this); });
		$('.btn-reply-emoji').on('click', function () { onClickBtnReplyEmoji(this); });
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
					: `<div class="img-wrap comment-attach-wrap" data-type="${contents_type}" data-url="${contents_url}"><img src="${thumbnail_url}" alt="첨부 파일"></div>`;
			})
		}

		return attachElement;
	}

	function onClickAttachComment(obj)
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

	function buildTalkCommentPagination()
	{
		let btnViewMoreEl = ''
		if ($('#btnViewMoreTalkComment').length === 0 && g_talk_comment_page_num !== g_talk_comment_page_size)
			btnViewMoreEl =
				`<button id="btnViewMoreTalkComment" type="button" class="btn-more">더보기(${g_talk_comment_page_num}/${g_talk_comment_page_size}) 
					<i class="fas fa-sort-down"></i>
				</button>`;

		talkCommentWrap.append(btnViewMoreEl);
	}

	function onClickViewMoreTalkComment()
	{
		g_talk_comment_page_num++
		g_param_view_page_length += 10;
		getTalkComments();
	}

	function buildReplyComment({recomment_data, comment_cnt})
	{
		let repliesEl = ''
		recomment_data.slice(0).reverse().map((obj, index, arr) => {
			const {comment_uuid, is_del, is_blind, is_company, parent_comment_uuid, created, nickname, profile_uuid, comment_body, emoticon, attach} = obj;

			const isDel = is_del === 'Y';
			const delComment = '<p class="text-danger">삭제된 댓/답글입니다.</p>';
			const isBlindReply = is_blind === 'Y';
			const btnBlindReply = isDel ? delComment : isBlindReply
				? `<button type="button" class="btn-xs btn-orange btn-display-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
				: `<button type="button" class="btn-xs btn-warning btn-blind-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
			const btnDeleteReply = isDel ? delComment : `<button type="button" class="btn-xs btn-danger btn-delete-talk-comment" data-uuid="${comment_uuid}">삭제</button>`;
			const lastIdx = recomment_data[arr.length - 1].idx;

			if (comment_cnt > 5 && index ===0)
				repliesEl +=
					`<button type="button"
							 class="btn-more btn-viewmore-reply"
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
					${buildReplyEmoticon(emoticon)}
					${buildReplyAttachment(attach)}
					${buildReplyBody(comment_body)}
					<div class="add-comments">
						${isSponsorDoit ? buildCreateReply({parent_comment_uuid, profile_uuid, nickname, is_company}) : ''}
					</div>
				</li>`
		})

		return repliesEl;
	}

	function buildReplyBody(comment)
	{
		return isEmpty(comment) ? '' : `<div class="detail-data">${comment}</div>`;
	}

	function buildReplyEmoticon(emoticon)
	{
		let emojiElement = '';
		if (!isEmpty(emoticon) && emoticon.length > 0)
			emoticon.map(obj => emojiElement += `<div class="emoticon-view-wrap"><img src="${obj.emoticon_file_url}" alt="이모티콘"></div>`);

		return emojiElement;
	}

	function buildReplyAttachment(attach)
	{
		let attachElement = '';
		if (!isEmpty(attach) && attach.length > 0)
		{
			attach.map(obj => {
				const {contents_type, contents_url, thumbnail_url} = obj;
				attachElement += contents_type === label.audio
					? `<audio controls="controls"><source src="${contents_url}"/></audio>`
					: `<div class="img-wrap comment-attach-wrap" data-type="${contents_type}" data-url="${contents_url}"><img src="${thumbnail_url}" alt="첨부 파일"></div>`;
			})
		}

		return attachElement;
	}

	let appendReplyTarget;
	function onClickBtnViewMoreReply(obj)
	{
		appendReplyTarget = $(obj);

		const param = {
			"parent_comment_uuid" : $(obj).data('parent'),
			"last_idx" : $(obj).data('last'),
			"size" : $(obj).data('size')
		}

		ajaxRequestWithJson(true, api.talkReplyList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? appendReply(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`답글 목록${message.ajaxLoadError}`));
	}

	function appendReply(data)
	{
		let appendReplyEl = ''
		data.data.slice(0).reverse().map(obj => {
			const {comment_uuid, is_del, is_blind, is_company, created, nickname, comment_body, emoticon, attach} = obj;
			const isDel = is_del === 'Y';
			const delComment = '<p class="text-danger">삭제된 댓/답글입니다.</p>';
			const isBlindReply = is_blind === 'Y';
			const btnBlindReply = isDel ? delComment : isBlindReply
				? `<button type="button" class="btn-xs btn-orange btn-display-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
				: `<button type="button" class="btn-xs btn-warning btn-blind-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
			const btnDeleteReply = isDel ? delComment : `<button type="button" class="btn-xs btn-danger btn-delete-talk-comment" data-uuid="${comment_uuid}">삭제</button>`;

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
					${buildReplyEmoticon(emoticon)}
					${buildReplyAttachment(attach)}
					${buildReplyBody(comment_body)}
				</li>`
		})

		appendReplyTarget.after(appendReplyEl);
		appendReplyTarget.remove();
		$('.btn-delete-talk-comment').on('click', function () { onSubmitDeleteTalkComment(this); });
		$('.btn-blind-comment').on('click', function () { onClickBtnBlindComment(this); });
		$('.btn-display-comment').on('click', function () { onClickBtnBlindComment(this); });
	}

	function buildCreateReply({parent_comment_uuid, profile_uuid, nickname, is_company})
	{
		const uuid = uuidv4();
		return (
			`<a class="link btn-reply-talk">답글달기</a>
				<!-- 답글달기 -->
				<div class="modal-content comments-creat">
					<div class="modal-header clearfix">
						<h5>답글달기</h5>
						<i class="modal-close btn-talk-reply-close">×</i>
					</div>
					<div class="modal-body">
						<table class="detail-table reply-talk-table">
							<colgroup>
								<col style="width: 20%;">
								<col style="width: 70%;">
							</colgroup>
							<tr>
								<td colspan="2">
									<div class="textarea-wrap">
										<textarea class="length-input reply-talk" maxlength="200" rows="4" placeholder="답글을 입력해주세요."></textarea>
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
										<input id="r${uuid}a" type="radio" class="rdo-reply-attach-type" name="${uuid}" value="" checked>
										<label for="r${uuid}a"><span></span>첨부파일 없음</label>
	
										<input id="r${uuid}b" type="radio" class="rdo-reply-attach-type" name="${uuid}" value="image">
										<label for="r${uuid}b"><span></span>사진</label>
	
										<input id="r${uuid}c" type="radio" class="rdo-reply-attach-type" name="${uuid}" value="video">
										<label for="r${uuid}c"><span></span>영상</label>
	
										<input id="r${uuid}d" type="radio" class="rdo-reply-attach-type" name="${uuid}" value="audio">
										<label for="r${uuid}d"><span></span>음성</label>
	
										<i class="far fa-smile emoticon-open_btn btn-reply-emoji"
											data-radio="${uuid}"
											data-emoji="${uuid}Emoji"
											data-preview="${uuid}Preview"
											data-cancel="${uuid}Cancel"></i>
									</div>
									<div class="reply-attachment-wrap"></div>
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
												class="btn-sm btn-primary btn-submit-reply-talk"
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

	function onClickModalReplyTalkOpen(obj)
	{
		$('.modal-content').hide();
		$(obj).siblings('.modal-content').fadeIn();
		$(obj).siblings('.modal-content').find('.reply-talk').trigger('focus');
		$(obj).siblings('.modal-content').find('.reply-talk').val('');
	}

	function onClickModalReplyTalkClose()
	{
		$('.modal-content').fadeOut();
	}

	let g_talk_reply_parent_uuid;
	let g_talk_reply_target_profile_uuid;
	let g_talk_reply_target_nickname;
	let g_talk_reply_value;
	let g_talk_reply_company;
	let replyFileElement;
	let paramReplyAttachType = '';
	function onSubmitTalkReply(obj)
	{
		const replyEl = $(obj).parents('.reply-talk-table');
		g_talk_reply_parent_uuid = $(obj).data('parent');
		g_talk_reply_target_profile_uuid = $(obj).data('profile');
		g_talk_reply_target_nickname = $(obj).data('nickname');
		g_talk_reply_company = $(obj).data('company');
		g_talk_reply_value = $(replyEl).find('.reply-talk').val();

		const rdoAttachElement = $(`input[name=${$(obj).data('radio')}]`);
		paramReplyAttachType = $(`input[name=${$(obj).data('radio')}]:checked`).val();
		const replyAttachWrap = $(rdoAttachElement).parent().siblings('.reply-attachment-wrap');
		replyFileElement = $(replyAttachWrap).find('input[type=file]');
		previewReplyEmojiWrap = $(`#${$(obj).data('preview')}`);

		let fileCount = 0;
		if (replyFileElement.length > 0)
		{
			replyFileElement.each(function (index, element) {
				fileCount += element.files.length;
			})
		}

		if (replyFileElement.length !== fileCount)
		{
			sweetToast(`파일을 ${message.addOn}`);
			return;
		}

		if (isEmpty(g_talk_reply_value) && !isDisplay(previewReplyEmojiWrap) && fileCount === 0)
		{
			sweetToast(`답글 또는 이모티콘/첨부파일은 ${message.required}`);
			return;
		}

		const callback = isEmpty(paramReplyAttachType) ? createReplyTalkCommentReq : createTalkReplyAttachReq;
		sweetConfirm(message.create, callback);
	}

	function createTalkReplyAttachReq()
	{
		let param  = new FormData();
		switch (replyFileElement.length) {
			case 1 :
				replyFileElement.each(function (index, element) {
					param.append('main_attach', $(element)[0].files[0]);
				})
				break;
			case 2 :
				replyFileElement.each(function (index, element) {
					if (index === 0) param.append('sub_attach', $(element)[0].files[0]);
					if (index === 1) param.append('main_attach', $(element)[0].files[0]);
				})
				break;
			default :

		}
		ajaxRequestWithFile(true, fileApiV2.double, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createReplyTalkCommentReq(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`첨부파일 등록${message.ajaxError}`));
	}

	function createReplyTalkCommentReq(data)
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"board_uuid" : g_board_uuid,
			"comment" : g_talk_reply_company === 'Y' ? g_talk_reply_value.trim() : `@${g_talk_reply_target_nickname} ${g_talk_reply_value.trim()}`,
			"mention" : [{ "profile_uuid": g_talk_reply_target_profile_uuid, "nickname": g_talk_reply_target_nickname}],
			"parent_comment_uuid" : g_talk_reply_parent_uuid,
		}

		if (!isEmpty(data))
		{
			const talkAttachObj = {
				"contents_type" : paramReplyAttachType,
				"path" : data.image_urls.main_attach
			}

			if (paramReplyAttachType === label.video)
				talkAttachObj['thumbnail_path'] = data.image_urls.sub_attach;

			param["attach"] = [talkAttachObj];
		}

		if (isDisplay(previewReplyEmojiWrap))
		{
			const targetPreview = $(previewReplyEmojiWrap).find('.emoticon-view');
			param["emoticon"] = [{
				"category_id": targetPreview.data('category'),
				"emoticon_id": targetPreview.data('imojiid'),
				"emoticon_file_url": targetPreview.data('url'),
			}]
		}

		ajaxRequestWithJson(true, api.createTalkComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				sweetToastAndCallback(data, createReplyTalkCommentSuccess);
			})
			.catch(reject => sweetError(`답글 등록${message.ajaxError}`));
	}

	function createReplyTalkCommentSuccess()
	{
		onClickModalReplyTalkClose();
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getTalkComments(g_param_view_page_length);
		increaseCommentCountWithoutRequest();
		onSubmitSearchTalk();
	}

	let g_delete_talk_comment_uuid;
	function onSubmitDeleteTalkComment(obj)
	{
		g_delete_talk_comment_uuid = $(obj).data('uuid');
		sweetConfirm(message.delete, actionCommentDeleteRequest);
	}

	function actionCommentDeleteRequest()
	{
		const param = { "comment_uuid" : g_delete_talk_comment_uuid }

		ajaxRequestWithJson(true, api.deleteTalkComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				sweetToastAndCallback(data, deleteTalkCommentSuccess);
			})
			.catch(reject => sweetError(`댓글 삭제${message.ajaxError}`));
	}

	function deleteTalkCommentSuccess()
	{
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getTalkComments(g_param_view_page_length);
		decreaseCommentCountWithoutRequest();
		onSubmitSearchTalk();
	}

	let g_is_blind_comment;
	let g_comment_uuid;
	let btn_id;
	function onClickBtnBlindComment(obj)
	{
		btn_id = obj.id;
		g_is_blind_comment = $(obj).hasClass('btn-blind-comment') ? 'Y' : 'N';
		g_comment_uuid = $(obj).data('uuid');
		const msg = $(obj).hasClass('btn-blind-comment') ? message.blind : message.display;
		sweetConfirm(msg, blindCommentRequest);
	}

	function blindCommentRequest()
	{
		const param = {
			"is_blind" : g_is_blind_comment,
			"board" : [],
			"board_comment" : [g_comment_uuid],
			"action_comment" : []
		}

		ajaxRequestWithJson(true, api.blindTalk, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				sweetToastAndCallback(data, blindCommentSuccess);
			})
			.catch(reject => sweetError(`블라인드${message.ajaxError}`));
	}

	function blindCommentSuccess()
	{
		const btnEl = $(`#${btn_id}`);
		if (g_is_blind_comment === 'Y')
		{
			btnEl.removeClass('btn-warning btn-blind-comment');
			btnEl.addClass('btn-orange btn-display-comment');
			btnEl.html(`<i class="fas fa-eye"></i> 블라인드 해제`);
		}
		else
		{
			btnEl.removeClass('btn-orange btn-display-comment');
			btnEl.addClass('btn-warning btn-blind-comment');
			btnEl.html(`<i class="fas fa-eye-slash"></i> 블라인드 처리`);
		}
	}

	export function onClickBtnCommentEmoji()
	{
		if (isDisplay(commentEmojiWrap))
		{
			commentEmojiWrap.hide();
			rdoCommentAttachType.prop('disabled', false);
		}
		else
		{
			const hasCommentAttachThumbnail = $("#commentAttachThumbnail").length > 0 && $("#commentAttachThumbnail")[0].files.length > 0
			const hasCommentAttachment = $("#commentAttachment").length > 0 && $("#commentAttachment")[0].files.length > 0;
			(hasCommentAttachThumbnail || hasCommentAttachment)
				? sweetConfirm( '첨부 파일을 삭제하고 이모티콘을 추가합니다.', openEmojiWarp)
				: openEmojiWarp();
		}
	}

	function openEmojiWarp()
	{
		rdoCommentAttachType.eq(0).prop('checked', true);
		onChangeCommentAttachType();
		rdoCommentAttachType.prop('disabled', true);
		commentEmojiWrap.show();
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
			commentEmojiCategory.empty();
			data.data.map((category, index) => {
				const {category_id, category_image_url, category_title, emoticon} = category;
				const liElement = `<li class="${index === 0 ? 'active': ''}" data-category="${category_id}"><img src="${category_image_url}" alt="${category_title}"></li>`;
				commentEmojiCategory.append(liElement);
				commentEmojis.push({
					"category_id" : category_id,
					"emojis" : emoticon
				})
			})

			onClickEmojiCategory(commentEmojiCategory.children().eq(0));
			commentEmojiCategory.children().off().on('click', function () { onClickEmojiCategory(this); });
		}
		else
			commentEmojis = [];
	}

	function onClickEmojiCategory(obj)
	{
		commentEmojiCategory.children().removeClass('active');
		$(obj).addClass('active');

		const targetElement = commentEmojiCategory.siblings('.emoticon-list');
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
		commentEmojiWrap.hide();
		const targetPreview = previewEmoji.find('.emoticon-view');
		targetPreview.attr('src', $(obj).data('url'));
		targetPreview.attr('data-imojiid', $(obj).data('imojiid'));
		targetPreview.attr('data-category', $(obj).data('category'));
		targetPreview.attr('data-url', $(obj).data('url'));
		previewEmoji.show();
	}

	export function onClickBtnCancelCommentEmoji()
	{
		rdoCommentAttachType.eq(0).prop('checked', true);
		onChangeCommentAttachType();
		rdoCommentAttachType.prop('disabled', false);
		previewEmoji.hide();
		const targetPreview = previewEmoji.find('.emoticon-view');
		targetPreview.attr('src', '');
		targetPreview.attr('data-imojiid', '')
		targetPreview.attr('data-category', '')
		targetPreview.attr('data-url', '')
	}

	let replyEmojiCategoryElement;
	let rdoReplyAttachType;
	let replyEmojiWrap;
	let previewReplyEmojiWrap;
	let btnCancelPreviewReplyEmoji;
	function onClickBtnReplyEmoji(obj)
	{
		rdoReplyAttachType = $(`input[name=${$(obj).data('radio')}]`);
		replyEmojiWrap = $(`#${$(obj).data('emoji')}`);
		previewReplyEmojiWrap = $(`#${$(obj).data('preview')}`);
		btnCancelPreviewReplyEmoji = $(`#${$(obj).data('cancel')}`);
		replyEmojiCategoryElement = replyEmojiWrap.children('.emoticon-tab');

		if (isDisplay(replyEmojiWrap))
		{
			replyEmojiWrap.hide();
			rdoReplyAttachType.prop('disabled', false);
		}
		else
		{
			const replyAttachWrap = $(obj).parent().siblings('.reply-attachment-wrap');
			const fileElement = $(replyAttachWrap).find('input[type=file]');

			let hasFile = false;
			if (fileElement.length > 0)
			{
				fileElement.each(function (index, element) {
					if (element.files.length > 0) hasFile = true;
				})
			}

			hasFile ? sweetConfirm( '첨부 파일을 삭제하고 이모티콘을 추가합니다.', openReplyEmoji) : openReplyEmoji();
		}
	}

	function openReplyEmoji()
	{
		rdoReplyAttachType.eq(0).prop('checked', true);
		onChangeReplyAttachType(rdoReplyAttachType);
		rdoReplyAttachType.prop('disabled', true);
		replyEmojiWrap.show();
		getEmoji(buildReplyEmojis)
	}

	function buildReplyEmojis(data)
	{
		if (!isEmpty(data) && data.data.length > 0)
		{
			replyEmojiCategoryElement.empty();
			data.data.map((category, index) => {
				const {category_id, category_image_url, category_title, emoticon} = category;
				const liElement = `<li class="${index === 0 ? 'active': ''}" data-category="${category_id}"><img src="${category_image_url}" alt="${category_title}"></li>`;
				replyEmojiCategoryElement.append(liElement);
				commentEmojis.push({
					"category_id" : category_id,
					"emojis" : emoticon
				})
			})

			onClickReplyEmojiCategory(replyEmojiCategoryElement.children().eq(0));
			replyEmojiCategoryElement.children().off().on('click', function () { onClickReplyEmojiCategory(this); });
		}
		else
			commentEmojis = [];
	}

	function onClickReplyEmojiCategory(obj)
	{
		replyEmojiCategoryElement.children().removeClass('active');
		$(obj).addClass('active');

		const targetElement = replyEmojiCategoryElement.siblings('.emoticon-list');
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

					targetElement.children().off().on('click', function () { onClickReplyEmoji(this); });
				}
			})
		}
	}

	function onClickReplyEmoji(obj)
	{
		replyEmojiWrap.hide();
		const targetPreview = $(previewReplyEmojiWrap).find('.emoticon-view');
		targetPreview.attr('src', $(obj).data('url'));
		targetPreview.attr('data-imojiid', $(obj).data('imojiid'));
		targetPreview.attr('data-category', $(obj).data('category'));
		targetPreview.attr('data-url', $(obj).data('url'));
		previewReplyEmojiWrap.show();
		btnCancelPreviewReplyEmoji.off().on('click', function () { onClickBtnCancelPreviewReplyEmoji(); });
	}

	function onClickBtnCancelPreviewReplyEmoji()
	{
		rdoReplyAttachType.eq(0).prop('checked', true);
		onChangeReplyAttachType();
		rdoReplyAttachType.prop('disabled', false);
		previewReplyEmojiWrap.hide();
		const targetPreview = $(previewReplyEmojiWrap).find('.emoticon-view');
		targetPreview.attr('src', '');
		targetPreview.attr('data-imojiid', '')
		targetPreview.attr('data-category', '')
		targetPreview.attr('data-url', '')
	}

	export function onSubmitTalkComment()
	{
		const fileElement = commentAttachmentWrap.find("input[type=file]");
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

		if (isEmpty(commentTalk.val()) && !isDisplay(previewEmoji) && fileCount === 0)
		{
			sweetToast(`댓글 또는 이모티콘/첨부파일은 ${message.required}`);
			return false;
		}

		const callback = isEmpty(getCommentAttachType()) ? createTalkCommentRequest : createTalkCommentAttachRequest;
		sweetConfirm(message.create, callback);
	}

	function createTalkCommentAttachRequest()
	{
		let param  = new FormData();
		param.append('main_attach', $("#commentAttachment")[0].files[0]);
		if (getCommentAttachType() === label.video)
			param.append('sub_attach', $("#commentAttachThumbnail")[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.double, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createTalkCommentRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`첨부파일 등록${message.ajaxError}`));
	}

	function createTalkCommentRequest(data)
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"board_uuid" : g_board_uuid,
			"comment" : commentTalk.val().trim(),
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

		if (isDisplay(previewEmoji))
		{
			const targetPreview = previewEmoji.find('.emoticon-view');
			param["emoticon"] = [{
				"category_id": targetPreview.data('category'),
				"emoticon_id": targetPreview.data('imojiid'),
				"emoticon_file_url": targetPreview.data('url'),
			}]
		}

		ajaxRequestWithJson(true, api.createTalkComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				sweetToastAndCallback(data, createTalkCommentSuccess);
			})
			.catch(reject => sweetError(`댓글 등록${message.ajaxError}`));
	}

	function createTalkCommentSuccess()
	{
		rdoCommentAttachType.prop('disabled', false);
		rdoCommentAttachType.eq(0).prop('checked', true);
		onChangeCommentAttachType();
		previewEmoji.hide();
		commentTalk.val('');
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getTalkComments(g_param_view_page_length);
		increaseCommentCountWithoutRequest();
		onSubmitSearchTalk();
	}

	function initTalkCommentLastIdx()
	{
		g_talk_comment_last_idx = 0;
	}

	function initTalkCommentWrap()
	{
		talkCommentWrap.empty();
	}

	export function onSubmitTalk()
	{
		if (createTalkValid())
		{
			const callback = isEmpty(getAttachType()) ? createTalkRequest : createTalkAttachRequest;
			sweetConfirm(message.create, callback);
		}
	}

	function createTalkValid()
	{
		if (isEmpty(talk.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			talk.trigger('focus');
			return false;
		}

		const talkAttachThumbnail = $("#talkAttachThumbnail");
		if (getAttachType() === label.video && talkAttachThumbnail[0].files.length === 0)
		{
			sweetToast(`영상 썸네일은 ${message.required}`);
			return false;
		}

		const talkAttachment = $("#talkAttachment");
		if (!isEmpty(getAttachType()) && talkAttachment[0].files.length === 0)
		{
			sweetToast(`첨부 파일은 ${message.required}`);
			return false;
		}

		return true;
	}

	function createTalkAttachRequest()
	{
		let param  = new FormData();
		param.append('main_attach', $("#talkAttachment")[0].files[0]);
		if (getAttachType() === label.video)
			param.append('sub_attach', $("#talkAttachThumbnail")[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.double, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createTalkRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function createTalkRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const param = {
				"doit_uuid" : g_doit_uuid,
				"board_body" : talk.val().trim(),
				"is_notice" : chkNoticeTalk.is(":checked") ? 'Y' : 'N',
				"is_important" : chkSpecialNoticeTalk.is(":checked") ? 'Y' : 'N',
			}

			if (!isEmpty(data))
			{
				const talkAttachObj = {
					"contents_type" : getAttachType(),
					"path" : data.image_urls.main_attach
				}

				if (getAttachType() === label.video)
					talkAttachObj['thumbnail_path'] = data.image_urls.sub_attach;

				param["attach"] =  talkAttachObj;
			}

			ajaxRequestWithJson(true, api.createTalk, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, createTalkSuccess);
				})
				.catch(reject => sweetError(label.submit + message.ajaxError));
		}
	}

	function createTalkSuccess()
	{
		fadeoutModal();
		buildTalkTable();
	}

	export function onSubmitDeleteTalk()
	{
		sweetConfirm(message.delete, deleteTalkRequest)
	}

	function deleteTalkRequest()
	{
		const param = { "board_uuid" : g_board_uuid }

		ajaxRequestWithJson(true, api.deleteTalk, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, deleteTalkSuccess);
			})
			.catch(reject => sweetError(label.delete + message.ajaxError));
	}

	function deleteTalkSuccess()
	{
		showTalkListForm();
		onSubmitSearchTalk();
	}

	export function onSubmitUpdateTalk()
	{
		if (updateTalkValid())
		{
			const callback = isEmpty(getUpdateAttachType()) ? updateTalkRequest : updateTalkAttachRequest;
			sweetConfirm(message.modify, callback);
		}
	}

	function updateTalkValid()
	{
		if (isEmpty(updateTalk.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			updateTalk.trigger('focus');
			return false;
		}

		const updateTalkAttachThumbnail = $("#updateTalkAttachThumbnail");
		const isChangeAttachType = g_talk_attach_type !== getUpdateAttachType();
		if (isChangeAttachType && (getUpdateAttachType() === label.video) && updateTalkAttachThumbnail[0].files.length === 0)
		{
			sweetToast(`영상 썸네일은 ${message.required}`);
			return false;
		}

		const updateTalkAttachment = $("#updateTalkAttachment");
		if (isChangeAttachType && (!isEmpty(getUpdateAttachType())) && updateTalkAttachment[0].files.length === 0)
		{
			sweetToast(`첨부 파일은 ${message.required}`);
			return false;
		}

		return true;
	}

	function updateTalkAttachRequest()
	{
		let param  = new FormData();
		param.append('main_attach', $("#updateTalkAttachment")[0].files[0]);
		if (getUpdateAttachType() === label.video)
			param.append('sub_attach', $("#updateTalkAttachThumbnail")[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.double, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? updateTalkRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function updateTalkRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const param = {
				"doit_uuid" : g_doit_uuid,
				"board_uuid" : g_board_uuid,
				"board_body" : updateTalk.val().trim(),
				"is_notice" : chkUpdateNoticeTalk.is(':checked') ? 'Y' : 'N',
				"is_important" : chkUpdateSpecialNoticeTalk.is(':checked') ? 'Y' : 'N',
				"is_attached" : isEmpty(getUpdateAttachType()) ? 'N' : 'Y',
			}

			if (!isEmpty(data))
			{
				const talkAttachObj = {
					"contents_type" : getUpdateAttachType(),
					"path" : data.image_urls.main_attach
				}

				if (getUpdateAttachType() === label.video)
					talkAttachObj['thumbnail_path'] = data.image_urls.sub_attach;

				param["attach"] =  talkAttachObj;
			}

			ajaxRequestWithJson(true, api.updateTalk, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateTalkSuccess);
				})
				.catch(reject => sweetError(label.modify + message.ajaxError));
		}
	}

	function updateTalkSuccess()
	{
		onSubmitSearchTalk();
		showTalkDetailForm();
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getDetailTalk();
	}

	function buildTalkAttachWrap(data)
	{
		const {contents_type, contents_url, thumbnail_url} = data.data;
		switch (contents_type) {
			case label.image :
				return `<div class="detail-img-wrap talk-file-img view-detail-talk-attach" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${contents_url}" alt="">
						</div>`;
			case label.audio :
				return `<audio controls><source src="${contents_url}"></audio>`;
			case label.video :
				return `<div class="detail-img-wrap talk-file-img view-detail-talk-attach" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${thumbnail_url}" alt="">
						</div>`;
			default :
				return label.dash;
		}
	}

	function onClickTalkAttach(obj)
	{
		modalAttachContentWrap.empty();
		modalAttach.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();

		switch ($(obj).data('type')) {
			case label.image :
				modalAttachContentWrap.html(`<div class="image-wrap"><img src="${$(obj).data('url')}" alt=""></div>`);
				break;
			case label.video :
				modalAttachContentWrap.html(`<div class="video-wrap"><video controls><source src="${$(obj).data('url')}"></video></div>`);
				break;
		}

		onErrorImage();
	}

	export function onChangeAttachType()
	{
		let attachEl = '';
		switch (getAttachType()) {
			case label.image :
				attachEl =
					`<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="talkAttachment">업로드</label>
						<input type="file" id="talkAttachment" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>`;
				talkAttachmentWrap.html(attachEl);
				$("#talkAttachment").on('change', function () { onChangeValidateImage(this); });
				break;
			case label.video :
				attachEl =
					`<p class="desc-sub">썸네일</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="talkAttachThumbnail">업로드</label>
						<input type="file" id="talkAttachThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="talkAttachment">업로드</label>
						<input type="file" id="talkAttachment" class="upload-hidden">
					</div>`;
				talkAttachmentWrap.html(attachEl);
				$("#talkAttachThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#talkAttachment").on('change', function () { onChangeValidationVideo(this); });
				break;
			case label.audio :
				attachEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="talkAttachment">업로드</label>
						<input type="file" id="talkAttachment" class="upload-hidden">
					</div>`;
				talkAttachmentWrap.html(attachEl);
				$("#talkAttachment").on('change', function () { onChangeValidationAudio(this); });
				break;
			default :
				talkAttachmentWrap.html(attachEl);
		}
	}

	function buildUpdateAttachWrap(_data)
	{
		const { contents_type, contents_url, thumbnail_url } = _data.data;
		let attachmentEl = '';
		switch (contents_type) {
			case label.image :
				attachmentEl =
					`<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateTalkAttachment">업로드</label>
						<input type="file" id="updateTalkAttachment" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>
					<div class="detail-img-wrap">
						<img src="${contents_url}" alt="">
					</div>`;
				updateTalkAttachWrap.html(attachmentEl);
				$("#updateTalkAttachment").on('change', function () { onChangeValidateImage(this); });
				break;
			case label.video :
				attachmentEl =
					`<p class="desc-sub">썸네일</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateTalkAttachThumbnail">업로드</label>
						<input type="file" id="updateTalkAttachThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>
					<div class="detail-img-wrap">
						<img src="${thumbnail_url}" alt="">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateTalkAttachment">업로드</label>
						<input type="file" id="updateTalkAttachment" class="upload-hidden">
					</div>`;
				updateTalkAttachWrap.html(attachmentEl);
				$("#updateTalkAttachThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#updateTalkAttachment").on('change', function () { onChangeValidationVideo(this); });
				break;
			case label.audio :
				attachmentEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateTalkAttachment">업로드</label>
						<input type="file" id="updateTalkAttachment" class="upload-hidden">
					</div>`;
				updateTalkAttachWrap.html(attachmentEl);
				$("#updateTalkAttachment").on('change', function () { onChangeValidationAudio(this); });
				break;
			default :
				updateTalkAttachWrap.html(attachmentEl);
		}
	}

	export function onChangeUpdateAttachType()
	{
		let attachmentEl = '';
		switch (getUpdateAttachType()) {
			case label.image :
				attachmentEl =
					`<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateTalkAttachment">업로드</label>
						<input type="file" id="updateTalkAttachment" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>`;
				updateTalkAttachWrap.html(attachmentEl);
				$("#updateTalkAttachment").on('change', function () { onChangeValidateImage(this); });
				break;
			case label.video :
				attachmentEl =
					`<p class="desc-sub">썸네일</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateTalkAttachThumbnail">업로드</label>
						<input type="file" id="updateTalkAttachThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateTalkAttachment">업로드</label>
						<input type="file" id="updateTalkAttachment" class="upload-hidden">
					</div>`;
				updateTalkAttachWrap.html(attachmentEl);
				$("#updateTalkAttachThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#updateTalkAttachment").on('change', function () { onChangeValidationVideo(this); });
				break;
			case label.audio :
				attachmentEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateTalkAttachment">업로드</label>
						<input type="file" id="updateTalkAttachment" class="upload-hidden">
					</div>`;
				updateTalkAttachWrap.html(attachmentEl);
				$("#updateTalkAttachment").on('change', function () { onChangeValidationAudio(this); });
				break;
			default :
				updateTalkAttachWrap.html(attachmentEl);
		}
	}

	export function onChangeCommentAttachType()
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
				commentAttachmentWrap.html(attachEl);
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
				commentAttachmentWrap.html(attachEl);
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
				commentAttachmentWrap.html(attachEl);
				$("#commentAttachment").on('change', function () { onChangeValidationAudio(this); });
				break;
			default :
				commentAttachmentWrap.html(attachEl);
		}
	}

	function onChangeReplyAttachType(obj)
	{
		const uuid = uuidv4();
		const radioName = $(obj).attr('name');
		const attachType = $(`input[name=${radioName}]:checked`).val();
		const replyAttachmentWrap = $(obj).parent().siblings('.reply-attachment-wrap');
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

	function getAttachType()
	{
		return $("input[name=radio-attach-type]:checked").val();
	}

	function getUpdateAttachType()
	{
		return $("input[name=radio-update-attach-type]:checked").val();
	}

	function getCommentAttachType()
	{
		return $("input[name=radio-comment-attach-type]:checked").val();
	}

	function increaseCommentCountWithoutRequest()
	{
		infoTalkCommentCount.text(Number(infoTalkCommentCount.text())+1)
	}

	function decreaseCommentCountWithoutRequest()
	{
		infoTalkCommentCount.text(Number(infoTalkCommentCount.text())-1)
	}
