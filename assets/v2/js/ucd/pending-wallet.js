
	import {headers, isSuccessResp, invalidResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url-v1.js';
	import {body, btnSearch, btnReset, keyword, dataTable, selPageLength, selSearchType, dateButtons, dateFrom, dateTo, rdoStatus,} from '../modules/elements.js';
	import {sweetError, sweetToast} from '../modules/alert.js';
	import {initSelectOption, initPageLength, initSearchDatepicker, onClickDateRangeBtn, initDayBtn, initMaxDateToday,
	 onChangeSearchDateFrom, onChangeSearchDateTo, initSearchDateRangeWeek,} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty, numberWithCommas,} from "../modules/utils.js";

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
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday();
		initSearchDateRangeWeek();
		initSelectOption();
		keyword.val('');
		rdoStatus.eq(1).prop('checked', true);
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
				url: api.pendingWalletList,
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
					const status = $("input[name=radio-status]:checked").val();
					const param = {
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"search_type" : selSearchType.val(),
						"keyword" : keyword.val().trim(),
						"is_receive" : status === 'all' ? '' : status === 'complete' ? 'Y' : 'N',
						"is_expire" : status === 'all' ? '' : status === 'expired' ? 'Y' : 'N',
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
				{title: "From",    		data: "send_name",  		width: "20%",
					render: function (data, type, row, meta) {
						switch (row.send_type) {
							case 'doit' :
								return `[${label.doit}] ${data}`;
							case 'profile' :
								return `[${label.profile}] ${data}`;
							case 'charge' :
								return label.charge;
							case 'level' :
								return label.levelup;
							case 'signup' :
								return label.join;
							default :
								return `[${row.send_type}] ${data}`;
						}
					}
				}
				,{title: "To",    		data: "receive_name",  		width: "20%" }
				,{title: "내용",    		data: "message",  			width: "20%" }
				,{title: "UCD", 		data: "value",				width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "보낸 날짜",    	data: "sent",  	width: "15%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "만료일",    	data: "expired",  		width: "10%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "상태",    		data: "status",  	width: "5%" }
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
