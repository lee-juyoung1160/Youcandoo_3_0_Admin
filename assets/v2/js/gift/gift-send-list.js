
	import {headers, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {body, dateButtons, dataTable, dateFrom, dateTo,
		keyword, selPageLength, btnSearch, btnReset, selSearchType, memo, btnSubmitMemo,
		rdoType, chkStatus, modalBackdrop, modalMemo, modalDetail, modalClose, selDateType} from '../modules/elements.js';
	import {sweetError, sweetToast, sweetConfirm, sweetToastAndCallback} from '../modules/alert.js';
	import {
	onClickDateRangeBtn,
	initDayBtn,
	initSearchDatepicker,
	initSearchDateRangeMonth,
	initMaxDateToday,
	initPageLength,
	initSelectOption,
	fadeoutModal, overflowHidden, onChangeSearchDateFrom, onChangeSearchDateTo
	} from "../modules/common.js";
	import { isEmpty, numberWithCommas, isDisplay } from "../modules/utils.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, tableReloadAndStayCurrentPage} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

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
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch 		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmitMemo	.on("click", function () { onSubmitUpdateMemo(); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday()
		initSearchDateRangeMonth();
		initSelectOption();
		keyword.val('');
		rdoType.eq(0).prop('checked', true);
		chkStatus.eq(0).prop('checked', true);
		chkStatus.eq(1).prop('checked', true);
		chkStatus.eq(2).prop('checked', true);
	}

	function onKeydownSearch(event)
	{
		const modalEl = $("#modalMemo");
		if (!isDisplay(modalEl) && event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.sendGiftList,
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
					let sendStatus = [];
					chkStatus.each(function () {
						if ($(this).is(":checked"))
							sendStatus.push($(this).val())
					})
					const param = {
						"date_type" : selDateType.val(),
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"search_type": selSearchType.val(),
						"keyword" : keyword.val().trim(),
						"page" : (d.start / d.length) + 1,
						"limit": selPageLength.val(),
						"gift_type": $("input[name=radio-type]:checked").val(),
						"status" : sendStatus
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "상품유형",    	data: "gift_type",  	width: "8%" }
				,{title: "상품명", 		data: "gift_name",    	width: "15%" }
				,{title: "신청자", 		data: "nickname",    	width: "20%" }
				,{title: "신청수량",    	data: "qty",  			width: "8%" }
				,{title: "금액(UCD)",	data: "ucd",  			width: "8%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "상태",    			data: "status",  			width: "5%" }
				,{title: "승인/발송/취소일시",   data: "send_datetime", 		width: "15%" }
				,{title: "상세내역",    		data: "exchange_uuid",  	width: "5%",
					render: function (data, type, row, meta) {
						return (row.status === '발송' && row.gift_type === '기프티콘')
							? `<a class="view-detail" data-uuid="${data}">보기</a>`
							: label.dash;
					}
				}
				,{title: "메모",    		data: "memo",  				width: "8%",
					render: function (data, type, row, meta) {
						return buildMemo(row);
					}
				}
				,{title: "재발송",   		data: "exchange_uuid",  	width: "8%",
					render: function (data, type, row, meta) {
						return (row.status === '발송' && row.gift_type === '기프티콘')
							?`<button data-uuid="${data}" class="btn-info btn-resend" type="button">재발송</button>`
							: label.dash;
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
				if (aData.status === '취소')
					$(nRow).addClass('minus-pay');

				$(nRow).children().eq(7).find('a').on('click', function () { viewDetail(this); });
				$(nRow).children().eq(8).find('button').on('click', function () { onClickUpdateMemo(this); });
				$(nRow).children().eq(9).find('button').on('click', function () {  });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildMemo(data)
	{
		const previewEL = isEmpty(data.memo) ? label.dash : `<i class="tooltip-mark fas fa-sticky-note"><span class="tooltip-txt left">${data.memo}</span></i>`;
		return `${previewEL}`;
				//<button class="btn-i btn-text-teal" data-uuid="${data.exchange_uuid}" data-memo="${data.memo}"><i class="fas fa-edit"></i></button>
	}

	function viewDetail(obj)
	{
		modalDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

	let g_exchange_uuid;
	function onClickUpdateMemo(obj)
	{
		modalMemo.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();

		g_exchange_uuid = $(obj).data('uuid');
		memo.val($(obj).data('memo'));
		memo.trigger('focus');
	}

	function onSubmitUpdateMemo()
	{
		if (memoValid())
			sweetConfirm(message.create, updateMemoRequest);
	}

	function memoValid()
	{
		if (isEmpty(memo.val()))
		{
			sweetToast(`메모를 ${message.input}`);
			memo.trigger('focus');
			return false;
		}

		return true;
	}

	function updateMemoRequest()
	{
		const url 	= api.updateGiftSendMemo;
		const errMsg 	= label.submit+message.ajaxError;
		const param   = {
			"exchange_uuid" : g_exchange_uuid,
			"memo" : memo.val().trim()
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateMemoReqCallback, errMsg, false);
	}

	function updateMemoReqCallback(data)
	{
		sweetToastAndCallback(data, updateMemoReqSuccess);
	}

	function updateMemoReqSuccess()
	{
		fadeoutModal();
		tableReloadAndStayCurrentPage(dataTable);
	}
