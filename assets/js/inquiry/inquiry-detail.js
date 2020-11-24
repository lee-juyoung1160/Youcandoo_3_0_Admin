
	const nickname 		= $("#nickname");
	const regDate		= $("#regDate");
	const title			= $("#title");
	const content		= $("#content");
	const comment		= $("#comment");
	const admin			= $("#admin");
	const commentDate	= $("#commentDate");
	const memo			= $("#memo");

	$(document).ready(function () {
		/** 상세 불러오기 **/
		/*getDetail();*/
	});

	function getDetail()
	{
	    let url = api.detailInquiry;
        let errMsg 	= label.detailContent+message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, params(), getDetailCallback, errMsg, false);
	}

    function params()
    {
        const pathName	 = getPathName();
        const inquiryIdx = splitReverse(pathName, '/');

        return JSON.stringify({"idx" : inquiryIdx});
    }

	function getDetailCallback(data)
    {
        isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
    }

	function buildDetail(data)
	{
		let detailData = data.data;

		nickname.html(detailData.nickname);
		regDate.html(detailData.created_datetime);
		title.html(detailData.title);
		content.html(detailData.contents);
		comment.html(detailData.comment);
		admin.html(detailData.admin_userid);
		commentDate.html(detailData.comment_datetime);
		memo.html(detailData.memo);
	}


