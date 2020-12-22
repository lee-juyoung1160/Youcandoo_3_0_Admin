
	const ulTab 		= $("#ulTab");
	const tabContent	= $(".tab-content");
	const goUpdate      = $("#goUpdate");

	/** modal 공통 **/
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];
	let g_xlsx_type;

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** n개씩보기 셀렉트 박스 초기화 **/
		initPageLength(selPageLengthForUser);
		initPageLength(selPageLengthForReview);
		initPageLength(selPageLengthForUcd);
		initActionPageLength(selPageLengthForAction);
		/** 두잇 상세정보 **/
		getDetail();
		/** 이벤트 **/
		ulTab			.on('click', function (event) { onClickTab(event); });
		goUpdate		.on('click', function () { goUpdatePage(); })
		selPageLengthForUser	.on('change', function () { getJoinMember(); });
		selPageLengthForAction	.on('change', function () { onChangePageLengthForAction(); });
		selPageLengthForReview	.on('change', function () { getInvolveReview(); });
		selPageLengthForUcd		.on('change', function () { getUcdLog(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		search			.on('click', function () { getJoinMember(); });
		reset			.on('click', function () { initSearchForm(); });
		btnWarnYellow	.on('click', function () { g_warn_type = 'Y'; onClickBtnWarn(); });
		btnWarnRed		.on('click', function () { g_warn_type = 'R'; onClickBtnWarn(); });
		btnReport		.on('click', function () { g_warn_type = ''; onClickBtnWarn(); });
		btnSubmitWarn	.on('click', function () { onSubmitWarn(); });
		btnBlind		.on('click', function () { g_blind_type = 'Y'; onClickUpdateBlindReview(); });
		btnUnBlind		.on('click', function () { g_blind_type = 'N'; onClickUpdateBlindReview(); });
		viewType		.on('change', function () { onChangeViewType(); });
		btnNotice		.on('click', function () { onClickBtnTalkType(this) });
		btnGeneral		.on('click', function () { onClickBtnTalkType(this) });
		btnCreateTalk	.on('click', function () { modalCreateTalkOpen() });
		btnSubmitTalk	.on('click', function () { onSubmitTalk() });
		/*btnXlsxOutForUser		.on('click', function () { g_xlsx_type = 'user'; onClickXlsxOut(); });*/
		btnXlsxOutForReview		.on('click', function () { g_xlsx_type = 'review'; onClickXlsxOut(); });
		btnXlsxOutForUcd		.on('click', function () { g_xlsx_type = 'ucd'; onClickXlsxOut(); });
	});

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
	}

	/** 수정페이지 이동 **/
	function goUpdatePage()
	{
		location.href = page.updateDoit+idx;
	}

	/** 엑셀 다운로드 **/
	function onClickXlsxOut()
	{
		let url;
		let errMsg = label.list + message.ajaxLoadError;
		let param = {};
		/*if (g_xlsx_type === 'user')
		{
			url = api.xlsxOutDoitMember;
			param["doit_uuid"] = g_doit_uuid;
			param["nickname"] = "";
		}
		else*/
		if (g_xlsx_type === 'review')
		{
			url = api.xlsxOutDoitReview;
			param["from_date"] = "";
			param["to_date"] = "";
			param["search_type"] = "doit_uuid";
			param["keyword"] = g_doit_uuid;
			param["rating_list"] = [1,2,3,4,5];
			param["is_report"] = "ALL";
			param["is_blind"] = "ALL";
		}
		else
		{
			url = api.xlsxOutDoitUcd;
			param["doit_uuid"] = g_doit_uuid;
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), xlsxOutCallback, errMsg, false);
	}

	function xlsxOutCallback(data)
	{
		let filename;
		let sheetname;
		if (g_xlsx_type === 'user')
		{
			filename = `${g_doit_title}_참여자 정보`;
			sheetname = '참여자 정보';
		}
		else if (g_xlsx_type === 'review')
		{
			filename = `${g_doit_title}_리뷰 정보`;
			sheetname = '리뷰 정보';
		}
		else
		{
			filename = `${g_doit_title}_UCD 정보`;
			sheetname = 'UCD 정보';
		}

		setExcelData(filename, sheetname, data.data);
	}