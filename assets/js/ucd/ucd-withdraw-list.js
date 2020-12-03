
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#searchType");
	const selMatch 		= $("#selMatch");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const btnXlsxOut 	= $("#btnXlsxOut");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 테이블 데이터 로드 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnXlsxOut		.on("click", function () { onClickXlsxOut(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		initSelectOption();
		initSearchDateRange();
		initMaxDateToday();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listWithdrawUcd,
				type:"POST",
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임", 		data: "nickname",    	   width: "25%" }
				/*,{title: "유형", 		data: "ucd_type",          width: "10%" }*/
				,{title: "출금액", 		data: "amount",    		   width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "내용", 		data: "description", 	   		width: "30%",    className: "no-sort" }
				,{title: "담당자", 		data: "created_user",      		width: "10%" }
				,{title: "출금일시", 		data: "created_datetime",  	width: "15%" }
				,{title: "메모", 		data: "memo",              		width: "5%",     className: "no-sort",
					render: function (data) {
						return buildMemo(data);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
			initComplete: function () {
				initTableSorter(this);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildMemo(data)
	{
		let memoEl = '';
		memoEl +=
			`<div class="tooltip">`
		if (!isEmpty(data))
			memoEl +=   '<i onmouseover="mouseoverMemo(this);" onmouseleave="mouseoutMemo(this);" class="fas fa-check-circle tooltip-mark on" style="cursor:pointer;"></i>';
		else
			memoEl +=   '<i class="fas fa-check-circle tooltip-mark" style="cursor: default;"></i>';
		memoEl +=
				`<div class="tooltip-hover-text" style="display: none;">
					<strong>memo</strong>
					<p>${data}</p>
				</div>
			</div>`

		return memoEl;
	}

	function mouseoverMemo(obj)
	{
		$(obj).siblings().show();
	}

	function mouseoutMemo(obj)
	{
		$(obj).siblings().hide();
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
			,"search_type" : searchType.val()
			,"keyword_type" : selMatch.val()
			,"keyword" : keyword.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}

	function onClickXlsxOut()
	{
		let totalRecords = getTotalRecordsFromDataTable(dataTable);
		if (totalRecords > label.maxDownLoadXlsxCount)
		{
			let msg = `최대 ${numberWithCommas(label.maxDownLoadXlsxCount)}건까지 다운로드 가능합니다.
						현재 ${numberWithCommas(totalRecords)}건`
			sweetToast(msg);
			return false;
		}

		let url = api.xlsxOutUcdWithdraw;
		let errMsg = label.list + message.ajaxLoadError;
		let param = {
			"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword_type" : selMatch.val()
			,"keyword" : keyword.val()
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), xlsxOutCallback, errMsg, false);
	}

	function xlsxOutCallback(data)
	{
		setExcelData(`${xlsxName.ucdWithdraw}_${dateFrom.val()}~${dateTo.val()}`, xlsxName.ucdWithdraw, data.data);
	}
