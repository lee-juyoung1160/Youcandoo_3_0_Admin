
	/*const giftCode 	= $("#giftCode");*/
	const giftName 	= $("#giftName");
	const giftImage	= $("#giftImage");
	const giftUcd	= $("#giftUcd");
	const exposure	= $("input[name=radio-exposure]");
	const btnSubmit = $("#btnSubmit");

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		giftImage	.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateGift(); });
	});

	function getDetail()
	{
		let url 	= api.detailGift;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, detailParams(), getDetailCallback, errMsg, false);
	}

	function detailParams()
	{
		const pathName	= getPathName();
		const categoryIdx	= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : categoryIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	let g_gift_uuid;
	function buildDetail(data)
	{
		let { gift_uuid, gift_name, is_exposure, gift_ucd, gift_image_url } = data.data;

		g_gift_uuid = gift_uuid;
		giftName.val(gift_name);
		giftUcd.val(gift_ucd);
		if (!isEmpty(gift_image_url))
		{
			let imageEL =
				`<div class="upload-display">
					<div class="upload-thumb-wrap">
						<img src="${gift_image_url}" class="upload-thumb" onerror="onErrorImage(this)">
					</div>
				</div>`

			giftImage.parent().prepend(imageEL);
		}
		exposure.each(function () {
			if ($(this).val() === is_exposure)
				$(this).prop('checked', true);
		});

		calculateInputLength();
	}

	function onSubmitUpdateGift()
	{
		if (validation())
		{
			let imageFile = giftImage[0].files;
			let requestFn = imageFile.length === 0 ? updateRequest : fileUploadReq;

			sweetConfirm(message.modify, requestFn);
		}
	}

	function fileUploadReq()
	{
		let url = fileApi.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', giftImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			let url 	= api.updateGift;
			let errMsg 	= label.modify+message.ajaxError;
			let param = {
				"gift_uuid" : g_gift_uuid,
				"gift_name" : giftName.val().trim(),
				"gift_ucd" : giftUcd.val().trim(),
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
			}

			if (!isEmpty(data))
			{
				let { file } = data.image_urls;
				param["gift_image"] = file;
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.listGift;
	}

	function validation()
	{
		if (isEmpty(giftName.val())) {
			sweetToast(`상품명 ${message.required}`);
			giftName.trigger('focus');
			return false;
		}

		if (isEmpty(giftUcd.val())) {
			sweetToast(`금액 ${message.required}`);
			giftUcd.trigger('focus');
			return false;
		}

		return true;
	}


