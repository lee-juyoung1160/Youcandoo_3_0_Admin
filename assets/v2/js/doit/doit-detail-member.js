
	import {
	keyword, actionCount, joinMemberForm, pendingMemberForm, modalSaveUcd, modalBackdrop, saveUcdContent, saveUcdEtc, amount
} from "../modules/elements.js";
	import {initSelectOption, overflowHidden,} from "../modules/common.js";

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

	export function onClickModalSaveUcdOpen()
	{
		modalSaveUcd.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		saveUcdContent.trigger('focus');
		saveUcdContent.val('');
		amount.val('');
		saveUcdEtc.val();
	}




