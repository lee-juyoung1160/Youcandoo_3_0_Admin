
	const bizName 		  = $("#bizName");
	const promoName		  = $("#promoName");
	const promoFrom	 	  = $("#promoFrom");
	const promoTo		  = $("#promoTo");
	const inputFile 	  = $("input:file");
	const budget 		  = $("#budget");
	const banner		  = $("#banner");
	const thumbnail		  = $("#thumbnail");
	const btnSubmit		  = $("#btnSubmit");
	const frequency		  = $("#frequency");
	const doitType		  = $("input[name=radio-doit-type]");
	const isBanner		  = $("input[name=radio-banner-open]");
	/*const rewardListTitle = $("#rewardListTitle");*/
	const btnNoticeAdd	  = $("#btnNoticeAdd");
	const noticeArea	  = $("#noticeArea");
	const allowCount	  = $("#allowCount");
	/*const maxUserLimit	  = $("#maxUserLimit");*/

	/** 리워드 입력 modal **/
	const modalInputReward	= $("#modalInputReward");
	const btnAddReward 		= $("#btnAddReward");
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const modalRewardTitle 	= $("#modalRewardTitle");
	const minUser			= $("#minUser");
	const maxUser			= $("#maxUser");
	const certDays			= $(".cert-days");
	const certCount  		= $("#certCount");
	const goalRate  		= $("#goalRate");
	const maxUcd  		 	= $("#maxUcd");
	const individualRate  	= $("#individualRate");
	const groupRate  		= $("#groupRate");
	const btnRewardModalSubmit	= $("#btnRewardModalSubmit");
	/** 리워드 입력 보기 modal **/
	const modalReadReward		= $("#modalReadReward");
	const modalReadTitle		= $("#modalReadTitle");
	const modalReadMinMaxUser	= $("#modalReadMinMaxUser");
	const modalReadDuration		= $("#modalReadDuration");
	const modalReadCertCount	= $("#modalReadCertCount");
	const modalReadGoalRate		= $("#modalReadGoalRate");
	const modalReadMaxUcd		= $("#modalReadMaxUcd");
	const modalReadRewardRate	= $("#modalReadRewardRate");
	const modalReadFrequency	= $("#modalReadFrequency");

	$(document).ready(function () {
		inputFile			.on('change', function () { onChangeValidationImage(this); });
		btnAddReward		.on('click', function () { modalFadeinInPromotion(); });
		modalCloseBtn		.on('click', function () { modalFadeout(); });
		modalLayout			.on('click', function () { modalFadeout(); });
		dayButtons			.on('click', function () { toggleActive(this); });
		btnSubmit			.on('click', function () { onSubmitPromo(); });
		btnRewardModalSubmit.on('click', function () { onSubmitRewardModal(); });
		//rewardFrom			.on('change', function () { onChangeRewardFrom(); });
		//rewardTo			.on('change', function () { onChangeRewardTo(); });
		certDays			.on('click', function () { toggleCertDays(this); });
		promoFrom			.on('change', function () { onChangePromoFrom(); });
		bizName				.on('keyup', function () { onKeyupBizName(); });
		btnNoticeAdd		.on('click', function () { onClickBtnNoticeAdd(); });

		initInputDatepicker();
		initComponent();
		rewardRateRange();
		goalRateRange();
	});

	function toggleCertDays(obj)
	{
		certDays.removeClass('active');
		$(obj).addClass('active');
	}

	function modalFadeinInPromotion()
	{
		modalInputReward.fadeIn();
		modalLayout.fadeIn();
		initModal();
	}

	/** 목표달성률 레인지 슬라이더 **/
	function goalRateRange()
	{
		$("#goalRange").ionRangeSlider({
			skin: "round",
			type: "single",
			min: 80,
			max: 100,
			from: 80,
			step: 1,
			onStart: function(data) {
				goalRate.prop("value", data.from);
			},
			onChange: function(data) {
				goalRate.prop("value", data.from);
			}
		});
	}

	/** 개인+그룹일 때 리워드 분배 비율 설정 레인지 슬라이더 **/
	function rewardRateRange()
	{
		$("#rewardRange").ionRangeSlider({
			skin: "round",
			type: "single",
			min: 10,
			max: 90,
			from: 50,
			step: 10,
			onStart: function(data) {
				individualRate.prop("value", data.from);
				groupRate.prop("value", 100 - data.from);
			},
			onChange: function(data) {
				individualRate.prop("value", data.from);
				groupRate.prop("value", 100 - data.from);
			}
		});
	}

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
			alert('유의사항은 '+message.maxNotice);
			return false;
		}

		return true;
	}

	function removeNotice(obj)
	{
		$(obj).parent().remove();

		$(".input-notice-title").each(function (idx) {
			console.log(idx)
			console.log($(this).text())
			$(this).text('유의사항 '+(idx+1));
		});
	}

	/*function onChangeRewardFrom()
	{
		if (isEmpty(promoFrom.val()))
		{
			alert('프로모션 기간(시작일)을 먼저 ' + message.select);
			rewardFrom.val('');
			return;
		}

		rewardTo.datepicker("option", "minDate", new Date(rewardFrom.datepicker("getDate")));
	}

	function onChangeRewardTo()
	{
		if (isEmpty(promoFrom.val()))
		{
			alert('프로모션 기간(시작일)을 ' + message.select);
			rewardTo.val('');
			return;
		}

		if (isEmpty(promoTo.val()))
		{
			alert('프로모션 기간(종료일)을 ' + message.select);
			rewardTo.val('');
			return;
		}
	}*/

	function onChangePromoFrom()
	{
		promoTo.datepicker("option", "minDate", new Date(promoFrom.datepicker("getDate")));
	}

	function initComponent()
	{
		bizName.focus();
		bizName.val('');
		promoName.val('');
		budget.val('');
		doitType.eq(0).prop("checked", true);
		isBanner.eq(0).prop("checked", true);
	}

	function initModal()
	{
		modalRewardTitle.val('');
		minUser.val('');
		maxUser.val('');
		//rewardFrom.val('');
		//rewardTo.val('');
		//rewardFrom.datepicker("option", "minDate", new Date(promoFrom.datepicker("getDate")));
		//rewardFrom.datepicker("option", "maxDate", new Date(promoTo.datepicker("getDate")));
		//rewardTo.datepicker("option", "maxDate", new Date(promoTo.datepicker("getDate")));
		certCount.val('');
		maxUcd.val('');
		frequency.find('li').each(function () {
			$(this).removeClass('active');
		});
		toggleCertDays(certDays.eq(0));
	}

	function validation()
	{
		let bannerFile		= banner[0].files;
		let thumbnailFile	= thumbnail[0].files;
		let rewardList 		= $("#rewardListArea").find('li');
		let promotionNotice = $("input[name=promo-notice]");

		if (isEmpty(bizName.val()))
		{
			alert('회사명은 ' + message.required);
			bizName.focus();
			return false;
		}

		if (isEmpty(promoName.val()))
		{
			alert('프로모션명은 ' + message.required);
			promoName.focus();
			return false;
		}

		if (isEmpty(budget.val()))
		{
			alert('예산은 ' + message.required);
			budget.focus();
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

		if (isEmpty(allowCount.val()))
		{
			alert('참여가능 횟수는 ' + message.required);
			allowCount.focus();
			return false;
		}

		/*if (isEmpty(maxUserLimit.val()))
		{
			alert('최대 참여 인원은 ' + message.required);
			maxUserLimit.focus();
			return false;
		}*/

		if (bannerFile.length === 0)
		{
			alert('배너 이미지는 ' + message.required);
			return false;
		}

		if (thumbnailFile.length === 0)
		{
			alert('썸내일 이미지는 ' + message.required);
			return false;
		}

		if (rewardList.length === 0)
		{
			alert(message.createReward);
			modalFadein();
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
		})

		return retVal;
	}

	function params()
	{
		let rewardList 			= $('#rewardListArea').find('li');
		let paramBannerFile 	= banner[0].files[0];
		let paramThumbnailFile 	= thumbnail[0].files[0];
		let formData  = new FormData();
		formData.append("company-name", bizName.val().trim());
		formData.append("promotion-title", promoName.val().trim());
		formData.append("promotion-budget-ucd", budget.val().trim());
		formData.append("promotion-start-date", promoFrom.val().trim());
		formData.append("promotion-end-date", promoTo.val().trim());
		formData.append("promotion-banner-image",paramBannerFile);
		formData.append("promotion-list-image", paramThumbnailFile);
		/*formData.append("promotion-doit-type", $('input:radio[name=radio-doit-type]:checked').val());*/
		formData.append("is-banner", $('input:radio[name=radio-banner-open]:checked').val());
		formData.append("promotion-allow-count", allowCount.val().trim());

		let promotionNotice = $("input[name=promo-notice]");
		let notice = [];
		promotionNotice.each(function () {
			notice.push($(this).val().trim());
		});
		formData.append("promotion_notice", JSON.stringify(notice));

		let reward = [];
		rewardList.each(function () {
			let inputEl 	= $(this).find('input');
			let titleEl 	= $(inputEl)[0];
			let minUserEl 	= $(inputEl)[1];
			let maxUserEl 	= $(inputEl)[2];
			let durationEl 	= $(inputEl)[3];
			let certCountEl = $(inputEl)[4];
			let goalRateEl  = $(inputEl)[5];
			let maxUcdEl 	= $(inputEl)[6];
			let individualEl  = $(inputEl)[7];
			let groupEl 	= $(inputEl)[8];
			let mondayEl 	= $(inputEl)[9];
			let tuesdayEl 	= $(inputEl)[10];
			let wednesdayEl = $(inputEl)[11];
			let thursdayEl  = $(inputEl)[12];
			let fridayEl 	= $(inputEl)[13];
			let saturdayEl  = $(inputEl)[14];
			let sundayEl 	= $(inputEl)[15];

			reward.push({
				"title" 			: $(titleEl).data('title')
				,"min-user-limit" 	: $(minUserEl).data('minuser')
				,"max-user-limit" 	: $(maxUserEl).data('maxuser')
				,"action-duration" 	: $(durationEl).data('duration')
				,"action-count" 	: $(certCountEl).data('certcount')
				,"goal-rate" 		: $(goalRateEl).data('goalrate')
				,"ucd-per-person" 	: $(maxUcdEl).data('maxucd')
				,"individual-rate" 	: $(individualEl).data('individual')
				,"group-rate" 		: $(groupEl).data('group')
				,"monday" 			: $(mondayEl).data('monday')
				,"tuesday" 			: $(tuesdayEl).data('tuesday')
				,"wednesday" 		: $(wednesdayEl).data('wednesday')
				,"thursday" 		: $(thursdayEl).data('thursday')
				,"friday" 			: $(fridayEl).data('friday')
				,"saturday" 		: $(saturdayEl).data('saturday')
				,"sunday" 			: $(sundayEl).data('sunday')
			});
		});

		formData.append("promotion-reward-condition", JSON.stringify(reward));

		return formData;
	}

	function onSubmitPromo()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createPromotion,
					type: "POST",
					processData: false,
					contentType: false,
					headers: headers,
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = '/pro/lists'
					},
					error: function (request, status) {
						console.log(status);
					}
				});
			}
		}
	}

	function rewardValidation()
	{
		let rewardList = $('#rewardListArea').find('li');
		let frequencyActiveLength = 0;
		frequency.find('li').each(function () {
			if ($(this).hasClass('active'))
				frequencyActiveLength++;
		})

		if (rewardList.length > 4)
		{
			alert('리워드는 ' + message.maxReward);
			modalFadeout();
			return false;
		}

		if (isEmpty(modalRewardTitle.val()))
		{
			alert('리워드 제목은 ' + message.required);
			modalRewardTitle.focus();
			return false;
		}

		if (isEmpty(minUser.val()))
		{
			alert('두잇 참여 인원(최소)은 ' + message.required);
			minUser.focus();
			return false;
		}

		if (isEmpty(maxUser.val()))
		{
			alert('두잇 참여 인원(최대)은 ' + message.required);
			maxUser.focus();
			return false;
		}

		if (Number(minUser.val()) > Number(maxUser.val))
		{
			alert(message.compareMinMaxUser);
			minUser.focus();
			return false;
		}

		if (isEmpty(certCount.val()))
		{
			alert('인증 횟수는 ' + message.required);
			certCount.focus();
			return false;
		}

		if (isEmpty(maxUcd.val()))
		{
			alert('1인당 최대 지급 UCD는 ' + message.required);
			maxUcd.focus();
			return false;
		}

		if (frequencyActiveLength === 0)
		{
			alert('주간 빈도는 ' + message.required);
			return false;
		}

		return true;
	}

	function onSubmitRewardModal()
	{
		if (rewardValidation())
			appendReward();
	}

	function appendReward()
	{
		let rewardListArea = $("#rewardListArea");
		let rewardLen 	= rewardListArea.find('li').length;
		let titleLength = Number(rewardLen+1);
		let duration    = 1;
		certDays.each(function () {
			if ($(this).hasClass('active'))
				duration = $(this).data('days');
		})
		let rewardDom 	= '';
		/*rewardDom += '<ul class="enrollment clearfix">';
		rewardDom += 	'<i onClick="removeReward(this);" class="delete-btn far fa-times-circle"></i>';
		rewardDom += 	'<li>';
		rewardDom += 		'<p class="sub-title important">리워드 제목 (*)</p>';
		rewardDom += 		'<p class="detail-data">'+ modalRwrdTitle.val() +'</p>';
		rewardDom += 	'</li>';
		rewardDom += 	'<li class="tag-list">';
		rewardDom += 		'<p class="sub-title important">인증 기간 (*)</p>';
		rewardDom += 		'<p class="detail-data" data->'+ period +'</p>';
		rewardDom += 	'</li>';
		rewardDom += 	'<li class="clearfix">';
		rewardDom += 		'<p class="sub-title important">일일인증 횟수 (*)</p>';
		rewardDom += 		'<p class="detail-data">'+ certCount.val() +'회</p>';
		rewardDom += 	'</li>';
		rewardDom += 	'<li>';
		rewardDom += 		'<p class="sub-title important">목표달성률 (*)</p>';
		rewardDom += 		'<p class="detail-data">'+ goalRate.val() +'%</p>';
		rewardDom += 	'</li>';
		rewardDom += 	'<li>';
		rewardDom += 		'<p class="sub-title important">1인당 최대 지급할 UCD (*)</p>';
		rewardDom += 		'<p class="detail-data">' +maxUcd.val() + ' UCD</p>';
		rewardDom += 	'</li>';
		rewardDom += 	'<li>';
		rewardDom += 		'<p class="sub-title important">주간빈도 (*)</p>';
		rewardDom += 		'<ul class="day-btn clearfix k">';
		rewardDom += 			frequency.html();
		rewardDom += 		'</ul>';
		rewardDom += 	'<li>';
		rewardDom += 	'<input type="hidden" data-title="'+modalRwrdTitle.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-start="'+rewardFrom.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-end="'+rewardTo.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-certcount="'+certCount.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-goalrate="'+goalRate.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-maxucd="'+maxUcd.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-individual="'+individualRate.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-group="'+groupRate.val().trim()+'">';
		frequency.find('li').each(function (index) {
			let DomValue 	= 'N';
			if ($(this).hasClass('active'))
				DomValue	= 'Y';

			if (index === 0)
				rewardDom += 	'<input type="hidden" data-monday="'+DomValue+'">';
			else if (index === 1)
				rewardDom += 	'<input type="hidden" data-tuesday="'+DomValue+'">';
			else if (index === 2)
				rewardDom += 	'<input type="hidden" data-wednesday="'+DomValue+'">';
			else if (index === 3)
				rewardDom += 	'<input type="hidden" data-thursday="'+DomValue+'">';
			else if (index === 4)
				rewardDom += 	'<input type="hidden" data-friday="'+DomValue+'">';
			else if (index === 5)
				rewardDom += 	'<input type="hidden" data-saturday="'+DomValue+'">';
			else if (index === 6)
				rewardDom += 	'<input type="hidden" data-sunday="'+DomValue+'">';
		});
		rewardDom += '</ul>';*/

		rewardDom += '<li>';
		rewardDom += 	'Title.<span class="tag-name" onclick="onClickRewards(this);">'+modalRewardTitle.val()+'</span>';
		rewardDom += 	'<i class="delete-btn far fa-times-circle" onclick="removeReward(this);"></i>';
		rewardDom += 	'<input type="hidden" data-title="'+modalRewardTitle.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-minuser="'+minUser.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-maxuser="'+maxUser.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-duration="'+duration+'">';
		rewardDom += 	'<input type="hidden" data-certcount="'+certCount.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-goalrate="'+goalRate.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-maxucd="'+maxUcd.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-individual="'+individualRate.val().trim()+'">';
		rewardDom += 	'<input type="hidden" data-group="'+groupRate.val().trim()+'">';
		frequency.find('li').each(function (index) {
			let DomValue 	= 'N';
			if ($(this).hasClass('active'))
				DomValue	= 'Y';

			if (index === 0)
				rewardDom += 	'<input type="hidden" data-monday="'+DomValue+'">';
			else if (index === 1)
				rewardDom += 	'<input type="hidden" data-tuesday="'+DomValue+'">';
			else if (index === 2)
				rewardDom += 	'<input type="hidden" data-wednesday="'+DomValue+'">';
			else if (index === 3)
				rewardDom += 	'<input type="hidden" data-thursday="'+DomValue+'">';
			else if (index === 4)
				rewardDom += 	'<input type="hidden" data-friday="'+DomValue+'">';
			else if (index === 5)
				rewardDom += 	'<input type="hidden" data-saturday="'+DomValue+'">';
			else if (index === 6)
				rewardDom += 	'<input type="hidden" data-sunday="'+DomValue+'">';
		});
		rewardDom += '</li>';

		rewardListArea.append(rewardDom);

		modalFadeout();
	}

	function onClickRewards(obj)
	{
		let inputEl 	= $(obj).parent().find('input');
		let titleEl 	= $(inputEl)[0];
		let minUserEl 	= $(inputEl)[1];
		let maxUserEl 	= $(inputEl)[2];
		let durationEl 	= $(inputEl)[3];
		let certCountEl = $(inputEl)[4];
		let goalRateEl  = $(inputEl)[5];
		let maxUcdEl 	= $(inputEl)[6];
		let individualEl  = $(inputEl)[7];
		let groupEl 	= $(inputEl)[8];
		let mondayEl 	= $(inputEl)[9];
		let tuesdayEl 	= $(inputEl)[10];
		let wednesdayEl = $(inputEl)[11];
		let thursdayEl  = $(inputEl)[12];
		let fridayEl 	= $(inputEl)[13];
		let saturdayEl  = $(inputEl)[14];
		let sundayEl 	= $(inputEl)[15];
		let freq 		= [];
		if ($(mondayEl).data('monday') === 'Y') freq.push('월');
		if ($(tuesdayEl).data('tuesday') === 'Y') freq.push('화');
		if ($(wednesdayEl).data('wednesday') === 'Y') freq.push('수');
		if ($(thursdayEl).data('thursday') === 'Y') freq.push('목');
		if ($(fridayEl).data('friday') === 'Y') freq.push('금');
		if ($(saturdayEl).data('saturday') === 'Y') freq.push('토');
		if ($(sundayEl).data('sunday') === 'Y') freq.push('일');

		modalReadTitle.html($(titleEl).data('title'));
		modalReadMinMaxUser.html('최소 '+$(minUserEl).data('minuser')+'명 ~  최대 '+$(maxUserEl).data('maxuser')+'명');
		modalReadDuration.html($(durationEl).data('duration')+'일');
		modalReadCertCount.html($(certCountEl).data('certcount')+'회');
		modalReadGoalRate.html($(goalRateEl).data('goalrate')+'%');
		modalReadMaxUcd.html($(maxUcdEl).data('maxucd')+' UCD');
		modalReadRewardRate.html('개인 '+$(individualEl).data('individual')+'% : 단체 '+$(groupEl).data('group')+'%');
		modalReadFrequency.html(freq.toString());

		modalReadReward.fadeIn();
		modalLayout.fadeIn();
	}

	function toggleActive(obj)
	{
		$(obj).toggleClass('active');
	}

	function removeReward(obj)
	{
		$(obj).parent().remove();
	}

	function onKeyupBizName()
	{
		bizName.autocomplete({
			source: function (request, response) {
				$.ajax({
					url: api.listBizName,
					type: "POST",
					async: false,
					headers: headers,
					data: JSON.stringify({"keyword" : bizName.val()}),
					success: function(data) {
						response($.map(JSON.parse(data), function(item) {
							return {
								label: item.value,
							}
						}));
					},
					error: function (xhr, status, error) {
						console.log(error)
					}
				});
			},
			delay: 300,
			minLength: 2
		});
	}
