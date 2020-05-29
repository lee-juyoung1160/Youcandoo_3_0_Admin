
	const btnProfileModify  = $("#btnProfileModify");
	const myProfile			= $("#myProfile");
	const myId 				= $("#myId");
	const myName 			= $("#myName");
	const myEmail 			= $("#myEmail");
	const password 			= $("#password");
	const passwordChk 		= $("#passwordChk");
	const passwordChkTxt	= $("#passwordChkTxt");
	const btnSubmit 		= $("#btnSubmit");
	const search 			= $(".search");
	const reset 			= $(".reset");
	const dataNum			= $(".data-num");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 검색 폼 초기화 **/
		initSearchForm();
		/** 로그인 관리자 정보 **/
		getProfile();
		/** 이벤트 **/
		btnProfileModify	.on('click', function () { toggleProfile(this); })
		btnSubmit			.on('click', function () { onSubmitProfile(this); })
		search				.on("click", function () { onSubmitSearch(); });
		reset				.on("click", function () { initSearchForm(); });
		dayButtons      	.on("click", function () { onClickActiveAloneDayBtn(this); });
		password      		.on("keyup", function () { onKeyupPassword(); });
		passwordChk      	.on("keyup", function () { onKeyupPasswordChk(); });
	});

	function initSearchForm()
	{
		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	/** 프로필 상세 영역 toggle **/
	function toggleProfile(obj)
	{
		$(obj).toggleClass('active');
		myProfile.toggleClass('active');
	}

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
		$.ajax({
			url: api.getProfile,
			type: "POST",
			headers : headers,
			data: JSON.stringify({"userid" : sessionUserId.val()}),
			success: function(data) {
				if (isSuccessResp(data))
					buildProfile(data)
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildProfile(data)
	{
		let jsonData  = JSON.parse(data);

		myId.html(jsonData.data.userid);
		myName.html(jsonData.data.name);
		myEmail.html(jsonData.data.email);
	}

	function validation()
	{
		if (isEmpty(password.val()))
		{
			alert('비밀번호는 ' + message.required);
			password.focus();
			return false;
		}

		if (isEmpty(passwordChk.val()))
		{
			alert('비밀번호 확인을 ' + message.input);
			passwordChk.focus();
			return false;
		}

		if (password.val() !== passwordChk.val())
		{
			alert('비밀번호를 ' + message.doubleChk);
			passwordChk.focus();
			return false;
		}

		return true;
	}

	function updateParams()
	{
		let param = {
			"userid" : sessionUserId.val()
			,"password" : password.val().trim()
		}

		return JSON.stringify(param);
	}

	function onSubmitProfile()
	{
		if (validation())
		{
			if (confirm(message.modify))
			{
				$.ajax({
					url: api.updateProfile,
					type: "POST",
					headers : headers,
					data: updateParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							getProfile();
					},
					error: function (request, status) {
						console.log(status);
					}
				});
			}
		}
	}