
	import {
	missionCreateForm,
	missionDetailForm,
	missionListForm,
	missionUpdateForm,
	missionTitle,
	missionStartDate, missionEndDate, rdoActionType, promise
	} from "../modules/elements.js";

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
		promise.val('');
	}

	export function getMissionList()
	{

	}

	export function onSubmitMission()
	{

	}

	export function onSubmitUpdateMission()
	{

	}

	export function deleteMission()
	{

	}




