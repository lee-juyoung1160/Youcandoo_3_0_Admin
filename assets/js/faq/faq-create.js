
	const selFaqType	= $("#selFaqType");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {

		btnSubmit.on('click', function () { onSubmitFaq(); });

		getFaqType();
		initInputDatepicker();
		initComponent();
		checkInputLength();
	});

	function getFaqType()
	{
		$.ajax({
			url: api.getFaqType,
			type: "POST",
			headers: headers,
			success: function(data) {
				if (isSuccessResp(data))
					buildFaqType(data);
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildFaqType(data)
	{
		let jsonData = JSON.parse(data);
		let dataLen = jsonData.data.length;
		let optionDom = '';

		for (let i=0; i<dataLen; i++)
		{
			let value = jsonData.data[i].type;
			let name  = jsonData.data[i].faq_name;
			optionDom += '<option value="'+value+'">'+name+'</option>';
		}

		selFaqType.html(optionDom);
		onChangeSelectOption(selFaqType);
	}

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
					headers: headers,
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listFaq
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
			,"create_user" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}

