
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const faqType 		= $("#selFaqType");
	const exposure		= $("input[name=radio-exposure]");
	const btnDelete		= $("#btnDelete");

	$( () => {
		/** 구분 불러오기 **/
		getFaqType();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnDelete		.on("click", function () { deleteFaq(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		exposure.eq(0).prop("checked", true);
		initSelectOption();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();
		keyword.val(historyParams.keyword);
		searchType.val(historyParams.search_type);
		onChangeSelectOption(faqType);
		faqType.val(historyParams.searchType);
		onChangeSelectOption(faqType);
		exposure.each(function () {
			if ($(this).val() === historyParams.is_exposure)
				$(this).prop("checked", true);
		});
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);

		_page = historyParams.page;
	}

	function getFaqType()
	{
		let url 	= api.getFaqType;
		let errMsg 	= `구분 ${label.list} ${message.ajaxLoadError}`;

		ajaxRequestWithJsonData(true, url, null, getFaqTypeCallback, errMsg, completeCallback);
	}

	function getFaqTypeCallback(data)
	{
		isSuccessResp(data) ? buildFaqType(data) : sweetToast(invalidResp(data));
	}

	function buildFaqType(data)
	{
		let detail 		= data.data;
		let optionDom 	= '';

		for (let i=0; i<detail.length; i++)
		{
			let value = detail[i].type;
			let name  = detail[i].faq_name;

			optionDom += i === 0 ? '<option value="">전체</option>' : `<option value="${value}">${name}</option>`
		}

		faqType.html(optionDom);
		onChangeSelectOption(faqType);
	}

	function completeCallback()
	{
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 목록 **/
		buildGrid();
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
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 		data: "idx",   				width: "5%",	className: "cursor-default no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "구분", 		data: "faq_type",   		width: "10%",   className: "cursor-default " }
				,{title: "제목", 	data: "title",   			width: "30%",   className: "cursor-default",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailFaq + row.idx;
						return '<a href="'+detailUrl+'">' + data + '</a>';
					}
				}
				,{title: "노출여부", data: "is_exposure",  		width: "10%",   className: "cursor-default no-sort",
					render: function (data) {
						return data === "Y" ? label.exposure : label.unexpose;
					}
				}
				,{title: "작성자", 	data: "created_user",      	width: "15%",    className: "cursor-default no-sort" }
				,{title: "작성일", 	data: "created_datetime",  	width: "15%",    className: "cursor-default",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
			],
			language: {
				emptyTable: message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
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
			fixedHeader: false,
			destroy: false,
			initComplete: function () {
				$(this).on('page.dt', function (e, settings) { _page = getCurrentPage(this); });
				redrawPage(this, _page);
				initTableSorter(this);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"search_type" : searchType.val()
			,"faq_type" : faqType.val()
			,"keyword" : keyword.val()
			,"is_exposure" : $('input:radio[name=radio-exposure]:checked').val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function deleteFaq()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteFaq;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg, false);
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"faq_uuid" : selectedData.faq_uuid
		};

		return JSON.stringify(param);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
	}

	function deleteSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast(`삭제할 대상을 목록에서 ${message.select}`);
			return false;
		}

		return true;
	}
