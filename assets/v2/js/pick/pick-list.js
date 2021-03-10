
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
		//getDoitPickList();
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

	function getDoitPickList()
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
			fnRowCallback: function( nRow, aData, dataIndex ) {

				if (dataIndex === 0)
				{
					let table = dataTable.DataTable();
					table.row(dataIndex).select();
					viewPreview($(nRow).children().eq(0).children());
				}

				$(nRow).attr('data-uuid', aData.recommend_uuid);
			},
			drawCallback: function (settings) {
				onErrorImage();
				buildTotalCount(this);
			}
		});
	}

	function addPreviewEvent()
	{
		$(".view-preview").on('click', function () { viewPreview(this); })
	}

	function viewPreview(obj)
	{
		previewTitle.text($(obj).text());
		getPreviewList($(obj).data("uuid"));
	}

	function getPreviewList(uuid)
	{
		let url 	= api.listDoitRecommended;
		let errMsg 	= label.list + message.ajaxLoadError;
		let param 	= { "recommend_uuid" : uuid };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), buildPreview, errMsg, false);
	}

	function buildPreview(data)
	{
		`<tr>
			<td>
				<div class="list-img-wrap banner-img-wrap">
					<img src="/assets/v2/img/profile-1.png" alt="">
				</div>
			</td>
			<td class="txt-left">
				<p class="title">두잇 제에모모모모목두잇 제에모모모모목두잇 제에모모모모목</p>
				<ul class="tag-list clearfix">
					<li># <span>필라테스가젤조아</span></li>
				</ul>
				<p class="desc-sub"><i class="fas fa-user"></i> 열심히사는강아지 / 1110 참여 / <span class="badge badge-success">진행중</span></p>
			</td>
		</tr>`
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