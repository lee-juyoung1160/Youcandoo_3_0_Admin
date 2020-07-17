/*사용안함: 나중에 추가될 수 있음*/
/*	const nickname 		= $("#nickname");
	const regDate		= $("#regDate");
	const title			= $("#title");
	const content		= $("#content");
	const comment		= $("#comment");
	const admin			= $("#admin");
	const commentDate	= $("#commentDate");
	const memo			= $("#memo");

	$(document).ready(function () {
		/!** 상세 불러오기 **!/
		getDetail();
	});

	function getDetail()
	{
		$.ajax({
			url: api.detailQna,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: params(),
			success: function(data) {
				if (isSuccessResp(data))
					buildDetail(data);
				else
					alert(invalidResp(data))
			},
			error: function (request, status) {
				alert(label.detailContent+message.ajaxLoadError);
			}
		});
	}

	function params()
	{
		const pathName		= getPathName();
		const qnaIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : qnaIdx});
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
	}*/


