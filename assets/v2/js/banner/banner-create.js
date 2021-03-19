
	import { ajaxRequestWithJsonData, ajaxRequestWithFormData, isSuccessResp } from '../modules/request.js'
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {
	targetUrl,
	btnSubmit,
	bannerImage,
	bannerTitle,
	dateFrom,
	dateTo,
	rdoTargetPageType, targetPage, modalOpen, modalClose, modalBackdrop,
} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {
	initMinDateToday,
	initInputDateRangeWeek,
	initSearchDatepicker,
	onChangeValidateImage,
	onChangeSearchDateFrom, onChangeSearchDateTo, fadeoutModal, fadeinModal
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
		let url = fileApiV2.single;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('file', bannerImage[0].files[0]);

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			let url 	= api.createBanner;
			let errMsg 	= label.submit+message.ajaxError;
			let { file } = data.image_urls;
			let param = {
				"banner_title" : bannerTitle.val(),
				"icon_image_url" : '',
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
		targetUrl.val('');
	}

