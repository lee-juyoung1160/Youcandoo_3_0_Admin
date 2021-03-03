
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, keyword, dataTable, updateTable,
		selPageLength, rdoExposure, modalOpen, modalClose, modalBackdrop, btnUpdate,
	} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {
		initSelectOption,
		initPageLength,
		initSearchDatepicker,
		initDayBtn,
		initMaxDateMonths, initSearchDateRangeMonths, fadeoutModal, fadeinModal
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
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnUpdate		.on("click", function () { onSubmitUpdate(); });
	});

	function initSearchForm()
	{
		initSelectOption();
		keyword.val('');
		rdoExposure.eq(0).prop('checked', true);
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
				url: api.faqList,
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
				{title: "No",    	data: "is_top",  			width: "10%",
					render: function (data, type, row, meta) {
						return data === 'Y' ?  `<i class="fas fas fa-bell" style="cursor:default;"></i>` : meta.row;
					}
				}
				,{title: "제목", 		data: "notice_title",	width: "50%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailBiz + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "노출여부",    	data: "is_exposure",  	width: "10%" }
				,{title: "작성자",    	data: "created_user",  	width: "15%" }
				,{title: "등록일",    	data: "created",  		width: "15%",
					render: function (data) {
						data.substring(0, 10);
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

	function buildUpdateTable()
	{
		updateTable.DataTable({
			ajax : {
				url: api.noticeList,
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
				{title: "제목", 		data: "notice_title",	width: "70%" }
				,{title: "등록일",    data: "created",  		width: "20%",
					render: function (data) {
						data.substring(0, 10);
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
		document.querySelectorAll('.delete-btn').forEach( element => element.addEventListener('click', deleteRow));
	}

	let g_delete_uuids = [];
	function deleteRow()
	{
		$(this).closest('tr').remove();
		g_delete_uuids.push(this.id);
	}

	function onClickModalOpen()
	{
		fadeinModal();
	}

	function onSubmitUpdate()
	{
		sweetConfirm(message.change, updateRequest);
	}

	function updateRequest()
	{
		if (updateValidation())
			g_delete_uuids.length > 0 ? deleteRequest() : reorderRequest();
	}

	function deleteRequest()
	{
		const url = api.deleteCategory;
		const errMsg = label.delete + message.ajaxError;
		const param = { "category_list" : g_delete_uuids };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), deleteCallback, errMsg, false)
	}

	function deleteCallback(data)
	{
		isSuccessResp(data) ? reorderRequest() : sweetToast(data.msg);
	}

	function reorderRequest()
	{
		const uuids = getRowsId();
		const param = { "category_list" : uuids };
		const url 	= api.reorderCategory;
		const errMsg = label.modify + message.ajaxError;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), reorderReqCallback, errMsg, false);
	}

	function reorderReqCallback(data)
	{
		sweetToastAndCallback(data, reorderSuccess);
	}

	function reorderSuccess()
	{
		fadeoutModal();
		onSubmitSearch();
	}

	function updateValidation()
	{
		let uuids = getRowsId();
		if (uuids.length === 0)
		{
			sweetToast("카테고리가 없습니다.");
			return false;
		}

		return true;
	}

	function getRowsId()
	{
		const rows = updateTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			let uuid = $(rows[i]).data('uuid');
			if (isEmpty(uuid)) continue;
			uuids.push(uuid);
		}

		return uuids;
	}
