
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url-v1.js';
	import {targetUrl, btnSubmit, title, thumbnail, contentImage, rdoExposure,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {onChangeValidateImage, onErrorImage, calculateInputLength,} from "../modules/common.js";
	import {isEmpty, isDomainName, getPathName, splitReverse} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const storyIdx	= splitReverse(pathName, '/');

	$( () => {
		title.trigger('focus');
		getDetail();
		/** 이벤트 **/
		contentImage	.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateBanner(); });
	});

	function getDetail()
	{
		const param = { "story_idx" : storyIdx }

		ajaxRequestWithJson(true, api.detailStory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(label.detailContent + message.ajaxLoadError));
	}

	let g_story_uuid;
	function buildDetail(data)
	{
		const { story_uuid, story_title, story_url, story_image_url, is_exposure } = data.data;

		g_story_uuid = story_uuid;

		title.val(story_title);
		targetUrl.val(story_url);
		rdoExposure.each(function () {
			$(this).prop('checked', $(this).val() === is_exposure);
		});
		thumbnail.attr('src', story_image_url);

		calculateInputLength();
		onErrorImage();
	}

	function onSubmitUpdateBanner()
	{
		if (validation())
		{
			const storyImg = contentImage[0].files;
			const requestFn = storyImg.length === 0 ? updateRequest : fileUploadReq;
			sweetConfirm(message.modify, requestFn);
		}
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? updateRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`이미지 등록${message.ajaxError}`));
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const param = {
				"story_uuid" : g_story_uuid,
				"story_title" : title.val().trim(),
				"story_url" : targetUrl.val().trim(),
				"is_exposure" : $("input[name=radio-exposure]:checked").val(),
			}

			if (!isEmpty(data))
				param["story_image_url"] = data.image_urls.file;

			ajaxRequestWithJson(true, api.updateStory, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateSuccess);
				})
				.catch(reject => sweetToast(label.detailContent + message.ajaxLoadError));
		}
	}

	function updateSuccess()
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

		return true;
	}
