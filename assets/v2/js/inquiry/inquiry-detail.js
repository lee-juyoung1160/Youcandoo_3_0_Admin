
	import { ajaxRequestWithJson, isSuccessResp } from '../modules/ajax-request.js'
	import { api } from '../modules/api-url.js';
	import {
		btnBack, btnList, modalClose, modalBackdrop, userNickname, deviceInfo, inquiryTitle,
		content, attachmentWrap, answerEl, memoEl, admin, answerDate, thumbnail, btnUpdate, vocType
	} from '../modules/elements.js';
	import {sweetToast, sweetError,} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack, moveToMemberDetail, onErrorImage} from "../modules/common.js";
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
		btnUpdate		.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		const param = { "idx" : inquiryIdx }

		ajaxRequestWithJson(true, api.detailInquiry, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_inquiry_uuid;
	function buildDetail(data)
	{
		const {
			qna_uuid,
			app_version,
			os_version,
			device,
			nickname,
			profile_uuid,
			title,
			contents,
			userid,
			answer,
			answered,
			memo,
			voc_type,
			voc_detail_type,
			risk_grade
		} = data.data;

		g_inquiry_uuid = qna_uuid;

		userNickname.html(isEmpty(profile_uuid) ? `${nickname}(비회원)` : `<a style="text-decoration: underline;" data-uuid="${profile_uuid}">${nickname}</a>`);
		deviceInfo.text(`앱버전: ${app_version}, os버전: ${os_version} , 기기: ${device}`);
		inquiryTitle.text(title);
		content.text(contents);
		attachmentWrap.html(buildAttachment(data));
		answerEl.text(answer);
		memoEl.text(isEmpty(memo) ? label.dash : memo);
		admin.text(userid);
		answerDate.text(answered);
		vocType.html(`문의유형 : ${voc_type} <br>상세 구분 : ${voc_detail_type} <br>리스크 등급 : ${risk_grade}`);

		onErrorImage();

		$(".view-attach").on('click', function () { viewAttachment(this); });
		userNickname.find('a').on('click', function () { onClickNickname(this); });
	}

	function buildAttachment(data)
	{
		const {contents_url, attach_count} = data.data;
		let images = '';
		(Number(attach_count) && contents_url.length > 0)
			? contents_url.map(url => images += `<div class="img-wrap"><img src="${url}" alt="" class="view-attach"></div>`)
			: images = label.dash;

		return images;
	}

	function viewAttachment(obj)
	{
		fadeinModal();
		thumbnail.attr('src', $(obj).prop('src'));
		onErrorImage();
	}

	function onClickNickname(obj)
	{
		moveToMemberDetail($(obj).data('uuid'));
	}

	function goListPage()
	{
		location.href = page.listInquiry;
	}

	function goUpdatePage()
	{
		location.href = page.updateInquiry + inquiryIdx;
	}
