

	$( () => {
		/** 상세 **/
		getDetail();
		/** 이벤트 **/
	});

	/** 기본정보 **/
	function getDetail()
	{
		let param   = {
			"board_uuid" : "BRI-89B26258-3B5A-5BE2-A66A-CF2C2B41DFBA"
			,"page" : 1
			,"limit" : 10
		};
		let url 	= api.detailTalk;
		let errMsg 	= '두잇톡 '+label.detailContent+message.ajaxError;

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDeatilCallback, errMsg, false);
	}

	function getDeatilCallback(data)
	{
		isSuccessResp(data) ? buildDeatail(data) : sweetError(invalidResp(data));
	}

	function buildDeatail(data)
	{
		console.log(data)
	}

