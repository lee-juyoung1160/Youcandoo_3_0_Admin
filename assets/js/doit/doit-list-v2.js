
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const selCategory	= $("#selCategory");
	const doitStatus	= $("input[name=chk-status]");
	const radioDoitType	= $("input[name=radio-doit-type]");
	const chkAll		= $("#chkAll");
	const btnCategory	= $("#btnCategory");
	const btnXlsxOut	= $("#btnXlsxOut");
	const selSort		= $("#selSort");
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
		chkAll			.on("click", function () { toggleChkAll(this); });
		selSort			.on("change", function () { onSubmitSearch(); });
		btnXlsxOut		.on("click", function () { onClickXlsxOut(); });
		btnCategory		.on("click", function () { onClickModalOpen(); });
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
		setPageLength();
		/** 상단 검색 폼 초기화
		 *  메뉴클릭으로 페이지 진입 > 초기값 세팅
		 *  뒤로가기로 페이지 진입 > 이전 값 세팅
		 * **/
		isBackAction() ? setHistoryForm() : initSearchForm();
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
		initSearchDateRangeThreeMonth();
		initMaxDateAfterThreeMonth();
		initDayBtn();
	}

	function setPageLength()
	{
		let options = '';
		options += '<option value="10">10개씩 보기</ooption>';
		options += '<option selected value="30">30개씩 보기</ooption>';

		selPageLength.html(options);
		onChangeSelectOption(selPageLength);
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
		selSort.val(historyParams.sort+','+historyParams.sort_type);
		onChangeSelectOption(selSort);
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);
		radioDoitType.each(function () {
			if ($(this).val() === historyParams.doit_type)
				$(this).prop("checked", true);
		});

		currentPage = historyParams.page;
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

		let sorts = selSort.val().split(',');
		let sortValue = sorts[0];
		let sortType  = sorts[1];

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : currentPage
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

	function getListCallback(data)
	{
		$(".data-num").html(data.recordsTotal);
		buildList(data);
		buildPagination(data);
	}

	function buildList(data)
	{
		listWrap.empty();

		let listEl = '';
		let len = data.data.length;
		let i = 0;
		for (i; i<len; i++)
		{
			let { idx,
				promotion_uuid,
				promotion_title,
				doit_uuid,
				doit_thumbnail_image_url,
				doit_status,
				doit_private_type,
				private_code,
				doit_title,
				doit_category,
				doit_tags,
				nickname,
				doit_member,
				max_user,
				allow_gallery_image,
				created_datetime,
				action_start_datetime,
				action_end_datetime,
				action_allow_start_time,
				action_allow_end_time,
				action_dayofweek } = data.data[i];
			let lineColor  = isEmpty(promotion_uuid) ? 'line-aqua' : 'line-blue';
			let doitTypeEl = isEmpty(promotion_uuid) ? `<strong>일반</strong>` : `<strong>프로모션</strong> / <span>${promotion_title}</span>`;
			let isAllowGallery = allow_gallery_image === 'Y' ? '갤러리 허용' : '갤러리 비허용';
			let privateContentEl = doit_private_type === 'Y' ? `<i class="fas fa-eye-slash"></i> 컨텐츠 비공개` : `<i class="fas fa-eye"></i> 컨텐츠 공개`;
			let privateEl = isEmpty(private_code)
				? ''
				: `<span class="item-box"><i class="fas fa-unlock-alt"></i> 비밀두잇(${private_code}) / ${privateContentEl}</span>`;
			let tags = doit_tags.split(',');
			let tagEl = '';
			for (let tag of tags)
			{
				if (isEmpty(tag)) continue;
				tagEl += `<li><span class="tag-name">${tag}</span></li>`;
			}
			let isCreatedByBiz = (!isEmpty(promotion_uuid) && nickname.indexOf('@') !== -1);
			/*let hasJoinMember = Number(doit_member) > 0;*/
			let isRecruiting = doit_status === '모집중';
			let btnUpdate = isCreatedByBiz && isRecruiting
				? `<i onclick="location.href = '${page.updateDoit}${idx}'" class="fas fa-edit"></i>`
				: `<i class="fas fa-edit disabled"></i>`;
			let btnDelete = isRecruiting
				? `<i onclick="deleteDoit('${doit_uuid}')" class="fas fa-trash-alt"></i>`
				: `<i class="fas fa-trash-alt disabled"></i>`;
			listEl +=
				`<div class="card">
					<div class="card-body ${lineColor}">
						<div class="row">
							<div class="flex-container">
								<div class="checkbox-wrap">
									<input onclick="toggleChkSep()" type="checkbox" id="${doit_uuid}" data-uuid="${doit_uuid}" name="chk-doit" />
									<label for="${doit_uuid}"><span></span></label>
								</div>
								<span class="badge ${getStatusColor(doit_status)}">${doit_status}</span>
								<span class="item-box">${doitTypeEl}</span>
								<span class="item-box"><i class="fas fa-sort-amount-down-alt"></i> ${doit_category}</span>
								<span class="item-box"><i class="fas fa-images"></i> ${isAllowGallery}</span>
								${privateEl}
							</div>
						</div>
						<div class="row">
							<div class="flex-container">
								<p class="thumbnail-wrap" style="width: 80px; margin-left: 37px;">
									<img src="${doit_thumbnail_image_url}" alt="" onerror="onErrorImage(this)">
								</p>
								<div class="col">
									<p class="sub-title">${doit_title}</p>
									<ul class="hash-tag-list clearfix">
										${tagEl}
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
									<p class="cap">개설일: ${created_datetime.substring(0, 10)}</p>
									<div class="personnel-num">
										<p class="cap"><i class="fas fa-users"></i> 참여/모집인원 :</p>
										<strong>${doit_member}</strong> /${max_user}
									</div>
								</div>
								<div class="btn-icon-wrap col">
									${btnUpdate}
									${btnDelete}
									<a href="/doit/v2/detail/${idx}" class="view-detail">상세보기 <i class="fas fa-arrow-right"></i></a>
								</div>
							</div>
						</div>
					</div>
				</div>`
		}

		listWrap.html(listEl);
		toggleChkSep();
	}

	function toggleChkAll(obj)
	{
		let chkEl = $('input[name="chk-doit"]')
		if ($(obj).is(':checked'))
			chkEl.prop('checked', true);
		else
			chkEl.prop('checked', false);
	}

	function toggleChkSep()
	{
		let chkCnt = 0;
		let chkEl  = listWrap.find('[name=chk-doit]');
		chkEl.each(function () {
			if ($(this).is(':checked'))
				chkCnt++;
		})

		chkCnt === chkEl.length ? chkAll.prop('checked', true) : chkAll.prop('checked', false);
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

		pagination.html(paginate(currentPage, lastPage));
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
	function deleteDoit(uuid)
	{
		g_doit_uuid = uuid;
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
		sweetToastAndCallback(data, onSubmitSearch);
	}

	function onClickModalOpen()
	{
		let chkEl = listWrap.find('input[name=chk-doit]:checked');
		if (chkEl.length === 0)
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
					return categoryTableParams();
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

	function categoryTableParams()
	{
		let param = {
			"type" : ""
			,"keyword" : ""
		}

		return JSON.stringify(param);
	}

	function onSubmitChangeCategory()
	{
		const msg = `확인을 누르면 선택한 두잇의 카테고리가 일괄 변경 됩니다.
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
		let url 	= api.changeDoitCategory;
		let errMsg  = label.modify+message.ajaxLoadError;
		let selectedDoit     = listWrap.find('input[name=chk-doit]:checked');
		let cateTable 	 	 = categoryTable.DataTable();
		let selectedCategory = cateTable.rows('.selected').data()[0];
		let doitUuids = [];

		selectedDoit.each(function() {
			doitUuids.push(this.id);
		})

		let param = {
			"category_uuid" : selectedCategory.category_uuid,
			"doit_list" : doitUuids
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), changeReqCallback, errMsg, false);
	}

	function changeReqCallback(data)
	{
		sweetToastAndCallback(data, changeSuccess);
	}

	function changeSuccess()
	{
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
