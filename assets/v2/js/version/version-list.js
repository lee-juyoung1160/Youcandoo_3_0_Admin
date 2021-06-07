
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {dataTable, rdoOsType, selPageLength, btnDelete} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {initPageLength,} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, checkBoxElement,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		rdoOsType.eq(0).prop('checked', true);
		//buildTable();
		/** 이벤트 **/
		rdoOsType		.on('change', function () { onSubmitSearch(); });
		selPageLength	.on('change', function () { onSubmitSearch(); });
		btnDelete		.on('click', function () { onClickBtnDelete(); });
	});

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.versionList,
				type: "POST",
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
						"store" : $("input[name=radio-os-type]:checked").val(),
						"page" : (d.start / d.length) + 1,
						"limit" : selPageLength.val(),
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "마켓",    		data: "store",			width: "20%" }
				,{title: "버전", 		data: "title",			width: "25%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailFaq + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "강제여부",    	data: "is_exposure",  	width: "25%" }
				,{title: "등록일",    	data: "created",  		width: "25%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: '', 		data: "version_uuid",   	width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function onClickBtnDelete()
	{
		if (deleteValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		const uuids = getRowId();
		const param = { "version_uuid" : uuids };
		const url 	= api.deleteVersion;
		const errMsg = label.delete + message.ajaxError;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, onSubmitSearch);
	}

	function deleteValidation()
	{
		if (isEmpty(getRowId))
		{
			sweetToast(`삭제할 버전을 ${message.select}`);
			return false;
		}

		return true;
	}

	function getRowId()
	{
		const table = dataTable.DataTable();
		const selectedData = table.rows('.selected').data()[0];

		return selectedData.version_uuid;
	}
