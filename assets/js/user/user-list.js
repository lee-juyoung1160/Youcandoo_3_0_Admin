
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const userActive	= $("input[name=radio-user-active]");
	const select		= $("select");
	const dataNum		= $(".data-num");
	const btnModalBanUserOpen	= $("#btnModalBanUserOpen");
	const modalBanUser		= $("#modalBanUser");
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const inactive			= $("input[name=radio-inactive]");
	const period			= $("#period");
	const cause				= $("#cause");
	const btnSubmitBanUer	= $("#btnSubmitBanUer");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")    	.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
		xlsxExport		.on("click", function () { onClickExcelBtn(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnModalBanUserOpen	.on("click", function () { onClickBtnModalBanUserOpen(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmitBanUer	.on('click', function () { onSubmitBanUser(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		userActive.eq(0).prop("checked", true);
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});
		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	function initModal()
	{
		inactive.eq(0).prop('checked', true);
		period.focus();
		period.val('');
		cause.val('');
	}

	function buildGrid()
	{
		$("#dataTable").DataTable({
			ajax : {
				url: api.listUser,
				type:"POST",
				/*async: false,*/
				headers: headers,
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
				},
				error: function (request, status) {
					alert(message.ajaxError);
				}
			},
			columns: [
				{title: "", 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "닉네임", 		data: "nickname",   	width: "20%",    orderable: false,   className: "text-center" }
				,{title: "프로필 ID", 	data: "profile_uuid",   width: "35%",    orderable: false,   className: "text-center" }
				,{title: "회원상태", 	data: "is_active", 		width: "10%",    orderable: false,   className: "text-center",
					render: function (data) {
						return data === 'Y' ? '정상' : '정지'
					}
				}
				,{title: "가입일", 		data: "created",    width: "15%",    orderable: false,   className: "text-center",
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

				/** 목록 상단 totol count **/
				dataNum.text(info.recordsTotal);
				/** row select **/
				dataTable.on('select.dt', function ( e, dt, type, indexes ) { onSelectRow(dt, indexes) });
				/** row deselect **/
				dataTable.on('deselect.dt', function ( e, dt, type, indexes ) { onDeselectRow(table) });
			},
			fnRowCallback: function( nRow, aData ) {
				//setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				disableBtnBanUser();
			}
		});
	}
	
	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			/*,"member_type" : $("input[name=radio-user-active]:checked").val()*/
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom = $(nRow).children().eq(1);

		/** 제목에 a 태그 추가 **/
		titleDom.html('<a href="#">'+aData.nickname+'</a>');
	}

	/** row select **/
	function onSelectRow(dt, indexes)
	{
		let selectedData 	= dt.rows(indexes).data()[0];
		let isActive		= selectedData.is_active;

		if (isActive === 'Y')
			enableBtnBanUser();
		else
			disableBtnBanUser();
	}

	/** row deselect **/
	function onDeselectRow(table)
	{
		let selectedData = table.rows('.selected').data()[0];
		if (isEmpty(selectedData))
			disableBtnBanUser();
	}

	function disableBtnBanUser()
	{
		if (!btnModalBanUserOpen.hasClass('btn-disabled'))
			btnModalBanUserOpen.addClass('btn-disabled');
	}

	function enableBtnBanUser()
	{
		if (btnModalBanUserOpen.has('btn-disabled'))
			btnModalBanUserOpen.removeClass('btn-disabled');
	}

	function onClickBtnModalBanUserOpen()
	{
		if (btnModalBanUserOpen.hasClass('btn-disabled'))
			return;

		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			alert('항목을 '+message.select);
			return;
		}

		modalFadein();
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	function onClickExcelBtn()
	{
		getExcelData();
	}

	function getExcelData()
	{
		$.ajax({
			url: api.listUser,
			type: "POST",
			async: false,
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("회원목록", "회원목록", data);
			},
			error: function (request, status) {
				alert(message.ajaxError);
			},
		});
	}

	function excelParams()
	{
		let param = {
			"limit" : 20000
			,"page" : 1
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			/*,"member_type" : $("input[name=radio-user-active]:checked").val()*/
		}

		return JSON.stringify(param);
	}

	function onSubmitBanUser()
	{
		if (banValidation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.inactiveUser,
					type: "POST",
					async: false,
					global: false,
					headers: headers,
					dataType: 'json',
					data: banParams(),
					success: function(data) {
						alert(getStatusMessage(data))
						if (isSuccessResp(data))
						{
							disableBtnBanUser();
							modalFadeout();
							buildGrid();
						}
					},
					error: function (request, status) {
						alert(message.ajaxError);
					},
				});
			}
		}
	}

	function banParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let param = {
			"account_uuid" : selectedData.account_uuid
			,"inactive_type" : $("input[name=radio-inactive]:checked").val()
			,"period" : period.val()
			,"reason" : cause.val()
		}

		return JSON.stringify(param);
	}

	function banValidation()
	{
		if (isEmpty(period.val()))
		{
			alert('정지기간은 '+message.required);
			period.focus();
			return false;
		}

		if (isEmpty(cause.val()))
		{
			alert('정지사유는 '+message.required);
			cause.focus();
			return false;
		}

		return true;
	}

