
	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 검색범위 초기화 **/
		onClickActiveDayBtn($(".btn_week"));
		/** input, select, checkbox 초기화 **/
		initComponent();
		/** 테이블 데이터 로드 **/
		getList();

		$(".search")		.on("click", function () { onSubmitSearch(); });
		$(".reset")			.on("click", function () { initComponent(); });
		$("#selPageLength")	.on("change", function () { getList(); });
	});

	/** input, select 초기화 **/
	function initComponent()
	{
		$("#keyword").val('');
		$("input:radio").each(function (index) {
			if (index === 0)
				$(this).prop("checked", true);
		});
		$("input:checkbox").prop("checked", true);
		$("select").each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});
	}

	function getList()
	{
		$('#dataTable').DataTable({
			ajax : {
				url:"http://api.kakaokids.org/v1.0/admin/user/list",
				type:"POST",
				data: function (d) {
					/*
					if (d.order.length > 0)
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
				{title: "닉네임", 	data: "nickname",    name: "nickname",    orderable: false,   className: "text-center" }
				,{title: "등록일", 	data: "created",     name: "created",     orderable: false,   className: "text-center",
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
			processing: true,
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				let table = $('#dataTable').DataTable();
				let info = table.page.info();

				$(".data-num").text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
				//setRowAttributes(nRow, aData);
				console.log(aData);
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : d.start + 1
			,"date_type" : $("#date_type").val()
			,"from_date" : $(".date_from").val()
			,"to_date" : $(".date_to").val()
			,"search_type" : $("#search_type").val()
			,"keyword" : $("#keyword").val()
			//,type_opt : $('#selType').val()
		}

		return {"data": JSON.stringify(param)};
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
		getList();
	}

