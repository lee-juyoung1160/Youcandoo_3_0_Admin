
	import { headers, ajaxRequestWithJsonData } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
		body,
		btnSearch,
		btnReset,
		keyword,
		dataTable,
		reOrderTable,
		btnReorder,
		modalOpen, modalClose, modalBackdrop } from  '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import { fadeinModal, fadeoutModal, initTableDefaultConfig, onErrorImage, buildTotalCount } from "../modules/common.js";
	import { setHistoryParam } from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	/** 모달 **/

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
		modalOpen		.on("click", function () { fadeinModal(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnReorder	.on("click", function () { onSubmitReorder(); });
		reOrderTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	});

	function addAttrDragonElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*5)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*50)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*30)+'px');
		return $(el);
	}

	function initSearchForm()
	{
		keyword.val('');
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
		console.log(data)
		buildGrid(data);
		buildReOrderGrid(data);
	}

	function buildGrid(data)
	{
		dataTable.DataTable({
			data: data,
			columns: [
				{title: "아이콘",    		data: "icon_image_url",  	width: "30%",
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
				,{title: "개설가능여부",    	data: "is_establish",  		width: "10%" }
				,{title: "노출여부",    		data: "is_blind",  			width: "10%" }
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: false,
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

	function tableParams()
	{
		let param = {
			"keyword" : keyword.val().trim()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildReOrderGrid(data)
	{
		reOrderTable.DataTable({
			data: data,
			columns: [
				{title: "아이콘",    		data: "icon_image_url",  	width: "30%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "카테고리명", 		data: "category_title",		width: "40%" }
				,{title: "삭제",    			data: "",  			width: "10%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-text-red">
									<i class="fas fa-minus-circle"></i>
								</button>`
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: false,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
			}
		});
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function onSubmitReorder()
	{
		sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		let categories = getRowsId();
		let param   = JSON.stringify({ "category_data" : categories });
		let url 	= api.reorderDoitCategory;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, param, reorderReqCallback, errMsg, false);
	}

	function reorderReqCallback(data)
	{
		sweetToastAndCallback(data, onSubmitSearch);
	}

	function reorderValidation()
	{
		let categories = getRowsId();
		if (categories.length === 0)
		{
			sweetToast("정렬할 카테고리가 없습니다.");
			return false;
		}

		return true;
	}

	function getRowsId()
	{
		let rows = reOrderTable.find('tbody').children();
		let categories = [];

		for (let i=0; i<rows.length; i++)
		{
			let category = $(rows[i]).data('category');
			if (isEmpty(category)) continue;

			categories.push(category);
		}

		return categories;
	}