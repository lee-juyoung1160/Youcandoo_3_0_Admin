
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, btnUpdate, btnDelete, isExposure, content, faqType, faqTitle} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
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
		const url = api.detailFaq;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : faqIdx
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
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
		const url = api.deleteFaq;
		const errMsg = label.delete + message.ajaxError;
		const param = {
			"faq_uuid" : g_faq_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
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


