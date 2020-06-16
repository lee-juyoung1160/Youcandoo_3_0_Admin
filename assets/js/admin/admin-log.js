
	const keyword		= $("#keyword");
	const searchType	= $("#searchType");
	const search 		= $(".search");
	const reset 		= $(".reset");
	const selPageLength	= $("#selPageLength");
	const dataTable		= $("#dataTable");
	const select		= $("select");
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 검색 폼 초기화 **/
		initSearchForm();
		/** 이력 테이블 **/
		buildGrid();
		/** 이벤트 **/
		$("body")    	.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
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
		onClickActiveAloneDayBtn($(".btn_today"));
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listMyLog,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "아이디", 	data: "userid",      		width: "15%",    	orderable: false,   className: "text-center cursor-default" }
				,{title: "경로", 		data: "url",   	 		width: "35%",      	orderable: false,   className: "text-center cursor-default" }
				,{title: "날짜", 	data: "datetime",   		width: "15%", 		orderable: false,   className: "text-center cursor-default" }
				,{title: "구분", 	data: "access_type_name",	width: "15%",    	orderable: false,   className: "text-center cursor-default" }
				,{title: "활동", 	data: "action",      		width: "15%",    	orderable: false,   className: "text-center cursor-default" }
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
			,"keyword" : keyword.val().trim()
		}

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		reloadTable(dataTable);
	}