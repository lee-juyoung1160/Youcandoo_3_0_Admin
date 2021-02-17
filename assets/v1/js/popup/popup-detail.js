
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
		getDetail();
		/** 이벤트 **/
		goUpdate	.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		let url 	= api.detailPopup;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, params(), getDetailCallback, errMsg, false);
	}

	function params()
	{
		const pathName	= getPathName();
		const popupIdx	= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : popupIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	function buildDetail(data)
	{
		let detail = data.data;

		market.html(detail.store);
		title.html(detail.popup_name);
		version.html(detail.target_version);
		link.html(`<a href="${detail.popup_url}" target="_blank">${detail.popup_url}</a>`);
		closeOpt.html(detail.close_type === 'always' ? '다시 보지 않기' : '오늘 하루 보지 않기');
		popupDate.html(`${detail.start_date} ~ ${detail.end_date}`);
		exposure.html(detail.is_exposure);
	}

	function goUpdatePage()
	{
		const pathName	= getPathName();
		const popupIdx	= splitReverse(pathName, '/');

		location.href = page.updatePopup+popupIdx;
	}


