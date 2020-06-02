
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const inputRadio	= $("input:radio");
	const inputCheck	= $("input:checkbox");
	const select		= $("select");
	const dataNum		= $(".data-num");
	const selSort		= $("#selSort");

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
		dataTable.DataTable({
			ajax : {
				url: api.listFaq,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function (request, status) {
					alert(message.ajaxError);
				}
			},
			columns: [
				{title: "No", 		data: "idx",   	 		width: "10%",      	orderable: false,   className: "text-center" }
				,{title: "구분", 	data: "faq_type",   	width: "10%", 		orderable: false,   className: "text-center" }
				,{title: "제목", 	data: "title",   		width: "35%",    	orderable: false,   className: "text-center" }
				,{title: "노출여부", data: "is_exposure",  	width: "10%",  	   	orderable: false,   className: "text-center",
					render: function (data) {
						return data === "Y" ? "노출" : "비노출";
					}
				}
				,{title: "작성자", 	data: "created_user",      width: "15%",    	orderable: false,   className: "text-center" }
				,{title: "작성일", 	data: "created_datetime",  width: "10%",   	orderable: false,   className: "text-center",
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
			select: false,
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
				setRowAttributes(nRow, aData);
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
		$(nRow).attr('onClick', 'goDetail('+aData.idx+')');
	}

	function goDetail(idx)
	{
		location.href = page.detailFaq+idx;
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

