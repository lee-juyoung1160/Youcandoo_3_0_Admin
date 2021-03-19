
	import {
	keyword,
	actionCount,
	joinMemberForm,
	pendingMemberForm,
	modalSaveUcd,
	modalBackdrop,
	saveUcdContent,
	saveUcdEtc,
	amount,
	modalSendNotice, modalMemberDetail, memberActionCntFilterWrap1, memberActionCntFilterWrap2, rdoActionCount
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

	export function onChangeSelMemberFilter(obj)
	{
		const filterValue = $(obj).val();
		if (filterValue === 'today')
		{
			memberActionCntFilterWrap1.hide();
			memberActionCntFilterWrap2.show();
			rdoActionCount.eq(0).prop('checked', true);
		}
		else
		{
			memberActionCntFilterWrap1.show();
			memberActionCntFilterWrap2.hide();
			actionCount.val('');
		}
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

	export function onClickModalSendNoticeOpen()
	{
		modalSendNotice.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

	export function onClickModalMemberDetailOpen()
	{
		modalMemberDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}




