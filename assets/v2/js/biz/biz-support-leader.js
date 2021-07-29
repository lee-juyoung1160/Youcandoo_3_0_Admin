
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url-v1.js';
	import {lengthInput, btnSubmit, amount, keyword, modalClose, modalBackdrop, modalOpen, btnXlsxImport,
		updateTable, btnXlsxExport, description, nickname, dataTable, btnSearch, totalCount,
		title, contentImage, balance} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {fadeinModal, fadeoutModal, limitInputLength, emptyFile, onErrorImage} from "../modules/common.js";
	import {initInputNumber, isEmpty, isXlsX, numberWithCommas} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {readExcelData, onClickImportMemberFormExport} from "../modules/export-excel.js";
	import {initTableDefaultConfig, tableReloadAndStayCurrentPage, toggleBtnPreviousAndNextOnTable, checkBoxElement,} from "../modules/tables.js";

	let addedUsers = [];
	let addedUserObj = [];
	let initialize = true;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
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
		const param = { "idx" : $("#hiddenIdx").val() }

		ajaxRequestWithJson(true, api.detailBiz, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getDetailCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_company_uuid;
	let g_profile_uuid;
	function getDetailCallback(data)
	{
		g_company_uuid = data.data.company_uuid;
		g_profile_uuid = data.data.profile_uuid;
		buildBizInfo(data);
		getBalance();
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
		const param = { "profile_uuid" : g_profile_uuid }

		ajaxRequestWithJson(false, api.getBizUcd, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildBalance(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`보유 UCD ${message.ajaxLoadError}`));
	}

	let g_balance;
	function buildBalance(data)
	{
		g_balance = data.data.ucd;
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
		initialize ? buildSearchMemberTable() : onSubmitSearchMember();
		initialize = false;
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
				url: api.getMemberForSaveUcd,
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
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"page" : (d.start / d.length) + 1
						,"limit" : d.length
						,"search_type" : "nickname"
						,"keyword" : keyword.val().trim()
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
				,{title: "보유UCD",	data: "ucd",   			width: "20%",
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
				$(this).on( 'select.dt', function ( e, dt, type, indexes ) { onClickCheckBox(dt, indexes);});
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

	function onClickCheckBox(dt, indexes)
	{
		const selectedData = dt.rows(indexes).data()[0];
		addUser(selectedData);
	}

	function addUser(data)
	{
		const {profile_uuid, nickname, ucd} = data;
		let userObj = [];
		userObj.push({ "profile_uuid" : profile_uuid, "nickname" : nickname, "ucd" : isEmpty(ucd) ? 0 : ucd});
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
				,{title: "보유 UCD",    	data: "ucd",  			width: "20%",
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
			pageLength: 30,
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
				const {profile_uuid, nickname, ucd} = tableData[i];

				addedUsers.push(profile_uuid)
				addedUserObj.push({ "profile_uuid" : profile_uuid, "nickname" : nickname, "ucd" : isEmpty(ucd) ? 0 : ucd});
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
		const param = {
			"company_profile_uuid" : g_profile_uuid,
			"profile_uuid" : addedUsers,
			"value" : amount.val().trim(),
			"description" : description.val().trim(),
			"is_receive" : 'N'
		}

		ajaxRequestWithJson(true, api.saveUserUcdByBiz, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function createSuccess()
	{
		location.href = page.detailBiz + $("#hiddenIdx").val();
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

		if (g_balance < Number(amount.val()) * addedUsers.length)
		{
			sweetToast(message.overBalance);
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

		const param = { "profile_uuid" : data };

		ajaxRequestWithJson(true, api.getMemberFromXlsx, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getExcelDataCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`회원목록${message.ajaxLoadError}`));
	}

	function getExcelDataCallback(data)
	{
		if (!isEmpty(data.data) && data.data.list.length > 0)
		{
			addedUserObj = data.data.list;
			addedUsers.length = 0;
			data.data.list.map(obj => addedUsers.push(obj.profile_uuid));
		}

		buildUpdateTable();
		displayCountAddedUser();
	}
