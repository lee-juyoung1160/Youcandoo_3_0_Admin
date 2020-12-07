
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
		/** 문의구분 셀렉트 박스 **/
		/*getInquiryType();*/
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
		$("body")  		.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	/*function getInquiryType()
	{
	    let url = api.getInquiryType;
        let errMsg = `문의구분 목록 ${message.ajaxLoadError}`;

        ajaxRequestWithJsonData(false, url, null, getInquiryTypeCallback, errMsg, completeCallback);
	}

    function getInquiryTypeCallback(data)
    {
        let options = '<option value="all">전체</option>';
        let datas = data.data;
        let i = 0;
        for (i; i<datas.length; i++)
        {
            let { category, category_uuid } = datas[i];
            options += `<option value="${category_uuid}">${category}</option>`
        }

        selInquiryType.html(options);

        onChangeSelectOption(selInquiryType);
    }

    function completeCallback()
    {
        /!** n개씩 보기 초기화 **!/
        initPageLength(selPageLength);
        /!** 상단 검색 폼 초기화
         *  메뉴클릭으로 페이지 진입 > 초기값 세팅
         *  뒤로가기로 페이지 진입 > 이전 값 세팅
         * **!/
        isBackAction() ? setHistoryForm() : initSearchForm();
        /!** 테이블 데이터 로드 **!/
        buildGrid();
    }*/

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
				{title: "문의구분",   data: "qna_type",    		width: "10%" }
                ,{title: "답변상태",  data: "status",  			width: "5%" }
				,{title: "제목",  	 data: "title",    			width: "25%",
                    render: function (data, type, row, meta) {
						let baseUrl = row.status === '대기' ? page.updateInquiry : page.detailInquiry;
				        return `<a href="${baseUrl}${row.idx}">${data}</a>`;
                    }
                }
				,{title: "작성자", 	 data: "profile_uuid",		width: "20%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? row.name : row.nickname;
					}
				}
				,{title: "등록일시",   data: "created_datetime",  width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "답변자",  	 data: "userid",    		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "답변일시",   data: "comment_datetime",  width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "메모",  	 data: "memo",    			width: "5%",
					render: function (data) {
						return !isEmpty(data) ? label.memo : label.dash
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

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{

	}

	function onSubmitSearch()
	{
        _page = 1;
        let table = dataTable.DataTable();
        table.page.len(Number(selPageLength.val()));
        table.ajax.reload();
        initMaxDateToday();
	}

