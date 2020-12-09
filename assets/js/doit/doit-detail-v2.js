
	const ulTab 		= $("#ulTab");
	const tabContent	= $(".tab-content");
	const goUpdate      = $("#goUpdate");

	/** 두잇정보 탭 **/
	/*const category 		= $("#category");
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
	const allowGallery  = $("#allowGallery");*/

	/** 참여자정보 탭 **/
	const search 		= $(".search");
	const reset 		= $(".reset");
	const keyword		= $("#keyword")
	const joinCount 	= $("#joinCount");
	const goal 			= $("#goal");
	const avg 			= $("#avg");
	const forecast 		= $("#forecast");
	const saving 		= $("#saving");
	const joinUserTable		= $("#joinUserTable")
	const selPageLengthForUser   = $("#selPageLengthForUser");
	const btnXlsxOutForUser   = $("#btnXlsxOutForUser");

	/** 인증정보 탭 **/
	const btnWarnRed	= $("#btnWarnRed");
	const btnWarnYellow	= $("#btnWarnYellow");
	const btnReport		= $("#btnReport");
	const actionWrap	= $("#actionWrap");
	const actionTopDom	= $("#actionTopDom");
	const pagination	= $("#dataTable_paginate");
	const actionTotalCount		 = $("#actionTotalCount");
	const selPageLengthForAction = $("#selPageLengthForAction");
	/** 경고장 발송 modal **/
	const modalWarnTitle	= $("#modalWarnTitle");
	const modalWarn			= $("#modalWarn");
	const causeBy			= $("#selCauseBy");
	const btnSubmitWarn		= $("#btnSubmitWarn");
	/** 상세보기 modal **/
	const modalDetailAction	= $("#modalDetailAction");
	const modalActionDom	= $("#modalActionDom");
	const modalActionDesc	= $("#modalActionDesc");
	const modalExample		= $("#modalExample");
	const modalExampleDesc	= $("#modalExampleDesc");
	const modalDoitTitle	= $("#modalDoitTitle");
	const modalNickname		= $("#modalNickname");
	const modalWarnWrap		= $("#modalWarnWrap");
	let g_warn_type;

	/** 리뷰정보탭 **/
	const reviewTable		= $("#reviewTable");
	const btnBlind			= $("#btnBlind");
	const btnUnBlind		= $("#btnUnBlind");
	const selPageLengthForReview	= $("#selPageLengthForReview");
	const btnXlsxOutForReview   = $("#btnXlsxOutForReview");
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
	const ucdTable		= $("#ucdTable");
	const selPageLengthForUcd	= $("#selPageLengthForUcd");
	const btnXlsxOutForUcd	= $("#btnXlsxOutForUcd");

	/** 두잇톡 탭 **/
	const btnCreateTalk = $("#btnCreateTalk");
	const viewType 		= $("input[name=radio-view-type]");
	const noticeTalk	= $("#noticeTalk");
	const generalTalk	= $("#generalTalk");
	let g_talk_page_num = 1;
	let g_talk_page_size = 1;
	/** 톡 등록 modal **/
	const modalCreateTalk	= $("#modalCreateTalk");
	const btnNotice			= $("#btnNotice");
	const btnGeneral		= $("#btnGeneral");
	const talkContent		= $("#talkContent");
	const btnSubmitTalk		= $("#btnSubmitTalk");
	let g_has_notice = false;
	let g_is_notice;
	/** 톡 목록에서 인증상세 보기 modal **/
	const modalViewActionOnTalk	= $("#modalViewActionOnTalk");
	const viewAction	= $("#viewAction");

	/** modal 공통 **/
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];
	let g_xlsx_type;

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** n개씩보기 셀렉트 박스 초기화 **/
		initPageLength(selPageLengthForUser);
		initPageLength(selPageLengthForReview);
		initPageLength(selPageLengthForUcd);
		initActionPageLength(selPageLengthForAction);
		/** 두잇 상세정보 **/
		getDetail();
		/** 이벤트 **/
		ulTab			.on("click", function (event) { onClickTab(event); });
		goUpdate		.on('click', function () { goUpdatePage(); })
		selPageLengthForUser	.on('change', function () { getJoinMember(); });
		selPageLengthForAction	.on('change', function () { onChangePageLengthForAction(); });
		selPageLengthForReview	.on('change', function () { getInvolveReview(); });
		selPageLengthForUcd		.on('change', function () { getUcdLog(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		search			.on("click", function () { getJoinMember(); });
		reset			.on("click", function () { initSearchForm(); });
		btnWarnYellow	.on('click', function () { g_warn_type = 'Y'; onClickBtnWarn(); });
		btnWarnRed		.on('click', function () { g_warn_type = 'R'; onClickBtnWarn(); });
		btnReport		.on('click', function () { g_warn_type = ''; onClickBtnWarn(); });
		btnSubmitWarn	.on('click', function () { onSubmitWarn(); });
		btnBlind		.on('click', function () { g_blind_type = 'Y'; onClickUpdateBlindReview(); });
		btnUnBlind		.on('click', function () { g_blind_type = 'N'; onClickUpdateBlindReview(); });
		viewType		.on("change", function () { onChangeViewType(); });
		btnNotice		.on('click', function () { onClickBtnTalkType(this) });
		btnGeneral		.on('click', function () { onClickBtnTalkType(this) });
		btnCreateTalk	.on('click', function () { modalCreateTalkOpen() });
		btnSubmitTalk	.on('click', function () { onSubmitTalk() });
		btnXlsxOutForUser		.on("click", function () { g_xlsx_type = 'user'; onClickXlsxOut(); });
		btnXlsxOutForReview		.on("click", function () { g_xlsx_type = 'review'; onClickXlsxOut(); });
		btnXlsxOutForUcd		.on("click", function () { g_xlsx_type = 'ucd'; onClickXlsxOut(); });
	});

	function onClickTab(e)
	{
		let clickedEl = $(e.target);
		let target = $(clickedEl).data('target')

		clickedEl.siblings().removeClass('active');
		clickedEl.addClass('active');
		tabContent.hide();
		$(target).show();

		if (clickedEl.hasClass('doit'))
			getDetail()
		else if (clickedEl.hasClass('user'))
		{
			getJoinMemberTotal();
			getJoinMember();
		}
		else if (clickedEl.hasClass('action'))
		{
			currentPage = 1;
			getInvolveAction();
		}
		else if (clickedEl.hasClass('review'))
			getInvolveReview();
		else if (clickedEl.hasClass('ucd'))
			getUcdLog();
		else if (clickedEl.hasClass('talk'))
		{
			viewType.eq(0).prop('checked', true);
			initTalkPageNum();
			getDoitTalk();
		}
	}

	/****************
	 * 두잇정보탭 관련
	 * **************/
	/*function getDetail()
	{
		let url 	= api.detailDoit;
		let param   = JSON.stringify({"idx" : idx});
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, param, getDetailCallback, errMsg, false);
	}

	let g_doit_uuid;
	let g_doit_status;
	let g_doit_title;
	let g_doit_creator;
	let g_biz_uuid;
	let g_is_created_by_biz;
	function getDetailCallback(data)
	{
		if (isSuccessResp(data))
		{
			let { doit_uuid, doit_status, doit_title, company_profile_uuid, created_profile_uuid } = data.data;
			g_doit_uuid = doit_uuid;
			g_doit_title = doit_title;
			g_doit_status = doit_status;
			g_doit_creator = created_profile_uuid;
			g_biz_uuid = company_profile_uuid;
			g_is_created_by_biz = company_profile_uuid === created_profile_uuid;
			buildDetail(data);
		}
		else
			sweetError(invalidResp(data));
	}

	function buildDetail(data)
	{
		let detail 	 = data.data;

		category.html(detail.doit_category);
		doitTitle.html(detail.doit_title);
		actionDate.html(`${detail.action_start_datetime} ${label.tilde} ${detail.action_end_datetime}`);

		let rewardDom 	= '';
		let separator   = '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'
		let promotionId = detail.promotion_uuid;
		let doitType  	= isEmpty(promotionId) ? label.regular : label.promotion;
		let bizName 	= isEmpty(promotionId) ? '' : separator + detail.company_name;
		let promoTitle 	= isEmpty(promotionId) ? '' : separator + detail.promotion_title;
		let doitInfo 	= doitType + bizName + promoTitle;
		let balance		= isEmpty(detail.remain_budget_ucd) ? label.dash : detail.remain_budget_ucd;
		let dayofweek   = isEmpty(detail.action_dayofweek) ? label.dash : detail.action_dayofweek;
		let minUser 	= Number(detail.min_user);
		let maxUser 	= Number(detail.max_user);
		let recruitCount = maxUser === 1 ? maxUser : `${minUser} ${label.tilde} ${maxUser}`;
		let personReward = Number(detail.person_reward);
		let groupReward = Number(detail.group_reward);
		let totalReward =  personReward + groupReward;

		rewardDom +=
			`<p class="detail-data">${doitInfo}</p>
			<div class="col-2-1" style="margin-top: 20px;">
				<p class="point-cap">리워드 조건</p>
				<div class="detail-data-wrap clearfix">
					<p class="sub-tit">두잇 참여 인원</p>
					<p class="detail-data">${recruitCount}명</p>
				</div>
				<div class="detail-data-wrap clearfix">
					<p class="sub-tit">인증기간</p>
					<p class="detail-data">${detail.action_duration}일</p>
				</div>
				<div class="detail-data-wrap clearfix">
					<p class="sub-tit">주간빈도</p>
					<p class="detail-data">${dayofweek}</p>
				</div>
				<div class="detail-data-wrap clearfix">
					<p class="sub-tit">일일 인증 횟수</p>
					<p class="detail-data">${detail.action_daily_allow}회</p>
				</div>
				<div class="detail-data-wrap clearfix">
					<p class="sub-tit">목표달성률</p>
					<p class="detail-data">${Math.floor(detail.goal_percent)}%</p>
				</div>
				<div class="detail-data-wrap clearfix">
					<p class="sub-tit">1인 지급 최대 UCD</p>
					<p class="detail-data">${numberWithCommas(totalReward)} UCD (개인: ${numberWithCommas(personReward)} UCD / 단체: ${numberWithCommas(groupReward)} UCD)</p>
				</div>`
		if (!isEmpty(detail.promotion_uuid))
		{
			rewardDom +=
				`<p class="point-cap" style="margin-top: 40px;">남은 예산</p>
				 <div class="fixed">
				 	<p class="detail-data">남은 UCD는 
						<span style="font-size: 19px; font-weight: 600; color: #007aff;">${numberWithCommas(balance)} UCD</span> 입니다.
					</p>
				 </div>`
		}
		rewardDom +=
			`</div>`
		reward.html(rewardDom);

		creator.html(detail.doit_permission);

		let desc = isEmpty(detail.doit_description) ? label.dash : detail.doit_description;
		doitDesc.html(replaceDoubleQuotes(desc));

		let tags = detail.doit_tags;
		let tagDom = '';
		for (let i=0; i<tags.length; i++)
		{
			if (!isEmpty(tags[i]))
				tagDom += `<li><span class="tag-name">${tags[i]}</span></li>`
		}
		doitTags.html(tagDom);

		let introType = detail.intro_resouce_type;
		let introImg = introType === 'video' ? detail.doit_video_thumbnail_image_url : detail.doit_image_url;
		let introImageDom = label.dash;
		if (!isEmpty(introImg))
		{
			introImageDom =
				`<div class="file">
					<img class="detail-img main-banner" src="${introImg}" onerror="onErrorImage(this);" alt="썸네일 이미지입니다.">
				</div>`

			if (introType === 'video')
			{
				if(!isEmpty(detail.doit_video_url))
				{
					introImageDom +=
						`<div class="file">
							<p class="cap">영상</p>
							<video poster="" controls onerror="onErrorImage(this);">
								<source src="${detail.doit_video_url}" onerror="onErrorVideo();">
							</video>
						</div>`
				}
			}
		}
		introWrap.html(introImageDom);

		let xtraReward = isEmpty(detail.group_reward_description) ? label.dash : detail.group_reward_description;
		extraReward.html(xtraReward);

		actionTime.html(`${detail.action_allow_start_time} ${label.tilde} ${detail.action_allow_end_time}`);

		let optionDom = '';
		if (!isEmpty(detail.private_code))
		{
			let privateType = detail.doit_private_type === 'Y' ? '비공개' : '공개';
			optionDom =
				`<p class="detail-data">비밀 두잇 </p>
				 <p class="detail-data">참여 코드 : ${detail.private_code}</p>
				 <p class="detail-data">참여자 리스트/두잇톡/인증 ${privateType}</p>`
		}
		else
		{
			optionDom = `<p class="detail-data">공개 두잇 </p>`
		}
		options.html(optionDom);

		actionType.html(getStringValueForActionType(detail.action_resource_type));

		actionResource.html(buildActionResource(detail));

		actionDesc.html(replaceDoubleQuotes(detail.action_description));

		allowGallery.html(detail.allow_gallery_image);

		removeModifyBtn(detail);
	}

	function removeModifyBtn(detail)
	{
		if (isEmpty(detail.promotion_uuid) || g_doit_status !== '모집중')
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
			actionResourceDom +=
				`<div class="file">
					<img class="detail-img main-banner" src="${imageUrl}" alt="썸네일 이미지입니다." onerror="onErrorImage(this);">
				</div>`
		}
		else if (type === 'video')
		{
			let imageUrl = data.example_video_image_url;
			actionResourceDom +=
				`<div class="file">
					<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>
					<img class="detail-img main-banner" src="${imageUrl}" alt="썸네일 이미지입니다." onerror="onErrorImage(this);">
				</div>
				<div class="file">
					<p class="cap">영상</p>
					<video poster="${imageUrl}" controls onerror="onErrorImage(this)">
						<source src="${data.example_video_url}" onerror="onErrorExamVideo();">
					</video>
				</div>`
		}
		else if (type === 'voice')
		{
			actionResourceDom +=
				`<div class="file">
					<p class="cap">음성</p>
					<audio controls>
						<source src="${data.example_voice_url}" onerror="onErrorExamAudio();">
					</audio>
				</div>`
		}

		return actionResourceDom;
	}*/

	/****************
	 * 참여자정보탭 관련
	 * **************/
	function initSearchForm()
	{
		keyword.val('');
	}

	function getJoinMemberTotal()
	{
		let url 	= api.totalJoinMember;
		let param   = JSON.stringify({"doit_uuid" : g_doit_uuid});
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
				{title: "닉네임", 			data: "nickname",    	width: "20%" }
				,{title: "프로필ID", 		data: "profile_uuid",   width: "25%" }
				,{title: "총 인증 횟수", 		data: "todo",    		width: "8%" }
				,{title: "인증한 횟수", 		data: "total",    		width: "8%" }
				,{title: "성공", 	  		data: "success",    	width: "5%" }
				,{title: "실패",  	  		data: "fail",   		width: "5%" }
				,{title: "신고",  	  		data: "report",   		width: "5%" }
				,{title: "옐로카드",    		data: "yellow",   		width: "5%" }
				,{title: "레드카드",    		data: "red",   			width: "5%" }
				,{title: "평균달성률(%)", 	data: "avg_percent",    width: "8%",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "적립리워드(UCD)",  	data: "total_reward",   width: "8%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForUser.val()),
			select: false,
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
			,"doit_uuid" : g_doit_uuid
			,"nickname": keyword.val()
		}

		return JSON.stringify(param);
	}

	/****************
	 * 인증정보탭 관련
	 * **************/

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
		let actionDesc 	= $(obj).data('desc');
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

			actionDom += `<img src="${actionUrl}" alt="인증이미지" onerror="onErrorImage(this);">`;

			exampleDom += `<img src="${exampleUrl}" alt="예시이미지" onerror="onErrorImage(this);">`;
		}
		else if (type === 'video')
		{
			className = 'video-contents';

			actionDom +=
				`<video poster="${coverUrl}" controls onerror="onErrorImage(this);">
					<source src="${actionUrl}" onerror="onErrorActionVideo();">
				</video>`

			exampleDom +=
				`<video controls>
					<source src="${exampleUrl}" onerror="onErrorExamVideo();">
				</video>`
		}
		else if (type === 'voice')
		{
			className = 'audio-contents';

			actionDom +=
				`<img style="width:100%;" src="${label.voiceImage}" alt="" onerror="onErrorImage(this);">
				<audio controls>
					<source src="${actionUrl}" onerror="onErrorActionAudio();">
				</audio>`

			exampleDom +=
				`<img style="width:100%;" src="${label.voiceImage}" alt="" onerror="onErrorImage(this);">
				<audio controls>
					<source src="${exampleUrl}" onerror="onErrorExamAudio();">
				</audio>`
		}

		/** 인증게시물 **/
		modalActionDom.attr('class', className);
		modalActionDom.html(actionDom);
		modalActionDesc.html(actionDesc);

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
				warnDom +=
					`<div class="card-wrap">
						<img src="${label.redCardImage}" alt="레드카드">
						<span>${redDesc}</span>
						<button onclick="cancelWarn(this);" data-type="R" data-uuid="${uuid}" class="card-btn clear-red-btn">레드카드 취소</button>
					</div>`
			}
			if (yellow === 'Y')
			{
				warnDom +=
					`<div class="card-wrap">
						<img src="${label.yellowCardImage}" alt="옐로우카드">
						<span>${yellowDesc}</span>
						<button onclick="cancelWarn(this);" data-type="Y" data-uuid="${uuid}" class="card-btn clear-yellow-btn">옐로카드 취소</button>
					</div>`
			}
		}
		else	warnDom += `<p class="data-contents">발송 된 경고장이 없습니다.</p>`
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
		let url 	= cancelApi;
		let param   = JSON.stringify({"action_uuid" : cancelId});
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
			if ($(this).data('is-yellow') === 'Y')
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
		let title = isEmpty(g_warn_type) ? '신고 발송' : '경고장 발송';
		modalWarnTitle.html(title);
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
		let prefixTxt = isEmpty(g_warn_type) ? '신고를' : '경고장을';
		sweetConfirm(`${prefixTxt} ${message.send}`, sendRequest);
	}

	function sendRequest()
	{
		let url;
		if (g_warn_type === 'Y')  url = api.setYellow
		else if (g_warn_type === 'R') url = api.setRed;
		else url = api.setReport;
		let errMsg = label.submit+message.ajaxError;

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

		ajaxRequestWithJsonData(true, url, actionParams(), getInvolveActionCallback, errMsg, false);
	}

	function actionParams()
	{
		let param = {
			"page" : currentPage
			,"limit" : selPageLengthForAction.val()
			,"search_type" : "doit_uuid"
			,"keyword" : g_doit_uuid
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
		let totalCount = data.recordsTotal;
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
				let actionId  = `action_${i}`;
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
						onerror="onErrorImage(this);"
						data-type="${action.resource_type}"
						data-uuid="${action.action_uuid}"
						data-url="${action.url}"
						data-desc="${action.description}"
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

				if (action.yellow_card === 'Y')
					warnImageDom = `<img src="${label.yellowCardImage}" alt="">`;
				else if (action.red_card === 'Y')
					warnImageDom = `<img src="${label.redCardImage}" alt="">`;

				if (action.yellow_card === 'Y' && action.red_card === 'Y')
					warnImageDom = `<img src="${label.redYellowCardImage}" alt="">`;

				if (i===0 || i%6 === 0)
					actionDom += '<ul class="cert-contents clearfix">';

				let disableChkBox = action.red_card === 'Y' ? 'disabled' : '';

				actionDom +=
					`<li>
						<div class="top clearfix">
							<div class="checkbox-wrap">
								<input type="checkbox" data-is-yellow="${action.yellow_card}" id="${actionId}" name="chk-warn" value="${action.action_uuid}" ${disableChkBox}/>
								<label for="${actionId}"><span></span></label>
							</div>
							<span class="success-text">${successYn}</span>
							<i class="warning-icon fas fa-exclamation-triangle">
							<span>신고 : <span class="cert-data-num">${action.report_count}</span></span></i>
						</div>
						<div class="thumbnail-wrap">
							${actionImageDom}
						</div>
						<div class="text-wrap">
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
		let lastPage	= Math.ceil(totalCount / selPageLengthForAction.val());

		pagination.html(paginate(currentPage, lastPage));
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
				{title: "리뷰내용", 		data: "review_text",	width: "30%",
					render: function (data, type, row, meta) {
						return buildReviewDetail(row);
					}
				}
				,{title: "평점", 		data: "rating",    		width: "10%",
					render: function (data) {
						return buildStar(data);
					}
				}
				,{title: "신고", 		data: "report_count",   width: "10%" }
				,{title: "블라인드 여부", data: "is_blind",    	width: "10%",
					render: function (data) {
						return data === 'Y' ? label.blind : label.unblind;
					}
				}
				,{title: "작성일시", 	data: "created",    	width: "15%" }
				,{title: "작성자", 		data: "nickname",    	width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForReview.val()),
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
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildStar(rating)
	{
		let starEl = '<ol class="star-wrap" style="float: inherit;">';
		for (let i=0; i<5; i++)
		{
			let active = i < Number(rating) ? 'on' : '';
			starEl += `<li class="${active}"><i class="fas fa-star" style="cursor:default;"></i></li>`
		}
		starEl += '</ol>'

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
			,"keyword" : g_doit_uuid
			,"rating_list" : [1,2,3,4,5]
			,"is_report" : "ALL"
			,"is_blind" : "ALL"
		}

		return JSON.stringify(param);
	}

	function buildReviewDetail(data)
	{
		return (
			`<a onclick="modalDetailReviewFadein(this);"
				class="line-clamp more-info-btn"
				data-detail="${data.review_text}"
				data-title="${replaceDoubleQuotes(data.doit_title)}"
				data-rating="${data.rating}"
				data-report="${data.report_count}"
				data-nickname="${data.nickname}"
				data-blind="${data.is_blind}"
				data-created="${data.created}"
				>${data.review_text}</a>`
		)
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
		modalReviewReport.html(report);
		modalReviewUser.html(nickname);
		modalReviewCreated.html(created.substring(0, 10));
		modalReviewBlind.html(blind);
	}

	function onClickUpdateBlindReview()
	{
		if (blindValidation())
			sweetConfirm(`상태를 ${message.change}`, updateBlindReview);
	}

	function updateBlindReview()
	{
		let url 	= api.updateBlind;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, blindParams(), updateBlindReviewCallback, errMsg, false);
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

	function updateBlindReviewCallback(data)
	{
		sweetToastAndCallback(data, updateReviewSuccess);
	}

	function updateReviewSuccess()
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
	 * UCD 정보 탭 관련
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
				{title: "구분",    data: "division",   		width: "10%" }
				,{title: "UCD",   data: "amount",   		width: "15%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "제목",   data: "title",  			width: "15%" }
				,{title: "내용",   data: "description",   	width: "25%" }
				,{title: "닉네임", data: "nickname",   		width: "15%" }
				,{title: "일시",   data: "created",   		width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForUcd.val()),
			select: false,
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
			,"doit_uuid" : g_doit_uuid
		}

		return JSON.stringify(param);
	}

	function setUcdRowAttributes(nRow, aData)
	{
		if (isNegative(aData.amount))
			$(nRow).addClass('minus-pay');
	}


	/***************
	 * 두잇 톡 탭 관련
	 * ************/
	function onChangeViewType()
	{
		initTalkPageNum();
		getDoitTalk();
	}

	function getDoitTalk()
	{
		getNoticeTalk();
		getTalk();
	}

	function getNoticeTalk()
	{
		let url = api.noticeDoitTalkV2;
		let errMsg 	= `공지 ${message.ajaxLoadError}`;
		let param   = { "doit_uuid" : g_doit_uuid };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), buildNoticeTalk, errMsg, false);
	}

	function buildNoticeTalk(data)
	{
		if (!isEmpty(data.data))
		{
			let { board_idx, board_uuid, nickname, profile_uuid, text_body, comment_count, like_count, report_count, created, is_blind } = data.data;
			g_has_notice = true;
			let hasComment = Number(comment_count) > 0 ? '' : 'disabled';
			let isBlind = is_blind === 'Y';
			let blindYn = isBlind ? 'N' : 'Y';
			let blindText = isBlind ? '블라인드해제' : '블라인드처리';
			let blindClass = isBlind ? 'blind' : '';
			let blindIcon = isBlind ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
			let blindBtn = `<button onclick="g_is_notice = 'Y'; onSubmitBlindTalk(this);" 
									data-idx="${board_idx}" 
									data-blind="${blindYn}" 
									data-type="board"
									type="button" 
									class="btn-blind ${blindClass}">${blindIcon} ${blindText}
							</button>`;
			let deleteBtn = g_is_created_by_biz
				? `<button onclick="g_is_notice = 'Y'; deleteTalk(this)" data-uuid="${board_uuid}" type="button" class="delete-btn">
						<i class="fas fa-times-circle"></i>
					</button>`
				: '';
			let noticeEl =
				`<div class="card-warp">
					<div class="card">
						<div class="card-body ${blindClass}">
							<input type="hidden" class="uuid-key-value" value="board_uuid">
							<input type="hidden" class="uuid-value" value="${board_uuid}">
							<div class="row">
								<p class="type-name">공지</p>
							</div>
							<div class="row">
								<div class="flex-container left-wrap">
									<div class="col">
										<strong class="nickname">${nickname} <i class="fas fa-crown" style="color: #FBBC05;"></i></strong>
									</div>
									<div class="col">
										<p class="comment-1">${text_body}</p>
									</div>
								</div>
							</div>
							<div class="row">
								<button onclick="viewComments(this);" data-uuid="${board_uuid}" data-type="board" type="button" class="btn-comment" ${hasComment}>
									<i class="fas fa-comment"></i> <span>${comment_count}</span>
								</button>
								<span class="icon-heart"><i class="fas fa-heart"></i> ${like_count}</span>
								<span class="icon-triangle"><i class="fas fa-exclamation-triangle"></i> ${report_count}</span>
							</div>
							<div class="right-wrap">
								<span class="date">${created}</span>
								${blindBtn}
								${deleteBtn}
							</div>
						</div>
					</div>
				</div>`

			noticeTalk.html(noticeEl);
		}
	}

	function getTalk()
	{
		let url = api.listDoitTalkV2;
		let errMsg 	= `두잇톡 ${message.ajaxLoadError}`;
		let param = {
			"view_type": $("input[name=radio-view-type]:checked").val(),
			"page": g_talk_page_num,
			"doit_uuid": g_doit_uuid
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDoitTalkSuccessCallback, errMsg, false);
	}

	function isPossibleTalk(_doitStatus)
	{
		let stats = ['모집실패', '개설취소', '종료']

		return stats.indexOf(_doitStatus) === -1;
	}

	function getDoitTalkSuccessCallback(data)
	{
		if (g_is_created_by_biz && isPossibleTalk(g_doit_status))
			btnCreateTalk.show();

		let innerEl =
			`<ul class="time-line">`;

		if (!isEmpty(data.data))
		{
			g_talk_page_size = Math.ceil(data.size/10);
			let createDay = '';
			for (let { ...detail } of data.data)
			{
				let isBoard	 	= detail.talk_type === 'board';
				let isAction 	= detail.talk_type === 'action';
				let isBlind 	= detail.board_is_blind === 'Y';
				let uuidKey		= isBoard ? 'board_uuid' : 'action_uuid';
				let uuid		= isBoard ? detail.board_uuid : detail.action_uuid;
				let description = isBoard ? detail.board_description : detail.action_description;
				let commentCnt 	= isBoard ? detail.board_comment : detail.action_comment;
				let hasComment = Number(commentCnt) > 0 ? '' : 'disabled';
				let likeCnt 	= isBoard ? detail.board_like : detail.action_like;
				let reportCnt 	= isBoard ? detail.board_report : detail.action_report;
				let delYn 		= isBoard ? detail.board_is_del : detail.action_is_del;
				let isDel		= delYn === 'Y';
				let delClass	= isDel ? 'del' : '';
				let thumbnail	= '';
				if (isAction)
				{
					let actionType = detail.resource_type;
					let imgUrl;
					let resourceUrl;
					if (actionType === 'voice')
					{
						imgUrl = label.voiceImage;
						resourceUrl = detail.voice_url;
					}
					else if (actionType === 'video')
					{
						imgUrl = detail.video_thumbnail_image_url;
						resourceUrl = detail.video_url;
					}
					else
					{
						imgUrl = detail.thumbnail_image_url;
						resourceUrl = detail.image_url;
					}

					thumbnail = `<div class="talk-img">
									<img onclick="viewActionOnTalk(this)" 
										data-actiontype="${actionType}"
										data-url="${resourceUrl}"	
										src="${imgUrl}" alt="">
								</div>`
				}
				let blindYn = isBlind ? 'N' : 'Y';
				let blindText = isBlind ? '블라인드해제' : '블라인드처리';
				let blindClass = isBlind ? 'blind' : '';
				let blindIcon = isBlind ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
				let blindBtn = isBoard && !isDel
					? `<button onclick="g_is_notice = 'N'; onSubmitBlindTalk(this)" 
								data-idx="${detail.board_idx}" 
								data-blind="${blindYn}"
								data-type="board"
								type="button" 
								class="btn-blind ${blindClass}">${blindIcon} ${blindText}
						</button>`
					: '';
				let crownIcon = g_doit_creator === detail.profile_uuid ? '<i class="fas fa-crown" style="color: #FBBC05;"></i>' : '';
				let deleteBtn = (g_is_created_by_biz && g_doit_creator === detail.profile_uuid && !isDel)
					? `<button onclick="g_is_notice = 'N'; deleteTalk(this)" data-uuid="${detail.board_uuid}" type="button" class="delete-btn">
							<i class="fas fa-times-circle"></i>
						</button>`
					: '';
				let commentsBtn = (g_is_created_by_biz && !isBlind && !isDel)
					? `<div class="comment-input-wrap">
						<span class="writing-comment" onclick="viewCommentsInput(this);">댓글달기</span>
						<div class="comment-input">
							<i class="close-btn" onclick="onCloseCommentsInput(this)">×</i>
							<textarea class="length-input comment-value" maxlength="200" onkeyup="checkInputLength(this);"></textarea>
							<p class="length-count-wrap"><span class="count-input">0</span>/200</p>
							<input type="hidden" class="uuid-key-value" value="${uuidKey}">
							<input type="hidden" class="uuid-value" value="${uuid}">
							<input type="hidden" class="parent-uuid-value" value="">
							<input type="hidden" class="mention-nickname-value" value="">
							<input type="hidden" class="mention-profile-uuid-value" value="">
							<button type="button" class="btn-posting" onclick="onSubmitComments(this);">게시</button>
						</div>
					</div>`
					: '';
				let isYellowCard = detail.yellow_card === 'Y';
				let isRedCard = detail.red_card === 'Y';
				let cardIcon = '';
				if (isYellowCard)
					cardIcon = `<span class="icon-auth-card"><img src="${label.yellowCardImage}" alt=""></span>`;
				if (isRedCard)
					cardIcon = `<span class="icon-auth-card"><img src="${label.redCardImage}" alt=""></span>`;
				if (isRedCard && isYellowCard)
					cardIcon = `<span class="icon-auth-card"><img src="${label.redYellowCardImage}" alt=""></span>`;
				innerEl +=
					`<li class="talk-box clearfix">`;

				let createDate = detail.created_date;
				if (createDay !== createDate)
				{
					innerEl +=
						`<div class="time-line-info">
							<div class="date">${createDate}</div>
							<div class="icon"><span></span></div>
						</div>`

					createDay = createDate;
				}

				innerEl +=
						`<div class="time-line-body">
							<div class="card-warp">
								<div class="card">
									<div class="card-body ${blindClass} ${delClass}">
										<div class="row">
											<div class="flex-container left-wrap">
												<div class="col">
													<strong class="nickname">${detail.nickname} ${crownIcon}</strong>
												</div>
												<div class="col">
													${thumbnail}
													<p class="comment-1">${description}</p>
												</div>
											</div>
										</div>
										<div class="row">
											<button onclick="viewComments(this);" data-uuid="${uuid}" data-type="${detail.talk_type}" type="button" class="btn-comment" ${hasComment}>
												<i class="fas fa-comment"></i> <span>${commentCnt}</span>
											</button>
											<span class="icon-heart"><i class="fas fa-heart"></i> ${likeCnt}</span>
											<span class="icon-triangle"><i class="fas fa-exclamation-triangle"></i> ${reportCnt}</span>
											${cardIcon}
											${commentsBtn}
										</div>
										<div class="right-wrap">
											<span class="date">${detail.created}</span>
											${blindBtn}
											${deleteBtn}
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>`
			}
			innerEl += buildTalkPagination();
			innerEl +=
				`</ul>`
		}
		else
			innerEl = '<p style="margin-top: 30px;" class="empty-message">두잇톡이 없습니다.</p>';

		generalTalk.html(innerEl);
	}

	function viewCommentsInput(obj)
	{
		$(".comment-input").hide();
		$(obj).siblings().show();
		$(obj).siblings().children('textarea').trigger('focus');
	}

	function onCloseCommentsInput(obj)
	{
		$(obj).parent().hide();
	}

	function viewActionOnTalk(obj)
	{
		modalLayout.fadeIn();
		modalViewActionOnTalk.fadeIn();
		overflowHidden();
		buildViewActionOnTalk(obj);
	}

	function buildViewActionOnTalk(obj)
	{
		let actionType = $(obj).data('actiontype');
		let actionUrl = $(obj).data('url');
		let actionEl = '';
		if (actionType === 'video')
		{
			actionEl =
				`<div class="video-contents">
					<video controls>
						<source src="${actionUrl}" onerror="onErrorExamVideo();">
					</video>
				</div>`
		}
		else if (actionType === 'voice')
		{
			actionEl =
				`<div class="audio-contents">
					<img style="width:100%;" src="${label.voiceImage}">
					<audio controls style="width:540px;">
						<source src="${actionUrl}" onerror="onErrorActionAudio();">
					</audio>
				</div>`
		}
		else
		{
			actionEl = `<img src="${actionUrl}" alt="" onerror="onErrorImage(this);">`;
		}

		viewAction.html(actionEl);
	}

	let g_target_comment_element;
	let g_board_talk_type;
	let g_board_uuid;
	function viewComments(obj)
	{
		g_target_comment_element = $(obj).closest('.card');
		g_board_uuid = $(obj).data('uuid');
		g_board_talk_type = $(obj).data('type');

		getComment();
	}

	function getComment()
	{
		let url = api.listCommentsV2;
		let errMsg 	= `댓글 ${message.ajaxLoadError}`;
		let param = {
			"talk_type" : g_board_talk_type,
		}
		let keyName = g_board_talk_type === 'board' ? 'board_uuid' : 'action_uuid';
		param[keyName] = g_board_uuid;

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), buildComments, errMsg, false);
	}

	function buildComments(data)
	{
		$(".open-box").remove();

		let commentsEl =
			`<div class="open-box">
				<div class="container">
					<ul class="comment-wrap">`
		for (let { comment_idx, comment_uuid, nickname, profile_uuid, comment, is_blind, created } of data.data)
		{
			let crownIcon = g_doit_creator === profile_uuid ? '<i class="fas fa-crown" style="color: #FBBC05;"></i>' : '';
			let commentType = g_board_talk_type === 'board' ? 'board_comment' : 'action_comment';
			let isBlind = is_blind === 'Y';
			let blindYn = isBlind ? 'N' : 'Y';
			let blindText = isBlind ? '블라인드해제' : '블라인드처리';
			let blindClass = isBlind ? 'blind' : '';
			let blindIcon = isBlind ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
			let commentsBtn = (g_is_created_by_biz && g_doit_creator !== profile_uuid)
				? `<div class="comment-input-wrap">
						<span class="writing-comment" onclick="viewCommentsInput(this);">답글달기</span>
						<div class="comment-input">
							<i class="close-btn" onclick="onCloseCommentsInput(this)">×</i>
							<textarea class="length-input comment-value" maxlength="200" onkeyup="checkInputLength(this);"></textarea>
							<p class="length-count-wrap"><span class="count-input">0</span>/200</p>
							<input type="hidden" class="uuid-key-value" value="">
							<input type="hidden" class="uuid-value" value="">
							<input type="hidden" class="parent-uuid-value" value="${comment_uuid}">
							<input type="hidden" class="mention-nickname-value" value="${nickname}">
							<input type="hidden" class="mention-profile-uuid-value" value="${profile_uuid}">
							<button type="button" class="btn-posting" onclick="onSubmitComments(this);">게시</button>
						</div>
					</div>`
				: '';
			commentsEl +=
						`<li class="${blindClass}">
							<div class="flex-container clearfix">
								<div class="left-wrap">
									└
									<strong class="nickname">${nickname} ${crownIcon}</strong>
									<p class="comment-2">${comment}</p>
								</div>
								<div class="right-wrap">
									<span class="date">${created}</span>
									<button onclick="onSubmitBlindTalk(this)" 
											data-idx="${comment_idx}" 
											data-blind="${blindYn}" 
											data-type="${commentType}"
											type="button"
											class="btn-blind ${blindClass}">${blindIcon} ${blindText}
									</button>
								</div>
							</div>
							${commentsBtn}
						</li>`
		}
		commentsEl	+=
					`</ul>
				</div>
			</div>`

		g_target_comment_element.append(commentsEl)

		g_target_comment_element.find('.fa-comment').next().html(numberWithCommas(data.data.length));
	}

	function buildTalkPagination()
	{
		return g_talk_page_num !== g_talk_page_size
			?	`<button onclick="onClickViewMore()" 
						type="button" 
						class="view-more">더보기(${g_talk_page_num}/${g_talk_page_size}) 
					<i class="fas fa-caret-down"></i>
				</button>`
			: '';
	}

	function onClickViewMore()
	{
		g_talk_page_num++
		getTalk();
	}

	function initTalkPageNum()
	{
		g_talk_page_num = 1;
	}

	/** 댓글, 답글 등록 **/
	let g_comments_value;
	let g_uuid_key;
	let g_uuid_value;
	let g_parent_uuid_value;
	let g_mention_nickname_value;
	let g_mention_profile_uuid_value;
	let isComments = false;
	function onSubmitComments(obj)
	{

		g_uuid_key = $(obj).siblings('.uuid-key-value').val();
		g_uuid_value = $(obj).siblings('.uuid-value').val();
		if (isEmpty(g_uuid_key))
		{
			isComments = true;
			/** 답글일 때. 부모 글(톡) element를 찾아서 처리. **/
			g_uuid_key = $(obj).parents('.open-box').siblings('.card-body').find('.uuid-key-value').val();
			g_uuid_value = $(obj).parents('.open-box').siblings('.card-body').find('.uuid-value').val();
		}
		g_parent_uuid_value = $(obj).siblings('.parent-uuid-value').val();
		g_mention_nickname_value = $(obj).siblings('.mention-nickname-value').val();
		g_mention_profile_uuid_value = $(obj).siblings('.mention-profile-uuid-value').val();
		g_comments_value = $(obj).siblings('.comment-value').val();
		g_comments_value = (isComments && !isEmpty(g_mention_profile_uuid_value) && g_doit_creator !== g_mention_profile_uuid_value)
			? `@${g_mention_nickname_value} ${g_comments_value}`
			: g_comments_value;

		if (isEmpty(g_comments_value))
		{
			sweetToast(`댓글(답글)은 ${message.required}`);
			$(obj).siblings('.comment-value').trigger('focus');
			return;
		}

		sweetConfirm(message.create, createCommentsRequest);
	}

	function createCommentsRequest()
	{
		let url = api.createComments;
		let errMsg = label.submit+message.ajaxError;
		let param = {
			"profile_uuid" : g_doit_creator,
			"comments" : g_comments_value.trim(),
		}
		param[g_uuid_key] = g_uuid_value;
		if (!isEmpty(g_parent_uuid_value))
			param["parents_comment_uuid"] = g_parent_uuid_value;
		if (!isEmpty(g_mention_nickname_value))
		{
			let mention = [{
				"profile_nickname" : g_mention_nickname_value,
				"profile_uuid" : g_mention_profile_uuid_value
			}]

			param["mention"] = mention;
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createCommentsReqCallback, errMsg, false);
	}

	function createCommentsReqCallback(data)
	{
		sweetToastAndCallback(data, createCommentsSuccess);
	}

	function createCommentsSuccess()
	{
		if(isComments)
			getComment();
		else
		{
			getNoticeTalk();
			getTalk();
		}
	}

	/** 톡 블라인드 관련 **/
	let g_blind_talk_type;
	let g_talk_idx;
	let g_is_blind_talk;
	function onSubmitBlindTalk(obj)
	{
		g_blind_talk_type = $(obj).data('type');
		g_talk_idx = $(obj).data('idx');
		g_is_blind_talk = $(obj).data('blind');

		sweetConfirm(`상태를 ${message.change}`, updateBlindTalk);
	}

	function updateBlindTalk()
	{
		let url = api.updateBlindTalkV2;
		let errMsg = label.modify+message.ajaxError;
		let param = {
			"blind_type" : g_blind_talk_type,
			"idx" : [g_talk_idx],
			"is_blind" : g_is_blind_talk
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateBlindTalkCallback, errMsg, false);
	}

	function updateBlindTalkCallback(data)
	{
		sweetToastAndCallback(data, updateBlindTalkSuccess);
	}

	function updateBlindTalkSuccess()
	{
		if (g_blind_talk_type === 'board')
			g_is_notice === 'Y' ? getNoticeTalk() : getTalk();
		else
			getComment();
	}

	function modalCreateTalkOpen()
	{
		modalLayout.fadeIn();
		modalCreateTalk.fadeIn();
		overflowHidden();
		initModalCreateTalk();
	}

	function initModalCreateTalk()
	{
		btnNotice.trigger('click');
		talkContent.val('');
		talkContent.trigger('focus');
	}

	function onClickBtnTalkType(obj)
	{
		g_is_notice = $(obj).data('notice');

		$(obj).siblings().removeClass('on');
		$(obj).addClass('on');

		talkContent.trigger('focus');
	}

	function onSubmitTalk()
	{
		let msg = (g_has_notice && g_is_notice === 'Y')
			? `공지는 한 개만 등록 가능합니다.
				'확인'을 누르면 기존에 등록된 공지는 일반톡이 되고,
				현재 내용이 공지로 등록됩니다.`
			: message.create;

		if (addTalkValidation())
			sweetConfirm(msg, createTalkRequest);
	}

	function addTalkValidation()
	{
		if (isEmpty(talkContent.val()))
		{
			sweetToast(`두잇톡은 ${message.required}`);
			talkContent.trigger('focus');
			return false;
		}

		return true;
	}

	function createTalkRequest()
	{
		let url = api.createTalkV2;
		let errMsg = label.submit+message.ajaxError;
		let param = {
			"doit_uuid" : g_doit_uuid
			,"profile_uuid" : g_biz_uuid
			,"text_body" : talkContent.val().trim()
			,"is_notice" : g_is_notice
			,"doit_title" : g_doit_title
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createTalkReqCallback, errMsg, false);
	}

	function createTalkReqCallback(data)
	{
		sweetToastAndCallback(data, getDoitTalk);
		modalFadeout();
	}

	/** 톡 삭제 관련 **/
	function deleteTalk(obj)
	{
		g_board_uuid = $(obj).data('uuid');
		sweetConfirm(message.delete, deleteTalkRequest);
	}

	function deleteTalkRequest()
	{
		let url = api.deleteTalkV2;
		let errMsg = label.delete+message.ajaxError;
		let param = { "board_uuid": g_board_uuid }

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteTalkReqCallback, errMsg, false);
	}

	function deleteTalkReqCallback(data)
	{
		sweetToastAndCallback(data, deleteTalkReqSuccess);
	}

	function deleteTalkReqSuccess()
	{
		if (g_is_notice === 'Y')
			getNoticeTalk();

		getTalk();
	}

	/** 수정페이지 이동 **/
	function goUpdatePage()
	{
		location.href = page.updateDoit+idx;
	}

	function onClickXlsxOut()
	{
		let url;
		let errMsg = label.list + message.ajaxLoadError;
		let param = {};
		if (g_xlsx_type === 'user')
		{
			url = api.xlsxOutDoitMember;
			param["doit_uuid"] = g_doit_uuid;
			param["nickname"] = "";
		}
		else if (g_xlsx_type === 'review')
		{
			url = api.xlsxOutDoitReview;
			param["from_date"] = "";
			param["to_date"] = "";
			param["search_type"] = "doit_uuid";
			param["keyword"] = g_doit_uuid;
			param["rating_list"] = [1,2,3,4,5];
			param["is_report"] = "ALL";
			param["is_blind"] = "ALL";
		}
		else
		{
			url = api.xlsxOutDoitUcd;
			param["doit_uuid"] = g_doit_uuid;
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), xlsxOutCallback, errMsg, false);
	}

	function xlsxOutCallback(data)
	{
		let filename;
		let sheetname;
		if (g_xlsx_type === 'user')
		{
			filename = `${g_doit_title}_참여자 정보`;
			sheetname = '참여자 정보';
		}
		else if (g_xlsx_type === 'review')
		{
			filename = `${g_doit_title}_리뷰 정보`;
			sheetname = '리뷰 정보';
		}
		else
		{
			filename = `${g_doit_title}_UCD 정보`;
			sheetname = 'UCD 정보';
		}

		setExcelData(filename, sheetname, data.data);
	}