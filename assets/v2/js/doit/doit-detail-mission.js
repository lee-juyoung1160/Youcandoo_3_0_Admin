
	import {
		missionCreateForm, missionDetailForm, missionListForm, missionUpdateForm, missionTitle, missionStartDate,
		missionEndDate, rdoActionType, promise, actionExampleWrap, missionTable, infoMissionDate, infoMissionTime,
		infoActionType, infoActionExampleWrap, infoActionExampleDesc, infoPromise, updateMissionStartDate,
		updateMissionEndDate, updateMissionStartTime, updateMissionEndTime, rdoUpdateActionType, updatePromise,
		missionStartTime, missionEndTime, chkGalleryAllowed, infoMissionTitle, chkUpdateGalleryAllowed, chkPermanent,
		updateMissionTitle, updateActionExampleDesc, updateExampleWrap, chkUpdatePermanent, actionExampleDesc, btnDeleteMission
	} from "../modules/elements.js";
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from "../modules/alert.js";
	import {message} from "../modules/message.js";
	import {onChangeValidateImage, onChangeValidationVideo, onChangeValidationAudio, onErrorImage} from "../modules/common.js";
	import {isEmpty, replaceAll} from "../modules/utils.js";
	import {label} from "../modules/label.js";
	import {toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";
	import {g_doit_uuid} from "./doit-detail-info.js";
	import {ajaxRequestWithFile, ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import {fileApiV2, api} from "../modules/api-url.js";

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

	export function showMissionDetailForm()
	{
		missionCreateForm.hide();
		missionUpdateForm.hide();
		missionDetailForm.show();
		missionListForm.hide();
	}

	export function initMissionCreateForm()
	{
		missionTitle.trigger('focus');
		missionTitle.val('');
		missionStartDate.datepicker("option", "minDate", "today");
		missionEndDate.datepicker("option", "minDate", "today");
		missionStartDate.datepicker("setDate", "today");
		missionEndDate.datepicker("setDate", "9999-12-31");
		chkPermanent.prop('checked', true);
		onChangeCheckPermanent(chkPermanent);
		rdoActionType.eq(0).prop('checked', true);
		onChangeActionType();
		actionExampleDesc.val('');
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
					const param = { "doit_uuid": g_doit_uuid }

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
				,{title: "총 참여 인원",   data: "state",  			width: "15%",	visible: false }
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
				$(nRow).children().eq(0).on('click', function () { onClickMissionName(aData.idx); });
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	let g_mission_idx;
	function onClickMissionName(idx)
	{
		g_mission_idx = idx;
		showMissionDetailForm();
		getMissionDetail();
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

		const actionStartTime = Number(replaceAll(missionStartTime.val(), ':', ''));
		const actionEndTime	= Number(replaceAll(missionEndTime.val(), ':', ''));
		if (actionStartTime > actionEndTime)
		{
			sweetToast(message.compareActionTime);
			missionStartTime.trigger('focus');
			return false;
		}

		const actionExampleThumbnail = $("#actionExampleThumbnail");
		if (actionExampleThumbnail.length > 0 && actionExampleThumbnail[0].files.length === 0)
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

		if (isEmpty(actionExampleDesc.val()))
		{
			sweetToast(`인증 예시 설명은 ${message.required}`);
			actionExampleDesc.trigger('focus');
			return false;
		}

		const promiseLength = promise.val().trim().split('\n').length;
		if (promiseLength > 5)
		{
			sweetToast(`공약은 5줄 이하로 ${message.input}`);
			promise.trigger('focus');
			return false;
		}

		return true;
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('main_attach', $("#actionExample")[0].files[0]);
		if (getActionType() === label.video)
			param.append('sub_attach', $("#actionExampleThumbnail")[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.double, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function createRequest(data)
	{
		const missionExampleObj = {
			"contents_type" : getActionType(),
			"path" : data.image_urls.main_attach
		}
		if (getActionType() === label.video)
			missionExampleObj['thumbnail_path'] = data.image_urls.sub_attach;

		const param = {
			"doit_uuid" : g_doit_uuid,
			"mission_title" : missionTitle.val().trim(),
			"start_date" : missionStartDate.val(),
			"end_date" : chkPermanent.is(':checked') ? '9999-12-31' : missionEndDate.val(),
			"start_time" : missionStartTime.val().trim(),
			"end_time" : missionEndTime.val().trim(),
			"mission_description" : actionExampleDesc.val().trim(),
			"mission_type" : getActionType(),
			"allow_gallery_image" : chkGalleryAllowed.is(':checked') ? 'Y' : 'N',
			"mission_example" :  missionExampleObj,
			"promise_description" : promise.val().trim(),
		}

		ajaxRequestWithJson(true, api.createMission, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, reqSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function getMissionDetail()
	{
		const param = { "idx" : g_mission_idx };

		ajaxRequestWithJson(true, api.detailMission, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildMissionDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_mission_uuid;
	let g_action_type;
	function buildMissionDetail(data)
	{
		const { idx, mission_uuid, state, mission_title, start_date, end_date, start_time, end_time,
			mission_type, allow_gallery_image, mission_description, promise_description } = data.data;
		g_mission_uuid = mission_uuid;
		g_action_type = mission_type;
		if (state === '진행중')
			btnDeleteMission.hide();

		infoMissionTitle.html(buildMissionStatus(state)+mission_title);
		infoMissionDate.text(`${start_date} ~ ${end_date}`);
		infoMissionTime.text(`${start_time} ~ ${end_time}`);
		infoActionType.text(`${getStrActionType(mission_type)} (갤러리 허용 : ${allow_gallery_image})`);
		infoActionExampleWrap.html(buildExample(data.data));
		infoActionExampleDesc.text(mission_description);
		infoPromise.text(isEmpty(promise_description) ? label.dash : promise_description);

		/** 수정폼 **/
		updateMissionTitle.val(mission_title);
		updateMissionStartDate.val(start_date);
		updateMissionEndDate.val(end_date);
		updateMissionStartDate.datepicker("option", "minDate", start_date);
		updateMissionEndDate.datepicker("option", "minDate", start_date);
		chkUpdatePermanent.prop('checked', end_date === '9999-12-31');
		onChangeUpdateCheckPermanent(chkUpdatePermanent);
		updateMissionStartTime.val(start_time);
		updateMissionEndTime.val(end_time);
		rdoUpdateActionType.each(function () {
			$(this).prop('checked', $(this).val() === mission_type);
		});
		chkUpdateGalleryAllowed.prop('checked', allow_gallery_image === 'Y');
		buildUpdateExampleFile(data.data);
		updateActionExampleDesc.val(mission_description);
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
			case label.image :
				return `<img src="${url}" alt="">`;
			case label.video :
				return `<video controls><source src="${url}"></video>`;
			case label.audio :
				return `<audio controls><source src="${url}"></audio>`;
		}
	}

	function getStrActionType(_actionType)
	{
		switch (_actionType) {
			case label.image :
				return '사진';
			case label.video :
				return '영상';
			case label.audio :
				return '음성';
		}
	}

	export function deleteMission()
	{
		sweetConfirm(message.delete, deleteMissionRequest);
	}

	function deleteMissionRequest()
	{
		const param = { "mission_uuid" : g_mission_uuid };

		ajaxRequestWithJson(true, api.deleteMission, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, reqSuccess);
			})
			.catch(reject => sweetError(label.delete + message.ajaxError));
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
				(exampleFile.length > 0 || (getUpdateActionType() === label.video && $("#updateThumbnail")[0].files.length > 0))
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

		const actionStartTime = Number(replaceAll(updateMissionStartTime.val(), ':', ''));
		const actionEndTime	= Number(replaceAll(updateMissionEndTime.val(), ':', ''));
		if (actionStartTime > actionEndTime)
		{
			sweetToast(message.compareActionTime);
			updateMissionStartTime.trigger('focus');
			return false;
		}

		const updateThumbnail = $("#updateThumbnail");
		const updateExample = $("#updateExample");
		if (getUpdateActionType() !== g_action_type && ( (updateThumbnail.length > 0 && updateThumbnail[0].files.length === 0) || updateExample[0].files.length === 0) )
		{
			sweetToast(`인증 방법이 변경됐습니다. 인증 예시를 첨부해주세요.`);
			return false;
		}

		if (isEmpty(updateActionExampleDesc.val()))
		{
			sweetToast(`인증 예시 설명은 ${message.required}`);
			updateActionExampleDesc.trigger('focus');
			return false;
		}

		const promiseLength = updatePromise.val().trim().split('\n').length;
		if (promiseLength > 5)
		{
			sweetToast(`공약은 5줄 이하로 ${message.input}`);
			updatePromise.trigger('focus');
			return false;
		}

		return true;
	}

	function updateFileUploadReq()
	{
		let param  = new FormData();
		param.append('main_attach', $("#updateExample")[0].files[0]);
		if (getUpdateActionType() === label.video)
			param.append('sub_attach', $("#updateThumbnail")[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.double, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? updateRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const param = {
				"mission_uuid" : g_mission_uuid,
				"mission_title" : updateMissionTitle.val().trim(),
				"start_date" : updateMissionStartDate.val(),
				"end_date" : chkUpdatePermanent.is(':checked') ? '9999-12-31' : updateMissionEndDate.val(),
				"start_time" : updateMissionStartTime.val().trim(),
				"end_time" : updateMissionEndTime.val().trim(),
				"mission_description" : updateActionExampleDesc.val().trim(),
				"mission_type" : getUpdateActionType(),
				"allow_gallery_image" : chkUpdateGalleryAllowed.is(':checked') ? 'Y' : 'N',
				"promise_description" : updatePromise.val().trim(),
			}

			if (!isEmpty(data))
			{
				const missionExampleObj = {
					"contents_type" : getUpdateActionType(),
					"path" : data.image_urls.main_attach
				}
				if (getUpdateActionType() === label.video)
					missionExampleObj['thumbnail_path'] = data.image_urls.sub_attach;

				param["mission_example"] =  missionExampleObj;
			}

			ajaxRequestWithJson(true, api.updateMission, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateSuccess);
				})
				.catch(reject => sweetError(label.modify + message.ajaxError));
		}
	}

	function updateSuccess()
	{
		showMissionDetailForm();
		getMissionDetail();
		buildMissionTable();
	}

	export function onChangeMissionStartDate()
	{
		missionEndDate.datepicker("option", "minDate", new Date(missionStartDate.datepicker("getDate")));
	}

	export function onChangeMissionEndDate()
	{
		missionStartDate.datepicker("option", "maxDate", new Date(missionEndDate.datepicker("getDate")));
	}

	export function onChangeUpdateMissionStartDate()
	{
		updateMissionEndDate.datepicker("option", "minDate", new Date(updateMissionStartDate.datepicker("getDate")));
	}

	export function onChangeUpdateMissionEndDate()
	{
		updateMissionStartDate.datepicker("option", "maxDate", new Date(updateMissionEndDate.datepicker("getDate")));
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
			case label.image :
				exampleFileEl =
					`<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExample">업로드</label>
						<input type="file" id="actionExample" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>`;
				actionExampleWrap.html(exampleFileEl);
				chkGalleryAllowed.prop('checked', false);
				chkGalleryAllowed.prop('disabled', false);
				$("#actionExample").on('change', function () { onChangeValidateImage(this); });
				break;
			case label.video :
				exampleFileEl =
					`<p class="desc-sub">썸네일</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExampleThumbnail">업로드</label>
						<input type="file" id="actionExampleThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExample">업로드</label>
						<input type="file" id="actionExample" class="upload-hidden">
					</div>`;
				actionExampleWrap.html(exampleFileEl);
				chkGalleryAllowed.prop('checked', false);
				chkGalleryAllowed.prop('disabled', true);
				$("#actionExampleThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#actionExample").on('change', function () { onChangeValidationVideo(this); });
				break;
			case label.audio :
				exampleFileEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExample">업로드</label>
						<input type="file" id="actionExample" class="upload-hidden">
					</div>`;
				actionExampleWrap.html(exampleFileEl);
				chkGalleryAllowed.prop('checked', false);
				chkGalleryAllowed.prop('disabled', true);
				$("#actionExample").on('change', function () { onChangeValidationAudio(this); });
				break;
		}
	}

	function buildUpdateExampleFile(_data)
	{
		const { mission_type, contents_url, thumbnail_url } = _data;
		let updateExampleFileEl = '';
		switch (mission_type) {
			case label.image :
				updateExampleFileEl =
					`<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>
					<div class="detail-img-wrap">
						<img src="${contents_url}" alt="">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				chkUpdateGalleryAllowed.prop('disabled', false);
				$("#updateExample").on('change', function () { onChangeValidateImage(this); });
				break;
			case label.video :
				updateExampleFileEl =
					`<p class="desc-sub">썸네일</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateThumbnail">업로드</label>
						<input type="file" id="updateThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="">
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
				chkUpdateGalleryAllowed.prop('checked', false);
				chkUpdateGalleryAllowed.prop('disabled', true);
				$("#updateThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#updateExample").on('change', function () { onChangeValidationVideo(this); });
				break;
			case label.audio :
				updateExampleFileEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				chkUpdateGalleryAllowed.prop('checked', false);
				chkUpdateGalleryAllowed.prop('disabled', true);
				$("#updateExample").on('change', function () { onChangeValidationAudio(this); });
				break;
		}
	}

	export function onChangeUpdateActionType()
	{
		let updateExampleFileEl = '';
		switch (getUpdateActionType()) {
			case label.image :
				updateExampleFileEl =
					`<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				chkUpdateGalleryAllowed.prop('checked', false);
				chkUpdateGalleryAllowed.prop('disabled', false);
				$("#updateExample").on('change', function () { onChangeValidateImage(this); });
				break;
			case label.video :
				updateExampleFileEl =
					`<p class="desc-sub">썸네일</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateThumbnail">업로드</label>
						<input type="file" id="updateThumbnail" class="upload-hidden" data-width="650" data-height="650" data-compare="">
					</div>
					<p class="desc-sub">영상 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				chkUpdateGalleryAllowed.prop('checked', false);
				chkUpdateGalleryAllowed.prop('disabled', true);
				$("#updateThumbnail").on('change', function () { onChangeValidateImage(this); });
				$("#updateExample").on('change', function () { onChangeValidationVideo(this); });
				break;
			case label.audio :
				updateExampleFileEl =
					`<p class="desc-sub">음성 ( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="updateExample">업로드</label>
						<input type="file" id="updateExample" class="upload-hidden">
					</div>`;
				updateExampleWrap.html(updateExampleFileEl);
				chkUpdateGalleryAllowed.prop('checked', false);
				chkUpdateGalleryAllowed.prop('disabled', true);
				$("#updateExample").on('change', function () { onChangeValidationAudio(this); });
				break;
		}
	}

	export function onChangeCheckPermanent(obj)
	{
		const isPermanent = $(obj).is(':checked');

		missionEndDate.prop('disabled', isPermanent);

		isPermanent ? missionEndDate.datepicker("setDate", "9999-12-31") : missionEndDate.datepicker("setDate", "today");
	}

	export function onChangeUpdateCheckPermanent(obj)
	{
		const isPermanent = $(obj).is(':checked');

		updateMissionEndDate.prop('disabled', isPermanent);

		isPermanent ? updateMissionEndDate.datepicker("setDate", "9999-12-31") : updateMissionEndDate.datepicker("setDate", "today");
	}
