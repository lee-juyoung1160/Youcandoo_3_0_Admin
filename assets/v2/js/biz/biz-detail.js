
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
		contentImage, title, bizNo, bizWeb, content,
		btnBack, btnList, btnUpdate, btnSubmit,
		modalOpen, modalClose, modalBackdrop,
		selPageLengthDoit,
		selPageLengthUcd,
		tabUl, tabContents, amount, inputNumber} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack, onErrorImage, initPageLength} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty, initInputNumber } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";

	const pathName	= getPathName();
	const bizIdx	= splitReverse(pathName, '/');

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLengthDoit);
		initPageLength(selPageLengthUcd);
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		inputNumber 	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		tabUl			.on('click', function (event) { onClickTab(event.target); });
		selPageLengthDoit.on("change", function () { getBizDoitList(); });
		selPageLengthUcd.on("change", function () { getBizUcdList(); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		btnUpdate		.on('click', function () { goUpdatePage(); });
		btnSubmit		.on('click', function () { onSubmitBizUcd(); });
	});

	function onClickTab(selectedTab)
	{
		const target = $(selectedTab).data('target')

		$(selectedTab).siblings().removeClass('active');
		$(selectedTab).addClass('active');
		tabContents.hide();
		$(target).show();
	}

	function onClickModalOpen()
	{
		fadeinModal();
		amount.trigger('focus');
		amount.val('');
	}

	function getDetail()
	{
		const url = api.detailBiz;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : bizIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_company_uuid;
	function buildDetail(data)
	{
		const { company_uuid, company_number,profile_image_url, nickname, site_url, description } = data.data;

		g_company_uuid = company_uuid;

		contentImage.attr('src', profile_image_url);
		title.text(nickname);
		bizNo.text(company_number);
		bizWeb.html(`<a href="${site_url}" class="link" target="_blank">${site_url}</a>`);
		content.text(description);

		onErrorImage();
	}

	function getBizDoitList()
	{

	}

	function getBizUcdList()
	{

	}

	function createValidation()
	{
		if (isEmpty(amount.val()))
		{
			sweetToast(`ucd는 ${message.required}`);
			amount.trigger('focus');
			return false;
		}

		if (amount.val() > 100000000)
		{
			sweetToast(`UCD는 ${message.maxAvailableBizUcd}`);
			amount.trigger('focus');
			return false;
		}

		return true;
	}

	function onSubmitBizUcd()
	{
		if (createValidation())
			sweetConfirm(message.create, createBizUcdRequest);
	}

	function createBizUcdRequest()
	{
		const url = api.createSubCategory;
		const errMsg = label.submit + message.ajaxError;
		const param = {
			"profile_uuid" : g_category_uuid,
			"ucd" : amount.val()
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createBizUcdCallback, errMsg, false);
	}

	function createBizUcdCallback(data)
	{
		sweetToastAndCallback(data, createSubcategorySuccess)
	}

	function createSubcategorySuccess()
	{
		fadeoutModal();
		getDetail();
	}

	function goListPage()
	{
		location.href = page.listBiz;
	}

	function goUpdatePage()
	{
		location.href = page.updateBiz + bizIdx;
	}


