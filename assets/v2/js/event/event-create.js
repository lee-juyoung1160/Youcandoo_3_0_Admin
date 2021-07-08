
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {lengthInput, btnSubmit, selEventType, title, content, eventNotice, link, dateFrom, dateTo, contentImage, thumbnailImage,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { onChangeValidateImage, limitInputLength, initInputDateRangeWeek, initInputDatepickerMinDateToday } from "../modules/common.js";
	import {isEmpty, isDisplay, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const linkWrap = link.parents('tr');
	const contentWrap = content.parents('tr');
	const noticeWrap = eventNotice.parents('tr');
	const contentImgWrap = contentImage.parents('tr');
	const dateWrap = dateFrom.parents('tr');

	$( () => {
		initInputDatepickerMinDateToday();
		initInputDateRangeWeek();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		selEventType.on('change', function () { onChangeEventType(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		thumbnailImage.on('change', function () { onChangeValidateImage(this); });
		dateFrom	.on('change', function () { onChangeDateFrom() });
		btnSubmit	.on('click', function () { onSubmitEvent(); });
	});

	function onChangeEventType(obj)
	{
		const selectedValue = $(obj).val();

		if (selectedValue === '이벤트')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.show();
		}
		else if (selectedValue === '결과발표')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.hide();
		}
		else if (selectedValue === '링크')
		{
			linkWrap.show();
			contentWrap.hide();
			noticeWrap.hide();
			contentImgWrap.hide();
			dateWrap.show();
		}
	}

	function onChangeDateFrom()
	{
		dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
	}

	function onSubmitEvent()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('event_thumbnail_img', thumbnailImage[0].files[0]);
		if (isDisplay(contentImgWrap))
			param.append('event_content_img', contentImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.event, param)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? createRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`이미지 등록${message.ajaxError}`));
	}

	function createRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const { event_thumbnail_img, event_content_img } = data.image_urls;
			const param = {
				"event_type" : selEventType.val(),
				"title" : title.val().trim(),
				"contents" : isDisplay(contentWrap) ? content.val().trim() : '',
				"notice" : isDisplay(noticeWrap) ? eventNotice.val().trim() : '',
				"start_date" : isDisplay(dateWrap) ? dateFrom.val() : '',
				"end_date" : isDisplay(dateWrap) ? dateTo.val() : '',
				"link_url" : isDisplay(linkWrap) ? link.val().trim() : '',
				"image_url" : isDisplay(contentImgWrap) ? event_content_img : '',
				"thumbnail_image_url" : event_thumbnail_img,
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
			}

			ajaxRequestWithJson(true, api.createEvent, JSON.stringify(param))
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
		location.href = page.listEvent;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isDisplay(contentWrap) && isEmpty(content.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			content.trigger('focus');
			return false;
		}

		if (isDisplay(noticeWrap) && isEmpty(eventNotice.val()))
		{
			sweetToast(`유의사항은 ${message.required}`);
			eventNotice.trigger('focus');
			return false;
		}

		if (isDisplay(linkWrap) && isEmpty(link.val()))
		{
			sweetToast(`링크는 ${message.required}`);
			link.trigger('focus');
			return false;
		}

		if (isDisplay(linkWrap) && !isDomainName(link.val().trim()))
		{
			sweetToast(`링크 형식을 ${message.doubleChk}`);
			link.trigger('focus');
			return false;
		}

		const contentImgFile = isDisplay(contentImgWrap) ? contentImage[0].files : '';
		if (isDisplay(contentImgWrap) && contentImgFile.length === 0)
		{
			sweetToast(`본문 이미지는 ${message.required}`);
			return false;
		}

		const thumbnailFile = thumbnailImage[0].files;
		if (thumbnailFile.length === 0)
		{
			sweetToast(`썸네일 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}
