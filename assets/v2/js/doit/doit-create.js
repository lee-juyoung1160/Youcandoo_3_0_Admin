
	import {ajaxRequestWithFile, ajaxRequestWithJson, isSuccessResp, headers, invalidResp} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {
		lengthInput, keyword, dataTable, selCategory, btnAdd, doitTitle, doitDesc, doitKeywords, doitKeyword,
		doitImage, doitQuestion, selSubcategory, btnSubmit, modalOpen, modalClose, modalBackdrop,
		sponsor, sponsorUuid, chkIsApply, chkIsQuestion, chkIsAnswer, maxUserCount,
	} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {onChangeValidateImage, limitInputLength, fadeoutModal, fadeinModal} from "../modules/common.js";
	import {initInputNumber, isEmpty} from "../modules/utils.js";
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
		maxUserCount	.val(100000);
		maxUserCount	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
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
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (!isSuccessResp(json))
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
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
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.profile_uuid);
				$(nRow).attr('data-name', aData.nickname);
				$(nRow).on('click', function () { onSelectSponsor(this); })
			}
		});
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
		let param  = new FormData();
		param.append('file', doitImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function createRequest(data)
	{
		let keywords = [];
		doitKeywords.find('li .added-keyword').each(function () {
			keywords.push($(this).text().trim());
		})
		const param = {
			"profile_uuid" : sponsorUuid.val(),
			"category_uuid" : selCategory.val(),
			"subcategory_uuid" : selSubcategory.val(),
			"doit_title" : doitTitle.val().trim(),
			"doit_description" : doitDesc.val().trim(),
			"max_user" : maxUserCount.val().trim(),
			"doit_keyword" : keywords,
			"doit_image_url" : data.image_urls.file,
			"public_type" : $("input[name=radio-public-type]:checked").val(),
			"approve_member" : chkIsApply.is(':checked') ? 'Y' : 'N',
			"is_question" : chkIsQuestion.is(':checked') ? 'Y' : 'N',
			"question": doitQuestion.val().trim(),
			"answer_type" : chkIsAnswer.is(':checked') ? 'public' : 'private'
		}

		ajaxRequestWithJson(true, api.createDoit, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
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

		const doitImg = doitImage[0].files;
		if (doitImg.length === 0)
		{
			sweetToast(`두잇 소개 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}
