const formDate = document.querySelector('.date_from');
const toDate = document.querySelector('.date_to')
const searchType = document.getElementById('search_type');
const keyword = document.getElementById('keyword');
const Pages = document.querySelector('.paginate_button.current');
const limits = document.getElementById('selPageLength');
const searchBtn = document.querySelector('.search');
const resetBtn = document.querySelector('.reset');
const days = document.querySelector('.day-btn');
const ratingLists = document.querySelectorAll('.rating-list input[name=chk-grade]');


// by.leo
const btnBlind			= $("#btnBlind");
const btnUnBlind		= $("#btnUnBlind");
let g_blind_type;

/** 로드 시점 **/
document.addEventListener("DOMContentLoaded", function () {
    // 데이트피커 초기화
    initSearchDatepicker();
    // 상단 검색 폼 초기화
    onClickActiveAloneDayBtn($(".btn_week"));
    // 이벤트
    $("body").on("keydown", function (event) {onKeydownSearch(event)});
    dayButtons.on("click", function () {onClickActiveAloneDayBtn(this);});
    // 상단 검색 input 디폴드 값
    ratingLists.forEach(function(item, index, array){item.checked = true;});
    document.querySelector('input[name=radio-report]').checked = true;
    document.querySelector('input[name=radio-blind]').checked = true;
    //by.leo
    btnBlind		.on('click', function () { g_blind_type = 'Y'; onClickUpdateBlind(); });
    btnUnBlind		.on('click', function () { g_blind_type = 'N'; onClickUpdateBlind(); });
    // 테이블 실행
    getReviewListData();
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


/** 검색 필드 reset **/
resetBtn.addEventListener('click', () => {
    keyword.value = "";
    const select = $("select");
    select.each(function () {
        $(this).children().eq(0).prop("selected", true);
        onChangeSelectOption($(this));
    });
    onClickActiveAloneDayBtn($(".btn_week"));
});
/** 검색시 테이블 호출 **/
searchBtn.addEventListener('click', () => {getReviewListData();});
limits.addEventListener('change', () => {getReviewListData();});
/** 데이터 **/
function tableParams (response) {
    const ratingLists = document.querySelectorAll('.rating-list input[name=chk-grade]:checked');
    const report = document.querySelector('.report input[name=radio-report]:checked');
    const blind = document.querySelector('.blind input[name=radio-blind]:checked');
    const ratingListCheck = Array.from(ratingLists).map(function (checkbox) {
        return checkbox.value;
    });
    let params = {
        "from_date": formDate.value,
        "to_date": toDate.value,
        "search_type": searchType.value,
        "keyword": keyword.value,
        "rating_list": ratingListCheck,
        "is_report": report.value,
        "is_blind": blind.value,
        "page":  (response.start / response.length) + 1,
        "limit": response.length
    }
    return JSON.stringify(params)
}
/** 테이블 **/
function getReviewListData(params) {
    $('#review-table').DataTable({
        // 테이블 옵션 기능
        searching: false, //검색
        lengthChange: false, // 블록 단위 변경기능
        info: false, // 페이징 상태에 대한 정보 표시
        padding: false, // 열 너비 계산
        ordering: false, //원하는 순서대로 데이터 표시
        paging: true, //페이징
        destroy: true, //기존 테이블을 삭제하고 새 옵션으로 바꿈
        select: {
            style: 'multi',
            selector: ':checkbox'
        },
        pageLength: Number(limits.value),
        serverSide: true, // true = 서버쪽으로 페이지네이션 처리 요청(페이지 이동시 서버호출함), false = 전체 데이터를 불러워서 datatable 을 이용하여 웹에서 페이지네이션 처리(페이지 이동시 서버호출하지 않음)
        processing: false,
        order: [],
        autoWidth: false,
        fixedHeader:false,
        initComplete: function () {
        },
        fnRowCallback: function (nRow, aData) {
        },
        drawCallback: function (settings) {
            buildTotalCount(dataTable);
        },
        ajax: {
            url: "https://api.youcandoo.co.kr/v1.0/admin/review/list",
            headers: headers,
            dataType: 'JSON',
            type: 'POST',
            data: function (responsed) {
                return tableParams(responsed)
            },
            error: function (c) {
                console.log(c)
            },
        },columns: [
            {title: tableCheckAllDom(), 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
                render: function (data) {
                    return multiCheckBoxDom(data);
                }
            },
            {title:"리뷰내용", data: "review_text", render : function(data, type, full, meta) {
                    return "<a class='line-clamp' href=\"javascript: openModal('"+data+"', '"+full.rating+"', '"+full.doit_title+"', '"+full.report_count+"', '"+full.is_blind+"', '"+full.created+"', '"+full.nickname+"')\">"+data+"</a>";
                }
            },
            {title:"평점",data: "rating"},
            {title:"두잇명",data: "doit_title"},
            {title:"신고",data: "report_count"},
            {title:"블라인드 여부",data: "is_blind"},
            {title:"작성날짜",data: "created"},
            {title:"작성자",data: "nickname"}
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
    $("#review_text").html(review_text);
    $("#doit_title").html(doit_title);
    $("#rating").html(rating);
    $("#report_count").html(report_count);
    $("#nickname").html(nickname);
    $("#created").html(created);
    $("#is_blind").html(is_blind);
    $(".modal-layout").fadeIn(500);
    $("#modalDetail").fadeIn(500);

    // 모달 평점에 따른 별 추가
    let liList = $('ol.star-wrap').find('li');
    for(let i=0; i<liList.length; i++){
        let listObj = $(liList[i]);
        if(i<rating){
            listObj.addClass('on');
        } else {
            listObj.removeClass('on');
        }
    }
}
function closeModal(){
     $(".modal-layout").fadeOut(500);
     $("#modalDetail").fadeOut(500);
 }
const modalCloseBtn = document.querySelector('.modal-content .close-btn');
const modalLayout = document.querySelector('.modal-layout');
modalCloseBtn.addEventListener('click', () => {closeModal();});
modalLayout.addEventListener('click', () => {closeModal();});


//by.leo
function onClickUpdateBlind()
{
    if (blindValidation())
    {
        if (confirm('상태를 '+message.change))
        {
            $.ajax({
                url: api.updateBlind,
                type: "POST",
                async: false,
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
    let table 		 = $('#review-table').DataTable();
    let selectedData = table.rows('.selected').data();

    if (isEmpty(selectedData))
    {
        alert('삭제할 대상을 목록에서 '+message.select);
        return false;
    }

    return true;
}

function blindParams()
{
    let table 		 = $('#review-table').DataTable();
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