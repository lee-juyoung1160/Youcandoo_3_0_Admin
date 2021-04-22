
	import {headers, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {body, dateButtons, dataTable, dateFrom, dateTo, keyword, selPageLength, btnSearch, btnReset, selSearchType, rdoExposure} from '../modules/elements.js';
	import { sweetToast, sweetError } from  '../modules/alert.js';
	import {
	onClickDateRangeBtn,
	initDayBtn,
	initSearchDatepicker,
	initSearchDateRangeMonth,
	initMaxDateMonths,
	initPageLength,
	initSelectOption,
		onChangeSearchDateFrom, onChangeSearchDateTo
	} from "../modules/common.js";
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
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		isBackAction() ? setHistoryForm() : initSearchForm();
		/** 목록 불러오기 **/
		//buildTable();
		/** 이벤트 **/
		body  		.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch 	.on("click", function () { onSubmitSearch(); });
		btnReset	.on("click", function () { initSearchForm(); });
		dateButtons	.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateMonths()
		initSearchDateRangeMonth();
		initSelectOption();
		keyword.val('');
		rdoExposure.eq(0).prop('checked', true);
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		selSearchType.val(historyParams.search_type);
		rdoExposure.each(function () {
			if ($(this).val() === historyParams.isExposure)
				$(this).prop("checked", true);
		});
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
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(json.msg);
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
		const param = {
			"date_type" : selDateType.val(),
			"from_date" : dateFrom.val(),
			"to_date" : dateTo.val(),
			"search_type": selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"page": _currentPage,
			"limit": selPageLength.val(),
			"category_uuid": selCategory.val(),
			"order_by" : selSort.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}
