
	import { ajaxRequestWithJsonData} from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {lengthInput, btnSubmit, title, content, selFaqType} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { limitInputLength, } from "../modules/common.js";
	import {isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnSubmit	.on('click', function () { onSubmitFaq(); });
	});

	function onSubmitFaq()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const url 	= api.createFaq;
		const errMsg 	= label.submit+message.ajaxError;
		const param = {
			"faq_type" : selFaqType.val(),
			"faq_title" : title.val().trim(),
			"faq_contents" : content.val().trim(),
			"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),

		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listFaq;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			content.trigger('focus');
			return false;
		}

		return true;
	}

