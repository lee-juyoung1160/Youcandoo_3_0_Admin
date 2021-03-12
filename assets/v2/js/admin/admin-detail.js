
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, btnUpdate, btnDelete} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {calculateInputLength, historyBack} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const adminIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		//getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
		btnDelete.on('click', function () { onSubmitDeleteAdmin(); });
		btnUpdate.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		const url = api.detailAdmin;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : adminIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_profile_uuid;
	function buildDetail(data)
	{
		const { profile_uuid, is_exposure } = data.data;

		g_profile_uuid = profile_uuid;

		calculateInputLength();
	}

	function onSubmitDeleteAdmin()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const url = api.deleteAdmin;
		const errMsg = label.delete + message.ajaxError;
		const param = {
			"profile_uuid" : g_profile_uuid,
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
		location.href = page.listAdmin;
	}

	function goUpdatePage()
	{
		location.href = page.updateAdmin + adminIdx;
	}


