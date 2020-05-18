
	const title 		= $("#title");
	const content		= $("#content");
	const reserveDate	= $("#reserveDate");
	const exposure		= $("#exposure");
	const goUpdate		= $("#goUpdate");
	const updateUrl		= "/service/notice/update/";

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
			data: params(),
			headers: headers,
			success: function(data) {
				if (isSuccessResp(data))
					buildDetail(data);
				else
					alert(invalidResp(data))
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(thrownError);
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
		let jsonData = JSON.parse(data);

		title.html(jsonData.data.title);
		content.html(jsonData.data.contents);
		reserveDate.html(jsonData.data.reservation_date);
		exposure.html(jsonData.data.is_exposure === 'Y' ? '노출' : '비노출');
	}

	function goUpdatePage()
	{
		const pathName		= getPathName();
		const noticeIdx		= splitReverse(pathName, '/');
		location.href = updateUrl+noticeIdx;
	}


