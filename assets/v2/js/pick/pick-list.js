
	import {ajaxRequestWithJson, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {previewTable, dataTable, updateTable, btnUpdate, previewTitle, modalOpen, modalClose, modalBackdrop, btnCreate} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import { fadeinModal, fadeoutModal, onErrorImage } from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount } from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { page } from "../modules/page-url.js";
	import { message } from "../modules/message.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";

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
		btnCreate		.on("click", function () { onClickBtnCreate(); });
	});

	function onClickBtnCreate()
	{
		const rows = dataTable.find('tbody').children();
		if (rows.length >= 10)
		{
			sweetToast(message.maxAddTen);
			return;
		}

		location.href = page.createPick;
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
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*90)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*10)+'px');
		return $(el);
	}

	function getPickList()
	{
		ajaxRequestWithJson(true, api.pickList, null)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getPickListCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.list + message.ajaxLoadError));
	}

	function getPickListCallback(data)
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
				selector: 'a',
				toggleable: false
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
		const param = { "recommend_uuid" : uuid };

		ajaxRequestWithJson(false, api.previewList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildPreview(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.list + message.ajaxLoadError));
	}

	function buildPreview(data)
	{
		if (data.data.length > 0)
		{
			let previewEl = '';
			data.data.map(obj => {
				const {doit_title, doit_keyword, profile_nickname, is_company, member_count, doit_image_url, doit_status} = obj;
				const statusEl = doit_status === 'open' ? `<span class="badge badge-success">진행중</span>` : `<span class="badge badge-warning">운영정지</span>`;
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
						<div class="banner-img-wrap">
							<img src="${doit_image_url}" alt="">
						</div>
					</td>
					<td class="txt-left">
						<p class="title">${doit_title}</p>
						<ul class="tag-list clearfix">
							${keywordsEl}
						</ul>
						<p class="desc-sub">
							<i class="fas fa-user"></i> ${is_company === 'Y' ? label.bizIcon + profile_nickname : profile_nickname} / ${numberWithCommas(member_count)}명 참여 / 
							${statusEl}
						</p>
					</td>
				</tr>`
			})

			let previewTableBody = previewTable.find('tbody');
			previewTableBody.html(previewEl);

			onErrorImage();
		}
		else
			previewTable.find('tbody').empty();
	}

	function onClickModalOpen()
	{
		fadeinModal();
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
				{title: "큐레이션 명", 	data: "recommend_title",		width: "90%" }
				,{title: "삭제",    		data: "recommend_uuid", 		width: "10%",
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
				$(nRow).attr('data-uuid', aData.recommend_uuid);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function addDeleteEvent()
	{
		$(".delete-btn").on('click', function () { deleteRow(this); })
	}

	function deleteRow(obj)
	{
		$(obj).closest('tr').remove();
	}

	function onSubmitUpdate()
	{
		sweetConfirm(message.change, updateRequest);
	}

	function updateRequest()
	{
		const param = { "recommend_list" : getRowIds() };

		ajaxRequestWithJson(true, api.reorderPick, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, updateSuccess);
			})
			.catch(reject => sweetError(label.modify + message.ajaxError));
	}

	function updateSuccess()
	{
		fadeoutModal();
		getPickList();
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
