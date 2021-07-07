
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {lengthInput, btnSubmit, title, content, contentImage, difficulty, qualification, selType, popupImage,} from '../modules/elements.js';
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
		popupImage.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitBadge(); });
	});

	function onSubmitBadge()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('example', contentImage[0].files[0]);
		param.append('thumbnail', popupImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.mission, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? createRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`이미지 등록${message.ajaxError}`));
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			const param = {
				"title" : title.val().trim(),
				"description" : content.val().trim(),
				"image_url" : data.image_urls.example,
				"popup_image_url" : data.image_urls.thumbnail,
				"popup_lottie_type" : $('input:radio[name=radio-type]:checked').val(),
				"type" : selType.val(),
				"terms" : qualification.val().trim(),
				"priority" : difficulty.val().trim(),
				"is_display" : $('input:radio[name=radio-open]:checked').val(),
			}

			ajaxRequestWithJson(true, api.createBadge, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, createSuccess);
				})
				.catch(reject => sweetToast(label.submit + message.ajaxError));
		}
		else
			sweetToast(data.msg);
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

		const popupImg = popupImage[0].files;
		if (popupImg.length === 0)
		{
			sweetToast(`팝업 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}
