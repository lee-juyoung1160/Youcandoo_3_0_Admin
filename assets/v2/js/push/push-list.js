
	import {headers,} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {
	body,
	btnSearch,
	btnReset,
	keyword,
	dataTable,
	selPageLength,
	rdoExposure,
	modalOpen,
	modalClose,
	modalBackdrop,
	dateButtons,
		dateFrom, dateTo,
} from '../modules/elements.js';
	import {sweetError,} from '../modules/alert.js';
	import {
	initSelectOption,
	initPageLength,
	initSearchDatepicker,
	initDayBtn,
	initMaxDateMonths,
	initSearchDateRangeMonth,
	fadeoutModal,
	fadeinModal,
	onClickDateRangeBtn,
		onChangeSearchDateFrom,
		onChangeSearchDateTo
	} from "../modules/common.js";
	import {
		initTableDefaultConfig,
		buildTotalCount,
		toggleBtnPreviousAndNextOnTable,
	} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initSearchForm();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		addViewDetailEvent()
		/** 목록 불러오기 **/
		//buildTable();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateMonths()
		initSearchDateRangeMonth();
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
					const param = {
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
				{title: "발송여부", 			data: "push_status",    		width: "5%" }
				,{title: "발송대상 ", 		data: "push_type", 	  			width: "5%",
					render: function (data) {
						return data === 'all' ? '전체' : '개인';
					}
				}
				,{title: "등록일", 			data: "created_datetime",		width: "7%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "발송(예약)일시", 		data: "reserve_send_datetime",  width: "10%" }
				,{title: "고유 ID", 			data: "message_id",  			width: "15%",
					render: function (data) {
						return `<div>
								 	<input type="text" class="input-copy" style="width: 150px" value="${data}" readonly>
								 	<i class="fas fa-copy" onclick="copyToClipboard(this);"></i>
								</div>`;
					}
				}
				,{title: "푸시 본문", 		data: "send_message",  			width: "15%",
					render: function (data) {
						return `<div data-detail="${data}" class="line-clamp view-detail">${data}</div>`;
					}
				}
				,{title: "스토어", 			data: "store",    	  			width: "5%",
					render: function (data) {
						return data === 'all' ? '전체' : data;
					}
				}
				,{title: "구분", 		data: "category",  			  		width: "5%",
					render: function (data) {
						return getPushCategory(data);
					}
				}
				,{title: "도착페이지", 		data: "category_target",  		width: "25%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? '-' : `[${row.target_name}] ${row.target_title}`
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
				addViewDetailEvent();
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function addViewDetailEvent()
	{
		$(".view-detail").on('click', function () { viewDetail(this); })
	}

	function viewDetail(obj)
	{
		fadeinModal();
		const pushMessage = $(obj).data('detail');
	}

