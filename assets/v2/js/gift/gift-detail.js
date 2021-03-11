
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, btnUpdate, btnDelete } from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import { historyBack, onErrorImage} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const giftIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		//getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
		btnDelete.on('click', function () { onSubmitDeleteGift(); });
		btnUpdate.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		const url = api.detailGift;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : giftIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_gift_uuid;
	function buildDetail(data)
	{
		const { profile_uuid, nickname } = data.data;

		g_gift_uuid = profile_uuid;

		onErrorImage();
	}

	function onSubmitDeleteGift()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const url = api.deleteGift;
		const errMsg = label.delete + message.ajaxError;
		const param = {
			"gift_uuid" : g_gift_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess)
	}

	function deleteSuccess()
	{
		goListPage();
	}

	function goListPage()
	{
		location.href = page.listGift;
	}

	function goUpdatePage()
	{
		location.href = page.updateGift + giftIdx;
	}


