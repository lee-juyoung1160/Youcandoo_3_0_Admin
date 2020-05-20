
	const title 	= $("#title");
	const content	= $("#summernote");
	const exposure	= $("input[name=radio-exposure]");
	const btnSubmit = $("#btnSubmit");

	$(document).ready(function () {

		btnSubmit.on('click', function () { onSubmitNotice(); });

		initInputDatepicker();
		setDateToday();
		initComponent();
		initSummerNote();
		checkInputLength();
	});

	function initComponent()
	{
		title.focus();
		title.val('');
		content.val('');
		exposure.eq(0).prop('checked', true);
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			alert('제목은 ' + message.required);
			title.focus();
			return false;
		}

		if (isEmpty(content.val()))
		{
			alert('내용은 ' + message.required);
			content.focus();
			return false;
		}

		if (isEmpty(datePicker.val()))
		{
			alert('예약일은 ' + message.required);
			datePicker.focus();
			return false;
		}

		return true;
	}

	function onSubmitNotice()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createNotice,
					type: "POST",
					processData: false,
					contentType: false,
					data: params(),
					headers: headers,
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listNotice
					},
					error: function (xhr, ajaxOptions, thrownError) {
						console.log(xhr.status);
						console.log(thrownError);
					}
				});
			}
		}
	}

	function params()
	{
		let formData  = new FormData();
		formData.append('notice-title', title.val().trim());
		formData.append('notice-contents', content.val().trim());
		formData.append('reservation-date', datePicker.val());
		formData.append('is-exposure', $('input:radio[name=radio-exposure]:checked').val());

		return formData;
	}

