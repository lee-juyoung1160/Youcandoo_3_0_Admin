
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#dateType");
	const searchType 	= $("#searchType");
	const keyword		= $("#keyword");
	const selDivision1	= $("#selDivision1");
	const selDivision2	= $("#selDivision2");
	const selPageLength = $("#selPageLength");
	const ucdType 		= $("input[name=radio-type]");
	const userDivision	= $("input[name=radio-user-division]");
	const xlsxExport 	= $(".excel-btn");
	const select		= $("select");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 테이블 데이터 로드 **/
		buildGrid();
		/** 이벤트 **/
		$("body")    	.on("keydown", function (event) { onKeydownSearch(event) });
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
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임", 	data: "nickname",    width: "20%",    orderable: false,   className: "cursor-default" }
				,{title: "유형", 	data: "ucd_type",    width: "5%",    orderable: false,   className: "cursor-default" }
				,{title: "구분", 	data: "division",    width: "5%",    orderable: false,   className: "cursor-default" }
				,{title: "금액", 	data: "amount",    	 width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "제목", 	data: "title",    	 width: "15%",    orderable: false,   className: "cursor-default" }
				,{title: "내용", 	data: "description", width: "35%",    orderable: false,   className: "cursor-default" }
				,{title: "일시", 	data: "created",     width: "15%",    orderable: false,   className: "cursor-default" }
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing : message.searching
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
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(dataTable);
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
		buildGrid();
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

