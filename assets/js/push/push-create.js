
	const sendDate	= $("#sendDate");
	const sendTime	= $("#sendTime");
	const nickname	= $("#nickname");
	const content	= $("#content");
	const target	= $("input[name=radio-target]");
	const osType	= $("input[name=radio-store]");
	const btnSubmit = $("#btnSubmit");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const dataTable		= $("#dataTable");
	const modalNickname	= $("#modalNickname");

	$(document).ready(function () {
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
		target			.on('change', function () { onChangeTarget(this); });
		nickname		.on('click', function () { onClickNickname(); });
		btnSubmit		.on('click', function () { onSubmitPush(); });
	});

	function initComponent()
	{
		nickname.val('');
		content.val('');
		target.eq(0).prop('checked', true);
		osType.eq(0).prop('checked', true);
	}

	function initModal()
	{
		modalNickname.val('');
		modalNickname.focus();
	}

	function onClickNickname()
	{
		initModal();
		modalFadein();
		getUsers();
	}
	
	function getUsers()
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
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임",	data: "nickname",    width: "35%", 	 orderable: false,   className: "text-center" }
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
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
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
			,"keyword" : modalNickname.val()
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		/** 닉네임에 클릭이벤트 추가 **/
		$(nRow).attr('onClick', 'setSelectedUser(\''+aData.nickname+'\',\''+aData.profile_uuid+'\')');
	}

	let g_profile_uuid;
	function setSelectedUser(_nickname, _uuid)
	{
		g_profile_uuid = _uuid;
		nickname.val(_nickname);
		modalFadeout();
	}

	function onChangeTarget(obj)
	{
		$(obj).val() === 'all' ? nickname.parent().hide() : nickname.parent().show();
	}

	function onSubmitPush()
	{
		params()
		if (validation())
		{
			if (confirm(message.create))
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
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listPush
					},
					error: function (request, status) {
						alert(label.submit+message.ajaxError);
					}
				});
			}
		}
	}

	function params()
	{
		let target = $("input[name=radio-target]:checked").val();
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
			alert('발송시간은 ' + message.required);
			sendTime.focus();
			return false;
		}
		
		if (isEmpty(content.val()))
		{
			alert('내용은 ' + message.required);
			content.focus();
			return false;
		}

		return true;
	}

