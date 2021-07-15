
	import {headers, isSuccessResp, invalidResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url-v1.js';
	import {body, dateButtons, dataTable, selDateType, dateFrom, dateTo, keyword, selPageLength, btnSearch, btnReset, selSearchType,} from '../modules/elements.js';
	import {sweetError, sweetToast} from '../modules/alert.js';
	import {onClickDateRangeBtn, initDayBtn, initSearchDatepicker, initSearchDateRangeMonths, initMaxDateToday,
		initPageLength, initSelectOption, onChangeSearchDateFrom, onChangeSearchDateTo, moveToMemberDetail} from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, getCurrentPage, redrawPage } from '../modules/tables.js';
	import { setHistoryParam, getHistoryParam, isBackAction } from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

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
		initSearchDateRangeMonths();
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
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임",    	data: "nickname",  		width: "20%",
					render: function (data, type, row, meta) {
						return `<a data-uuid="${row.profile_uuid}">${data}</a>`;
					}
				}
				,{title: "PID", 	data: "profile_uuid",	width: "55%" }
				,{title: "활성여부", 	data: "is_active",		width: "10%" }
				,{title: "가입일시", 	data: "created",		width: "15%" }
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
				/** 닉네임 클릭이벤트 **/
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
		moveToMemberDetail($(obj).data('uuid'));
	}
