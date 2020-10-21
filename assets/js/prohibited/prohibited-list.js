
	const search 			= $(".search");
	const reset 			= $(".reset");
	const dataTable			= $("#dataTable")
	const keyword			= $("#keyword");
	const selPageLength 	= $("#selPageLength");
	const btnDelete			= $("#btnDelete");
	/** modal **/
	const btnOpenModal		= $("#btnOpenModal");
	const btnSubmit			= $("#btnSubmit");
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const prohibition		= $("#prohibition");

	$( () => {
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnOpenModal	.on('click', function () { onClickModalOpen(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmit		.on('click', function () { onSubmitProhibition(); });
		btnDelete		.on("click", function () { deleteProhibition(); });
	});

	function initSearchForm()
	{
		keyword.val('');
	}

	function onClickModalOpen()
	{
		modalFadein();
		initModal();
	}

	function initModal()
	{
		prohibition.val('');
		prohibition.trigger('focus');
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listProhibition,
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
				{title: tableCheckAllDom(), 	data: "idx",   width: "5%",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				}
				,{title: "금칙어", 	data: "word",    	  	   width: "80%" }
				,{title: "등록일", 	data: "created_datetime",  width: "15%",
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
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			/*pagingType: "simple_numbers_no_ellipses",*/
			destroy: false,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			ordering: false,
			order: [],
			info: false,
			processing: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			initComplete: function () {
				uncheckedCheckAllAfterMovePage(this);
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
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"keyword" : keyword.val().trim()
			,"limit" : Number(selPageLength.val())
			,"page" : _page
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	/** 금칙어 등록 **/
	function onSubmitProhibition()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let url = api.createProhibition;
		let errMsg = label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, createParams(), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		modalFadeout();
		onSubmitSearch();
	}

	function createParams()
	{
		let inputValue = prohibition.val();
		let inputValues = inputValue.split(",");
		let paramValues = [];

		/** 공백 제거 **/
		for (let i=0; i<inputValues.length; i++)
		{
			if (!isEmpty(inputValues[i]))
				paramValues.push(inputValues[i].trim());
		}

		let param = {
			"word" : paramValues.toString()
		};

		return JSON.stringify(param);
	}

	function validation()
	{
		if (isEmpty(prohibition.val().trim()))
		{
			sweetToast(`금칙어는 ${message.required}`)
			prohibition.trigger('focus');
			return false;
		}

		return true;
	}

	/** 금칙어 삭제 **/
	function deleteProhibition()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteProhibition;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg, false);
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
		let selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			sweetToast(`대상을 목록에서 ${message.select}`);
			return false;
		}

		return true;
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		let params = [];
		for (let i=0; i<selectedData.length; i++)
		{
			let idx = selectedData[i].idx;
			params.push(idx);
		}

		let delParam = {
			"idx_list" : params
		};

		return JSON.stringify(delParam)
	}