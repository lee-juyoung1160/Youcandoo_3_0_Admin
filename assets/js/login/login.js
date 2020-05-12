
	const email     = $("#email");
	const password  = $("#password");
	const loginBtn  = $("#login-btn");

	$(document).ready(function () {
		loginBtn    .on("click", function () { onSubmitLogin(); });
		email       .on("keydown", function (key) { onKeydownEmail(key) });
		password    .on("keydown", function (key) { onKeydownPassword(key) });

	});

	function onKeydownEmail(key)
	{
		if (key.keyCode === 13)
		{
			if (isEmpty(email.val()))
			{
				alert(message.emptyId);
				email.focus();
				return;
			}

			password.focus();
		}
	}

	function onKeydownPassword(key)
	{
		if (key.keyCode === 13)
		{
			if (isEmpty(password.val()))
			{
				alert(message.emptyPassword);
				password.focus();
				return;
			}

			onSubmitLogin();
		}
	}

	function onSubmitLogin()
	{
		if (validation())
		{
			alert("goLoginAction");
		}
	}

	function validation()
	{
		if (isEmpty(email.val()))
		{
			alert(message.emptyId);
			email.focus();
			return false;
		}

		if (isEmpty(password.val()))
		{
			alert(message.emptyPassword);
			password.focus();
			return false;
		}

		return true;
	}