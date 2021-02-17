
	const type			= $("#type");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("#exposure");
	const goUpdate		= $("#goUpdate");

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		goUpdate.on('click', function () { goUpdatePage(); })
	});

	function getDetail()
	{
		let url 	= api.detailFaq;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, params(), getDetailCallback, errMsg, false);
	}

	function params()
	{
		const pathName		= getPathName();
		const faqIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : faqIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	function buildDetail(data)
	{
		let detailData = data.data;

		type.html(detailData.faq_name);
		title.html(detailData.title);
		content.html(detailData.contents);
		exposure.html(detailData.is_exposure === 'Y' ? label.y : label.n);
	}

	function goUpdatePage()
	{
		const pathName	= getPathName();
		const faqIdx	= splitReverse(pathName, '/');

		location.href = page.updateFaq+faqIdx;
	}


