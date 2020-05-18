
	const type			= $("#type");
	const title 		= $("#title");
	const content		= $("#content");
	const exposure		= $("#exposure");
	const goUpdate		= $("#goUpdate");
	const updateUrl		= "/service/faq/update/";

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
		let jsonData = JSON.parse(data);

		type.val(jsonData.data.faq_type);
		title.val(jsonData.data.title);
		content.val(jsonData.data.contents);
		exposure.val(jsonData.data.is_exposure === 'Y' ? '노출' : '비노출');
	}

	function goUpdatePage()
	{
		const pathName		= getPathName();
		const faqIdx		= splitReverse(pathName, '/');
		location.href = updateUrl+faqIdx;
	}


