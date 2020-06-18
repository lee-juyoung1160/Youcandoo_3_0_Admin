const formDate = document.querySelector('.date_from');
const toDate = document.querySelector('.date_to')
const searchType = document.getElementById('search_type');
const keyword = document.getElementById('keyword');
const Pages = document.querySelector('.paginate_button.current');
const limits = document.getElementById('selPageLength');
const searchBtn = document.querySelector('.search');
const resetBtn = document.querySelector('.reset');
/** 로드 시점 **/
document.addEventListener("DOMContentLoaded", function () {
	// 데이트피커 초기화
	initSearchDatepicker();
	// 상단 검색 폼 초기화
	onClickActiveAloneDayBtn($(".btn_week"));
	// 이벤트
	$("body").on("keydown", function (event) {onKeydownSearch(event)});
	dayButtons.on("click", function () {onClickActiveAloneDayBtn(this);});
	// 테이블 실행
	getBizListData();
})
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
searchBtn.addEventListener('click', () => {getBizListData();});
limits.addEventListener('change', () => {getBizListData();});
/** 데이터 **/
function tableParams (response) {
	let param = {
		"from_date": formDate.value,
		"to_date": toDate.value,
		"search_type": searchType.value,
		"keyword": keyword.value,
		"page":  (response.start / response.length) + 1,
		"limit": response.length
	}
	return JSON.stringify(param)
}
/** 테이블 **/
function getBizListData (response) {
	$('#biz-sales-table').DataTable ({
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
		processing: false,
		order: [],
		autoWidth: false,
		fixedHeader:false,
		fnRowCallback: function (nRow, aData) {
		console.log(aData)
			setUcdRowAttributes(nRow, aData);
		},
		drawCallback: function (settings) {
			buildTotalCount($('#biz-sales-table'));
		},
		ajax: {
			url: "https://api.youcandoo.co.kr/v1.0/admin/ucd/sales/list",
			headers: headers,
			dataType: 'JSON',
			type: 'POST',
			data : function (responsed) {
				return tableParams(responsed)
			},
			error: function (d) {
				console.log(d)
			},
		}, columns: [
			{title:"기업명", data: "nickname"},
			{title:"구분", data: "division"},
			{title:"금액", data:"amount", render: function (data) {
					return numberWithCommas(data);
				}},
			{title:"제목", data: "title"},
			{title:"내용", data:"description"},
			{title:"담당자", data:"created_user"},
			{title:"일시",  data:"created_datetime"}
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
function setUcdRowAttributes(nRow, aData)
{
	if (isNegative(aData.amount))
		$(nRow).addClass('minus-pay');
}




