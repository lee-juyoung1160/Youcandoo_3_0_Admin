
	import {ongoingRankTable, totalRankTable, searchTab,} from "../modules/elements.js";
	import {api} from "../modules/api-url.js";
	import {g_doit_uuid} from "./doit-detail-info.js";
	import {sweetError, sweetToast,} from "../modules/alert.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {buildTotalCount, toggleBtnPreviousAndNextOnTable,} from "../modules/tables.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";
	import {headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";

	export function buildOngoingRank()
	{
		ongoingRankTable.DataTable({
			ajax : {
				url: api.lankMember,
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
						"doit_uuid" : g_doit_uuid,
						"action_type" : "ongoing",
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
				{title: "닉네임", 			data: "nickname",			width: "15%"}
				,{title: "프로필 ID", 		data: "profile_uuid",		width: "24%"}
			],
			serverSide: true,
			paging: true,
			pageLength: 30,
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

	export function buildTotalRank()
	{
		totalRankTable.DataTable({
			ajax : {
				url: api.lankMember,
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
					let searchType = 'total'
					searchTab.each(function () {
						if ($(this).hasClass('active')) searchType = $(this).data('type')
					})
					const param = {
						"doit_uuid" : g_doit_uuid,
						"action_type" : searchType,
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
				{title: "닉네임", 			data: "nickname",			width: "15%"}
				,{title: "프로필 ID", 		data: "profile_uuid",		width: "24%"}
			],
			serverSide: true,
			paging: true,
			pageLength: 30,
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

	export function onClickSearchTab(obj)
	{
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');

		let table = totalRankTable.DataTable();
		table.ajax.reload();
	}
