
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from '../modules/request.js'
	import {api} from '../modules/api-url.js';
	import {curationTitle, keyword, lengthInput, dataTable, updateTable, btnSubmit, rdoExposure,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {calculateInputLength, limitInputLength, onErrorImage} from "../modules/common.js";
	import {getPathName, isEmpty, splitReverse} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig, checkBoxElement, toggleSingleCheckBox, toggleBtnPreviousAndNextOnTable, tableReloadAndStayCurrentPage} from "../modules/tables.js";

	const pathName	= getPathName();
	const pickIdx	= splitReverse(pathName, '/');
	let g_added_doit = [];

	$( () => {
		curationTitle.trigger('focus');
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 테이블 drag and drop 정렬 초기화 **/
		initSortTable();
		/** 상세 **/
		getDetail();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		keyword    	.on("keyup", function () { onSubmitSearch(); });
		btnSubmit	.on('click', function () { onSubmitUpdateCuration(); });
	});

	function getDetail()
	{
		const url = api.detailPick;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : pickIdx
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_pick_uuid;
	function buildDetail(data)
	{
		const { recommend_uuid, recommend_title, is_exposure, doit_list } = data.data;

		g_pick_uuid = recommend_uuid;

		curationTitle.val(recommend_title);
		rdoExposure.each(function () {
			if ($(this).val() === is_exposure)
				$(this).prop('checked', true);
		});
		if (doit_list.length > 0)
		{
			let rowEl = '';
			doit_list.map(obj => {
				const {doit_uuid, doit_image_url, doit_title, doit_keyword, profile_nickname, member_count} = obj;
				let keywordsEl = '';
				if (doit_keyword.length > 0)
				{
					doit_keyword.map(value => {
						keywordsEl += `<li># <span>${value}</span></li>`;
					})
				}
				rowEl +=
					`<tr id="${doit_uuid}">
					<td>
						<div class="list-img-wrap doit-img-wrap">
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
					<td>
						<button type="button" class="btn-xs btn-text-red btn-delete-row">
							<i class="fas fa-minus-circle"></i>
						</button>
					</td>
				</tr>`;
			})

			let targetTableBody = updateTable.find('tbody');
			targetTableBody.append(rowEl);
			initAddedDoitUuid();
			addRemoveRowEvent();
			onErrorImage();
		}

		calculateInputLength();

		/** 두잇목록 **/
		buildDoitList();
	}

	function onSubmitSearch()
	{
		const table = dataTable.DataTable();
		table.ajax.reload();
	}

	function buildDoitList()
	{
		dataTable.DataTable({
			ajax : {
				url: api.searchDoitList,
				type:"POST",
				global: false,
				headers: headers,
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
						sweetToast(json.msg);
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"page" : (d.start / d.length) + 1
						,"limit" : d.length
						,"keyword" : keyword.val()
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 	data: "doit_uuid",   		width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				},
				{title: "",		data: "doit_image_url",		width: "20%",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap doit-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "", 	data: "doit_uuid",			width: "75%",
					render: function (data, type, row, meta) {
						return buildDoitInfo(row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 5,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				addSelectEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				/** 이미 배너 목록에 있는 경우 체크박스 삭제 **/
				const checkboxEl = $(nRow).children().eq(0).find('input');
				if (g_added_doit.indexOf(aData.doit_uuid) > -1)
					$(checkboxEl).prop('disabled', true);
			},
			drawCallback: function (settings) {
				onErrorImage();
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildDoitInfo(data)
	{
		const {doit_title, doit_keyword, profile_nickname, member_count} = data;
		let keywordsEl = '';
		if (doit_keyword.length > 0)
		{
			doit_keyword.map(value => {
				keywordsEl += `<li># <span>${value}</span></li>`;
			})
		}
		return `<p class="title">${doit_title}</p>
				<ul class="tag-list clearfix">${keywordsEl}</ul>
				<p class="desc-sub"><i class="fas fa-user">
					</i> ${profile_nickname} / ${member_count}명 참여 / <span class="badge badge-success">진행중</span>
				</p>`
	}

	function addSelectEvent()
	{
		const chkBoxes = $("input[name=chk-row]");
		chkBoxes.on('click', function () { toggleSingleCheckBox(this); })
		dataTable.on( 'select.dt', function ( e, dt, type, indexes ) { onClickCheckBox(dt, indexes);});
	}

	function onClickCheckBox(dt, indexes)
	{
		addDoit(dt, indexes);
		initAddedDoitUuid();
		tableReloadAndStayCurrentPage(dataTable);
		/** 테이블 drag and drop 정렬 초기화 **/
		updateTable.find('tbody').sortable("destroy");
		initSortTable();
		onErrorImage();
	}

	function addDoit(dt, indexes)
	{
		const selectedData = dt.rows(indexes).data()[0];
		const {doit_uuid, doit_title, doit_keyword, profile_nickname, member_count, doit_image_url} = selectedData;
		let keywordsEl = '';
		if (doit_keyword.length > 0)
		{
			doit_keyword.map(value => {
				keywordsEl += `<li># <span>${value}</span></li>`;
			})
		}

		const rowEl =
				`<tr id="${doit_uuid}">
					<td>
						<div class="list-img-wrap doit-img-wrap">
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
					<td>
						<button type="button" class="btn-xs btn-text-red btn-delete-row">
							<i class="fas fa-minus-circle"></i>
						</button>
					</td>
				</tr>`;

		let targetTableBody = updateTable.find('tbody');
		targetTableBody.append(rowEl);
		addRemoveRowEvent();
	}

	function addRemoveRowEvent()
	{
		$(".btn-delete-row").on('click', function () { removeRow(this); })
	}

	function removeRow(obj)
	{
		$(obj).parents('tr').remove();
		initAddedDoitUuid();
		tableReloadAndStayCurrentPage(dataTable);
	}

	function initSortTable()
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
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*75)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*5)+'px');
		return $(el);
	}

	function initAddedDoitUuid()
	{
		g_added_doit.length = 0;
		updateTable.find('tbody').children().each(function () {
			g_added_doit.push(this.id);
		});
	}

	function onSubmitUpdateCuration()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		const url 	= api.updatePick;
		const errMsg = label.submit+message.ajaxError;
		const rows 	= updateTable.find('tbody').children();
		let uuids 	= [];
		for (let i=0; i<rows.length; i++) uuids.push(rows[i].id);
		const param = {
			"recommend_uuid" : g_pick_uuid,
			"title" : curationTitle.val().trim(),
			"is_exposure" : $("input[name=radio-exposure]:checked").val(),
			"doit_list" : uuids
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateReqCallback, errMsg, false);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.listPick;
	}

	function validation()
	{
		if (isEmpty(curationTitle.val()))
		{
			sweetToast(`큐레이션 명은 ${message.required}`);
			curationTitle.trigger('focus');
			return false;
		}

		const addedLength = updateTable.find('tbody').children().length;
		if (addedLength === 0)
		{
			sweetToast(`두잇을 ${message.addOn}`);
			return false;
		}

		return true;
	}

