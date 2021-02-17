
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type")
	const searchType 	= $("#search_type");
	const keyword 		= $("#keyword");
	const giftType 		= $("input[name=radio-gift-type]");
	const selPageLength	= $("#selPageLength");
	const btnApproval	= $("#btnApproval");
	const btnReject		= $("#btnReject");
	const btnSendReserve = $("#btnSendReserve");
	const balanceEl		= $("#balance");

	/** 예약발송 모달 **/
	const modalSendReserve = $("#modalSendReserve");
	const reserveDatePicker	= $("#reserveDatePicker");
	const selHour		 = $("#selHour");
	const selMinute		 = $("#selMinute");
	const reserveMemo	 = $("#reserveMemo");
	const btnSubmitReserve = $("#btnSubmitReserve");
	/** 메모모달 **/
	const modalMemo		 = $("#modalMemo");
	const modalMemoTitle = $("#modalMemoTitle");
	const memoEl		 = $("#memo");
	const btnSubmitMemo	 = $("#btnSubmitMemo");
	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");


	let g_approval_type;

	$( () => {
		/** 잔액 **/
		initBalance();
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		initReserveDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		/*$("body")  .on("keydown", function (event) { onKeydownSearch(event) });*/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnApproval		.on("click", function () { g_approval_type = 'approval'; onClickBtnApprovalOrReject(); });
		btnReject		.on("click", function () { g_approval_type = 'reject'; onClickBtnApprovalOrReject(); });
		btnSendReserve	.on("click", function () { g_approval_type = ''; onClickBtnSendReserve(); });
		btnSubmitMemo	.on("click", function () { onSubmitModalMemo(); });
		btnSubmitReserve .on("click", function () { onSubmitReserve(); });
	});

	function initReserveDatepicker()
	{
		reserveDatePicker.datepicker({
			dateFormat: "yy-mm-dd"
			,monthNames: label.monthNames
			,dayNames: label.dayNames
			,dayNamesMin: label.dayNames
			,minDate: 0
		});
	}

	function initSearchForm()
	{
		keyword.val('');
		giftType.eq(0).prop('checked', true);
		initSelectOption();
		initSearchDateRange();
		initMaxDateToday();
		initDayBtn();
	}

	function initBalance()
	{
		let url = api.getBalanceGift;
		let errMsg = `잔액 ${message.ajaxLoadError}`;

		ajaxRequestWithJsonData(false, url, null, initBalanceSuccessCallback, errMsg, false);
	}

	function initBalanceSuccessCallback(data)
	{
		let { money } = data.data;
		balanceEl.html(numberWithCommas(money));
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listApplyGift,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: tableCheckAllDom(), 	data: "",   		width: "5%",	className: 'no-sort',
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
				uncheckedCheckAllAfterMovePage(this);
				initTableSorter(this);
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData)
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		$(nRow).attr('data-uuid', aData.gift_uuid);
	}

	function tableParams()
	{
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val().trim()
			,"gift_type" : $("input[name=radio-gift-type]:checked").val()
			,"status" : ["대기"]
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onClickBtnSendReserve()
	{
		if (modalValidation())
		{
			modalSendReserveFadein();
			initModalSendReserve();
		}
	}

	function modalSendReserveFadein()
	{
		modalSendReserve.fadeIn();
		modalLayout.fadeIn();
		overflowHidden();
	}

	function initModalSendReserve()
	{
		reserveDatePicker.datepicker("setDate", "today");
	}

	function onSubmitReserve()
	{
		if (reserveValidation())
			sweetConfirm(message.send, reserveRequest);
	}

	function reserveValidation()
	{
		let reserveDate = replaceAll(reserveDatePicker.val(), '-', '');
		let reserveTime = selHour.val()+selMinute.val();
		let reserveDatetime = reserveDate+reserveTime;
		let currentDate = getStringFormatToDate(new Date(), '');
		let currentTime = appendZero(getCurrentHours()).toString()+appendZero(getCurrentMinutes()).toString();
		let currentDatetime = currentDate+currentTime;

		if (Number(reserveDatetime) < Number(currentDatetime))
		{
			sweetToast(message.compareReserveDatetime);
			return false;
		}

		return true;
	}

	function reserveRequest()
	{
		let url = api.reserveGift;
		let errMsg = label.reserve+label.send+message.ajaxError;
		let uuids = getSelectedRowsUuid();
		let reserveDate = replaceAll(reserveDatePicker.val(), '-', '');
		let param = {
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

	function onClickBtnApprovalOrReject()
	{
		if (modalValidation())
		{
			modalMemoFadein();
			initModalMemo();
		}
	}

	function modalMemoFadein()
	{
		modalMemo.fadeIn();
		modalLayout.fadeIn();
		overflowHidden();
	}

	function initModalMemo()
	{
		title = g_approval_type === 'approval' ? "메모(일반상품 발송)" : "메모(신청취소)";

		modalMemoTitle.html(title);
		memoEl.trigger('focus');
		memoEl.val("");
	}

	function onSubmitModalMemo()
	{
		let mgs = g_approval_type === 'approval' ? `상품을 ${message.send}` : `신청을 ${message.cancel}`;
		sweetConfirm(mgs, memoRequest);
	}

	function memoRequest()
	{
		let url 	= g_approval_type === 'approval' ? api.approvalGift : api.rejectGift;
		let errMsg 	= label.approval+message.ajaxError;
		let uuids 	= getSelectedRowsUuid();
		let param   = {
			"exchange_list" : uuids,
			"memo" : memoEl.val().trim()
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), memoReqCallback, errMsg, false);
	}

	function memoReqCallback(data)
	{
		sweetToastAndCallback(data, reqSuccess);
	}

	function reqSuccess()
	{
		modalFadeout();
		tableReloadAndStayCurrentPage(dataTable);
		initBalance();
	}

	function modalValidation()
	{
		let uuids = getSelectedRowsUuid();
		if (uuids.length === 0)
		{
			sweetToast(`대상을 ${message.select}`);
			return false;
		}

		let msg
		if (isEmpty(g_approval_type) && hasGeneralGift())
		{
			msg = `예약 발송은 기프티콘만 가능합니다.
					일반상품 체크 해제 후 다시 시도해주세요.`;
			sweetToast(msg);
			return false;
		}

		if (g_approval_type === 'approval' && hasGifticon())
		{
			msg = `상품 발송은 일반상품만 가능합니다.
					기프티콘 체크 해제 후 다시 시도해주세요.`
			sweetToast(msg);
			return false;
		}

		return true;
	}

	function hasGeneralGift()
	{
		let result = false;
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		for (let i=0; i<selectedData.length; i++)
		{
			let goodsCode = selectedData[i].goods_code;
			if (isEmpty(goodsCode))
				result = true;
		}

		return result;
	}

	function hasGifticon()
	{
		let result = false;
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		for (let i=0; i<selectedData.length; i++)
		{
			let goodsCode = selectedData[i].goods_code;
			if (!isEmpty(goodsCode))
				result = true;
		}

		return result;
	}

	function getSelectedRowsUuid()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		let uuids = [];
		for (let i=0; i<selectedData.length; i++)
		{
			let uuid = selectedData[i].exchange_uuid;
			uuids.push(uuid);
		}

		return uuids;
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		uncheckedCheckAll();
		initMaxDateToday();
	}
