
	const doitTitle			= $("#doitTitle");
	const doitDesc 			= $("#doitDesc");
	const inputTag			= $("#inputTag");
	const btnAddTag			= $("#btnAddTag");
	const addedTags			= $("#addedTags");
	const introFileType 	= $("input[name=radio-intro-type]");
	const introFileArea		= $("#introFileArea");
	const bizName 			= $("#bizName");
	const selPromo 			= $("#selPromo");
	const selReward 		= $("#selReward");
	const selectedReward    = $("#selectedReward")
	const chkExtraReward	= $("input[name=chkExtraReward]");
	const extraReward		= $("#ucd-area");
	const ucdAreWrap		= $("#ucd-area-wrap");
	const doitFrom	    	= $("#doitFrom");
	const doitTo	    	= $("#doitTo");
	const startTime	    	= $("#startTime");
	const endTime	    	= $("#endTime");
	const chkAccessUser 	= $("input[name=chkAccessUser]");
	const privateCode 		= $("#privateCode");
	const exampleType 		= $("input[name=radio-example-type]");
	const exampleArea 		= $("#exampleArea");
	const exampleDesc 		= $("#exampleDesc");
	const openYn 			= $("input[name=radio-open-yn]");
	const btnSubmit			= $("#btnSubmit");

	/** modal **/
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const dataTable		= $("#dataTable");
	const modalBizName	= $("#modalBizName");

	$( () => {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 소개 파일 영역 초기화 **/
		onChangeIntroType(introFileType.eq(0));
		/** 인증예시 파일 영역 초기화 **/
		onChangeExampleType(exampleType.eq(0));
		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam("");
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		modalBizName	.on('keyup', function () { onKeyupSearchBiz(); });
		btnAddTag		.on('click', function () { onClickAddTag(); });
		introFileType	.on('change', function () { onChangeIntroType(this); });
		bizName			.on('click', function () { onClickBizName(); });
		selPromo		.on('change', function () { onChangeSelPromo(); });
		selReward		.on('change', function () { onChangeSelReward(); });
		chkExtraReward	.on('change', function () { toggleActive(ucdAreWrap); });
		chkAccessUser	.on('change', function () { toggleActive($(".code-wrap")); });
		exampleType		.on('change', function () { onChangeExampleType(this); });
		doitFrom		.on('change', function () { onChangeDateFrom(); });
		btnSubmit		.on('click', function () { onSubmitDoit(); });
	});

	/** 인증기간 종료일 자동 세팅 **/
	function onChangeDateFrom()
	{
		let doitFromDate = doitFrom.datepicker("getDate");
		let duration = g_duration;

		if (isEmpty(duration))
		{
			sweetToast("리워드 조건을 "+message.select);
			doitFrom.val('');
			return;
		}

		doitFromDate.setDate(doitFromDate.getDate() + (Number(duration) - 1));
		let doitToDate = getStringFormatToDate(doitFromDate, label.nullValue);

		doitTo.val(doitToDate);
	}

	function initComponent()
	{
		doitTitle.trigger('focus');
		doitTitle.val('');
		bizName.val('');
		buildOptionPromo();
		buildOptionReward();
		inputTag.val('');
		introFileType.eq(0).prop('checked', true);
		onChangeIntroType(introFileType);
		doitTo.datepicker('option', 'disabled', true);
		exampleType.eq(0).prop('checked', true);
		openYn.eq(0).prop('checked', true);
	}

	function onClickAddTag()
	{
		if (addTagValidation())
		{
			let inputValue = inputTag.val().trim();
			let tagArr = [];
			$(".added-tag").each(function () {
				tagArr.push($(this).text());
			});

			if (isEmpty(tagArr) || tagArr.indexOf(inputValue) === -1)
			{
				let tagDom = '';
				tagDom +=
					`<li>
						#<span class="tag-name added-tag">${inputValue}</span>
						<i class="delete-btn far fa-times-circle" onclick="removeTagDom(this);"></i>
					</li>`

				addedTags.append(tagDom);

				inputTag.val('');
				checkInputLength(inputTag);
				inputTag.trigger('focus');
			}
		}
	}

	function addTagValidation()
	{
		let tagLen = addedTags.find('li').length;

		if (isEmpty(inputTag.val()))
		{
			sweetToast(`태그를 ${message.input}`);
			inputTag.trigger('focus');
			return false;
		}

		let splitInput = inputTag.val().split('');
		if (splitInput.indexOf(',') !== -1)
		{
			sweetToast('태그에 , 를 포함할 수 없습니다.');
			return false;
		}

		if (splitInput.indexOf('#') !== -1)
		{
			sweetToast('태그에 # 을 포함할 수 없습니다.');
			return false;
		}

		if (tagLen >= 3)
		{
			sweetToast(`태그는 ${message.maxAddThree}`);
			return false;
		}

		return true;
	}

	function removeTagDom(obj)
	{
		$(obj).parent().remove();
	}

	function toggleActive(obj)
	{
		$(obj).toggleClass('active');
	}

	function onKeyupSearchBiz()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	/** 기업 검색 모달**/
	function onClickBizName()
	{
		modalFadein();
		initModal();
		getBiz();
	}

	function getBiz()
	{
		dataTable.DataTable({
			ajax : {
				url: api.getBizName,
				type:"POST",
				headers: headers,
				dataSrc: "",
				global: false,
				data: function (d) {
					return JSON.stringify({"keyword" : modalBizName.val()});
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기업명",	data: "value" }
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
			paging: false,
			ordering: false,
			order: [],
			info: false,
			select: false,
			scrollY: 200,
			scrollCollapse: true,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		/** 기업명에 클릭이벤트 추가 **/
		$(nRow).attr('onClick', `setSelectedBiz("${aData.key}", "${aData.value}")`);
	}

	let g_biz_uuid;
	function setSelectedBiz(uuid, name)
	{
		g_biz_uuid = uuid;
		bizName.val(name);
		selectedReward.empty();
		getInvolvePromo();
		buildOptionReward();
		modalFadeout();
	}

	function initModal()
	{
		modalBizName.val('');
		modalBizName.trigger('focus');
	}

	function getInvolvePromo()
	{
		let param   = JSON.stringify({"company_uuid" : g_biz_uuid});
		let url 	= api.involvePromotion;
		let errMsg 	= '프로모션 '+label.list+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, param, buildOptionPromo, errMsg, false);
	}

	function buildOptionPromo(data)
	{
		let optionPromoDom = '<option value="">프로모션 선택</option>';
		if (!isEmpty(data) && !isEmpty(data.data) && isSuccessResp(data))
		{
			let details = data.data;
			let dataLen = details.length;

			if (dataLen > 0)
			{
				for (let i=0; i<dataLen; i++)
				{
					let uuid  = details[i].promotion_uuid;
					let title = details[i].promotion_title;

					optionPromoDom += '<option value="'+ uuid +'">'+ title +'</option>';
				}
			}
		}
		selPromo.html(optionPromoDom);
		onChangeSelectOption(selPromo);
	}

	function onChangeSelPromo()
	{
		selectedReward.empty();

		let param   = JSON.stringify({"promotion_uuid" : selPromo.val()});
		let url 	= api.involveReward;
		let errMsg 	= '리워드 '+label.list+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, param, buildOptionReward, errMsg, false);
	}

	function buildOptionReward(data)
	{
		let optionRewardDom = '<option value="">리워드 조건 생성 목록 선택</option>';
		if (!isEmpty(data) && !isEmpty(data.data) && isSuccessResp(data))
		{
			let details = data.data;
			let dataLen = details.length;

			if (dataLen > 0)
			{
				for (let i=0; i<dataLen; i++)
				{
					let uuid  = details[i].reward_uuid;
					let title = details[i].title;

					optionRewardDom += '<option value="'+ uuid +'">'+ title +'</option>';
				}
			}
		}
		selReward.html(optionRewardDom);
		onChangeSelectOption(selReward);
	}

	function onChangeSelReward()
	{
		selectedReward.empty();

		let param   = JSON.stringify({"reward_uuid" : selReward.val()});
		let url 	= api.getReward;
		let errMsg 	= '리워드 '+label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, param, buildSelectedReward, errMsg, false);
	}

	let g_min_user_limit;
	let g_max_user_limit;
	let g_duration;
	function buildSelectedReward(data)
	{
		let selectedRewardDom = '';
		if (!isEmpty(data) && !isEmpty(data.data) && isSuccessResp(data))
		{
			let detail = data.data;

			if (detail.remain_budget_ucd < 1)
			{
				sweetError(message.notEnoughBudget);
				getInvolvePromo();
				buildOptionReward();
				return;
			}

			g_duration = detail.action_duration;

			/** 프로모션 종료일로 두잇 인증기간 시작일 최대 값 세팅 **/
			doitFrom.datepicker("option", "maxDate", new Date(detail.end_date));

			let totalReward = Number(detail.person_reward) + Number(detail.group_reward);

			selectedRewardDom +=
				`<li class="reward-type clearfix">
					<p class="sub-title">
						<i class="far fa-check-square" style="color:#007aff; cursor:default;">
						</i> 선택하신  프로모션 관련 리워드 조건입니다.
					</p>
					<div class="detail-data-wrap clearfix">
						<p class="sub-tit">두잇 참여 인원</p>
						<p class="detail-data">${detail.user_limit_title}</p>
					</div>
					<div class="detail-data-wrap clearfix">
						<p class="sub-tit">인증기간</p>
						<p class="detail-data">${detail.action_duration}일</p>
					</div>
					<div class="detail-data-wrap clearfix">
						<p class="sub-tit">주간빈도</p>
						<p class="detail-data">${detail.action_dayofweek}</p>
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
						<p class="detail-data">
							${numberWithCommas(totalReward)} UCD (개인: ${numberWithCommas(detail.person_reward)} UCD / 단체: ${numberWithCommas(detail.group_reward)} UCD)
						</p>
					</div>
					<p class="sub-title"><i class="fas fa-coins" style="color:#007aff; "></i> 남은 예산</p>
					<div class="fixed">
						<p class="cap">남은 UCD는 
							<span style="font-size: 19px; font-weight: 600; color: #007aff;">${numberWithCommas(detail.remain_budget_ucd)} UCD</span> 입니다.
						</p>
					</div>
				</li>`

			selectedReward.html(selectedRewardDom);

			g_min_user_limit = detail.min_user_limit;
			g_max_user_limit = detail.max_user_limit;
		}
	}

	/** 소개 이미지/영상 라디오 선탵할 때 파일 업로드 컴포넌트 생성 **/
	function onChangeIntroType(obj)
	{
		let introType = $(obj).val();
		let introText = $("label[for='"+$(obj).prop("id")+"']").text();
		let introFileDom = '';
		introFileDom += `<p class="cap important">두잇 소개 방법 중 <span>${introText}</span>를(을) 선택하셨습니다.`;
		if (introType === 'video')
			introFileDom += `<span>영상</span> 및 썸네일을 업로드 해주세요!</p>`;
		else
			introFileDom += `<span>사진</span>을 업로드 해주세요!</p>`;
		introFileDom +=
			`<div class="filebox preview-image">
				<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>
				<input class="upload-name" value="파일선택" disabled="disabled">
				<label for="introImage">업로드</label>
				<input type="file" 
						id="introImage" 
						class="upload-hidden" 
						data-width="650" 
						data-height="650" 
						data-oper="eq" 
						onchange="onChangeValidationImage(this)">
			</div>`
		if (introType === 'video')
		{
			introFileDom +=
				`<div class="filebox preview-image">
					<p class="cap">영상</p>
					<input class="upload-name" value="파일선택" disabled="disabled" >
					<label for="introVideo">업로드</label>
					<input type="file" id="introVideo" class="upload-hidden" onchange="onChangeValidationVideo(this)">
				</div>`
		}

		introFileArea.html(introFileDom);
	}

	/** 인증예시타입 라디오 체인지 이벤트 **/
	function onChangeExampleType(obj)
	{
		exampleArea.empty();

		let exampleType = $(obj).val();
		if (exampleType === 'image')
			buildExampleImage();
		else if (exampleType === 'video')
			buildExampleVideo();
		else if (exampleType === 'voice')
			buildExampleVoice();
	}

	function buildExampleImage()
	{
		let fileDom = '';
		fileDom +=
			`<div class="filebox preview-image">
				<p class="cap important">인증 방법 중 <span>사진</span>을 선택하셨습니다. <span>사진</span>을 업로드 해주세요!</p>
				<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>
				<input class="upload-name" value="파일선택" disabled="disabled" >
				<label for="exampleFile">업로드</label>
				<input type="file" 
						id="exampleFile" 
						class="upload-hidden" 
						data-width="650" 
						data-height="650" 
						data-oper="eq" 
						onchange="onChangeValidationImage(this)">
			</div>`

		exampleArea.html(fileDom);
	}

	function buildExampleVideo()
	{
		let fileDom = '';
			`<div class="wrap">
				<p class="cap important">인증 방법 중 <span>영상</span>을 선택하셨습니다. <span>영상</span> 및 썸네일을 업로드 해주세요!</p>
				<div class="filebox preview-image">
					<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>
					<input class="upload-name" value="파일선택" disabled="disabled">
					<label for="exampleFile">업로드</label>
					<input type="file" 
							id="exampleFile" 
							class="upload-hidden" 
							data-width="650" 
							data-height="650" 
							data-oper="eq" 
							onchange="onChangeValidationImage(this)">
				</div>
				<div class="filebox preview-image">
					<p class="cap">영상</p>
					<input class="upload-name" value="파일선택" disabled="disabled">
					<label for="exampleVideo">업로드</label>
					<input type="file" id="exampleVideo" class="upload-hidden" onchange="onChangeValidationVideo(this)">
				</div>
			</div>`

		exampleArea.html(fileDom);
	}

	function buildExampleVoice()
	{
		let fileDom = '';
		fileDom +=
			`<div class="filebox preview-image">
				<p class="cap important">인증 방법 중 <span>음성 녹음</span>을 선택하셨습니다. <span>음성 녹음</span>을 업로드 해주세요!</p>
				<input class="upload-name" value="파일선택" disabled="disabled" >
				<label for="exampleFile">업로드</label>
				<input type="file" id="exampleFile" class="upload-hidden" onchange="onChangeValidationAudio(this)">
			</div>`

		exampleArea.html(fileDom);
	}

	function onSubmitDoit()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let url 	= api.createDoit;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithFormData(true, url, params(), createReqCallback, errMsg, false);
	}

	function params()
	{
		let paramTag = [];
		addedTags.find('li').each(function () {
			paramTag.push($(this).text());
		})
		let paramIntroImage 	= $("#introImage")[0].files[0];
		let paramIntroVideo 	= '';
		if ($("#introVideo").length > 0)
			paramIntroVideo 	= $("#introVideo")[0].files[0];
		let paramExample		= $("#exampleFile")[0].files[0];
		let paramExampleVideo 	= '';
		if ($("#exampleVideo").length > 0)
			paramExampleVideo	= $("#exampleVideo")[0].files[0];
		let paramExampleVoice	= '';
		if ($('input:radio[name=radio-example-type]:checked').val() === 'voice')
			paramExampleVoice	= $("#exampleFile")[0].files[0];
		let formData  = new FormData();
		formData.append('doit-title', doitTitle.val().trim());
		formData.append('company-uuid', g_biz_uuid);
		formData.append('promotion-uuid', selPromo.val().trim());
		formData.append('reward-uuid', selReward.val().trim());
		formData.append('min-user', g_min_user_limit);
		formData.append('max-user', g_max_user_limit);
		formData.append('doit-tags', paramTag.toString());
		formData.append('intro-resource-type', $('input:radio[name=radio-intro-type]:checked').val());
		formData.append('intro-image-file', paramIntroImage);
		formData.append('intro-video-file', paramIntroVideo);
		formData.append('action-start-date', doitFrom.val());
		formData.append('action-end-date', doitTo.val());
		formData.append('action-allow-start-time', startTime.val()+':00');
		formData.append('action-allow-end-time', endTime.val()+':59');
		formData.append('private-code', privateCode.val().trim());
		formData.append('action-example-resource-type', $('input:radio[name=radio-example-type]:checked').val());
		formData.append('action-example-image-file', paramExample);
		formData.append('action-example-video-file', paramExampleVideo);
		formData.append('action-example-voice-file', paramExampleVoice);
		formData.append('action-description', exampleDesc.val().trim());
		formData.append('doit-description', doitDesc.val().trim());
		if (chkExtraReward.is(':checked'))
			formData.append('group-reward-description', extraReward.val().trim());

		return formData;
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listDoit;
	}

	function validation()
	{
		let msg;
		let tagLen 				= addedTags.find('li').length;
		let introVideoDom 		= $("#introVideo");
		let introImageFile		= $("#introImage")[0].files;
		let introVideoFile;
		if (introVideoDom.length > 0)
			introVideoFile		= introVideoDom[0].files;
		let exampleVideoDom		= $("#exampleVideo");
		let example				= $("#exampleFile")[0].files;
		let exampleVideoFile;
		if (exampleVideoDom.length > 0)
			exampleVideoFile	= exampleVideoDom[0].files;

		if (isEmpty(bizName.val()))
		{
			msg = `기업명은 ${message.required}
					기업명을 ${message.select}`
			sweetToast(msg);
			scrollToTarget(bizName);
			onClickBizName();
			return false;
		}

		if (isEmpty(selPromo.val()))
		{
			msg = `프로모션은 ${message.required}
					프로모션을 ${message.select}`
			sweetToast(msg);
			scrollToTarget(selPromo);
			selPromo.trigger('focus');
			return false;
		}

		if (isEmpty(selReward.val()))
		{
			msg = `리워드 조건은  ${message.required}
					리워드 조건을 ${message.select}`
			sweetToast(msg);
			scrollToTarget(selReward);
			selReward.trigger('focus');
			return false;
		}

		if (isEmpty(doitTitle.val()))
		{
			sweetToast(`두잇명은 ${message.required}`);
			doitTitle.trigger('focus');
			return false;
		}

		if (isEmpty(doitDesc.val()))
		{
			sweetToast(`소개글은 ${message.required}`);
			doitDesc.trigger('focus');
			return false;
		}

		if (tagLen === 0)
		{
			sweetToast(`태그를 ${message.addOn}`);
			return false;
		}

		if (introImageFile.length === 0)
		{
			sweetToast(`두잇 소개 이미지는 ${message.required}`);
			return false;
		}

		if ($('input:radio[name=radio-intro-type]:checked').val() === 'video' && introVideoFile.length === 0)
		{
			sweetToast(`두잇 소개 영상은 ${message.required}`);
			return false;
		}

		if (chkExtraReward.is(':checked') && isEmpty(extraReward.val()))
		{
			sweetToast(`추가리워드를 ${message.input}`);
			extraReward.trigger('focus');
			return false;
		}

		if (isEmpty(doitFrom.val()))
		{
			sweetToast(`인증기간(시작일)은 ${message.required}`);
			doitFrom.trigger('focus');
			return false;
		}

		if (isEmpty(doitTo.val()))
		{
			sweetToast(`인증기간(종료일)은 ${message.required}`);
			doitTo.trigger('focus');
			return false;
		}

		if (isEmpty(startTime.val()))
		{
			sweetToast(`인증시간(시작)은 ${message.required}`);
			startTime.trigger('focus');
			return false;
		}

		if (isEmpty(endTime.val()))
		{
			sweetToast(`인증시간(종료)은 ${message.required}`);
			endTime.trigger('focus');
			return false;
		}

		let actionStartTime	= Number(replaceAll(startTime.val(), ':', ''));
		let actionEndTime	= Number(replaceAll(endTime.val(), ':', ''));
		if (actionStartTime > actionEndTime)
		{
			sweetToast(message.compareActionTime)
			startTime.trigger('focus');
			return false;
		}

		if (chkAccessUser.is(':checked') && isEmpty(privateCode.val()))
		{
			sweetToast(`참가코드를 ${message.input}`);
			privateCode.trigger('focus');
			return false;
		}

		if (chkAccessUser.is(':checked') && privateCode.val().trim().length !== 4)
		{
			sweetToast(message.minimumPassCode);
			privateCode.trigger('focus');
			return false;
		}

		if (example.length === 0)
		{
			sweetToast(`인증 예시는 ${message.required}`);
			return false;
		}

		if ($('input:radio[name=radio-example-type]:checked').val() === 'video' && exampleVideoFile.length === 0)
		{
			sweetToast(`인증 예시 영상은 ${message.required}`);
			return false;
		}

		if (isEmpty(exampleDesc.val()))
		{
			sweetToast(`인증 예시 설명은 ${message.required}`);
			exampleDesc.trigger('focus');
			return false;
		}

		return true;
	}
