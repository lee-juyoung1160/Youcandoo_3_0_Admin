
	import { btnLogin, btnJoin, userid, password } from "../modules/elements.js";
	import { isEmpty } from "../modules/utils.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import { sweetToast } from "../modules/alert.js";

	$( () => {
		btnLogin.on("click", function () { onSubmitLogin(); });
		userid  .on("keydown", function (event) { onKeydownEmail(event) });
		password.on("keydown", function (event) { onKeydownPassword(event) });
		btnJoin	.on("click", function () { goJoin(); });
	});

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