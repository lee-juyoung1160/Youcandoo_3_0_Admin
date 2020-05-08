
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
	const btnTop		= $("#btnTop");
	const topIcon		= '<i class="question-mark far fa-question-circle"><span class="hover-text">상단고정은 최대 3개까지<br>등록이 가능합니다.</span></i>'
	let topCount		= 0;

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
		btnTop			.on("click", function () { toggleTop(); });
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
				{title: "No "+topIcon, 	data: "idx",    	  	   width: "10%",    	orderable: false,   className: "text-center" }
				,{title: "제목", 		data: "title",    	  	   width: "40%",  	orderable: false,   className: "text-center" }
				,{title: "노출여부", 	data: "is_exposure",  	   width: "10%",  	orderable: false,   className: "text-center",
					render: function (data) {
						return data === "Y" ? "노출" : "비노출";
					}
				}
				,{title: "작성일", 	    data: "created_datetime",  width: "20%",    orderable: false,   className: "text-center",
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

				/** 목록 상단 totol count **/
				dataNum.text(info.recordsTotal);

				dataTable.find('tbody').on( 'click', 'tr', function () {
					let rowData = table.row( this ).data();
					let isTop	= rowData.is_top;
					let iconTop = '<i class="fas fas fa-bell"></i>';

					if (isTop === 'Y')
					{
						btnTop.removeClass('best-btn');
						btnTop.addClass('delete-btn');
						btnTop.html(iconTop +'상단고정 해제');
					}
					else
					{
						btnTop.removeClass('delete-btn');
						btnTop.addClass('best-btn');
						btnTop.html(iconTop +'상단고정');
					}
				});
			},
			fnRowCallback: function( nRow, aData ) {
				console.log(aData);
				let isTop = aData.is_top;
				if (isTop === 'Y') topCount++;
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
			,"orderby" : selSort.val()
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let topDom	 = $(nRow).children().eq(0);
		let titleDom = $(nRow).children().eq(1);

		/** 제목에 a 태그 추가 **/
		$(titleDom).html('<a href="/notice/detail">'+aData.title+'</a>');

		/** 상단고정 **/
		if (aData.is_top === 'Y')
		{
			/** no컬럼에 숫자대신 아이콘 **/
			$(topDom).html('<i class="fas fas fa-bell"></i>');
		}
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	/** 상단 고정/해제 **/
	function toggleTop()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let isTop 		 = selectedData.is_top;
		let noticeUuid	 = selectedData.notice_uuid;
		let topParams = {
			"is_top" : isTop === 'Y' ? 'N' : 'Y'
			,"notice_uuid" : noticeUuid
		};

		if (isTop === 'N' && topCount > 2)
		{
			alert(message.overCntTop);
			return;
		}

		if (confirm(isTop === 'Y' ? message.deleteTop : message.insertTop))
		{
			$.ajax({
				url: "http://api.kakaokids.org/v1.0/admin/notice/changeTop",
				type: "POST",
				headers: headers,
				data: JSON.stringify(topParams),
				success: function(data) {

					if (getStatusCode(data) === 30000)
						buildGrid();
					else
						alert(data.message);
				},
				error: function (request, status) {
					console.log(status);
				},
			});
		}
	}