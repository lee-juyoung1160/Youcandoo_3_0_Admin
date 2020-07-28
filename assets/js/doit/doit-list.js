
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	/*const xlsxExport 	= $(".excel-btn");*/
	const select		= $("select");
	const doitStatus	= $("input[name=chk-status]");
	const btnDelete		= $("#btnDelete");

	$( () => {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength();
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 테이블 데이터 로드 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		doitStatus		.on("click", function () { onChangeChkStatus(this); });
		btnDelete		.on("click", function () { deleteDoit(); });
		/*xlsxExport		.on("click", () => { onClickExcelBtn(); });*/
	});

	function initSearchForm()
	{
		keyword.val('');
		doitStatus.prop('checked', false);
		doitStatus.eq(3).prop('checked', true);
		initSelectOption();
		initSearchDateRange();
		initDayBtn();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		searchType.val(historyParams.search_type);
		doitStatus.each(function () {
			if (historyParams.status.indexOf($(this).val()) !== -1)
				$(this).prop("checked", true);
			else $(this).prop("checked", false);
		});
		dateType.val(historyParams.date_type);
		onChangeSelectOption(dateType);
		searchType.val(historyParams.search_type);
		onChangeSelectOption(searchType);
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
				url: api.listDoit,
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
				{title: "", 				data: "idx",   					width: "5%",    className: "no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "두잇 유형", 		data: "promotion_uuid", 		width: "15%",   className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.regular : label.promotion;
					}
				}
				,{title: "두잇명", 			data: "doit_title",    			width: "30%",   className: "cursor-default" }
				,{title: "인증 기간", 		data: "action_start_datetime",  width: "25%",   className: "cursor-default",
					render: function (data, type, row, meta) {
						return row.action_start_datetime+label.tilde+row.action_end_datetime;
					}
				}
				,{title: "참여인원/모집인원", 	data: "doit_member",    	 	width: "15%",   className: "cursor-default no-sort",
					render: function (data, type, row, meta) {
						return numberWithCommas(row.doit_member) + '/' + numberWithCommas(row.max_user);
					}
				}
				,{title: "진행상태", 		data: "doit_status",    		width: "15%",   className: "cursor-default no-sort" }
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
		let status = [];
		doitStatus.each(function () {
			if ($(this).is(":checked"))
				status.push($(this).val())
		})

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"status" : status
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let checkDom 	= $(nRow).children().eq(0);
		let titleDom  	= $(nRow).children().eq(2);
		let detailUrl	= page.detailDoit+aData.idx;
		/** 모집중,참여인원 0이면 체크박스 삭제 **/
		if (aData.doit_status !== '모집중' || Number(aData.doit_member) > 0)
			$(checkDom).children().prop('disabled', true);
		/** 두잇명 클릭 상세 이동 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.doit_title+'</a>');
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMinMaxDate();
	}

	function deleteDoit()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteDoit;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg, false);
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"doit_uuid" : selectedData.doit_uuid
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

		let doitStatus = selectedData.doit_status;
		if (doitStatus !== '모집중' || (doitStatus === '모집중' && selectedData.doit_member > 0))
		{
			sweetToast(message.cantDeleteDoit);
			return false;
		}

		return true;
	}

