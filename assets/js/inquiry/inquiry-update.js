
    const nickname 	= $("#nickname");
	const regDate	= $("#regDate");
	const title		= $("#title");
	const content	= $("#content");
	const comment	= $("#comment");
	const attachment = $("#attachment");
	const memo		= $("#memo");
	const btnSubmit	= $("#btnSubmit");
	let idx;

	$(document).ready(function () {
		/** 상세 불러오기 **/
		getDetail();
        /** 이벤트 **/
		/*btnSubmit.on('click', function () { onSubmitAnswer(); });*/
	});

	function getDetail()
	{
        let url = api.detailInquiry;
        let errMsg 	= label.detailContent+message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, detailParams(), getDetailCallback, errMsg, false);
	}

	function detailParams()
	{
        const pathName	= getPathName();
        const qnaIdx	= splitReverse(pathName, '/');

        return JSON.stringify({"idx" : qnaIdx});
	}

    function getDetailCallback(data)
    {
        isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
    }

	function buildDetail(data)
	{
	    console.log(data)
		let { qna_uuid, status, title, contents, } = data.data;

		if (detailData.status === '1')
		{
			alert(message.completePost);
			location.href = page.detailInquiry+detailData.idx;
		}
		nickname.html(detailData.nickname);
		regDate.html(detailData.created_datetime);
		title.html(detailData.title);
		content.html(detailData.contents);
	}

	function onSubmitAnswer()
	{
		if (validation())
            sweetConfirm(message.modify, answerRequest);
	}

    function validation()
    {
        if (isEmpty(comment.val()))
        {
            alert('답변내용은 '+message.required);
            comment.trigger('focus');
            return false;
        }

        return true;
    }

    function answerRequest(data)
    {
        let url 	= api.answerInquiry;
        let errMsg 	= message.ajaxError;
        let param = {
            "qna_uuid" : g_event_uuid,
            "comments" : g_event_type,
            "event_title" : title.val().trim(),
        }

        ajaxRequestWithJsonData(true, url, JSON.stringify(param), answerReqCallback, errMsg, false);
    }

    function answerReqCallback(data)
    {
        sweetToastAndCallback(data, answerSuccess);
    }

    function answerSuccess()
    {
        location.href = page.listInquiry;
    }
	



