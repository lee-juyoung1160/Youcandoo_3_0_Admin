
	import { ajaxRequestWithJsonData, isSuccessResp, headers } from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {
		body, dateButtons, dataTable, selDateType, dateFrom, dateTo, keyword, chkStatus,
		selPageLength, selSort, btnSearch, btnReset, selSearchType, selCategory
	} from '../modules/elements.js';
	import { sweetToast } from  '../modules/alert.js';
	import { onClickDateRangeBtn, initDayBtn, initSearchDatepicker, initSearchDateRangeMonths, initMaxDateMonths, initPageLength, initSelectOption } from "../modules/common.js";
	import { isEmpty } from "../modules/utils.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, getCurrentPage, redrawPage } from '../modules/tables.js';
	import { setHistoryParam, getHistoryParam, isBackAction } from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	let _currentPage = 1;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** 카테고리 목록 **/
		getCategoryList();
		/** 이벤트 **/
		body  		.on("keydown", function (event) { onKeydownSearch(event) });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		selSort		.on("change", function () { onSubmitSearch(); });
		btnSearch 	.on("click", function () { onSubmitSearch(); });
		btnReset	.on("click", function () { initSearchForm(); });
		dateButtons	.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateMonths()
		initSearchDateRangeMonths();
		initSelectOption();
		keyword.val('');
		chkStatus.prop('checked', true);
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		chkStatus.each(function () {
			if (historyParams.doit_status.indexOf($(this).val()) !== -1)
				$(this).prop("checked", true);
			else $(this).prop("checked", false);
		});
		selDateType.val(historyParams.date_type);
		selSearchType.val(historyParams.search_type);
		selCategory.val(historyParams.category_uuid);
		selSort.val(historyParams.order_by);
		selPageLength.val(historyParams.limit);
		_currentPage = historyParams.page;
	}

	function getCategoryList()
	{
		const url = api.categoryList;
		const errMsg = label.list + message.ajaxLoadError
		const param = { "keyword" : "" };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getCategoryListCallback, errMsg, false);
	}

	function getCategoryListCallback(data)
	{
		isSuccessResp(data) ? buildSelCategory(data) : sweetToast(data.msg);
	}

	function buildSelCategory(data)
	{
		let options = '<option value="">전체</option>';
		data.data.map( obj => {
			options += `<option value="${obj.category_uuid}">${obj.category_title}</option>`;
		})

		selCategory.html(options);

		initPage();
	}

	function initPage()
	{
		/** 입력 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		isBackAction() ? setHistoryForm() : initSearchForm();
		/** 목록 불러오기 **/
		buildTable();
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
		initMaxDateMonths();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.doitList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

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
				{title: "카테고리",    	data: "category_title",  	width: "10%" }
				,{title: "세부 카테고리", 	data: "subcategory_title",	width: "10%" }
				,{title: "두잇명", 		data: "doit_title",			width: "30%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailDoit}${row.idx}">${data}</a>`;
					}
				}
				,{title: "리더", 		data: "nickname",			width: "10%" }
				,{title: "생성일", 		data: "created",			width: "10%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "오픈일", 		data: "opened",				width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data.substring(0, 10);
					}
				}
				,{title: "참여인원",    	data: "member_cnt",  		width: "10%" }
				,{title: "상태",    		data: "doit_status",  		width: "10%",
					render: function (data) {
						switch (data) {
							case 'create' : return '생성';
							case 'open' : return '진행중';
							case 'stop' : return '운영정지';
							case 'delete' : return '삭제';
						}
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
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
		let status = [];
		chkStatus.each(function () {
			if ($(this).is(":checked"))
				status.push($(this).val())
		})
		const param = {
			"date_type" : selDateType.val(),
			"from_date" : dateFrom.val(),
			"to_date" : dateTo.val(),
			"search_type": selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"page": _currentPage,
			"limit": selPageLength.val(),
			"doit_status" : status,
			"category_uuid": selCategory.val(),
			"order_by" : selSort.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}
