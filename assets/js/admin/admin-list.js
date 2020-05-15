
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const authCode		= $("#auth_code");
	const selPageLength = $("#selPageLength");
	const btnDelete 	= $("#btnDelete");
	const inputRadio	= $("input:radio");
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
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		btnDelete		.on("click", function () { deleteAdmin(); });
		selPageLength	.on("change", function () { buildGrid(); });
	});

	function getAuthList()
	{
		$.ajax({
			url: api.listAdminAuth,
			type: "POST",
			headers : headers,
			/*data: params(),*/
			success: function(data) {
				if (isSuccessResp(data))
					buildAuthList(data)
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildAuthList(data)
	{
		let jsonData  = JSON.parse(data);
		let respData  = jsonData.data;
		let optionDom = '';
		for (let i=0; i<respData.length; i++)
		{
			let code = respData[i].code;
			let name = respData[i].name;
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
		inputRadio.each(function (index) {
			if (index === 0)
				$(this).prop("checked", true);
		});
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
					/*if (d.order.length > 0)
					{
						var columnIndex = d.order[0].column;
						d.sort = d.columns[columnIndex].name;
						d.order = d.order[0].dir;
					}
				   */
					console.log(tableParams(d));
					return tableParams(d);
				}
			},
			columns: [
				{title: "", 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				}
				,{title: "아이디", 	data: "userid",     		width: "10%",     orderable: false,   className: "text-center" }
				,{title: "이름", 		data: "name",     			width: "10%",     orderable: false,   className: "text-center" }
				,{title: "이메일", 	data: "email",     			width: "15%",     orderable: false,   className: "text-center" }
				,{title: "최근접속일", data: "recent_datetime",    width: "15%",     orderable: false,   className: "text-center",
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
					previous: '<i class="fas fa-angle-double-left"></i>'
					,next: '<i class="fas fa-angle-double-right"></i>'
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

				dataNum.text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
				console.log(aData);
				//setRowAttributes(nRow, aData);
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

	function setRowAttribute(nRow, aData)
	{
		let tdDom 	 = $(nRow).find('td');
		let titleDom = $(tdDom).eq(3);
		let movePageUrl = 'javascript:movePageUrl(\'/mod/doit/'+aData.doit_id+'\')';

		// 제목에 a 태그 추가
		$(titleDom).html('<a href="'+movePageUrl+'">'+aData.title+'</a>');
	}

	function onSubmitSearch()
	{
		buildGrid();
	}
	
	function deleteAdmin()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			alert('삭제할 금칙어를 '+message.select);
			return;
		}

		let param = [];
		let len   = selectedData.length;
		for (let i=0; i<len; i++)
		{
			let userId = selectedData[i].userid;

			param.push(userId);
		}

		if (confirm(message.delete))
		{
			$.ajax({
				url: api.deleteAdmin,
				type: "POST",
				async: false,
				headers: headers,
				data: JSON.stringify({"delete_data" : param}),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
						buildGrid();
				},
				error: function (request, status) {
					console.log(status);
				}
			});
		}
	}
