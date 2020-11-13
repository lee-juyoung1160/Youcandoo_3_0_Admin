
	const ulTab 		= $("#ulTab");
	const tabContent	= $(".tab-content");
	const goUpdate      = $("#goUpdate");

	/** 두잇톡 탭 **/
	const doitTalk 		= $("#doitTalk");
	const btnCreateTalk = $("#btnCreateTalk");
	const viewType 		= $("input[name=radio-view-type]");
	const noticeTalk	= $("#noticeTalk");
	const generalTalk	= $("#generalTalk");
	/** 톡 등록 modal **/
	const modalCreateTalk	= $("#modalCreateTalk");
	const btnNotice			= $("#btnNotice");
	const btnGeneral		= $("#btnGeneral");
	const talkContent		= $("#talkContent");
	const btnSubmitTalk		= $("#btnSubmitTalk");
	let g_is_notice;
	/** modal 공통 **/
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$( () => {
		viewType.eq(0).prop('checked', true);
		getDetail();
		/** 이벤트 **/
		ulTab			.on("click", function (event) { onClickTab(event); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnNotice		.on('click', function () { g_is_notice = 'Y'; onClickBtnTalkType(this) });
		btnGeneral		.on('click', function () { g_is_notice = 'N'; onClickBtnTalkType(this) });
		btnCreateTalk	.on('click', function () { modalCreateTalkOpen() });
		btnSubmitTalk	.on('click', function () { onSubmitTalk() });
		/*btnBlind		.on('click', function () { g_blind_type = 'Y'; onClickUpdateBlindReview(); });
		btnUnBlind		.on('click', function () { g_blind_type = 'N'; onClickUpdateBlindReview(); });
		btnSubmitWarn	.on('click', function () { onSubmitWarn(); });*/
	});

	function onClickTab(e)
	{
		let clickedEl = $(e.target);
		let target = $(clickedEl).data('target')
		getNoticeTalk();
		getTalk();
	}

	/****************
	 * 두잇정보탭 관련
	 * **************/
	function getDetail()
	{
		let url 	= api.detailDoit;
		let param   = JSON.stringify({"idx" : idx});
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, param, getDetailCallback, errMsg, false);
	}

	let g_doit_uuid;
	let g_doit_status;
	let g_is_created_by_biz;
	function getDetailCallback(data)
	{
		if (isSuccessResp(data))
		{
			let { doit_uuid, doit_status, company_profile_uuid, created_profile_uuid } = data.data;
			g_doit_uuid = doit_uuid;
			g_doit_status = doit_status;
			g_is_created_by_biz = company_profile_uuid === created_profile_uuid;
		}
		else
			sweetError(invalidResp(data));
	}

	/** 공지톡 **/
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
			let { board_uuid, nickname, text_body, comment_count, like_count, report_count, created, is_blind, is_del } = data.data;
			let hasComment = Number(comment_count) > 0 ? '' : 'disabled';
			let blindYn = is_blind === 'Y' ? 'N' : 'Y';
			let blindText = is_blind === 'Y' ? '블라인드해제' : '블라인드처리';
			let blindClass = is_blind === 'Y' ? 'blind' : '';
			let blindIcon = is_blind === 'Y' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
			let noticeEl =
				`<div class="card-warp">
					<div class="card">
						<div class="card-body">
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
								<button type="button" class="btn-blind ${blindClass}">${blindIcon} ${blindText}</button>
								<button type="button" class="delete-btn"><i class="fas fa-times-circle"></i></button>
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
			"page": 1,
			"doit_uuid": g_doit_uuid
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDoitTalkSuccessCallback, errMsg, false);
	}

	function isPossibleTalk(_doitStatus)
	{
		let stats = ['모집실패', '개설취소', '종료']

		return stats.indexOf(_doitStatus) === -1;
	}

	let g_has_notice = false;
	function getDoitTalkSuccessCallback(data)
	{
		if (!g_is_created_by_biz && !isPossibleTalk(g_doit_status))
			btnCreateTalk.remove();

		let innerEl =
			`<ul class="time-line">`;

		if (!isEmpty(data.data))
		{
			/*let creator = data.data.permission;*/
			let createDay = '';
			for (let { ...detail } of data.data)
			{
				let isBoard	 	= detail.talk_type === 'board';
				let isAction 	= detail.talk_type === 'action';
				let isBlind 	= detail.is_blind === 'Y';
				let uuid		= isBoard ? detail.board_uuid : detail.action_uuid;
				let description = isBoard ? detail.board_description : detail.action_description;
				let commentCnt 	= isBoard ? detail.board_comment : detail.action_comment;
				let hasComment = Number(commentCnt) > 0 ? '' : 'disabled';
				let likeCnt 	= isBoard ? detail.board_like : detail.action_like;
				let reportCnt 	= isBoard ? detail.board_report : detail.action_report;
				let thumbnail	= '';
				if (isAction)
				{
					let actionType = detail.resource_type;
					let imgUrl;
					if (actionType === 'voice')
						imgUrl = label.voiceImage;
					else if (actionType === 'video')
						imgUrl = detail.video_thumbnail_image_url;
					else
						imgUrl = detail.thumbnail_image_url;

					thumbnail = `<div class="talk-img"><img id="btnImage" src="${imgUrl}" alt=""></div>`
				}

				let btnDel = (g_is_created_by_biz && !isEmpty(detail.company_uuid))
					? `<button onclick="deleteDoitTalk(this)" data-uuid="${detail.board_uuid}"
								type="button" class="delete-btn"><i class="fas fa-times-circle"></i> 톡삭제</button>`
					: '';

				let blindYn = isBlind ? 'N' : 'Y';
				let blindText = isBlind ? '블라인드해제' : '블라인드처리';
				let blindClass = isBlind ? 'blind' : '';
				let blindIcon = isBlind ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
				let blindBtn = isBoard ? `<button type="button" class="btn-blind">${blindIcon} ${blindText}</button>` : '';
				/*let crownIcon = creator === detail.profile_uuid ? '<i class="fas fa-crown" style="color: #FBBC05;"></i>' : '';*/
				innerEl +=
					`<li class="talk-box clearfix">`;

				let createDate = detail.created_date;
				let createTime = detail.created_time;
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
						`<div class="time-line-body ${blindClass}">
							<div class="card-warp">
								<div class="card">
									<div class="card-body">
										<div class="row">
											<div class="flex-container left-wrap">
												<div class="col">
													<strong class="nickname">${detail.nickname}</strong>
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
										</div>
										<div class="right-wrap">
											<span class="date">${createTime}</span>
											${blindBtn}
											${btnDel}
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>`
			}
			innerEl += `<button type="button" class="view-more">더보기 <i class="fas fa-caret-down"></i></button>`;
		}
		else
			innerEl +=
				'<p style="margin-top: 30px;" class="empty-message">두잇톡이 없습니다.</p>';

		innerEl +=
			`</ul>`;

		generalTalk.html(innerEl);
	}

	let g_comment_element;
	function viewComments(obj)
	{
		g_comment_element = $(obj).closest('.card');
		let url = api.listCommentsV2;
		let errMsg 	= `댓글 ${message.ajaxLoadError}`;
		let uuid = $(obj).data('uuid');
		let talkType = $(obj).data('type');
		let keyName = talkType === 'board' ? 'board_uuid' : 'action_uuid';
		let param = {
			"talk_type" : talkType,
		}
		param[keyName] = uuid;

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), buildComments, errMsg, false);
	}

	function buildComments(data)
	{
		$(".open-box").remove();

		let commentsEl =
			`<div class="open-box">
				<div class="container">
					<ul class="comment-wrap">`
		for (let { comment_uuid, nickname, comment, is_blind, created } of data.data)
		{
			let isBlind = is_blind === 'Y';
			let blindYn = isBlind ? 'N' : 'Y';
			let blindText = isBlind ? '블라인드해제' : '블라인드처리';
			let blindClass = isBlind ? 'blind' : '';
			let blindIcon = isBlind ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
			commentsEl +=
						`<li class="${blindClass}">
							<div class="flex-container clearfix">
								<div class="left-wrap">
									└
									<strong class="nickname">${nickname}</strong>
									<p class="comment-2">${comment}</p>
								</div>
								<div class="right-wrap">
									<span class="date">${created}</span>
									<button onclick="toggleBlind(this)" 
											data-uuid="${comment_uuid}" 
											data-blind="${blindYn}" 
											type="button"
											class="btn-blind ${blindClass}">
										${blindIcon} ${blindText}
									</button>
								</div>
							</div>
						</li>`
		}
		commentsEl	+=
			`</ul>
				</div>
			</div>`

		g_comment_element.append(commentsEl);
	}



	function modalCreateTalkOpen()
	{
		initModalCreateTalk();
		modalLayout.fadeIn();
		modalCreateTalk.fadeIn();
		overflowHidden();
	}

	function initModalCreateTalk()
	{
		talkContent.val('');
		talkContent.trigger('focus');
	}

	function onClickBtnTalkType(obj)
	{
		$(obj).siblings().removeClass('on');
		$(obj).addClass('on');

		initModalCreateTalk();
	}

	function onSubmitTalk()
	{
		let msg = (g_has_notice && g_is_notice === 'Y')
			? '공지는 한 개만 등록 가능합니다.\n확인을 누르면 기존에 등록된 공지는 일반톡이 되고,\n현재 내용이 공지로 등록됩니다.'
			: message.create;

		if (addTalkValidation())
			sweetConfirm(msg, createRequest);
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

	function createRequest()
	{
		let url = api.createDoitTalk;
		let errMsg = label.submit+message.ajaxError;
		let param = {
			"doit_uuid" : g_doitUuid
			,"profile_uuid" : g_biz_uuid
			,"text_body" : $("#addTalk").val().trim()
			,"is_notice" : g_is_notice
			,"doit_title" : g_doit_title
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, getDoitTalk);
	}

	function deleteDoitTalk(obj)
	{
		g_board_uuid = $(obj).data('uuid');
		sweetConfirm(`${message.delete}`, deleteRequest);
	}

	function deleteRequest()
	{
		let url = api.deleteDoitTalk;
		let errMsg = label.modify+message.ajaxError;
		let param = {
			"board_uuid": g_board_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteReqSuccess);
	}

	function deleteReqSuccess()
	{
		g_has_notice = false;
		getDoitTalk();
	}

	let g_board_uuid;
	let g_is_blind_talk;
	function onSubmitBlindTalk(obj)
	{
		g_board_uuid = $(obj).data('uuid');
		g_is_blind_talk = $(obj).data('blind');

		sweetConfirm(`상태를 ${message.change}`, updateBlindTalk);
	}

	function updateBlindTalk()
	{
		let url = api.updateBlindTalk;
		let errMsg = label.modify+message.ajaxError;
		let param = {
			"board_uuid": g_board_uuid,
			"is_blind" : g_is_blind_talk
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateBlindTalkCallback, errMsg, false);
	}

	function updateBlindTalkCallback(data)
	{
		sweetToastAndCallback(data, updateBlindTalkSuccess);
	}

	function updateBlindTalkSuccess()
	{
		getDoitTalk();
	}



	/** 수정페이지 이동 **/
	function goUpdatePage()
	{
		location.href = page.updateDoit+idx;
	}
