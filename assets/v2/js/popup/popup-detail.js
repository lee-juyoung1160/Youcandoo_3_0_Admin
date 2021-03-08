
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {osType, title, version, link, exposureDate, viewOption, isExposure, btnBack, btnList} from '../modules/elements.js';
	import {sweetToast,} from '../modules/alert.js';
	import {historyBack,} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const popupIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		//getDetail();
		/** 이벤트 **/
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
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
		let { popup_uuid, profile_image_url, nickname, site_url, description } = data.data;

		g_popup_uuid = popup_uuid;

		contentImage.attr('src', profile_image_url);
		title.text(nickname);
		bizNo.text();
		link.html(`<a href="${site_url}" class="link" target="_blank">${site_url}</a>`);
		content.text(description);
	}

	function goListPage()
	{
		location.href = page.listBiz;
	}

	function goUpdatePage()
	{
		location.href = page.updateBiz + bizIdx;
	}


