
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {
	body, btnSearch, btnReset, keyword, dataTable, updateTable, dateFrom, dateTo,
	selPageLength, rdoExposure, modalOpen, modalClose, modalBackdrop, btnUpdate, dateButtons, selSearchType,
} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {
	initSelectOption,
	initPageLength,
	initSearchDatepicker,
	initDayBtn,
		initMaxDateToday,
	initSearchDateRangeMonths,
	fadeoutModal,
	fadeinModal,
	onClickDateRangeBtn,
	onChangeSearchDateFrom,
	onChangeSearchDateTo,
	} from "../modules/common.js";
	import {
		initTableDefaultConfig,
		buildTotalCount,
		toggleBtnPreviousAndNextOnTable,
		getCurrentPage, redrawPage
	} from '../modules/tables.js';
	import {getHistoryParam, isBackAction, setHistoryParam} from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {isEmpty} from "../modules/utils.js";

	let _currentPage = 1;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화
		 *  메뉴클릭으로 페이지 진입 > 초기값 세팅
		 *  뒤로가기로 페이지 진입 > 이전 값 세팅
		 * **/
		isBackAction() ? setHistoryForm() : initSearchForm();
		/** 목록 불러오기 **/
		buildTable();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		dateFrom    	.on("change", function () { onChangeSearchDateFrom(this); });
		dateTo      	.on("change", function () { onChangeSearchDateTo(this); });
		btnUpdate		.on("click", function () { onSubmitUpdate(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday()
		initSearchDateRangeMonths();
		initSelectOption();
		keyword.val('');
		rdoExposure.eq(0).prop('checked', true);
	}

	function setHistoryForm()
	{
		const historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		selSearchType.val(historyParams.search_type);
		rdoExposure.each(function () {
			if ($(this).val() === historyParams.is_exposure)
				$(this).prop("checked", true);
		});
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
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.noticeList,
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
						sweetToast(json.msg);
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
				{title: "",    			data: "is_top",  			width: "10%",
					render: function (data, type, row, meta) {
						return data === 'Y' ?  `<i class="fas fas fa-bell" style="cursor:default;"></i>` : '일반 공지';
					}
				}
				,{title: "제목", 		data: "title",	width: "50%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailNotice + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "노출여부",    	data: "is_exposure",  	width: "10%" }
				,{title: "작성자",    	data: "created_user",  	width: "15%" }
				,{title: "등록일",    	data: "created",  		width: "15%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
				$(this).on('page.dt', function () { _currentPage = getCurrentPage(this); });
				redrawPage(this, _currentPage);
			},
			fnRowCallback: function( nRow, aData ) {
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
			"from_date" : dateFrom.val(),
			"to_date" : dateTo.val(),
			"search_type": selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"is_exposure": $("input[name=radio-exposure]:checked").val(),
			"page": _currentPage,
			"limit": selPageLength.val(),
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onClickModalOpen()
	{
		g_delete_uuids.length = 0;
		fadeinModal();
		buildUpdateTable();
	}

	function buildUpdateTable()
	{
		updateTable.DataTable({
			ajax : {
				url: api.topNoticeList,
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
						sweetToast(json.msg);
					}

					return JSON.stringify(json);
				},
				data: function (d) {
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "제목", 		data: "title",			width: "70%" }
				,{title: "등록일",    data: "created",  		width: "20%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "삭제",    	data: "notice_uuid", 	width: "10%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-text-red delete-btn" id="${data}"><i class="fas fa-minus-circle"></i></button>`
					}
				}
			],
			serverSide: true,
			paging: false,
			pageLength: 3,
			select: false,
			destroy: true,
			initComplete: function () {
				addDeleteEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.notice_uuid);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function addDeleteEvent()
	{
		$(".delete-btn").on('click', function () { deleteRow(this); })
	}

	let g_delete_uuids = [];
	function deleteRow(obj)
	{
		$(obj).closest('tr').remove();
		g_delete_uuids.push(obj.id);
	}

	function onSubmitUpdate()
	{
		if (updateValidation())
			sweetConfirm(message.change, updateRequest);
	}

	function updateRequest()
	{
		const url = api.deleteTopNotice;
		const errMsg = label.delete + message.ajaxError;
		const param = { "notice_uuid" : g_delete_uuids };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), updateCallback, errMsg, false)
	}

	function updateCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		fadeoutModal();
		onSubmitSearch();
	}

	function updateValidation()
	{
		if (g_delete_uuids.length === 0)
		{
			sweetToast(message.notModified);
			return false;
		}

		return true;
	}
