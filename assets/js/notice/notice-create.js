
	const title 	= $("#title");
	const content	= $("#content");
	const contentImage	= $("#contentImage");
	const reserveDate	= $("#reserveDate");
	const exposure	= $("input[name=radio-exposure]");
	const btnSubmit = $("#btnSubmit");

	$( () => {
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		/** 예약일 초기화 **/
		setDateToday();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		contentImage.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitNotice(); });
	});

	function initComponent()
	{
		title.trigger('focus');
		title.val('');
		content.val('');
		exposure.eq(0).prop('checked', true);
	}

	function onSubmitNotice()
	{
		if (validation())
		{
			let imageFile = contentImage[0].files;
			let requestFn = imageFile.length === 0 ? createRequest : fileUploadReq;

			sweetConfirm(message.create, requestFn);
		}
	}

	function fileUploadReq()
	{
		let url = fileApi.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			let url 	= api.createNotice;
			let errMsg 	= label.submit+message.ajaxError;
			let param = {
				"notice_title" : title.val().trim(),
				"notice_contents" : replaceInputTextarea(content.val().trim()),
				"reservation_date" : reserveDate.val(),
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
			}

			if (!isEmpty(data))
			{
				let { file } = data.image_urls;
				param["notice_image"] = file;
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		if ($('input:radio[name=radio-exposure]:checked').val() === 'Y')
			sweetConfirmWithCancelCallback(message.moveToCreatePush, redirectPushCreate, redirectList);
		else
			redirectList();
	}

	function redirectPushCreate()
	{
		let form   = $("<form></form>");
		form.prop("method", "post");
		form.prop("action", page.createPush);
		form.append($("<input/>", {type: 'hidden', name: 'req_page', value: 'notice'}));
		form.append($("<input/>", {type: 'hidden', name: 'req_content', value: title.val().trim()}));
		form.appendTo("body");
		form.submit();
	}

	function redirectList()
	{
		location.href = page.listNotice;
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

		if (isEmpty(reserveDate.val()))
		{
			sweetToast(`예약일은 ${message.required}`);
			reserveDate.trigger('focus');
			return false;
		}

		return true;
	}

