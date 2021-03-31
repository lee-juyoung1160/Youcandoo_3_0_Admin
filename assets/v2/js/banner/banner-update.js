
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {targetUrl, btnSubmit, title, dateFrom, dateTo, rdoTargetPageType, targetPage,
		modalOpen, modalClose, modalBackdrop, dataTable, targetUuid, thumbnail, datePicker, contentImage,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {
	initSearchDatepicker,
	onChangeValidateImage,
	onChangeSearchDateFrom,
	onChangeSearchDateTo,
	fadeoutModal,
	fadeinModal,
	onErrorImage, calculateInputLength,
} from "../modules/common.js";
	import {isEmpty, isDomainName, getPathName, splitReverse} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const bannerIdx	= splitReverse(pathName, '/');

	$( () => {
		title.trigger('focus');
		initSearchDatepicker();
		getDetail();
		/** 이벤트 **/
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		dateFrom.on('change', function () { onChangeSearchDateFrom() });
		dateTo	.on('change', function () { onChangeSearchDateTo() });
		contentImage	.on('change', function () { onChangeValidateImage(this); });
		rdoTargetPageType.on('change', function () { onChangeRdoTargetPageType(this); });
		btnSubmit	.on('click', function () { onSubmitUpdateBanner(); });
	});

	function getDetail()
	{
		const url = api.detailBanner;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"banner_idx" : bannerIdx
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_banner_uuid;
	function buildDetail(data)
	{
		const { banner_uuid, banner_name, banner_type, open_date, close_date, banner_image_url } = data.data;

		g_banner_uuid = banner_uuid;

		title.val(banner_name);
		rdoTargetPageType.each(function () {
			if ($(this).val() === banner_type)
			{
				$(this).prop('checked', true);
				onChangeRdoTargetPageType($(this));
			}
		});
		dateFrom.val(open_date);
		dateTo.val(close_date);
		thumbnail.attr('src', banner_image_url);
		datePicker.datepicker("option", "minDate", open_date);

		calculateInputLength();
		onErrorImage();
	}

	function onSubmitUpdateBanner()
	{
		if (validation())
		{
			const bannerImg = contentImage[0].files;
			const requestFn = bannerImg.length === 0 ? updateRequest : fileUploadReq;
			sweetConfirm(message.modify, requestFn);
		}
	}

	function fileUploadReq()
	{
		const url = fileApiV2.single;
		const errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const url = api.updateBanner;
			const errMsg = label.modify+message.ajaxError;
			const param = {
				"banner_uuid" : g_banner_uuid,
				"banner_name" : title.val().trim(),
				"banner_type" : $("input[name=radio-target-page-type]:checked").val(),
				"open_date" : dateFrom.val(),
				"close_date" : dateTo.val(),
			}

			if (!isEmpty(data))
				param["banner_image_url"] = data.image_urls.file;

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

		/*if (isEmpty(targetUrl.val()))
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
		}*/

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

		ajaxRequestWithJsonData(true, url, null, getTargetPageListCallback, errMsg, false);
	}

	function getTargetPageListCallback(data)
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
		$(nRow).on('click', function () { onSelectTargetPage(this); });
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

