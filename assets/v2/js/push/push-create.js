
	import { ajaxRequestWithJsonData} from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
	lengthInput,
	btnSubmit,
	title,
	content,
	selFaqType,
	modalClose,
	modalBackdrop,
	btnModalTargetMemberOpen,
	modalTargetMember,
	reserveDate,
	targetPage,
	modalTargetPage,
	rdoReserveType,
	rdoTargetMemberType, rdoTargetPageType, reserveTime
} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {
	fadeoutModal,
		initInputDatepickerMinDateToday,
	limitInputLength,
	overflowHidden,
		setDateToday
	} from "../modules/common.js";
	import {isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		initInputDatepickerMinDateToday();
		setDateToday();
		/** 이벤트 **/
		//lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnModalTargetMemberOpen.on("click", function () { onClickModalTargetMemberOpen(); });
		targetPage		.on("click", function () { onClickModalTargetPageOpen(); });
		rdoReserveType	.on('change', function () { onChangeRdoDateType(this); });
		rdoTargetPageType.on('change', function () { onChangeRdoTargetPageType(this); });
		rdoTargetMemberType.on('change', function () { onChangeRdoTargetMemberType(this); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmit		.on('click', function () { onSubmitPush(); });
	});

	function onClickModalTargetMemberOpen()
	{
		modalTargetMember.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();

	}

	function onClickModalTargetPageOpen()
	{
		modalTargetPage.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();

	}

	function onChangeRdoDateType(obj)
	{
		$(obj).val() === 'reserve' ? $(obj).parent().siblings().show() : $(obj).parent().siblings().hide();
	}

	function onChangeRdoTargetPageType(obj)
	{
		//g_page_uuid = '';
		targetPage.val('');

		const targetValue = $(obj).val();
		(['event', 'doit'].indexOf(targetValue) !== -1) ? $(obj).parent().siblings().show() : $(obj).parent().siblings().hide();
	}

	function onChangeRdoTargetMemberType(obj)
	{
		$(obj).val() === 'all' ? $(obj).parent().siblings().hide() : $(obj).parent().siblings().show();
	}

	function onSubmitPush()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const url 	= api.createPush;
		const errMsg 	= label.submit+message.ajaxError;
		const param = {
			"faq_type" : selFaqType.val(),
			"faq_title" : title.val().trim(),
			"faq_contents" : content.val().trim(),
			"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),

		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listPush;
	}

	function validation()
	{
		const reserveType = $("input[name=radio-reserve-type]:checked").val();
		if (reserveType === 'reserve' && isEmpty(reserveTime.val()))
		{
			sweetToast(`발송 시간은 ${message.required}`);
			reserveTime.trigger('focus');
			return false;
		}

		const targetMemberType = $("input[name=radio-target-member-type]:checked").val();
		if (targetMemberType === 'individual' && selectedUsers.length === 0)
		{
			sweetToast(`발송 대상은 ${message.required}`);
			return false;
		}

		const targetPageType = $("input[name=radio-target-page-type]:checked").val();
		if (['event', 'notice'].indexOf(targetPageType) !== -1 && isEmpty(targetPage.val()))
		{
			sweetToast(`발송 구분은 ${message.required}`);
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			content.trigger('focus');
			return false;
		}

		return true;
	}

