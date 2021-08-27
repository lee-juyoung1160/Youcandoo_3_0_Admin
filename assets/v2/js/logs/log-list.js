
	import {headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {
		body, btnSearch, btnReset, keyword, dataTable, selPageLength, selSearchType, dateButtons, dateFrom, dateTo,
		keywordWrap, btnAdd, startTime, endTime,
	} from '../modules/elements.js';
	import {sweetError, sweetToast} from '../modules/alert.js';
	import {
		initSelectOption, initPageLength, initSearchDatepicker, onClickDateRangeBtn, initDayBtn, initMaxDateToday,
		setDateToday, onChangeSearchDateFrom, onChangeSearchDateTo, copyToClipboard,
	} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty, numberWithCommas,} from "../modules/utils.js";

	let firstBuild = true;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
		buildEmptyTable();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
		btnAdd			.on("click", function () { onClickBtnAdd(); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday();
		setDateToday();
		initSelectOption();
		keyword.val('');
		startTime.val('00:00:00');
		endTime.val('23:59:59');
		keywordWrap.empty();
	}

	function onClickBtnAdd()
	{
		if (isEmpty(keyword.val()))
		{
			sweetToast(`검색어를 ${message.input}`)
			keyword.trigger('focus');
			return;
		}

		const type = selSearchType.val();
		switch (type) {
			case 'all' :
				keywordWrap.empty();
				selSearchType.children().each(function () {
					if (this.value === 'all') return;
					appendKeyword(this.value);
				})
				keyword.val('');
				keyword.trigger('focus');
				break;
			default :
				appendKeyword(type);
				keyword.val('');
				keyword.trigger('focus');
		}
	}

	function appendKeyword(type)
	{
		let keywordArr = [];
		keywordWrap.children().each(function () {
			keywordArr.push($(this).children().eq(0).text());
		});

		if (isEmpty(keywordArr) || keywordArr.indexOf(type) === -1)
		{
			const addKeyword =
				`<li>
                    <strong>${type}</strong>
                     : <span>${keyword.val().trim()}</span>
                    <button class="btn-i btn-del-keyword"><i class="fas fa-times-circle"></i></button>
                </li>`

			keywordWrap.append(addKeyword);
			$(".btn-del-keyword").off().on('click', function () { removeKeyword(this); });
		}
	}

	function removeKeyword(obj)
	{
		$(obj).parent().remove();
		keyword.trigger('focus')
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		const startDatetime = new Date(`${dateFrom.val()} ${startTime.val()}`).getTime();
		const endDatetime = new Date(`${dateTo.val()} ${endTime.val()}`).getTime();
		if (startDatetime > endDatetime)
		{
			sweetToast(`날짜를 ${message.doubleChk}`);
			startTime.trigger('focus');
			return;
		}

		if (firstBuild)
		{
			buildTable();
			firstBuild = false;
			return;
		}

		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function buildTable()
	{
		const table = dataTable.DataTable();
		table.destroy();
		dataTable.empty();
		dataTable.DataTable({
			ajax : {
				url: api.logList,
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
					const filters = [];
					keywordWrap.children().each(function () {
						filters.push({
							[$(this).children().eq(0).text()] : $(this).children().eq(1).text()
						});
					});
					const param = {
						"from_date" : `${dateFrom.val()} ${startTime.val()}`,
						"to_date" : `${dateTo.val()} ${endTime.val()}`,
						"page" : (d.start / d.length) + 1,
						"limit" : d.length,
						"filter": filters
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "apache_idx",			data: "apache_idx",  	width: "7%" }
				,{title: "uniqueid",			data: "uniqueid",  		width: "13%",
					render: function (data) {
						return `<div><input type="text" class="input-copy" style="width: 150px" value="${data}" readonly=""><i class="fas fa-copy"></i></div>`
					}
				}
				,{title: "apache_request",		data: "apache_request", width: "24%" }
				,{title: "apache_status",		data: "apache_status",  width: "8%" }
				,{title: "php_idx",				data: "php_idx",  		width: "7%" }
				,{title: "php_status",			data: "php_status",  	width: "7%" }
				,{title: "account_token",		data: "account_token",  width: "13%",
					render: function (data) {
						return isEmpty(data)
							? label.dash
							: `<div><input type="text" class="input-copy" style="width: 150px" value="${data}" readonly=""><i class="fas fa-copy"></i></div>`
					}
				}
				,{title: "time",				data: "time",  			width: "13%" }
				,{title: "process_time",		data: "process_time",  	width: "8%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(1).find('i').off().on('click', function () { copyToClipboard(this); });
				$(nRow).children().eq(6).find('i').off().on('click', function () { copyToClipboard(this); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildEmptyTable()
	{
		dataTable.DataTable({
			data: [],
			columns: [
				{title: "apache_idx",			data: "apache_idx",  	width: "7%" }
				,{title: "uniqueid",			data: "uniqueid",  		width: "13%",
					render: function (data) {
						return `<div><input type="text" class="input-copy" style="width: 150px" value="${data}" readonly=""><i class="fas fa-copy"></i></div>`
					}
				}
				,{title: "apache_request",		data: "apache_request", width: "24%" }
				,{title: "apache_status",		data: "apache_status",  width: "8%" }
				,{title: "php_idx",				data: "php_idx",  		width: "7%" }
				,{title: "php_status",			data: "php_status",  	width: "7%" }
				,{title: "account_token",		data: "account_token",  width: "13%",
					render: function (data) {
						return isEmpty(data)
							? label.dash
							: `<div><input type="text" class="input-copy" style="width: 150px" value="${data}" readonly=""><i class="fas fa-copy"></i></div>`
					}
				}
				,{title: "time",				data: "time",  			width: "13%" }
				,{title: "process_time",		data: "process_time",  	width: "8%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
		});
	}
