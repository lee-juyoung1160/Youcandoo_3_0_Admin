
	import { api } from '../modules/api-url.js';
	import {btnSubmit,} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
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
		btnSubmit	.on('click', function () { onSubmitUpdateAdmin(); });
	});

	function getDetail()
	{
		const url = api.detailAdmin;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : adminIdx
		}

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
	}

	function onSubmitUpdateAdmin()
	{
		sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		const url = api.updateAdmin;
		const errMsg = label.modify + message.ajaxError;
		const param = {
			"profile_uuid" : g_profile_uuid,
		}

	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.detailAdmin + adminIdx;
	}
