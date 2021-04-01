
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import { targetUrl, btnSubmit, contentImage, title,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
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
		const url = fileApiV2.single;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			const url = api.createStory;
			const errMsg = label.submit+message.ajaxError;
			const param = {
				"story_title" : title.val().trim(),
				"story_url" : targetUrl.val().trim(),
				"story_image_url" : data.image_urls.file,
				"is_exposure" : $("input[name=radio-exposure]:checked").val(),
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
