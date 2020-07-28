
	const authCode		= $("#auth_code");
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
		userid.trigger('focus');
		useYn.eq(0).prop('checked', true);
	}

	function getAuthList()
	{
		let url 	= api.listAuth;
		let errMsg 	= label.list+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, null, getAuthListCallback, errMsg, false);
	}

	function getAuthListCallback(data)
	{
		isSuccessResp(data) ? buildAuthList(data) : sweetError(invalidResp(data));
	}

	function buildAuthList(data)
	{
		let details   = data.data;
		let optionDom = '';
		for (let i=0; i<details.length; i++)
		{
			let code = details[i].code;
			let name = details[i].name;

			optionDom += '<option value="'+code+'">'+name+'</option>';
		}

		authCode.html(optionDom);

		onChangeSelectOption(authCode);
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
			userid.trigger('focus');
			return false;
		}

		if (isEmpty(name.val()))
		{
			sweetToast('이름은 ' + message.required);
			name.trigger('focus');
			return false;
		}

		if (isEmpty(email.val()))
		{
			sweetToast('이메일은 ' + message.required);
			email.trigger('focus');
			return false;
		}

		if (!isEmail(email.val()))
		{
			sweetToast('올바른 이메일 형식을 '+message.input);
			email.trigger('focus');
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
		let url = api.createAdmin;
		let errMsg = label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, params(), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
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