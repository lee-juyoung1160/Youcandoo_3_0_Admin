
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
		modalMemberInfo,
		memberActionCntFilterWrap1,
		memberActionCntFilterWrap2,
		rdoActionCount,
		joinMemberTable,
		applyMemberTable,
		selMissions,
		selSearchType,
		selMemberFilter,
		selJoinMemberPageLength,
		selSort,
		modalMemberInfoNickname,
		modalMemberInfoJoinDate,
		modalMemberInfoQuestion,
		modalMemberInfoAnswer,
		totalMemberCount,
		applyMemberCount,
		selApplyMemberPageLength, applyQuestion
	} from "../modules/elements.js";
	import {fadeoutModal, initSelectOption, overflowHidden,} from "../modules/common.js";
	import {api} from "../modules/api-url.js";
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from "../modules/request.js";
	import {g_doit_uuid, doitIdx} from "./doit-detail-info.js";
	import {sweetError, sweetToast, sweetToastAndCallback, sweetConfirm} from "../modules/alert.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {buildTotalCount, checkBoxElement, toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";
	import {isEmpty} from "../modules/utils.js";

	export function showJoinMemberForm()
	{
		joinMemberForm.show();
		pendingMemberForm.hide();
		countMember();
		getSelMissionList();
	}

	export function showPendingMemberForm()
	{
		pendingMemberForm.show();
		joinMemberForm.hide();
		getQuestion()
		countMember();
		buildPendingMember();
	}

	export function initSearchMemberForm()
	{
		keyword.val('');
		actionCount.val(0);
		initSelectOption();
		onChangeSelMemberFilter(selMemberFilter);
	}

	export function onChangeSelMemberFilter(obj)
	{
		const filterValue = $(obj).val();
		if (filterValue === 'today_action')
		{
			memberActionCntFilterWrap1.hide();
			memberActionCntFilterWrap2.show();
			rdoActionCount.eq(0).prop('checked', true);
		}
		else
		{
			memberActionCntFilterWrap1.show();
			memberActionCntFilterWrap2.hide();
			actionCount.val(0);
		}
	}

	function countMember()
	{
		const url = api.countMember;
		const errMsg = `가입/대기자 수 ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), countMemberCallback, errMsg, false);
	}

	function countMemberCallback(data)
	{
		isSuccessResp(data) ? buildCountMember(data) : sweetToast(data.msg);
	}

	function buildCountMember(data)
	{
		const {totalMemberCnt, totalApplyMemberCnt} = data.data;
		totalMemberCount.text(totalMemberCnt);
		applyMemberCount.text(totalApplyMemberCnt);
	}

	function getSelMissionList()
	{
		const url = api.missionList;
		const errMsg = `미션 목록 ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getSelMissionListCallback, errMsg, false);
	}

	function getSelMissionListCallback(data)
	{
		isSuccessResp(data) ? buildSelMission(data) : sweetToast(data.msg);
	}

	function buildSelMission(data)
	{
		const missions = data.data;
		let options = '<option value="all">전체</option>';
		if (missions.length > 0)
			missions.map(obj => { options += `<option value="${obj.mission_uuid}">${obj.mission_title}</option>` });

		selMissions.html(options);

		buildJoinMember();
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
						"doit_uuid" : g_doit_uuid,
						"search_type" : selSearchType.val(),
						"keyword" : keyword.val(),
						"mission_uuid" : selMissions.val(),
						"action_type" : selMemberFilter.val(),
						"page" : (d.start / d.length) + 1,
						"limit" : selJoinMemberPageLength.val(),
						"order_by" : selSort.val(),
					}
					selMemberFilter.val() === 'today_action'
					? param["today_action_type"] = $("input[name=radio-action-count]:checked").val()
					: param["action_count"] = Number(actionCount.val().trim());

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임", 			data: "nickname",			width: "20%",
					render: function (data, type, row, meta) {
						return `<a data-uuid="${row.profile_uuid}">${data}</a>`;
					}
				}
				,{title: "프로필 ID", 		data: "profile_uuid",		width: "25%"}
				,{title: "등급",    			data: "member_type",  		width: "10%" }
				,{title: "누적 인증 수",   	data: "total_action",  		width: "10%" }
				,{title: "최대 연속 인증 수",   data: "max_recycle_action", width: "10%" }
				,{title: "현재 연속 인증 수",   data: "ongoing_action",  	width: "10%" }
				,{title: "가입일시",   		data: "joined",  			width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selJoinMemberPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(0).find('a').on('click', function () { viewMemberInfo(this);})
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	export function searchJoinMember()
	{
		const table = joinMemberTable.DataTable();
		table.page.len(Number(selJoinMemberPageLength.val()));
		table.ajax.reload();
	}

	let g_info_profile_uuid;
	function viewMemberInfo(obj)
	{
		g_info_profile_uuid = $(obj).data('uuid');
		const url = api.infoJoinMember;
		const errMsg = `회원 정보 ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : g_info_profile_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getMemberInfoCallback, errMsg, false);
	}

	function getMemberInfoCallback(data)
	{
		if (isSuccessResp(data))
		{
			modalMemberInfo.fadeIn();
			modalBackdrop.fadeIn();
			overflowHidden();
			buildModalMemberInfo(data);
		}
		else
		{
			g_info_profile_uuid = '';
			sweetToast(data.msg);
		}
	}

	function buildModalMemberInfo(data)
	{
		const { nickname, joined, question, answer } = data.data;
		modalMemberInfoNickname.text(nickname);
		modalMemberInfoJoinDate.text(joined);
		modalMemberInfoQuestion.text(isEmpty(question) ? label.dash : question);
		modalMemberInfoAnswer.text(isEmpty(answer) ? label.dash : answer);
	}

	export function banMember()
	{
		sweetConfirm(message.banMember, banMemberRequest);
	}

	function banMemberRequest()
	{
		const url = api.banMember;
		const errMsg = `회원 강퇴 ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : g_info_profile_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), banMemberCallback, errMsg, false);
	}

	function banMemberCallback(data)
	{
		sweetToastAndCallback(data, banSuccess);
	}

	function banSuccess()
	{
		fadeoutModal();
		countMember();
		buildJoinMember();
	}

	function getQuestion()
	{
		const url = api.detailDoit;
		const errMsg = label.detailContent + message.ajaxLoadError;
		const param = { "idx" : doitIdx };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getQuestionCallback, errMsg, false);
	}

	function getQuestionCallback(data)
	{
		isSuccessResp(data) ? buildQuestion(data) : sweetToast(data.msg);
	}

	function buildQuestion(data)
	{
		const {question} = data.data;
		applyQuestion.text(isEmpty(question) ? label.dash : question);
	}

	function buildPendingMember()
	{
		applyMemberTable.DataTable({
			ajax : {
				url: api.applyMemberList,
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
						"doit_uuid" : g_doit_uuid,
						"page" : (d.start / d.length) + 1,
						"limit" : selApplyMemberPageLength.val(),
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임", 		data: "nickname",		width: "20%" }
				,{title: "신청일시",   	data: "state",  		width: "15%" }
				,{title: "답변", 		data: "start_date",		width: "60%"}
				,{title: "",			data: "state",  		width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: {
				style: 'multi',
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

	export function searchPendingMember()
	{
		const table = applyMemberTable.DataTable();
		table.page.len(Number(selApplyMemberPageLength.val()));
		table.ajax.reload();
	}

	$(".detail-data.line-clamp-2").on('click', function () { onClickAnswer(this) })
	$('.toast-header .close').on('click', function () { closeAnswerBox() })
	function onClickAnswer(obj)
	{
		$('.toast-box').hide();
		$(obj).siblings('.toast-box').show();
	}

	function closeAnswerBox()
	{
		$('.toast-box').hide();
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

