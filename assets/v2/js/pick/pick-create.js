
	import { ajaxRequestWithJsonData, headers } from '../modules/request.js'
	import {api} from '../modules/api-url.js';
	import {curationTitle, keyword, lengthInput, dataTable, updateTable, btnSubmit,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { limitInputLength, onErrorImage} from "../modules/common.js";
	import {isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig, checkBoxElement, toggleSingleCheckBox, toggleBtnPreviousAndNextOnTable, tableReloadAndStayCurrentPage} from "../modules/tables.js";

	let g_added_doit = [];

	$( () => {
		curationTitle.trigger('focus');
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 테이블 drag and drop 정렬 초기화 **/
		initSortTable();
		/** 두잇목록 **/
		buildDoitList();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		keyword    	.on("keyup", function () { onSubmitSearch(); });
		btnSubmit	.on('click', function () { onSubmitCuration(); });
	});

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
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

					return JSON.stringify(json);
				},
				data: function (d) {
					const table = dataTable.DataTable();
					const info 	= table.page.info();
					const _page = (info.start / info.length) + 1;
					const param = {
						"page" : _page
						,"limit" : info.length
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

	function onSubmitCuration()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const url 	= api.createPick;
		const errMsg = label.submit+message.ajaxError;
		const rows 	= updateTable.find('tbody').children();
		let uuids 	= [];
		for (let i=0; i<rows.length; i++) uuids.push(rows[i].id);
		const param = {
			"title" : curationTitle.val().trim(),
			"is_exposure" : $("input[name=radio-exposure]:checked").val(),
			"doit_list" : uuids
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
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

