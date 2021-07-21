
	import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url-v1.js';
	import {lengthInput, btnSubmit, title, content, selFaqType} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { limitInputLength, } from "../modules/common.js";
	import {isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		getFaqType();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnSubmit	.on('click', function () { onSubmitFaq(); });
	});

	function getFaqType()
	{
		ajaxRequestWithJson(false, api.faqType, null)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildFaqType(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`faq 타입${message.ajaxLoadError}`));
	}

	function buildFaqType(data)
	{
		if (!isEmpty(data.data) && data.data.length  > 0)
		{
			data.data.map(type => {
				if (type === '전체') return;
				selFaqType.append(`<option value="${type}">${type}</option>`);
			})
		}
	}

	function onSubmitFaq()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const param = {
			"faq_type" : selFaqType.val(),
			"title" : title.val().trim(),
			"contents" : content.val().trim(),
			"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
		}

		ajaxRequestWithJson(true, api.createFaq, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetToast(label.submit + message.ajaxError));
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

