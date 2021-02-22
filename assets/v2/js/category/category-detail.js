
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
	categoryTitle,
	categoryIcon,
	isEstablish,
	isExposure,
	btnBack, btnList, btnUpdate, btnSubmit,
	modalOpen, modalClose, modalBackdrop,
	dataTable, subCategoryTitle, lengthInput,
} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack, limitInputLength, onErrorImage} from "../modules/common.js";
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
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		btnUpdate		.on('click', function () { goUpdatePage(); });
		btnSubmit		.on('click', function () { onSubmitSubcategory(); });
	});

	function onClickModalOpen()
	{
		fadeinModal();
		subCategoryTitle.trigger('focus');
		subCategoryTitle.val('');
	}

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

		categoryTitle.text(category_title);
		categoryIcon.attr('src', icon_image_url);
		isEstablish.text(is_establish);
		isExposure.text(is_exposure);

		g_category_uuid = category_uuid;

		onErrorImage();

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
				{title: "세부 카테고리",	data: "subcategory_title" }
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
			}
		});
	}

	function createValidation()
	{
		if (isEmpty(subCategoryTitle.val()))
		{
			sweetToast(`세부 카테고리는 ${message.required}`);
			subCategoryTitle.trigger('focus');
			return false;
		}

		return true;
	}

	function onSubmitSubcategory()
	{
		if (createValidation())
			sweetConfirm(message.create, createSubcategoryRequest);
	}

	function createSubcategoryRequest()
	{
		const url = api.createSubCategory;
		const errMsg = label.submit + message.ajaxError;
		const param = {
			"category_uuid" : g_category_uuid,
			"title" : subCategoryTitle.val()
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createSubcategoryCallback, errMsg, false);
	}

	function createSubcategoryCallback(data)
	{
		sweetToastAndCallback(data, createSubcategorySuccess)
	}

	function createSubcategorySuccess()
	{
		fadeoutModal();
		getSubCategory();
	}

	function goListPage()
	{
		location.href = page.listCategory;
	}

	function goUpdatePage()
	{
		location.href = page.updateCategory + categoryIdx;
	}


