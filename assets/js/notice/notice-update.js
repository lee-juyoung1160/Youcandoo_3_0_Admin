
	const title 		= $("#title");
	const content		= $("#summernote");
	const reserveDate	= $("#reserveDate");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit		= $("#btnSubmit");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		/** 에디터 초기화 **/
		initSummerNote();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnSubmit.on('click', function () { onSubmitUpdateNotice(); });
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
		content.summernote('code', detail.contents);
		reserveDate.val(detail.reservation_date);
		exposure.each(function () {
			if ($(this).val() === detail.is_exposure)
				$(this).prop('checked', true);
		})
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
		let param = {
			'notice_uuid' : g_notice_uuid
			,'title' : title.val().trim()
			,'contents' : content.val().trim()
			,'reservation_date' : reserveDate.val().trim()
			,'is_exposure' : $('input:radio[name=radio-exposure]:checked').val()
			,'updated_user' : sessionUserId.val()
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

		if (isEmpty(reserveDate.val()))
		{
			alert('예약일은 ' + message.required);
			reserveDate.focus();
			return false;
		}

		return true;
	}


