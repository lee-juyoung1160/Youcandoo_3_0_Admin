
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const select		= $("select");
	const dataNum		= $(".data-num");
	const selSort		= $("#selSort");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
		xlsxExport		.on("click", function () { onClickExcelBtn(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initSearchForm()
	{
		keyword.val('');
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});

		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listBiz,
				type: "POST",
				async: false,
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function(xhr, status, err) {
					alert(message.cantLoadList);
				}
			},
			columns: [
				{title: "고유 ID", 	data: "company_uuid",   width: "25%",     orderable: false,   className: "text-center" }
				,{title: "회사명", 	data: "nickname",   	width: "30%",     orderable: false,   className: "text-center" }
				,{title: "등록일", 	data: "created",   		width: "15%",     orderable: false,   className: "text-center",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
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
				let table = dataTable.DataTable();
				let info = table.page.info();

				dataNum.text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
				//setRowAttributes(nRow, aData);
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
			,"dateType" : dateType.val()
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom = $(nRow).children().eq(1);

		/** 제목에 a 태그 추가 **/
		$(titleDom).html('<a href="/biz/detail">'+aData.nickname+'</a>');
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	function onClickExcelBtn()
	{
		getList();
	}

	function getList()
	{
		$.ajax({
			url: api.listBiz,
			type: "POST",
			async: false,
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("비즈목록", "비즈목록", data);
			},
			error: function (request, status) {
				console.log(status);
			},
		});
	}

	function excelParams()
	{
		let param = {
			"limit" : 20000
			,"page" : 1
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
			,"dateType" : dateType.val()
		}

		return JSON.stringify(param);
	}

