
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const status		= $("input[name=radio-status]");
	const jsonContainer = document.getElementById("jsonEditor");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 **/
		buildGrid();

		initJsonEditor();
		/** 이벤트 **/
		$("body")  		.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initJsonEditor()
	{
		const options = {}
		const editor = new JSONEditor(jsonContainer, options)
		const jsonData = {
			"Array": [1, 2, 3],
			"Boolean": true,
			"Null": null,
			"Number": 123,
			"Object": {"a": "b", "c": "d"},
			"String": "Hello World"
		}
		editor.set(jsonData)

		/*const updatedJson = editor.get()*/
	}

	function initSearchForm()
	{
		keyword.val('');
		status.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRange();
		initMaxDateToday();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listApiUrl,
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
				{title: "unique_id", 		data: "uniqueid",   		width: "20%",
					render: function (data, type, row, meta) {
						return `<a onclick="">${data}</a>`;
					}
				}
				,{title: "process", 	data: "process",   			width: "10%" }
				,{title: "remote_ip", 	data: "remote_ip",  		width: "10%",   className: "no-sort" }
				,{title: "@timestamp", 	data: "@timestamp",      	width: "15%",    className: "no-sort" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
			initComplete: function () {
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
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"data_type" : searchType.val()
			,"keyword" : keyword.val()
			,"status_type" : $('input:radio[name=radio-status]:checked').val()
		}

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}
