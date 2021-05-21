
	import {headers, isSuccessResp, ajaxRequestWithJsonData} from '../modules/request.js';
	import {api} from '../modules/api-url.js';
	import {
		body,
		btnSearch,
		btnReset,
		keyword,
		dataTable,
		selPageLength,
		dateButtons,
		dateFrom,
		dateTo,
		rdoReport,
		selDateType,
		rdoType,
		modalReason, modalBackdrop, modalClose, reasonTable, btnBlinkTalk, btnDisplayTalk,
	} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback,} from '../modules/alert.js';
	import {
		initSelectOption,
		initPageLength,
		initSearchDatepicker,
		initDayBtn,
		initMaxDateMonths,
		setDateToday,
		onClickDateRangeBtn,
		onChangeSearchDateFrom,
		onChangeSearchDateTo,
		overflowHidden,
		fadeoutModal
	} from "../modules/common.js";
	import {
	initTableDefaultConfig,
	buildTotalCount,
	toggleBtnPreviousAndNextOnTable,
	getCurrentPage,
	redrawPage,
	checkBoxElement, tableReloadAndStayCurrentPage,
} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {getHistoryParam, isBackAction, setHistoryParam} from "../modules/history.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";
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
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		modalClose		.on('click', function () { fadeoutModal(); });
		modalBackdrop	.on('click', function () { fadeoutModal(); });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
		btnBlinkTalk	.on("click", function () { onClickBtnBlindTalk(); });
		btnDisplayTalk	.on("click", function () { onClickBtnDisplayTalk(); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateMonths()
		setDateToday();
		initSelectOption();
		keyword.val('');
		rdoType.eq(0).prop('checked', true);
		rdoReport.eq(0).prop('checked', true);
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		rdoType.each(function () {
			if (historyParams.talk_division.indexOf($(this).val()) !== -1)
				$(this).prop("checked", true);
		});
		rdoReport.each(function () {
			if (historyParams.report_status.indexOf($(this).val()) !== -1)
				$(this).prop("checked", true);
		});
		selDateType.val(historyParams.date_type);
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
				url: api.reportTalkList,
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
				{title: "유형", 			data: "talk_type",    	width: "10%" }
				,{title: "작성자", 		data: "nickname",    	width: "15%",
					render: function (data, type, row, meta) {
						return row.is_company === 'Y' ? label.bizIcon + data : data;
					}
				}
				,{title: "내용", 		data: "contents", 		width: "30%",
					render: function (data, type, row, meta) {
						const talkType = $("input[name=radio-type]:checked").val();
						const detailUrl = talkType === 'talk' ? page.detailTalk : page.detailActionTalk;
						return `<a class="line-clamp-1" style="max-width: 500px;" href="${detailUrl}${row.board_idx}">${data}</a>`;
					}
				}
				,{title: "댓글수", 		data: "comment_cnt",	width: "5%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "좋아요", 		data: "like_count",		width: "5%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "신고", 		data: "report_count",   width: "5%",
					render: function (data, type, row, meta) {
						const isBoard = isEmpty(row.comment_uuid);
						const uuid = isEmpty(row.comment_uuid) ? row.board_uuid : row.comment_uuid;
						return Number(data) > 0 ? `<a class="report-count" data-isboard="${isBoard}" data-uuid="${uuid}">${numberWithCommas(data)}</a>` : numberWithCommas(data);
					}
				}
				,{title: "블라인드", 		data: "is_blind",   	width: "5%" }
				,{title: "작성일", 		data: "created",   		width: "10%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "", 			data: "board_idx",   	width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				$(this).on('page.dt', function () { _currentPage = getCurrentPage(this); });
				redrawPage(this, _currentPage);
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(5).find('a').on('click', function () { onClickReportCount(this); });
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
			"page": _currentPage,
			"limit": selPageLength.val(),
			"talk_division" : $("input[name=radio-type]:checked").val(),
			"report_status" : $("input[name=radio-report]:checked").val(),
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	let is_board;
	let report_reason_uuid;
	function onClickReportCount(obj)
	{
		is_board = $(obj).data('isboard');
		report_reason_uuid = $(obj).data('uuid');
		modalReason.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		buildReasonTable();
	}

	function buildReasonTable()
	{
		reasonTable.DataTable({
			ajax : {
				url: api.talkReportReasonList,
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
					const param = {
						"board_uuid" : is_board ? report_reason_uuid : '',
						"comment_uuid" : is_board ? '' : report_reason_uuid
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "일자", 		data: "created",    			width: "25%" }
				,{title: "사유", 	data: "report_description",    	width: "75%" }
			],
			serverSide: true,
			paging: false,
			select: false,
			scrollY: 450,
			scrollCollapse: true,
			destroy: true,
		});
	}

	let g_is_blind;
	function onClickBtnBlindTalk()
	{
		g_is_blind = 'Y';

		if (blindValid())
			sweetConfirm(message.blind, blindRequest);
	}

	function onClickBtnDisplayTalk()
	{
		g_is_blind = 'N';

		if (blindValid())
			sweetConfirm(message.display, blindRequest);
	}

	function blindValid()
	{
		const checkedLength = $("input[name=chk-row]:checked").length;
		if (checkedLength === 0)
		{
			sweetToast(`대상을 ${message.select}`);
			return false;
		}

		return true;
	}

	function blindRequest()
	{
		const url = api.blindTalk;
		const errMsg = `블라인드${message.ajaxError}`;

		ajaxRequestWithJsonData(true, url, JSON.stringify(blindParams()), blindReqCallback, errMsg, false);
	}

	function blindParams()
	{
		const table = dataTable.DataTable();
		const selectedData = table.rows('.selected').data();
		const isTalk = $("input[name=radio-type]:checked").val() === 'talk';
		let boards = [];
		let boardComments = [];
		let actionComments = [];

		for (let i=0; i<selectedData.length; i++)
		{
			if (isTalk)
			{
				const isBoard = isEmpty(selectedData[i].comment_uuid);
				isBoard ? boards.push(selectedData[i].board_uuid) : boardComments.push(selectedData[i].comment_uuid);
			}
			else
				actionComments.push(selectedData[i].comment_uuid);
		}

		return {
			"is_blind" : g_is_blind,
			"board" : boards,
			"board_comment" : boardComments,
			"action_comment" : actionComments
		}
	}

	function blindReqCallback(data)
	{
		sweetToastAndCallback(data, blindSuccess);
	}

	function blindSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function getRowIds()
	{
		const rows = dataTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			let uuid = $(rows[i]).data('uuid');
			if (isEmpty(uuid)) continue;
			uuids.push(uuid);
		}

		return uuids;
	}
