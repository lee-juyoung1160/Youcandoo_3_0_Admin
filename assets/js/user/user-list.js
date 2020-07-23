
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
	/*const btnModalBanUserOpen	= $("#btnModalBanUserOpen");*/
	/** modal **/
	/*const modalBanUser		= $("#modalBanUser");
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const inactive			= $("input[name=radio-inactive]");
	const period			= $("#period");
	const cause				= $("#cause");
	const btnSubmitBanUer	= $("#btnSubmitBanUer");*/

	$( () => {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength();
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		/*btnModalBanUserOpen	.on("click", function () { onClickBtnModalBanUserOpen(); });*/
		/*modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmitBanUer	.on('click', function () { onSubmitBanUser(); });*/
		/*xlsxExport		.on("click", function () { onClickExcelBtn(); });*/
	});

	function initSearchForm()
	{
		keyword.val('');
		userActive.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRange();
		initDayBtn();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		keyword.val(historyParams.keyword);
		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		dateType.val(historyParams.date_type);
		onChangeSelectOption(dateType);
		searchType.val(historyParams.search_type);
		onChangeSelectOption(searchType);
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);

		_page = historyParams.page;
	}

	/*function initModal()
	{
		inactive.eq(0).prop('checked', true);
		period.trigger('focus');
		period.val('');
		cause.val('');
	}*/

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listUser,
				type:"POST",
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				/*{title: "", 	data: "idx",   width: "5%",     orderable: false,
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},*/
				{title: "닉네임", 		data: "nickname",   	width: "20%",    className: "cursor-default" }
				,{title: "프로필 ID", 	data: "profile_uuid",   width: "35%",    className: "cursor-default" }
				,{title: "사용구분", 	data: "is_active", 		width: "10%",    className: "cursor-default",
					render: function (data) {
						return data === 'Y' ? '사용' : '미사용';
					}
				}
				,{title: "가입일시", 	data: "created",    	width: "15%",    className: "cursor-default" }
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
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: false,
			initComplete: function () {
				let table = dataTable.DataTable();
				dataTable.on('page.dt', function (e, settings) {
					let info = table.page.info();
					_page = (info.start / info.length) + 1;
				});

				table.page(_page-1).draw( 'page' );

				/** row select **/
				/*dataTable.on('select.dt', function ( e, dt, type, indexes ) { onSelectRow(dt, indexes) });*/
				/** row deselect **/
				/*let table = dataTable.DataTable();
				dataTable.on('deselect.dt', function ( e, dt, type, indexes ) { onDeselectRow(table) });*/

				initTableSorter(dataTable);
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(dataTable);
				/*disableBtnBanUser();*/
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let nicknameDom = $(nRow).children().eq(0);
		/** 닉네임 클리 상세 이동 **/
		nicknameDom.html('<a onclick="moveDetail(this);" data-uuid="'+aData.profile_uuid+'" data-target="'+page.detailUser+'">'+aData.nickname+'</a>');
	}

	/** row select **/
	/*function onSelectRow(dt, indexes)
	{
		let selectedData 	= dt.rows(indexes).data()[0];
		let isActive		= selectedData.is_active;

		if (isActive === 'Y')
			enableBtnBanUser();
		else
			disableBtnBanUser();
	}*/

	/** row deselect **/
	/*function onDeselectRow(table)
	{
		let selectedData = table.rows('.selected').data()[0];
		if (isEmpty(selectedData))
			disableBtnBanUser();
	}*/

	/*function disableBtnBanUser()
	{
		if (!btnModalBanUserOpen.hasClass('btn-disabled'))
			btnModalBanUserOpen.addClass('btn-disabled');
	}

	function enableBtnBanUser()
	{
		if (btnModalBanUserOpen.has('btn-disabled'))
			btnModalBanUserOpen.removeClass('btn-disabled');
	}*/

	/*function onClickBtnModalBanUserOpen()
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
	}*/

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMinMaxDate();
	}

	/*function onClickExcelBtn()
	{
		getExcelData();
	}

	function getExcelData()
	{
		$.ajax({
			url: api.listUser,
			type: "POST",
			dataType: "json",
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("회원목록", "회원목록", data.data);
			},
			error: function (request, status) {
				alert(label.download+message.ajaxError);
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
		}

		return JSON.stringify(param);
	}*/

	/*function onSubmitBanUser()
	{
		if (banValidation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.inactiveUser,
					type: "POST",
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
						alert(label.submit+message.ajaxError);
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
			period.trigger('focus');
			return false;
		}

		if (isEmpty(cause.val()))
		{
			alert('정지사유는 '+message.required);
			cause.trigger('focus');
			return false;
		}

		return true;
	}*/

