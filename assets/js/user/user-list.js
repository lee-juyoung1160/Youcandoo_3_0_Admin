
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const inputRadio	= $("input:radio");
	const inputCheck	= $("input:checkbox");
	const select		= $("select");
	const dataNum		= $(".data-num");

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
		selPageLength	.on("change", function () { buildGrid(); });
		xlsxExport		.on("click", function () { onClickExcelBtn(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initSearchForm()
	{
		keyword.val('');
		inputRadio.each(function (index) {
			if (index === 0)
				$(this).prop("checked", true);
		});
		inputCheck.prop("checked", true);
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});

		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	function buildGrid()
	{
		$("#dataTable").DataTable({
			ajax : {
				url: api.listUser,
				type:"POST",
				async: false,
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
				},
				error: function(xhr, status, err) {
					alert(message.cantLoadList);
				}
			},
			columns: [
				{title: "", 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "닉네임", 		data: "nickname",   width: "25%",    orderable: false,   className: "text-center" }
				,{title: "전화번호", 	data: "phone",   	width: "25%",    orderable: false,   className: "text-center" }
				,{title: "가입일", 		data: "created",    width: "25%",    orderable: false,   className: "text-center",
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
				let table = dataTable.DataTable();
				let info = table.page.info();
				/** 목록 상단 totol count **/
				dataNum.text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
				//setRowAttributes(nRow, aData);
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
			,"member_type" : "active"
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom = $(nRow).children().eq(1);

		/** 제목에 a 태그 추가 **/
		titleDom.html('<a href="#">'+aData.nickname+'</a>');
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
			url: api.listUser,
			type: "POST",
			async: false,
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("회원목록", "회원목록", data);
			},
			error: function (request, status) {
				console.log(status);
			},
		});
	}

	function excelParams()
	{
		let param = {
			"limit" : 20000
			,"page" : 1
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"member_type" : "active"
		}

		return JSON.stringify(param);
	}



