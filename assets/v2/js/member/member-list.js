
	import {headers} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {body, dateButtons, dataTable, selDateType, dateFrom, dateTo, keyword, selPageLength, btnSearch, btnReset, selSearchType,} from '../modules/elements.js';
	import {sweetError } from  '../modules/alert.js';
	import {onClickDateRangeBtn, initDayBtn, initSearchDatepicker, initSearchDateRangeMonth,
		initMaxDateToday, initPageLength, initSelectOption, onChangeSearchDateFrom, onChangeSearchDateTo} from "../modules/common.js";
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

	function setHistoryForm()
	{
		const historyParams = getHistoryParam();

		selDateType.val(historyParams.date_type);
		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		selSearchType.val(historyParams.search_type);
		keyword.val(historyParams.keyword);
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
		initMaxDateToday();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.memberList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

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
				{title: "닉네임",    		data: "nickname",  		width: "20%",
					render: function (data, type, row, meta) {
						return `<a data-uuid="${row.profile_uuid}">${data}</a>`;
					}
				}
				,{title: "Profile ID", 	data: "profile_uuid",	width: "55%" }
				,{title: "사용여부", 		data: "is_active",		width: "10%" }
				,{title: "가입일시", 		data: "created",		width: "15%" }
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
				$(nRow).children().eq(0).find('a').on('click', function () { onClickNickname(this); });
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
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onClickNickname(obj)
	{
		let form   = $("<form></form>");
		form.prop("method", "post");
		form.prop("action", page.detailMember);
		form.append($("<input/>", {type: 'hidden', name: 'profile_uuid', value: $(obj).data('uuid')}));
		form.appendTo("body");
		form.trigger('submit');
	}

