
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
		categoryTitle,
		categoryIcon,
		isEstablish,
		isExposure,
		btnBack, btnList, btnUpdate } from  '../modules/elements.js';
	import { sweetToast } from  '../modules/alert.js';
	import { historyBack, onErrorImage } from "../modules/common.js";
	import { getPathName, splitReverse } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName		= getPathName();
	const categoryIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
		btnUpdate.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		const url = api.detailCategory;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : categoryIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	function buildDetail(data)
	{
		let { category_title, is_exposure, is_establish, icon_image_url } = data.data;

		categoryTitle.text(category_title);
		categoryIcon.attr('src', icon_image_url);
		isEstablish.text(is_establish);
		isExposure.text(is_exposure);

		onErrorImage();
	}

	function goListPage()
	{
		location.href = page.listCategory;
	}

	function goUpdatePage()
	{
		location.href = page.updateCategory + categoryIdx;
	}


