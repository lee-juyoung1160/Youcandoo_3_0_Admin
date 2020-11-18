
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type")
	const searchType 	= $("#search_type");
	const keyword 		= $("#keyword");
	const selPageLength	= $("#selPageLength");
	const btnApproval	= $("#btnApproval");
	const btnReject		= $("#btnReject");
	const btnXlsxOut	= $("#btnXlsxOut");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const modalTitle	= $("#modalTitle");
	const modalMemo		= $("#memo");
	const btnSubmit		= $("#btnSubmit");

	let g_memo_type;

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnApproval		.on("click", function () { onClickApproval(); });
		btnReject		.on("click", function () { onClickReject(); });
		btnXlsxOut		.on("click", function () { onClickXlsxOut(); });
		btnSubmit		.on("click", function () { onSubmitOnModal(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		initSelectOption();
		initSearchDateRange();
		initMaxDateToday();
		initDayBtn();
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
				{title: "신청자", 		data: "nickname",    		width: "25%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailUser}${row.user_idx}">${data}</a>`;
					}
				}
				,{title: "상품명", 		data: "gift_name",    		width: "25%" }
				,{title: "신청수량",    	data: "gift_qty",  			width: "10%",	className: 'no-sort' }
				,{title: "금액(UCD)",	data: "exchange_ucd",  		width: "10%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
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
			,"status" : ["대기"]
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		uncheckedCheckAll();
		initMaxDateToday();
	}

	function onClickApproval()
	{
		if (modalValidation())
		{
			g_memo_type = 'approval';
			modalFadein();
			initModal();
		}
	}

	function onClickReject()
	{
		if (modalValidation())
		{
			g_memo_type = 'reject';
			modalFadein();
			initModal();
		}
	}

	function modalValidation()
	{
		let uuids = getSelectedRowsUuid();
		if (uuids.length === 0)
		{
			sweetToast("대상을 선택해주세요.");
			return false;
		}

		return true;
	}

	function initModal()
	{
		title = g_memo_type === 'approval' ? "메모(승인)" : "메모(승인취소)";

		modalTitle.html(title);
		modalMemo.trigger('focus');
		modalMemo.val("");
	}

	function onSubmitOnModal()
	{
		let mgs = g_memo_type === 'approval' ? message.approve : message.reject;
		sweetConfirm(mgs, approvalRequest);
	}

	function approvalRequest()
	{
		let url 	= g_memo_type === 'approval' ? api.approvalGift : api.rejectGift;
		let errMsg 	= label.approval+message.ajaxError;
		let uuids = getSelectedRowsUuid();
		let param   = {
			"exchange_list" : uuids,
			"memo" : modalMemo.val()
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), approvalReqCallback, errMsg, false);
	}

	function approvalReqCallback(data)
	{
		sweetToastAndCallback(data, approvalReqSuccess);
	}

	function approvalReqSuccess()
	{
		modalFadeout();
		onSubmitSearch();
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

	function onClickXlsxOut()
	{
		let url = api.xlsxOutGiftApply;
		let errMsg = label.list + message.ajaxLoadError;
		let param = {
			"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val().trim()
			,"status" : ["대기"]
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), xlsxOutCallback, errMsg, false);
	}

	function xlsxOutCallback(data)
	{
		setExcelData("상품신청내역", "상품신청내역", data.data);
	}