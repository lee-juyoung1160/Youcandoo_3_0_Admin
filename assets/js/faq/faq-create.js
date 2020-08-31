
	const selFaqType	= $("#selFaqType");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit 	= $("#btnSubmit");

	$( () => {
		/** faq 구분 **/
		getFaqType();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		btnSubmit.on('click', function () { onSubmitFaq(); });
	});

	function getFaqType()
	{
		let url 	= api.getFaqType;
		let errMsg 	= `구분 ${label.list} ${message.ajaxLoadError}`;

		ajaxRequestWithJsonData(false, url, null, getFaqTypeCallback, errMsg, false);
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

			optionDom += `<option value="${value}">${name}</option>`
		}

		selFaqType.html(optionDom);
		onChangeSelectOption(selFaqType);
	}

	function initComponent()
	{
		title.trigger('focus');
		title.val('');
		content.val('');
		exposure.eq(0).prop('checked', true);
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			content.trigger('focus');
			return false;
		}

		return true;
	}

	function onSubmitFaq()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let url 	= api.createFaq;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, params(), createReqCallback, errMsg, false);
	}

	function params()
	{
		let param = {
			"title" : title.val().trim()
			,"contents" : replaceInputTextarea(content.val().trim())
			,"faq_type" : selFaqType.val()
			,"is_exposure" : $('input:radio[name=radio-exposure]:checked').val()
			,"created_user" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listFaq
	}
