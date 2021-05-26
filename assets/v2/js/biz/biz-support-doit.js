
	import {ajaxRequestWithJsonData, headers, isSuccessResp} from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
	lengthInput,
	btnSubmit,
	amount,
	keyword,
	modalClose,
	modalBackdrop,
	modalOpen,
	btnXlsxImport,
	updateTable,
	btnXlsxExport,
	description,
	nickname,
	dataTable,
	btnSearch,
	totalCount, contentImage, title, balance,
} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {fadeinModal, fadeoutModal, limitInputLength, emptyFile, onErrorImage,} from "../modules/common.js";
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
		checkBoxElement,
	} from "../modules/tables.js";
	let addedUsers = [];
	let addedUserObj = [];

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		//buildSearchMemberTable();
		getBizInfo();
		amount.trigger('focus');
		/** 이벤트 **/
		amount 			.on('propertychange change keyup paste input', function () { initInputNumber(this); });
		lengthInput 	.on('propertychange change keyup paste input', function () { limitInputLength(this); });
		modalOpen		.on('click', function () { onClickModalOpen(this); });
		modalClose		.on('click', function () { fadeoutModal(); });
		modalBackdrop	.on('click', function () { fadeoutModal(); });
		btnXlsxImport	.on('change', function () { onClickBtnImport(this); });
		btnXlsxExport	.on('click', function () { onClickImportMemberFormExport(); });
		btnSearch		.on('click', function () { onSubmitSearchMember(); })
		btnSubmit		.on('click', function () { onSubmitUcd(); });
	});

	function getBizInfo()
	{
		const url = api.detailBiz;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : $("#hiddenIdx").val()
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	let g_company_uuid;
	let g_profile_uuid;
	function getDetailCallback(data)
	{
		if (isSuccessResp(data))
		{
			g_company_uuid = data.data.company_uuid;
			g_profile_uuid = data.data.profile_uuid;
			buildBizInfo(data);
			getBalance();
		}
		else
			sweetToast(data.msg);
	}

	function buildBizInfo(data)
	{
		const { profile_image_url, nickname, } = data.data;

		contentImage.attr('src', profile_image_url);
		title.text(nickname);

		onErrorImage();
	}

	function getBalance()
	{
		const url = api.getBizUcd;
		const errMsg = `보유 UCD ${message.ajaxLoadError}`;
		const param = {
			"profile_uuid" : g_profile_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getBalanceCallback, errMsg, false);
	}

	function getBalanceCallback(data)
	{
		isSuccessResp(data) ? buildBalance(data) : sweetToast(`보유 UCD ${data.msg}`);
	}

	function buildBalance(data)
	{
		balance.text(numberWithCommas(data.data.ucd));
	}

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
		//onSubmitSearchMember();
	}

	function onSubmitSearchMember()
	{
		if (isEmpty(keyword.val()))
		{
			sweetToast(`닉네임을 ${message.input}`);
			keyword.trigger('focus');
			return;
		}

		const table = dataTable.DataTable();
		table.page.len(5);
		table.ajax.reload();
	}

	function buildSearchMemberTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.getMember,
				type:"POST",
				headers: headers,
				global: false,
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
						sweetToast(json.msg);
					}

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
				{title: "닉네임",		data: "nickname",    	width: "30%" }
				,{title: "PID",		data: "profile_uuid",   width: "45%" }
				,{title: "보유UCD",	data: "amount_ucd",   	width: "20%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: '', 		data: "profile_uuid",   width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 5,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				addEvent();
			},
			fnRowCallback: function( nRow, aData ) {
				/** 이미 추가된 경우 체크박스 disabled **/
				const checkboxEl = $(nRow).children().eq(3).find('input');
				if (addedUsers.indexOf(aData.profile_uuid) > -1)
					$(checkboxEl).prop('disabled', true);
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
		const selectedData = dt.rows(indexes).data()[0];
		addUser(selectedData);
	}

	function addUser(data)
	{
		const {profile_uuid, nickname, amount_ucd} = data;
		let userObj = [];
		userObj.push({ "profile_uuid" : profile_uuid, "nickname" : nickname, "amount_ucd" : isEmpty(amount_ucd) ? 0 : amount_ucd});
		addedUserObj = userObj.concat(addedUserObj);

		let users = [];
		users.push(profile_uuid);
		addedUsers = users.concat(addedUsers);

		buildUpdateTable();
		displayCountAddedUser();
	}

	function buildUpdateTable()
	{
		updateTable.DataTable({
			data: addedUserObj,
			columns: [
				{title: "닉네임", 		data: "nickname",		width: "20%" }
				,{title: "PID",    		data: "profile_uuid",  	width: "50%" }
				,{title: "보유 UCD",    	data: "amount_ucd",  	width: "20%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "",    		data: "profile_uuid",  	width: "10%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-text-red delete-btn" data-rownum="${meta.row}"><i class="fas fa-minus-circle"></i></button>`;
					}
				}
			],
			serverSide: false,
			paging: true,
			pageLength: 3,
			select: false,
			destroy: true,
			initComplete: function () {
				tableReloadAndStayCurrentPage(dataTable);
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('id', aData.profile_uuid);
				$(nRow).children().eq(3).find('button').on('click', function () { removeRow(this); });
			},
			drawCallback: function (settings) {
			}
		});
	}

	function removeRow(obj)
	{
		let table = updateTable.DataTable();
		table.row($(obj).closest('tr')).remove().draw(false);

		initAddedUserData();
		displayCountAddedUser();
	}

	function initAddedUserData()
	{
		addedUsers.length = 0;
		addedUserObj.length = 0;

		let table = updateTable.DataTable();
		const tableData = table.rows().data();
		if (tableData.length > 0)
		{
			for (let i=0; i<tableData.length; i++)
			{
				const {profile_uuid, nickname, amount_ucd} = tableData[i];

				addedUsers.push(profile_uuid)
				addedUserObj.push({ "profile_uuid" : profile_uuid, "nickname" : nickname, "amount_ucd" : isEmpty(amount_ucd) ? 0 : amount_ucd});
			}
		}
	}

	function displayCountAddedUser()
	{
		totalCount.text(numberWithCommas(addedUserObj.length));
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

		if (isEmpty(addedUsers) || addedUsers.length === 0)
		{
			sweetToast(`대상자 ${message.emptyList}`);
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

		readExcelData(obj, getMemberFromXlsx);

		emptyFile(obj);
	}

	function getMemberFromXlsx(data)
	{
		if (isEmpty(data))
		{
			sweetToast(message.invalidFileContent);
			return;
		}

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