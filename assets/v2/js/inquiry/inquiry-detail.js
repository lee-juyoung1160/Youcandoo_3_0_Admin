
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, modalClose, modalBackdrop, userNickname, deviceInfo, inquiryTitle,
		content, attachmentWrap, answerEl, memoEl, admin, answerDate, thumbnail } from '../modules/elements.js';
	import {sweetToast,} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack, onErrorImage} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const inquiryIdx = splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
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
		const { qna_uuid, app_version, os_version, device, nickname, title, contents, status, userid, answer, answered, memo } = data.data;

		if (status === '답변대기')
			location.href = page.updateInquiry + inquiryIdx;

		g_inquiry_uuid = qna_uuid;
		userNickname.text(nickname);
		deviceInfo.text(`앱버전: ${app_version}, os버전: ${os_version} , 기기: ${device}`);
		inquiryTitle.text(title);
		content.text(contents);
		attachmentWrap.html(buildAttachment(data));
		answerEl.text(answer);
		memoEl.text(isEmpty(memo) ? label.dash : memo);
		admin.text(userid);
		answerDate.text(answered);

		onErrorImage();

		$(".view-attach").on('click', function () { viewAttachment(this); });
	}

	function buildAttachment(data)
	{
		const {is_resource, image_url} = data.data;
		let images = '';
		(is_resource === 'Y')
			? image_url.map(url => images += `<div class="img-wrap"><img src="${url}" alt="" class="view-attach"></div>`)
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


