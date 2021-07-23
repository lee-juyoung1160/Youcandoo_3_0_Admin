
	import {ajaxRequestWithJson, headers, invalidResp, isSuccessResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url-v1.js';
	import {dataTable, rdoOsType, selPageLength, btnDelete} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {initPageLength,} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, checkBoxElement,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		rdoOsType.eq(0).prop('checked', true);
		buildTable();
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
						sweetToast(invalidResp(json));
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
				{title: "마켓",    		data: "store",			width: "20%",
					render: function (data) {
						switch (data) {
							case 'google' : return '구글';
							case 'apple' : return '애플';
							default : return data;
						}
					}
				}
				,{title: "버전", 		data: "target_version",	width: "25%" }
				,{title: "강제여부",    	data: "force_update",  	width: "25%",
					render: function (data) {
						switch (Number(data)) {
							case 1 : return '선택';
							case 2 : return '강제';
							default : return data;
						}
					}
				}
				,{title: "등록일시",    	data: "created",  		width: "25%" }
				,{title: '', 			data: "idx",   			width: "5%",
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
				$(this).on( 'select.dt', function ( e, dt, type, indexes ) { $("input[name=chk-row]").eq(indexes).prop('checked', true); });
				$(this).on( 'deselect.dt', function ( e, dt, type, indexes ) { $("input[name=chk-row]").eq(indexes).prop('checked', false) });
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
		const param = { "idx" : [getRowIdx()] };

		ajaxRequestWithJson(true, api.deleteVersion, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, onSubmitSearch);
			})
			.catch(reject => sweetError(label.delete + message.ajaxError));
	}

	function deleteValidation()
	{
		if (isEmpty(getRowIdx()))
		{
			sweetToast(`삭제할 버전을 ${message.select}`);
			return false;
		}

		return true;
	}

	function getRowIdx()
	{
		const table = dataTable.DataTable();
		const selectedData = table.rows('.selected').data()[0];

		return isEmpty(selectedData) ? '' : selectedData.idx;
	}
