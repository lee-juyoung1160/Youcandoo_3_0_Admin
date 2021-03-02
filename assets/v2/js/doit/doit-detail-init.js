
	import { modalClose, modalBackdrop,
	tabUl,
	tabContents,
	btnBack,
	btnList,
	lengthInput,
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
	btnUpdateMission,
	missionUpdateForm,
	talkListForm,
	talkDetailForm, talkUpdateForm, btnCreateTalk, talkImage
} from '../modules/elements.js';
	import {historyBack, limitInputLength, onChangeValidateImage, fadeoutModal} from "../modules/common.js";
	import {isEmpty} from "../modules/utils.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";
	import {onClickChkIsApply, onClickChkIsQuestion, onClickAddKeyword, getCategoryList, onChangeSelCategory} from "../modules/doit-common.js"
	import {
		getMissionList,
		onClickBtnCreateMission,
		onClickDetailMission,
		onClickBtnMissionList,
		onClickBtnUpdateMission
	} from "./doit-detail-mission.js";
	import {getDetail, onClickBtnUpdateDoit, onSubmitUpdateDoit} from "./doit-detail-info.js";
	import {getTalkList, onClickBtnCreateTalk, onClickDetailTalk} from "./doit-detail-talk.js";
	import {api} from "../modules/api-url.js";
	import {message} from "../modules/message.js";
	import {ajaxRequestWithJsonData, isSuccessResp} from "../modules/request.js";
	import {sweetToast, sweetConfirm, sweetToastAndCallback} from "../modules/alert.js";
	import {g_doit_uuid} from "./doit-detail-info.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		getCategoryList();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		tabUl			.on('click', function (event) { onClickTab(event.target); });
		doitImage		.on('change', function () { onChangeValidateImage(this); });
		selCategory		.on('change', function () { onChangeSelCategory(); });
		btnAddKeyword	.on('click', function () { onClickAddKeyword(); });
		chkIsApply		.on('change', function () { onClickChkIsApply(this); });
		chkIsQuestion	.on('change', function () { onClickChkIsQuestion(this); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		btnUpdateDoit	.on('click', function () { onClickBtnUpdateDoit() });
		btnSubmitUpdateDoit	.on('click', function () { onSubmitUpdateDoit() });
		btnDoitOpen		.on('click', function () { onSubmitChangeDoitStatus(this) });
		btnDoitStop		.on('click', function () { onSubmitChangeDoitStatus(this) });
		btnDoitDelete	.on('click', function () { onSubmitChangeDoitStatus(this) });
		btnCreateMission	.on('click', function () { onClickBtnCreateMission() });
		btnMissionList	.on('click', function () { onClickBtnMissionList(); });
		btnUpdateMission.on('click', function () { onClickBtnUpdateMission() });
		$("#test").on('click', function () {onClickDetailMission();})
		$(".test-talk").on('click', function () {onClickDetailTalk();})
		btnCreateTalk	.on('click', function () { onClickBtnCreateTalk() });
		talkImage		.on('change', function () { onChangeValidateImage(this); });
	});

	function onClickTab(selectedTab)
	{
		const target = $(selectedTab).data('target')

		switch (target) {
			case '#tabDoitInfo' :
				getDetail();
				doitUpdateForm.hide();
				doitInfoForm.show();
				break;
			case '#tabDoitMission' :
				missionCreateForm.hide();
				missionUpdateForm.hide();
				missionDetailForm.hide();
				missionListForm.show();
				getMissionList();
				break;
			case '#tabDoitMember' :
				getDetail();
				break;
			case '#tabDoitReview' :
				getDetail();
				break;
			case '#tabDoitUcd' :
				getDetail();
				break;
			case '#tabDoitAction' :
				getDetail();
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

