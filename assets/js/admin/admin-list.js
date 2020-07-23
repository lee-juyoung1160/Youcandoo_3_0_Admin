
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
		$.ajax({
			url: api.listAuth,
			type: "POST",
			headers : headers,
			dataType: 'json',
			success: function(data) {
				if (isSuccessResp(data))
					buildAuthList(data)
				else
					sweetError(invalidResp(data));
			},
			error: function (request, status) {
				sweetError(label.list+message.ajaxLoadError);
			},
			complete: function (xhr, status) {
				/** 상단 검색 폼 초기화 **/
				initSearchForm();
				/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
				initPageLength();
				/** 목록 불러오기 **/
				buildGrid();
			}
		});
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
				{title: "", 		data: "idx",   				width: "5%",     className: "no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "권한", 	 	   data: "auth_name",     	  width: "10%",     className: "cursor-default" }
				,{title: "아이디", 	   data: "userid",     		  width: "10%",     className: "cursor-default" }
				,{title: "이름", 	   data: "name",     		  width: "10%",     className: "cursor-default" }
				,{title: "이메일", 	   data: "email",     		  width: "15%",     className: "cursor-default" }
				,{title: "최근접속일시", data: "recent_datetime",   width: "15%",     className: "cursor-default" }
				,{title: "사용여부",   data: "is_active",     	width: "10%",     className: "cursor-default no-sort" }
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
				initTableSorter(dataTable);
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

	function setRowAttributes(nRow, aData)
	{
		/** 사용여부 컬럼에 on off 스위치 **/
		let useYnDom  = $(nRow).children().eq(6);
		let checked   = aData.is_active === 'Y' ? 'checked' : '';
		let switchDom = '';
		switchDom += '<div class="toggle-btn-wrap">';
		switchDom += 	'<div class="toggle-btn on">';
		switchDom += 		'<input onclick="changeStatus(this)" data-userid="'+aData.userid+'" type="radio" class="checkbox ' +checked+'">';
		switchDom += 		'<div class="knobs"></div>';
		switchDom += 		'<div class="layer"></div>';
		switchDom += 	'</div>';
		switchDom += '</div>';

		$(useYnDom).html(switchDom);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

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
		$.ajax({
			url: changeApi,
			type: "POST",
			dataType: 'json',
			global: false,
			headers: headers,
			data: JSON.stringify({"userid" : targetAdmin}),
			success: function(data) {
				sweetToastAndCallback(data, successCallback);
			},
			error: function (request, status) {
				sweetError(label.modify+message.ajaxError);
			}
		});
	}

	function deleteAdmin()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		$.ajax({
			url: api.deleteAdmin,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: delParams(),
			success: function(data) {
				sweetToastAndCallback(data, successCallback);
			},
			error: function (request, status) {
				sweetError(label.delete+message.ajaxError);
			},
		});
	}

	function successCallback()
	{
		tableReloadAndStayCurrentPage(dataTable);
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

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"adminid" : selectedData.userid
		};

		return JSON.stringify(param)
	}
