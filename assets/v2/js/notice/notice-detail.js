
	import { ajaxRequestWithJson, isSuccessResp } from '../modules/ajax-request.js'
	import { api } from '../modules/api-url-v1.js';
	import {btnBack, btnList, btnUpdate, btnDelete, content, reserveDate, isExposure, noticeTitle, contentImageWrap} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
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
		const param = { "idx" : noticeIdx }

		ajaxRequestWithJson(true, api.detailNotice, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_notice_uuid;
	function buildDetail(data)
	{
		const { notice_uuid, title, contents, notice_image_url, opened, is_exposure } = data.data;

		g_notice_uuid = notice_uuid;

		noticeTitle.text(title);
		content.text(contents);
		contentImageWrap.html(isEmpty(notice_image_url) ? label.dash : `<img src="${notice_image_url}" alt="">`)
		reserveDate.text(opened.substring(0, 10));
		isExposure.text(is_exposure);

		onErrorImage();
	}

	function onSubmitDeleteNotice()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const param = { "notice_uuid" : g_notice_uuid }

		ajaxRequestWithJson(true, api.deleteNotice, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, goListPage);
			})
			.catch(reject => sweetError(label.delete + message.ajaxError));
	}

	function goListPage()
	{
		location.href = page.listNotice;
	}

	function goUpdatePage()
	{
		location.href = page.updateNotice + noticeIdx;
	}
