
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {password, passwordCheck, passwordCheckTxt, sessionUserId, btnSubmit,} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {isEmpty,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

	$( () => {
		/** 상세 불러오기 **/
		//getProfile();
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
		const url = api.getProfile;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = { "userid" : sessionUserId.val() };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getProfileCallback, errMsg, false);
	}

	function getProfileCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	function buildDetail(data)
	{
		const { username, userid, useremail } = data.data;
	}


	function onSubmitUpdatePassword()
	{
		if (validation())
			sweetConfirm(message.create, updateRequest);
	}

	function updateRequest()
	{
		const url = api.updatePassword;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const passwd = CryptoJS.SHA512(password.val().trim());
		const param = {
			"userid" : sessionUserId.val()
			,"password" : passwd.toString()
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), updateReqCallback, errMsg, false);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, getProfile);
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
		let passwd  = password.val().trim();
		let regExp  = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
		let regExp1 = /(0123)|(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)/;
		let regExp2 = /(\w)\1\1\1/;

		return regExp.test(passwd) && (!regExp1.test(passwd) && !regExp2.test(passwd));
	}


