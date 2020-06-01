
	const bizName 		 = $("#bizName");
	const promoName		 = $("#promoName");
	const budget 		 = $("#budget");
	const promoFrom	 	 = $("#promoFrom");
	const promoTo		 = $("#promoTo");
	const btnNoticeAdd	 = $("#btnNoticeAdd");
	const noticeArea	 = $("#noticeArea");
	const allowCount	 = $("#allowCount");
	const banner		 = $("#banner");
	const intro		 = $("#intro");
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
	const rewardSelectArea 	 = $("#rewardSelectArea");
	const btnRewardTab	 = $("[data-rel]");
	const btnRewardTitle = $(".btn-reward-title");
	const rewardTitle 	 = $(".reward-title");
	const iconUserRewardDelete	 = $("#iconUserRewardDelete");
	const btnCreateReward	 = $(".reward-add-btn")
	const userReward	 = $(".reward-user")
	const rewardWrap 	 = $(".pro-reward-wrap");
	const btnDuration	 = $(".duration");
	const btnFrequency	 = $(".frequency");
	const goalRange1	 = $("#goalRange1");
	const goalRange2	 = $("#goalRange2");
	const goalRange3	 = $("#goalRange3");
	const goalRange4	 = $("#goalRange4");
	const goalRange5	 = $("#goalRange5");
	const goalRate1	 	 = $("#goalRate1");
	const goalRate2	 	 = $("#goalRate2");
	const goalRate3	 	 = $("#goalRate3");
	const goalRate4	 	 = $("#goalRate4");
	const goalRate5	 	 = $("#goalRate5");
	const rewardRange1	 = $("#rewardRange1");
	const rewardRange2   = $("#rewardRange2");
	const rewardRange3	 = $("#rewardRange3");
	const rewardRange4	 = $("#rewardRange4");
	const rewardRange5	 = $("#rewardRange5");
	const personalRate1	 = $("#personalRate1");
	const personalRate2	 = $("#personalRate2");
	const personalRate3	 = $("#personalRate3");
	const personalRate4	 = $("#personalRate4");
	const personalRate5	 = $("#personalRate5");
	const groupRate1	 = $("#groupRate1");
	const groupRate2	 = $("#groupRate2");
	const groupRate3	 = $("#groupRate3");
	const groupRate4	 = $("#groupRate4");
	const groupRate5	 = $("#groupRate5");
	const inputRight	 = $(".input-right");
	const rewardUcd		 = $(".reward-ucd");
	const iconDeleteRow  = $(".icon-delete-row");
	const btnCreateRow   = $(".ucd-add-btn");
	const certDays		 = $(".cert-days");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 목표달성률 rage slider 초기화 **/
		initGoalRateRange1();
		initGoalRateRange2();
		initGoalRateRange3();
		initGoalRateRange4();
		initGoalRateRange5();
		/** 리워드 비율 range slider 초기화 **/
		initRewardRateRange1();
		initRewardRateRange2();
		initRewardRateRange3();
		initRewardRateRange4();
		initRewardRateRange5();
		/** input text 글자 수 체크 **/
		checkInputLength();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 주간빈도 초기화 **/
		toggleDisabledFrequency($(".reward-1").find(btnDuration).eq(0));
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		modalBizName	.on('keyup', function () { getBiz(); });
		bizName			.on('click', function () { onClickBizName(); });
		promoFrom		.on('change', function () { onChangePromoFrom(); });
		btnNoticeAdd	.on('click', function () { onClickBtnNoticeAdd(); });
		inputFile		.on('change', function () { onChangeValidationImage(this); });
		btnRewardTab	.on('click', function () { toggleRewardTab(this); });
		rewardTitle		.on('keyup', function () { onKeyupRewardTitle(this); });
		btnCreateReward	.on('click', function () { createUserReward(this); });
		iconUserRewardDelete	.on('click', function () { deleteUserReward(this); });
		btnDuration		.on('click', function () { onSelectDuration(this); });
		btnFrequency	.on('click', function () { toggleFrequency(this); });
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
		rewardTitle.each(function (index) {
			$(btnRewardTitle[index]).text($(this).val());
		});


	}

	/** 목표달성률 설정 레인지 슬라이더 **/
	function initGoalRateRange1()
	{
		goalRange1.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 80,
			max: 100,
			from: 90,
			step: 1,
			onStart: function(data) {
				goalRate1.prop("value", data.from);
			},
			onChange: function(data) {
				goalRate1.prop("value", data.from);
			}
		});
	}

	function initGoalRateRange2()
	{
		goalRange2.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 80,
			max: 100,
			from: 90,
			step: 1,
			onStart: function(data) {
				goalRate2.prop("value", data.from);
			},
			onChange: function(data) {
				goalRate2.prop("value", data.from);
			}
		});
	}

	function initGoalRateRange3()
	{
		goalRange3.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 80,
			max: 100,
			from: 90,
			step: 1,
			onStart: function(data) {
				goalRate3.prop("value", data.from);
			},
			onChange: function(data) {
				goalRate3.prop("value", data.from);
			}
		});
	}

	function initGoalRateRange4()
	{
		goalRange4.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 80,
			max: 100,
			from: 90,
			step: 1,
			onStart: function(data) {
				goalRate4.prop("value", data.from);
			},
			onChange: function(data) {
				goalRate4.prop("value", data.from);
			}
		});
	}

	function initGoalRateRange5()
	{
		goalRange5.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 80,
			max: 100,
			from: 90,
			step: 1,
			onStart: function(data) {
				goalRate5.prop("value", data.from);
			},
			onChange: function(data) {
				goalRate5.prop("value", data.from);
			}
		});
	}

	/** 개인+그룹일 때 리워드 분배 비율 설정 레인지 슬라이더 **/
	function initRewardRateRange1()
	{
		rewardRange1.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 10,
			max: 90,
			from: 50,
			step: 10,
			onStart: function(data) {
				personalRate1.prop("value", data.from);
				groupRate1.prop("value", 100 - data.from);
			},
			onChange: function(data) {
				personalRate1.prop("value", data.from);
				groupRate1.prop("value", 100 - data.from);
			}
		});
	}

	function initRewardRateRange2()
	{
		rewardRange2.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 10,
			max: 90,
			from: 50,
			step: 10,
			onStart: function(data) {
				personalRate2.prop("value", data.from);
				groupRate2.prop("value", 100 - data.from);
			},
			onChange: function(data) {
				personalRate2.prop("value", data.from);
				groupRate2.prop("value", 100 - data.from);
			}
		});
	}

	function initRewardRateRange3()
	{
		rewardRange3.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 10,
			max: 90,
			from: 50,
			step: 10,
			onStart: function(data) {
				personalRate3.prop("value", data.from);
				groupRate3.prop("value", 100 - data.from);
			},
			onChange: function(data) {
				personalRate3.prop("value", data.from);
				groupRate3.prop("value", 100 - data.from);
			}
		});
	}

	function initRewardRateRange4()
	{
		rewardRange4.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 10,
			max: 90,
			from: 50,
			step: 10,
			onStart: function(data) {
				personalRate4.prop("value", data.from);
				groupRate4.prop("value", 100 - data.from);
			},
			onChange: function(data) {
				personalRate4.prop("value", data.from);
				groupRate4.prop("value", 100 - data.from);
			}
		});
	}

	function initRewardRateRange5()
	{
		rewardRange5.ionRangeSlider({
			skin: "round",
			type: "single",
			min: 10,
			max: 90,
			from: 50,
			step: 10,
			onStart: function(data) {
				personalRate5.prop("value", data.from);
				groupRate5.prop("value", 100 - data.from);
			},
			onChange: function(data) {
				personalRate5.prop("value", data.from);
				groupRate5.prop("value", 100 - data.from);
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
		$(nRow).attr('onClick', 'setSelectedBiz(\''+aData.value+'\')');
	}

	function setSelectedBiz(name)
	{
		bizName.val(name);
		modalFadeout();
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
		diff = Math.ceil(diff / (1000 * 3600 * 24));

		return diff;
	}

	/** 유의사항 Dom 추가 **/
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
		let noticeTxt = ['프로모션 두잇은 동시에 최대 3개까지만 참여 가능합니다.', '프로모션 기간이 종료되면 두잇을 개설하실 수 없습니다.', '프로모션 예산이 모두 소진된 경우 두잇을 개설하실 수 없습니다.'];
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

	/** 리워드 조건 1, 2, 3, 4, 5 버튼 이벤트 **/
	function toggleRewardTab(obj)
	{
		let viewTarget = $(obj).data('rel');

		$(obj).parent().siblings().removeClass('on');
		$(obj).parent().addClass('on');

		rewardWrap.hide();
		$('.' + viewTarget).show();

		calculateTotalUcd(inputRight);
	}

	function createUserReward(obj)
	{
		userReward.show();
		$(obj).hide();
	}

	function deleteUserReward(obj)
	{
		$(obj).parent().removeClass('on');
		btnCreateReward.show();
		userReward.hide();
		toggleRewardTab(rewardSelectArea.find('span').eq(0));
	}

	/** 리워드 제목 입력하면 탭이름도 변경되는 이벤트 **/
	function onKeyupRewardTitle(obj)
	{
		let inputValue = $(obj).val();
		let idx = 0;
		rewardTitle.each(function (index) {
			if ($(this).val() === inputValue)
				idx = index;
		});

		$(btnRewardTitle[idx]).text(inputValue);
	}

	function onSelectDuration(obj)
	{
		toggleDisabledFrequency(obj);
		toggleActiveDuration(obj);
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

	/** 인증기간 선택에 따라 주간빈도 enable, disable **/
	function toggleDisabledFrequency(obj)
	{
		let	selectedFrequency = $(obj).data('days');

		if (selectedFrequency === 1)
			disabledFrequency(obj);
		else
			enabledFrequency(obj);
	}

	/** 주간빈도 disabled **/
	function disabledFrequency(obj)
	{
		let frequencyUl = $(obj).parents('ul.pro-reward').find('.frequency-ul');

		if (!$(frequencyUl).hasClass('disabled'))
			$(frequencyUl).addClass('disabled');
	}

	/** 주간빈도 enabled **/
	function enabledFrequency(obj)
	{
		let frequencyUl = $(obj).parents('ul.pro-reward').find('.frequency-ul');

		if ($(frequencyUl).hasClass('disabled'))
			$(frequencyUl).removeClass('disabled');

		$(frequencyUl).children().removeClass('active');
	}

	/** 주간빈도 버튼 active 토글 **/
	function toggleFrequency(obj)
	{
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
			alert('인증기간이 1일이 넘을 경우 주간 빈도는 '+message.required+'\n리워드 조건의 주간 빈도를 '+message.doubleChk);
			return false;
		}

		if (isEmptyRewardUcd())
		{
			alert('인당 UCD는 '+message.required+'\n리워드 조건의 인당 UCD 입력을 '+message.doubleChk);
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
		let rewardSelectDoms = rewardSelectArea.find('li');
		let rewardSelectDomLength = rewardSelectDoms.length;
		for (let i=0; i<rewardSelectDomLength; i++)
		{
			/** 사용자 지정 리워드 조건이 추가된 경우, 리워드 조건 5의 input도 validation **/
			if (i < rewardSelectDomLength - 1 || $(rewardSelectDoms[rewardSelectDomLength - 1]).css('display') !== 'none')
			{
				$(ucdTable[i]).find('input').each(function () {
					if (isEmpty($(this).val())) retVal = true;
				});
			}
		}

		return retVal;
	}

	function isOverDuration()
	{
		let retVal = false;
		let promoTerm = calculateTerm();

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
		let rewardSelectDoms = rewardSelectArea.find('li');
		let rewardSelectDomLength = rewardSelectDoms.length;
		for (let i=0; i<rewardSelectDomLength; i++)
		{
			if (i < rewardSelectDomLength - 1 || $(rewardSelectDoms[rewardSelectDomLength - 1]).css('display') !== 'none')
			{
				let activeDuration = $(rewardDom[i]).find('.duration.active');
				let activeFrequency = $(rewardDom[i]).find('.frequency.active');
				let activeFrequencyLen = activeFrequency.length;

				if ($(activeDuration).data('days') > 1 && activeFrequencyLen == 0)
					retVal = true;
			}
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

			if (totalUcd > budget.val()) retVal = true;
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

		let rewardSelectDoms = rewardSelectArea.find('li');
		let rewardSelectDomLength = rewardSelectDoms.length;
		let rewards = [];
		for (let i=0; i<rewardSelectDomLength; i++)
		{
			/** 사용자 지정 리워드 조건이 추가된 경우만 파라미터에 담는다. **/
			if (i < rewardSelectDomLength -1 || $(rewardSelectDoms[rewardSelectDomLength -1]).css('display') !== 'none')
			{
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
				let personalRate = $(rewardWrap[i]).find('.individual-rate');
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
					,"individual-rate" 	: personalRate.val()
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
						alert(message.ajaxError);
					}
				});
			}
		}
	}


