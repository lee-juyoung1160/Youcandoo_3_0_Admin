
	import { ajaxRequestWithJsonData, isSuccessResp, headers } from '../modules/request.js'
	import {api} from '../modules/api-url.js';
	import {curationTitle, keyword, lengthInput, dataTable, updateTable, btnSubmit,
	} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import { limitInputLength } from "../modules/common.js";
	import {isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig, multiCheckBoxDom, toggleBtnPreviousAndNextOnTable, tableReloadAndStayCurrentPage} from "../modules/tables.js";

	let g_added_doit = [];
	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 두잇목록 **/
		//buildDoitList();
		/** 이벤트 **/
		curationTitle.trigger('focus');
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		keyword    	.on("keyup", function () { onSubmitSearch(); });
		btnSubmit	.on('click', function () { onSubmitCuration(); });
	});

	function onSubmitSearch()
	{
		const table = doitTable.DataTable();
		table.ajax.reload();
	}

	function buildDoitList()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listDoitRecommendSearch,
				type:"POST",
				global: false,
				headers: headers,
				data: function (d) {
					const table = doitTable.DataTable();
					const info 	= table.page.info();
					const _page = (info.start / info.length) + 1;
					const param = {
						"page" : _page
						,"limit" : info.length
						,"doit_title" : keyword.val()
						,"recommend_uuid" : ""
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 	data: "doit_uuid",   	width: "5px",
					render: function (data, type, row, meta) {
						return multiCheckBoxDom(meta.row);
					}
				},
				{title: "",		data: "doit_uuid",		width: "60px",
					render: function (data, type, row, meta) {
						return `<div class="list-img-wrap banner-img-wrap"><img src="/assets/v2/img/profile-1.png" alt=""></div>`;
					}
				}
				,{title: "", 	data: "doit_uuid",
					render: function (data, type, row, meta) {
						return `<p class="title">두잇 제에모모모모목두잇 제에모모모모목두잇 제에모모모모목</p>
								<ul class="tag-list clearfix"><li># <span>필라테스가젤조아</span></li></ul>
								<p class="desc-sub"><i class="fas fa-user">
									</i> 열심히사는강아지 / 1110 참여 / <span class="badge badge-info">대기중</span>
								</p>`
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 5,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				addCheckboxClickEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				/** 이미 배너 목록에 있는 경우 체크박스 삭제 **/
				const checkboxEl = $(nRow).children().eq(0).children();
				if (g_added_doit.indexOf(aData.doit_uuid) !== -1)
					$(checkboxEl).prop('disabled', true);
			},
			drawCallback: function (settings) {
				onErrorImage();
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function addCheckboxClickEvent()
	{
		$("input[name=chk-row]").on('click', function () { onClickCheckBox(); })
	}

	function onClickCheckBox()
	{
		if (addValidation())
		{
			addDoit();
			initAddedDoitUuid();
			tableReloadAndStayCurrentPage(doitTable);
			/** 테이블 drag and drop 정렬 초기화 **/
			updateTable.find('tbody').sortable("destroy");
			initSortTable();
			onErrorImage();
		}
	}

	function addDoit()
	{
		const table = doitTable.DataTable();
		const selectedData = table.rows('.selected').data();
		let rowEl = '';

		selectedData.map(obj => {
			let {doit_uuid, doit_keyword} = obj;

			doit_keyword.map(value => `<li># <span>${value}</span></li>`);

			rowEl +=
				`<tr id="${doit_uuid}">
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
					<td>
						<button type="button" class="btn-xs btn-text-red btn-delete-row">
							<i class="fas fa-minus-circle"></i>
						</button>
					</td>
				</tr>`
		})

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
		initDisableCheckbox();
		tableReloadAndStayCurrentPage(doitTable);
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
		const rows 	= recommendedTable.find('tbody').children();
		let uuids 	= [];
		for (let i=0; i<rows.length; i++) uuids.push(rows[i].id);
		const param = {
			"nickname" : curationTitle.val(),
			"is_exposure" : $("input[name=radio-is-exposure]:checked").val(),
			"doit_uuid" : uuids
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

		return true;
	}

