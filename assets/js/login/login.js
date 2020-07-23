
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