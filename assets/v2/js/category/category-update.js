
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
		categoryTitle,
		categoryIcon,
		thumbnail,
		rdoEstablish,
		rdoExposure,
		btnSubmit,
		dataTable, lengthInput,
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import { limitInputLength, calculateInputLength, onChangeValidateImage, onErrorImage} from "../modules/common.js";
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
		let { category_title, is_exposure, is_establish, icon_image_url, category_uuid } = data.data;

		categoryTitle.val(category_title);
		thumbnail.attr('src', icon_image_url);
		rdoEstablish.each(function () {
			if ($(this).val() === is_exposure)
				$(this).prop('checked', true);
		});
		rdoExposure.each(function () {
			if ($(this).val() === is_establish)
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
		let param = {
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
				addDeleteEvent();
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
			}
		});
	}

	function addDeleteEvent()
	{
		document.querySelectorAll('.delete-btn').forEach( element => element.addEventListener('click', deleteRow));
	}

	let g_delete_uuids = [];
	function deleteRow()
	{
		$(this).closest('tr').remove();
		g_delete_uuids.push(this.id);
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
			const imageFile = categoryIcon[0].files;
			const requestFn = g_delete_uuids.length > 0 ? deleteSubCategoryRequest : imageFile.length === 0 ? updateCategoryRequest : fileUploadReq;

			sweetConfirm(message.modify, requestFn);
		}
	}

	function deleteSubCategoryRequest()
	{
		const url = api.deleteSubCategory;
		const errMsg = label.delete + message.ajaxError;
		const param = { "subcategory_list" : g_delete_uuids };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), deleteSubCategoryCallback, errMsg, false)
	}

	function deleteSubCategoryCallback(data)
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
		let url = fileApi.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', categoryImage[0].files[0]);

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
				"title" : categoryTitle.val(),
				"is_exposure" : $('input[name=radio-exposure]:checked').val(),
				"is_establish" : $('input[name=radio-establish]:checked').val(),
			}

			if (!isEmpty(data))
			{
				const { file } = data.image_urls;
				param["icon_image_url"] = file;
			}

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


