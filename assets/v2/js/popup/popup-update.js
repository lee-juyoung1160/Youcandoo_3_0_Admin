
	import {ajaxRequestWithJson, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {
		popupTitle,
		link,
		rdoOsType,
		versionDigit,
		versionDecimal,
		rdoViewOption,
		dateFrom,
		dateTo,
		startTime,
		endTime,
		rdoExposure,
		lengthInput, datePicker, btnSubmit
	} from '../modules/elements.js';
	import {sweetConfirm, sweetToast, sweetToastAndCallback,} from '../modules/alert.js';
	import {calculateInputLength, initInputDatepickerMinDateToday, limitInputLength,} from "../modules/common.js";
	import {getPathName, initInputNumberWithZero, isDomainName, isEmpty, splitReverse,} from "../modules/utils.js";
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
		dateFrom		.on('change', function () { onChangeDateFrom(); });
		versionDigit   	.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); validDigit(this);});
		versionDecimal  .on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		btnSubmit	.on('click', function () { onSubmitUpdatePopup(); });
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

	function getDetail()
	{
		const param = { "idx" : popupIdx }

		ajaxRequestWithJson(true, api.detailPopup, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(label.detailContent + message.ajaxLoadError));
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
		let version = parseFloat(target_version);
		version = version.toString().length === 1 ? `${version}.0` : version.toString();
		versionDigit.val(version.split('.')[0]);
		versionDecimal.val(version.split('.')[1]);
		link.val(popup_url);
		rdoViewOption.each(function () {
			$(this).prop('checked', $(this).val() === close_type);
		})
		const splitStartDate = start_date.split(' ');
		dateFrom.val(splitStartDate[0]);
		const splitEndDate = end_date.split(' ');
		dateTo.val(splitEndDate[0]);
		datePicker.datepicker("option", "minDate", start_date);
		startTime.val(splitStartDate[1].substring(0, 5));
		endTime.val(splitEndDate[1].substring(0, 5));
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
			"target_version": `${versionDigit.val().trim()}.${versionDecimal.val().trim()}`,
			"popup_url": link.val().trim(),
			"close_type": $("input[name=radio-view-option]:checked").val(),
			"start_date": `${dateFrom.val()} ${startTime.val()}:00`,
			"end_date": `${dateTo.val()} ${endTime.val()}:59`,
			"is_exposure": $("input[name=radio-exposure]:checked").val()
		}

		ajaxRequestWithJson(true, api.updatePopup, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, updateSuccess);
			})
			.catch(reject => sweetToast(label.submit + message.ajaxError));

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
