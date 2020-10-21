
	/** 기본정보 **/
	const profileIdEl	= $("#profileId")
	const nicknameEl	= $("#nickname")
	const balanceEl		= $("#balance")
	const cashEl		= $("#cash")
	const pointEl		= $("#point")
	/** 회원정보 **/
	const contact		= $("#contact");
	const email			= $("#email");
	const isAuth		= $("#isAuth");
	/** 기기정보 **/
	const deviceTable   = $("#deviceTable");
	/** 두잇정보 **/
	const olTab			= $("#olTab");
	const tabContent	= $(".tab-content");
	const openedTable	= $("#openedTable");
	const joinedTable	= $("#joinedTable");
	/** 인증정보 **/
	const actionWrap   		= $("#actionWrap");
	const actionPagination	= $(".action_paginate");
	const spDoitTitle		= $("#spDoitTitle");
	const btnRemoveDoitTitle = $("#btnRemoveDoitTitle");
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
	/** 푸시토큰 모달 **/
	const modalTokenInfo = $("#modalTokenInfo");
	const deviceToken 	 = $("#deviceToken");

	const g_page_length  = 12;
	const g_profile_uuid = $("#profile_uuid").val();

	$( () => {
		/** dataTable default config **/
		initTableDefault();
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
		toggleDoitTitle();
		getActions();
		/** UCD 사용내역 **/
		getUsageHistoryUcd();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		olTab			.on("click", function (event) { onClickTab(event); });
		btnRemoveDoitTitle	.on("click", function () { onClickRemoveDoitTitle(); });
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

	function onClickTab(e)
	{
		let clickedEl = $(e.target);
		let target = $(clickedEl).data('target')

		clickedEl.siblings().removeClass('active');
		clickedEl.addClass('active');
		tabContent.hide();
		$(target).show();
		clickedEl.hasClass('open') ? getOpenedDoit() : getJoinedDoit();
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
		let { profile_uuid, nickname, total, cash, point } = data.data;
		profileIdEl	.html(profile_uuid);
		nicknameEl	.html(nickname);
		balanceEl	.html(numberWithCommas(total));
		cashEl		.html(numberWithCommas(cash));
		pointEl		.html(numberWithCommas(point));
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
				{title: "기기구분", 		data: "device_type",   	width: "10%" }
				,{title: "단말기ID", 	data: "client_id",   	width: "25%" }
				,{title: "푸시토큰", 	data: "device_token",   width: "55%",
					render: function (data) {
						return '<a onclick="onClickTokenModalOpen(this);" data-token="'+data+'" class="os-token">'+data+'</a>';
					}
				}
				,{title: "등록일시", 	data: "datetime",   	width: "15%" }
			],
			serverSide: true,
			paging: false,
			pageLength: 10,
			select: false,
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
				{title: "두잇명", 		data: "doit_title",   	width: "25%" }
				,{title: "리워드 UCD", 	data: "reward_ucd",		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "사용 UCD", 	data: "use_ucd",   		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "참여자 수", 	data: "member_cnt",   	width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "목표달성률(%)", data: "goal_percent",   width: "10%",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "평균달성률(%)", data: "avg_percent",   	width: "10%",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "인증기간", data: "action_start_datetime",  width: "20%",
					render: function (data, type, row, meta) {
						return `${row.action_start_datetime} ${label.tilde} ${row.action_end_datetime}`;
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
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
					sweetError(`두잇참여 ${label.list} ${message.ajaxLoadError}`);
				}
			},
			columns: [
				{title: "두잇명", 		data: "doit_title",   				width: "19%",	className: "cursor-pointer" }
				,{title: "진행상태", 	data: "doit_status",    			width: "5%",	className: "cursor-pointer" }
				,{title: "리워드 UCD", 	data: "reward_ucd",   				width: "8%",	className: "cursor-pointer",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "적립 UCD", 	data: "use_ucd",   					width: "8%",	className: "cursor-pointer",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "목표달성률(%)", data: "goal_percent",   			width: "8%",	className: "cursor-pointer",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "평균달성률(%)", data: "avg_percent",   				width: "8%",	className: "cursor-pointer",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "인증기간", 	data: "action_start_datetime",  	width: "14%",	className: "cursor-pointer",
					render: function (data, type, row, meta) {
						return `${row.action_start_datetime} ${label.tilde} ${row.action_end_datetime}`;
					}
				}
				,{title: "인증 가능 시간", data: "action_allow_start_time", 	width: "12%",	className: "cursor-pointer",
					render: function(data, type, row, meta) {
						return `${row.action_allow_start_time} ${label.tilde} ${row.action_allow_end_time}`;
					}
				}
				,{title: "인증요일", 	data: "action_dayofweek",  			width: "10%",	className: "cursor-pointer" }
				,{title: "인증방법", 	data: "action_resource_type",  		width: "5%",	className: "cursor-pointer",
					render: function (data) {
						switch (data) {
							case 'image':
								return '사진';
							case 'video':
								return '영상';
							case 'voice':
								return '음성';
							default:
								return '';
						}
					}
				}
				,{title: "갤러리허용",	data: "allow_gallery_image",		width: "6%",	className: "cursor-pointer",
					render: function (data, type, row, meta) {
						return row.action_resource_type === 'image' ? data : label.dash;
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setJoinDoitRowAttribute(nRow, aData);
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

	function setJoinDoitRowAttribute(nRow, aData)
	{
		/** row 클릭이벤트 추가 **/
		$(nRow).attr('onClick', `onClickJoinDoitRow("${aData.doit_uuid}", "${replaceDoubleQuotes(aData.doit_title)}")`);
	}

	let join_doit_uuid = '';
	function onClickJoinDoitRow(_uuid, _title)
	{
		actionCurrentPage = 1;
		join_doit_uuid = _uuid;
		toggleDoitTitle(_title);
		getActions(join_doit_uuid);
	}

	/** 인증 정보 **/
	function onClickRemoveDoitTitle()
	{
		actionCurrentPage = 1;
		join_doit_uuid = '';
		toggleDoitTitle();
		getActions();
	}

	function toggleDoitTitle(_title)
	{
		if (isEmpty(_title))
		{
			spDoitTitle.html('│ 전체');
			btnRemoveDoitTitle.hide();
		}
		else
		{
			spDoitTitle.html(`│ ${_title}`);
			btnRemoveDoitTitle.show();
		}
	}

	function getActions(_doit_uuid)
	{
		let url 	 = api.listUserAction;
		let errMsg 	 = `인증정보 ${label.list} ${message.ajaxLoadError}`;
		let param = {
			"limit" : g_page_length
			,"page" : actionCurrentPage
			,"profile_uuid" : g_profile_uuid
			,"doit_all" : true
		}

		if (!isEmpty(_doit_uuid))
		{
			param.doit_all = false;
			param["doit_uuid"] = _doit_uuid;
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getActionsCallback, errMsg, false);
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
				let successYn = action.success === 'Y' ? label.success : label.fail;
				let resourceType = action.resource_type;
				let warnImageDom = '';
				let actionImage = action.image_url;
				if (isEmpty(actionImage))
					actionImage = label.noImage;
				if (resourceType === 'voice')
					actionImage = label.voiceImage;
				/** 이미지 클릭 > 상세보기 모달을 위해 이벤트 및 필요한 속성들 추가 **/
				let actionImageDom =
					`<img class="detail-img" 
						src="${actionImage}"
						onclick="onClinkActionImage(this);"
						onerror="onErrorImage(this);"  ';
						data-type="${action.resource_type}"
						data-uuid="${action.action_uuid}"
						data-url="${action.url}"
						data-cover="${action.image_url}"
						data-exurl="${action.example_url}"
						data-exdesc="${replaceDoubleQuotes(action.example_description)}"
						data-title="${replaceDoubleQuotes(action.doit_title)}"
						data-nickname="${action.user_name}"
						data-yellow="${action.yellow_card}"
						data-red="${action.red_card}"
						data-ydesc="${action.yellow_card_description}"
						data-rdesc="${action.red_card_description}" 
						alt="인증 이미지입니다.">`

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

				if (i===0 || i%6 === 0)
					actionDom += '<ul class="cert-contents clearfix">';

				actionDom +=
					`<li>
						<div class="top clearfix">
							<span class="success-text">${successYn}</span>
							<i class="warning-icon fas fa-exclamation-triangle">
							<span>신고 : <span class="cert-data-num">${action.report_count}</span></span></i>
						</div>
						<div class="thumbnail-wrap">${actionImageDom}</div>
						<div class="text-wrap">
							<p class="title" title="${action.doit_title}">${action.doit_title}</p>
							<span>${action.user_name}</span>
							<p class="date">${action.action_datetime}</p>
							<i>${warnImageDom}</i>
						</div>
					</li>`

				if (i>0 && (i+1)%6 === 0)
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
		let last		= Math.ceil(totalCount / g_page_length);
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

		getActions(join_doit_uuid);
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
				{title: "유형", 		data: "ucd_type",   width: "10%" }
				,{title: "구분", 	data: "division",   width: "10%" }
				,{title: "금액", 	data: "amount",		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "제목", 	data: "title",   	width: "15%" }
				,{title: "내용", 	data: "description",width: "30%" }
				,{title: "일시", 	data: "created",   	width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
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

