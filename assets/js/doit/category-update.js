
	const categoryName 	= $("#categoryName");
	const categoryImage	= $("#categoryImage");
	const establish		= $("input[name=radio-establish]");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit		= $("#btnSubmit");

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		categoryImage.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateCategory(); });
	});

	function getDetail()
	{
		let url 	= api.detailDoitCategory;
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

	let g_idx;
	function buildDetail(data)
	{
		let { idx, category, is_blind, is_establish, icon_image_url } = data.data;
		g_idx = idx;

		categoryName.val(category);
		if (!isEmpty(icon_image_url))
		{
			let imageEL =
				`<div class="upload-display">
					<div class="upload-thumb-wrap">
						<img src="${icon_image_url}" class="upload-thumb">
					</div>
				</div>`

			categoryImage.parent().prepend(imageEL);
		}
		exposure.each(function () {
			if ($(this).val() === is_blind)
				$(this).prop('checked', true);
		});
		establish.each(function () {
			if ($(this).val() === is_establish)
				$(this).prop('checked', true);
		});

		calculateInputLength();
	}

	function onSubmitUpdateCategory()
	{
		if (validation())
		{
			let imageFile = categoryImage[0].files;
			let requestFn = imageFile.length === 0 ? updateRequest : fileUploadReq;

			sweetConfirm(message.modify, requestFn);
		}
	}

	function fileUploadReq()
	{
		let url = fileApi.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', categoryImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			let url 	= api.updateDoitCategory;
			let errMsg 	= label.modify+message.ajaxError;
			let param = {
				"idx" : g_idx,
				"category" : categoryName.val().trim(),
				"is_blind" : $('input:radio[name=radio-exposure]:checked').val(),
				"is_establish" : $('input:radio[name=radio-establish]:checked').val(),
			}

			if (!isEmpty(data))
			{
				let { file } = data.image_urls;
				param["icon_image_url"] = file;
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
		location.href = page.listDoitCategory;
	}

	function validation()
	{
		if (isEmpty(categoryName.val())) {
			sweetToast(`카테고리명 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		return true;
	}


