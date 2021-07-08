
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api, } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, selPageLength, dateButtons, modalDetail, modalWarning, modalOpen, modalClose,
		modalBackdrop, btnCancel, chkStatus, dateFrom, dateTo, pagination, actionsWrap, selDateType, modalActionContentWrap,
		modalActionDesc, modalActionWarningReason, modalActionExampleWrap, modalActionExampleDesc, totalActionCount,
		btnSendWarning, selReason, modalReason, reasonTable,} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback,} from '../modules/alert.js';
	import {initSelectOption, initPageLength, initSearchDatepicker, initDayBtn, initMaxDateToday, onClickDateRangeBtn, fadeoutModal, overflowHidden,
		paginate, setDateToday, onChangeSearchDateFrom, onChangeSearchDateTo, onErrorImage, atLeastChecked} from "../modules/common.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";
	import {initTableDefaultConfig} from "../modules/tables.js";

	let _currentPage = 1;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
		/** 목록 불러오기 **/
		getActions();
		/** 이벤트 **/
		body  			.on('keydown', function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		modalOpen		.on('click', function () { onClickModalWarningOpen(); });
		modalClose		.on('click', function () { fadeoutModal(); });
		modalBackdrop	.on('click', function () { fadeoutModal(); });
		selPageLength	.on('change', function () { onSubmitSearch(); });
		btnSearch		.on('click', function () { onSubmitSearch(); });
		btnReset		.on('click', function () { initSearchForm(); });
		dateButtons		.on('click', function () { onClickDateRangeBtn(this); });
		chkStatus.on('click', function () { atLeastChecked(this); });
		btnCancel.on('click', function () { onClickBtnCancel(); });
		btnSendWarning.on('click', function () { onSubmitSendWarning(); });
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

		ajaxRequestWithJson(true, api.reportActionList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? getActionsCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(label.list + message.ajaxLoadError));
	}

	function getActionsCallback(data)
	{
		totalActionCount.text(numberWithCommas(data.count));
		buildActions(data);
		buildPagination(data);
	}

	function buildActions(data)
	{
		let actionEl = '<div class="card"><p class="message">인증 정보가 없습니다.</p></div>';
		if (!isEmpty(data.data) && data.count > 0)
		{
			actionEl = '';

			data.data.map( (obj, index) => {
				const {action_date, action_uuid, contents_type, contents_url, doit_title, nickname, report_count, thumbnail_url, is_yellow} = obj;
				const hasWarning = is_yellow === 'Y';
				const warningEl = hasWarning ? `<strong class="red-card"><img src="${label.redCardImage}" alt=""></strong>` : '';
				const disabled = hasWarning ? 'disabled' : '';
				const reportCnt = Number(report_count) > 0 ? `<a class="link report-count" data-uuid="${action_uuid}">${report_count}</a>` :  report_count;

				let actionContentImage;
				if (contents_type === label.image)
					actionContentImage = contents_url;
				else if (contents_type === label.audio)
					actionContentImage = label.voiceImage
				else if (contents_type === label.video)
					actionContentImage = thumbnail_url;

				if (index===0 || index%6 === 0)
					actionEl += '<div class="row">';

				actionEl +=
					`<div class="col-2 auth-item">
						<div class="card">
							<div class="top clearfix">
								<div class="checkbox-wrap">
									<input id="action_${index}" type="checkbox" name="chk-action" data-uuid="${action_uuid}" ${disabled}>
									<label for="action_${index}"><span></span></label>
								</div>
								<div class="right-wrap">
									<span><i class="fas fa-exclamation-triangle"></i> ${reportCnt}</span>
								</div>
							</div>
							<div class="img-wrap action-content" data-uuid="${action_uuid}">
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

		onErrorImage();

		$(".action-content").on('click', function () { onClickAction(this); })
		$(".report-count").on('click', function () { onClickReportCount(this); })
	}

	function buildPagination(data)
	{
		const totalCount  = data.count;
		const lastPage = Math.ceil(totalCount / selPageLength.val());

		pagination.html(paginate(_currentPage, lastPage));

		$(".paginate_button ").on('click', function () { onClickPageNum(this); })
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		_currentPage = $(obj).data('page');

		getActions();
	}

	let g_action_detail_uuid;
	function onClickAction(obj)
	{
		g_action_detail_uuid = $(obj).data('uuid');
		modalDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		getDetailAction();
	}

	function getDetailAction()
	{
		const param = { "action_uuid" : g_action_detail_uuid }

		ajaxRequestWithJson(false, api.memberActionDetail, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildModalActionDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`인증 정보${message.ajaxLoadError}`));
	}

	function buildModalActionDetail(data)
	{
		const {action_contents_type, action_contents_url, action_description, example_contents_type, example_contents_url, example_description, is_yellow, yellow_reason} = data.data;

		let contentEL = `<button type="button" class="btn-xs btn-outline-success btn-download" data-url="${action_contents_url}"><i class="fas fa-download"></i> 인증 다운로드</button>`;
		switch (action_contents_type) {
			case label.image :
				contentEL += `<div class="img-wrap"><img src="${action_contents_url}" alt=""></div>`
				break;
			case label.video :
				contentEL += `<div class="video-wrap"><video controls><source src="${action_contents_url}"/></video></div>`
				break;
			case label.audio :
				contentEL += `<div class="audio-wrap"><img src="${label.voiceImage}" alt=""><audio controls><source src="${action_contents_url}"/></audio></div>`
				break;
		}
		let exampleEl = '';
		switch (example_contents_type) {
			case label.image :
				exampleEl = `<div class="img-wrap"><img src="${example_contents_url}" alt=""></div>`
				break;
			case label.video :
				exampleEl = `<div class="video-wrap"><video controls><source src="${example_contents_url}"/></video></div>`
				break;
			case label.audio :
				exampleEl = `<div class="audio-wrap"><img src="${label.voiceImage}" alt=""><audio controls><source src="${example_contents_url}"/></audio></div>`
				break;
		}
		modalActionContentWrap.html(contentEL);
		modalActionDesc.text(action_description);
		const hasYellow = is_yellow === 'Y';
		hasYellow ? btnCancel.show() : btnCancel.hide();
		modalActionWarningReason.text(hasYellow ? yellow_reason : label.dash);
		modalActionExampleWrap.html(exampleEl);
		modalActionExampleDesc.text(example_description);
		onErrorImage();

		$(".btn-download").on('click', function () { downloadAction(this); });
	}

	let report_reason_uuid;
	function onClickReportCount(obj)
	{
		report_reason_uuid = $(obj).data('uuid');
		modalReason.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		buildReasonTable();
	}

	function buildReasonTable()
	{
		reasonTable.DataTable({
			ajax : {
				url: api.actionReportReasonList,
				type: "POST",
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
						"action_uuid": report_reason_uuid,
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "일자", 		data: "created",    			width: "25%" }
				,{title: "사유", 	data: "report_description",    	width: "75%" }
			],
			serverSide: true,
			paging: false,
			select: false,
			scrollY: 450,
			scrollCollapse: true,
			destroy: true,
		});
	}

	function downloadAction(obj)
	{
		download($(obj).data('url'));
	}

	function onClickBtnCancel()
	{
		sweetConfirm(message.cancel, cancelRequest);
	}

	function cancelRequest()
	{
		const param = { "action_uuid" : [g_action_detail_uuid] }

		ajaxRequestWithJson(true, api.cancelWarning, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, requestSuccess);
			})
			.catch(reject => sweetToast(`경고장 발송 취소 ${message.ajaxError}`));
	}

	function onClickModalWarningOpen()
	{
		if (hasCheckedAction())
		{
			modalWarning.fadeIn();
			modalBackdrop.fadeIn();
			overflowHidden();
		}
	}

	function hasCheckedAction()
	{
		const checkedActionEl = $("input[name=chk-action]:checked");
		const checkedCount = checkedActionEl.length;
		if (checkedCount === 0)
		{
			sweetToast(`발송대상을 ${message.select}`);
			return false;
		}

		return true;
	}

	function onSubmitSendWarning()
	{
		sweetConfirm(`경고장을 ${message.send}`, sendWarningRequest);
	}

	function sendWarningRequest()
	{
		let action_uuids = [];
		$("input[name=chk-action]:checked").each(function () {
			action_uuids.push($(this).data('uuid'));
		})
		const param = {
			"action_uuid" : action_uuids,
			"reason" : selReason.val()
		};

		ajaxRequestWithJson(true, api.sendWarning, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, requestSuccess);
			})
			.catch(reject => sweetToast(message.ajaxLoadError));
	}

	function requestSuccess()
	{
		fadeoutModal();
		getActions();
	}
