
	const nicknameEl = $("#nickname");
	/*const regDate	= $("#regDate");*/
	const titleEl	 = $("#title");
	const contentEl	 = $("#content");
	const appVersion = $("#appVersion");
	const osVersion	 = $("#osVersion");
	const deviceEl	 = $("#device");
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

	let idx;

	$(document).ready(function () {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
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
		let { status, title, contents, nickname, app_version, os_version, device, is_resource, userid, comment, memo, comment_datetime } = data.data;

		if (status === '대기')
			location.href = page.updateInquiry+idx;

		nicknameEl.html(nickname);
		appVersion.html(app_version);
		osVersion.html(os_version);
		deviceEl.html(device);
		titleEl.html(title);
		contentEl.html(contents);
		let attach = is_resource === 'Y' ? buildAttachment(data) : '-';
		attachment.html(attach);
		commentEl.html(comment);
		memoEl.html(isEmpty(memo) ? label.dash : memo);
		adminId.html(userid);
		commentDate.html(comment_datetime);
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
