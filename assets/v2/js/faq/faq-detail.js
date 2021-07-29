
	import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url-v1.js';
	import {btnBack, btnList, btnUpdate, btnDelete, isExposure, content, faqType, faqTitle} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import {historyBack} from "../modules/common.js";
	import { getPathName, splitReverse, } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const faqIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
		btnDelete.on('click', function () { onSubmitDeleteFaq(); });
		btnUpdate.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		const param = { "idx" : faqIdx };

		ajaxRequestWithJson(true, api.detailFaq, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_faq_uuid;
	function buildDetail(data)
	{
		const { faq_uuid, faq_type, title, contents, is_exposure } = data.data;

		g_faq_uuid = faq_uuid;
		faqType.text(faq_type);
		faqTitle.text(title);
		content.text(contents);
		isExposure.text(is_exposure);
	}

	function onSubmitDeleteFaq()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const param = {
			"faq_uuid" : g_faq_uuid,
		}

		ajaxRequestWithJson(true, api.deleteFaq, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, deleteSuccess);
			})
			.catch(reject => sweetError(label.delete + message.ajaxError));
	}

	function deleteSuccess()
	{
		goListPage();
	}

	function goListPage()
	{
		location.href = page.listFaq;
	}

	function goUpdatePage()
	{
		location.href = page.updateFaq + faqIdx;
	}
