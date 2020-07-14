
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
	const radioDuration  = $("input[name=radio-duration]");
	const goalRange1	 = $("#goalRange1");
	const goalRate1	 	 = $("#goalRate1");
	const inputRight	 = $(".input-right");
	const rewardUcd		 = $(".reward-ucd");
	const iconDeleteRow  = $(".icon-delete-row");
	const btnCreateRow   = $(".ucd-add-btn");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 목표달성률 rage slider 초기화 **/
		initGoalRateRange(goalRange1, goalRate1);
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 리워드조건 첫번째값 표출 **/
		onClickRewardTab(rewardTab.eq(0));
		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam("");
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
		btnAddReward	.on('click', function () { addReward(); });
		iconDelReward	.on('click', function () { deleteReward(this); });
		radioDuration	.on('change', function () { onChangeDuration(this); });
		$(".duration")	.on('keyup', function () { onKeyupDuration(this); });
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
		allowCount.val(3);
		isBanner.eq(0).prop("checked", true);
		initNoticeArea();
		$("input[name=radio-duration]").eq(0).prop("checked", true);
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

	/** 기업 검색 **/
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
					return JSON.stringify({"keyword" : modalBizName.val().trim()});
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기업명",	data: "value",    orderable: false }
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
					sweetError(invalidResp(data));
			},
			error: function (request, status) {
				sweetError('기업 보유 UCD'+message.ajaxError);
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
	/*function calculateTerm() {
		let fromDate = promoFrom.datepicker('getDate');
		let toDate = promoTo.datepicker('getDate');

		let diff = Math.abs(toDate.getTime() - fromDate.getTime());
		diff = Math.ceil(diff / (1000 * 3600 * 24)) +1;

		return diff;
	}*/

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
			sweetToast('유의사항은 '+message.maxAddFour);
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

		btnAddReward.show();
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
			buildReward();
		}
	}

	function addRewardValidation(count)
	{
		if (count >= 5)
		{
			sweetToast('리워드는 '+message.maxAddFive);
			return false;
		}

		return true;
	}

	let countId = 2;
	function buildRewardTab(count)
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

	let radioId = 100;
	function buildReward()
	{
		let domId     		= 'reward'+countId;
		let title     		= '리워드 옵션 명 입력';
		let goalRange 		= 'goalRange'+countId;
		let goalRate  		= 'goalRate'+countId;
		let rewardDom = '';
		rewardDom += '<div id="'+domId+'" class="pro-reward-wrap">';
		rewardDom += 	'<ul class="pro-reward">';
		rewardDom += 		'<li>';
		rewardDom += 			'<div class="col-wrap clearfix">';
		rewardDom += 				'<div class="col-1">';
		rewardDom += 					'<p class="cap">리워드 옵션명 (*)</p>';
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
		rewardDom += 					'<p class="cap" style="display: inline-block;">인증 기간 (*)</p> ';
		rewardDom += 					'<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">';
		rewardDom += 						'<span class="hover-text">* 최대 30일까지 가능합니다.</span>';
		rewardDom += 					'</i>';
		rewardDom += 				'</div>';
		rewardDom += 				'<div class="col-2" style="height: 40px; line-height: 40px;">';
		rewardDom += 					'<div class="checkbox-wrap" style="display: inline-block;">';
		rewardDom += 						'<input onchange="onChangeDuration(this);" type="radio" id="rdo_'+radioId+'" name="radio-duration-'+countId+'" value="1" checked>';
		rewardDom += 						'<label for="rdo_'+radioId+'"><span></span>1일</label>';
		rewardDom += 						'<input onchange="onChangeDuration(this);" type="radio" id="rdo_'+(++radioId)+'" name="radio-duration-'+countId+'" value=""> ';
		rewardDom += 						'<label for="rdo_'+radioId+'"><span></span>7일 이상</label>';
		rewardDom += 					'</div>';
		rewardDom += 					'<p style="display: none;">';
		rewardDom += 						'<input onkeyup="initInputNumber(this); onKeyupDuration(this);" type="text" class="only-num duration" maxlength="2">';
		rewardDom += 						'<span class="input-num-title"> 일</span>';
		rewardDom += 					'</p>';
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
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency">화</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency">수</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency">목</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency">금</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency">토</li>';
		rewardDom += 						'<li onclick="toggleFrequency(this);" class="frequency">일</li>';
		rewardDom += 					'</ul>';
		rewardDom += 				'</div>';
		rewardDom += 			'</div>';
		rewardDom += 		'</li>';
		rewardDom += 		'<li>';
		rewardDom += 			'<div class="col-wrap clearfix">';
		rewardDom += 				'<div class="col-1">';
		rewardDom += 					'<p class="cap" style="display: inline-block;">목표달성률 (*)</p> ';
		rewardDom += 					'<i class="question-mark far fa-question-circle" style="vertical-align: inherit; margin-left: 5px;">';
		rewardDom += 						'<span class="hover-text">* 최소 80%, 최대가 100% 입니다.</span>';
		rewardDom += 					'</i>';
		rewardDom +=	 			'</div>';
		rewardDom +=	 			'<div class="col-2">';
		rewardDom += 					'<input id="'+goalRange+'" type="range" class="custom-range goal-range" readonly>';
		rewardDom += 					'<input id="'+goalRate+'" class="input-num-box goal-rate" type="text" readonly>';
		rewardDom += 					'<span class="input-num-title"> %</span>';
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
		rewardDom += 						'<colgroup>';
		rewardDom += 							'<col style="width: 35%;">';
		rewardDom += 							'<col style="width: 15%;">';
		rewardDom += 							'<col style="width: 15%;">';
		rewardDom += 							'<col style="width: 25%;">';
		rewardDom += 						'</colgroup>';
		rewardDom += 						'<thead>';
		rewardDom += 							'<tr>';
		rewardDom += 								'<th rowspan="2">참여자 수(명)</th>';
		rewardDom += 								'<th colspan="2">인당 UCD</th>';
		rewardDom += 								'<th rowspan="2">총 UCD</th>';
		rewardDom += 							'</tr>';
		rewardDom += 							'<tr>';
		rewardDom += 								'<th>개인</th>';
		rewardDom += 								'<th>단체</th>';
		rewardDom += 							'</tr>';
		rewardDom += 						'</thead>';
		rewardDom += 						'<tbody class="ucd-table-body">';
		rewardDom += 							'<tr>';
		rewardDom += 								'<td>';
		rewardDom += 									'<input onkeyup="initInputNumber(this);" type="text" class="only-num input-left" maxlength="5">';
		rewardDom += 									'<span class="date-margin-text"> ~ </span>';
		rewardDom += 									'<input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num input-right" maxlength="5">';
		rewardDom += 								'</td>';
		rewardDom += 								'<td><input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num reward-ucd" maxlength="5"></td>';
		rewardDom += 								'<td><input onkeyup="initInputNumber(this); calculateTotalUcd(this);" type="text" class="only-num reward-ucd" maxlength="5"></td>';
		rewardDom += 								'<td><span class="text-right">-</span></td>';
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

		calculateInputLength();

		radioId++
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

	function onChangeDuration(obj)
	{
		let durationDom = $(obj).parent().siblings();
		let durationInputEl = $(durationDom).find('.duration')

		$(durationInputEl).val('');
		$(durationInputEl).focus();
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

		if (!isEmpty($(radioDur).val()))
			$(frequencyUl).children().eq(0).addClass('active');
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

	/** 인당 UCD 테이블 row 삭제 버튼 이벤트 **/
	/*function deleteTableRow(obj)
	{
		$(obj).parents('tr').remove();
	}*/

	/** 인당 UCD 테이블 row 생성하기 버튼 이벤트 **/
	/*function createTableRow(obj)
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
	}*/

	function calculateTotalUcd(obj)
	{
		let trDom 	   = $(obj).closest('tr');
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

	function validation()
	{
		let bannerFile		= banner[0].files;
		let introFile	= intro[0].files;
		let promotionNotice = $("input[name=promo-notice]");

		if (isEmpty(bizName.val()))
		{
			sweetToast('기업명은 ' + message.required);
			scrollToTarget(bizName);
			onClickBizName();
			return false;
		}

		if (isEmpty(promoName.val()))
		{
			sweetToast('프로모션명은 ' + message.required);
			promoName.focus();
			return false;
		}

		if (isEmpty(budget.val()))
		{
			sweetToast('예산은 ' + message.required);
			budget.focus();
			return false;
		}

		if (Number(budget.val()) > Number(g_total_balance))
		{
			sweetToast('예산은 ' + message.overTotalBalance);
			budget.focus();
			return false;
		}

		if (isEmpty(promoFrom.val()))
		{
			sweetToast('프로모션기간(시작일)은 ' + message.required);
			promoFrom.focus();
			return false;
		}

		if (isEmpty(promoTo.val()))
		{
			sweetToast('프로모션기간(종료일)은 ' + message.required);
			promoTo.focus();
			return false;
		}

		if (promotionNotice.length === 0)
		{
			sweetToast('유의사항을 ' + message.addOn);
			return false;
		}

		if (promotionNotice.length > 0 && isEmptyNotice())
		{
			sweetToast('유의사항은 ' + message.required);
			return false;
		}

		if (isEmpty(allowCount.val()))
		{
			sweetToast('프로모션 동시 참여 횟수는 ' + message.required);
			allowCount.focus();
			return false;
		}

		if (Number(allowCount.val()) > 5)
		{
			sweetToast('프로모션 동시 참여 횟수는 ' + message.maxJoinPromo);
			allowCount.focus();
			return false;
		}

		if (bannerFile.length === 0)
		{
			sweetToast('배너 및 리스트 이미지는 ' + message.required);
			return false;
		}

		if (introFile.length === 0)
		{
			sweetToast('소개 이미지는 ' + message.required);
			return false;
		}

		if (isEmptyDuration())
		{
			sweetToast('인증 기간은 '+message.required+'\n리워드 조건의 인증 기간을 '+message.doubleChk);
			return false;
		}

		if (isInvalidDuration())
		{
			sweetToast(message.invalidDuration+'\n리워드 조건의 인증 기간을 '+message.doubleChk);
			return false;
		}

		if (isEmptyFrequency())
		{
			sweetToast('주간 빈도는 '+message.required+'\n리워드 조건의 주간 빈도를 '+message.doubleChk);
			return false;
		}

		/*if (isOverFrequency())
		{
			alert('주간빈도는 '+message.overFrequency+'\n리워드 조건의 주간 빈도를 '+message.doubleChk);
			return false;
		}*/

		if (isEmptyRewardUcd())
		{
			sweetToast('인당 UCD는 '+message.required+'\n리워드 조건의 인당 UCD 항목을 '+message.doubleChk);
			return false;
		}

		if (isInvalidJoinUserCount())
		{
			sweetToast(message.minOverMax+'\n리워드 조건의 참여자 수를 '+message.doubleChk);
			return false;
		}

		if (isOverBudget())
		{
			sweetToast(message.overBudget+'\n리워드 조건의 인당 UCD 항목을 '+message.doubleChk);
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
		let result = false;
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
			let activeFrequencyLen = $(rewardDom[i]).find('.frequency.active').length;

			if (Number(activeFrequencyLen) === 0)
				result = true;
		}

		return result;
	}

	/*function isOverFrequency()
	{
		let result = false;
		let rewardDom = $("ul.pro-reward");
		for (let i=0; i<rewardDom.length; i++)
		{
			let duration = $(rewardDom[i]).find('.duration').val();
			let activeFrequencyLen = $(rewardDom[i]).find('.frequency.active').length;

			if (Number(duration) < activeFrequencyLen)
				result = true;
		}

		return result;
	}*/

	function isOverBudget()
	{
		let result = false;
		let ucdTable = $(".ucd-table-body");
		ucdTable.each(function () {
			let totalDom = $(this).find('span')[1];
			let totalUcd = replaceAll($(totalDom).text(), ',', '');

			if (Number(totalUcd) > Number(budget.val()))
				result = true;
		});

		return result;
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
			let duration	 = isEmpty($(rewardWrap[i]).find('input[type=radio]:checked').val()) ? durationDom.val() : 1;
			let frequencyDom = $(rewardWrap[i]).find('.frequency');
			let monday		 = 'N';
			let tuesday		 = 'N';
			let wednesday	 = 'N';
			let thursday	 = 'N';
			let friday		 = 'N';
			let saturday	 = 'N';
			let sunday		 = 'N';
			let goalRate 	 = $(rewardWrap[i]).find('.goal-rate');
			let ucdTable	 = $(rewardWrap[i]).find('.ucd-table-body');

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
				"title" 			: title.val().trim()
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
		return formData;
	}

	function onSubmitPromo()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
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
				sweetToastAndCallback(data, createSuccess);
			},
			error: function (request, status) {
				sweetError(label.submit+message.ajaxError);
			}
		});
	}

	function createSuccess()
	{
		location.href = page.listPromo;
	}


