
	const bizName 		= $("#bizName");
	const bizNumber		= $("#bizNumber");
	const thumbnailWarp = $(".preview-image");
	const profileImage	= $("#bizProfileImg");
	const bizLink		= $("#bizLink");
	const bizDesc		= $("#bizDesc");
	const btnSubmit		= $("#btnSubmit");

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		profileImage.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitBiz(); });
	});

	function getDetail()
	{
		let url 	= api.detailBiz;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, detailParams(), getDetailCallback, errMsg, false);
	}

	function detailParams()
	{
		let pathName  = getPathName();
		let bizIdx	  = splitReverse(pathName, '/');

		return JSON.stringify({"idx" : bizIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	function buildDetail(data)
	{
		let detail = data.data;
		let thumbnailDom =
			`<div class="upload-display">
				<div class="upload-thumb-wrap">
					<img src="${detail.image_path}" class="upload-thumb">
				</div>
			</div>`
		thumbnailWarp.prepend(thumbnailDom);
		bizName.html(detail.company_name);
		bizNumber.html(detail.company_number);
		bizLink.val(detail.url);
		bizDesc.val(detail.contents);
	}

	function onSubmitBiz()
	{
		if (validation())
		{
			let imageFile = profileImage[0].files;
			let requestFn = imageFile.length === 0 ? updateRequest : fileUploadReq;
			sweetConfirm(message.modify, requestFn);
		}
	}

	function fileUploadReq()
	{
		let url = fileApi.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', profileImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			let url 	  = api.updateBiz;
			let errMsg 	  = label.submit+message.ajaxError;
			let pathName  = getPathName();
			let bizIdx	  = splitReverse(pathName, '/');
			let param = {
				"company_idx" : bizIdx,
				"company_url" : bizLink.val().trim(),
				"company_contents" : bizDesc.val().trim(),
			}

			if (!isEmpty(data))
			{
				let { file } = data.image_urls;
				param["company_image"] = file;
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
		location.href = page.listBiz;
	}

	function validation()
	{
		if (isEmpty(bizLink.val()))
		{
			sweetToast(`홈페이지 링크는 ${message.required}`);
			bizLink.trigger('focus');
			return false;
		}

		if (!isDomainName(bizLink.val()))
		{
			sweetToast(`홈페이지 링크 형식을 ${message.doubleChk}`);
			bizLink.trigger('focus');
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
