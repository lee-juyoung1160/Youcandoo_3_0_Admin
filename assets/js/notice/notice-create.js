
	const title 	= $("#title");
	const content	= $("#summernote");
	const reserveDate	= $("#reserveDate");
	const exposure	= $("input[name=radio-exposure]");
	const btnSubmit = $("#btnSubmit");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		/** 예약일 초기화 **/
		setDateToday();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 에디터 초기화 **/
		initSummerNote();
		/** input 글자 수 체크 **/
		checkInputLength();

		/** 이벤트 **/
		btnSubmit.on('click', function () { onSubmitNotice(); });
	});

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

		if (content.summernote('isEmpty'))
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

	function onSubmitNotice()
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
						console.log(xhr.status);
						console.log(thrownError);
					}
				});
			}
		}
	}

	function params()
	{
		let param = {
			'notice_title' : title.val().trim()
			,'notice_contents' : content.val().trim()
			,'reservation_date' : reserveDate.val().trim()
			,'is_exposure' : $('input:radio[name=radio-exposure]:checked').val()
			,'create_user' : sessionUserId.val()
		}

		return JSON.stringify(param);
	}

