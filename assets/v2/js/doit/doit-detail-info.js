
	import {ajaxRequestWithFormData, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js'
	import {api, fileApiV2} from '../modules/api-url.js';
	import {
	tabUl,
	doitTitle,
	sponsor,
	category,
	doitDesc,
	doitKeywords,
	doitThumbnail,
	btnUpdate,
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
	doitKeyword, btnUpdateDoit, btnCreateMission,
} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {calculateInputLength, onErrorImage} from "../modules/common.js";
	import {getPathName, isEmpty, splitReverse} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { onClickChkIsApply, onClickChkIsQuestion, addRemoveKeywordEvent } from "../modules/doit-common.js"

	const pathName		= getPathName();
	const categoryIdx	= splitReverse(pathName, '/');

	export function getDetail()
	{
		const url = api.detailDoit;
		const errMsg = label.detailContent + message.ajaxLoadError;
		const param = { "idx" : categoryIdx };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		if (isSuccessResp(data))
		{
			buildDetail(data);
			buildUpdate(data);
		}
		else
			sweetToast(data.msg);
	}

	export let isSponsorDoit;
	export let g_doit_uuid;
	function buildDetail(data)
	{
		let { doit_uuid, doit_status, doit_type, doit_title, doit_description, nickname, category_title, subcategory_title, doit_keyword,
			public_type, is_apply, question, is_answer, doit_image } = data.data;

		isSponsorDoit = doit_type === 'sponsor';
		g_doit_uuid = doit_uuid;

		toggleButtons(doit_status);
		infoDoitTitle.text(doit_title);
		doitSponsor.text( isSponsorDoit ? nickname : label.generalDoit );
		category.html(`${category_title} - <span>${subcategory_title}</span>`);
		infoDoitDesc.text(doit_description);
		infoDoitKeywords.empty();
		doit_keyword.map(keyword => {
			infoDoitKeywords.append(`<li>#<span>${keyword}</span>`);
		})
		publicType.text(getNameFromPublicType(public_type));
		isApply.text(is_apply);
		infoQuestion.text(isEmpty(question) ? label.dash : question);
		isAnswer.text(is_answer);
		doitThumbnail.attr('src', doit_image);
		onErrorImage();
	}

	export let g_category_uuid;
	export let g_subcategory_uuid;
	function buildUpdate(data)
	{
		let { doit_title, doit_description, category_uuid, subcategory_uuid, doit_keyword,
			public_type, is_apply, is_question, question, is_answer } = data.data;

		g_category_uuid = category_uuid;
		g_subcategory_uuid = subcategory_uuid;

		doitTitle.val(doit_title);
		doitDesc.val(doit_description);
		doitKeywords.empty();
		doit_keyword.map(keyword => {
			const keywordEl =
					`<li>
						#<span class="added-keyword">${keyword}</span>
						<button class="btn-i btn-del-keyword"><i class="fas fa-times-circle"></i></button>
					</li>`
			doitKeywords.append(keywordEl);
		});
		addRemoveKeywordEvent();
		rdoPublicType.each(function () {
			if ($(this).val() === public_type)
				$(this).prop("checked", true);
		});
		chkIsApply.prop('checked', is_apply === 'Y');
		onClickChkIsApply(chkIsApply);
		chkIsQuestion.prop('checked', is_question === 'Y');
		onClickChkIsQuestion(chkIsQuestion)
		doitQuestion.val(question);
		chkIsAnswer.prop('checked', is_answer === 'Y');

		calculateInputLength();
	}

	function setSubCategory()
	{
		const url = api.subCategoryList;
		const errMsg = label.list + message.ajaxLoadError
		let param = {
			"category_uuid" : selCategory.val()
		}

		ajaxRequestWithJsonData( false, url, JSON.stringify(param), getSubCategorySuccess, errMsg, false);
	}

	export function getSubCategorySuccess(data)
	{
		isSuccessResp(data) ? buildSelSubCategory(data) : sweetToast(data.msg);
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
				btnDoitStop.text('운영정지');
				btnUpdateDoit.show();
				break;
			case 'stop' :
				btnDoitOpen.hide();
				btnDoitDelete.show();
				btnDoitStop.show();
				btnDoitStop.text('정지해제');
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
			btnUpdate.hide();
		}
	}

	function getNameFromPublicType(type)
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
			let callback = doitImg.length > 0 ? fileUploadReq : updateRequest;

			sweetConfirm(message.modify, callback);
		}
	}

	function fileUploadReq()
	{
		let url = fileApiV2.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', doitImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url = api.updateDoit;
			const errMsg = label.modify + message.ajaxError;
			let keywords = [];
			doitKeywords.find('li .added-keyword').each(function () {
				keywords.push($(this).text().trim());
			})
			let param = {
				"doit_uuid" : g_doit_uuid,
				"category_uuid" : selCategory.val(),
				"subcategory_uuid" : selSubcategory.val(),
				"doit_title" : doitTitle.val().trim(),
				"doit_description" : doitDesc.val().trim(),
				"doit_keyword" : keywords,
				"doit_image" : isEmpty(data) ? "" : data.image_urls.file,
				"public_type" : $("input[name=radio-public-type]:checked").val(),
				"is_apply" : chkIsApply.is(':checked') ? 'Y' : 'N',
				"is_question" : chkIsQuestion.is(':checked') ? 'Y' : 'N',
				"question": doitQuestion.val().trim(),
				"is_answer" : chkIsAnswer.is(':checked') ? 'Y' : 'N'
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		getDetail();
		doitUpdateForm.hide();
		doitInfoForm.show();
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