
	import { qrImg, imgUrl, otpNum, type, userid, username, password, useremail, btnSubmit } from "../modules/elements.js";
	import { isEmpty } from "../modules/utils.js";
	import { message } from "../modules/message.js";
	import { sweetToast } from "../modules/alert.js";
	import { fadeinLoader, fadeoutLoader, onErrorImage } from "../modules/common.js";

	$( () => {
		qrImageLoad();
		otpNum.trigger('focus');
		$("body").on("keydown", function (event) { onKeydownBody(event) });
		btnSubmit.on("click", function () { onSubmitAuthNum(); });
	});

	function qrImageLoad()
	{
		fadeinLoader();

		const imageUrl = isEmpty(imgUrl.val()) ? label.noImage : imgUrl.val();

		qrImg.attr('src', imageUrl);
		qrImg.on("load", function () { fadeoutLoader(); });

		onErrorImage();
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
			form.prop("action", "/v2/auth/mfa");
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
			sweetToast(`인증 번호는 ${message.required}`);
			return false;
		}

		return true;
	}