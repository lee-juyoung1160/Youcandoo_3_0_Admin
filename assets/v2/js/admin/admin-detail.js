
	import { api } from '../modules/api-url-v1.js';
	import {btnBack, btnList, btnUpdate, btnDelete, authName, bizName, username, useremail, isApproval, isExposure} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import {calculateInputLength, historyBack} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";

	const pathName	= getPathName();
	const adminIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
		btnDelete.on('click', function () { onSubmitDeleteAdmin(); });
		btnUpdate.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		const param = { "idx" : adminIdx }

		ajaxRequestWithJson(true, api.detailAdmin, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent+message.ajaxLoadError));
	}

	let g_userid;
	function buildDetail(data)
	{
		const { userid, auth_name, company_name, name, email, status, is_active } = data.data;

		g_userid = userid

		authName.text(auth_name);
		bizName.text(isEmpty(company_name) ? label.dash : company_name);
		username.text(name);
		useremail.text(email);
		isApproval.text(status);
		isExposure.text(is_active);
	}

	function onSubmitDeleteAdmin()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const param = { "adminid" : g_userid }

		ajaxRequestWithJson(true, api.deleteAdmin, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, goListPage);
			})
			.catch(reject => sweetError(`삭제${message.ajaxError}`));
	}

	function goListPage()
	{
		location.href = page.listAdmin;
	}

	function goUpdatePage()
	{
		location.href = page.updateAdmin + adminIdx;
	}
