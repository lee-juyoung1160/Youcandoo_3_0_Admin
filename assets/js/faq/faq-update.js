
	const selFaqType	= $("#selFaqType");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit		= $("#btnSubmit");

	$( () => {
		/** faq 구분 **/
		getFaqType();
		/** 이벤트 **/
		btnSubmit.on('click', function () { onSubmitUpdateFaq(); });
	});

	function getFaqType()
	{
		$.ajax({
			url: api.getFaqType,
			type: "POST",
			headers: headers,
			dataType: 'json',
			success: function(data) {
				if (isSuccessResp(data))
					buildFaqType(data);
				else
					sweetError(invalidResp(data));
			},
			error: function (request, status) {
				sweetError('구분 '+label.list+message.ajaxError);
			},
			complete: function (xhr, status) {
				getDetail();
			}
		});
	}

	function buildFaqType(data)
	{
		let detailData 	= data.data;
		let dataLen 	= detailData.length;
		let optionDom 	= '';

		for (let i=0; i<dataLen; i++)
		{
			let value = detailData[i].type;
			let name  = detailData[i].faq_name;

			optionDom += '<option value="'+value+'">'+name+'</option>';
		}

		selFaqType.html(optionDom);
	}

	function getDetail()
	{
		$.ajax({
			url: api.detailFaq,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: detailParams(),
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
		const pathName		= getPathName();
		const faqIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : faqIdx});
	}

	let g_faq_uuid;
	function buildDetail(data)
	{
		let detail = data.data;

		g_faq_uuid = detail.faq_uuid;
		selFaqType.val(detail.faq_type);
		onChangeSelectOption(selFaqType);
		title.val(detail.title);
		content.val(replaceSelectTextarea(detail.contents));
		exposure.each(function () {
			if ($(this).val() === detail.is_exposure)
				$(this).prop('checked', true);
		});
		calculateInputLength();
	}

	function onSubmitUpdateFaq()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		$.ajax({
			url: api.updateFaq,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: params(),
			success: function(data) {
				sweetToastAndCallback(data, updateSuccess);
			},
			error: function (request, status) {
				sweetError(label.modify+message.ajaxError);
			}
		});
	}

	function updateSuccess()
	{
		location.href = page.listFaq
	}

	function params()
	{
		let param = {
			"faq_uuid" : g_faq_uuid
			,"title" : title.val().trim()
			,"contents" : replaceInputTextarea(content.val().trim())
			,"faq_type" : selFaqType.val()
			,"is_exposure" : $('input:radio[name=radio-exposure]:checked').val()
			,"updated_user" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast('제목은 ' + message.required);
			title.focus();
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast('내용은 ' + message.required);
			content.focus();
			return false;
		}

		return true;
	}


