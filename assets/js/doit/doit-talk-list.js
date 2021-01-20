
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const talkDivision	= $("input[name=radio-talk-division]");
	const talkTypeWrap	= $("#talkTypeWrap");
	const isReport 		= $("input[name=radio-report]");
	const selPageLength	= $("#selPageLength");
	const btnBlind		= $("#btnBlind");
	const btnUnBlind	= $("#btnUnBlind");
	let g_is_blind;
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
		talkDivision   	.on("change", function () { onChangeTalkDivision(this); });
		$("input[name=chk-talk-type]").on("click", function () { atLeastOneChecked(this); });
		btnBlind      	.on("click", function () { g_is_blind = 'Y'; toggleBlind(); });
		btnUnBlind      .on("click", function () { g_is_blind = 'N'; toggleBlind(); });
	});

	function onChangeTalkDivision(obj)
	{
		let isTalk = $(obj).val() === 'talk';
		let talkTypeEl = '';
		if (isTalk)
		{
			talkTypeEl +=
				`<input onclick="atLeastOneChecked(this);" type="checkbox" id="c10" name="chk-talk-type" value="공지" checked/>
				<label for="c10"><span></span>공지</label>
	
				<input onclick="atLeastOneChecked(this);" type="checkbox" id="c11" name="chk-talk-type" value="일반" checked/>
				<label for="c11"><span></span>일반</label>`
		}

		talkTypeEl +=
			`<input onclick="atLeastOneChecked(this);" type="checkbox" id="c12" name="chk-talk-type" value="댓글" checked/>
			<label for="c12"><span></span>댓글</label>

			<input onclick="atLeastOneChecked(this);" type="checkbox" id="c13" name="chk-talk-type" value="답글" checked/>
			<label for="c13"><span></span>답글</label>`

		talkTypeWrap.html(talkTypeEl);
	}

	function initSearchForm()
	{
		const talkType = $("input[name=chk-talk-type]");
		keyword.val('');
		talkDivision.eq(0).prop("checked", true);
		talkType.eq(0).prop("checked", true);
		talkType.eq(1).prop("checked", true);
		talkType.eq(2).prop("checked", true);
		talkType.eq(3).prop("checked", true);
		isReport.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRangeToday();
		initMaxDateToday();
		initDayBtn();
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		keyword.val(historyParams.keyword);
		searchType.val(historyParams.search_type);
		dateType.val(historyParams.date_type);
		onChangeSelectOption(dateType);
		searchType.val(historyParams.search_type);
		onChangeSelectOption(searchType);
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);
		$("input[name=chk-talk-type]").each(function () {
			if ($(this).val() === historyParams.talk_type)
				$(this).prop("checked", true);
		});
		isReport.each(function () {
			if ($(this).val() === historyParams.report_yn)
				$(this).prop("checked", true);
		});

		_page = historyParams.page;
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listTalk,
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
				{title: tableCheckAllDom(), 	data: "is_del",   	width: "5%",
					render: function (data, type, row, meta) {
						return multiCheckBoxDom(meta.row);
					}
				}
				,{title: "유형",    		data: "talk_type",		width: "5%" }
				,{title: "내용",    		data: "contents",		width: "25%", class: "line-clamp-wrap",
					render: function (data, type, row, meta) {
						const isTalk = $("input[name=radio-talk-division]:checked").val() === 'talk';
						return isTalk
						? `<a href="${page.detailTalk}${row.board_idx}" onmouseenter="" class="line-clamp" style="max-width: 320px;">${data}</a>`
							:
						 `<div class="line-clamp" onclick="viewDetail(this);">
							${data}
							</div>
							<div class="tooltip-hover-text">
								<i class="fas fa-times" onclick="closeTooltip(this);"></i>
								<p>${data}</p>
							</div>`
					}
				}
				,{title: "작성자",    	data: "nickname",  		width: "15%",
					render: function (data, type, row, meta) {
						return (
							data.includes('@')
								? data
								: `<a href="${page.detailUser}${row.user_idx}">${data}</a>`
						)
					}
				}
				,{title: "신고",    		data: "report",  		width: "5%" }
				,{title: "댓글",    		data: "comment",  		width: "5%",
					render: function (data, type, row, meta) {
						return row.talk_type === '대댓글' ? '-' : data;
					}
				}
				,{title: "블라인드",    	data: "is_blind",  		width: "5%",
					render: function (data) {
						return data === 'Y' ? label.blind : label.unblind;
					}
				}
				,{title: "두잇명",    	data: "doit_title",  	width: "20%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailDoit + row.doit_idx;
						return `<a href="${detailUrl}" class="line-clamp" style="max-width: 280px;">${data}</a>`;
					}
				}
				,{title: "등록일시",    	data: "created",  		width: "10%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: false,
			initComplete: function (settings, json) {
				$(this).on('page.dt', function () { _page = getCurrentPage(this); });
				uncheckedCheckAllAfterMovePage(this);
				redrawPage(this, _page);
			},
			fnRowCallback: function( nRow, aData, displayNum, displayIndex, dataIndex ) {
				setRowAttributes(nRow, aData, dataIndex)
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let talkTypes = [];
		$("input[name=chk-talk-type]").each(function () {
			if ($(this).is(":checked"))
				talkTypes.push($(this).val());
		});

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"talk_type" : talkTypes
			,"report_yn" : $("input[name=radio-report]:checked").val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData, dataIndex)
	{
		if (aData.is_del === 'Y')
			$(nRow).addClass('f-red');
		else
		{
			if (aData.talk_type === '공지')
				$(nRow).addClass('notice-color');
			else if (aData.talk_type === '댓글')
				$(nRow).addClass('comment-color');
			else if (aData.talk_type === '답글')
				$(nRow).addClass('comment2-color');
		}
	}

	/** 블라인드 처리 **/
	function toggleBlind()
	{
		if (blindValidation())
			sweetConfirm(message.change, blindRequest);
	}

	function blindValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			sweetToast(`대상을 목록에서 ${message.select}`);
			return false;
		}

		return true;
	}

	function blindRequest()
	{
		let url 	= api.blindTalk;
		let errMsg 	= label.modify+message.ajaxError;
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		let boards = [];
		let comments = [];
		for (let i=0; i<selectedData.length; i++)
		{
			let { board_idx, comment_idx } = selectedData[i];
			isEmpty(comment_idx) ? boards.push(board_idx) : comments.push(comment_idx);
		}

		let params = {
			"board_idx" : boards,
			"comment_idx" : comments,
			"is_blind" : g_is_blind
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(params), blindReqCallback, errMsg, false);
	}

	function blindReqCallback(data)
	{
		sweetToastAndCallback(data, blindSuccess);
	}

	function blindSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function onSubmitSearch()
	{
		_page = 1;
		let table = dataTable.DataTable();
		let apiURl = $("input[name=radio-talk-division]:checked").val() === 'talk' ? api.listTalk : api.listActionTalk;
		table.ajax.url(apiURl);
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		uncheckedCheckAll();
		initMaxDateToday();
	}