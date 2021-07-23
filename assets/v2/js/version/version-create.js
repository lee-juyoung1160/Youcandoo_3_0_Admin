
	import {ajaxRequestWithJson} from '../modules/ajax-request.js'
	import { api } from '../modules/api-url-v1.js';
	import {btnSubmit, versionDigit, versionDecimal} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {initInputNumberWithZero, initInputNumber, isEmpty} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		/** 이벤트 **/
		versionDigit   	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		versionDecimal  .on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		btnSubmit		.on('click', function () { onSubmitVersion(); });
	});

	function onSubmitVersion()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const param = {
			"force_update" : $('input:radio[name=radio-type]:checked').val(),
			"store" : $('input:radio[name=radio-os-type]:checked').val(),
			"target_version" : `${versionDigit.val().trim()}.${versionDecimal.val().trim()}`,
		}

		ajaxRequestWithJson(true, api.createVersion, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
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
