
	const selFaqType	= $("#selFaqType");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit 	= $("#btnSubmit");

	$( () => {
		/** faq 구분 **/
		getFaqType();
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		btnSubmit.on('click', function () { onSubmitFaq(); });
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
				sweetError('구분 '+label.list+message.ajaxLoadError);
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
		onChangeSelectOption(selFaqType);
	}

	function initComponent()
	{
		title.focus();
		title.val('');
		content.val('');
		exposure.eq(0).prop('checked', true);
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

	function onSubmitFaq()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		$.ajax({
			url: api.createFaq,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: params(),
			success: function(data) {
				sweetToastAndCallback(data, createSuccess);
			},
			error: function (request, status) {
				sweetError(label.submit+message.ajaxError);
			}
		});
	}

	function createSuccess()
	{
		location.href = page.listFaq
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

