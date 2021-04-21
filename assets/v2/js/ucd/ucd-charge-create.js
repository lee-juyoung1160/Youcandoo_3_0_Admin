
	import { ajaxRequestWithJsonData, headers} from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
		lengthInput, btnSubmit, amount, keyword, modalClose, modalBackdrop,
		modalOpen, btnXlsxImport, updateTable, btnXlsxExport, description, nickname, dataTable
	} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {fadeinModal, fadeoutModal, limitInputLength, emptyFile,} from "../modules/common.js";
	import {initInputNumber, isEmpty, isXlsX, numberWithCommas} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {readExcelData, onClickImportMemberFormExport} from "../modules/export-excel.js";
	import {
	initTableDefaultConfig,
	tableReloadAndStayCurrentPage,
	toggleSingleCheckBox,
	toggleBtnPreviousAndNextOnTable,
		checkBoxElement
	} from "../modules/tables.js";
	let addedUsers = [];

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		amount.trigger('focus');
		/** 이벤트 **/
		amount 			.on('propertychange change keyup paste input', function () { initInputNumber(this); });
		lengthInput 	.on('propertychange change keyup paste input', function () { limitInputLength(this); });
		modalOpen		.on('click', function () { onClickModalOpen(this); });
		modalClose		.on('click', function () { fadeoutModal(); });
		modalBackdrop	.on('click', function () { fadeoutModal(); });
		btnSubmit		.on('click', function () { onSubmitUcd(); });
		btnXlsxImport	.on('change', function () { onClickBtnImport(this); });
		btnXlsxExport	.on('click', function () { onClickImportMemberFormExport(); });
	});

	function onClickModalOpen(obj)
	{
		if (isEmpty(nickname.val()))
		{
			sweetToast(`닉네임을 ${message.input}`);
			nickname.trigger('focus');
			return;
		}

		fadeinModal();

		const inputValue = $(obj).siblings('input').val();
		keyword.val(inputValue);
		buildSearchMemberTable();
	}

	function buildSearchMemberTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.getMember,
				type:"POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.data.count;
					json.recordsFiltered = json.data.count;
					json.data = json.data.list;

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"page" : (d.start / d.length) + 1
						,"limit" : d.length
						,"nickname" : keyword.val()
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: '', 	data: "profile_uuid",   width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
				,{title: "회원",		data: "nickname",    width: "65%",
					render: function (data, type, row, meta) {
						return `<div class="p-info">${data}<span class="p-id">${row.profile_uuid}</span></div>`
					}
				}
				,{title: "보유UCD",	data: "ucd.total",   width: "30%",
					render: function (data) {
						return (
							`<div class="user-ucd">
								<strong>${numberWithCommas(data)}</strong>
							</div>`
						)
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				addEvent();
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function addEvent()
	{
		const chkBoxes = $("input[name=chk-row]");
		chkBoxes.on('click', function () { toggleSingleCheckBox(this); })
		dataTable.on( 'select.dt', function ( e, dt, type, indexes ) { onClickCheckBox(dt, indexes);});
	}

	function onClickCheckBox(dt, indexes)
	{
		addUser(dt, indexes);
		initAddedProfileUuid();
		tableReloadAndStayCurrentPage(dataTable);
	}

	function addUser(dt, indexes)
	{
		const selectedData = dt.rows(indexes).data()[0];
		const {profile_uuid, nickname,} = selectedData;

		const rowEl =
			`<tr>
				<td>깐깐찡엉</td>
				<td>PID-485CAEDB-9DD0-861D-CB67-216AAD7B7929</td>
				<td>20,000,000</td>
				<td>
					<button type="button" class="btn-xs btn-text-red delete-btn"><i class="fas fa-minus-circle"></i></button>
				</td>
			</tr>`;

		let targetTableBody = updateTable.find('tbody');
		targetTableBody.append(rowEl);
		addRemoveRowEvent();
	}

	function addRemoveRowEvent()
	{
		$(".btn-delete-row").on('click', function () { removeRow(this); })
	}

	function removeRow(obj)
	{
		$(obj).parents('tr').remove();
		initAddedProfileUuid();
		tableReloadAndStayCurrentPage(dataTable);
	}

	function initAddedProfileUuid()
	{
		addedUsers.length = 0;
		updateTable.find('tbody').children().each(function () {
			addedUsers.push(this.id);
		});
	}

	function onSubmitUcd()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const url = api.saveUcdForUser;
		const errMsg = label.submit + message.ajaxError;
		const param = {
			"profile_list" : addedUsers,
			"value" : amount.val().trim(),
			"description" : description.val().trim(),
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listUcdCharge;
	}

	function validation()
	{
		if (isEmpty(amount.val()))
		{
			sweetToast(`UCD는 ${message.required}`);
			amount.trigger('focus');
			return false;
		}

		if (Number(amount.val()) > 1000000)
		{
			sweetToast(message.maxAvailableUserUcd);
			amount.trigger('focus');
			return false;
		}

		if (isEmpty(description.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			description.trigger('focus');
			return false;
		}

		return true;
	}

	function onClickBtnImport(obj)
	{
		if (!isXlsX(obj))
		{
			sweetToast(`엑셀(.xlsx) 파일을 ${message.select}`);
			emptyFile(obj);
			return ;
		}

		readExcelData(obj, getExcelData);
		emptyFile(obj);
	}

	function getExcelData(data)
	{
		const url = api.getMemberFromXlsx;
		const errMsg = `회원목록${message.ajaxLoadError}`
		const param = JSON.stringify({ "data" : data });

		//ajaxRequestWithJsonData(true, url, param, getExcelDataCallback, errMsg, false);
	}

	function getExcelDataCallback(data)
	{
		if (!isEmpty(data.data)) selectedUsers = data.data;
		//buildSelectedUser();
		//calculateSelectedCount();
	}
