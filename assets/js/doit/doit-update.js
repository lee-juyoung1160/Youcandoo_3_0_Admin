
	const promotion 		= $("#promotion");
	const selCategory		= $("#selCategory");
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
	const publicYn 			= $("input[name=radio-public]");
	const privateCode 		= $("#privateCode");
	const chkApplyJoin 		= $("#chkApplyJoin");
	const chkPrivateQuestion 	= $("#chkPrivateQuestion");
	const privateQuestion 	= $("#privateQuestion");
	const chkPublicQuestion = $("#chkPublicQuestion");
	const publicQuestion 	= $("#publicQuestion");
	const actionType 		= $("#actionType");
	const actionResource 	= $("#actionResource");
	const actionDesc 		= $("#actionDesc");
	const galleryWrap 		= $("#galleryWrap");
	const btnSubmit			= $("#btnSubmit");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$( () => {
		/** 카테고리 목록 **/
		getCategory();
		/** 이벤트 **/
		btnAddTag		.on('click', function () { onClickAddTag(); });
		introFileType	.on('change', function () { onChangeIntroType(this); });
		publicYn		.on('change', function () { toggleActive($(".code-wrap")); });
		chkApplyJoin	.on('change', function () { toggleApplyJoin(this); });
		chkPrivateQuestion	.on('change', function () { toggleQuestion(this); });
		chkPublicQuestion	.on('change', function () { toggleQuestion(this); });
		btnSubmit		.on('click', function () { onSubmitUpdateDoit(); });
	});

	function toggleApplyJoin(obj)
	{
		if (!$(obj).is(':checked'))
		{
			chkPrivateQuestion.prop('checked', false);
			chkPrivateQuestion.prop('disabled', true);
			toggleQuestion(chkPrivateQuestion);
			chkPublicQuestion.prop('checked', false);
			chkPublicQuestion.prop('disabled', true);
			toggleQuestion(chkPublicQuestion);
		}
		else
		{
			chkPrivateQuestion.prop('disabled', false);
			chkPublicQuestion.prop('disabled', false);
		}
	}

	function toggleQuestion(obj)
	{
		const textAreaWrap = $(obj).siblings('.textarea-wrap');
		if ($(obj).is(':checked'))
			$(textAreaWrap).show()
		else
			$(textAreaWrap).hide();

		$(textAreaWrap).children('textarea').trigger('focus');
	}

	function getCategory()
	{
		let url = api.listCategory;
		let errMsg = `카테고리 목록 ${message.ajaxLoadError}`;

		ajaxRequestWithJsonData(false, url, null, getCategoryCallback, errMsg, getDetail);
	}

	function getCategoryCallback(data)
	{
		let options = '';
		let datas = data.data;
		let i = 0;
		for (i; i<datas.length; i++)
		{
			let { category, category_uuid } = datas[i];
			options += `<option value="${category_uuid}">${category}</option>`
		}

		selCategory.html(options);
	}

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
	let g_doit_status;
	let g_is_created_by_biz;
	let introImg;
	let introResourceType;
	function buildDetail(data)
	{
		let detail = data.data;

		g_doit_status = detail.doit_status;
		g_is_created_by_biz = !isEmpty(detail.promotion_uuid);

		if (!g_is_created_by_biz)
		{
			alert(message.cantUpdateUserDoit);
			location.href = page.detailDoit+detail.idx;
		}

		if (g_doit_status !== '모집중')
		{
			alert(message.cantUpdateDoit);
			location.href = page.detailDoit+detail.idx;
		}

		g_doit_uuid = detail.doit_uuid;

		let div = '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;';
		promotion.html(label.promotion + div + detail.company_name + div +detail.promotion_title);
		doitTitle.html(detail.doit_title);
		doitDesc.val(detail.doit_description);
		selCategory.val(detail.category_uuid);
		onChangeSelectOption(selCategory);

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
		recruitCount.html(`${detail.min_user} ${label.tilde} ${detail.max_user}명`);
		extraReward.html(detail.group_reward_description);
		if (isEmpty(detail.group_reward_description))
			extraRewardWrap.remove();
		actionDate.html(`${detail.action_start_datetime} ${label.tilde} ${detail.action_end_datetime}`);
		actionTime.html(`${detail.action_allow_start_time.substring(0, 5)} ${label.tilde} ${detail.action_allow_end_time.substring(0, 5)}`);
		if (!isEmpty(detail.private_code))
		{
			publicYn.eq(1).prop("checked", true);
			privateCode.val(detail.private_code);
			$(".code-wrap").addClass("active");
		}
		else
		{
			publicYn.eq(0).prop("checked", true);
		}
		actionType.html(getStringValueForActionType(detail.action_resource_type));
		actionResource.html(buildActionResource(detail));
		actionDesc.html(detail.action_description);

		let checkedY = detail.allow_gallery_image === 'Y' ? 'checked' : '';
		let checkedN = detail.allow_gallery_image === 'N' ? 'checked' : '';
		let radioGalleryEl =
			`<input type="radio" id="c20" name="radio-gallery-yn" value="Y" ${checkedY}/>
			<label for="c20"><span></span>Y</label>

			<input type="radio" id="c21" name="radio-gallery-yn" value="N" ${checkedN}/>
			<label for="c21"><span></span>N</label>`

		let exampleType = detail.action_resource_type;
		let promotionAllowGallert = detail.promotion_allow_gallery_image;
		radioGalleryEl = (promotionAllowGallert === 'Y' && exampleType === 'image') ? radioGalleryEl : '<p class="detail-data">N</p>';

		galleryWrap.html(radioGalleryEl);

		calculateInputLength();
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
					<img class="detail-img main-banner" src="${imageUrl}" alt="썸네일 이미지입니다.">
				</div>`
		}
		else if (type === 'video')
		{
			let imageUrl = data.example_video_thumbnail_image_url;
			imageUrl = isEmpty(imageUrl) ? label.noImage : imageUrl;
			actionResourceDom +=
				`<div class="file">
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
		introFileDom += `<p class="cap important"><span>${introText}</span>`
		if (introType === 'video')
			introFileDom += ' 및 <span>썸네일</span>을 업로드 해주세요!</p>';
		else
			introFileDom += '을 업로드 해주세요!</p>';

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

		let introType = $('input:radio[name=radio-intro-type]:checked').val();
		if (introResourceType !== introType)
		{
			let introImageFile = $("#introImage")[0].files;
			if (introImageFile.length === 0)
			{
				sweetToast(`두잇 소개 이미지는 ${message.required}`);
				return false;
			}

			if (introType === 'video')
			{
				let introVideoFile = $("#introVideo")[0].files;
			    if (introVideoFile.length === 0)
				{
					sweetToast(`두잇 소개 영상은 ${message.required}`);
					return false;
				}
			}
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

		return true;
	}

	function onSubmitUpdateDoit()
	{
		if (validation())
		{
			let callback;
			let introType = $('input:radio[name=radio-intro-type]:checked').val()
			let imageFile = $("#introImage")[0].files;
			if (introType === 'image')
				callback = imageFile.length > 0 ? fileUploadReq : updateRequest;
			else
			{
				let videoFile = $("#introVideo")[0].files;
				callback = (videoFile.length > 0 || imageFile.length > 0) ? fileUploadReq : updateRequest;
			}

			sweetConfirm(message.modify, callback);
		}
	}

	function fileUploadReq()
	{
		let introVideo   = $("#introVideo");
		let url    = fileApi.doit;
		let errMsg = `이미지 등록 ${message.ajaxError}`;
		let param  = new FormData();
		param.append('doit_intro_img', $("#introImage")[0].files[0]);
		param.append('doit_intro_vid', introVideo.length > 0 ? introVideo[0].files[0] : '');

		ajaxRequestWithFormData(true, url, param, updateRequest, errMsg, false);
	}

	function updateRequest(data)
	{
		if (isEmpty(data) || isSuccessResp(data))
		{
			let url 	= api.updateDoit;
			let errMsg 	= label.modify+message.ajaxError;
			let tags = [];
			addedTags.find('li').each(function () {
				tags.push($(this).text().trim());
			})
			let isPublic = $("input[name=radio-public]:checked").val() === 'Y';
			let isAllowGallery = 'N';
			if ($('input:radio[name=radio-gallery-yn]').length > 0)
				isAllowGallery = $('input:radio[name=radio-gallery-yn]:checked').val();
			let param = {
				"doit_uuid" : g_doit_uuid,
				"doit_category" : $("#selCategory option:checked").text(),
				"category_uuid" : selCategory.val(),
				"doit_tags" : tags.toString(),
				"doit_description" : doitDesc.val().trim(),
				"intro_resource_type" : $('input:radio[name=radio-intro-type]:checked').val(),
				"private_code" : isPublic ? '' : privateCode.val().trim(),
				"allow_gallery_image" : isAllowGallery,
				"is_apply" : chkApplyJoin.is(':checked') ? 'Y' : 'N',
				"is_public_question" : chkPublicQuestion.is(':checked') ? 'Y' : 'N',
				"public_question" : chkPublicQuestion.is(':checked') ? publicQuestion.val().trim() : '',
				"is_private_question" : chkPrivateQuestion.is(':checked') ? 'Y' : 'N',
				"private_question" : chkPrivateQuestion.is(':checked') ? privateQuestion.val().trim() : '',
			}

			if (!isEmpty(data))
			{
				let { doit_intro_img, doit_intro_vid } = data.image_urls;

				if (!isEmpty(doit_intro_img))
					param["intro_image_file"] = doit_intro_img;

				if (!isEmpty(doit_intro_vid))
					param["intro_video_file"] = doit_intro_vid;
			}

			ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateReqCallback, errMsg, false);
		}
		else
			sweetToast(data.msg);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.listDoit;
	}
