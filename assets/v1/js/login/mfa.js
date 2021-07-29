
	const imgUrl  	= $("#imgUrl");
	const qrImg  	= $("#qrImg");
	const otpNum 	= $("#otpNum");
	const type 		= $("#type");
	const secret 	= $("#secret");
	const userid 	= $("#userid");
	const username 	= $("#username");
	const password 	= $("#password");
	const useremail = $("#useremail");
	const btnSubmit	= $("#btnSubmit");
	const viewLoading	= $("#viewLoading");

	$( () => {
		qrImageLoad();
		otpNum.trigger('focus');
		$("body")  .on("keydown", function (event) { onKeydownBody(event) });
		btnSubmit.on("click", function () { onSubmitAuthNum(); });
	});

	function qrImageLoad()
	{
		fadeinLoader();

		const imageUrl = isEmpty(imgUrl.val()) ? label.noImage : imgUrl.val();

		qrImg.attr('src', imageUrl);
		qrImg.on("load", function () { fadeoutLoader(); });
		qrImg.on("error", function () { fadeoutLoader(); onErrorImage(this); });
	}

	function onKeydownBody(event)
	{
		if (event.keyCode === 13)
			onSubmitAuthNum();
	}

	function onSubmitAuthNum()
	{
		if (validation())
		{
			let form   = $("<form></form>");
			form.prop("method", "post");
			form.prop("action", "/auth/mfa");
			form.append($("<input/>", {type: 'hidden', name: 'type', value: type.val()}));
			form.append($("<input/>", {type: 'hidden', name: 'otp', value: otpNum.val()}));
			form.append($("<input/>", {type: 'hidden', name: 'secret', value: secret.val()}));
			form.append($("<input/>", {type: 'hidden', name: 'userid', value: userid.val()}));
			if (type.val() === 'join')
			{
				form.append($("<input/>", {type: 'hidden', name: 'username', value: username.val()}));
				form.append($("<input/>", {type: 'hidden', name: 'password', value: password.val()}));
				form.append($("<input/>", {type: 'hidden', name: 'useremail', value: useremail.val()}));
			}
			form.appendTo("body");
			form.trigger('submit');
		}
	}

	function validation()
	{
		if (isEmpty(otpNum.val()))
		{
			toast(`인증 번호는 ${message.required}`);
			return false;
		}

		return true;
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

	function fadeinLoader()
	{
		viewLoading.fadeIn(100);
	}

	function fadeoutLoader()
	{
		viewLoading.fadeOut(100);
	}

	function onErrorImage(obj)
	{
		$(obj).attr('src', label.noImage);
	}