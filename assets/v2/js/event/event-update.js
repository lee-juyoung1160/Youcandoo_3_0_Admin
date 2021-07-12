
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import {api, fileApiV2} from '../modules/api-url-v1.js';
	import {lengthInput, contentImage, thumbnailImage, dateFrom, btnSubmit, eventTitle, content, link, eventNotice, dateTo,
		eventContentThumbnail, eventThumbnail, rdoExposure, eventType} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {calculateInputLength, initSearchDatepicker, limitInputLength, onChangeValidateImage, onErrorImage} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty, isDisplay, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const eventIdx	= splitReverse(pathName, '/');
	const linkWrap = link.parents('tr');
	const contentWrap = content.parents('tr');
	const noticeWrap = eventNotice.parents('tr');
	const contentImgWrap = contentImage.parents('tr');
	const dateWrap = dateFrom.parents('tr');

	$( () => {
		initSearchDatepicker();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		thumbnailImage.on('change', function () { onChangeValidateImage(this); });
		dateFrom	.on('change', function () { onChangeDateFrom() });
		btnSubmit	.on('click', function () { onSubmitUpdateEvent(); });
	});

	function getDetail()
	{
		const param = { "idx" : eventIdx };

		ajaxRequestWithJson(true, api.detailEvent, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(label.detailContent + message.ajaxLoadError));
	}

	let g_event_uuid;
	let g_event_type;
	function buildDetail(data)
	{
		const { event_uuid, event_type, title, contents, notice, start_date, end_date, link_url, image_url, thumbnail_image_url, is_exposure } = data.data;

		g_event_uuid = event_uuid;
		g_event_type = event_type;

		toggleComponent(event_type);

		eventType.text(event_type);
		eventTitle.val(title);
		link.val(link_url);
		content.val(contents);
		eventNotice.val(notice);
		eventContentThumbnail.attr('src', image_url);
		eventThumbnail.attr('src', thumbnail_image_url);
		dateFrom.val(start_date);
		dateFrom.datepicker("option", "minDate", start_date);
		dateTo.val(end_date);
		dateTo.datepicker("option", "minDate", start_date);
		rdoExposure.each(function () {
			$(this).prop('checked', $(this).val() === is_exposure);
		})

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
		let param  = new FormData();
		param.append('event_thumbnail_img', thumbnailImage[0].files[0]);
		if (isDisplay(contentImgWrap))
			param.append('event_content_img', contentImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.event, param)
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
				"event_uuid" : g_event_uuid,
				"event_type" : g_event_type,
				"title" : eventTitle.val().trim(),
				"contents" : content.val().trim(),
				"notice" : eventNotice.val().trim(),
				"link_url" : link.val().trim(),
				"start_date" : dateFrom.val(),
				"end_date" : dateTo.val(),
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
			}

			if (!isEmpty(data))
			{
				const { event_thumbnail_img, event_content_img } = data.image_urls;

				if (!isEmpty(event_thumbnail_img))
					param["thumbnail_image_url"] = event_thumbnail_img;

				if (!isEmpty(event_content_img))
					param["image_url"] = event_content_img;
			}

			ajaxRequestWithJson(true, api.updateEvent, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateSuccess);
				})
				.catch(reject => sweetToast(label.modify + message.ajaxError));
		}
		else
			sweetToast(data.msg);
	}

	function updateSuccess()
	{
		location.href = page.detailEvent + eventIdx;
	}

	function validation()
	{
		if (isEmpty(eventTitle.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			eventTitle.trigger('focus');
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

		return true;
	}

	function toggleComponent(_eventType)
	{
		if (_eventType === '이벤트')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.show();
		}
		else if (_eventType === '결과발표')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.hide();
		}
		else if (_eventType === '링크')
		{
			linkWrap.show();
			contentWrap.hide();
			noticeWrap.hide();
			contentImgWrap.hide();
			dateWrap.show();
		}
	}
