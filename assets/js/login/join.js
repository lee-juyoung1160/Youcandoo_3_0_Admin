
	const userid     = $("#userid");
	const password   = $("#password");
	const repassword = $("#repassword");
	const username 	 = $("#username");
	const useremail  = $("#useremail");
	const btnSubmit	 = $("#btnSubmit");
	const btnCancel  = $("#btnCancel");

	$( () => {
		userid		.trigger('focus');
		userid		.on("focusout", function () { validUserId(this); });
		password	.on("focusout", function () { validPassword(this); });
		repassword	.on("focusout", function () { validConfirmPassword(this); });
		username	.on("focusout", function () { validUserName(this); });
		useremail	.on("focusout", function () { validUserEmail(this); });
		btnCancel   .on("click", function () { goLogin(); });
		btnSubmit   .on("click", function () { onSubmitJoin(); });

		/*userid      .on("keydown", function (event) { onKeydownEmail(event) });
		password    .on("keydown", function (event) { onKeydownPassword(event) });

		joinBtn		.on("click", function () { goJoin(); });*/

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
		/*let regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;*/
		let regExp  = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
		let regExp1 = /(0123)|(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)/;
		let regExp2 = /(\w)\1\1\1/;
		regExp.test($(obj).val()) && (!regExp1.test($(obj).val()) && !regExp2.test($(obj).val())) ? errEl.hide() : errEl.show();
		/*regExp.test($(obj).val()) ? errEl.hide() : errEl.show();*/
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

	function validUserEmail(obj)
	{
		let errEl = $(obj).parent().next();
		isEmpty($(obj).val()) ? errEl.show() : errEl.hide();
		isEmail($(obj).val()) ? errEl.hide() : errEl.show();
	}

	function onSubmitJoin()
	{
		if (validation())
			swConfirm(message.create, createRequest);
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
		let joinForm = $(".join-content");
		joinForm.removeClass('shake');

		validUserId(userid);
		validPassword(password);
		validConfirmPassword(repassword);
		validUserName(username);
		validUserEmail(useremail);

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