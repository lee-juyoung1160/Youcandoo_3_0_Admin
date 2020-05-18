
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
	/*const selSort		= $("#selSort");*/
	const btnTop		= $("#btnTop");
	const tooltipTop	= '<i class="question-mark far fa-question-circle"><span class="hover-text">상단고정은 최대 3개까지<br>등록이 가능합니다.</span></i>';
	let iconTop 		= '<i class="fas fas fa-bell"></i>';
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
		topCount = 0;
		dataTable.DataTable({
			ajax : {
				url: api.listNotice,
				type: "POST",
				async: false,
				headers: headers,
				data: function (d) {
					return tableParams(d);
				}
			},
			columns: [
				{title: "", 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				}
				,{title: "No "+tooltipTop, 	data: "idx",    	  	width: "10%",   orderable: false,   className: "text-center" }
				,{title: "제목", 			data: "title",    	  	width: "40%",  	orderable: false,   className: "text-center" }
				,{title: "노출여부", 		data: "is_exposure",  	width: "10%",  	orderable: false,   className: "text-center",
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
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing : message.searching
				,paginate: {
					previous: '<i class="fas fa-angle-double-left"></i>'
					,next: '<i class="fas fa-angle-double-right"></i>'
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
		let topDom	 = $(nRow).children().eq(1);
		let titleDom = $(nRow).children().eq(2);
		let isTop	 = aData.is_top;
		let detailUrl = '/service/notice/detail/'+aData.idx;

		/** 제목에 a 태그 추가 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.title+'</a>');

		/** 상단고정 **/
		if (isTop === 'Y')
		{
			topCount++;

			/** no컬럼에 숫자대신 아이콘 **/
			$(topDom).html('<i class="fas fas fa-bell"></i>');
		}
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

	function disableStatusBtnTop()
	{
		btnTop.removeClass('delete-btn');
		btnTop.removeClass('best-btn');
		btnTop.addClass('btn-disabled');
		btnTop.html(iconTop +'상단고정');
	}

	function bestStatusBtnTop()
	{
		btnTop.removeClass('btn-disabled');
		btnTop.removeClass('delete-btn');
		btnTop.addClass('best-btn');
		btnTop.html(iconTop +'상단고정');
	}

	function deleteStatusBtnTop()
	{
		btnTop.removeClass('btn-disabled');
		btnTop.removeClass('best-btn');
		btnTop.addClass('delete-btn');
		btnTop.html(iconTop +'상단고정 해제');
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
				url: api.topNotice,
				type: "POST",
				headers: headers,
				async: false,
				data: JSON.stringify(topParams),
				success: function(data) {

					if (isSuccessResp(data))
					{
						disableStatusBtnTop();
						dataTable.DataTable().draw();
					}
					else
						alert(invalidResp(data));
				},
				error: function (request, status) {
					console.log(status);
				},
			});
		}
	}
