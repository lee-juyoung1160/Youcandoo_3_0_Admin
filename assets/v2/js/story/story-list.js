
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {dataTable, updateTable, modalClose, modalBackdrop, btnSubmitUpdate, modalUpdate, modalDetail, modalImage, btnUpdate,} from '../modules/elements.js';
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
		getStoryList();
		/** 이벤트 **/
		btnUpdate		.on("click", function () { onClickModalUpdateOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmitUpdate	.on("click", function () { onSubmitUpdate(); });
		$(".btn-xs.btn-teal").on("click", function () { location.href = page.updateStory });
		$(".banner-img-wrap").on('click', function () { onClickModalDetailOpen(this); });
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

	function getStoryList()
	{
		const url = api.storyList;
		const errMsg = label.list + message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, null, getStoryListCallback, errMsg, false);
	}

	function getStoryListCallback(data)
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
				{title: "썸네일",    		data: "story_image_url",  	width: "20%",
					render: function (data, type, row, meta) {
						const imageTypes = [".jpeg", ".jpg", ".png"];
						const imgUrl = isEmpty(data) ? '' : imageTypes.includes(data) > -1 ? data : '';
						return `<div class="list-img-wrap banner-img-wrap" data-url="${imgUrl}"><img src="${imgUrl}" alt=""></div>`;
					}
				}
				,{title: "제목", 		data: "story_title",		width: "30%" }
				,{title: "이동 페이지",   	data: "story_url",  		width: "30%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "노출여부",    	data: "is_exposure",  		width: "10%" }
				,{title: "수정",    		data: "story_uuid",  		width: "10%",
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

				$(".btn-update").on('click', function () { location.href = page.updateStory + this.id });
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

	function buildUpdateTable()
	{
		const table = dataTable.DataTable();
		const tableData = table.rows().data();
		const data = tableData.length > 0 ? tableData : [];

		updateTable.DataTable({
			data: data,
			columns: [
				{title: "썸네일",   	data: "story_image_url",  	width: "20%",
					render: function (data, type, row, meta) {
						const imageTypes = [".jpeg", ".jpg", ".png"];
						const imgUrl = isEmpty(data) ? '' : imageTypes.includes(data) > -1 ? data : '';
						return `<div class="list-img-wrap banner-img-wrap" data-url="${imgUrl}"><img src="${imgUrl}" alt=""></div>`;
					}
				}
				,{title: "제목", 	data: "story_title",		width: "70%" }
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
				$(nRow).attr('data-uuid', aData.story_uuid);
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
		const uuids = getRowIds();
		const param = { "story_uuid" : uuids };
		const url 	= api.reorderStory;
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
		getStoryList();
	}

	function updateValidation()
	{
		const uuids = getRowIds();
		if (uuids.length === 0)
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