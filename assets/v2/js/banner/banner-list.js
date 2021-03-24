
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {dataTable, updateTable, historyTable, btnUpdate, modalClose, modalBackdrop,
		btnSubmitUpdate, modalUpdate, modalDetail, modalBannerImage,} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import { fadeoutModal, onErrorImage, overflowHidden } from "../modules/common.js";
	import { initTableDefaultConfig,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 목록 불러오기 **/
		getBannerList();
		buildLastBannerTable();
		/** 이벤트 **/
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
		const errMsg = label.list + message.ajaxLoadError;
		const param = {
			"banner_open_type" : "now"
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getCategoryListCallback, errMsg, false);
	}

	function getCategoryListCallback(data)
	{
		if (isSuccessResp(data))
		{
			data.recordsTotal = data.count;
			data.recordsFiltered = data.count;
			buildTable(data);
		}
		else
			sweetToast(data.msg);
	}

	function buildTable(data)
	{
		dataTable.DataTable({
			data: data.data,
			columns: [
				{title: "이미지",    		data: "banner_image_url",  	width: "15%",
					render: function (data, type, row, meta) {
						const imageTypes = [".jpeg", ".jpg", ".png"];
						const imgUrl = $.inArray(data, imageTypes) >= 0 ? data : '';
						return `<div class="list-img-wrap banner-img-wrap" data-url="${imgUrl}"><img src="${imgUrl}" alt=""></div>`;
					}
				}
				,{title: "배너명", 		data: "banner_name",		width: "25%" }
				,{title: "노출기간",    	data: "open_date",  		width: "15%",
					render: function (data, type, row, meta) {
						return `${row.open_date} ~ ${row.close_date}`;
					}
				}
				,{title: "이동 페이지",    data: "banner_uuid",  		width: "45%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? label.dash : data.toString();
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
				addViewDetailEvent();
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				onErrorImage();
			}
		});
	}

	function onClickModalUpdateOpen()
	{
		g_delete_uuids.length = 0;
		modalUpdate.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		//buildUpdateTable();
	}

	function buildUpdateTable()
	{
		const table = dataTable.DataTable();
		const tableData = table.rows().data();
		const data = tableData.length > 0 ? tableData : [];

		updateTable.DataTable({
			data: data.data,
			columns: [
				{title: "이미지",    	data: "banner_image_url",  	width: "20%",
					render: function (data, type, row, meta) {
						const imageTypes = [".jpeg", ".jpg", ".png"];
						const imgUrl = $.inArray(data, imageTypes) >= 0 ? data : '';
						return `<div class="list-img-wrap banner-img-wrap"><img src="${imgUrl}" alt=""></div>`;
					}
				}
				,{title: "배너명", 	data: "banner_name",		width: "70%" }
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

	function buildLastBannerTable()
	{
		historyTable.DataTable({
			ajax : {
				url: api.bannerList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

					return JSON.stringify(json);
				},
				data: function (d) {
					return JSON.stringify({ "banner_open_type" : "before" });
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "이미지",    		data: "banner_image_url",  	width: "15%",
					render: function (data, type, row, meta) {
						const imageTypes = [".jpeg", ".jpg", ".png"];
						const imgUrl = $.inArray(data, imageTypes) >= 0 ? data : '';
						return `<div class="list-img-wrap banner-img-wrap" data-url="${imgUrl}"><img src="${imgUrl}" alt=""></div>`;
					}
				}
				,{title: "배너명", 		data: "banner_name",		width: "25%" }
				,{title: "노출기간",    	data: "open_date",  		width: "15%",
					render: function (data, type, row, meta) {
						return `${row.open_date} ~ ${row.close_date}`;
					}
				}
				,{title: "이동 페이지",    data: "banner_uuid",  		width: "45%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? label.dash : data.toString();
					}
				}
			],
			serverSide: true,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
				addViewDetailEvent();
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				onErrorImage();
			}
		});
	}

	function addViewDetailEvent()
	{
		$(".banner-img-wrap").on('click', function () { onClickModalDetailOpen(this); });
	}

	function onClickModalDetailOpen(obj)
	{
		modalDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		modalBannerImage.attr('src', $(obj).data('url'));
		onErrorImage();
	}