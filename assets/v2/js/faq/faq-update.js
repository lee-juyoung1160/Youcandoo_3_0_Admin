
	import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import {api} from '../modules/api-url.js';
	import {btnSubmit, content, lengthInput, rdoExposure, selFaqType, faqTitle,} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {limitInputLength, calculateInputLength} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const faqIdx	= splitReverse(pathName, '/');

	$( () => {
		initPage();
		/** 이벤트 **/
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnSubmit		.on('click', function () { onSubmitUpdateFaq(); });
	});

	function initPage()
	{
		ajaxRequestWithJson(false, api.faqType, null)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildFaqType(data) : sweetToast(invalidResp(data));
				await getDetail();
			})
			.catch(reject => sweetToast(`faq 타입${message.ajaxLoadError}`));
	}

	function buildFaqType(data)
	{
		if (!isEmpty(data.data) && data.data.length  > 0)
		{
			data.data.map(type => {
				selFaqType.append(`<option value="${type}">${type}</option>`);
			})
		}
	}

	function getDetail()
	{
		const param = { "idx" : faqIdx };

		ajaxRequestWithJson(true, api.detailFaq,  JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(label.detailContent + message.ajaxLoadError));
	}

	let g_faq_uuid;
	function buildDetail(data)
	{
		const { faq_uuid, faq_type, title, contents, is_exposure } = data.data;

		g_faq_uuid = faq_uuid;
		selFaqType.val(faq_type);
		faqTitle.val(title);
		content.val(contents);
		rdoExposure.each(function () {
			$(this).prop('checked', $(this).val() === is_exposure);
		});

		calculateInputLength();
	}

	function onSubmitUpdateFaq()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		const param = {
			"faq_uuid" : g_faq_uuid,
			"faq_type" : selFaqType.val(),
			"title" : faqTitle.val(),
			"contents" : content.val(),
			"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
		}

		ajaxRequestWithJson(true, api.updateFaq,  JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, updateSuccess);
			})
			.catch(reject => sweetToast(label.modify + message.ajaxError));
	}

	function updateSuccess()
	{
		location.href = page.detailFaq + faqIdx;
	}

	function validation()
	{
		if (isEmpty(faqTitle.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			faqTitle.trigger('focus');
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
