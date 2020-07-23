/*사용안함: 나중에 추가될 수 있음*/
	/*const nickname 	= $("#nickname");
	const regDate	= $("#regDate");
	const title		= $("#title");
	const content	= $("#content");
	const comment	= $("#summernote");
	const memo		= $("#memo");
	const btnSubmit	= $("#btnSubmit");
	let idx;

	$(document).ready(function () {
		/!** 상세 불러오기 **!/
		getDetail();

		btnSubmit.on('click', function () { onSubmitQna(); });
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
		const pathName	= getPathName();
		const qnaIdx	= splitReverse(pathName, '/');
		let param = {
			"idx" : qnaIdx
			,"userid" : sessionUserId.val()
			,"comment" : comment.summernote('code')
			,"memo" : memo.val().trim()
		}

		return JSON.stringify(param);
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

	function onSubmitQna()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.commentQna,
					type: "POST",
					headers: headers,
					dataType: 'json',
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listInquiry
						else
							alert(invalidResp(data))
					},
					error: function (request, status) {
						alert(label.submit+message.ajaxError);
					}
				});
			}
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
	}*/


