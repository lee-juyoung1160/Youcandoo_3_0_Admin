
	const bizName 		= $("#bizName");
	const promoName		= $("#promoName");
	const promoFrom	 	= $("#promoFrom");
	const promoTo		= $("#promoTo");
	const inputFile 	= $("input:file");
	const budget 		= $("#budget");
	const banner		= $("#banner");
	const thumbnail		= $("#thumbnail");
	const btnSubmit		= $("#btnSubmit");
	const frequency		= $("#frequency");
	const doitType		= $("input[name=radio-doit-type]");
	const isBanner		= $("input[name=radio-banner-open]");
	const rewardListTitle = $("#rewardListTitle");

	/** modal **/
	const btnAddReward 		= $("#btnAddReward");
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const modalRwrdTitle 	= $("#modalRwrdTitle");
	const rewardFrom 		= $("#rewardFrom");
	const rewardTo 			= $("#rewardTo");
	const certCount  		= $("#certCount");
	const goalRate  		= $("#goalRate");
	const maxUcd  		 	= $("#maxUcd");
	const individualRate  	= $("#individualRate");
	const groupRate  		= $("#groupRate");
	const btnRewardModalSubmit	= $("#btnRewardModalSubmit");


	$(document).ready(function () {
		inputFile			.on('change', function () { onChangeValidationImage(this); });
		btnAddReward		.on('click', function () { modalFadein(); });
		modalCloseBtn		.on('click', function () { modalFadeout(); });
		modalLayout			.on('click', function () { modalFadeout(); });
		dayButtons			.on('click', function () { toggleActive(this); });
		btnSubmit			.on('click', function () { onSubmitPromo(); });
		btnRewardModalSubmit.on('click', function () { onSubmitRewardModal(); });
		rewardFrom			.on('change', function () { onChangeRewardFrom(); });
		rewardTo			.on('change', function () { onChangeRewardTo(); });
		promoFrom			.on('change', function () { onChangePromoFrom(); });
		bizName				.on('keyup', function () { onKeyupBizName(); });

		initInputDatepicker();
		initComponent();
		rewardRateRange();
		goalRateRange();
	});

	/** 목표달성률 레인지 슬라이더 **/
	function goalRateRange()
	{
		$("#goalRange").ionRangeSlider({
			skin: "round",
			type: "single",
			min: 0,
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
			min: 0,
			max: 100,
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

	function onChangeRewardFrom()
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
	}

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
		modalRwrdTitle.val('');
		rewardFrom.val('');
		rewardTo.val('');
		rewardFrom.datepicker("option", "minDate", new Date(promoFrom.datepicker("getDate")));
		rewardFrom.datepicker("option", "maxDate", new Date(promoTo.datepicker("getDate")));
		rewardTo.datepicker("option", "maxDate", new Date(promoTo.datepicker("getDate")));
		certCount.val('');
		maxUcd.val('');
		frequency.find('li').each(function () {
			$(this).removeClass('active');
		});
	}

	function validation()
	{
		let bannerFile		= banner[0].files;
		let thumbnailFile	= thumbnail[0].files;
		let rewardList 		= $('#rewardListArea .enrollment');

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

	function params()
	{
		let rewardList 			= $('#rewardListArea .enrollment');
		let paramBannerFile 	= banner[0].files[0];
		let paramThumbnailFile 	= thumbnail[0].files[0];
		let formData  = new FormData();
		formData.append("company-name", bizName.val());
		formData.append("promotion-title", promoName.val());
		formData.append("promotion-budget-ucd", budget.val());
		formData.append("promotion-start-date", promoFrom.val());
		formData.append("promotion-end-date", promoTo.val());
		formData.append("promotion-banner-image",paramBannerFile);
		formData.append("promotion-list-image", paramThumbnailFile);
		formData.append("promotion-doit-type", $('input:radio[name=radio-doit-type]:checked').val());
		formData.append("is-banner", $('input:radio[name=radio-banner-open]:checked').val());

		let reward = [];
		rewardList.each(function () {
			let inputEl 	= $(this).find('input');
			let titleEl 	= $(inputEl)[0];
			let startEl 	= $(inputEl)[1];
			let endEl 		= $(inputEl)[2];
			let certCountEl = $(inputEl)[3];
			let goalRateEl  = $(inputEl)[4];
			let maxUcdEl 	= $(inputEl)[5];
			let individualEl  = $(inputEl)[6];
			let groupEl 	= $(inputEl)[7];
			let mondayEl 	= $(inputEl)[8];
			let tuesdayEl 	= $(inputEl)[9];
			let wednesdayEl = $(inputEl)[10];
			let thursdayEl  = $(inputEl)[11];
			let fridayEl 	= $(inputEl)[12];
			let saturdayEl  = $(inputEl)[13];
			let sundayEl 	= $(inputEl)[14];

			reward.push({
				"title" 			 : $(titleEl).data('title')
				,"action-start-date" : $(startEl).data('start')
				,"action-end-date" 	 : $(endEl).data('end')
				,"action-count" 	 : $(certCountEl).data('certcount')
				,"goal-rate" 		 : $(goalRateEl).data('goalrate')
				,"ucd-per-person" 	 : $(maxUcdEl).data('maxucd')
				,"individual-rate" 	 : $(individualEl).data('individual')
				,"group-rate" 		 : $(groupEl).data('group')
				,"monday" 			 : $(mondayEl).data('monday')
				,"tuesday" 			 : $(tuesdayEl).data('tuesday')
				,"wednesday" 		 : $(wednesdayEl).data('wednesday')
				,"thursday" 		 : $(thursdayEl).data('thursday')
				,"friday" 			 : $(fridayEl).data('friday')
				,"saturday" 		 : $(saturdayEl).data('saturday')
				,"sunday" 			 : $(sundayEl).data('sunday')
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
						console.log(data);
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
		let rewardList = $('#rewardListArea .enrollment');

		if (rewardList.length > 4)
		{
			alert('리워드는 ' + message.maxReward);
			modalFadeout();
			return false;
		}

		if (isEmpty(modalRwrdTitle.val()))
		{
			alert('리워드 제목은 ' + message.required);
			modalRwrdTitle.focus();
			return false;
		}

		if (isEmpty(rewardFrom.val()))
		{
			alert('인증기간(시작일)은 ' + message.required);
			rewardFrom.focus();
			return false;
		}

		if (isEmpty(rewardTo.val()))
		{
			alert('인증기간(종료일)은 ' + message.required);
			rewardTo.focus();
			return false;
		}

		if (isEmpty(certCount.val()))
		{
			alert('인증 횟수는 ' + message.required);
			certCount.focus();
			return false;
		}

		if (isEmpty(goalRate.val()))
		{
			alert('목료달성률은 ' + message.required);
			goalRate.focus();
			return false;
		}

		if (isEmpty(maxUcd.val()))
		{
			alert('1인당 최대 지급 UCD는 ' + message.required);
			maxUcd.focus();
			return false;
		}

		if (isEmpty(individualRate.val()))
		{
			alert('리워드유형(개인)은 ' + message.required);
			individualRate.focus();
			return false;
		}

		if (isEmpty(groupRate.val()))
		{
			alert('리워드유형(단체)은 ' + message.required);
			groupRate.focus();
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
		if ($('#rewardListArea').find('.enrollment').length === 0)
			rewardListTitle.text('리워드 조건 생성 목록');

		let period		 	 = 	rewardFrom.val() + "~" + rewardTo.val();
		let rewardDom = '';
		rewardDom += '<ul class="enrollment clearfix">';
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
		rewardDom += 	'<input type="hidden" data-title="'+modalRwrdTitle.val()+'">';
		rewardDom += 	'<input type="hidden" data-start="'+rewardFrom.val()+'">';
		rewardDom += 	'<input type="hidden" data-end="'+rewardTo.val()+'">';
		rewardDom += 	'<input type="hidden" data-certcount="'+certCount.val()+'">';
		rewardDom += 	'<input type="hidden" data-goalrate="'+goalRate.val()+'">';
		rewardDom += 	'<input type="hidden" data-maxucd="'+maxUcd.val()+'">';
		rewardDom += 	'<input type="hidden" data-individual="'+individualRate.val()+'">';
		rewardDom += 	'<input type="hidden" data-group="'+groupRate.val()+'">';
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
		rewardDom += '</ul>';

		$('#rewardListArea').append(rewardDom);

		modalFadeout();
	}

	function toggleActive(obj)
	{
		$(obj).toggleClass('active');
	}

	function removeReward(obj)
	{
		if ($('#rewardListArea').find('.enrollment').length === 1)
			rewardListTitle.text('');

		let target = $(obj).parent();
		$(target).remove();
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
