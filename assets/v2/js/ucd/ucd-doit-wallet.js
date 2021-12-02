
	import {headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {
		body,
		btnSearch,
		btnReset,
		keyword,
		dataTable,
		selPageLength,
		selSearchType,
		dateButtons,
		dateFrom,
		dateTo,
		rdoType, rdoStatus, amount
	} from '../modules/elements.js';
	import {sweetError, sweetToast} from '../modules/alert.js';
	import {initSelectOption, initPageLength, initSearchDatepicker, onClickDateRangeBtn, initDayBtn, initMaxDateToday,
		initSearchDateRangeWeek, onChangeSearchDateFrom, onChangeSearchDateTo,} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {initInputNumber, isEmpty, isNegative, numberWithCommas,} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
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
		amount			.on("propertychange change keyup paste input", function () { initInputNumber(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday();
		initSearchDateRangeWeek();
		initSelectOption();
		keyword.val('');
		rdoType.eq(0).prop('checked', true);
		rdoStatus.eq(0).prop('checked', true);
		amount.val(5000);
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
				url: api.doitWalletList,
				type: "POST",
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
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"search_type" : selSearchType.val(),
						"keyword" : keyword.val().trim(),
						"send_type" : 'doit',
						"receive_type" : 'doit',
						"transfer_type" : $("input[name=radio-type]:checked").val(),
						"value" : $("input[name=radio-status]:checked").val() === 'all' ? 0 : amount.val().trim(),
						"page" : (d.start / d.length) + 1,
						"limit" : d.length,
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "From",    		data: "send_name",  	width: "15%",
					render: function (data) {
						return `<div class="line-clamp-1" title="${data}">${data}</div>`
					}
				}
				,{title: "To",    		data: "receive_name",  	width: "15%",
					render: function (data) {
						return isEmpty(data) ? label.dash : `<div class="line-clamp-1" title="${data}">${data}</div>`;
					}
				}
				,{title: "내용",    		data: "message",  		width: "25%" }
				,{title: "실행자",    	data: "register_name",  width: "15%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? label.dash : row.register_is_company === 'Y' ? label.bizIcon + data : data;
					}
				}
				,{title: "구분",    		data: "transfer_type",  width: "8%" }
				,{title: "UCD", 		data: "value",			width: "9%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "지급 일시",    	data: "sent",  		width: "13%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
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
