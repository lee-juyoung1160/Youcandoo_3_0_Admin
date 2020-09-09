
	const categoryName 	= $("#categoryName");
	const categoryImage	= $("#categoryImage");
	const exposure		= $("#exposure");
	const goUpdate		= $("#goUpdate");

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		categoryImage.on('error', function () { onErrorImage(this) });
		goUpdate	 .on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		let url 	= api.detailDoitCategory;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, params(), getDetailCallback, errMsg, false);
	}

	function params()
	{
		const pathName		= getPathName();
		const categoryIdx	= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : categoryIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	function buildDetail(data)
	{
		let { category, is_blind } = data.data;
		/*let imgUrl = detail.notice_image_url;
		imgUrl = isEmpty(detail.notice_image_url) ? label.noImage : imgUrl;*/

		categoryName.html(category);
		/*categoryImage.attr('src', imgUrl);*/
		exposure.html(is_blind);
	}

	function goUpdatePage()
	{
		const pathName	= getPathName();
		const categoryIdx	= splitReverse(pathName, '/');

		location.href = page.updateDoitCategory+categoryIdx;
	}


