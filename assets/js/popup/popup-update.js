
	/*const market	= $("input[name=radio-market]");
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
		/!** 데이트피커 초기화 **!/
		initInputTodayDatepicker();
		initDateRangeLimit();
		/!** 상세 불러오기 **!/
		getDetail();
		/!** 이벤트 **!/
		digit     	.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); validDigit(this);});
		decimal     .on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		btnSubmit	.on('click', function () { onSubmitUpdatePopup(); });
	});

	function validDigit(obj)
	{
		let inputValue = $(obj).val();
		let inputValueArr = inputValue.split("");
		if (inputValueArr[0] == 0)
			$(obj).val(0);
	}

	function initDateRangeLimit()
	{
		datePicker.datepicker("option", "minDate", "today");
	}

	function getDetail()
	{
		let url 	= api.detailPopup;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, detailParams(), getDetailCallback, errMsg, false);
	}

	function detailParams()
	{
		const pathName	= getPathName();
		const popupIdx	= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : popupIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	let g_popup_uuid;
	function buildDetail(data)
	{
		let detail = data.data;

		g_popup_uuid = detail.popup_uuid;

		market.each(function () {
			if ($(this).val() === detail.store)
				$(this).prop('checked', true);
		});
		title.val(detail.popup_name);

		let targetVer = detail.target_version.toString();
		let splitTargetVer = targetVer.split('.');
		digit.val(splitTargetVer[0]);
		decimal.val(splitTargetVer[1]);
		popupLink.val(detail.popup_url);
		closeOpt.each(function () {
			if ($(this).val() === detail.close_type)
				$(this).prop('checked', true);
		});
		popupFrom.val(detail.start_date);
		popupTo.val(detail.end_date);
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
		let url 	= api.updatePopup;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, params(), updateReqCallback, errMsg, false);
	}

	function params()
	{
		let param = {
			"popup_uuid": g_popup_uuid,
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

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
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
	}*/
