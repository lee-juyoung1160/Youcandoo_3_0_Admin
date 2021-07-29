
	import {
		keyword, actionCount, joinMemberForm, pendingMemberForm, modalSaveUcd, modalBackdrop, saveUcdContent,
		amount, modalMemberInfo,  joinMemberTable, applyMemberTable, selMissions, selSearchType, selMemberFilter,
		selJoinMemberPageLength, selSort, modalMemberInfoNickname, modalMemberInfoJoinDate, modalMemberInfoQuestion,
		modalMemberInfoAnswer, totalMemberCount, applyMemberCount, selApplyMemberPageLength, applyQuestion,
		rewardMemberTable, btnBan, selRewardType, rewardTableWrap, rewardKeyword, selNotiType, notiKeyword,
		notiTableWrap, notiContent, modalSendNotice, actionTimes,
	} from "../modules/elements.js";
	import {fadeoutModal, initSelectOption, overflowHidden,} from "../modules/common.js";
	import {api} from "../modules/api-url-v1.js";
	import {g_doit_uuid, isSponsorDoit, doitIdx} from "./doit-detail-info.js";
	import {sweetError, sweetToast, sweetToastAndCallback, sweetConfirm} from "../modules/alert.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {buildTotalCount, checkBoxElement, onClickCheckAll, checkBoxCheckAllElement, toggleBtnPreviousAndNextOnTable,
		toggleCheckAll, tableReloadAndStayCurrentPage} from "../modules/tables.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";

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
		// onChangeSelMemberFilter(selMemberFilter);
	}

	/*export function onChangeSelMemberFilter(obj)
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
	}*/

	function countMember()
	{
		const param = { "doit_uuid" : g_doit_uuid }

		ajaxRequestWithJson(false, api.countMember, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildCountMember(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`가입/대기자 수${message.ajaxLoadError}`));
	}

	function buildCountMember(data)
	{
		const {totalMemberCnt, totalApplyMemberCnt} = data.data;
		totalMemberCount.text(totalMemberCnt);
		applyMemberCount.text(totalApplyMemberCnt);
	}

	function getMissionListForMember()
	{
		const param = { "doit_uuid" : g_doit_uuid }

		ajaxRequestWithJson(false, api.missionList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildSelMission(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`미션 목록${message.ajaxLoadError}`));
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
						sweetToast(invalidResp(json));
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
				{title: "닉네임", 			data: "nickname",			width: "17%",
					render: function (data, type, row, meta) {
						const nickname = row.is_company === 'Y' ? label.bizIcon + data : data;
						return `<a data-uuid="${row.profile_uuid}" data-type="${row.member_type}">${nickname}</a>`;
					}
				}
				,{title: "프로필 ID", 		data: "profile_uuid",		width: "24%"}
				,{title: "등급",    			data: "member_type",  		width: "8%" }
				,{title: "누적 인증",   		data: "total_action",  		width: "8%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "현재 연속 인증",   	data: "ongoing_action",  		width: "8%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "최근 7일 인증",   	data: "day7_action",  			width: "8%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "최근 30일 인증",   	data: "day30_action",  		width: "8%",
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
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : g_info_profile_uuid
		}

		ajaxRequestWithJson(false, api.infoJoinMember, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getMemberInfoCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	function getMemberInfoCallback(data)
	{
		modalMemberInfo.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		buildModalMemberInfo(data);
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
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : g_info_profile_uuid
		}

		ajaxRequestWithJson(true, api.banMember, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, banSuccess);
			})
			.catch(reject => sweetError(`강퇴${message.ajaxError}`));
	}

	function banSuccess()
	{
		fadeoutModal();
		countMember();
		buildJoinMember();
	}

	function getQuestion()
	{
		const param = { "idx" : doitIdx };

		ajaxRequestWithJson(true, api.detailDoit, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildQuestion(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`질문을${message.ajaxLoadError}`));
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
						sweetToast(invalidResp(json));
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
						return isEmpty(data) ? label.dash : buildAnswer(data);
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
				$(nRow).children().eq(2).addClass('toast-wrap');
				$(nRow).children().eq(2).find('.line-clamp-2').on('click', function () { onClickAnswer(this); });
				$(nRow).children().eq(2).find('.close').on('click', function () { closeAnswerBox(); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildAnswer(data)
	{
		return	`<div class="detail-data line-clamp-2">${data}</div>
				<div class="toast-box">
					<div class="toast-header">
						<i class="close">×</i>
					</div>
					<div class="toast-body">
						<div class="detail-data">${data}</div>
					</div>
				</div>`
	}

	function onClickAnswer(obj)
	{
		$('.toast-box').hide();
		$(obj).siblings('.toast-box').show();
	}

	function closeAnswerBox()
	{
		$('.toast-box').hide();
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
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : getSelectedApprovalMemberUuid(),
		}

		ajaxRequestWithJson(true, api.approvalMember, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, approvalMemberSuccess);
			})
			.catch(reject => sweetError(`승인 ${message.ajaxError}`));
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
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : getSelectedApprovalMemberUuid(),
		}

		ajaxRequestWithJson(true, api.rejectMember, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, approvalMemberSuccess);
			})
			.catch(reject => sweetError(`거절 ${message.ajaxError}`));
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

	/*export function onChangeSelNotiType()
	{
		switch (selNotiType.val()) {
			case 'user' :
				notiKeyword.trigger('focus');
				notiKeyword.show();
				notiTableWrap.show();
				break;
			default :
				notiKeyword.val('');
				notiKeyword.hide();
				notiTableWrap.hide();
				break;
		}
	}*/

	// export function onClickModalSendNoticeOpen()
	// {
	// 	modalSendNotice.fadeIn();
	// 	modalBackdrop.fadeIn();
	// 	overflowHidden();
	// 	notiContent.trigger('focus');
	// 	notiContent.val('');
	// }

	export function onChangeSelRewardType()
	{
		switch (selRewardType.val()) {
			case 'user' :
				rewardKeyword.trigger('focus');
				rewardKeyword.show();
				rewardTableWrap.show();
				actionTimes.val('');
				actionTimes.parent().hide();
				getRewardMemberList();
				break;
			case 'all' :
				rewardKeyword.val('');
				rewardKeyword.hide();
				rewardTableWrap.hide();
				actionTimes.val('');
				actionTimes.parent().hide();
				break;
			default :
				rewardKeyword.val('');
				rewardKeyword.hide();
				rewardTableWrap.hide();
				actionTimes.parent().show();
				actionTimes.trigger('focus');
				break;
		}
	}

	export function onClickModalSaveUcdOpen()
	{
		modalSaveUcd.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		amount.trigger('focus');
		amount.val('');
		saveUcdContent.val('');
		actionTimes.val('');
	}

	function getRewardMemberList()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"search_type" : "nickname",
			"keyword" : ''
		}

		ajaxRequestWithJson(true, api.rewardMemberList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getRewardMemberListCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.list + message.ajaxLoadError));
	}

	let rewardMembers = [];
	function getRewardMemberListCallback(data)
	{
		data.recordsTotal = data.data.count;
		data.recordsFiltered = data.data.count;
		rewardMembers = data.data.list;
		buildRewardMember();
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
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
			}
		});
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

		if (['user', 'all'].indexOf(selRewardType.val()) === -1 && isEmpty(actionTimes.val()))
		{
			sweetToast(`인증 횟수를 ${message.input}`);
			return false;
		}

		return true;
	}

	function saveUcdRequest()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"description" : saveUcdContent.val().trim(),
			"value" : amount.val().trim(),
			"type" : selRewardType.val(),
		}

		if (selRewardType.val() === 'user')
			param["profile_uuid"] = getSelectedIdsFromTableRow();

		if (['user', 'all'].indexOf(selRewardType.val()) === -1)
			param["type_value"] = actionTimes.val().trim();

		ajaxRequestWithJson(true, api.createReward, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, fadeoutModal);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
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
