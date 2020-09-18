
	const market	= $("input[name=radio-market]");
	const title 	= $("#title");
	const digit		= $("#digit");
	const decimal	= $("#decimal");
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
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		digit     	.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); validDigit(this);});
		decimal     .on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		/*btnSubmit	.on('click', function () { onSubmitPopup(); });*/
	});

	function validDigit(obj)
	{
		let inputValue = $(obj).val();
		let inputValueArr = inputValue.split("");
		if (inputValueArr[0] == 0)
			$(obj).val(0);
	}

	function initComponent()
	{
		market.eq(0).prop('checked', true);
		title.trigger('focus');
		title.val('');
		digit.val('');
		decimal.val('');
		popupLink.val('');
		closeOpt.eq(0).prop('checked', true);
		exposure.eq(0).prop('checked', true);
		initDateRange();
	}

	function initDateRange()
	{
		popupFrom.datepicker("setDate", "today");
		popupTo.datepicker("setDate", "7d");
	}

	function initDateRangeLimit()
	{
		datePicker.datepicker("option", "minDate", "today");
	}

	function onSubmitPopup()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let url 	= api.createNotice;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, params(), createReqCallback, errMsg, false);
	}

	function params()
	{
		let formData  = new FormData();
		formData.append('notice_title', title.val().trim());
		formData.append('notice_contents', replaceInputTextarea(content.val().trim()));
		formData.append('reservation_date', reserveDate.val());
		formData.append('is_exposure', $('input:radio[name=radio-exposure]:checked').val());
		formData.append('notice_image', contentImage[0].files[0]);
		formData.append('create_user', sessionUserId.val());

		return formData;
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
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

		if (isEmpty(digit.val()))
		{
			sweetToast(`앱버전은 ${message.required}`);
			digit.trigger('focus');
			return false;
		}

		if (isEmpty(decimal.val()))
		{
			sweetToast(`앱버전은 ${message.required}`);
			decimal.trigger('focus');
			return false;
		}

		if (isEmpty(popupLink.val()))
		{
			sweetToast(`링크는 ${message.required}`);
			popupLink.trigger('focus');
			return false;
		}

		return true;
	}

