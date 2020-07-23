
	const sendWhen		= $("input[name=radio-when]");
	const sendDate		= $("#sendDate");
	const sendTime		= $("#sendTime");
	const targetUser	= $("input[name=radio-target-user]");
	const btnModalUserOpen	= $("#btnModalUserOpen");
	const btnAddUser	= $("#btnAddUser");
	const selectedUserCount 	= $("#selectedUserCount");
	const selectedUserTableBody = $("#selectedUserTableBody");
	const resultBox 	= $(".result_box");
	const btnOpenResult = $(".btn-open-result");
	const targetPage	= $("input[name=radio-target-page]");
	const inputPage		= $("#targetPage");
	const osType		= $("input[name=radio-store]");
	const content		= $("#content");
	const btnSubmit 	= $("#btnSubmit");

	/** modal **/
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const modalTargetUser	= $("#modalTargetUser");
	const targetUserTable	= $("#targetUserTable");
	const btnMoveRight		= $("#btnMoveRight");
	const movedUserTableBody = $("#movedUserTableBody")
	const modalNickname		= $("#modalNickname");
	const modalTargetPage	= $("#modalTargetPage");
	const targetPageTable	= $("#targetPageTable");
	const modalPage			= $("#modalPage");

	$( () => {
		/** 데이트피커 초기화 **/
		initInputTodayDatepicker();
		/** 발송일 초기화 **/
		setDateToday();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		modalNickname	.on('keyup', function () { getUsers(); });
		sendWhen		.on('change', function () { onChangeSendWhen(this); });
		targetUser		.on('change', function () { onChangeTargetUser(this); });
		targetPage		.on('change', function () { onChangeTargetPage(this); });
		btnModalUserOpen.on('click', function () { onClickBtnModalUserOpen(); });
		btnMoveRight	.on('click', function () { onClickMoveRightUser(); });
		btnAddUser		.on('click', function () { onClickAddUser(); });
		inputPage		.on('click', function () { onClickPage(); });
		btnSubmit		.on('click', function () { onSubmitPush(); });
	});

	function initComponent()
	{
		content.val('');
		sendWhen.eq(0).prop('checked', true);
		targetUser.eq(0).prop('checked', true);
		targetPage.eq(0).prop('checked', true);
		osType.eq(0).prop('checked', true);
	}

	function onClickBtnModalUserOpen()
	{
		modalTargetUserFadein();
		initTargetUserModal();
		getUsers();
	}

	function initTargetUserModal()
	{
		modalNickname.val('');
		modalNickname.trigger('focus');
	}

	function modalTargetUserFadein()
	{
		modalLayout.fadeIn();
		modalTargetUser.fadeIn();
		overflowHidden();
	}
	
	function getUsers()
	{
		targetUserTable.DataTable({
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
				{title: tableCheckAllDom(), 	data: "profile_uuid",   width: "5%",     orderable: false,
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				}
				,{title: "닉네임",	data: "nickname",    width: "35%", 	 orderable: false }
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
			pageLength: 10,
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
			},
			fnRowCallback: function( nRow, aData ) {
				//setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let table = targetUserTable.DataTable();
		let info = table.page.info();
		let _limit = info.length;
		let _page = (info.start / info.length) + 1;
		let param = {
			"limit" : _limit
			,"page" : _page
			,"keyword" : modalNickname.val()
		}

		return JSON.stringify(param);
	}

	function onClickMoveRightUser()
	{
		if (moveValidation())
		{
			let table 		 = $("#targetUserTable").DataTable();
			let selectedData = table.rows('.selected').data();
			let moveUserDom = '';

			for (let i=0; i<selectedData.length; i++)
			{
				let detail = selectedData[i];
				let profileId = detail.profile_uuid;
				let nick = detail.nickname;
				moveUserDom += '<tr data-uuid="'+profileId+'" data-nick="'+nick+'">';
				moveUserDom +=     '<td>'+nick+'</td>';
				moveUserDom += 	   '<td><i onclick="removeRow(this);" class="far fa-times-circle"></i></td>';
				moveUserDom += '</tr>';
			}

			movedUserTableBody.append(moveUserDom);
		}
	}

	function moveValidation()
	{
		let table 		 = targetUserTable.DataTable();
		let selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			sweetToast('대상을 목록에서 '+message.select);
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
		let table 		 = $("#dataTable").DataTable();
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
		buildSelectedUser();
		modalFadeout();
		resultBox.show();
	}

	function buildSelectedUser()
	{
		let selectedRow = movedUserTableBody.find('tr');
		let selectedUserDom = '';

		$(selectedRow).each(function () {
			let profileId = $(this).data('uuid');
			let nick = $(this).data('nick');
			let total = $(this).data('total');
			let cash = $(this).data('cash');
			let point = $(this).data('point');

			selectedUserDom += '<tr data-uuid="'+profileId+'" data-nick="'+nick+'" data-cash="'+cash+'" data-point="'+point+'" data-total="'+total+'">';
			selectedUserDom +=     '<td>'+nick+'</td>';
			selectedUserDom += 	   '<td><i style="color: #ec5c5c;" onclick="removeRow(this); calculateSelectedCount();" class="far fa-times-circle"></i></td>';
			selectedUserDom += '</tr>';
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

	/*function setRowAttributes(nRow, aData)
	{
		/!** 닉네임에 클릭이벤트 추가 **!/
		$(nRow).attr('onClick', 'setSelectedUser(\''+aData.nickname+'\',\''+aData.profile_uuid+'\')');
	}

	let g_profile_uuid;
	function setSelectedUser(_nickname, _uuid)
	{
		g_profile_uuid = _uuid;
		nickname.val(_nickname);
		modalFadeout();
	}*/

	function onClickPage()
	{
		modalTargetPageFadein();
		initTargetPageModal();
		/*getEventPage();*/
	}

	function modalTargetPageFadein()
	{
		modalLayout.fadeIn();
		modalTargetPage.fadeIn();
		overflowHidden();
	}

	function initTargetPageModal()
	{
		modalPage.val('');
		modalPage.trigger('focus');
	}

	function getEventPage()
	{
		targetPageTable.DataTable({
			ajax : {
				url: api.getNickname,
				type:"POST",
				headers: headers,
				data: function (d) {
					return pageParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임",	data: "nickname",    width: "35%", 	 orderable: false }
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
			pageLength: 10,
			ordering: false,
			order: [],
			info: false,
			select: false,
			scrollY: 200,
			scrollCollapse: true,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setPageRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function pageParams()
	{
		let table = targetPageTable.DataTable();
		let info = table.page.info();
		let _limit = info.length;
		let _page = (info.start / info.length) + 1;
		let param = {
			"limit" : _limit
			,"page" : _page
			,"keyword" : modalNickname.val()
		}

		return JSON.stringify(param);
	}

	function setPageRowAttributes(nRow, aData)
	{
		/** 닉네임에 클릭이벤트 추가 **/
		$(nRow).attr('onClick', 'setSelectedPage(\''+aData.nickname+'\',\''+aData.profile_uuid+'\')');
	}

	let g_page_uuid;
	function setSelectedPage(_nickname, _uuid)
	{
		g_page_uuid = _uuid;
		nickname.val(_nickname);
		modalFadeout();
	}

	function onChangeTargetUser(obj)
	{
		$(obj).val() === 'all' ? btnModalUserOpen.parent().hide() : btnModalUserOpen.parent().show();
	}

	function onChangeTargetPage(obj)
	{
		$(obj).val() === 'event' ? inputPage.parent().show() : inputPage.parent().hide();
	}

	function onChangeSendWhen(obj)
	{
		$(obj).val() === 'reserve' ? sendDate.parent().show() : sendDate.parent().hide();
	}

	function onSubmitPush()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		$.ajax({
			url: api.createPush,
			type: "POST",
			processData: false,
			contentType: false,
			headers: headers,
			dataType: 'json',
			data: params(),
			success: function(data) {
				sweetToastAndCallback(data, createSuccess);
			},
			error: function (request, status) {
				sweetError(label.submit+message.ajaxError);
			}
		});
	}

	function createSuccess()
	{
		location.href = page.listPush;
	}

	function params()
	{
		let target = $("input[name=radio-target-user]:checked").val();
		let formData  = new FormData();
		formData.append('send_datetime', sendDate.val()+' '+sendTime.val());
		formData.append('push_type', target);
		formData.append('push_store', $("input[name=radio-store]:checked").val());
		formData.append('push_message', content.val().trim());
		formData.append('created_user', sessionUserId.val());
		if (target === 'individual')
			formData.append('profile_uuid', g_profile_uuid);

		return formData;
	}

	function validation()
	{
		if (isEmpty(sendTime.val()))
		{
			sweetToast('발송시간은 ' + message.required);
			sendTime.trigger('focus');
			return false;
		}
		
		if (isEmpty(content.val()))
		{
			sweetToast('내용은 ' + message.required);
			content.trigger('focus');
			return false;
		}

		return true;
	}

