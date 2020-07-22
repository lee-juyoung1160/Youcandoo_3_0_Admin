
	const authCode		= $("#auth_code");
	const authCodeLabel	= $("#authCodeLabel");
	const userid		= $("#userid");
	const name 			= $("#name");
	const email 		= $("#email");
	const chkEmail 		= $("#chkEmail");
	const useYn 		= $("input[name=radio-use-yn]");
	const btnSubmit 	= $("#btnSubmit");

	$( () => {
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 권한 목록 **/
		getAuthList();
		/** 이벤트 **/
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
			url: api.listAuth,
			type: "POST",
			headers : headers,
			/*data: params(),*/
			dataType: 'json',
			success: function(data) {
				if (isSuccessResp(data))
					buildAuthList(data)
				else
					sweetError(invalidResp(data));
			},
			error: function (request, status) {
				sweetError(label.list+message.ajaxLoadError);
			}
		});
	}

	function buildAuthList(data)
	{
		let details   = data.data;
		let optionDom = '';
		for (let i=0; i<details.length; i++)
		{
			let code = details[i].code;
			let name = details[i].name;
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
			sweetToast('아이디는 ' + message.required);
			userid.focus();
			return false;
		}

		if (isEmpty(name.val()))
		{
			sweetToast('이름은 ' + message.required);
			name.focus();
			return false;
		}

		if (isEmpty(email.val()))
		{
			sweetToast('이메일은 ' + message.required);
			email.focus();
			return false;
		}

		if (!isEmail(email.val()))
		{
			sweetToast('올바른 이메일 형식을 '+message.input);
			email.focus();
			return false;
		}

		return true;
	}

	function onSubmitAdmin()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		$.ajax({
			url: api.createAdmin,
			type: "POST",
			headers : headers,
			dataType: 'json',
			data: params(),
			success: function(data) {
				sweetToastAndCallback(data, createSuccess);
			},
			error: function (request, status) {
				sweetError(label.submit+message.ajaxError);
			}
		});
	}

	function createSuccess()
	{
		location.href = page.listAdmin;
	}

	function params()
	{
		let param = {
			"userid" : userid.val().trim()
			,"name" : name .val().trim()
			,"email" : email .val().trim()
			,"auth_code" : authCode.val()
			,"is_active" : $("input[name=radio-use-yn]:checked").val()
		}
		return JSON.stringify(param);
	}