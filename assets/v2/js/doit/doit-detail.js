
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
	tabUl,
	tabContents,
	doitTitle,
	sponsor,
	category,
	doitDesc,
	doitKeywords,
	doitImage,
	btnBack,
	btnList,
	btnUpdate,
	btnSubmit,
	modalOpen,
	modalClose,
	modalBackdrop,
	dataTable,
	lengthInput,
	publicType,
	isApply,
	doitQuestion,
	isAnswer,
	btnDoitOpen,
	btnDoitStop,
	btnDoitDelete,
	doitUpdateForm, doitInfoForm,
} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack, limitInputLength, onErrorImage} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import { initTableDefaultConfig } from "../modules/tables.js";

	const pathName		= getPathName();
	const categoryIdx	= splitReverse(pathName, '/');

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		tabUl			.on('click', function (event) { onClickTab(event); });
		// lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		// modalOpen		.on("click", function () { onClickModalOpen(); });
		// modalClose		.on("click", function () { fadeoutModal(); });
		// modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		btnUpdate		.on('click', function () { onClickBtnUpdate() });
		btnSubmit		.on('click', function () {  });
	});

	function onClickTab(e)
	{
		const selectedTab = $(e.target);
		const target = $(selectedTab).data('target')

		switch (target) {
			case '#tabDoitInfo' :
				getDetail();
				doitUpdateForm.hide();
				doitInfoForm.show();
				break;
			case '#tabDoitMission' :
				getDetail();
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

		selectedTab.siblings().removeClass('active');
		selectedTab.addClass('active');
		tabContents.hide();
		$(target).show();
	}

	function onClickModalOpen()
	{
		fadeinModal();
		subCategoryTitle.trigger('focus');
		subCategoryTitle.val('');
	}

	function getDetail()
	{
		const url = api.detailDoit;
		const errMsg = label.detailContent + message.ajaxLoadError;
		const param = { "idx" : categoryIdx };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let isSponsorDoit;
	function buildDetail(data)
	{
		let { doit_uuid, doit_status, doit_type, doit_title, doit_description, nickname, category_title, subcategory_title, doit_keyword,
			public_type, is_apply, question, is_answer, doit_image } = data.data;

		isSponsorDoit = doit_type === 'sponsor';

		toggleButtons(doit_status);
		doitTitle.text(doit_title);
		sponsor.text( isSponsorDoit ? nickname : label.generalDoit );
		category.html(`${category_title} - <span>${subcategory_title}</span>`);
		doitDesc.text(doit_description);
		doitKeywords.empty();
		doit_keyword.map(keyword => {
			doitKeywords.append(`<li>#<span>${keyword}</span>`);
		})
		publicType.text(getNameFromPublicType(public_type));
		isApply.text(is_apply);
		doitQuestion.text(isEmpty(question) ? label.dash : question);
		isAnswer.text(is_answer);
		doitImage.attr('src', doit_image);
		onErrorImage();
	}

	function toggleButtons(status)
	{
		switch (status) {
			case 'create' :
				btnDoitOpen.show();
				btnDoitDelete.show();
				btnDoitStop.hide();
				btnUpdate.show();
				break;
			case 'open' :
				btnDoitOpen.hide();
				btnDoitDelete.show();
				btnDoitStop.show();
				btnDoitStop.text('운영정');
				btnUpdate.show();
				break;
			case 'stop' :
				btnDoitOpen.hide();
				btnDoitDelete.show();
				btnDoitStop.show();
				btnDoitStop.text('정지해제');
				btnUpdate.show();
				break;
			case 'delete' :
				btnDoitOpen.show();
				btnDoitDelete.show();
				btnDoitStop.hide();
				btnUpdate.show();
				break;
		}

		if (!isSponsorDoit)
		{
			btnDoitOpen.hide();
			btnDoitDelete.hide();
			btnUpdate.hide();
		}
	}

	function getNameFromPublicType(type)
	{
		switch (type) {
			case 'public' : return '전체공개';
			case 'member' : return '멤버에게만 게시글 공개';
			case 'private' : return '비공개';
		}
	}

	function onClickBtnUpdate()
	{
		doitInfoForm.hide();
		doitUpdateForm.show();
	}

	function goListPage()
	{
		location.href = page.listDoit;
	}


