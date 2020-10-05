
	const qrImg  = $("#qrImg");
	const otpNum = $("#otpNum");
	const btnSubmit		= $("#btnSubmit");
	const viewLoading	= $("#viewLoading");

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
			document.tfaForm.submit();
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