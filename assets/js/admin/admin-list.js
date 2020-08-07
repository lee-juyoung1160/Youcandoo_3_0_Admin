
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const authCode		= $("#auth_code");
	const selPageLength = $("#selPageLength");
	const select		= $("select");
	const btnDelete		= $("#btnDelete");

	$( () => {
		/** 권한 목록 불러오기 **/
		getAuthList();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnDelete		.on("click", function () { deleteAdmin(); });
	});

	function getAuthList()
	{
		let url 	= api.listAuth;
		let errMsg 	= label.list+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, null, authListSuccessCallback, errMsg, authListComplete);
	}

	function authListSuccessCallback(data)
	{
		isSuccessResp(data) ? buildAuthList(data) : sweetError(invalidResp(data));
	}

	function authListComplete()
	{
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 목록 불러오기 **/
		buildGrid();
	}

	function buildAuthList(data)
	{
		let details  = data.data;
		let optionDom = '<option value="">전체</option>';
		for (let i=0; i<details.length; i++)
		{
			let code = details[i].code;
			let name = details[i].name;

			optionDom += '<option value="'+code+'">'+name+'</option>';
		}

		authCode.html(optionDom);

		onChangeSelectOption(authCode);
	}

	function initSearchForm()
	{
		keyword.val('');
		initSelectOption();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listAdmin,
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
				{title: "", 		data: "idx",   				width: "5%",     className: "cursor-default no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "권한", 	 	   data: "auth_name",     	  width: "10%",     className: "cursor-default" }
				,{title: "아이디", 	   data: "userid",     		  width: "10%",     className: "cursor-default" }
				,{title: "이름", 	   data: "name",     		  width: "10%",     className: "cursor-default" }
				,{title: "이메일", 	   data: "email",     		  width: "15%",     className: "cursor-default" }
				,{title: "최근접속일시", data: "recent_datetime",   width: "15%",     className: "cursor-default" }
				,{title: "사용여부",    data: "is_active",     	  width: "10%",     className: "cursor-default no-sort",
					render: function (data, type, row, meta) {
						return buildSwitch(row);
					}
				}
			],
			language: {
				emptyTable : message.emptyList
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
			,"auth_code" : authCode.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildSwitch(data)
	{
		/** 사용여부 컬럼에 on off 스위치 **/
		let checked   = data.is_active === 'Y' ? 'checked' : '';
		let switchEl = '';
		switchEl += '<div class="toggle-btn-wrap">';
		switchEl += 	'<div class="toggle-btn on">';
		switchEl += 		'<input onclick="changeStatus(this)" data-userid="'+data.userid+'" type="radio" class="checkbox ' +checked+'">';
		switchEl += 		'<div class="knobs"></div>';
		switchEl += 		'<div class="layer"></div>';
		switchEl += 	'</div>';
		switchEl += '</div>';

		return switchEl;
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	/**********************
	 *   관리자 사용 여부 관련
	 * *******************/
	let changeApi;
	let targetAdmin;
	function changeStatus(obj)
	{
		changeApi 	= $(obj).hasClass('checked') ? api.inactiveAdmin : api.activeAdmin;
		targetAdmin = $(obj).data('userid');
		sweetConfirm('상태를 '+message.change, changeRequest);
	}

	function changeRequest()
	{
		let param   = JSON.stringify({"userid" : targetAdmin});
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, changeApi, param, reqCallback, errMsg, false);
	}

	/**********************
	 *   관리자 삭제 관련
	 * *******************/
	function deleteAdmin()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast('삭제할 대상을 목록에서 '+message.select);
			return false;
		}

		return true;
	}

	function deleteRequest()
	{
		let url 	= api.deleteAdmin;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), reqCallback, errMsg, false);
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"adminid" : selectedData.userid
		};

		return JSON.stringify(param)
	}

	function reqCallback(data)
	{
		sweetToastAndCallback(data, reqSuccess);
	}

	function reqSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}




