
	const selFaqType	= $("#selFaqType");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {
		/** faq 구분 **/
		getFaqType();
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** input 글자 수 체크 **/
		checkInputLength();
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
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert(message.ajaxError);
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
			alert('제목은 ' + message.required);
			title.focus();
			return false;
		}

		if (isEmpty(content.val()))
		{
			alert('내용은 ' + message.required);
			content.focus();
			return false;
		}

		return true;
	}

	function onSubmitFaq()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createFaq,
					type: "POST",
					headers: headers,
					dataType: 'json',
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listFaq
					},
					error: function (request, status) {
						alert(message.ajaxError);
					}
				});
			}
		}
	}

	function params()
	{
		let param = {
			"faqTitle" : title.val().trim()
			,"faqContents" : content.val().trim()
			,"faqType" : selFaqType.val()
			,"isExposure" : $('input:radio[name=radio-exposure]:checked').val()
			,"create_user" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}

