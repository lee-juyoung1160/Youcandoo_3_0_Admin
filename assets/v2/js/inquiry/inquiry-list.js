
	import {headers} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {
	body,
	btnSearch,
	btnReset,
	keyword,
	dataTable,
	selPageLength,
	rdoStatus,
	dateButtons,
		dateFrom, dateTo,
} from '../modules/elements.js';
	import {sweetError,} from '../modules/alert.js';
	import {
	initSelectOption,
	initPageLength,
	initSearchDatepicker,
	initDayBtn,
	initMaxDateToday,
	initSearchDateRangeMonth,
	onClickDateRangeBtn,
		onChangeSearchDateFrom, onChangeSearchDateTo,
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
		//buildTable();
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
		initSearchDateRangeMonth();
		initSelectOption();
		keyword.val('');
		rdoStatus.eq(0).prop('checked', true);
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

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
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.inquiryList,
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
				{title: "문의구분",    data: "qna_type",    		width: "10%" }
				,{title: "제목",  	 data: "title",    			width: "15%",
					render: function (data, type, row, meta) {
						let baseUrl = row.status === '대기' ? page.updateInquiry : page.detailInquiry;
						return `<a href="${baseUrl}${row.idx}" class="line-clamp" style="max-width: 280px">${data}</a>`;
					}
				}
				, {title: "회원구분",  data: "profile_uuid", 		width: "5%",
					render: function (data) {
						return isEmpty(data) ? label.guest : label.member;
					}
				}
				,{title: "닉네임", 	 data: "user_idx",			width: "20%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? row.name : `<a href="${page.detailUser}${data}" class="line-clamp" style="max-width: 280px">${row.nickname}</a>`;
					}
				}
				,{title: "등록일시",   data: "created_datetime",  width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "담당자",  	 data: "userid",    		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "처리일시",   data: "comment_datetime",  width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "답변상태",  data: "status",  			width: "5%" }
				,{title: "메모",  	data: "memo",    			width: "5%",
					render: function (data) {
						return buildMemo(data);
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
			"keyword" : keyword.val().trim(),
			"page": _currentPage,
			"limit": selPageLength.val(),
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}
