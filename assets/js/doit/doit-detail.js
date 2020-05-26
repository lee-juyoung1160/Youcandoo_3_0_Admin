
	const tabDoit 		= $("#tabDoit");
	const tabUser 		= $("#tabUser");
	const doitDetail	= $("#doitDetail");
	const doitUser		= $("#doitUser");

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
	const actionDesc     = $("#actionDesc");

	/** 참여자정보 탭 **/
	const dataTable		= $("#dataTable")
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const dataNum		= $(".data-num");
	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];


	$(document).ready(function () {

		/** 프로모션 상세정보 **/
		getDoit();

		tabDoit		.on("click", function () { onClickDoitTab(); });
		tabUser		.on("click", function () { onClickUserTab(); });
		xlsxExport	.on("click", function () { onClickExcelBtn(); });
	});

	function onClickDoitTab()
	{
		doitDetail.show();
		doitUser.hide();
		tabUser.removeClass('active');
		tabDoit.addClass('active');

		getDoit();
	}

	function onClickUserTab()
	{
		doitUser.show();
		doitDetail.hide();
		tabDoit.removeClass('active');
		tabUser.addClass('active');

		//getJoinUser();
	}

	function getDoit()
	{
		$.ajax({
			url: api.detailDoit,
			type: "POST",
			async: false,
			headers: headers,
			data: JSON.stringify({"idx" : idx}),
			success: function(data) {
				if (isSuccessResp(data))
					buildDoitDetail(data);
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				console.log(status);
			},
		});
	}

	function buildDoitDetail(data)
	{
		let jsonData = JSON.parse(data);
		let detail 	 = jsonData.data;
console.log(detail)
		doitTitle.html(detail.doit_title);
		doitDesc.html(detail.doit_description);
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
		let bizName 	= isEmpty(detail.promotion_uuid) ? '' : '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'+detail.company;
		let promoTitle 	= isEmpty(detail.promotion_uuid) ? '' : '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;'+detail.promotion_title;
		let doitInfo 	= doitType + bizName + promoTitle;
		let maxUcd		= numberWithCommas(Number(detail.person_reward)+Number(detail.group_reward));
		rewardDom += '<p class="detail-data">'+doitInfo+'</p>';
		rewardDom += '<div class="col-2-1" style="margin-top: 20px;">';
		rewardDom += 	'<p class="sub-title"><i class="far fa-check-square" style="color:#007aff; "></i> 리워드 조건</p>';
		rewardDom += 	'<p class="detail-data">';
		rewardDom += 		'두잇 참여 인원 : <br>';
		rewardDom += 		'인증기간 : '+detail.action_duration+'일<br>';
		rewardDom += 		'일일인증 횟수 : '+detail.action_daily_allow+'회<br>';
		rewardDom += 		'목표달성률 : '+Math.floor(detail.goal_percent)+'%<br>';
		rewardDom += 		'1인당 최대 지급할 UCD : '+maxUcd+' UCD<br>';
		rewardDom += 		'리워드 비율 : <br>';
		rewardDom += 		'주간빈도 : '+detail.action_dayofweek;
		rewardDom += 	'</p>';
		rewardDom += 	'<p class="sub-title" style="margin-top: 40px;">'
		rewardDom += 		'<i class="fas fa-coins" style="color:#007aff; "></i> 잔여 프로모션 예산';
		rewardDom += 	'</p>';
		rewardDom += 	'<div class="fixed">';
		rewardDom += 		'<p class="cap">';
		rewardDom += 			'현재까지 남은 잔여 UCD는';
		rewardDom += 			'<span style="font-size: 19px; font-weight: 600; color: #007aff;"> UCD</span> 입니다.';
		rewardDom += 		'</p>';
		rewardDom += 	'</div>';
		rewardDom += '</div>';
		reward.html(rewardDom);

		maxUser.html(detail.max_user+'명');
		extraReward.html();
		actionDate.html(detail.action_start_datetime + ' ~ ' + detail.action_end_datetime);
		actionTime.html(detail.action_allow_start_time + ' ~ ' + detail.action_allow_end_time);

		let optionDom = '-';
		if (!isEmpty(detail.private_code))
		{
			optionDom = '<p class="detail-data">참여자 제한 </p>';
			optionDom += '<p class="detail-data">참가자 코드 : '+detail.private_code+'</p>';
		}
		options.html(optionDom);

		actionType.html(detail.action_resource_type);

		let actionResourceDom = '';
		if (detail.action_resource_type === 'image')
		{
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
			actionResourceDom += 	'<img class="detail-img main-banner" src="'+detail.example_thumbnail_image_url+'" alt="썸네일 이미지입니다.">';
			actionResourceDom += '</div>';
		}
		else if (detail.action_resource_type === 'video')
		{
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
			actionResourceDom += 	'<img class="detail-img main-banner" src="'+detail.example_video_thumbnail_image_url+'" alt="썸네일 이미지입니다.">';
			actionResourceDom += '</div>';
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">영상</p>';
			actionResourceDom += 	'<video controls>';
			actionResourceDom += 		'<source src="'+detail.example_video_url+'">';
			actionResourceDom += 	'</video>';
			actionResourceDom += '</div>';
		}
		else if (detail.action_resource_type === 'voice')
		{
			actionResourceDom += '<div class="file">';
			actionResourceDom += 	'<p class="cap">음성</p>';
			actionResourceDom += 	'<audio controls>';
			actionResourceDom += 		'<source src="'+detail.example_voice_url+'">';
			actionResourceDom += 	'</audio>';
			actionResourceDom += '</div>';
		}
		actionResource.html(actionResourceDom);

		actionDesc.html(detail.action_description);
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
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("개설두잇목록", "개설두잇목록", data);
			},
			error: function (request, status) {
				console.log(status);
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


