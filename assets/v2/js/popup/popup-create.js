
	import {ajaxRequestWithJson} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {
		lengthInput,
		btnSubmit,
		title,
		version,
		dateFrom,
		dateTo,
		link,
		selStartHour, selStartMinute, selEndHour, selEndMinute
	} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {
		initInputDatepickerMinDateToday,
		setDateToday,
		limitInputLength,
		initSelHour,
		initSelMinute,
	} from "../modules/common.js";
	import {isEmpty, initInputNumber, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		initInputDatepickerMinDateToday();
		setDateToday();
		initSelHour(selStartHour);
		initSelMinute(selStartMinute);
		initSelHour(selEndHour);
		initSelMinute(selEndMinute);
		initTimes();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		dateFrom	.on('change', function () { onChangeDateFrom(); });
		version  	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		btnSubmit	.on('click', function () { onSubmitPopup(); });
	});

	function initTimes()
	{
		selStartHour.val('00');
		selStartMinute.val('00');
		selEndHour.val('23');
		selEndMinute.val('59');
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
		const param = {
			"store": $("input[name=radio-os-type]:checked").val(),
			"title": title.val().trim(),
			"target_version": version.val().trim(),
			"popup_url": link.val().trim(),
			"close_type": $("input[name=radio-view-option]:checked").val(),
			"start_date": `${dateFrom.val()} ${selStartHour.val()}:${selStartMinute.val()}:00`,
			"end_date": `${dateTo.val()} ${selEndHour.val()}:${selEndMinute.val()}:59`,
			"is_exposure": $("input[name=radio-exposure]:checked").val()
		}

		ajaxRequestWithJson(true, api.createPopup, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
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

		if (version.val().length < 3)
		{
			sweetToast(`버전은 세 자리로 ${message.input}`);
			version.trigger('focus');
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

		const currentDatetime = new Date().getTime();
		const startDatetime = new Date(`${dateFrom.val()} ${selStartHour.val()}:${selStartMinute.val()}:00`).getTime();
		const endDatetime = new Date(`${dateTo.val()} ${selEndHour.val()}:${selEndMinute.val()}:00`).getTime();
		if (startDatetime > endDatetime)
		{
			sweetToast(`노출 ${message.compareActionTime}`);
			selStartHour.trigger('focus');
			return false;
		}

		if (currentDatetime > endDatetime)
		{
			sweetToast(`노출 종료 시간은 ${message.compareCurrentTime}`);
			selEndHour.trigger('focus');
			return false;
		}

		return true;
	}
