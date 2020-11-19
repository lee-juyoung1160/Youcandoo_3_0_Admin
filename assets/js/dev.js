
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
		let selectedData = table.rows('.selected').data();
		if (isEmpty(selectedData))
		{
			sweetToast('헐..아무것도 선택을 안했네?');
			return;
		}

		if (selectedData.length > 1)
		{
			sweetToast('욕심쟁이..하나만 선택해요.');
			return;
		}

		for (let i=0; i<selectedData.length; i++)
		{
			let { doit_status } = selectedData[i];

			if (doit_status !== '모집중')
			{
				sweetToast('모집중 두잇만..');
				return;
			}
		}

		sweetConfirm('확인을 누르면 진행중 상태로 변경돼요.', startNowConfirmCallback);
	}

	function startNowConfirmCallback()
	{
		let table 		 = $("#dataTable").DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let url 	= 'https://adminapi.youcandoo.co.kr/doit/start';
		let param 	= { "doit_uuid" : selectedData.doit_uuid };
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
