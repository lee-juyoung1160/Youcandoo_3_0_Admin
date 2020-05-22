
	const bizName  			= $("#bizName");
	const bizNo  			= $("#bizNo");
	const profileImage 		= $("#profileImage");
	const homepage 			= $("#homepage");
	const bizDesc			= $("#bizDesc");
	const btnSubmit			= $("#btnSubmit");

	$(document).ready(function () {

		initComponent();
		checkInputLength();

		profileImage	.on('change', function(){ onChangeValidationImage(this) });
		btnSubmit		.on('click', function(){ onSubmitBiz(); });
	});

	/** component 초기화 **/
	function initComponent()
	{
		bizName.focus();
		bizName.val('');
		bizNo.val('');
		$("textarea").val('');
	}

	function validation()
	{
		let imageFile	= profileImage[0].files;

		if (isEmpty(bizName.val().trim()))
		{
			alert('회사명은 ' + message.required);
			bizName.focus();
			return false;
		}

		if (isEmpty(bizNo.val().trim()))
		{
			alert('사업자번호는 ' + message.required);
			bizNo.focus();
			return false;
		}

		if (bizNo.val().length !== 10)
		{
			alert('사업자번호를 ' + message.doubleChk);
			bizNo.focus();
			return false;
		}

		if (imageFile.length === 0)
		{
			alert('프로필 이미지는 ' + message.required);
			profileImage.focus();
			return false;
		}

		if (isEmpty(homepage.val().trim()))
		{
			alert('홈페이지 링크는 ' + message.required);
			homepage.focus();
			return false;
		}

		if (isEmpty(bizDesc.val().trim()))
		{
			alert('소개내용은 ' + message.required);
			bizDesc.focus();
			return false;
		}

		return true;
	}

	function params()
	{
		let paramFile = profileImage[0].files[0];
		let formData  = new FormData();
		formData.append('company-name', bizName.val());
		formData.append('company-number', bizNoFormatter(bizNo.val()));
		formData.append('company-url', homepage.val());
		formData.append('company-contents', bizDesc.val());
		formData.append('company-image', paramFile);

		return formData;
	}

	function onSubmitBiz()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createBiz,
					type: "POST",
					processData: false,
					contentType: false,
					headers: headers,
					data: params(),
					success: function(data) {

						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listBiz
					},
					error: function (request, status) {
						console.log(status);
					}
				});
			}
		}
	}