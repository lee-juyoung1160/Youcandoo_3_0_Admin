
	const selectedUserCount = $("#selectedUserCount");
	const selectedUserTable = $("#selectedUserTable");
	const amount		= $("#amount");
	const content 		= $("#content");
	const memo 			= $("#memo");
	const btnSubmit		= $("#btnSubmit");
	const btnXlsxImport	= $("#btnXlsxImport");
	const btnXlsxExport	= $("#btnXlsxExport");
	const btnAddUser	= $("#btnAddUser");
	const search 		= $(".search");
	const nickname		= $("#nickname");
	const selMatch		= $("#selMatch");
	const dataTable		= $("#dataTable");
	let selectedUsers 	= [];

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 선택된 회원목록 초기화 **/
		buildSelectedUser(selectedUsers);
		/** 회원목록 **/
		getUser();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event); });
		search    		.on("click", function () { onSubmitSearch(); });
		btnAddUser		.on('click', function () { onClickAddUser(); });
		btnXlsxImport	.on("change", function () { onClickBtnImport(this); });
		btnXlsxExport	.on("click", function () { onClickUcdFormExport(this); });
		btnSubmit		.on("click", function () { onSubmitUcd(); });
	});

	function onSubmitSearch()
	{
		uncheckedCheckAll();
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function getUser()
	{
		dataTable.DataTable({
			ajax : {
				url: api.getNickname,
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
				{title: tableCheckAllDom(), 	data: "profile_uuid",   width: "5%",
					render: function (data) {
						return multiCheckBoxDom(data);
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
				uncheckedCheckAllAfterMovePage(this);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _limit = info.length;
		let _page = (info.start / info.length) + 1;
		let param = {
			"limit" : _limit
			,"page" : _page
			,"keyword_type" : selMatch.val()
			,"keyword" : nickname.val()
		}
		return JSON.stringify(param);
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
			sweetToast(`취소 대상을 ${message.addOn}`);
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

		for (let i=0; i<selectedData.length; i++)
		{
			let { nickname, profile_uuid, ucd } = selectedData[i];
			let userInfo = { "nickname" : nickname, "profile_uuid" : profile_uuid, "ucd" : ucd.total };
			selectedUsers.push(userInfo);
		}

		buildSelectedUser();
		calculateSelectedCount();
	}

	function buildSelectedUser()
	{
		selectedUserTable.DataTable({
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
		let url = api.listUserWithXlsx;
		let errMsg = `회원목록${message.ajaxLoadError}`
		let param = JSON.stringify({ "data" : data });

		ajaxRequestWithJsonData(true, url, param, getExcelDataCallback, errMsg, false);
	}

	function getExcelDataCallback(data)
	{
		if (!isEmpty(data.data)) selectedUsers = data.data;
		buildSelectedUser();
		calculateSelectedCount();
	}

	function onSubmitUcd()
	{
		if (validation())
			/*sweetConfirmWithContent(confirmContent(), createRequest);*/
			sweetConfirmWithContent(confirmContent(), chunkRequestData);
	}

	/**
	 * 임시로직: 100건씩 호출
	 * **/
	let chunkData = [];
	function chunkRequestData()
	{
		let uuids = [];
		selectedUsers.map( (value) => {
			let { profile_uuid } = value;
			uuids.push(profile_uuid);
		});

		chunkData = chunkArray(uuids, 100);
		fadeinLoader();
		chunkRequest();
	}

	let reqCount = 0;
	function chunkRequest()
	{
		let param = {
			"profile_uuid" : chunkData[reqCount]
			,"division" : 2
			,"amount" : amount.val().trim()
			,"description" : content.val().trim()
			,"memo" : memo.val().trim()
		}

		$.ajax({
			global: false,
			url: api.createUserUcd,
			type: "POST",
			headers: headers,
			contentType: 'text/plain',
			dataType: 'json',
			data: JSON.stringify(param),
			success: function(data) {
				if (isSuccessResp(data))
				{
					if (reqCount === chunkData.length - 1)
					{
						reqCount = 0;
						fadeoutLoader();
						createReqCallback(data);
					}
					else
					{
						reqCount++;
						chunkRequest()
					}
				}
				else
				{
					fadeoutLoader();
					sweetError(invalidResp(data))
				}
			},
			error: function (request, status) {
				fadeoutLoader();
				sweetError(label.submit+message.ajaxError);
			},
			complete: function (xhr, status) {
			}
		});
	}
	/**
	 * 임시로직: 100건씩 호출
	 * **/

	function confirmContent()
	{
		let content = '';
		content	+=
			`<ul class="modal-information">
				<li>
					<p class="sub-title">취소대상(보유UCD)</p>
					<div class="scroll-wrap">
						<p class="data-contents">`

		selectedUsers.map( (value) => {
			let { nickname, ucd } = value;
			content += ` @ ${nickname}(${numberWithCommas(ucd)})`
		});

		content	+=
						`</p>
					</div>
				<li>
				<li>
					<p class="sub-title">취소 UCD</p>
					<p class="data-contents">${numberWithCommas(amount.val())} UCD</p>
				</li>
			</ul>
			<p class="confirm-message">${message.create}</p>`

		return content;
	}

	/*function createRequest()
	{
		let url 	= api.createUserUcd;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, ucdParams(), createReqCallback, errMsg, false);
	}*/

	/*function ucdParams()
	{
		let uuids = [];
		selectedUsers.map( (value) => {
			let { profile_uuid } = value;
			uuids.push(profile_uuid);
		});

		let param = {
			"profile_uuid" : uuids
			,"division" : 2
			,"amount" : amount.val().trim()
			,"description" : content.val().trim()
			,"memo" : memo.val().trim()
		}

		return JSON.stringify(param);
	}*/

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listUcdCancel;
	}

	function validation()
	{
		if (selectedUsers.length === 0)
		{
			sweetToast(`취소대상을 ${message.addOn}`);
			return false;
		}

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

		if (isOverBalance())
		{
			sweetToast(message.overBalanceWithdraw);
			amount.trigger('focus');
			return false;
		}

		return true;
	}

	function isOverBalance()
	{
		let result = false;
		let withdraw = Number(amount.val());

		selectedUsers.map( (value) => {
			let { ucd } = value;
			if (withdraw > ucd)
				result = true;
		});

		return result;
	}
