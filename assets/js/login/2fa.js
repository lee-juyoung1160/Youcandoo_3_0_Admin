
	const qrImg     = $("#qrImg");
	const authNum   = $("#authNum");
	const btnSubmit	= $("#btnSubmit");

	$( () => {
		authNum.trigger('focus');

		btnSubmit.on("click", function () { onSubmitAuthNum(); });
	});

	function onSubmitAuthNum()
	{
		if (validation())
			createRequest();
	}

	function createRequest()
	{
		let url = api.join;
		let errMsg = label.submit+message.ajaxError;
		let param = {
			"" : authNum.val().trim()
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback()
	{

	}

	function validation()
	{
		if (isEmpty(authNum.val()))
		{
			toast(`인증 번호는 ${message.required}`);
			return false;
		}

		return true;
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