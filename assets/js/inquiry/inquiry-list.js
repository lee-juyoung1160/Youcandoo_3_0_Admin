
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selQnaType	= $("#selQnaType");
	const selPageLength = $("#selPageLength");
	const select		= $("select");
	const status		= $("input[name=radio-status]");
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
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initSearchForm()
	{
		keyword.val('');
		status.eq(0).prop("checked", true);
		searchType.children().eq(0).prop("selected", true);
		onChangeSelectOption(searchType);
		selQnaType.children().eq(0).prop("selected", true);
		onChangeSelectOption(selQnaType);

		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listQna,
				type: "POST",
				async: false,
				headers: headers,
				data: function (d) {
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
				}
				,{title: "No ", 	data: "idx",	width: "10%",   orderable: false,   className: "text-center" }
				/*,{title: "제목", 			data: "title",    	  	width: "40%",  	orderable: false,   className: "text-center" }
				,{title: "노출여부", 		data: "is_exposure",  	width: "10%",  	orderable: false,   className: "text-center",
					render: function (data) {
						return data === "Y" ? "노출" : "비노출";
					}
				}
				,{title: "작성일", 	    data: "created_datetime",  width: "20%",    orderable: false,   className: "text-center",
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
				/** row select **/
				dataTable.on('select.dt', function ( e, dt, type, indexes ) { onSelectRow(dt, indexes) });
				/** row deselect **/
				dataTable.on('deselect.dt', function ( e, dt, type, indexes ) { onDeselectRow(table) });
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
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"qna_type" : selQnaType.val()
			,"status" : $("input:radio[name=radio-status]:checked").val()
			,"orderby" : "desc"
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom = $(nRow).children().eq(2);
		let detailUrl = '/service/qna/detail/'+aData.idx;
console.log(aData)
		/** 제목에 a 태그 추가 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.title+'</a>');
	}

	/** row select **/
	function onSelectRow(dt, indexes)
	{
		let selectedData 	= dt.rows(indexes).data()[0];
		let isTop			= selectedData.is_top;

		if (isTop === 'Y')
			deleteStatusBtnTop();
		else
			bestStatusBtnTop();
	}

	/** row deselect **/
	function onDeselectRow(table)
	{
		let selectedData = table.rows('.selected').data()[0];
		if (isEmpty(selectedData))
			disableStatusBtnTop();
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

