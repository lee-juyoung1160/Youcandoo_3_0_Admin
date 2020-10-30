
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const isReport 		= $("input[name=radio-report]");
	const selPageLength	= $("#selPageLength");
	const btnBlind		= $("#btnBlind");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
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
		/*btnBlind      	.on("click", function () { onClickBlind(); });*/
	});

	function initSearchForm()
	{
		keyword.val('');
		isReport.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRangeToday();
		initMaxDateToday();
		initDayBtn();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		searchType.val(historyParams.search_type);
		dateType.val(historyParams.date_type);
		onChangeSelectOption(dateType);
		searchType.val(historyParams.search_type);
		onChangeSelectOption(searchType);
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);
		isReport.each(function () {
			if ($(this).val() === historyParams.is_report)
				$(this).prop("checked", true);
		});

		_page = historyParams.page;
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listTalk,
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
				{title: tableCheckAllDom(), 	data: "",   	width: "5%",
					render: function (data, type, row, meta) {
						return multiCheckBoxDom(meta.row);
					}
				},
				{title: "작성자",    	data: "nickname",  		width: "15%",
					render: function (data, type, row, meta) {
						return `<a onclick="moveDetail(this);" data-uuid="${row.profile_uuid}" data-target="${page.detailAccount}">${data}</a>`;
					}
				}
				,{title: "유형",    		data: "type",  			width: "5%" }
				,{title: "구분",    		data: "divide",  		width: "5%" }
				,{title: "내용",    		data: "idx",  			width: "30%",
					render: function (data, type, row, meta) {
						let detailUrl = page.updateDoitRecommend + row.idx;
						return `<button onclick="location.href = '${detailUrl}'" class="btn-orange" type="button">수정</button>`;
					}
				}
				,{title: "신고",    		data: "report",  		width: "5%" }
				,{title: "두잇명",    	data: "doit_title",  	width: "15%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailDoit + row.doit_idx;
						return `<a href="${detailUrl}" >${data}</a>`;
					}
				}
				,{title: "블라인드",    	data: "is_blind",  			width: "5%" }
				,{title: "등록일시",    	data: "created_datetime",  	width: "10%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: false,
			initComplete: function (settings, json) {
				$(this).on('page.dt', function () {
					_page = getCurrentPage(this);
					uncheckedCheckAll();
				});
				redrawPage(this, _page);
			},
			fnRowCallback: function( nRow, aData, displayNum, displayIndex, dataIndex ) {
				/*setRowAttributes(nRow, aData, dataIndex)*/
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function setRowAttributes(nRow, aData, dataIndex)
	{
		$(nRow).attr('data-uuid', aData.recommend_uuid);
	}

	function tableParams()
	{
		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	let changeParams;
	function changeStatus(obj)
	{
		changeParams   = {
			"idx" : $(obj).data('idx'),
			"is_exposure" : $(obj).hasClass('checked') ? 'N' : 'Y'
		};

		sweetConfirm(`상태를 ${message.change}`, changeRequest);
	}

	function changeRequest()
	{
		let url     = api.exposureDoitRecommend;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, JSON.stringify(changeParams), changeStatusCallback, errMsg, false);
	}

	function changeStatusCallback(data)
	{
		sweetToastAndCallback(data, changeStatusSuccess);
	}

	function changeStatusSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	/** 추천두잇 삭제 **/
	let g_delete_idx;
	function deleteRecommend(idx)
	{
		g_delete_idx = idx;
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteDoitRecommend;
		let errMsg 	= label.delete+message.ajaxError;
		let param 	= { "idx" : g_delete_idx };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
	}

	function deleteSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}


	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}