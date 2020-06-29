
	const type 		 	= $("#type");
	const title 	 	= $("#title");
	const contentWrap 	= $("#contentWrap");
	const content	  	= $("#content");
	const noticeWrap	= $("#noticeWrap");
	const notice	 	= $("#notice");
	const contentImgWrap = $("#contentImgWrap");
	const contentImg 	= $("#contentImg");
	const thumbnail	 	= $("#thumbnail");
	const webWrap	 	= $("#webWrap");
	const webUrl	 	= $("#webUrl");
	const linkWrap		= $("#linkWrap");
	const link		 	= $("#link");
	const dateWrap	 	= $("#dateWrap");
	const period	 	= $("#period");
	const exposure	 	= $("#exposure");
	const goUpdate	 	= $("#goUpdate");

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
				alert(label.detailContent+message.ajaxLoadError);
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
		let detail 	  = data.data;
		let eventType = detail.event_type;
		if (eventType === 'event')
		{
			linkWrap.hide();
			webWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.show();
		}
		else if (eventType === 'announce')
		{
			linkWrap.hide();
			webWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.hide();
		}
		else if (eventType === 'link')
		{
			linkWrap.show();
			webWrap.hide();
			contentWrap.hide();
			noticeWrap.hide();
			contentImgWrap.hide();
			dateWrap.show();
		}
		else if (eventType === 'web')
		{
			webWrap.show();
			linkWrap.hide();
			contentWrap.hide();
			noticeWrap.hide();
			contentImgWrap.hide();
			dateWrap.show();
		}

		type.html(detail.event_name);
		title.html(detail.title);
		content.html(detail.contents);
		notice.html(detail.notice);
		contentImg.attr('src', detail.image_url);
		thumbnail.attr('src', detail.thumbnail_image_url);
		period.html(detail.start_date+label.tilde+detail.end_date);
		link.html('<a href="'+detail.link_url+'" target="_blank">'+detail.link_url+'</a>');
		webUrl.html('<a href="'+detail.web_url+'" target="_blank">'+detail.web_url+'</a>');
		exposure.html(detail.is_exposure === 'Y' ? label.y : label.n);
	}

	function goUpdatePage()
	{
		const pathName		= getPathName();
		const eventIdx		= splitReverse(pathName, '/');

		location.href = page.updateEvent+eventIdx;
	}


