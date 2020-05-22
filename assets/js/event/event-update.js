
	const title 		= $("#title");
	const content		= $("#summernote");
	const eventImg		= $("#eventImg");
	const eventFrom		= $("#eventFrom");
	const eventTo		= $("#eventTo");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit		= $("#btnSubmit");
	const inputFile 	= $("input:file");

	$(document).ready(function () {
		/** 에디터 초기화 **/
		initSummerNote();
		/** input 글자 수 체크 **/
		checkInputLength();
		/** 상세 불러오기 **/
		getDetail();

		/** 이벤트 **/
		inputFile	.on('change', function () { onChangeFile(this); });
		//btnSubmit.on('click', function () { onSubmitUpdateEvent(); });
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

	function onSubmitUpdateEvent()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createEvent,
					type: "POST",
					processData: false,
					contentType: false,
					headers: headers,
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listEvent
					},
					error: function (request, status) {
						console.log(status);
					}
				});
			}
		}
	}

	function params()
	{
		let paramThumbnailFile 	= inputFile[0].files[0];
		let formData  = new FormData();
		/*formData.append('event-type', eventType.val());*/
		formData.append('event-title', title.val().trim());
		formData.append('event-contents', content.val().trim());
		formData.append('event-start-date', eventFrom.val());
		formData.append('event-end-date', eventTo.val());
		formData.append('event-image', paramThumbnailFile);
		formData.append('is-exposure', $('input:radio[name=radio-exposure]:checked').val());
		formData.append('create_user', sessionUserId.val());

		return formData;
	}

	function validation()
	{
		let thumbnail = inputFile[0].files;

		if (isEmpty(title.val()))
		{
			alert('제목은 ' + message.required);
			title.focus();
			return false;
		}

		if (isEmpty(content.val()))
		{
			alert('내용은 ' + message.required);
			content.focus();
			return false;
		}

		if (thumbnail.length === 0)
		{
			alert('썸내일 이미지는 ' + message.required);
			return false;
		}

		if (isEmpty(eventFrom.val()))
		{
			alert('기간(시작일)은 ' + message.required);
			eventFrom.focus();
			return false;
		}

		if (isEmpty(eventTo.val()))
		{
			alert('기간(종료일)은 ' + message.required);
			eventTo.focus();
			return false;
		}

		return true;
	}


