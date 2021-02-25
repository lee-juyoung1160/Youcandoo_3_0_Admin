
	import {missionCreateForm, missionDetailForm, missionListForm, missionUpdateForm} from "../modules/elements.js";

	export function onClickBtnCreateMission()
	{
		missionCreateForm.show();
		missionUpdateForm.hide();
		missionDetailForm.hide();
		missionListForm.hide();
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

	export function getMissionList()
	{

	}



