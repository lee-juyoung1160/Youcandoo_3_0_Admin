
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const selCategory	= $("#selCategory");
	const doitStatus	= $("input[name=chk-status]");
	const radioDoitType	= $("input[name=radio-doit-type]");
	const btnDelete		= $("#btnDelete");
	const btnCategory	= $("#btnCategory");

	/** modal **/
	const categoryTable = $("#categoryTable");
	const modalLayout	= $(".modal-layout");
	const modalContent  = $(".modal-content");
	const modalCloseBtn	= $(".close-btn");
	const btnSubmit		= $("#btnSubmit");

	$( () => {
		/** 카테고리 목록 **/
		getCategory();
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
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		doitStatus		.on("click", function () { onChangeChkStatus(this); });
		btnDelete		.on("click", function () { deleteDoit(); });
		btnCategory		.on("click", function () { onClickModalOpen(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmit		.on('click', function () { onSubmitChangeCategory(); });
	});

	function getCategory()
	{
		let url = api.listCategory;
		let errMsg = `카테고리 목록 ${message.ajaxLoadError}`;

		ajaxRequestWithJsonData(false, url, null, getCategoryCallback, errMsg, false);
	}

	function getCategoryCallback(data)
	{
		let options = '<option value="">전체</option>';
		let datas = data.data;
		let i = 0;
		for (i; i<datas.length; i++)
		{
			let { category, category_uuid } = datas[i];
			options += `<option value="${category_uuid}">${category}</option>`
		}

		selCategory.html(options);

		onChangeSelectOption(selCategory);
	}

	function initSearchForm()
	{
		keyword.val('');
		doitStatus.prop('checked', false);
		doitStatus.eq(0).prop('checked', true);
		doitStatus.eq(1).prop('checked', true);
		doitStatus.eq(2).prop('checked', true);
		doitStatus.eq(3).prop('checked', true);
		radioDoitType.eq(0).prop('checked', true);
		initSelectOption();
		initSearchDateRange();
		initMaxDateAfterThreeMonth();
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
		selCategory.val(historyParams.doit_category);
		onChangeSelectOption(selCategory);
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);
		radioDoitType.each(function () {
			if ($(this).val() === historyParams.doit_type)
				$(this).prop("checked", true);
		});

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
				{title: "", 				data: "idx",   					width: "5%",    className: "cursor-default no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "두잇 유형", 		data: "promotion_uuid", 		width: "7%",   className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.regular : label.promotion;
					}
				}
				,{title: "카테고리", 			data: "doit_category",  		width: "10%",   className: "cursor-default no-sort" }
				,{title: "두잇명", 			data: "doit_title",    			width: "30%",   className: "cursor-default",
					render: function (data, type, row, meta) {
						let detailUrl	= page.detailDoit + row.idx;
						return `<a href="${detailUrl}">${row.doit_title}</a>`;
					}
				}
				,{title: "인증 기간", 		data: "action_start_datetime",  width: "15%",   className: "cursor-default",
					render: function (data, type, row, meta) {
						return `${row.action_start_datetime} ${label.tilde} ${row.action_end_datetime}`;
					}
				}
				,{title: "인증요일", 		data: "action_dayofweek",  		width: "10%",   className: "cursor-default no-sort" }
				,{title: "참여인원/모집인원", 	data: "doit_member",    	 	width: "10%",   className: "cursor-default",
					render: function (data, type, row, meta) {
						return `${numberWithCommas(row.doit_member)} ${label.slash} ${numberWithCommas(row.max_user)}`;
					}
				}
				,{title: "진행상태", 		data: "doit_status",    		width: "7%",    className: "cursor-default" }
				,{title: "개설자", 			data: "nickname",    			width: "15%",   className: "cursor-default no-sort" }
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
			,"doit_category" : selCategory.val()
			,"doit_type" : $("input[name=radio-doit-type]:checked").val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let checkDom 		= $(nRow).children().eq(0);
		let joinMemberDom 	= $(nRow).children().eq(5);
		/** 모집중,참여인원 0이면 체크박스 삭제 **/
		if (aData.doit_status !== '모집중' || Number(aData.doit_member) > 0)
			$(checkDom).children().prop('disabled', true);

		$(joinMemberDom).attr('data-sort', aData.doit_member);
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateAfterThreeMonth();
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
			sweetToast(`삭제할 대상을 목록에서 ${message.select}`);
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

	function onClickModalOpen()
	{
		modalFadein();
		//buildCategoryModal();
	}

	function buildCategoryModal()
	{
		categoryTable.DataTable({
			ajax : {
				url: api.listDoit,
				type: "POST",
				headers: headers,
				global: false,
				data: function (d) {
					return categoryTableParams(d);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 			data: "idx",				width: "5%",    className: "cursor-default",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "카테고리 명", 	data: "doit_category",  	width: "10%",   className: "cursor-default" }
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
			pageLength: 10,
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
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function categoryTableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"company_uuid" : g_bizUuid
		}

		return JSON.stringify(param);
	}

	function onSubmitChangeCategory()
	{

	}
