
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {categoryTitle, categoryIcon, thumbnail, rdoExposure, btnSubmit, dataTable, lengthInput,} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {limitInputLength, calculateInputLength, onChangeValidateImage, onErrorImage,} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";

	const pathName		= getPathName();
	const categoryIdx	= splitReverse(pathName, '/');

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 상세 불러오기 **/
		getDetail();
		getSubCategory();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		categoryIcon.on('change', function () { onChangeValidateImage(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateCategory(); });
	});

	function getDetail()
	{
		const url = api.detailCategory;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : categoryIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_category_uuid;
	function buildDetail(data)
	{
		const { category_title, is_exposure, is_establish, icon_image_url, category_uuid } = data.data;

		categoryTitle.val(category_title);
		thumbnail.attr('src', icon_image_url);
		rdoExposure.each(function () {
			if ($(this).val() === is_exposure)
				$(this).prop('checked', true);
		});

		g_category_uuid = category_uuid;

		onErrorImage();
		calculateInputLength();

		getSubCategory();
	}

	function getSubCategory()
	{
		const url = api.subCategoryList;
		const errMsg = label.list + message.ajaxLoadError
		const param = {
			"category_uuid" : g_category_uuid
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getSubCategorySuccess, errMsg, false);
	}

	function getSubCategorySuccess(data)
	{
		data.recordsTotal = data.count;
		data.recordsFiltered = data.count;
		buildSubCategory(data);
	}

	function buildSubCategory(data)
	{
		dataTable.DataTable({
			data: data.data,
			columns: [
				{title: "세부 카테고리",	data: "subcategory_title", 	width: "80%" },
				{title: "삭제",			data: "subcategory_uuid",	width: "20%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-text-red delete-btn" id="${data}"><i class="fas fa-minus-circle"></i></button>`
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
				initTableSort();
				addDeleteEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.subcategory_uuid);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function initTableSort()
	{
		dataTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	}

	function addAttrDragonElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*80)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		return $(el);
	}

	function addDeleteEvent()
	{
		$(".delete-btn").on('click', function () { deleteRow(this); })
	}

	let g_delete_uuids = [];
	function deleteRow(obj)
	{
		$(obj).closest('tr').remove();
		g_delete_uuids.push(obj.id);
	}

	function updateValidation()
	{
		if (isEmpty(categoryTitle.val()))
		{
			sweetToast(`카테고리 명은 ${message.required}`);
			categoryTitle.trigger('focus');
			return false;
		}

		return true;
	}

	function onSubmitUpdateCategory()
	{
		if (updateValidation())
		{
			const requestFn = g_delete_uuids.length > 0 ? deleteSubCategoryRequest : reorderSubCategoryRequest

			sweetConfirm(message.modify, requestFn);
		}
	}

	function deleteSubCategoryRequest()
	{
		const url = api.deleteSubCategory;
		const errMsg = `세부 카테고리 삭제 ${message.ajaxError}`;
		const param = { "subcategory_list" : g_delete_uuids };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), deleteSubCategoryCallback, errMsg, false)
	}

	function deleteSubCategoryCallback(data)
	{
		isSuccessResp(data) ? reorderSubCategoryRequest() : sweetToast(data.msg);
	}

	function reorderSubCategoryRequest()
	{
		const subUuids = getRowsId();
		if (subUuids.length > 0)
		{
			const url = api.reorderSubCategory;
			const errMsg = `세부 카테고리 정렬 ${message.ajaxError}`;
			const param = {
				"category_uuid" : g_category_uuid,
				"subcategory_list" : subUuids
			};

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), reorderSubcategoryReqCallback, errMsg, false);
		}
		else
		{
			const imageFile = categoryIcon[0].files;
			imageFile.length === 0 ? updateCategoryRequest() : fileUploadReq();
		}
	}

	function reorderSubcategoryReqCallback(data)
	{
		if (isSuccessResp(data))
		{
			const imageFile = categoryIcon[0].files;
			imageFile.length === 0 ? updateCategoryRequest() : fileUploadReq();
		}
		else
			sweetToast(data.msg);
	}

	function fileUploadReq()
	{
		const url = fileApiV2.single;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', categoryIcon[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateCategoryRequest, errMsg, false);
	}

	function updateCategoryRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url = api.updateCategory;
			const errMsg = label.modify + message.ajaxError;
			const param = {
				"category_uuid" : g_category_uuid,
				"title" : categoryTitle.val().trim(),
				"is_exposure" : $('input[name=radio-exposure]:checked').val(),
			}

			if (!isEmpty(data))
				param["icon_image_url"] = data.image_urls.file;

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateCategoryCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function updateCategoryCallback(data)
	{
		sweetToastAndCallback(data, updateCategorySuccess)
	}

	function updateCategorySuccess()
	{
		location.href = page.detailCategory + categoryIdx;
	}

	function getRowsId()
	{
		const rows = dataTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			let subUuid = $(rows[i]).data('uuid');
			if (isEmpty(subUuid)) continue;
			uuids.push(subUuid);
		}

		return uuids;
	}


