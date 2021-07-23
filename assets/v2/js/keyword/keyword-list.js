
	import {ajaxRequestWithJson, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url-v1.js';
	import {dataTable, updateTable, btnUpdate, modalClose, modalBackdrop, btnSubmitUpdate,
		modalUpdate, modalCreate, keyword, btnSubmit, btnCreate, lengthInput} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {calculateInputLength, fadeoutModal, limitInputLength, overflowHidden} from "../modules/common.js";
	import {initTableDefaultConfig, toggleBtnPreviousAndNextOnTable} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 목록 불러오기 **/
		getKeywordList();
		/** 이벤트 **/
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnCreate		.on("click", function () { onClickModalCreateOpen(); });
		btnUpdate		.on("click", function () { onClickModalUpdateOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmitUpdate	.on("click", function () { onSubmitUpdate(); });
		btnSubmit		.on("click", function () { onSubmitKeyword(); });
	});

	function initTableSort()
	{
		updateTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	}

	function addAttrDragonElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*80)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		return $(el);
	}

	function getKeywordList()
	{
		ajaxRequestWithJson(true, api.keywordList, null)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? getKeywordListCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.list + message.ajaxLoadError));
	}

	function getKeywordListCallback(data)
	{
		data.recordsTotal = data.count;
		data.recordsFiltered = data.count;
		buildTable(data);
	}

	function buildTable(data)
	{
		dataTable.DataTable({
			data: data.data,
			columns: [
				{title: "추천검색어",	data: "keyword" }
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
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function onClickModalUpdateOpen()
	{
		g_delete_uuids.length = 0;
		modalUpdate.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		buildUpdateTable();
	}

	function buildUpdateTable()
	{
		const table = dataTable.DataTable();
		const tableData = table.rows().data();
		const data = tableData.length > 0 ? tableData : [];

		updateTable.DataTable({
			data: data,
			columns: [
				{title: "추천검색어", 		data: "keyword",	width: "80%" }
				,{title: "삭제",    		data: "idx", 		width: "20%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-text-red delete-btn" id="${data}"><i class="fas fa-minus-circle"></i></button>`
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			scrollY: 450,
			scrollCollapse: true,
			initComplete: function () {
				initTableSort();
				addDeleteEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-idx', aData.idx);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function addDeleteEvent()
	{
		$(".delete-btn").on('click', function () { deleteRow(this); })
	}

	let g_delete_uuids = [];
	function deleteRow(obj)
	{
		$(obj).closest('tr').remove();
		g_delete_uuids.push(obj.id);
	}

	function onSubmitUpdate()
	{
		if (updateValidation())
			sweetConfirm(message.change, updateRequest);
	}

	function updateRequest()
	{
		const param = { "keyword_list" : getRowsId() };

		ajaxRequestWithJson(true, api.updateKeyword, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, requestSuccess);
			})
			.catch(reject => sweetError(label.modify + message.ajaxError));
	}

	function updateValidation()
	{
		if (getRowsId().length === 0)
		{
			sweetToast("추천검색어가 없습니다.");
			return false;
		}

		return true;
	}

	function onClickModalCreateOpen()
	{
		const rows = dataTable.find('tbody').children();
		if (rows.length >= 10)
		{
			sweetToast(message.maxAddTen);
			return;
		}
		modalCreate.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		keyword.val('');
		keyword.trigger('focus');
		calculateInputLength();
	}

	function onSubmitKeyword()
	{
		if (createValidation())
			sweetConfirm(message.create, createRequest)
	}

	function createValidation()
	{
		if (isEmpty(keyword.val()))
		{
			sweetToast(`추천 검색어는 ${message.required}`);
			keyword.trigger('focus');
			return false;
		}

		return true;
	}

	function createRequest()
	{
		const param = { "keyword" : keyword.val().trim() }

		ajaxRequestWithJson(true, api.createKeyword, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, requestSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function requestSuccess()
	{
		fadeoutModal();
		getKeywordList();
	}

	function getRowsId()
	{
		const rows = updateTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			const uuid = $(rows[i]).data('idx');
			if (isEmpty(uuid)) continue;
			uuids.push(uuid);
		}

		return uuids;
	}
