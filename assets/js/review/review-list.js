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
});
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
        pageLength: Number(limits.value),
        serverSide: true, // true = 서버쪽으로 페이지네이션 처리 요청(페이지 이동시 서버호출함), false = 전체 데이터를 불러워서 datatable 을 이용하여 웹에서 페이지네이션 처리(페이지 이동시 서버호출하지 않음)
        initComplete: function () {
            let table = $('#review-table').DataTable();
            let info = table.page.info();
            $(".data-num").text(info.recordsTotal);
        },
        fnRowCallback: function (nRow, aData) {
            console.log(aData)
            console.log(nRow)
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
            {data: "review_text", render : function(data, type, full, meta) {
                    // 뒤에 '' 사이에추가하고싶은거 추가해서 넣으면됨.
                    return "<a href=\"javascript: openModal('"+data+"', '"+full.rating+"', '"+full.doit_title+"', '"+full.report_count+"', '"+full.is_blind+"', '"+full.created+"', '"+full.nickname+"')\">"+data+"</a>";
                }
            },
            {data: "rating"},
            {data: "doit_title"},
            {data: "report_count"},
            {data: "is_blind"},
            {data: "created"},
            {data: "nickname"},
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

}
function closeModal(){
     $(".modal-layout").fadeOut(500);
     $("#modalDetail").fadeOut(500);
 }

const modalCloseBtn = document.querySelector('.modal-content .close-btn');
const modalLayout = document.querySelector('.modal-layout');
modalCloseBtn.addEventListener('click', () => {closeModal();});
modalLayout.addEventListener('click', () => {closeModal();});
