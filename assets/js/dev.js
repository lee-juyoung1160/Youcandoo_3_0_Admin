
	const env = $("#env");
	const btnStartNow 	= $("#btnStartNow");

	$( () => {
		toggleStartButton();
		btnStartNow.on("click", function () { startNow(); });
	})

	function toggleStartButton()
	{
		console.log(getPathName())
		let accessibleAuthCodes = env.val() === 'development' ? ['dev', 'smg'] : ['smg'];
		let isAccessibleAuthCode  = accessibleAuthCodes.indexOf(sessionAuthCode.val()) !== -1;

		if (getPathName() === '/doit')
		{
			accessibleAuthCodes = ['mklee'];
			isAccessibleAuthCode = accessibleAuthCodes === sessionUserId.val() && env.val() === 'development';
		}

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
		let pathName     = getPathName();
		let table 		 = $("#dataTable").DataTable();
		let selectedData = table.rows('.selected').data()[0];
		let param;
		let url;
		let errMsg		 = label.modify+message.ajaxError;
		if (pathName.includes('doit'))
		{
			param 	= JSON.stringify({"doit_uuid" : selectedData.doit_uuid});
			url 	= 'https://api.youcandoo.co.kr/v1.0/admin/doit/start';
		}
		else
		{
			param 	= JSON.stringify({"promotion_uuid" : selectedData.promotion_uuid});
			url 	= 'https://api.youcandoo.co.kr/v1.0/admin/promotion/start';
		}

		ajaxRequestWithJsonData(true, url, param, startNowSuccessCallback, errMsg, false);
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
