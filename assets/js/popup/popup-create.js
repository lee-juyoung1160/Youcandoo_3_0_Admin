
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
		btnSubmit	.on('click', function () { onSubmitPopup(); });
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
		let url 	= api.createPopup;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, params(), createReqCallback, errMsg, false);
	}

	function params()
	{
		let param = {
			"store": $("input[name=radio-market]:checked").val(),
			"popup_name": title.val().trim(),
			"target_version": `${digit.val()}.${decimal.val()}`,
			"popup_url": popupLink.val().trim(),
			"close_type": $("input[name=radio-close-option]:checked").val(),
			"start_date": popupFrom.val(),
			"end_date": popupTo.val(),
			"is_exposure": $("input[name=radio-exposure]:checked").val()
		}

		return JSON.stringify(param);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listPopup;
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

		if (!isDomainName(popupLink.val().trim()))
		{
			sweetToast(`링크 형식을 ${message.doubleChk}`);
			popupLink.trigger('focus');
			return false;
		}

		return true;
	}

