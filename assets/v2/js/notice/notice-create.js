
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {lengthInput, btnSubmit, title, content, reserveDate, contentImage,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { onChangeValidateImage, limitInputLength, setDateToday, initInputDatepickerMinDateToday } from "../modules/common.js";
	import {isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		initInputDatepickerMinDateToday();
		setDateToday();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitNotice(); });
	});

	function onSubmitNotice()
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
			const url 	= api.createNotice;
			const errMsg 	= label.submit+message.ajaxError;
			const param = {
				"title" : title.val().trim(),
				"contents" : content.val().trim(),
				"notice_image_url" : isEmpty(data) ? "" : data.image_urls.file,
				"opened" : reserveDate.val(),
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
		location.href = page.listNotice;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			content.trigger('focus');
			return false;
		}

		return true;
	}

