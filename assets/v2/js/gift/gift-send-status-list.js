
	import {headers, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {body, dateButtons, dataTable, dateFrom, dateTo, keyword, selPageLength, btnSearch, btnReset, selSearchType, totalUcd,} from '../modules/elements.js';
	import {onClickDateRangeBtn, initDayBtn, initSearchDatepicker, initSearchDateRangeMonth,
		initMaxDateToday, initSelectOption, onChangeSearchDateFrom, onChangeSearchDateTo} from "../modules/common.js";
	import {numberWithCommas} from "../modules/utils.js";
	import { initTableDefaultConfig, buildTotalCount,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {sweetToast} from "../modules/alert.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initSearchForm();
		/** 목록 불러오기 **/
		buildTable();
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
		initMaxDateToday()
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
		table.ajax.reload();
		initMaxDateToday();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.sendGiftStatusList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.GiftTotalCount;
						json.recordsFiltered = json.GiftTotalCount;
						totalUcd.text(numberWithCommas(json.GiftTotalUcd));
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
						from_date : dateFrom.val(),
						to_date : dateTo.val(),
						search_type : selSearchType.val(),
						keyword : keyword.val().trim()
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "상품",    		data: "gift_name",  		width: "40%" }
				,{title: "발송 건 수", 	data: "total_gift_qty",		width: "30%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "금액(UCD)", 	data: "total_gift_ucd",		width: "30%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
			],
			serverSide: true,
			paging: false,
			select: false,
			destroy: false,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
			}
		});
	}
