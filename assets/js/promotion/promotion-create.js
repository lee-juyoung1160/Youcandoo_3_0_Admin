
	const bizName 		 = $("#bizName");
	const promoName		 = $("#promoName");
	const balance 		 = $("#balance");
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
	const btnSubmit		 = $("#btnSubmit");

	/** modal **/
	const modalLayout	= $(".modal-layout");
	const modalContent  = $(".modal-content");
	const modalCloseBtn	= $(".close-btn");
	const dataTable		= $("#dataTable");
	const modalBizName	= $("#modalBizName");

	/** 리워드 입력 **/
	const rewardTabWrap	 = $("#rewardTabWrap");
	const rewardTab	 	 = $(".reward-tab");
	const rewardTabTitle = $(".btn-reward-title");
	const rewardTitle 	 = $(".reward-title");
	const iconDelReward	 = $(".delete-reward");
	const btnAddReward	 = $(".reward-add-btn")
	const rewardsWrap 	 = $("#rewardsWrap");
	const goalRange1	 = $("#goalRange1");
	const goalRange2	 = $("#goalRange2");
	const goalRange3	 = $("#goalRange3");
	const goalRange4	 = $("#goalRange4");
	const goalRate1	 	 = $("#goalRate1");
	const goalRate2	 	 = $("#goalRate2");
	const goalRate3	 	 = $("#goalRate3");
	const goalRate4	 	 = $("#goalRate4");
	const rewardRange1	 = $("#rewardRange1");
	const rewardRange2   = $("#rewardRange2");
	const rewardRange3	 = $("#rewardRange3");
	const rewardRange4	 = $("#rewardRange4");
	const personalRate1	 = $("#personalRate1");
	const personalRate2	 = $("#personalRate2");
	const personalRate3	 = $("#personalRate3");
	const personalRate4	 = $("#personalRate4");
	const groupRate1	 = $("#groupRate1");
	const groupRate2	 = $("#groupRate2");
	const groupRate3	 = $("#groupRate3");
	const groupRate4	 = $("#groupRate4");
	const inputRight	 = $(".input-right");
	const rewardUcd		 = $(".reward-ucd");
	const iconDeleteRow  = $(".icon-delete-row");
	const btnCreateRow   = $(".ucd-add-btn");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 목표달성률 rage slider 초기화 **/
		initGoalRateRange(goalRange1, goalRate1);
		initGoalRateRange(goalRange2, goalRate2);
		initGoalRateRange(goalRange3, goalRate3);
		initGoalRateRange(goalRange4, goalRate4);
		/** 리워드 비율 range slider 초기화 **/
		initRewardRateRange(rewardRange1, personalRate1, groupRate1);
		initRewardRateRange(rewardRange2, personalRate2, groupRate2);
		initRewardRateRange(rewardRange3, personalRate3, groupRate3);
		initRewardRateRange(rewardRange4, personalRate4, groupRate4);
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		modalBizName	.on('keyup', function () { getBiz(); });
		bizName			.on('click', function () { onClickBizName(); });
		promoFrom		.on('change', function () { onChangePromoFrom(); });
		btnNoticeAdd	.on('click', function () { onClickBtnNoticeAdd(); });
		inputFile		.on('change', function () { onChangeValidationImage(this); });
		rewardTab		.on('click', function () { onClickRewardTab(this); });
		rewardTitle		.on('keyup', function () { onKeyupRewardTitle(this); });
		btnAddReward	.on('click', function () { addReward(this); });
		iconDelReward	.on('click', function () { deleteReward(this); });
		$(".duration")	.on('click', function () { onSelectDuration(this); });
		$(".frequency")	.on('click', function () { toggleFrequency(this); });
		inputRight		.on('keyup', function () { calculateTotalUcd(this); });
		rewardUcd		.on('keyup', function () { calculateTotalUcd(this); });
		/*iconDeleteRow	.on('click', function () { deleteTableRow(this); });
		btnCreateRow	.on('click', function () { createTableRow(this); });*/
		btnSubmit		.on('click', function () { onSubmitPromo(); });
	});

	function initComponent()
	{
		bizName.focus();
		bizName.val('');
		promoName.val('');
		budget.val('');
		allowCount.val(1);
		isBanner.eq(0).prop("checked", true);
		initNoticeArea();
		/** 리워드 제목과 탭 이름 같은 값으로 세팅 **/
		matchRewardTitle();
	}

	function matchRewardTitle()
	{
		rewardTitle.each(function (index) {
			$(rewardTabTitle[index]).text($(this).val());
		});
	}

	/** 목표달성률 설정 레인지 슬라이더 **/
	function initGoalRateRange(goalRangeDom, goalRateDom)
	{
		goalRangeDom.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 80,
			max: 100,
			from: 85,
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
	function initRewardRateRange(rangeDom, personalDom, groupDom)
	{
		rangeDom.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 10,
			max: 90,
			from: 50,
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

	/** 기업 검색 **/
	function onClickBizName()
	{
		modalFadein();
		getBiz();
	}

	function getBiz()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listBizName,
				type:"POST",
				headers: headers,
				dataSrc: "",
				global: false,
				data: function (d) {
					return JSON.stringify({"keyword" : modalBizName.val()});
				}
			},
			columns: [
				{title: "기업명",	data: "value",    orderable: false,   className: "text-center" }
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing : message.searching
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
		$(nRow).attr('onClick', 'setSelectedBiz(\''+aData.key+'\',\''+aData.value+'\')');
	}

	/** 모달에서 기업명 클릭 했을 때 **/
	function setSelectedBiz(uuid, name)
	{
		bizName.val(name);
		getBizBalance(uuid);
		modalFadeout();
	}

	let g_total_balance;
	function getBizBalance(uuid)
	{
		$.ajax({
			url: api.getBalance,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"company_uuid" : uuid}),
			success: function(data) {
				if (isSuccessResp(data))
				{
					let totalBalance = Number(data.data.cash) + Number(data.data.point);
					g_total_balance = totalBalance;
					balance.html('기업 보유 UCD: '+numberWithCommas(totalBalance)+'UCD');
				}
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert('기업 보유 UCD'+message.ajaxError);
			}
		});
	}

	function initModal()
	{
		modalBizName.val('');
		modalBizName.focus();
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

	/** 유의사항 Dom 초기화 (기본값 3개 세팅) **/
	function initNoticeArea()
	{
		let noticeDom = '';
		let noticeTxt = [message.promotionNotice1, message.promotionNotice2, message.promotionNotice3];
		for (let i=0; i<3; i++)
		{
			noticeDom += '<li>';
			noticeDom += 	'<p class="cap input-notice-title">유의사항 '+(i+1)+'</p>';
			noticeDom += 	'<input type="text" name="promo-notice" placeholder="유의사항을 입력해주세요." value="'+noticeTxt[i]+'">';
			noticeDom += 	'<i onclick="removeNotice(this)" class="far fa-times-circle" style="color: #ec5c5c;font-size: 21px;vertical-align: middle;margin-left: 5px;"></i>';
			noticeDom += '</li>';
		}

		noticeArea.html(noticeDom);
	}

	/** 리워드 조건 버튼 클릭 이벤트 **/
	function onClickRewardTab(obj)
	{
		toggleActiveRewardTab(obj);
		toggleShowRewardForm(obj);
		calculateTotalUcd(inputRight);
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
			onClickRewardTab(rewardTab.eq(0));
	}

	/** 리워드 조건 생성하기 버튼 이벤트 **/
	function addReward()
	{
		let countReward = rewardTabWrap.find('li').length;
		if (addRewardValidation(countReward))
		{
			countReward++
			buildRewardTab(countReward);
			buildReward(countReward);
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

	function buildRewardTab(countReward)
	{
		let targetDom    = '#reward'+countReward;
		let title        = '리워드'+countReward;
		let rewardTabDom = '';
		rewardTabDom += '<li>';
		rewardTabDom += 	'<span onclick="onClickRewardTab(this);" class="tag-name btn-reward-title reward-tab" data-target="'+targetDom+'">'+title+'</span>';
		rewardTabDom += 	'<i onclick="deleteReward(this);" class="delete-btn far fa-times-circle delete-reward" data-target="'+targetDom+'"></i>';
		rewardTabDom += '</li>';

		rewardTabWrap.append(rewardTabDom);
	}

	function buildReward(countReward)
	{
		let domId     		= 'reward'+countReward;
		let title     		= '리워드'+countReward;
		let goalRange 		= 'goalRange'+countReward;
		let goalRate  		= 'goalRate'+countReward;
		let rewardRange		= 'rewardRange'+countReward;
		let personalRate  	= 'personalRate'+countReward;
		let groupRate  		= 'groupRate'+countReward;
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

		initGoalRateRange($('#'+goalRange), $('#'+goalRate));

		initRewardRateRange($('#'+rewardRange), $('#'+personalRate), $('#'+groupRate));
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

	function onSelectDuration(obj)
	{
		/*toggleDisabledFrequency(obj);*/
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
	/** 인증기간 선택에 따라 주간빈도 enable, disable **/
	/*function toggleDisabledFrequency(obj)
	{
		let	selectedFrequency = $(obj).data('days');

		if (selectedFrequency === 1)
			disabledFrequency(obj);
		else
			enabledFrequency(obj);
	}*/

	/** 주간빈도 disabled **/
	/*function disabledFrequency(obj)
	{
		let frequencyUl = $(obj).parents('ul.pro-reward').find('.frequency-ul');

		if (!$(frequencyUl).hasClass('disabled'))
			$(frequencyUl).addClass('disabled');
	}*/

	/** 주간빈도 enabled **/
	/*function enabledFrequency(obj)
	{
		let frequencyUl = $(obj).parents('ul.pro-reward').find('.frequency-ul');

		if ($(frequencyUl).hasClass('disabled'))
			$(frequencyUl).removeClass('disabled');

		$(frequencyUl).children().removeClass('active');
	}*/

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

	/** 인당 UCD 테이블 row 삭제 버튼 이벤트 **/
	function deleteTableRow(obj)
	{
		$(obj).parents('tr').remove();
	}

	/** 인당 UCD 테이블 row 생성하기 버튼 이벤트 **/
	function createTableRow(obj)
	{
		let btnTrDom = $(obj).parents('tr');

		if ($(btnTrDom).siblings().length >= 4)
		{
			alert('인당 UCD는 '+message.maxAddFour);
			return;
		}

		let inputTrDom = '';
		inputTrDom = '<tr>';
		inputTrDom += 	'<td>';
		inputTrDom += 		'<input type="text" class="only-num input-left" maxlength="5">';
		inputTrDom += 		'<span class="date-margin-text"> ~ </span>';
		inputTrDom += 		'<input onkeyup="calculateTotalUcd(this)" type="text" class="only-num input-right" maxlength="5">';
		inputTrDom += 	'</td>';
		inputTrDom += 	'<td><input onkeyup="calculateTotalUcd(this)" type="text" class="only-num reward-ucd" maxlength="5"></td>';
		inputTrDom += 	'<td><span class="text-right"></span></td>';
		inputTrDom += 	'<td><i onclick="deleteTableRow(this);" class="delete-btn far fa-times-circle icon-delete-row"></i></td>';
		inputTrDom += '</tr>';

		btnTrDom.before(inputTrDom);
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

	function validation()
	{
		let bannerFile		= banner[0].files;
		let introFile	= intro[0].files;
		let promotionNotice = $("input[name=promo-notice]");

		if (isEmpty(bizName.val()))
		{
			alert('기업명은 ' + message.required);
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

		if (Number(budget.val()) > Number(g_total_balance))
		{
			alert('예산은 ' + message.overTotalBalance);
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

		if (bannerFile.length === 0)
		{
			alert('배너 및 리스트 이미지는 ' + message.required);
			return false;
		}

		if (introFile.length === 0)
		{
			alert('소개 이미지는 ' + message.required);
			return false;
		}

		if (isOverDuration())
		{
			alert(message.overDuration+'\n리워드 조건의 인증 기간을 '+message.doubleChk);
			return false;
		}

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

	function isOverDuration()
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

			if (Number(totalUcd) > Number(budget.val())) retVal = true;
		});

		return retVal;
	}

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

	function params()
	{
		let paramBannerFile = banner[0].files[0];
		let paramIntroFile 	= intro[0].files[0];
		let formData  = new FormData();
		formData.append("nickname", bizName.val());
		formData.append("promotion-title", promoName.val().trim());
		formData.append("promotion-budget-ucd", budget.val().trim());
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
					dataType: 'json',
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listPromo
					},
					error: function (request, status) {
						alert(label.submit+message.ajaxError);
					}
				});
			}
		}
	}


