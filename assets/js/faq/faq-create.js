
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
					url: "http://api.kakaokids.org/v1.0/admin/faq/create",
					type: "POST",
					processData: false,
					contentType: false,
					headers: headers,
					data: params(),
					success: function(data) {
						console.log(data);
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
		let formData  = new FormData();
		formData.append('faq-type ', selFaqType.val());
		formData.append('faq-title', title.val());
		formData.append('faq-contents', content.val());
		formData.append('is-exposure', $('input:radio[name=radio-exposure]:checked').val());

		return formData;
	}

