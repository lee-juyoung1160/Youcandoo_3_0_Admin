
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {
		btnSubmit, content, modalClose, modalBackdrop, btnModalTargetMemberOpen,
		modalTargetMember, targetPage, modalTargetPage, rdoReserveType, rdoTargetMemberType,
		rdoTargetPageType, reserveDate, btnXlsxExport, dataTable, keyword, targetUuid,
		nickname, memberTable, btnSearch, updateTable, totalCount, btnXlsxImport, selHour, selMinute,
	} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {
		emptyFile,
		fadeoutModal,
		initInputDatepickerMinDateToday, initSelHour, initSelMinute,
		overflowHidden,
		setDateToday
	} from "../modules/common.js";
	import {
		getCurrentHours, getCurrentMinutes, getCurrentSecond,
		getStringFormatToDate,
		isEmpty,
		isXlsX,
		numberWithCommas
	} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {onClickImportMemberFormExport, readExcelData} from "../modules/export-excel.js";
	import {checkBoxElement, initTableDefaultConfig, tableReloadAndStayCurrentPage, toggleBtnPreviousAndNextOnTable,} from "../modules/tables.js";

	let addedUsers = [];
	let addedUserObj = [];

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initInputDatepickerMinDateToday();
		setDateToday();
		initSelHour(selHour);
		initSelMinute(selMinute);
		buildSearchMemberTable();
		/** 이벤트 **/
		targetPage.on("click", function () { onClickModalTargetPageOpen(); });
		rdoReserveType.on('change', function () { onChangeRdoReserveType(this); });
		rdoTargetPageType.on('change', function () { onChangeRdoTargetPageType(this); });
		rdoTargetMemberType.on('change', function () { onChangeRdoTargetMemberType(this); });
		btnModalTargetMemberOpen.on("click", function () { onClickModalTargetMemberOpen(this); });
		modalClose.on("click", function () { fadeoutModal(); });
		modalBackdrop.on("click", function () { fadeoutModal(); });
		btnSubmit.on('click', function () { onSubmitPush(); });
		btnXlsxImport	.on('change', function () { onClickBtnImport(this); });
		btnXlsxExport.on('click', function () { onClickImportMemberFormExport(); });
		keyword.on("propertychange change keyup paste input", function () { getTargetPageList(); });
		btnSearch.on('click', function () { onSubmitSearchMember(); });
	});

	function initTimes()
	{
		selHour.val('12');
		selMinute.val('00');
	}

	function onChangeRdoReserveType(obj)
	{
		$(obj).val() === 'reserve' ? $(obj).parent().siblings().show() : $(obj).parent().siblings().hide();
		initTimes();
	}

	function onChangeRdoTargetPageType(obj)
	{
		targetPage.val('');
		targetUuid.val('');

		hasTargetPage() ? $(obj).parent().siblings().show() : $(obj).parent().siblings().hide();
	}

	function onChangeRdoTargetMemberType(obj)
	{
		let table = updateTable.DataTable();
		table.rows().remove().draw(false);
		initAddedUserData();
		displayCountAddedUser();

		$(obj).val() === 'all' ? $(obj).parent().siblings().hide() : $(obj).parent().siblings().show();
	}

	function onClickModalTargetPageOpen()
	{
		modalTargetPage.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		getTargetPageList();
	}

	function getTargetPageList()
	{
		const table = dataTable.DataTable();
		table.destroy();
		dataTable.empty();
		dataTable.DataTable({
			ajax : {
				url: getApiUrl(),
				type:"POST",
				global: false,
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
					const param = {
						"limit" : d.length
						,"page" : (d.start / d.length) + 1
						,"keyword" : keyword.val().trim()
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: buildTableColumns(),
			serverSide: true,
			paging: true,
			pageLength: 5,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		const targetPageType = $("input[name=radio-target-page-type]:checked").val();
		let id;
		let name;
		switch (targetPageType) {
			case 'event' :
				id = aData.id;
				name = aData.title;
				break;
			case 'doit' :
				id = aData.id;
				name = aData.title;
				break;
			case 'notice' :
				id = aData.id;
				name = aData.title;
				break;
		}
		$(nRow).attr('data-id', id);
		$(nRow).attr('data-name', name);
		$(nRow).on('click', function () { onSelectTargetPage(this); })
	}

	function onSelectTargetPage(obj)
	{
		targetPage.val($(obj).data('name'));
		targetUuid.val($(obj).data('id'));
		fadeoutModal();
	}

	function buildTableColumns()
	{
		const targetPageType = $("input[name=radio-target-page-type]:checked").val();
		switch (targetPageType) {
			case 'notice' :
				return [{title: "제목",		data: "title",   		width: "100%"}]
			case 'event' :
				return [{title: "구분",		data: "event_type",    	width: "20%"}
					,{title: "제목",			data: "title",    	   	width: "80%"}]
			case 'doit' :
				return [{title: "두잇명",	data: "title",    		width: "100%"}]
		}
	}

	function getApiUrl()
	{
		const targetPageType = $("input[name=radio-target-page-type]:checked").val();
		switch(targetPageType)
		{
			case 'notice':
				return api.pushTargetNotice;
			case 'event':
				return api.pushTargetEvent;
			case 'doit':
				return api.pushTargetDoit;
		}
	}

	function onClickModalTargetMemberOpen(obj)
	{
		const inputEl = $(obj).siblings('input');
		if (isEmpty($(inputEl).val()))
		{
			sweetToast(`닉네임을 ${message.input}`);
			nickname.trigger('focus');
			return;
		}

		modalTargetMember.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();

		nickname.val($(inputEl).val().trim());
		onSubmitSearchMember();
	}

	function onSubmitSearchMember()
	{
		if (isEmpty(nickname.val()))
		{
			sweetToast(`닉네임을 ${message.input}`);
			nickname.trigger('focus');
			return;
		}

		const table = memberTable.DataTable();
		table.page.len(5);
		table.ajax.reload();
	}

	function buildSearchMemberTable()
	{
		memberTable.DataTable({
			ajax : {
				url: api.pushTargetMember,
				type:"POST",
				headers: headers,
				global: false,
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
					const param = {
						"page" : (d.start / d.length) + 1
						,"limit" : d.length
						,"keyword" : isEmpty(nickname.val()) ? '!@#' : nickname.val().trim()
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임",		data: "nickname",    		width: "35%" }
				,{title: "PID",			data: "profile_uuid",   	width: "36%" }
				,{title: "두잇알림",		data: "noti_doit",   		width: "8%" }
				,{title: "마케팅알림",	data: "noti_marketing",   	width: "8%" }
				,{title: "공지알림",		data: "noti_notice",   		width: "8%" }
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
				const checkboxEl = $(nRow).children().eq(5).find('input');
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
		const {profile_uuid, nickname, noti_doit, noti_marketing, noti_notice} = data;
		let userObj = [];
		userObj.push({
			"profile_uuid" : profile_uuid,
			"nickname" : nickname,
			"noti_notice" : noti_notice,
			"noti_marketing" : noti_marketing,
			"noti_doit" : noti_doit });
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
				{title: "닉네임",		data: "nickname",    		width: "35%" }
				,{title: "PID",			data: "profile_uuid",   	width: "36%" }
				,{title: "두잇알림",		data: "noti_doit",   		width: "8%" }
				,{title: "마케팅알림",	data: "noti_marketing",   	width: "8%" }
				,{title: "공지알림",		data: "noti_notice",   		width: "8%" }
				,{title: "",    		data: "profile_uuid",  		width: "5%",
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
				tableReloadAndStayCurrentPage(memberTable);
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('id', aData.profile_uuid);
				$(nRow).children().eq(5).find('button').on('click', function () { removeRow(this); });
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
				const {profile_uuid, nickname, noti_doit, noti_marketing, noti_notice} = tableData[i];

				addedUsers.push(profile_uuid)
				addedUserObj.push({
					"profile_uuid" : profile_uuid,
					"nickname" : nickname,
					"noti_notice" : noti_notice,
					"noti_marketing" : noti_marketing,
					"noti_doit" : noti_doit });
			}
		}
	}

	function displayCountAddedUser()
	{
		totalCount.text(numberWithCommas(addedUserObj.length));
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

		ajaxRequestWithJson(true, api.pushTargetMemberFromXlsx, JSON.stringify(param))
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

	function onSubmitPush()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		const sendType = $('input:radio[name=radio-reserve-type]:checked').val();
		const sendDatetime = sendType === 'immediately'
			? `${getStringFormatToDate(new Date(), '-')} ${getCurrentHours()}:${getCurrentMinutes()}:${getCurrentSecond()}`
			: `${reserveDate.val()} ${selHour.val()}:${selMinute.val()}:00`;
		const param = {
			"reserve_type" : sendType,
			"send_type" : $('input:radio[name=radio-receive-type]:checked').val(),
			"send_datetime" : sendDatetime,
			"send_profile_type" : $('input:radio[name=radio-target-member-type]:checked').val(),
			"send_profile" : isIndividual() ? addedUsers : [],
			"target_type" : $('input:radio[name=radio-target-page-type]:checked').val(),
			"target" : hasTargetPage() ? targetUuid.val() : '',
			"store" : $('input:radio[name=radio-os-type]:checked').val(),
			"message" : content.val().trim(),
			"icon_type" :  $('input:radio[name=radio-icon-type]:checked').val(),
			"category" : $('input:radio[name=radio-category]:checked').val(),
		}

		ajaxRequestWithJson(true, api.createPush, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, createSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function createSuccess()
	{
		location.href = page.listPush;
	}

	function validation()
	{

		const reserveType = $("input[name=radio-reserve-type]:checked").val();
		const currentDatetime = new Date().getTime();
		const reserveDatetime = new Date(`${reserveDate.val()} ${selHour.val()}:${selMinute.val()}:00`).getTime();
		if (reserveType === 'reserve' && currentDatetime > reserveDatetime)
		{
			sweetToast(`발송 시간은 ${message.compareCurrentTime}`);
			selHour.trigger('focus');
			return false;
		}

		if (isIndividual() && addedUsers.length === 0)
		{
			sweetToast(`발송 대상은 ${message.required}`);
			return false;
		}

		if (hasTargetPage() && isEmpty(targetPage.val()))
		{
			sweetToast(`발송 구분은 ${message.required}`);
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

	function hasTargetPage()
	{
		const targetPageType = $("input[name=radio-target-page-type]:checked").val();
		return ['event', 'notice', 'doit'].indexOf(targetPageType) !== -1
	}

	function isIndividual()
	{
		const targetMemberType = $("input[name=radio-target-member-type]:checked").val();
		return targetMemberType === 'individual';
	}
