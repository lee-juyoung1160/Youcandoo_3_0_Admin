
	import { ajaxRequestWithJsonData} from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {lengthInput, btnSubmit, title, versionDigit, versionDecimal, dateFrom, dateTo, startTime, endTime, link} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {initInputDatepickerMinDateToday, setDateToday, limitInputLength,} from "../modules/common.js";
	import {isEmpty, initInputNumberWithZero, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		initInputDatepickerMinDateToday();
		setDateToday();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		dateFrom		.on('change', function () { onChangeDateFrom(); });
		versionDigit   	.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); validDigit(this);});
		versionDecimal  .on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		btnSubmit		.on('click', function () { onSubmitPopup(); });
	});

	function validDigit(obj)
	{
		let inputValue = $(obj).val();
		let inputValueArr = inputValue.split("");
		if (Number(inputValueArr[0]) === 0)
			$(obj).val(0);
	}

	function onChangeDateFrom()
	{
		dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
	}

	function onSubmitPopup()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const url 	= api.createPopup;
		const errMsg = label.submit+message.ajaxError;
		const param = {
			"store": $("input[name=radio-os-type]:checked").val(),
			"title": title.val().trim(),
			"target_version": `${versionDigit.val().trim()}.${versionDecimal.val().trim()}`,
			"popup_url": link.val().trim(),
			"close_type": $("input[name=radio-view-option]:checked").val(),
			"start_date": `${dateFrom.val()} ${startTime.val()}:00`,
			"end_date": `${dateTo.val()} ${endTime.val()}:59`,
			"is_exposure": $("input[name=radio-exposure]:checked").val()
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listPopup;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(versionDigit.val()))
		{
			sweetToast(`앱 버전은 ${message.required}`);
			versionDigit.trigger('focus');
			return false;
		}

		if (isEmpty(versionDecimal.val()))
		{
			sweetToast(`앱 버전은 ${message.required}`);
			versionDecimal.trigger('focus');
			return false;
		}

		if (isEmpty(link.val()))
		{
			sweetToast(`링크는 ${message.required}`);
			link.trigger('focus');
			return false;
		}

		if (!isDomainName(link.val().trim()))
		{
			sweetToast(`링크 형식을 ${message.doubleChk}`);
			link.trigger('focus');
			return false;
		}

		if (isEmpty(startTime.val()))
		{
			sweetToast(`노출시간(시작)은 ${message.required}`);
			startTime.trigger('focus');
			return false;
		}

		if (isEmpty(endTime.val()))
		{
			sweetToast(`노출시간(종료)은 ${message.required}`);
			endTime.trigger('focus');
			return false;
		}

		return true;
	}

