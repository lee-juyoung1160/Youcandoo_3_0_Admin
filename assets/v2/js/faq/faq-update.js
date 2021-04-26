
	import {ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js'
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
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnSubmit		.on('click', function () { onSubmitUpdateFaq(); });
	});

	function getDetail()
	{
		const url = api.detailFaq;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : faqIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
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
			if ($(this).val() === is_exposure)
				$(this).prop('checked', true);
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
		const url = api.updateFaq;
		const errMsg = label.modify+message.ajaxError;
		const param = {
			"faq_uuid" : g_faq_uuid,
			"faq_type" : selFaqType.val(),
			"title" : faqTitle.val(),
			"contents" : content.val(),
			"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateReqCallback, errMsg, false);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
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


