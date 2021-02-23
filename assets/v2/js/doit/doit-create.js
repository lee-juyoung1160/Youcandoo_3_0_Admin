
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp, headers } from '../modules/request.js'
	import { api, fileApi } from '../modules/api-url.js';
	import {
		lengthInput, keyword, dataTable, selCategory, btnAdd,
		doitTitle, doitDesc, doitKeywords, doitKeyword,
		doitImage, doitQuestion, selSubcategory,
		btnSubmit, modalOpen, modalClose, modalBackdrop,
		sponsorTitle, sponsorUuid, chkIsApply, chkIsQuestion, chkIsAnswer,
	} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {onChangeValidateImage, limitInputLength, fadeoutModal, fadeinModal} from "../modules/common.js";
	import { isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig} from "../modules/tables.js";

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

	function getCategoryList()
	{
		const url = api.categoryList;
		const errMsg = label.list + message.ajaxLoadError
		const param = { "keyword" : "" };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getCategoryListSuccess, errMsg, false);
	}

	function getCategoryListSuccess(data)
	{
		isSuccessResp(data) ? buildSelCategory(data) : sweetToast(data.msg);
	}

	function buildSelCategory(data)
	{
		let options = '';
		data.data.map( obj => {
			options += `<option value="${obj.category_uuid}">${obj.category_title}</option>`;
		})

		selCategory.html(options);

		getSubCategory();
	}

	function onChangeSelCategory()
	{
		getSubCategory();
	}

	function getSubCategory()
	{
		const url = api.subCategoryList;
		const errMsg = label.list + message.ajaxLoadError
		let param = {
			"category_uuid" : selCategory.val()
		}

		ajaxRequestWithJsonData( false, url, JSON.stringify(param), getSubCategorySuccess, errMsg, false);
	}

	function getSubCategorySuccess(data)
	{
		isSuccessResp(data) ? buildSelSubCategory(data) : sweetToast(data.msg);
	}

	function buildSelSubCategory(data)
	{
		let options = '';
		data.data.map( obj => {
			options += `<option value="${obj.subcategory_uuid}">${obj.subcategory_title}</option>`;
		})

		selSubcategory.html(options);
	}

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
				$(nRow).addClass('sponsor-row');
			}
		});
	}

	function addClickEvent()
	{
		document.querySelectorAll('.sponsor-row').forEach( element => element.addEventListener('click', onSelectSponsor));
	}


	function onSelectSponsor()
	{
		sponsorUuid.val($(this).data('uuid'));
		sponsorTitle.val($(this).data('name'));
		fadeoutModal();
	}

	function onKeyupKeyword()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function onClickAddKeyword()
	{
		if (addKeywordValidation())
		{
			const inputValue = doitKeyword.val().trim();
			let keywordArr = [];
			$(".added-keyword").each(function () {
				keywordArr.push($(this).text());
			});

			if (isEmpty(keywordArr) || keywordArr.indexOf(inputValue) === -1)
			{
				const doitKeywordEl =
					`<li>
						#<span class="added-keyword">${inputValue}</span>
						<button class="btn-i btn-del-keyword"><i class="fas fa-times-circle"></i></button>
					</li>`

				doitKeywords.append(doitKeywordEl);

				doitKeyword.val('');
				doitKeyword.trigger('focus');
				limitInputLength(doitKeyword);
				addRemoveKeywordEvent();
			}
		}
	}

	function addKeywordValidation()
	{
		if (isEmpty(doitKeyword.val()))
		{
			sweetToast(`키워드를 ${message.input}`);
			doitKeyword.trigger('focus');
			return false;
		}

		const splitInput = doitKeyword.val().split('');
		if (splitInput.indexOf(',') !== -1 || splitInput.indexOf('#') !== -1)
		{
			sweetToast('키워드에 # 또는 , 를 포함할 수 없습니다.');
			return false;
		}

		const doitKeywordLength = doitKeywords.find('li').length;
		if (doitKeywordLength >= 3)
		{
			sweetToast(`키워드는 ${message.maxAddSix}`);
			return false;
		}

		return true;
	}

	function addRemoveKeywordEvent()
	{
		document.querySelectorAll('.btn-del-keyword').forEach( element => element.addEventListener('click', removeDoitKeyword));
	}

	function removeDoitKeyword()
	{
		$(this).parent().remove();
	}

	function onClickChkIsApply(obj)
	{
		if (!$(obj).is(':checked'))
		{
			chkIsQuestion.prop('checked', false);
			chkIsQuestion.prop('disabled', true);
			toggleQuestion(chkIsQuestion);

			chkIsAnswer.prop('checked', false);
			chkIsAnswer.prop('disabled', true);
		}
		else
			chkIsQuestion.prop('disabled', false);
	}

	function onClickChkIsQuestion(obj)
	{
		if (!$(obj).is(':checked'))
		{
			chkIsAnswer.prop('checked', false);
			chkIsAnswer.prop('disabled', true);
		}
		else
			chkIsAnswer.prop('disabled', false);

		toggleQuestion(obj)
	}

	function toggleQuestion(obj)
	{
		const textAreaWrap = $(obj).parent().siblings('.textarea-wrap');
		if ($(obj).is(':checked'))
			$(textAreaWrap).show()
		else
		{
			$(textAreaWrap).hide();
			$(textAreaWrap).children('textarea').val('');
		}

		$(textAreaWrap).children('textarea').trigger('focus');
	}

	function onSubmitDoit()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let url = fileApi.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', doitImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			let url 	= api.createCategory;
			let errMsg 	= label.submit+message.ajaxError;
			let { file } = data.image_urls;
			let param = {
				"profile_uuid" : sponsorUuid.val(),
				"category_uuid" : selCategory.val(),
				"subcategory_uuid" : selSubcategory.val(),
				"doit_title" : doitTitle.val().trim(),
				"doit_description" : doitDesc.val().trim(),
				"doit_keyword" : ["돼린","마동린"],
				"doit_image" : "",
				"public_type" : $("input[name=radio-public-type]:checked").val(),
				"is_apply" : chkIsApply.is('checked') ? 'Y' : 'N',
				"is_question" : chkIsQuestion.is('checked') ? 'Y' : 'N',
				"question": doitQuestion.val().trim(),
				"is_answer" : chkIsAnswer.is('checked') ? 'Y' : 'N'
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
		if (isEmpty(doitTitle.val()))
		{
			sweetToast(`두잇 명은 ${message.required}`);
			doitTitle.trigger('focus');
			return false;
		}

		let categoryIcn = categoryIcon[0].files;
		if (categoryIcn.length === 0)
		{
			sweetToast(`카테고리 아이콘은 ${message.required}`);
			return false;
		}

		return true;
	}

