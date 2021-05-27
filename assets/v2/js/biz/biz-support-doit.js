
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
	import {readExcelData, onClickImportDoitFormExport} from "../modules/export-excel.js";
	import {
		initTableDefaultConfig,
		tableReloadAndStayCurrentPage,
		toggleSingleCheckBox,
		toggleBtnPreviousAndNextOnTable,
		checkBoxElement,
	} from "../modules/tables.js";
	let addedDoits = [];
	let addedDoitObj = [];

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		buildSearchDoitTable();
		getBizInfo();
		amount.trigger('focus');
		/** 이벤트 **/
		amount 			.on('propertychange change keyup paste input', function () { initInputNumber(this); });
		lengthInput 	.on('propertychange change keyup paste input', function () { limitInputLength(this); });
		modalOpen		.on('click', function () { onClickModalOpen(this); });
		modalClose		.on('click', function () { fadeoutModal(); });
		modalBackdrop	.on('click', function () { fadeoutModal(); });
		btnXlsxImport	.on('change', function () { onClickBtnImport(this); });
		btnXlsxExport	.on('click', function () { onClickImportDoitFormExport(); });
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
			sweetToast(`두잇명을 ${message.input}`);
			nickname.trigger('focus');
			return;
		}

		fadeinModal();

		const inputValue = $(obj).siblings('input').val();
		keyword.val(inputValue);
		onSubmitSearchMember();
	}

	function onSubmitSearchMember()
	{
		if (isEmpty(keyword.val()))
		{
			sweetToast(`두잇명을 ${message.input}`);
			keyword.trigger('focus');
			return;
		}

		const table = dataTable.DataTable();
		table.page.len(5);
		table.ajax.reload();
	}

	function buildSearchDoitTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.getUcdDoitList,
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
						,"keyword" : isEmpty(keyword.val().trim()) ? '$!@' : keyword.val().trim()
						,"search_type" : "doit_title"
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "두잇명",		data: "doit_title",    	width: "45%" }
				,{title: "리더",		data: "nickname",   	width: "30%" }
				,{title: "보유 UCD",	data: "ucd",   			width: "20%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: '', 		data: "doit_uuid",   	width: "5%",
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
				if (addedDoits.indexOf(aData.doit_uuid) > -1)
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
		const {doit_uuid, doit_title, nickname, ucd} = data;
		let doitObj = [];
		doitObj.push({ "doit_uuid" : doit_uuid, "doit_title" : doit_title, "nickname" : nickname, "ucd" : isEmpty(ucd) ? 0 : ucd});
		addedDoitObj = doitObj.concat(addedDoitObj);

		let doits = [];
		doits.push(doit_uuid);
		addedDoits = doits.concat(addedDoits);

		buildUpdateTable();
		displayCountAddedUser();
	}

	function buildUpdateTable()
	{
		updateTable.DataTable({
			data: addedDoitObj,
			columns: [
				{title: "두잇명", 		data: "doit_title",		width: "45%" }
				,{title: "리더",    		data: "nickname",  		width: "30%" }
				,{title: "보유 UCD",    	data: "ucd",  			width: "20%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "",    		data: "doit_uuid",  	width: "5%",
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
				$(nRow).attr('id', aData.doit_uuid);
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
		addedDoits.length = 0;
		addedDoitObj.length = 0;

		let table = updateTable.DataTable();
		const tableData = table.rows().data();
		if (tableData.length > 0)
		{
			for (let i=0; i<tableData.length; i++)
			{
				const {doit_uuid, doit_title, nickname, ucd} = tableData[i];

				addedDoits.push(doit_uuid)
				addedDoitObj.push({ "doit_uuid" : doit_uuid, "doit_title" : doit_title, "nickname" : nickname, "ucd" : isEmpty(ucd) ? 0 : ucd});
			}
		}
	}

	function displayCountAddedUser()
	{
		totalCount.text(numberWithCommas(addedDoitObj.length));
	}

	function onSubmitUcd()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const url = api.supportDoit;
		const errMsg = label.submit + message.ajaxError;
		const param = {
			"company_profile_uuid" : g_profile_uuid,
			"doit_uuid" : addedDoits,
			"value" : amount.val().trim(),
			"description" : description.val().trim(),
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
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

		if (Number(amount.val()) > 100000000)
		{
			sweetToast(message.maxAvailableUserUcd);
			amount.trigger('focus');
			return false;
		}

		if (g_balance < Number(amount.val()) * addedDoits.length)
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

		if (isEmpty(addedDoits) || addedDoits.length === 0)
		{
			sweetToast(`대상 두잇 ${message.emptyList}`);
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

		readExcelData(obj, getDoitFromXlsx);

		emptyFile(obj);
	}

	function getDoitFromXlsx(data)
	{
		if (isEmpty(data))
		{
			sweetToast(message.invalidFileContent);
			return;
		}

		const url = api.getDoitFromXlsx;
		const errMsg = `두잇목록${message.ajaxLoadError}`
		const param = { "doit_uuid" : data };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getExcelDataCallback, errMsg, false);
	}

	function getExcelDataCallback(data)
	{
		if (!isEmpty(data.data.list) && data.data.list.length > 0)
		{
			addedDoitObj = data.data.list;
			addedDoits.length = 0;
			data.data.list.map(obj => addedDoits.push(obj.doit_uuid));
		}

		buildUpdateTable();
		displayCountAddedUser();
	}
