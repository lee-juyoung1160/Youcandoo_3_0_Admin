
	import {ajaxRequestWithFile, ajaxRequestWithJson, isSuccessResp, invalidResp} from '../modules/ajax-request.js'
	import {api, fileApiV2} from '../modules/api-url.js';
	import {content, badgeTitle, contentImage, thumbnail, qualification, difficulty, selType, lengthInput,
		btnSubmit, rdoOpen, popupImage, rdoType, popupThumbnail,} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
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
		const param = { "idx" : badgeIdx }

		ajaxRequestWithJson(true, api.detailBadge, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
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
			$(this).prop('checked', $(this).val() === popup_lottie_type);
		})
		rdoOpen.each(function () {
			$(this).prop('checked', $(this).val() === is_display);
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
		let param  = new FormData();
		const imageFile = contentImage[0].files;
		const popupFile = popupImage[0].files;
		param.append('main_attach', imageFile.length > 0 ? contentImage[0].files[0] : '');
		param.append('sub_attach', popupFile.length > 0 ? popupImage[0].files[0] : '');

		ajaxRequestWithFile(true, fileApiV2.double, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? updateRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
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
				const {main_attach, sub_attach} = data.image_urls;
				if (!isEmpty(main_attach))
					param["image_url"] = main_attach;
				if (!isEmpty(sub_attach))
					param["popup_image_url"] = sub_attach;
			}

			ajaxRequestWithJson(true, api.updateBadge, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateSuccess);
				})
				.catch(reject => sweetError(label.modify + message.ajaxError));
		}
		else
			sweetToast(data.msg);
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
