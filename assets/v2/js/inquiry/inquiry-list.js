
	import {headers, isSuccessResp, invalidResp, ajaxRequestWithJson} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {
		body,
		btnSearch,
		btnReset,
		keyword,
		dataTable,
		selPageLength,
		rdoStatus,
		rdoType,
		dateButtons,
		dateFrom,
		dateTo,
		selInquiryType,
		selSearchType,
		btnXlsxExport,
		selVocType,
		selVocTypeDetail,
		selRiskGrade
	} from '../modules/elements.js';
	import {sweetError, sweetToast,} from '../modules/alert.js';
	import {initSelectOption, initPageLength, initSearchDatepicker, initDayBtn, initMaxDateToday, initSearchDateRangeMonth,
		onClickDateRangeBtn, onChangeSearchDateFrom, onChangeSearchDateTo, moveToMemberDetail,} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, getCurrentPage, redrawPage} from '../modules/tables.js';
		import {getHistoryParam, isBackAction, setHistoryParam} from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {isEmpty, getStringFormatToDate} from "../modules/utils.js";
	import {setExcelData} from "../modules/export-excel.js";

	let _currentPage = 1;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화
		 *  메뉴클릭으로 페이지 진입 > 초기값 세팅
		 *  뒤로가기로 페이지 진입 > 이전 값 세팅
		 * **/
		isBackAction() ? setHistoryForm() : initSearchForm();
		/** 목록 불러오기 **/
		buildTable();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
		btnXlsxExport	.on("click", function () { onClickBtnXlsxExport(); })
		selVocType		.on("change", function () { onChangeSelVocType(); })
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday();
		initSearchDateRangeMonth();
		initSelectOption();
		keyword.val('');
		rdoStatus.eq(0).prop('checked', true);
		rdoType.eq(0).prop('checked', true);
		onChangeSelVocType();
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		dateFrom.val(historyParams.from_date);
		dateTo.val(historyParams.to_date);
		selSearchType.val(historyParams.search_type);
		keyword.val(historyParams.keyword);
		selInquiryType.val(historyParams.qna_type);
		selVocType.val(historyParams.voc_type);
		onChangeSelVocType();
		selVocTypeDetail.val(historyParams.voc_detail_type);
		selRiskGrade.val(historyParams.risk_grade);
		rdoStatus.each(function () {
			$(this).prop('checked', $(this).val() === historyParams.status);
		})
		rdoType.each(function () {
			$(this).prop('checked', $(this).val() === historyParams.device_type);
		})
		selPageLength.val(historyParams.limit);
		_currentPage = historyParams.page;
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		_currentPage = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.inquiryList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "문의구분",    	data: "qna_type",    	width: "10%" }
				,{title: "제목",  	 	data: "title",    		width: "15%",
					render: function (data, type, row, meta) {
						let baseUrl = row.status === '대기' ? page.updateInquiry : page.detailInquiry;
						return `<a href="${baseUrl}${row.idx}" class="line-clamp-1" style="max-width: 200px">${data}</a>`;
					}
				}
				,{title: "닉네임", 	 	data: "nickname",		width: "20%",
					render: function (data, type, row, meta) {
						return isEmpty(row.profile_uuid) ? data : `<a data-uuid="${row.profile_uuid}">${data}</a>`;
					}
				}
				,{title: "등록일시",   	data: "created",  		width: "15%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "담당자",  	 	data: "userid",    		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "VOC 분류",   	data: "voc_type",  		width: "10%" }
				,{title: "리스크 등급",   	data: "risk_grade",  	width: "10%" }
				,{title: "답변상태",  	data: "status",  		width: "5%" }
				,{title: "메모",  		data: "memo",    		width: "5%",
					render: function (data) {
						return buildMemo(data);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
				$(this).on('page.dt', function () { _currentPage = getCurrentPage(this); });
				redrawPage(this, _currentPage);
			},
			fnRowCallback: function( nRow, aData ) {
				/** 닉네임 클릭이벤트 **/
				$(nRow).children().eq(2).find('a').on('click', function () { onClickNickname(this); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		const param = {
			"from_date" : dateFrom.val(),
			"to_date" : dateTo.val(),
			"search_type" : selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"qna_type" : selInquiryType.val(),
			"status" : $("input[name=radio-status]:checked").val(),
			"voc_type" : selVocType.val(),
			"voc_detail_type" : selVocTypeDetail.val(),
			"risk_grade" : selRiskGrade.val(),
			"page": _currentPage,
			"limit": selPageLength.val(),
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildMemo(data)
	{
		return isEmpty(data)
			? label.dash
			: `<i class="tooltip-mark fas fa-sticky-note"><span class="tooltip-txt left">${data}</span></i>`
	}

	function onClickNickname(obj)
	{
		moveToMemberDetail($(obj).data('uuid'));
	}

	function onClickBtnXlsxExport()
	{
		const param = {
			"from_date" : dateFrom.val(),
			"to_date" : dateTo.val(),
			"search_type" : selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"device_type" : $("input[name=radio-type]:checked").val(),
			"qna_type" : selInquiryType.val(),
			"status" : $("input[name=radio-status]:checked").val(),
		}

		ajaxRequestWithJson(true, api.xlsxOutInquiry, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getInquirySuccessCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`데이터${message.ajaxLoadError}`));
	}

	function getInquirySuccessCallback(data)
	{
		setExcelData(`문의목록_${getStringFormatToDate(new Date(), '')}`, '1:1문의', data.data);
	}

	function onChangeSelVocType()
	{
		let options = '<option value="all">전체</option>';

		switch (selVocType.val()) {
			case '개선 요청' :
				options +=
					`<option value="현 기능">현 기능</option>
					<option value="신규 기능">신규 기능</option>
					<option value="디자인">디자인</option>
					<option value="운영 정책">운영 정책</option>`
				break;
			case '이용 문의' :
				options +=
					`<option value="서비스 안내">서비스 안내</option>
					<option value="회원 정보">회원 정보</option>
					<option value="기능 문의">기능 문의</option>
					<option value="운영 정책">운영 정책</option>`
				break;
			case '기타' :
				options +=
					`<option value="이벤트 참여">이벤트 참여</option>
					<option value="사용후기">사용후기</option>
					<option value="제휴">제휴</option>`
				break;
		}

		selVocTypeDetail.html(options);
	}

