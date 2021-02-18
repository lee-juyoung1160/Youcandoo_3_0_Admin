
	import { btnSignIn, btnCancel, userid, useremail, password, passwordCheck, username } from "../modules/elements.js";
	import { isEmpty } from "../modules/utils.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import { sweetConfirm } from "../modules/alert.js";

	$( () => {
		userid			.trigger('focus');
		userid			.on("keyup focusout", function () { validUserId(this); });
		password		.on("focusout", function () { validPassword(this); });
		passwordCheck	.on("focusout", function () { validConfirmPassword(this); });
		username		.on("keyup focusout", function () { validUserName(this); });
		btnSignIn   	.on("click", function () { onSubmitJoin(); });
		btnCancel   	.on("click", function () { goLogin(); });
	});

	function validUserId(obj)
	{
		let errEl = $(obj).parent().next();
		isEmpty($(obj).val()) ? errEl.show() : errEl.hide();
	}

	function validPassword(obj)
	{
		let errEl = $(obj).parent().next();
		isEmpty($(obj).val()) ? errEl.show() : errEl.hide();

		let regExp  = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
		let regExp1 = /(0123)|(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)/;
		let regExp2 = /(\w)\1\1\1/;
		regExp.test($(obj).val()) && (!regExp1.test($(obj).val()) && !regExp2.test($(obj).val())) ? errEl.hide() : errEl.show();
	}

	function validConfirmPassword(obj)
	{
		let errEl = $(obj).parent().next();
		password.val() === passwordCheck.val() ? errEl.hide() : errEl.show();
	}

	function validUserName(obj)
	{
		let errEl = $(obj).parent().next();
		isEmpty($(obj).val()) ? errEl.show() : errEl.hide();
	}

	function onSubmitJoin()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let userEmail = userid.val()+"@yanadoocorp.com";
		useremail.val(userEmail);
		document.joinForm.submit();
	}

	function validation()
	{
		let joinForm = $(".join-content");
		joinForm.removeClass('shake');

		validUserId(userid);
		validPassword(password);
		validConfirmPassword(passwordCheck);
		validUserName(username);

		let cnt = 0;
		$(".error-msg").each(function() {
			if ($(this).css("display") !== 'none')
				cnt++
		})

		if (cnt > 0)
		{
			joinForm.addClass('shake');
			return false;
		}

		return true;
	}

	function goLogin()
	{
		location.href = page.login;
	}
