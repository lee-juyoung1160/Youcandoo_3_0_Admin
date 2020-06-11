
	const title 		= $("#title");
	const content		= $("#content");
	const contentImage	= $("#contentImage");
	const reserveDate	= $("#reserveDate");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit		= $("#btnSubmit");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		contentImage.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateNotice(); });
	});

	function getDetail()
	{
		$.ajax({
			url: api.detailNotice,
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
				alert(label.detailContent+message.ajaxLoadError);
			}
		});
	}

	function detailParams()
	{
		const pathName	= getPathName();
		const noticeIdx	= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : noticeIdx});
	}

	let g_notice_uuid;
	function buildDetail(data)
	{
		let detail = data.data;

		g_notice_uuid = detail.notice_uuid;

		title.val(detail.title);
		content.val(replaceSelectTextarea(detail.notice_contents));
		if (!isEmpty(detail.notice_image_url))
		{
			let contentImageDom = '';
			contentImageDom += '<div class="upload-display">';
			contentImageDom += 	'<div class="upload-thumb-wrap">';
			contentImageDom += 		'<img src="'+detail.notice_image_url+'" class="upload-thumb">';
			contentImageDom += 	'</div>';
			contentImageDom += '</div>';

			contentImage.parent().prepend(contentImageDom);
		}
		reserveDate.val(detail.reservation_date);
		exposure.each(function () {
			if ($(this).val() === detail.is_exposure)
				$(this).prop('checked', true);
		});
		calculateInputLength();
	}

	function onSubmitUpdateNotice()
	{
		if (validation())
		{
			if (confirm(message.modify))
			{
				$.ajax({
					url: api.updateNotice,
					type: "POST",
					processData: false,
					contentType: false,
					headers: headers,
					dataType: 'json',
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listNotice
					},
					error: function (request, status) {
						alert(label.modify+message.ajaxError);
					}
				});
			}
		}
	}

	function params()
	{
		let formData  = new FormData();
		formData.append('notice_uuid', g_notice_uuid);
		formData.append('notice_title', title.val().trim());
		formData.append('notice_contents', replaceInputTextarea(content.val().trim()));
		formData.append('reservation_date', reserveDate.val());
		formData.append('is_exposure', $('input:radio[name=radio-exposure]:checked').val());
		formData.append('notice_image', contentImage[0].files[0]);
		formData.append('create_user', sessionUserId.val());

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


