
	const env = $("#env");
	const btnProStart 	= $("#btnProStart");
	const btnDoitStart 	= $("#btnDoitStart");

	$( () => {
		toggleStartButton();

		btnProStart.on("click", function () { promoStart(); });
		btnDoitStart.on("click", function () { sweetError('아직 구현 안됨.ㅋㅋ') })
	})

	function toggleStartButton()
	{
		const accessibleAuthCodes = env.val() === 'development' ? ['dev', 'smg'] : ['smg'];

		if (accessibleAuthCodes.indexOf(sessionAuthCode.val()) === -1)
		{
			try {
				btnProStart.remove();
			} catch (e) {}

			try {
				btnDoitStart.remove();
			} catch (e) {}
		}
		else
		{
			try {
				btnProStart.show();
			} catch (e) {}

			try {
				btnDoitStart.show();
			} catch (e) {}
		}
	}

	function promoStart()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast('대상을 선택하세요.');
			return;
		}

		sweetConfirm('확인을 누르면 해당 프로모션이 진행 중 상태로 변경됩니다.', promoStartConfirmCallback);
	}

	function promoStartConfirmCallback()
	{
		let table 		 = $("#dataTable").DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let param 		 = JSON.stringify({"promotion_uuid" : selectedData.promotion_uuid});
		let url			 = 'https://api.youcandoo.co.kr/v1.0/admin/promotion/start';
		let errMsg		 = label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, param, promoStartSuccessCallback, errMsg, false);
	}

	function promoStartSuccessCallback(data)
	{
		sweetToastAndCallback(data, promoStartSuccess);
	}

	function promoStartSuccess()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function doitStart()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast('대상을 선택하세요.');
			return;
		}

		sweetConfirm('확인을 누르면 5분 후 해당 두잇이 진행 중 상태로 변경됩니다.', doitStartConfirmCallback);
	}

	function doitStartConfirmCallback()
	{
		let table 		 = $("#dataTable").DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let param 		 = JSON.stringify({"doit_uuid" : selectedData.doit_uuid});
		let url			 = 'https://api.youcandoo.co.kr/v1.0/admin/doit/start';
		let errMsg		 = label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, param, doitStartSuccessCallback, errMsg, false);
	}

	function doitStartSuccessCallback(data)
	{
		sweetToastAndCallback(data, doitStartSuccess);
	}

	function doitStartSuccess()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}


