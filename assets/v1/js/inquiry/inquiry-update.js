
    const nicknameEl = $("#nickname");
	const appVersion = $("#appVersion");
	const osVersion  = $("#osVersion");
	const deviceEl   = $("#device");
	const titleEl	 = $("#title");
	const contentEl	 = $("#content");
	const commentEl	 = $("#comment");
	const attachment = $("#attachment");
	const memoEl	 = $("#memo");
	const btnSubmit	 = $("#btnSubmit");
    /* 상세모달 */
	const modalContentWrap	 = $("#modalContentWrap");
    const modalCloseBtn = $(".close-btn");
    const modalLayout 	= $(".modal-layout");
    const modalContent 	= $(".modal-content");

	let idx;

	$(document).ready(function () {
		/** 상세 불러오기 **/
		getDetail();
        commentEl.trigger('focus');
        /** 이벤트 **/
        modalCloseBtn	.on('click', function () { modalFadeout(); });
        modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmit.on('click', function () { onSubmitAnswer(); });
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

    let g_qna_uuid;
	function buildDetail(data)
	{
		let { qna_uuid, status, title, contents, nickname, user_idx, app_version, os_version, device, is_resource } = data.data;

		if (status !== '대기')
			location.href = page.detailInquiry+idx;

        g_qna_uuid = qna_uuid;
        nicknameEl.html(isEmpty(user_idx) ? nickname : `<a href="${page.detailUser}${user_idx}">${nickname}</a>`);
        appVersion.html(app_version);
        osVersion.html(os_version);
        deviceEl.html(device);
		titleEl.html(title);
		contentEl.html(contents);
		let attach = is_resource === 'Y' ? buildAttachment(data) : '-';
		attachment.html(attach);
	}

	function buildAttachment(data)
    {
        let attachments = data.data.image_url;
        let images = '';
        for (let i=0; i<attachments.length; i++)
        {
            images +=
                `<p class="img-wrap">
                    <img onclick="viewAttachment(this);" src="${attachments[i]}" alt="">
                </p>`
        }

        return images;
    }

    function viewAttachment(obj)
    {
        let imageUrl = $(obj).prop('src');
        let images = `<img src="${imageUrl}" alt="">`;

        modalContentWrap.html(images);
        modalFadein();
    }

	function onSubmitAnswer()
	{
		if (validation())
            sweetConfirm(message.create, answerRequest);
	}

    function validation()
    {
        if (isEmpty(commentEl.val()))
        {
            sweetToast('답변내용은 '+message.required);
            commentEl.trigger('focus');
            return false;
        }

        return true;
    }

    function answerRequest()
    {
        let url 	= api.answerInquiry;
        let errMsg 	= message.ajaxError;
        let param = {
            "qna_uuid" : g_qna_uuid,
            "comment" : commentEl.val().trim(),
            "memo" : memoEl.val().trim(),
        }

        ajaxRequestWithJsonData(true, url, JSON.stringify(param), answerReqCallback, errMsg, false);
    }

    function answerReqCallback(data)
    {
        sweetToastAndCallback(data, answerSuccess);
    }

    function answerSuccess()
    {
        history.back();
    }
	



