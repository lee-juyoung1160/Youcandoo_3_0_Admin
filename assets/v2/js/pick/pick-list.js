
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import { previewTable, dataTable, updateTable, btnUpdate, previewTitle, modalOpen, modalClose, modalBackdrop } from  '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { fadeinModal, fadeoutModal, onErrorImage } from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount } from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { page } from "../modules/page-url.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 목록 불러오기 **/
		getPickList();
		/** 이벤트 **/
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnUpdate		.on("click", function () { onSubmitUpdate(); });
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

		ajaxRequestWithJsonData(true, url, null, getPickListCallback, errMsg, false);
	}

	function getPickListCallback(data)
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
				{title: "큐레이션 명", 	data: "recommend_title",	width: "70%",
					render: function (data, type, row, meta) {
						return `<a class="view-preview" data-uuid="${row.recommend_uuid}">${data}</a>`
					}
				}
				,{title: "노출여부",    	data: "is_exposure",  		width: "20%" }
				,{title: "수정",    		data: "recommend_uuid",  	width: "10%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-teal btn-update-pick" data-idx="${row.idx}">수정</button>`;
					}
				}
			],
			serverSide: false,
			paging: false,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				addPreviewEvent();
			},
			fnRowCallback: function( nRow, aData, dataIndex ) {
				/** 페이지 진입 후 미리보기 초기화(첫번째 row 미리보기 가져옴) **/
				if (dataIndex === 0)
				{
					let table = dataTable.DataTable();
					table.row(dataIndex).select();
					viewPreview($(nRow).children().eq(0).children());
				}
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
			}
		});
	}

	function addPreviewEvent()
	{
		$(".view-preview").on('click', function () { viewPreview(this); })
		$(".btn-update-pick").on('click', function () { location.href = page.updatePick + $(this).data('idx'); })
	}

	function viewPreview(obj)
	{
		previewTitle.text($(obj).text());
		getPreviewList($(obj).data("uuid"));
	}

	function getPreviewList(uuid)
	{
		const url = api.previewList;
		const errMsg = label.list + message.ajaxLoadError;
		const param = { "recommend_uuid" : uuid };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), buildPreview, errMsg, false);
	}

	function buildPreview(data)
	{
		if (data.data.length > 0)
		{
			let previewEl = '';
			data.data.map(obj => {
				const {doit_title, doit_keyword, profile_nickname, member_count, doit_image_url} = obj;
				let keywordsEl = '';
				if (doit_keyword.length > 0)
				{
					doit_keyword.map(value => {
						keywordsEl += `<li># <span>${value}</span></li>`;
					})
				}
				previewEl +=
					`<tr>
					<td>
						<div class="list-img-wrap banner-img-wrap">
							<img src="${doit_image_url}" alt="">
						</div>
					</td>
					<td class="txt-left">
						<p class="title">${doit_title}</p>
						<ul class="tag-list clearfix">
							${keywordsEl}
						</ul>
						<p class="desc-sub"><i class="fas fa-user"></i> ${profile_nickname} / ${member_count}명 참여 / <span class="badge badge-success">진행중</span></p>
					</td>
				</tr>`
			})

			let previewTableBody = previewTable.find('tbody');
			previewTableBody.html(previewEl);

			onErrorImage();
		}
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
		$(".delete-btn").on('click', function () { deleteRow(this); })
	}

	function onClickModalOpen()
	{
		g_delete_uuids.length = 0;
		fadeinModal();
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