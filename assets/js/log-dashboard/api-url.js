
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const status		= $("input[name=radio-status]");
	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const jsonContainer = document.getElementById("jsonEditor");
	let jsonEditor;

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
		/** jsonEditor 초기화 **/
		initJsonEditor();
		/** 이벤트 **/
		$("body")  		.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
	});

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
				{title: "unique_id", 		data: "uniqueid",   		width: "22%" }
				,{title: "account_token", 	data: "account_token",   	width: "22%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "url", 			data: "apache_request",   	width: "15%" }
				,{title: "remote_ip", 		data: "remote_ip",  		width: "10%" }
				,{title: "status", 			data: "apache_status",  	width: "5%" }
				,{title: "@timestamp", 		data: "@timestamp",      	width: "15%" }
				,{title: "응답/요청", 		data: "uniqueid",      		width: "5%",
					render: function (data, type, row, meta) {
						return data.length > 1 ? `<a onclick="viewDetail(this);" id="${data}">보기</a>` : label.dash;
					}
				}
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

	function viewDetail(obj)
	{
		let url = api.detailApiUrl;
		let errMsg = message.ajaxError;
		let param = {
			"uniqueid" : obj.id
			,"page" : 1
			,"limit" : 1
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), viewDetailSuccess, errMsg, false);
	}

	function viewDetailSuccess(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
	}

	function buildDetail(data)
	{
		modalFadein();
		setJsonEditor(data);
	}

	function initJsonEditor()
	{
		/*const editorOptions = {
			"search" : false
			,"navigationBar" : false
		};
		jsonEditor = new JSONEditor(jsonContainer, editorOptions);*/
	}

	function setJsonEditor(data)
	{
		jsonContainer.innerHTML = '';
		const editorOptions = {
			"mode" : "text"
			,"search" : false
		};
		jsonEditor = new JSONEditor(jsonContainer, editorOptions);
		jsonEditor.set(data.data);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}
