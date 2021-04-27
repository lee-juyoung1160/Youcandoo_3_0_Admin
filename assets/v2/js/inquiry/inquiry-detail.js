
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, modalClose, modalBackdrop, userNickname, deviceInfo, inquiryTitle, content, attachmentWrap} from '../modules/elements.js';
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

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_inquiry_uuid;
	function buildDetail(data)
	{
		const { qna_uuid, nickname, title, question, status } = data.data;

		if (status === '대기')
			location.href = page.updateInquiry + inquiryIdx;

		g_inquiry_uuid = qna_uuid;
		userNickname.text();
		deviceInfo.text();
		inquiryTitle.text();
		content.text();
		attachmentWrap.html(buildAttachment(data));

		onErrorImage();
		$(".view-attach").on('click', function () { viewAttachment(this); })
	}

	function buildAttachment(data)
	{
		const attachments = data.data.image_url;
		let images = '';
		(!isEmpty(attachments) && attachments.length > 0)
			? attachments.map(obj => images += `<div class="img-wrap"><img src="/assets/v2/img/auth-1.jpg" alt="" class="view-attach"></div>`)
			: images = label.dash;

		return images;
	}

	function viewAttachment(obj)
	{
		fadeinModal();
		thumbnail.attr('src', $(obj).prop('src'));
		onErrorImage();
	}


	function goListPage()
	{
		location.href = page.listInquiry;
	}


