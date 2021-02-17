
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#dateType");
	const selPageLength = $("#selPageLength");
	const isBanner 		= $("input[name=radio-banner]");
	const status 		= $("input[name=chk-status]");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화
		 *  메뉴클릭으로 페이지 진입 > 초기값 세팅
		 *  뒤로가기로 페이지 진입 > 이전 값 세팅
		 * **/
		isBackAction() ? setHistoryForm() : initSearchForm();
		/** 목록 테이블 **/
		buildGrid();
		/** 페이지 타이틀 **/
		initTitle();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		status			.on("click", function () { atLeastOneChecked(this); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initSearchForm()
	{
		isBanner.eq(0).prop("checked", true);
		status.prop("checked", true);
		initSelectOption();
		initSearchDateRangeThreeMonth();
		initMaxDateAfterThreeMonth();
		initDayBtn();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.fromDate);
		dateTo.val(historyParams.toDate);
		dateType.val(historyParams.dateType);
		onChangeSelectOption(dateType);
		status.each(function () {
			if (historyParams.status.indexOf($(this).val()) !== -1)
				$(this).prop("checked", true);
		});
		isBanner.each(function () {
			if ($(this).val() === historyParams.is_banner)
				$(this).prop("checked", true);
		});
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);

		_page = historyParams.page;
	}

	function initTitle()
	{
		$(".main-title").html(`${sessionDeptName.val()} 프로모션 목록`);
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listPromotion,
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
				{title: "프로모션명", 	data: "promotion_title",    width: "30%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailPromo + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "프로모션 예산", data: "budget_ucd",     	width: "15%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "잔여예산", 	data: "remain_budget_ucd", 	width: "15%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "프로모션 기간", data: "start_date",    	   	width: "15%",
					render: function (data, type, row, meta) {
						return `${row.start_date} ${label.tilde} ${row.end_date}`;
					}
				}
				,{title: "프로모션 상태", data: "status",   	 		width: "10%",    className: "no-sort",
					render: function (data) {
						return getPromotionStatusName(data);
					}
				}
				,{title: "공개 여부", 	data: "is_banner",    		width: "10%",    className: "no-sort",
					render: function (data) {
						return data === 'Y' ? label.exposure : label.unexpose;
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
			initComplete: function () {
				$(this).on('page.dt', function (e, settings) { _page = getCurrentPage(this); });
				redrawPage(this, _page);
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
	
	function tableParams()
	{
		let statusParam = [];
		status.each(function () {
			if ($(this).is(':checked'))
				statusParam.push($(this).val())
		});

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"dateType" : dateType.val()
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : "nickname"
			,"keyword" : sessionDeptName.val()
			,"is_banner" : $("input[name=radio-banner]:checked").val()
			,"status" : statusParam
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateAfterThreeMonth();
	}
