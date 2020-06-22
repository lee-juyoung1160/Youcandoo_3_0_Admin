
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const btnCancel 	= $("#btnCancel");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")    	.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnCancel		.on("click", function () { cancelPush(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		initSearchDateRange();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listPush,
				type: "POST",
				async: false,
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				/*,{title: "발송대상 ", 	data: "idx",    	  	   width: "20%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "구분", 		data: "title",    	  	   width: "20%",  	orderable: false,   className: "text-center" }

				,{title: "발송일시", 	data: "created_datetime",  width: "20%",    orderable: false,   className: "text-center" }
				,{title: "발송여부", 	data: "created_user",      width: "20%",  	orderable: false,   className: "text-center" }
				*/
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
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				//setRowAttributes(nRow, aData);
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
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"keyword" : keyword.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	/*function setRowAttributes(nRow, aData)
	{
		let titleDom = $(nRow).children().eq(2);
		let detailUrl = '/review/detail/'+aData.idx;

		/!** 제목에 a 태그 추가 **!/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.title+'</a>');
	}*/

	function onSubmitSearch()
	{
		reloadTable(dataTable);
	}

	function cancelPush()
	{
		if (cancelValidation())
		{
			if (confirm(message.delete))
			{
				$.ajax({
					url: api.cancelPush,
					type: "POST",
					async: false,
					headers: headers,
					dataType: 'json',
					data: cancelParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							tableReloadAndStayCurrentPage(dataTable);
					},
					error: function (request, status) {
						alert(label.delete+message.ajaxError);
					},
				});
			}
		}
	}

	function cancelValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			alert('삭제할 대상을 목록에서 '+message.select);
			return false;
		}

		let doitStatus = selectedData.doit_status;
		if (doitStatus !== '모집중' || (doitStatus === '모집중' && selectedData.doit_member > 0))
		{
			alert(message.pushHasBeenSent);
			return false;
		}

		return true;
	}

	function cancelParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"idx" : selectedData.idx
		};

		return JSON.stringify(param)
	}


