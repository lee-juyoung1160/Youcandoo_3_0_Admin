
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const selCategory	= $("#selCategory");
	const doitStatus	= $("input[name=chk-status]");
	const radioDoitType	= $("input[name=radio-doit-type]");
	/*const btnCategory	= $("#btnCategory");*/
	const listWrap		= $("#listWrap");
	const pagination	= $("#dataTable_paginate");

	/** modal **/
	const categoryTable = $("#categoryTable");
	const modalLayout	= $(".modal-layout");
	const modalContent  = $(".modal-content");
	const modalCloseBtn	= $(".close-btn");
	const btnSubmit		= $("#btnSubmit");

	let currentPage = 1;
	$( () => {
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
		doitStatus		.on("click", function () { onChangeChkStatus(this); });
		/*btnCategory		.on("click", function () { onClickModalOpen(); });*/
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
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 테이블 데이터 로드 **/
		getList()
	}

	function initSearchForm()
	{
		keyword.val('');
		doitStatus.prop('checked', false);
		doitStatus.eq(0).prop('checked', true);
		doitStatus.eq(1).prop('checked', true);
		doitStatus.eq(2).prop('checked', true);
		doitStatus.eq(3).prop('checked', true);
		radioDoitType.eq(0).prop('checked', true);
		initSelectOption();
		initSearchDateRange();
		initMaxDateAfterThreeMonth();
		initDayBtn();
	}

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
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);
		radioDoitType.each(function () {
			if ($(this).val() === historyParams.doit_type)
				$(this).prop("checked", true);
		});

		currentPage = historyParams.page;
	}

	function onChangeChkStatus(obj)
	{
		let checkedCount = $("input[name=chk-status]:checked").length;
		if (checkedCount === 0)
		{
			sweetToast(message.minimumChecked);
			$(obj).prop("checked", true);
		}
	}

	function getList()
	{
		let url = api.listDoit;
		let errMsg = label.list + message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, listParams(), getListCallback, errMsg, false);
	}

	function listParams()
	{
		let status = [];
		doitStatus.each(function () {
			if ($(this).is(":checked"))
				status.push($(this).val())
		})

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : currentPage
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"status" : status
			,"category_uuid" : selCategory.val()
			,"doit_type" : $("input[name=radio-doit-type]:checked").val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function getListCallback(data)
	{
		$(".data-num").html(data.recordsTotal);
		buildList(data);
		buildPagination(data);
	}

	function buildList(data)
	{
		let listEl = '';
		let len = data.data.length;
		let i = 0;
		for (i; i<len; i++)
		{
			let { idx,
				promotion_uuid,
				doit_status,
				doit_title,
				doit_category,
				nickname,
				doit_member,
				max_user,
				action_start_datetime,
				action_end_datetime,
				action_allow_start_time,
				action_allow_end_time,
				action_dayofweek } = data.data[i];
			let lineColor = isEmpty(promotion_uuid) ? 'line-aqua' : 'line-blue';
			let doitTypeEl = isEmpty(promotion_uuid) ? `<strong>일반</strong>` : `<strong>프로모션</strong> / <span>XXX프로모션</span>`;
			listEl +=
				`<div class="card">
					<div class="card-body ${lineColor}">
						<div class="row">
							<div class="flex-container">
								<div class="checkbox-wrap">
									<input type="checkbox" id="${idx}" name="cc" />
									<label for="${idx}"><span></span></label>
								</div>
								<span class="badge ${getStatusColor(doit_status)}">${doit_status}</span>
								<span class="item-box">${doitTypeEl}</span>
								<span class="item-box"><i class="fas fa-sort-amount-down-alt"></i> ${doit_category}</span>
								<span class="item-box"><i class="fas fa-images"></i> 갤러리 허용</span>
								<span class="item-box"><i class="fas fa-unlock-alt"></i> 참여코드 : 0326</span>
							</div>
						</div>
						<div class="row">
							<div class="flex-container">
								<p class="thumbnail-wrap" style="width: 80px; margin-left: 37px;">
									<img src="https://youcandoo.yanadoocdn.com/doit/836a2aac7ec61f4db04549ee8b6c5df4/9093eadb2df870d06e3acf06086a8644.jpg" alt="">
								</p>
								<div class="col">
									<p class="sub-title">${doit_title}</p>
									<ul class="hash-tag-list clearfix">
										<li><span class="tag-name">#두잇태그최대열자까지</span></li>
										<li><span class="tag-name">#두잇태그최대열자까지</span></li>
										<li><span class="tag-name">#두잇태그최대열자까지</span></li>
									</ul>
									<div class="cap">
										<span class="item"><i class="fas fa-calendar-alt"></i> ${action_start_datetime} ~ ${action_end_datetime}</span>
										<span class="item"><i class="fas fa-clock"></i> ${action_allow_start_time} ~ ${action_allow_end_time}</span>
										<span class="item"><i class="fas fa-calendar-day"></i> ${action_dayofweek}</span>
									</div>
								</div>
							</div>
						</div>
						<div class="right-wrap">
							<div class="flex-container">
								<div class="col col-info">
									<p class="cap">개설자: ${nickname}</p>
									<p class="cap">개설일: 2020-02-02</p>
									<div class="personnel-num">
										<p class="cap"><i class="fas fa-users"></i> 참여/모집인원 :</p>
										<strong>${doit_member}</strong> /${max_user}
									</div>
								</div>
								<div class="btn-icon-wrap col">
									<i class="fas fa-edit"></i>
									<i class="fas fa-trash-alt"></i>
									<a href="#" class="view-detail">View Detail <i class="fas fa-arrow-right"></i></a>
								</div>
							</div>
						</div>
					</div>
				</div>`
		}

		listWrap.html(listEl);
	}

	function getStatusColor(status)
	{
		switch (status) {
			case '모집중':
				return 'badge-yellow'
			case '모집실패':
				return 'badge-orange'
			case '개설취소':
				return 'badge-orange'
			case '진행중':
				return 'badge-green'
			case '진행종료':
				return 'badge-gray'
			case '결과발표':
				return 'badge-gray'
			case '종료':
				return 'badge-gray'
			default:
				return ''
		}
	}

	function buildPagination(data)
	{
		let totalCount  = data.recordsTotal;
		let lastPage	= Math.ceil(totalCount / selPageLength.val());
		let pageLength  = 7;
		let i;
		let current;
		let pageDom = '';

		pageDom += currentPage === 1 ?
			`<a class="paginate_button previous disabled" id="dataTable_previous">${label.previous}</a><span>` :
			`<a onclick="onClickPageNum(this)" 
				class="paginate_button previous" 
				data-page="${(currentPage-1)}" id="dataTable_previous">${label.previous}</a><span>`

		if (lastPage <= pageLength)
		{
			for (i=1; i<=lastPage; i++)
			{
				current = lastPage > 1 && currentPage === i ? 'current' : '';
				pageDom += `<a onclick="onClickPageNum(this);" class="paginate_button ${current}" data-page="${i}">${i}</a>`
			}
		}
		else
		{
			if (currentPage < 5)
			{
				for (i=1; i<=pageLength; i++)
				{
					let current = lastPage > 1 && currentPage === i ? 'current' : '';
					let pageNum = i === pageLength ? lastPage : i;
					pageDom += i === pageLength - 1 ?
						`<span class="ellipsis">…</span>` :
						`<a onclick="onClickPageNum(this);" class="paginate_button ${current}" data-page="${pageNum}">${pageNum}</a>`
				}
			}
			else if (currentPage >= 5 && currentPage <= lastPage - 4)
			{
				for (i=1; i<=lastPage; i++)
				{
					if (i === 1)
					{
						pageDom +=
							`<a onclick="onClickPageNum(this);" class="paginate_button" data-page="${i}">${i}</a>
							<span class="ellipsis">…</span>`
					}

					if (currentPage === i)
					{
						pageDom +=
							`<a onclick="onClickPageNum(this);" class="paginate_button" data-page="${(i - 1)}">${(i - 1)}</a>
							<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="${i}">${i}</a>
							<a onclick="onClickPageNum(this);" class="paginate_button" data-page="${(i + 1)}">${(i + 1)}</a>`
					}

					if (lastPage === i)
					{
						pageDom +=
							`<span class="ellipsis">…</span>
							<a onclick="onClickPageNum(this);" class="paginate_button" data-page="${lastPage}">${lastPage}</a>`
					}
				}
			}
			else if (currentPage > lastPage - 4)
			{
				for (i=1; i<=pageLength; i++)
				{
					let current = currentPage === lastPage-(pageLength-i) ? 'current' : '';
					let pageNum = i >= pageLength - 4 ? (lastPage-(pageLength-i)) : i;
					pageDom += i === 2 ?
						`<span class="ellipsis">…</span>` :
						`<a onclick="onClickPageNum(this);" class="paginate_button ${current}" data-page="${pageNum}">${pageNum}</a>`
				}
			}
		}

		pageDom += lastPage === currentPage ?
			`</span><a class="paginate_button next disabled" id="dataTable_next">${label.next}</a>` :
			`</span><a onclick="onClickPageNum(this)" 
						class="paginate_button next" 
						data-page="${(currentPage+1)}" 
						id="dataTable_next">${label.next}</a>`

		pagination.html(pageDom);
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		currentPage = $(obj).data('page');

		getList();
	}

	function onSubmitSearch()
	{
		currentPage = 1;
		getList();
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
		/*let doitTable 	  = dataTable.DataTable();
		let selectedDoit  = doitTable.rows('.selected').data();
		if (isEmpty(selectedDoit))
		{
			sweetToast(`대상을 목록에서 ${message.select}`);
			return;
		}*/

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
				{title: "", 			data: "idx",		width: "10%",    className: "cursor-default",
					render: function (data) {
						return singleCheckBoxDom(`category_${data}`);
					}
				},
				{title: "카테고리 명", 	data: "category",  	width: "90%",   className: "cursor-default" }
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
			paging: false,
			/*pageLength: 10,*/
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			/*scrollY: 220,
			scrollCollapse: true,*/
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
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
		$("#checkAll").prop('checked', false);
		modalFadeout();
		onSubmitSearch();
	}