
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const inputRadio	= $("input:radio");
	const select		= $("select");
	const btnDelete		= $("#btnDelete");

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
		btnDelete		.on("click", function () { deleteEvent(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		inputRadio.each(function (index) {
			if (index === 0)
				$(this).prop("checked", true);
		});
		initSelectOption();
		initSearchDateRange();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listEvent,
				type: "POST",
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
				{title: "구분", 	data: "event_type",    	width: "10%",   orderable: false,   className: "text-center cursor-default" }
				,{title: "제목", 	data: "title",  		width: "35%",	orderable: false,   className: "text-center cursor-default" }
				,{title: "기간", 	data: "start_date",  	width: "20%",   orderable: false,   className: "text-center cursor-default",
					render: function (data, type, row, meta) {
						return row.start_date + ' ~ ' + row.end_date;
					}
				}
				,{title: "노출여부",  data: "is_exposure",  	width: "10%",  	orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return data === "Y" ? label.exposure : label.unexpose;
					}
				}
				,{title: "작성자", 	data: "created_user",      width: "15%",   orderable: false,   className: "text-center cursor-default" }
				,{title: "작성일", 	data: "created_datetime",  width: "10%",   orderable: false,   className: "text-center cursor-default",
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
		let _limit = info.length;
		let _page = (info.start / info.length) + 1;

		let param = {
			"limit" : _limit
			,"page" : _page
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
			,"isExposure" : $('input:radio[name=radio-exposure]:checked').val()
		}

		/** localStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom  = $(nRow).children().eq(2);
		let detailUrl = page.detailEvent+aData.idx;

		/** 제목에 클릭 상세 이동 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.title+'</a>');
	}

	function onSubmitSearch()
	{
		reloadTable(dataTable);
	}

	function deleteEvent()
	{
		if (delValidation())
		{
			if (confirm(message.delete))
			{
				$.ajax({
					url: api.deleteEvent,
					type: "POST",
					async: false,
					headers: headers,
					dataType: 'json',
					data: delParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							dataReloadAndStayCurrentPage(dataTable);
					},
					error: function (request, status) {
						alert(label.delete+message.ajaxError);
					},
				});
			}
		}
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			alert('삭제할 대상을 목록에서 '+message.select);
			return false;
		}

		return true;
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"event_uuid" : selectedData.event_uuid
		};

		return JSON.stringify(param)
	}