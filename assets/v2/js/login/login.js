
	import {
		btnLogin,
		btnJoin,
		userid,
		password,
		modalContent,
		modalBackdrop,
		currentPassword,
		changePassword,
		changePasswordCheck,
		passwordChangeId,
		passwordExpired,
		btnSubmitUpdate,
		btnChangeLater,
	} from "../modules/elements.js";
	import { isEmpty } from "../modules/utils.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {sweetError, sweetToast, sweetConfirmWithoutCancel} from "../modules/alert.js";
	import {overflowHidden} from "../modules/common.js";
	import {isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import {api} from "../modules/api-url.js";

	$( () => {
		btnLogin.on("click", function () { onSubmitLogin(); });
		userid.on("keydown", function (event) { onKeydownEmail(event) });
		password.on("keydown", function (event) { onKeydownPassword(event) });
		btnJoin.on("click", function () { goJoin(); });
		btnSubmitUpdate.on("click", function () { onSubmitUpdatePassword(); });
		btnChangeLater.on("click", function () { onClickBtnChangeLater(); });
		checkPasswordExpired();
	});

	function checkPasswordExpired()
	{
		const isExpired = passwordExpired.val() === 'Y';

		if (isExpired)
		{
			modalContent.fadeIn();
			modalBackdrop.fadeIn();
			overflowHidden();
			currentPassword.trigger('focus');
		}
	}

	function onClickBtnChangeLater()
	{
		$.ajax({
			global: false,
			url: api.updatePasswordLater,
			type: "POST",
			headers: getHeaders(),
			contentType: 'text/plain',
			dataType: 'json',
			data: JSON.stringify({"userid" : passwordChangeId.val()}),
			success: function(data) {
				isSuccessResp(data) ? updateSuccess() : sweetToast(invalidResp(data));
			},
			error: function (jqXHR, textStatus, errorThrown) {
				sweetError(message.ajaxError);
			},
		});
	}

	function updateValid()
	{
		if (isEmpty(currentPassword.val()))
		{
			sweetToast(`현재 비밀번호를 ${message.input}`);
			currentPassword.trigger('focus');
			return false;
		}

		if (isEmpty(changePassword.val()))
		{
			sweetToast(`새 비밀번호를 ${message.input}`);
			changePassword.trigger('focus');
			return false;
		}

		if (isEmpty(changePasswordCheck.val()))
		{
			sweetToast(`새 비밀번호 확인을 ${message.input}`);
			changePasswordCheck.trigger('focus');
			return false;
		}

		if (changePassword.val().trim() !== changePasswordCheck.val().trim())
		{
			sweetToast(`새 비밀번호가 ${message.notEqual}`);
			changePasswordCheck.trigger('focus');
			return false;
		}

		if (!isValidPassword())
		{
			sweetToast(`새 비밀번호 형식을 ${message.doubleChk}`);
			changePassword.trigger('focus');
			return false;
		}

		return true;
	}

	function onSubmitUpdatePassword()
	{
		if (updateValid())
		{
			const currentPasswd = CryptoJS.SHA512(currentPassword.val().trim());
			const newPassword = CryptoJS.SHA512(changePassword.val().trim());
			const param = {
				"userid" : passwordChangeId.val()
				,"current_password" : currentPasswd.toString()
				,"password" : newPassword.toString()
			}

			$.ajax({
				global: false,
				url: api.updatePassword,
				type: "POST",
				headers: getHeaders(),
				contentType: 'text/plain',
				dataType: 'json',
				data: JSON.stringify(param),
				success: function(data) {
					isSuccessResp(data)
						? sweetConfirmWithoutCancel('비밀번호가 정상적으로 변경되었습니다.<br> 다음 로그인 시 변경된 비밀번호로 로그인이 가능합니다.', updateSuccess)
						: sweetToast(invalidResp(data));
				},
				error: function (jqXHR, textStatus, errorThrown) {
					sweetError(`비밀번호 변경${message.ajaxError}`);
				},
			});
		}
	}

	function updateSuccess()
	{
		location.href = '/v2/main';
	}

	function onKeydownEmail(event)
	{
		if (event.keyCode === 13)
		{
			if (isEmpty(userid.val()))
			{
				sweetToast(message.emptyId);
				userid.trigger('focus');
				return;
			}

			password.trigger('focus');
		}
	}

	function onKeydownPassword(event)
	{
		if (event.keyCode === 13)
		{
			if (isEmpty(password.val()))
			{
				sweetToast(message.emptyPassword);
				password.trigger('focus');
				return;
			}

			onSubmitLogin();
		}
	}

	function onSubmitLogin()
	{
		if (validation())
			document.loginForm.submit();
	}

	function validation()
	{
		if (isEmpty(userid.val()))
		{
			sweetToast(message.emptyId);
			userid.trigger('focus');
			return false;
		}

		if (isEmpty(password.val()))
		{
			sweetToast(message.emptyPassword);
			password.trigger('focus');
			return false;
		}

		return true;
	}

	function goJoin()
	{
		location.href = page.join;
	}

	function isValidPassword()
	{
		const passwd  = changePassword.val().trim();
		const regExp  = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
		const regExp1 = /(0123)|(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)/;
		const regExp2 = /(\w)\1\1\1/;

		return regExp.test(passwd) && (!regExp1.test(passwd) && !regExp2.test(passwd));
	}

	function getHeaders()
	{
		const authorization = "9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7";
		const encryptAuth = btoa( JSON.stringify({ "authorization" : authorization,  "userid" : passwordChangeId.val()} ) );
		return { "Authorization" : encryptAuth };
	}