
	import {ajaxRequestWithFile, ajaxRequestWithJson, isSuccessResp, invalidResp, headers} from "../modules/ajax-request.js";
	import { api, fileApiV2 } from '../modules/api-url.js';
	import {
		lengthInput,
		title,
		contentImage,
		btnSubmit,
		inputNumber,
		sponsorUuid,
		sponsor,
		selEndHour,
		selEndMinute,
		modalOpen,
		modalClose,
		modalBackdrop,
		keyword,
		dataTable,
		dateTo,
		dateFrom,
		selStartHour,
		selStartMinute,
	} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {
		onChangeValidateImage, limitInputLength, fadeoutModal, fadeinModal, initSelHour, initSelMinute,
		initInputDateRangeWeek, initInputDatepickerMinDateToday,
	} from "../modules/common.js";
	import {isEmpty, initInputNumber,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {initTableDefaultConfig} from "../modules/tables.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initInputDatepickerMinDateToday();
		initInputDateRangeWeek();
		initSelHour(selStartHour);
		initSelMinute(selStartMinute);
		initSelHour(selEndHour);
		initSelMinute(selEndMinute);
		initTimes();
		/** 이벤트 **/
		title.trigger('focus');
		inputNumber .on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput .on("propertychange change keyup paste input", function () { limitInputLength(this); });
		dateFrom	.on('change', function () { onChangeDateFrom() });
		contentImage.on('change', function () { onChangeValidateImage(this); });
		keyword			.on('keyup', function () { onKeyupKeyword(); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmit		.on('click', function () { onSubmitPromotion(); });
	});

	function initTimes()
	{
		selStartHour.val('00');
		selStartMinute.val('00');
		selEndHour.val('23');
		selEndMinute.val('59');
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

	function onSubmitPromotion()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
			//이미지 등록 임시 삭제
			//sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let param  = new FormData();
		param.append('file', contentImage[0].files[0]);

		ajaxRequestWithFile(true, fileApiV2.single, param)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? createRequest(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`이미지 등록${message.ajaxError}`));
	}

	function createRequest(data)
	{
		const param = {
			"promotion_title" : title.val().trim(),
			"profile_uuid" : sponsorUuid.val().trim(),
			"start_date" : dateFrom.val(),
			"end_date" : dateTo.val(),
			"start_time" : `${selStartHour.val()}:${selStartMinute.val()}:00`,
			"end_time" : `${selEndHour.val()}:${selEndMinute.val()}:59`,
			// "promotion_image_url" : data.image_urls.file
		}

		ajaxRequestWithJson(true, api.createPromotion, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function createSuccess()
	{
		location.href = page.listPromotion;
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

		/*const promotionImg = contentImage[0].files;
		if (promotionImg.length === 0)
		{
			sweetToast(`이미지는 ${message.required}`);
			return false;
		}*/

		const currentDatetime = new Date().getTime();
		const startDatetime = new Date(`${dateFrom.val()} ${selStartHour.val()}:${selStartMinute.val()}:00`).getTime();
		const endDatetime = new Date(`${dateTo.val()} ${selEndHour.val()}:${selEndMinute.val()}:00`).getTime();
		if (startDatetime > endDatetime)
		{
			sweetToast(`프로모션 ${message.compareActionTime}`);
			selStartHour.trigger('focus');
			return false;
		}

		if (currentDatetime > endDatetime)
		{
			sweetToast(`종료시간은 ${message.compareCurrentTime}`);
			selEndHour.trigger('focus');
			return false;
		}

		return true;
	}

	function onChangeDateFrom()
	{
		dateTo.datepicker("option", "minDate", new Date(dateFrom.datepicker("getDate")));
	}
