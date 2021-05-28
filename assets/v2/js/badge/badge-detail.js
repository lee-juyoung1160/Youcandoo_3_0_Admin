
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, btnUpdate, btnDelete, content, badgeTitle, contentImage, badgeType, qualification, isOpen, difficulty,
		popupImage, lottieType} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import { historyBack, onErrorImage} from "../modules/common.js";
	import {getPathName, numberWithCommas, splitReverse,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const badgeIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
		btnDelete.on('click', function () { onSubmitDeleteBadge(); });
		btnUpdate.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		const url = api.detailBadge;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : badgeIdx
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_badge_uuid;
	function buildDetail(data)
	{
		const { badge_uuid, title, description, image_url, popup_image_url, popup_lottie_type, type, terms, priority, is_display } = data.data;

		g_badge_uuid = badge_uuid;

		badgeTitle.text(title);
		content.text(description);
		badgeType.text(getStrBadgeType(type));
		qualification.text(numberWithCommas(terms));
		difficulty.text(numberWithCommas(priority));
		contentImage.attr('src', image_url);
		popupImage.attr('src', popup_image_url);
		lottieType.text(popup_lottie_type);
		isOpen.text(is_display);

		onErrorImage();
	}

	function getStrBadgeType(type)
	{
		switch (type) {
			case 'ongoing' : return '연속 인증';
			case 'action' : return '누적 인증';
			case 'leader' : return '리더 랭킹';
			default : return label.dash;
		}
	}

	function onSubmitDeleteBadge()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const url = api.deleteBadge;
		const errMsg = label.delete + message.ajaxError;
		const param = {
			"badge_uuid" : g_badge_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, goListPage)
	}

	function goListPage()
	{
		location.href = page.listBadge;
	}

	function goUpdatePage()
	{
		location.href = page.updateBadge + badgeIdx;
	}


