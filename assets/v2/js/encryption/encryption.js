
	import {ajaxRequestWithJson, isSuccessResp} from '../modules/ajax-request.js'
	import { api } from '../modules/api-url.js';
	import {inputString, btnEncryption, btnDecryption, resultString} from '../modules/elements.js';
	import { sweetToast, sweetError } from  '../modules/alert.js';
	import {isEmpty} from "../modules/utils.js";
	import { message } from "../modules/message.js";

	$( () => {
		inputString.trigger('focus');
		/** 이벤트 **/
		inputString.on('propertychange change keyup paste input', function () { initInputString(); });
		btnEncryption.on('click', function () { onSubmitEncryption(); });
		btnDecryption.on('click', function () { onSubmitDecryption(); });
	});

	function initInputString()
	{
		resultString.text('');
	}

	function onSubmitEncryption()
	{
		if (encryptValidation())
			encryptionRequest();
	}

	function encryptionRequest()
	{
		const param = inputString.val().trim();

		ajaxRequestWithJson(true, api.createEncryption, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? encryptionReqCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`암호화 ${message.ajaxError}`));
	}

	function encryptionReqCallback(data)
	{
		if (isSuccessResp(data))
			requestSuccess(data);
		else
		{
			initInputString();
			sweetToast(data.msg);
		}
	}

	function onSubmitDecryption()
	{
		if (decryptValidation())
			decryptionRequest();
	}

	function decryptionRequest()
	{
		const param = inputString.val().trim();

		ajaxRequestWithJson(true, api.createDecryption, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? decryptionReqCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`복호화${message.ajaxError}`));
	}

	function decryptionReqCallback(data)
	{
		if (isSuccessResp(data))
			requestSuccess(data)
		else
		{
			initInputString();
			sweetToast(data.msg);
		}
	}

	function requestSuccess(data)
	{
		const resultData = data.data;
		const resultStr = (typeof resultData === 'object') ? JSON.stringify(resultData) : resultData;

		resultString.text(resultStr);
	}

	function encryptValidation()
	{
		if (isEmpty(inputString.val()))
		{
			sweetToast(`문자를 ${message.input}`);
			inputString.trigger('focus');
			return false;
		}

		if (!IsJsonString(inputString.val().trim()))
		{
			sweetToast(`json 형식으로 ${message.input}`);
			inputString.trigger('focus');
			return false;
		}

		return true;
	}

	function decryptValidation()
	{
		if (isEmpty(inputString.val()))
		{
			sweetToast(`문자를 ${message.input}`);
			inputString.trigger('focus');
			return false;
		}

		return true;
	}

	function IsJsonString(str)
	{
		try {
			const json = JSON.parse(str);
			return (typeof json === 'object');
		} catch (e) {
			return false;
		}
	}
