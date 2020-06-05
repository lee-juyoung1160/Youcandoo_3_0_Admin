
	const tabPromo 		= $("#tabPromo");
	const tabDoit 		= $("#tabDoit");
	const promoDetail	= $("#promoDetail");
	const involveDoit	= $("#involveDoit");
	const goUpdate		= $("#goUpdate");

	/** 프로모션 탭 **/
	const bizName 		= $("#bizName");
	const promoName 	= $("#promoName");
	const budget 		= $("#budget");
	const period 		= $("#period");
	const promoNotice 	= $("#promoNotice");
	const allowCount	= $("#allowCount");
	const banner 		= $("#banner");
	const intro 		= $("#intro");
	/*const createType 	= $("#createType");*/
	const isExposure 	= $("#isExposure");
	const rewardTab     = $("#rewardTab");
	const rewardDetail  = $("#rewardDetail");

	/** 두잇탭 **/
	const dataTable		= $("#dataTable")
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const dataNum		= $(".data-num");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];


	$(document).ready(function () {
		/** 프로모션 상세정보 **/
		getPromotion();
		/** 이벤트 **/
		tabPromo	.on("click", function () { onClickPromoTab(); });
		tabDoit		.on("click", function () { onClickDoitTab(); });
		xlsxExport	.on("click", function () { onClickExcelBtn(); });
		goUpdate	.on('click', function () { goUpdatePage(); })
	});

	function onClickPromoTab()
	{
		promoDetail.show();
		involveDoit.hide();
		tabDoit.removeClass('active');
		tabPromo.addClass('active');

		getPromotion();
	}

	function onClickDoitTab()
	{
		involveDoit.show();
		promoDetail.hide();
		tabPromo.removeClass('active');
		tabDoit.addClass('active');

		getInvolveDoit();
	}

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

	let rewards;
	function buildPromoDetail(data)
	{
		let details 	= data.data;
		let detailPromo	= details.promotion;
		console.log(detailPromo)
		rewards 	= details.reward;
		let notice 		= detailPromo.promotion_notice;
		notice = notice.replace('[', '').replace(']', '');
		notice = replaceAll(notice, '"', '');
		let notices = notice.split(",");
		let noticeDom = '';

		bizName.html(detailPromo.nickname);
		promoName.html(detailPromo.promotion_title);
		budget.html(numberWithCommas(detailPromo.budget_ucd)+'원');
		period.html(detailPromo.start_date + ' ~ ' + detailPromo.end_date);
		for (let i=0; i<notices.length; i++)
			noticeDom += ' <p class="detail-data">'+(i+1)+'. '+notices[i]+'</p>';
		promoNotice.html(noticeDom);
		allowCount.html(detailPromo.promotion_allow_count);
		banner.attr('src', detailPromo.banner_image_url);
		intro.attr('src', detailPromo.intro_image_url);
		/*createType.html(detailPromo.doit_create_mode === 'user' ? label.createDoitUser : label.createDoitAdmin);*/
		isExposure.html(detailPromo.is_banner === 'Y' ? label.exposure : label.unexpose);

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
		detailDom += 		'<div class="col-wrap clearfix">';
		detailDom += 			'<div class="col-1">';
		detailDom += 				'<p class="sub-title">리워드 비율</p>';
		detailDom += 			'</div>';
		detailDom += 			'<div class="col-2">';
		detailDom += 				'<p class="detail-data">개인 '+reward.person_percent+' : 단체 '+reward.group_percent+'</p>';
		detailDom += 			'</div>';
		detailDom += 		'</div>';
		detailDom += 		'<div class="col-wrap">';
		detailDom += 			'<p class="sub-title" style="margin-bottom: 5px;">인당 UCD</p>';
		detailDom += 			'<p class="detail-data">';
		detailDom += 			'<table>';
		detailDom += 				'<colgroup>';
		detailDom += 					'<col style="width:50%;">';
		detailDom += 					'<col style="width:50%;">';
		detailDom += 				'</colgroup>';
		detailDom += 				'<thead>';
		detailDom += 				'<tr>';
		detailDom += 					'<th>참여자 수(명)</th>';
		detailDom += 					'<th>인당 UCD</th>';
		detailDom += 				'</tr>';
		detailDom += 				'</thead>';
		detailDom += 				'<tbody>';
		detailDom += 				'<tr>';
		detailDom += 					'<td>'+numberWithCommas(jsonUcdInfo.min)+' ~ '+numberWithCommas(jsonUcdInfo.max)+'</td>';
		detailDom += 					'<td><span class="text-right">'+numberWithCommas(jsonUcdInfo.per_person_ucd)+'</span></td>';
		detailDom += 				'</tr>';
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
					return tableParams(d);
				}
			},
			columns: [
				{title: "No", 		data: "idx",    	   			width: "5%",     orderable: false,   className: "text-center" }
				,{title: "두잇 명", 	data: "doit_title",    			width: "35%",    orderable: false,   className: "text-center" }
				,{title: "참여인원/모집인원", 	data: "max_user",    	width: "15%",    orderable: false,   className: "text-center" }
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

				dataNum.html(info.recordsTotal);
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
		let titleDom  = $(nRow).children().eq(1);
		let countUserDom = $(nRow).children().eq(2);
		let periodDom = $(nRow).children().eq(3);
		let detailUrl = page.detailDoit+aData.idx;
		let period    = aData.action_start_datetime + ' ~ ' + aData.action_end_datetime;

		/** 제목에 a 태그 추가 **/
		titleDom.html('<a href="'+detailUrl+'">'+aData.doit_title+'</a>');
		/** 참여인원/모집인원 **/
		countUserDom.html(aData.doit_member+"/"+aData.max_user);
		/** 인증기간 **/
		periodDom.text(period);
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
