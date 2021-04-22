
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {
	lengthInput,
	btnSubmit,
	selEventType,
	title,
	content,
	notice,
	link,
	dateFrom,
	dateTo,
	contentImage,
	thumbnailImage,
		eventNotice
	} from '../modules/elements.js';
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

		if (selectedValue === 'event')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.show();
		}
		else if (selectedValue === 'announce')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.hide();
		}
		else if (selectedValue === 'link')
		{
			linkWrap.show();
			contentWrap.hide();
			noticeWrap.hide();
			contentImgWrap.hide();
		}
	}

	function onChangeDateFrom()
	{
		dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
	}

	function onSubmitEvent()
	{
		if (validation())
		{
			const imageFile = contentImage[0].files;
			const requestFn = imageFile.length === 0 ? createRequest : fileUploadReq;
			sweetConfirm(message.create, requestFn);
		}
	}

	function fileUploadReq()
	{
		const url = fileApiV2.event;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('event_thumbnail_img', thumbnailImage[0].files[0]);
		if (isDisplay(contentImgWrap))
			param.append('event_content_img', contentImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url = api.createEvent;
			const errMsg = label.submit+message.ajaxError;
			const { event_thumbnail_img, event_content_img } = data.image_urls;
			const param = {
				"event_type" : selEventType.val(),
				"title" : title.val().trim(),
				"contents" : isDisplay(contentWrap) ? content.val().trim() : '',
				"notice" : isDisplay(noticeWrap) ? notice.val().trim() : '',
				"start_date" : isDisplay(dateWrap) ? dateFrom.val() : '',
				"end_date" : isDisplay(dateWrap) ? dateTo.val() : '',
				"link_url" : isDisplay(linkWrap) ? link.val().trim() : '',
				"image_url" : isDisplay(contentImgWrap) ? event_content_img : '',
				"thumbnail_image_url" : event_thumbnail_img,
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
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

		if (isDisplay(noticeWrap) && isEmpty(notice.val()))
		{
			sweetToast(`유의사항은 ${message.required}`);
			notice.trigger('focus');
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

		if (isDisplay(dateWrap) && isEmpty(dateFrom.val()))
		{
			sweetToast(`기간(시작일)은 ${message.required}`);
			dateFrom.trigger('focus');
			return false;
		}

		if (isDisplay(dateWrap) && isEmpty(dateTo.val()))
		{
			sweetToast(`기간(종료일)은 ${message.required}`);
			dateTo.trigger('focus');
			return false;
		}

		return true;
	}

