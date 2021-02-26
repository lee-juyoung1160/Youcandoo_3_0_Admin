
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {
		lengthInput,
		categoryTitle,
		categoryIcon,
		btnSubmit, } from  '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { onChangeValidateImage, limitInputLength } from "../modules/common.js";
	import { isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		categoryTitle.trigger('focus');
		/** 이벤트 **/
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		categoryIcon	.on('change', function () { onChangeValidateImage(this); });
		btnSubmit		.on('click', function () { onSubmitCategory(); });
	});

	function onSubmitCategory()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let url = fileApiV2.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', categoryIcon[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			let url 	= api.createCategory;
			let errMsg 	= label.submit+message.ajaxError;
			let param = {
				"title" : categoryTitle.val(),
				"icon_image_url" : data.image_urls.file,
				"is_exposure" : $('input[name=radio-exposure]:checked').val(),
				"is_establish" : $('input[name=radio-establish]:checked').val(),
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
		location.href = page.listCategory;
	}

	function validation()
	{
		if (isEmpty(categoryTitle.val()))
		{
			sweetToast(`카테고리 명은 ${message.required}`);
			categoryTitle.trigger('focus');
			return false;
		}

		const categoryIcn = categoryIcon[0].files;
		if (categoryIcn.length === 0)
		{
			sweetToast(`카테고리 아이콘은 ${message.required}`);
			return false;
		}

		return true;
	}

