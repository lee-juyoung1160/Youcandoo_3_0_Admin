
	import { ajaxRequestWithJsonData} from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
	lengthInput,
	btnSubmit,
	content,
	amount,
	memo,
	keyword,
	modalClose,
	modalBackdrop,
	modalOpen, btnXlsxImport, updateTable, price,
} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback } from  '../modules/alert.js';
	import {fadeinModal, fadeoutModal, limitInputLength, emptyFile} from "../modules/common.js";
	import {initInputNumber, isEmpty, isXlsX} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {readExcelData} from "../modules/export-excel.js";
	let selectedUsers = [];

	$( () => {
		amount.trigger('focus');
		/** 이벤트 **/
		amount 			.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		modalOpen		.on("click", function () { onClickModalOpen(this); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmit		.on('click', function () { onSubmitUcd(); });
		btnXlsxImport	.on("change", function () { onClickBtnImport(this); });
	});

	function onClickModalOpen(obj)
	{
		fadeinModal();

		const inputValue = $(obj).siblings('input').val();
		keyword.val(inputValue);
		//buildSearchMemberTable();
	}

	function buildSearchMemberTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.getMember,
				type:"POST",
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: '', 	data: "profile_uuid",   width: "5%",
					render: function (data, type, row, meta) {
						return multiCheckBoxDom(meta.row);
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
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function onSubmitUcd()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const url 	= api.createMemberUcd;
		const errMsg 	= label.submit+message.ajaxError;
		const param = {
			"faq_type" : selFaqType.val(),
			"faq_title" : title.val().trim(),
			"faq_contents" : content.val().trim(),
			"is_exposure" : $('input:radio[name=radio-exposure]:checked').val(),

		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
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

		if (amount.val() > 1000000)
		{
			sweetToast(`UCD는 ${message.maxAvailableUserUcd}`);
			amount.trigger('focus');
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			content.trigger('focus');
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
		buildSelectedUser();
		calculateSelectedCount();
	}

	function onClickAddUser()
	{
		if (addUserValidation())
			addUsers();
	}

	function addUserValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		if (selectedData.length === 0)
		{
			sweetToast(`출금 대상을 ${message.addOn}`);
			return false;
		}

		if (hasDuplicateId())
		{
			sweetToast(message.alreadyHasUser);
			return false;
		}

		return true;
	}

	function hasDuplicateId()
	{
		let result = false;
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		let selectedUsersId = [];
		selectedUsers.map((value) => {
			selectedUsersId.push(value.profile_uuid);
		})

		for (let i=0; i<selectedData.length; i++)
		{
			let { profile_uuid } = selectedData[i];

			if (selectedUsersId.indexOf(profile_uuid) !== -1)
				result = true;
		}

		return result;
	}

	function addUsers()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();
		let users = [];
		for (let i=0; i<selectedData.length; i++)
		{
			let { nickname, profile_uuid, ucd } = selectedData[i];
			let userInfo = { "nickname" : nickname, "profile_uuid" : profile_uuid, "ucd" : ucd.total };
			users.push(userInfo);
		}
		selectedUsers = users.concat(selectedUsers);

		buildSelectedUser();
		calculateSelectedCount();
	}

	function buildSelectedUser()
	{
		updateTable.DataTable({
			data: selectedUsers,
			columns: [
				{title: "회원",			data: "nickname",	width: "65%",
					render: function (data, type, row, meta) {
						return `<div class="p-info">${data}<span class="p-id">${row.profile_uuid}</span></div>`
					}
				}
				,{title: "보유 UCD",		data: "ucd",    	width: "30%",
					render: function (data) {
						return `${numberWithCommas(data)}`;
					}
				}
				,{title: "", 	data: "", 		width: "5%",
					render: function (data, type, row, meta) {
						return `<i style="color: #ec5c5c;" data-row="${meta.row}" onclick="removeRow(this); calculateSelectedCount();" class="far fa-times-circle"></i>`
					}
				}
			],
			serverSide: false,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
				/** 데이터 없을 때 조회결과없음 로우 엘리먼트 삭제 **/
				if (!hasDataOnDatatable(this))
					removeEmptyRowFromTable();
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
			}
		});
	}

	function removeRow(obj)
	{
		let idx = $(obj).data('row');
		selectedUsers.splice(idx, 1);

		$(obj).closest('tr').remove();

		buildSelectedUser();
	}

	function calculateSelectedCount()
	{
		let count = selectedUsers.length;
		selectedUserCount.html(count.toString());
	}

