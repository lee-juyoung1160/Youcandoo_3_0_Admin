
	const userid    = $("#userid");
	const password  = $("#password");
	const loginBtn  = $("#login-btn");
	const joinBtn	= $("#join-btn");

	$( () => {
		loginBtn.on("click", function () { onSubmitLogin(); });
		userid  .on("keydown", function (event) { onKeydownEmail(event) });
		password.on("keydown", function (event) { onKeydownPassword(event) });
		joinBtn	.on("click", function () { goJoin(); });
	});

	function onKeydownEmail(event)
	{
		if (event.keyCode === 13)
		{
			if (isEmpty(userid.val()))
			{
				toast(message.emptyId);
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
				toast(message.emptyPassword);
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
			toast(message.emptyId);
			userid.trigger('focus');
			return false;
		}

		if (isEmpty(password.val()))
		{
			toast(message.emptyPassword);
			password.trigger('focus');
			return false;
		}

		return true;
	}

	function goJoin()
	{
		location.href = '/main/join';
	}

	function toast(msg)
	{
		Swal.fire({
			toast: true,
			position: 'center',
			icon: 'warning',
			title: msg,
			showConfirmButton: false,
			timer: 1500
		})
	}