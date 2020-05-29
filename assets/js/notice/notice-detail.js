
	const title 		= $("#title");
	const content		= $("#content");
	const reserveDate	= $("#reserveDate");
	const exposure		= $("#exposure");
	const goUpdate		= $("#goUpdate");

	$(document).ready(function () {
		/** 상세 불러오기 **/
		getDetail();

		goUpdate.on('click', function () { goUpdatePage(); })
	});

	function getDetail()
	{
		$.ajax({
			url: api.detailNotice,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: params(),
			success: function(data) {
				if (isSuccessResp(data))
					buildDetail(data);
				else
					alert(invalidResp(data))
			},
			error: function (request, status) {
				alert(message.ajaxError);
			}
		});
	}

	function params()
	{
		const pathName		= getPathName();
		const noticeIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : noticeIdx});
	}

	function buildDetail(data)
	{
		let detailData = data.data;

		title.html(detailData.title);
		content.html(detailData.contents);
		reserveDate.html(detailData.reservation_date);
		exposure.html(detailData.is_exposure === 'Y' ? '노출' : '비노출');
	}

	function goUpdatePage()
	{
		const pathName	= getPathName();
		const noticeIdx	= splitReverse(pathName, '/');

		location.href = page.updateNotice+noticeIdx;
	}


