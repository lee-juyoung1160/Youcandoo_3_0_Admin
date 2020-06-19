
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const faqType 		= $("#selFaqType");
	const inputRadio	= $("input:radio");
	const select		= $("select");
	const btnDelete		= $("#btnDelete");

	$(document).ready(function () {
		/** 구분 불러오기 **/
		getFaqType()
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")    	.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnDelete		.on("click", function () { deleteFaq(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		inputRadio.each(function (index) {
			if (index === 0)
				$(this).prop("checked", true);
		});
		initSelectOption();
	}

	let _page = 1;
	let _limit = Number(selPageLength.val());
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();
		keyword.val(historyParams.keyword);
		searchType.val(historyParams.search_type);
		faqType.val(historyParams.faq_type);
		onChangeSelectOption(faqType);
		$("input[name=radio-exposure]").each(function () {
			if ($(this).val() === historyParams.is_exposure)
				$(this).prop("checked", true);
		});

		_page = historyParams.page;
		_limit = historyParams.limit;
	}

	function getFaqType()
	{
		$.ajax({
			url: api.getFaqType,
			type: "POST",
			async: false,
			headers: headers,
			dataType: 'json',
			success: function(data) {
				if (isSuccessResp(data))
					buildFaqType(data);
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert('구분 '+label.list+message.ajaxLoadError);
			}
		});
	}

	function buildFaqType(data)
	{
		let detail 		= data.data;
		let optionDom 	= '<option value="">전체</option>';

		for (let i=0; i<detail.length; i++)
		{
			let value = detail[i].type;
			let name  = detail[i].faq_name;

			optionDom += '<option value="'+value+'">'+name+'</option>';
		}

		faqType.html(optionDom);
		onChangeSelectOption(faqType);
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listFaq,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 		data: "idx",   			width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "구분", 	data: "faq_type",   	width: "10%", 		orderable: false,   className: "text-center cursor-default" }
				,{title: "제목", 	data: "title",   		width: "35%",    	orderable: false,   className: "text-center cursor-default" }
				,{title: "노출여부", data: "is_exposure",  	width: "10%",  	   	orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return data === "Y" ? label.exposure : label.unexpose;
					}
				}
				,{title: "작성자", 	data: "created_user",      width: "15%",    	orderable: false,   className: "text-center cursor-default" }
				,{title: "작성일", 	data: "created_datetime",  width: "10%",   	orderable: false,   className: "text-center cursor-default",
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
				dataTable.on('page.dt', function (e, settings) {
					let info = table.page.info();
					_page = (info.start / info.length) + 1;
					_limit = info.length;
				});

				table.page(_page-1).draw( 'page' );
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(dataTable);
			}
		});
	}

	function tableParams()
	{
		let param = {
			"limit" : _limit
			,"page" : _page
			,"search_type" : searchType.val()
			,"faq_type" : faqType.val()
			,"keyword" : keyword.val()
			,"is_exposure" : $('input:radio[name=radio-exposure]:checked').val()
		}

		/** localStorage에 정보 저장 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom  = $(nRow).children().eq(2);
		let detailUrl = page.detailFaq+aData.idx;

		/** 제목에 클릭 상세 이동 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.title+'</a>');
	}

	function onSubmitSearch()
	{
		_page = 1;
		reloadTable(dataTable);
	}

	function deleteFaq()
	{
		if (delValidation())
		{
			if (confirm(message.delete))
			{
				$.ajax({
					url: api.deleteFaq,
					type: "POST",
					async: false,
					headers: headers,
					dataType: 'json',
					data: delParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							tableReloadAndStayCurrentPage(dataTable);
					},
					error: function (request, status) {
						alert(label.delete+message.ajaxError);
					},
				});
			}
		}
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			alert('삭제할 대상을 목록에서 '+message.select);
			return false;
		}

		return true;
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"faq_uuid" : selectedData.faq_uuid
		};

		return JSON.stringify(param)
	}
