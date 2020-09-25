
	const userid     = $("#userid");
	const password   = $("#password");
	const repassword = $("#repassword");
	const username 	 = $("#username");
	const useremail  = $("#useremail");
	const btnSubmit	 = $("#btnSubmit");
	const btnCancel  = $("#btnCancel");

	$( () => {
		userid		.trigger('focus');
		password	.on("focusout", function () { onFocusoutPassword(this); });
		repassword	.on("focusout", function () { onFocusoutConfirmPassword(this); });
		username	.on("focusout", function () { onFocusoutUserName(this); });
		useremail	.on("focusout", function () { onFocusoutUserEmail(this); });
		btnCancel   .on("click", function () { goLogin(); });
		btnSubmit   .on("click", function () { onSubmitJoin(); });

		/*userid      .on("keydown", function (event) { onKeydownEmail(event) });
		password    .on("keydown", function (event) { onKeydownPassword(event) });

		joinBtn		.on("click", function () { goJoin(); });*/

	});

	function onFocusoutPassword(obj)
	{
		let errEl = $(obj).parent().next();
		let regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

		regExp.test($(obj).val()) ? errEl.hide() : errEl.show();
	}

	function onFocusoutConfirmPassword(obj)
	{
		let errEl = $(obj).parent().next();

		password.val() === repassword.val() ? errEl.hide() : errEl.show();
	}

	function onFocusoutUserName(obj)
	{
		let errEl = $(obj).parent().next();

		isEmpty(username.val()) ?  errEl.show() : errEl.hide();
	}

	function onFocusoutUserEmail(obj)
	{
		let errEl = $(obj).parent().next();

		isEmail(useremail.val()) ?  errEl.hide() : errEl.show();
	}

	function onSubmitJoin()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let url = api.join;
		let errMsg = label.submit+message.ajaxError;
		let param = {

		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback()
	{

	}

	function validation()
	{
		if (isEmpty(userid.val()))
		{
			toast(`아이디는 ${message.required}`);
			userid.trigger('focus');
			return false;
		}

		if (isEmpty(password.val()))
		{
			toast(`비밀번호는 ${message.required}`);
			password.trigger('focus');
			return false;
		}

		if (isEmpty(repassword.val()))
		{
			toast(`비밀번호 확인은 ${message.required}`);
			repassword.trigger('focus');
			return false;
		}

		if (isEmpty(username.val()))
		{
			toast(`이름은 ${message.required}`);
			username.trigger('focus');
			return false;
		}

		if (isEmpty(useremail.val()))
		{
			toast(`이메일은 ${message.required}`);
			useremail.trigger('focus');
			return false;
		}

		return true;
	}

	function goLogin()
	{
		location.href = '/main/login';
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