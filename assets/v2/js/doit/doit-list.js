
	import { ajaxRequestWithJsonData } from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {
		body,
		btnSearch,
		btnReset,
		keyword,
		dateButtons,
		chkStatus,
		selPageLength,
		selSort,
		dataTable,
		} from  '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { onClickDateRangeBtn, initDayBtn, initSearchDatepicker, initSearchDateRangeMonths, initMaxDateMonths, initPageLength } from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount } from '../modules/tables.js';
	import { setHistoryParam } from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** 입력 폼 초기화 **/
		initSearchForm();
		initPageLength(selPageLength);
		/** 목록 불러오기 **/
		//getDoitList();
		/** 이벤트 **/
		//body  		.on("keydown", function (event) { onKeydownSearch(event) });
		//btnSearch	.on("click", function () { onSubmitSearch(); });
		btnReset	.on("click", function () { initSearchForm(); });
		dateButtons	.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateMonths()
		initSearchDateRangeMonths();
		keyword.val('');
		chkStatus.prop('checked', true);
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		getDoitList();
	}

	function getDoitList()
	{
		const url = api.doitList;
		const errMsg = label.list + message.ajaxLoadError
		let param = {
			"keyword" : keyword.val().trim()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDoitListSuccess, errMsg, false);
	}

	function getDoitListSuccess(data)
	{
		data.recordsTotal = data.count;
		data.recordsFiltered = data.count;
		buildGrid(data);
	}

	function buildGrid(data)
	{
		dataTable.DataTable({
			data: data.data,
			columns: [
				{title: "카테고리",    	data: "category_title",  	width: "10%" }
				,{title: "세부 카테고리", 	data: "subcategory_title",	width: "10%" }
				,{title: "두잇명", 		data: "doit_title",			width: "30%" }
				,{title: "개설자", 		data: "nickname",			width: "10%" }
				,{title: "생성일", 		data: "created",			width: "10%" }
				,{title: "오픈일", 		data: "opened",				width: "10%" }
				,{title: "참여인원",    	data: "doit_member",  		width: "10%" }
				,{title: "상태",    		data: "doit_status",  		width: "10%" }
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
			}
		});
	}
