
	import {ucdListForm, ucdTable, searchUcdDateFrom, searchUcdDateTo, ucdKeyword, selUcdPageLength, modalSaveUcdWallet,
		modalBackdrop, saveWalletAmount, saveWalletDesc, publicWalletBalance,} from "../modules/elements.js";
	import { api } from '../modules/api-url.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from "../modules/alert.js";
	import {message} from "../modules/message.js";
	import {fadeoutModal, initDayBtn, initSelectOption} from "../modules/common.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";
	import {label} from "../modules/label.js";
	import {buildTotalCount, toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";
	import {g_doit_uuid} from "./doit-detail-info.js";
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";

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
		const param = { "doit_uuid" : g_doit_uuid }

		ajaxRequestWithJson(false, api.getDoitUcd, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildBalance(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`두잇 UCD ${message.ajaxLoadError}`));
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
						json.recordsTotal = json.data.count;
						json.recordsFiltered = json.data.count;
						json.data = json.data.list;
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
						"from_date" : searchUcdDateFrom.val(),
						"to_date" : searchUcdDateTo.val(),
						"search_type" : 'doit_uuid',
						"keyword" : g_doit_uuid,
						"page" : (d.start / d.length) + 1,
						"limit" : d.length,
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "From",   		data: "register_name",  width: "22%" }
				,{title: "To",    		data: "receive_name",  	width: "22%" }
				,{title: "내용",    		data: "message",  		width: "21%" }
				,{title: "UCD", 		data: "value",			width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "지급 일시",    	data: "sended",  		width: "15%" }
				,{title: "상태",    		data: "status",  		width: "10%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selUcdPageLength.val()),
			select: false,
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
		const param = {
			"doit_uuid" : [g_doit_uuid],
			"value" : saveWalletAmount.val().trim(),
			"description" : saveWalletDesc.val().trim()
		}

		ajaxRequestWithJson(true, api.saveDoitUcdBySystem, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, saveUcdWalletSuccess);
			})
			.catch(reject => sweetToast(label.submit + message.ajaxError));
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
