
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url-v1.js';
	import {
		body, btnSearch, btnReset, keyword, dataTable, selPageLength, modalClose, modalBackdrop, dateButtons,
		dateFrom, dateTo, selSearchType, content, btnDelete
	} from '../modules/elements.js';
	import {sweetError, sweetToast, sweetConfirm, sweetToastAndCallback} from '../modules/alert.js';
	import {
		initSelectOption, initPageLength, initSearchDatepicker, initDayBtn, initMaxDateMonths,
		initSearchDateRangeMonth, fadeoutModal, fadeinModal, onClickDateRangeBtn, onChangeSearchDateFrom,
		onChangeSearchDateTo, copyToClipboard
	} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable, checkBoxElement,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		initSearchForm();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		addViewDetailEvent()
		/** 목록 불러오기 **/
		buildTable();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
		btnDelete		.on("click", function () { onSubmitDelete(); })
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateMonths()
		initSearchDateRangeMonth();
		initSelectOption();
		keyword.val('');
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.pushList,
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
						"date_type" : "created",
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"search_type" : selSearchType.val(),
						"keyword" : keyword.val().trim(),
						"page": (d.start / d.length) + 1,
						"limit": selPageLength.val(),
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "고유 ID", 			data: "message_id",  			width: "10%",
					render: function (data) {
						return `<div>
								 	<input type="text" class="input-copy" style="width: 100px" value="${data}" readonly><i class="fas fa-copy"></i>
								</div>`;
					}
				}
				,{title: "내용", 			data: "message",  				width: "15%",
					render: function (data) {
						return `<div data-detail="${data}" class="line-clamp view-detail">${data}</div>`;
					}
				}
				,{title: "스토어", 			data: "store",    	  			width: "5%",
					render: function (data) {
						return data === 'all' ? '전체' : data;
					}
				}
				,{title: "구분", 			data: "target_type",  			width: "5%",
					render: function (data) {
						return getPushTargetName(data);
					}
				}
				,{title: "이동페이지", 		data: "target",  				width: "25%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? '-' : `[${getPushTargetName(row.target_type)}] ${row.target_title}`
					}
				}
				,{title: "등록일", 			data: "created",				width: "10%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "발송(예약)일시", 		data: "send_datetime",  		width: "15%" }
				,{title: "발송대상 ", 		data: "send_profile_type", 	  	width: "5%",
					render: function (data) {
						return data === 'all' ? '전체' : '개인';
					}
				}
				,{title: "발송여부", 			data: "send_status",    		width: "5%" }
				,{title: "",				data: "idx",   					width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				$(this).on( 'select.dt', function ( e, dt, type, indexes ) { $("input[name=chk-row]").eq(indexes).prop('checked', true); });
				$(this).on( 'deselect.dt', function ( e, dt, type, indexes ) { $("input[name=chk-row]").eq(indexes).prop('checked', false) });
				addViewDetailEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(4).find('i').on('click', function () { copyToClipboard(this); });
				if (['발송', '발송취소'].indexOf(aData.send_status) > -1)
					$(nRow).children().eq(9).find('input').prop('disabled', true);
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function addViewDetailEvent()
	{
		$(".view-detail").on('click', function () { viewDetail(this); })
	}

	function viewDetail(obj)
	{
		fadeinModal();
		content.empty();
		content.text( $(obj).data('detail'));
	}

	function getPushTargetName(data)
	{
		switch (data) {
			case 'notice' :
				return '공지';
			case 'event' :
				return '이벤트';
			case 'doit' :
				return '두잇';
			default :
				return '일반'
		}
	}

	function onSubmitDelete()
	{
		if (deleteValid())
			sweetConfirm(message.cancel, deleteRequest);
	}

	function deleteRequest()
	{
		const param = { "idx" : getSelectedPushIdx() }

		ajaxRequestWithJson(true, api.cancelPush, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, onSubmitSearch);
			})
			.catch(reject => sweetError(`취소 ${message.ajaxError}`));
	}

	function deleteValid()
	{
		if (isEmpty(getSelectedPushIdx()))
		{
			sweetToast(`대상을 ${message.select}`);
			return false;
		}

		return true;
	}

	function getSelectedPushIdx()
	{
		const table = dataTable.DataTable();
		const selectedData = table.rows('.selected').data()[0];

		return isEmpty(selectedData) ? '' : selectedData.idx;
	}
