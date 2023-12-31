
	import {headers, isSuccessResp, invalidResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {body, dateButtons, dataTable, selDateType, dateFrom, dateTo, keyword, selPageLength, btnSearch, btnReset, selSearchType,} from '../modules/elements.js';
	import {sweetError, sweetToast} from '../modules/alert.js';
	import {onClickDateRangeBtn, initDayBtn, initSearchDatepicker, initSearchDateRangeMonths, initMaxDateToday,
		initPageLength, initSelectOption, onChangeSearchDateFrom, onChangeSearchDateTo, moveToMemberDetail} from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, } from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {numberWithCommas} from "../modules/utils.js";

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
		initMaxDateToday();
		initSearchDateRangeMonths();
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
				url: api.unlinkMemberList,
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
				{title: "비활성일시", 		data: "deactived",			width: "15%" }
				,{title: "닉네임",    	data: "nickname",  			width: "25%",
					render: function (data, type, row, meta) {
						return `<a data-uuid="${row.profile_uuid}">${data}</a>`;
					}
				}
				,{title: "두잇개설", 		data: "doit_created_count",	width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "두잇참여", 		data: "doit_join_count",	width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "두잇참여대기", 	data: "doit_apply_count",	width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "활성여부", 		data: "is_active",			width: "10%" }
				,{title: "보유 UCD", 	data: "ucd",				width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				/** 닉네임 클릭이벤트 **/
				$(nRow).children().eq(1).find('a').on('click', function () { onClickNickname(this); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function onClickNickname(obj)
	{
		moveToMemberDetail($(obj).data('uuid'));
	}
