
	import {ongoingRankTable, totalRankTable, searchTab,} from "../modules/elements.js";
	import {api} from "../modules/api-url.js";
	import {g_doit_uuid} from "./doit-detail-info.js";
	import {sweetError, sweetToast,} from "../modules/alert.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {buildTotalCount, toggleBtnPreviousAndNextOnTable,} from "../modules/tables.js";
	import {numberWithCommas} from "../modules/utils.js";
	import {headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";

	export function initMemberRankForm(obj)
	{
		console.log(obj)
		toggleActive(obj);
		buildOngoingRank();
		buildTotalRank();
	}

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
				{title: "순위", 				data: "rank",			width: "5%",
					render: function (data) {
						return data.ranking;
					}
				}
				,{title: "닉네임", 			data: "profile",		width: "40%",
					render: function (data) {
						return data.nickname;
					}
				}
				,{title: "프로필 ID", 		data: "profile",		width: "45%",
					render: function (data) {
						return data.profile_uuid;
					}
				}
				,{title: "연속인증", 		data: "rank",			width: "10%",
					render: function (data) {
						return numberWithCommas(data.count);
					}
				}
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

	export function refreshOngoingRank()
	{
		let table = ongoingRankTable.DataTable();
		table.ajax.reload();
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
				{title: "순위", 				data: "rank",			width: "5%",
					render: function (data) {
						return data.ranking;
					}
				}
				,{title: "닉네임", 			data: "profile",		width: "40%",
					render: function (data) {
						return data.nickname;
					}
				}
				,{title: "프로필 ID", 		data: "profile",		width: "45%",
					render: function (data) {
						return data.profile_uuid;
					}
				}
				,{title: "연속인증", 		data: "rank",			width: "10%",
					render: function (data) {
						return numberWithCommas(data.count);
					}
				}
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
		toggleActive(obj);
		refreshTotalRank();
	}

	function toggleActive(obj)
	{
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
	}

	export function refreshTotalRank()
	{
		let table = totalRankTable.DataTable();
		table.ajax.reload();
	}
