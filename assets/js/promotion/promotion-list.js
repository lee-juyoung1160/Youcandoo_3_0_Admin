
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#dateType");
	const searchType 	= $("#searchType");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const isBanner 		= $("input[name=radio-banner]");
	const status 		= $("input[name=chk-status]");
	const btnDelete		= $("#btnDelete");

	$( () => {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 테이블 데이터 로드 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		status			.on("click", function () { onChangeChkStatus(this); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnDelete		.on("click", function () { deletePromotion(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		isBanner.eq(0).prop("checked", true);
		status.prop("checked", true);
		initSelectOption();
		initSearchDateRangeMonth();
		initMaxDateAfterThreeMonth();
		initDayBtn();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		keyword.val(historyParams.keyword);
		dateFrom.val(historyParams.fromDate);
		dateTo.val(historyParams.toDate);
		dateType.val(historyParams.dateType);
		onChangeSelectOption(dateType);
		searchType.val(historyParams.searchType);
		onChangeSelectOption(searchType);
		status.each(function () {
			if (historyParams.status.indexOf($(this).val()) !== -1)
				$(this).prop("checked", true);
		});
		isBanner.each(function () {
			if ($(this).val() === historyParams.is_banner)
				$(this).prop("checked", true);
		});
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);

		_page = historyParams.page;
	}

	function onChangeChkStatus(obj)
	{
		let checkedCount = $("input[name=chk-status]:checked").length;
		if (checkedCount === 0)
		{
			sweetToast(message.minimumChecked);
			$(obj).prop("checked", true);
		}
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listPromotion,
				type:"POST",
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 			data: "idx",   				width: "5%",     className: "cursor-default no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "기업", 			data: "nickname",    		width: "15%",    className: "cursor-default" }
				,{title: "프로모션명", 	data: "promotion_title",    width: "30%",    className: "cursor-default",
					render: function (data, type, row, meta) {
						let detailUrl 	= page.detailPromo + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "프로모션 예산", data: "budget_ucd",     	width: "15%",    className: "cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "잔여예산", 	data: "remain_budget_ucd", 	width: "15%",    className: "cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "프로모션 기간", data: "start_date",    	   	width: "20%",    className: "cursor-default",
					render: function (data, type, row, meta) {
						return `${row.start_date} ${label.tilde} ${row.end_date}`;
					}
				}
				,{title: "프로모션 상태", data: "status",   	 		width: "10%",    className: "cursor-default no-sort",
					render: function (data) {
						return getPromotionStatusName(data);
					}
				}
				,{title: "공개 여부", 	data: "is_banner",    	width: "10%",    className: "cursor-default no-sort",
					render: function (data) {
						return data === 'Y' ? label.exposure : label.unexpose;
					}
				}
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: false,
			initComplete: function () {
				$(this).on('page.dt', function (e, settings) { _page = getCurrentPage(this); });
				redrawPage(this, _page);
				initTableSorter(this);
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}
	
	function tableParams()
	{
		let statusParam = [];
		status.each(function () {
			if ($(this).is(':checked'))
				statusParam.push($(this).val())
		});

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"dateType" : dateType.val()
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
			,"is_banner" : $("input[name=radio-banner]:checked").val()
			,"status" : statusParam
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let checkDom = $(nRow).children().eq(0);

		/** 대기 상태가 아닌 경우 체크박스 삭제 **/
		if (aData.status !== 'pending')
			$(checkDom).children().prop('disabled', true);
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateAfterThreeMonth();
	}

	function deletePromotion()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deletePromotion;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg,false);
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"promotion_uuid" : selectedData.promotion_uuid
		};

		return JSON.stringify(param)
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
	}

	function deleteSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast('삭제할 대상을 목록에서 '+message.select);
			return false;
		}

		return true;
	}
