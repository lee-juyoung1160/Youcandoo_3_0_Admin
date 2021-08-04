
	import {headers, invalidResp, isSuccessResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url-v1.js';
	import {dateButtons, dataTable, dateFrom, dateTo, keyword, btnSearch, btnReset, updateTable, btnSubmit, btnCancel, nickname} from '../modules/elements.js';
	import { sweetToast, sweetError } from  '../modules/alert.js';
	import {onClickDateRangeBtn, initDayBtn, initSearchDatepicker, initSearchDateRangeMonth, initMaxDateMonths,
		initSelectOption, onChangeSearchDateFrom, onChangeSearchDateTo} from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, } from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

	let g_event_uuid;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initEventSearchForm();
		/** 목록 불러오기 **/
		buildEventTable();
		/** 이벤트 **/
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		btnSearch 	.on("click", function () { onSubmitSearch(); });
		btnReset	.on("click", function () { initEventSearchForm(); });
		btnSubmit 	.on("click", function () { onSubmitSearchNickname(); });
		btnCancel	.on("click", function () { initProfileSearchForm(); });
		dateButtons	.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initEventSearchForm()
	{
		initDayBtn();
		initMaxDateMonths()
		initSearchDateRangeMonth();
		initSelectOption();
		keyword.val('');
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(30);
		table.ajax.reload();
		initMaxDateMonths();
		initDayBtn();
	}

	function buildEventTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.customEvent,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
						if (json.count === 0)
						{
							g_event_uuid = '';
							onSubmitSearchNickname();
						}
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
						g_event_uuid = '';
						onSubmitSearchNickname();
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"title" : keyword.val().trim(),
						"page": (d.start / d.length) + 1,
						"limit": d.length,
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "제목",    		data: "title",  		width: "70%" }
				,{title: "기간", 		data: "event_uuid",		width: "30%",
					render: function (data, type, row, meta) {
						return `${row.start_date} ~ ${row.end_date}`;
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 30,
			select: {
				style: 'single',
				selector: 'tr',
				toggleable: false
			},
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData, dataIndex) {
				$(nRow).attr('data-uuid', aData.event_uuid);
				$(nRow).off().on('click', function () { onClickEvent(this); });

				if (dataIndex === 0)
				{
					let table = dataTable.DataTable();
					table.row(dataIndex).select();
					onClickEvent($(nRow));
				}
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function onClickEvent(obj)
	{
		g_event_uuid = $(obj).data('uuid');
		buildEventProfileTable();
	}

	function initProfileSearchForm()
	{
		nickname.val('');
	}

	function onSubmitSearchNickname()
	{
		let table = updateTable.DataTable();
		table.page.len(30);
		table.ajax.reload();
	}

	function buildEventProfileTable()
	{
		updateTable.DataTable({
			ajax : {
				url: api.customEventProfile,
				type: "POST",
				headers: headers,
				global: false,
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
						"event_uuid" : g_event_uuid,
						"nickname" : nickname.val().trim(),
						"page": (d.start / d.length) + 1,
						"limit": d.length,
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임",    		data: "nickname",  		width: "20%" }
				,{title: "PID", 		data: "profile_uuid",	width: "60%" }
				,{title: "참여일시", 		data: "created",		width: "20%" }
			],
			serverSide: true,
			paging: true,
			pageLength: 30,
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

