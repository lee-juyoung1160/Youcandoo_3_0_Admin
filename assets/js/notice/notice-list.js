
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const inputRadio	= $("input:radio");
	const select		= $("select");
	const btnDelete		= $("#btnDelete");
	const btnTop		= $("#btnTop");
	const tooltipTop	= '<i class="question-mark far fa-question-circle"><span class="hover-text">상단고정은 최대 3개까지<br>등록이 가능합니다.</span></i>';
	let topCount		= 0;

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
		btnDelete		.on("click", function () { deleteNotice(); });
		btnTop			.on("click", function () { toggleTop(); });
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
		topCount = 0;
		dataTable.DataTable({
			ajax : {
				url: api.listNotice,
				type: "POST",
				async: false,
				headers: headers,
				data: function (d) {
					return tableParams(d);
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
				{title: "No "+tooltipTop, 	data: "idx",    	  	width: "10%",   orderable: false,   className: "text-center cursor-default" }
				,{title: "제목", 			data: "title",    	  	width: "40%",  	orderable: false,   className: "text-center cursor-default" }
				,{title: "노출여부", 		data: "is_exposure",  	width: "5%",  	orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return data === "Y" ? label.exposure : label.unexpose;
					}
				}
				,{title: "작성자", 		data: "created_user",      width: "10%",  	orderable: false,   className: "text-center cursor-default" }
				,{title: "작성일", 	    data: "created_datetime",  width: "15%",    orderable: false,   className: "text-center cursor-default",
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
				/** row select **/
				dataTable.on('select.dt', function ( e, dt, type, indexes ) { onSelectRow(dt, indexes) });
				/** row deselect **/
				dataTable.on('deselect.dt', function ( e, dt, type, indexes ) { onDeselectRow(table) });
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			}
			,drawCallback: function (settings) {
				buildTotalCount(dataTable);
				disableStatusBtnTop();
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
			,"isExposure" : $('input:radio[name=radio-exposure]:checked').val()
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let topDom	 = $(nRow).children().eq(1);
		let titleDom = $(nRow).children().eq(2);
		let detailUrl = page.detailNotice+aData.idx;
		let isTop	 = aData.is_top;

		/** 제목에 클릭 상세 이동 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.title+'</a>');

		/** 상단고정 **/
		if (isTop === 'Y')
		{
			topCount++;

			/** no컬럼에 숫자대신 아이콘 **/
			$(topDom).html('<i class="fas fas fa-bell" style="cursor:default;"></i>');
		}
	}

	/** row select **/
	function onSelectRow(dt, indexes)
	{
		let selectedData 	= dt.rows(indexes).data()[0];
		let isTop			= selectedData.is_top;

		if (isTop === 'Y')
			deleteStatusBtnTop();
		else
			bestStatusBtnTop();
	}

	/** row deselect **/
	function onDeselectRow(table)
	{
		let selectedData = table.rows('.selected').data()[0];
		if (isEmpty(selectedData))
			disableStatusBtnTop();
	}

	function disableStatusBtnTop()
	{
		btnTop.removeClass('delete-btn');
		btnTop.removeClass('best-btn');
		btnTop.addClass('btn-disabled');
		btnTop.html(label.fixedTop +'상단고정');
	}

	function bestStatusBtnTop()
	{
		btnTop.removeClass('btn-disabled');
		btnTop.removeClass('delete-btn');
		btnTop.addClass('best-btn');
		btnTop.html(label.fixedTop +'상단고정');
	}

	function deleteStatusBtnTop()
	{
		btnTop.removeClass('btn-disabled');
		btnTop.removeClass('best-btn');
		btnTop.addClass('delete-btn');
		btnTop.html(label.fixedTop +'상단고정 해제');
	}

	function onSubmitSearch()
	{
		reloadTable(dataTable);
	}

	/** 상단 고정/해제 **/
	function toggleTop()
	{
		if (btnTop.hasClass('btn-disabled'))
			return;

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
				url: api.topNotice,
				type: "POST",
				headers: headers,
				async: false,
				global: false,
				dataType: 'json',
				data: JSON.stringify(topParams),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
					{
						disableStatusBtnTop();
						reloadTable(dataTable);
					}
				},
				error: function (request, status) {
					alert(label.submit+message.ajaxError);
				},
			});
		}
	}

	function deleteNotice()
	{
		if (delValidation())
		{
			if (confirm(message.delete))
			{
				$.ajax({
					url: api.deleteNotice,
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
			"notice_uuid" : selectedData.notice_uuid
		};

		return JSON.stringify(param)
	}
