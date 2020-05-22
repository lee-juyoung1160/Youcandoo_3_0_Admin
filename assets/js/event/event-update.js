
	const title 		= $("#title");
	const content		= $("#summernote");
	const eventImg		= $("#eventImg");
	const eventFrom		= $("#eventFrom");
	const eventTo		= $("#eventTo");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit		= $("#btnSubmit");
	const inputFile = $("input:file");

	$(document).ready(function () {
		/** 에디터 초기화 **/
		initSummerNote();
		/** 상세 불러오기 **/
		getDetail();
		inputFile	.on('change', function () { onChangeFile(this); });
		//btnSubmit.on('click', function () { onSubmitUpdateNotice(); });
	});

	function getDetail()
	{
		$.ajax({
			url: api.detailEvent,
			type: "POST",
			data: detailParams(),
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

	function detailParams()
	{
		const pathName		= getPathName();
		const eventIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : eventIdx});
	}

	function buildDetail(data)
	{
		let jsonData = JSON.parse(data);

		title.val(jsonData.data.title);
		content.summernote('code', jsonData.data.contents);
		eventImg.attr('src', jsonData.data.image_url);
		eventFrom.val(jsonData.data.start_date);
		eventTo.val(jsonData.data.end_date);
		exposure.each(function () {
			if ($(this).val() === jsonData.data.is_exposure)
				$(this).prop('checked', true);
		})
	}


