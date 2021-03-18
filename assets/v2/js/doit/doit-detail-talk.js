
	import {
	modalCreateTalk,
	modalBackdrop,
	talkDetailForm,
	talkListForm,
	talkUpdateForm,
	talk, searchTalkDateFrom, searchTalkDateTo, modalReplyTalk
} from "../modules/elements.js";
	import {overflowHidden} from "../modules/common.js";

	export function initSearchTalkForm()
	{
		searchTalkDateFrom.datepicker("setDate", "-6D");
		searchTalkDateTo.datepicker("setDate", "today");
	}

	export function onClickBtnTalkList()
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

	export function onClickDetailTalk()
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
	}

	export function getTalkList()
	{

	}

	export function onClickModalReplyTalkOpen()
	{
		modalReplyTalk.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}



