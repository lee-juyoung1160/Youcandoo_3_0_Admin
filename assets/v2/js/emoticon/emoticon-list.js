
	import {headers, isSuccessResp, invalidResp, ajaxRequestWithJson} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {
		body,
		dateButtons,
		dataTable,
		selDateType,
		dateFrom,
		dateTo,
		keyword,
		selPageLength,
		btnSearch,
		btnReset,
		selSearchType,
		selType,
	} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast} from '../modules/alert.js';
	import {
		onClickDateRangeBtn,
		initDayBtn,
		initSearchDatepicker,
		initMaxDateToday,
		initPageLength,
		initSelectOption,
		onChangeSearchDateFrom,
		onChangeSearchDateTo,
		initSearchDateRangeAll
	} from "../modules/common.js";
	import {
	initTableDefaultConfig,
	buildTotalCount,
	toggleBtnPreviousAndNextOnTable,
	getCurrentPage, redrawPage, tableReloadAndStayCurrentPage,
} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {getHistoryParam, setHistoryParam, isBackAction} from "../modules/history.js";
	import {page} from "../modules/page-url.js";

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
		initSearchDateRangeAll();
		initSelectOption();
		keyword.val('');
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		selDateType.val(historyParams.date_type);
		selSearchType.val(historyParams.search_type);
		selType.val(historyParams.type);
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
				url: api.emoticonList,
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
				{title: "썸네일", 			data: "category_image_url",		width: "10%",
					render: function (data) {
						return `<div class="list-img-wrap"><img src="${data}" alt="썸네일"></div>`;
					}
				}
				,{title: "카테고리 번호",    	data: "category_id",  			width: "15%" }
				,{title: "제목", 			data: "category_title",			width: "20%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailEmoticon}${row.category_id}">${data}</a>`;
					}
				}
				,{title: "유형", 			data: "category_type",			width: "15%",
					render: function (data) {
						return data === 'dynamic' ? '움직이는 이모티콘' : '멈춰있는 이모티콘';
					}
				}
				,{title: "생성일", 			data: "created",				width: "10%",
					render: function (data) {
						return data.slice(0, 10);
					}
				}
				,{title: "오픈여부", 			data: "is_exposure",			width: "10%",
					render: function (data, type, row, meta) {
						return data === 'Y' ? data : buildToggleBtn(row);
					}
				}
				,{title: "수정", 			data: "is_exposure",			width: "10%",
					render: function (data, type, row, meta) {
						return data === 'Y' ? label.dash : `<button type="button" class="btn-xs btn-teal btn-update-emoticon" data-id="${row.category_id}">수정</button>`;
					}
				}
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
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
				$(".btn-update-emoticon").off().on('click', function () { location.href = page.updateEmoticon + $(this).data('id'); });
				$(".btn-open").off().on('click', function () { onClickBtnOpen(this); });
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
			"type" : selType.val(),
			"page": _currentPage,
			"limit": selPageLength.val(),
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildToggleBtn(data)
	{
		return `<div class="toggle-btn-wrap">
					<div class="toggle-btn on btn-open" data-id="${data.category_id}">
						<input type="radio" class="checkbox">
						<div class="knobs"></div>
						<div class="layer"></div>
					</div>
				</div>`
	}

	let g_category_id;
	function onClickBtnOpen(obj)
	{
		const msg = '이모티콘 카테고리를 오픈한 뒤에는 취소할 수 없어요. 정말 오픈하시겠어요?';
		g_category_id = $(obj).data('id');
		sweetConfirm(msg, openRequest);
	}

	function openRequest()
	{
		console.log(g_category_id)
		// ajaxRequestWithJson(true, api., JSON.stringify({'category_id' : g_category_id}))
		// 	.then( async function( data, textStatus, jqXHR ) {
		// 		await sweetToastAndCallback(data, openSuccess);
		// 	})
		// 	.catch(reject => sweetError(`이모티콘 오픈${message.ajaxError}`));
	}

	function openSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}