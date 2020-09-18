
	const market	= $("input[name=radio-market]");
	const title 	= $("#title");
	/*const digit		= $("#digit");
	const decimal	= $("#decimal");*/
	const popupLink	= $("#popupLink");
	const closeOpt	= $("input[name=radio-close-option]");
	const popupFrom	= $("#popupFrom");
	const popupTo	= $("#popupTo");
	const exposure	= $("input[name=radio-exposure]");
	const btnSubmit = $("#btnSubmit");

	$( () => {
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		initDateRangeLimit();
		/** 상세 불러오기 **/
		/*getDetail();*/
		/** 이벤트 **/
		btnSubmit	.on('click', function () { onSubmitUpdatePopup(); });
	});

	function initDateRangeLimit()
	{
		datePicker.datepicker("option", "minDate", "today");
	}

	function getDetail()
	{
		let url 	= api.detailNotice;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, detailParams(), getDetailCallback, errMsg, false);
	}

	function detailParams()
	{
		const pathName	= getPathName();
		const noticeIdx	= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : noticeIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	let g_notice_uuid;
	function buildDetail(data)
	{
		let detail = data.data;

		g_notice_uuid = detail.notice_uuid;

		market.each(function () {
			if ($(this).val() === detail.is_exposure)
				$(this).prop('checked', true);
		});
		title.val(detail.title);
		popupLink.val();
		closeOpt.each(function () {
			if ($(this).val() === detail.is_exposure)
				$(this).prop('checked', true);
		});
		popupFrom.val(detail.reservation_date);
		popupTo.val(detail.reservation_date);
		exposure.each(function () {
			if ($(this).val() === detail.is_exposure)
				$(this).prop('checked', true);
		});
		calculateInputLength();
	}

	function onSubmitUpdatePopup()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		let url 	= api.updateNotice;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, params(), updateReqCallback, errMsg, false);
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

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
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


