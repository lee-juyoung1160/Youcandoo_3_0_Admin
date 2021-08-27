
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, keyword, dataTable, updateTable,
		selPageLength, modalOpen, modalClose, modalBackdrop, btnUpdate, selSearchType,} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {initSelectOption, initPageLength, fadeoutModal, fadeinModal} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, getCurrentPage, redrawPage} from '../modules/tables.js';
	import {getHistoryParam, isBackAction, setHistoryParam} from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";

	let _currentPage = 1;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화
		 *  메뉴클릭으로 페이지 진입 > 초기값 세팅
		 *  뒤로가기로 페이지 진입 > 이전 값 세팅
		 * **/
		isBackAction() ? setHistoryForm() : initSearchForm();
		/** 목록 불러오기 **/
		buildTable();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnUpdate		.on("click", function () { onSubmitUpdate(); });
	});

	function initSearchForm()
	{
		initSelectOption();
		keyword.val('');
	}

	function setHistoryForm()
	{
		const historyParams = getHistoryParam();

		selSearchType.val(historyParams.search_type);
		keyword.val(historyParams.keyword);
		selPageLength.val(historyParams.limit);
		_currentPage = historyParams.page;
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		_currentPage = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.giftList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "상품 ID",    	data: "gift_uuid",  		width: "25%" }
				,{title: "상품코드",    	data: "goods_code",  		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "상품명", 		data: "gift_name",			width: "25%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailGift + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "금액(UCD)",    data: "gift_ucd",  			width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "이미지",    	data: "gift_image_url",  	width: "10%",
					render: function (data) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`
					}
				}
				,{title: "판매종료일",    data: "end_date",  			width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data.slice(0, 10);
					}
				}
				,{title: "노출여부",    	data: "is_exposure",  		width: "10%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
				$(this).on('page.dt', function () { _currentPage = getCurrentPage(this); });
				redrawPage(this, _currentPage);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		const param = {
			"search_type" : selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"page": _currentPage,
			"limit": selPageLength.val(),
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onClickModalOpen()
	{
		fadeinModal();
		buildUpdateTable();
	}

	function buildUpdateTable()
	{
		updateTable.DataTable({
			ajax : {
				url: api.reorderGiftList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "상품명", 		data: "gift_name",			width: "70%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailGift + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "이미지",    	data: "gift_image_url",  	width: "20%",
					render: function (data) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`
					}
				}
			],
			serverSide: true,
			paging: false,
			select: false,
			destroy: true,
			scrollY: 650,
			scrollCollapse: true,
			initComplete: function () {
				initTableSort();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.gift_uuid);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function initTableSort()
	{
		updateTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	}

	function addAttrDragonElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*70)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		return $(el);
	}

	function onSubmitUpdate()
	{
		if (updateValidation())
			sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		const param = { "gift_uuid" : getRowIds() };

		ajaxRequestWithJson(true, api.reorderGift, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, reorderSuccess);
			})
			.catch(reject => sweetError(label.modify + message.ajaxError));
	}

	function reorderSuccess()
	{
		fadeoutModal();
		onSubmitSearch();
	}

	function updateValidation()
	{
		let uuids = getRowIds();
		if (uuids.length === 0)
		{
			sweetToast(message.emptyList);
			return false;
		}

		return true;
	}

	function getRowIds()
	{
		const rows = updateTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			const uuid = $(rows[i]).data('uuid');
			if (isEmpty(uuid)) continue;
			uuids.push(uuid);
		}

		return uuids;
	}
