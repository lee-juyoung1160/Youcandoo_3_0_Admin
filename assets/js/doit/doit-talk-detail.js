

	$( () => {
		/** 상세 **/
		getDetail();
		/** 이벤트 **/
	});

	/** 기본정보 **/
	function getDetail()
	{
		let url 	= api.detailTalk;
		let errMsg 	= `두잇톡 ${label.detailContent}${message.ajaxError}`;
		let param   = {
			"board_uuid" : "BRI-89B26258-3B5A-5BE2-A66A-CF2C2B41DFBA"
			,"page" : 1
			,"limit" : 10
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDeatilCallback, errMsg, false);
	}

	function getDeatilCallback(data)
	{
		isSuccessResp(data) ? buildDeatail(data) : sweetError(invalidResp(data));
	}

	function buildDeatail(_data)
	{
		let { board_uuid, doit_title, is_notice, like, nickname, report, text_body } = _data.data;
		let comments = _data.comment.data;
		for (let { board_comment_uuid, nickname, comment_text, comment_count, created} of comments)
		{
			console.log(nickname)
		}
	}

	let g_board_comment_uuid;
	function onClickComment(obj)
	{
		g_board_comment_uuid = "BCU-132A269B-480C-34DD-4DE8-70C824C96C48"//$(obj).data('uuid');
		detailChildCommentRequest();
	}

	function detailChildCommentRequest()
	{
		let url = api.listChildComment;
		let errMsg 	= `대댓글 ${message.ajaxLoadError}`;
		let param = {
			"board_comment_uuid": g_board_comment_uuid,
			"page": "1",
			"limit": "10"
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDeatilCallback, errMsg, false);
	}
