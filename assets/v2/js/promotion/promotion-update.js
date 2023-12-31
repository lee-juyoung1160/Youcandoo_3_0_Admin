
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp, ajaxRequestWithFile} from "../modules/ajax-request.js";
	import {api, fileApiV2} from '../modules/api-url.js';
	import {
	contentImage,
	thumbnail,
	title,
	btnSubmit,
	modalClose,
	modalBackdrop,
	inputNumber,
	lengthInput,
	startTime,
	endTime,
	keyword,
	modalOpen,
	dataTable,
	sponsorUuid,
	sponsor,
	dateFrom,
	dateTo,
	promotionStatus,
	selStartHour,
	selStartMinute,
	selEndHour, selEndMinute
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import {
	fadeinModal, fadeoutModal, onErrorImage, limitInputLength, onChangeValidateImage,
	calculateInputLength, initSearchDatepicker, initMinDateToday, initSelHour, initSelMinute
	} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty, initInputNumber,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig,} from "../modules/tables.js";

	const pathName	= getPathName();
	const promotionIdx	= splitReverse(pathName, '/');

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initMinDateToday();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		title.trigger('focus');
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		inputNumber 	.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		dateFrom	.on('change', function () { onChangeDateFrom() });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		keyword			.on('keyup', function () { onKeyupKeyword(); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmit		.on('click', function () { onSubmitUpdatePromotion(); });
		$('.hover-btn').on('mouseenter mouseleave', function () { $(this).siblings('.hover-content').toggleClass('active'); });
	});

	function getDetail()
	{
		const param = { "idx" : promotionIdx }

		ajaxRequestWithJson(true, api.detailPromotion, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					await initSelHour(selStartHour);
					await initSelMinute(selStartMinute);
					await initSelHour(selEndHour);
					await initSelMinute(selEndMinute);
					getDetailSuccess(data);
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_promotion_uuid;
	function getDetailSuccess(data)
	{
		g_promotion_uuid = data.data.promotion_uuid;
		buildDetail(data);
	}

	function buildDetail(data)
	{
		const { promotion_title, promotion_image_url, profile_uuid, nickname, start_date, end_date, start_time, end_time, state } = data.data;

		switch (state) {
			case '진행중' :
				sponsor.prop('disabled', true);
				dateFrom.prop('disabled', true);
				selStartHour.prop('disabled', true);
				selStartMinute.prop('disabled', true);
				break;
			case '종료' :
				title.prop('disabled', true);
				sponsor.prop('disabled', true);
				contentImage.prop('disabled', true);
				dateFrom.prop('disabled', true);
				dateTo.prop('disabled', true);
				selStartHour.prop('disabled', true);
				selStartMinute.prop('disabled', true);
				selEndHour.prop('disabled', true);
				selEndMinute.prop('disabled', true);
				break;
		}

		promotionStatus.text(state);
		title.val(promotion_title);
		sponsor.val(nickname);
		sponsorUuid.val(profile_uuid);
		thumbnail.attr('src', promotion_image_url);
		dateFrom.val(start_date);
		dateTo.val(end_date);
		selStartHour.val(start_time.slice(0, 2));
		selStartMinute.val(start_time.slice(3, 5));
		selEndHour.val(end_time.slice(0, 2));
		selEndMinute.val(end_time.slice(3, 5));

		onErrorImage();
		calculateInputLength();
	}

	function onClickModalOpen()
	{
		fadeinModal();
		initModal();
		buildSponsor();
	}

	function initModal()
	{
		keyword.trigger('focus');
		keyword.val('');
	}

	function buildSponsor()
	{
		dataTable.DataTable({
			ajax : {
				url: api.doitSponsorList,
				type:"POST",
				headers: headers,
				global: false,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (!isSuccessResp(json))
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					return JSON.stringify({ "nickname" : keyword.val() });
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "스폰서 명",	data: "nickname" }
			],
			serverSide: true,
			paging: false,
			select: false,
			scrollY: 450,
			scrollCollapse: true,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.profile_uuid);
				$(nRow).attr('data-name', aData.nickname);
				$(nRow).on('click', function () { onSelectSponsor(this); })
			}
		});
	}

	function onSelectSponsor(obj)
	{
		sponsorUuid.val($(obj).data('uuid'));
		sponsor.val($(obj).data('name'));
		fadeoutModal();
	}

	function onKeyupKeyword()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function onChangeDateFrom()
	{
		dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
	}

	function onSubmitUpdatePromotion()
	{
		if (validation())
		{
			//이미지 등록 임시 삭제
			/*const contentImgFile = contentImage[0].files;
			const callback = contentImgFile.length > 0 ? fileUploadReq : updateRequest;

			sweetConfirm(message.modify, callback);*/
			sweetConfirm(message.modify, updateRequest);
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
			const param = {
				"promotion_uuid" : g_promotion_uuid,
				"promotion_title" : title.val().trim(),
				"profile_uuid" : sponsorUuid.val().trim(),
				"start_date" : dateFrom.val(),
				"end_date" : dateTo.val(),
				"start_time" : `${selStartHour.val()}:${selStartMinute.val()}:00`,
				"end_time" : `${selEndHour.val()}:${selEndMinute.val()}:59`,
			}

			/*if (!isEmpty(data))
				param['promotion_image_url'] = data.image_urls.file;*/

			ajaxRequestWithJson(true, api.updatePromotion, JSON.stringify(param))
				.then( async function( data, textStatus, jqXHR ) {
					await sweetToastAndCallback(data, updateSuccess);
				})
				.catch(reject => sweetError(label.modify + message.ajaxError));
		}
	}

	function updateSuccess()
	{
		location.href = page.detailPromotion + promotionIdx;
	}

	function validation()
	{
		if (isEmpty(title.val()))
		{
			sweetToast(`프로모션명은 ${message.required}`);
			title.trigger('focus');
			return false;
		}

		if (isEmpty(sponsor.val()))
		{
			sweetToast(`스폰서를 ${message.select}`);
			sponsor.trigger('focus');
			return false;
		}

		const currentDatetime = new Date().getTime();
		const startDatetime = new Date(`${dateFrom.val()} ${selStartHour.val()}:${selStartMinute.val()}:00`).getTime();
		const endDatetime = new Date(`${dateTo.val()} ${selEndHour.val()}:${selEndMinute.val()}:00`).getTime();
		if (!dateFrom.prop('disabled') && currentDatetime > startDatetime)
		{
			sweetToast(`시작시간은 ${message.compareCurrentTime}`);
			selStartHour.trigger('focus');
			return false;
		}

		if (currentDatetime > endDatetime)
		{
			sweetToast(`종료시간은 ${message.compareCurrentTime}`);
			selEndHour.trigger('focus');
			return false;
		}

		if (startDatetime > endDatetime)
		{
			sweetToast(`프로모션 ${message.compareActionTime}`);
			startTime.trigger('focus');
			return false;
		}

		return true;
	}
