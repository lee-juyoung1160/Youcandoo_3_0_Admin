
	const nicknameEl = $("#nickname");
	/*const regDate	= $("#regDate");*/
	const titleEl	 = $("#title");
	const contentEl	 = $("#content");
	const attachment = $("#attachment");
	const commentEl	 = $("#comment");
	const memoEl	 = $("#memo");
	const adminId	 = $("#adminId");
	const commentDate = $("#commentDate");
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

	function buildDetail(data)
	{
		let { status, title, contents, nickname, is_resource, userid, comment, memo, comment_datetime } = data.data;

		if (status === '대기')
			location.href = page.updateInquiry+idx;

		nicknameEl.html(nickname);
		titleEl.html(title);
		contentEl.html(contents);
		let attach = is_resource === 'Y' ? buildAttachment(data) : '-';
		attachment.html(attach);
		commentEl.html(comment);
		memoEl.html(isEmpty(memo) ? label.dash : memo);
		adminId.html(userid);
		commentDate.html(comment_datetime);
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
