
	const authNum   = $("#authNum");
	const btnSubmit	= $("#btnSubmit");

	$( () => {
		authNum		.trigger('focus');
		btnSubmit	.on("click", function () { onSubmitAuthNum(); });
	});

	function onSubmitAuthNum()
	{
		if (validation())
			document.tfaForm.submit();
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

	function onErrorImage(obj)
	{
		$(obj).attr('src', label.noImage);
	}