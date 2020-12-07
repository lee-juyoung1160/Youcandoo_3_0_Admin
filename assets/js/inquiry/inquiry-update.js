
    const nicknameEl = $("#nickname");
	/*const regDate	= $("#regDate");*/
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

    let swipe;
	let idx;

	$(document).ready(function () {
	    initSwipe();
		/** 상세 불러오기 **/
		getDetail();
        /** 이벤트 **/
        modalCloseBtn	.on('click', function () { modalFadeout(); });
        modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmit.on('click', function () { onSubmitAnswer(); });
	});

    function initSwipe()
    {
        swipe = new Swiper('.swiper-container');
    }

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
		let { qna_uuid, status, title, contents, nickname, is_resource } = data.data;

		if (status !== '대기')
			location.href = page.detailInquiry+idx;

        g_qna_uuid = qna_uuid;
        nicknameEl.html(nickname);
		titleEl.html(title);
		contentEl.html(contents);
		let attach = is_resource === 'Y' ? buildAttachment(data) : '-';
		attachment.html(attach);
	}

	let attachments;
	function buildAttachment(data)
    {
        attachments = data.data.image_url;
        let images = '';
        for (let i=0; i<attachments.length; i++)
        {
            images +=
                `<p class="img-wrap">
                    <img onclick="viewAttachment();" src="${attachments[i]}" alt="">
                </p>`
        }

        return images;
    }

    function viewAttachment()
    {
        let images = '';
        for (let i=0; i<attachments.length; i++)
        {
            images +=
                `<div class="swiper-slide">
                    <img src="${attachments[i]}" alt="">
                </div>`;
        }

        modalContentWrap.html(images);
        modalFadein();
        buildSwipe();
    }

    function buildSwipe()
    {
        swipe.destroy(true, true);
        swipe = new Swiper('.swiper-container', {
            pagination : {
                el: '.swiper-pagination'
            }
        });
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
            alert('답변내용은 '+message.required);
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
	



