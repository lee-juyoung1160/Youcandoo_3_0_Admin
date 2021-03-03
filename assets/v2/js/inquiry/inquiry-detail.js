
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, contentImage, modalClose, modalBackdrop} from '../modules/elements.js';
	import {sweetToast,} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const inquiryIdx = splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		//getDetail();
		buildAttachment();
		/** 이벤트 **/
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
	});

	function getDetail()
	{
		const url = api.detailInquiry;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : inquiryIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_inquiry_uuid;
	function buildDetail(data)
	{
		const { inquiry_uuid, status } = data.data;

		if (status === '대기')
			location.href = page.updateInquiry + inquiryIdx;

		g_inquiry_uuid = inquiry_uuid;
	}

	function buildAttachment(data)
	{
		//const attachments = data.data.image_url;
		let images = '';
		for (let i=0; i<3; i++)
			images += `<div class="img-wrap"><img src="/assets/v2/img/auth-1.jpg" alt="" class="btn-view-attach"></div>`

		contentImage.html(images);

		document.querySelectorAll('.btn-view-attach').forEach( element => element.addEventListener('click', viewAttachment));
		return images;
	}

	function viewAttachment()
	{
		fadeinModal();

		const imageUrl = $(this).prop('src');
		const images = `<img src="${imageUrl}" alt="">`;
	}


	function goListPage()
	{
		location.href = page.listInquiry;
	}


