
	const search 			= $(".search");
	const reset 			= $(".reset");
	const dataTable			= $("#dataTable")
	const keyword			= $("#keyword");
	const selPageLength 	= $("#selPageLength");
	const dataNum			= $(".data-num");
	const prohibition		= $("#prohibition");
	//const btnTop		= $("#btnTop");
	/** modal **/
	const btnOpenModal		= $("#btnOpenModal");
	const btnSubmit			= $("#btnSubmit");
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");

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
		//btnTop			.on("click", function () { toggleTop(); });
	});

	function initSearchForm()
	{
		keyword.val('');
	}

	function initModal()
	{

	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listProhibition,
				type: "POST",
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
				{title: "No", 		data: "idx",    	  	   width: "10%",    orderable: false,   className: "text-center" }
				,{title: "금칙어", 	data: "word",    	  	   width: "75%",  	orderable: false,   className: "text-center" }
				,{title: "등록일", 	data: "created_datetime",  width: "15%",    orderable: false,   className: "text-center",
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
			},
			fnRowCallback: function( nRow, aData ) {
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"keyword" : keyword.val()
			/*
			,"limit" : d.length
			,"page" : (d.start / d.length) + 1
			*/
		}

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	function onSubmitProhibition()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createProhibition,
					type: "POST",
					headers: headers,
					data: params(),
					success: function(data) {

						if (getStatusCode(data) === 30000)
						{
							modalFadeout();
							buildGrid();
						}
						else
							alert(data.message);
					},
					error: function (request, status) {
						console.log(status);
					},
				});
			}
		}
	}

	function params()
	{
		let param = {
			"word": prohibition.val()
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

	/** 금칙어 등록 **/
	function toggleTop()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let isTop 		 = selectedData.idx;
		let delParams = {
			"is_top" : isTop === 'Y' ? 'N' : 'Y'
		};

		if (isTop === 'N' && topCount > 2)
		{
			alert(message.overCntTop);
			return;
		}

		if (confirm(isTop === 'Y' ? message.deleteTop : message.insertTop))
		{
			$.ajax({
				url: api.deleteProhibition,
				type: "POST",
				headers: headers,
				data: JSON.stringify(delParams),
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