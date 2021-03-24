
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import { targetUrl, btnSubmit, bannerImage, bannerTitle, dateFrom, dateTo, rdoTargetPageType,
		targetPage, keyword, modalOpen, modalClose, modalBackdrop, dataTable, targetUuid,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {
	initMinDateToday, initInputDateRangeWeek, initSearchDatepicker, onChangeValidateImage, onChangeSearchDateFrom, onChangeSearchDateTo, fadeoutModal, fadeinModal,
		} from "../modules/common.js";
	import {isEmpty, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		bannerTitle.trigger('focus');
		initSearchDatepicker();
		initInputDateRangeWeek();
		initMinDateToday();
		/** 이벤트 **/
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		dateFrom.on('change', function () { onChangeSearchDateFrom() });
		dateTo	.on('change', function () { onChangeSearchDateTo() });
		bannerImage	.on('change', function () { onChangeValidateImage(this); });
		rdoTargetPageType.on('change', function () { onChangeRdoTargetPageType(this); });
		btnSubmit	.on('click', function () { onSubmitBanner(); });
	});

	function onSubmitBanner()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		const url = fileApiV2.single;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', bannerImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			const url = api.createBanner;
			const errMsg = label.submit+message.ajaxError;
			const param = {
				"banner_title" : bannerTitle.val(),
				"icon_image_url" : data.image_urls.file,
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listBanner;
	}

	function validation()
	{
		if (isEmpty(bannerTitle.val()))
		{
			sweetToast(`배너명은 ${message.required}`);
			bannerTitle.trigger('focus');
			return false;
		}

		const bannerImg = bannerImage[0].files;
		if (bannerImg.length === 0)
		{
			sweetToast(`배너 이미지는 ${message.required}`);
			return false;
		}

		if (isEmpty(targetUrl.val()))
		{
			sweetToast(`이동 페이지 URL은 ${message.required}`);
			targetUrl.trigger('focus');
			return false;
		}

		if (!isDomainName(targetUrl.val().trim()))
		{
			sweetToast(`이동 페이지 URL 형식을 ${message.doubleChk}`);
			targetUrl.trigger('focus');
			return false;
		}

		return true;
	}

	function onChangeRdoTargetPageType(obj)
	{
		const targetPageType = $(obj).val();

		switch (targetPageType) {
			case 'event' :
				showTargetPage();
				break;
			case 'doit' :
				showTargetPage();
				break;
			case 'notice' :
				showTargetPage();
				break;
			case 'webview' :
				showTargetUrl();
				targetUrl.trigger('focus');
				break;
		}
	}

	function onClickModalOpen()
	{
		fadeinModal();
		// getTargetPageList();
	}

	function getTargetPageList()
	{
		const url = getApiUrl();
		const errMsg = label.list + message.ajaxLoadError

		ajaxRequestWithJsonData(true, url, null, getCategoryListCallback, errMsg, false);
	}

	function getCategoryListCallback(data)
	{
		isSuccessResp(data) ? buildTable(data) : sweetToast(data.msg);
	}

	function buildTable(data)
	{
		dataTable.empty();
		dataTable.DataTable({
			data: data.data,
			columns: buildTableColumns(),
			serverSide: false,
			paging: true,
			select: false,
			destroy: true,
			initComplete: function () {
				addClickEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		const targetPageType = $("input[name=radio-target-page-type]:checked").val();
		let uuid;
		let name;
		switch (targetPageType) {
			case 'event' :
				uuid = aData.event_uuid;
				name = aData.event_title;
				break;
			case 'doit' :
				uuid = aData.doit_uuid;
				name = aData.doit_title;
				break;
			case 'notice' :
				uuid = aData.notice_uuid;
				name = aData.notice_title;
				break;
		}
		$(nRow).attr('data-uuid', uuid);
		$(nRow).attr('data-name', name);
		$(nRow).addClass('target-page-row');
	}

	function addClickEvent()
	{
		$(".target-page-row").on('click', function () { onSelectTargetPage(this); })
	}

	function onSelectTargetPage(obj)
	{
		targetPage.val($(obj).data('name'));
		targetUuid.val($(obj).data('uuid'));
		fadeoutModal();
	}

	function buildTableColumns()
	{
		const targetPageType = $("input[name=radio-target-page-type]:checked").val();
		switch (targetPageType) {
			case 'event' :
				return [{title: "구분",		data: "event_name",    	width: "20%"}
						,{title: "제목",		data: "title",    	   	width: "40%"}]
			case 'doit' :
				return [{title: "진행상태",	data: "doit_status",   	width: "20%"}
						,{title: "두잇명",	data: "doit_title",    	width: "80%"}]
			case 'notice' :
				return [{title: "제목",		data: "notice_title",   width: "100%"}]
		}
	}

	function getApiUrl()
	{
		const targetPageType = $("input[name=radio-target-page-type]:checked").val();
		switch (targetPageType) {
			case 'event' :
				return api.targetEventList
			case 'doit' :
				return api.targetDoitList
			case 'notice' :
				return api.targetNoticeList
		}
	}

	function showTargetPage()
	{
		targetPage.parent().show();
		targetUrl.parent().hide();
		initTargetInput();
	}

	function showTargetUrl()
	{
		targetPage.parent().hide();
		targetUrl.parent().show();
		initTargetInput();
	}

	function initTargetInput()
	{
		targetPage.val('');
		targetUuid.val('');
		targetUrl.val('');
	}

