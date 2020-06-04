
	const keyword		= $("#keyword");
	const searchType	= $("#searchType");
	const search 		= $(".search");
	const reset 		= $(".reset");
	const selPageLength	= $("#selPageLength");
	const dataNum		= $(".data-num");
	const dataTable		= $("#dataTable");
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
		search			.on("click", function () { buildGrid(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initSearchForm()
	{
		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
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
				{title: "경로", 		data: "url",   	 			width: "40%",      	orderable: false,   className: "text-center cursor-default" }
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
				let table = dataTable.DataTable();
				let info = table.page.info();

				dataNum.html(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
				console.log(aData)
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
			,"userid" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}