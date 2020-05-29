
	const type			= $("#type");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("#exposure");
	const goUpdate		= $("#goUpdate");

	$(document).ready(function () {
		/** 상세 불러오기 **/
		getDetail();

		goUpdate.on('click', function () { goUpdatePage(); })
	});

	function getDetail()
	{
		$.ajax({
			url: api.detailFaq,
			type: "POST",
			data: params(),
			headers: headers,
			dataType: 'json',
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
		const faqIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : faqIdx});
	}

	function buildDetail(data)
	{
		let detailData = data.data;

		type.html(detailData.faq_name);
		title.html(detailData.title);
		content.html(detailData.contents);
		exposure.html(detailData.is_exposure === 'Y' ? '노출' : '비노출');
	}

	function goUpdatePage()
	{
		const pathName	= getPathName();
		const faqIdx	= splitReverse(pathName, '/');

		location.href = page.updateFaq+faqIdx;
	}


