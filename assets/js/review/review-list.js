
    const searchType    = document.getElementById('search_type');
    const keyword       = document.getElementById('keyword');
    const limits        = document.getElementById('selPageLength');
    const searchBtn     = document.querySelector('.search');
    const resetBtn      = document.querySelector('.reset');
    const days          = document.querySelector('.day-btn');
    const ratingLists   = document.getElementsByName('chk-grade');
    const reviewTable   = document.getElementById('review-table');
    const select        = $("select");
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
    const ratingEl 	    = $("#rating");
    const reportCountEl	= $("#report_count");
    const nicknameEl    = $("#nickname");
    const createdEl	    = $("#created");
    const isBlindEl	    = $("#is_blind");

    /** 로드 시점 **/
    document.addEventListener("DOMContentLoaded", function () {
        /** 데이트피커 초기화 **/
        initSearchDatepicker();
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
        resetBtn    .addEventListener('click', () => { initSearchForm(); });
        /** 검색시 테이블 호출 **/
        searchBtn   .addEventListener('click', () => {onSubmitSearch();});
        limits      .addEventListener('change', () => {onSubmitSearch();});

        modalCloseBtn.on('click', function () { modalFadeout(); });
        modalLayout	 .on('click', function () { modalFadeout(); });
    });

    /** 평점 마지막 하나일때 고정하기 **/
    for (let i=0; i<ratingLists.length; i++) {
        let clickCount = ratingLists[i];
        clickCount.addEventListener('click', function () {
            let checkedCount = document.querySelectorAll('.rating-list input[name=chk-grade]:checked').length;
            if (checkedCount === 0 ) {
                alert('최소 하나 이상의 값을 선택해야 합니다.');
                clickCount.checked = true;
            }
        });
    }

    function initSearchForm() {
        keyword.value = "";
        initSelectOption();
        initSearchDateRange();
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
            searching: false, /** 검색 **/
            lengthChange: false, /** 블록 단위 변경기능 **/
            info: false, /** 페이징 상태에 대한 정보 표시  **/
            padding: false, /** 열 너비 계산 **/
            ordering: false, /** 원하는 순서대로 데이터 표시 **/
            paging: true, /** 페이징 **/
            destroy: true, /** 기존 테이블을 삭제하고 새 옵션으로 바꿈 **/
            select: {
                style: 'multi',
                selector: ':checkbox'
            },
            pageLength: Number(limits.value),
            serverSide: true, /** true = 서버쪽으로 페이지네이션 처리 요청(페이지 이동시 서버호출함), false = 전체 데이터를 불러워서 datatable 을 이용하여 웹에서 페이지네이션 처리(페이지 이동시 서버호출하지 않음) **/
            processing: false,
            order: [],
            autoWidth: false,
            fixedHeader:false,
            initComplete: function () {
            },
            fnRowCallback: function (nRow, aData) {
            },
            drawCallback: function (settings) {
                buildTotalCount($(reviewTable));
            },
            ajax: {
                url: api.listReview,
                headers: headers,
                dataType: 'JSON',
                type: 'POST',
                data: function (responsed) {
                    return tableParams();
                },
                error: function (c) {
                    alert(label.list+message.ajaxLoadError);
                },
            },columns: [
                {title: tableCheckAllDom(), 	data: "idx",   width: "5%",     orderable: false,
                    render: function (data) {
                        return multiCheckBoxDom(data);
                    }
                },
                {title:"리뷰내용", data: "review_text", width: '25%',
                    render : function(data, type, full, meta) {
                        return "<a class='line-clamp' href=\"javascript: openModal('"+data+"', '"+full.rating+"', '"+full.doit_title+"', '"+full.report_count+"', '"+full.is_blind+"', '"+full.created+"', '"+full.nickname+"')\">"+data+"</a>";
                    }
                },
                {title:"평점",data: "rating", width: '10%',
                    render: function (data) {
                        return buildStar(data);
                    }
                },
                {title:"두잇명",data: "doit_title", width: '25%'},
                {title:"신고",data: "report_count", width: '10%'},
                {title:"블라인드 여부",data: "is_blind", width: '10%',
                    render: function (data) {
                        return data === 'Y' ? label.blind : label.unblind;
                    }
                },
                {title:"작성날짜",data: "created", width: '10%',
                    render: function (data) {
                        return data.substring(0, 10);
                    }},
                {title:"작성자",data: "nickname", width: '15%'}
            ],language: {
                emptyTable: message.emptyList
                , zeroRecords: message.emptyList
                , processing: message.searching
                , paginate: {
                    previous: label.previous
                    , next: label.next
                }
            }
        });
    }

    /** 타이틀 클릭시 모달 이벤트 및 데이터 **/
    function openModal (review_text, rating, doit_title, report_count, is_blind, created, nickname ) {
        reviewTextEl.html(review_text);
        doitTitleEl.html(doit_title);
        ratingEl.html(rating);
        reportCountEl.html(report_count);
        nicknameEl.html(nickname);
        createdEl.html(created);
        isBlindEl.html(is_blind);
        modalLayout.fadeIn(500);
        modalDetail.fadeIn(500);
        overflowHidden();
        /** 모달 평점에 따른 별 추가 **/
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
            i < Number(rating) ? starEl += '<li class="on"><i class="fas fa-star"></i></li>' : starEl += '<li><i class="fas fa-star"></i></li>';
        starEl += '</ol>';

        return starEl;
    }

    /** by.leo **/
    function onClickUpdateBlind()
    {
        if (blindValidation())
        {
            if (confirm('상태를 '+message.change))
            {
                $.ajax({
                    url: api.updateBlind,
                    type: "POST",
                    headers: headers,
                    dataType: 'json',
                    data: blindParams(),
                    success: function(data) {
                        alert(getStatusMessage(data));
                        if (isSuccessResp(data))
                            getReviewListData();
                    },
                    error: function (request, status) {
                        alert(label.modify+message.ajaxError);
                    },
                });
            }
        }
    }

    function blindValidation()
    {
        let table 		 = $(reviewTable).DataTable();
        let selectedData = table.rows('.selected').data();

        if (isEmpty(selectedData))
        {
            alert('대상을 목록에서 '+message.select);
            return false;
        }

        return true;
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

    function onSubmitSearch()
    {
        getReviewListData();
    }