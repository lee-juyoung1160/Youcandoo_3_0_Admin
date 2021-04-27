
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, btnUpdate, btnDelete, content, reserveDate, isExposure, noticeTitle, contentImageWrap} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import { historyBack, onErrorImage} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const noticeIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
		btnDelete.on('click', function () { onSubmitDeleteNotice(); });
		btnUpdate.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		const url = api.detailNotice;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : noticeIdx
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_notice_uuid;
	function buildDetail(data)
	{
		const { notice_uuid, title, contents, notice_image_url, reservation_date, is_exposure } = data.data;

		g_notice_uuid = notice_uuid;

		noticeTitle.text(title);
		content.text(contents);
		contentImageWrap.html(isEmpty(notice_image_url) ? label.dash : `<img src="${notice_image_url}" alt="">`)
		reserveDate.text(reservation_date);
		isExposure.text(is_exposure);

		onErrorImage();
	}

	function onSubmitDeleteNotice()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const url = api.deleteNotice;
		const errMsg = label.delete + message.ajaxError;
		const param = {
			"notice_uuid" : g_notice_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, goListPage)
	}

	function goListPage()
	{
		location.href = page.listNotice;
	}

	function goUpdatePage()
	{
		location.href = page.updateNotice + noticeIdx;
	}


