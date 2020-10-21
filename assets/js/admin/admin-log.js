
	const keyword		= $("#keyword");
	const searchType	= $("#searchType");
	const search 		= $(".search");
	const reset 		= $(".reset");
	const selPageLength	= $("#selPageLength");
	const dataTable		= $("#dataTable");
	const btnSubmit 	= $("#btnSubmit");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 이력 테이블 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initSearchForm()
	{
		keyword.val('');
		initSelectOption();
		initSearchDateRangeToday();
		initMaxDateToday();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listMyLog,
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
				{title: "아이디", 	data: "userid",      		width: "15%" }
				,{title: "경로", 	data: "url",   	 			width: "35%" }
				,{title: "날짜", 	data: "datetime",   		width: "15%" }
				,{title: "구분", 	data: "access_type_name",	width: "15%" }
				,{title: "활동", 	data: "action",      		width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
			initComplete: function () {
				initTableSorter(this);
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
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val().trim()
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
		initMaxDateToday();
	}