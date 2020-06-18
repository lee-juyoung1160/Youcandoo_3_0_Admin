
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const authCode		= $("#auth_code");
	const selPageLength = $("#selPageLength");
	const select		= $("select");
	const btnDelete		= $("#btnDelete");

	$(document).ready(function () {
		/** 권한 목록 불러오기 **/
		getAuthList();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")    	.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
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
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert(label.list+message.ajaxLoadError);
			}
		});
	}

	function buildAuthList(data)
	{
		let details  = data.data;
		let optionDom = '';
		for (let i=0; i<details.length; i++)
		{
			let code = details[i].code;
			let name = details[i].name;
			if (i === 0)
			{
				$('#authCodeLabel').text('전체');
				optionDom += '<option value="">전체</option>';
			}

			optionDom += '<option value="'+code+'">'+name+'</option>';
		}

		authCode.html(optionDom);
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
				{title: "", 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "권한", 	 	 data: "auth_name",     	width: "10%",     orderable: false,   className: "text-center cursor-default" }
				,{title: "아이디", 	 data: "userid",     		width: "10%",     orderable: false,   className: "text-center cursor-default" }
				,{title: "이름", 	 data: "name",     			width: "10%",     orderable: false,   className: "text-center cursor-default" }
				,{title: "이메일", 	 data: "email",     		width: "15%",     orderable: false,   className: "text-center cursor-default" }
				,{title: "최근접속일", data: "recent_datetime",   width: "15%",     orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "사용여부",   data: "is_active",     	width: "10%",     orderable: false,   className: "text-center" }
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
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(dataTable);
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"auth_code" : authCode.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
		}

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
		reloadTable(dataTable);
	}
	
	function changeStatus(obj)
	{
		if (confirm('상태를 '+message.change))
		{
			$.ajax({
				url: $(obj).hasClass('checked') ? api.inactiveAdmin : api.activeAdmin,
				type: "POST",
				dataType: 'json',
				global: false,
				async: false,
				headers: headers,
				data: JSON.stringify({"userid" : $(obj).data('userid')}),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
						dataReloadAndStayCurrentPage(dataTable);
				},
				error: function (request, status) {
					alert(label.modify+message.ajaxError);
				}
			});
		}
	}

	function deleteAdmin()
	{
		if (delValidation())
		{
			if (confirm(message.delete))
			{
				$.ajax({
					url: api.deleteAdmin,
					type: "POST",
					async: false,
					headers: headers,
					dataType: 'json',
					data: delParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							dataReloadAndStayCurrentPage(dataTable);
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
			"adminid" : selectedData.userid
		};

		return JSON.stringify(param)
	}
