
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js'
	import {api, fileApi} from '../modules/api-url.js';
	import {
		btnSubmit, inputNumber, bizWeb, bizDesc, bizImage, nickname, lengthInput
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {onErrorImage, limitInputLength, onChangeValidateImage} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty, initInputNumber, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const bizIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		//getDetail();
		/** 이벤트 **/
		inputNumber 	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		bizImage		.on('change', function () { onChangeValidateImage(this); });
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

	let g_biz_uuid;
	function buildDetail(data)
	{
		let { profile_uuid, nickname } = data.data;

		g_biz_uuid = profile_uuid;

		onErrorImage();
	}

	function onSubmitUpdateBiz()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		const url = fileApi.single;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', bizImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url 	= api.updateBiz;
			const errMsg 	= label.submit+message.ajaxError;
			const param = {
				"nickname" : nickname.val(),
				"icon_image_url" : isEmpty(data) ? "" : data.image_urls.file,
			}

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
			sweetToast(`홈페이지 링크는 ${message.required}`);
			bizWeb.trigger('focus');
			return false;
		}

		if (!isDomainName(bizWeb.val().trim()))
		{
			sweetToast(`홈페이지 링크 형식을 ${message.doubleChk}`);
			bizWeb.trigger('focus');
			return false;
		}

		if (isEmpty(bizDesc.val()))
		{
			sweetToast(`소개내용은 ${message.required}`);
			bizDesc.trigger('focus');
			return false;
		}

		return true;
	}


