
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import {api, fileApiV2} from '../modules/api-url-v1.js';
	import {btnSubmit, contentImage, content, reserveDate, lengthInput, rdoExposure,  noticeTitle} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
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
		const param = { "idx" : noticeIdx }

		ajaxRequestWithJson(true, api.detailNotice, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
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
			$(this).prop('checked', $(this).val() === is_exposure);
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
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? updateRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const param = {
				"notice_uuid" : g_notice_uuid,
				"title" : noticeTitle.val().trim(),
				"contents" : content.val().trim(),
				"opened" : reserveDate.val(),
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
			}

			if (!isEmpty(data))
				param["notice_image_url"] = data.image_urls.file;

			ajaxRequestWithJson(true, api.updateNotice, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateSuccess);
				})
				.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
		}
		else
			sweetToast(data.msg);
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
