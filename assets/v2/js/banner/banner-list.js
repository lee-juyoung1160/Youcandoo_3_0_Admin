
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {
	dataTable, updateTable, btnUpdate, modalClose, modalBackdrop, btnSubmitUpdate, modalUpdate, modalDetail,
	} from '../modules/elements.js';
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
		//getBannerList();
		/** 이벤트 **/
		$(".banner-img-wrap")		.on("click", function () { onClickModalDetailOpen(); });
		btnUpdate		.on("click", function () { onClickModalUpdateOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmitUpdate	.on("click", function () { onSubmitUpdate(); });
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

	function getBannerList()
	{
		const url = api.bannerList;
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
				{title: "이미지",    		data: "icon_image_url",  	width: "15%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "배너명", 		data: "banner_title",		width: "25%" }
				,{title: "노출기간",    	data: "created",  			width: "15%" }
				,{title: "이동 페이지",    data: "is_exposure",  		width: "45%" }
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

	function buildUpdateGrid(data)
	{
		updateTable.DataTable({
			data: data.data,
			columns: [
				{title: "이미지",    	data: "icon_image_url",  	width: "20%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "배너명", 	data: "banner_title",		width: "70%" }
				,{title: "삭제",    	data: "banner_uuid", 		width: "10%",
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
		$(".delete-btn").on('click', function () { deleteRow(this); })
	}

	function onClickModalDetailOpen()
	{
		modalDetail.fadeIn();
		modalBackdrop.fadeIn();
	}

	function onClickModalUpdateOpen()
	{
		g_delete_uuids.length = 0;
		modalUpdate.fadeIn();
		modalBackdrop.fadeIn();
	}

	let g_delete_uuids = [];
	function deleteRow(obj)
	{
		$(obj).closest('tr').remove();
		g_delete_uuids.push(obj.id);
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
		const param = { "banner_list" : g_delete_uuids };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), deleteCallback, errMsg, false)
	}

	function deleteCallback(data)
	{
		isSuccessResp(data) ? reorderRequest() : sweetToast(data.msg);
	}

	function reorderRequest()
	{
		const uuids = getRowsId();
		const param = { "banner_list" : uuids };
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
			sweetToast("배너가 없습니다.");
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