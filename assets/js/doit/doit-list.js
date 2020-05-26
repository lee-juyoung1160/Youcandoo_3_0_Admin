
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#dateType");
	const searchType 	= $("#searchType");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const select		= $("select");
	const dataNum		= $(".data-num");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 테이블 데이터 로드 **/
		//buildGrid();

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
				{title: "닉네임", 	data: "nickname",    name: "nickname",    orderable: false,   className: "text-center" }
				,{title: "등록일", 	data: "created",     name: "created",     orderable: false,   className: "text-center",
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
					previous: '<i class="fas fa-angle-double-left"></i>'
					,next: '<i class="fas fa-angle-double-right"></i>'
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
				//setRowAttributes(nRow, aData);
				console.log(aData);
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : d.start + 1
			,"date_type" : $("#date_type").val()
			,"from_date" : $(".date_from").val()
			,"to_date" : $(".date_to").val()
			,"search_type" : $("#search_type").val()
			,"keyword" : $("#keyword").val()
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
		getList();
	}

