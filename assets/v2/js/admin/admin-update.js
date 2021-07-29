
	import { api } from '../modules/api-url-v1.js';
	import {btnSubmit, isApproval, rdoStatus, selAuthType, selBiz, useremail, username,} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";

	const pathName	= getPathName();
	const adminIdx	= splitReverse(pathName, '/');

	$( () => {
		initPage();
		/** 이벤트 **/
		selAuthType.on('change', function () { onChangeAuth(this) });
		btnSubmit.on('click', function () { onSubmitUpdateAdmin(); });
	});

	function initPage()
	{
		ajaxRequestWithJson(false, api.authList, null)
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					await buildAuthType(data);
					await getBiz();
					await getDetail();
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`권한 목록을${message.ajaxLoadError}`));
	}

	function buildAuthType(data)
	{
		let options = '<option value="all">전체</option>';
		if (!isEmpty(data.data) && data.data.length  > 0)
		{
			data.data.map(auth => {
				const {code, name} = auth;
				options += `<option value="${code}">${name}</option>`;
			})
		}

		selAuthType.html(options);
	}

	function getDetail()
	{
		const param = { "idx" : adminIdx }

		ajaxRequestWithJson(true, api.detailAdmin, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent+message.ajaxLoadError));
	}

	let g_userid;
	function buildDetail(data)
	{
		const { userid, auth_code, company_idx, name, email, status, is_active } = data.data;

		g_userid = userid;

		selAuthType.val(auth_code);
		onChangeAuth(selAuthType);
		if (!isEmpty(company_idx))
			selBiz.val(company_idx);
		username.text(name);
		useremail.text(email);
		isApproval.text(status);
		rdoStatus.each(function () {
			$(this).prop('checked', $(this).val() === is_active)
		});
	}

	function onSubmitUpdateAdmin()
	{
		if (selAuthType.val() === 'biz' && isEmpty(selBiz.val()))
		{
			sweetToast(`기업명을 ${message.select}`);
			return;
		}

		sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		const param = {
			"auth_code" : selAuthType.val(),
			"is_active" : $("input[name=radio-status]:checked").val(),
			"userid" : g_userid
		}

		if (selAuthType.val() === 'biz')
			param["company_idx"] = selBiz.val()

		ajaxRequestWithJson(true, api.updateAdmin, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, updateSuccess);
			})
			.catch(reject => sweetError(label.modify + message.ajaxError));
	}

	function updateSuccess()
	{
		location.href = page.detailAdmin + adminIdx;
	}

	function onChangeAuth(obj)
	{
		selBiz.val('');
		selBiz.prop('disabled', $(obj).val() !== 'biz');
	}

	function getBiz()
	{
		ajaxRequestWithJson(false, api.authBizList, null)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildBiz(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`기업 목록을${message.ajaxLoadError}`));
	}

	function buildBiz(data)
	{
		if (!isEmpty(data.data) && data.data.length > 0)
		{
			let options = '<option value="">선택</option>';
			data.data.map(biz => {
				const {idx, nickname} = biz;
				options += `<option value="${idx}">${nickname}</option>`;
			})

			selBiz.html(options);
		}
	}
