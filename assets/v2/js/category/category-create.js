
	import {ajaxRequestWithFile, ajaxRequestWithJson, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {lengthInput, categoryTitle, categoryIcon, btnSubmit,} from  '../modules/elements.js';
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
		let param  = new FormData();
		param.append('file', categoryIcon[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? createRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`이미지 등록${message.ajaxError}`));
	}

	function createRequest(data)
	{
		const param = {
			"title" : categoryTitle.val().trim(),
			"icon_image_url" : data.image_urls.file,
			"is_exposure" : $('input[name=radio-exposure]:checked').val(),
		}

		ajaxRequestWithJson(true, api.createCategory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetToast(label.submit + message.ajaxError));
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
