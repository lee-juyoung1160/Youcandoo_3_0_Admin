
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp, headers } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {
		lengthInput, keyword, dataTable, selCategory, btnAdd,
		doitTitle, doitDesc, doitKeywords, doitKeyword,
		doitImage, doitQuestion, selSubcategory,
		btnSubmit, modalOpen, modalClose, modalBackdrop,
		sponsor, sponsorUuid, chkIsApply, chkIsQuestion, chkIsAnswer,
	} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {onChangeValidateImage, limitInputLength, fadeoutModal, fadeinModal} from "../modules/common.js";
	import { isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig} from "../modules/tables.js";
	import { onClickChkIsApply, onClickChkIsQuestion, onClickAddKeyword, onChangeSelCategory, getCategoryList } from "../modules/doit-common.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 카테고리 목록 **/
		getCategoryList();
		/** 이벤트 **/
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		doitImage		.on('change', function () { onChangeValidateImage(this); });
		selCategory		.on('change', function () { onChangeSelCategory(); });
		keyword			.on('keyup', function () { onKeyupKeyword(); });
		btnAdd			.on('click', function () { onClickAddKeyword(); });
		chkIsApply		.on('change', function () { onClickChkIsApply(this); });
		chkIsQuestion	.on('change', function () { onClickChkIsQuestion(this); });
		btnSubmit		.on('click', function () { onSubmitDoit(); });
	});

	function onClickModalOpen()
	{
		fadeinModal();
		initModal();
		buildSponsor();
	}

	function initModal()
	{
		keyword.trigger('focus');
		keyword.val('');
	}

	function buildSponsor()
	{
		dataTable.DataTable({
			ajax : {
				url: api.doitSponsorList,
				type:"POST",
				headers: headers,
				global: false,
				data: function (d) {
					return JSON.stringify({ "nickname" : keyword.val() });
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "스폰서 명",	data: "nickname" }
			],
			serverSide: true,
			paging: false,
			select: false,
			scrollY: 450,
			scrollCollapse: true,
			destroy: true,
			initComplete: function () {
				addClickEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.profile_uuid);
				$(nRow).attr('data-name', aData.nickname);
				$(nRow).addClass('biz-row');
			}
		});
	}

	function addClickEvent()
	{
		$(".biz-row").on('click', function () { onSelectSponsor(this); })
	}


	function onSelectSponsor(obj)
	{
		sponsorUuid.val($(obj).data('uuid'));
		sponsor.val($(obj).data('name'));
		fadeoutModal();
	}

	function onKeyupKeyword()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function onSubmitDoit()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let url = fileApiV2.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', doitImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			const url = api.createDoit;
			const errMsg = label.submit + message.ajaxError;
			let keywords = [];
			doitKeywords.find('li .added-keyword').each(function () {
				keywords.push($(this).text().trim());
			})
			let param = {
				"profile_uuid" : sponsorUuid.val(),
				"category_uuid" : selCategory.val(),
				"subcategory_uuid" : selSubcategory.val(),
				"doit_title" : doitTitle.val().trim(),
				"doit_description" : doitDesc.val().trim(),
				"doit_keyword" : keywords,
				"doit_image" : data.image_urls.file,
				"public_type" : $("input[name=radio-public-type]:checked").val(),
				"is_apply" : chkIsApply.is(':checked') ? 'Y' : 'N',
				"is_question" : chkIsQuestion.is(':checked') ? 'Y' : 'N',
				"question": doitQuestion.val().trim(),
				"is_answer" : chkIsAnswer.is(':checked') ? 'Y' : 'N'
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listDoit;
	}

	function validation()
	{
		if (isEmpty(sponsor.val()))
		{
			sweetToast(`스폰서 명은 ${message.required}`);
			sponsor.trigger('focus');
			return false;
		}

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

		const doitImg = doitImage[0].files;
		if (doitImg.length === 0)
		{
			sweetToast(`두잇 소개 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}

