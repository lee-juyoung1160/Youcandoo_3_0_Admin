
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
		/** 문의구분 셀렉트 박스 **/
		getQnaType();
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

	function getQnaType()
	{
		$.ajax({
			url: api.getQnaType,
			type: "POST",
			headers: headers,
			dataType: 'json',
			success: function(data) {
				if (isSuccessResp(data))
					buildQnaType(data);
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert('구분 '+label.list+message.ajaxLoadError);
			}
		});
	}

	function buildQnaType(data)
	{
		let details = data.data;
		let optionDom = '<option value="">전체</option>';
		for (let i=0; i<details.length; i++)
		{
			let value = details[i].type;
			let name  = details[i].qna_name;

			optionDom += '<option value="'+value+'">'+name+'</option>';
		}

		selQnaType.html(optionDom);
		onChangeSelectOption(selQnaType);
	}

	function initSearchForm()
	{
		keyword.val('');
		status.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRange();
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
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "No ", 	 	data: "idx",				width: "5%",   orderable: false,   className: "text-center" }
				,{title: "작성자", 	 data: "nickname",			width: "10%",   orderable: false,   className: "text-center" }
				,{title: "문의구분",  data: "qna_name",    		width: "10%",  	orderable: false,   className: "text-center" }
				,{title: "제목",  	 data: "title",    			width: "30%",  	orderable: false,   className: "text-center" }
				,{title: "등록일", 	 data: "created_datetime",  width: "15%",    orderable: false,   className: "text-center",
					render: function (data) {
						return data.substring(0, 10);
					}
				},
				{title: "답변상태",    data: "status",  			width: "10%",  	orderable: false,   className: "text-center",
					render: function (data) {
						return data === "0" ? "답변대기" : "답변완료";
					}
				}
				,{title: "처리자",  	 data: "admin_userid",    	width: "10%",  	orderable: false,   className: "text-center" }
				,{title: "메모",  	 data: "memo",    			width: "10%",  	orderable: false,   className: "text-center",
					render: function (data) {
						return !isEmpty(data) ? label.memo : '-';
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

				/** 목록 상단 totol count **/
				dataNum.html(info.recordsTotal);
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
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom  = $(nRow).children().eq(3);
		let detailUrl = aData.status === '0' ? '/service/inquiry/update/'+aData.idx : '/service/inquiry/detail/'+aData.idx;

		/** 제목에 a 태그 추가 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.title+'</a>');
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

