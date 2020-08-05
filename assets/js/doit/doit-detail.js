
	const tabDoit 		= $("#tabDoit");
	const tabUser 		= $("#tabUser");
	const tabAction		= $("#tabAction");
	const tabReview		= $("#tabReview");
	const tabUcd		= $("#tabUcd");
	const goUpdate      = $("#goUpdate");

	/** 두잇정보 탭 **/
	const doitDetail	= $("#doitDetail");
	const creator 		= $("#creator");
	const doitTitle 	= $("#doitTitle");
	const doitDesc 		= $("#doitDesc");
	const doitTags 		= $("#doitTags");
	const introWrap 	= $("#introWrap");
	const reward 		= $("#reward");
	const extraReward	= $("#extraReward");
	const actionDate 	= $("#actionDate");
	const actionTime 	= $("#actionTime");
	const options 		= $("#options");
	const actionType 	= $("#actionType");
	const actionResource = $("#actionResource");
	const actionDesc    = $("#actionDesc");

	/** 참여자정보 탭 **/
	const doitUser		= $("#doitUser");
	const search 		= $(".search");
	const reset 		= $(".reset");
	const keyword		= $("#keyword")
	const joinCount 	= $("#joinCount");
	const goal 			= $("#goal");
	const avg 			= $("#avg");
	const forecast 		= $("#forecast");
	const saving 		= $("#saving");
	/*const xlsxExport 	= $(".excel-btn");*/
	const joinUserTable		= $("#joinUserTable")
	const selPageLengthForUser   = $("#selPageLengthForUser");

	/** 인증정보 탭 **/
	const doitAction	= $("#doitAction");
	const btnWarnRed	= $(".warning-btn");
	const btnWarnYellow	= $(".yellow-btn");
	const actionWrap	= $("#actionWrap");
	const actionTopDom	= $("#actionTopDom");
	const pagination	= $("#dataTable_paginate");
	const actionTotalCount		 = $("#actionTotalCount");
	const selPageLengthForAction = $("#selPageLengthForAction");
	/** 경고장 발송 modal **/
	const modalWarn			= $("#modalWarn");
	const causeBy			= $("#selCauseBy");
	const btnSubmitWarn		= $("#btnSubmitWarn");
	/** 상세보기 modal **/
	const modalDetailAction	= $("#modalDetailAction");
	const modalActionDom	= $("#modalActionDom");
	const modalExample		= $("#modalExample");
	const modalExampleDesc	= $("#modalExampleDesc");
	const modalDoitTitle	= $("#modalDoitTitle");
	const modalNickname		= $("#modalNickname");
	const modalWarnWrap		= $("#modalWarnWrap");
	let g_warn_type;

	/** 리뷰정보탭 **/
	const doitReview		= $("#doitReview");
	const reviewTable		= $("#reviewTable");
	const btnBlind			= $("#btnBlind");
	const btnUnBlind		= $("#btnUnBlind");
	const selPageLengthForReview	= $("#selPageLengthForReview");
	/** 리뷰상세 modal **/
	const modalDetailReview		= $("#modalDetailReview");
	const modalReviewContent	= $("#modalReviewContent");
	const modalReviewTitle		= $("#modalReviewTitle");
	const modalReviewStarWrap	= $("#modalReviewStarWrap");
	const modalReviewReport		= $("#modalReviewReport");
	const modalReviewUser		= $("#modalReviewUser");
	const modalReviewCreated	= $("#modalReviewCreated");
	const modalReviewBlind		= $("#modalReviewBlind");
	let g_blind_type;

	/** UCD정보탭 **/
	const ucdInfo		= $("#ucdInfo");
	const ucdTable		= $("#ucdTable");
	const selPageLengthForUcd	= $("#selPageLengthForUcd");

	/** modal 공통 **/
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$( () => {
		/** n개씩보기 셀렉트 박스 초기화 **/
		initCustomPageLength(selPageLengthForUser);
		initCustomPageLength(selPageLengthForReview);
		initCustomPageLength(selPageLengthForUcd);
		initPageLengthForActions();
		/** 두잇 상세정보 **/
		getDetail();
		/** 이벤트 **/
		tabDoit			.on("click", function () { onClickDoitTab(this); });
		tabUser			.on("click", function () { onClickUserTab(this); });
		tabAction		.on("click", function () { onClickActionTab(this); });
		tabReview		.on("click", function () { onClickReviewTab(this); });
		tabUcd			.on("click", function () { onClickUcdTab(this); });
		/*xlsxExport		.on("click", () => { onClickExcelBtn(); });*/
		goUpdate		.on('click', function () { goUpdatePage(); })
		search			.on("click", function () { getJoinMember(); });
		reset			.on("click", function () { initSearchForm(); });
		btnWarnYellow	.on('click', function () { g_warn_type = 'Y'; onClickBtnWarn(); });
		btnWarnRed		.on('click', function () { g_warn_type = 'R'; onClickBtnWarn(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnBlind		.on('click', function () { g_blind_type = 'Y'; onClickUpdateBlind(); });
		btnUnBlind		.on('click', function () { g_blind_type = 'N'; onClickUpdateBlind(); });
		selPageLengthForUser	.on('change', function () { getJoinMember(); });
		selPageLengthForAction	.on('change', function () { onChangePageLengthForAction(); });
		selPageLengthForReview	.on('change', function () { getInvolveReview(); });
		selPageLengthForUcd		.on('change', function () { getUcdLog(); });
		btnSubmitWarn	.on('click', function () { onSubmitWarn(); });
	});

	function initCustomPageLength(_element)
	{
		let options = '';
		options += '<option value="10">10개씩 보기</ooption>';
		options += '<option selected value="30">30개씩 보기</ooption>';
		options += '<option value="50">50개씩 보기</ooption>';
		options += '<option value="100">100개씩 보기</ooption>';

		_element.html(options);

		onChangeSelectOption(_element);
	}

	/** 두잇정보탭 **/
	function onClickDoitTab(obj)
	{
		doitDetail.show();
		doitUser.hide();
		doitAction.hide();
		doitReview.hide();
		ucdInfo.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		getDetail();
	}

	/** 참여자정보탭 **/
	function onClickUserTab(obj)
	{
		doitUser.show();
		doitDetail.hide();
		doitAction.hide();
		doitReview.hide();
		ucdInfo.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		getJoinMemberTotal();
		getJoinMember();
	}

	/** 인증정보탭 **/
	function onClickActionTab(obj)
	{
		doitAction.show();
		doitDetail.hide();
		doitUser.hide();
		doitReview.hide();
		ucdInfo.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		currentPage = 1;
		getInvolveAction();
	}

	/** 리뷰정보탭 **/
	function onClickReviewTab(obj)
	{
		doitReview.show();
		doitDetail.hide();
		doitUser.hide();
		doitAction.hide();
		ucdInfo.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		getInvolveReview();
	}

	/** UCD정보탭 **/
	function onClickUcdTab(obj)
	{
		ucdInfo.show();
		doitDetail.hide();
		doitUser.hide();
		doitAction.hide();
		doitReview.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		getUcdLog();
	}

	/****************
	 * 두잇정보탭 관련
	 * **************/
	let g_doitUuid;
	function getDetail()
	{
		let param   = JSON.stringify({"idx" : idx});
		let url 	= api.detailDoit;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, param, getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		if (isSuccessResp(data))
		{
			g_doitUuid = data.data.doit_uuid;
			buildDetail(data);
		}
		else
			sweetError(invalidResp(data));
	}

	function buildDetail(data)
	{
		let detail 	 = data.data;

		doitTitle.html(detail.doit_title);
		actionDate.html(detail.action_start_datetime+label.tilde+detail.action_end_datetime);

		let rewardDom 	= '';
		let separator   = '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'
		let promotionId = detail.promotion_uuid;
		let doitType  	= isEmpty(promotionId) ? label.regular : label.promotion;
		let bizName 	= isEmpty(promotionId) ? '' : separator + detail.company_name;
		let promoTitle 	= isEmpty(promotionId) ? '' : separator + detail.promotion_title;
		let doitInfo 	= doitType + bizName + promoTitle;
		let balance		= isEmpty(detail.remain_budget_ucd) ? label.nullValue : detail.remain_budget_ucd;
		let dayofweek   = isEmpty(detail.action_dayofweek) ? label.nullValue : detail.action_dayofweek;
		let minUser 	= Number(detail.min_user);
		let maxUser 	= Number(detail.max_user);
		let recruitCount = maxUser === 1 ? maxUser : minUser+label.tilde+maxUser;
		let personReward = Number(detail.person_reward);
		let groupReward = Number(detail.group_reward);
		let totalReward =  personReward + groupReward;

		rewardDom += '<p class="detail-data">'+doitInfo+'</p>';
		rewardDom += '<div class="col-2-1" style="margin-top: 20px;">';
		rewardDom += 	'<p class="sub-title"><i class="far fa-check-square" style="color:#007aff; "></i> 리워드 조건</p>';
		rewardDom += 	'<div class="detail-data-wrap clearfix">';
		rewardDom += 		'<p class="sub-tit">두잇 참여 인원</p>';
		rewardDom += 		'<p class="detail-data">'+recruitCount+'명</p>';
		rewardDom += 	'</div>';
		rewardDom += 	'<div class="detail-data-wrap clearfix">';
		rewardDom += 		'<p class="sub-tit">인증기간</p>';
		rewardDom += 		'<p class="detail-data">'+detail.action_duration+'일</p>';
		rewardDom += 	'</div>';
		rewardDom += 	'<div class="detail-data-wrap clearfix">';
		rewardDom += 		'<p class="sub-tit">주간빈도</p>';
		rewardDom += 		'<p class="detail-data">'+dayofweek+'</p>';
		rewardDom += 	'</div>';
		rewardDom += 	'<div class="detail-data-wrap clearfix">';
		rewardDom += 		'<p class="sub-tit">일일 인증 횟수</p>';
		rewardDom += 		'<p class="detail-data">'+detail.action_daily_allow+'회</p>';
		rewardDom += 	'</div>';
		rewardDom += 	'<div class="detail-data-wrap clearfix">';
		rewardDom += 		'<p class="sub-tit">목표달성률</p>';
		rewardDom += 		'<p class="detail-data">'+Math.floor(detail.goal_percent)+'%</p>';
		rewardDom += 	'</div>';
		rewardDom += 	'<div class="detail-data-wrap clearfix">';
		rewardDom += 		'<p class="sub-tit">1인 지급 최대 UCD</p>';
		rewardDom += 		'<p class="detail-data">';
		rewardDom += 			numberWithCommas(totalReward)+' UCD ';
		rewardDom += 			'(개인: '+numberWithCommas(personReward)+' UCD / ';
		rewardDom += 			'단체: '+numberWithCommas(groupReward)+' UCD)';
		rewardDom += 		'</p>';
		rewardDom += 	'</div>';
		if (!isEmpty(detail.promotion_uuid))
		{
			rewardDom += 	'<p class="sub-title" style="margin-top: 40px;">'
			rewardDom += 		'<i class="fas fa-coins" style="color:#007aff; "></i> 남은 예산';
			rewardDom += 	'</p>';
			rewardDom += 	'<div class="fixed">';
			rewardDom += 		'<p class="cap">';
			rewardDom += 			'남은 UCD는 ';
			rewardDom += 			'<span style="font-size: 19px; font-weight: 600; color: #007aff;">'+numberWithCommas(balance)+'UCD</span> 입니다.';
			rewardDom += 		'</p>';
			rewardDom += 	'</div>';
		}
		rewardDom += '</div>';
		reward.html(rewardDom);

		creator.html(detail.doit_permission);

		let desc = isEmpty(detail.doit_description) ? label.nullValue : detail.doit_description;
		doitDesc.html(desc);

		let tags = detail.doit_tags;
		let tagDom = '';
		for (let i=0; i<tags.length; i++)
		{
			if (!isEmpty(tags[i]))
			{
				tagDom += '<li>';
				tagDom += 	'<span class="tag-name">'+tags[i]+'</span>';
				tagDom += '</li>';
			}
		}
		doitTags.html(tagDom);

		let introType = detail.intro_resouce_type;
		let introImg = introType === 'video' ? detail.doit_video_thumbnail_image_url : detail.doit_image_url;
		let introImageDom = label.nullValue;
		if (!isEmpty(introImg))
		{
			introImageDom = '<div class="file">';
			introImageDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
			introImageDom += 	'<img class="detail-img main-banner" src="'+introImg+'" onerror="onErrorImage(this);" alt="썸네일 이미지입니다.">';
			introImageDom += '</div>';

			if (introType === 'video')
			{
				if(!isEmpty(detail.doit_video_url))
				{
					introImageDom += '<div class="file">';
					introImageDom += 	'<p class="cap">영상</p>';
					introImageDom += 	'<video poster="" controls onerror="onErrorImage(this);">';
					introImageDom += 		'<source src="'+detail.doit_video_url+'" onerror="onErrorVideo();">';
					introImageDom += 	'</video>';
					introImageDom += '</div>';
				}
			}
		}
		introWrap.html(introImageDom);

		let xtraReward = isEmpty(detail.group_reward_description) ? label.nullValue : detail.group_reward_description;
		extraReward.html(xtraReward);

		actionTime.html(detail.action_allow_start_time+label.tilde+detail.action_allow_end_time);

		let optionDom = label.nullValue;
		if (!isEmpty(detail.private_code))
		{
			optionDom = '<p class="detail-data">참여자 제한 </p>';
			optionDom += '<p class="detail-data">참가자 코드 : '+detail.private_code+'</p>';
		}
		options.html(optionDom);

		actionType.html(getStringValueForActionType(detail.action_resource_type));

		actionResource.html(buildActionResource(detail));

		actionDesc.html(detail.action_description);

		removeModifyBtn(detail);
	}

	function removeModifyBtn(detail)
	{
		if (isEmpty(detail.promotion_uuid) || detail.doit_status !== '모집중')
			goUpdate.remove();
	}

	function getStringValueForActionType(param)
	{
		if (param === 'image')
			return label.image;
		else if (param === 'video')
			return label.video;
		else if (param === 'voice')
			return label.voice;
	}

	function buildActionResource(data)
	{
		let type = data.action_resource_type;
		let actionResourceDom = '';

		if (type === 'image')
		{
			let imageUrl = data.example_image_url;
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
			actionResourceDom += 	'<img class="detail-img main-banner" src="'+imageUrl+'" alt="썸네일 이미지입니다." onerror="onErrorImage(this);">';
			actionResourceDom += '</div>';
		}
		else if (type === 'video')
		{
			let imageUrl = data.example_video_image_url;
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
			actionResourceDom += 	'<img class="detail-img main-banner" src="'+imageUrl+'" alt="썸네일 이미지입니다." onerror="onErrorImage(this);">';
			actionResourceDom += '</div>';
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">영상</p>';
			actionResourceDom += 	'<video poster="'+imageUrl+'" controls onerror="onErrorImage(this)">';
			actionResourceDom += 		'<source src="'+data.example_video_url+'" onerror="onErrorExamVideo();">';
			actionResourceDom += 	'</video>';
			actionResourceDom += '</div>';
		}
		else if (type === 'voice')
		{
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">음성</p>';
			actionResourceDom += 	'<audio controls>';
			actionResourceDom += 		'<source src="'+data.example_voice_url+'" onerror="onErrorExamAudio();">';
			actionResourceDom += 	'</audio>';
			actionResourceDom += '</div>';
		}

		return actionResourceDom;
	}

	/****************
	 * 참여자정보탭 관련
	 * **************/
	function initSearchForm()
	{
		keyword.val('');
	}

	function getJoinMemberTotal()
	{
		let param   = JSON.stringify({"doit_uuid" : g_doitUuid});
		let url 	= api.totalJoinMember;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, param, getJoinMemberTotalCallback, errMsg, false);
	}

	function getJoinMemberTotalCallback(data)
	{
		isSuccessResp(data) ? setJoinMemberTotal(data) : sweetError(invalidResp(data));
	}

	function setJoinMemberTotal(data)
	{
		let detail = data.data;

		joinCount.html(numberWithCommas(detail.member_cnt));
		goal.html(Math.floor(detail.goal_percent));
		avg.html(Math.floor(detail.avg_percent));
		forecast.html(numberWithCommas(detail.total_reward));
		saving.html(numberWithCommas(detail.save_reward));
	}

	function getJoinMember()
	{
		joinUserTable.DataTable({
			ajax : {
				url: api.listJoinMember,
				type:"POST",
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임", 			data: "nickname",    	width: "20%",   className: "cursor-default" }
				,{title: "프로필ID", 		data: "profile_uuid",   width: "25%",   className: "cursor-default" }
				,{title: "총 인증 횟수", 		data: "todo",    		width: "8%",    className: "cursor-default" }
				,{title: "인증한 횟수", 		data: "total",    		width: "8%",    className: "cursor-default" }
				,{title: "성공", 	  		data: "success",    	width: "5%",    className: "cursor-default" }
				,{title: "실패",  	  		data: "fail",   		width: "5%",    className: "cursor-default" }
				,{title: "신고",  	  		data: "report",   		width: "5%",    className: "cursor-default" }
				,{title: "옐로카드",    		data: "yellow",   		width: "5%",    className: "cursor-default" }
				,{title: "레드카드",    		data: "red",   			width: "5%",    className: "cursor-default" }
				,{title: "평균달성률(%)", 	data: "avg_percent",    width: "8%",    className: "cursor-default",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "적립리워드(UCD)",  	data: "total_reward",   width: "8%",    className: "cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForUser.val()),
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
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"doit_uuid" : g_doitUuid
			,"nickname": keyword.val()
		}

		return JSON.stringify(param);
	}

	/** 엑셀 다운로드 **/
	/*function onClickExcelBtn()
	{
		getExcelData();
	}

	function getExcelData()
	{
		$.ajax({
			url: api.involveDoitPromotion,
			type: "POST",
			dataType: 'json',
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("개설두잇목록", "개설두잇목록", data.data);
			},
			error: function (request, status) {
				alert(label.download+message.ajaxError);
			}
		});
	}

	function excelParams()
	{
		let param = {
			"limit" : 10000
			,"page" : 1
			,"promotion_idx" : idx
		}

		return JSON.stringify(param);
	}*/

	/****************
	 * 인증정보탭 관련
	 * **************/
	function initPageLengthForActions()
	{
		let options = '';
		options += '<option value="12">12개씩 보기</ooption>';
		options += '<option selected value="30">30개씩 보기</ooption>';
		options += '<option value="60">60개씩 보기</ooption>';
		options += '<option value="120">120개씩 보기</ooption>';

		selPageLengthForAction.html(options);

		onChangeSelectOption(selPageLengthForAction);
	}

	/** 인증상세 모달 **/
	function onClinkActionImage(obj)
	{
		modalDetailFadein();
		buildDetailModal(obj);
	}

	function modalDetailFadein()
	{
		modalDetailAction.fadeIn();
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
			exampleDom += 		'<source src="'+exampleUrl+'" onerror="onErrorExamVideo();">';
			exampleDom += 	'</video>';
		}
		else if (type === 'voice')
		{
			className = 'audio-contents';

			actionDom += 	'<img style="width:100%;" src="'+label.voiceImage+'" alt="" onerror="onErrorImage(this);">';
			actionDom += 	'<audio controls>';
			actionDom += 		'<source src="'+actionUrl+'" onerror="onErrorActionAudio();">';
			actionDom += 	'</audio>';

			exampleDom += 	'<img style="width:100%;" src="'+label.voiceImage+'" alt="" onerror="onErrorImage(this);">';
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
				warnDom += 		'<button onclick="cancelWarn(this);" data-type="R" data-uuid="'+uuid+'" class="card-btn clear-red-btn">레드카드 취소</button>';
				warnDom += '</div>';
			}
			if (yellow === 'Y')
			{
				warnDom += '<div class="card-wrap">';
				warnDom += 	    '<img src="'+label.yellowCardImage+'" alt="옐로우카드">';
				warnDom += 			'<span>'+yellowDesc+'</span>';
				warnDom += 		'<button onclick="cancelWarn(this);" data-type="Y" data-uuid="'+uuid+'" class="card-btn clear-yellow-btn">옐로카드 취소</button>';
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

	let cancelApi;
	let cancelId;
	function cancelWarn(obj)
	{
		cancelApi = $(obj).data('type') === 'Y' ? api.cancelYellow : api.cancelRed;
		cancelId  = $(obj).data('uuid');
		sweetConfirm('경고장 발송을 '+message.cancel, cancelRequest);
	}

	/** 경고장 취소 **/
	function cancelRequest()
	{
		let param   = JSON.stringify({"action_uuid" : cancelId});
		let url 	= cancelApi;
		let errMsg 	= label.cancel+message.ajaxError;

		ajaxRequestWithJsonData(false, url, param, cancelReqCallback, errMsg, false);
	}

	function cancelReqCallback(data)
	{
		sweetToastAndCallback(data, cancelSuccess);
	}

	function cancelSuccess()
	{
		modalFadeout();
		getInvolveAction();
	}

	/** 경고장 발송 **/
	function onClickBtnWarn()
	{
		if (isCheckedTarget())
			modalWarnFadein();
	}

	function isCheckedTarget()
	{
		let checkedElement = $("input[name=chk-warn]:checked");

		if (checkedElement.length === 0)
		{
			sweetToast('발송 대상을 '+message.select);
			return false;
		}

		let hasYellowCount = 0;
		checkedElement.each(function () {
			if ($(this).hasClass('yellow-card'))
				hasYellowCount++;
		});
		if (g_warn_type === 'Y' && hasYellowCount > 0)
		{
			sweetToast('선택한 발송 대상에 '+message.alreadyHasYellow);
			return false;
		}

		return true;
	}

	function modalWarnFadein()
	{
		modalLayout.fadeIn();
		modalWarn.fadeIn();
		overflowHidden();
		initModalWarn();
	}

	function initModalWarn()
	{
		causeBy.children().eq(0).prop("selected", true);
		onChangeSelectOption(causeBy);
	}

	function onSubmitWarn()
	{
		sweetConfirm('경고장을 '+message.send, sendRequest);
	}

	function sendRequest()
	{
		let url  = g_warn_type === 'Y' ? api.setYellow : api.setRed;
		let errMsg 	= '리워드 '+label.list+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, warnParams(), sendReqCallback, errMsg, false);
	}

	function warnParams()
	{
		let uuids = [];
		let chkedElement = $("input[name=chk-warn]:checked");
		chkedElement.each(function () { uuids.push($(this).val()); });

		let param = {
			"action_list" : uuids
			,"description" : causeBy.val()
		}

		return JSON.stringify(param);
	}

	function sendReqCallback(data)
	{
		sweetToastAndCallback(data, sendSuccess);
	}

	function sendSuccess()
	{
		modalFadeout();
		getInvolveAction();
	}

	function onChangePageLengthForAction()
	{
		currentPage = 1;
		getInvolveAction();
	}

	/** 인증 목록 **/
	function getInvolveAction()
	{
		let url 	= api.listAction;
		let errMsg 	= '인증 '+label.list+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, actionParams(), getInvolveActionCallback, errMsg, false);
	}

	function actionParams()
	{
		let param = {
			"page" : currentPage
			,"limit" : selPageLengthForAction.val()
			,"search_type" : "doit_uuid"
			,"keyword" : g_doitUuid
		}

		return JSON.stringify(param);
	}

	function getInvolveActionCallback(data)
	{
		isSuccessResp(data) ? involveActionSuccess(data) : sweetError(invalidResp(data));
	}

	function involveActionSuccess(data)
	{
		buildActions(data);
		buildActionsPagination(data);
	}

	function buildActions(data)
	{
		let actions    = data.data;
		let dataLen    = actions.length;
		let totalCount = data.recordsTotal
		let actionDom  = '<p class="empty-message">인증 정보가 없습니다.</p>';

		/** total count **/
		actionTotalCount.html(totalCount);

		if (totalCount > 0)
		{
			actionTopDom.show();
			pagination.show();

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
				actionImageDom += 'onerror="'+onErrorImage(this)+'" ';
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

				if (i===0 || i%6 === 0)
					actionDom += '<ul class="cert-contents clearfix">';

				let disableChkBox = action.red_card === 'Y' ? 'disabled' : '';
				actionDom += '<li>';
				actionDom += 	'<div class="top clearfix">';
				actionDom += 		'<div class="checkbox-wrap">';
				actionDom += 			'<input type="checkbox" class="'+className+'" id="'+actionId+'" name="chk-warn" value="'+action.action_uuid+'" '+disableChkBox+'/>';
				actionDom += 			'<label for="'+actionId+'"><span></span></label>';
				actionDom += 		'</div>';
				actionDom += 		'<span class="success-text">'+successYn+'</span>';
				actionDom += 		'<i class="warning-icon fas fa-exclamation-triangle">';
				actionDom +=        '<span>신고 : <span class="cert-data-num">'+action.report_count+'</span></span></i>';
				actionDom += 	'</div>';
				actionDom += 	'<div class="thumbnail-wrap">';
				actionDom += 		actionImageDom;
				actionDom += 	'</div>';
				actionDom += 	'<div class="text-wrap">';
				actionDom += 		'<span>'+action.user_name+'</span>';
				actionDom += 		'<p class="date">'+action.action_datetime+'</p>';
				actionDom += 		'<i>'+warnImageDom+'</i>';
				actionDom += 	'</div>';
				actionDom += '</li>';

				if (i>0 && (i+1)%6 === 0)
					actionDom += '</ul>';
			}
		}
		else
		{
			actionTopDom.hide();
			pagination.hide();
		}

		actionWrap.html(actionDom);
	}

	let currentPage = 1;
	function buildActionsPagination(data)
	{
		let totalCount  = data.recordsTotal;
		let last		= Math.ceil(totalCount / selPageLengthForAction.val());
		let pageLength  = 6;
		if (last <= 10)
			pageLength = last
		let i;

		let pageDom = '';
		if (currentPage === 1)
			pageDom += '<a class="paginate_button previous disabled" id="dataTable_previous">';
		else
			pageDom += '<a onclick="onClickPageNum(this)" class="paginate_button previous" data-page="'+(currentPage-1)+'" id="dataTable_previous">';
		pageDom +=     label.previous;
		pageDom += '</a>';
		pageDom += '<span>';
		if (last <= 10)
		{
			for (i=1; i<=pageLength; i++)
			{
				if (last > 1 && currentPage === i)
					pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+i+'">'+i+'</a>';
				else
					pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
			}
		}
		else
		{
			if (currentPage < 5)
			{
				for (i=1; i<=pageLength; i++)
				{
					if (last > 1 && currentPage === i)
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
			else if (currentPage >= 5 && currentPage <= last - 4)
			{
				for (i=1; i<=last; i++)
				{
					if (i === 1)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
						pageDom += '<span class="ellipsis">…</span>';
					}

					if (currentPage === i)
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
			else if (currentPage > last - 4)
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
						if (currentPage === last-(pageLength-i))
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+(last-(pageLength-i))+'">'+(last-(pageLength-i))+'</a>';
						else
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+(last-(pageLength-i))+'">'+(last-(pageLength-i))+'</a>';
					}
				}
			}
		}
		pageDom += '</span>';
		if (last === currentPage)
			pageDom += '<a class="paginate_button next disabled" id="dataTable_next">';
		else
			pageDom += '<a onclick="onClickPageNum(this)" class="paginate_button next" data-page="'+(currentPage+1)+'" id="dataTable_next">';
		pageDom += 	  label.next;
		pageDom += '</a>';

		pagination.html(pageDom);
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		currentPage = $(obj).data('page');

		getInvolveAction();
	}

	/****************
	 * 리뷰정보탭 관련
	 * **************/
	function getInvolveReview()
	{
		reviewTable.DataTable({
			ajax : {
				url: api.listReview,
				type: "POST",
				headers: headers,
				data: function (d) {
					return reviewParams(d);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: tableCheckAllDom(), 	data: "review_uuid",   width: "5%",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				},
				{title: "리뷰내용", 		data: "review_text",	width: "30%",   className: "cursor-default",
					render: function (data, type, row, meta) {
						return buildReviewDetail(row);
					}
				}
				,{title: "평점", 		data: "rating",    		width: "10%",   className: "cursor-default",
					render: function (data) {
						return buildStar(data);
					}
				}
				,{title: "신고", 		data: "report_count",   width: "10%",   className: "cursor-default" }
				,{title: "블라인드 여부", data: "is_blind",    	width: "10%",   className: "cursor-default",
					render: function (data) {
						return data === 'Y' ? label.blind : label.unblind;
					}
				}
				,{title: "작성날짜", 	data: "created",    	width: "15%",   className: "cursor-default",
				 	render: function (data) {
						return data.substring(0, 10)
					}
				 }
				,{title: "작성자", 		data: "nickname",    	width: "15%",   className: "cursor-default" }
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForReview.val()),
			/*pagingType: "simple_numbers_no_ellipses",*/
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
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				$(this).on( 'page.dt', function () {
					$("#checkAll").prop('checked', false);
				});
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildStar(rating)
	{
		let starEl = '<ol class="star-wrap" style="float: inherit;">';
		for (let i=0; i<5; i++)
			starEl += i < Number(rating) ? '<li class="on"><i class="fas fa-star" style="cursor:default;"></i></li>' : '<li><i class="fas fa-star" style="cursor:default;"></i></li>';
		starEl += '</ol>';

		return starEl;
	}

	function reviewParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"from_date" : ""
			,"to_date" : ""
			,"search_type" : "doit_uuid"
			,"keyword" : g_doitUuid
			,"rating_list" : [1,2,3,4,5]
			,"is_report" : "ALL"
			,"is_blind" : "ALL"
		}

		return JSON.stringify(param);
	}

	function buildReviewDetail(data)
	{
		let innerEl = '<a onclick="modalDetailReviewFadein(this);" ';
		innerEl +=	'class="line-clamp more-info-btn"';
		innerEl +=	'data-detail="'+data.review_text+'"';
		innerEl +=	'data-title="'+data.doit_title+'"';
		innerEl +=	'data-rating="'+data.rating+'"';
		innerEl +=	'data-report="'+data.report_count+'"';
		innerEl +=	'data-nickname="'+data.nickname+'"';
		innerEl +=	'data-blind="'+data.is_blind+'"';
		innerEl +=	'data-created="'+data.created+'"';
		innerEl +=	'>';
		innerEl += data.review_text;
		innerEl += '</a>';

		return innerEl;
	}

	function modalDetailReviewFadein(obj)
	{
		modalLayout.fadeIn();
		modalDetailReview.fadeIn();
		overflowHidden();
		initModalDetailReview(obj);
	}

	function initModalDetailReview(obj)
	{
		let detail = $(obj).data('detail');
		let title = $(obj).data('title');
		let rating = $(obj).data('rating');
		let report = $(obj).data('report');
		let nickname = $(obj).data('nickname');
		let created = $(obj).data('created');
		let blind = $(obj).data('blind');

		modalReviewContent.html(detail);
		modalReviewTitle.html(title);
		modalReviewStarWrap.find('li').each(function (index) {
			index < rating ? $(this).addClass('on') : $(this).removeClass('on');
		});
		/*modalReviewRating.html(rating);*/
		modalReviewReport.html(report);
		modalReviewUser.html(nickname);
		modalReviewCreated.html(created.substring(0, 10));
		modalReviewBlind.html(blind);
	}

	function onClickUpdateBlind()
	{
		if (blindValidation())
			sweetConfirm('상태를 '+message.change, updateBlind);
	}

	function updateBlind()
	{
		let url 	= api.updateBlind;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, blindParams(), updateBlindCallback, errMsg, false);
	}

	function blindParams()
	{
		let table 		 = reviewTable.DataTable();
		let selectedData = table.rows('.selected').data();
		let reviews = [];
		for (let i=0; i<selectedData.length; i++)
			reviews.push(selectedData[i].review_uuid);

		let param = {
			"reviews" : reviews
			,"is_blind" : g_blind_type
		};

		return JSON.stringify(param)
	}

	function updateBlindCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		tableReloadAndStayCurrentPage(reviewTable);
	}

	function blindValidation()
	{
		let table 		 = reviewTable.DataTable();
		let selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			sweetToast('대상을 목록에서 '+message.select);
			return false;
		}

		return true;
	}

	/**
	 * UCD정보탭관련
	 * **/
	function getUcdLog()
	{
		ucdTable.DataTable({
			ajax : {
				url: api.listDoitUcd,
				type: "POST",
				headers: headers,
				data: function (d) {
					return ucdTableParams(d);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분", data: "division",   		width: "10%",     className: "cursor-default" }
				,{title: "금액", data: "amount",   		width: "15%",     className: "cursor-default",
					render: function (data, type, row, meta) {
						return numberWithCommas(data)+'(ⓒ'+numberWithCommas(row.cash)+' / ⓟ'+numberWithCommas(row.point)+')';
					}
				}
				,{title: "제목", data: "title",  		width: "15%",     className: "cursor-default" }
				,{title: "내용", data: "description",   	width: "25%",     className: "cursor-default" }
				,{title: "일시", data: "created",   		width: "15%",     className: "cursor-default" }
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForUcd.val()),
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
				setUcdRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function ucdTableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"doit_uuid" : g_doitUuid
		}

		return JSON.stringify(param);
	}

	function setUcdRowAttributes(nRow, aData)
	{
		if (isNegative(aData.amount))
			$(nRow).addClass('minus-pay');
	}

	/** 수정페이지 이동 **/
	function goUpdatePage()
	{
		location.href = page.updateDoit+idx;
	}


