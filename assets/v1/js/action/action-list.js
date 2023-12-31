
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const status		= $("input[name=chk-status]");
	const report		= $("input[name=radio-report]");
	const selPageLength = $("#selPageLength");
	const actionTopDom	= $("#actionTopDom");
	const dataNum		= $(".data-num");
	const actionWrap	= $("#actionWrap");
	const pagination	= $("#dataTable_paginate");
	const btnWarnRed	= $("#btnWarnRed");
	const btnWarnYellow	= $("#btnWarnYellow");
	const btnReport		= $("#btnReport");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	/** 경고장/신고 발송 modal **/
	const modalWarn		= $("#modalWarn");
	const modalWarnTitle	= $("#modalWarnTitle");
	const causeBy		= $("#selCauseBy");
	const btnSubmitWarn	= $("#btnSubmitWarn");
	/** 상세보기 modal **/
	const modalDetail		= $("#modalDetail");
	const modalActionDom	= $("#modalActionDom");
	const modalActionDesc	= $("#modalActionDesc");
	const modalExample		= $("#modalExample");
	const modalExampleDesc	= $("#modalExampleDesc");
	const modalDoitTitle	= $("#modalDoitTitle");
	const modalNickname		= $("#modalNickname");
	const modalWarnWrap		= $("#modalWarnWrap");
	let g_warn_type;

	$( () => {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initActionPageLength(selPageLength);
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		getActions();
		/** 이벤트 **/
		$("body")  .on('keydown', function (event) { onKeydownSearch(event); });
		search			.on('click', function () { onSubmitSearch(); });
		reset			.on('click', function () { initSearchForm(); });
		status			.on('click', function () { atLeastOneChecked(this); });
		selPageLength	.on('change', function () { currentPage  = 1; getActions(); });
		dayButtons      .on('click', function () { onClickActiveAloneDayBtn(this); });
		btnWarnYellow	.on('click', function () { g_warn_type = 'Y'; onClickBtnWarn(); });
		btnWarnRed		.on('click', function () { g_warn_type = 'R'; onClickBtnWarn(); });
		btnReport		.on('click', function () { g_warn_type = ''; onClickBtnWarn(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmitWarn	.on('click', function () { onSubmitWarn(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		status.prop("checked", true);
		report.eq(0).prop("checked", true);
		initSelectOption();
		initSearchDateRangeToday();
		initMaxDateToday();
		initDayBtn();
	}

	/************************
	 * 인증 상세 모달 관련
	 * **********************/
	function onClinkActionImage(obj)
	{
		modalDetailFadein();
		buildDetailModal(obj);
	}

	function modalDetailFadein()
	{
		modalDetail.fadeIn();
		modalLayout.fadeIn();
		overflowHidden();
	}

	function buildDetailModal(obj)
	{
		let uuid 		= $(obj).data('uuid');
		let type 		= $(obj).data('type');
		let actionUrl 	= $(obj).data('url');
		let actionDesc	= $(obj).data('desc');
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

		actionDom += `<button type="button" class="btn-download" data-url="${actionUrl}" onclick="downloadAction(this);"><i class="fas fa-download"></i> 인증 다운로드</button>`

		if (type === 'image')
		{
			className = 'img-contents';
			actionDom += `<img src="${actionUrl}" alt="인증이미지" onerror="onErrorImage(this);">`
			exampleDom += `<img src="${exampleUrl}" alt="예시이미지" onerror="onErrorImage(this);">`
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
					<source src="${exampleUrl}" onerror="onErrorExamVideo()">
				</video>`
		}
		else if (type === 'voice')
		{
			className = 'audio-contents';
			actionDom +=
				`<img style="width:100%;" src="${label.voiceImage}" onerror="onErrorImage(this);">
				<audio controls>
					<source src="${actionUrl}" onerror="onErrorActionAudio();">
				</audio>`
			exampleDom +=
				`<img style="width:100%;" src="${label.voiceImage}" onerror="onErrorImage(this);">
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

		/** 모달 경고장 영역 **/
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

	let g_cancel_api;
	let g_cancel_id;
	function cancelWarn(obj)
	{
		g_cancel_api = $(obj).data('type') === 'Y' ? api.cancelYellow : api.cancelRed;
		g_cancel_id  = $(obj).data('uuid');

		sweetConfirm(`경고장 발송을 ${message.cancel}`, cancelRequest);
	}

	function cancelRequest()
	{
		let param = JSON.stringify({"action_uuid" : g_cancel_id});
		let errMsg = label.cancel+message.ajaxError;

		ajaxRequestWithJsonData(true, g_cancel_api, param, cancelReqCallback, errMsg, false);
	}

	function cancelReqCallback(data)
	{
		sweetToastAndCallback(data, cancelSuccess);
	}

	function cancelSuccess()
	{
		modalFadeout();
		getActions();
	}

	/************************
	 * 경고장 발송 관련
	 * **********************/
	function onClickBtnWarn()
	{
		if (isCheckedTarget())
			modalWarnFadein();
	}

	function isCheckedTarget()
	{
		let chkedElement = $("input[name=chk-warn]:checked");
		let count = chkedElement.length;
		if (count === 0)
		{
			sweetToast(`발송대상을 ${message.select}`);
			return false;
		}

		let hasYellowCount = 0;
		chkedElement.each(function () {
			if ($(this).data('is-yellow') === 'Y')
				hasYellowCount++;
		});
		if (g_warn_type === 'Y' && hasYellowCount > 0)
		{
			sweetToast(`선택한 발송대상에 ${message.alreadyHasYellow}`);
			return false;
		}

		return true;
	}

	function modalWarnFadein()
	{
		let title = isEmpty(g_warn_type) ? '신고 발송' : '경고장 발송';
		modalWarnTitle.html(title);
		modalWarn.fadeIn();
		modalLayout.fadeIn();
		overflowHidden();
		initWarnModal();
	}

	function initWarnModal()
	{
		causeBy.children().eq(0).prop("selected", true);
		onChangeSelectOption(causeBy);
	}

	function onSubmitWarn()
	{
		let prefixTxt = isEmpty(g_warn_type) ? '신고를' : '경고장을';
		sweetConfirm(`${prefixTxt} ${message.send}`, warnRequest);
	}

	function warnRequest()
	{
		let url;
		if (g_warn_type === 'Y')  url = api.setYellow
		else if (g_warn_type === 'R') url = api.setRed;
		else url = api.setReport;
		let errMsg = label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, warnParams(), warnReqCallback, errMsg, false);
	}

	function warnParams()
	{
		let uuids = [];
		let checkedElement = $("input[name=chk-warn]:checked");
		checkedElement.each(function () { uuids.push($(this).val()); });

		let param = {
			"action_list" : uuids
			,"description" : causeBy.val()
		}

		return JSON.stringify(param);
	}

	function warnReqCallback(data)
	{
		sweetToastAndCallback(data, sendSuccess);
	}

	function sendSuccess()
	{
		modalFadeout();
		getActions();
	}

	/************************
	 * 인증 목록 관련
	 * **********************/
	function getActions()
	{
		let url 	 = api.listAction;
		let errMsg 	 = label.list+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, listParams(), getActionsCallback, errMsg, false);
	}

	function listParams()
	{
		let statusParam = [];
		status.each(function () {
			if ($(this).is(':checked'))
				statusParam.push($(this).val())
		});

		let param = {
			"limit" : selPageLength.val()
			,"page" : currentPage
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"status" : statusParam
			,"is_report" : $('input[name=radio-report]:checked').val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function getActionsCallback(data)
	{
		isSuccessResp(data) ? getActionsSuccess(data) : sweetError(invalidResp(data));
	}

	function getActionsSuccess(data)
	{
		buildList(data);
		buildPagination(data);
	}

	function buildList(data)
	{
		let actions    = data.data;
		let dataLen    = actions.length;
		let totalCount = data.recordsTotal;
		let actionDom  = '<p class="empty-message">인증 정보가 없습니다.</p>';

		/** total count **/
		dataNum.html(totalCount);

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
		{
			actionTopDom.hide();
			pagination.hide();
		}

		actionWrap.html(actionDom);
	}

	let currentPage = 1;
	function buildPagination(data)
	{
		let totalCount  = data.recordsTotal;
		let lastPage	= Math.ceil(totalCount / selPageLength.val());

		pagination.html(paginate(currentPage, lastPage));
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		currentPage = $(obj).data('page');

		getActions();
	}

	function onSubmitSearch()
	{
		currentPage =1;
		getActions();
		initMaxDateToday();
	}

	function downloadAction(obj)
	{
		download($(obj).data('url'));
	}
