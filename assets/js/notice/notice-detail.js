
	const title 		= $("#title");
	const content		= $("#content");
	const reserveDate	= $("#reserveDate");
	const contentImageWrap	= $("#contentImageWrap");
	const contentImage	= $("#contentImage");
	const exposure		= $("#exposure");
	const goUpdate		= $("#goUpdate");

	$(document).ready(function () {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		contentImage.on('error', function () { onErrorImage(this) });
		goUpdate	.on('click', function () { goUpdatePage(); });
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
				alert(label.detailContent+message.ajaxLoadError);
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
		let detail = data.data;
		let imgUrl = detail.notice_image_url;
		imgUrl = isEmpty(detail.notice_image_url) ? label.noImage : imgUrl;

		title.html(detail.title);
		content.html(detail.notice_contents);
		if (isEmpty(detail.notice_image_url))
			contentImageWrap.remove();
		else
			contentImage.attr('src', imgUrl);
		reserveDate.html(detail.reservation_date);
		exposure.html(detail.is_exposure === 'Y' ? label.y : label.n);
	}

	function goUpdatePage()
	{
		const pathName	= getPathName();
		const noticeIdx	= splitReverse(pathName, '/');

		location.href = page.updateNotice+noticeIdx;
	}


