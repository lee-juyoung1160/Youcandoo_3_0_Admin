
	import {headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import {api} from '../modules/api-url.js';
	import {body, btnSearch, btnReset, keyword, dataTable, selPageLength, dateButtons,dateFrom, dateTo, selDateType, selSearchType,} from '../modules/elements.js';
	import {sweetError, sweetToast,} from '../modules/alert.js';
	import {initSelectOption, initPageLength, initSearchDatepicker, initDayBtn, initMaxDateMonths, initSearchDateRangeMonth,
		onClickDateRangeBtn, onChangeSearchDateFrom, onChangeSearchDateTo} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, getCurrentPage, redrawPage,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { page } from "../modules/page-url.js";
	import { message } from "../modules/message.js";
	import {isBackAction} from "../modules/history.js";

	let _currentPage = 1;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
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
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateMonths()
		initSearchDateRangeMonth();
		initSelectOption();
		keyword.val('');
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
				url: api.popupList,
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
					const param = {
						"date_type" : selDateType.val(),
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"search_type" : selSearchType.val(),
						"keyword" : keyword.val().trim(),
						"page": (d.start / d.length) + 1,
						"limit": selPageLength.val(),
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기기", 			data: "store",    		   	width: "10%",
					render: function (data) {
						switch (data) {
							case 'all' : return '전체';
							case 'google' : return 'AOS';
							case 'apple' : return 'IOS';
						}
					}
				}
				,{title: "앱버전", 		data: "target_version",    	width: "10%",
					render: function (data) {
						return parseFloat(data);
					}
				}
				,{title: "제목", 		data: "title", 	  		    width: "30%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailPopup}${row.idx}">${data}</a>`;
					}
				}
				,{title: "노출기간", 		data: "start_date",			width: "30%",
					render: function (data, type, row, meta) {
						return `${row.start_date} ~ ${row.end_date}`;
					}
				}
				,{title: "등록일", 		data: "created",			width: "10%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "노출여부", 		data: "is_exposure",   		width: "10%" }

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
