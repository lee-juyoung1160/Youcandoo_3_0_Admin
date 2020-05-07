
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const select		= $("select");
	const dataNum		= $(".data-num");
	const apiUrl		= "http://api.kakaokids.org/v1.0/admin/user/list";

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { getList(); });
		xlsxExport		.on("click", function () { onClickExcelBtn(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initSearchForm()
	{
		keyword.val('');
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});

		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: apiUrl,
				type: "POST",
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
				{title: "닉네임", 	data: "nickname",    name: "nickname",    orderable: false,   className: "text-center" }
				,{title: "등록일", 	data: "created",     name: "created",     orderable: false,   className: "text-center",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
			],
			language: {
				emptyTable : "조회된 목록이 없습니다."
				,zeroRecords: "조회된 목록이 없습니다."
				,processing : "검색 중.."
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
			select: 'multi',
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				let table = dataTable.DataTable();
				let info = table.page.info();

				dataNum.text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
				console.log(aData);
				//setRowAttributes(nRow, aData);
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"date_type" : "created"
			,"from_date" : "2020-04-01"
			,"to_date" : "2020-05-30"
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			//,type_opt : $('#selType').val()
		}

		return {"data": JSON.stringify(param)};
	}

	function setRowAttribute(nRow, aData)
	{
		let tdDom 	 = $(nRow).find('td');
		let titleDom = $(tdDom).eq(3);
		let movePageUrl = 'javascript:movePageUrl(\'/mod/doit/'+aData.doit_id+'\')';

		// 제목에 a 태그 추가
		$(titleDom).html('<a href="'+movePageUrl+'">'+aData.title+'</a>');
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	function onClickExcelBtn()
	{
		getList();
	}

	function getList()
	{
		$.ajax({
			url: apiUrl,
			type: "POST",
			data: excelParams(),
			success: function(data) {
				setExcelData("기업목록", "기업목록", data);
			},
			error: function (request, status) {
				console.log(request);
				console.log(status);
			},
		});
	}

	function excelParams()
	{
		let param = {
			"limit" : 10000
			,"page" : 1
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			//,type_opt : $('#selType').val()
		}

		return {"data": JSON.stringify(param)};
	}

