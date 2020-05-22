
	const title 		= $("#title");
	const content		= $("#summernote");
	const reserveDate	= $("#reserveDate");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit		= $("#btnSubmit");

	$(document).ready(function () {
		/** 에디터 초기화 **/
		initSummerNote();
		/** 상세 불러오기 **/
		getDetail();

		//btnSubmit.on('click', function () { onSubmitUpdateNotice(); });
	});

	function getDetail()
	{
		$.ajax({
			url: api.detailNotice,
			type: "POST",
			data: detailParams(),
			headers: headers,
			success: function(data) {
				if (isSuccessResp(data))
					buildDetail(data);
				else
					alert(invalidResp(data))
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(thrownError);
			}
		});
	}

	function detailParams()
	{
		const pathName		= getPathName();
		const noticeIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : noticeIdx});
	}

	function buildDetail(data)
	{
		let jsonData = JSON.parse(data);
		title.val(jsonData.data.title);
		content.summernote('code', jsonData.data.contents);
		reserveDate.val(jsonData.data.reservation_date);
		exposure.each(function () {
			if ($(this).val() === jsonData.data.is_exposure)
				$(this).prop('checked', true);
		})
	}

	function onSubmitUpdateNotice()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createNotice,
					type: "POST",
					processData: false,
					contentType: false,
					data: params(),
					headers: headers,
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listNotice
					},
					error: function (xhr, ajaxOptions, thrownError) {
						console.log(thrownError);
					}
				});
			}
		}
	}

	function params()
	{
		let formData  = new FormData();
		formData.append('notice-title', title.val().trim());
		formData.append('notice-contents', content.val().trim());
		formData.append('reservation-date', datePicker.val());
		formData.append('is-exposure', $('input:radio[name=radio-exposure]:checked').val());

		return formData;
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

		if (isEmpty(reserveDate.val()))
		{
			alert('예약일은 ' + message.required);
			reserveDate.focus();
			return false;
		}

		return true;
	}


