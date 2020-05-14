
	const authCode		= $("#auth_code");
	const authCodeLabel	= $("#authCodeLabel");
	const userid		= $("#userid");
	const name 			= $("#name");
	const email 		= $("#email");
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {
		getAuthList();
		btnSubmit.on('click', function () { onSubmitAdmin(); })
	});

	function getAuthList()
	{
		$.ajax({
			url: api.listAdminAuth,
			type: "POST",
			headers : headers,
			/*data: params(),*/
			success: function(data) {
				if (isSuccessResp(data))
					buildAuthList(data)
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildAuthList(data)
	{
		let jsonData  = JSON.parse(data);
		let respData  = jsonData.data;
		let optionDom = '';
		for (let i=0; i<respData.length; i++)
		{
			let code = respData[i].code;
			let name = respData[i].name;
			if (i === 0)
				authCodeLabel.text(name);

			optionDom += '<option value="'+code+'">'+name+'</option>';
		}

		authCode.html(optionDom);
	}

	function validation()
	{
		if (isEmpty(userid.val()))
		{
			alert('아이디는 ' + message.required);
			userid.focus();
			return false;
		}

		if (isEmpty(name.val()))
		{
			alert('이름은 ' + message.required);
			name.focus();
			return false;
		}

		if (isEmpty(email.val()))
		{
			alert('이메일은 ' + message.required);
			email.focus();
			return false;
		}

		return true;
	}

	function params()
	{
		let param = {
			"userid" : userid.val()
			,"name" : name .val()
			,"email" : email .val()
			,"auth_code" : authCode.val()
		}
		return JSON.stringify(param);
	}

	function onSubmitAdmin()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createAdmin,
					type: "POST",
					headers : headers,
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = '/admin/lists'
					},
					error: function (request, status) {
						console.log(status);
					}
				});
			}
		}
	}