
	const tabPromo 		= $("#tabPromo");
	const tabDoit 		= $("#tabDoit");
	const tabUcd 		= $("#tabUcd");
	const goUpdate		= $("#goUpdate");

	/** 프로모션 탭 **/
	const promoDetail	= $("#promoDetail");
	const bizName 		= $("#bizName");
	const promoName 	= $("#promoName");
	const budget 		= $("#budget");
	const balance 		= $("#balance");
	const period 		= $("#period");
	const promoNotice 	= $("#promoNotice");
	const allowCount	= $("#allowCount");
	const banner 		= $("#banner");
	const intro 		= $("#intro");
	const isExposure 	= $("#isExposure");
	const rewardTab     = $("#rewardTab");
	const rewardDetail  = $("#rewardDetail");

	/** 두잇탭 **/
	const involveDoit		= $("#involveDoit");
	const doitTable			= $("#doitTable")
	const selPageLengthForDoit 	= $("#selPageLengthForDoit");
	const xlsxExport 		= $(".excel-btn");

	/** Ucd정보탭 **/
	const ucdInfo		= $("#ucdInfo");
	const ucdTable		= $("#ucdTable")
	const selPageLengthForUcd 	= $("#selPageLengthForUcd");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$(document).ready(function () {
		/** 프로모션 상세정보 **/
		getPromotion();
		/** 이벤트 **/
		tabPromo	.on("click", function () { onClickPromoTab(this); });
		tabDoit		.on("click", function () { onClickDoitTab(this); });
		tabUcd		.on("click", function () { onClickUcdTab(this); });
		xlsxExport	.on("click", function () { onClickExcelBtn(); });
		selPageLengthForDoit.on("change", function () { getInvolveDoit(); });
		selPageLengthForUcd	.on("change", function () { onClickUcdTab(); });
		goUpdate	.on('click', function () { goUpdatePage(); })
	});

	/** 프로모션탭 **/
	function onClickPromoTab(obj)
	{
		promoDetail.show();
		involveDoit.hide();
		ucdInfo.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		getPromotion();
	}

	/** 개설두잇탭 **/
	function onClickDoitTab(obj)
	{
		involveDoit.show();
		promoDetail.hide();
		ucdInfo.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		getInvolveDoit();
	}

	/** UCD정보탭 **/
	function onClickUcdTab(obj)
	{
		ucdInfo.show();
		involveDoit.hide();
		promoDetail.hide();
		$(obj).siblings().removeClass('active');
		$(obj).addClass('active');
		getUcdLog();
	}

	function getPromotion()
	{
		$.ajax({
			url: api.detailPromotion,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"promotion_idx" : idx}),
			success: function(data) {
				if (isSuccessResp(data))
					buildPromoDetail(data);
				else
				{
					alert(invalidResp(data));
					location.href = page.listPromo
				}
			},
			error: function (request, status) {
				alert(label.detailContent+message.ajaxLoadError);
				location.href = page.listPromo
			},
		});
	}

	let g_promotion_uuid;
	let rewards;
	function buildPromoDetail(data)
	{
		let details 	= data.data;
		let detailPromo	= details.promotion;

		rewards 		= details.reward;

		g_promotion_uuid = detailPromo.promotion_uuid;

		bizName.html(detailPromo.nickname);
		promoName.html(detailPromo.promotion_title);
		budget.html(numberWithCommas(detailPromo.budget_ucd)+'원');
		balance.html(numberWithCommas(detailPromo.remain_budget_ucd));
		period.html(detailPromo.start_date + ' ~ ' + detailPromo.end_date);
		let notices = detailPromo.promotion_notice;
		let noticeDom = '';
		for (let i=0; i<notices.length; i++)
			noticeDom += '<p class="detail-data">'+notices[i]+'</p>';
		promoNotice.html(noticeDom);
		allowCount.html(detailPromo.promotion_allow_count+'회');
		banner.attr('src', detailPromo.banner_image_url);
		intro.attr('src', detailPromo.intro_image_url);
		isExposure.html(detailPromo.is_banner === 'Y' ? label.y : label.n);

		let rewardLen = rewards.length;
		let rewardTabDom = '';
		for (let i=0; i<rewardLen; i++)
		{
			let statusOn = i === 0 ? 'on' : '';
			let reward = rewards[i];
			rewardTabDom += '<li onclick="onClickRewardTab(this);" data-idx="'+i+'" class="'+statusOn+'">';
			rewardTabDom += 	'<span class="tag-name">'+reward.title+'</span>';
			rewardTabDom += '</li>';
		}

		rewardTab.html(rewardTabDom);
		onClickRewardTab(rewardTab.find('li').eq(0));

		removeModifyBtn(detailPromo);
	}

	function removeModifyBtn(detailPromo)
	{
		if (detailPromo.status !== 'pending')
			goUpdate.remove();
	}

	function onClickRewardTab(obj)
	{
		toggleActive(obj);
		buildReward(obj)
	}

	function toggleActive(obj)
	{
		rewardTab.find('li').removeClass('on');
		$(obj).addClass('on');
	}

	function buildReward(obj)
	{
		let idx = $(obj).data('idx');
		let reward = rewards[idx];
		let ucdInfo = reward.ucd_info;
		ucdInfo = ucdInfo.replace('[', '').replace(']', '').replace(/\\/g,'');
		ucdInfo = ucdInfo.slice(1, -1);
		let jsonUcdInfo = JSON.parse(ucdInfo);

		let detailDom = '';
		detailDom += '<li class="reward-1">';
		detailDom += 	'<div class="list-inner">';
		detailDom += 		'<p class="title">';
		detailDom += 			'<strong>'+reward.title+'</strong>';
		detailDom += 		'</p>';
		detailDom += 		'<div class="col-wrap clearfix">';
		detailDom += 			'<div class="col-1">';
		detailDom += 				'<p class="sub-title">인증기간</p>';
		detailDom += 			'</div>';
		detailDom += 			'<div class="col-2">';
		detailDom += 				'<p class="detail-data">'+reward.action_duration+'일</p>';
		detailDom += 			'</div>';
		detailDom += 		'</div>';
		detailDom += 		'<div class="col-wrap clearfix">';
		detailDom += 			'<div class="col-1">';
		detailDom += 				'<p class="sub-title">주간빈도</p>';
		detailDom += 			'</div>';
		detailDom += 			'<div class="col-2">';
		detailDom += 				'<p class="detail-data">'+reward.action_dayofweek+'</p>';
		detailDom += 			'</div>';
		detailDom += 		'</div>';
		detailDom += 		'<div class="col-wrap clearfix">';
		detailDom += 			'<div class="col-1">';
		detailDom += 				'<p class="sub-title">목표달성률</p>';
		detailDom += 			'</div>';
		detailDom += 			'<div class="col-2">';
		detailDom += 				'<p class="detail-data">'+reward.goal_percent+'%</p>';
		detailDom += 			'</div>';
		detailDom += 		'</div>';
		detailDom += 		'<div class="col-wrap">';
		detailDom += 			'<p class="sub-title" style="margin-bottom: 5px;">인당 UCD</p>';
		detailDom += 			'<p class="detail-data">';
		detailDom += 			'<table>';
		detailDom += 				'<colgroup>';
		detailDom += 					'<col style="width:35%;">';
		detailDom += 					'<col style="width:20%;">';
		detailDom += 					'<col style="width:20%;">';
		detailDom += 				'</colgroup>';
		detailDom += 				'<thead>';
		detailDom += 					'<tr>';
		detailDom += 						'<th rowspan="2">참여자 수(명)</th>';
		detailDom += 						'<th colspan="2">인당 UCD</th>';
		detailDom += 					'</tr>';
		detailDom += 					'<tr>';
		detailDom += 						'<th>개인</th>';
		detailDom += 						'<th>단체</th>';
		detailDom += 					'</tr>';
		detailDom += 				'</thead>';
		detailDom += 				'<tbody>';
		detailDom += 					'<tr>';
		detailDom += 						'<td>'+numberWithCommas(jsonUcdInfo.min)+' ~ '+numberWithCommas(jsonUcdInfo.max)+'</td>';
		detailDom += 						'<td><span class="text-right">'+numberWithCommas(jsonUcdInfo.person_reward)+'</span></td>';
		detailDom += 						'<td><span class="text-right">'+numberWithCommas(jsonUcdInfo.group_reward)+'</span></td>';
		detailDom += 					'</tr>';
		detailDom += 				'</tbody>';
		detailDom += 			'</table>';
		detailDom += 			'</p>';
		detailDom += 		'</div>';
		detailDom += 	'</div>';
		detailDom += '</li>';

		rewardDetail.html(detailDom);
	}

	function getInvolveDoit()
	{
		doitTable.DataTable({
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
					return doitTableParams(d);
				}
			},
			columns: [
				{title: "두잇 명", 	data: "doit_title",    			width: "35%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "참여인원/모집인원", 	data: "max_user",    	width: "15%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "인증기간", data: "action_start_datetime",   width: "20%",    orderable: false,   className: "text-center cursor-default" }
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
			pageLength: Number(selPageLengthForDoit.val()),
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
			},
			fnRowCallback: function( nRow, aData ) {
				setDoitRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(doitTable);
			}
		});
	}
	
	function doitTableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"promotion_idx" : idx
		}

		return JSON.stringify(param);
	}

	function setDoitRowAttributes(nRow, aData)
	{
		let titleDom  = $(nRow).children().eq(0);
		let countUserDom = $(nRow).children().eq(1);
		let periodDom = $(nRow).children().eq(2);
		let detailUrl = page.detailDoit+aData.idx;
		let period    = aData.action_start_datetime + ' ~ ' + aData.action_end_datetime;

		/** 제목에 a 태그 추가 **/
		titleDom.html('<a href="'+detailUrl+'">'+aData.doit_title+'</a>');
		/** 참여인원/모집인원 **/
		countUserDom.html(aData.doit_member+"/"+aData.max_user);
		/** 인증기간 **/
		periodDom.text(period);
	}

	function getUcdLog()
	{
		ucdTable.DataTable({
			ajax : {
				url: api.listPromotionUcd,
				type: "POST",
				headers: headers,
				data: function (d) {
					return ucdTableParams(d);
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분", data: "division",   	width: "10%",     orderable: false,   className: "text-center cursor-default" }
                ,{title: "금액", data: "amount",   		width: "10%",     orderable: false,   className: "text-center cursor-default",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "제목", data: "title",  		width: "15%",     orderable: false,   className: "text-center cursor-default" }
                ,{title: "내용", data: "description",   	width: "25%",     orderable: false,   className: "text-center cursor-default" }
                ,{title: "일시", data: "created",   		width: "15%",     orderable: false,   className: "text-center cursor-default" }
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
			pageLength: Number(selPageLengthForUcd.val()),
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
			},
			fnRowCallback: function( nRow, aData ) {
				setUcdRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(ucdTable);
			}
		});
	}

	function ucdTableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"promotion_uuid" : g_promotion_uuid
		}

		return JSON.stringify(param);
	}

	function setUcdRowAttributes(nRow, aData)
	{
		if (isNegative(aData.amount))
			$(nRow).addClass('minus-pay');
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	function onClickExcelBtn()
	{
		getExcelData();
	}

	function getExcelData()
	{
		$.ajax({
			url: api.involveDoitPromotion,
			type: "POST",
			dataType: "json",
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("개설두잇목록", "개설두잇목록", data.data);
			},
			error: function (request, status) {
				alert(label.download+message.ajaxError);
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

	function goUpdatePage()
	{
		location.href = page.updatePromo+idx;
	}
