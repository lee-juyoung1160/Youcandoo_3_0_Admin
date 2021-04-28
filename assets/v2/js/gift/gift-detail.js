
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, btnUpdate, giftUuid, giftName, contentImage, price, isExposure} from '../modules/elements.js';
	import {sweetToast} from '../modules/alert.js';
	import { historyBack, onErrorImage} from "../modules/common.js";
	import {getPathName, splitReverse, numberWithCommas} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const giftIdx	= splitReverse(pathName, '/');

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
		const url = api.detailGift;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : giftIdx
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	function buildDetail(data)
	{
		const { gift_uuid, gift_name, gift_ucd, gift_image_url, is_exposure } = data.data;

		giftUuid.text(gift_uuid);
		giftName.text(gift_name);
		price.text(`${numberWithCommas(gift_ucd)} UCD`);
		contentImage.attr('src', gift_image_url);
		isExposure.text(is_exposure);

		onErrorImage();
	}

	function goListPage()
	{
		location.href = page.listGift;
	}

	function goUpdatePage()
	{
		location.href = page.updateGift + giftIdx;
	}


