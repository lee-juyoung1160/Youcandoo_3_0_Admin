
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
	} from "../modules/elements.js";
	import {
	overflowHidden,
	onErrorImage,
		onChangeValidateImage,
		onChangeValidationVideo,
		onChangeValidationAudio
	} from "../modules/common.js";
	import {api} from "../modules/api-url.js";
	import {headers} from "../modules/request.js";
	import {g_doit_uuid} from "./doit-detail-info.js";
	import {sweetError} from "../modules/alert.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {buildTotalCount, toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";

	export function initSearchTalkForm()
	{
		searchTalkDateFrom.datepicker("setDate", "-6D");
		searchTalkDateTo.datepicker("setDate", "today");
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

	export function onClickDetailTalk(_idx)
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
						return `<a>${data}</a>`;
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
				$(nRow).children().eq(2).on('click', function () { onClickDetailTalk(aData.idx); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	export function onClickModalReplyTalkOpen()
	{
		modalReplyTalk.fadeIn();
		overflowHidden();
	}

	export function onClickAttachTalk()
	{
		modalAttachContentWrap.empty();
		modalAttach.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();

		onErrorImage();
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
		}
	}

	function getAttachType()
	{
		return $("input[name=radio-attach-type]:checked").val();
	}

