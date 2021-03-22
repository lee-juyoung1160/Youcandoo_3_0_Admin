
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
	doitUpdateForm,
	doitInfoForm,
	chkIsApply,
	chkIsQuestion,
	btnAddKeyword,
	selCategory,
	doitImage,
	missionCreateForm,
	missionDetailForm,
	missionListForm,
	btnUpdateDoit,
	btnSubmitUpdateDoit,
	btnCreateMission,
	btnMissionList,
	btnBackMissionList,
	btnDeleteMission,
	btnUpdateMission,
	missionUpdateForm,
	btnSubmitUpdateMission,
	actionImage,
	promiseImage,
	btnSubmitMission,
	updatePromiseImage,
	talkListForm,
	talkDetailForm,
	talkUpdateForm,
	btnCreateTalk,
	talkImage,
	selMemberFilter,
	joinMemberForm,
	pendingMemberForm,
	btnPendingMembers,
	btnJoinMembers,
	btnReset,
	actionCount,
	actionListForm,
	actionDetailForm,
	btnResetSearchAction,
	btnSaveUcd,
	amount,
	btnSendWarning,
	btnSendNotice,
	btnSearchTalk,
	btnResetSearchTalk,
	btnBackTalkList,
	btnUpdateTalk,
	replyActionImage,
	replyTalkImage,
	commentActionImage,
	commentTalkImage,
	updateTalkImage,
	searchActionDateFrom,
	searchActionDateTo,
	searchTalkDateFrom,
	searchTalkDateTo, dateButtons, missionStartDate, missionEndDate
	} from '../modules/elements.js';
	import {
	historyBack,
	limitInputLength,
	onChangeValidateImage,
	fadeoutModal,
	initSearchDatepicker,
	initMaxDateToday, onChangeSearchDateTo, onChangeSearchDateFrom, onClickDateRangeBtn
} from "../modules/common.js";
	import {initInputNumber, initInputNumberWithZero, isEmpty} from "../modules/utils.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";
	import {onClickChkIsApply, onClickChkIsQuestion, onClickAddKeyword, getCategoryList, onChangeSelCategory, initSearchDatepickerMaxDateToday} from "../modules/doit-common.js"
	import {
	getMissionList,
	onClickBtnCreateMission,
	onClickDetailMission,
	onClickBtnMissionList,
	onClickBtnUpdateMission,
	onSubmitMission, onSubmitUpdateMission, deleteMission, onChangeMissionEndDate, onChangeMissionStartDate
} from "./doit-detail-mission.js";
	import {getDetail, onClickBtnUpdateDoit, onSubmitUpdateDoit, onClickBtnDoitList} from "./doit-detail-info.js";
	import {
	onClickBtnPendingMembers,
	onClickBtnJoinMembers,
	initSearchMemberForm,
	onClickModalSaveUcdOpen,
	onClickModalSendNoticeOpen,
		onClickModalMemberDetailOpen,
		onChangeSelMemberFilter
	} from "./doit-detail-member.js";
	import {initSearchActionForm, buildActions, onClickModalWarnOpen, onClickModalReplyActionOpen} from "./doit-detail-action.js";
	import {
	getTalkList,
	onClickBtnCreateTalk,
	onClickDetailTalk,
	initSearchTalkForm,
	onClickBtnTalkList,
	onClickBtnUpdateTalk, onClickModalReplyTalkOpen
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
		//getCategoryList();
		/** 상세 불러오기 **/
		//getDetail();
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
		btnBackDoitList	.on('click', function () { onClickBtnDoitList() });
		btnSubmitUpdateDoit	.on('click', function () { onSubmitUpdateDoit(); });
		btnDoitOpen		.on('click', function () { onSubmitChangeDoitStatus(this); });
		btnDoitStop		.on('click', function () { onSubmitChangeDoitStatus(this); });
		btnDoitDelete	.on('click', function () { onSubmitChangeDoitStatus(this); });

		missionStartDate.on('change', function () { onChangeMissionStartDate(); });
		missionEndDate	.on('change', function () { onChangeMissionEndDate(); });
		actionImage		.on('change', function () { onChangeValidateImage(this); });
		promiseImage	.on('change', function () { onChangeValidateImage(this); });
		updatePromiseImage	.on('change', function () { onChangeValidateImage(this); });
		btnCreateMission	.on('click', function () { onClickBtnCreateMission(); });
		btnMissionList	.on('click', function () { onClickBtnMissionList(); });
		btnBackMissionList.on('click', function () { onClickBtnMissionList(); });
		btnUpdateMission.on('click', function () { onClickBtnUpdateMission(); });
		btnSubmitMission.on('click', function () { onSubmitMission() });
		btnSubmitUpdateMission.on('click', function () { onSubmitUpdateMission(); });
		btnDeleteMission.on('click', function () { deleteMission() });
		$("#test").on('click', function () {onClickDetailMission();})

		$("#testMemberDetail").on('click', function () {onClickModalMemberDetailOpen();})
		btnSaveUcd.on('click', function () { onClickModalSaveUcdOpen(); });
		btnSendNotice.on('click', function () { onClickModalSendNoticeOpen(); });
		amount.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		btnReset.on('click', function () { initSearchMemberForm(); });
		actionCount.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		btnPendingMembers.on('click', function () { onClickBtnPendingMembers(); });
		btnJoinMembers.on('click', function () { onClickBtnJoinMembers(); });
		selMemberFilter.on('change', function () { onChangeSelMemberFilter(this); });

		searchActionDateFrom.on('change', function () { onChangeSearchDateFrom(); });
		searchActionDateTo.on('change', function () { onChangeSearchDateTo(); });
		btnResetSearchAction.on('click', function () { initSearchActionForm(); });
		btnSendWarning.on('click', function () { onClickModalWarnOpen(); });
		commentActionImage.on('change', function () { onChangeValidateImage(this); });
		replyActionImage.on('change', function () { onChangeValidateImage(this); });
		$('#testReplyAction').on('click', function () { onClickModalReplyActionOpen(); });

		$(".test-talk").on('click', function () {onClickDetailTalk();})
		$("#testReplyTalk").on('click', function () {onClickModalReplyTalkOpen();})
		searchTalkDateFrom.on('change', function () { onChangeSearchDateFrom(); });
		searchTalkDateTo.on('change', function () { onChangeSearchDateTo(); });
		btnResetSearchTalk	.on('click', function () { initSearchTalkForm(); });
		talkImage		.on('change', function () { onChangeValidateImage(this); });
		updateTalkImage	.on('change', function () { onChangeValidateImage(this); });
		commentTalkImage.on('change', function () { onChangeValidateImage(this); });
		replyTalkImage	.on('change', function () { onChangeValidateImage(this); });
		btnCreateTalk	.on('click', function () { onClickBtnCreateTalk(); });
		btnBackTalkList	.on('click', function () { onClickBtnTalkList(); });
		btnUpdateTalk	.on('click', function () { onClickBtnUpdateTalk(); });
	});

	function onClickTab(selectedTab)
	{
		const target = $(selectedTab).data('target')

		switch (target) {
			case '#tabDoitInfo' :
				doitUpdateForm.hide();
				doitInfoForm.show();
				//getDetail();
				break;
			case '#tabDoitMission' :
				missionCreateForm.hide();
				missionUpdateForm.hide();
				missionDetailForm.hide();
				missionListForm.show();
				getMissionList();
				break;
			case '#tabDoitMember' :
				pendingMemberForm.hide();
				joinMemberForm.show();
				//getDetail();
				break;
			case '#tabDoitReview' :
				//getDetail();
				break;
			case '#tabDoitUcd' :
				//getDetail();
				break;
			case '#tabDoitAction' :
				actionListForm.show();
				actionDetailForm.hide();
				buildActions();
				//getDetail();
				break;
			case '#tabDoitTalk' :
				talkListForm.show();
				talkDetailForm.hide();
				talkUpdateForm.hide();
				getTalkList();
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


