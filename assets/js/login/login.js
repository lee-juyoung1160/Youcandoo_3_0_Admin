
	const userid    = $("#userid");
	const password  = $("#password");
	const loginBtn  = $("#login-btn");

	$( () => {
		loginBtn    .on("click", function () { onSubmitLogin(); });
		userid      .on("keydown", function (event) { onKeydownEmail(event) });
		password    .on("keydown", function (event) { onKeydownPassword(event) });
	});

	function onKeydownEmail(event)
	{
		if (event.keyCode === 13)
		{
			if (isEmpty(userid.val()))
			{
				sweetToast(message.emptyId);
				userid.focus();
				return;
			}

			password.focus();
		}
	}

	function onKeydownPassword(event)
	{
		if (event.keyCode === 13)
		{
			if (isEmpty(password.val()))
			{
				sweetToast(message.emptyPassword);
				password.focus();
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
			userid.focus();
			return false;
		}

		if (isEmpty(password.val()))
		{
			sweetToast(message.emptyPassword);
			password.focus();
			return false;
		}

		return true;
	}