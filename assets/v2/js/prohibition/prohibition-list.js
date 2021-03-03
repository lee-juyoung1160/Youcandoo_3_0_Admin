
	import {ajaxRequestWithJsonData, headers} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, btnCreate, btnSubmit, btnDelete, keyword, dataTable, selPageLength, modalClose, modalBackdrop, banWords,} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {initSelectOption, fadeoutModal, fadeinModal, initPageLength} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, multiCheckBoxDom} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

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
		btnCreate		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmit		.on("click", function () { onSubmitProhibition(); });
		btnDelete		.on("click", function () { onClickBtnDelete(); });
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
				url: api.prohibitionList,
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
				{title: "", 		data: "idx",   	  width: "5%",
					render: function (data, type, row, meta) {
						return multiCheckBoxDom(meta.row);
					}
				}
				,{title: "금칙어", 	data: "word",     width: "80%" }
				,{title: "등록일", 	data: "created",  width: "15%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select:{
				style: 'multi',
				selector: ':checkbox'
			},
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

	function addDeleteEvent()
	{
		document.querySelectorAll('.delete-btn').forEach( element => element.addEventListener('click', deleteRow));
	}

	function onClickModalOpen()
	{
		fadeinModal();
		banWords.trigger('focus');
	}

	function onSubmitProhibition()
	{
		if (createValidation())
			sweetConfirm(message.change, createRequest);
	}

	function createValidation()
	{
		if (isEmpty(banWords.val()))
		{
			sweetToast(`금칙어는 ${message.required}`)
			banWords.trigger('focus');
			return false;
		}

		return true;
	}

	function createRequest()
	{
		const url = api.createProhibition;
		const errMsg = label.submit+message.ajaxError;
		const inputValue = banWords.val();
		const inputValues = inputValue.split(",");
		let words = [];
		/** 공백 제거 **/
		inputValues.map(value => words.push(value.trim()))

		const param = { "word" : words };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		fadeoutModal();
		onSubmitSearch();
	}

	function onClickBtnDelete()
	{
		if (deleteValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteValidation()
	{
		const table = dataTable.DataTable();
		const selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			sweetToast(`대상을 ${message.select}`);
			return false;
		}

		return true;
	}

	function deleteRequest()
	{
		const url = api.deleteProhibition;
		const errMsg = label.delete + message.ajaxError;
		const param = { "category_list" : g_delete_uuids };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), deleteCallback, errMsg, false)
	}

	function deleteCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
	}

	function deleteSuccess()
	{
		onSubmitSearch();
	}

	function getRowsId()
	{
		const rows = dataTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			let uuid = $(rows[i]).data('uuid');
			if (isEmpty(uuid)) continue;
			uuids.push(uuid);
		}

		return uuids;
	}
