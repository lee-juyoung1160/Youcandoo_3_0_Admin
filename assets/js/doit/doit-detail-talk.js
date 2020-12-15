
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
        if (isEmpty(g_comments_value))
        {
            sweetToast(`댓글(답글)은 ${message.required}`);
            $(obj).siblings('.comment-value').trigger('focus');
            return;
        }
        g_comments_value = (isComments && !isEmpty(g_mention_profile_uuid_value) && g_doit_creator !== g_mention_profile_uuid_value)
            ? `@${g_mention_nickname_value} ${g_comments_value}`
            : g_comments_value;



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