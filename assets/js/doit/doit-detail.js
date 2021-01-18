
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
		searchApplyMember.on('click', function () { getApplyMember(); });

		selPageLengthForUser	.on('change', function () { getJoinMember(); });
		searchJoinMember.on('click', function () { getJoinMember(); });
		btnBan.on('click', function () { onClickBtnBan(); });

		selPageLengthForAction	.on('change', function () { onChangePageLengthForAction(); });
		btnWarnYellow	.on('click', function () { g_warn_type = 'Y'; onClickBtnWarn(); });
		btnWarnRed		.on('click', function () { g_warn_type = 'R'; onClickBtnWarn(); });
		btnReport		.on('click', function () { g_warn_type = ''; onClickBtnWarn(); });
		btnSubmitWarn	.on('click', function () { onSubmitWarn(); });

		selPageLengthForReview	.on('change', function () { getInvolveReview(); });
		btnXlsxOutForReview		.on('click', function () { onClickXlsxOut(); });
		btnBlind		.on('click', function () { g_blind_type = 'Y'; onClickUpdateBlindReview(); });
		btnUnBlind		.on('click', function () { g_blind_type = 'N'; onClickUpdateBlindReview(); });

		selPageLengthForUcd		.on('change', function () { getUcdLog(); });

		viewType		.on('change', function () { onChangeViewType(); });
		btnNotice		.on('click', function () { onClickBtnTalkType(this) });
		btnGeneral		.on('click', function () { onClickBtnTalkType(this) });
		btnCreateTalk	.on('click', function () { modalCreateTalkOpen() });
		btnSubmitTalk	.on('click', function () { onSubmitTalk() });
	});

	function initSearchForm()
	{
		keywordJoinMember.val('');
		keywordApplyMember.val('');
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