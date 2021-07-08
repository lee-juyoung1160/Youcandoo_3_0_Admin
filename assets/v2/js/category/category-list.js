
	import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import { dataTable, updateTable, btnUpdate, modalOpen, modalClose, modalBackdrop } from  '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { fadeinModal, fadeoutModal, onErrorImage } from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount } from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {isEmpty} from "../modules/utils.js";

	let updateTableData = [];

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 목록 불러오기 **/
		getCategoryList();
		/** 이벤트 **/
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnUpdate	.on("click", function () { onSubmitUpdate(); });
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
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*70)+'px');
		return $(el);
	}

	function getCategoryList()
	{
		ajaxRequestWithJson(true, api.categoryList, null)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? getCategoryListCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(label.list + message.ajaxLoadError));
	}

	function getCategoryListCallback(data)
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
				{title: "아이콘",    			data: "icon_image_url",  	width: "15%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "카테고리명", 		data: "category_title",		width: "55%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailCategory + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "노출여부",    		data: "is_exposure",  		width: "15%" }
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				if (aData.is_exposure === 'Y')
					updateTableData.push(aData);
			},
			drawCallback: function (settings) {
				onErrorImage();
				buildTotalCount(this);
			}
		});
	}

	function onClickModalOpen()
	{
		fadeinModal();
		buildUpdateTable();
	}

	function buildUpdateTable()
	{
		updateTable.DataTable({
			data: updateTableData,
			columns: [
				{title: "아이콘",    		data: "icon_image_url",  	width: "20%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "카테고리명", 	data: "category_title",		width: "70%" }
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			scrollY: 450,
			scrollCollapse: true,
			initComplete: function () {
				initTableSort();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.category_uuid);
			},
			drawCallback: function (settings) {
				onErrorImage();
			}
		});
	}

	function onSubmitUpdate()
	{
		sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		const param = { "category_list" : getRowIds() };

		ajaxRequestWithJson(true, api.reorderCategory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, reorderSuccess);
			})
			.catch(reject => sweetToast(label.modify + message.ajaxError));
	}

	function reorderSuccess()
	{
		fadeoutModal();
		getCategoryList();
	}

	function getRowIds()
	{
		const rows = updateTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			const uuid = $(rows[i]).data('uuid');
			if (isEmpty(uuid)) continue;
			uuids.push(uuid);
		}

		return uuids;
	}
