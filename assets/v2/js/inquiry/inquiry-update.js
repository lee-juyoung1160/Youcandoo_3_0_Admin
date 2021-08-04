
	import { ajaxRequestWithJson, isSuccessResp } from '../modules/ajax-request.js'
	import { api } from '../modules/api-url-v1.js';
	import {btnBack, btnList, modalClose, modalBackdrop, userNickname, deviceInfo, inquiryTitle, content,
		attachmentWrap, answerEl, memoEl, btnSubmit, thumbnail} from '../modules/elements.js';
	import {sweetToast, sweetConfirm, sweetToastAndCallback, sweetError} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack, onErrorImage, moveToMemberDetail} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const inquiryIdx = splitReverse(pathName, '/');

	$( () => {
		answerEl.trigger('focus');
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		btnSubmit		.on('click', function () { onSubmitAnswer(); });
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
		const { qna_uuid, app_version, os_version, device, nickname, profile_uuid, title, contents, answer, memo} = data.data;

		g_inquiry_uuid = qna_uuid;

		userNickname.html(isEmpty(profile_uuid) ? `${nickname}(비회원)` : `<a style="text-decoration: underline;" data-uuid="${profile_uuid}">${nickname}</a>`);
		deviceInfo.text(`앱버전: ${app_version}, os버전: ${os_version} , 기기: ${device}`);
		inquiryTitle.text(title);
		content.text(contents);
		attachmentWrap.html(buildAttachment(data));
		const answerStart = `${nickname}님 안녕하세요, 너두나두 목표달성 유캔두예요 :-)`;
		const answerEnd = '감사합니다.\n유캔두 드림';
		const defaultAnswer = answerStart +'\n\n\n'+ answerEnd;
		answerEl.val(isEmpty(answer) ? defaultAnswer : answer);
		answerEl.prop('selectionEnd', answerStart.length + 1);
		memoEl.val(memo);
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

	function onSubmitAnswer()
	{
		if (validation())
			sweetConfirm(message.create, answerRequest);
	}

	function validation()
	{
		if (isEmpty(answerEl.val()))
		{
			sweetToast(`답변은 ${message.required}`);
			answerEl.trigger('focus');
			return false;
		}

		return true;
	}

	function answerRequest()
	{
		const param = {
			"qna_uuid" : g_inquiry_uuid,
			"answer" : answerEl.val().trim(),
			"memo" : memoEl.val().trim(),
		}

		ajaxRequestWithJson(true, api.updateInquiry, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, answerSuccess);
			})
			.catch(reject => sweetError(message.ajaxLoadError));
	}

	function answerSuccess()
	{
		location.href = page.detailInquiry + inquiryIdx;
	}
