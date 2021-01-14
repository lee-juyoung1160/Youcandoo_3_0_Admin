
	const selCategory		= $("#selCategory");
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
	const publicYn 			= $("input[name=radio-public]");
	const privateCode 		= $("#privateCode");
	/*const chkApplyJoin 		= $("#chkApplyJoin");
	const chkPrivateQuestion 	= $("#chkPrivateQuestion");
	const privateQuestion 	= $("#privateQuestion");
	const chkPublicQuestion = $("#chkPublicQuestion");
	const publicQuestion 	= $("#publicQuestion");*/
	const exampleType 		= $("input[name=radio-example-type]");
	const exampleArea 		= $("#exampleArea");
	const exampleDesc 		= $("#exampleDesc");
	const galleryWrap		= $("#galleryWrap");
	const btnSubmit			= $("#btnSubmit");

	/** modal **/
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const dataTable		= $("#dataTable");
	const modalBizName	= $("#modalBizName");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 카테고리 목록 **/
		getCategory();
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 소개 파일 영역 초기화 **/
		onChangeIntroType(introFileType.eq(0));
		/** 인증예시 파일 영역 초기화 **/
		onChangeExampleType(exampleType.eq(0));
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
		publicYn		.on('change', function () { toggleActive($(".code-wrap")); });
		exampleType		.on('change', function () { onChangeExampleType(this); });
		doitFrom		.on('change', function () { onChangeDateFrom(); });
		/*chkPrivateQuestion	.on('change', function () { toggleQuestion(this); });
		chkPublicQuestion	.on('change', function () { toggleQuestion(this); });*/
		btnSubmit		.on('click', function () { onSubmitDoit(); });
	});

	function getCategory()
	{
		let url = api.listCategory;
		let errMsg = `카테고리 목록 ${message.ajaxLoadError}`;

		ajaxRequestWithJsonData(false, url, null, getCategoryCallback, errMsg, false);
	}

	function getCategoryCallback(data)
	{
		let options = '';
		let datas = data.data;
		let i = 0;
		for (i; i<datas.length; i++)
		{
			let { category, category_uuid } = datas[i];
			let selected = category === '기타' ? 'selected' : '';
			options += `<option value="${category_uuid}" ${selected}>${category}</option>`
		}

		selCategory.html(options);

		onChangeSelectOption(selCategory);
	}

	/*function toggleQuestion(obj)
	{
		const textAreaWrap = $(obj).siblings('.textarea-wrap');
		if ($(obj).is(':checked'))
			$(textAreaWrap).show()
		else
		{
			$(textAreaWrap).hide();
			$(textAreaWrap).children('textarea').val('');
		}

		$(textAreaWrap).children('textarea').trigger('focus');
	}*/

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
		let doitToDate = getStringFormatToDate(doitFromDate, label.dash);

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
		publicYn.eq(0).prop('checked', true);
		introFileType.eq(0).prop('checked', true);
		onChangeIntroType(introFileType);
		doitTo.datepicker('option', 'disabled', true);
		exampleType.eq(0).prop('checked', true);
		/*chkApplyJoin.prop('checked', true);
		chkPrivateQuestion.prop('checked', false);
		chkPublicQuestion.prop('checked', false);*/
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
				{title: "기업명",	data: "value",	className: "cursor-pointer" }
			],
			serverSide: true,
			paging: false,
			select: false,
			scrollY: 200,
			scrollCollapse: true,
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
		let optionPromoDom = '<option data-gallery="" value="">프로모션 선택</option>';
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
					let gallery = details[i].allow_gallery_image;

					optionPromoDom += `<option data-gallery="${gallery}" value="${uuid}">${title}</option>`;
				}
			}
		}
		selPromo.html(optionPromoDom);
		onChangeSelectOption(selPromo);

		buildAllowGallery();
	}

	function onChangeSelPromo()
	{
		buildAllowGallery();

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
			let todayYmd = getStringFormatToDate(new Date(), '-');
			if (todayYmd === detail.end_date)
			{
				doitFrom.datepicker("option", "minDate", "today");
				doitFrom.datepicker("option", "maxDate", "today");
			}
			else
			{
				doitFrom.datepicker("option", "minDate", "+1");
				doitFrom.datepicker("option", "maxDate", new Date(detail.end_date));
			}

			let totalReward = Number(detail.person_reward) + Number(detail.group_reward);
			let actionDayofweek = detail.action_dayofweek;
			selectedRewardDom +=
				`<li class="reward-type clearfix">
					<p class="point-cap" style="margin-top: 10px;">
					 리워드 조건
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
						<p class="detail-data">${isEmpty(actionDayofweek) ? '-' : actionDayofweek}</p>
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
					<p class="point-cap" style="margin-top: 10px;">남은 예산</p>
					<div class="fixed">
						<p class="detail-data">남은 UCD는 
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
		introFileDom += `<p class="cap important"> <span>${introText}</span>`;
		if (introType === 'video')
			introFileDom += ` 및 <span>썸네일</span>을 업로드 해주세요!</p>`;
		else
			introFileDom += `를 업로드 해주세요!</p>`;
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

		buildAllowGallery();
	}

	function buildExampleImage()
	{
		let fileDom =
			`<div class="filebox preview-image">
				<p class="cap important"><span>이미지</span>을 업로드 해주세요!</p>
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
		let fileDom =
			`<div class="wrap">
				<p class="cap important"><span>영상</span> 및 <span>썸네일</span>을 업로드 해주세요!</p>
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
		let fileDom =
			`<div class="filebox preview-image">
				<p class="cap important"><span>음성 녹음</span>을 업로드 해주세요!</p>
				<div>
					<input class="upload-name" value="파일선택" disabled="disabled" >
					<label for="exampleFile">업로드</label>
					<input type="file" id="exampleFile" class="upload-hidden" onchange="onChangeValidationAudio(this)">
				</div>
			</div>`

		exampleArea.html(fileDom);
	}

	function buildAllowGallery()
	{
		let selectedPromo  = $("#selPromo option:selected");
		let isAllowGallery = $(selectedPromo).data('gallery');
		let exampleType    = $("input[name=radio-example-type]:checked").val();
		let radioGalleryEl =
			`<input type="radio" id="r999" name="radio-gallery-yn" value="Y" checked/>
			<label for="r999">Y<span></span></label>

			<input type="radio" id="r998" name="radio-gallery-yn" value="N"/>
			<label for="r998">N<span></span></label>`

		radioGalleryEl = (isAllowGallery === 'Y' && exampleType === 'image') ? radioGalleryEl : '<p class="detail-data">N</p>';

		galleryWrap.html(radioGalleryEl);
	}

	function onSubmitDoit()
	{
		if (validation())
			sweetConfirm(message.create, fileUploadReq);
	}

	function fileUploadReq()
	{
		let introVideo   = $("#introVideo");
		let exampleType  = $("input:radio[name=radio-example-type]:checked").val();
		let exampleFile  = $("#exampleFile");
		let exampleVideo = $("#exampleVideo");
		let url    = fileApi.doit;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('doit_intro_img', $("#introImage")[0].files[0]);
		param.append('doit_intro_vid', introVideo.length > 0 ? introVideo[0].files[0] : '');
		param.append('doit_exam_img', (exampleType === 'image' || exampleType === 'video') ? exampleFile[0].files[0] : '');
		param.append('doit_exam_vid', exampleType === 'video' ? exampleVideo[0].files[0] : '');
		param.append('doit_exam_aud', exampleType === 'voice' ? exampleFile[0].files[0] : '');

		ajaxRequestWithFormData(true, url, param, createRequest, errMsg, false);
	}

	function createRequest(data)
	{
		if (isSuccessResp(data))
		{
			let url 	= api.createDoit;
			let errMsg 	= label.submit+message.ajaxError;
			let tags = [];
			addedTags.find('li').each(function () {
				tags.push($(this).text().trim());
			})
			let isPublic = $("input[name=radio-public]:checked").val() === 'Y';
			let isAllowGallery = 'N';
			if ($('input:radio[name=radio-gallery-yn]').length > 0)
				isAllowGallery = $('input:radio[name=radio-gallery-yn]:checked').val();
			let { doit_intro_img, doit_intro_vid, doit_exam_img, doit_exam_vid, doit_exam_aud } = data.image_urls;
			let param = {
				"doit_category" : $("#selCategory option:checked").text(),
				"category_uuid" : selCategory.val(),
				"doit_title" : doitTitle.val().trim(),
				"doit_description" : doitDesc.val().trim(),
				"company_uuid" : g_biz_uuid,
				"promotion_uuid" : selPromo.val(),
				"reward_uuid" : selReward.val(),
				"min_user" : g_min_user_limit,
				"max_user" : g_max_user_limit,
				"doit_tags" : tags.toString(),
				"intro_resource_type" : $('input:radio[name=radio-intro-type]:checked').val(),
				"intro_image_file" : doit_intro_img,
				"intro_video_file" : doit_intro_vid,
				"action_start_date" : doitFrom.val(),
				"action_end_date" : doitTo.val(),
				"action_allow_start_time" : startTime.val()+':00',
				"action_allow_end_time" : endTime.val()+':59',
				"private_code" : isPublic ? '' : privateCode.val().trim(),
				"action_example_resource_type" : $('input:radio[name=radio-example-type]:checked').val(),
				"action_example_image_file" : doit_exam_img,
				"action_example_video_file" : doit_exam_vid,
				"action_example_voice_file" : doit_exam_aud,
				"action_description" : exampleDesc.val().trim(),
				"group_reward_description" : chkExtraReward.is(':checked') ? extraReward.val().trim() : '',
				"allow_gallery_image" : isAllowGallery,
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);

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

		let isPrivate = $("input[name=radio-public]:checked").val() === 'N';
		if (isPrivate && isEmpty(privateCode.val()))
		{
			sweetToast(`참가코드를 ${message.input}`);
			privateCode.trigger('focus');
			return false;
		}

		if (isPrivate && privateCode.val().trim().length !== 4)
		{
			sweetToast(message.minimumPassCode);
			privateCode.trigger('focus');
			return false;
		}

		/*if (chkPrivateQuestion.is(':checked') && isEmpty(privateQuestion.val().trim()))
		{
			sweetToast(`참여 질문은 ${message.required}`);
			privateQuestion.trigger('focus');
			return false;
		}

		if (chkPublicQuestion.is(':checked') && isEmpty(publicQuestion.val().trim()))
		{
			sweetToast(`참여 질문은 ${message.required}`);
			publicQuestion.trigger('focus');
			return false;
		}*/

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
