
	const userid     = $("#userid");
	const useremail  = $("#useremail");
	const password   = $("#password");
	const repassword = $("#repassword");
	const username 	 = $("#username");
	const btnSubmit	 = $("#btnSubmit");
	const btnCancel  = $("#btnCancel");

	$( () => {
		userid		.trigger('focus');
		userid		.on("keyup focusout", function () { validUserId(this); });
		password	.on("focusout", function () { validPassword(this); });
		repassword	.on("focusout", function () { validConfirmPassword(this); });
		username	.on("keyup focusout", function () { validUserName(this); });
		btnCancel   .on("click", function () { goLogin(); });
		btnSubmit   .on("click", function () { onSubmitJoin(); });
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
		password.val() === repassword.val() ? errEl.hide() : errEl.show();
	}

	function validUserName(obj)
	{
		let errEl = $(obj).parent().next();
		isEmpty($(obj).val()) ? errEl.show() : errEl.hide();
	}

	function onSubmitJoin()
	{
		if (validation())
			swConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let userEmail = userid.val()+"@yanadoocorp.com";
		useremail.val(userEmail);
		/*document.useremail.value = `${userId}@yanadoocorp.com`;*/
		document.joinForm.submit();
	}

	function validation()
	{
		let joinForm = $(".join-content");
		joinForm.removeClass('shake');

		validUserId(userid);
		validPassword(password);
		validConfirmPassword(repassword);
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
		location.href = '/main/login';
	}

	function swConfirm(msg, callback)
	{
		Swal.fire({
			text: msg,
			showCancelButton: true,
			confirmButtonText: label.confirm,
			cancelButtonText: label.cancel
		}).then((result) => {
			if (result.value)
				callback();
		})
	}
