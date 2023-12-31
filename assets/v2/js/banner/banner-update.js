
	import {ajaxRequestWithFile, ajaxRequestWithJson, invalidResp, isSuccessResp, headers} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {targetUrl, btnSubmit, title, dateFrom, dateTo, rdoTargetPageType, targetPage, modalOpen, modalClose,
		modalBackdrop, dataTable, targetUuid, thumbnail, contentImage, keyword,} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {onChangeValidateImage, onChangeSearchDateFrom, onChangeSearchDateTo, fadeoutModal, fadeinModal,
		onErrorImage, calculateInputLength, initInputDatepickerMinDateYesterday,} from "../modules/common.js";
	import {isEmpty, isDomainName, getPathName, splitReverse} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig} from "../modules/tables.js";

	const pathName	= getPathName();
	const bannerIdx	= splitReverse(pathName, '/');

	$( () => {
		title.trigger('focus');
		/** dataTable default config **/
		initTableDefaultConfig();
		initInputDatepickerMinDateYesterday();
		getDetail();
		/** 이벤트 **/
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		dateFrom.on('change', function () { onChangeSearchDateFrom() });
		dateTo	.on('change', function () { onChangeSearchDateTo() });
		contentImage	.on('change', function () { onChangeValidateImage(this); });
		rdoTargetPageType.on('change', function () { onChangeRdoTargetPageType(this); });
		keyword		.on('keyup', function () { getTargetPageList(); });
		btnSubmit	.on('click', function () { onSubmitUpdateBanner(); });
	});

	function getDetail()
	{
		const param = { "banner_idx" : bannerIdx }

		ajaxRequestWithJson(true, api.detailBanner, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_banner_uuid;
	function buildDetail(data)
	{
		const { banner_uuid, banner_name, page_target, page_target_value, target_title, open_date, close_date, banner_image_url } = data.data;

		g_banner_uuid = banner_uuid;

		title.val(banner_name);
		rdoTargetPageType.each(function () {
			if ($(this).val() === page_target)
			{
				$(this).prop('checked', true);
				onChangeRdoTargetPageType($(this));
			}
		});
		if (page_target === 'webview' || page_target === 'browser')
			targetUrl.val(page_target_value);
		else
		{
			targetPage.val(target_title);
			targetUuid.val(page_target_value);
		}
		dateFrom.val(open_date);
		dateTo.val(close_date);
		thumbnail.attr('src', banner_image_url);

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
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? updateRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			const pageType = $("input[name=radio-target-page-type]:checked").val();
			const pageValue = (pageType === 'webview' || pageType === 'browser') ? targetUrl.val().trim() : targetUuid.val();
			const param = {
				"banner_uuid" : g_banner_uuid,
				"banner_name" : title.val().trim(),
				"banner_type" : pageType,
				"banner_value" : pageValue,
				"open_date" : dateFrom.val(),
				"close_date" : dateTo.val(),
			}

			if (!isEmpty(data))
				param["banner_image_url"] = data.image_urls.file;

			ajaxRequestWithJson(true, api.updateBanner, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateSuccess);
				})
				.catch(reject => sweetError(label.modify + message.ajaxError));
		}
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
			sweetToast(`이동할 페이지 형식을 ${message.doubleChk}`);
			targetUrl.trigger('focus');
			return false;
		}

		if ((!isUrl) && isEmpty(targetUuid.val()))
		{
			sweetToast(`이동할 페이지는 ${message.required}`);
			targetPage.trigger('focus');
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
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"limit" : d.length
						,"page" : (d.start / d.length) + 1
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
			case 'event' :
				uuid = aData.event_uuid;
				name = aData.title;
				break;
			case 'doit' :
				uuid = aData.doit_uuid;
				name = aData.doit_title;
				break;
			case 'notice' :
				uuid = aData.notice_uuid;
				name = aData.title;
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
				return [{title: "구분",		data: "event_type",    	width: "20%"}
						,{title: "제목",		data: "title",    	   	width: "80%"}]
			case 'doit' :
				return [{title: "두잇명",		data: "doit_title",    	width: "100%"}]
			case 'notice' :
				return [{title: "제목",		data: "title",   		width: "100%"}]
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
