
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js'
	import {api, fileApiV2} from '../modules/api-url.js';
	import {lengthInput, btnSubmit, price, contentImage, giftName, rdoExposure} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {calculateInputLength, limitInputLength, onChangeValidateImage, onErrorImage} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty, initInputNumber,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const giftIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		price .on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateGift(); });
	});

	function getDetail()
	{
		const url = api.detailGift;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : giftIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_gift_uuid;
	function buildDetail(data)
	{
		const { gift_uuid, gift_name, gift_ucd, gift_image_url, is_exposure } = data.data;

		g_gift_uuid = gift_uuid;
		giftName.val(gift_name);
		price.val(gift_ucd);
		$(contentImage).parent().after(`<div class="detail-img-wrap"><img src="${gift_image_url}" alt=""></div>`);
		rdoExposure.each(function () {
			if ($(this).val() === is_exposure)
				$(this).prop('checked', true);
		})

		onErrorImage();
		calculateInputLength();
	}

	function onSubmitUpdateGift()
	{
		if (validation())
		{
			const contentImgFile = contentImage[0].files;
			const callback = contentImgFile.length > 0 ? fileUploadReq : updateRequest;

			sweetConfirm(message.modify, callback);
		}
	}

	function fileUploadReq()
	{
		const url = fileApiV2.single;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url 	= api.updateGift;
			const errMsg 	= label.modify+message.ajaxError;
			const param = {
				"gift_uuid" : g_gift_uuid,
				"gift_name" : giftName.val().trim(),
				"gift_ucd" : price.val().trim(),
				"is_exposure" : $("input[name=radio-exposure]:checked").val(),
			}

			if (!isEmpty(data))
				param["gift_image_url"] = data.image_urls.file;

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
		location.href = page.detailGift + giftIdx;
	}

	function validation()
	{
		if (isEmpty(giftName.val()))
		{
			sweetToast(`상품명은 ${message.required}`);
			giftName.trigger('focus');
			return false;
		}

		if (isEmpty(price.val()))
		{
			sweetToast(`금액은 ${message.required}`);
			price.trigger('focus');
			return false;
		}

		return true;
	}


