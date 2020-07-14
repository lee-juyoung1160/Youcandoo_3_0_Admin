
	const selEventType 	= $("#selEventType");
	const title 		= $("#title");
	const linkWrap		= $("#linkWrap");
	const eventLink		= $("#eventLink");
	const contentWrap	= $("#contentWrap");
	const content		= $("#content");
	const noticeWrap	= $("#noticeWrap");
	const notice		= $("#notice");
	const webWrap		= $("#webWrap");
	const webFile		= $("#webFile");
	const contentImageWrap	= $("#contentImageWrap");
	const contentImage	= $("#contentImage");
	const thumbnail		= $("#thumbnail");
	const dateWrap		= $("#dateWrap");
	const eventFrom		= $("#eventFrom");
	const eventTo		= $("#eventTo");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {
		/** 이벤트 구분 **/
		getEventType();
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		selEventType.on('change', function () { onChangeEventType(this); });
		webFile		.on('change', function () { onChangeWebFile(this); });
		contentImage.on('change', function () { onChangeValidationImage(this); });
		thumbnail	.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitEvent(); });
		eventFrom	.on('change', function () { onChangeFrom() });
	});

	function onChangeWebFile(obj)
	{
		let fileName;
		if(window.File && window.FileReader) {
			let siblingsDom = '.upload-name';
			let file = obj.files[0];

			if (obj.files && file) {
				if (isHtml(obj)) {
					fileName = file.name;
					$(obj).siblings(siblingsDom).val(fileName);
				}
			} else
				$(obj).siblings(siblingsDom).val('파일선택');
		}

		if (!isHtml(obj) && obj.files[0])
		{
			alert(message.invalidFile);
			$(obj).val(null);
			$(obj).siblings('.upload-name').val('파일선택');
		}
	}

	function isHtml(obj)
	{
		let file = obj.files[0];
		if (file)
		{
			let fileType 	= file["type"];
			let imageTypes 	= ["text/html"];

			if ($.inArray(fileType, imageTypes) >= 0)
				return true;
		}
	}

	function getEventType()
	{
		$.ajax({
			url: api.getEventType,
			type: "POST",
			headers: headers,
			dataType: 'json',
			success: function(data) {
				if (isSuccessResp(data))
					buildEventType(data);
				else
					sweetError(invalidResp(data));
			},
			error: function (request, status) {
				sweetError('구분 '+label.list+message.ajaxLoadError);
			}
		});
	}

	function initComponent()
	{
		title.focus();
		title.val('');
		content.val('');
		exposure.eq(0).prop('checked', true);
	}

	function buildEventType(data)
	{
		let detailData 	= data.data;
		let dataLen 	= detailData.length;
		let optionDom 	= '';

		for (let i=0; i<dataLen; i++)
		{
			let value = detailData[i].type;
			let name  = detailData[i].event_name;

			optionDom += '<option value="'+value+'">'+name+'</option>';
		}

		selEventType.html(optionDom);
		onChangeSelectOption(selEventType);
		onChangeEventType(selEventType);
	}

	function onChangeEventType(obj)
	{
		let selectedValue = $(obj).val();

		if (selectedValue === 'event')
		{
			linkWrap.hide();
			webWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImageWrap.show();
			dateWrap.show();
		}
		else if (selectedValue === 'announce')
		{
			linkWrap.hide();
			webWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImageWrap.show();
			dateWrap.hide();
		}
		else if (selectedValue === 'link')
		{
			linkWrap.show();
			webWrap.hide();
			contentWrap.hide();
			noticeWrap.hide();
			contentImageWrap.hide();
		}
		else if (selectedValue === 'web')
		{
			webWrap.show();
			linkWrap.hide();
			contentWrap.hide();
			noticeWrap.hide();
			contentImageWrap.hide();
		}
	}

	function onChangeFrom()
	{
		eventTo.datepicker("option", "minDate", new Date(eventFrom.datepicker("getDate")));
	}

	function isDisplay(obj)
	{
		if ($(obj).css('display') === 'none')
			return false;

		return true;
	}

	function validation()
	{
		let thumbnailFile 	 = thumbnail[0].files;
		let contentImageFile;
		let htmlFile;
		if (isDisplay(contentImageWrap))
			contentImageFile = contentImage[0].files;
		if (isDisplay(webWrap))
			htmlFile 		 = webFile[0].files;

		if (isEmpty(title.val()))
		{
			sweetToast('제목은 ' + message.required);
			title.focus();
			return false;
		}

		if (isDisplay(contentWrap) && isEmpty(content.val()))
		{
			sweetToast('내용은 ' + message.required);
			content.focus();
			return false;
		}

		if (isDisplay(noticeWrap) && isEmpty(notice.val()))
		{
			sweetToast('유의사항은 ' + message.required);
			notice.focus();
			return false;
		}

		if (isDisplay(linkWrap) && isEmpty(eventLink.val()))
		{
			sweetToast('링크는 ' + message.required);
			eventLink.focus();
			return false;
		}

		if (isDisplay(linkWrap) && !isDomainName(eventLink.val().trim()))
		{
			sweetToast('링크 형식을 ' + message.doubleChk);
			eventLink.focus();
			return false;
		}

		if (isDisplay(webWrap) && htmlFile.length === 0)
		{
			sweetToast('html 파일은 ' + message.required);
			return false;
		}

		if (isDisplay(contentImageWrap) && contentImageFile.length === 0)
		{
			sweetToast('본문 이미지는 ' + message.required);
			return false;
		}

		if (thumbnailFile.length === 0)
		{
			sweetToast('썸네일 이미지는 ' + message.required);
			return false;
		}

		if (isDisplay(dateWrap) && isEmpty(eventFrom.val()))
		{
			sweetToast('기간(시작일)은 ' + message.required);
			eventFrom.focus();
			return false;
		}

		if (isDisplay(dateWrap) && isEmpty(eventTo.val()))
		{
			sweetToast('기간(종료일)은 ' + message.required);
			eventTo.focus();
			return false;
		}

		return true;
	}

	function onSubmitEvent()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		$.ajax({
			url: api.createEvent,
			type: "POST",
			processData: false,
			contentType: false,
			headers: headers,
			dataType: 'json',
			data: params(),
			success: function(data) {
				sweetToastAndCallback(data, createSuccess);
			},
			error: function (request, status) {
				sweetError(label.submit+message.ajaxError);
			}
		});
	}

	function createSuccess()
	{
		location.href = page.listEvent;
	}

	function params()
	{
		let paramThumbnailFile 	= thumbnail[0].files[0];
		let paramFile;
		if (isDisplay(contentImageWrap))
			paramFile = contentImage[0].files[0];
		if (isDisplay(webWrap))
			paramFile = webFile[0].files[0];
		let formData  = new FormData();
		formData.append('event-type', selEventType.val());
		formData.append('event-title', title.val().trim());
		formData.append('event-contents', replaceInputTextarea(content.val().trim()));
		formData.append('event-notice', replaceInputTextarea(notice.val().trim()));
		formData.append('event-start-date', eventFrom.val());
		formData.append('event-end-date', eventTo.val());
		formData.append('event-link-url', eventLink.val().trim());
		formData.append('event-image', paramFile);
		formData.append('event-thumbnail-image', paramThumbnailFile);
		formData.append('is-exposure', $('input:radio[name=radio-exposure]:checked').val());
		formData.append('create_user', sessionUserId.val());

		return formData;
	}

