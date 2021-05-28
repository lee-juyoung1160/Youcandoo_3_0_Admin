
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js'
	import {api, fileApiV2} from '../modules/api-url.js';
	import {
	content,
	badgeTitle,
	contentImage,
	thumbnail,
	qualification,
	difficulty,
	selType,
	lengthInput,
	btnSubmit,
	rdoOpen,
	popupImage, rdoType, popupThumbnail,
} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {calculateInputLength, limitInputLength, onChangeValidateImage, onErrorImage} from "../modules/common.js";
	import {getPathName, initInputNumber, isEmpty,splitReverse,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const badgeIdx	= splitReverse(pathName, '/');

	$( () => {
		badgeTitle.trigger('focus');
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		qualification 	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		difficulty 	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		popupImage.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateBadge(); });
	});

	function getDetail()
	{
		const url = api.detailBadge;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : badgeIdx
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_badge_uuid;
	function buildDetail(data)
	{
		const { badge_uuid, title, description, image_url, popup_image_url, popup_lottie_type, type, terms, priority, is_display } = data.data;

		g_badge_uuid = badge_uuid;

		badgeTitle.val(title);
		content.val(description);
		selType.val(type);
		qualification.val(terms);
		difficulty.val(priority);
		thumbnail.attr('src', image_url);
		popupThumbnail.attr('src', popup_image_url);
		rdoType.each(function () {
			if ($(this).val() === popup_lottie_type)
				$(this).prop('checked', true);
		})
		rdoOpen.each(function () {
			if ($(this).val() === is_display)
				$(this).prop('checked', true);
		})

		onErrorImage();
		calculateInputLength();
	}

	function onSubmitUpdateBadge()
	{
		if (validation())
		{
			const imageFile = contentImage[0].files;
			const popupFile = popupImage[0].files;
			const requestFn = (imageFile.length > 0 || popupFile.length > 0)? fileUploadReq: updateRequest;
			sweetConfirm(message.modify, requestFn);
		}
	}

	function fileUploadReq()
	{
		const url = fileApiV2.mission;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		const imageFile = contentImage[0].files;
		const popupFile = popupImage[0].files;
		param.append('example', imageFile.length > 0 ? contentImage[0].files[0] : '');
		param.append('thumbnail', popupFile.length > 0 ? popupImage[0].files[0] : '');

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url = api.updateBadge;
			const errMsg = label.submit+message.ajaxError;
			const param = {
				"badge_uuid" : g_badge_uuid,
				"title" : badgeTitle.val().trim(),
				"description" : content.val().trim(),
				"popup_lottie_type" : $('input:radio[name=radio-type]:checked').val(),
				"type" : selType.val(),
				"terms" : qualification.val().trim(),
				"priority" : difficulty.val().trim(),
				"is_display" : $('input:radio[name=radio-open]:checked').val(),
			}

			if (!isEmpty(data))
			{
				const {example, thumbnail} = data.image_urls;
				if (!isEmpty(example))
					param["image_url"] = data.image_urls.example;
				if (!isEmpty(thumbnail))
					param["popup_image_url"] = data.image_urls.thumbnail;
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.detailBadge + badgeIdx;
	}

	function validation()
	{
		if (isEmpty(badgeTitle.val()))
		{
			sweetToast(`뱃지명은 ${message.required}`);
			badgeTitle.trigger('focus');
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

		return true;
	}
