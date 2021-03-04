
	import { api } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, selPageLength, dateButtons, modalOpen, modalClose, modalBackdrop, chkStatus, dateFrom, dateTo, modalWarning, pagination
	} from '../modules/elements.js';
	import {sweetError,} from '../modules/alert.js';
	import {initSelectOption, initPageLength, initSearchDatepicker, initDayBtn, initMaxDateToday,onClickDateRangeBtn, fadeoutModal, overflowHidden, paginate,
		initSearchDateRangeWeek} from "../modules/common.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

	let _currentPage = 1;

	$( () => {
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
		/** 목록 불러오기 **/
		//getActions();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		modalOpen		.on("click", function () { onClickModalWarningOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday();
		initSearchDateRangeWeek();
		initSelectOption();
		chkStatus.eq(0).prop('checked', true);
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		_currentPage = 1;
		initMaxDateToday();
		getActions();
	}

	function getActions()
	{
		const url = api.actionList;
		const errMsg = label.list+message.ajaxLoadError;
		let status = [];
		chkStatus.each(function () {
			if ($(this).is(':checked'))
				status.push($(this).val())
		});
		let param = {
			"limit" : selPageLength.val()
			,"page" : _currentPage
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"status" : status
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getActionsCallback, errMsg, false);
	}

	function getActionsCallback(data)
	{
		if (isSuccessResp(data))
		{
			buildActions(data);
			buildPagination(data);
		}
		else
			sweetToast(data.msg);
	}

	function buildActions(data)
	{

	}

	function buildPagination(data)
	{
		let totalCount  = data.count;
		let lastPage	= Math.ceil(totalCount / selPageLength.val());

		pagination.html(paginate(_currentPage, lastPage));

		document.querySelectorAll('.dataTables_paginate').forEach( element => element.addEventListener('click', onClickPageNum));
	}

	function onClickPageNum()
	{
		$(this).siblings().removeClass('current');
		$(this).addClass('current');

		_currentPage = $(this).data('page');

		getActions();
	}

	function onClickModalWarningOpen()
	{
		modalWarning.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

