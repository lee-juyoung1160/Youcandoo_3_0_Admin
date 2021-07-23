
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url-v1.js';
	import {body, btnSearch, btnReset, keyword, dataTable, selPageLength, selSearchType, dateButtons,
		dateFrom, dateTo, rdoStatus, checkTypeWrap,} from '../modules/elements.js';
	import {sweetError, sweetToast} from '../modules/alert.js';
	import {initSelectOption, initPageLength, initSearchDatepicker, onClickDateRangeBtn, initDayBtn, initMaxDateToday,
		atLeastChecked, onChangeSearchDateFrom, onChangeSearchDateTo, initSearchDateRangeWeek} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty, numberWithCommas} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initPage();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday()
		initSearchDateRangeWeek();
		initSelectOption();
		keyword.val('');
		const chkType = $("input[name=chk-type]");
		chkType.eq(0).prop('checked', true);
		chkType.eq(1).prop('checked', true);
		chkType.eq(2).prop('checked', true);
		chkType.eq(3).prop('checked', true);
		rdoStatus.eq(0).prop('checked', true);
	}

	function initPage()
	{
		ajaxRequestWithJson(true, api.systemWalletType, null)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildSystemType(data) : sweetToast(invalidResp(data));
				await initSearchForm();
				await buildTable();
			})
			.catch(reject => sweetError(`구분${message.ajaxLoadError}`));
	}

	function buildSystemType(data)
	{
		if (!isEmpty(data.data) && data.data.length > 0)
		{
			data.data.map((obj, index) => {
				const checkboxEl = `<input id="chk${index}" type="checkbox" name="chk-type" value="${obj.system}"><label for="chk${index}"><span></span>${obj.description}</label>`
				checkTypeWrap.append(checkboxEl);
			})

			$("input[name=chk-type]").on('click', function () { atLeastChecked(this); });
		}
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
				url: api.systemWalletList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.data.count;
						json.recordsFiltered = json.data.count;
						json.data = json.data.list;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					let division = [];
					$("input[name=chk-type]").each(function () {
						if ($(this).is(":checked"))
							division.push($(this).val())
					});
					const status = $("input[name=radio-status]:checked").val();
					const param = {
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"search_type" : selSearchType.val(),
						"keyword" : keyword.val().trim(),
						"send_type" : division,
						"is_receive" : status === 'all' ? '' : status === 'complete' ? 'Y' : 'N',
						"is_expire" : status === 'all' ? '' : status === 'expired' ? 'Y' : 'N',
						"page" : (d.start / d.length) + 1,
						"limit" : d.length,
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "To",    		data: "receive_name",  		width: "30%",
					render: function (data, type, row, meta) {
						switch (row.receive_type) {
							case 'doit' :
								return `[${label.doit}] ${data}`;
							case 'profile' :
								return `[${label.profile}] ${data}`;
							case 'charge' :
								return label.charge;
							case 'level' :
								return label.levelup;
							case 'signup' :
								return label.join;
							default :
								return `[${row.receive_type}] ${data}`;
						}
					}
				}
				,{title: "구분",    		data: "transfer_type",  	width: "10%" }
				,{title: "상세 내용",    	data: "message",  			width: "30%" }
				,{title: "UCD", 		data: "value",				width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "지급 일시",    	data: "sended",  			width: "15%" }
				,{title: "상태",    		data: "status",  			width: "5%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}
