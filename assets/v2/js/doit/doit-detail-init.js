
	import {
		modalClose,
		modalBackdrop,
		tabUl,
		tabContents,
		btnBack,
		btnList,
		lengthInput,
		btnDoitOpen,
		btnDoitStop,
		btnDoitDelete,
		btnCreateMission,
		btnDeleteMission,
		btnUpdateMission,
		btnSubmitUpdateMission,
		btnSubmitMission,
		btnCreateTalk,
		btnPendingMembers,
		btnJoinMembers,
		btnReset,
		actionCount,
		btnResetSearchAction,
		btnSaveUcd,
		amount,
		btnSendWarning,
		btnSearchTalk,
		btnResetSearchTalk,
		btnUpdateTalk,
		searchActionDateFrom,
		searchActionDateTo,
		searchTalkDateFrom,
		searchTalkDateTo,
		dateButtons,
		missionStartDate,
		missionEndDate,
		rdoActionType,
		updateMissionStartDate,
		updateMissionEndDate,
		rdoUpdateActionType,
		selJoinMemberPageLength,
		selApplyMemberPageLength,
		btnSearch,
		selSort,
		btnBan,
		btnBackActionList,
		chkPermanent,
		chkUpdatePermanent,
		btnSearchAction,
		selActionPageLength,
		btnSendWarnings,
		btnSubmitSendWarning,
		btnSubmitCommentAction,
		rdoAttachType,
		selTalkPageLength,
		btnSubmitTalk,
		btnSubmitCommentTalk,
		btnDeleteTalk,
		rdoUpdateAttachType,
		btnSubmitUpdateTalk,
		selUcdPageLength,
		searchUcdDateTo,
		searchUcdDateFrom,
		btnSaveUcdWallet,
		saveWalletAmount,
		btnSearchUcd,
		btnResetSearchUcd,
		btnSubmitSaveDoitUcd,
		btnSubmitSaveUcd,
		btnBackToTalkList,
		btnBackToTalkDetail,
		btnBackToMissionList,
		btnBackToMissionDetail,
		btnBlindTalk,
		btnDisplayTalk,
		selRewardType,
		rewardKeyword,
		btnApproval,
		btnReject,
		doitImage,
		selCategory,
		btnAddKeyword,
		chkIsApply,
		chkIsQuestion,
		btnUpdateDoit,
		btnBackDoitList,
		btnSubmitUpdateDoit,
		actionTimes,
		btnPromotion,
		modalPromotion,
		btnBlockMembers,
		promotionTable,
		btnPromotionCancel,
		maxUserCount,
		chkBlock,
		rdoReason,
		btnSubmitBan,
		selBlockMemberPageLength,
		btnCancelBlock,
		searchTab,
		btnRefreshOngoingRank,
		btnRefreshTotalRank,
		chkNoticeType,
		chkNoticeTalk,
		chkUpdateNoticeTalk, btnReward
	} from '../modules/elements.js';
	import {
		historyBack, limitInputLength, fadeoutModal, initSearchDatepicker, onChangeSearchDateTo,
		onChangeSearchDateFrom, onClickDateRangeBtn, initPageLength, onChangeValidateImage, atLeastChecked
	} from "../modules/common.js";
	import {initInputNumber, initInputNumberWithZero, isEmpty,} from "../modules/utils.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";
	import {getCategoryList, initSearchDatepickerMaxDateToday, onChangeSelCategory,
		onClickAddKeyword, onClickChkIsApply, onClickChkIsQuestion} from "../modules/doit-common.js"
	import {
		getDetail,
		showDoitInfoForm,
		onClickBtnUpdateDoit,
		onSubmitUpdateDoit,
		isPromotion,
		g_doit_uuid,
	} from "./doit-detail-info.js";
	import {
		showCreateMissionForm, showMissionListForm, onClickBtnUpdateMission, onChangeActionType, onSubmitMission,
		onSubmitUpdateMission, deleteMission, onChangeMissionEndDate, onChangeMissionStartDate,
		onChangeUpdateMissionStartDate, onChangeUpdateMissionEndDate, onChangeUpdateActionType,
		buildMissionTable, onChangeCheckPermanent, onChangeUpdateCheckPermanent, showMissionDetailForm
	} from "./doit-detail-mission.js";
	import {
		showJoinMemberForm,
		showPendingMemberForm,
		initSearchMemberForm,
		onClickModalSaveUcdOpen,
		searchJoinMember,
		onClickBtnBan,
		searchApplyMember,
		onSubmitSaveUcd,
		onChangeSelRewardType,
		searchRewardMember,
		onClickBtnApproval,
		onClickBtnReject,
		onChangeChkBlock,
		onChangeRdoReason,
		onSubmitBan, showBlockMemberForm, searchBlockMember, onClickBtnCancelBlock,
	} from "./doit-detail-member.js";
	import {onClickSearchTab, refreshOngoingRank, refreshTotalRank, initMemberRankForm} from "./doit-detail-rank.js";
	import {
		showUcdListForm,
		initSearchUcdForm,
		onClinkBtnSaveUcdWallet,
		onSubmitSearchUcd,
		onSubmitSaveDoitUcd,
		buildUcdTable,
		onClickBtnReward
	} from "./doit-detail-ucd.js";
	import {
		initSearchActionForm, showActionListForm, getMissionListForAction, onClickModalWarnOpen,
		onSubmitSearchActions, onSubmitSendWarning, onSubmitActionComment, onChangeSearchActionDateFrom,
		onChangeSearchActionDateTo
	} from "./doit-detail-action.js";
	import {
		buildTalkTable, onClickBtnCreateTalk, initSearchTalkForm, showTalkListForm, onClickBtnUpdateTalk,
		onChangeAttachType, onSubmitSearchTalk, onSubmitTalk, onSubmitTalkComment, onSubmitDeleteTalk,
		onChangeUpdateAttachType, onSubmitUpdateTalk, showTalkDetailForm, onSubmitBlindTalk,
		onChangeSearchTalkDateFrom, onChangeSearchTalkDateTo, onClickChkNoticeTalk, onClickChkUpdateNoticeTalk
	} from "./doit-detail-talk.js";
	import {api} from "../modules/api-url.js";
	import {message} from "../modules/message.js";
	import {sweetConfirm, sweetToastAndCallback, sweetError, sweetToast} from "../modules/alert.js";
	import {ajaxRequestWithJson, headers, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import {label} from "../modules/label.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initSearchDatepickerMaxDateToday();
		/** 공통 **/
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		tabUl			.on('click', function (event) { onClickTab(event.target); });
		btnDoitOpen		.on('click', function () { onSubmitChangeDoitStatus(this); });
		btnDoitStop		.on('click', function () { onSubmitChangeDoitStatus(this); });
		btnDoitDelete	.on('click', function () { onSubmitChangeDoitStatus(this); });
		btnPromotion	.on('click', function () { onClickBtnPromotion(); });
		btnPromotionCancel	.on('click', function () { onClickBtnPromotionCancel(this); });
		/** 정보탭 **/
		getCategoryList();
		getDetail();
		maxUserCount	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		doitImage		.on('change', function () { onChangeValidateImage(this); });
		selCategory		.on('change', function () { onChangeSelCategory(); });
		btnAddKeyword	.on('click', function () { onClickAddKeyword(); });
		chkIsApply		.on('change', function () { onClickChkIsApply(this); });
		chkIsQuestion	.on('change', function () { onClickChkIsQuestion(this); });
		btnUpdateDoit	.on('click', function () { onClickBtnUpdateDoit() });
		btnBackDoitList	.on('click', function () { showDoitInfoForm() });
		btnSubmitUpdateDoit	.on('click', function () { onSubmitUpdateDoit(); });
		/** 미션탭 **/
		missionStartDate.on('change', function () { onChangeMissionStartDate(); });
		missionEndDate	.on('change', function () { onChangeMissionEndDate(); });
		chkPermanent.on('change', function () { onChangeCheckPermanent(this); });
		updateMissionStartDate	.on('change', function () { onChangeUpdateMissionStartDate(); });
		updateMissionEndDate	.on('change', function () { onChangeUpdateMissionEndDate(); });
		chkUpdatePermanent.on('change', function () { onChangeUpdateCheckPermanent(this); });
		rdoActionType	.on('change', function () { onChangeActionType(); });
		rdoUpdateActionType	.on('change', function () { onChangeUpdateActionType(); });
		btnCreateMission	.on('click', function () { showCreateMissionForm(); });
		btnBackToMissionList.on('click', function () { showMissionListForm(); });
		btnBackToMissionDetail.on('click', function () { showMissionDetailForm(); });
		btnUpdateMission.on('click', function () { onClickBtnUpdateMission(); });
		btnSubmitMission.on('click', function () { onSubmitMission() });
		btnSubmitUpdateMission.on('click', function () { onSubmitUpdateMission(); });
		btnDeleteMission.on('click', function () { deleteMission() });
		/** 참여자탭 **/
		initPageLength(selJoinMemberPageLength);
		initPageLength(selApplyMemberPageLength);
		initPageLength(selBlockMemberPageLength);
		btnSearch.on('click', function () { searchJoinMember(); });
		btnReset.on('click', function () { initSearchMemberForm(); });
		actionCount.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		selJoinMemberPageLength.on('change', function () { searchJoinMember(); });
		selSort.on('change', function () { searchJoinMember(); });
		btnSaveUcd.on('click', function () { onClickModalSaveUcdOpen(); });
		/*btnSendNotice.on('click', function () { onClickModalSendNoticeOpen(); });*/
		amount.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		actionTimes.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		btnJoinMembers.on('click', function () { showJoinMemberForm(); });
		// selMemberFilter.on('change', function () { onChangeSelMemberFilter(this); });
		btnPendingMembers.on('click', function () { showPendingMemberForm(); });
		selApplyMemberPageLength.on('change', function () { searchApplyMember(); });
		btnSubmitSaveUcd.on('click', function () { onSubmitSaveUcd(); });
		selRewardType.on('change', function () { onChangeSelRewardType(); });
		rewardKeyword.on("propertychange change keyup paste input", function () { searchRewardMember() });
		/*selNotiType.on('change', function () { onChangeSelNotiType(); });*/
		btnApproval.on('click', function () { onClickBtnApproval(); });
		btnReject.on('click', function () { onClickBtnReject(); });
		btnBlockMembers.on('click', function () { showBlockMemberForm(); });
		btnBan.on('click', function () { onClickBtnBan(); });
		chkBlock.on('change', function () { onChangeChkBlock(this); });
		rdoReason.on('change', function () { onChangeRdoReason(this); });
		btnSubmitBan.on('click', function () { onSubmitBan() });
		selBlockMemberPageLength.on('change', function () { searchBlockMember() });
		btnCancelBlock.on('click', function () { onClickBtnCancelBlock(); });
		/** 랭크탭 **/
		searchTab.on('click', function () { onClickSearchTab(this); });
		btnRefreshOngoingRank.on('click', function () { refreshOngoingRank(); });
		btnRefreshTotalRank.on('click', function () { refreshTotalRank(); });
		/** UCD탭 **/
		initPageLength(selUcdPageLength);
		searchUcdDateFrom.on('change', function () { onChangeSearchDateFrom(); });
		searchUcdDateTo.on('change', function () { onChangeSearchDateTo(); });
		btnSearchUcd.on('click', function () { onSubmitSearchUcd(); });
		btnResetSearchUcd.on('click', function () { initSearchUcdForm(); });
		selUcdPageLength.on('change', function () { onSubmitSearchUcd(); });
		btnSaveUcdWallet.on('click', function () { onClinkBtnSaveUcdWallet(); });
		saveWalletAmount.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		btnSubmitSaveDoitUcd.on('click', function () { onSubmitSaveDoitUcd(); });
		btnReward.on('click', function () { onClickBtnReward(); });
		/** 인증탭 **/
		initPageLength(selActionPageLength);
		btnSearchAction.on('click', function () { onSubmitSearchActions(); });
		btnResetSearchAction.on('click', function () { initSearchActionForm(); });
		selActionPageLength.on('change', function () { onSubmitSearchActions(); });
		btnBackActionList.on('click', function () { showActionListForm(); });
		searchActionDateFrom.on('change', function () { onChangeSearchActionDateFrom(); });
		searchActionDateTo.on('change', function () { onChangeSearchActionDateTo(); });
		btnSendWarning.on('click', function () { onClickModalWarnOpen(this); });
		btnSendWarnings.on('click', function () { onClickModalWarnOpen(this); });
		btnSubmitSendWarning.on('click', function () { onSubmitSendWarning(); });
		btnSubmitCommentAction.on('click', function () { onSubmitActionComment(); } );
		/** 두잇톡탭 **/
		initPageLength(selTalkPageLength);
		chkNoticeTalk.on('click', function () { onClickChkNoticeTalk(); });
		chkUpdateNoticeTalk.on('click', function () { onClickChkUpdateNoticeTalk(); });
		chkNoticeType.on('click', function () { atLeastChecked(this); });
		rdoAttachType.on('change', function () { onChangeAttachType(); });
		rdoUpdateAttachType.on('change', function () { onChangeUpdateAttachType(); });
		searchTalkDateFrom.on('change', function () { onChangeSearchTalkDateFrom(); });
		searchTalkDateTo.on('change', function () { onChangeSearchTalkDateTo(); });
		btnSearchTalk.on('click', function () { onSubmitSearchTalk(); });
		selTalkPageLength.on('change', function () { onSubmitSearchTalk(); });
		btnResetSearchTalk	.on('click', function () { initSearchTalkForm(); });
		btnCreateTalk	.on('click', function () { onClickBtnCreateTalk(); });
		btnBackToTalkList	.on('click', function () { showTalkListForm(); });
		btnBackToTalkDetail	.on('click', function () { showTalkDetailForm(); });
		btnUpdateTalk	.on('click', function () { onClickBtnUpdateTalk(); });
		btnSubmitTalk.on('click', function () { onSubmitTalk(); });
		btnSubmitCommentTalk.on('click', function () { onSubmitTalkComment(); });
		btnDeleteTalk.on('click', function () { onSubmitDeleteTalk(); });
		btnSubmitUpdateTalk.on('click', function () { onSubmitUpdateTalk(); });
		btnBlindTalk.on('click', function () { onSubmitBlindTalk(this); });
		btnDisplayTalk.on('click', function () { onSubmitBlindTalk(this); });
	});

	function onClickTab(selectedTab)
	{
		const target = $(selectedTab).data('target')

		switch (target) {
			case '#tabDoitInfo' :
				showDoitInfoForm();
				getDetail();
				break;
			case '#tabDoitMission' :
				showMissionListForm();
				buildMissionTable();
				break;
			case '#tabDoitMember' :
				showJoinMemberForm();
				break;
			case '#tabDoitMemberRanking' :
				initMemberRankForm(searchTab[0])
				break;
			case '#tabDoitUcd' :
				showUcdListForm();
				buildUcdTable();
				break;
			case '#tabDoitAction' :
				showActionListForm();
				initSearchActionForm();
				getMissionListForAction();
				break;
			case '#tabDoitTalk' :
				showTalkListForm();
				initSearchTalkForm();
				buildTalkTable();
				break;
		}

		$(selectedTab).siblings().removeClass('active');
		$(selectedTab).addClass('active');
		tabContents.hide();
		$(target).show();
	}

	let changeStatusUrl;
	let isStop;
	function onSubmitChangeDoitStatus(obj)
	{
		let confirmMessage;
		const btnId = obj.id;
		const btnText = $(obj).text();

		switch (btnId) {
			case 'btnDoitOpen' :
				confirmMessage = message.doitOpen;
				changeStatusUrl = api.openDoit;
				isStop = '';
				break;
			case 'btnDoitDelete' :
				confirmMessage = message.doitDelete;
				changeStatusUrl = api.deleteDoit;
				isStop = '';
				break;
			case 'btnDoitStop' :
				changeStatusUrl = api.stopDoit;
				if (btnText === '운영정지')
				{
					confirmMessage = message.doitStop;
					isStop = 'Y';
				}
				else if (btnText === '정지해제')
				{
					confirmMessage = message.doitContinue;
					isStop = 'N';
				}
				break;
		}

		if (isPromotion && btnId === 'btnDoitDelete')
		{
			sweetToast(message.canDeleteAfterCancelPromotion);
			return;
		}

		sweetConfirm(confirmMessage, changeDoitStatusRequest);
	}

	function changeDoitStatusRequest()
	{
		const url = changeStatusUrl;
		const param = { "doit_uuid" : g_doit_uuid };

		if (!isEmpty(isStop))
			param.is_stop = isStop;

		ajaxRequestWithJson(true, url, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, doitStatusChangeSuccess);
			})
			.catch(reject => sweetError(message.ajaxError));
	}

	function doitStatusChangeSuccess()
	{
		onClickTab(tabUl.children().eq(0))
	}

	function onClickBtnPromotion()
	{
		modalPromotion.fadeIn();
		modalBackdrop.fadeIn();
		buildPromotion();
	}

	function buildPromotion()
	{
		promotionTable.DataTable({
			ajax : {
				url: api.promotionProceedList,
				type:"POST",
				headers: headers,
				global: false,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (!isSuccessResp(json))
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "프로모션",	data: "promotion_title",	width: '65%' }
				,{title: "스폰서",	data: "nickname",			width: '35%',
					render: function (data) {
						return label.bizIcon + data;
					}
				}
			],
			serverSide: true,
			paging: false,
			select: false,
			scrollY: 450,
			scrollCollapse: true,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.promotion_uuid);
				$(nRow).attr('data-name', aData.promotion_title);
				$(nRow).on('click', function () { onClickPromotion(this); });
			}
		});
	}

	let approval_promotion_uuid;
	function onClickPromotion(obj)
	{
		approval_promotion_uuid = $(obj).data('uuid');
		const msg = `${$(obj).data('name')} 프로모션으로 ${message.approve}`;
		sweetConfirm(msg, approvalPromotionReq);
	}

	function approvalPromotionReq()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"promotion_uuid" : approval_promotion_uuid
		}

		ajaxRequestWithJson(true, api.setDoitPromotion, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, approvalPromotionSuccess);
			})
			.catch(reject => sweetError(label.approval + message.ajaxError));
	}

	function approvalPromotionSuccess()
	{
		fadeoutModal();
		getDetail();
	}

	let cancel_promotion_uuid;
	function onClickBtnPromotionCancel(obj)
	{
		cancel_promotion_uuid = $(obj).data('uuid');
		sweetConfirm(message.cancel, cancelPromotionReq);
	}

	function cancelPromotionReq()
	{
		const param = {
			"doit_uuid" : g_doit_uuid,
			"promotion_uuid" : cancel_promotion_uuid
		}

		ajaxRequestWithJson(true, api.cancelDoitPromotion, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, getDetail);
			})
			.catch(reject => sweetError(label.cancel + message.ajaxError));
	}

	function goListPage()
	{
		location.href = page.listDoit;
	}
