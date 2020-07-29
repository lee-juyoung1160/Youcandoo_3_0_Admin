
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
	/** 기기정보 **/
	const deviceTable   = $("#deviceTable");
	/** 두잇정보 **/
	const tabOpened		= $("#tabOpened");
	const tabJoined		= $("#tabJoined");
	const openedWrap	= $("#openedWrap");
	const openedTable	= $("#openedTable");
	const joinedWrap	= $("#joinedWrap");
	const joinedTable	= $("#joinedTable");
	/** 인증정보 **/
	const actionWrap   	= $("#actionWrap");
	const actionPagination	= $(".action_paginate");
	/** UCD 사용내역 **/
	const usageHisTable	= $("#usageHisTable");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	/** 인증상세 모달 **/
	const modalActionDetail	= $("#modalActionDetail");
	const modalActionDom	= $("#modalActionDom");
	const modalExample		= $("#modalExample");
	const modalExampleDesc	= $("#modalExampleDesc");
	const modalDoitTitle	= $("#modalDoitTitle");
	const modalNickname		= $("#modalNickname");
	const modalWarnWrap		= $("#modalWarnWrap");
	/** ucd 적립 모달 **/
	const modalUcd 		= $("#modalUcd");
	const amount		= $("#amount");
	const content		= $("#content");
	const btnSubmit		= $("#btnSubmit");
	/** 푸시토큰 모달 **/
	const modalTokenInfo = $("#modalTokenInfo");
	const deviceToken 	= $("#deviceToken");

	const g_profile_uuid 	= $("#profile_uuid").val();

	$( () => {
		/** 우측 메뉴클릭 스크롤 **/
		moveSection();
		/** 기본정보 **/
		getBasicProfile();
		/** 회원정보 **/
		getUserAccount();
		/** 기기정보 **/
		getDeviceInfo();
		/** 두잇 정보 **/
		getOpenedDoit();
		/** 인증 정보 **/
		getActions();
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
		amount.trigger('focus');
		content.val('');
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
		let param   = JSON.stringify({"profile_uuid" : g_profile_uuid});
		let url 	= api.getUserProfile;
		let errMsg 	= '기본정보 '+label.detailContent+message.ajaxError;

		ajaxRequestWithJsonData(false, url, param, getBasicProfileCallback, errMsg, false);
	}

	function getBasicProfileCallback(data)
	{
		isSuccessResp(data) ? buildBasicProfile(data) : sweetError(invalidResp(data));
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
		let param   = JSON.stringify({"profile_uuid" : g_profile_uuid});
		let url 	= api.getUserAccount;
		let errMsg 	= '회원정보 '+label.detailContent+message.ajaxError;

		ajaxRequestWithJsonData(false, url, param, getUserAccountCallback, errMsg, false);
	}

	function getUserAccountCallback(data)
	{
		isSuccessResp(data) ? buildUserAccount(data) : sweetError(invalidResp(data));
	}

	function buildUserAccount(data)
	{
		let detail = data.data;

		joinService	.html(detail.service.toString());
		contact		.html(detail.phone);
		email		.html(detail.email);
		isAuth		.html(detail.is_auth);
	}

	/** 기기정보 **/
	function getDeviceInfo()
	{
		deviceTable.DataTable({
			ajax : {
				url: api.listUserDevice,
				type:"POST",
				headers: headers,
				data: function (d) {
					return JSON.stringify({"profile_uuid" : g_profile_uuid});
				},
				error: function (request, status) {
					sweetError('기기정보 '+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기기구분", 		data: "device_type",   	width: "10%",    className: "cursor-default" }
				,{title: "단말기ID", 	data: "client_id",   	width: "25%",    className: "cursor-default" }
				,{title: "푸시토큰", 	data: "device_token",   width: "55%",    className: "cursor-default",
					render: function (data) {
						return '<a onclick="onClickTokenModalOpen(this);" data-token="'+data+'" class="os-token">'+data+'</a>';
					}
				}
				,{title: "등록일시", 	data: "datetime",   	width: "15%",    className: "cursor-default" }
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
			paging: false,
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
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function onClickTokenModalOpen(obj)
	{
		modalLayout.fadeIn();
		modalTokenInfo.fadeIn();
		deviceToken.html($(obj).data('token'));
		overflowHidden();
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
				{title: "두잇명", 		data: "doit_title",   	width: "25%",    className: "cursor-default" }
				,{title: "리워드 UCD", 	data: "reward_ucd",		width: "10%",    className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "사용 UCD", 	data: "use_ucd",   		width: "10%",    className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "참여자 수", 	data: "member_cnt",   	width: "10%",    className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "목표달성률(%)", data: "goal_percent",   width: "10%",    className: "cursor-default",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "평균달성률(%)", data: "avg_percent",   	width: "10%",    className: "cursor-default",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "인증기간", data: "action_start_datetime",  width: "20%",    className: "cursor-default",
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
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
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
				{title: "두잇명", 		data: "doit_title",   	width: "25%",    className: "cursor-default" }
				,{title: "리워드 UCD", 	data: "reward_ucd",   	width: "10%",    className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "적립 UCD", 	data: "use_ucd",   		width: "10%",    className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "목표달성률(%)", data: "goal_percent",   width: "10%",    className: "cursor-default",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "평균달성률(%)", data: "avg_percent",   	width: "10%",    className: "cursor-default",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "인증기간", data: "action_start_datetime",  width: "20%",    className: "cursor-default",
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
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
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

	/** 인증 정보 **/
	function getActions()
	{
		let url 	 = api.listUserAction;
		let errMsg 	 = '인증정보 '+label.list+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, actionParams(), getActionsCallback, errMsg, false);
	}

	function actionParams()
	{
		let param = {
			"limit" : 10
			,"page" : actionCurrentPage
			,"profile_uuid" : g_profile_uuid
		}

		return JSON.stringify(param);
	}

	function getActionsCallback(data)
	{
		isSuccessResp(data) ? getActionsSuccess(data) : sweetError(invalidResp(data));
	}

	function getActionsSuccess(data)
	{
		buildActionList(data);
		buildActionPagination(data);
	}

	function buildActionList(data)
	{
		let actions    = data.data;
		let dataLen    = actions.length;
		let totalCount = data.recordsTotal
		let actionDom  = '<p class="empty-message">인증 정보가 없습니다.</p>';

		actionWrap.empty();

		if (totalCount > 0)
		{
			actionPagination.show();

			actionDom = '';
			for (let i=0; i<dataLen; i++)
			{
				let action    = actions[i];
				let actionId  = "action_"+i;
				let successYn = action.success === 'Y' ? label.success : label.fail;
				let resourceType = action.resource_type;
				let warnImageDom = '';
				let actionImage = action.image_url;
				if (isEmpty(actionImage))
					actionImage = label.noImage;
				if (resourceType === 'voice')
					actionImage = label.voiceImage;
				/** 이미지 클릭 > 상세보기 모달을 위해 이벤트 및 필요한 속성들 추가 **/
				let actionImageDom = '<img class="detail-img" src="'+actionImage+'" ';
				actionImageDom += 'onclick="onClinkActionImage(this);"  ';
				actionImageDom += 'onerror="onErrorImage(this);"  ';
				actionImageDom += 'data-type="'+action.resource_type+'" ';
				actionImageDom += 'data-uuid="'+action.action_uuid+'" ';
				actionImageDom += 'data-url="'+action.url+'" ';
				actionImageDom += 'data-cover="'+action.image_url+'" ';
				actionImageDom += 'data-exurl="'+action.example_url+'" ';
				actionImageDom += 'data-exdesc="'+action.example_description+'" ';
				actionImageDom += 'data-title="'+action.doit_title+'" ';
				actionImageDom += 'data-nickname="'+action.user_name+'" ';
				actionImageDom += 'data-yellow="'+action.yellow_card+'" ';
				actionImageDom += 'data-red="'+action.red_card+'" ';
				actionImageDom += 'data-ydesc="'+action.yellow_card_description+'" ';
				actionImageDom += 'data-rdesc="'+action.red_card_description+'" ';
				actionImageDom += 'alt="인증 이미지입니다.">';

				let className = '';
				if (action.yellow_card === 'Y')
				{
					warnImageDom = '<img src="'+label.yellowCardImage+'" alt="">';
					className = 'yellow-card';
				}
				if (action.red_card === 'Y')
					warnImageDom = '<img src="'+label.redCardImage+'" alt="">';
				if (action.yellow_card === 'Y' && action.red_card === 'Y')
					warnImageDom = '<img src="'+label.redYellowCardImage+'" alt="">';

				if (i===0 || i%5 === 0)
					actionDom += '<ul class="cert-contents clearfix">';

				actionDom += '<li>';
				actionDom += 	'<div class="top clearfix">';
				actionDom += 		'<span class="success-text">'+successYn+'</span>';
				actionDom += 		'<i class="warning-icon fas fa-exclamation-triangle">';
				actionDom +=        '<span>신고 : <span class="cert-data-num">'+action.report_count+'</span></span></i>';
				actionDom += 	'</div>';
				actionDom += 	'<div class="thumbnail-wrap">';
				actionDom += 		actionImageDom;
				actionDom += 	'</div>';
				actionDom += 	'<div class="text-wrap">';
				actionDom += 		'<p class="title">'+action.doit_title+'</p>';
				actionDom += 		'<span>'+action.user_name+'</span>';
				actionDom += 		'<p class="date">'+action.action_datetime+'</p>';
				actionDom += 		'<i>'+warnImageDom+'</i>';
				actionDom += 	'</div>';
				actionDom += '</li>';

				if (i>0 && (i+1)%5 === 0)
					actionDom += '</ul>';
			}
		}
		else
			actionPagination.hide();

		actionWrap.html(actionDom);
	}

	let actionCurrentPage = 1;
	function buildActionPagination(data)
	{
		let totalCount  = data.recordsTotal;
		let last		= Math.ceil(totalCount / 10);
		let pageLength  = 6;
		if (last <= 10)
			pageLength = last
		let i;

		let pageDom = '';
		if (actionCurrentPage === 1)
			pageDom += '<a class="paginate_button previous disabled" id="dataTable_previous">';
		else
			pageDom += '<a onclick="onClickPageNum(this)" class="paginate_button previous" data-page="'+(actionCurrentPage-1)+'" id="dataTable_previous">';
		pageDom +=     label.previous;
		pageDom += '</a>';
		pageDom += '<span>';
		if (last <= 10)
		{
			for (i=1; i<=pageLength; i++)
			{
				if (last > 1 && actionCurrentPage === i)
					pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+i+'">'+i+'</a>';
				else
					pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
			}
		}
		else
		{
			if (actionCurrentPage < 5)
			{
				for (i=1; i<=pageLength; i++)
				{
					if (last > 1 && actionCurrentPage === i)
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+i+'">'+i+'</a>';
					else
					{
						if (pageLength === i)
						{
							pageDom += '<span class="ellipsis">…</span>';
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+last+'">'+last+'</a>';
						}
						else
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
					}
				}
			}
			else if (actionCurrentPage >= 5 && actionCurrentPage <= last - 4)
			{
				for (i=1; i<=last; i++)
				{
					if (i === 1)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
						pageDom += '<span class="ellipsis">…</span>';
					}

					if (actionCurrentPage === i)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="' + (i - 1) + '">' + (i - 1) + '</a>';
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="' + i + '">' + i + '</a>';
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="' + (i + 1) + '">' + (i + 1) + '</a>';
					}

					if (last === i)
					{
						pageDom += '<span class="ellipsis">…</span>';
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+last+'">'+last+'</a>';
					}
				}
			}
			else if (actionCurrentPage > last - 4)
			{
				for (i=1; i<=pageLength; i++)
				{
					if (i === 1)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
						pageDom += '<span class="ellipsis">…</span>';
					}

					if (i >= pageLength - 4)
					{
						if (actionCurrentPage === last-(pageLength-i))
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+(last-(pageLength-i))+'">'+(last-(pageLength-i))+'</a>';
						else
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+(last-(pageLength-i))+'">'+(last-(pageLength-i))+'</a>';
					}
				}
			}
		}
		pageDom += '</span>';
		if (last === actionCurrentPage)
			pageDom += '<a class="paginate_button next disabled" id="dataTable_next">';
		else
			pageDom += '<a onclick="onClickPageNum(this)" class="paginate_button next" data-page="'+(actionCurrentPage+1)+'" id="dataTable_next">';
		pageDom += 	   label.next;
		pageDom += '</a>';

		actionPagination.html(pageDom);
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		actionCurrentPage = $(obj).data('page');

		getActions();
	}

	function onClinkActionImage(obj)
	{
		modalDetailFadein();
		buildDetailModal(obj);
	}

	function modalDetailFadein()
	{
		modalActionDetail.fadeIn();
		modalLayout.fadeIn();
		overflowHidden();
	}

	function buildDetailModal(obj)
	{
		let uuid 		= $(obj).data('uuid');
		let type 		= $(obj).data('type');
		let actionUrl 	= $(obj).data('url');
		let coverUrl 	= $(obj).data('cover');
		let title 		= $(obj).data('title');
		let nickname 	= $(obj).data('nickname');
		let red 		= $(obj).data('red');
		let redDesc		= $(obj).data('rdesc');
		let yellow 		= $(obj).data('yellow');
		let yellowDesc	= $(obj).data('ydesc');
		let exampleUrl 	= $(obj).data('exurl');
		let exampleDesc	= $(obj).data('exdesc');
		let actionDom 	= '';
		let exampleDom 	= '';
		let className 	= '';
		if (type === 'image')
		{
			className = 'img-contents';

			actionDom += 	'<img src="'+actionUrl+'" alt="인증이미지" onerror="onErrorImage(this);">';

			exampleDom += 	'<img src="'+exampleUrl+'" alt="예시이미지" onerror="onErrorImage(this);">';
		}
		else if (type === 'video')
		{
			className = 'video-contents';

			actionDom += 	'<video poster="'+coverUrl+'" controls onerror="onErrorImage(this);">';
			actionDom += 		'<source src="'+actionUrl+'" onerror="onErrorActionVideo();">';
			actionDom += 	'</video>';

			exampleDom += 	'<video controls>';
			exampleDom += 		'<source src="'+exampleUrl+'" onerror="onErrorExamVideo()">';
			exampleDom += 	'</video>';
		}
		else if (type === 'voice')
		{
			className = 'audio-contents';

			actionDom += 	'<img style="width:100%;" src="'+label.voiceImage+'" onerror="onErrorImage(this);">';
			actionDom += 	'<audio controls>';
			actionDom += 		'<source src="'+actionUrl+'" onerror="onErrorActionAudio();">';
			actionDom += 	'</audio>';

			exampleDom += 	'<img style="width:100%;" src="'+label.voiceImage+'" onerror="onErrorImage(this);">';
			exampleDom += 	'<audio controls>';
			exampleDom += 		'<source src="'+exampleUrl+'" onerror="onErrorExamAudio();">';
			exampleDom += 	'</audio>';
		}

		/** 인증게시물 **/
		modalActionDom.attr('class', className);
		modalActionDom.html(actionDom);

		/** 두잇명 **/
		modalDoitTitle.html(title);
		/** 작성자 **/
		modalNickname.html(nickname);

		/** 경고장 영역 **/
		let warnDom = '';
		if (red === 'Y' || yellow === 'Y')
		{
			if (red === 'Y')
			{
				warnDom += '<div class="card-wrap">';
				warnDom += 	    '<img src="'+label.redCardImage+'" alt="레드카드">';
				warnDom += 			'<span>'+redDesc+'</span>';
				warnDom += '</div>';
			}
			if (yellow === 'Y')
			{
				warnDom += '<div class="card-wrap">';
				warnDom += 	    '<img src="'+label.yellowCardImage+'" alt="옐로우카드">';
				warnDom += 			'<span>'+yellowDesc+'</span>';
				warnDom += '</div>';
			}
		}
		else	warnDom += '<p class="data-contents">발송 된 경고장이 없습니다.</p>';
		modalWarnWrap.html(warnDom);

		/** 인증예시 **/
		modalExample.attr('class', className);
		modalExample.html(exampleDom);
		modalExampleDesc.html(exampleDesc);
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
				{title: "유형", 		data: "ucd_type",   width: "10%",    className: "cursor-default" }
				,{title: "구분", 	data: "division",   width: "10%",    className: "cursor-default" }
				,{title: "금액", 	data: "amount",		width: "10%",    className: "cursor-default",
					render: function (data) {
						return isEmpty(data) ? label.nullValue : numberWithCommas(data);
					}
				}
				,{title: "제목", 	data: "title",   	width: "15%",    className: "cursor-default" }
				,{title: "내용", 	data: "description",width: "30%",    className: "cursor-default" }
				,{title: "일시", 	data: "created",   	width: "15%",    className: "cursor-default" }
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
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
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
		let url 	= api.createUserUcd;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, ucdParams(), createReqCallback, errMsg, false);
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

	function createReqCallback(data)
	{
		if (isSuccessResp(data))
		{
			balance.html(numberWithCommas(data.data.total));
			cash.html(numberWithCommas(data.data.cash));
			point.html(numberWithCommas(data.data.point));
		}

		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		getUsageHistoryUcd();
		modalFadeout();
	}

	function validation()
	{
		if (isEmpty(amount.val()))
		{
			sweetToast('UCD는 '+message.required);
			amount.trigger('focus');
			return false;
		}

		if (amount.val() > 1000000)
		{
			sweetToast('UCD는 '+message.maxAvailableUserUcd);
			amount.trigger('focus');
			return false;
		}

		if (isEmpty(content.val()))
		{
			sweetToast('내용은 '+message.required);
			content.trigger('focus');
			return false;
		}

		return true;
	}
