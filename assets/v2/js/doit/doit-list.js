
	import {ajaxRequestWithJson, invalidResp, isSuccessResp, headers} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {body, dateButtons, dataTable, selDateType, dateFrom, dateTo, keyword, chkStatus,
		selPageLength, selSort, btnSearch, btnReset, selSearchType, selCategory} from '../modules/elements.js';
	import {sweetToast, sweetConfirm, sweetError, sweetToastAndCallback} from '../modules/alert.js';
	import {
		onClickDateRangeBtn,
		initDayBtn,
		initSearchDatepicker,
		initSearchDateRangeAll,
		initMaxDateMonths,
		initPageLength,
		initSelectOption,
		onChangeSearchDateFrom,
		onChangeSearchDateTo,
		atLeastChecked,
		getDoitStatusName,
		moveToMemberDetail,
	} from "../modules/common.js";
	import {
		initTableDefaultConfig,
		buildTotalCount,
		toggleBtnPreviousAndNextOnTable,
		getCurrentPage,
		redrawPage,
		tableReloadAndStayCurrentPage
	} from '../modules/tables.js';
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
		initPage();
		/** 이벤트 **/
		body  		.on('keydown', function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on('change', function () { onSubmitSearch(); });
		selSort		.on('change', function () { onSubmitSearch(); });
		btnSearch 	.on('click', function () { onSubmitSearch(); });
		btnReset	.on('click', function () { initSearchForm(); });
		dateButtons	.on('click', function () { onClickDateRangeBtn(this); });
		chkStatus.on('click', function () { atLeastChecked(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateMonths()
		initSearchDateRangeAll();
		initSelectOption();
		keyword.val('');
		chkStatus.prop('checked', true);
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		chkStatus.each(function () {
			$(this).prop("checked", historyParams.doit_status.indexOf($(this).val()) > -1);
		});
		selDateType.val(historyParams.date_type);
		selSearchType.val(historyParams.search_type);
		selCategory.val(historyParams.category_uuid);
		selSort.val(historyParams.order_by);
		selPageLength.val(historyParams.limit);
		_currentPage = historyParams.page;
	}

	function initPage()
	{
		const param = { "keyword" : "" };

		ajaxRequestWithJson(false, api.categoryList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					await buildSelCategory(data);
					await isBackAction() ? setHistoryForm() : initSearchForm();
					await buildTable();
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.list + message.ajaxLoadError));
	}

	function buildSelCategory(data)
	{
		data.data.map( obj => selCategory.append(`<option value="${obj.category_uuid}">${obj.category_title}</option>`));
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
		initMaxDateMonths();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.doitList,
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
				{title: "카테고리",    	data: "category_title",  	width: "10%" }
				,{title: "세부 카테고리", 	data: "subcategory_title",	width: "15%" }
				,{title: "두잇명", 		data: "doit_title",			width: "20%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailDoit}${row.idx}" class="line-clamp-1" style="max-width: 280px;">${data}</a>`;
					}
				}
				,{title: "리더", 		data: "nickname",			width: "20%",
					render: function (data, type, row, meta) {
						return row.is_company === 'Y' ? label.bizIcon + data : `<a data-uuid="${row.profile_uuid}">${data}</a>`;
					}
				}
				,{title: "생성일", 		data: "created",			width: "8%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "오픈일", 		data: "opened",				width: "8%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "참여인원",    	data: "member_cnt",  		width: "7%" }
				,{title: "상태",    		data: "doit_status",  		width: "7%",
					render: function (data) {
						return getDoitStatusName(data);
					}
				}
				,{title: "추천기능",    	data: "doit_uuid",  		width: "5%",
					render: function (data, type, row, meta) {
						return buildSwitch(row);
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
				$(nRow).children().eq(3).find('a').on('click', function () { onClickNickname(this); });
				$(nRow).children().eq(8).find('input').on('click', function () { changeStatus(this); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let status = [];
		chkStatus.each(function () {
			if ($(this).is(":checked"))
				status.push($(this).val())
		})
		const param = {
			"date_type" : selDateType.val(),
			"from_date" : dateFrom.val(),
			"to_date" : dateTo.val(),
			"search_type": selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"page": _currentPage,
			"limit": selPageLength.val(),
			"doit_status" : status,
			"category_uuid": selCategory.val(),
			"order_by" : selSort.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildSwitch(data)
	{
		/** 사용여부 컬럼에 on off 스위치 **/
		let checked   = data.is_recommend === 'Y' ? 'checked' : '';
		return (
			`<div class="toggle-btn-wrap">
				<div class="toggle-btn on">
					<input data-uuid="${data.doit_uuid}" type="radio" class="checkbox ${checked}">
					<div class="knobs"></div>
					<div class="layer"></div>
				</div>
			</div>`
		)
	}

	/** 노출여부 변경 **/
	let g_is_recommend;
	let g_uuid;
	function changeStatus(obj)
	{
		g_is_recommend = $(obj).hasClass('checked') ? 'N' : 'Y';
		g_uuid = $(obj).data('uuid');

		sweetConfirm(message.change, changeRequest);
	}

	function changeRequest()
	{
		const param = {
			"doit_uuid" : g_uuid,
			"is_recommend" : g_is_recommend
		}

		ajaxRequestWithJson(true, api.doitSetRecommend, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				sweetToastAndCallback(data, changeSuccess);
			})
			.catch(reject => sweetError(`기본정보${message.ajaxLoadError}`));
	}

	function changeSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function onClickNickname(obj)
	{
		moveToMemberDetail($(obj).data('uuid'));
	}
