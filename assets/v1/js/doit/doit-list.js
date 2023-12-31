
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const selCategory	= $("#selCategory");
	const doitStatus	= $("input[name=chk-status]");
	const radioDoitType	= $("input[name=radio-doit-type]");
	const btnCategory	= $("#btnCategory");
	const btnXlsxOut	= $("#btnXlsxOut");
	const selSort		= $("#selSort");

	/** modal **/
	const categoryTable = $("#categoryTable");
	const modalLayout	= $(".modal-layout");
	const modalContent  = $(".modal-content");
	const modalCloseBtn	= $(".close-btn");
	const btnSubmit		= $("#btnSubmit");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 카테고리 목록 **/
		getCategory();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		doitStatus		.on("click", function () { atLeastOneChecked(this); });
		btnCategory		.on("click", function () { onClickModalOpen(); });
		selSort			.on("change", function () { onSubmitSearch(); });
		btnXlsxOut		.on("click", function () { onClickXlsxOut(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmit		.on('click', function () { onSubmitChangeCategory(); });
	});

	function getCategory()
	{
		let url = api.listAllCategory;
		let errMsg = `카테고리 목록 ${message.ajaxLoadError}`;

		ajaxRequestWithJsonData(false, url, null, getCategoryCallback, errMsg, completeCallback);
	}

	function getCategoryCallback(data)
	{
		let options = '<option value="all">전체</option>';
		options += '<option value="">카테고리 미등록</option>';
		let datas = data.data;
		let i = 0;
		for (i; i<datas.length; i++)
		{
			let { category, category_uuid } = datas[i];
			options += `<option value="${category_uuid}">${category}</option>`
		}

		selCategory.html(options);

		onChangeSelectOption(selCategory);
	}

	function completeCallback()
	{
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화
		 *  메뉴클릭으로 페이지 진입 > 초기값 세팅
		 *  뒤로가기로 페이지 진입 > 이전 값 세팅
		 * **/
		isBackAction() ? setHistoryForm() : initSearchForm();
		/** 테이블 데이터 로드 **/
		buildGrid();
	}

	function initSearchForm()
	{
		keyword.val('');
		doitStatus.prop('checked', false);
		doitStatus.eq(0).prop('checked', true);
		doitStatus.eq(1).prop('checked', true);
		doitStatus.eq(2).prop('checked', true);
		doitStatus.eq(3).prop('checked', true);
		doitStatus.eq(4).prop('checked', true);
		radioDoitType.eq(0).prop('checked', true);
		initSelectOption();
		initSearchDateRangeThreeMonth();
		initMaxDateAfterThreeMonth();
		initDayBtn();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		searchType.val(historyParams.search_type);
		doitStatus.each(function () {
			if (historyParams.status.indexOf($(this).val()) !== -1)
				$(this).prop("checked", true);
			else $(this).prop("checked", false);
		});
		dateType.val(historyParams.date_type);
		onChangeSelectOption(dateType);
		searchType.val(historyParams.search_type);
		onChangeSelectOption(searchType);
		selCategory.val(historyParams.category_uuid);
		onChangeSelectOption(selCategory);
		selSort.val(historyParams.sort+','+historyParams.sort_type);
		onChangeSelectOption(selSort);
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);
		radioDoitType.each(function () {
			if ($(this).val() === historyParams.doit_type)
				$(this).prop("checked", true);
		});

		_page = historyParams.page;
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listDoit,
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
				{title: tableCheckAllDom(), data: "idx",   					width: "1%",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				},
				{title: "진행상태", 			data: "doit_status",    		width: "8%" }
				,{title: "유형", 			data: "promotion_uuid", 		width: "5%",
					render: function (data) {
						return isEmpty(data) ? label.regular : label.promotion;
					}
				}
				,{title: "카테고리", 			data: "doit_category",  		width: "8%" }
				,{title: "두잇명", 			data: "doit_title",    			width: "10%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailDoit + row.idx;
						return `<a class="line-clamp" style="max-width: 135px;" title="${replaceDoubleQuotes(row.doit_title)}" href="${detailUrl}">${replaceDoubleQuotes(row.doit_title)}</a>`;
					}
				}
				,{title: "참여/모집인원", 		data: "doit_member",    	 	width: "7%",
					render: function (data, type, row, meta) {
						return `${numberWithCommas(row.doit_member)} ${label.slash} ${numberWithCommas(row.max_user)}`;
					}
				}
				,{title: "개설자", 			data: "nickname",    			width: "8%",
					render: function (data) {
						return `<div class="line-clamp" style="max-width: 100px;" title="${data}">${data}</div>`;
					}
				}
				,{title: "개설일", 			data: "created_datetime",    	width: "7%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "인증 기간", 		data: "action_start_datetime",  width: "13%",
					render: function (data, type, row, meta) {
						return `${row.action_start_datetime} ${label.tilde} ${row.action_end_datetime}`;
					}
				}
				,{title: "인증 가능 시간", 	data: "action_allow_start_time", 	width: "8%",
					render: function(data, type, row, meta) {
						return `${row.action_allow_start_time.substring(0, 5)} ${label.tilde} ${row.action_allow_end_time.substring(0, 5)}`;
					}
				}
				,{title: "인증요일", 		data: "action_dayofweek",  			width: "10%" }
				,{title: "두잇 ID", 			data: "doit_uuid",    			width: "5%",
					render: function (data, type, row, meta) {
						return `<div>
									<input type="text" class="input-copy" style="opacity: 0; width: 1px;" value="${data}">
									<i class="fas fa-copy" onclick="copyToClipboard(this);"></i>
								</div>`
					}
				}
				,{title: "삭제", 			data: "doit_uuid",    			width: "5%",
					render: function (data, type, row, meta) {
						/*let isCreatedByBiz = (!isEmpty(row.promotion_uuid) && row.nickname.indexOf('@') !== -1);*/
						/*let hasJoinMember = Number(row.doit_member) > 0;*/
						let isRecruiting = row.doit_status === '모집중';
						let disabled = isRecruiting ? '' : 'disabled';
						return `<button onclick="deleteDoit(this);" data-uuid="${data}" class="btn-danger" type="button" ${disabled}>삭제</button>`;
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: false,
			initComplete: function () {
				$(this).on('page.dt', function () { _page = getCurrentPage(this); });
				uncheckedCheckAllAfterMovePage(this);
				redrawPage(this, _page);
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let status = [];
		doitStatus.each(function () {
			if ($(this).is(":checked"))
				status.push($(this).val())
		})

		let sorts = selSort.val().split(',');
		let sortValue = sorts[0];
		let sortType  = sorts[1];

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"status" : status
			,"sort" : sortValue
			,"sort_type" : sortType
			,"category_uuid" : selCategory.val()
			,"doit_type" : $("input[name=radio-doit-type]:checked").val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let joinMemberDom 	= $(nRow).children().eq(5);
		$(joinMemberDom).attr('data-sort', aData.doit_member);
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		uncheckedCheckAll();
		initMaxDateAfterThreeMonth();
	}

	let g_doit_uuid;
	function deleteDoit(obj)
	{
		g_doit_uuid = $(obj).data('uuid');
		sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteDoit;
		let errMsg 	= label.delete+message.ajaxError;
		let param   = { "doit_uuid" : g_doit_uuid };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
	}

	function deleteSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function onClickModalOpen()
	{
		let doitTable 	  = dataTable.DataTable();
		let selectedDoit  = doitTable.rows('.selected').data();
		if (isEmpty(selectedDoit))
		{
			sweetToast(`대상을 목록에서 ${message.select}`);
			return;
		}

		modalFadein();
		buildCategoryModal();
	}

	function buildCategoryModal()
	{
		categoryTable.DataTable({
			ajax : {
				url: api.listDoitCategory,
				type: "POST",
				headers: headers,
				global: false,
				data: function (d) {
					return categoryTableParams(d);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 			data: "idx",		width: "10%",
					render: function (data) {
						return singleCheckBoxDom(`category_${data}`);
					}
				},
				{title: "카테고리 명", 	data: "category",  	width: "90%" }
			],
			serverSide: true,
			paging: false,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			/*scrollY: 220,
			scrollCollapse: true,*/
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function categoryTableParams(d)
	{
		let param = {
			"type" : ""
			,"keyword" : ""
		}

		return JSON.stringify(param);
	}

	function onSubmitChangeCategory()
	{
		const msg = `확인을 누르면 카테고리가 일괄 변경 됩니다.
					${message.change}`;

		if (changeCatValidation())
			sweetConfirm(msg, changeRequest);
	}

	function changeCatValidation()
	{
		let cateTable 	 	 = categoryTable.DataTable();
		let selectedCategory = cateTable.rows('.selected').data()[0];
		if (isEmpty(selectedCategory))
		{
			sweetToast(`카테고리를 ${message.select}`);
			return false;
		}

		return true;
	}

	function changeRequest()
	{
		let url = api.changeDoitCategory;
		let errMsg = label.modify+message.ajaxLoadError;
		let doitTable 		 = dataTable.DataTable();
		let selectedDoit  	 = doitTable.rows('.selected').data();
		let cateTable 	 	 = categoryTable.DataTable();
		let selectedCategory = cateTable.rows('.selected').data()[0];
		let doits = [];

		selectedDoit.map((value) => {
			let { doit_uuid } = value;
			doits.push(doit_uuid);
		})

		let param = {
			"category_uuid" : selectedCategory.category_uuid,
			"doit_list" : doits
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), changeReqCallback, errMsg, false);
	}

	function changeReqCallback(data)
	{
		sweetToastAndCallback(data, changeSuccess);
	}

	function changeSuccess()
	{
		uncheckedCheckAll();
		modalFadeout();
		onSubmitSearch();
	}

	function onClickXlsxOut()
	{
		let url = api.xlsxOutDoit;
		let errMsg = label.list + message.ajaxLoadError;
		let status = [];
		doitStatus.each(function () {
			if ($(this).is(":checked"))
				status.push($(this).val())
		})

		let sorts = selSort.val().split(',');
		let sortValue = sorts[0];
		let sortType  = sorts[1];
		let param = {
			"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"status" : status
			,"sort" : sortValue
			,"sort_type" : sortType
			,"category_uuid" : selCategory.val()
			,"doit_type" : $("input[name=radio-doit-type]:checked").val()
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), xlsxOutCallback, errMsg, false);
	}

	function xlsxOutCallback(data)
	{
		setExcelData(`${xlsxName.doitList}_${dateFrom.val()}~${dateTo.val()}`, xlsxName.doitList, data.data);
	}