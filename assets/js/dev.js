

	$( () => {
		let btnProStart = $("#btnProStart");

		if (sessionAuthCode.val() !== 'dev')
		{
			try {
				btnProStart.remove();
			} catch (e) {}

			try {
				$("#btnDoitStart").remove();
			} catch (e) {}

			try {
				$("#deployWrapper").find('button').remove();
			} catch (e) {}
		}

		btnProStart.on("click", function () { promoStart(); })
	})


	/** api url **/
	const baseTestApiUrl = 'https://api.youcandoo.co.kr/v1.0/admin/';

	function promoStart()
	{
		let table 		 = $("#dataTable").DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			alert('시작 대상 체크하세용.');
			return;
		}

		$.ajax({
			url: baseTestApiUrl+'promotion/start',
			type: "POST",
			async: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"promotion_uuid" : selectedData.promotion_uuid}),
			success: function(data) {
				alert(getStatusMessage(data));
				location.href = page.listPromo;
			},
			error: function (request, status) {
				alert(label.modify+message.ajaxError);
			}
		});
	}
