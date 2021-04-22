
	import {
	ucdListForm,
	ucdTable,
	searchUcdDateFrom,
	searchUcdDateTo,
	ucdKeyword,
	selUcdPageLength,
	modalSaveUcdWallet,
	modalBackdrop, rdoSaveUCdType, saveWalletAmount, saveWalletDesc,
} from "../modules/elements.js";
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from "../modules/alert.js";
	import {message} from "../modules/message.js";
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from "../modules/request.js";
	import {
		initDayBtn,
	initSelectOption
} from "../modules/common.js";
	import {isEmpty} from "../modules/utils.js";
	import {label} from "../modules/label.js";
	import {toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";
	import {g_doit_uuid} from "./doit-detail-info.js";


	export function showUcdListForm()
	{
		ucdListForm.show();
	}

	export function initSearchUcdForm()
	{
		searchUcdDateFrom.datepicker("setDate", "-6D");
		searchUcdDateTo.datepicker("setDate", "today");
		ucdKeyword.val('');
		initSelectOption();
		initDayBtn();
	}

	export function onSubmitSearchUcd()
	{
		return;
		const table = ucdTable.DataTable();
		table.page.len(Number(selUcdPageLength.val()));
		table.ajax.reload();
	}

	export function buildUcdTable()
	{
		ucdTable.DataTable({
			ajax : {
				url: api,
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
						"doit_uuid": g_doit_uuid,
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "미션명", 		data: "mission_title",		width: "40%",
					render: function (data, type, row, meta) {
						return `<a>${data}</a>`;
					}
				}
				,{title: "기간", 		data: "start_date",			width: "20%",
					render: function (data, type, row, meta) {
						return `${row.start_date} ~ ${row.end_date}`;
					}
				}
				,{title: "참여인원",    	data: "state",  			width: "15%" }
				,{title: "상태",    		data: "state",  			width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(0).on('click', function () { onClickDetailMission(aData.idx); });
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	export function onSubmitSaveUcdWallet()
	{
		return;
		if (saveUcdWalletValid())
			sweetConfirm(message.create, saveUcdWalletRequest);
	}

	function saveUcdWalletValid()
	{

		return true;
	}

	function saveUcdWalletRequest()
	{
		const url = api;
		const errMsg = label.submit+message.ajaxError;
		const param = {
			"doit_uuid" : g_doit_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), saveUcdWalletReqCallback, errMsg, false);
	}

	function saveUcdWalletReqCallback(data)
	{
		sweetToastAndCallback(data, saveUcdWalletSuccess);
	}

	function saveUcdWalletSuccess()
	{
		onSubmitSearchUcd();
	}

	export function onClinkBtnSaveUcdWallet()
	{
		modalSaveUcdWallet.fadeIn();
		modalBackdrop.fadeIn();
		rdoSaveUCdType.eq(0).prop('checked', true);
		saveWalletAmount.val('');
		saveWalletAmount.trigger('focus');
		saveWalletDesc.val('');
	}

