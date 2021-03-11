
	import {headers,} from '../modules/request.js';
	import {api} from '../modules/api-url.js';
	import {body, btnSearch, btnReset, keyword, dataTable, selPageLength, dateButtons,} from '../modules/elements.js';
	import {sweetError,} from '../modules/alert.js';
	import {initSelectOption, initPageLength, initSearchDatepicker, initDayBtn,
		initMaxDateMonths, initSearchDateRangeMonth, onClickDateRangeBtn} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initSearchForm();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 목록 불러오기 **/
		//buildTable();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
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
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

					return JSON.stringify(json);
				},
				data: function (d) {
					const table = doitTable.DataTable();
					const info 	= table.page.info();
					const _page = (info.start / info.length) + 1;
					const param = {
						"keyword" : keyword.val().trim(),
						"page": _page,
						"limit": selPageLength.val(),
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기기", 			data: "push_status",    width: "10%" }
				,{title: "앱버전", 		data: "push_status",    width: "10%" }
				,{title: "제목", 		data: "title", 	  		width: "30%",
					render: function (data) {
						return `<a href="popup/detail">새로워진 유캔두 둘러보깅</a>`;
					}
				}
				,{title: "노출기간", 		data: "created_datetime",		width: "30%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "등록일", 		data: "created",		width: "10%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "노출여부", 		data: "is_exposure",   	width: "10%" }

			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}