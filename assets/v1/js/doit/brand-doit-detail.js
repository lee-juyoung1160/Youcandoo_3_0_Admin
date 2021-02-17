
	const ulTab 		= $("#ulTab");
	const tabContent	= $(".tab-content");
	const goUpdate      = $("#goUpdate");
	const reset 		= $(".reset");

	/** modal 공통 **/
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩보기 셀렉트 박스 초기화 **/
		initPageLength(selPageLengthForApplyUser);
		initPageLength(selPageLengthForUser);
		initPageLength(selPageLengthForReview);
		initPageLength(selPageLengthForUcd);
		initActionPageLength(selPageLengthForAction);
		/** 두잇 상세정보 **/
		getDetail();
		/** 이벤트 **/
		ulTab			.on('click', function (event) { onClickTab(event); });
		goUpdate		.on('click', function () { goUpdatePage(); })
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		reset			.on('click', function () { initSearchForm(); });

		selPageLengthForApplyUser	.on('change', function () { getApplyMember(); });
		searchApplyMember		.on('click', function () { getApplyMember(); });

		selPageLengthForUser	.on('change', function () { getJoinMember(); });
		searchJoinMember.on('click', function () { getJoinMember(); });

		selPageLengthForAction	.on('change', function () { onChangePageLengthForAction(); });

		selPageLengthForReview	.on('change', function () { getInvolveReview(); });
		btnXlsxOutForReview		.on('click', function () { onClickXlsxOut(); });

		selPageLengthForUcd		.on('change', function () { getUcdLog(); });

		viewType		.on('change', function () { onChangeViewType(); });
	});

	function initSearchForm()
	{
		keywordJoinMember.val('');
		keywordApplyMember.val('');
		dateFrom.datepicker("setDate", g_created_date);
		dateTo.datepicker("setDate", g_action_start_date);
	}

	/** 탭 클릭 **/
	function onClickTab(e)
	{
		let clickedEl = $(e.target);
		let target = $(clickedEl).data('target')

		clickedEl.siblings().removeClass('active');
		clickedEl.addClass('active');
		tabContent.hide();
		$(target).show();

		getDoitMemberCount();

		if (clickedEl.hasClass('doit'))
			getDetail()
		else if (clickedEl.hasClass('user'))
		{
			getJoinMemberTotal();
			getJoinMember();
		}
		else if (clickedEl.hasClass('action'))
		{
			currentPage = 1;
			getInvolveAction();
		}
		else if (clickedEl.hasClass('review'))
			getInvolveReview();
		else if (clickedEl.hasClass('ucd'))
			getUcdLog();
		else if (clickedEl.hasClass('talk'))
		{
			viewType.eq(0).prop('checked', true);
			initTalkPageNum();
			getDoitTalk();
		}
		else if (clickedEl.hasClass('apply'))
			getApplyMember();
	}

	function getDoitMemberCount()
	{
		let url = api.getDoitUser
		let errMsg = `신청자/참여자 ${message.ajaxError}`;
		let param = { "doit_uuid" : g_doit_uuid };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDoitMemberCountCallback, errMsg, false);
	}

	function getDoitMemberCountCallback(data)
	{
		isSuccessResp(data) ? setDoitMemberCount(data) : sweetToast(data.msg);
	}

	let g_join_member_count = 0;
	function setDoitMemberCount(data)
	{
		let { apply_count, member_count } = data.data;

		g_join_member_count = member_count;

		$(".apply").html(`참여 신청 정보(${apply_count})`);
		$(".user").html(`참여자 정보(${member_count})`);
	}

	/** 수정페이지 이동 **/
	function goUpdatePage()
	{
		location.href = page.updateDoit+idx;
	}

	/** 엑셀 다운로드 **/
	function onClickXlsxOut()
	{
		let url = api.xlsxOutDoitReview;
		let errMsg = label.list + message.ajaxLoadError;
		let param = {
			"from_date" : ""
			,"to_date" : ""
			,"search_type" : "doit_uuid"
			,"keyword" : g_doit_uuid
			,"rating_list" : [1,2,3,4,5]
			,"is_report" : "ALL"
			,"is_blind" : "ALL"
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), xlsxOutCallback, errMsg, false);
	}

	function xlsxOutCallback(data)
	{
		let	filename = `${g_doit_title}_리뷰 정보`;
		let	sheetname = '리뷰 정보';

		setExcelData(filename, sheetname, data.data);
	}