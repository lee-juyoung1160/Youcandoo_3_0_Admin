
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
	joinMemberForm,
	pendingMemberForm,
	btnPendingMembers,
	btnJoinMembers,
	btnReset,
	actionCount,
	actionListForm,
	actionDetailForm, btnResetSearchAction,
} from '../modules/elements.js';
	import {
	historyBack,
	limitInputLength,
	onChangeValidateImage,
	fadeoutModal,
		initSearchDatepicker
	} from "../modules/common.js";
	import {initInputNumber, initInputNumberWithZero, isEmpty} from "../modules/utils.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";
	import {onClickChkIsApply, onClickChkIsQuestion, onClickAddKeyword, getCategoryList, onChangeSelCategory,} from "../modules/doit-common.js"
	import {
		getMissionList,
		onClickBtnCreateMission,
		onClickDetailMission,
		onClickBtnMissionList,
		onClickBtnUpdateMission,
		onSubmitMission, onSubmitUpdateMission, deleteMission
	} from "./doit-detail-mission.js";
	import {getDetail, onClickBtnUpdateDoit, onSubmitUpdateDoit, onClickBtnDoitList} from "./doit-detail-info.js";
	import {onClickBtnPendingMembers, onClickBtnJoinMembers, initSearchMemberForm} from "./doit-detail-member.js";
	import {initSearchActionForm, buildActions} from "./doit-detail-action.js";
	import {getTalkList, onClickBtnCreateTalk, onClickDetailTalk} from "./doit-detail-talk.js";
	import {api} from "../modules/api-url.js";
	import {message} from "../modules/message.js";
	import {ajaxRequestWithJsonData, isSuccessResp} from "../modules/request.js";
	import {sweetToast, sweetConfirm, sweetToastAndCallback} from "../modules/alert.js";
	import {g_doit_uuid} from "./doit-detail-info.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initSearchActionForm();
		//getCategoryList();
		/** 상세 불러오기 **/
		//getDetail();
		/** 이벤트 **/
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
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
		btnSubmitUpdateDoit	.on('click', function () { onSubmitUpdateDoit() });
		btnDoitOpen		.on('click', function () { onSubmitChangeDoitStatus(this) });
		btnDoitStop		.on('click', function () { onSubmitChangeDoitStatus(this) });
		btnDoitDelete	.on('click', function () { onSubmitChangeDoitStatus(this) });

		actionImage		.on('change', function () { onChangeValidateImage(this); });
		promiseImage	.on('change', function () { onChangeValidateImage(this); });
		updatePromiseImage	.on('change', function () { onChangeValidateImage(this); });
		btnCreateMission	.on('click', function () { onClickBtnCreateMission() });
		btnMissionList	.on('click', function () { onClickBtnMissionList(); });
		btnBackMissionList.on('click', function () { onClickBtnMissionList(); });
		btnUpdateMission.on('click', function () { onClickBtnUpdateMission() });
		btnSubmitMission.on('click', function () { onSubmitMission() });
		btnSubmitUpdateMission.on('click', function () { onSubmitUpdateMission() });
		btnDeleteMission.on('click', function () { deleteMission() });
		$("#test").on('click', function () {onClickDetailMission();})

		btnReset.on('click', function () { initSearchMemberForm(); });
		actionCount.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		btnPendingMembers.on('click', function () { onClickBtnPendingMembers(); });
		btnJoinMembers.on('click', function () { onClickBtnJoinMembers(); });

		btnResetSearchAction.on('click', function () { initSearchActionForm(); });

		$(".test-talk").on('click', function () {onClickDetailTalk();})
		btnCreateTalk	.on('click', function () { onClickBtnCreateTalk() });
		talkImage		.on('change', function () { onChangeValidateImage(this); });
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


