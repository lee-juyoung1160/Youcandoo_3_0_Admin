
	import {ajaxRequestWithJsonData,} from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnSubmit, versionDigit, versionDecimal} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {initInputNumberWithZero, initInputNumber, isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		/** 이벤트 **/
		versionDigit   	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		versionDecimal  .on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		//btnSubmit		.on('click', function () { onSubmitVersion(); });
	});

	function onSubmitVersion()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const url = api.createVersion;
		const errMsg = label.submit+message.ajaxError;
		const param = {
			"force_update" : $('input:radio[name=radio-type]:checked').val(),
			"store" : $('input:radio[name=radio-os-type]:checked').val(),
			"target_version" : `${versionDigit.val().trim()}.${versionDecimal.val().trim()}`,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listVersion;
	}

	function validation()
	{
		if (isEmpty(versionDigit.val()))
		{
			sweetToast(`버전은 ${message.required}`);
			versionDigit.trigger('focus');
			return false;
		}

		if (isEmpty(versionDecimal.val()))
		{
			sweetToast(`버전은 ${message.required}`);
			versionDecimal.trigger('focus');
			return false;
		}

		return true;
	}

