
	import {
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
	btnSubmitUpdateDoit, btnCreateMission, btnMissionList, btnUpdateMission, missionUpdateForm,
} from '../modules/elements.js';
	import {historyBack, limitInputLength, onChangeValidateImage,} from "../modules/common.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";
	import {onClickChkIsApply, onClickChkIsQuestion, onClickAddKeyword, getCategoryList, onChangeSelCategory} from "../modules/doit-common.js"
	import {
		getMissionList,
		onClickBtnCreateMission,
		onClickBtnDetailMission,
		onClickBtnMissionList,
		onClickBtnUpdateMission
	} from "./doit-detail-mission.js";
	import {getDetail, onClickBtnUpdateDoit, onSubmitDoitOpen, onSubmitUpdateDoit} from "./doit-detail-info.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		getCategoryList();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		tabUl			.on('click', function (event) { onClickTab(event.target); });
		// lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		// modalOpen		.on("click", function () { onClickModalOpen(); });
		// modalClose		.on("click", function () { fadeoutModal(); });
		// modalBackdrop	.on("click", function () { fadeoutModal(); });
		doitImage		.on('change', function () { onChangeValidateImage(this); });
		selCategory		.on('change', function () { onChangeSelCategory(); });
		btnAddKeyword	.on('click', function () { onClickAddKeyword(); });
		chkIsApply		.on('change', function () { onClickChkIsApply(this); });
		chkIsQuestion	.on('change', function () { onClickChkIsQuestion(this); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		btnUpdateDoit	.on('click', function () { onClickBtnUpdateDoit() });
		btnSubmitUpdateDoit	.on('click', function () { onSubmitUpdateDoit() });
		btnDoitOpen		.on('click', function () { onSubmitDoitOpen() });
		btnDoitStop		.on('click', function () { onSubmitUpdateDoit() });
		btnDoitDelete	.on('click', function () { onSubmitUpdateDoit() });
		btnCreateMission	.on('click', function () { onClickBtnCreateMission() });
		btnMissionList	.on('click', function () { onClickBtnMissionList(); });
		btnUpdateMission.on('click', function () { onClickBtnUpdateMission() });
		$("#test").on('click', function () {onClickBtnDetailMission();})
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
				getDetail();
				break;
		}

		$(selectedTab).siblings().removeClass('active');
		$(selectedTab).addClass('active');
		tabContents.hide();
		$(target).show();
	}

	function goListPage()
	{
		location.href = page.listDoit;
	}


