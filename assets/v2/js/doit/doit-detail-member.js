
	import {
		keyword, actionCount, joinMemberForm, pendingMemberForm
} from "../modules/elements.js";
	import {initSelectOption} from "../modules/common.js";

	export function onClickBtnPendingMembers()
	{
		pendingMemberForm.show();
		joinMemberForm.hide();
	}

	export function onClickBtnJoinMembers()
	{
		joinMemberForm.show();
		pendingMemberForm.hide();
	}

	export function initSearchMemberForm()
	{
		keyword.val('');
		actionCount.val('');
		initSelectOption();
	}

	export function getJoinMemberList()
	{

	}

	export function getPendingMemberList()
	{

	}




