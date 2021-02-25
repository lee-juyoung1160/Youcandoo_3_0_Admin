
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import { dataTable, updateTable, btnUpdate, previewTitle, modalOpen, modalClose, modalBackdrop } from  '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { fadeinModal, fadeoutModal, onErrorImage } from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount } from '../modules/tables.js';
	import { setHistoryParam } from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 목록 불러오기 **/
		//getPickList();
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
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*10)+'px');
		return $(el);
	}

	function getPickList()
	{
		const url = api.pickList;
		const errMsg = label.list + message.ajaxLoadError

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		ajaxRequestWithJsonData(true, url, null, getCategoryListCallback, errMsg, false);
	}

	function getCategoryListCallback(data)
	{
		if (isSuccessResp(data))
		{
			data.recordsTotal = data.count;
			data.recordsFiltered = data.count;
			buildGrid(data);
			buildUpdateGrid(data);
		}
		else
			sweetToast(data.msg);
	}

	function buildGrid(data)
	{
		dataTable.DataTable({
			data: data.data,
			columns: [
				{title: "큐레이션 명", 	data: "banner_title",	width: "70%",
					render: function (data) {
						return `<a class="view-preview" data-uuid="${row.recommend_uuid}">${data}</a>`
					}
				}
				,{title: "노출여부",    	data: "is_exposure",  	width: "20%" }
				,{title: "수정",    		data: "idx",  			width: "10%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-teal">수정</button>`;
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
				addPreviewEvent();
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				onErrorImage();
				buildTotalCount(this);
			}
		});
	}

	function addPreviewEvent()
	{
		document.querySelectorAll('.view-preview').forEach( element => element.addEventListener('click', viewPreview));
	}

	function viewPreview()
	{
		previewTitle.text($(this).text());
		getPreviewList($(this).data("uuid"));
	}

	function getPreviewList(uuid)
	{
		let url 	= api.listDoitRecommended;
		let errMsg 	= label.list + message.ajaxLoadError;
		let param 	= { "recommend_uuid" : uuid };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), buildPreview, errMsg, false);
	}

	function buildUpdateGrid(data)
	{
		updateTable.DataTable({
			data: data.data,
			columns: [
				{title: "큐레이션 명", 	data: "banner_title",		width: "70%" }
				,{title: "삭제",    		data: "banner_uuid", 		width: "10%",
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
				$(nRow).attr('data-uuid', aData.banner_uuid);
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
		const url = api.deleteBanner;
		const errMsg = label.delete + message.ajaxError;
		const param = { "pick_list" : g_delete_uuids };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), deleteCallback, errMsg, false)
	}

	function deleteCallback(data)
	{
		isSuccessResp(data) ? reorderRequest() : sweetToast(data.msg);
	}

	function reorderRequest()
	{
		const uuids = getRowsId();
		const param = { "pick_list" : uuids };
		const url 	= api.reorderBanner;
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
			sweetToast("큐레이션이 없습니다.");
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