
	const giftName 	= $("#giftName");
	const giftImage	= $("#giftImage");
	const price		= $("#price");
	const exposure	= $("input[name=radio-exposure]");
	const btnSubmit = $("#btnSubmit");

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
		let { gift_name, gitf_ucd, is_exposure, gift_image_url } = data.data;
		let imgUrl = isEmpty(gift_image_url) ? label.noImage : gift_image_url;

		giftName.html(gift_name);
		giftImage.attr('src', imgUrl);
		price.html(gitf_ucd);
		exposure.html(is_exposure === 'Y' ? 'N' : 'Y');
	}

	function goUpdatePage()
	{
		const pathName	= getPathName();
		const giftIdx	= splitReverse(pathName, '/');

		location.href = page.updateGift+giftIdx;
	}


