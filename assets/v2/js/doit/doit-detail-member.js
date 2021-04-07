
	import {
		keyword,
		actionCount,
		joinMemberForm,
		pendingMemberForm,
		modalSaveUcd,
		modalBackdrop,
		saveUcdContent,
		saveUcdEtc,
		amount,
		modalSendNotice,
		modalMemberDetail,
		memberActionCntFilterWrap1,
		memberActionCntFilterWrap2,
		rdoActionCount,
		joinMemberTable
	} from "../modules/elements.js";
	import {initSelectOption, overflowHidden,} from "../modules/common.js";
	import {api} from "../modules/api-url.js";
	import {headers} from "../modules/request.js";
	import {g_doit_uuid} from "./doit-detail-info.js";
	import {sweetError} from "../modules/alert.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";

	export function showJoinMemberForm()
	{
		joinMemberForm.show();
		pendingMemberForm.hide();
		//buildJoinMember();
	}

	export function showPendingMemberForm()
	{
		pendingMemberForm.show();
		joinMemberForm.hide();
		//buildPendingMember();
	}

	export function initSearchMemberForm()
	{
		keyword.val('');
		actionCount.val('');
		initSelectOption();
	}

	export function onChangeSelMemberFilter(obj)
	{
		const filterValue = $(obj).val();
		if (filterValue === 'today')
		{
			memberActionCntFilterWrap1.hide();
			memberActionCntFilterWrap2.show();
			rdoActionCount.eq(0).prop('checked', true);
		}
		else
		{
			memberActionCntFilterWrap1.show();
			memberActionCntFilterWrap2.hide();
			actionCount.val('');
		}
	}

	function buildJoinMember()
	{
		joinMemberTable.DataTable({
			ajax : {
				url: api.joinMemberList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

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
				{title: "닉네임", 		data: "mission_title",		width: "10%",
					render: function (data, type, row, meta) {
						return `<a>${data}</a>`;
					}
				}
				,{title: "프로필 ID", 	data: "start_date",			width: "30%"}
				,{title: "등급",    		data: "state",  			width: "10%" }
				,{title: "누적 인증 수",   data: "state",  			width: "10%" }
				,{title: "최대 연속 인증 수",   data: "state",  			width: "10%" }
				,{title: "현재 연속 인증 수",   data: "state",  			width: "10%" }
				,{title: "가입일",   		data: "state",  			width: "10%" }
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildPendingMember()
	{

	}

	export function onClickModalSaveUcdOpen()
	{
		modalSaveUcd.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		saveUcdContent.trigger('focus');
		saveUcdContent.val('');
		amount.val('');
		saveUcdEtc.val();
	}

	export function onClickModalSendNoticeOpen()
	{
		modalSendNotice.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

	export function onClickModalMemberDetailOpen()
	{
		modalMemberDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}




