
    const search 		= $(".search");
    const reset 		= $(".reset");
    const dataTable		= $("#dataTable")
    const dateType		= $("#dateType");
    const searchType 	= $("#searchType");
    const selMatch 		= $("#selMatch");
    const keyword		= $("#keyword");
    const selDivision1	= $("#selDivision1");
    const selDivision2	= $("#selDivision2");
    const selPageLength = $("#selPageLength");
    const ucdType 		= $("input[name=radio-type]");
    const userDivision	= $("input[name=radio-user-division]");

    $( () => {
        /** dataTable default config **/
        initTableDefault();
        /** 데이트피커 초기화 **/
        initSearchDatepicker();
        /** 상단 검색 폼 초기화 **/
        initSearchForm();
        /** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
        initPageLength(selPageLength);
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
        ucdType.eq(0).prop("checked", true);
        userDivision.eq(0).prop("checked", true);
        initSelectOption();
        initSearchDateRange();
        initMaxDateToday();
        initDayBtn();
    }

    function buildGrid()
    {
        dataTable.DataTable({
            ajax : {
                url: api.listCancelUcd,
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
                {title: "닉네임", 	data: "nickname",           width: "20%" }
                ,{title: "유형", 	data: "ucd_type",           width: "10%" }
                ,{title: "금액", 	data: "amount",    	        width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "내용", 	data: "description",        width: "30%",    className: "no-sort" }
                ,{title: "담당자", 	data: "created_user",       width: "10%",    className: "no-sort" }
                ,{title: "취소일시",  data: "created_datetime",   width: "15%" }
                ,{title: "메모", 	data: "memo",               width: "5%",     className: "no-sort",
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
                initTableSorter(this);
            },
            fnRowCallback: function( nRow, aData ) {
            },
            drawCallback: function (settings) {
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
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

    function tableParams()
    {
        let table = dataTable.DataTable();
        let info = table.page.info();
        let _page = (info.start / info.length) + 1;

        let param = {
            "limit" : Number(selPageLength.val())
            ,"page" : _page
            ,"dateType" : dateType.val()
            ,"from_date" : dateFrom.val()
            ,"to_date" : dateTo.val()
            ,"search_type" : searchType.val()
            ,"keyword_type" : selMatch.val()
            ,"keyword" : keyword.val()
            ,"division" : selDivision1.val()
            ,"title" : selDivision2.val()
            ,"ucd_type" : $("input[name=radio-type]:checked").val()
        }

        /** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
        setHistoryParam(param);

        return JSON.stringify(param);
    }

    function onSubmitSearch()
    {
        let table = dataTable.DataTable();
        table.page.len(Number(selPageLength.val()));
        table.ajax.reload();
        initMaxDateToday();
    }
