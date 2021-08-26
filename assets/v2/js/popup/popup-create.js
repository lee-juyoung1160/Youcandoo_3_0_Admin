
	import {ajaxRequestWithJson} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url-v1.js';
	import {lengthInput, btnSubmit, title, version, dateFrom, dateTo, startTime, endTime, link} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {initInputDatepickerMinDateToday, setDateToday, limitInputLength,} from "../modules/common.js";
	import {isEmpty, initInputNumber, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		title.trigger('focus');
		initInputDatepickerMinDateToday();
		setDateToday();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		dateFrom	.on('change', function () { onChangeDateFrom(); });
		version  	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		btnSubmit	.on('click', function () { onSubmitPopup(); });
	});

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
			"start_date": `${dateFrom.val()} ${startTime.val()}:00`,
			"end_date": `${dateTo.val()} ${endTime.val()}:59`,
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
