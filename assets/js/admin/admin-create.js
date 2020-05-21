
	const authCode		= $("#auth_code");
	const authCodeLabel	= $("#authCodeLabel");
	const userid		= $("#userid");
	const name 			= $("#name");
	const email 		= $("#email");
	const chkEmail 		= $("#chkEmail");
	const useYn 		= $("input[name=radio-use-yn]");
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {
		initComponent();
		getAuthList();

		btnSubmit	.on('click', function () { onSubmitAdmin(); })
		email		.on('keyup', function () { onKeyupEmail(); })
	});

	function initComponent()
	{
		userid.focus();
		useYn.eq(0).prop('checked', true);
	}

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
		console.log(jsonData)
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

	function onKeyupEmail()
	{
		if (isEmail(email.val()))
			chkEmail.html('');
		else
			chkEmail.html('올바른 이메일 형식을 '+message.input);
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

		if (!isEmail(email.val()))
		{
			alert('올바른 이메일 형식을 '+message.input);
			email.focus();
			return false;
		}

		return true;
	}

	function params()
	{
		let param = {
			"userid" : userid.val().trim()
			,"name" : name .val().trim()
			,"email" : email .val().trim()
			,"auth_code" : authCode.val().trim()
			,"is_active" : $("input[name=radio-use-yn]:checked").val()
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