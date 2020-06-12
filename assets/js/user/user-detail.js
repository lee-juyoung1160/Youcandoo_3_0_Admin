
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
		const openedWrap	= $("#openedWrap")
		const openedTable	= $("#openedTable")
		const joinedWrap	= $("#joinedWrap")
		const joinedTable	= $("#joinedTable")
		/** UCD 사용내역 **/
		const usageHisTable	= $("#usageHisTable")


	/*	const searchType 	= $("#search_type");
		const selPageLength = $("#selPageLength");
		const userActive	= $("input[name=radio-user-active]");*/
		/** modal **/
		const modalCloseBtn 	= $(".close-btn");
		const modalLayout 		= $(".modal-layout");
		const modalContent 		= $(".modal-content");

		const profile_uuid 	= $("#profile_uuid").val();

		$(document).ready(function () {
			/** 우측 메뉴클릭 스크롤 **/
			moveSection();
			/** 기본정보 **/
			getBasicProfile();
			/** 회원정보 **/
			getUserAccount();
			/** 두잇 개설 목록 불러오기 **/
			getOpenedDoit();
			/** UCD 사용내역 **/
			getUsageHistoryUcd();
			/** 이벤트 **/
			tabOpened	.on("click", function () { onClickTabOpened(this); });
			tabJoined	.on("click", function () { onClickTabJoined(this) });
		});

		function moveSection()
		{
			$('[data-moveto]').on('click', function (e) {
				let $selectId = $(this).data('moveto');
				let $offsetTop = $('.' + $selectId).offset().top;

				$('html, body').stop().animate({
					scrollTop: $offsetTop -160
				}, 300);
				e.preventDefault(); e.stopPropagation();
			});
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
				async: false,
				global: false,
				headers: headers,
				dataType: 'json',
				data: JSON.stringify({"profile_uuid" : profile_uuid}),
				success: function(data) {
					if (isSuccessResp(data))
						buildBasicProfile(data);
					else
						invalidResp(data);
				},
				error: function (request, status) {
					alert('기본정보 '+label.detailContent+message.ajaxError);
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
				async: false,
				global: false,
				headers: headers,
				dataType: 'json',
				data: JSON.stringify({"profile_uuid" : profile_uuid}),
				success: function(data) {
					if (isSuccessResp(data))
						buildUserAccount(data);
					else
						invalidResp(data);
				},
				error: function (request, status) {
					alert('회원정보 '+label.detailContent+message.ajaxError);
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
					async: false,
					headers: headers,
					data: function (d) {
						return openedDoitParams(d);
					},
					error: function (request, status) {
						alert('두잇개설 '+label.list+message.ajaxLoadError);
					}
				},
				columns: [
					{title: "두잇명", 		data: "doit_title",   	width: "25%",    orderable: false,   className: "text-center cursor-default" }
					,{title: "리워드 UCD", 	data: "reward_ucd",		width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return isEmpty(data) ? '-' : numberWithCommas(data);
						}
					}
					,{title: "사용 UCD", 	data: "use_ucd",   		width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return isEmpty(data) ? '-' : numberWithCommas(data);
						}
					}
					,{title: "참여자 수", 	data: "member_cnt",   	width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return isEmpty(data) ? '-' : numberWithCommas(data);
						}
					}
					,{title: "목표달성률(%)", data: "goal_percent",   width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return Math.floor(data);
						}
					}
					,{title: "평균달성률(%)", data: "avg_percent",   	width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return Math.floor(data);
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
				,"profile_uuid" : profile_uuid
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
					async: false,
					headers: headers,
					data: function (d) {
						return joinedDoitParams(d);
					},
					error: function (request, status) {
						alert('두잇참여 '+label.list+message.ajaxLoadError);
					}
				},
				columns: [
					{title: "두잇명", 		data: "doit_title",   	width: "25%",    orderable: false,   className: "text-center cursor-default" }
					,{title: "리워드 UCD", 	data: "reward_ucd",   	width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return isEmpty(data) ? '-' : numberWithCommas(data);
						}
					}
					,{title: "적립 UCD", 	data: "use_ucd",   		width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return isEmpty(data) ? '-' : numberWithCommas(data);
						}
					}
					,{title: "목표달성률(%)", data: "goal_percent",   width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return Math.floor(data);
						}
					}
					,{title: "평균달성률(%)", data: "avg_percent",   	width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return Math.floor(data);
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

		function joinedDoitParams(d)
		{
			let param = {
				"limit" : d.length
				,"page" : (d.start / d.length) + 1
				,"profile_uuid" : profile_uuid
			}

			return JSON.stringify(param);
		}

		/** UCD 사용내역 **/
		function getUsageHistoryUcd()
		{
			usageHisTable.DataTable({
				ajax : {
					url: api.listUsageUcd,
					type:"POST",
					async: false,
					headers: headers,
					data: function (d) {
						return usageHistoryParams(d);
					},
					error: function (request, status) {
						alert('UCD 사용내역 '+label.list+message.ajaxLoadError);
					}
				},
				columns: [
					{title: "유형", 		data: "ucd_type",   width: "10%",    orderable: false,   className: "text-center cursor-default" }
					,{title: "구분", 	data: "division",   width: "10%",    orderable: false,   className: "text-center cursor-default" }
					,{title: "금액", 	data: "amount",		width: "10%",    orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return isEmpty(data) ? '-' : numberWithCommas(data);
						}
					}
					,{title: "제목", 	data: "title",   	width: "15%",    orderable: false,   className: "text-center cursor-default" }
					,{title: "내용", 	data: "description",width: "30%",    orderable: false,   className: "text-center cursor-default" }
					,{title: "일시", 	data: "created",   	width: "15%",    orderable: false,   className: "text-center cursor-default" }
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
					setRowAttributes(nRow, aData);
				},
			});
		}

		function usageHistoryParams(d)
		{
			let param = {
				"limit" : d.length
				,"page" : (d.start / d.length) + 1
				,"profile_uuid" : profile_uuid
			}

			return JSON.stringify(param);
		}

		function setRowAttributes(nRow, aData)
		{
			if (isNegative(aData.amount))
				$(nRow).addClass('minus-pay');
		}
