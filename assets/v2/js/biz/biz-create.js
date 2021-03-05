
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {lengthInput, title, bizNo, bizWeb, content, contentImage, btnSubmit, inputNumber,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { onChangeValidateImage, limitInputLength } from "../modules/common.js";
	import {isEmpty, isDomainName, initInputNumber, bizNoFormatter} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		/** 이벤트 **/
		inputNumber .on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitBiz(); });
	});

	function onSubmitBiz()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let url = fileApiV2.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			let url 	= api.createBiz;
			let errMsg 	= label.submit+message.ajaxError;
			let param = {
				"company_name" : title.val().trim(),
				"company_number" : bizNoFormatter(bizNo.val()),
				"company_site_url" : bizWeb.val().trim(),
				"contents" : content.val().trim(),
				"company_image_url" : data.image_urls.file
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listBiz;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`기업명은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(bizNo.val()))
		{
			sweetToast(`사업자번호는 ${message.required}`);
			bizNo.trigger('focus');
			return false;
		}

		const bizImg = contentImage[0].files;
		if (bizImg.length === 0)
		{
			sweetToast(`프로필 이미지는 ${message.required}`);
			return false;
		}

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

