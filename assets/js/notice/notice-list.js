
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const exposure		= $("input[name=radio-exposure]");
	const btnDelete		= $("#btnDelete");
	const btnTop		= $("#btnTop");
	const tooltipTop	= '<i class="question-mark far fa-question-circle"><span class="hover-text">상단고정은 최대 3개까지<br>등록이 가능합니다.</span></i>';

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnDelete		.on("click", function () { deleteNotice(); });
		btnTop			.on("click", function () { toggleTop(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		exposure.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRangeMonth();
		initMaxDateToday();
		initDayBtn();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		keyword.val(historyParams.keyword);
		dateFrom.val(historyParams.fromDate);
		dateTo.val(historyParams.toDate);
		searchType.val(historyParams.searchType);
		onChangeSelectOption(searchType);
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);
		exposure.each(function () {
			if ($(this).val() === historyParams.isExposure)
				$(this).prop("checked", true);
		});

		_page = historyParams.page;
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listNotice,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 				data: "idx",   				width: "5%",   className: "no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "No "+tooltipTop, 	data: "idx",    	  		width: "5%",	className: "no-sort",
					render: function (data, type, row, meta) {
						let fixTopEl = '<i class="fas fas fa-bell" style="cursor:default;color:#ffc800;"></i>';
						return row.is_top === 'Y' ?  fixTopEl : data;
					}
				}
				,{title: "제목", 			data: "title",    	  		width: "30%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailNotice + row.idx;
						return '<a href="'+detailUrl+'">' + data + '</a>';
					}
				}
				,{title: "노출여부", 		data: "is_exposure",  		width: "5%",  	className: "no-sort",
					render: function (data) {
						return data === "Y" ? label.exposure : label.unexpose;
					}
				}
				,{title: "작성자", 			data: "created_user",      width: "15%",  	className: "no-sort" }
				,{title: "작성일", 	    	data: "created_datetime",  width: "10%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: false,
			initComplete: function () {
				/** row select **/
				$(this).on('select.dt', function ( e, dt, type, indexes ) { onSelectRow(dt, indexes) });
				/** row deselect **/
				$(this).on('deselect.dt', function ( e, dt, type, indexes ) { onDeselectRow(this) });

				$(this).on('page.dt', function (e, settings) { _page = getCurrentPage(this); });
				redrawPage(this, _page);
				initTableSorter(this);
			},
			fnRowCallback: function( nRow, aData ) {
			}
			,drawCallback: function (settings) {
				buildTotalCount(this);
				disableStatusBtnTop();
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
			,"isExposure" : $('input:radio[name=radio-exposure]:checked').val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	/** row select **/
	function onSelectRow(dt, indexes)
	{
		let selectedData = dt.rows(indexes).data()[0];
		let isTop		 = selectedData.is_top;

		if (isTop === 'Y')
			deleteStatusBtnTop();
		else
			bestStatusBtnTop();
	}

	/** row deselect **/
	function onDeselectRow(_table)
	{
		let table 		 = $(_table).DataTable();
		let selectedData = table.rows('.selected').data()[0];
		if (isEmpty(selectedData))
			disableStatusBtnTop();
	}

	function disableStatusBtnTop()
	{
		btnTop.removeClass('delete-btn');
		btnTop.removeClass('best-btn');
		btnTop.addClass('btn-disabled');
		btnTop.html(`${label.fixedTop} 상단고정`);
	}

	function bestStatusBtnTop()
	{
		btnTop.removeClass('btn-disabled');
		btnTop.removeClass('delete-btn');
		btnTop.addClass('best-btn');
		btnTop.html(`${label.fixedTop} 상단고정`);
	}

	function deleteStatusBtnTop()
	{
		btnTop.removeClass('btn-disabled');
		btnTop.removeClass('best-btn');
		btnTop.addClass('delete-btn');
		btnTop.html(`${label.fixedTop} 상단고정 해제`);
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}

	/** 상단 고정/해제 **/
	function toggleTop()
	{
		if (btnTop.hasClass('btn-disabled'))
			return;

		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let isTop 		 = selectedData.is_top;

		sweetConfirm(isTop === 'Y' ? message.deleteTop : message.insertTop, fixedTopRequest);
	}

	function fixedTopRequest()
	{

		let url 	= api.topNotice;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, fixParams(), fixedTopRequestCallback, errMsg, false);
	}

	function fixParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let isTop 		 = selectedData.is_top;
		let noticeUuid	 = selectedData.notice_uuid;
		let topParams = {
			"is_top" : isTop === 'Y' ? 'N' : 'Y'
			,"notice_uuid" : noticeUuid
		};

		return JSON.stringify(topParams);
	}

	function fixedTopRequestCallback(data)
	{
		sweetToastAndCallback(data, fixedSuccess);
	}

	function fixedSuccess()
	{
		disableStatusBtnTop();
		tableReloadAndStayCurrentPage(dataTable);
	}

	function deleteNotice()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteNotice;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg, false);
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"notice_uuid" : selectedData.notice_uuid
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
			sweetToast(`삭제할 대상을 목록에서 ${message.select}`);
			return false;
		}

		return true;
	}
