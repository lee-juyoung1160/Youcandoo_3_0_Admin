
	import {
	modalCreateTalk,
	modalBackdrop,
	talkDetailForm,
	talkListForm,
	talkUpdateForm,
	talk,
	searchTalkDateFrom,
	searchTalkDateTo,
	modalReplyTalk,
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
	infoTalkIsBlind, infoTalkAttachWrap, talkCommentWrap, createTalkCommentWrap,
} from "../modules/elements.js";
	import {
	overflowHidden,
	onErrorImage,
	onChangeValidateImage,
	onChangeValidationVideo,
	onChangeValidationAudio, fadeoutModal, initDayBtn
	} from "../modules/common.js";
	import {api, fileApiV2} from "../modules/api-url.js";
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, headers, isSuccessResp} from "../modules/request.js";
	import {g_doit_uuid} from "./doit-detail-info.js";
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

	let g_talk_detail_idx;
	let g_talk_is_notice;
	export function onClickDetailTalk(obj)
	{
		talkListForm.hide();
		talkDetailForm.show();
		talkUpdateForm.hide();
		g_talk_detail_idx = $(obj).data('idx');
		g_talk_is_notice = $(obj).data('notice');
		getDetailTalk();
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

	function getDetailTalk()
	{
		const url = api.detailTalk;
		const errMsg = label.detailContent + message.ajaxLoadError;
		const param = {
			"idx" : g_talk_detail_idx,
			"is_notice" : g_talk_is_notice,
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailTalkReqCallback, errMsg, false);
	}

	function getDetailTalkReqCallback(data)
	{
		isSuccessResp(data) ? buildTalkDetail(data) : sweetToast(data.msg);
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

	export function onClickModalReplyTalkOpen()
	{
		modalReplyTalk.fadeIn();
		overflowHidden();
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

