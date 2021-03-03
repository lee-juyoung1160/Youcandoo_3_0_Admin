
	import {headers} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, keyword, dataTable, selPageLength,} from '../modules/elements.js';
	import {sweetError,} from '../modules/alert.js';
	import {initSelectOption, initPageLength,} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
		/** 목록 불러오기 **/
		//buildTable();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
	});

	function initSearchForm()
	{
		initSelectOption();
		keyword.val('');
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.faqList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

					return JSON.stringify(json);
				},
				data: function (d) {
					const table = dataTable.DataTable();
					const info = table.page.info();
					const _page = (info.start / info.length) + 1;

					const param = {
						"keyword" : keyword.val().trim()
						,"limit" : Number(selPageLength.val())
						,"page" : _page
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "코드",    	data: "code",  		width: "25%" }
				,{title: "서버",    	data: "server",  	width: "25%" }
				,{title: "IOS",    	data: "ios",  		width: "25%" }
				,{title: "AOS",    	data: "aos",  		width: "25%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}
