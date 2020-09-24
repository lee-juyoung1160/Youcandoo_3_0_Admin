
	const categoryName 	= $("#categoryName");
	const categoryImage	= $("#categoryImage");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit 	= $("#btnSubmit");

	$( () => {
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		categoryImage	.on('change', function () { onChangeValidationImage(this); });
		btnSubmit		.on('click', function () { onSubmitCategory(); });
	});

	function initComponent()
	{
		categoryName.trigger('focus');
		categoryName.val('');
		exposure.eq(0).prop('checked', true);
	}

	function onSubmitCategory()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let url = fileApi.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', categoryImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			let url 	= api.createDoitCategory;
			let errMsg 	= label.submit+message.ajaxError;
			let { file } = data.image_urls;
			let param = {
				"category" : categoryName.val(),
				"is_blind" : $('input:radio[name=radio-exposure]:checked').val(),
				"icon_image_url" : file
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listDoitCategory;
	}

	function validation()
	{
		if (isEmpty(categoryName.val()))
		{
			sweetToast(`카테고리 명은 ${message.required}`);
			categoryName.trigger('focus');
			return false;
		}

		let categoryFile = categoryImage[0].files;
		if (categoryFile.length === 0)
		{
			sweetToast(`카테고리 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}

