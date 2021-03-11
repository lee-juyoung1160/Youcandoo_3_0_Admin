
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js'
	import {api, fileApiV2} from '../modules/api-url.js';
	import {
	lengthInput, contentImage, thumbnailImage, dateFrom, btnSubmit, title, content, link, notice, dateTo
} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {
		calculateInputLength,
		initSearchDatepicker,
		limitInputLength,
		onChangeValidateImage,
		onErrorImage
	} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	const linkWrap = link.parents('tr');
	const contentWrap = content.parents('tr');
	const noticeWrap = notice.parents('tr');
	const contentImgWrap = contentImage.parents('tr');
	const dateWrap = dateFrom.parents('tr');
	const pathName	= getPathName();
	const eventIdx	= splitReverse(pathName, '/');

	$( () => {
		initSearchDatepicker();
		/** 상세 불러오기 **/
		//getDetail();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		thumbnailImage.on('change', function () { onChangeValidateImage(this); });
		dateFrom	.on('change', function () { onChangeDateFrom() });
		btnSubmit	.on('click', function () { onSubmitUpdateEvent(); });
	});

	function getDetail()
	{
		const url = api.detailEvent;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : eventIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_event_uuid;
	let g_event_type;
	function buildDetail(data)
	{
		const { event_uuid, event_type } = data.data;

		g_event_uuid = event_uuid;
		g_event_type = event_type;

		toggleComponent(event_type);

		onErrorImage();
		calculateInputLength();
	}

	function onChangeDateFrom()
	{
		dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
	}

	function onSubmitUpdateEvent()
	{
		if (validation())
		{
			const thumbnailImgFile = thumbnailImage[0].files;
			const contentImgFile = contentImage[0].files;
			const callback = (thumbnailImgFile.length > 0 || contentImgFile.length > 0) ? fileUploadReq : updateRequest;

			sweetConfirm(message.modify, callback);
		}
	}

	function fileUploadReq()
	{
		const url = fileApiV2.event;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('event_thumbnail_img', thumbnailImage[0].files[0]);
		param.append('event_content_img', isDisplay(contentImgWrap) ? contentImage[0].files[0] : '');

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url = api.updateEvent;
			const errMsg = label.submit+message.ajaxError;
			const param = {
				"event_uuid" : g_event_uuid,
				"event_type" : g_event_type,
				"event_title" : title.val().trim(),
				"event_contents" : content.val().trim(),
				"event_notice" : notice.val().trim(),
				"event_link_url" : link.val().trim(),
				"event_start_date" : dateFrom.val(),
				"event_end_date" : dateTo.val(),
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
			}

			if (!isEmpty(data))
			{
				let { event_thumbnail_img, event_content_img } = data.image_urls;

				if (!isEmpty(event_thumbnail_img))
					param["event_thumbnail_image"] = event_thumbnail_img;

				if (!isEmpty(event_content_img))
					param["event_image"] = event_content_img;
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
		location.href = page.detailEvent + eventIdx;
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

	function toggleComponent(_eventType)
	{
		if (_eventType === 'event')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.show();
		}
		else if (_eventType === 'announce')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.hide();
		}
		else if (_eventType === 'link')
		{
			linkWrap.show();
			contentWrap.hide();
			noticeWrap.hide();
			contentImgWrap.hide();
			dateWrap.show();
		}
	}
