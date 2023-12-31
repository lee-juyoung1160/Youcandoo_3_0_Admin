
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {dataTable, updateTable, historyTable, btnUpdate, modalClose, modalBackdrop, btnSubmitUpdate, modalUpdate,
		modalDetail, modalImage,} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import { fadeoutModal, onErrorImage, overflowHidden } from "../modules/common.js";
	import { initTableDefaultConfig,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import {page} from "../modules/page-url.js";
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
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*80)+'px');
		return $(el);
	}

	function getBannerList()
	{
		const param = { "banner_open_type" : "now" }

		ajaxRequestWithJson(true, api.bannerList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getCategoryListCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.list + message.ajaxLoadError));
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
				{title: "이미지",    	data: "banner_image_url",  	width: "15%",
					render: function (data, type, row, meta) {
						const imageTypes = [".jpeg", ".jpg", ".png"];
						const imgUrl = isEmpty(data) ? '' : imageTypes.includes(data) > -1 ? data : '';
						return `<div class="list-img-wrap banner-img-wrap" data-url="${imgUrl}"><img src="${imgUrl}" alt=""></div>`;
					}
				}
				,{title: "배너명", 		data: "banner_name",		width: "20%" }
				,{title: "노출기간",    	data: "open_date",  		width: "15%",
					render: function (data, type, row, meta) {
						return `${row.open_date} ~ ${row.close_date}`;
					}
				}
				,{title: "이동 페이지",   data: "page_target",  		width: "40%",
					render: function (data, type, row, meta) {
						return (data === 'webview' || data === 'browser')
							? `${getTargetName(data)} ${row.page_target_value}`
							: isEmpty(row.target_title) ? label.dash : `${getTargetName(data)} ${row.target_title}`;
					}
				}
				,{title: "수정",    		data: "banner_uuid",  		width: "10%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-teal btn-update" id="${row.idx}">수정</button>`;
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
				addViewDetailEvent();

				$(".btn-update").on('click', function () { location.href = page.updateBanner + this.id });
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
		modalUpdate.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		buildUpdateTable();
	}

	function getTargetName(target)
	{
		let targetName;
		switch (target) {
			case 'doit' :
				targetName = '[두잇]';
				break;
			case 'event' :
				targetName = '[이벤트]';
				break;
			case 'notice' :
				targetName = '[공지]';
				break;
			case 'webview' :
				targetName = '[웹뷰]';
				break;
			case 'browser' :
				targetName = '[외부]';
				break;
			default : targetName = '';
		}

		return targetName
	}

	function buildUpdateTable()
	{
		const table = dataTable.DataTable();
		const tableData = table.rows().data();
		const data = tableData.length > 0 ? tableData : [];

		updateTable.DataTable({
			data: data,
			columns: [
				{title: "이미지",   	data: "banner_image_url",  	width: "20%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap banner-img-wrap" data-url="${data}"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "배너명", 	data: "banner_name",		width: "80%" }
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
				$(nRow).attr('data-uuid', aData.banner_uuid);
			},
			drawCallback: function (settings) {
				onErrorImage();
			}
		});
	}

	function onSubmitUpdate()
	{
		if (updateValidation())
			sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		const param = { "banner_uuid" : getRowIds() };

		ajaxRequestWithJson(true, api.reorderBanner, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, reorderSuccess);
			})
			.catch(reject => sweetError(label.modify + message.ajaxError));
	}

	function reorderSuccess()
	{
		fadeoutModal();
		getBannerList();
	}

	function updateValidation()
	{
		if (getRowIds().length === 0)
		{
			sweetToast(message.emptyList);
			return false;
		}

		return true;
	}

	function getRowIds()
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
				global: false,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"banner_open_type" : "before",
						"limit" : d.length,
						"page" : (d.start / d.length) + 1
					}
					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "이미지",    		data: "banner_image_url",  	width: "15%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap banner-img-wrap" data-url="${data}"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "배너명", 		data: "banner_name",		width: "25%" }
				,{title: "노출기간",    	data: "open_date",  		width: "15%",
					render: function (data, type, row, meta) {
						return `${row.open_date} ~ ${row.close_date}`;
					}
				}
				,{title: "이동 페이지",    data: "page_target",  		width: "45%",
					render: function (data, type, row, meta) {
						return (data === 'webview' || data === 'browser')
							? `${getTargetName(data)} ${row.page_target_value}`
							: isEmpty(row.target_title) ? label.dash : `${getTargetName(data)} ${row.target_title}`;
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
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
		modalImage.attr('src', '');
		modalDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		modalImage.attr('src', $(obj).data('url'));
		onErrorImage();
	}
