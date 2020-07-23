
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
		$.ajax({
			url: api.detailBiz,
			type: "POST",
			data: detailParams(),
			headers: headers,
			dataType: 'json',
			success: function(data) {
				if (isSuccessResp(data))
					buildDetail(data);
				else
					sweetError(invalidResp(data))
			},
			error: function (request, status) {
				sweetError(label.detailContent+message.ajaxLoadError);
			}
		});
	}

	function detailParams()
	{
		let pathName  = getPathName();
		let bizIdx	  = splitReverse(pathName, '/');

		return JSON.stringify({"idx" : bizIdx});
	}

	function buildDetail(data)
	{
		let detail = data.data;
		let thumbnailDom = '';
		thumbnailDom += '<div class="upload-display">';
		thumbnailDom += 	'<div class="upload-thumb-wrap">';
		thumbnailDom += 		'<img src="'+detail.image_path+'" class="upload-thumb">';
		thumbnailDom += 	'</div>';
		thumbnailDom += '</div>';
		thumbnailWarp.prepend(thumbnailDom);
		bizName.html(detail.company_name);
		bizNumber.html(detail.company_number);
		bizLink.val(detail.url);
		bizDesc.val(detail.contents);
	}

	function validation()
	{
		if (isEmpty(bizLink.val()))
		{
			sweetToast('홈페이지 링크는 ' + message.required);
			bizLink.trigger('focus');
			return false;
		}

		if (!isDomainName(bizLink.val()))
		{
			sweetToast('홈페이지 링크 형식을 ' + message.doubleChk);
			bizLink.trigger('focus');
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

	function params()
	{
		let pathName  = getPathName();
		let bizIdx	  = splitReverse(pathName, '/');
		let paramFile = profileImage[0].files[0];
		let formData  = new FormData();
		formData.append('company-idx', bizIdx);
		formData.append('company-url', bizLink.val().trim());
		formData.append('company-contents', bizDesc.val().trim());
		formData.append('company-image', paramFile);

		return formData;
	}

	function onSubmitBiz()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		$.ajax({
			url: api.updateBiz,
			type: "POST",
			processData: false,
			contentType: false,
			headers: headers,
			dataType: 'json',
			data: params(),
			success: function(data) {
				sweetToastAndCallback(data, updateSuccess);
			},
			error: function (request, status) {
				sweetError(label.submit+message.ajaxError);
			}
		});
	}

	function updateSuccess()
	{
		location.href = page.listBiz;
	}

