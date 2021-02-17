
	const type 	        = $("#type");
	const title 		= $("#title");
	const linkWrap		= $("#linkWrap");
	const eventLink		= $("#eventLink");
	const contentWrap	= $("#contentWrap");
	const content		= $("#content");
	const noticeWrap	= $("#noticeWrap");
	const notice		= $("#notice");
	const contentImgWrap = $("#contentImgWrap");
	const contentImg	= $("#contentImg");
	const thumbnail		= $("#thumbnail");
	const dateWrap		= $("#dateWrap");
	const eventFrom		= $("#eventFrom");
	const eventTo		= $("#eventTo");
	const exposure		= $("input[name=radio-exposure]");
	const btnSubmit 	= $("#btnSubmit");

	$(() => {
		/** 상세 **/
        getDetail();
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		/** 이벤트 **/
		contentImg	.on('change', function () { onChangeValidationImage(this); });
		thumbnail	.on('change', function () { onChangeValidationImage(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateEvent(); });
		eventFrom	.on('change', function () { onChangeFrom() });
	});

	function getDetail()
	{
        let url 	= api.detailEvent;
        let errMsg 	= label.detailContent+message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, detailParams(), buildDetail, errMsg, false);
	}

	function detailParams()
	{
		const pathName		= getPathName();
		const eventIdx		= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : eventIdx});
	}

	let g_event_uuid;
	let g_event_type;
	function buildDetail(data)
	{
		let detail = data.data;

		g_event_type = detail.event_type;
        g_event_uuid = detail.event_uuid;

		toggleComponent(detail.event_type);

        type.html(detail.event_name);
        title.val(detail.title);
		content.val(replaceSelectTextarea(detail.contents));
		notice.val(replaceSelectTextarea(detail.notice));
		if (!isEmpty(detail.image_url))
		{
			let contentImgDom =
			    `<div class="upload-display">
			        <div class="upload-thumb-wrap">
			            <img src="${detail.image_url}" class="upload-thumb" onerror="onErrorImage(this)">
                    </div>
			    </div>`;

			contentImg.parent().prepend(contentImgDom);
		}
		if (!isEmpty(detail.thumbnail_image_url))
		{
			let thumbnailDom =
			    `<div class="upload-display">
			        <div class="upload-thumb-wrap">
                        <img src="${detail.thumbnail_image_url}" class="upload-thumb" onerror="onErrorImage(this)">
			        </div>
			    </div>`;

			thumbnail.parent().prepend(thumbnailDom);
		}
		eventFrom.val(detail.start_date);
		eventTo.val(detail.end_date);
		eventLink.val(detail.link_url);
		exposure.each(function () {
			if ($(this).val() === detail.is_exposure)
				$(this).prop('checked', true);
		});
		calculateInputLength();
	}

	function toggleComponent(selectedValue)
	{
		if (selectedValue === 'event')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.show();
		}
		else if (selectedValue === 'announce')
		{
			linkWrap.hide();
			contentWrap.show();
			noticeWrap.show();
			contentImgWrap.show();
			dateWrap.hide();
		}
		else if (selectedValue === 'link')
		{
			linkWrap.show();
			contentWrap.hide();
			noticeWrap.hide();
			contentImgWrap.hide();
			dateWrap.show();
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

	function onSubmitUpdateEvent()
	{
		if (validation())
		{
			let callback;
			let thumbnailImg = thumbnail[0].files;
			let contentImg 	 = $("#contentImg")[0].files;
			callback = (thumbnailImg.length > 0 || contentImg.length > 0) ? fileUploadReq : updateRequest;

			sweetConfirm(message.modify, callback);
		}
	}

	function fileUploadReq()
	{
		let url    = fileApi.event;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('event_thumbnail_img', thumbnail[0].files[0]);
		param.append('event_content_img', isDisplay(contentImgWrap) ? contentImg[0].files[0] : '');

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			let url 	= api.updateEvent;
			let errMsg 	= label.modify+message.ajaxError;
			let param = {
				"event_uuid" : g_event_uuid,
				"event_type" : g_event_type,
				"event_title" : title.val().trim(),
				"event_contents" : replaceInputTextarea(content.val().trim()),
				"event_notice" : replaceInputTextarea(notice.val().trim()),
				"event_link_url" : eventLink.val().trim(),
				"event_start_date" : eventFrom.val(),
				"event_end_date" : eventTo.val(),
				"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),
			}

			if (!isEmpty(data))
			{
				let { event_thumbnail_img, event_content_img } = data.image_urls;

				if (!isEmpty(event_thumbnail_img))
					param["event_thumbnail_image"] = event_thumbnail_img;

				if (!isEmpty(event_content_img))
					param["event_image"] = event_content_img;
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.listEvent;
	}
