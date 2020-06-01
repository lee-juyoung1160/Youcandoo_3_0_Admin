
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const select		= $("select");
	const doitStatus	= $("input[name=chk-status]");
	const dataNum		= $(".data-num");

	$(document).ready(function () {
		/** 페이지 접근권한 체크 **/
		checkAuthIntoPage();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 테이블 데이터 로드 **/
		buildGrid();
		/** 이벤트 **/
		$("body")    	.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		xlsxExport		.on("click", function () { onClickExcelBtn(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});
		doitStatus.prop('checked', true);
		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	function buildGrid()
	{
		$('#dataTable').DataTable({
			ajax : {
				url: api.listDoit,
				type: "POST",
				headers: headers,
				data: function (d) {
					/*
					if (d.order.length > 0)
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
				{title: "두잇 유형", 		data: "promotion_uuid", 		width: "15%",   orderable: false,   className: "text-center",
					render: function (data) {
						return isEmpty(data) ? label.regular : label.promotion;
					}
				}
				,{title: "두잇명", 			data: "doit_title",    			width: "30%",    orderable: false,   className: "text-center" }
				,{title: "인증 기간", 		data: "action_start_datetime",  width: "25%",   orderable: false,   className: "text-center" }
				,{title: "참여인원/모집인원", 	data: "doit_member",    	 	width: "15%",   orderable: false,   className: "text-center" }
				/*,{title: "진행상태", 		data: "created",    width: "15%",    orderable: false,   className: "text-center",
					render: function (data) {
						return data.substring(0, 10);
					}
				}*/
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
			processing: true,
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
				let table = $('#dataTable').DataTable();
				let info = table.page.info();

				$(".data-num").text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom  	 = $(nRow).children().eq(1);
		let periodDom  	 = $(nRow).children().eq(2);
		let constUserDom = $(nRow).children().eq(3);
		let detailUrl 	 = page.detailDoit+aData.idx;

		/** 제목에 a 태그 추가 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.doit_title+'</a>');
		/** 인증기간 **/
		$(periodDom).html(aData.action_start_datetime+' ~ ' +aData.action_end_datetime);
		/** 참여인원/모집인원 **/
		$(constUserDom).html(aData.doit_member+' / ' +aData.max_user);
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

