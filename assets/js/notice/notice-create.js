
	const title 	= $("#title");
	const content	= $("#content");
	const contentImage	= $("#contentImage");
	const reserveDate	= $("#reserveDate");
	const exposure	= $("input[name=radio-exposure]");
	const btnSubmit = $("#btnSubmit");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		/** 예약일 초기화 **/
		setDateToday();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		contentImage.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitNotice(); });
	});

	function initComponent()
	{
		title.focus();
		title.val('');
		content.val('');
		exposure.eq(0).prop('checked', true);
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
					headers: headers,
					dataType: 'json',
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listNotice
					},
					error: function (request, status) {
						alert(label.submit+message.ajaxError);
					}
				});
			}
		}
	}

	function params()
	{
		let formData  = new FormData();
		formData.append('notice_title', title.val().trim());
		formData.append('notice_contents', replaceInputTextarea(content.val().trim()));
		formData.append('reservation_date', reserveDate.val());
		formData.append('is_exposure', $('input:radio[name=radio-exposure]:checked').val());
		formData.append('notice_image', contentImage[0].files[0]);
		formData.append('create_user', sessionUserId.val());

		return formData;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			alert('제목은 ' + message.required);
			title.focus();
			return false;
		}

		if (isEmpty(content.val))
		{
			alert('내용은 ' + message.required);
			content.focus();
			return false;
		}

		if (isEmpty(reserveDate.val()))
		{
			alert('예약일은 ' + message.required);
			reserveDate.focus();
			return false;
		}

		return true;
	}

