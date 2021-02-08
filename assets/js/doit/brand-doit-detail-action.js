
    /** 인증정보 탭 **/
    const actionWrap	= $("#actionWrap");
    const actionTopDom	= $("#actionTopDom");
    const pagination	= $("#dataTable_paginate");
    const actionTotalCount		 = $("#actionTotalCount");
    const selPageLengthForAction = $("#selPageLengthForAction");
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
					</div>`
            }
            if (yellow === 'Y')
            {
                warnDom +=
                    `<div class="card-wrap">
						<img src="${label.yellowCardImage}" alt="옐로우카드">
						<span>${yellowDesc}</span>
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

                actionDom +=
                    `<li>
						<div class="top clearfix">
							<div class="checkbox-wrap">
								<input type="checkbox" id="${actionId}" name="chk-warn" value="${action.action_uuid}" disabled/>
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