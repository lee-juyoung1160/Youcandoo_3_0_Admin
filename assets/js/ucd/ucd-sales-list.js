
    const formDate   = document.querySelector('.date_from');
    const toDate     = document.querySelector('.date_to')
    const searchType = document.getElementById('search_type');
    const keyword    = document.getElementById('keyword');
    const limits     = document.getElementById('selPageLength');
    const searchBtn  = document.querySelector('.search');
    const resetBtn   = document.querySelector('.reset');
    const dataTable  = $('#biz-sales-table');
    /** modal **/
    const modalCloseBtn = $(".close-btn");
    const modalLayout 	= $(".modal-layout");
    const modalContent 	= $(".modal-content");
    const modalPromoTerm      = $("#modalPromoTerm");
    const modalContractTitle  = $("#modalContractTitle");
    const modalContractAmount = $("#modalContractAmount");

    /** 로드 시점 **/
    document.addEventListener("DOMContentLoaded", () => {
        /** 데이트피커 초기화 **/
        initSearchDatepicker();
        /** 상단 검색 폼 초기화 **/
        initSearchForm();
        /** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
        initPageLength(selPageLength);
        /** 테이블 실행 **/
        getBizListData();
        /** 이벤트 **/
        $("body")  .on("keydown", function (event) { onKeydownSearch(event) });
        dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
        modalCloseBtn	.on('click', function () { modalFadeout(); });
        modalLayout		.on('click', function () { modalFadeout(); });
    });

    /** 검색 필드 reset **/
    resetBtn    .addEventListener('click', () => { initSearchForm(); });
    /** 검색시 테이블 호출 **/
    searchBtn   .addEventListener('click', () => { onSubmitSearch(); });
    /** n개씩 보기 selectbox 이벤트 **/
    limits      .addEventListener('change', () => { onSubmitSearch(); });

    function initSearchForm() {
        keyword.value = "";
        initSearchDateRange();
        initDayBtn();
    }

    /** 데이터 **/
    function tableParams() {
        let table = dataTable.DataTable();
        let info  = table.page.info();
        let _page = (info.start / info.length) + 1;

        let param = {
            "from_date": formDate.value,
            "to_date": toDate.value,
            "search_type": searchType.value,
            "keyword": keyword.value,
            "page": _page,
            "limit": Number(limits.value)
        }

        /** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
        setHistoryParam(param);

        return JSON.stringify(param);
    }

    /** 테이블 **/
    function getBizListData(response) {
        dataTable.DataTable({
            /** 테이블 옵션 기능 **/
            searching: false, /** 검색 **/
            lengthChange: false, /** 블록 단위 변경기능 **/
            info: false, /** 페이징 상태에 대한 정보 표시 **/
            padding: false, /** 열 너비 계산 **/
            ordering: false, /** 원하는 순서대로 데이터 표시 **/
            paging: true, /** 페이징 **/
            destroy: false, /** 기존 테이블을 삭제하고 새 옵션으로 바꿈 **/
            pageLength: Number(limits.value),
            serverSide: true, /** true = 서버쪽으로 페이지네이션 처리 요청(페이지 이동시 서버호출함), false = 전체 데이터를 불러워서 datatable 을 이용하여 웹에서 페이지네이션 처리(페이지 이동시 서버호출하지 않음) **/
            processing: false,
            order: [],
            autoWidth: false,
            fixedHeader: false,
            initComplete: function (settings, json) {
                initTableSorter(this);
            },
            fnRowCallback: function (nRow, aData) {
                setUcdRowAttributes(nRow, aData);
            },
            drawCallback: function (settings) {
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            },
            ajax: {
                url: api.listSalesUcd,
                headers: headers,
                dataType: 'JSON',
                type: 'POST',
                data: function (responsed) {
                    return tableParams()
                },
                error: function () {
                    sweetError(label.list+message.ajaxLoadError);
                },
            },
            columns: [
                {title: "기업명", data: "nickname",          width: "10%",    className: "cursor-default" },
                {title: "구분",   data: "division",          width: "10%",    className: "cursor-default" },
                {title: "금액",   data: "amount",            width: "10%",    className: "cursor-default",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                },
                {title: "제목",   data: "title",             width: "10%",    className: "cursor-default" },
                {title: "내용",   data: "description",       width: "30%",    className: "cursor-default no-sort",
                    render: function (data) {
                        let term 	= isEmpty(data) ? label.nullValue : data[0]+label.tilde+data[1];
                        let title   = isEmpty(data) ? label.nullValue : data[2];
                        let amount  = isEmpty(data) ? label.nullValue : data[3];
                        return '<a onclick="btnModalOpen(this);" data-term="'+term+'" data-title="'+title+'" data-amount="'+amount+'">'+title+'</a>';
                    }
                },
                {title: "담당자", data: "created_user",      width: "10%",     className: "cursor-default no-sort", },
                {title: "일시",   data: "created_datetime",  width: "15%",     className: "cursor-default",
                    render: function (data) {
                        return data;
                    }
                }
            ],
            language: {
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

    function setUcdRowAttributes(nRow, aData) {
        if (isNegative(aData.amount))
            $(nRow).addClass('minus-pay');
    }

    function btnModalOpen(obj)
    {
        modalFadein();
        initModal(obj);
    }

    function initModal(obj)
    {
        modalPromoTerm.html($(obj).data('term'));
        modalContractTitle.html($(obj).data('title'));
        modalContractAmount.html(numberWithCommas($(obj).data('amount')));
    }

    function onSubmitSearch()
    {
        let table = dataTable.DataTable();
        table.page.len(Number(limits.value));
        table.ajax.reload();
        initMinMaxDate();
    }
