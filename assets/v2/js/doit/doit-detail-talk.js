
	import {
		createTalkModal,
		modalBackdrop,
		talkDetailForm,
		talkListForm,
		talkUpdateForm,
		talk
	} from "../modules/elements.js";
	import {overflowHidden} from "../modules/common.js";

	export function onClickDetailTalk()
	{
		talkListForm.hide();
		talkDetailForm.show();
		talkUpdateForm.hide();
	}

	export function onClickBtnCreateTalk()
	{
		fadeinModalCreateTalk()
		talk.trigger('focus');
	}

	export function fadeinModalCreateTalk()
	{
		createTalkModal.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

	export function getTalkList()
	{

	}



