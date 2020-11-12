
	const myId 				= $("#myId");
	const myName 			= $("#myName");
	const myEmail 			= $("#myEmail");
	const password 			= $("#password");
	const passwordChk 		= $("#passwordChk");
	const passwordChkTxt	= $("#passwordChkTxt");
	const btnSubmit 		= $("#btnSubmit");

	$( () => {
		/** 나의 정보 **/
		getProfile();
		/** 이벤트 **/
		password    .on("keyup", function () { onKeyupPassword(); });
		passwordChk .on("keyup", function () { onKeyupPasswordChk(); });
		btnSubmit	.on('click', function () { onSubmitProfile(this); })
	});

	function onKeyupPassword()
	{
		passwordChk.val('');
		passwordChkTxt.html('');
	}

	function onKeyupPasswordChk()
	{
		if (password.val() !== passwordChk.val())
			passwordChkTxt.html('비밀번호가 일지하지 않습니다.');
		else
			passwordChkTxt.html('');
	}

	function getProfile()
	{
		let param   = JSON.stringify({"userid" : sessionUserId.val()});
		let url 	= api.getProfile;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, param, getProfileCallback, errMsg, false);
	}

	function getProfileCallback(data)
	{
		isSuccessResp(data) ? buildProfile(data) : sweetError(invalidResp(data));
	}

	function buildProfile(data)
	{
		let detail = data.data;

		myId.html(detail.userid);
		myName.html(detail.name);
		myEmail.html(detail.email);
	}

	function validation()
	{
		if (isEmpty(password.val()))
		{
			sweetToast(`비밀번호는 ${message.required}`);
			password.trigger('focus');
			return false;
		}

		if (isEmpty(passwordChk.val()))
		{
			sweetToast(`비밀번호 확인을 ${message.input}`);
			passwordChk.trigger('focus');
			return false;
		}

		if (password.val() !== passwordChk.val())
		{
			sweetToast(`비밀번호를 ${message.doubleChk}`);
			passwordChk.trigger('focus');
			return false;
		}

		return true;
	}

	function onSubmitProfile()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		$.ajax({
			url: api.updateProfile,
			type: "POST",
			headers : headers,
			dataType: 'json',
			data: updateParams(),
			success: function(data) {
				sweetToastAndCallback(data, getProfile);
			},
			error: function (request, status) {
				sweetError(label.submit+message.ajaxError);
			}
		});
	}

	function updateParams()
	{
		let param = {
			"userid" : sessionUserId.val()
			,"password" : password.val().trim()
		}

		return JSON.stringify(param);
	}
