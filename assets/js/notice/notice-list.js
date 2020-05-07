
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
	const topIcon		= '<i class="question-mark far fa-question-circle"><span class="hover-text">상단고정은 최대 3개까지<br>등록이 가능합니다.</span></i>'

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
				url:"http://api.kakaokids.org/v1.0/admin/notice/list",
				type:"POST",
				headers: headers,
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
				{title: "No "+topIcon, 	data: "idx",    	  	   name: "idx",    	    	   orderable: false,   className: "text-center" }
				,{title: "제목", 		data: "title",    	  	   name: "title",    		   orderable: false,   className: "text-center" }
				,{title: "노출여부", 	data: "is_exposure",  	   name: "is_exposure",  	   orderable: false,   className: "text-center",
					render: function (data) {
						return data === "Y" ? "노출" : "비노출";
					}
				}
				,{title: "작성일", 	    data: "created_datetime",  name: "created_datetime",   orderable: false,   className: "text-center",
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
			select: 'single',
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
				setRowAttributes(nRow, aData);
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"fromDate" :dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
			,"isExposure" : $('input:radio[name=radio-exposure]:checked').val()
			,"orderby" : selSort.val()
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom = $(nRow).children().eq(1);
		//let movePageUrl = 'javascript:movePageUrl(\'/mod/doit/'+aData.doit_id+'\')';

		// 제목에 a 태그 추가
		$(titleDom).html('<a href="/notice/detail">'+aData.title+'</a>');
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

