
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const selMatch 		= $("#selMatch");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const userActive	= $("input[name=radio-user-active]");
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
	let _page = 1;

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화
		 *  메뉴클릭으로 페이지 진입 > 초기값 세팅
		 *  뒤로가기로 페이지 진입 > 이전 값 세팅
		 * **/
		isBackAction() ? setHistoryForm() : initSearchForm();
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
	});

	function initSearchForm()
	{
		keyword.val('');
		userActive.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRangeMonth();
		initMaxDateToday();
		initDayBtn();
	}

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
		selMatch.val(historyParams.keyword_type);
		onChangeSelectOption(selMatch);
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);
		userActive.each(function () {
			if ($(this).val() === historyParams.is_active)
				$(this).prop("checked", true);
		});

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
				{title: "닉네임", 		data: "nickname",   	width: "20%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailUser}${row.idx}">${data}</a>`;
					}
				}
				,{title: "프로필 ID", 	data: "profile_uuid",   width: "35%" }
				,{title: "사용구분", 	data: "is_active", 		width: "10%",
					render: function (data) {
						return data === 'Y' ? '사용' : '미사용';
					}
				}
				,{title: "가입일시", 	data: "created",    	width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
			initComplete: function () {
				/** row select **/
				/*dataTable.on('select.dt', function ( e, dt, type, indexes ) { onSelectRow(dt, indexes) });*/
				/** row deselect **/
				/*let table = dataTable.DataTable();
				dataTable.on('deselect.dt', function ( e, dt, type, indexes ) { onDeselectRow(table) });*/

				$(this).on('page.dt', function (e, settings) { _page = getCurrentPage(this); });
				redrawPage(this, _page);
				initTableSorter(this);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
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
			,"keyword_type" : selMatch.val()
			,"keyword" : keyword.val()
			,"is_active" : $("input[name=radio-user-active]:checked").val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
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
		initMaxDateToday();
	}

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

