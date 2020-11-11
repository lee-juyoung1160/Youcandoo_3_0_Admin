
	const giftCode 	= $("#giftCode");
	const giftName 	= $("#giftName");
	const giftImage	= $("#giftImage");
	const giftUcd	= $("#giftUcd");
	const exposure	= $("#exposure");
	const goUpdate 	= $("#goUpdate");

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		giftImage	.on('error', function () { onErrorImage(this) });
		goUpdate	.on('click', function () { goUpdatePage(); });
	});

	function getDetail()
	{
		let url 	= api.detailGift;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, params(), getDetailCallback, errMsg, false);
	}

	function params()
	{
		const pathName	= getPathName();
		const giftIdx	= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : giftIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	function buildDetail(data)
	{
		let { gift_uuid, gift_name, gift_ucd, is_exposure, gift_image_url } = data.data;

		giftCode.html(gift_uuid);
		giftName.html(gift_name);
		giftUcd.html(numberWithCommas(gift_ucd));
		giftImage.attr('src', gift_image_url);
		exposure.html(is_exposure);
	}

	function goUpdatePage()
	{
		const pathName	= getPathName();
		const giftIdx	= splitReverse(pathName, '/');

		location.href = page.updateGift+giftIdx;
	}


