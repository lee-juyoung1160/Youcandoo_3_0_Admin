
	import {headers, isSuccessResp, invalidResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {body, dateButtons, dataTable, keyword, selPageLength, btnSearch, btnReset, selSearchType, selType, rdoOpen,} from '../modules/elements.js';
	import {sweetError, sweetToast} from '../modules/alert.js';
	import {onClickDateRangeBtn, initPageLength, initSelectOption, onErrorImage} from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, getCurrentPage, redrawPage } from '../modules/tables.js';
	import { setHistoryParam, getHistoryParam, isBackAction } from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {numberWithCommas} from "../modules/utils.js";

	let _currentPage = 1;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		isBackAction() ? setHistoryForm() : initSearchForm();
		/** 목록 불러오기 **/
		buildTable();
		/** 이벤트 **/
		body  		.on("keydown", function (event) { onKeydownSearch(event) });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch 	.on("click", function () { onSubmitSearch(); });
		btnReset	.on("click", function () { initSearchForm(); });
		dateButtons	.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initSelectOption();
		keyword.val('');
		rdoOpen.eq(0).prop('checked', true);
	}

	function setHistoryForm()
	{
		const historyParams = getHistoryParam();

		selSearchType.val(historyParams.search_type);
		keyword.val(historyParams.keyword);
		selType.val(historyParams.badge_type);
		rdoOpen.each(function () {
			$(this).prop('checked', $(this).val() === historyParams.is_display);
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
				url: api.badgeList,
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
				{title: "뱃지명",    	data: "title",  		width: "15%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailBadge}${row.idx}">${data}</a>`;
					}
				}
				,{title: "설명", 	data: "description",	width: "15%" }
				,{title: "타입", 	data: "type",			width: "10%",
					render: function (data) {
						switch (data) {
							case 'ongoing' : return '연속 인증';
							case 'action' : return '누적 인증';
							case 'leader' : return '리더 랭킹';
							default : return label.dash;
						}
					}
				}
				,{title: "취득조건(횟수/순위)", 	data: "terms",			width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "난이도", 			data: "priority",		width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "이미지", 			data: "image_url",		width: "8%",
					render: function (data) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "팝업 이미지", 		data: "popup_image_url",	width: "8%",
					render: function (data) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "Lottie 타입", 		data: "popup_lottie_type",	width: "8%" }
				,{title: "공개여부", 			data: "is_display",			width: "5%" }
				,{title: "등록일", 			data: "created",			width: "10%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
			initComplete: function () {
				$(this).on('page.dt', function () { _currentPage = getCurrentPage(this); });
				redrawPage(this, _currentPage);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
				onErrorImage();
			}
		});
	}

	function tableParams()
	{
		const param = {
			"search_type": selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"badge_type" : selType.val(),
			"is_display" : $("input[name=radio-open]:checked").val(),
			"page": _currentPage,
			"limit": selPageLength.val(),
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}
