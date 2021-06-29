
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {osType, popupTitle, version, link, exposureDate, viewOption, isExposure, btnBack, btnList, btnUpdate, btnDelete} from '../modules/elements.js';
	import {sweetConfirm, sweetToast, sweetToastAndCallback,} from '../modules/alert.js';
	import {historyBack,} from "../modules/common.js";
	import { getPathName, splitReverse,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const popupIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack	 	.on('click', function () { historyBack(); });
		btnList	 	.on('click', function () { goListPage(); });
		btnUpdate	.on('click', function () { goUpdatePage(); });
		btnDelete   .on('click', function () { onSubmitDeletePopup(); });
	});

	function getDetail()
	{
		const url = api.detailPopup;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : popupIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_popup_uuid;
	function buildDetail(data)
	{
		const { popup_uuid, store, title, target_version, popup_url, close_type, start_date, end_date, is_exposure } = data.data;

		g_popup_uuid = popup_uuid;
		osType.text(getStoreName(store));
		popupTitle.text(title);
		version.text(parseFloat(target_version));
		link.text(popup_url);
		viewOption.text(getCloseTypeName(close_type));
		exposureDate.text(`${start_date} ~ ${end_date}`);
		isExposure.text(is_exposure);
	}

	function getCloseTypeName(type)
	{
		switch (type) {
			case 'always' : return '다시 보지 않기';
			case 'oneday' : return '오늘 하루 보지 않기';
		}
	}

	function getStoreName(store)
	{
		switch (store) {
			case 'all' : return '전체';
			case 'google' : return 'AOS';
			case 'apple' : return 'IOS';
		}
	}

	function onSubmitDeletePopup()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const url = api.deletePopup;
		const errMsg = label.delete + message.ajaxError;
		const param = {
			"popup_uuid" : g_popup_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
	}

	function deleteSuccess()
	{
		goListPage();
	}

	function goListPage()
	{
		location.href = page.listPopup;
	}

	function goUpdatePage()
	{
		location.href = page.updatePopup + popupIdx;
	}
