
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
			sweetToast(`회사명은 ${message.required}`);
			bizName.trigger('focus');
			return false;
		}

		if (isEmpty(bizNo.val()))
		{
			sweetToast(`사업자번호는 ${message.required}`);
			bizNo.trigger('focus');
			return false;
		}

		if (bizNo.val().trim().length !== 10)
		{
			sweetToast(`사업자번호를 ${message.doubleChk}`);
			bizNo.trigger('focus');
			return false;
		}

		if (imageFile.length === 0)
		{
			sweetToast(`프로필 이미지는 ${message.required}`);
			profileImage.trigger('focus');
			return false;
		}

		if (isEmpty(homepage.val()))
		{
			sweetToast(`홈페이지 링크는 ${message.required}`);
			homepage.trigger('focus');
			return false;
		}

		if (!isDomainName(homepage.val().trim()))
		{
			sweetToast(`홈페이지 링크 형식을 ${message.doubleChk}`);
			homepage.trigger('focus');
			return false;
		}

		if (isEmpty(bizDesc.val()))
		{
			sweetToast(`소개내용은 ${message.required}`);
			bizDesc.trigger('focus');
			return false;
		}

		return true;
	}

	function onSubmitBiz()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let url = fileApi.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', profileImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		let url 	= api.createBiz;
		let errMsg 	= label.submit+message.ajaxError;
		let { file } = data.image_urls;
		let param = {
			"company_name" : bizName.val().trim(),
			"company_number" : bizNoFormatter(bizNo.val()),
			"company_url" : homepage.val().trim(),
			"company_contents" : bizDesc.val().trim(),
			"company_image" : file,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listBiz;
	}
