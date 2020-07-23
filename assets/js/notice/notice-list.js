
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const exposure		= $("input[name=radio-exposure]");
	const select		= $("select");
	const btnDelete		= $("#btnDelete");
	const btnTop		= $("#btnTop");
	const tooltipTop	= '<i class="question-mark far fa-question-circle"><span class="hover-text">상단고정은 최대 3개까지<br>등록이 가능합니다.</span></i>';

	$( () => {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength();
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
				{title: "No "+tooltipTop, 	data: "idx",    	  		width: "10%",	className: "cursor-default no-sort" }
				,{title: "제목", 			data: "title",    	  		width: "40%",  	className: "cursor-default" }
				,{title: "노출여부", 		data: "is_exposure",  		width: "5%",  	className: "cursor-default no-sort",
					render: function (data) {
						return data === "Y" ? label.exposure : label.unexpose;
					}
				}
				,{title: "작성자", 			data: "created_user",      width: "10%",  	className: "cursor-default no-sort" }
				,{title: "작성일", 	    	data: "created_datetime",  width: "15%",    className: "cursor-default",
					render: function (data) {
						return data.substring(0, 10);
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
				let table = dataTable.DataTable();
				dataTable.on('page.dt', function (e, settings) {
					let info = table.page.info();
					_page = (info.start / info.length) + 1;
				});

				table.page(_page-1).draw( 'page' );

				/** row select **/
				dataTable.on('select.dt', function ( e, dt, type, indexes ) { onSelectRow(dt, indexes) });
				/** row deselect **/
				dataTable.on('deselect.dt', function ( e, dt, type, indexes ) { onDeselectRow(table) });

				initTableSorter(dataTable);
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			}
			,drawCallback: function (settings) {
				buildTotalCount(dataTable);
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

	function setRowAttributes(nRow, aData)
	{
		let topDom	 = $(nRow).children().eq(1);
		let titleDom = $(nRow).children().eq(2);
		let detailUrl = page.detailNotice+aData.idx;
		let isTop	 = aData.is_top;

		/** 제목에 클릭 상세 이동 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.title+'</a>');

		/** 상단고정 **/
		if (isTop === 'Y')
		{
			/** no컬럼에 숫자대신 아이콘 **/
			$(topDom).html('<i class="fas fas fa-bell" style="cursor:default;color:#ffc800;"></i>');
		}
	}

	/** row select **/
	function onSelectRow(dt, indexes)
	{
		let selectedData 	= dt.rows(indexes).data()[0];
		let isTop			= selectedData.is_top;

		if (isTop === 'Y')
			deleteStatusBtnTop();
		else
			bestStatusBtnTop();
	}

	/** row deselect **/
	function onDeselectRow(table)
	{
		let selectedData = table.rows('.selected').data()[0];
		if (isEmpty(selectedData))
			disableStatusBtnTop();
	}

	function disableStatusBtnTop()
	{
		btnTop.removeClass('delete-btn');
		btnTop.removeClass('best-btn');
		btnTop.addClass('btn-disabled');
		btnTop.html(label.fixedTop +'상단고정');
	}

	function bestStatusBtnTop()
	{
		btnTop.removeClass('btn-disabled');
		btnTop.removeClass('delete-btn');
		btnTop.addClass('best-btn');
		btnTop.html(label.fixedTop +'상단고정');
	}

	function deleteStatusBtnTop()
	{
		btnTop.removeClass('btn-disabled');
		btnTop.removeClass('best-btn');
		btnTop.addClass('delete-btn');
		btnTop.html(label.fixedTop +'상단고정 해제');
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMinMaxDate();
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
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let isTop 		 = selectedData.is_top;
		let noticeUuid	 = selectedData.notice_uuid;
		let topParams = {
			"is_top" : isTop === 'Y' ? 'N' : 'Y'
			,"notice_uuid" : noticeUuid
		};

		$.ajax({
			url: api.topNotice,
			type: "POST",
			headers: headers,
			global: false,
			dataType: 'json',
			data: JSON.stringify(topParams),
			success: function(data) {
				sweetToastAndCallback(data, fixedSuccess);
			},
			error: function (request, status) {
				sweetError(label.modify+message.ajaxError);
			}
		});
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
		$.ajax({
			url: api.deleteNotice,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: delParams(),
			success: function(data) {
				sweetToastAndCallback(data, deleteSuccess);
			},
			error: function (request, status) {
				sweetError(label.delete+message.ajaxError);
			}
		});
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

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"notice_uuid" : selectedData.notice_uuid
		};

		return JSON.stringify(param)
	}
