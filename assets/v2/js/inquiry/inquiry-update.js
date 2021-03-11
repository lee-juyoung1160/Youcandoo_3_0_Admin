
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {contentImage, modalClose, modalBackdrop, answer, memo, btnSubmit} from '../modules/elements.js';
	import {sweetToast, sweetConfirm, sweetToastAndCallback} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const inquiryIdx = splitReverse(pathName, '/');

	$( () => {
		answer.trigger('focus');
		/** 상세 불러오기 **/
		//getDetail();
		buildAttachment();
		/** 이벤트 **/
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmit		.on('click', function () { onSubmitAnswer(); });
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

	let g_qna_uuid;
	function buildDetail(data)
	{
		const { qna_uuid, status } = data.data;

		if (status === '대기')
			location.href = page.updateInquiry + inquiryIdx;

		g_qna_uuid = qna_uuid;
	}

	function buildAttachment(data)
	{
		//const attachments = data.data.image_url;
		let images = '';
		for (let i=0; i<3; i++)
			images += `<div class="img-wrap"><img src="/assets/v2/img/auth-1.jpg" alt="" class="btn-view-attach"></div>`

		contentImage.html(images);

		$(".btn-view-attach").on('click', function () { viewAttachment(this); })
		return images;
	}

	function viewAttachment(obj)
	{
		fadeinModal();

		const imageUrl = $(obj).prop('src');
		const images = `<img src="${imageUrl}" alt="">`;
	}

	function onSubmitAnswer()
	{
		if (validation())
			sweetConfirm(message.create, answerRequest);
	}

	function validation()
	{
		if (isEmpty(answer.val()))
		{
			sweetToast('답변은 '+message.required);
			answer.trigger('focus');
			return false;
		}

		return true;
	}

	function answerRequest()
	{
		const url = api.updateInquiry;
		const errMsg = message.ajaxError;
		const param = {
			"qna_uuid" : g_qna_uuid,
			"comment" : commentEl.val().trim(),
			"memo" : memoEl.val().trim(),
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), answerReqCallback, errMsg, false);
	}

	function answerReqCallback(data)
	{
		sweetToastAndCallback(data, answerSuccess);
	}

	function answerSuccess()
	{
		historyBack();
	}
