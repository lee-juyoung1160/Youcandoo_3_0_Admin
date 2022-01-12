
	import {
		keyword,
		actionCount,
		joinMemberForm,
		pendingMemberForm,
		modalBackdrop,
		modalMemberInfo,
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
		banMemberCount,
		modalBan,
		chkBlock,
		rdoReason,
		banReason,
		modalMemo,
		memo,
		banReasonWrap,
		blockMemberForm,
		blockMemberTable,
		selBlockMemberPageLength,
		searchMemberFrom,
		searchMemberTo,
	} from "../modules/elements.js";
	import {
		fadeoutModal, initDayBtn,
		initSelectOption,
		overflowHidden,
	} from "../modules/common.js";
	import {api} from "../modules/api-url.js";
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
		blockMemberForm.hide();
		countMember();
		getMissionListForMember();
	}

	export function showPendingMemberForm()
	{
		pendingMemberForm.show();
		joinMemberForm.hide();
		blockMemberForm.hide();
		getQuestion()
		countMember();
		buildPendingMember();
	}

	export function showBlockMemberForm()
	{
		blockMemberForm.show();
		pendingMemberForm.hide();
		joinMemberForm.hide();
		countMember();
		buildBlockMember();
	}

	export function initSearchMemberForm()
	{
		searchMemberFrom.datepicker("setDate", "2021-07-01");
		searchMemberTo.datepicker("setDate", "today");
		keyword.val('');
		actionCount.val(0);
		initSelectOption();
		initDayBtn();
	}

	export function onChangeSearchMemberDateFrom()
	{
		searchMemberTo.datepicker("option", "minDate", new Date(searchMemberFrom.datepicker("getDate")));
		initDayBtn();
	}

	export function onChangeSearchMemberDateTo()
	{
		searchMemberFrom.datepicker("option", "maxDate", new Date(searchMemberTo.datepicker("getDate")));
		initDayBtn();
	}

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
		const {totalMemberCnt, totalApplyMemberCnt, totalBanMemberCnt} = data.data;
		totalMemberCount.text(totalMemberCnt);
		applyMemberCount.text(totalApplyMemberCnt);
		banMemberCount.text(totalBanMemberCnt);
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
						"from_date" : searchMemberFrom.val(),
						"to_date" : searchMemberTo.val(),
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
				{title: "닉네임", 			data: "nickname",			width: "15%",
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
				,{title: "가입일시",   		data: "joined",  			width: "12%" }
				,{title: '',				data: "profile_uuid",  		width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(`join_${meta.row}`);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selJoinMemberPageLength.val()),
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				if (!isSponsorDoit)
				{
					let table = joinMemberTable.DataTable();
					table.column(8).visible(false);
				}
				$(this).on( 'select.dt', function ( e, dt, type, indexes ) {
					$(this).find("input[name=chk-row]").eq(indexes).prop('checked', true);
				});
				$(this).on( 'deselect.dt', function ( e, dt, type, indexes ) {
					$(this).find("input[name=chk-row]").eq(indexes).prop('checked', false)
				});
			},
			fnRowCallback: function( nRow, aData ) {
				if (aData.member_type === 'leader')
					$(nRow).children().eq(8).find('input').prop('disabled', true);
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

	function viewMemberInfo(obj)
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : $(obj).data('uuid')
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

	export function onClickBtnBan()
	{
		if (isEmpty(getSelectedJoinMemberUuid()))
		{
			sweetToast(`대상을 ${message.select}`);
			return;
		}

		modalBan.fadeIn();
		modalBackdrop.fadeIn();
		initModalBan();
	}

	function initModalBan()
	{
		chkBlock.prop('checked', false);
		onChangeChkBlock(chkBlock);
		rdoReason.eq(0).prop('checked', true);
		onChangeRdoReason(rdoReason);
	}

	export function onChangeChkBlock(obj)
	{
		$(obj).is(':checked') ? banReasonWrap.show() : banReasonWrap.hide();
	}

	export function onChangeRdoReason(obj)
	{
		switch ($(obj).val()) {
			case 'manual' :
				banReason.parent().show();
				banReason.trigger('focus');
				break;
			default :
				banReason.val('');
				banReason.parent().hide();
		}
	}

	export function onSubmitBan()
	{
		if ($("input[name=radio-reason]:checked").val() === 'manual' && isEmpty(banReason.val()))
		{
			sweetToast(`강퇴 사유는 ${message.required}`);
			banReason.trigger('focus');
			return;
		}

		sweetConfirm(message.banMember, banMemberRequest);
	}

	function banMemberRequest()
	{
		const isBlock = chkBlock.is(':checked')
		const url = isBlock ? api.blockMember : api.banMember;
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : getSelectedJoinMemberUuid()
		}

		if (isBlock)
		{
			const reason = $("input[name=radio-reason]:checked").val();
			param['description'] = reason === 'manual' ? banReason.val().trim() : reason;
		}

		ajaxRequestWithJson(true, url, JSON.stringify(param))
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
						return checkBoxElement(`apply_${meta.row}`);
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
					$(this).find("input[name=chk-row]").eq(indexes).prop('checked', true);
					toggleCheckAll(this);
				});
				$(this).on( 'deselect.dt', function ( e, dt, type, indexes ) {
					$(this).find("input[name=chk-row]").eq(indexes).prop('checked', false);
					toggleCheckAll(this);
				});
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(2).addClass('toast-wrap');
				$(nRow).children().eq(2).find('.line-clamp').on('click', function () { onClickAnswer(this); });
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
		return	`<div class="detail-data line-clamp" style="max-width: 500px;">${data}</div>
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
		const uuids = getSelectedApplyMemberUuid();
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
			"profile_uuid" : getSelectedApplyMemberUuid(),
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
			"profile_uuid" : getSelectedApplyMemberUuid(),
		}

		ajaxRequestWithJson(true, api.rejectMember, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, approvalMemberSuccess);
			})
			.catch(reject => sweetError(`거절 ${message.ajaxError}`));
	}

	function getSelectedApplyMemberUuid()
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

	export function searchBlockMember()
	{
		const table = blockMemberTable.DataTable();
		table.page.len(Number(selBlockMemberPageLength.val()));
		table.ajax.reload();
	}

	function buildBlockMember()
	{
		blockMemberTable.DataTable({
			ajax : {
				url: api.blockMemberList,
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
						"limit" : selBlockMemberPageLength.val(),
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임", 		data: "nickname",				width: "20%" }
				,{title: "사유", 		data: "description",			width: "35%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "차단일시",   	data: "blocked",  				width: "15%" }
				,{title: "처리자",   		data: "register_nickname",  	width: "15%" }
				,{title: "메모",   		data: "memo",  					width: "10%",
					render: function (data, type, row, meta) {
						return buildMemo(row);
					}
				}
				,{title: '',			data: "profile_uuid",  	width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(`block_${meta.row}`);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selBlockMemberPageLength.val()),
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				if (!isSponsorDoit)
				{
					let table = blockMemberTable.DataTable();
					table.column(5).visible(false);
				}
				$(this).on( 'page.dt', function () { uncheckedCheckAll(); });
				$("#checkAll").on('click', function () { onClickCheckAll(this); });
				$(this).on( 'select.dt', function ( e, dt, type, indexes ) {
					$(this).find("input[name=chk-row]").eq(indexes).prop('checked', true);
					toggleCheckAll(this);
				});
				$(this).on( 'deselect.dt', function ( e, dt, type, indexes ) {
					$(this).find("input[name=chk-row]").eq(indexes).prop('checked', false);
					toggleCheckAll(this);
				});
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(4).find('button').on('click', function () { onClickBtnMemo(this); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildMemo(data)
	{
		const {profile_uuid, memo} = data;
		const memoElement = isEmpty(memo)
			? ''
			: `<i class="fas fa-sticky-note tooltip-mark"><span class="tooltip-txt left">${memo}</span></i>`;
		return `<div class="memo-wrap">
					<button type="button" class="btn-xs" data-uuid="${profile_uuid}" data-memo="${memo}">
						<i class="fas fa-pen"></i>
					</button>
					${memoElement}
				</div>`
	}

	let memo_profile_uuid;
	function onClickBtnMemo(obj)
	{
		modalMemo.fadeIn();
		modalBackdrop.fadeIn();
		memo.val($(obj).data('memo'));
		memo.trigger('focus');
		memo_profile_uuid = $(obj).data('uuid');
	}

	export function onSubmitMemo()
	{
		if (isEmpty(memo.val()))
		{
			sweetToast(`메모를 ${message.input}`);
			memo.trigger('focus');
			return;
		}

		sweetConfirm(message.create, requestMemo);
	}

	function requestMemo()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : memo_profile_uuid,
			"memo" : memo.val().trim()
		}

		ajaxRequestWithJson(true, api.createBlockMemo, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				sweetToastAndCallback(data, submitMemoCallback);
			})
			.catch(reject => sweetError(`취소${message.ajaxError}`));
	}

	function submitMemoCallback()
	{
		fadeoutModal();
		searchBlockMember();
	}

	export function onClickBtnCancelBlock()
	{
		if (isEmpty(getSelectedBlockMemberUuid()))
		{
			sweetToast(`대상을 ${message.select}`);
			return;
		}

		sweetConfirm(`차단을 ${message.cancel}`, cancelBlockRequest);
	}

	function cancelBlockRequest()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"profile_uuid" : getSelectedBlockMemberUuid()
		}

		ajaxRequestWithJson(true, api.cancelBlockMember, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, cancelBlockSuccess);
			})
			.catch(reject => sweetError(`취소${message.ajaxError}`));
	}

	function cancelBlockSuccess()
	{
		countMember();
		tableReloadAndStayCurrentPage(blockMemberTable);
	}

	function getSelectedBlockMemberUuid()
	{
		const table = blockMemberTable.DataTable();
		const selectedData = table.rows('.selected').data();

		let uuids = [];
		for (let i=0; i<selectedData.length; i++)
		{
			const uuid = selectedData[i].profile_uuid;
			uuids.push(uuid);
		}

		return uuids;
	}

	function getSelectedJoinMemberUuid()
	{
		const table = joinMemberTable.DataTable();
		const selectedData = table.rows('.selected').data()[0];

		return selectedData?.profile_uuid;
	}

	export function onClickBtnSaveUcd()
	{
		location.href = `/v2/doit/reward/${doitIdx}`
	}
