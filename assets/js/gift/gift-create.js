
	const giftName 	= $("#giftName");
	const giftImage	= $("#giftImage");
	const price		= $("#price");
	const exposure	= $("input[name=radio-exposure]");
	const btnSubmit = $("#btnSubmit");

	$( () => {
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		giftImage	.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitCategory(); });
	});

	function initComponent()
	{
		giftName.trigger('focus');
		giftName.val('');
		price.val('');
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
		param.append('file', giftImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			let url 	= api.createGift;
			let errMsg 	= label.submit+message.ajaxError;
			let { file } = data.image_urls;
			let param = {
				"gift_name" : giftName.val(),
				"gift_ucd" : price.val(),
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
				"gift_image" : file
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
		location.href = page.listGift;
	}

	function validation()
	{
		if (isEmpty(giftName.val()))
		{
			sweetToast(`상품명은 ${message.required}`);
			giftName.trigger('focus');
			return false;
		}

		if (isEmpty(price.val()))
		{
			sweetToast(`금액은 ${message.required}`);
			price.trigger('focus');
			return false;
		}

		let giftFile = giftImage[0].files;
		if (giftFile.length === 0)
		{
			sweetToast(`상품 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}

