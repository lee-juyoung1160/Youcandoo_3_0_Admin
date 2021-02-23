
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {
		body,
		btnSearch,
		btnReset,
		keyword,
		dataTable,
		updateTable,
		btnUpdate,
		modalOpen, modalClose, modalBackdrop } from  '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { fadeinModal, fadeoutModal, onErrorImage } from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount } from '../modules/tables.js';
	import { setHistoryParam } from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 입력 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		getCategoryList();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnUpdate	.on("click", function () { onSubmitUpdate(); });
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
		getCategoryList();
	}

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
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*60)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		return $(el);
	}

	function getCategoryList()
	{
		const url = api.categoryList;
		const errMsg = label.list + message.ajaxLoadError
		let param = {
			"keyword" : keyword.val().trim()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getCategoryListSuccess, errMsg, false);
	}

	function getCategoryListSuccess(data)
	{
		data.recordsTotal = data.count;
		data.recordsFiltered = data.count;
		buildGrid(data);
		buildReOrderGrid(data);
	}

	function buildGrid(data)
	{
		dataTable.DataTable({
			data: data.data,
			columns: [
				{title: "아이콘",    		data: "icon_image_url",  	width: "15%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "카테고리명", 		data: "category_title",		width: "40%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailCategory + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "개설가능여부",    	data: "is_establish",  		width: "15%" }
				,{title: "노출여부",    		data: "is_exposure",  			width: "15%" }
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
				onErrorImage();
				buildTotalCount(this);
			}
		});
	}

	function buildReOrderGrid(data)
	{
		updateTable.DataTable({
			data: data.data,
			columns: [
				{title: "아이콘",    		data: "icon_image_url",  		width: "20%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "카테고리명", 		data: "category_title",		width: "60%" }
				,{title: "삭제",    			data: "category_uuid", 		width: "20%",
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
				$(nRow).attr('data-uuid', aData.category_uuid);
			},
			drawCallback: function (settings) {
				onErrorImage();
			}
		});
	}

	function addDeleteEvent()
	{
		document.querySelectorAll('.delete-btn').forEach( element => element.addEventListener('click', deleteRow));
	}

	function onClickModalOpen()
	{
		g_delete_uuids.length = 0;
		fadeinModal();
	}

	let g_delete_uuids = [];
	function deleteRow()
	{
		$(this).closest('tr').remove();
		g_delete_uuids.push(this.id);
	}

	function onSubmitUpdate()
	{
		sweetConfirm(message.change, updateRequest);
	}

	function updateRequest()
	{
		if (updateValidation())
			g_delete_uuids.length > 0 ? deleteRequest() : reorderRequest();
	}

	function deleteRequest()
	{
		const url = api.deleteCategory;
		const errMsg = label.delete + message.ajaxError;
		const param = { "category_list" : g_delete_uuids };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), deleteCallback, errMsg, false)
	}

	function deleteCallback(data)
	{
		isSuccessResp(data) ? reorderRequest() : sweetToast(data.msg);
	}

	function reorderRequest()
	{
		const uuids = getRowsId();
		const param = { "category_list" : uuids };
		const url 	= api.reorderCategory;
		const errMsg = label.modify + message.ajaxError;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), reorderReqCallback, errMsg, false);
	}

	function reorderReqCallback(data)
	{
		sweetToastAndCallback(data, reorderSuccess);
	}

	function reorderSuccess()
	{
		fadeoutModal();
		onSubmitSearch();
	}

	function updateValidation()
	{
		let uuids = getRowsId();
		if (uuids.length === 0)
		{
			sweetToast("카테고리가 없습니다.");
			return false;
		}

		return true;
	}

	function getRowsId()
	{
		const rows = updateTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			let uuid = $(rows[i]).data('uuid');
			if (isEmpty(uuid)) continue;
			uuids.push(uuid);
		}

		return uuids;
	}