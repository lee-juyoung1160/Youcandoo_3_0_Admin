
	import {
		missionCreateForm, missionDetailForm, missionListForm, missionUpdateForm, missionTitle, missionStartDate,
		missionEndDate, rdoActionType, promise, actionExampleWrap, actionDesc, missionTable,
		infoMissionDate, infoMissionTime, infoActionType, infoActionExampleWrap, infoActionDesc, infoPromise,
		updateMissionStartDate, updateMissionEndDate, updateMissionStartTime, updateMissionEndTime,
		rdoUpdateActionType, updatePromise, missionStartTime, missionEndTime, chkGalleryAllowed,
		infoMissionTitle, chkUpdateGalleryAllowed, updateMissionTitle, updateActionDesc, updateExampleWrap,
	} from "../modules/elements.js";
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from "../modules/alert.js";
	import {message} from "../modules/message.js";
	import {fileApiV2, api} from "../modules/api-url.js";
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, headers, isSuccessResp} from "../modules/request.js";
	import {onChangeValidateImage, onChangeValidationVideo, onChangeValidationAudio, onErrorImage} from "../modules/common.js";
	import {isEmpty} from "../modules/utils.js";
	import {label} from "../modules/label.js";
	import {toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";
	import {g_doit_uuid} from "./doit-detail-info.js";

	export function showCreateMissionForm()
	{
		missionCreateForm.show();
		missionUpdateForm.hide();
		missionDetailForm.hide();
		missionListForm.hide();
		initMissionCreateForm();
	}

	export function showMissionListForm()
	{
		missionCreateForm.hide();
		missionUpdateForm.hide();
		missionDetailForm.hide();
		missionListForm.show();
	}

	export function onClickBtnUpdateMission()
	{
		missionCreateForm.hide();
		missionUpdateForm.show();
		missionDetailForm.hide();
		missionListForm.hide();
	}

	export function onClickDetailMission(_idx)
	{
		missionCreateForm.hide();
		missionUpdateForm.hide();
		missionDetailForm.show();
		missionListForm.hide();
		getMissionDetail(_idx);
	}

	export function initMissionCreateForm()
	{
		missionTitle.trigger('focus');
		missionTitle.val('');
		missionStartDate.datepicker("option", "minDate", "today");
		missionEndDate.datepicker("option", "minDate", "today");
		missionStartDate.datepicker("setDate", "today");
		missionEndDate.datepicker("setDate", "9999-12-31");
		rdoActionType.eq(0).prop('checked', true);
		onChangeActionType();
		promise.val('');
	}

	export function buildMissionTable()
	{
		missionTable.DataTable({
			ajax : {
				url: api.missionList,
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
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "미션명", 		data: "mission_title",		width: "40%",
					render: function (data, type, row, meta) {
						return `<a>${data}</a>`;
					}
				}
				,{title: "기간", 		data: "start_date",			width: "20%",
					render: function (data, type, row, meta) {
						return `${row.start_date} ~ ${row.end_date}`;
					}
				}
				,{title: "참여인원",    	data: "state",  			width: "15%" }
				,{title: "상태",    		data: "state",  			width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(0).on('click', function () { onClickDetailMission(aData.idx); });
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	export function onSubmitMission()
	{
		if (missionCreateValidation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function missionCreateValidation()
	{
		if (isEmpty(missionTitle.val()))
		{
			sweetToast(`미션명은 ${message.required}`);
			missionTitle.trigger('focus');
			return false;
		}

		const actionThumbnailEl = $("#actionThumbnail");
		if (actionThumbnailEl.length > 0 && actionThumbnailEl[0].files.length === 0)
		{
			sweetToast(`인증 예시 썸네일은 ${message.required}`);
			return false;
		}

		const actionImg = $("#actionExample")[0].files;
		if (actionImg.length === 0)
		{
			sweetToast(`인증 예시는 ${message.required}`);
			return false;
		}

		if (isEmpty(actionDesc.val()))
		{
			sweetToast(`인증 예시 설명은 ${message.required}`);
			actionDesc.trigger('focus');
			return false;
		}

		return true;
	}

	function fileUploadReq()
	{
		const url = fileApiV2.mission;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('example', $("#actionExample")[0].files[0]);
		if (getActionType() === 'video')
			param.append('thumbnail', $("#actionThumbnail")[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			const url = api.createMission;
			const errMsg = label.submit+message.ajaxError;
			const missionExampleObj = {
				"contents_type" : getActionType(),
				"path" : data.image_urls.example
			}
			if (getActionType() === 'video')
				missionExampleObj['thumbnail_path'] = data.image_urls.thumbnail;

			const param = {
				"doit_uuid" : g_doit_uuid,
				"mission_title" : missionTitle.val().trim(),
				"start_date" : missionStartDate.val(),
				"end_date" : missionEndDate.val(),
				"start_time" : missionStartTime.val().trim(),
				"end_time" : missionEndTime.val().trim(),
				"mission_description" : actionDesc.val().trim(),
				"mission_type" : getActionType(),
				"allow_gallery_image" : chkGalleryAllowed.is(':checked') ? 'Y' : 'N',
				"mission_example" :  missionExampleObj,
				"promise_description" : promise.val().trim(),
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, reqSuccess);
	}

	function getMissionDetail(_idx)
	{
		const url = api.detailMission;
		const errMsg = label.detailContent + message.ajaxLoadError;
		const param = { "idx" : _idx };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getMissionDetailReqCallback, errMsg, false);
	}

	let g_mission_uuid;
	let g_mission_idx;
	function getMissionDetailReqCallback(data)
	{
		//thumbnail_url: "https://youcandoo.yanadoocdn.com/v3/mission/2021/04/06/1a643e5b103a4dbf857d105c992eb3d8.jpg"
		const { idx, mission_uuid, state, mission_title, start_date, end_date, start_time, end_time,
			mission_type, allow_gallery_image, mission_description, promise_description } = data.data;
		g_mission_idx = idx;
		g_mission_uuid = mission_uuid;
		infoMissionTitle.html(buildMissionStatus(state)+mission_title);
		infoMissionDate.text(`${start_date} ~ ${end_date}`);
		infoMissionTime.text(`${start_time} ~ ${end_time}`);
		infoActionType.text(`${getStrActionType(mission_type)} (갤러리 허용 : ${allow_gallery_image})`);
		infoActionExampleWrap.html(buildExample(data.data));
		infoActionDesc.text(mission_description);
		infoPromise.text(isEmpty(promise_description) ? label.dash : promise_description);

		/** 수정폼 **/
		updateMissionTitle.val(mission_title);
		updateMissionStartDate.val(start_date);
		updateMissionEndDate.val(end_date);
		updateMissionStartTime.val(start_time);
		updateMissionEndTime.val(end_time);
		rdoUpdateActionType.each(function () {
			if ($(this).val() === mission_type)
				$(this).prop('checked', true);
		});
		chkUpdateGalleryAllowed.prop('checked', allow_gallery_image === 'Y');
		buildUpdateExampleFile(data.data);
		updateActionDesc.val(mission_description);
		updatePromise.val(promise_description);

		onErrorImage();
	}

	function buildMissionStatus(_status)
	{
		switch (_status) {
			case '준비' :
				return `<span class="badge badge-info">${_status}</span>`;
			case '진행중' :
				return `<span class="badge badge-success">${_status}</span>`;
			case '종료' :
				return `<span class="badge badge-warning">${_status}</span>`;
		}
	}

	function buildExample(_data)
	{
		const url = _data.contents_url;
		switch (_data.mission_type) {
			case 'image' :
				return `<img src="${url}" alt="">`;
			case 'video' :
				return `<video controls><source src="${url}"></video>`;
			case 'voice' :
				return `<audio controls><source src="${url}"></audio>`;
		}
	}

	function getStrActionType(_actionType)
	{
		switch (_actionType) {
			case 'image' :
				return '사진';
			case 'video' :
				return '영상';
			case 'voice' :
				return '음성';
		}
	}

	export function deleteMission()
	{
		sweetConfirm(message.delete, deleteMissionRequest);
	}

	function deleteMissionRequest()
	{
		const url = api.deleteMission;
		const errMsg = message.delete+message.ajaxError;
		const param = { "mission_uuid" : g_mission_uuid };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteMissionReqCallback, errMsg, false);
	}

	function deleteMissionReqCallback(data)
	{
		sweetToastAndCallback(data, reqSuccess);
	}

	function reqSuccess()
	{
		showMissionListForm();
		buildMissionTable();
	}

	export function onSubmitUpdateMission()
	{
		if (updateValidation())
		{
			const exampleFile = $("#updateExample")[0].files;
			const callback =
				(exampleFile.length > 0 || (getUpdateActionType() === 'video' && $("#updateThumbnail")[0].files.length > 0))
				? updateFileUploadReq
				: updateRequest;

			sweetConfirm(message.modify, callback);
		}
	}

	function updateValidation()
	{
		if (isEmpty(updateMissionTitle.val()))
		{
			sweetToast(`미션명은 ${message.required}`);
			updateMissionTitle.trigger('focus');
			return false;
		}

		if (isEmpty(updateActionDesc.val()))
		{
			sweetToast(`인증 예시 설명은 ${message.required}`);
			updateActionDesc.trigger('focus');
			return false;
		}

		return true;
	}

	function updateFileUploadReq()
	{
		const url = fileApiV2.mission;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('example', $("#updateExample")[0].files[0]);
		if (getUpdateActionType() === 'video')
			param.append('thumbnail', $("#updateThumbnail")[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url = api.updateMission;
			const errMsg = label.submit+message.ajaxError;
			const param = {
				"mission_uuid" : g_mission_uuid,
				"mission_title" : updateMissionTitle.val().trim(),
				"start_date" : updateMissionStartDate.val(),
				"end_date" : updateMissionEndDate.val(),
				"start_time" : updateMissionStartTime.val().trim(),
				"end_time" : updateMissionEndTime.val().trim(),
				"mission_description" : updateActionDesc.val().trim(),
				"mission_type" : getUpdateActionType(),
				"allow_gallery_image" : chkUpdateGalleryAllowed.is(':checked') ? 'Y' : 'N',
				"promise_description" : updatePromise.val().trim(),
			}

			if (!isEmpty(data))
			{
				const missionExampleObj = {
					"contents_type" : getUpdateActionType(),
					"path" : data.image_urls.example
				}
				if (getUpdateActionType() === 'video')
					missionExampleObj['thumbnail_path'] = data.image_urls.thumbnail;

				param["mission_example"] =  missionExampleObj;
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function updateCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		onClickDetailMission(g_mission_idx);
	}

	export function onChangeMissionStartDate()
	{
		missionEndDate.datepicker("option", "minDate", new Date(missionStartDate.datepicker("getDate")));
	}

	export function onChangeMissionEndDate()
	{
		missionStartDate.datepicker("option", "minDate", new Date(missionEndDate.datepicker("getDate")));
	}

	export function onChangeUpdateMissionStartDate()
	{
		updateMissionEndDate.datepicker("option", "minDate", new Date(updateMissionStartDate.datepicker("getDate")));
	}

	export function onChangeUpdateMissionEndDate()
	{
		updateMissionStartDate.datepicker("option", "minDate", new Date(updateMissionEndDate.datepicker("getDate")));
	}

	function getActionType()
	{
		return $("input[name=radio-action-type]:checked").val();
	}

	function getUpdateActionType()
	{
		return $("input[name=radio-update-action-type]:checked").val();
	}

	export function onChangeActionType()
	{
		let exampleFileEl = '';
		switch (getActionType()) {
			case 'image' :
				exampleFileEl =
					`<p class="desc-sub">( 이미지 크기 : 650 x 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExample">업로드</label>
						<input type="file" id="actionExample" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>`;
				actionExampleWrap.html(exampleFileEl);
				$("#actionExample").on('change', function () { onChangeValidateImage(this); });
				break;
			case 'video' :
				exampleFileEl =
					`<p class="desc-sub">썸네일 ( 이미지 크기 : 650 x 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionThumbnail">업로드</label>
						<input type="file" id="actionThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExample">업로드</label>
						<input type="file" id="actionExample" class="upload-hidden">
					</div>`;
				actionExampleWrap.html(exampleFileEl);
				$("#actionThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#actionExample").on('change', function () { onChangeValidationVideo(this); });
				break;
			case 'voice' :
				exampleFileEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExample">업로드</label>
						<input type="file" id="actionExample" class="upload-hidden">
					</div>`;
				actionExampleWrap.html(exampleFileEl);
				$("#actionExample").on('change', function () { onChangeValidationAudio(this); });
				break;
		}
	}

	function buildUpdateExampleFile(_data)
	{
		const { mission_type, contents_url, thumbnail_url } = _data;
		let updateExampleFileEl = '';
		switch (mission_type) {
			case 'image' :
				updateExampleFileEl =
					`<p class="desc-sub">( 이미지 크기 : 650 x 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>
					<div class="detail-img-wrap">
						<img src="${contents_url}" alt="">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				$("#updateExample").on('change', function () { onChangeValidateImage(this); });
				break;
			case 'video' :
				updateExampleFileEl =
					`<p class="desc-sub">썸네일 ( 이미지 크기 : 650 x 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateThumbnail">업로드</label>
						<input type="file" id="updateThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>
					<div class="detail-img-wrap">
						<img src="${thumbnail_url}" alt="">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				$("#updateThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#updateExample").on('change', function () { onChangeValidationVideo(this); });
				break;
			case 'voice' :
				updateExampleFileEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				$("#updateExample").on('change', function () { onChangeValidationAudio(this); });
				break;
		}
	}

	export function onChangeUpdateActionType()
	{
		let updateExampleFileEl = '';
		switch (getUpdateActionType()) {
			case 'image' :
				updateExampleFileEl =
					`<p class="desc-sub">( 이미지 크기 : 650 x 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				$("#updateExample").on('change', function () { onChangeValidateImage(this); });
				break;
			case 'video' :
				updateExampleFileEl =
					`<p class="desc-sub">썸네일 ( 이미지 크기 : 650 x 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateThumbnail">업로드</label>
						<input type="file" id="updateThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				$("#updateThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#updateExample").on('change', function () { onChangeValidationVideo(this); });
				break;
			case 'voice' :
				updateExampleFileEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				$("#updateExample").on('change', function () { onChangeValidationAudio(this); });
				break;
		}
	}



