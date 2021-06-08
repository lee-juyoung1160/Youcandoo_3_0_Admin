
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp, headers } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import { targetUrl, btnSubmit, contentImage, title, dateFrom, dateTo, rdoTargetPageType,
		targetPage, modalOpen, modalClose, modalBackdrop, dataTable, targetUuid, keyword} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {
	initMinDateToday, initInputDateRangeWeek, initSearchDatepicker, onChangeValidateImage, onChangeSearchDateFrom, onChangeSearchDateTo, fadeoutModal, fadeinModal,
		} from "../modules/common.js";
	import {isEmpty, isDomainName} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig} from "../modules/tables.js";

	$( () => {
		title.trigger('focus');
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initInputDateRangeWeek();
		initMinDateToday();
		/** 이벤트 **/
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		dateFrom.on('change', function () { onChangeSearchDateFrom() });
		dateTo	.on('change', function () { onChangeSearchDateTo() });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		rdoTargetPageType.on('change', function () { onChangeRdoTargetPageType(this); });
		keyword		.on('keyup', function () { getTargetPageList(); });
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
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			const url = api.createBanner;
			const errMsg = label.submit+message.ajaxError;
			const pageTarget = $("input[name=radio-target-page-type]:checked").val();
			const pageType = (pageTarget === 'event_detail' || pageTarget === 'notice_detail') ? 'webview' : pageTarget;
			const bannerTarget = (pageTarget === 'webview' || pageTarget === 'browser') ? targetUrl.val().trim() : targetUuid.val();
			const param = {
				"banner_name" : title.val().trim(),
				"page_type" : pageType,
				"page_target" : pageTarget,
				"banner_target" : bannerTarget,
				"open_date" : dateFrom.val(),
				"close_date" : dateTo.val(),
				"banner_image_url" : data.image_urls.file
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
		if (isEmpty(title.val()))
		{
			sweetToast(`배너명은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		const pageType = $("input[name=radio-target-page-type]:checked").val();
		const isUrl = (pageType === 'webview' || pageType === 'browser');
		if (isUrl && isEmpty(targetUrl.val()))
		{
			sweetToast(`이동할 페이지는 ${message.required}`);
			targetUrl.trigger('focus');
			return false;
		}

		if (isUrl && !isDomainName(targetUrl.val().trim()))
		{
			sweetToast(`이동 페이지 URL 형식을 ${message.doubleChk}`);
			targetUrl.trigger('focus');
			return false;
		}

		if ((!isUrl) && isEmpty(targetUuid.val()))
		{
			sweetToast(`이동할 페이지는 ${message.required}`);
			targetPage.trigger('focus');
			return false;
		}

		const bannerImg = contentImage[0].files;
		if (bannerImg.length === 0)
		{
			sweetToast(`배너 이미지는 ${message.required}`);
			return false;
		}

		return true;
	}

	function onChangeRdoTargetPageType(obj)
	{
		const targetPageType = $(obj).val();

		switch (targetPageType) {
			case 'event_detail' :
				showTargetPage();
				break;
			case 'doit_detail' :
				showTargetPage();
				break;
			case 'notice_detail' :
				showTargetPage();
				break;
			default :
				showTargetUrl();
				targetUrl.trigger('focus');
				break;
		}
	}

	function onClickModalOpen()
	{
		fadeinModal();
		keyword.val('');
		getTargetPageList();
	}

	function getTargetPageList()
	{
		const table = dataTable.DataTable();
		table.destroy();
		dataTable.empty();
		dataTable.DataTable({
			ajax : {
				url: getApiUrl(),
				type:"POST",
				global: false,
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(json.msg);
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const table = dataTable.DataTable();
					const info = table.page.info();
					const _page = (info.start / info.length) + 1;
					const param = {
						"limit" : 5
						,"page" : _page
						,"keyword" : keyword.val().trim()
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: buildTableColumns(),
			serverSide: true,
			paging: true,
			pageLength: 5,
			select: false,
			destroy: true,
			initComplete: function () {
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
			case 'event_detail' :
				uuid = aData.event_uuid;
				name = aData.title;
				break;
			case 'doit_detail' :
				uuid = aData.doit_uuid;
				name = aData.doit_title;
				break;
			case 'notice_detail' :
				uuid = aData.notice_uuid;
				name = aData.title;
				break;
		}
		$(nRow).attr('data-uuid', uuid);
		$(nRow).attr('data-name', name);
		$(nRow).on('click', function () { onSelectTargetPage(this); })
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
			case 'event_detail' :
				return [{title: "구분",		data: "event_type",    	width: "20%"}
						,{title: "제목",		data: "title",    	   	width: "80%"}]
			case 'doit_detail' :
				return [{title: "두잇명",		data: "doit_title",    	width: "100%"}]
			case 'notice_detail' :
				return [{title: "제목",		data: "title",   		width: "100%"}]
		}
	}

	function getApiUrl()
	{
		const targetPageType = $("input[name=radio-target-page-type]:checked").val();
		switch (targetPageType) {
			case 'event_detail' :
				return api.targetEventList
			case 'doit_detail' :
				return api.targetDoitList
			case 'notice_detail' :
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

