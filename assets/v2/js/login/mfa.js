
	import { qrImg, otpNum, type, username, password, useremail, btnSubmit } from "../modules/elements.js";
	import { isEmpty } from "../modules/utils.js";
	import { message } from "../modules/message.js";
	import { sweetToast } from "../modules/alert.js";
	import { fadeinLoader, fadeoutLoader, onErrorImage } from "../modules/common.js";

	$( () => {
		fadeinLoader();
		checkQrImageLoad();
		otpNum.trigger('focus');
		btnSubmit.on("click", function () { onSubmitAuthNum(); });
	});

	function checkQrImageLoad()
	{
		if (qrImg.prop("complete"))
			fadeoutLoader();
		else
		{
			qrImg.on("load", function () {
				if (this.complete) fadeoutLoader();
			}).on("error", function () {
				onErrorImage(this);
			});
		}
	}

	function onSubmitAuthNum()
	{
		if (validation())
		{
			if (type.val() !== 'join')
			{
				username.remove();
				password.remove();
				useremail.remove();
			}

			document.tfaForm.submit();
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