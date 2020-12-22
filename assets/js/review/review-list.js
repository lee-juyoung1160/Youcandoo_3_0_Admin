
    const searchType    = document.getElementById('search_type');
    const keyword       = document.getElementById('keyword');
    const limits        = document.getElementById('selPageLength');
    const searchBtn     = document.querySelector('.search');
    const resetBtn      = document.querySelector('.reset');
    const days          = document.querySelector('.day-btn');
    const ratingLists   = document.getElementsByName('chk-grade');
    const reviewTable   = document.getElementById('review-table');
    /** by.leo **/
    const btnBlind		= $("#btnBlind");
    const btnUnBlind	= $("#btnUnBlind");
    let g_blind_type;
    /** modal **/
    const modalCloseBtn = $(".close-btn");
    const modalLayout 	= $(".modal-layout");
    const modalContent 	= $(".modal-content");
    const modalDetail 	= $("#modalDetail");
    const starWrap 	    = $("#starWrap");
    const reviewTextEl 	= $("#review_text");
    const doitTitleEl 	= $("#doit_title");
    const reportCountEl	= $("#report_count");
    const nicknameEl    = $("#nickname");
    const createdEl	    = $("#created");
    const isBlindEl	    = $("#is_blind");

    /** 로드 시점 **/
    document.addEventListener("DOMContentLoaded", function () {
        /** dataTable default config **/
        initTableDefault();
        /** 데이트피커 초기화 **/
        initSearchDatepicker();
        /** n개씩 보기 초기화 **/
        initPageLength($("#selPageLength"));
        /** 상단 검색 폼 초기화 **/
        initSearchForm();
        /** 테이블 실행 **/
        getReviewListData();
        /** 이벤트 **/
        $("body")   .on("keydown", function (event) {onKeydownSearch(event)});
        dayButtons  .on("click", function () {onClickActiveAloneDayBtn(this);});
        /** by.leo **/
        btnBlind	.on('click', function () { g_blind_type = 'Y'; onClickUpdateBlind(); });
        btnUnBlind	.on('click', function () { g_blind_type = 'N'; onClickUpdateBlind(); });
        /** 검색 필드 reset **/
        resetBtn    .addEventListener('click', function () { initSearchForm(); });
        /** 검색시 테이블 호출 **/
        searchBtn   .addEventListener('click', function () {onSubmitSearch();});
        limits      .addEventListener('change', function () {onSubmitSearch();});

        modalCloseBtn.on('click', function () { modalFadeout(); });
        modalLayout	 .on('click', function () { modalFadeout(); });
    });

    /** 평점 마지막 하나일때 고정하기 **/
    for (let i=0; i<ratingLists.length; i++) {
        let clickCount = ratingLists[i];
        clickCount.addEventListener('click', function () {
            let checkedCount = document.querySelectorAll('.rating-list input[name=chk-grade]:checked').length;
            if (checkedCount === 0 ) {
                sweetToast('최소 하나 이상의 값을 선택해야 합니다.');
                clickCount.checked = true;
            }
        });
    }

    function initSearchForm() {
        keyword.value = "";
        initSelectOption();
        initSearchDateRange();
        initMaxDateToday();
        initDayBtn();
        /** 상단 검색 input 디폴드 값 **/
        ratingLists.forEach(function(item, index, array){item.checked = true;});
        document.querySelector('input[name=radio-report]').checked = true;
        document.querySelector('input[name=radio-blind]').checked = true;
    }

    /** 테이블 파라미터 **/
    function tableParams () {
        let table   = $(reviewTable).DataTable();
        let info    = table.page.info();
        let _page   = (info.start / info.length) + 1;
        let report  = document.querySelector('.report input[name=radio-report]:checked');
        let blind   = document.querySelector('.blind input[name=radio-blind]:checked');
        let checked = [];
        Array.from(ratingLists).map(function (element) {
            if (element.checked)
                checked.push(element.value);
        });

        let params = {
            "from_date": dateFrom[0].value,
            "to_date": dateTo[0].value,
            "search_type": searchType.value,
            "keyword": keyword.value,
            "rating_list": checked,
            "is_report": report.value,
            "is_blind": blind.value,
            "page":  _page,
            "limit": Number(limits.value)
        }

        /** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
        setHistoryParam(params);

        return JSON.stringify(params)
    }

    /** 테이블 **/
    function getReviewListData() {
        $(reviewTable).DataTable({
            /** 테이블 옵션 기능 **/
            serverSide: true, /** true = 서버쪽으로 페이지네이션 처리 요청(페이지 이동시 서버호출함), false = 전체 데이터를 불러워서 datatable 을 이용하여 웹에서 페이지네이션 처리(페이지 이동시 서버호출하지 않음) **/
            paging: true, /** 페이징 **/
            pageLength: Number(limits.value),
            select: {
                style: 'multi',
                selector: ':checkbox'
            },
            destroy: false, /** 기존 테이블을 삭제하고 새 옵션으로 바꿈 **/
            initComplete: function () {
                uncheckedCheckAllAfterMovePage(this);
                initTableSorter(this);
            },
            fnRowCallback: function (nRow, aData) {
            },
            drawCallback: function (settings) {
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            },
            ajax: {
                url: api.listReview,
                headers: headers,
                dataType: 'JSON',
                type: 'POST',
                data: function () {
                    return tableParams();
                },
                error: function (c) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },columns: [
                {title: tableCheckAllDom(), 	data: "idx",   width: "5%",  className: 'no-sort',
                    render: function (data) {
                        return multiCheckBoxDom(data);
                    }
                },
                {title:"리뷰내용",      data: "review_text",    width: '20%',  className: 'no-sort',
                    render : function(data, type, row, meta) {
                        return `<a class='line-clamp' 
                                    data-detail="${row.review_text}"
                                    data-title="${replaceDoubleQuotes(row.doit_title)}"
                                    data-rating="${row.rating}"
                                    data-report="${row.report_count}"
                                    data-nickname="${row.nickname}"
                                    data-blind="${row.is_blind}"
                                    data-created="${row.created}"    
                                    onclick="openModal(this)">${data}</a>`
                    }
                },
                {title:"평점",         data: "rating",        width: '10%',   className: 'no-sort',
                    render: function (data) {
                        return buildStar(data);
                    }
                },
                {title:"두잇명",        data: "doit_title",    width: '20%',
                    render: function (data, type, row, meta) {
                        return `<a href="${page.detailDoit}${row.doit_idx}">${data}</a>`
                    }
                },
                {title:"신고",          data: "report_count",  width: '5%' },
                {title:"블라인드 여부",  data: "is_blind",      width: '10%',   className: 'no-sort',
                    render: function (data) {
                        return data === 'Y' ? label.blind : label.unblind;
                    }
                },
                {title:"작성자",        data: "nickname",      width: '15%',   className: 'no-sort',
                    render: function (data, type, row, meta) {
                        return `<a href="${page.detailUser}${row.user_idx}">${data}</a>`
                    }
                },
                {title:"작성일시",      data: "created",       width: '15%' }
            ]
        });
    }

    /** 타이틀 클릭시 모달 이벤트 및 데이터 **/
    function openModal (obj) {
        reviewTextEl.html($(obj).data('detail'));
        doitTitleEl.html($(obj).data('title'));
        reportCountEl.html($(obj).data('report'));
        nicknameEl.html($(obj).data('nickname'));
        createdEl.html($(obj).data('created'));
        isBlindEl.html($(obj).data('blind'));

        modalLayout.fadeIn(500);
        modalDetail.fadeIn(500);
        overflowHidden();

        /** 모달 평점에 따른 별 추가 **/
        let rating = $(obj).data('rating');
        let liList = starWrap.find('li');
        for(let i=0; i<liList.length; i++){
            let listObj = $(liList[i]);
            if(i<rating){
                listObj.addClass('on');
            } else {
                listObj.removeClass('on');
            }
        }
    }

    function buildStar(rating)
    {
        let starEl = '<ol class="star-wrap" style="float: inherit;">';
        for (let i=0; i<5; i++)
        {
            let onAndOff = i < Number(rating) ? 'on' : '';
            starEl += `<li class="${onAndOff}"><i class="fas fa-star" style="cursor:default;"></i></li>`;
        }
        starEl += '</ol>';

        return starEl;
    }

    /** by.leo **/
    function onClickUpdateBlind()
    {
        if (blindValidation())
            sweetConfirm(`상태를 ${message.change}`, blindRequest);
    }

    function blindRequest()
    {
        let url     = api.updateBlind;
        let errMsg  = label.modify+message.ajaxError;

        ajaxRequestWithJsonData(true, url, blindParams(), blindReqCallback, errMsg, false);
    }

    function blindParams()
    {
        let table 		 = $(reviewTable).DataTable();
        let selectedData = table.rows('.selected').data();
        let reviews = [];
        for (let i=0; i<selectedData.length; i++)
            reviews.push(selectedData[i].review_uuid);

        let param = {
            "reviews" : reviews
            ,"is_blind" : g_blind_type
        };

        return JSON.stringify(param)
    }

    function blindReqCallback(data)
    {
        sweetToastAndCallback(data, blindSuccess);
    }

    function blindSuccess()
    {
        tableReloadAndStayCurrentPage($(reviewTable));
    }

    function blindValidation()
    {
        let table 		 = $(reviewTable).DataTable();
        let selectedData = table.rows('.selected').data();

        if (isEmpty(selectedData))
        {
            sweetToast(`대상을 목록에서 ${message.select}`);
            return false;
        }

        return true;
    }

    function onSubmitSearch()
    {
        let table = $(reviewTable).DataTable();
        table.page.len(Number(limits.value));
        table.ajax.reload();
        uncheckedCheckAll();
        initMaxDateToday();
    }
