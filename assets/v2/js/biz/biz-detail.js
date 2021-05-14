
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {contentImage, title, bizNo, bizWeb, content, btnBack, btnList, btnUpdate, btnSubmit, modalOpen, modalClose, modalBackdrop,
		selPageLengthDoit, selPageLengthUcd, tabUl, tabContents, amount, inputNumber, lengthInput, description, ucdInfoTable,} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack, onErrorImage, initPageLength, limitInputLength} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty, initInputNumber, numberWithCommas, isNegative} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {buildTotalCount, initTableDefaultConfig, toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";

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
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
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

		switch (target) {
			case '#tabDoitInfo' :
				getBizDoitList();
				break;
			case '#tabUcdInfo' :
				getBizUcdList();
				break;
		}

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

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
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
		ucdInfoTable.DataTable({
			ajax : {
				url: api.bizUcdList,
				type:"POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.data.count;
						json.recordsFiltered = json.data.count;
						json.data = json.data.list;
					}
					else
					{
						json.data = [];
						sweetToast(json.msg);
					}


					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"from_date" : "",
						"to_date" : "",
						"search_type" : "company_uuid",
						"keyword" : g_company_uuid,
						"page" : (d.start / d.length) + 1
						,"limit" : d.length
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError('UCD'+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분",    	data: "division",  		width: "10%" }
				,{title: "제목",    	data: "title",  		width: "15%" }
				,{title: "내용",    	data: "description",  	width: "40%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "UCD", 	data: "amount_ucd",		width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "일시",    	data: "created",  		width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				if (isNegative(aData.amount_ucd))
					$(nRow).addClass('minus-pay');
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
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
			sweetToast(message.maxAvailableBizUcd);
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
		const url = api.saveUcdForBiz;
		const errMsg = label.submit + message.ajaxError;
		const param = {
			"company_uuid" : g_company_uuid,
			"value" : amount.val().trim(),
			"description" : description.val().trim(),
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


