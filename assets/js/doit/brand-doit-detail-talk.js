
    /** 두잇톡 탭 **/
    const viewType 		= $("input[name=radio-view-type]");
    const noticeTalk	= $("#noticeTalk");
    const generalTalk	= $("#generalTalk");
    let g_talk_page_num = 1;
    let g_talk_page_size = 1;
    let g_has_notice = false;
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
            let { board_uuid, nickname, text_body, comment_count, like_count, report_count, created, is_blind } = data.data;
            g_has_notice = true;
            let hasComment = Number(comment_count) > 0 ? '' : 'disabled';
            let isBlind = is_blind === 'Y';
            let blindClass = isBlind ? 'blind' : '';
            let noticeEl =
                `<div class="card-warp">
					<div class="card">
						<div class="card-body ${blindClass}">
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

    function getDoitTalkSuccessCallback(data)
    {
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
                let blindClass = isBlind ? 'blind' : '';
                let crownIcon = g_doit_creator === detail.profile_uuid ? '<i class="fas fa-crown" style="color: #FBBC05;"></i>' : '';
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
										</div>
										<div class="right-wrap">
											<span class="date">${detail.created}</span>
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
        for (let { nickname, profile_uuid, comment, is_blind, created } of data.data)
        {
            let crownIcon = g_doit_creator === profile_uuid ? '<i class="fas fa-crown" style="color: #FBBC05;"></i>' : '';
            let isBlind = is_blind === 'Y';
            let blindClass = isBlind ? 'blind' : '';
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
								</div>
							</div>
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
