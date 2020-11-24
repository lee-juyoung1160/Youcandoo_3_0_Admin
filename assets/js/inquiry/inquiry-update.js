
    const nickname 	= $("#nickname");
	const regDate	= $("#regDate");
	const title		= $("#title");
	const content	= $("#content");
	const comment	= $("#answer");
	const attachment = $("#attachment");
	const memo		= $("#memo");
	const btnSubmit	= $("#btnSubmit");
	let idx;

	$(document).ready(function () {
		/** 상세 불러오기 **/
		/*getDetail();*/
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
		let detailData = data.data;

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
		{
            let callback;
            let attachment = attachment[0].files;
            callback = (attachment.length > 0) ? fileUploadReq : answerRequest;

            sweetConfirm(message.modify, callback);
		}
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

    function fileUploadReq()
    {
        let url    = fileApi.event;
        let errMsg = `이미지 등록 ${message.ajaxError}`;
        let param  = new FormData();
        param.append('single', attachment[0].files[0]);

        ajaxRequestWithFormData(true, url, param, answerRequest, errMsg, false);
    }

    function answerRequest(data)
    {
        if (isEmpty(data) || isSuccessResp(data))
        {
            let url 	= api.answerInquiry;
            let errMsg 	= message.ajaxError;
            let param = {
                "event_uuid" : g_event_uuid,
                "event_type" : g_event_type,
                "event_title" : title.val().trim(),
                "event_start_date" : eventFrom.val(),
                "event_end_date" : eventTo.val()
            }

            if (!isEmpty(data))
            {
                let { file } = data.image_urls;

                if (!isEmpty(file))
                    param["event_thumbnail_image"] = file;
            }

            ajaxRequestWithJsonData(true, url, JSON.stringify(param), answerReqCallback, errMsg, false);
        }
        else
            sweetToast(data.msg);
    }

    function answerReqCallback()
    {
        sweetToastAndCallback(data, answerSuccess);
    }

    function answerSuccess()
    {
        location.href = page.listInquiry;
    }
	



