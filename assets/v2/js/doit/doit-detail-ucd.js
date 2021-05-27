
	import {
		ucdListForm,
		ucdTable,
		searchUcdDateFrom,
		searchUcdDateTo,
		ucdKeyword,
		selUcdPageLength,
		modalSaveUcdWallet,
		modalBackdrop, saveWalletAmount, saveWalletDesc, publicWalletBalance,
	} from "../modules/elements.js";
	import { api } from '../modules/api-url.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from "../modules/alert.js";
	import {message} from "../modules/message.js";
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from "../modules/request.js";
	import {fadeoutModal, initDayBtn, initSelectOption} from "../modules/common.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";
	import {label} from "../modules/label.js";
	import {toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";
	import {g_doit_uuid} from "./doit-detail-info.js";

	export function showUcdListForm()
	{
		ucdListForm.show();
		initSearchUcdForm();
		getDoitBalance();
	}

	export function initSearchUcdForm()
	{
		searchUcdDateFrom.datepicker("setDate", "-6D");
		searchUcdDateTo.datepicker("setDate", "today");
		ucdKeyword.val('');
		initSelectOption();
		initDayBtn();
	}

	function getDoitBalance()
	{
		const url = api.getDoitUcd;
		const errMsg = `두잇 UCD ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDoitBalanceCallback, errMsg, false);
	}

	function getDoitBalanceCallback(data)
	{
		isSuccessResp(data) ? buildBalance(data) : sweetToast(`두잇 UCD ${data.msg}`);
	}

	function buildBalance(data)
	{
		publicWalletBalance.text(`${numberWithCommas(data.data.ucd)} UCD`);
	}

	export function onSubmitSearchUcd()
	{
		const table = ucdTable.DataTable();
		table.page.len(Number(selUcdPageLength.val()));
		table.ajax.reload();
	}

	export function buildUcdTable()
	{
		ucdTable.DataTable({
			ajax : {
				url: api.doitWalletList,
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

	export function onSubmitSaveDoitUcd()
	{
		if (saveDoitUcdValid())
			sweetConfirm(message.create, saveUcdWalletRequest);
	}

	function saveDoitUcdValid()
	{
		if (isEmpty(saveWalletAmount.val()))
		{
			sweetToast(`UCD는 ${message.required}`);
			saveWalletAmount.trigger('focus');
			return false;
		}

		if (isEmpty(saveWalletDesc.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			saveWalletDesc.trigger('focus');
			return false;
		}

		return true;
	}

	function saveUcdWalletRequest()
	{
		const url = api.saveDoitUcdBySystem;
		const errMsg = label.submit+message.ajaxError;
		const param = {
			"doit_uuid" : [g_doit_uuid],
			"value" : saveWalletAmount.val().trim(),
			"description" : saveWalletDesc.val().trim()
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), saveUcdWalletReqCallback, errMsg, false);
	}

	function saveUcdWalletReqCallback(data)
	{
		sweetToastAndCallback(data, saveUcdWalletSuccess);
	}

	function saveUcdWalletSuccess()
	{
		fadeoutModal();
		getDoitBalance();
		onSubmitSearchUcd();
	}

	export function onClinkBtnSaveUcdWallet()
	{
		modalSaveUcdWallet.fadeIn();
		modalBackdrop.fadeIn();
		saveWalletAmount.val('');
		saveWalletAmount.trigger('focus');
		saveWalletDesc.val('');
	}
