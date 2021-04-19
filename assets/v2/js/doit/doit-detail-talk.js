
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
	infoTalkIsBlind, infoTalkAttachWrap, talkCommentWrap, createTalkCommentWrap, commentTalk,
} from "../modules/elements.js";
	import {
		overflowHidden,
		onErrorImage,
		onChangeValidateImage,
		onChangeValidationVideo,
		onChangeValidationAudio, fadeoutModal, initDayBtn, limitInputLength
	} from "../modules/common.js";
	import {api, fileApiV2} from "../modules/api-url.js";
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, headers, isSuccessResp} from "../modules/request.js";
	import {g_doit_uuid, g_leader_profile_uuid, isSponsorDoit} from "./doit-detail-info.js";
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from "../modules/alert.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {buildTotalCount, toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";
	import {isEmpty} from "../modules/utils.js";

	export function initSearchTalkForm()
	{
		searchTalkDateFrom.datepicker("setDate", "-6D");
		searchTalkDateTo.datepicker("setDate", "today");
		initDayBtn();
	}

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

	export function showDetailTalk()
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

	export function initCreateTalkModal()
	{
		talk.trigger('focus');
		talk.val('');
		rdoAttachType.eq(0).prop('checked', true);
		onChangeAttachType();
	}

	export function onSubmitSearchTalk()
	{
		const table = talkTable.DataTable();
		table.page.len(Number(selTalkPageLength.val()));
		table.ajax.reload();
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
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

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
						return data === 'Y' ? label.noticeTalk : label.generalTalk;
					}
				}
				,{title: "작성자",    data: "nickname",  		width: "15%" }
				,{title: "내용", 	data: "board_body",		width: "30%",
					render: function (data, type, row, meta) {
						return `<a data-idx="${row.idx}" data-notice="${row.is_notice}">${data}</a>`;
					}
				}
				,{title: "댓글수", 	data: "comment_cnt",	width: "5%" }
				,{title: "좋아요",    data: "like_count",  	width: "5%" }
				,{title: "작성일",    data: "created",  		width: "15%",
					render: function (data, type, row, meta) {
						return data.substring(0, 10);
					}
				}
				,{title: "블라인드",   data: "is_notice",  	width: "5%" }
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
	let g_talk_is_notice;
	function onClickDetailTalk(obj)
	{
		g_talk_idx = $(obj).data('idx');
		g_talk_is_notice = $(obj).data('notice');
		g_param_view_page_length = 10;
		initTalkCommentPageNum();
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		showDetailTalk();
		getDetailTalk();
	}

	function getDetailTalk()
	{
		const url = api.detailTalk;
		const errMsg = label.detailContent + message.ajaxLoadError;
		const param = {
			"idx" : g_talk_idx,
			"is_notice" : g_talk_is_notice,
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailTalkReqCallback, errMsg, false);
	}

	function getDetailTalkReqCallback(data)
	{
		if(isSuccessResp(data))
		{
			g_talk_uuid = data.data.board_uuid;
			buildTalkDetail(data);
			getTalkCommentList();
		}
		else
			sweetToast(data.msg);
	}

	function buildTalkDetail(data)
	{
		const {board_uuid, created, nickname, board_body, comment_cnt, like_count, is_notice, contents_type, contents_url, thumbnail_url} = data.data;
		if (is_notice === 'Y')
		{
			talkCommentWrap.hide();
			createTalkCommentWrap.hide();
		}
		else
		{
			talkCommentWrap.show();
			createTalkCommentWrap.show();
		}
		infoTalkNickname.text(nickname);
		infoTalkCreated.text(created);
		infoTalkIsBlind.text();
		infoTalkCommentCount.text(comment_cnt);
		infoTalkLikeCount.text(like_count);
		infoTalkContent.text(board_body);
		infoTalkAttachWrap.html(buildTalkAttachWrap(data.data));

		/** 수정폼 **/

		onErrorImage();
		$(".view-detail-talk-attach").on('click', function () { onClickTalkAttach(this); });
	}

	function buildTalkAttachWrap(data)
	{
		const {contents_type, contents_url, thumbnail_url} = data;
		switch (contents_type) {
			case 'image' :
				return `<div class="detail-img-wrap talk-file-img view-detail-talk-attach" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${contents_url}" alt="">
						</div>`;
			case 'voice' :
				return `<audio controls><source src="${contents_url}"></audio>`;
			case 'video' :
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

	function getTalkCommentList(_pageLength)
	{
		const url = api.talkCommentList;
		const errMsg = `댓글 목록${message.ajaxLoadError}`;
		const param = {
			"board_uuid" : g_talk_uuid,
			"size" : isEmpty(_pageLength) ? g_talk_comment_page_length : g_param_view_page_length,
			"last_idx" : g_talk_comment_last_idx
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getActionCommentsCallback, errMsg, false);
	}

	function getActionCommentsCallback(data)
	{
		isSuccessResp(data) ? buildActionComments(data) : sweetToast(data.msg);
	}

	function buildActionComments(data)
	{
		if ($('#btnViewMoreTalkComment').length > 0) $('#btnViewMoreTalkComment').remove();

		if (!isEmpty(data.data) && data.data.length > 0)
		{
			g_talk_comment_page_size = Math.ceil(Number(data.count)/g_talk_comment_page_length);

			data.data.map((obj, index, arr) => {
				const {idx, comment_uuid, created, nickname, profile_uuid, comment_body, comment_cnt, parent_comment_uuid, recomment_data } = obj;

				if (arr.length - 1 === index)
					g_talk_comment_last_idx = idx;

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
											<input type="hidden" class="parent-comment-uuid" value="${comment_uuid}">
											<input type="hidden" class="target-profile-uuid" value="${profile_uuid}">
											<input type="hidden" class="target-nickname" value="${nickname}">
											<textarea class="length-input reply-talk" maxlength="100" rows="4" placeholder="답글을 입력해주세요."></textarea>
											<p class="length-count-wrap"><span class="count-input">0</span>/100</p>
										</div>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<div class="right-wrap">
											<button type="button" class="btn-sm btn-primary btn-submit-reply-talk">등록</button>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</div>`
					: '';
				const btnDeleteCommentEl = isSponsorDoit && (g_leader_profile_uuid === profile_uuid)
					? `<button type="button" class="btn-xs btn-danger btn-delete-talk-comment" data-uuid="${comment_uuid}">삭제</button>`
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
		$('.btn-delete-talk-comment').on('click', function () { onSubmitDeleteActionComment(this); });
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
		getTalkCommentList();
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

	let g_talk_comment_parent_uuid;
	let g_talk_comment_target_profile_uuid;
	let g_talk_comment_target_nickname;
	let g_talk_reply_value;
	function onSubmitTalkReply(obj)
	{
		const replyEl = $(obj).parents('.reply-talk-table');
		g_talk_comment_parent_uuid = $(replyEl).find('.parent-comment-uuid').val();
		g_talk_comment_target_profile_uuid = $(replyEl).find('.target-profile-uuid').val();
		g_talk_comment_target_nickname = $(replyEl).find('.target-nickname').val();
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
		const url = api.createTalkComment;
		const errMsg = `답글 등록 ${message.ajaxError}`;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"board_uuid" : g_talk_uuid,
			"comment" : g_talk_reply_value.trim(),
			"mention" : [{ "profile_uuid": g_talk_comment_target_profile_uuid, "profile_nickname": g_talk_comment_target_nickname}],
			"parent_comment_uuid" : g_talk_comment_parent_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReplyTalkCommentCallback, errMsg, false);
	}

	function createReplyTalkCommentCallback(data)
	{
		sweetToastAndCallback(data, createReplyTalkCommentSuccess);
	}

	function createReplyTalkCommentSuccess()
	{
		onClickModalReplyTalkClose();
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getTalkCommentList(g_param_view_page_length);
	}

	let g_delete_talk_comment_uuid;
	function onSubmitDeleteActionComment(obj)
	{
		g_delete_talk_comment_uuid = $(obj).data('uuid');
		sweetConfirm(message.delete, actionCommentDeleteRequest);
	}

	function actionCommentDeleteRequest()
	{
		const url = api.deleteTalkComment;
		const errMsg = `댓글 삭제 ${message.ajaxError}`;
		const param = {
			"comment_uuid" : g_delete_talk_comment_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteActionCommentReqCallback, errMsg, false);
	}

	function deleteActionCommentReqCallback(data)
	{
		sweetToastAndCallback(data, deleteActionCommentSuccess);
	}

	function deleteActionCommentSuccess()
	{
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getTalkCommentList(g_param_view_page_length);
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
		const url = api.createTalkComment;
		const errMsg = `댓글 등록 ${message.ajaxError}`;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"board_uuid" : g_talk_uuid,
			"comment" : commentTalk.val().trim(),
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createTalkCommentReqCallback, errMsg, false);
	}

	function createTalkCommentReqCallback(data)
	{
		sweetToastAndCallback(data, createTalkCommentSuccess);
	}

	function createTalkCommentSuccess()
	{
		commentTalk.val('');
		initTalkCommentLastIdx();
		initTalkCommentWrap();
		getTalkCommentList(g_param_view_page_length);
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
			const callback = isEmpty(getAttachType()) ? createTalkRequest : talkFileUploadRequest;
			sweetConfirm(message.create, callback);
		}
	}

	function createTalkValid()
	{
		if (isEmpty(talk.val()))
		{
			sweetToast(`톡은 ${message.required}`);
			talk.trigger('focus');
			return false;
		}

		const talkAttachThumbnail = $("#talkAttachThumbnail");
		if (getAttachType() === 'video' && talkAttachThumbnail[0].files.length === 0)
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

	function talkFileUploadRequest()
	{
		const url = fileApiV2.mission;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('example', $("#talkAttachment")[0].files[0]);
		if (getAttachType() === 'video')
			param.append('thumbnail', $("#talkAttachThumbnail")[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createTalkRequest, errMsg, false);
	}

	function createTalkRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url = api.createTalk;
			const errMsg = label.submit+message.ajaxError;
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

				if (getAttachType() === 'video')
					talkAttachObj['thumbnail_path'] = data.image_urls.thumbnail;

				param["attach"] =  talkAttachObj;
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), createTalkCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function createTalkCallback(data)
	{
		sweetToastAndCallback(data, createTalkSuccess);
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
		const url = api.deleteTAlk;
		const errMsg = label.delete+message.ajaxError;
		const param = {
			"board_uuid" : g_talk_uuid,
			"is_notice" : g_talk_is_notice,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteTalkCallback, errMsg, false);
	}

	function deleteTalkCallback(data)
	{
		sweetToastAndCallback(data, deleteTalkSuccess);
	}

	function deleteTalkSuccess()
	{
		showTalkListForm();
		onSubmitSearchTalk();
	}

	export function onChangeAttachType()
	{
		let attachEl = '';
		switch (getAttachType()) {
			case 'image' :
				attachEl =
					`<p class="desc-sub">( 이미지 크기 : 650 x 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="talkAttachment">업로드</label>
						<input type="file" id="talkAttachment" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>`;
				talkAttachmentWrap.html(attachEl);
				$("#talkAttachment").on('change', function () { onChangeValidateImage(this); });
				break;
			case 'video' :
				attachEl =
					`<p class="desc-sub">썸네일 ( 이미지 크기 : 650 x 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="talkAttachThumbnail">업로드</label>
						<input type="file" id="talkAttachThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
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
			case 'voice' :
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

	function getAttachType()
	{
		return $("input[name=radio-attach-type]:checked").val();
	}

