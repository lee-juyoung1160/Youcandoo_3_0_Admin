
	import {headers, invalidResp, getStatusCode} from '../modules/request.js';
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
		rdoType,
		reserveDate,
		modalClose,
		modalBackdrop,
		btnSubmitGift,
		btnSubmitGeneral,
		btnCancel,
		modalGeneral, generalMemo,
		modalGift, selHour, selMinute,
		btnSendGeneral,
		btnSendGift,
	} from '../modules/elements.js';
	import { sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {
	onClickDateRangeBtn,
	initDayBtn,
	initSearchDatepicker,
	initSearchDateRangeMonth,
	initMaxDateToday,
	initPageLength,
	initSelectOption,
	fadeoutModal, overflowHidden, onChangeSearchDateFrom, onChangeSearchDateTo,
} from "../modules/common.js";
	import { isEmpty, numberWithCommas, replaceAll, appendZero, getStringFormatToDate, getCurrentHours, getCurrentMinutes } from "../modules/utils.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, tableReloadAndStayCurrentPage} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	let g_approval_type;

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
		btnSearch 	.on("click", function () { onSubmitSearch(); });
		btnReset	.on("click", function () { initSearchForm(); });
		dateButtons	.on("click", function () { onClickDateRangeBtn(this); });
		btnSendGeneral.on("click", function () { g_approval_type = 'general'; onClickModalGeneralOpen(); });
		btnSendGift	.on("click", function () { g_approval_type = 'gift'; onClickModalGiftOpen(); });
		btnCancel	.on("click", function () { g_approval_type = 'cancel'; onClickModalGeneralOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmitGeneral.on("click", function () { onSubmitGeneral(); });
		btnSubmitGift 	.on("click", function () { onSubmitGift(); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday()
		initSearchDateRangeMonth();
		initSelectOption();
		keyword.val('');
		rdoType.eq(0).prop('checked', true);
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
				url: api.applyGiftList,
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
				{title: "", 	data: "",   		width: "5%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return multiCheckBoxDom(meta.row);
					}
				},
				{title: "상품유형", 		data: "goods_code",    		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.gift : label.gifticon;
					}
				}
				,{title: "상품명", 		data: "gift_name",    		width: "25%" }
				,{title: "신청수량",    	data: "gift_qty",  			width: "5%",	className: 'no-sort' }
				,{title: "금액(UCD)",	data: "exchange_ucd",  		width: "10%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "신청자", 		data: "nickname",    		width: "25%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailUser}${row.user_idx}">${data}</a>`;
					}
				}
				,{title: "신청일시",    	data: "created_datetime",  	width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
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

	function onClickModalGeneralOpen()
	{
		if (modalValidation())
		{
			modalGeneral.fadeIn();
			modalBackdrop.fadeIn();
			overflowHidden();
			initModalGeneral();
		}
	}

	function initModalGeneral()
	{
		modalGeneral.find('h5').text(g_approval_type === 'general' ? "메모(일반상품 발송)" : "메모(신청취소)");
		generalMemo.val("");
		generalMemo.trigger('focus');
	}

	function onClickModalGiftOpen()
	{
		if (modalValidation())
		{
			modalGift.fadeIn();
			modalBackdrop.fadeIn();
			overflowHidden();
			initModalGift();
		}
	}

	function initModalGift()
	{
		reserveDate.datepicker("setDate", "today");
		selHour.val('12');
		selMinute.val('00');
	}

	function modalValidation()
	{
		const uuids = getSelectedRowsUuid();
		if (uuids.length === 0)
		{
			sweetToast(`대상을 ${message.select}`);
			return false;
		}

		let msg
		if (g_approval_type === 'gift' && hasGeneral())
		{
			msg = `예약 발송은 기프티콘만 가능합니다.
					일반상품 체크 해제 후 다시 시도해주세요.`;
			sweetToast(msg);
			return false;
		}

		if (g_approval_type === 'general' && hasGift())
		{
			msg = `상품 발송은 일반상품만 가능합니다.
					기프티콘 체크 해제 후 다시 시도해주세요.`
			sweetToast(msg);
			return false;
		}

		return true;
	}

	function hasGeneral()
	{
		let result = false;
		const table = dataTable.DataTable();
		const selectedData = table.rows('.selected').data();

		for (let i=0; i<selectedData.length; i++)
		{
			const goodsCode = selectedData[i].goods_code;
			if (isEmpty(goodsCode))
				result = true;
		}

		return result;
	}

	function hasGift()
	{
		let result = false;
		const table = dataTable.DataTable();
		const selectedData = table.rows('.selected').data();

		for (let i=0; i<selectedData.length; i++)
		{
			const goodsCode = selectedData[i].goods_code;
			if (!isEmpty(goodsCode))
				result = true;
		}

		return result;
	}

	function onSubmitGift()
	{
		if (reserveValidation())
			sweetConfirm(message.send, reserveRequest);
	}

	function reserveValidation()
	{
		const reserveDate = replaceAll(reserveDatePicker.val(), '-', '');
		const reserveTime = selHour.val()+selMinute.val();
		const reserveDatetime = reserveDate+reserveTime;
		const currentDate = getStringFormatToDate(new Date(), '');
		const currentTime = appendZero(getCurrentHours()).toString()+appendZero(getCurrentMinutes()).toString();
		const currentDatetime = currentDate+currentTime;

		if (Number(reserveDatetime) < Number(currentDatetime))
		{
			sweetToast(message.compareReserveDatetime);
			return false;
		}

		return true;
	}

	function reserveRequest()
	{
		const url = api.reserveGift;
		const errMsg = label.reserve+label.send+message.ajaxError;
		const uuids = getSelectedRowsUuid();
		const reserveDate = replaceAll(reserveDatePicker.val(), '-', '');
		const param = {
			"exchange_list" : uuids,
			"reservation_date" : reserveDate,
			"reservation_time" : selHour.val()+selMinute.val(),
			"memo" : reserveMemo.val().trim()
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), reserveReqSuccessCallback, errMsg, false);
	}

	function reserveReqSuccessCallback(data)
	{
		if (isSuccessResp(data))
			sweetToastAndCallback(data, reqSuccess);
		else
		{
			let statusFromGift = [39101, 39102, 39103, 39104, 39105, 39106, 39107, 39108];
			let msg = statusFromGift.indexOf(getStatusCode(data)) === -1 ? invalidResp(data) : data.api_message;
			sweetToast(msg);
		}
	}

	function onSubmitGeneral()
	{
		const mgs = g_approval_type === 'general' ?  message.send : message.cancel;
		sweetConfirm(mgs, generalRequest);
	}

	function generalRequest()
	{
		const url = g_approval_type === 'general' ? api : api;
		const errMsg = `${label.send}(${label.cancel})`+message.ajaxError;
		const uuids = getSelectedRowsUuid();
		const param = {
			"exchange_list" : uuids,
			"memo" : generalMemo.val().trim()
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), generalReqCallback, errMsg, false);
	}

	function generalReqCallback(data)
	{
		sweetToastAndCallback(data, reqSuccess);
	}

	function reqSuccess()
	{
		fadeoutModal();
		tableReloadAndStayCurrentPage(dataTable);
		initBalance();
	}

	function getSelectedRowsUuid()
	{
		const table = dataTable.DataTable();
		const selectedData = table.rows('.selected').data();

		let uuids = [];
		for (let i=0; i<selectedData.length; i++)
		{
			const uuid = selectedData[i].exchange_uuid;
			uuids.push(uuid);
		}

		return uuids;
	}
