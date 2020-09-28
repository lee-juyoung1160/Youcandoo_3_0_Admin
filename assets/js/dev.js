
	const env = $("#env");
	const btnStartNow 	= $("#btnStartNow");

	$( () => {
		toggleStartButton();
		btnStartNow.on("click", function () { startNow(); });
	})

	function toggleStartButton()
	{
		let accessibleAuthCodes = ['dev'];
		let isAccessibleAuthCode = (accessibleAuthCodes.indexOf(sessionAuthCode.val()) !== -1 && env.val() === 'development');

		isAccessibleAuthCode ? btnStartNow.show() : btnStartNow.remove();
	}

	function startNow()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast('대상을 선택하세요.');
			return;
		}

		sweetConfirm('확인을 누르면 진행중 상태로 변경됩니다.', startNowConfirmCallback);
	}

	function startNowConfirmCallback()
	{
		let table 		 = $("#dataTable").DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let url 	= 'https://api.youcandoo.co.kr/v1.0/admin/doit/start';
		let param 	= {"doit_uuid" : selectedData.doit_uuid};
		let errMsg	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), startNowSuccessCallback, errMsg, false);
	}

	function startNowSuccessCallback(data)
	{
		sweetToastAndCallback(data, startNowSuccess);
	}

	function startNowSuccess()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}
