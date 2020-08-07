
	const env = $("#env");
	const btnProStart = $("#btnProStart");
	/*const btnDoitStart = $("#btnDoitStart");*/

	$( () => {
		toggleStartButton();

		btnProStart.on("click", function () { promoStart(); })
	})

	function toggleStartButton()
	{
		const accesses = env.val() === 'development' ? ['dev', 'smg'] : ['smg'];

		if (accesses.indexOf(sessionAuthCode.val()) === -1)
		{
			try {
				btnProStart.remove();
			} catch (e) {}

			/*try {
				btnDoitStart.remove();
			} catch (e) {}*/
		}
		else
			btnProStart.show();
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

		sweetConfirm('확인을 누르면 해당 프로모션이 오늘 시작합니다.', promoStartConfirmCallback);
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
		sweetToastAndCallback(data, startSuccess);
	}

	function startSuccess()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}


