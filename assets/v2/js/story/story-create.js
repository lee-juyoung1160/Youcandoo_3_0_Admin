
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url-v1.js';
	import { targetUrl, btnSubmit, contentImage, title,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {onChangeValidateImage,} from "../modules/common.js";
	import {isEmpty, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		/** 이벤트 **/
		contentImage.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitStory(); });
	});

	function onSubmitStory()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function createRequest(data)
	{
		const param = {
			"story_title" : title.val().trim(),
			"story_url" : targetUrl.val().trim(),
			"story_image_url" : data.image_urls.file,
			"is_exposure" : $("input[name=radio-exposure]:checked").val(),
		}

		ajaxRequestWithJson(true, api.createStory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function createSuccess()
	{
		location.href = page.listStory;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(targetUrl.val()))
		{
			sweetToast(`이동할 페이지는 ${message.required}`);
			targetUrl.trigger('focus');
			return false;
		}

		if (!isDomainName(targetUrl.val().trim()))
		{
			sweetToast(`이동할 페이지 형식을 ${message.doubleChk}`);
			targetUrl.trigger('focus');
			return false;
		}

		const storyImg = contentImage[0].files;
		if (storyImg.length === 0)
		{
			sweetToast(`스토리 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}
