
	const selFaqType	= $("#selFaqType");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {

		btnSubmit.on('click', function () { onSubmitFaq(); });

		initInputDatepicker();
		initComponent();
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

		return true;
	}

	function onSubmitFaq()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createFaq,
					type: "POST",
					processData: false,
					contentType: false,
					headers: headers,
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = '/service/faq/list'
					},
					error: function (request, status) {
						console.log(status);
					}
				});
			}
		}
	}

	function params()
	{
		let param = {
			"faqTitle" : title.val().trim()
			,"faqContents" : content.val().trim()
			,"faqType" : selFaqType.val()
			,"isExposure" : $('input:radio[name=radio-exposure]:checked').val()
		}

		return JSON.stringify(param);
	}

