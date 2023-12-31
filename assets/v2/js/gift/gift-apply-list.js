
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {body, dateButtons, dataTable, dateFrom, dateTo, keyword, selPageLength, btnSearch, btnReset, selSearchType,
		rdoType, reserveDate, modalClose, modalBackdrop, btnSubmitGift, btnSubmitGeneral, btnCancel, modalGeneral, generalMemo,
		modalGift, selHour, selMinute, btnSendGeneral, btnSendGift, selDateType, memo, balance} from '../modules/elements.js';
	import { sweetToast, sweetToastAndCallback, sweetConfirm, sweetError } from  '../modules/alert.js';
	import {onClickDateRangeBtn, initDayBtn, initSearchDatepicker, initSearchDateRangeWeek, initMaxDateToday, initPageLength,
		initSelectOption, moveToMemberDetail, fadeoutModal, overflowHidden, onChangeSearchDateFrom, onChangeSearchDateTo,
	} from "../modules/common.js";
	import { isEmpty, numberWithCommas, replaceAll, appendZero, getStringFormatToDate, getCurrentHours, getCurrentMinutes, } from "../modules/utils.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,
		checkBoxElement, checkBoxCheckAllElement, onClickCheckAll, toggleCheckAll, uncheckedCheckAll
	} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

	let btnId;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
		getBalance();
		/** 목록 불러오기 **/
		buildTable();
		/** 이벤트 **/
		body.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength.on("change", function () { onSubmitSearch(); });
		btnSearch.on("click", function () { onSubmitSearch(); });
		btnReset.on("click", function () { initSearchForm(); });
		dateButtons.on("click", function () { onClickDateRangeBtn(this); });
		btnSendGeneral.on("click", function () { onClickModalGeneralOpen(this); });
		btnSendGift.on("click", function () { onClickModalGiftOpen(this); });
		btnCancel.on("click", function () { onClickModalGeneralOpen(this); });
		modalClose.on("click", function () { fadeoutModal(); });
		modalBackdrop.on("click", function () { fadeoutModal(); });
		btnSubmitGeneral.on("click", function () { onSubmitGeneral(); });
		btnSubmitGift.on("click", function () { onSubmitGifticon(); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday();
		initSearchDateRangeWeek();
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
		uncheckedCheckAll();
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
					const param = {
						"date_type" : selDateType.val(),
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"search_type": selSearchType.val(),
						"keyword" : keyword.val().trim(),
						"gift_type" : $("input[name=radio-type]:checked").val(),
						"status" : label.pending,
						"page" : (d.start / d.length) + 1,
						"limit": selPageLength.val(),
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "상품유형", 		data: "goods_code",    		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.gift : label.gifticon;
					}
				}
				,{title: "상품명", 		data: "gift_name",    		width: "25%" }
				,{title: "신청수량",    	data: "qty",  				width: "5%" }
				,{title: "금액(UCD)",	data: "ucd",  				width: "5%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "사용자(UCD)",	data: "user_ucd",  				width: "5%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "신청자", 		data: "nickname",    		width: "25%",
					render: function (data, type, row, meta) {
						return `<a data-uuid="${row.profile_uuid}">${data}</a>`;
					}
				}
				,{title: "신청일시",    	data: "created",  			width: "15%" }
				,{title: checkBoxCheckAllElement(), 	data: "exchange_uuid",			width: "5%",
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
			destroy: false,
			initComplete: function () {
				$(this).on( 'page.dt', function () { uncheckedCheckAll(); });
				$("#checkAll").on('click', function () { onClickCheckAll(this); });
				$(this).on( 'select.dt', function ( e, dt, type, indexes ) {
					$("input[name=chk-row]").eq(indexes).prop('checked', true);
					toggleCheckAll(this);
				});
				$(this).on( 'deselect.dt', function ( e, dt, type, indexes ) {
					$("input[name=chk-row]").eq(indexes).prop('checked', false);
					toggleCheckAll(this);
				});
			},
			fnRowCallback: function( nRow, aData ) {
				/** 닉네임 클릭이벤트 **/
				$(nRow).children().eq(4).find('a').on('click', function () { onClickNickname(this); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function onClickNickname(obj)
	{
		moveToMemberDetail($(obj).data('uuid'));
	}

	function onClickModalGeneralOpen(obj)
	{
		btnId = obj.id;
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
		modalGeneral.find('h5').text(btnId === 'btnSendGeneral' ? "메모(일반상품 발송)" : "메모(신청취소)");
		generalMemo.val("");
		generalMemo.trigger('focus');
	}

	function onClickModalGiftOpen(obj)
	{
		btnId = obj.id;
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
		reserveDate.datepicker("option", "minDate", "today");
		reserveDate.datepicker("option", "maxDate", "1M");
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
		if (btnId === 'btnSendGift' && hasGeneral())
		{
			msg = '기프티콘(상품유형)만 선택해주세요.'
			sweetToast(msg);
			return false;
		}

		if (btnId === 'btnSendGeneral' && hasGift())
		{
			msg = '일반상품(상품유형)만 선택해주세요.'
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

	function onSubmitGifticon()
	{
		if (reserveValidation())
			sweetConfirm(message.send, reserveRequest);
	}

	function reserveValidation()
	{
		const reserveDay = replaceAll(reserveDate.val(), '-', '');
		const reserveTime = selHour.val()+selMinute.val();
		const reserveDatetime = reserveDay+reserveTime;
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
		const param = {
			"exchange_list" : getSelectedRowsUuid(),
			"reservation_date" : replaceAll(reserveDate.val(), '-', ''),
			"reservation_time" : selHour.val()+selMinute.val(),
			"memo" : memo.val().trim()
		};

		ajaxRequestWithJson(true, api.sendGifticon, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, reqSuccess);
			})
			.catch(reject => sweetError(label.reserve + message.ajaxError));
	}

	function onSubmitGeneral()
	{
		const mgs = btnId === 'btnSendGeneral' ?  message.send : message.cancel;
		sweetConfirm(mgs, generalRequest);
	}

	function generalRequest()
	{
		const url = btnId === 'btnSendGeneral' ? api.sendGeneralGift : api.rejectGift;
		const param = {
			"exchange_list" : getSelectedRowsUuid(),
			"memo" : generalMemo.val().trim()
		};

		ajaxRequestWithJson(true, url, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, reqSuccess);
			})
			.catch(reject => sweetError(message.ajaxError));
	}

	function reqSuccess()
	{
		fadeoutModal();
		uncheckedCheckAll();
		onSubmitSearch();
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

	function getBalance()
	{
		ajaxRequestWithJson(false, api.getGiftBalance, null)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildBalance(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`잔액 ${message.ajaxLoadError}`));
	}

	function buildBalance(data)
	{
		balance.text(numberWithCommas(data.data.money));
	}
