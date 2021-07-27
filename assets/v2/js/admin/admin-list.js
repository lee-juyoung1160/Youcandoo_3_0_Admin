
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url-v1.js';
	import {body, btnSearch, btnReset, keyword, dataTable, selPageLength, selSearchType,
		selAuthType, btnApproval} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {initSelectOption, initPageLength} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,
		getCurrentPage, redrawPage, checkBoxElement} from '../modules/tables.js';
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
		btnApproval.on("click", function () { onSubmitApproval(); });
	});

	function initSearchForm()
	{
		initSelectOption();
		keyword.val('');
	}

	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		selSearchType.val(historyParams.search_type);
		keyword.val(historyParams.keyword);
		selAuthType.val(historyParams.auth_code);
		selPageLength.val(historyParams.limit);
		_currentPage = historyParams.page;
	}

	function initPage()
	{
		ajaxRequestWithJson(false, api.authList, null)
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					await buildAuthType(data);
					await isBackAction() ? setHistoryForm() : initSearchForm();
					await buildTable();
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`권한 목록을${message.ajaxLoadError}`));
	}

	function buildAuthType(data)
	{
		let options = '<option value="all">전체</option>';
		if (!isEmpty(data.data) && data.data.length  > 0)
		{
			data.data.map(auth => {
				const {code, name} = auth;
				options += `<option value="${code}">${name}</option>`;
			})
		}

		selAuthType.html(options);
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
				url: api.adminList,
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
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "권한",    	data: "auth_name",  		width: "10%",
					render: function (data, type, row, meta) {
						return row.status === '승인' ? data : buildAuth();
					}
				}
				,{title: "기업명", 	data: "company_name",		width: "10%",
					render: function (data, type, row, meta) {
						return row.status === '승인' ? isEmpty(data) ? label.dash : data : label.dash;
					}
				}
				,{title: "이름",    	data: "name",  				width: "10%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailAdmin}${row.idx}">${data}</a>`;
					}
				}
				,{title: "이메일",    data: "email",  			width: "20%" }
				,{title: "최근 접속",  data: "recent_datetime",  	width: "15%" }
				,{title: "승인여부",   data: "status",  			width: "10%" }
				,{title: "사용여부",   data: "is_active",  		width: "10%" }
				,{title: "",   		data: "idx",  				width: "5%",
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
				$(this).on('page.dt', function () { _currentPage = getCurrentPage(this); });
				redrawPage(this, _currentPage);
			},
			fnRowCallback: function( nRow, aData ) {
				if (aData.status === '승인')
					$(nRow).children().eq(7).find('input').prop('disabled', true);
				else
					$(nRow).children().eq(0).find('select').off().on('change', function () { onChangeAuth(this) });
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
			"search_type" : selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"auth_code" : selAuthType.val(),
			"page": _currentPage,
			"limit": selPageLength.val(),
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildAuth()
	{
		const options = selAuthType.children();

		let selectBox = '<select class="select-box">';
		options.each(function (index) {
			if (index === 0) return;
			selectBox += `<option value="${$(this).val()}">${$(this).text()}</option>`;
		})
		selectBox += '</select>';

		return selectBox;
	}

	let appendTarget;
	function onChangeAuth(obj)
	{
		appendTarget = $(obj).closest('tr').children().eq(1);

		$(obj).val() === 'biz' ? getBiz() : appendTarget.empty();
	}

	function getBiz()
	{
		ajaxRequestWithJson(false, api.authBizList, null)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildBiz(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`기업 목록을${message.ajaxLoadError}`));
	}

	function buildBiz(data)
	{
		if (!isEmpty(data.data) && data.data.length > 0)
		{
			let bizSelectBox = '<select class="select-box">';
			data.data.map(biz => {
				const {idx, nickname} = biz;
				bizSelectBox += `<option value="${idx}">${nickname}</option>`;
			})
			bizSelectBox += '</select>';

			appendTarget.html(bizSelectBox);
		}
	}

	function onSubmitApproval()
	{
		if (approvalValid())
			sweetConfirm(message.approve, approvalRequest)
	}

	function approvalValid()
	{
		if (isEmpty(getSelectedData()))
		{
			sweetToast(`대상을 ${message.select}`);
			return false;
		}

		const selectedRow = selectedRowElement();
		const selectAuth = $(selectedRow).children().eq(0).find('select')
		if (isEmpty($(selectAuth).val()))
		{
			sweetToast(`권한을 ${message.select}`);
			$(selectAuth).trigger('focus');
			return false;
		}

		const selectBiz = $(selectedRow).children().eq(1).find('select')
		if ($(selectAuth).val() === 'biz' && isEmpty($(selectBiz).val()))
		{
			sweetToast(`기업명을 ${message.select}`);
			$(selectBiz).trigger('focus');
			return false;
		}

		return true;
	}

	function approvalRequest()
	{
		const selectedRow = selectedRowElement();
		const selectAuth = $(selectedRow).children().eq(0).find('select')
		const param = {
			"userid" : getSelectedData().userid,
			"app_user" : getSelectedData().name,
			"auth_code" : $(selectAuth).val(),
		}

		if ($(selectAuth).val() === 'biz')
		{
			const selectBiz = $(selectedRow).children().eq(1).find('select')
			param['company_idx'] = $(selectBiz).val();
		}

		ajaxRequestWithJson(true, api.approvalAdmin, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, onSubmitSearch);
			})
			.catch(reject => sweetError(`관리자 승인${message.ajaxError}`));
	}

	function getSelectedData()
	{
		const table = dataTable.DataTable();
		return table.rows('.selected').data()[0];
	}

	function selectedRowElement()
	{
		return $("#dataTable tbody").children('.selected');
	}
