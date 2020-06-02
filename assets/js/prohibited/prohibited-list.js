
	const search 			= $(".search");
	const reset 			= $(".reset");
	const dataTable			= $("#dataTable")
	const keyword			= $("#keyword");
	const selPageLength 	= $("#selPageLength");
	const dataNum			= $(".data-num");
	const btnDelete			= $("#btnDelete");
	/** modal **/
	const btnOpenModal		= $("#btnOpenModal");
	const btnSubmit			= $("#btnSubmit");
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const prohibition		= $("#prohibition");

	$(document).ready(function () {
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
		btnOpenModal	.on('click', function () { modalFadein(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmit		.on('click', function () { onSubmitProhibition(); });
		btnDelete		.on("click", function () { deleteProhibition(); });
	});

	function initSearchForm()
	{
		keyword.val('');
	}

	function initModal()
	{
		prohibition.val('');
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listProhibition,
				type: "POST",
				async: false,
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function (request, status) {
					alert(message.ajaxError);
				}
			},
			columns: [
				{title: tableCheckAllDom(), 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				}
				,{title: "금칙어", 	data: "word",    	  	   width: "80%",  	orderable: false,   className: "text-center cursor-default" }
				,{title: "등록일", 	data: "created_datetime",  width: "15%",    orderable: false,   className: "text-center cursor-default",
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
				style: 'multi',
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
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"keyword" : keyword.val().trim()
			,"limit" : d.length
			,"page" : (d.start / d.length) + 1
		}

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	/** 금칙어 등록 **/
	function onSubmitProhibition()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createProhibition,
					type: "POST",
					async: false,
					headers: headers,
					dataType: 'json',
					data: addParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
						{
							modalFadeout();
							buildGrid();
						}
						else
							alert(invalidResp(data));
					},
					error: function (request, status) {
						alert(message.ajaxError);
					},
				});
			}
		}
	}

	function addParams()
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
		}

		return JSON.stringify(param);
	}

	function validation()
	{
		if (isEmpty(prohibition.val()))
		{
			alert('금칙어는 '+message.required)
			prohibition.focus();
			return false;
		}

		return true;
	}

	/** 금칙어 삭제 **/
	function deleteProhibition()
	{
		if (delValidation())
		{
			if (confirm(message.delete))
			{
				$.ajax({
					url: api.deleteProhibition,
					type: "POST",
					async: false,
					headers: headers,
					dataType: 'json',
					data: delParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							buildGrid();
					},
					error: function (request, status) {
						alert(message.ajaxError);
					},
				});
			}
		}
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

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