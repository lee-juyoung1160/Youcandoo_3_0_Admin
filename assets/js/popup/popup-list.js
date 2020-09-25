
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType 		= $("#dateType");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const btnDelete		= $("#btnDelete");

	$( () => {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnDelete		.on("click", function () { deletePopup(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		initSelectOption();
		initSearchDateRangeMonth();
		initMaxDateAfterThreeMonth();
		initDayBtn();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		keyword.val(historyParams.keyword);
		dateFrom.val(historyParams.fromDate);
		dateTo.val(historyParams.toDate);
		dateType.val(historyParams.dateType);
		onChangeSelectOption(dateType);
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);

		_page = historyParams.page;
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listPopup,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 			data: "idx",   				width: "5%",   className: "cursor-default",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "기기 ", 		data: "store",    	  		width: "10%",	className: "cursor-default" }
				,{title: "앱버전", 		data: "target_version",		width: "10%",  	className: "cursor-default" }
				,{title: "팝업명", 		data: "popup_name",	  		width: "30%",  	className: "cursor-default",
					render : function (data, type, row, meta) {
						let detailUrl = page.detailPopup + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "노출기간", 	data: "start_date",	  		width: "20%",  	className: "cursor-default",
					render: function (data, type, row, meta) {
						return `${row.start_date} ~ ${row.end_date}`;
					}
				}
				,{title: "등록일", 		data: "create_date",	  	width: "10%",  	className: "cursor-default",
					render: function (data, type, row, meta) {
						return data.substring(0, 10);
					}
				}
				,{title: "노출여부", 	data: "is_exposure",  		width: "8%",  	className: "cursor-default",
					render: function (data, type, row, meta) {
						return buildSwitch(row);
					}
				}
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
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
				style: 'multi',
				selector: ':checkbox'
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: false,
			initComplete: function () {
				$(this).on('page.dt', function (e, settings) { _page = getCurrentPage(this); });
				redrawPage(this, _page);
			},
			fnRowCallback: function( nRow, aData ) {
			}
			,drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"dateType" : dateType.val()
			,"keyword" : keyword.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildSwitch(data)
	{
		/** 노출여부 컬럼에 on off 스위치 **/
		let checked   = data.is_exposure === 'Y' ? 'checked' : '';
		return (
			`<div class="toggle-btn-wrap">
						<div class="toggle-btn on">
							<input onclick="changeStatus(this)" data-idx="${data.idx}" type="radio" class="checkbox ${checked}">
							<div class="knobs"></div>
							<div class="layer"></div>
						</div>
					</div>`
		)
	}

	let g_popup_idx;
	let g_is_exposure;
	function changeStatus(obj)
	{
		g_popup_idx = $(obj).data('idx');
		g_is_exposure = $(obj).hasClass('checked') ? 'N' : 'Y';
		sweetConfirm(`상태를 ${message.change}`, changeRequest);
	}

	function changeRequest()
	{
		let url     = api.updatePopup;
		let errMsg 	= label.modify+message.ajaxError;
		let param   = {
			"idx" : g_popup_idx,
			"is_exposure" : g_is_exposure
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), changeReqCallback, errMsg, false);
	}

	function changeReqCallback(data)
	{
		sweetToastAndCallback(data, reqSuccess);
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}

	function deletePopup()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deletePopup;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg, false);
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"idx" : selectedData.idx
		};

		return JSON.stringify(param)
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, reqSuccess);
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast(`삭제할 대상을 목록에서 ${message.select}`);
			return false;
		}

		return true;
	}

	function reqSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}
