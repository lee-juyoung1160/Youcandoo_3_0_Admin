
	import {ajaxRequestWithJson, headers, invalidResp, isSuccessResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, keyword, dataTable, updateTable, selFaqType,
		selPageLength, rdoExposure, modalOpen, modalClose, modalBackdrop, btnUpdate, selSearchType,
	} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {initSelectOption, initPageLength, fadeoutModal, fadeinModal} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, getCurrentPage, redrawPage} from '../modules/tables.js';
	import {getHistoryParam, isBackAction, setHistoryParam} from "../modules/history.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {isEmpty} from "../modules/utils.js";

	let _currentPage = 1;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initPage();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		modalOpen		.on("click", function () { onClickModalOpen(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnUpdate		.on("click", function () { onSubmitUpdate(); });
	});

	function initSearchForm()
	{
		initSelectOption();
		keyword.val('');
		rdoExposure.eq(0).prop('checked', true);
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();
		selSearchType.val(historyParams.search_type);
		keyword.val(historyParams.keyword);
		selPageLength.val(historyParams.limit);
		rdoExposure.each(function () {
			if ($(this).val() === historyParams.is_exposure)
				$(this).prop("checked", true);
		});
		selFaqType.val(historyParams.faq_type);
		_currentPage = historyParams.page;
	}

	function initPage()
	{
		ajaxRequestWithJson(false, api.faqType, null)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildFaqType(data) : sweetToast(invalidResp(data));
				await isBackAction() ? setHistoryForm() : initSearchForm();
				await buildTable();
			})
			.catch(reject => sweetToast(`faq 타입${message.ajaxLoadError}`));
	}

	function buildFaqType(data)
	{
		let options = '<option value="all" selected>전체</option>';
		if (!isEmpty(data.data) && data.data.length  > 0)
		{
			data.data.map(type => {
				options += `<option value="${type}">${type}</option>`;
			})
		}

		selFaqType.html(options);
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		_currentPage = 1;
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.faqList,
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
						sweetToast(json.msg);
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분",    		data: "faq_type",		width: "10%" }
				,{title: "제목", 		data: "title",			width: "50%",
					render: function (data, type, row, meta) {
						const detailUrl = page.detailFaq + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "노출여부",    	data: "is_exposure",  	width: "10%" }
				,{title: "작성자",    	data: "created_user",  	width: "15%" }
				,{title: "등록일",    	data: "created",  		width: "15%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
				$(this).on('page.dt', function () { _currentPage = getCurrentPage(this); });
				redrawPage(this, _currentPage);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		const param = {
			"faq_type" : selFaqType.val(),
			"search_type" : selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"is_exposure" : $("input[name=radio-exposure]:checked").val(),
			"page" : _currentPage,
			"limit" : selPageLength.val(),
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onClickModalOpen()
	{
		fadeinModal();
		buildUpdateTable();
	}

	function buildUpdateTable()
	{
		updateTable.DataTable({
			ajax : {
				url: api.faqList,
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
						sweetToast(json.msg);
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"faq_type" : 'all',
						"search_type" : 'title_content',
						"keyword" : '',
						"is_exposure" : 'Y',
						"page" : 1,
						"limit" : 9999,
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분",    	data: "faq_type",	width: "10%" }
				,{title: "제목", 	data: "title",		width: "45%" }
				,{title: "내용",     data: "contents",  	width: "45%",
					render: function (data) {
						return `<div class="line-clamp-1" style="max-width: 450px;">${data}</div>`;
					}
				}
			],
			serverSide: true,
			paging: false,
			select: false,
			scrollY: 650,
			scrollCollapse: true,
			destroy: true,
			initComplete: function () {
				initTableSort();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('data-uuid', aData.faq_uuid);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function initTableSort()
	{
		updateTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	}

	function addAttrDragonElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*10)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*45)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*45)+'px');
		return $(el);
	}

	function onSubmitUpdate()
	{
		if (updateValidation())
			sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		const param = { "faq_uuid" : getRowIds() };

		ajaxRequestWithJson(true, api.reorderFaq, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, reorderSuccess);
			})
			.catch(reject => sweetToast(label.modify + message.ajaxError));
	}

	function reorderSuccess()
	{
		fadeoutModal();
		onSubmitSearch();
	}

	function updateValidation()
	{
		if (getRowIds().length === 0)
		{
			sweetToast(message.emptyList);
			return false;
		}

		return true;
	}

	function getRowIds()
	{
		const rows = updateTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			let uuid = $(rows[i]).data('uuid');
			if (isEmpty(uuid)) continue;
			uuids.push(uuid);
		}

		return uuids;
	}
