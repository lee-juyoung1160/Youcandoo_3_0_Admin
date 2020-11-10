
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#dateType");
	const searchType 	= $("#searchType");
	const selMatch 		= $("#selMatch");
	const keyword		= $("#keyword");
	const selDivision1	= $("#selDivision1");
	const selDivision2	= $("#selDivision2");
	const selPageLength = $("#selPageLength");
	const ucdType 		= $("input[name=radio-type]");
	const userDivision	= $("input[name=radio-user-division]");
	/*const xlsxExport 	= $(".excel-btn");*/

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 테이블 데이터 로드 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		/*xlsxExport		.on("click", function () { onClickExcelBtn(); });*/
	});

	function initSearchForm()
	{
		keyword.val('');
		ucdType.eq(0).prop("checked", true);
		userDivision.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRange();
		initMaxDateToday();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listUsageUcd,
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
				{title: "닉네임", 	data: "nickname",    width: "20%" }
				,{title: "유형", 	data: "ucd_type",    width: "7%" }
				,{title: "구분", 	data: "division",    width: "7%" }
				,{title: "금액", 	data: "amount",    	 width: "7%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "제목", 	data: "title",    	 width: "10%" }
				,{title: "내용", 	data: "description", width: "35%",    className: "no-sort" }
				,{title: "일시", 	data: "created",     width: "10%" }
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
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"dateType" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword_type" : selMatch.val()
			,"keyword" : keyword.val()
			,"division" : selDivision1.val()
			,"title" : selDivision2.val()
			,"ucd_type" : $("input[name=radio-type]:checked").val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		if (isNegative(aData.amount))
			$(nRow).addClass('minus-pay');
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}

	/*function onClickExcelBtn()
	{
		getExcelData();
	}

	function getExcelData()
	{
		$.ajax({
			url: api.listPromotion,
			type: "POST",
			dataType: "json",
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("UCD 사용내역", "UCD 사용내역", data.data);
			},
			error: function (request, status) {
				alert(label.download+message.ajaxError);
			}
		});
	}

	function excelParams()
	{
		let param = {
			"limit" : 20000
			,"page" : 0
			,"dateType" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"division" : selDivision1.val()
			,"title" : selDivision2.val()
			,"ucd_type" : $("input[name=radio-type]:checked").val()
			,"user_type" : $("input[name=radio-user-division]:checked").val()
		}

		return JSON.stringify(param);
	}*/

