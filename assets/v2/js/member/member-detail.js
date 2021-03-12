
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
	btnBack,
	btnList,
	btnModalUcd,
	modalUcd,
	amount,
	content,
	memo,
	modalClose,
	modalBackdrop,
		lengthInput
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {fadeoutModal, historyBack, limitInputLength, overflowHidden} from "../modules/common.js";
	import {isEmpty, initInputNumber} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		moveSection();
		/** 상세 불러오기 **/
		//getMemberInfo();
		/** 이벤트 **/
		amount 			.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnModalUcd		.on('click', function () { onClickBtnModalUcd(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
	});

	function moveSection()
	{
		$('[data-moveto]').on('click', function (event) {
			const targetSection = $(this).data('moveto');
			const $offsetTop = $('#' + targetSection).offset().top;

			$('html, body').stop().animate({
				scrollTop: $offsetTop -180
			}, 300);

			event.preventDefault();
			event.stopPropagation();
		});
	}

	function onClickBtnModalUcd()
	{
		modalUcd.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		initModalUcd();
	}

	function initModalUcd()
	{
		amount.trigger('focus');
		amount.val('');
		content.val('');
		memo.val('');
	}

	function getMemberInfo()
	{
		const url = api.detailMember;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : memberIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_profile_uuid;
	function buildDetail(data)
	{
		const { profile_uuid, is_exposure } = data.data;

		g_profile_uuid = profile_uuid;

		calculateInputLength();
	}

	function goListPage()
	{
		location.href = page.listMember;
	}


