
	import {ajaxRequestWithJson,} from "../modules/ajax-request.js";
	import { api, } from '../modules/api-url.js';
	import {btnSubmit, title, dateFrom, dateTo,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {initMinDateToday, initInputDateRangeWeek, initSearchDatepicker, onChangeSearchDateFrom,
		onChangeSearchDateTo,} from "../modules/common.js";
	import {isEmpty,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		initSearchDatepicker();
		initInputDateRangeWeek();
		initMinDateToday();
		/** 이벤트 **/
		title.trigger('focus');
		dateFrom.on('change', function () { onChangeSearchDateFrom() });
		dateTo.on('change', function () { onChangeSearchDateTo() });
		btnSubmit.on('click', function () { onSubmitCustomEvent(); });
	});

	function onSubmitCustomEvent()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const param = {
			"title" : title.val().trim(),
			"from_date" : dateFrom.val(),
			"to_date" : dateTo.val(),
		}

		ajaxRequestWithJson(true, api.createCustomEvent, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function createSuccess()
	{
		location.href = page.listCustomEvent;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		return true;
	}
