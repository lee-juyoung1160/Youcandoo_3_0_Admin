
	const bizName  		= $("#bizName");
	const bizNo  		= $("#bizNo");
	const profileImage 	= $("#profileImage");
	const homepage 		= $("#homepage");
	const bizDesc		= $("#bizDesc");
	const btnSubmit		= $("#btnSubmit");

	$( () => {
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		profileImage	.on('change', function() { onChangeValidationImage(this) });
		btnSubmit		.on('click', function() { onSubmitBiz(); });
	});

	/** component 초기화 **/
	function initComponent()
	{
		bizName.trigger('focus');
		bizName.val('');
		bizNo.val('');
		$("textarea").val('');
	}

	function validation()
	{
		let imageFile	= profileImage[0].files;

		if (isEmpty(bizName.val()))
		{
			sweetToast('회사명은 ' + message.required);
			bizName.trigger('focus');
			return false;
		}

		if (isEmpty(bizNo.val()))
		{
			sweetToast('사업자번호는 ' + message.required);
			bizNo.trigger('focus');
			return false;
		}

		if (bizNo.val().trim().length !== 10)
		{
			sweetToast('사업자번호를 ' + message.doubleChk);
			bizNo.trigger('focus');
			return false;
		}

		if (imageFile.length === 0)
		{
			sweetToast('프로필 이미지는 ' + message.required);
			profileImage.trigger('focus');
			return false;
		}

		if (isEmpty(homepage.val()))
		{
			sweetToast('홈페이지 링크는 ' + message.required);
			homepage.trigger('focus');
			return false;
		}

		if (!isDomainName(homepage.val().trim()))
		{
			sweetToast('홈페이지 링크 형식을 ' + message.doubleChk);
			homepage.trigger('focus');
			return false;
		}

		if (isEmpty(bizDesc.val()))
		{
			sweetToast('소개내용은 ' + message.required);
			bizDesc.trigger('focus');
			return false;
		}

		return true;
	}

	function onSubmitBiz()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		$.ajax({
			url: api.createBiz,
			type: "POST",
			processData: false,
			contentType: false,
			headers: headers,
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
		location.href = page.listBiz;
	}

	function params()
	{
		let paramFile = profileImage[0].files[0];
		let formData  = new FormData();
		formData.append('company-name', bizName.val().trim());
		formData.append('company-number', bizNoFormatter(bizNo.val()));
		formData.append('company-url', homepage.val().trim());
		formData.append('company-contents', bizDesc.val().trim());
		formData.append('company-image', paramFile);

		return formData;
	}