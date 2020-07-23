
	const btnUcdModalOpen	= $("#btnUcdModalOpen");
	/** 기본정보 **/
	const profileId		= $("#profileId")
	const nickname		= $("#nickname")
	const balance		= $("#balance")
	const cash			= $("#cash")
	const point			= $("#point")
	/** 회원정보 **/
	const joinService	= $("#joinService");
	const contact		= $("#contact");
	const email			= $("#email");
	const isAuth		= $("#isAuth");
	/** 두잇정보 **/
	const tabOpened		= $("#tabOpened");
	const tabJoined		= $("#tabJoined");
	const openedWrap	= $("#openedWrap");
	const openedTable	= $("#openedTable");
	const joinedWrap	= $("#joinedWrap");
	const joinedTable	= $("#joinedTable");
	/** 기기정보 **/
	const deviceTable   = $("#deviceTable");
	/** UCD 사용내역 **/
	const usageHisTable	= $("#usageHisTable");

	/** modal **/
	const modalUcd 		= $("#modalUcd");
	const modalTokenInfo = $("#modalTokenInfo");
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const amount		= $("#amount");
	const content		= $("#content");
	const btnSubmit		= $("#btnSubmit");

	const g_profile_uuid 	= $("#profile_uuid").val();

	$( () => {
		/** 우측 메뉴클릭 스크롤 **/
		moveSection();
		/** 기본정보 **/
		getBasicProfile();
		/** 회원정보 **/
		getUserAccount();
		/** 두잇 개설 목록 불러오기 **/
		getOpenedDoit();
		/** 두잇 개설 목록 불러오기 **/
		getDeviceInfo();
		/** UCD 사용내역 **/
		getUsageHistoryUcd();
		/** 이벤트 **/
		btnUcdModalOpen	.on("click", function () { onClickUcdModalOpen(); })
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		tabOpened		.on("click", function () { onClickTabOpened(this); });
		tabJoined		.on("click", function () { onClickTabJoined(this); });
		btnSubmit		.on("click", function () { onSubmitUcd(); });
	});

	function moveSection()
	{
		$('[data-moveto]').on('click', function (e) {
			let $selectId = $(this).data('moveto');
			let $offsetTop = $('.' + $selectId).offset().top;

			$('html, body').stop().animate({
				scrollTop: $offsetTop -180
			}, 300);
			e.preventDefault(); e.stopPropagation();
		});
	}

	function onClickUcdModalOpen()
	{
		ucdModalFadein();
		initUcdModal();
	}

	function ucdModalFadein()
	{
		modalLayout.fadeIn();
		modalUcd.fadeIn();
		overflowHidden();
	}

	function initUcdModal()
	{
		amount.val('');
		amount.focus();
		content.val('');
	}

	function onClickTokenModalOpen()
	{
		tokenModalFadein();
		initTokenModal();
	}

	function tokenModalFadein()
	{
		modalLayout.fadeIn();
		modalTokenInfo.fadeIn();
		overflowHidden();
	}

	function initTokenModal()
	{

	}

	function onClickTabOpened(obj)
	{
		openedWrap.show();
		joinedWrap.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		getOpenedDoit();
	}

	function onClickTabJoined(obj)
	{
		joinedWrap.show();
		openedWrap.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		getJoinedDoit();
	}

	/** 기본정보 **/
	function getBasicProfile()
	{
		$.ajax({
			url: api.getUserProfile,
			type: "POST",
			global: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"profile_uuid" : g_profile_uuid}),
			success: function(data) {
				if (isSuccessResp(data))
					buildBasicProfile(data);
				else
					sweetError(invalidResp(data));
			},
			error: function (request, status) {
				sweetError('기본정보 '+label.detailContent+message.ajaxError);
			},
		});
	}

	function buildBasicProfile(data)
	{
		let detail = data.data;
		profileId	.html(detail.profile_uuid);
		nickname	.html(detail.nickname);
		balance		.html(numberWithCommas(detail.total));
		cash		.html(numberWithCommas(detail.cash));
		point		.html(numberWithCommas(detail.point));
	}

	/** 회원정보 **/
	function getUserAccount()
	{
		$.ajax({
			url: api.getUserAccount,
			type: "POST",
			global: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"profile_uuid" : g_profile_uuid}),
			success: function(data) {
				if (isSuccessResp(data))
					buildUserAccount(data);
				else
					sweetError(invalidResp(data));
			},
			error: function (request, status) {
				sweetError('회원정보 '+label.detailContent+message.ajaxError);
			},
		});
	}

	function buildUserAccount(data)
	{
		let detail = data.data;

		joinService	.html(detail.service.toString());
		contact		.html(detail.phone);
		email		.html(detail.email);
		isAuth		.html(detail.is_auth);
	}

	/** 두잇 개설정보 **/
	function getOpenedDoit()
	{
		openedTable.DataTable({
			ajax : {
				url: api.listUserOpened,
				type:"POST",
				headers: headers,
				data: function (d) {
					return openedDoitParams(d);
				},
				error: function (request, status) {
					sweetError('두잇개설 '+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "두잇명", 		data: "doit_title",   	width: "25%",    orderable: false,   className: "cursor-default" }
				,{title: "리워드 UCD", 	data: "reward_ucd",		width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "사용 UCD", 	data: "use_ucd",   		width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "참여자 수", 	data: "member_cnt",   	width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "목표달성률(%)", data: "goal_percent",   width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "평균달성률(%)", data: "avg_percent",   	width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "인증기간", data: "action_start_datetime",  width: "20%",    orderable: false,   className: "cursor-default",
					render: function (data, type, row, meta) {
						return row.action_start_datetime+label.tilde+row.action_end_datetime;
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
			pageLength: 10,
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
		});
	}

	function openedDoitParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"profile_uuid" : g_profile_uuid
		}

		return JSON.stringify(param);
	}

	/** 두잇 참여정보 **/
	function getJoinedDoit()
	{
		joinedTable.DataTable({
			ajax : {
				url: api.listUserJoined,
				type:"POST",
				headers: headers,
				data: function (d) {
					return joinedDoitParams(d);
				},
				error: function (request, status) {
					sweetError('두잇참여 '+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "두잇명", 		data: "doit_title",   	width: "25%",    orderable: false,   className: "cursor-default" }
				,{title: "리워드 UCD", 	data: "reward_ucd",   	width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "적립 UCD", 	data: "use_ucd",   		width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "목표달성률(%)", data: "goal_percent",   width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "평균달성률(%)", data: "avg_percent",   	width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "인증기간", data: "action_start_datetime",  width: "20%",    orderable: false,   className: "cursor-default",
					render: function (data, type, row, meta) {
						return row.action_start_datetime+label.tilde+row.action_end_datetime;
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
			pageLength: 10,
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
		});
	}

	function joinedDoitParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"profile_uuid" : g_profile_uuid
		}

		return JSON.stringify(param);
	}

	/** 기기정보 **/
	function getDeviceInfo()
	{
		deviceTable.DataTable({
			ajax : {
				url: api.listDevice,
				type:"POST",
				global: false,
				headers: headers,
				data: function (d) {
					return deviceParams(d);
				},
				error: function (request, status) {
					sweetError('기기정보 '+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "유형", 		data: "ucd_type",   width: "10%",    orderable: false,   className: "cursor-default" }
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
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
		});
	}

	function deviceParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"auth_code" : authCode.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
		}

		return JSON.stringify(param);
	}

	/** UCD 사용내역 **/
	function getUsageHistoryUcd()
	{
		usageHisTable.DataTable({
			ajax : {
				url: api.listUserUsageUcd,
				type:"POST",
				global: false,
				headers: headers,
				data: function (d) {
					return usageHistoryParams(d);
				},
				error: function (request, status) {
					sweetError('UCD 사용내역 '+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "유형", 		data: "ucd_type",   width: "10%",    orderable: false,   className: "cursor-default" }
				,{title: "구분", 	data: "division",   width: "10%",    orderable: false,   className: "cursor-default" }
				,{title: "금액", 	data: "amount",		width: "10%",    orderable: false,   className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "제목", 	data: "title",   	width: "15%",    orderable: false,   className: "cursor-default" }
				,{title: "내용", 	data: "description",width: "30%",    orderable: false,   className: "cursor-default" }
				,{title: "일시", 	data: "created",   	width: "15%",    orderable: false,   className: "cursor-default" }
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
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			}
		});
	}

	function usageHistoryParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"profile_uuid" : g_profile_uuid
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		if (isNegative(aData.amount))
			$(nRow).addClass('minus-pay');
	}

	function onSubmitUcd()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		$.ajax({
			url: api.createUserUcd,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: ucdParams(),
			success: function(data) {
				sweetToastAndCallback(data, createSuccess);
				if (isSuccessResp(data))
				{
					balance.html(numberWithCommas(data.data.total));
					cash.html(numberWithCommas(data.data.cash));
					point.html(numberWithCommas(data.data.point));
				}
			},
			error: function (request, status) {
				sweetError(label.submit+message.ajaxError);
			}
		});
	}

	function createSuccess()
	{
		getUsageHistoryUcd();
		modalFadeout();
	}

	function ucdParams()
	{
		let param = {
			"profile_uuid" : [g_profile_uuid]
			,"division" : 0
			,"ucd_type" : "point"
			,"amount" : amount.val()
			,"description" : content.val().trim()
			,"created_user" : sessionUserId.val()
			,"page_type" : ""
		}

		return JSON.stringify(param);
	}

	function validation()
	{
		if (isEmpty(amount.val()))
		{
			sweetToast('UCD는 '+message.required);
			amount.focus();
			return false;
		}

		if (amount.val() > 1000000)
		{
			sweetToast('UCD는 '+message.maxAvailableUserUcd);
			amount.focus();
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast('내용은 '+message.required);
			content.focus();
			return false;
		}

		return true;
	}
