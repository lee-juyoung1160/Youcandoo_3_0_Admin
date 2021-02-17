
	const dataTable		= $("#dataTable");
	const selPageLength = $("#selPageLength");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 목록 **/
		buildGrid();
		/** 이벤트 **/
		selPageLength	.on("change", function () { onSubmitSearch(); });
	});

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listApiPopular,
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
				{title: "", 			data: "",   			width: "5%",
					render: function (data, type, row, meta) {
						return meta.row +1;
					}
				}
				,{title: "url", 		data: "url",   			width: "50%" }
				,{title: "process", 	data: "process",     	width: "40%" }
			],
			serverSide: true,
			paging: false,
			select: false,
			destroy: false
		});
	}

	function tableParams()
	{
		let param = {
			"limit" : Number(selPageLength.val())
			,"alias" : "api"
			,"search_type" : "process"
		}

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}
