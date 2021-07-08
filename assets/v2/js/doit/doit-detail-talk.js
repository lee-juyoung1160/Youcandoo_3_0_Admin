
	import {
		modalCreateTalk, modalBackdrop, talkDetailForm, talkListForm, talkUpdateForm, talk, searchTalkDateFrom,
		searchTalkDateTo, modalAttach, modalAttachContentWrap, talkAttachmentWrap, rdoAttachType, selTalkDateType,
		selTalkPageLength, talkTable, chkNoticeTalk, infoTalkNickname, infoTalkCommentCount, infoTalkLikeCount,
		infoTalkContent, infoTalkCreated, infoTalkIsBlind, infoTalkAttachWrap, talkCommentWrap, commentTalk,
		updateTalk, rdoUpdateAttachType, chkUpdateNoticeTalk, updateTalkAttachWrap, btnBlinkTalk, btnDisplayTalk, btnDeleteTalk,
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
	import {isEmpty, numberWithCommas} from "../modules/utils.js";
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

	export function initCreateTalkModal()
	{
		talk.trigger('focus');
		talk.val('');
		rdoAttachType.eq(0).prop('checked', true);
		chkNoticeTalk.prop('checked', false);
		onChangeAttachType();
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
					const param = {
						"doit_uuid": g_doit_uuid,
						"date_type" : selTalkDateType.val(),
						"from_date" : searchTalkDateFrom.val(),
						"to_date" : searchTalkDateTo.val(),
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
				{title: "구분",    	data: "is_notice",  	width: "10%",
					render: function (data) {
						return data === 'Y' ? label.notice : label.general;
					}
				}
				,{title: "작성자",    data: "nickname",  		width: "15%",
					render: function (data, type, row, meta) {
						return row.is_company === 'Y' ? label.bizIcon + data : data;
					}
				}
				,{title: "내용", 	data: "board_body",		width: "30%",
					render: function (data, type, row, meta) {
						return `<a data-idx="${row.idx}" data-notice="${row.is_notice}" class="line-clamp-1" style="max-width: 450px;">${isEmpty(data) ? label.dash : data}</a>`;
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
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selTalkPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
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
	let g_talk_uuid;
	let g_talk_idx;
	function onClickDetailTalk(obj)
	{
		g_talk_idx = $(obj).data('idx');
		g_param_view_page_length = 10;
		initTalkCommentPageNum();
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
				await isSuccessResp(data) ? getDetailTalkReqCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(label.detailContent + message.ajaxLoadError));
	}

	function getDetailTalkReqCallback(data)
	{
		g_talk_uuid = data.data.board_uuid;
		buildTalkDetail(data);
		getTalkComments();
	}

	let g_talk_attach_type;
	let g_board_uuid;
	function buildTalkDetail(data)
	{
		const {board_uuid, created, nickname, is_company, board_body, comment_cnt, like_count, is_notice, is_blind, contents_type,} = data.data;

		g_board_uuid = board_uuid;
		g_talk_attach_type = contents_type;

		infoTalkNickname.html(is_company === 'Y' ? label.bizIcon + nickname : nickname);
		infoTalkCreated.text(created);
		infoTalkIsBlind.text(is_blind);
		infoTalkCommentCount.text(comment_cnt);
		infoTalkLikeCount.text(like_count);
		infoTalkContent.text(board_body);
		infoTalkAttachWrap.html(buildTalkAttachWrap(data));
		toggleShowBtns(data);

		/** 수정폼 **/
		updateTalk.val(board_body);
		rdoUpdateAttachType.each(function () {
			$(this).prop('checked', $(this).val() === contents_type);
		})
		buildUpdateAttachWrap(data);
		chkUpdateNoticeTalk.prop('checked', is_notice === 'Y');
		calculateInputLength();
		onErrorImage();

		$(".view-detail-talk-attach").on('click', function () { onClickTalkAttach(this); });
	}

	function toggleShowBtns(data)
	{
		const { is_company, is_blind } = data.data;
		if (is_company === 'Y')
		{
			btnDeleteTalk.show();
			btnDisplayTalk.hide();
			btnBlinkTalk.hide()
		}
		else
		{
			btnDeleteTalk.hide();

			if (is_blind === 'Y')
			{
				btnDisplayTalk.show();
				btnBlinkTalk.hide()
			}
			else
			{
				btnDisplayTalk.hide();
				btnBlinkTalk.show()
			}
		}
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
			.catch(reject => sweetToast(`블라인드${message.ajaxError}`));
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

	export function onClickTalkAttach(obj)
	{
		modalAttachContentWrap.empty();
		modalAttach.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
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

	function getTalkComments(_pageLength)
	{
		const param = {
			"board_uuid" : g_talk_uuid,
			"size" : isEmpty(_pageLength) ? g_talk_comment_page_length : g_param_view_page_length,
			"last_idx" : g_talk_comment_last_idx
		};

		ajaxRequestWithJson(true, api.talkCommentList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildTalkComments(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`댓글 목록${message.ajaxLoadError}`));
	}

	function buildTalkComments(data)
	{
		if ($('#btnViewMoreTalkComment').length > 0) $('#btnViewMoreTalkComment').remove();

		if (!isEmpty(data.data) && data.data.length > 0)
		{
			g_talk_comment_page_size = Math.ceil(Number(data.count)/g_talk_comment_page_length);

			data.data.map((obj, index, arr) => {
				const {idx, comment_uuid, created, nickname, is_company, profile_uuid, comment_body, is_blind, comment_cnt, parent_comment_uuid, recomment_data } = obj;

				if (arr.length - 1 === index)
					g_talk_comment_last_idx = idx;

				let repliesEl = ''
				if (recomment_data.length > 0)
				{
					recomment_data.map(replyObj => {
						const isBlindReply = replyObj.is_blind === 'Y';
						const btnBlindReply = isBlindReply
							? `<button type="button" class="btn-xs btn-orange btn-display-comment" id="${replyObj.comment_uuid}" data-uuid="${replyObj.comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
							: `<button type="button" class="btn-xs btn-warning btn-blind-comment" id="${replyObj.comment_uuid}" data-uuid="${replyObj.comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
						const btnDeleteReply = `<button type="button" class="btn-xs btn-danger btn-delete-talk-comment" data-uuid="${replyObj.comment_uuid}">삭제</button>`;
						repliesEl +=
							`<li>
								<div class="top clearfix">
									<p class="title">
										ㄴ ${replyObj.is_company === 'Y' ? label.bizIcon + replyObj.nickname : replyObj.nickname} 
										<span class="desc-sub">${replyObj.created}</span>
									</p>
									<div class="right-wrap">
										${replyObj.is_company === 'Y' ? btnDeleteReply : btnBlindReply}
									</div>
								</div>
								<div class="detail-data">
									${replyObj.comment_body}
								</div>
							</li>`
					})
				}

				const createReplyEl = isSponsorDoit
					? `<a class="link btn-reply-talk">답글달기</a>
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
								<tr>
									<td colspan="2">
										<div class="right-wrap">
											<button type="button" 
													class="btn-sm btn-primary btn-submit-reply-talk"
													data-parent="${comment_uuid}"
													data-profile="${profile_uuid}"
													data-nickname="${nickname}">등록</button>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</div>`
					: '';

				const isBlindComment = is_blind === 'Y';
				const btnBlindComment = isBlindComment
					? `<button type="button" class="btn-xs btn-orange btn-display-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
					: `<button type="button" class="btn-xs btn-warning btn-blind-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
				const btnDeleteCommentEl = `<button type="button" class="btn-xs btn-danger btn-delete-talk-comment" data-uuid="${comment_uuid}">삭제</button>`;
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
							${createReplyEl}
						</div>
			
						<div class="comments-wrap">
							<ul>
								${repliesEl}
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
	function onSubmitTalkReply(obj)
	{
		const replyEl = $(obj).parents('.reply-talk-table');
		g_talk_reply_parent_uuid = $(obj).data('parent');
		g_talk_reply_target_profile_uuid = $(obj).data('profile');
		g_talk_reply_target_nickname = $(obj).data('nickname');
		g_talk_reply_value = $(replyEl).find('.reply-talk').val();

		if (replyTalkValid())
			sweetConfirm(message.create, createReplyTalkCommentReq);
	}

	function replyTalkValid()
	{
		if (isEmpty(g_talk_reply_value))
		{
			sweetToast(`답글은 ${message.required}`);
			return false;
		}

		return true;
	}

	function createReplyTalkCommentReq()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"board_uuid" : g_talk_uuid,
			"comment" : g_talk_reply_value.trim(),
			"mention" : [{ "profile_uuid": g_talk_reply_target_profile_uuid, "profile_nickname": g_talk_reply_target_nickname}],
			"parent_comment_uuid" : g_talk_reply_parent_uuid,
		}

		ajaxRequestWithJson(true, api.createTalkComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createReplyTalkCommentSuccess);
			})
			.catch(reject => sweetToast(`답글 등록${message.ajaxError}`));
	}

	function createReplyTalkCommentSuccess()
	{
		onClickModalReplyTalkClose();
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getTalkComments(g_param_view_page_length);
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
				await sweetToastAndCallback(data, deleteActionCommentSuccess);
			})
			.catch(reject => sweetToast(`댓글 삭제${message.ajaxError}`));
	}

	function deleteActionCommentSuccess()
	{
		initTalkCommentPageNum();
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getDetailTalk();
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
				await sweetToastAndCallback(data, blindCommentSuccess);
			})
			.catch(reject => sweetToast(`블라인드${message.ajaxError}`));
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

	export function onSubmitTalkComment()
	{
		if (createTalkCommentValid())
			sweetConfirm(message.create, createTalkCommentRequest);
	}

	function createTalkCommentValid()
	{
		if (isEmpty(commentTalk.val()))
		{
			sweetToast(`댓글은 ${message.required}`);
			commentTalk.trigger('focus');
			return false;
		}

		return true;
	}

	function createTalkCommentRequest()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"board_uuid" : g_talk_uuid,
			"comment" : commentTalk.val().trim(),
		}

		ajaxRequestWithJson(true, api.createTalkComment, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createTalkCommentSuccess);
			})
			.catch(reject => sweetToast(`댓글 등록${message.ajaxError}`));
	}

	function createTalkCommentSuccess()
	{
		commentTalk.val('');
		initTalkCommentPageNum();
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getDetailTalk();
		onSubmitSearchTalk();
	}

	function initTalkCommentPageNum()
	{
		g_talk_comment_page_num = 1;
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
		param.append('example', $("#talkAttachment")[0].files[0]);
		if (getAttachType() === label.video)
			param.append('thumbnail', $("#talkAttachThumbnail")[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.mission, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? createTalkRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`이미지 등록${message.ajaxError}`));
	}

	function createTalkRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const param = {
				"doit_uuid" : g_doit_uuid,
				"board_body" : talk.val().trim(),
				"is_notice" : chkNoticeTalk.is(":checked") ? 'Y' : 'N',
			}

			if (!isEmpty(data))
			{
				const talkAttachObj = {
					"contents_type" : getAttachType(),
					"path" : data.image_urls.example
				}

				if (getAttachType() === label.video)
					talkAttachObj['thumbnail_path'] = data.image_urls.thumbnail;

				param["attach"] =  talkAttachObj;
			}

			ajaxRequestWithJson(true, api.createTalk, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, createTalkSuccess);
				})
				.catch(reject => sweetToast(label.submit + message.ajaxError));
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
		const param = { "board_uuid" : g_talk_uuid }

		ajaxRequestWithJson(true, api.deleteTalk, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, deleteTalkSuccess);
			})
			.catch(reject => sweetToast(label.delete + message.ajaxError));
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
			const callback = (isEmpty(getUpdateAttachType()) || g_talk_attach_type === getUpdateAttachType()) ? updateTalkRequest : updateTalkAttachRequest;
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
		param.append('example', $("#updateTalkAttachment")[0].files[0]);
		if (getUpdateAttachType() === label.video)
			param.append('thumbnail', $("#updateTalkAttachThumbnail")[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.mission, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? updateTalkRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`이미지 등록${message.ajaxError}`));
	}

	function updateTalkRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const param = {
				"doit_uuid" : g_doit_uuid,
				"board_uuid" : g_talk_uuid,
				"board_body" : updateTalk.val().trim(),
				"is_notice" : chkUpdateNoticeTalk.is(':checked') ? 'Y' : 'N',
			}

			if (!isEmpty(data))
			{
				const talkAttachObj = {
					"contents_type" : getUpdateAttachType(),
					"path" : data.image_urls.example
				}

				if (getUpdateAttachType() === label.video)
					talkAttachObj['thumbnail_path'] = data.image_urls.thumbnail;

				param["attach"] =  talkAttachObj;
			}

			ajaxRequestWithJson(true, api.updateTalk, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateTalkSuccess);
				})
				.catch(reject => sweetToast(label.modify + message.ajaxError));
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

	function getAttachType()
	{
		return $("input[name=radio-attach-type]:checked").val();
	}

	function getUpdateAttachType()
	{
		return $("input[name=radio-update-attach-type]:checked").val();
	}
