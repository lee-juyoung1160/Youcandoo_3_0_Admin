
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js'
	import {api, fileApiV2} from '../modules/api-url.js';
	import {btnSubmit, contentImage, content, reserveDate, lengthInput, rdoExposure,  noticeTitle} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {onErrorImage, limitInputLength, onChangeValidateImage, calculateInputLength, initInputDatepickerMinDateToday} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const noticeIdx	= splitReverse(pathName, '/');

	$( () => {
		initInputDatepickerMinDateToday();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage	.on('change', function () { onChangeValidateImage(this); });
		btnSubmit		.on('click', function () { onSubmitUpdateNotice(); });
	});

	function getDetail()
	{
		const url = api.detailNotice;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : noticeIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_notice_uuid;
	function buildDetail(data)
	{
		const { notice_uuid, title, contents, notice_image_url, opened, is_exposure } = data.data;

		g_notice_uuid = notice_uuid;
		noticeTitle.val(title);
		content.val(contents);
		if (!isEmpty(notice_image_url))
			contentImage.parent().after(`<div class="detail-img-wrap"><img src="${notice_image_url}" alt=""></div>`)
		reserveDate.val(opened.substring(0, 10));
		rdoExposure.each(function () {
			if ($(this).val() === is_exposure)
				$(this).prop('checked', true);
		});

		onErrorImage();
		calculateInputLength();
	}

	function onSubmitUpdateNotice()
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
			const url 	= api.updateNotice;
			const errMsg 	= label.modify+message.ajaxError;
			const param = {
				"notice_uuid" : g_notice_uuid,
				"title" : noticeTitle.val().trim(),
				"contents" : content.val().trim(),
				"opened" : reserveDate.val(),
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
			}

			if (!isEmpty(data))
				param["notice_image_url"] = data.image_urls.file;

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
		location.href = page.detailNotice + noticeIdx;
	}

	function validation()
	{
		if (isEmpty(noticeTitle.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			noticeTitle.trigger('focus');
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


