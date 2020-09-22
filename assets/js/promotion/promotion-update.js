
	const bizName 		 = $("#bizName");
	const promoName		 = $("#promoName");
	const budget 		 = $("#budget");
	const promoFrom	 	 = $("#promoFrom");
	const promoTo		 = $("#promoTo");
	const btnNoticeAdd	 = $("#btnNoticeAdd");
	const noticeArea	 = $("#noticeArea");
	const allowCount	 = $("#allowCount");
	const banner		 = $("#banner");
	const intro		 	 = $("#intro");
	const inputFile 	 = $("input:file");
	const isBanner		 = $("input[name=radio-banner-open]");
	const isGallery	 	 = $("#isGallery");
	const rewardTabWrap	 = $("#rewardTabWrap");
	const rewardsWrap	 = $("#rewardsWrap");
	const btnSubmit		 = $("#btnSubmit");

	/** 리워드 **/
	const btnAddReward	 = $(".reward-add-btn")

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$( () => {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 프로모션 상세정보 **/
		getDetail();
		/** 이벤트 **/
		promoFrom		.on('change', function () { onChangePromoFrom(); });
		btnNoticeAdd	.on('click', function () { onClickBtnNoticeAdd(); });
		inputFile		.on('change', function () { onChangeValidationImage(this); });
		btnAddReward	.on('click', function () { addReward(); });
		btnSubmit		.on('click', function () { onSubmitUpdatePromo(); });
	});

	function onChangePromoFrom()
	{
		promoTo.datepicker("option", "minDate", new Date(promoFrom.datepicker("getDate")));
	}

	/** 프로모션 기간 계산 **/
	/*function calculateTerm()
	{
		let fromDate = promoFrom.datepicker('getDate');
		let toDate = promoTo.datepicker('getDate');

		let diff = Math.abs(toDate.getTime() - fromDate.getTime());
		diff = Math.ceil(diff / (1000 * 3600 * 24)) +1;

		return diff;
	}*/

	function getDetail()
	{
		let param   = JSON.stringify({"promotion_idx" : idx});
		let url 	= api.detailPromotion;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, param, getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildPromoDetail(data) : sweetError(invalidResp(data));
	}

	function isPromotionClosed(_status)
	{
		let updateAvailableStatus = ['pending', 'progress'];

		return updateAvailableStatus.indexOf(_status) === -1;
	}

	let g_promo_status;
	let g_promotion_uuid;
	let g_budget;
	let g_rewards;
	function buildPromoDetail(data)
	{
		let detail 	  = data.data;
		let promoData = detail.promotion;
		g_rewards = detail.reward;

		g_promo_status = promoData.status;

		if (isPromotionClosed(promoData.status))
		{
			alert(message.cantUpdatePromo);
			location.href = page.listPromo;
		}

		g_promotion_uuid = promoData.promotion_uuid;
		g_budget = promoData.budget_ucd;

		bizName.html(promoData.nickname);

		budget.html(numberWithCommas(promoData.budget_ucd));

		buildNoticeArea(promoData);

		if (!isEmpty(promoData.banner_image_url))
		{
			let bannerImgDom =
				`<div class="upload-display">
					<div class="upload-thumb-wrap">
						<img src="${promoData.banner_image_url}" class="upload-thumb">
					</div>
				</div>`

			banner.parent().prepend(bannerImgDom);
		}
		if (!isEmpty(promoData.intro_image_url))
		{
			let introImgDom =
				`<div class="upload-display">
					<div class="upload-thumb-wrap">
						<img src="${promoData.intro_image_url}" class="upload-thumb">
					</div>
				</div>`

			intro.parent().prepend(introImgDom);
		}

		isBanner.each(function () {
			if ($(this).val() === promoData.is_banner)
				$(this).prop('checked', true);
		});

		isGallery.html(promoData.allow_gallery_image);

		if (promoData.status === 'pending')
		{
			promoName.val(promoData.promotion_title);
			promoFrom.val(promoData.start_date);
			promoTo.val(promoData.end_date);
			allowCount.val(promoData.promotion_allow_count);

			buildEditableReward();
		}
		else
		{
			$("#promoNameWrap")	.html(`<p class="detail-data">${promoData.promotion_title}</p>`);
			$("#promoDateWrap")	.html(`<p class="detail-data">${promoData.start_date} ~ ${promoData.end_date}</p>`);
			$("#allowCountWrap")	.html(`<p class="detail-data">${promoData.promotion_allow_count}</p>`);

			buildRewardTab();
		}
	}

	/** 유의사항 세팅 **/
	function buildNoticeArea(promoData)
	{
		let notices = promoData.promotion_notice;
		let noticeDom = '';
		for (let i=0; i<notices.length; i++)
		{
			noticeDom +=
				`<li>
					<p class="cap input-notice-title">유의사항 ${i+1}</p>
					<input type="text" name="promo-notice" placeholder="유의사항을 입력해주세요." value="${notices[i]}">
					<i onclick="removeNotice(this)" 
						class="far fa-times-circle" 
						style="color: #ec5c5c;font-size: 21px;vertical-align: middle;margin-left: 5px;"></i>
				</li>`
		}

		noticeArea.html(noticeDom);
	}

	/** 유의사항 추가 이벤트 **/
	function onClickBtnNoticeAdd()
	{
		let noticeLen = noticeArea.find('li').length;

		if (noticeAddValidation())
		{
			let noticeDom =
				`<li>
					<p class="cap input-notice-title">유의사항 ${noticeLen+1}</p>
					<input type="text" name="promo-notice" placeholder="유의사항을 입력해주세요.">
					<i onclick="removeNotice(this)" 
						class="far fa-times-circle" 
						style="color: #ec5c5c;font-size: 21px;vertical-align: middle;margin-left: 5px;"></i>
				</li>`

			noticeArea.append(noticeDom);
		}
	}

	function noticeAddValidation()
	{
		let noticeLen = noticeArea.find('li').length;

		if (noticeLen > 3)
		{
			sweetToast(`유의사항은 ${message.maxAddFour}`);
			return false;
		}

		return true;
	}

	/** 유의사항 Dom 삭제 **/
	function removeNotice(obj)
	{
		$(obj).parent().remove();

		$(".input-notice-title").each(function (idx) {
			$(this).text('유의사항 '+(idx+1));
		});
	}

	/**
	 * 리워드 영역 - 프로모션 대기상태 : buildEditableReward, 프로모션 진행 중 : buildRewardTab
	 * **/
	function buildRewardTab()
	{
		$(".option-guide").remove();
		rewardsWrap.empty();

		let rewardTabDom =
			`<ul id="rewardTab" class="reward-tab clearfix">`
		for (let i=0; i<g_rewards.length; i++)
		{
			let statusOn = i === 0 ? 'on' : '';
			let reward = g_rewards[i];
			rewardTabDom +=
				`<li onclick="onClickViewRewardTab(this);" data-idx="${i}" class="${statusOn}">
					<span class="tag-name">${reward.title}</span>
				</li>`
		}
		rewardTabDom +=
			`</ul>
			<ul id="rewardDetail" class="reward-list clearfix"></ul>`

		rewardsWrap.html(rewardTabDom);

		onClickViewRewardTab($("#rewardTab").find('li').eq(0));
	}

	function onClickViewRewardTab(obj)
	{
		toggleActive(obj);
		buildReward(obj)
	}

	function toggleActive(obj)
	{
		$("#rewardTab").find('li').removeClass('on');
		$(obj).addClass('on');
	}

	function buildReward(obj)
	{
		let idx = $(obj).data('idx');
		let reward = g_rewards[idx];
		let ucdInfo = reward.ucd_info[0];
		let actionDayOfWeek = isEmpty(reward.action_dayofweek) ? label.nullValue : reward.action_dayofweek;

		let detailDom =
			`<li class="reward-1">
				<div class="list-inner">
					<p class="title">
						<strong>${reward.title}</strong>
					</p>
					<div class="col-wrap clearfix">
						<div class="col-1">
							<p class="sub-title">인증기간</p>
						</div>
						<div class="col-2">
							<p class="detail-data">${reward.action_duration}일</p>
						</div>
					</div>
					<div class="col-wrap clearfix">
						<div class="col-1">
							<p class="sub-title">주간빈도</p>
						</div>
						<div class="col-2">
							<p class="detail-data">${actionDayOfWeek}</p>
						</div>
					</div>
					<div class="col-wrap clearfix">
						<div class="col-1">
							<p class="sub-title">목표달성률</p>
						</div>
						<div class="col-2">
							<p class="detail-data">${reward.goal_percent}%</p>
						</div>
					</div>
					<div class="col-wrap">
						<p class="sub-title" style="margin-bottom: 5px;">인당 UCD</p>
						<p class="detail-data">
							<table>
								<colgroup>
									<col style="width:35%;">
									<col style="width:20%;">
									<col style="width:20%;">
								</colgroup>
								<thead>
									<tr>
										<th rowspan="2">참여자 수(명)</th>
										<th colspan="2">인당 UCD</th>
									</tr>
									<tr>
										<th>개인</th>
										<th>단체</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>${numberWithCommas(ucdInfo.min)} ${label.tilde} ${numberWithCommas(ucdInfo.max)}</td>
										<td><span class="text-right">${numberWithCommas(ucdInfo.person_reward)}</span></td>
										<td><span class="text-right">${numberWithCommas(ucdInfo.group_reward)}</span></td>
									</tr>
								</tbody>
							</table>
						</p>
					</div>
				</div>
			</li>`

		$("#rewardDetail").html(detailDom);
	}

	let radioId = 100;
	function buildEditableReward()
	{
		for (let i=0; i<g_rewards.length; i++)
		{
			let rewardTabDom = '';
			let detailDom = '';
			let reward   = g_rewards[i];
			let idNum = i+1;
			let rewardId = 'reward'+idNum;
			let target = '#reward'+idNum;

			/** 리워드 탭 영역 **/
			let statusOn = i === 0 ? 'on' : '';
			rewardTabDom += '<li data-idx="'+i+'" class="'+statusOn+'">';
			rewardTabDom += 	'<span onclick="onClickRewardTab(this);"  class="tag-name btn-reward-title reward-tab" data-target="'+target+'">'+reward.title+'</span>';
			if (i>0)
				rewardTabDom += '<i onclick="deleteReward(this);" class="delete-btn far fa-times-circle delete-reward" data-target="'+target+'"></i>';
			rewardTabDom += '</li>';
			rewardTabWrap.append(rewardTabDom);

			/** 리워드 조건 영역 **/
			detailDom += '<div id="'+rewardId+'" class="pro-reward-wrap">';
			detailDom += 	'<ul class="pro-reward">';
			detailDom += 		'<li>';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="detail-data">리워드 옵션명 (*)</p>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2">';
			detailDom += 					'<div class="input-wrap">';
			detailDom += 						'<input oninput="checkInputLength(this); onKeyupRewardTitle(this);" type="text" class="length-input reward-title" placeholder="리워드 옵션명을 입력해주세요." value="'+reward.title+'" maxlength="20">';
			detailDom += 						'<p class="length-count-wrap"><span class="count-input">0</span>/20</p>';
			detailDom += 					'</div>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';
			/** 인증기간 **/
			detailDom += 		'<li>';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="detail-data" style="display: inline-block;">인증 기간 (*)</p> ';
			detailDom += 					'<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">';
			detailDom += 						'<span class="hover-text">* 최대 30일까지 가능합니다.</span>';
			detailDom += 					'</i>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2" style="height: 40px; line-height: 40px;">';
			detailDom += 					'<div class="checkbox-wrap" style="display: inline-block;">';
			let actionDuration = Number(reward.action_duration);
			if (actionDuration === 1)
			{
				detailDom +=					'<input onchange="onChangeDuration(this);" type="radio" id="rdo_'+(++radioId)+'" name="radio-duration-'+i+'" value="1" checked>';
				detailDom += 					'<label for="rdo_'+radioId+'"><span></span>1일</label>';
				detailDom +=					'<input onchange="onChangeDuration(this);" type="radio" id="rdo_'+(++radioId)+'" name="radio-duration-'+i+'" value=""> ';
				detailDom += 					'<label for="rdo_'+radioId+'"><span></span>7일 이상</label>';
				detailDom += 				'</div>';
				detailDom +=				'<p style="display: none;">';
			}
			else
			{
				detailDom +=					'<input onchange="onChangeDuration(this);" type="radio" id="rdo_'+(++radioId)+'" name="radio-duration-'+i+'" value="1">';
				detailDom += 						'<label for="rdo_'+radioId+'"><span></span>1일</label>';
				detailDom +=					'<input onchange="onChangeDuration(this);" type="radio" id="rdo_'+(++radioId)+'" name="radio-duration-'+i+'" value="" checked> ';
				detailDom += 						'<label for="rdo_'+radioId+'"><span></span>7일 이상</label>';
				detailDom +=				'</div>';
				detailDom +=				'<p style="display: inline-block;">';
			}
			detailDom += 						'<input onkeyup="initInputNumber(this); onKeyupDuration(this);" type="text" class="only-num duration" maxlength="2" value="'+reward.action_duration+'">';
			detailDom += 						'<span class="input-num-title"> 일</span>';
			detailDom += 					'</p>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';
			/** 주간빈도 **/
			detailDom += 		'<li>';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="detail-data">주간 빈도 (*)</p>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2">';
			detailDom += 					'<ul class="day-btn clearfix frequency-ul">';
			let frequencys = ['월','화','수','목','금','토','일'];
			for (let k=0; k<frequencys.length; k++)
			{
				let freq = frequencys[k];
				let actionDays = [];
				let active = 'disabled';
				if (!isEmpty(reward.action_dayofweek))
				{
					actionDays = reward.action_dayofweek.split(',');
					active = actionDays.indexOf(freq) !== -1 ? 'active' : '';
				}

				detailDom += 					'<li onclick="toggleFrequency(this);" class="frequency '+active+'">'+freq+'</li>';
			}
			detailDom += 					'</ul>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';
			/** 목표달성률 **/
			let goalRangeId = 'goalRange'+idNum;
			detailDom += 		'<li>';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="detail-data" style="display: inline-block;">목표달성률 (*)</p> ';
			detailDom += 					'<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">';
			detailDom += 						'<span class="hover-text">* 최소 80%, 최대가 100% 입니다.</span>';
			detailDom += 					'</i>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2">';
			detailDom += 					'<input id="'+goalRangeId+'" type="range" class="custom-range goal-range" readonly>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';
			/** 인당 UCD **/
			let ucdInfo = reward.ucd_info[0];
			detailDom += 		'<li>';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="detail-data">인당 UCD (*)</p>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2 pro-ucd-wrap">';
			detailDom += 					'<table>';
			detailDom += 						'<colgroup>';
			detailDom += 							'<col style="width: 35%;">';
			detailDom += 							'<col style="width: 15%;">';
			detailDom += 							'<col style="width: 15%;">';
			detailDom += 							'<col style="width: 25%;">';
			detailDom += 						'</colgroup>';
			detailDom += 						'<thead>';
			detailDom += 							'<tr>';
			detailDom += 								'<th rowspan="2">참여자 수(명)</th>';
			detailDom += 								'<th colspan="2">인당 UCD</th>';
			detailDom += 								'<th rowspan="2">총 UCD</th>';
			detailDom += 							'</tr>';
			detailDom += 							'<tr>';
			detailDom += 								'<th>개인</th>';
			detailDom += 								'<th>단체</th>';
			detailDom += 							'</tr>';
			detailDom += 						'</thead>';
			detailDom += 						'<tbody class="ucd-table-body">';
			detailDom += 							'<tr>';
			detailDom += 								'<td>';
			detailDom += 									'<input onkeyup="initInputNumber(this);" type="text" class="only-num input-left" maxlength="5" value="'+ucdInfo.min+'">';
			detailDom += 									'<span class="date-margin-text"> ~ </span>';
			detailDom += 									'<input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num input-right" maxlength="5" value="'+ucdInfo.max+'">';
			detailDom += 								'</td>';
			detailDom += 								'<td><input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num reward-ucd" maxlength="5" value="'+ucdInfo.person_reward+'"></td>';
			detailDom += 								'<td><input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num reward-ucd" maxlength="5" value="'+ucdInfo.group_reward+'"></td>';
			let totalUcd = Number(ucdInfo.max) * (Number(ucdInfo.person_reward)+Number(ucdInfo.group_reward));
			detailDom += 								'<td><span class="text-right">'+numberWithCommas(totalUcd)+'</span></td>';
			detailDom += 							'</tr>';
			detailDom += 						'</tbody>';
			detailDom += 					'</table>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';

			rewardsWrap.append(detailDom);

			/** 목표달성률 range 세팅 **/
			let goalRangeDom = $('#'+goalRangeId);
			initGoalRateRange(goalRangeDom, reward.goal_percent);
		}

		onClickRewardTab($(".reward-tab").eq(0));

		calculateInputLength();
	}

	function onChangeDuration(obj)
	{
		let durationDom = $(obj).parent().siblings();
		let durationInputEl = $(durationDom).find('.duration')

		$(durationInputEl).val('');
		$(durationInputEl).trigger('focus');
		isEmpty($(obj).val()) ? $(durationDom).css('display', 'inline-block') : $(durationDom).hide();
		initFrequency($(durationInputEl));
	}

	function onKeyupDuration(obj)
	{
		initFrequency(obj);
	}

	function initFrequency(obj)
	{
		let frequencyUl = $(obj).parents('ul.pro-reward').find('.frequency-ul');
		let radioDur = $(obj).parents('ul.pro-reward').find('input[type=radio]:checked');
		let duration = Number($(obj).val());

		$(frequencyUl).children().removeClass('active');
		$(frequencyUl).children().removeClass('disabled');

		if (!isEmpty($(radioDur).val()))
			$(frequencyUl).children().addClass('disabled');
		else
		{
			if (duration > 6)
			{
				$(frequencyUl).children().eq(0).addClass('active');
				$(frequencyUl).children().eq(1).addClass('active');
				$(frequencyUl).children().eq(2).addClass('active');
				$(frequencyUl).children().eq(3).addClass('active');
				$(frequencyUl).children().eq(4).addClass('active');
			}
			else
				$(frequencyUl).children().addClass('disabled');
		}
	}

	/** 주간빈도 버튼 active 토글 **/
	function toggleFrequency(obj)
	{
		let radioDuration = $(obj).closest('ul.pro-reward').find('input[type=radio]:checked');

		if (!isEmpty($(radioDuration).val()))
		{
			$(obj).siblings().removeClass('active');
			$(obj).addClass('active');
		}
		else
		{
			$(obj).toggleClass('active');
		}
	}

	/** 목표달성률 설정 레인지 슬라이더 **/
	function initGoalRateRange(goalRangeDom, value)
	{
		goalRangeDom.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 50,
			max: 100,
			from: value,
			step: 1,
			onStart: function(data) {
			},
			onChange: function(data) {
			}
		});
	}

	function calculateTotalUcd(obj)
	{
		let trDom 	   = $(obj).parents('tr');
		let inputDom   = trDom.find('input');
		let totalDom   = trDom.find('span').eq(1);
		let max		   = $(inputDom).eq(1).val();
		let person	   = $(inputDom).eq(2).val();
		let group	   = $(inputDom).eq(3).val();

		max 	= isEmpty(max) ? 0 : Number(max);
		person 	= isEmpty(person) ? 0 : Number(person);
		group 	= isEmpty(group) ? 0 : Number(group);

		$(totalDom).html(numberWithCommas(max*(person+group)));
	}

	/** 리워드 조건 생성하기 버튼 이벤트 **/
	function addReward()
	{
		let countReward = rewardTabWrap.find('li').length;

		if (addRewardValidation(countReward))
		{
			countReward++
			buildAddRewardTab(countReward)
			buildAddReward(countReward);
		}
	}

	function addRewardValidation(count)
	{
		if (count >= 5)
		{
			sweetToast(`리워드는 ${message.maxAddFive}`);
			return false;
		}

		return true;
	}

	let countId = 2;
	function buildAddRewardTab(count)
	{
		countId++

		if (count === 5)
			btnAddReward.hide();

		let targetDom    = '#reward'+countId;
		let title        = '리워드 옵션 명 입력';
		let rewardTabDom =
			`<li>
				<span onclick="onClickRewardTab(this);" class="tag-name btn-reward-title reward-tab" data-target="${targetDom}">${title}</span>
				<i onclick="deleteReward(this);" class="delete-btn far fa-times-circle delete-reward" data-target="${targetDom}"></i>
			</li>`

		rewardTabWrap.append(rewardTabDom);
	}

	function buildAddReward()
	{
		let domId     		= 'reward'+countId;
		let title     		= '리워드 옵션 명 입력';
		let goalRange 		= 'goalRange'+countId;
		let rewardDom = '';
		rewardDom +=
			`<div id="${domId}" class="pro-reward-wrap">
				<ul class="pro-reward">
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="cap">리워드 옵션명 (*)</p>
							</div>
							<div class="col-2">
								<div class="input-wrap">
									<input onkeyup="checkInputLength(this); onKeyupRewardTitle(this);" type="text" class="length-input reward-title" placeholder="리워드 옵션명을 입력해주세요." value="${title}" maxlength="20">
									<p class="length-count-wrap"><span class="count-input">0</span>/20</p>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="cap">인증 기간 (*)</p>
									<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">
										<span class="hover-text">* 최대 30일까지 가능합니다.</span>
									</i>
							</div>
							<div class="col-2" style="height: 40px; line-height: 40px;">
								<div class="checkbox-wrap" style="display: inline-block;">
									<input onchange="onChangeDuration(this);" type="radio" id="rdo_${++radioId}" name="radio-duration-${countId}" value="1" checked>
									<label for="rdo_${radioId}"><span></span>1일</label>
									<input onchange="onChangeDuration(this);" type="radio" id="rdo_${++radioId}" name="radio-duration-${countId}" value="">
									<label for="rdo_${radioId}"><span></span>7일 이상</label>
								</div>
								<p style="display: none;">
									<input onkeyup="initInputNumber(this); onKeyupDuration(this);" type="text" class="only-num duration" maxlength="2">
									<span class="input-num-title"> 일</span>
								</p>
							</div>
						</div>
					</li>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="cap">주간 빈도 (*)</p>
							</div>
							<div class="col-2">
								<ul class="day-btn clearfix frequency-ul">
									<li onclick="toggleFrequency(this);" class="frequency disabled">월</li>
									<li onclick="toggleFrequency(this);" class="frequency disabled">화</li>
									<li onclick="toggleFrequency(this);" class="frequency disabled">수</li>
									<li onclick="toggleFrequency(this);" class="frequency disabled">목</li>
									<li onclick="toggleFrequency(this);" class="frequency disabled">금</li>
									<li onclick="toggleFrequency(this);" class="frequency disabled">토</li>
									<li onclick="toggleFrequency(this);" class="frequency disabled">일</li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="cap" style="display: inline-block;">목표달성률 (*)</p>
								<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">
									<span class="hover-text">* 최소 80%, 최대가 100% 입니다.</span>
								</i>
							</div>
							<div class="col-2">
								<input id="${goalRange}" type="range" class="custom-range goal-range" readonly>
							</div>
						</div>
					</li>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="cap">인당 UCD (*)</p>
							</div>
							<div class="col-2 pro-ucd-wrap">
								<table>
									<colgroup>
										<col style="width: 35%;">
										<col style="width: 15%;">
										<col style="width: 15%;">
										<col style="width: 25%;">
									</colgroup>
									<thead>
										<tr>
											<th rowspan="2">참여자 수(명)</th>
											<th colspan="2">인당 UCD</th>
											<th rowspan="2">총 UCD</th>
										</tr>
										<tr>
											<th>개인</th>
											<th>단체</th>
										</tr>
									</thead>
									<tbody class="ucd-table-body">
										<tr>
											<td>
												<input onkeyup="initInputNumber(this);" type="text" class="only-num input-left" maxlength="5" value="1">
												<span class="date-margin-text"> ~ </span>
												<input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num input-right" maxlength="5">
											</td>
											<td><input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num reward-ucd" maxlength="5"></td>
											<td><input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num reward-ucd" maxlength="5"></td>
											<td><span class="text-right">-</span></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</li>
				</ul>
			</div>`

		rewardsWrap.append(rewardDom);

		initGoalRateRange($('#'+goalRange), 80);

		calculateInputLength();
	}

	/** 리워드 제목 입력하면 리워드제목 = 탭이름 이벤트 **/
	function onKeyupRewardTitle(obj)
	{
		let inputValue 			 = $(obj).val();
		let inputRewardTitleDoms = $(".reward-title");
		let btnRewardTitleDoms 	 = $(".btn-reward-title");

		inputRewardTitleDoms.each(function (index) {
			if ($(this).val() === inputValue)
				btnRewardTitleDoms.eq(index).text(inputValue);
		});
	}

	/** 리워드 조건 버튼 클릭 이벤트 **/
	function onClickRewardTab(obj)
	{
		toggleActiveRewardTab(obj);
		toggleShowRewardForm(obj);
		calculateTotalUcd($(".input-right"));
	}

	function toggleActiveRewardTab(obj)
	{
		$(obj).parent().siblings().removeClass('on');
		$(obj).parent().addClass('on');
	}

	function toggleShowRewardForm(obj)
	{
		let target 	   = $(obj).data('target');
		let rewardWrap = $(".pro-reward-wrap");

		rewardWrap.hide();
		$(target).show();
	}

	function deleteReward(obj)
	{
		let targetReward = $(obj).data('target');
		let targetTab	 = $(obj).parent();

		$(targetTab).remove();
		$(targetReward).remove();
		if ($(targetTab).hasClass('on'))
			onClickRewardTab($(".reward-tab").eq(0));
	}

	function validation()
	{
		let msg;
		let promotionNotice = $("input[name=promo-notice]");

		if ($("#promoName").length > 0 && isEmpty(promoName.val()))
		{
			sweetToast(`프로모션명은 ${message.required}`);
			promoName.trigger('focus');
			return false;
		}

		if ($("#promoFrom").length > 0 && isEmpty(promoFrom.val()))
		{
			sweetToast(`프로모션기간(시작일)은 ${message.required}`);
			promoFrom.trigger('focus');
			return false;
		}

		if ($("#promoTo").length > 0 && isEmpty(promoTo.val()))
		{
			sweetToast(`프로모션기간(종료일)은 ${message.required}`);
			promoTo.trigger('focus');
			return false;
		}

		if (promotionNotice.length === 0)
		{
			sweetToast(`유의사항을 ${message.addOn}`);
			return false;
		}

		if (promotionNotice.length > 0 && isEmptyNotice())
		{
			sweetToast(`유의사항은 ${message.required}`);
			return false;
		}

		if ($("#allowCount").length > 0 && isEmpty(allowCount.val()))
		{
			sweetToast(`프로모션 동시 참여 횟수는 ${message.required}`);
			allowCount.trigger('focus');
			return false;
		}

		if ($("#allowCount").length > 0 && Number(allowCount.val()) > 5)
		{
			sweetToast(`프로모션 동시 참여 횟수는 ${message.maxJoinPromo}`);
			allowCount.trigger('focus');
			return false;
		}

		if ($(".reward-title").length > 0 && isEmptyRewardTitle())
		{
			msg = `리워드 옵션명은 ${message.required}
					리워드 조건의 리워드 옵션명을 ${message.doubleChk}`
			sweetToast(msg);
			return false;
		}

		if ($(".duration").length > 0 && isEmptyDuration())
		{
			msg = `인증 기간은 ${message.required}
					리워드 조건의 인증 기간을 ${message.doubleChk}`
			sweetToast(msg);
			return false;
		}

		if ($(".duration").length > 0 && isInvalidDuration())
		{
			msg = `${message.invalidDuration}
					리워드 조건의 인증 기간을 ${message.doubleChk}`
			sweetToast(msg);
			return false;
		}

		if ($(".frequency").length > 0 && isEmptyFrequency())
		{
			msg = `주간 빈도는 ${message.required}
					리워드 조건의 주간 빈도를 ${message.doubleChk}`
			sweetToast(msg);
			return false;
		}

		if ($(".ucd-table-body").length > 0 && isEmptyRewardUcd())
		{
			msg = `인당 UCD는 ${message.required}
					리워드 조건의 인당 UCD 항목을 ${message.doubleChk}`
			sweetToast(msg);
			return false;
		}

		if ($(".ucd-table-body").length > 0 && isInvalidJoinUserCount())
		{
			msg = `${message.minOverMax}
					리워드 조건의 참여자 수를 ${message.doubleChk}`
			sweetToast(msg);
			return false;
		}

		if ($(".ucd-table-body").length > 0 && isOverBudget())
		{
			msg = `${message.overBudget}
					리워드 조건의 인당 UCD 입력을 ${message.doubleChk}`
			sweetToast(msg);
			return false;
		}

		return true;
	}

	function isEmptyNotice()
	{
		let result = false;
		let promotionNotice = $("input[name=promo-notice]");
		promotionNotice.each(function () {
			if (isEmpty($(this).val()))
				result = true;
		});

		return result;
	}

	function isEmptyRewardUcd()
	{
		let result = false;
		let ucdTable = $(".ucd-table-body");
		for (let i=0; i<ucdTable.length; i++)
		{
			$(ucdTable[i]).find('input').each(function () {
				if (isEmpty($(this).val()))
					result = true;
			});
		}

		return result;
	}

	function isEmptyRewardTitle()
	{
		let result = false;
		let rewardTitle = $(".reward-title");

		$(rewardTitle).each(function () {
			if (isEmpty($(this).val()))
				result = true;
		});

		return result;
	}

	function isEmptyDuration()
	{
		let result = false;
		let rewardDom = $("ul.pro-reward");
		rewardDom.each(function () {
			let radioDur = $(this).find('input[type=radio]:checked');
			let duration = $(this).find('.duration');

			if (isEmpty($(radioDur).val()) && isEmpty($(duration).val()))
				result = true;
		});

		return result;
	}

	function isInvalidDuration()
	{
		let result 		= false;
		let rewardDom = $("ul.pro-reward");
		rewardDom.each(function () {
			let radioDur = $(this).find('input[type=radio]:checked');
			let duration = $(this).find('.duration');

			if (isEmpty($(radioDur).val()))
				if ($(duration).val() < 7 || $(duration).val() > 30)
					result = true;
		});

		return result;
	}

	function isEmptyFrequency()
	{
		let result = false;
		let rewardDom = $("ul.pro-reward");

		for (let i=0; i<rewardDom.length; i++)
		{
			if (!isEmpty($(rewardDom[i]).find('input[type=radio]:checked').val())) continue;

			let activeFrequencyLen = $(rewardDom[i]).find('.frequency.active').length;

			if (Number(activeFrequencyLen) === 0)
				result = true;
		}

		return result;
	}

	function isOverBudget()
	{
		let retVal = false;
		let ucdTable = $(".ucd-table-body");
		ucdTable.each(function () {
			let totalDom = $(this).find('span')[1];
			let totalUcd = replaceAll($(totalDom).text(), ',', '');

			if (Number(totalUcd) > Number(g_budget)) retVal = true;
		});

		return retVal;
	}

	function isInvalidJoinUserCount()
	{
		let result = false;
		let ucdTable = $(".ucd-table-body");
		ucdTable.each(function () {
			let minDom = $(this).find('input')[0];
			let maxDom = $(this).find('input')[1];
			let minVal = $(minDom).val();
			let maxVal = $(maxDom).val();

			if (Number(minVal) > Number(maxVal))
				result = true;
		});

		return result;
	}

	function params()
	{
		let paramBannerFile = banner[0].files[0];
		let paramIntroFile 	= intro[0].files[0];
		let formData  = new FormData();
		formData.append("promotion-status", g_promo_status);
		formData.append("promotion-uuid", g_promotion_uuid);
		formData.append("promotion-banner-image",paramBannerFile);
		formData.append("promotion-list-image", paramIntroFile);

		/** 유의사항 파라미터 **/
		let promotionNotice = $("input[name=promo-notice]");
		let notice = [];
		promotionNotice.each(function () {
			notice.push($(this).val().trim());
		});
		formData.append("promotion_notice", JSON.stringify(notice));
		formData.append("is-banner", $('input:radio[name=radio-banner-open]:checked').val());

		if (g_promo_status === 'pending')
		{
			formData.append("promotion-title", promoName.val().trim());
			formData.append("promotion-start-date", promoFrom.val());
			formData.append("promotion-end-date", promoTo.val());
			formData.append("promotion-allow-count", allowCount.val());

			let rewardSelectDoms = rewardTabWrap.find('li');
			let rewardSelectDomLength = rewardSelectDoms.length;
			let rewards = [];
			for (let i=0; i<rewardSelectDomLength; i++)
			{
				let rewardWrap   = $(".pro-reward-wrap");
				let title 		 = $(rewardWrap[i]).find('.reward-title');
				let durationDom	 = $(rewardWrap[i]).find('.duration');
				let duration	 = isEmpty($(rewardWrap[i]).find('input[type=radio]:checked').val()) ? durationDom.val() : 1;
				let frequencyDom = $(rewardWrap[i]).find('.frequency');
				let monday		 = 'N';
				let tuesday		 = 'N';
				let wednesday	 = 'N';
				let thursday	 = 'N';
				let friday		 = 'N';
				let saturday	 = 'N';
				let sunday		 = 'N';
				let goalRate 	 = $(rewardWrap[i]).find('.goal-range');
				let ucdTable	 = $(rewardWrap[i]).find('.ucd-table-body');

				/** 인증기간 파라미터 **/
				durationDom.each(function () {
					if ($(this).hasClass('active'))
						duration = $(this).data('days');
				});

				/** 주간빈도 파라미터 **/
				frequencyDom.each(function (freqidx) {
					let frequencyYn = (!$(this).hasClass('disabled') && $(this).hasClass('active')) ? 'Y' : 'N';
					if (freqidx === 0) monday = frequencyYn;
					if (freqidx === 1) tuesday = frequencyYn;
					if (freqidx === 2) wednesday = frequencyYn;
					if (freqidx === 3) thursday = frequencyYn;
					if (freqidx === 4) friday = frequencyYn;
					if (freqidx === 5) saturday = frequencyYn;
					if (freqidx === 6) sunday = frequencyYn;
				});

				/** 인당 UCD 파라미터 **/
				let ucdInfos = [];
				$(ucdTable).find('tr').each(function () {

					let inputDom = $(this).find('input');

					if (inputDom.length > 0)
					{
						let minDom   = $(inputDom)[0];
						let maxDom   = $(inputDom)[1];
						let personDom = $(inputDom)[2];
						let groupDom  = $(inputDom)[3];

						ucdInfos.push({
							"min" : $(minDom).val()
							,"max" : $(maxDom).val()
							,"person_reward" : $(personDom).val()
							,"group_reward" : $(groupDom).val()
						});
					}
				})

				rewards.push({
					"title" 			: title.val()
					,"action-duration" 	: duration
					,"goal-rate" 		: goalRate.val()
					,"monday" 			: monday
					,"tuesday" 			: tuesday
					,"wednesday" 		: wednesday
					,"thursday" 		: thursday
					,"friday" 			: friday
					,"saturday" 		: saturday
					,"sunday" 			: sunday
					,"ucd_info"			: JSON.stringify(ucdInfos)
				});
			}

			formData.append("promotion-reward-condition", JSON.stringify(rewards));
		}

		return formData;
	}

	function onSubmitUpdatePromo()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest);
	}

	function updateRequest()
	{
		let url 	= api.updatePromotion;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithFormData(true, url, params(), updateReqCallback, errMsg, false);
	}

	function updateReqCallback(data)
	{
		sweetToastAndCallback(data, updateSuccess);
	}

	function updateSuccess()
	{
		location.href = page.listPromo;
	}
