
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const authCode		= $("#auth_code");
	const selPageLength = $("#selPageLength");
	const select		= $("select");
	const dataNum		= $(".data-num");

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
				alert(message.ajaxError);
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
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});
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
					alert(message.ajaxError);
				}
			},
			columns: [
				{title: "권한", 	 	 data: "auth_name",     	width: "10%",     orderable: false,   className: "text-center cursor-default" }
				,{title: "아이디", 	 data: "userid",     		width: "10%",     orderable: false,   className: "text-center cursor-default" }
				,{title: "이름", 	 data: "name",     			width: "10%",     orderable: false,   className: "text-center cursor-default" }
				,{title: "이메일", 	 data: "email",     		width: "15%",     orderable: false,   className: "text-center cursor-default" }
				,{title: "최근접속일", data: "recent_datetime",   width: "15%",     orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "사용여부",   data: "is_active",     		width: "10%",     orderable: false,   className: "text-center",
					render: function (data) {
						let checked   = data === 'Y' ? 'checked' : '';
						let chkBoxDom = '';
						chkBoxDom += '<div class="toggle-btn-wrap">';
						chkBoxDom += 	'<div class="toggle-btn on">';
						chkBoxDom += 		'<input onchange="changeStatus(this)" type="checkbox" class="checkbox" '+checked+'>';
						chkBoxDom += 		'<div class="knobs"></div>';
						chkBoxDom += 		'<div class="layer"></div>';
						chkBoxDom += 	'</div>';
						chkBoxDom += '</div>';
						return chkBoxDom;
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
				let info = table.page.info();

				dataNum.text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
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

	function onSubmitSearch()
	{
		buildGrid();
	}
	
	function changeStatus(obj)
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (confirm('상태를 '+message.change))
		{
			$.ajax({
				url: $(obj).is(':checked') ? api.activeAdmin : api.inactiveAdmin,
				type: "POST",
				async: false,
				headers: headers,
				global: false,
				data: JSON.stringify({"userid" : selectedData.userid}),
				success: function(data) {
					alert(getStatusMessage(data));
				},
				error: function (request, status) {
					alert(message.ajaxError);
				}
			});
		}

		buildGrid();
	}
