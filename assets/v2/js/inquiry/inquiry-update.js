
	import { ajaxRequestWithJson, isSuccessResp } from '../modules/ajax-request.js'
	import { api } from '../modules/api-url.js';
	import {
		btnBack, btnList, modalClose, modalBackdrop, userNickname, deviceInfo, inquiryTitle, content,
		attachmentWrap, answerEl, memoEl, btnSubmit, thumbnail, btnDelete, selVocType, selVocTypeDetail, selRiskGrade
	} from '../modules/elements.js';
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
		btnDelete		.on('click', function () { onSubmitDeleteInquiry(); });
		selVocType		.on('change', function () { onChangeSelVocType(); });
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
			answer,
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
		const answerStart = `${nickname}님 안녕하세요, 너두나두 목표달성 유캔두예요 :-)`;
		const answerEnd = '감사합니다.\n유캔두 드림';
		const defaultAnswer = answerStart +'\n\n\n'+ answerEnd;
		answerEl.val(isEmpty(answer) ? defaultAnswer : answer);
		answerEl.prop('selectionEnd', answerStart.length + 1);
		memoEl.val(memo);
		selVocType.val(voc_type);
		onChangeSelVocType();
		selVocTypeDetail.val(voc_detail_type);
		selRiskGrade.val(risk_grade);
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

		if (isEmpty(selVocType.val()))
		{
			sweetToast(`문의 유형을 ${message.select}`);
			selVocType.trigger('focus');
			return false;
		}

		if (isEmpty(selVocTypeDetail.val()))
		{
			sweetToast(`상세 유형을 ${message.select}`);
			selVocTypeDetail.trigger('focus');
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
			"voc_type" : selVocType.val(),
			"voc_detail_type" : selVocTypeDetail.val(),
			"risk_grade" : selRiskGrade.val(),
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

	function onSubmitDeleteInquiry()
	{
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const param = { "qna_uuid" : g_inquiry_uuid }

		ajaxRequestWithJson(true, api.deleteInquiry, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				sweetToastAndCallback(data, historyBack)
			})
			.catch(reject => sweetError(`삭제${message.ajaxError}`));
	}

	function onChangeSelVocType()
	{
		let options = '<option value="" disabled selected>상세유형</option>';

		switch (selVocType.val()) {
			case '개선 요청' :
				options =
					`<option value="현 기능">현 기능</option>
					<option value="신규 기능">신규 기능</option>
					<option value="디자인">디자인</option>
					<option value="운영 정책">운영 정책</option>`
				break;
			case '이용 문의' :
				options =
					`<option value="서비스 안내">서비스 안내</option>
					<option value="회원 정보">회원 정보</option>
					<option value="기능 문의">기능 문의</option>
					<option value="운영 정책">운영 정책</option>`
				break;
			case '기타' :
				options =
					`<option value="이벤트 참여">이벤트 참여</option>
					<option value="사용후기">사용후기</option>
					<option value="제휴">제휴</option>`
				break;
		}

		selVocTypeDetail.html(options);
	}
