
	const promotion 		= $("#promotion");
	const doitTitle			= $("#doitTitle");
	const doitDesc 			= $("#doitDesc");
	const inputTag			= $("#inputTag");
	const btnAddTag			= $("#btnAddTag");
	const addedTags			= $("#addedTags");
	const introFileType 	= $("input[name=radio-intro-type]");
	const introFileArea		= $("#introFileArea");
	const recruitCount		= $("#recruitCount");
	const extraRewardWrap	= $("#extraRewardWrap");
	const extraReward		= $("#extraReward");
	const actionDate	    = $("#actionDate");
	const actionTime	    = $("#actionTime");
	const chkAccessUser 	= $("input[name=chkAccessUser]");
	const privateCode 		= $("#privateCode");
	const actionType 		= $("#actionType");
	const actionResource 	= $("#actionResource");
	const actionDesc 		= $("#actionDesc");
	const btnSubmit			= $("#btnSubmit");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$( () => {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 두잇 상세정보 **/
		getDetail();
		/** 이벤트 **/
		btnAddTag		.on('click', function () { onClickAddTag(); });
		introFileType	.on('change', function () { onChangeIntroType(this); });
		chkAccessUser	.on('change', function () { toggleActive($(".code-wrap")); });
		btnSubmit		.on('click', function () { onSubmitUpdateDoit(); });
	});

	function getDetail()
	{
		let param   = JSON.stringify({"idx" : idx});
		let url 	= api.detailDoit;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, param, getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	let g_doit_uuid;
	let introImg;
	let introResourceType;
	function buildDetail(data)
	{
		let detail = data.data;

		if (isEmpty(detail.promotion_uuid))
		{
			alert(message.cantUpdateUserDoit);
			location.href = page.detailDoit+detail.idx;
		}

		if (detail.doit_status !== '모집중')
		{
			alert(message.cantUpdateDoit);
			location.href = page.detailDoit+detail.idx;
		}

		g_doit_uuid = detail.doit_uuid;

		let div = '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;';
		promotion.html(label.promotion + div + detail.company_name + div +detail.promotion_title);
		doitTitle.html(detail.doit_title);
		doitDesc.val(detail.doit_description);


		let tags = detail.doit_tags;
		let tagDom = '';
		if (!isEmpty(tags))
		{
			for (let i = 0; i < tags.length; i++)
			{
				if (!isEmpty(tags[i]))
				{
					let tag = replaceAll(tags[i], '#', '');
					tagDom +=
						`<li>
							#<span class="tag-name added-tag">${tag}</span>
							<i class="delete-btn far fa-times-circle" onclick="removeTagDom(this);"></i>
						</li>`
				}
			}
			addedTags.html(tagDom);
		}

		introResourceType = detail.intro_resouce_type;
		introFileType.each(function () {
			if ($(this).val() === introResourceType)
			{
				$(this).prop('checked', true);
				onChangeIntroType(this);
			}
		});

		introImg = introResourceType === 'video' ? detail.doit_video_thumbnail_image_url : detail.doit_image_url;
		introImg = isEmpty(introImg) ? label.noImage : introImg;
		buildThumbnailDom();
		recruitCount.html(detail.min_user+label.tilde+detail.max_user+'명');
		extraReward.html(detail.group_reward_description);
		if (isEmpty(detail.group_reward_description))
			extraRewardWrap.remove();
		actionDate.html(detail.action_start_datetime+label.tilde+detail.action_end_datetime);
		actionTime.html(detail.action_allow_start_time.substring(0, 5)+label.tilde+detail.action_allow_end_time.substring(0, 5));
		if (!isEmpty(detail.private_code))
		{
			chkAccessUser.prop("checked", true);
			toggleActive($(".code-wrap"));

			privateCode.val(detail.private_code);
		}

		actionType.html(getStringValueForActionType(detail.action_resource_type));
		actionResource.html(buildActionResource(detail));
		actionDesc.html(detail.action_description);
	}

	function buildThumbnailDom()
	{
		let introImgDom = '';
		introImgDom +=
			`<div class="upload-display">
					<div class="upload-thumb-wrap">
					<img src="${introImg}" class="upload-thumb">
				</div>
			</div>`
		$("#introImage").parent().prepend(introImgDom);
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
			let imageUrl = data.example_thumbnail_image_url;
			imageUrl = isEmpty(imageUrl) ? label.noImage : imageUrl;
			actionResourceDom +=
				`<div class="file">
					<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>
					<img class="detail-img main-banner" src="${imageUrl}" alt="썸네일 이미지입니다.">
				</div>`
		}
		else if (type === 'video')
		{
			let imageUrl = data.example_video_thumbnail_image_url;
			imageUrl = isEmpty(imageUrl) ? label.noImage : imageUrl;
			actionResourceDom +=
				`<div class="file">
					<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>
					<img class="detail-img main-banner" src="${imageUrl}" alt="썸네일 이미지입니다.">
				</div>
				<div class="file">
					<p class="cap">영상</p>
					<video controls>
						<source src="${data.example_video_url}">
					</video>
				</div>`
		}
		else if (type === 'voice')
		{
			actionResourceDom +=
				`<div class="file">
					<p class="cap">음성</p>
					<audio controls>
						<source src="${data.example_voice_url}">
					</audio>
				</div>`
		}

		return actionResourceDom;
	}

	function toggleActive(obj)
	{
		$(obj).toggleClass('active');
	}

	function removeTagDom(obj)
	{
		$(obj).parent().remove();
	}

	/** 소개 이미지/영상 라디오 선탵할 때 파일 업로드 컴포넌트 생성 **/
	function onChangeIntroType(obj)
	{
		let introType = $(obj).val();
		let introText = $("label[for='"+$(obj).attr("id")+"']").text();
		let introFileDom = '';
		introFileDom += `<p class="cap important">두잇 소개 방법 중 <span>${introText}</span>를(을) 선택하셨습니다.`
		if (introType === 'video')
			introFileDom += '<span>영상</span> 및 썸네일을 업로드 해주세요!</p>';
		else
			introFileDom += '<span>사진</span>을 업로드 해주세요!</p>';

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
						data-oper="eq" onchange="onChangeValidationImage(this)">
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

		if (introResourceType === introType && !isEmpty(introImg))
			buildThumbnailDom();
	}

	/** 태그 추가 이벤트 **/
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

	function validation()
	{
		let tagLen = addedTags.find('li').length;

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

		return true;
	}

	function onSubmitUpdateDoit()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		let url 	= api.updateDoit;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithFormData(true, url, params(), updateReqCallback, errMsg, false);
	}

	function params()
	{
		let paramTag = [];
		addedTags.find('li').each(function () {
			paramTag.push($(this).text().trim());
		})
		let paramIntroImage 	= $("#introImage")[0].files[0];
		let paramIntroVideo 	= '';
		if ($("#introVideo").length > 0)
			paramIntroVideo 	= $("#introVideo")[0].files[0];

		let accessCode = chkAccessUser.is(':checked') ? privateCode.val().trim() : '';

		let formData  = new FormData();
		formData.append('doit-uuid', g_doit_uuid);
		formData.append('doit-tags', paramTag.toString());
		formData.append('intro-resource-type', $('input:radio[name=radio-intro-type]:checked').val());
		formData.append('intro-image-file', paramIntroImage);
		formData.append('intro-video-file', paramIntroVideo);
		formData.append('private-code', accessCode);
		formData.append('doit-description', doitDesc.val().trim());

		return formData;
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.listDoit;
	}
