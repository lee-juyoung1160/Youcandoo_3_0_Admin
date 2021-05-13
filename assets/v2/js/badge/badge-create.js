
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {lengthInput, btnSubmit, title, content, contentImage, difficulty, qualification, selType,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { onChangeValidateImage, limitInputLength,} from "../modules/common.js";
	import {initInputNumber, isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		qualification 	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		difficulty 	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitBadge(); });
	});

	function onSubmitBadge()
	{
		if (validation())
		{
			const imageFile = contentImage[0].files;
			const requestFn = imageFile.length === 0 ? createRequest : fileUploadReq;
			sweetConfirm(message.create, requestFn);
		}
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
			const url 	= api.createBadge;
			const errMsg 	= label.submit+message.ajaxError;
			const param = {
				"title" : title.val().trim(),
				"description" : content.val().trim(),
				"image_url" : data.image_urls.file,
				"type" : selType.val(),
				"terms" : qualification.val().trim(),
				"priority" : difficulty.val().trim(),
				"is_display" : $('input:radio[name=radio-open]:checked').val(),
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
		location.href = page.listBadge;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`뱃지명은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast(`설명은 ${message.required}`);
			content.trigger('focus');
			return false;
		}

		if (isEmpty(qualification.val()))
		{
			sweetToast(`취득조건은 ${message.required}`);
			qualification.trigger('focus');
			return false;
		}

		if (isEmpty(difficulty.val()))
		{
			sweetToast(`난이도는 ${message.required}`);
			difficulty.trigger('focus');
			return false;
		}

		const badgeImg = contentImage[0].files;
		if (badgeImg.length === 0)
		{
			sweetToast(`이미지는 ${message.required}`);
			return false;
		}

		return true;
	}

