
	const bizName 		= $("#bizName");
	const promoName		= $("#promoName");
	const inputFile 	= $("input:file");
	const inputRadio	= $("input:radio");
	const budget 		= $("#budget");
	const banner		= $("#banner");
	const thumbnail		= $("#thumbnail");
	const btnSubmit		= $("#btnSubmit");

	/** modal **/
	const modalReward		= $("#modalReward");
	const btnAddReward 		= $("#btnAddReward");
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const modalRwrdTitle 	= $('#modalRwrdTitle');
	const doitFrom 		 	= $('#doitFrom');
	const doitTo 			= $('#doitTo');
	const certCount  		= $('#certCount');
	const goalRate  		= $('#goalRate');
	const maxUcd  		 	= $('#maxUcd');
	const individualRate  	= $('#individualRate');
	const groupRate  		= $('#groupRate');
	const btnRewardModalSubmit	= $("#btnRewardModalSubmit");


	$(document).ready(function () {

		inputFile			.on('change', function () { onChangeFile(this); });
		btnAddReward		.on('click', function () { modalFadein(); });
		modalCloseBtn		.on('click', function () { modalFadein(); });
		modalLayout			.on('click', function () { modalFadeout(); });
		dayButtons			.on('click', function () { toggleActive(this); });
		btnSubmit			.on('click', function () { onSubmitPromo(); });
		btnRewardModalSubmit.on('click', function () { onSubmitRewardModal(); });
		modalReward			.on('shown.bs.modal', function () { initModal(); });

		initInputDatepicker();
		initComponent();
		rewardRateRange();
	});

	// 개인+그룹일 때 리워드 분배 비율 설정  rage slider
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

	function initComponent()
	{
		bizName.focus();
		bizName.val('');
		promoName.val('');
		budget.val('');
		inputRadio.each(function (index) {
			if (index === 0)
				$(this).prop("checked", true);
		});
	}

	function initModal()
	{
		modalRwrdTitle.val('');
		doitFrom.val('');
		doitTo.val('');
		certCount.val('');
		goalRate.val('');
		maxUcd.val('');
		individualRate.val('');
		groupRate.val('');
	}

	function validation()
	{
		let bannerFile	= banner[0].files;
		let thumbnailFile	= thumbnail[0].files;

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

		if (isEmpty(dateFrom.val()))
		{
			alert('프로모션기간(시작일)은 ' + message.required);
			dateFrom.focus();
			return false;
		}

		if (isEmpty(dateTo.val()))
		{
			alert('프로모션기간(종료일)은 ' + message.required);
			dateTo.focus();
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

		return true;
	}

	let rewardList = $('#rewardListArea .enrollment');
	function params()
	{
		let paramBannerFile 	= banner[0].files[0];
		let paramThumbnailFile 	= thumbnail[0].files[0];
		let formData  = new FormData();
		formData.append('company-name', bizName.val());
		formData.append('promotion-name', promoName.val());
		formData.append('promotion-budget-ucd', budget.val());
		formData.append('promotion-start-date', dateFrom.val());
		formData.append('promotion-end-date', dateTo.val());
		formData.append('promotion-main-image',paramBannerFile);
		formData.append('promotion-thumbnail-image', paramThumbnailFile);
		formData.append('promotion-doit-type', $('input:radio[name=radio-doit-type]:checked').val());

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
				title 		: $(titleEl).data('title')
				,start_date : $(startEl).data('start')
				,end_date 	: $(endEl).data('end')
				,cert_count : $(certCountEl).data('certcount')
				,goal_rate 	: $(goalRateEl).data('goalrate')
				,ucd_per_person : $(maxUcdEl).data('maxucd')
				,individual_rate : $(individualEl).data('individual')
				,group_rate : $(groupEl).data('group')
				,monday 	: $(mondayEl).data('monday')
				,tuesday 	: $(tuesdayEl).data('tuesday')
				,wednesday 	: $(wednesdayEl).data('wednesday')
				,thursday 	: $(thursdayEl).data('thursday')
				,friday 	: $(fridayEl).data('friday')
				,saturday 	: $(saturdayEl).data('saturday')
				,sunday 	: $(sundayEl).data('sunday')
			});
		});

		formData.append('promotion-reward-condition', JSON.stringify(reward));

		return formData;
	}

	function onSubmitPromo()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: "http://api.kakaokids.org/v1.0/admin/promotion/create",
					type: "POST",
					processData: false,
					contentType: false,
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
		if (isEmpty(modalRwrdTitle.val()))
		{
			alert('리워드 제목은 ' + message.required);
			modalRwrdTitle.focus();
			return false;
		}

		if (isEmpty(doitFrom.val()))
		{
			alert('인증기간(시작일)은 ' + message.required);
			doitFrom.focus();
			return false;
		}

		if (isEmpty(doitTo.val()))
		{
			alert('인증기간(종료일)은 ' + message.required);
			doitTo.focus();
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
		let period		 	 = 	doitFrom.val() + "~" + doitTo.val();
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
		rewardDom += 			$('#frequency').html();
		rewardDom += 		'</ul>';
		rewardDom += 	'<li>';
		rewardDom += 	'<input type="hidden" data-title="'+modalRwrdTitle.val()+'">';
		rewardDom += 	'<input type="hidden" data-start="'+doitFrom.val()+'">';
		rewardDom += 	'<input type="hidden" data-end="'+doitTo.val()+'">';
		rewardDom += 	'<input type="hidden" data-certcount="'+certCount.val()+'">';
		rewardDom += 	'<input type="hidden" data-goalrate="'+goalRate.val()+'">';
		rewardDom += 	'<input type="hidden" data-maxucd="'+maxUcd.val()+'">';
		rewardDom += 	'<input type="hidden" data-individual="'+individual.val()+'">';
		rewardDom += 	'<input type="hidden" data-group="'+group.val()+'">';
		$('#frequency').find('li').each(function (index) {
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
		let target = $(obj).parent();

		$(target).remove();
	}
