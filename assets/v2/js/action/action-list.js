
	import { api } from '../modules/api-url.js';
	import {
	body, btnSearch, btnReset, selPageLength, dateButtons,
	modalDetail, modalWarning, modalOpen, modalClose, modalBackdrop,
	chkStatus, dateFrom, dateTo, pagination, actionsWrap, selDateType
	} from '../modules/elements.js';
	import {sweetError,} from '../modules/alert.js';
	import {
	initSelectOption,
	initPageLength,
	initSearchDatepicker,
	initDayBtn,
	initMaxDateToday,
	onClickDateRangeBtn,
	fadeoutModal,
	overflowHidden,
	paginate,
	setDateToday, onChangeSearchDateFrom, onChangeSearchDateTo
	} from "../modules/common.js";
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
		buildActions();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
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
		setDateToday();
		initSelectOption();
		chkStatus.eq(0).prop('checked', true);
		chkStatus.eq(1).prop('checked', false);
		chkStatus.eq(2).prop('checked', false);
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
		const url = api.reportActionList;
		const errMsg = label.list+message.ajaxLoadError;
		let status = [];
		chkStatus.each(function () {
			if ($(this).is(':checked'))
				status.push($(this).val())
		});
		const param = {
			"limit" : selPageLength.val()
			,"page" : _currentPage
			,"date_type" : selDateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"action_status" : status
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
		let actionEl = '<div class="card"><p class="message">인증 정보가 없습니다.</p></div>';
		if (!isEmpty(data.data) && data.count > 0)
		{
			actionEl = '';

			data.data.map( (obj, index) => {
				const {idx, action_date, action_uuid, contents_type, contents_url, doit_title, nickname, report_count, thumbnail_url, is_yellow} = obj;

				const warningEl = is_yellow === 'Y' ? `<strong class="red-card"><img src="${label.redCardImage}" alt=""></strong>` : '';

				let actionContentImage;
				if (contents_type === 'image')
					actionContentImage = contents_url;
				else if (contents_type === 'voice')
					actionContentImage = label.voiceImage
				else if (contents_type === 'video')
					actionContentImage = thumbnail_url;

				if (index===0 || index%6 === 0)
					actionEl += '<div class="row">';

				actionEl +=
					`<div class="col-2 auth-item">
						<div class="card">
							<div class="top clearfix">
								<div class="checkbox-wrap">
									<input id="action_${index}" type="checkbox" name="chk-action" data-uuid="${action_uuid}" data-warning="${is_yellow}">
									<label for="action_${index}"><span></span></label>
								</div>
								<div class="right-wrap">
									<span><i class="fas fa-exclamation-triangle"></i> ${report_count}</span>
								</div>
							</div>
							<div class="img-wrap action-content" data-idx="${idx}">
								<img src="${actionContentImage}" alt="">
							</div>
							<p class="title">${doit_title}</p>
							<span class="nick-name">${nickname}</span>
							<span class="date">${action_date}</span>
							${warningEl}
						</div>
					</div>`

				if (index>0 && (index+1)%6 === 0)
					actionEl += '</div>';
			})
		}

		actionsWrap.html(actionEl);

		$(".action-content").on('click', function () { onClickAction(this); })

		for (let i=0; i<12; i++)
		{
			if (i===0 || i%6 === 0)
				actionEl += '<div class="row">';

			actionEl +=
				`<div class="col-2 auth-item">
                    <div class="card">
                        <div class="top clearfix">
                            <div class="checkbox-wrap">
                                <input id="c15" type="checkbox" name="cb">
                                <label for="c15"><span></span></label>
                            </div>
                            <div class="right-wrap">
                                <span><i class="fas fa-exclamation-triangle"></i> 111</span>
                            </div>
                        </div>
                        <div class="img-wrap">
                            <img src="/assets/v2/img/profile-1.png" alt="">
                        </div>
                        <p class="title">두잇며어엉두잇며어엉두잇며어엉두잇며어엉두잇며어엉두잇며어엉</p>
                        <span class="nick-name">열심히사는강아지열심히사는강아지</span>
                        <span class="date">2020-02-02</span>
                        <strong class="red-card"><img src="/assets/v2/img/red-card.png" alt=""></strong>
                    </div>
                </div>`

			if (i>0 && (i+1)%6 === 0)
				actionEl += '</div>';
		}

		actionsWrap.html(actionEl);

		$(".img-wrap").on('click', function () { onClickAction(this); })
	}

	function onClickAction()
	{
		modalDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

	function buildPagination(data)
	{
		const totalCount  = data.count;
		const lastPage = Math.ceil(totalCount / selPageLength.val());

		pagination.html(paginate(_currentPage, lastPage));

		$(".dataTables_paginate").on('click', function () { onClickPageNum(this); })
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		_currentPage = $(obj).data('page');

		getActions();
	}

	function onClickModalWarningOpen()
	{
		modalWarning.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

