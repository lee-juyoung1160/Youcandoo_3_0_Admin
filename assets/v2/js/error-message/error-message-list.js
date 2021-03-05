
	import {ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, keyword, dataTable,} from '../modules/elements.js';
	import {sweetToast, sweetConfirm} from '../modules/alert.js';
	import {initTableDefaultConfig, buildTotalCount,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchForm();
		/** 목록 불러오기 **/
		getErrorList();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
	});

	function initSearchForm()
	{
		keyword.val('');
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		const table = dataTable.DataTable();
		const inputValue = keyword.val();

		table.search(inputValue).draw();
	}

	function getErrorList()
	{
		const url = api.errorList;
		const errMsg = label.list + message.ajaxLoadError

		ajaxRequestWithJsonData(true, url, null, getErrorListCallback, errMsg, false);
	}

	function getErrorListCallback(data)
	{
		isSuccessResp(data) ? buildTable(data) : sweetToast(data.msg);
	}

	function buildTable(data)
	{
		dataTable.DataTable({
			data: data.data,
			columns: [
				{title: "코드",    		data: "code",  			width: "25%" }
				,{title: "메세지",    	data: "message",  		width: "25%" }
				,{title: "IOS 메세지",    data: "ios_message",	width: "25%",
					render: function (data, type, row, meta) {
						return `<div><input type="text" value="${data}" readonly/><button type="button" class="btn-sm btn-teal">수정</button></div>`
					}
				}
				,{title: "AOS 메세지",    data: "aos_message",	width: "25%",
					render: function (data, type, row, meta) {
						return `<div><input type="text" value="${data}" readonly/><button type="button" class="btn-sm btn-primary">완료</button></div>`
					}
				}
			],
			serverSide: false,
			searching: true,
			dom: 'lrt',
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
