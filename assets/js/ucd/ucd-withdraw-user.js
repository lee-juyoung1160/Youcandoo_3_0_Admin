
	const btnModalOpen	= $("#btnModalOpen");
	const selectedUserCount 	= $("#selectedUserCount");
	const selectedUserTableBody = $("#selectedUserTableBody");
	const resultBox 	= $(".result_box");
	const btnOpenResult = $(".btn-open-result");
	const target		= $("#target");
	const amount		= $("#amount");
	const content 		= $("#content");
	const memo 			= $("#memo");
	const btnSubmit		= $("#btnSubmit");
	const btnXlsxImport	= $("#btnXlsxImport");
	const btnXlsxExport	= $("#btnXlsxExport");

	/** modal **/
	const search 		= $(".search");
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const modalNickname	= $("#modalNickname");
	const selMatch		= $("#selMatch");
	const dataTable		= $("#dataTable");
	const btnMoveRight	= $("#btnMoveRight");
	const btnAddUser	= $("#btnAddUser");
	const movedUserTableBody = $("#movedUserTableBody")

	$( () => {
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event); });
		search    		.on("click", function () { onSubmitSearch(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnModalOpen	.on('click', function () { onClickModalOpen(); });
		btnMoveRight	.on('click', function () { onClickMoveRightUser(); });
		btnAddUser		.on('click', function () { onClickAddUser(); });
		btnOpenResult	.on("click", function () { onClickToggleOpen(this); });
		btnXlsxImport	.on("change", function () { onClickBtnImport(this); });
		btnXlsxExport	.on("click", function () { onClickUcdFormExport(this); });
		btnSubmit		.on("click", function () { onSubmitUcd(); });
	});

	function initComponent()
	{
		amount.trigger('focus');
	}

	function initModal()
	{
		modalNickname.val('');
		modalNickname.trigger('focus');
		initSelectOption();
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function onClickToggleOpen(obj)
	{
		$(obj).next('.table-wrap').slideToggle();
		$(obj).toggleClass('on');
	}

	/** 기업 검색 **/
	function onClickModalOpen()
	{
		modalFadein();
		initModal();
		getUser();
		buildMovedUser();
	}

	function buildMovedUser()
	{
		movedUserTableBody.empty();

		let selectedRow = selectedUserTableBody.find('tr');

		let moveUserDom = '';
		$(selectedRow).each(function () {
			let profileId = $(this).data('uuid');
			let nick = $(this).data('nick');
			let total = $(this).data('total');

			moveUserDom +=
				`<tr data-uuid="${profileId}" data-nick="${nick}" data-total="${total}">
					<td>
						<div class="p-info">${nick}<span class="p-id">${profileId}</span></div>
					</td>
					<td>
						<div class="user-ucd">
							<strong>${numberWithCommas(total)}</strong>
						</div>
					</td>
					<td><i onclick="removeRow(this); calculateSelectedCount();" class="far fa-times-circle"></i></td>
				</tr>`
		});

		movedUserTableBody.append(moveUserDom);
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
				,{title: "회원",	data: "nickname",    width: "65%", 	 className: "cursor-default",
					render: function (data, type, row, meta) {
						return `<div class="p-info">${data}<span class="p-id">${row.profile_uuid}</span></div>`
					}
				}
				,{title: "보유UCD",	data: "ucd.total",   width: "30%", 	 className: "cursor-default",
					render: function (data) {
						return (
							`<div class="user-ucd">
								<strong>${numberWithCommas(data)}</strong>
							</div>`
						)
					}
				}
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing : message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: 8,
			ordering: false,
			order: [],
			info: false,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: true,
			initComplete: function () {
				dataTable.on( 'page.dt', function () {
					$("#checkAll").prop('checked', false);
				});
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
			,"keyword" : modalNickname.val()
		}
		return JSON.stringify(param);
	}

	function onClickMoveRightUser()
	{
		if (moveValidation())
		{
			let table 		 = dataTable.DataTable();
			let selectedData = table.rows('.selected').data();
			let moveUserDom = '';

			for (let i=0; i<selectedData.length; i++)
			{
				let detail = selectedData[i];
				let profileId = detail.profile_uuid;
				let nick = detail.nickname;
				let total = detail.ucd.total;

				moveUserDom +=
					`<tr data-uuid="${profileId}" data-nick="${nick}" data-total="${total}">
						<td>
							<div class="p-info">${nick}<span class="p-id">${profileId}</span></div>
						<td>
							<div class="user-ucd">
								<strong>${numberWithCommas(total)}</strong>
							</div>
						</td>
						<td><i onclick="removeRow(this);" class="far fa-times-circle"></i></td>
					</tr>`
			}

			movedUserTableBody.append(moveUserDom);
		}
	}

	function moveValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			sweetToast(`대상을 목록에서 ${message.select}`);
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

		let movedUser = [];
		$("#movedUserTableBody").find('tr').each(function () {
			movedUser.push($(this).data("uuid"));
		});

		for (let i=0; i<selectedData.length; i++)
		{
			let detail = selectedData[i];
			let profileId = detail.profile_uuid;

			if (movedUser.indexOf(profileId) !== -1)
				result = true;
		}

		return result;
	}

	function removeRow(obj)
	{
		$(obj).closest('tr').remove();
	}

	function onClickAddUser()
	{
		if (addUserValidation())
		{
			buildSelectedUser();
			modalFadeout();
			resultBox.show();
		}
	}

	function addUserValidation()
	{
		let selectedRowLength = movedUserTableBody.find('tr').length;

		if (selectedRowLength === 0)
		{
			sweetToast(`출금 대상을 ${message.addOn}`);
			return false;
		}

		return true;
	}

	function buildSelectedUser()
	{
		let selectedRow = movedUserTableBody.find('tr');
		let selectedUserDom = '';

		$(selectedRow).each(function () {
			let profileId = $(this).data('uuid');
			let nick = $(this).data('nick');
			let total = $(this).data('total');

			selectedUserDom +=
				`<tr data-uuid="${profileId}" data-nick="${nick}" data-total="${total}">
					<td>
						<div class="p-info">${nick}<span class="p-id">${profileId}</span></div>
					</td>
					<td>
						<div class="user-ucd">
							<strong>${numberWithCommas(total)}</strong>
						</div>
					</td>
					<td><i style="color: #ec5c5c;" onclick="removeRow(this); calculateSelectedCount();" class="far fa-times-circle"></i></td>
				</tr>`
		});

		selectedUserCount.html(selectedRow.length);

		selectedUserTableBody.html(selectedUserDom);
	}

	function calculateSelectedCount()
	{
		let count = selectedUserTableBody.find('tr').length;

		if (count === 0)
			resultBox.hide();

		selectedUserCount.html(count);
	}

	function onSubmitUcd()
	{
		if (validation())
			sweetConfirmWithContent(confirmContent(), createRequest);
	}

	function confirmContent()
	{
		let content = '';
		content	+=
			`<ul class="modal-information">
				<li>
					<p class="sub-title">출금대상(보유UCD)</p>
					<div class="scroll-wrap">
						<p class="data-contents">`

		selectedUserTableBody.find('tr').each(function (index) {
			let nickname = $(this).data('nick');
			let balance  = $(this).data('total');

			content += ` @ ${nickname}(${numberWithCommas(balance)})`
		});

		content	+=
						`</p>
					</div>
				<li>
				<li>
					<p class="sub-title">출금 UCD</p>
					<p class="data-contents">${numberWithCommas(amount.val())} UCD</p>
				</li>
			</ul>
			<p class="confirm-message">${message.create}</p>`

		return content;
	}

	function createRequest()
	{
		let url 	= api.createUserUcd;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, ucdParams(), createReqCallback, errMsg, false);
	}

	function ucdParams()
	{
		let uuids = [];
		selectedUserTableBody.find('tr').each(function () {
			uuids.push($(this).data('uuid'));
		});

		let param = {
			"profile_uuid" : uuids
			,"division" : 1
			,"amount" : amount.val().trim()
			,"description" : content.val().trim()
			,"memo" : memo.val().trim()
			,"created_user" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listUcdWithdraw;
	}

	function validation()
	{
		let count = selectedUserTableBody.find('tr').length;

		if (count === 0)
		{
			sweetToast(`출금대상을 ${message.addOn}`);
			onClickModalOpen();
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
			return false;
		}

		return true;
	}

	function isOverBalance()
	{
		let result = false;
		let withdraw = Number(amount.val());
		selectedUserTableBody.children().each(function () {
			let balance = $(this).data('total');
			if (withdraw > balance)
				result = true;
		});

		return result;
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
		let userDatas = data.data;

		if (userDatas.length > 0)
		{
			let selectedUserEl = '';
			userDatas.map( (value) => {
				let { nickname, profile_uuid, ucd } = value;
				selectedUserEl +=
					`<tr data-uuid="${profile_uuid}" data-nick="${nickname}" data-total="${ucd}">
					<td>
						<div class="p-info">${nickname}<span class="p-id">${profile_uuid}</span></div>
					</td>
					<td>
						<div class="user-ucd">
							<strong>${numberWithCommas(ucd)}</strong>
						</div>
					</td>
					<td><i style="color: #ec5c5c;" onclick="removeRow(this); calculateSelectedCount();" class="far fa-times-circle"></i></td>
				</tr>`
			})

			selectedUserCount.html(userDatas.length);
			selectedUserTableBody.html(selectedUserEl);
			resultBox.show();
		}
		else
		{
			selectedUserCount.empty();
			selectedUserTableBody.empty();
			resultBox.hide();
		}
	}


