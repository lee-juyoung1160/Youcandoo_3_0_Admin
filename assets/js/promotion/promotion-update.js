
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
	const rewardTabWrap	 = $("#rewardTabWrap");
	const rewardsWrap	 = $("#rewardsWrap");
	const btnSubmit		 = $("#btnSubmit");

	/** 리워드 **/
	const btnAddReward	 = $(".reward-add-btn")

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 프로모션 상세정보 **/
		getPromotion();
		/** 이벤트 **/
		promoFrom		.on('change', function () { onChangePromoFrom(); });
		btnNoticeAdd	.on('click', function () { onClickBtnNoticeAdd(); });
		inputFile		.on('change', function () { onChangeValidationImage(this); });
		btnAddReward	.on('click', function () { addReward(); });
		btnSubmit		.on('click', function () { onSubmitUpdatePromo(); });
	});

	function getPromotion()
	{
		$.ajax({
			url: api.detailPromotion,
			type: "POST",
			async: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"promotion_idx" : idx}),
			success: function(data) {
				if (isSuccessResp(data))
					buildPromoDetail(data);
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert(label.detailContent+message.ajaxLoadError);
			},
		});
	}

	let g_promotion_uuid;
	let g_budget;
	function buildPromoDetail(data)
	{
		let detail 	= data.data;
		let promoData  	= detail.promotion;
		let rewards = detail.reward;

		if (promoData.status !== 'pending')
		{
			alert('프로모션 '+getPromotionStatusName(promoData.status)+' 중...\n'+message.cantUpdatePromo);
			location.href = page.detailPromo+promoData.idx;
		}

		g_promotion_uuid = promoData.promotion_uuid;
		g_budget = promoData.budget_ucd;

		bizName.html(promoData.nickname);
		promoName.val(promoData.promotion_title);
		budget.html(numberWithCommas(promoData.budget_ucd)+'원');
		promoFrom.val(promoData.start_date);
		promoTo.val(promoData.end_date);
		buildNoticeArea(promoData);
		allowCount.val(promoData.promotion_allow_count);
		if (!isEmpty(promoData.banner_image_url))
		{
			let bannerImgDom = '';
			bannerImgDom += '<div class="upload-display">';
			bannerImgDom += 	'<div class="upload-thumb-wrap">';
			bannerImgDom += 		'<img src="'+promoData.banner_image_url+'" class="upload-thumb">';
			bannerImgDom += 	'</div>';
			bannerImgDom += '</div>';

			banner.parent().prepend(bannerImgDom);
		}
		if (!isEmpty(promoData.intro_image_url))
		{
			let introImgDom = '';
			introImgDom += '<div class="upload-display">';
			introImgDom += 	'<div class="upload-thumb-wrap">';
			introImgDom += 		'<img src="'+promoData.intro_image_url+'" class="upload-thumb">';
			introImgDom += 	'</div>';
			introImgDom += '</div>';

			intro.parent().prepend(introImgDom);
		}
		isBanner.each(function () {
			if ($(this).val() === promoData.is_banner)
				$(this).prop('checked', true);
		});

		buildReward(rewards);
	}

	/** 유의사항 세팅 **/
	function buildNoticeArea(promoData)
	{
		let notices = promoData.promotion_notice;
		let noticeDom = '';
		for (let i=0; i<notices.length; i++)
		{
			noticeDom += '<li>';
			noticeDom += 	'<p class="cap input-notice-title">유의사항 '+(i+1)+'</p>';
			noticeDom += 	'<input type="text" name="promo-notice" placeholder="유의사항을 입력해주세요." value="'+notices[i]+'">';
			noticeDom += 	'<i onclick="removeNotice(this)" class="far fa-times-circle" style="color: #ec5c5c;font-size: 21px;vertical-align: middle;margin-left: 5px;"></i>';
			noticeDom += '</li>';
		}

		noticeArea.html(noticeDom);
	}

	/** 유의사항 추가 이벤트 **/
	function onClickBtnNoticeAdd()
	{
		let noticeLen = noticeArea.find('li').length;

		if (noticeAddValidation())
		{
			let noticeDom = '';
			noticeDom += '<li>';
			noticeDom += 	'<p class="cap input-notice-title">유의사항 '+(noticeLen+1)+'</p>';
			noticeDom += 	'<input type="text" name="promo-notice" placeholder="유의사항을 입력해주세요.">';
			noticeDom += 	'<i onclick="removeNotice(this)" class="far fa-times-circle" style="color: #ec5c5c;font-size: 21px;vertical-align: middle;margin-left: 5px;"></i>';
			noticeDom += '</li>';

			noticeArea.append(noticeDom);
		}
	}

	function noticeAddValidation()
	{
		let noticeLen = noticeArea.find('li').length;

		if (noticeLen > 3)
		{
			alert('유의사항은 '+message.maxAddFour);
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

	/** 리워드 영역 **/
	function buildReward(rewards)
	{
		for (let i=0; i<rewards.length; i++)
		{
			let rewardTabDom = '';
			let detailDom = '';
			let reward   = rewards[i];
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
			detailDom += 					'<p class="cap">리워드 제목 (*)</p>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2">';
			detailDom += 					'<div class="input-wrap">';
			detailDom += 						'<input oninput="checkInputLength(this);" type="text" class="length-input reward-title" placeholder="제목을 입력해주세요." value="'+reward.title+'" maxlength="20">';
			detailDom += 						'<p class="length-count-wrap"><span class="count-input">0</span>/20</p>';
			detailDom += 					'</div>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';
			/** 인증기간 **/
			detailDom += 		'<li>';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="cap">인증 기간 (*)</p>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2">';
			detailDom += 					'<ul class="day-btn clearfix duration-ul">';
			let durations = [{days : 1, txt : '1일'}, {days : 7, txt : '1주'}, {days : 14, txt : '2주'}, {days : 28, txt : '4주'}];
			for (let j=0; j<durations.length; j++)
			{
				let dur = durations[j];
				let active = reward.action_duration == dur.days ? 'active' : '';

				detailDom += 					'<li onclick="onSelectDuration(this);" class="duration '+active+'" data-days="'+dur.days+'">'+dur.txt+'</li>';
			}
			detailDom += 					'</ul>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';
			/** 주간빈도 **/
			detailDom += 		'<li>';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="cap">주간 빈도 (*)</p>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2">';
			detailDom += 					'<ul class="day-btn clearfix frequency-ul">';
			let frequencys = ['월','화','수','목','금','토','일'];
			for (let k=0; k<frequencys.length; k++)
			{
				let freq = frequencys[k];
				let actionDays = reward.action_dayofweek.split(',');
				let active = actionDays.indexOf(freq) !== -1 ? 'active' : '';

				detailDom += 					'<li onclick="toggleFrequency(this);" class="frequency '+active+'">'+freq+'</li>';
			}
			detailDom += 					'</ul>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';
			/** 목표달성률 **/
			let goalRangeId = 'goalRange'+idNum;
			let goalRateId = 'goalRate'+idNum;
			detailDom += 		'<li>';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="cap">목표달성률 (*)</p>';
			detailDom += 					'<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">';
			detailDom += 						'<span class="hover-text">* 최소 80%, 최대가 100% 입니다.</span>';
			detailDom += 					'</i>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2">';
			detailDom += 					'<input id="'+goalRangeId+'" type="range" class="custom-range goal-range" readonly>';
			detailDom += 					'<input id="'+goalRateId+'" class="input-num-box goal-rate" type="text" readonly>';
			detailDom += 					'<span class="input-num-title">%</span>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';
			/** 리워드 비율 **/
			let rangeId = 'rewardRange'+idNum;
			let personalRateId = 'personalRate'+idNum;
			let groupRateId = 'groupRate'+idNum;
			detailDom += 		'<li class="reward-typ-li clearfix">';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="cap" style="display: inline-block;">리워드 비율 (*)</p>';
			detailDom += 					'<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">';
			detailDom += 						'<span class="hover-text">* 최소 10%, 최대가 90% 입니다.</span>';
			detailDom += 					'</i>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2">';
			detailDom += 					'<input id="'+rangeId+'" type="range" class="custom-range reward-range" readonly>';
			detailDom += 					'<span class="input-num-title">개인</span>';
			detailDom += 					'<input id="'+personalRateId+'" class="input-num-box personal-rate" type="text" readonly>';
			detailDom += 					'<span class="input-num-title margin-text">:</span>';
			detailDom += 					'<span class="input-num-title">단체</span>';
			detailDom += 					'<input id="'+groupRateId+'" class="input-num-box group-rate" type="text" readonly>';
			detailDom += 				'</div>';
			detailDom += 			'</div>';
			detailDom += 		'</li>';
			/** 인당 UCD **/
			let ucdInfo = reward.ucd_info;
			ucdInfo = ucdInfo.replace('[', '').replace(']', '').replace(/\\/g,'');
			ucdInfo = ucdInfo.slice(1, -1);
			let ucd = JSON.parse(ucdInfo);
			detailDom += 		'<li>';
			detailDom += 			'<div class="col-wrap clearfix">';
			detailDom += 				'<div class="col-1">';
			detailDom += 					'<p class="cap">인당 UCD (*)</p>';
			detailDom += 				'</div>';
			detailDom += 				'<div class="col-2 pro-ucd-wrap">';
			detailDom += 					'<table>';
			detailDom += 						'<thead>';
			detailDom += 							'<tr>';
			detailDom += 								'<th>참여자 수(명)</th>';
			detailDom += 								'<th>인당 UCD</th>';
			detailDom += 								'<th>총 UCD</th>';
			detailDom += 							'</tr>';
			detailDom += 						'</thead>';
			detailDom += 						'<tbody class="ucd-table-body">';
			detailDom += 							'<tr>';
			detailDom += 								'<td>';
			detailDom += 									'<input onkeyup="initInputNumber(this);" type="text" class="only-num input-left" maxlength="5" value="'+ucd.min+'">';
			detailDom += 									'<span class="date-margin-text"> ~ </span>';
			detailDom += 									'<input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num input-right" maxlength="5" value="'+ucd.max+'">';
			detailDom += 								'</td>';
			detailDom += 								'<td><input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num reward-ucd" maxlength="5" value="'+ucd.per_person_ucd+'"></td>';
			let totalUcd = Number(ucd.max) * Number(ucd.per_person_ucd);
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
			let goalRateDom  = $('#'+goalRateId);
			initGoalRateRange(goalRangeDom, goalRateDom, reward.goal_percent);
			/** 리워드비율 range 세팅 **/
			let rangeDom 	= $('#'+rangeId);
			let personalDom = $('#'+personalRateId);
			let groupDom 	= $('#'+groupRateId);
			initRewardRateRange(rangeDom, personalDom, groupDom, reward.person_percent);
		}

		onClickRewardTab($(".reward-tab").eq(0));

		calculateInputLength();
	}

	function onSelectDuration(obj)
	{
		toggleActiveDuration(obj);
		initFrequency(obj);
	}

	/** 인증기간 버튼 active 토글 **/
	function toggleActiveDuration(obj)
	{
		let durationButtons = $(obj).siblings('.duration');
		$(durationButtons).each(function () {
			$(this).removeClass('active');
		});

		$(obj).addClass('active');
	}

	function initFrequency(obj)
	{
		let durationUl  = $(obj).parents('ul.pro-reward').find('.duration-ul');
		let frequencyUl = $(obj).parents('ul.pro-reward').find('.frequency-ul');
		let duration = 1;

		$(durationUl).children().each(function () {
			if ($(this).hasClass('active'))
				duration = $(this).data('days');
		});

		$(frequencyUl).children().removeClass('active');

		/** 인증기간 1일이면 주간빈도 월요일로 기본값(validation 피하기용..) **/
		if (Number(duration) === 1)
			$(frequencyUl).children().eq(0).addClass('active');
		else
		{
			$(frequencyUl).children().eq(0).addClass('active');
			$(frequencyUl).children().eq(1).addClass('active');
			$(frequencyUl).children().eq(2).addClass('active');
			$(frequencyUl).children().eq(3).addClass('active');
			$(frequencyUl).children().eq(4).addClass('active');
		}
	}

	/** 주간빈도 버튼 active 토글 **/
	function toggleFrequency(obj)
	{
		let durationUl = $(obj).parents('ul.pro-reward').find('.duration-ul');
		let duration = 1;

		$(durationUl).children().each(function () {
			if ($(this).hasClass('active'))
				duration = $(this).data('days');
		});

		if (duration === 1)
		{
			$(obj).siblings().removeClass('active');
			$(obj).addClass('active');
		}
		else
			$(obj).toggleClass('active');
	}

	/** 목표달성률 설정 레인지 슬라이더 **/
	function initGoalRateRange(goalRangeDom, goalRateDom, value)
	{
		goalRangeDom.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 80,
			max: 100,
			from: value,
			step: 1,
			onStart: function(data) {
				goalRateDom.prop("value", data.from);
			},
			onChange: function(data) {
				goalRateDom.prop("value", data.from);
			}
		});
	}

	/** 개인+그룹일 때 리워드 분배 비율 설정 레인지 슬라이더 **/
	function initRewardRateRange(rangeDom, personalDom, groupDom, value)
	{
		rangeDom.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 10,
			max: 90,
			from: value,
			step: 10,
			onStart: function(data) {
				personalDom.prop("value", data.from);
				groupDom.prop("value", 100 - data.from);
			},
			onChange: function(data) {
				personalDom.prop("value", data.from);
				groupDom.prop("value", 100 - data.from);
			}
		});
	}

	function calculateTotalUcd(obj)
	{
		let trDom 	   = $(obj).parents('tr');
		let inputDom   = trDom.find('input');
		let totalDom   = trDom.find('span').eq(1);
		let max		   = 0;
		let ucd		   = 0;

		$(inputDom).each(function (index) {
			if (index === 1)
				max = $(this).val();
			else if (index === 2)
				ucd = $(this).val();
		})

		$(totalDom).html(numberWithCommas(max*ucd));
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
			alert('리워드는 '+message.maxAddFive);
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
		let rewardTabDom = '';
		rewardTabDom += '<li>';
		rewardTabDom += 	'<span onclick="onClickRewardTab(this);" class="tag-name btn-reward-title reward-tab" data-target="'+targetDom+'">'+title+'</span>';
		rewardTabDom += 	'<i onclick="deleteReward(this);" class="delete-btn far fa-times-circle delete-reward" data-target="'+targetDom+'"></i>';
		rewardTabDom += '</li>';

		rewardTabWrap.append(rewardTabDom);
	}

	function buildAddReward()
	{
		let domId     		= 'reward'+countId;
		let title     		= '리워드 옵션 명 입력';
		let goalRange 		= 'goalRange'+countId;
		let goalRate  		= 'goalRate'+countId;
		let rewardRange		= 'rewardRange'+countId;
		let personalRate  	= 'personalRate'+countId;
		let groupRate  		= 'groupRate'+countId;
		let rewardDom = '';
		rewardDom += '<div id="'+domId+'" class="pro-reward-wrap">';
		rewardDom += 	'<ul class="pro-reward">';
		rewardDom += 		'<li>';
		rewardDom += 			'<div class="col-wrap clearfix">';
		rewardDom += 				'<div class="col-1">';
		rewardDom += 					'<p class="cap">리워드 제목 (*)</p>';
		rewardDom += 				'</div>';
		rewardDom += 				'<div class="col-2">';
		rewardDom += 					'<div class="input-wrap">';
		rewardDom += 						'<input onkeyup="checkInputLength(this); onKeyupRewardTitle(this);" type="text" class="length-input reward-title" placeholder="제목을 입력해주세요." value="'+title+'" maxlength="20">';
		rewardDom += 						'<p class="length-count-wrap"><span class="count-input">0</span>/20</p>';
		rewardDom += 					'</div>';
		rewardDom += 				'</div>';
		rewardDom += 			'</div>';
		rewardDom += 		'</li>';
		rewardDom += 		'<li>';
		rewardDom += 			'<div class="col-wrap clearfix">';
		rewardDom += 				'<div class="col-1">';
		rewardDom += 					'<p class="cap">인증 기간 (*)</p>';
		rewardDom += 				'</div>';
		rewardDom += 				'<div class="col-2">';
		rewardDom += 					'<ul class="day-btn clearfix duration-ul">';
		rewardDom += 						'<li onclick="onSelectDuration(this);" class="duration" data-days="1">1일</li>';
		rewardDom += 						'<li onclick="onSelectDuration(this);" class="duration active" data-days="7">1주</li>';
		rewardDom += 						'<li onclick="onSelectDuration(this);" class="duration" data-days="14">2주</li>';
		rewardDom += 						'<li onclick="onSelectDuration(this);" class="duration" data-days="28">4주</li>';
		rewardDom += 					'</ul>';
		rewardDom += 				'</div>';
		rewardDom += 			'</div>';
		rewardDom += 		'</li>';
		rewardDom += 		'<li>';
		rewardDom += 			'<div class="col-wrap clearfix">';
		rewardDom += 				'<div class="col-1">';
		rewardDom += 					'<p class="cap">주간 빈도 (*)</p>';
		rewardDom += 				'</div>';
		rewardDom += 				'<div class="col-2">';
		rewardDom += 					'<ul class="day-btn clearfix frequency-ul">';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency active">월</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency active">화</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency active">수</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency active">목</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency active">금</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency">토</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency">일</li>';
		rewardDom += 					'</ul>';
		rewardDom += 				'</div>';
		rewardDom += 			'</div>';
		rewardDom += 		'</li>';
		rewardDom += 		'<li>';
		rewardDom += 			'<div class="col-wrap clearfix">';
		rewardDom += 				'<div class="col-1">';
		rewardDom += 					'<p class="cap" style="display: inline-block;">목표달성률 (*)</p>';
		rewardDom += 					'<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">';
		rewardDom += 						'<span class="hover-text">* 최소 80%, 최대가 100% 입니다.</span>';
		rewardDom += 					'</i>';
		rewardDom +=	 			'</div>';
		rewardDom +=	 			'<div class="col-2">';
		rewardDom += 					'<input id="'+goalRange+'" type="range" class="custom-range goal-range" readonly>';
		rewardDom += 					'<input id="'+goalRate+'" class="input-num-box goal-rate" type="text" readonly>';
		rewardDom += 					'<span class="input-num-title">%</span>';
		rewardDom += 				'</div>';
		rewardDom += 			'</div>';
		rewardDom += 		'</li>';
		rewardDom += 		'<li class="reward-typ-li clearfix">';
		rewardDom += 			'<div class="col-wrap clearfix">';
		rewardDom += 				'<div class="col-1">';
		rewardDom += 					'<p class="cap" style="display: inline-block;">리워드 비율 (*)</p>';
		rewardDom += 					'<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">';
		rewardDom += 						'<span class="hover-text">* 최소 10%, 최대가 90% 입니다.</span>';
		rewardDom += 					'</i>';
		rewardDom += 				'</div>';
		rewardDom += 				'<div class="col-2">';
		rewardDom += 					'<input id="'+rewardRange+'" type="range" class="custom-range reward-range" readonly>';
		rewardDom += 					'<span class="input-num-title">개인</span>';
		rewardDom += 					'<input id="'+personalRate+'" class="input-num-box personal-rate" type="text" readonly>';
		rewardDom += 					'<span class="input-num-title margin-text">:</span>';
		rewardDom += 					'<span class="input-num-title">단체</span>';
		rewardDom += 					'<input id="'+groupRate+'" class="input-num-box group-rate" type="text" readonly>';
		rewardDom += 				'</div>';
		rewardDom += 			'</div>';
		rewardDom += 		'</li>';
		rewardDom += 		'<li>';
		rewardDom += 			'<div class="col-wrap clearfix">';
		rewardDom += 				'<div class="col-1">';
		rewardDom += 					'<p class="cap">인당 UCD (*)</p>';
		rewardDom += 				'</div>';
		rewardDom += 				'<div class="col-2 pro-ucd-wrap">';
		rewardDom += 					'<table>';
		rewardDom += 						'<thead>';
		rewardDom += 							'<tr>';
		rewardDom += 								'<th>참여자 수(명)</th>';
		rewardDom += 								'<th>인당 UCD</th>';
		rewardDom += 								'<th>총 UCD</th>';
		rewardDom += 							'</tr>';
		rewardDom += 						'</thead>';
		rewardDom += 						'<tbody class="ucd-table-body">';
		rewardDom += 							'<tr>';
		rewardDom += 								'<td>';
		rewardDom += 									'<input onkeyup="initInputNumber(this);" type="text" class="only-num input-left" maxlength="5" value="1">';
		rewardDom += 									'<span class="date-margin-text"> ~ </span>';
		rewardDom += 									'<input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num input-right" maxlength="5" value="10">';
		rewardDom += 								'</td>';
		rewardDom += 								'<td><input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num reward-ucd" maxlength="5" value="10"></td>';
		rewardDom += 								'<td><span class="text-right">100</span></td>';
		rewardDom += 							'</tr>';
		rewardDom += 						'</tbody>';
		rewardDom += 					'</table>';
		rewardDom += 				'</div>';
		rewardDom += 			'</div>';
		rewardDom += 		'</li>';
		rewardDom += 	'</ul>';
		rewardDom += '</div>';

		rewardsWrap.append(rewardDom);

		initGoalRateRange($('#'+goalRange), $('#'+goalRate), 85);

		initRewardRateRange($('#'+rewardRange), $('#'+personalRate), $('#'+groupRate), 50);

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
		let promotionNotice = $("input[name=promo-notice]");

		if (isEmpty(promoName.val()))
		{
			alert('프로모션명은 ' + message.required);
			promoName.focus();
			return false;
		}

		if (isEmpty(promoFrom.val()))
		{
			alert('프로모션기간(시작일)은 ' + message.required);
			promoFrom.focus();
			return false;
		}

		if (isEmpty(promoTo.val()))
		{
			alert('프로모션기간(종료일)은 ' + message.required);
			promoTo.focus();
			return false;
		}

		if (promotionNotice.length === 0)
		{
			alert('유의사항을 ' + message.needMore);
			return false;
		}

		if (promotionNotice.length > 0 && isEmptyNotice())
		{
			alert('유의사항은 ' + message.required);
			return false;
		}

		/*if (isOverDuration())
		{
			alert(message.overDuration+'\n리워드 조건의 인증 기간을 '+message.doubleChk);
			return false;
		}*/

		if (isEmptyFrequency())
		{
			alert('주간 빈도는 '+message.required+'\n리워드 조건의 주간 빈도를 '+message.doubleChk);
			return false;
		}

		if (isEmptyRewardUcd())
		{
			alert('인당 UCD는 '+message.required+'\n리워드 조건의 인당 UCD 입력을 '+message.doubleChk);
			return false;
		}

		if (isInvalidJoinUserCount())
		{
			alert(message.minOverMax+'\n리워드 조건의 참여자 수를 '+message.doubleChk);
			return false;
		}

		if (isOverBudget())
		{
			alert(message.overBudget+'\n리워드 조건의 인당 UCD 입력을 '+message.doubleChk);
			return false;
		}

		return true;
	}

	function isEmptyNotice()
	{
		let retVal = false;
		let promotionNotice = $("input[name=promo-notice]");
		promotionNotice.each(function () {
			if (isEmpty($(this).val()))
				retVal = true;
		});

		return retVal;
	}

	function isEmptyRewardUcd()
	{
		let retVal = false;
		let ucdTable = $(".ucd-table-body");
		let rewardSelectDoms = rewardTabWrap.find('li');
		let rewardSelectDomLength = rewardSelectDoms.length;
		for (let i=0; i<rewardSelectDomLength; i++)
		{
			$(ucdTable[i]).find('input').each(function () {
				if (isEmpty($(this).val())) retVal = true;
			});
		}

		return retVal;
	}

	/*function isOverDuration()
	{
		let retVal 		= false;
		let promoTerm 	= calculateTerm();
		let btnDuration	= $(".duration");
		btnDuration.each(function () {
			if ($(this).hasClass('active'))
			{
				let duration = $(this).data('days');

				if (duration > promoTerm)
					retVal = true;
			}
		});

		return retVal;
	}*/

	function isInvalidJoinUserCount()
	{
		let retVal = false;
		let ucdTable = $(".ucd-table-body");
		ucdTable.each(function () {
			let minDom = $(this).find('input')[0];
			let maxDom = $(this).find('input')[1];
			let minVal = $(minDom).val();
			let maxVal = $(maxDom).val();

			if (Number(minVal) > Number(maxVal)) retVal = true;
		});

		return retVal;
	}

	function onChangePromoFrom()
	{
		promoTo.datepicker("option", "minDate", new Date(promoFrom.datepicker("getDate")));
	}

	/** 프로모션 기간 계산 **/
	function calculateTerm() {
		let fromDate = promoFrom.datepicker('getDate');
		let toDate = promoTo.datepicker('getDate');

		let diff = Math.abs(toDate.getTime() - fromDate.getTime());
		diff = Math.ceil(diff / (1000 * 3600 * 24)) +1;

		return diff;
	}

	function isEmptyFrequency()
	{
		let retVal = false;
		let rewardDom = $("ul.pro-reward");
		let rewardSelectDoms = rewardTabWrap.find('li');
		let rewardSelectDomLength = rewardSelectDoms.length;
		for (let i=0; i<rewardSelectDomLength; i++)
		{
			let activeDuration = $(rewardDom[i]).find('.duration.active');
			let activeFrequency = $(rewardDom[i]).find('.frequency.active');
			let activeFrequencyLen = activeFrequency.length;

			if ($(activeDuration).data('days') > 1 && activeFrequencyLen == 0)
					retVal = true;
		}

		return retVal;
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

	function params()
	{
		let paramBannerFile = banner[0].files[0];
		let paramIntroFile 	= intro[0].files[0];
		let formData  = new FormData();
		formData.append("promotion-uuid", g_promotion_uuid);
		formData.append("promotion-title", promoName.val().trim());
		formData.append("promotion-start-date", promoFrom.val());
		formData.append("promotion-end-date", promoTo.val());

		/** 유의사항 파라미터 **/
		let promotionNotice = $("input[name=promo-notice]");
		let notice = [];
		promotionNotice.each(function () {
			notice.push($(this).val().trim());
		});
		formData.append("promotion_notice", JSON.stringify(notice));

		formData.append("promotion-allow-count", allowCount.val());
		formData.append("promotion-banner-image",paramBannerFile);
		formData.append("promotion-list-image", paramIntroFile);
		formData.append("is-banner", $('input:radio[name=radio-banner-open]:checked').val());

		let rewardSelectDoms = rewardTabWrap.find('li');
		let rewardSelectDomLength = rewardSelectDoms.length;
		let rewards = [];
		for (let i=0; i<rewardSelectDomLength; i++)
		{
			let rewardWrap   = $(".pro-reward-wrap");
			let title 		 = $(rewardWrap[i]).find('.reward-title');
			let durationDom	 = $(rewardWrap[i]).find('.duration');
			let duration	 = 1;
			let frequencyDom = $(rewardWrap[i]).find('.frequency');
			let monday		 = 'N';
			let tuesday		 = 'N';
			let wednesday	 = 'N';
			let thursday	 = 'N';
			let friday		 = 'N';
			let saturday	 = 'N';
			let sunday		 = 'N';
			let goalRate 	 = $(rewardWrap[i]).find('.goal-rate');
			let personalRate = $(rewardWrap[i]).find('.personal-rate');
			let groupRate 	 = $(rewardWrap[i]).find('.group-rate');
			let ucdTable	 = $(rewardWrap[i]).find('.ucd-table-body');

			/** 인증기간 파라미터 **/
			durationDom.each(function () {
				if ($(this).hasClass('active'))
					duration = $(this).data('days');
			});

			/** 주간빈도 파라미터 **/
			frequencyDom.each(function (freqidx) {
				let frequencyYn = $(this).hasClass('active') ? 'Y' : 'N';
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
					let minDom = $(inputDom)[0];
					let maxDom = $(inputDom)[1];
					let ucdDom = $(inputDom)[2];

					ucdInfos.push({
						"min" : $(minDom).val()
						,"max" : $(maxDom).val()
						,"per_person_ucd" : $(ucdDom).val()
					});
				}
			})

			rewards.push({
				"title" 			: title.val()
				,"action-duration" 	: duration
				,"goal-rate" 		: goalRate.val()
				,"personal-rate" 	: personalRate.val()
				,"group-rate" 		: groupRate.val()
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
		return formData;
	}

	function onSubmitUpdatePromo()
	{
		if (validation())
		{
			if (confirm(message.modify))
			{
				$.ajax({
					url: api.updatePromotion,
					type: "POST",
					processData: false,
					contentType: false,
					headers: headers,
					dataType: 'json',
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listPromo
					},
					error: function (request, status) {
						alert(label.modify+message.ajaxError);
					}
				});
			}
		}
	}


