
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
		selPageLength	.on("change", function () { buildGrid(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		/*xlsxExport		.on("click", function () { onClickExcelBtn(); });*/
	});

	function initSearchForm()
	{
		keyword.val('');
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});
		ucdType.eq(0).prop("checked", true);
		userDivision.eq(0).prop("checked", true);

		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listUseUcd,
				type:"POST",
				headers: headers,
				data: function (d) {
					/*
					if (d.order.length > 0)
					{
						var columnIndex = d.order[0].column;
						d.sort = d.columns[columnIndex].name;
						d.order = d.order[0].dir;
					}
				   */
					return tableParams(d);
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임", 	data: "nickname",    width: "15%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "유형", 	data: "ucd_type",    width: "10%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "구분", 	data: "division",    width: "10%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "금액", 	data: "amount",    	 width: "10%",    orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "제목", 	data: "title",    	 width: "15%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "내용", 	data: "description", width: "25%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "일시", 	data: "created",     width: "15%",    orderable: false,   className: "text-center cursor-default" }
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
				console.log(aData)
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
			,"dateType" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"division" : selDivision1.val()
			,"title" : selDivision2.val()
			,"ucd_type" : $("input[name=radio-type]:checked").val()
			,"user_type" : "company"
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

	function onClickExcelBtn()
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
	}

