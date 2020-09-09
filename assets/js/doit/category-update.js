
	const categoryName 	= $("#categoryName");
	const categoryImage	= $("#categoryImage");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit		= $("#btnSubmit");

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		/*contentImage.on('change', function () { onChangeValidationImage(this); });*/
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
		let { idx, category, is_blind } = data.data;

		g_idx = idx;

		categoryName.val(category);
		/*if (!isEmpty(detail.notice_image_url))
		{
			let imageEL =
				`<div class="upload-display">
					<div class="upload-thumb-wrap">
						<img src="${detail.notice_image_url}" class="upload-thumb">
					</div>
				</div>`

			categoryImage.parent().prepend(imageEL);
		}*/
		exposure.each(function () {
			if ($(this).val() === is_blind)
				$(this).prop('checked', true);
		});

		calculateInputLength();
	}

	function onSubmitUpdateCategory()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		let url 	= api.updateDoitCategory;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, params(), updateReqCallback, errMsg, false);
	}

	function params()
	{
		/*let formData  = new FormData();
		formData.append('notice_uuid', g_notice_uuid);
		formData.append('notice_title', title.val().trim());
		formData.append('notice_contents', replaceInputTextarea(content.val().trim()));
		formData.append('reservation_date', reserveDate.val());
		formData.append('is_exposure', $('input:radio[name=radio-exposure]:checked').val());
		formData.append('notice_image', contentImage[0].files[0]);
		formData.append('create_user', sessionUserId.val());

		return formData;*/

		return JSON.stringify({ "idx" : g_idx, "category" : categoryName.val(), "is_blind" : $('input:radio[name=radio-exposure]:checked').val()});
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


