
	const market 	= $("#market");
	const title 	= $("#title");
	const version	= $("#version");
	const link		= $("#link");
	const closeOpt	= $("#closeOpt");
	const popupDate	= $("#popupDate");
	const exposure	= $("#exposure");
	const goUpdate	= $("#goUpdate");

	$( () => {
		/** 상세 불러오기 **/
		/*getDetail();*/
		/** 이벤트 **/
		goUpdate	.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		let url 	= api.detailNotice;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, params(), getDetailCallback, errMsg, false);
	}

	function params()
	{
		const pathName		= getPathName();
		const noticeIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : noticeIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	function buildDetail(data)
	{
		let detail = data.data;

		market.html(detail.title);
		title.html(detail.title);
		version.html(detail.notice_contents);
		link.html(`<a href="${detail.title}" target="_blank">${detail.title}</a>`);
		closeOpt.html(detail.notice_contents);
		popupDate.html(detail.reservation_date);
		exposure.html(detail.is_exposure);
	}

	function goUpdatePage()
	{
		const pathName	= getPathName();
		const popupIdx	= splitReverse(pathName, '/');

		location.href = page.updatePopup+popupIdx;
	}


