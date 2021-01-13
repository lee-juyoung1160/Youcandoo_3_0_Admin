
	/** 두잇정보 탭 **/
	const category 		= $("#category");
	const creator 		= $("#creator");
	const doitStatus 	= $("#doitStatus");
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
	const allowGallery  = $("#allowGallery");

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
			modifyDynamicUi();
		}
		else
			sweetError(invalidResp(data));
	}

	function buildDetail(data)
	{
		let detail 	 = data.data;

		doitTitle.html(detail.doit_title);
		doitStatus.addClass(getStatusColor(detail.doit_status));
		doitStatus.html(detail.doit_status);
		actionDate.html(`${detail.action_start_datetime} ${label.tilde} ${detail.action_end_datetime}`);
		category.html(detail.doit_category);

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
	}

	function getStatusColor(status)
	{
		switch (status) {
			case '모집중':
				return 'badge-yellow'
			case '모집실패':
				return 'badge-orange'
			case '개설취소':
				return 'badge-orange'
			case '개설취소(운영)':
				return 'badge-orange'
			case '진행중':
				return 'badge-green'
			case '진행종료':
				return 'badge-gray'
			case '결과발표':
				return 'badge-gray'
			case '종료':
				return 'badge-gray'
			default:
				return ''
		}
	}

	function modifyDynamicUi()
	{
		toggleApplyUserTab();
		toggleDoitMemberButtons();
		resizeTab();
	}

	function toggleDoitMemberButtons()
	{
		if (!g_is_created_by_biz || g_doit_status !== '모집중')
		{
			btnApproval.remove();
			btnReject.remove();
			btnBan.remove();
		}
	}

	function toggleApplyUserTab()
	{
		if (g_doit_status !== '모집중')
			$(".apply").remove();
	}

	function resizeTab()
	{
		let tabEls = $(".doit-detail-tab li");
		let tabLength = tabEls.length;
		let tabWidth = `calc(100%/${tabLength})`;

		$(tabEls).css('width', tabWidth)
	}
