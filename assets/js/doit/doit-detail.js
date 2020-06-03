
	const tabDoit 		= $("#tabDoit");
	const tabUser 		= $("#tabUser");
	const tabAction		= $("#tabAction");
	const doitDetail	= $("#doitDetail");
	const doitUser		= $("#doitUser");
	const doitAction	= $("#doitAction");
	const actionWrap	= $("#actionWrap");
	const goUpdate      = $("#goUpdate");
	const selPageLengthForUserTab   = $("#selPageLengthForUserTab");
	const selPageLengthForActionTab = $("#selPageLengthForActionTab");

	/** 두잇정보 탭 **/
	const doitTitle 	= $("#doitTitle");
	const doitDesc 		= $("#doitDesc");
	const doitTags 		= $("#doitTags");
	const introWrap 	= $("#introWrap");
	const reward 		= $("#reward");
	const maxUser 		= $("#maxUser");
	const extraReward	= $("#extraReward");
	const actionDate 	= $("#actionDate");
	const actionTime 	= $("#actionTime");
	const options 		= $("#options");
	const actionType 	= $("#actionType");
	const actionResource = $("#actionResource");
	const actionDesc    = $("#actionDesc");

	/** 참여자정보 탭 **/
	const dataTable		= $("#dataTable")
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const dataNum		= $(".data-num");

	/** 인증정보 탭 **/
	const btnWarnRed	= $(".warning-btn");
	const btnWarnYellow	= $(".yellow-btn");
	const actionTopDom	= $("#actionTopDom");
	const actionTotal	= $(".action-total");
	const pagination	= $("#dataTable_paginate");
	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const causeBy		= $("#selCauseBy");
	const btnSubmitWarn	= $("#btnSubmitWarn");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$(document).ready(function () {
		/** 두잇 상세정보 **/
		getDoit();
		/** 이벤트 **/
		tabDoit			.on("click", function () { onClickDoitTab(); });
		tabUser			.on("click", function () { onClickUserTab(); });
		tabAction		.on("click", function () { onClickActionTab(); });
		xlsxExport		.on("click", function () { onClickExcelBtn(); });
		goUpdate		.on('click', function () { goUpdatePage(); })
		btnWarnYellow	.on('click', function () { onClickBtnWarn(); g_warn_type = 'Y'; });
		btnWarnRed		.on('click', function () { onClickBtnWarn(); g_warn_type = 'R'; });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		selPageLengthForActionTab.on('change', function () { getInvolveAction(); });
		btnSubmitWarn	.on('click', function () { onSubmitWarn(); });
	});

	/** 두잇정보탭 **/
	function onClickDoitTab()
	{
		doitDetail.show();
		doitUser.hide();
		doitAction.hide();
		tabUser.removeClass('active');
		tabAction.removeClass('active');
		tabDoit.addClass('active');

		getDoit();
	}

	function getDoit()
	{
		$.ajax({
			url: api.detailDoit,
			type: "POST",
			async: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"idx" : idx}),
			success: function(data) {
				if (isSuccessResp(data))
					buildDoitDetail(data);
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert(message.ajaxError);
			},
		});
	}

	let g_doitUuid;
	let g_doitTitle;
	function buildDoitDetail(data)
	{
		let detail 	 = data.data;

		g_doitUuid = detail.doit_uuid;
		g_doitTitle = detail.doit_title;

		doitTitle.html(detail.doit_title);

		let desc = isEmpty(detail.doit_description) ? '-' : detail.doit_description;
		doitDesc.html(desc);

		let tag  = detail.doit_tags;
		let tags = tag.split(",");
		let tagDom = '';
		for (let i=0; i<tags.length; i++)
		{
			tagDom += '<li>';
			tagDom += 	'<span class="tag-name">'+tags[i]+'</span>';
			tagDom += '</li>';
		}
		doitTags.html(tagDom);

		let introImageDom = '';
		introImageDom += '<div class="file">';
		introImageDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
		introImageDom += 	'<img class="detail-img main-banner" src="'+detail.doit_image_url+'" alt="썸네일 이미지입니다.">';
		introImageDom += '</div>';
		if (!isEmpty(detail.doit_video_url))
		{
			introImageDom += '<div class="file">';
			introImageDom += 	'<p class="cap">영상</p>';
			introImageDom += 	'<video controls>';
			introImageDom += 		'<source src="'+detail.doit_video_url+'">';
			introImageDom += 	'</video>';
			introImageDom += '</div>';
		}
		introWrap.html(introImageDom);

		let rewardDom 	= '';
		let doitType  	= isEmpty(detail.promotion_uuid) ? label.regular : label.promotion;
		let bizName 	= isEmpty(detail.promotion_uuid) ? '' : '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'+detail.company_name;
		let promoTitle 	= isEmpty(detail.promotion_uuid) ? '' : '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'+detail.promotion_title;
		let doitInfo 	= doitType + bizName + promoTitle;
		let maxUcd		= numberWithCommas(Number(detail.person_reward)+Number(detail.group_reward));
		let remainUcd	= isEmpty(detail.remain_budget_ucd) ? '' : numberWithCommas(detail.remain_budget_ucd);
		let dayofweek   = isEmpty(detail.action_dayofweek) ? '-' : detail.action_dayofweek;
		let personRate  = Math.floor((Number(detail.person_reward)/detail.per_person_ucd) * 100);
		personRate = isNaN(personRate) ? '-' : personRate;
		let groupRate   = Math.floor((Number(detail.group_reward)/detail.per_person_ucd) *100);
		groupRate = isNaN(groupRate) ? '-' : groupRate;

		rewardDom += '<p class="detail-data">'+doitInfo+'</p>';
		rewardDom += '<div class="col-2-1" style="margin-top: 20px;">';
		rewardDom += 	'<p class="sub-title"><i class="far fa-check-square" style="color:#007aff; "></i> 리워드 조건</p>';
		rewardDom += 	'<p class="detail-data">';
		rewardDom += 		'두잇 참여 인원 : '+detail.doit_member+'명<br>';
		rewardDom += 		'인증기간 : '+detail.action_duration+'일<br>';
		rewardDom += 		'일일인증 횟수 : '+detail.action_daily_allow+'회<br>';
		rewardDom += 		'목표달성률 : '+Math.floor(detail.goal_percent)+'%<br>';
		rewardDom += 		'1인당 최대 지급할 UCD : '+maxUcd+'UCD<br>';
		rewardDom += 		'리워드 비율 : 개인 '+personRate+' 그룹 '+groupRate+'<br>';
		rewardDom += 		'주간빈도 : '+dayofweek;
		rewardDom += 	'</p>';
		rewardDom += 	'<p class="sub-title" style="margin-top: 40px;">'
		rewardDom += 		'<i class="fas fa-coins" style="color:#007aff; "></i> 잔여 프로모션 예산';
		rewardDom += 	'</p>';
		rewardDom += 	'<div class="fixed">';
		rewardDom += 		'<p class="cap">';
		rewardDom += 			'현재까지 남은 잔여 UCD는 ';
		rewardDom += 			'<span style="font-size: 19px; font-weight: 600; color: #007aff;">'+remainUcd+'UCD</span> 입니다.';
		rewardDom += 		'</p>';
		rewardDom += 	'</div>';
		rewardDom += '</div>';
		reward.html(rewardDom);

		maxUser.html(detail.max_user+'명');
		let xtraReward = isEmpty(detail.group_reward_description) ? '-' : detail.group_reward_description;
		extraReward.html(xtraReward);
		actionDate.html(detail.action_start_datetime + ' ~ ' + detail.action_end_datetime);
		actionTime.html(detail.action_allow_start_time + ' ~ ' + detail.action_allow_end_time);

		let optionDom = '-';
		if (!isEmpty(detail.private_code))
		{
			optionDom = '<p class="detail-data">참여자 제한 </p>';
			optionDom += '<p class="detail-data">참가자 코드 : '+detail.private_code+'</p>';
		}
		options.html(optionDom);

		actionType.html(getStringValueForActionType(detail.action_resource_type));

		actionResource.html(buildActionResource(detail));

		actionDesc.html(detail.action_description);
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
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
			actionResourceDom += 	'<img class="detail-img main-banner" src="'+data.example_thumbnail_image_url+'" alt="썸네일 이미지입니다.">';
			actionResourceDom += '</div>';
		}
		else if (type === 'video')
		{
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
			actionResourceDom += 	'<img class="detail-img main-banner" src="'+data.example_video_thumbnail_image_url+'" alt="썸네일 이미지입니다.">';
			actionResourceDom += '</div>';
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">영상</p>';
			actionResourceDom += 	'<video controls>';
			actionResourceDom += 		'<source src="'+data.example_video_url+'">';
			actionResourceDom += 	'</video>';
			actionResourceDom += '</div>';
		}
		else if (type === 'voice')
		{
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">음성</p>';
			actionResourceDom += 	'<audio controls>';
			actionResourceDom += 		'<source src="'+data.example_voice_url+'">';
			actionResourceDom += 	'</audio>';
			actionResourceDom += '</div>';
		}

		return actionResourceDom;
	}

	/** 참여자정보탭 **/
	function onClickUserTab()
	{
		doitUser.show();
		doitDetail.hide();
		doitAction.hide();
		tabDoit.removeClass('active');
		tabAction.removeClass('active');
		tabUser.addClass('active');

		//getJoinUser();
	}

	function getJoinUser()
	{
		$("#dataTable").DataTable({
			ajax : {
				url: api.involveDoitPromotion,
				type:"POST",
				headers: headers,
				data: function (d) {
					/*
					if (d.order.length > 0)
					{
						var columnIndex = d.order[0].column;
						d.sort = d.columns[columnIndex].name;
						d.order = d.order[0].dir;
					}
				   */
					console.log(d);
					return tableParams(d);
				}
			},
			columns: [
				{title: "No", 		data: "idx",    	   			width: "5%",     orderable: false,   className: "text-center" }
				,{title: "두잇 ID", 	data: "doit_uuid",    			width: "20%",    orderable: false,   className: "text-center" }
				,{title: "두잇 명", 	data: "doit_title",    			width: "15%",    orderable: false,   className: "text-center" }
				,{title: "인증기간", data: "action_start_datetime",   width: "20%",    orderable: false,   className: "text-center" }
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
			paging: true,
			pageLength: Number(selPageLength.val()),
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				let table = dataTable.DataTable();
				let info = table.page.info();

				dataNum.text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"promotion_idx" : idx
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let periodDom = $(nRow).children().eq(3);
		let period    = aData.action_start_datetime + ' ~ ' + aData.action_end_datetime;

		/** 인증기간 **/
		periodDom.text(period);
	}

	/** 참여자정보탭 검색 이벤트 **/
	function onSubmitSearch()
	{
		buildGrid();
	}

	/** 엑셀 다운로드 **/
	function onClickExcelBtn()
	{
		getExcelData();
	}

	function getExcelData()
	{
		$.ajax({
			url: api.involveDoitPromotion,
			type: "POST",
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("개설두잇목록", "개설두잇목록", data);
			},
			error: function (request, status) {
				alert(message.ajaxError);
			}
		});
	}

	function excelParams()
	{
		let param = {
			"limit" : 10000
			,"page" : 1
			,"promotion_idx" : idx
		}

		return JSON.stringify(param);
	}

	/** 인증정보탭 **/
	let g_warn_type;
	function onClickActionTab()
	{
		doitAction.show();
		doitDetail.hide();
		doitUser.hide();
		tabDoit.removeClass('active');
		tabUser.removeClass('active');
		tabAction.addClass('active');
		currentPage = 1;
		getInvolveAction();
	}

	function initModal()
	{
		causeBy.children().eq(0).prop("selected", true);
		onChangeSelectOption(causeBy);
	}

	function onClickBtnWarn()
	{
		if (isCheckedTarget())
			modalFadein();
	}

	function isCheckedTarget()
	{
		let count = $("input[name=chk-warn]:checked").length;
		if (count === 0)
		{
			alert('발송대상을 '+message.select);
			return false;
		}

		return true;
	}

	function onSubmitWarn()
	{
		let url  = g_warn_type === 'Y' ? api.setYellow : api.setRed;

		if (confirm('경고장을 '+message.send))
		{
			$.ajax({
				url: url,
				type: "POST",
				async: false,
				headers: headers,
				dataType: 'json',
				data: warnParams(),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
					{
						modalFadeout();
						getInvolveAction();
					}
					else
						alert(invalidResp(data));
				},
				error: function (request, status) {
					alert(message.ajaxError);
				},
			});
		}
	}

	function warnParams()
	{
		let uuids = [];
		$("input[name=chk-warn]").each(function () {
			if ($(this).is(":checked"))
				uuids.push($(this).val());
		})

		let param = {
			"action_list" : uuids
			,"description" : causeBy.val()
		}

		return JSON.stringify(param);
	}

	function cancelWarn(type, uuid)
	{
		let url = type === 'Y' ? api.cancelYellow : api.cancelRed;
		let param = {
			"action_uuid" : uuid
		}

		if (confirm('경고장 발송을 '+message.cancel))
		{
			$.ajax({
				url: url,
				type: "POST",
				headers: headers,
				dataType: 'json',
				data: JSON.stringify(param),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
						getInvolveAction();
				},
				error: function (request, status) {
					alert(message.ajaxError);
				}
			});
		}
	}

	function getInvolveAction()
	{
		$.ajax({
			url: api.involveAction,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: actionParams(),
			success: function(data) {
				if (isSuccessResp(data))
				{
					buildPagination(data);
					buildActionInfo(data);
				}
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert(message.ajaxError);
			}
		});
	}

	function actionParams()
	{
		let param = {
			"doit_uuid" : g_doitUuid
			,"page" : currentPage
			,"limit" : selPageLengthForActionTab.val()
		}

		return JSON.stringify(param);
	}

	function buildActionInfo(data)
	{
		let actions    = data.data;
		let dataLen    = actions.length;
		let totalCount = data.recordsTotal
		let actionDom  = '<p class="empty-message">인증 정보가 없습니다.</p>';

		/** total count **/
		actionTotal.html(totalCount);

		if (totalCount > 0)
		{
			actionTopDom.show();
			actionDom = '';
			for (let i=0; i<dataLen; i++)
			{
				let action    = actions[i];
				let actionId  = "action_"+i;
				let successYn = action.success === 'Y' ? '성공' : '실패';
				let resourceType = action.resource_type;
				let warnDesc = '';
				let warnImage = '';
				let actionImage = '<img class="detail-img" src="'+action.url+'" alt="인증 이미지입니다.">';
				if (isEmpty(action.url))
					actionImage = '<img class="detail-img" src="/assets/images/no-image.jpg" alt="인증 이미지입니다.">';
				if (resourceType === 'voice')
					actionImage = '<img class="detail-img" src="/assets/images/voice.jpg" alt="인증 이미지입니다.">';
				let button = '<button onclick="modalFadein();" class="warning-btn" type="button" data-uuid="'+action.action_uuid+'">경고장</button>';
				if (action.yellow_card === 'Y')
				{
					warnImage = '<img src="/assets/images/yellow-card.png" alt="">';
					warnDesc = action.yellow_card_description;
					button = '<button onclick="cancelWarn(\'Y\',\''+action.action_uuid+'\');" class="card-btn clear-yellow-btn" type="button">옐로카드 취소</button>';
				}
				if (action.red_card === 'Y')
				{
					warnImage = '<img src="/assets/images/red-card.png" alt="">';
					warnDesc = action.red_card_description;
					button = '<button onclick="cancelWarn(\'R\',\''+action.action_uuid+'\');" class="card-btn clear-red-btn" type="button">레드카드 취소</button>';
				}
				if (action.yellow_card === 'Y' && action.red_card === 'Y')
				{
					warnImage = '<img src="/assets/images/rad-yellow-card.png" alt="">';
					warnDesc = action.red_card_description;
					button = '<button onclick="cancelWarn(\'R\',\''+action.action_uuid+'\');" class="card-btn clear-red-btn" type="button">레드카드 취소</button>';
				}

				if (i===0 || i%5 === 0)
					actionDom += '<ul class="cert-contents clearfix">';

				actionDom += '<li>';
				actionDom += 	'<div class="top clearfix">';
				actionDom += 		'<div class="checkbox-wrap">';
				actionDom += 			'<input type="checkbox" id="'+actionId+'" name="chk-warn" value="'+action.action_uuid+'"/>';
				actionDom += 			'<label for="'+actionId+'"><span></span></label>';
				actionDom += 		'</div>';
				actionDom += 		'<span class="success-text">'+successYn+'</span>';
				actionDom += 		'<i class="warning-icon fas fa-exclamation-triangle">';
				actionDom +=        '<span>신고 : <span class="cert-data-num">'+action.report_count+'</span></span></i>';
				actionDom += 	'</div>';
				actionDom += 	'<div class="thumbnail-wrap">';
				if (action.yellow_card === 'Y' || action.red_card === 'Y')
				{
					actionDom += 	'<div class="error">';
					actionDom += 		'<p class="error-text">';
					actionDom += 			'<i>';
					actionDom += 				warnImage;
					actionDom += 			'</i>';
					actionDom += 				warnDesc;
					actionDom += 		'</p>';
					actionDom += 		'<div class="card-wrap">';
					actionDom += 			button;
					actionDom += 		'</div>';
					actionDom += 	'</div>';
				}
				actionDom += 		actionImage;
				actionDom += 	'</div>';
				actionDom += 	'<div class="text-wrap">';
				actionDom += 		'<p class="title">'+g_doitTitle+'</p>';
				actionDom += 		'<a href="#">'+action.user_name+'</a>';
				actionDom += 		'<p class="date">'+action.action_datetime+'</p>';
				actionDom += 	'</div>';
				actionDom += '</li>';

				if (i>0 && (i+1)%5 === 0)
					actionDom += '</ul>';
			}
		}
		else actionTopDom.hide();

		actionWrap.html(actionDom);
	}

	let currentPage = 1;
	function buildPagination(data)
	{
		let totalCount  = data.recordsTotal;
		let last		= Math.ceil(totalCount / selPageLengthForActionTab.val());
		let pageLength  = 7;
		if (last <= 10)
			pageLength = last
		let i;

		let pageDom = '';
		if (currentPage === 1)
			pageDom += '<a class="paginate_button previous" id="dataTable_previous">';
		else
			pageDom += '<a onclick="onClickPageNum(this)" class="paginate_button previous" data-page="'+(currentPage-1)+'" id="dataTable_previous">';
		pageDom +=     label.previous;
		pageDom += '</a>';
		pageDom += '<span>';
		if (last <= 10)
		{
			for (i=1; i<=pageLength; i++)
			{
				if (last > 1 && currentPage === i)
					pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+i+'">'+i+'</a>';
				else
					pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
			}
		}
		else
		{
			for (i=1; i<=pageLength; i++)
			{
				if (currentPage < 5)
				{
					if (last > 1 && currentPage === i)
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+i+'">'+i+'</a>';
					else
					{
						if (pageLength === i)
						{
							pageDom += '<span class="ellipsis">…</span>';
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+last+'">'+last+'</a>';
						}
						else
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
					}
				}
				else if (currentPage >= 5 && currentPage <= last - 4)
				{
					if (i === 1)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
						pageDom += '<span class="ellipsis">…</span>';
					}

					if (currentPage === i)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="' + (i - 1) + '">' + (i - 1) + '</a>';
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="' + i + '">' + i + '</a>';
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="' + (i + 1) + '">' + (i + 1) + '</a>';
					}

					if (pageLength === i)
					{
						pageDom += '<span class="ellipsis">…</span>';
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+last+'">'+last+'</a>';
					}
				}
				else if (currentPage > last - 4)
				{
					if (i === 1)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
						pageDom += '<span class="ellipsis">…</span>';
					}

					if (i >= pageLength - 4)
					{
						if (currentPage === last-(pageLength-i))
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+(last-(pageLength-i))+'">'+(last-(pageLength-i))+'</a>';
						else
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+(last-(pageLength-i))+'">'+(last-(pageLength-i))+'</a>';
					}
				}
			}
		}
		pageDom += '</span>';
		if (last === currentPage)
			pageDom += '<a class="paginate_button next" id="dataTable_next">';
		else
			pageDom += '<a onclick="onClickPageNum(this)" class="paginate_button next" data-page="'+(currentPage+1)+'" id="dataTable_next">';
		pageDom += 	  label.next;
		pageDom += '</a>';

		pagination.html(pageDom);
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		currentPage = $(obj).data('page');

		getInvolveAction();
	}

	function goUpdatePage()
	{
		location.href = page.updateDoit+idx;
	}


