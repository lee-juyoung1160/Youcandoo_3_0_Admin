
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import {api, fileApiV2} from '../modules/api-url.js';
	import {
	doitTitle,
	sponsor,
	category,
	doitDesc,
	doitKeywords,
	doitThumbnail,
	publicType,
	isApply,
	doitQuestion,
	isAnswer,
	btnDoitOpen,
	btnDoitStop,
	btnDoitDelete,
	doitUpdateForm,
	doitInfoForm,
	doitSponsor,
	chkIsApply,
	chkIsQuestion,
	chkIsAnswer,
	rdoPublicType,
	infoDoitTitle,
	infoDoitDesc,
	infoDoitKeywords,
	infoQuestion,
	selCategory,
	doitImage,
	selSubcategory,
	doitKeyword,
	btnUpdateDoit,
	btnCreateMission,
	btnDeleteMission,
	btnUpdateMission,
	btnBan,
	createCommentWrap,
	actionCommentWrap,
	applyMemberCountWrap,
	btnCreateTalk,
	talkCommentWrap,
	createTalkCommentWrap,
	btnSaveUcd,
	btnReject,
	btnApproval,
	promotionInfo,
	btnPromotion, btnPromotionCancel, infoMaxUserCount, maxUserCount, doitUuid, btnCancelBlock,
} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import {calculateInputLength, moveToMemberDetail, onErrorImage} from "../modules/common.js";
	import {getPathName, isEmpty, numberWithCommas, splitReverse} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {onClickChkIsApply, onClickChkIsQuestion, addRemoveKeywordEvent,} from "../modules/doit-common.js"

	const pathName	= getPathName();
	export const doitIdx = splitReverse(pathName, '/');

	export function showDoitInfoForm()
	{
		doitInfoForm.show();
		doitUpdateForm.hide();
	}

	export function getDetail()
	{
		const param = { "idx" : doitIdx };

		ajaxRequestWithJson(true, api.detailDoit, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getDetailCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	function getDetailCallback(data)
	{
		buildDetail(data);
		buildUpdate(data);
	}

	export let isPromotion;
	export let isSponsorDoit;
	export let g_doit_uuid;
	export let g_leader_profile_uuid;
	function buildDetail(data)
	{
		const { doit_uuid, doit_status, doit_type, doit_title, doit_description, nickname, category_title, subcategory_title, doit_keyword,
			public_type, approve_member, question, answer_type, doit_image_url, profile_uuid, max_user, is_promotion } = data.data;

		isPromotion = is_promotion === 'Y'
		isSponsorDoit = doit_type === 'sponsor';
		g_doit_uuid = doit_uuid;
		g_leader_profile_uuid = profile_uuid;

		infoDoitTitle.html(buildDoitStatus(doit_status) + doit_title);
		isPromotion ? promotionInfo.html(buildPromotionInfo(data)) : promotionInfo.empty();
		doitSponsor.html(isSponsorDoit
				? label.bizIcon + nickname
				: `<a style="text-decoration: underline;" data-uuid="${profile_uuid}">${nickname}</a>`);
		category.html(`${category_title} - <span>${subcategory_title}</span>`);
		infoDoitDesc.text(doit_description);
		infoMaxUserCount.text(numberWithCommas(max_user));
		infoDoitKeywords.empty();
		if (!isEmpty(doit_keyword) && doit_keyword.length > 0)
		{
			doit_keyword.map(keyword => {
				infoDoitKeywords.append(`<li>#<span>${keyword}</span>`);
			});
		}
		publicType.text(getStrFromPublicType(public_type));
		isApply.text(approve_member);
		if (approve_member === 'N') applyMemberCountWrap.remove();
		infoQuestion.text(isEmpty(question) ? label.dash : question);
		isAnswer.text(answer_type === 'public' ? label.public : label.private);
		doitThumbnail.attr('src', doit_image_url);
		doitUuid.text(doit_uuid);
		onErrorImage();

		toggleButtons(doit_status);
		toggleBtnPromotion(data);

		doitSponsor.find('a').on('click', function () { onClickNickname(this); });
	}

	function onClickNickname(obj)
	{
		moveToMemberDetail($(obj).data('uuid'));
	}

	export let g_category_uuid;
	export let g_subcategory_uuid;
	function buildUpdate(data)
	{
		const { doit_title, doit_description, category_uuid, subcategory_uuid, doit_keyword,
			public_type, approve_member, is_question, question, answer_type, max_user } = data.data;

		g_category_uuid = category_uuid;
		g_subcategory_uuid = subcategory_uuid;

		doitTitle.val(doit_title);
		doitDesc.val(doit_description);
		maxUserCount.val(max_user);
		doitKeywords.empty();
		if (!isEmpty(doit_keyword) && doit_keyword.length > 0)
		{
			doit_keyword.map(keyword => {
				const keywordEl =
					`<li class="keyword-li">
						#<span class="added-keyword">${keyword}</span>
						<button class="btn-i btn-del-keyword"><i class="fas fa-times-circle"></i></button>
					</li>`
				doitKeywords.append(keywordEl);
			});
		}
		addRemoveKeywordEvent();
		rdoPublicType.each(function () {
			$(this).prop("checked", $(this).val() === public_type);
		});
		chkIsApply.prop('checked', approve_member === 'Y');
		onClickChkIsApply(chkIsApply);
		chkIsQuestion.prop('checked', is_question === 'Y');
		onClickChkIsQuestion(chkIsQuestion)
		doitQuestion.val(question);
		chkIsAnswer.prop('checked', answer_type === 'public');

		calculateInputLength();
	}

	function setSubCategory()
	{
		const param = { "category_uuid" : selCategory.val() }

		ajaxRequestWithJson(false, api.subCategoryList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildSelSubCategory(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.list + message.ajaxLoadError));
	}

	export function buildSelSubCategory(data)
	{
		let options = '<option value="">세부 카테고리</option>';
		data.data.map( obj => {
			options += `<option value="${obj.subcategory_uuid}">${obj.subcategory_title}</option>`;
		})

		selSubcategory.html(options);

		selSubcategory.val(g_subcategory_uuid);
	}

	function toggleButtons(status)
	{
		switch (status) {
			case 'create' :
				btnDoitOpen.show();
				btnDoitDelete.show();
				btnDoitStop.hide();
				btnUpdateDoit.show();
				break;
			case 'open' :
				btnDoitOpen.hide();
				btnDoitDelete.show();
				btnDoitStop.show();
				btnDoitStop.html(`<i class="fas fa-ban"></i>운영정지`);
				btnUpdateDoit.show();
				break;
			case 'stop' :
				btnDoitOpen.hide();
				btnDoitDelete.show();
				btnDoitStop.show();
				btnDoitStop.html(`<i class="fas fa-ban"></i>정지해제`);
				btnUpdateDoit.show();
				break;
			case 'delete' :
				btnDoitOpen.hide();
				btnDoitDelete.hide();
				btnDoitStop.hide();
				btnUpdateDoit.hide();
				btnCreateMission.hide();
				break;
		}

		if (!isSponsorDoit)
		{
			btnDoitOpen.hide();
			btnDoitDelete.hide();
			btnUpdateDoit.hide();
			btnDeleteMission.remove();
			btnUpdateMission.remove();
			btnCreateMission.remove();
			btnBan.remove();
			btnCancelBlock.remove();
			actionCommentWrap.removeClass('col-8');
			actionCommentWrap.addClass('col-12');
			createCommentWrap.remove();
			talkCommentWrap.removeClass('col-8');
			talkCommentWrap.addClass('col-12');
			createTalkCommentWrap.remove();
			btnCreateTalk.parent('.card').remove();
			btnSaveUcd.remove();
			btnApproval.remove()
			btnReject.remove();
		}
	}

	function toggleBtnPromotion(data)
	{
		const {is_promotion, promotion_uuid, doit_status} = data.data;
		switch (is_promotion) {
			case 'Y' :
				btnPromotion.hide();
				btnPromotionCancel.show();
				btnPromotionCancel.attr('data-uuid', promotion_uuid);
				break;
			case 'N' :
				doit_status === 'open' ? btnPromotion.show() : btnPromotion.hide();
				btnPromotionCancel.hide();
				break;
			default :
				btnPromotion.hide();
				btnPromotionCancel.hide();
		}
	}

	function buildPromotionInfo(data)
	{
		const { promotion_title, sponsored, promotion_start_date, promotion_end_date } = data.data
		return	`<ul class="card promotion-info clearfix">
					<li><span class="badge badge-purple">프로모션</span></li>
					<li class="promotion-name">${promotion_title}</li>
					<li class="promotion-sponsor">${label.bizIcon} ${sponsored}</li>
					<li class="promotion-date">${promotion_start_date} ~ ${promotion_end_date}</li>
				</ul>`
	}

	function buildDoitStatus(status)
	{
		switch (status) {
			case 'create' :
				return `<span class="badge badge-info">생성</span>`
			case 'open' :
				return `<span class="badge badge-success">진행중</span>`
			case 'stop' :
				return `<span class="badge badge-warning">운영정지</span>`
			case 'delete' :
				return `<span class="badge badge-danger">삭제</span>`
		}
	}

	function getStrFromPublicType(type)
	{
		switch (type) {
			case 'public' : return '전체공개';
			case 'member' : return '멤버에게만 게시글 공개';
			case 'private' : return '비공개';
		}
	}

	export function onClickBtnUpdateDoit()
	{
		selCategory.val(g_category_uuid);
		setSubCategory();
		doitInfoForm.hide();
		doitUpdateForm.show();
	}

	export function onSubmitUpdateDoit()
	{
		if (updateValidation())
		{
			const doitImg = doitImage[0].files;
			const callback = doitImg.length > 0 ? fileUploadReq : updateRequest;

			sweetConfirm(message.modify, callback);
		}
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('file', doitImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? updateRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			let keywords = [];
			doitKeywords.find('li .added-keyword').each(function () {
				keywords.push($(this).text().trim());
			})
			const param = {
				"doit_uuid" : g_doit_uuid,
				"category_uuid" : selCategory.val(),
				"subcategory_uuid" : selSubcategory.val(),
				"doit_title" : doitTitle.val().trim(),
				"doit_description" : doitDesc.val().trim(),
				"max_user" : maxUserCount.val().trim(),
				"doit_keyword" : keywords,
				"public_type" : $("input[name=radio-public-type]:checked").val(),
				"approve_member" : chkIsApply.is(':checked') ? 'Y' : 'N',
				"is_question" : chkIsQuestion.is(':checked') ? 'Y' : 'N',
				"question": doitQuestion.val().trim(),
				"answer_type" : chkIsAnswer.is(':checked') ? 'public' : 'private'
			}

			if (!isEmpty(data))
				param["doit_image_url"] = data.image_urls.file;

			ajaxRequestWithJson(true, api.updateDoit, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateSuccess);
				})
				.catch(reject => sweetError(label.modify + message.ajaxError));
		}
	}

	function updateSuccess()
	{
		getDetail();
		showDoitInfoForm();
	}

	function updateValidation()
	{
		if (isEmpty(selCategory.val()))
		{
			sweetToast(`카테고리를 ${message.select}`);
			selCategory.trigger('focus');
			return false;
		}

		if (isEmpty(selSubcategory.val()))
		{
			sweetToast(`세부 카테고리를 ${message.select}`);
			selSubcategory.trigger('focus');
			return false;
		}

		if (isEmpty(doitTitle.val()))
		{
			sweetToast(`두잇 명은 ${message.required}`);
			doitTitle.trigger('focus');
			return false;
		}

		if (isEmpty(doitDesc.val()))
		{
			sweetToast(`두잇 소개 및 목표는 ${message.required}`);
			doitDesc.trigger('focus');
			return false;
		}

		if (isEmpty(maxUserCount.val()))
		{
			sweetToast(`최대 참여 인원은 ${message.required}`);
			maxUserCount.trigger('focus');
			return false;
		}

		if (Number(maxUserCount.val()) > 100000)
		{
			sweetToast(`최대 참여 인원은 ${message.maxUserCount}`);
			maxUserCount.trigger('focus');
			return false;
		}

		const doitKeywordsLength = doitKeywords.find('li').length;
		if (doitKeywordsLength === 0)
		{
			sweetToast(`검색 키워드를 ${message.addOn}`);
			doitKeyword.trigger('focus');
			return false;
		}

		if (chkIsQuestion.is(':checked') && isEmpty(doitQuestion.val()))
		{
			sweetToast(`질문을 ${message.input}`);
			doitQuestion.trigger('focus');
			return false;
		}

		return true;
	}
