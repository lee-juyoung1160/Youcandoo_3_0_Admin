
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
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let url 	= api.createDoitCategory;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithFormData(true, url, params(), createReqCallback, errMsg, false);
	}

	function params()
	{
		/*let formData  = new FormData();
		formData.append('notice_title', title.val().trim());
		formData.append('is_exposure', $('input:radio[name=radio-exposure]:checked').val());
		formData.append('notice_image', categoryImage[0].files[0]);
		formData.append('create_user', sessionUserId.val());

		return formData;*/

		return JSON.stringify({"category" : categoryName.val(), "is_blind" : $('input:radio[name=radio-exposure]:checked').val()});
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
			title.trigger('focus');
			return false;
		}

		/*if (isEmpty(content.val()))
		{
			sweetToast(`카테고리 이미지 ${message.required}`);
			content.trigger('focus');
			return false;
		}*/

		return true;
	}

