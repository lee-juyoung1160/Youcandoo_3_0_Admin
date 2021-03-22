
	import {headers} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {
	body,
	dateButtons,
	dataTable,
	dateFrom,
	dateTo,
	keyword,
	selPageLength,
	btnSearch,
	btnReset,
	selSearchType,
	rdoType, chkStatus, modalBackdrop, modalMemo, modalDetail, memo, modalClose
} from '../modules/elements.js';
	import { sweetToast } from  '../modules/alert.js';
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
	import { isEmpty } from "../modules/utils.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
		/** 목록 불러오기 **/
		//buildTable();
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
		addEvent()
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
		if (event.keyCode === 13)
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
				url: api.doitList,
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
				{title: "상품유형",    	data: "gift_type",  		width: "7%" }
				,{title: "상품명", 		data: "gift_name",    		width: "15%" }
				,{title: "신청자", 		data: "nickname",    		width: "13%",
					render: function (data, type, row, meta) {
						return `<a class="line-clamp" style="max-width: 200px;" href="${page.detailUser}${row.user_idx}">${data}</a>`;
					}
				}
				,{title: "신청수량",    	data: "gift_qty",  			width: "5%",	className: 'no-sort' }
				,{title: "금액(UCD)",	data: "exchange_ucd",  		width: "7%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "상태",    		data: "exchange_status",  	width: "5%" }
				,{title: "발송/취소일시",   data: "send_datetime", 		width: "12%" }
				,{title: "예약일시",    	data: "reservation_datetime", 	width: "12%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "상세내역",    	data: "exchange_uuid",  	width: "5%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return (row.exchange_status === '발송완료' && row.gift_type === '기프티콘')
							? `<a class="view-detail" data-uuid="${data}">보기</a>`
							: label.dash;
					}
				}
				,{title: "메모",    		data: "",  				width: "5%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return buildMemo(row);
					}
				}
				,{title: "재발송",   		data: "exchange_uuid",  	width: "7%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return (row.exchange_status === '발송완료' && row.gift_type === '기프티콘')
							?`<button onclick="onSubmitResendGift(this);" 
									data-uuid="${data}"
									data-trid=""
									class="btn-info" 
									type="button">재발송</button>`
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
			"limit": selPageLength.val(),
			"category_uuid": selCategory.val(),
			"order_by" : selSort.val()
		}

		return JSON.stringify(param);
	}

	function buildMemo(data)
	{
		return `<i class="tooltip-mark fas fa-sticky-note">
					<span class="tooltip-txt left">승인 완료와 함께<br>참여자의 답변이 게시글이 자동 등록되요!</span>
				</i>
				<button class="btn-i btn-text-teal btn-update-memo"><i class="fas fa-edit"></i></button>`
	}

	function addEvent()
	{
		$(".view-detail").on('click', function () { viewDetail(this); })
		$(".btn-update-memo").on('click', function () { onClickUpdateMemo(this); })
		$(".btn-resend").on('click', function () { viewDetail(this); })
	}

	function viewDetail(obj)
	{
		modalDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

	function onClickUpdateMemo(obj)
	{
		modalMemo.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();

		// memo.val($(obj).data('memo'));
		// memo.trigger('focus');
	}
