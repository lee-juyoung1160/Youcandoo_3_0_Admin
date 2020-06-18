
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#searchType");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
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
		selPageLength	.on("change", function () { buildGrid(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		/*btnDelete		.on("click", function () { deletePromotion(); });*/
		/*xlsxExport		.on("click", function () { onClickExcelBtn(); });*/
	});

	function initSearchForm()
	{
		keyword.val('');
		initSelectOption();
		initSearchDateRange();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listWithdrawUcd,
				type:"POST",
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				/*{title: "", 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},*/
				{title: "닉네임", 		data: "nickname",    	   width: "15%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "유형", 		data: "ucd_type",          width: "10%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "출금요청금액", 	data: "amount",    		   width: "10%",    orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "출금일시", 	data: "created_datetime",  width: "15%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "내용", 		data: "description", 	   width: "30%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "담당자", 		data: "created_user",      width: "10%",    orderable: false,   className: "text-center cursor-default"}
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
	
	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		if (isNegative(aData.amount))
			$(nRow).addClass('minus-pay');
	}

	function onSubmitSearch()
	{
		reloadTable(dataTable);
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
				setExcelData("프로모션목록", "프로모션목록", data.data);
			},
			error: function (request, status) {
				alert(label.download+message.ajaxError);
			}
		});
	}

	function excelParams()
	{
		let statusParam = [];
		status.each(function () {
			if ($(this).is(':checked'))
				statusParam.push($(this).val())
		});

		let param = {
			"limit" : 20000
			,"page" : 1
			,"dateType" : dateType.val()
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
			,"is_banner" : $("input[name=radio-banner]:checked").val()
			,"status" : statusParam
		}

		return JSON.stringify(param);
	}*/

