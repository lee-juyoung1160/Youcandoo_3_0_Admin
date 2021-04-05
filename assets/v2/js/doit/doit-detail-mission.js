
	import {
	missionCreateForm, missionDetailForm, missionListForm, missionUpdateForm,
	missionTitle, missionStartDate, missionEndDate, rdoActionType, promise, doitImage, actionExampleWrap,
} from "../modules/elements.js";
	import {sweetConfirm} from "../modules/alert.js";
	import {message} from "../modules/message.js";
	import {fileApiV2} from "../modules/api-url.js";
	import {ajaxRequestWithFormData} from "../modules/request.js";
	import {onChangeValidateImage, onChangeValidationVideo, onChangeValidationAudio} from "../modules/common.js";

	export function onClickBtnCreateMission()
	{
		missionCreateForm.show();
		missionUpdateForm.hide();
		missionDetailForm.hide();
		missionListForm.hide();
		initMissionCreateForm();
	}

	export function onClickBtnMissionList()
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

	export function onClickDetailMission()
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
		rdoActionType.eq(0).prop('checked', true);
		onChangeActionType();
		promise.val('');
	}

	export function onChangeActionType()
	{
		let actionExampleFileEl = '';
		switch (getActionType()) {
			case 'image' :
				actionExampleFileEl =
					`<p class="desc-sub">( 이미지 크기 : 650 x 650 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExample">업로드</label>
						<input type="file" id="actionExample" class="upload-hidden" data-width="650" data-height="650" data-compare="같음">
					</div>`;
				actionExampleWrap.html(actionExampleFileEl);
				$("#actionExample").on('change', function () { onChangeValidateImage(this); });
				break;
			case 'video' :
				actionExampleFileEl =
					`<p class="desc-sub">( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExample">업로드</label>
						<input type="file" id="actionExample" class="upload-hidden">
					</div>`;
				actionExampleWrap.html(actionExampleFileEl);
				$("#actionExample").on('change', function () { onChangeValidationVideo(this); });
				break;
			case 'voice' :
				actionExampleFileEl =
					`<p class="desc-sub">( 파일 크기 : 10M 이하 )</p>
					<div class="file-wrap preview-image">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="actionExample">업로드</label>
						<input type="file" id="actionExample" class="upload-hidden">
					</div>`;
				actionExampleWrap.html(actionExampleFileEl);
				$("#actionExample").on('change', function () { onChangeValidationAudio(this); });
				break;
		}
	}

	export function getMissionList()
	{

	}

	export function onSubmitMission()
	{
		if (missionCreateValidation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function missionCreateValidation()
	{
		getActionType()
	}

	function fileUploadReq()
	{
		const url = fileApiV2.misson;
		const errMsg = `이미지 등록 ${message.ajaxError}`;

		let param  = new FormData();
		param.append('file', doitImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	export function onSubmitUpdateMission()
	{

	}

	export function deleteMission()
	{

	}

	export function onChangeMissionStartDate()
	{
		missionEndDate.datepicker("option", "minDate", new Date(missionStartDate.datepicker("getDate")));
	}

	export function onChangeMissionEndDate()
	{
		missionStartDate.datepicker("option", "minDate", new Date(missionEndDate.datepicker("getDate")));
	}

	function getActionType()
	{
		return $("input[name=radio-action-type]:checked").val();
	}



