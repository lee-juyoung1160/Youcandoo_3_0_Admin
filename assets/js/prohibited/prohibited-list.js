
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const dataNum		= $(".data-num");
	//const btnTop		= $("#btnTop");

	$(document).ready(function () {
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
		//btnTop			.on("click", function () { toggleTop(); });
	});

	function initSearchForm()
	{
		keyword.val('');
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listProhibition,
				type: "POST",
				headers: headers,
				data: function (d) {
					/*if (d.order.length > 0)
					{
						var columnIndex = d.order[0].column;
						d.sort = d.columns[columnIndex].name;
						d.order = d.order[0].dir;
					}
				   */
					return tableParams(d);
				}
			},
			columns: [
				{title: "No", 		data: "idx",    	  	   width: "10%",    orderable: false,   className: "text-center" }
				,{title: "금칙어", 	data: "word",    	  	   width: "75%",  	orderable: false,   className: "text-center" }
				,{title: "등록일", 	data: "created_datetime",  width: "15%",    orderable: false,   className: "text-center",
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
					previous: "‹‹"
					,next: "››"
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: selPageLength.val(),
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: 'single',
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				let table = dataTable.DataTable();
				let info = table.page.info();

				/** 목록 상단 totol count **/
				dataNum.text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"keyword" : keyword.val()
			/*,"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()*/
		}

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	/** 상단 고정/해제 **/
	function toggleTop()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let isTop 		 = selectedData.is_top;
		let noticeUuid	 = selectedData.notice_uuid;
		let topParams = {
			"is_top" : isTop === 'Y' ? 'N' : 'Y'
			,"notice_uuid" : noticeUuid
		};

		if (isTop === 'N' && topCount > 2)
		{
			alert(message.overCntTop);
			return;
		}

		if (confirm(isTop === 'Y' ? message.deleteTop : message.insertTop))
		{
			$.ajax({
				url: "http://api.kakaokids.org/v1.0/admin/notice/changeTop",
				type: "POST",
				headers: headers,
				data: JSON.stringify(topParams),
				success: function(data) {

					if (getStatusCode(data) === 30000)
						buildGrid();
					else
						alert(data.message);
				},
				error: function (request, status) {
					console.log(status);
				},
			});
		}
	}