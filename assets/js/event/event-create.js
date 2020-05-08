
	const eventType = $("#selEventType");
	const title 	= $("#title");
	const content	= $("#summernote");
	const eventFrom	= $("#eventFrom");
	const eventTo	= $("#eventTo");
	const exposure	= $("input[name=radio-exposure]");
	const btnSubmit = $("#btnSubmit");
	const inputFile = $("input:file");

	$(document).ready(function () {

		inputFile	.on('change', function () { onChangeFile(this); });
		btnSubmit	.on('click', function () { onSubmitEvent(); });
		eventFrom	.on('change', function () { onChangeFrom() });

		initInputDatepicker();
		initComponent();
		initSummerNote();
	});

	function onChangeFrom()
	{
		eventTo.datepicker("option", "minDate", new Date(eventFrom.datepicker("getDate")));
	}

	function initComponent()
	{
		title.focus();
		title.val('');
		content.val('');
		exposure.eq(0).prop('checked', true);
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

	function onSubmitEvent()
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
						console.log(data);
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
		formData.append('event-type', eventType.val());
		formData.append('event-title', title.val());
		formData.append('event-contents', content.val());
		formData.append('event-start-date', eventFrom.val());
		formData.append('event-end-date', eventTo.val());
		formData.append('event-image', paramThumbnailFile);
		formData.append('is-exposure', $('input:radio[name=radio-exposure]:checked').val());

		return formData;
	}

