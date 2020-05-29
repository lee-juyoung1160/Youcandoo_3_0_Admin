
	const selFaqType	= $("#selFaqType");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit		= $("#btnSubmit");

	$(document).ready(function () {
		/** faq 구분 **/
		getFaqType();
		/** input 글자 수 체크 **/
		checkInputLength();

		/** 이벤트 **/
		//btnSubmit.on('click', function () { onSubmitUpdateFaq(); });
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

		/** 상세 불러오기 **/
		getDetail();
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
					alert(invalidResp(data))
			},
			error: function (request, status) {
				alert(message.ajaxError);
			}
		});
	}

	function detailParams()
	{
		const pathName		= getPathName();
		const faqIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : faqIdx});
	}

	function buildDetail(data)
	{
		let detailData = data.data;

		selFaqType.val(detailData.faq_type);
		onChangeSelectOption(selFaqType);
		title.val(detailData.title);
		content.val(detailData.contents);
		exposure.each(function () {
			if ($(this).val() === detailData.is_exposure)
				$(this).prop('checked', true);
		})
	}

	function onSubmitUpdateFaq()
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


