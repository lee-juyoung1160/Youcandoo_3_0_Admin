
	import {ajaxRequestWithJson} from '../modules/ajax-request.js'
	import { api } from '../modules/api-url.js';
	import {btnSubmit, version,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import { initInputNumber } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		/** 이벤트 **/
		version   	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		btnSubmit	.on('click', function () { onSubmitVersion(); });
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
			"target_version" : version.val().trim(),
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
		if (version.val().length < 3)
		{
			sweetToast(`버전은 세 자리로 ${message.input}`);
			version.trigger('focus');
			return false;
		}

		return true;
	}
