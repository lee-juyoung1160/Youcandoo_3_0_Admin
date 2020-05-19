
	const nickname 		= $("#nickname");
	const regDate		= $("#regDate");
	const title			= $("#title");
	const content		= $("#content");
	const comment		= $("#comment");
	const admin			= $("#admin");
	const commentDate	= $("#commentDate");
	const memo			= $("#memo");

	$(document).ready(function () {
		/** 에디터 초기화 **/
		//initSummerNote();
		/** 상세 불러오기 **/
		getDetail();
	});

	function getDetail()
	{
		$.ajax({
			url: api.detailQna,
			type: "POST",
			data: params(),
			headers: headers,
			success: function(data) {
				if (isSuccessResp(data))
					buildDetail(data);
				else
					alert(invalidResp(data))
			},
			error: function (xhr, ajaxOptions, thrownError) {
				console.log(thrownError);
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
		let jsonData = JSON.parse(data);

		nickname.html(jsonData.data.nickname);
		regDate.html(jsonData.data.created_datetime);
		title.html(jsonData.data.title);
		content.html(jsonData.data.contents);
		comment.html(jsonData.data.comment);
		admin.html(jsonData.data.admin_userid);
		commentDate.html(jsonData.data.comment_datetime);
		memo.html(jsonData.data.memo);
	}

	function goUpdatePage()
	{
		const pathName		= getPathName();
		const qnaIdx		= splitReverse(pathName, '/');
		location.href = updateUrl+qnaIdx;
	}


