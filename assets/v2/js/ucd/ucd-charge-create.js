
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url-v1.js';
	import {
		lengthInput,
		btnSubmit,
		amount,
		keyword,
		modalClose,
		modalBackdrop,
		btnXlsxImport,
		updateTable,
		btnXlsxExport,
		description,
		nickname,
		dataTable,
		btnSearch,
		totalCount,
		btnAdd,
		modalCreate,
		modalUpdate,
		btnSubmitUpdate,
		totalMemberCount
	} from '../modules/elements.js';
	import { sweetConfirm, sweetToast, sweetToastAndCallback, sweetError } from  '../modules/alert.js';
	import {fadeoutModal, limitInputLength,} from "../modules/common.js";
	import {initInputNumber, isEmpty, isXlsX, numberWithCommas} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {setExcelData} from "../modules/export-excel.js";
	import {initTableDefaultConfig, tableReloadAndStayCurrentPage, toggleBtnPreviousAndNextOnTable, checkBoxElement,} from "../modules/tables.js";

	let addedUsers = [];
	let addedUserObj = [];
	let initialize = true;

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		amount.trigger('focus');
		/** 이벤트 **/
		amount 			.on('propertychange change keyup paste input', function () { initInputNumber(this); });
		lengthInput 	.on('propertychange change keyup paste input', function () { limitInputLength(this); });
		$("#btnSearchNickname").on('click', function () { modalSearchOpen(this); });
		modalClose		.on('click', function () { fadeoutModal(); });
		modalBackdrop	.on('click', function () { fadeoutModal(); });
		btnXlsxImport	.on('change', function () { onClickBtnImport(this); });
		btnXlsxExport	.on('click', function () { downloadForm(); });
		btnSearch		.on('click', function () { onSubmitSearchMember(); })
		btnSubmit		.on('click', function () { onSubmitUcd(); });
		btnAdd.on('click', function () { onClickBtnAdd(); });
		btnSubmitUpdate.on('click', function () { onSubmitXlsxData(); });
	});

	function modalSearchOpen(obj)
	{
		if (isEmpty(nickname.val()))
		{
			sweetToast(`닉네임을 ${message.input}`);
			nickname.trigger('focus');
			return;
		}

		modalCreate.fadeIn();
		modalBackdrop.fadeIn();

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
			"profile_uuid" : addedUsers,
			"value" : amount.val().trim(),
			"description" : description.val().trim(),
		}

		ajaxRequestWithJson(true, api.saveUserUcdBySystem, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
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

	let chunkData = [];
	function onClickBtnAdd()
	{
		modalUpdate.fadeIn();
		modalBackdrop.fadeIn();
		chunkData.length = 0
		btnXlsxImport.val(null);
		btnXlsxImport.siblings('input').val('');
		totalMemberCount.text(0);
	}

	function onClickBtnImport(obj)
	{
		if (!obj.files[0])
		{
			$(obj).val(null);
			$(obj).siblings('input').val('');
			totalMemberCount.text(0);
			return ;
		}

		if (!isXlsX(obj) && obj.files[0])
		{
			sweetToast(`엑셀(.xlsx) 파일을 ${message.select}`);
			$(obj).val(null);
			$(obj).siblings('input').val('');
			totalMemberCount.text(0);
			return ;
		}

		const fileName = obj.files[0].name;
		$(obj).siblings('input').val(fileName);

		readXlsxData(obj, setDataFromXlsx)
	}

	function readXlsxData(obj, callback)
	{
		let reader = new FileReader();
		reader.onload = function(e) {

			const data = new Uint8Array(reader.result);
			const workbook = XLSX.read(data, {type: 'array'});

			let readData = [];
			workbook.SheetNames.map( name => readData.push(...XLSX.utils.sheet_to_json(workbook.Sheets[name], { header : 1 })) )

			let callbackArgs = [];
			readData.map( (value, index) => {
				if (index === 0) return;
				if (!isEmpty(value[0]) && !isEmpty(value[1]) && value[0].toString().startsWith('PID-'))
					callbackArgs.push({
						"profile_uuid" : value[0],
						"value" : value[1],
						"description" : isEmpty(value[2]) ? '' : value[2]
					})
			})

			callback(callbackArgs);
		}

		reader.readAsArrayBuffer(obj.files[0]);
	}

	function setDataFromXlsx(data)
	{
		chunkData.length = 0;
		totalMemberCount.text(data.length);

		if (!isEmpty(data) && data.length > 0)
			chunkData = chunkArray(data, 100);
	}

	function onSubmitXlsxData()
	{
		if (isEmpty(chunkData) || chunkData.length === 0)
		{
			sweetToast(`충전 대상 ${message.emptyList}`);
			return;
		}

		sweetConfirm(message.create, xlsxDataRequest)
	}

	let reqCount = 0;
	function xlsxDataRequest()
	{
		const param = { "profile_list" : chunkData[reqCount] };

		ajaxRequestWithJson(true, api.saveUserUcdFromXlsx, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					if (reqCount === chunkData.length - 1)
					{
						reqCount = 0;
						sweetToastAndCallback(data, fadeoutModal);
					}
					else
					{
						reqCount++;
						xlsxDataRequest();
					}
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => {
				reqCount = 0;
				sweetError(`충전${message.ajaxError}`);
			});
	}

	function chunkArray(array, size)
	{
		const chunked_arr = [];
		let copied = [...array];
		const numOfChild = Math.ceil(copied.length / size);
		for (let i = 0; i < numOfChild; i++) {
			chunked_arr.push(copied.splice(0, size));
		}
		return chunked_arr;
	}

	function downloadForm()
	{
		const data = [{
				"PID(프로필아이디)" : "PID-ABC000...",
				"금액(UCD)" : 100,
				"설명" : "테스트 충전..."
			}];

		setExcelData("UCD 충전양식", "회원목록", data);
	}
