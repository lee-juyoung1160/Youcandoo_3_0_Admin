
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js'
	import {api, fileApiV2} from '../modules/api-url.js';
	import {btnSubmit, inputNumber, bizWeb, lengthInput, contentImage, title, bizNo, content, thumbnail} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {onErrorImage, limitInputLength, onChangeValidateImage, calculateInputLength} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty, initInputNumber, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const bizIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		inputNumber 	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage	.on('change', function () { onChangeValidateImage(this); });
		btnSubmit		.on('click', function () { onSubmitUpdateBiz(); });
	});

	function getDetail()
	{
		const url = api.detailBiz;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : bizIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_company_uuid;
	function buildDetail(data)
	{
		const { company_uuid, company_number, profile_image_url, nickname, site_url, description } = data.data;

		g_company_uuid = company_uuid;

		title.text(nickname);
		bizNo.text(company_number);
		thumbnail.attr('src', profile_image_url);
		bizWeb.val(site_url);
		content.val(description);

		calculateInputLength();
		onErrorImage();
	}

	function onSubmitUpdateBiz()
	{
		if (validation())
		{
			const contentImg = contentImage[0].files;
			const requestFn = contentImg.length === 0 ? updateRequest : fileUploadReq;
			sweetConfirm(message.modify, requestFn);
		}
	}

	function fileUploadReq()
	{
		const url = fileApiV2.single;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url = api.updateBiz;
			const errMsg = label.submit+message.ajaxError;
			const param = {
				"company_uuid" : g_company_uuid,
				"company_site_url" : bizWeb.val().trim(),
				"contents" : content.val().trim(),
			}

			if (!isEmpty(data))
				param["company_image_url"] = data.image_urls.file;

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.detailBiz + bizIdx;
	}

	function validation()
	{
		if (isEmpty(bizWeb.val()))
		{
			sweetToast(`홈페이지는 ${message.required}`);
			bizWeb.trigger('focus');
			return false;
		}

		if (!isDomainName(bizWeb.val().trim()))
		{
			sweetToast(`홈페이지 형식을 ${message.doubleChk}`);
			bizWeb.trigger('focus');
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast(`기업 소개는 ${message.required}`);
			content.trigger('focus');
			return false;
		}

		return true;
	}


