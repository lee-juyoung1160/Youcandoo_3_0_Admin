
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {lengthInput, btnSubmit, title, contentImage, ucd,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { onChangeValidateImage, limitInputLength,} from "../modules/common.js";
	import {initInputNumber, isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		/** 이벤트 **/
		ucd .on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitGift(); });
	});

	function onSubmitGift()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		const url = fileApiV2.single;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url 	= api.createGift;
			const errMsg 	= label.submit+message.ajaxError;
			const param = {
				"notice_title" : title.val().trim(),
				"notice_image" : isEmpty(data) ? "" : data.image_urls.file,
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
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
		location.href = page.listGift;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`상품명은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(ucd.val()))
		{
			sweetToast(`금액은 ${message.required}`);
			ucd.trigger('focus');
			return false;
		}

		const contentImg = contentImage[0].files;
		if (contentImg.length === 0)
		{
			sweetToast(`상품 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}

