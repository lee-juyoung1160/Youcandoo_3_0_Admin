
	import {
	modalClose,
	modalBackdrop,
	tabUl,
	tabContents,
	btnBack,
	btnList,
	lengthInput,
	btnBackDoitList,
	btnDoitOpen,
	btnDoitStop,
	btnDoitDelete,
	chkIsApply,
	chkIsQuestion,
	btnAddKeyword,
	selCategory,
	doitImage,
	btnUpdateDoit,
	btnSubmitUpdateDoit,
	btnCreateMission,
	btnBackMissionList,
	btnDeleteMission,
	btnUpdateMission,
	btnSubmitUpdateMission,
	btnSubmitMission,
	btnCreateTalk,
	selMemberFilter,
	btnPendingMembers,
	btnJoinMembers,
	btnReset,
	actionCount,
	btnResetSearchAction,
	btnSaveUcd,
	amount,
	btnSendWarning,
	btnSendNotice,
	btnSearchTalk,
	btnResetSearchTalk,
	btnBackTalkList,
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
	btnDeleteTalk, rdoUpdateAttachType, btnSubmitUpdateTalk
	} from '../modules/elements.js';
	import { historyBack, limitInputLength, onChangeValidateImage, fadeoutModal, initSearchDatepicker, onChangeSearchDateTo,
		onChangeSearchDateFrom, onClickDateRangeBtn, initPageLength} from "../modules/common.js";
	import {initInputNumber, initInputNumberWithZero, isEmpty} from "../modules/utils.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";
	import {onClickChkIsApply, onClickChkIsQuestion, onClickAddKeyword, getCategoryList, onChangeSelCategory, initSearchDatepickerMaxDateToday} from "../modules/doit-common.js"
	import {getDetail, onClickBtnUpdateDoit, onSubmitUpdateDoit, showDoitListForm} from "./doit-detail-info.js";
	import {
		showCreateMissionForm,
		showMissionListForm,
		onClickBtnUpdateMission,
		onChangeActionType,
		onSubmitMission,
		onSubmitUpdateMission,
		deleteMission,
		onChangeMissionEndDate,
		onChangeMissionStartDate,
		onChangeUpdateMissionStartDate,
		onChangeUpdateMissionEndDate,
		onChangeUpdateActionType,
		buildMissionTable,
		onChangeCheckPermanent,
		onChangeUpdateCheckPermanent
	} from "./doit-detail-mission.js";
	import {
		showJoinMemberForm,
		showPendingMemberForm,
		initSearchMemberForm,
		onClickModalSaveUcdOpen,
		onClickModalSendNoticeOpen,
		onChangeSelMemberFilter,
		searchJoinMember, banMember, searchApplyMember
	} from "./doit-detail-member.js";
	import {initSearchActionForm, showActionListForm, getMissionListForAction, onClickModalWarnOpen,
		onSubmitSearchActions, onSubmitSendWarning, onSubmitActionComment} from "./doit-detail-action.js";
	import {
		buildTalkTable,
		onClickBtnCreateTalk,
		initSearchTalkForm,
		showTalkListForm,
		onClickBtnUpdateTalk,
		onChangeAttachType,
		onSubmitSearchTalk,
		onSubmitTalk, onSubmitTalkComment, onSubmitDeleteTalk, onChangeUpdateAttachType, onSubmitUpdateTalk
	} from "./doit-detail-talk.js";
	import {api} from "../modules/api-url.js";
	import {message} from "../modules/message.js";
	import {ajaxRequestWithJsonData, isSuccessResp} from "../modules/request.js";
	import {sweetToast, sweetConfirm, sweetToastAndCallback} from "../modules/alert.js";
	import {g_doit_uuid} from "./doit-detail-info.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initSearchDatepickerMaxDateToday();
		initSearchActionForm();
		initSearchTalkForm();
		getCategoryList();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		tabUl			.on('click', function (event) { onClickTab(event.target); });

		doitImage		.on('change', function () { onChangeValidateImage(this); });
		selCategory		.on('change', function () { onChangeSelCategory(); });
		btnAddKeyword	.on('click', function () { onClickAddKeyword(); });
		chkIsApply		.on('change', function () { onClickChkIsApply(this); });
		chkIsQuestion	.on('change', function () { onClickChkIsQuestion(this); });
		btnUpdateDoit	.on('click', function () { onClickBtnUpdateDoit() });
		btnBackDoitList	.on('click', function () { showDoitListForm() });
		btnSubmitUpdateDoit	.on('click', function () { onSubmitUpdateDoit(); });
		btnDoitOpen		.on('click', function () { onSubmitChangeDoitStatus(this); });
		btnDoitStop		.on('click', function () { onSubmitChangeDoitStatus(this); });
		btnDoitDelete	.on('click', function () { onSubmitChangeDoitStatus(this); });

		missionStartDate.on('change', function () { onChangeMissionStartDate(); });
		missionEndDate	.on('change', function () { onChangeMissionEndDate(); });
		chkPermanent.on('change', function () { onChangeCheckPermanent(this); });
		updateMissionStartDate	.on('change', function () { onChangeUpdateMissionStartDate(); });
		updateMissionEndDate	.on('change', function () { onChangeUpdateMissionEndDate(); });
		chkUpdatePermanent.on('change', function () { onChangeUpdateCheckPermanent(this); });
		rdoActionType	.on('change', function () { onChangeActionType(); });
		rdoUpdateActionType	.on('change', function () { onChangeUpdateActionType(); });
		btnCreateMission	.on('click', function () { showCreateMissionForm(); });
		btnBackMissionList.on('click', function () { showMissionListForm(); });
		btnUpdateMission.on('click', function () { onClickBtnUpdateMission(); });
		btnSubmitMission.on('click', function () { onSubmitMission() });
		btnSubmitUpdateMission.on('click', function () { onSubmitUpdateMission(); });
		btnDeleteMission.on('click', function () { deleteMission() });

		initPageLength(selJoinMemberPageLength);
		initPageLength(selApplyMemberPageLength);
		btnSearch.on('click', function () { searchJoinMember(); });
		btnReset.on('click', function () { initSearchMemberForm(); });
		selJoinMemberPageLength.on('change', function () { searchJoinMember(); });
		selSort.on('change', function () { searchJoinMember(); });
		btnSaveUcd.on('click', function () { onClickModalSaveUcdOpen(); });
		btnSendNotice.on('click', function () { onClickModalSendNoticeOpen(); });
		amount.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		actionCount.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		btnJoinMembers.on('click', function () { showJoinMemberForm(); });
		selMemberFilter.on('change', function () { onChangeSelMemberFilter(this); });
		btnBan.on('click', function () { banMember(); });
		btnPendingMembers.on('click', function () { showPendingMemberForm(); });
		selApplyMemberPageLength.on('change', function () { searchApplyMember() });

		initPageLength(selActionPageLength);
		btnSearchAction.on('click', function () { onSubmitSearchActions(); });
		btnResetSearchAction.on('click', function () { initSearchActionForm(); });
		selActionPageLength.on('change', function () { onSubmitSearchActions(); });
		btnBackActionList.on('click', function () { showActionListForm(); });
		searchActionDateFrom.on('change', function () { onChangeSearchDateFrom(); });
		searchActionDateTo.on('change', function () { onChangeSearchDateTo(); });
		btnSendWarning.on('click', function () { onClickModalWarnOpen(this); });
		btnSendWarnings.on('click', function () { onClickModalWarnOpen(this); });
		btnSubmitSendWarning.on('click', function () { onSubmitSendWarning(); });
		btnSubmitCommentAction.on('click', function () { onSubmitActionComment(); } );

		initPageLength(selTalkPageLength);
		rdoAttachType.on('change', function () { onChangeAttachType(); });
		rdoUpdateAttachType.on('change', function () { onChangeUpdateAttachType(); });
		searchTalkDateFrom.on('change', function () { onChangeSearchDateFrom(); });
		searchTalkDateTo.on('change', function () { onChangeSearchDateTo(); });
		btnSearchTalk.on('click', function () { onSubmitSearchTalk(); });
		selTalkPageLength.on('change', function () { onSubmitSearchTalk(); });
		btnResetSearchTalk	.on('click', function () { initSearchTalkForm(); });
		btnCreateTalk	.on('click', function () { onClickBtnCreateTalk(); });
		btnBackTalkList	.on('click', function () { showTalkListForm(); });
		btnUpdateTalk	.on('click', function () { onClickBtnUpdateTalk(); });
		btnSubmitTalk.on('click', function () { onSubmitTalk(); });
		btnSubmitCommentTalk.on('click', function () { onSubmitTalkComment(); });
		btnDeleteTalk.on('click', function () { onSubmitDeleteTalk(); });
		btnSubmitUpdateTalk.on('click', function () { onSubmitUpdateTalk(); });
	});

	function onClickTab(selectedTab)
	{
		const target = $(selectedTab).data('target')

		switch (target) {
			case '#tabDoitInfo' :
				showDoitListForm();
				getDetail();
				break;
			case '#tabDoitMission' :
				showMissionListForm();
				buildMissionTable();
				break;
			case '#tabDoitMember' :
				showJoinMemberForm();
				break;
			case '#tabDoitReview' :
				//getDetail();
				break;
			case '#tabDoitUcd' :
				//getDetail();
				break;
			case '#tabDoitAction' :
				showActionListForm();
				initSearchActionForm();
				getMissionListForAction();
				break;
			case '#tabDoitTalk' :
				showTalkListForm();
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

		sweetConfirm(confirmMessage, changeDoitStatusRequest);
	}

	function changeDoitStatusRequest()
	{
		const url = changeStatusUrl;
		const errMsg = message.ajaxError;
		const param = { "doit_uuid" : g_doit_uuid };
		if (!isEmpty(isStop))
			param.is_stop = isStop;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), doitStatusChangeCallback, errMsg, false);
	}

	function doitStatusChangeCallback(data)
	{
		sweetToastAndCallback(data, doitStatusChangeSuccess);
	}

	function doitStatusChangeSuccess()
	{
		onClickTab(tabUl.children().eq(0))
	}

	function goListPage()
	{
		location.href = page.listDoit;
	}


