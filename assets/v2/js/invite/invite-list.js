
	import {headers, invalidResp, isSuccessResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {
		body,
		dateButtons,
		dataTable,
		dateFrom,
		dateTo,
		keyword,
		selPageLength,
		btnSearch,
		btnReset,
		selSearchType,
		selDateType, rdoType
	} from '../modules/elements.js';
	import { sweetToast, sweetError } from  '../modules/alert.js';
	import {
		onClickDateRangeBtn, initDayBtn, initSearchDatepicker, initPageLength,
		initSelectOption, onChangeSearchDateFrom, onChangeSearchDateTo, initMaxDateToday, setDateToday
	} from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, } from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
		/** 목록 불러오기 **/
		// buildTable();
		/** 이벤트 **/
		body  		.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		// selPageLength	.on("change", function () { onSubmitSearch(); });
		// btnSearch 	.on("click", function () { onSubmitSearch(); });
		btnReset	.on("click", function () { initSearchForm(); });
		dateButtons	.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday();
		setDateToday();
		initSelectOption();
		keyword.val('');
		rdoType.eq(0).prop('checked', true);
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
				url: api.inviteList,
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
						"search_type": selSearchType.val(),
						"keyword" : keyword.val().trim(),
						"is_exposure": $("input[name=radio-type]:checked").val(),
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
				{title: "닉네임",    	data: "nickname",  		width: "25%" }
				,{title: "가입일", 		data: "created",		width: "25%",
					render: function (data, type, row, meta) {
						return data.slice(0, 10);
					}
				}
				,{title: "첫 인증일", 	data: "event_type",		width: "25%",
					render: function (data, type, row, meta) {
						return data.slice(0, 10);
					}
				}
				,{title: "추천인",    	data: "is_exposure",  	width: "25%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
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
