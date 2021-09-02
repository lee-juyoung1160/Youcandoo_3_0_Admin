
	import {ajaxRequestWithJson, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {
		popupTitle,
		link,
		rdoOsType,
		rdoViewOption,
		dateFrom,
		dateTo,
		rdoExposure,
		lengthInput, datePicker, btnSubmit, version, selStartHour, selStartMinute, selEndHour, selEndMinute
	} from '../modules/elements.js';
	import {sweetConfirm, sweetToast, sweetToastAndCallback, sweetError} from '../modules/alert.js';
	import {
		calculateInputLength,
		initInputDatepickerMinDateToday,
		initSelHour, initSelMinute,
		limitInputLength,
	} from "../modules/common.js";
	import {getPathName, initInputNumber, isDomainName, isEmpty, splitReverse,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const popupIdx	= splitReverse(pathName, '/');

	$( () => {
		initInputDatepickerMinDateToday();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		dateFrom	.on('change', function () { onChangeDateFrom(); });
		version  	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		btnSubmit	.on('click', function () { onSubmitUpdatePopup(); });
	});

	function onChangeDateFrom()
	{
		dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
	}

	function getDetail()
	{
		const param = { "idx" : popupIdx }

		ajaxRequestWithJson(true, api.detailPopup, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					await initSelHour(selStartHour);
					await initSelMinute(selStartMinute);
					await initSelHour(selEndHour);
					await initSelMinute(selEndMinute);
					buildDetail(data);
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_popup_uuid;
	function buildDetail(data)
	{
		const { popup_uuid, store, title, target_version, popup_url, close_type, start_date, end_date, is_exposure } = data.data;

		g_popup_uuid = popup_uuid;
		rdoOsType.each(function () {
			$(this).prop('checked', $(this).val() === store);
		})
		popupTitle.val(title);
		version.val(target_version);
		link.val(popup_url);
		rdoViewOption.each(function () {
			$(this).prop('checked', $(this).val() === close_type);
		})
		const splitStartDate = start_date.split(' ');
		dateFrom.val(splitStartDate[0]);
		const splitEndDate = end_date.split(' ');
		dateTo.val(splitEndDate[0]);
		datePicker.datepicker("option", "minDate", start_date);
		selStartHour.val(splitStartDate[1].slice(0, 2));
		selStartMinute.val(splitStartDate[1].slice(3, 5));
		selEndHour.val(splitEndDate[1].slice(0, 2));
		selEndMinute.val(splitEndDate[1].slice(3, 5));
		rdoExposure.each(function () {
			$(this).prop('checked', $(this).val() === is_exposure);
		})

		calculateInputLength();
	}

	function onSubmitUpdatePopup()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		const param = {
			"popup_uuid" : g_popup_uuid,
			"store": $("input[name=radio-os-type]:checked").val(),
			"title": popupTitle.val().trim(),
			"target_version": version.val().trim(),
			"popup_url": link.val().trim(),
			"close_type": $("input[name=radio-view-option]:checked").val(),
			"start_date": `${dateFrom.val()} ${selStartHour.val()}:${selStartMinute.val()}:00`,
			"end_date": `${dateTo.val()} ${selEndHour.val()}:${selEndMinute.val()}:59`,
			"is_exposure": $("input[name=radio-exposure]:checked").val()
		}

		ajaxRequestWithJson(true, api.updatePopup, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, updateSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));

	}

	function updateSuccess()
	{
		location.href = page.detailPopup + popupIdx;
	}

	function validation()
	{
		if (isEmpty(popupTitle.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			popupTitle.trigger('focus');
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
		if (currentDatetime > endDatetime)
		{
			sweetToast(`종료시간은 ${message.compareCurrentTime}`);
			selEndHour.trigger('focus');
			return false;
		}

		if (startDatetime > endDatetime)
		{
			sweetToast(message.compareActionTime);
			selStartHour.trigger('focus');
			return false;
		}

		return true;
	}
