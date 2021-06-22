
	import {
		keyword,
		actionCount,
		joinMemberForm,
		pendingMemberForm,
		modalSaveUcd,
		modalBackdrop,
		saveUcdContent,
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
		selApplyMemberPageLength,
		applyQuestion,
		rewardMemberTable,
		btnBan,
		selRewardType,
		rewardTableWrap,
		rewardKeyword,
	} from "../modules/elements.js";
	import {fadeoutModal, initSelectOption, overflowHidden,} from "../modules/common.js";
	import {api} from "../modules/api-url.js";
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from "../modules/request.js";
	import {g_doit_uuid, doitIdx, isSponsorDoit} from "./doit-detail-info.js";
	import {sweetError, sweetToast, sweetToastAndCallback, sweetConfirm} from "../modules/alert.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {
		buildTotalCount,
		checkBoxElement,
		onClickCheckAll,
		checkBoxCheckAllElement,
		toggleBtnPreviousAndNextOnTable,
		toggleCheckAll, tableReloadAndStayCurrentPage
	} from "../modules/tables.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";

	export function showJoinMemberForm()
	{
		joinMemberForm.show();
		pendingMemberForm.hide();
		countMember();
		getMissionListForMember();
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

	function getMissionListForMember()
	{
		const url = api.missionList;
		const errMsg = `미션 목록 ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getMissionListForMemberCallback, errMsg, false);
	}

	function getMissionListForMemberCallback(data)
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
						const nickname = row.is_company === 'Y' ? label.bizIcon + data : data;
						return `<a data-uuid="${row.profile_uuid}" data-type="${row.member_type}">${nickname}</a>`;
					}
				}
				,{title: "프로필 ID", 		data: "profile_uuid",		width: "25%"}
				,{title: "등급",    			data: "member_type",  		width: "10%" }
				,{title: "누적 인증 수",   	data: "total_action",  		width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "최대 연속 인증 수",   data: "ongoing_action_count", width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "현재 연속 인증 수",   data: "ongoing_action",  	width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
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
		toggleBtnBan(obj);

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

	function toggleBtnBan(obj)
	{
		$(obj).data('type') === 'leader' ? btnBan.hide() : btnBan.show();
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
				,{title: "신청일시",   	data: "created",  		width: "15%" }
				,{title: "답변", 		data: "answer",			width: "60%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: checkBoxCheckAllElement(),			data: "profile_uuid",  	width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selApplyMemberPageLength.val()),
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				if (!isSponsorDoit)
				{
					let table = applyMemberTable.DataTable();
					table.column(3).visible(false);
				}
				$(this).on( 'page.dt', function () { uncheckedCheckAll(); });
				$("#checkAll").on('click', function () { onClickCheckAll(this); });
				$(this).on( 'select.dt', function ( e, dt, type, indexes ) {
					$("input[name=chk-row]").eq(indexes).prop('checked', true);
					toggleCheckAll(this);
				});
				$(this).on( 'deselect.dt', function ( e, dt, type, indexes ) {
					$("input[name=chk-row]").eq(indexes).prop('checked', false);
					toggleCheckAll(this);
				});
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	export function searchApplyMember()
	{
		const table = applyMemberTable.DataTable();
		table.page.len(Number(selApplyMemberPageLength.val()));
		table.ajax.reload();
	}

	export function onClickBtnApproval()
	{
		if (approvalMemberValid())
			sweetConfirm(message.approve, approvalMemberRequest);
	}

	function approvalMemberValid()
	{
		const uuids = getSelectedApprovalMemberUuid();
		if (uuids.length === 0)
		{
			sweetToast(`대상을 ${message.select}`);
			return false;
		}

		return true;
	}

	function approvalMemberRequest()
	{
		const url = api.approvalMember;
		const errMsg = `승인 ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : getSelectedApprovalMemberUuid(),
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), approvalMemberReqCallback, errMsg, false);
	}

	function approvalMemberReqCallback(data)
	{
		sweetToastAndCallback(data, approvalMemberSuccess);
	}

	function approvalMemberSuccess()
	{
		countMember();
		tableReloadAndStayCurrentPage(applyMemberTable);
	}

	export function onClickBtnReject()
	{
		if (approvalMemberValid())
			sweetConfirm(message.reject, rejectMemberRequest);
	}

	function rejectMemberRequest()
	{
		const url = api.rejectMember;
		const errMsg = `거절 ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : getSelectedApprovalMemberUuid(),
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), rejectMemberReqCallback, errMsg, false);
	}

	function rejectMemberReqCallback(data)
	{
		sweetToastAndCallback(data, approvalMemberSuccess);
	}

	function getSelectedApprovalMemberUuid()
	{
		const table = applyMemberTable.DataTable();
		const selectedData = table.rows('.selected').data();

		let uuids = [];
		for (let i=0; i<selectedData.length; i++)
		{
			const uuid = selectedData[i].profile_uuid;
			uuids.push(uuid);
		}

		return uuids;
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

	export function onChangeSelRewardType()
	{
		switch (selRewardType.val()) {
			case 'user' :
				rewardKeyword.trigger('focus');
				rewardKeyword.show();
				rewardTableWrap.show();
				break;
			default :
				rewardKeyword.val('');
				rewardKeyword.hide();
				rewardTableWrap.hide();
				break;
		}
	}

	export function searchRewardMember()
	{
		const rewardTable = rewardMemberTable.DataTable();
		const inputValue = rewardKeyword.val().trim();

		rewardTable.search(inputValue).draw();
	}

	function buildRewardMember()
	{
		rewardMemberTable.DataTable({
			data: rewardMembers,
			columns: [
				{title: "닉네임",    		data: "nickname",  		width: "40%" }
				,{title: "P-ID", 		data: "profile_uuid",	width: "40%" }
				,{title: "보유 UCD",    	data: "ucd",  			width: "15%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: '', 			data: "profile_uuid",   width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
			],
			serverSide: false,
			searching: true,
			dom: 'lrtp',
			paging: true,
			pageLength: 5,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(3).find('button').on('click', function () { deleteRewardMemberTableRow(this); });
				$(nRow).attr('data-uuid', aData.profile_uuid);
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
			}
		});
	}

	function deleteRewardMemberTableRow(obj)
	{
		let idx = $(obj).data('row');
		rewardMembers.splice(idx, 1);

		$(obj).closest('tr').remove();

		buildRewardMember();
	}

	export function onClickModalSaveUcdOpen()
	{
		modalSaveUcd.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		saveUcdContent.trigger('focus');
		saveUcdContent.val('');
		amount.val('');

		getRewardMemberList();
	}

	function getRewardMemberList()
	{
		const url = api.rewardMemberList;
		const errMsg = label.list + message.ajaxLoadError;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"search_type" : "nickname",
			"keyword" : ''
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getRewardMemberListCallback, errMsg, false);
	}

	let rewardMembers = [];
	function getRewardMemberListCallback(data)
	{
		if (isSuccessResp(data))
		{
			data.recordsTotal = data.data.count;
			data.recordsFiltered = data.data.count;
			rewardMembers = data.data.list;
			buildRewardMember();
		}
		else
			sweetToast(data.msg);
	}

	export function onSubmitSaveUcd()
	{
		if (saveUcdValid())
			sweetConfirm(message.create, saveUcdRequest);
	}

	function saveUcdValid()
	{
		if (isEmpty(saveUcdContent.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			saveUcdContent.trigger('focus');
			return false;
		}

		if (isEmpty(amount.val()))
		{
			sweetToast(`적립 UCD는 ${message.required}`);
			amount.trigger('focus');
			return false;
		}

		if (Number(amount.val()) > 1000000)
		{
			sweetToast(message.maxAvailableUserUcd);
			amount.trigger('focus');
			return false;
		}

		if (selRewardType.val() === 'user' && getSelectedIdsFromTableRow().length === 0)
		{
			sweetToast(`적립 대상을 ${message.select}`);
			return false;
		}

		return true;
	}

	function saveUcdRequest()
	{
		const url = api.createReward;
		const errMsg = label.submit+message.ajaxLoadError;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"description" : saveUcdContent.val().trim(),
			"value" : amount.val().trim(),
			"type" : selRewardType.val(),
		}

		if (selRewardType.val() === 'user')
			param["profile_uuid"] = getSelectedIdsFromTableRow();

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), saveUcdReqCallback, errMsg, false);
	}

	function saveUcdReqCallback(data)
	{
		sweetToastAndCallback(data, saveUcdSuccess);
	}

	function saveUcdSuccess()
	{
		fadeoutModal();
	}

	function getSelectedIdsFromTableRow()
	{
		let profileUuids = [];
		const rewardTable = rewardMemberTable.DataTable();
		const selectedData = rewardTable.rows('.selected').data();
		if (!isEmpty(selectedData) && selectedData.length > 0)
		{
			for (let i=0; i<selectedData.length; i++)
			{
				const uuid = selectedData[i].profile_uuid;
				profileUuids.push(uuid);
			}
		}

		return profileUuids;
	}

	export function onClickModalSendNoticeOpen()
	{
		modalSendNotice.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}
