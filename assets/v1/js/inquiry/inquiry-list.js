
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selInquiryType = $("#selInquiryType");
	const selPageLength = $("#selPageLength");
	const status		= $("input[name=radio-status]");

	$(() => {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
        /** dataTable default config **/
        initTableDefault();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화
		 *  메뉴클릭으로 페이지 진입 > 초기값 세팅
		 *  뒤로가기로 페이지 진입 > 이전 값 세팅
		 * **/
		isBackAction() ? setHistoryForm() : initSearchForm();
		/** 테이블 데이터 로드 **/
		buildGrid();

		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initSearchForm()
	{
		keyword.val('');
		status.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRange();
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
        selInquiryType.val(historyParams.qna_type);
        onChangeSelectOption(selInquiryType);
        selPageLength.val(historyParams.limit);
        onChangeSelectOption(selPageLength);
        status.each(function () {
            if ($(this).val() === historyParams.status)
                $(this).prop("checked", true);
        });

        _page = historyParams.page;
    }

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listInquiry,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function (request, status) {
					sweetToast(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "문의구분",    data: "qna_type",    		width: "10%" }
				,{title: "제목",  	 data: "title",    			width: "20%",
                    render: function (data, type, row, meta) {
						let baseUrl = row.status === '대기' ? page.updateInquiry : page.detailInquiry;
				        return `<a href="${baseUrl}${row.idx}" class="line-clamp" style="max-width: 280px">${data}</a>`;
                    }
                }
				, {title: "회원구분",  data: "profile_uuid", 		width: "5%",
					render: function (data) {
						return isEmpty(data) ? label.guest : label.member;
					}
				}
				,{title: "닉네임", 	 data: "user_idx",			width: "20%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? row.name : `<a href="${page.detailUser}${data}" class="line-clamp" style="max-width: 280px">${row.nickname}</a>`;
					}
				}
				,{title: "등록일시",   data: "created_datetime",  width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "담당자",  	 data: "userid",    		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "처리일시",   data: "comment_datetime",  width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "답변상태",  data: "status",  			width: "5%" }
				,{title: "메모",  	data: "memo",    			width: "5%",
					render: function (data) {
						return buildMemo(data);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
			initComplete: function () {
                $(this).on('page.dt', function () { _page = getCurrentPage(this); });
                redrawPage(this, _page);
			},
			fnRowCallback: function( nRow, aData ) {
			},
            drawCallback: function (settings) {
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            }
		});
	}

	function tableParams()
	{
		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"qna_type" : selInquiryType.val()
			,"status" : $("input:radio[name=radio-status]:checked").val()
		}

		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildMemo(data)
	{
		let memoEl =
			`<div class="tooltip">`
		if (!isEmpty(data))
			memoEl +=   '<i onmouseover="mouseoverMemo(this);" onmouseleave="mouseoutMemo(this);" class="fas fa-check-circle tooltip-mark on" style="cursor:pointer;"></i>';
		else
			memoEl +=   '<i class="fas fa-check-circle tooltip-mark" style="cursor: default;"></i>';
		memoEl +=
			`<div class="tooltip-hover-text" style="display: none;">
                    <strong>memo</strong>
                    <p>${data}</p>
                </div>
            </div>`

		return memoEl;
	}

	function mouseoverMemo(obj)
	{
		$(obj).siblings().show();
	}

	function mouseoutMemo(obj)
	{
		$(obj).siblings().hide();
	}

	function onSubmitSearch()
	{
        _page = 1;
        let table = dataTable.DataTable();
        table.page.len(Number(selPageLength.val()));
        table.ajax.reload();
        initMaxDateToday();
	}

