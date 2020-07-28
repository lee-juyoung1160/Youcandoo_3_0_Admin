
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
		let url 	= api.getFaqType;
		let errMsg 	= '구분 '+label.list+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, null, getFaqTypeCallback, errMsg, getDetail);
	}

	function getFaqTypeCallback(data)
	{
		isSuccessResp(data) ? buildFaqType(data) : sweetError(invalidResp(data));
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
		let url 	= api.detailFaq;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, detailParams(), getDetailCallback, errMsg, false);
	}

	function detailParams()
	{
		const pathName		= getPathName();
		const faqIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : faqIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
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
		let url 	= api.updateFaq;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, params(), updateReqCallback, errMsg, false);
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

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.listFaq
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast('제목은 ' + message.required);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast('내용은 ' + message.required);
			content.trigger('focus');
			return false;
		}

		return true;
	}


