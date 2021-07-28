
	import { api } from '../modules/api-url-v1.js';
	import {password, passwordCheck, passwordCheckTxt, sessionUserId, btnSubmit, useremail, userid, username} from '../modules/elements.js';
	import {sweetToast, sweetConfirm, sweetError, sweetToastAndCallback} from '../modules/alert.js';
	import {isEmpty,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";

	$( () => {
		/** 상세 불러오기 **/
		getProfile();
		/** 이벤트 **/
		password    .on("keyup", function () { onKeyupPassword(); });
		passwordCheck .on("keyup", function () { onKeyupPasswordChk(); });
		btnSubmit	.on('click', function () { onSubmitUpdatePassword(); })
	});

	function onKeyupPassword()
	{
		passwordCheck.val('');
		passwordCheckTxt.text('');
	}

	function onKeyupPasswordChk()
	{
		password.val() !== passwordCheck.val() ? passwordCheckTxt.text('비밀번호가 일치하지 않습니다.') : passwordCheckTxt.text('');
	}

	function getProfile()
	{
		const param = { "userid" : sessionUserId.val() };

		ajaxRequestWithJson(true, api.getProfile, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent+message.ajaxLoadError));
	}

	function buildDetail(data)
	{
		userid.text(data.data.userid);
		username.text(data.data.name);
		useremail.text(data.data.email);
	}

	function onSubmitUpdatePassword()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		const passwd = CryptoJS.SHA512(password.val().trim());
		const param = {
			"userid" : sessionUserId.val()
			,"password" : passwd.toString()
		}

		ajaxRequestWithJson(true, api.updatePassword, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, updateSuccess);
			})
			.catch(reject => sweetError(`수정${message.ajaxError}`));
	}

	function updateSuccess()
	{
		password.val('');
		passwordCheck.val('');
	}

	function validation()
	{
		if (isEmpty(password.val()))
		{
			sweetToast(`비밀번호는 ${message.required}`);
			password.trigger('focus');
			return false;
		}

		if (isEmpty(passwordCheck.val()))
		{
			sweetToast(`비밀번호 확인을 ${message.input}`);
			passwordCheck.trigger('focus');
			return false;
		}

		if (password.val() !== passwordCheck.val())
		{
			sweetToast(`비밀번호와 비밀번호 확인이 ${message.notEqual}`);
			passwordCheck.trigger('focus');
			return false;
		}

		if (!isValidPassword())
		{
			sweetToast(`비밀번호 형식을 ${message.doubleChk}`);
			password.trigger('focus');
			return false;
		}

		return true;
	}

	function isValidPassword()
	{
		const passwd  = password.val().trim();
		const regExp  = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
		const regExp1 = /(0123)|(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)/;
		const regExp2 = /(\w)\1\1\1/;

		return regExp.test(passwd) && (!regExp1.test(passwd) && !regExp2.test(passwd));
	}


