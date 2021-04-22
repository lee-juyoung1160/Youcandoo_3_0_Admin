
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import { btnBack, btnList, btnUpdate, btnDelete, eventType, eventTitle, link,
		content,contentImage, dateFrom, eventNotice, thumbnailImage, eventDate, isExposure
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import { historyBack, onErrorImage} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
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
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
		btnDelete.on('click', function () { onSubmitDeleteEvent(); });
		btnUpdate.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		const url = api.detailEvent;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : eventIdx
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_event_uuid;
	function buildDetail(data)
	{
		const { event_uuid, event_type, title, contents, notice, start_date, end_date, link_url, image_url, thumbnail_image_url, is_exposure } = data.data;

		switch (event_type) {
			case '이벤트' :
				linkWrap.remove();
				break;
			case '결과발표' :
				linkWrap.remove();
				dateWrap.remove();
				break;
			case '링크' :
				contentWrap.remove();
				noticeWrap.remove();
				contentImgWrap.remove();
				break;
		}

		g_event_uuid = event_uuid;
		eventType.text(event_type);
		eventTitle.text(title);
		link.text(link_url);
		content.text(contents);
		eventNotice.text(notice);
		contentImage.attr('src', image_url);
		thumbnailImage.attr('src', thumbnail_image_url);
		eventDate.text(`${start_date} ~ ${end_date}`);
		isExposure.text(is_exposure);

		onErrorImage();
	}

	function onSubmitDeleteEvent()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const url = api.deleteEvent;
		const errMsg = label.delete + message.ajaxError;
		const param = {
			"event_uuid" : g_event_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess)
	}

	function deleteSuccess()
	{
		goListPage();
	}

	function goListPage()
	{
		location.href = page.listEvent;
	}

	function goUpdatePage()
	{
		location.href = page.updateEvent + eventIdx;
	}


