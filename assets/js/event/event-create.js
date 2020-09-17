
	const selEventType 	= $("#selEventType");
	const title 		= $("#title");
	const linkWrap		= $("#linkWrap");
	const eventLink		= $("#eventLink");
	const contentWrap	= $("#contentWrap");
	const content		= $("#content");
	const noticeWrap	= $("#noticeWrap");
	const notice		= $("#notice");
	/*const webWrap		= $("#webWrap");
	const webFile		= $("#webFile");*/
	const contentImageWrap	= $("#contentImageWrap");
	const contentImage	= $("#contentImage");
	const thumbnail		= $("#thumbnail");
	const dateWrap		= $("#dateWrap");
	const eventFrom		= $("#eventFrom");
	const eventTo		= $("#eventTo");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit 	= $("#btnSubmit");

	$( () => {
		/** 이벤트 구분 **/
		getEventType();
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		selEventType.on('change', function () { onChangeEventType(this); });
		contentImage.on('change', function () { onChangeValidationImage(this); });
		thumbnail	.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitEvent(); });
		eventFrom	.on('change', function () { onChangeFrom() });
	});

	function getEventType()
	{
		let url = api.getEventType;
		let errMsg = `구분 ${label.list+message.ajaxLoadError}`;

		ajaxRequestWithJsonData(false, url, null, getEventTypeCallback, errMsg, false);
	}

	function getEventTypeCallback(data)
	{
		isSuccessResp(data) ? buildEventType(data) : sweetError(invalidResp(data));
	}

	function initComponent()
	{
		title.trigger('focus');
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
			contentWrap.show();
			noticeWrap.show();
			contentImageWrap.show();
			dateWrap.show();
		}
		else if (selectedValue === 'announce')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImageWrap.show();
			dateWrap.hide();
		}
		else if (selectedValue === 'link')
		{
			linkWrap.show();
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
		return !($(obj).css('display') === 'none');
	}

	function validation()
	{
		let thumbnailFile 	 = thumbnail[0].files;
		let contentImageFile;

		if (isDisplay(contentImageWrap))
			contentImageFile = contentImage[0].files;

		if (isEmpty(title.val()))
		{
			sweetToast(`제목은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isDisplay(contentWrap) && isEmpty(content.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			content.trigger('focus');
			return false;
		}

		if (isDisplay(noticeWrap) && isEmpty(notice.val()))
		{
			sweetToast(`유의사항은 ${message.required}`);
			notice.trigger('focus');
			return false;
		}

		if (isDisplay(linkWrap) && isEmpty(eventLink.val()))
		{
			sweetToast(`링크는 ${message.required}`);
			eventLink.trigger('focus');
			return false;
		}

		if (isDisplay(linkWrap) && !isDomainName(eventLink.val().trim()))
		{
			sweetToast(`링크 형식을 ${message.doubleChk}`);
			eventLink.trigger('focus');
			return false;
		}

		if (isDisplay(contentImageWrap) && contentImageFile.length === 0)
		{
			sweetToast(`본문 이미지는 ${message.required}`);
			return false;
		}

		if (thumbnailFile.length === 0)
		{
			sweetToast(`썸네일 이미지는 ${message.required}`);
			return false;
		}

		if (isDisplay(dateWrap) && isEmpty(eventFrom.val()))
		{
			sweetToast(`기간(시작일)은 ${message.required}`);
			eventFrom.trigger('focus');
			return false;
		}

		if (isDisplay(dateWrap) && isEmpty(eventTo.val()))
		{
			sweetToast(`기간(종료일)은 ${message.required}`);
			eventTo.trigger('focus');
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
		let url 	= api.createEvent;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithFormData(true, url, params(), createReqCallback, errMsg, false);
	}

	function params()
	{
		let paramFile;
		if (isDisplay(contentImageWrap))
			paramFile = contentImage[0].files[0];

		let formData  = new FormData();
		formData.append('event-type', selEventType.val());
		formData.append('event-title', title.val().trim());
		formData.append('event-contents', replaceInputTextarea(content.val().trim()));
		formData.append('event-notice', replaceInputTextarea(notice.val().trim()));
		formData.append('event-start-date', eventFrom.val());
		formData.append('event-end-date', eventTo.val());
		formData.append('event-link-url', eventLink.val().trim());
		formData.append('event-image', paramFile);
		formData.append('event-thumbnail-image', thumbnail[0].files[0]);
		formData.append('is-exposure', $('input:radio[name=radio-exposure]:checked').val());
		formData.append('create_user', sessionUserId.val());

		return formData;
	}

	let g_event_uuid;
	function createReqCallback(data)
	{
		g_event_uuid = data.data;
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		if ($('input:radio[name=radio-exposure]:checked').val() === 'Y')
			sweetConfirmWithCancelCallback(message.moveToCreatePush, redirectPushCreate, redirectList);
		else
			redirectList();
	}

	function redirectPushCreate()
	{
		let form   = $("<form></form>");
		form.prop("method", "post");
		form.prop("action", page.createPush);
		form.append($("<input/>", {type: 'hidden', name: 'req_page', value: 'event'}));
		form.append($("<input/>", {type: 'hidden', name: 'page_uuid', value: g_event_uuid}));
		form.append($("<input/>", {type: 'hidden', name: 'req_content', value: title.val().trim()}));
		form.appendTo("body");
		form.submit();
	}

	function redirectList()
	{
		location.href = page.listEvent;
	}



