
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const btnCancel 	= $("#btnCancel");

	$( () => {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnCancel		.on("click", function () { cancelPush(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		initSearchDateRange();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listPush,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 			data: "idx",   			width: "5%",    className: "no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "발송여부", 		data: "push_status",    width: "10%",  	className: "cursor-default" }
				,{title: "발송대상 ", 	data: "param",    	  	width: "20%",   className: "cursor-default",
					render: function (data, type, row, meta) {
						let jsonData = JSON.parse(data);
						return jsonData.push_type === 'all' ? '전체' : '개인('+row.nickname+')';
					}
				}
				,{title: "발송일시", 	data: "send_datetime",  width: "20%",   className: "cursor-default" }
				,{title: "구분", 		data: "param",    	  	width: "10%",  	className: "cursor-default",
					render: function (data, type, row, meta) {
						let jsonData = JSON.parse(data);
						return jsonData.store === 'all' ? '전체' : jsonData.store;
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
				initTableSorter(dataTable);
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
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"keyword" : keyword.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let checkDom = $(nRow).children().eq(0);
		let isDel 	 = aData.is_del;
		let isSent 	 = aData.send_yn;
		if (isDel === 'Y' || isSent === 'Y')
			$(checkDom).children().prop('disabled', true);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMinMaxDate();
	}

	function cancelPush()
	{
		if (cancelValidation())
			sweetConfirm(message.cancel, cancelRequest);
	}

	function cancelRequest()
	{
		$.ajax({
			url: api.cancelPush,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: cancelParams(),
			success: function(data) {
				sweetToastAndCallback(data, cancelSuccess);
			},
			error: function (request, status) {
				sweetError(label.delete+message.ajaxError);
			}
		});
	}

	function cancelSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function cancelValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast('대상을 목록에서 '+message.select);
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


