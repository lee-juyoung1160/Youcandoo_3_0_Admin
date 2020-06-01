
	const title 		= $("#title");
	const content		= $("#content");
	const eventImg		= $("#eventImg");
	const period		= $("#period");
	const exposure		= $("#exposure");
	const goUpdate		= $("#goUpdate");

	$(document).ready(function () {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		goUpdate.on('click', function () { goUpdatePage(); })
	});

	function getDetail()
	{
		$.ajax({
			url: api.detailEvent,
			type: "POST",
			data: params(),
			headers: headers,
			dataType: 'json',
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
		const eventIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : eventIdx});
	}

	function buildDetail(data)
	{
		let detailData = data.data;

		title.html(detailData.title);
		content.html(detailData.contents);
		eventImg.attr('src', detailData.image_url);
		period.html(detailData.start_date +' ~ '+detailData.end_date);
		exposure.html(detailData.is_exposure === 'Y' ? '노출' : '비노출');
	}

	function goUpdatePage()
	{
		const pathName		= getPathName();
		const eventIdx		= splitReverse(pathName, '/');

		location.href = page.updateEvent+eventIdx;
	}


