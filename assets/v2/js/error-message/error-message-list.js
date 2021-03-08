
	import {ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {body, btnSearch, btnReset, keyword, dataTable,} from '../modules/elements.js';
	import {sweetToast, sweetConfirm, sweetToastAndCallback} from '../modules/alert.js';
	import {initTableDefaultConfig, buildTotalCount,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchForm();
		/** 목록 불러오기 **/
		getErrorList();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		initButtons();
	}

	function initButtons()
	{
		const btnEdit = $(".btn-edit");
		btnEdit.siblings('input').prop('disabled', true);
		btnEdit.removeClass('btn-primary btn-submit-edit');
		btnEdit.addClass('btn-teal btn-editable');
		btnEdit.text('수정');
	}

	function onKeydownSearch(event)
	{
		if (event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		const table = dataTable.DataTable();
		const inputValue = keyword.val();

		table.search(inputValue).draw();
	}

	function getErrorList()
	{
		const url = api.errorList;
		const errMsg = label.list + message.ajaxLoadError

		ajaxRequestWithJsonData(true, url, null, getErrorListCallback, errMsg, false);
	}

	function getErrorListCallback(data)
	{
		isSuccessResp(data) ? buildTable(data) : sweetToast(data.msg);
	}

	function buildTable(data)
	{
		dataTable.DataTable({
			data: data.data,
			columns: [
				{title: "코드",    		data: "code",  			width: "10%" }
				,{title: "메세지",    	data: "message",  		width: "30%" }
				,{title: "IOS 메세지",    data: "ios_message",	width: "30%",
					render: function (data, type, row, meta) {
						return `<div>
									<input type="text" value="${data}" data-code="${row.code}" data-type="ios_message" style="width: 80%;" disabled/>
									<button type="button" class="btn-sm btn-teal btn-edit btn-editable">수정</button>
								</div>`
					}
				}
				,{title: "AOS 메세지",    data: "aos_message",	width: "30%",
					render: function (data, type, row, meta) {
						return `<div>
									<input type="text" value="${data}" data-code="${row.code}" data-type="aos_message" style="width: 80%;" disabled/>
									<button type="button" class="btn-sm btn-teal btn-edit btn-editable">수정</button>
								</div>`
					}
				}
			],
			serverSide: false,
			searching: true,
			dom: 'lrt',
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
				addEditableEvent();
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
			}
		});
	}

	function addEditableEvent()
	{
		document.querySelectorAll('.btn-edit').forEach( element => element.addEventListener('click', onClickEditable));
	}

	function onClickEditable(event)
	{
		initButtons();

		const btnTarget = event.target;
		$(btnTarget).siblings('input').prop('disabled', false);
		$(btnTarget).siblings('input').trigger('focus');
		$(btnTarget).removeClass('btn-teal btn-editable');
		$(btnTarget).addClass('btn-primary btn-submit-edit');
		$(btnTarget).text('완료');

		addSubmitEvent(btnTarget);
	}

	function addSubmitEvent(_target)
	{
		removeSubmitEvent();
		addEditableEvent();

		_target.removeEventListener('click', onClickEditable);
		_target.addEventListener('click', onSubmitEdit);
	}

	function removeSubmitEvent()
	{
		document.querySelectorAll('.btn-edit').forEach( element => element.removeEventListener('click', onSubmitEdit));
	}

	let inputValue;
	let messageCode;
	let messageType;
	function onSubmitEdit(event)
	{
		const btnTarget = event.target;
		const inputTarget = $(btnTarget).siblings();
		inputValue = $(inputTarget).val();
		messageCode = $(inputTarget).data('code');
		messageType = $(inputTarget).data('type');

		if (isEmpty(inputValue))
		{
			sweetToast(`메세지를 ${message.input}`);
			$(inputTarget).trigger('focus');
			return;
		}

		sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		const url = api.updateError;
		const errMsg = label.modify+message.ajaxError;
		const param = { "code" : messageCode }
		messageType === 'ios_message' ? param.ios_message = inputValue : param.aos_message = inputValue;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateReqCallback, errMsg, false);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, getErrorList);
	}
