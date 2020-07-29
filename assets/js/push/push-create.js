
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
	const targetPageWrap	= $("#targetPageWrap");
	const targetPage	= $("input[name=radio-target-page]");
	const inputPage		= $("#targetPage");
	const osType		= $("input[name=radio-store]");
	const content		= $("#content");
	const contentImage	= $("#contentImage");
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

	const reqPage			= $("#req_page");
	const pageUuid			= $("#page_uuid");
	const reqContent		= $("#req_content");

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
		btnOpenResult	.on('click', function () { onClickToggleOpen(this); });
		modalPage		.on('keyup', function () { onKeyupSearchPage(); });
		inputPage		.on('click', function () { onClickPage(); });
		contentImage	.on('change', function () { onChangeValidationImage(this); });
		btnSubmit		.on('click', function () { onSubmitPush(); });
	});

	function initComponent()
	{
		content.val('');
		sendWhen.eq(0).prop('checked', true);
		targetUser.eq(0).prop('checked', true);
		targetPage.eq(0).prop('checked', true);
		osType.eq(0).prop('checked', true);

		checkRequestPage();
	}

	function checkRequestPage()
	{
		const reqPages = ['notice', 'event'];

		if (reqPages.indexOf(reqPage.val()) !== -1)
		{
			let pageName = reqPage.val() === 'notice' ? '공지사항' : '이벤트';
			let label 	 = pageName + '(' + reqContent.val() + ')';

			targetPageWrap.html('<p class="detail-data">'+label+'</p>');

			content.val(reqContent.val());
		}
	}

	function onClickBtnModalUserOpen()
	{
		modalTargetUserFadein();
		initTargetUserModal();
		getUsers();
		buildMovedUser();
	}

	function buildMovedUser()
	{
		movedUserTableBody.empty();

		let selectedRow = selectedUserTableBody.find('tr');

		let moveUserDom = '';
		$(selectedRow).each(function () {
			let profileId = $(this).data('uuid');
			let nick 	  = $(this).data('nick');
			let doit 	  = $(this).data('doit');
			let notice 	  = $(this).data('notice');
			let marketing = $(this).data('marketing');

			moveUserDom += '<tr data-uuid="'+profileId+'" data-nick="'+nick+'" data-doit="'+doit+'" data-notice="'+notice+'" data-marketing="'+marketing+'">';
			moveUserDom +=     '<td>'+nick+'</td>';
			moveUserDom +=     '<td>'+doit+'</td>';
			moveUserDom +=     '<td>'+notice+'</td>';
			moveUserDom +=     '<td>'+marketing+'</td>';
			moveUserDom += 	   '<td><i style="color: #ec5c5c;" onclick="removeRow(this); calculateSelectedCount();" class="far fa-times-circle"></i></td>';
			moveUserDom += '</tr>';
		});

		movedUserTableBody.append(moveUserDom);
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
				url: api.listPushTargetUser,
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
				,{title: "닉네임",		data: "nickname",    	   width: "40%", 	 className: 'cursor-default' }
				,{title: "두잇알림",		data: "noti_doit",    	   width: "15%", 	 className: 'cursor-default' }
				,{title: "공지알림",		data: "noti_notice",       width: "15%", 	 className: 'cursor-default' }
				,{title: "마케팅알림",	data: "noti_marketing",    width: "15%", 	 className: 'cursor-default' }
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
				initTableSorter(this);
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
				let nick 	  = detail.nickname;
				let doit 	  = detail.noti_doit;
				let notice 	  = detail.noti_notice;
				let marketing = detail.noti_marketing;
				moveUserDom += '<tr data-uuid="'+profileId+'" data-nick="'+nick+'" data-doit="'+doit+'" data-notice="'+notice+'" data-marketing="'+marketing+'">';
				moveUserDom +=     '<td>'+nick+'</td>';
				moveUserDom +=     '<td>'+doit+'</td>';
				moveUserDom +=     '<td>'+notice+'</td>';
				moveUserDom +=     '<td>'+marketing+'</td>';
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
		let table 		 = $("#targetUserTable").DataTable();
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
			sweetToast('발송 대상을 '+message.addOn);
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
			let nick 	  = $(this).data('nick');
			let doit 	  = $(this).data('doit');
			let notice 	  = $(this).data('notice');
			let marketing = $(this).data('marketing');

			selectedUserDom += '<tr data-uuid="'+profileId+'" data-nick="'+nick+'" data-doit="'+doit+'" data-notice="'+notice+'" data-marketing="'+marketing+'">';
			selectedUserDom +=     '<td>'+nick+'</td>';
			selectedUserDom +=     '<td>'+doit+'</td>';
			selectedUserDom +=     '<td>'+notice+'</td>';
			selectedUserDom +=     '<td>'+marketing+'</td>';
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

	function onClickToggleOpen(obj)
	{
		$(obj).next('.table-wrap').slideToggle();
		$(obj).toggleClass('on');
	}

	function onClickPage()
	{
		modalTargetPageFadein();
		initTargetPageModal();
		getEventPage();
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
				url: api.listPushTargetPage,
				type:"POST",
				global: false,
				headers: headers,
				data: function (d) {
					return pageParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분",	data: "event_name",    width: "20%", 	 className: "cursor-default" }
				,{title: "제목",	data: "title",    	   width: "40%", 	 className: "cursor-default" }
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
			,"keyword" : modalPage.val()
		}

		return JSON.stringify(param);
	}

	function setPageRowAttributes(nRow, aData)
	{
		/** 닉네임에 클릭이벤트 추가 **/
		$(nRow).attr('onClick', 'setSelectedPage(\''+aData.title+'\',\''+aData.event_uuid+'\')');
	}

	let g_page_uuid = pageUuid.val();
	function setSelectedPage(_page_title, _uuid)
	{
		g_page_uuid = _uuid;
		inputPage.val(_page_title);
		modalFadeout();
	}

	function onKeyupSearchPage()
	{
		let table = targetPageTable.DataTable();
		table.ajax.reload();
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
		let url 	= api.createPush;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithFormData(true, url, params(), createReqCallback, errMsg, false);
	}

	function params()
	{
		let sendTargetPageType = isEmpty(reqPage.val()) ? $("input[name=radio-target-page]:checked").val() : reqPage.val();
		let sendTargetUserType = $("input[name=radio-target-user]:checked").val();
		let profileIds = [];
		let formData  = new FormData();
		formData.append('send_date_type', $("input[name=radio-when]:checked").val());
		formData.append('send_datetime', sendDate.val()+' '+sendTime.val());
		formData.append('push_type', sendTargetUserType);
		if (sendTargetUserType === 'individual')
		{

			selectedUserTableBody.find('tr').each(function () {
				profileIds.push($(this).data('uuid'));
			});

			profileIds = JSON.stringify(profileIds)
		}
		formData.append('push_profile', profileIds);
		formData.append('push_category', sendTargetPageType);
		formData.append('push_category_target', g_page_uuid);
		formData.append('push_store', $("input[name=radio-store]:checked").val());
		formData.append('push_message', content.val().trim());
		formData.append('push_image', contentImage[0].files[0]);
		formData.append('created_user', sessionUserId.val());

		return formData;
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listPush;
	}

	function validation()
	{
		let sendWhen = $("input[name=radio-when]:checked").val();
		if (sendWhen === 'reserve' && isEmpty(sendTime.val()))
		{
			sweetToast('발송 시간은 ' + message.required);
			sendTime.trigger('focus');
			return false;
		}

		let sendWhom 	= $("input[name=radio-target-user]:checked").val();
		let targetCount = selectedUserTableBody.find('tr').length;
		if (sendWhom === 'individual' && targetCount === 0)
		{
			sweetToast('발송 대상은 ' + message.required);
			return false;
		}

		let checkedTargetPage = $("input[name=radio-target-page]:checked").val();
		if (targetPage.length > 0 && checkedTargetPage === 'event' && isEmpty(inputPage.val()))
		{
			sweetToast('발송 구분은 ' + message.required);
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

