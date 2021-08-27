
	import {headers, isSuccessResp, invalidResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, keyword, dataTable, selPageLength, selSearchType, dateButtons, dateFrom, dateTo,} from '../modules/elements.js';
	import { sweetError, sweetToast } from '../modules/alert.js';
	import {initSelectOption, initPageLength, initSearchDatepicker, onClickDateRangeBtn, initDayBtn, initMaxDateToday,
		initSearchDateRangeWeek, onChangeSearchDateFrom, onChangeSearchDateTo,} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty, numberWithCommas, isNegative} from "../modules/utils.js";

	let firstSearch = true;

	$( () => {
		keyword.trigger('focus');
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
		buildEmptyTable();
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
		initMaxDateToday();
		initSearchDateRangeWeek();
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
		if (isEmpty(keyword.val()))
		{
			sweetToast(`검색어를 ${message.input}`);
			return;
		}

		if (firstSearch)
		{
			buildTable();
			firstSearch = false;
			return;
		}

		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function buildTable()
	{
		const table = dataTable.DataTable();
		table.destroy();
		dataTable.empty();
		dataTable.DataTable({
			ajax : {
				url: api.memberWalletList,
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
						sweetToast(invalidResp(data));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"search_type" : selSearchType.val(),
						"keyword" : isEmpty(keyword.val()) ? '검색어 입력 필수' : keyword.val().trim(),
						"page" : (d.start / d.length) + 1
						,"limit" : d.length
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임",    	data: "nickname",  		width: "20%" }
				,{title: "구분",    	data: "division",  		width: "10%" }
				,{title: "제목",    	data: "title",  		width: "15%" }
				,{title: "내용",    	data: "description",  	width: "30%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "UCD", 	data: "value",		width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "일시",    	data: "created",  		width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				if (isNegative(aData.value))
					$(nRow).addClass('minus-pay');
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildEmptyTable()
	{
		dataTable.DataTable({
			data: [],
			columns: [
				{title: "닉네임",    	data: "nickname",  		width: "20%" }
				,{title: "구분",    	data: "division",  		width: "10%" }
				,{title: "제목",    	data: "title",  		width: "15%" }
				,{title: "내용",    	data: "description",  	width: "30%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "UCD", 	data: "value",		width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "일시",    	data: "created",  		width: "15%" }
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
		});
	}
