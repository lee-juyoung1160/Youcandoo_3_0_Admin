
	const tabPromo 		= $("#tabPromo");
	const tabDoit 		= $("#tabDoit");
	const promoDetail	= $("#promoDetail");
	const involveDoit	= $("#involveDoit");

	/** 프로모션 탭 **/
	const bizName 		= $("#bizName");
	const promoName 	= $("#promoName");
	const budget 		= $("#budget");
	const period 		= $("#period");
	const banner 		= $("#banner");
	const thumbnail 	= $("#thumbnail");
	const createType 	= $("#createType");
	const isExposure 	= $("#isExposure");
	const rewardList    = $("#rewardList");

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

		tabPromo	.on("click", function () { onClickPromoTab(); });
		tabDoit		.on("click", function () { onClickDoitTab(); });
		xlsxExport	.on("click", function () { onClickExcelBtn(); });
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
			data: JSON.stringify({"promotion_idx" : idx}),
			success: function(data) {
				if (isSuccessResp(data))
					buildPromoDetail(data);
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				console.log(status);
			},
		});
	}

	function buildPromoDetail(data)
	{
		let jsonData   	 = JSON.parse(data);
		let detailData 	 = jsonData.data;
		let promoData  	 = detailData.promotion;
		let doitDataList = detailData.reward;

		bizName.text(promoData.company_name);
		promoName.text(promoData.promotion_title);
		budget.text(numberWithCommas(promoData.budget_ucd)+'원');
		period.text(promoData.start_date + '~' + promoData.end_date);
		banner.attr('src', promoData.banner_image_url);
		thumbnail.attr('src', promoData.list_image_url);
		createType.text(promoData.doit_create_mode === 'user' ? label.createDoitUser : label.createDoitAdmin);
		isExposure.text(promoData.is_banner === 'Y' ? label.exposure : label.unexpose);

		let rewardLen = doitDataList.length;
		let rewardDom = '';
		for (let i=0; i<rewardLen; i++)
		{
			let doitData = doitDataList[i];
			let actionPeriod = doitData.action_start_date + ' ~ ' + doitData.action_end_date;
			let persnal = doitData.person_percent;
			let group = doitData.group_percent;

			if (i === 0)
				rewardDom += '<h2 class="main-title">리워드 조건 생성 목록</h2>';

			rewardDom += '<ul class="enrollment clearfix">';
			rewardDom += 	'<li>';
			rewardDom += 		'<p class="sub-title important">리워드 제목 (*)</p>';
			rewardDom += 		'<p class="detail-data">'+ doitData.title +'</p>';
			rewardDom += 	'</li>';
			rewardDom += 	'<li class="tag-list">';
			rewardDom += 		'<p class="sub-title important">인증 기간 (*)</p>';
			rewardDom += 		'<p class="detail-data">'+ actionPeriod +'</p>';
			rewardDom += 	'</li>';
			rewardDom += 	'<li class="clearfix">';
			rewardDom += 		'<p class="sub-title important">일일인증 횟수 (*)</p>';
			rewardDom += 		'<p class="detail-data">'+ doitData.action_daily_allow +'회</p>';
			rewardDom += 	'</li>';
			rewardDom += 	'<li>';
			rewardDom += 		'<p class="sub-title important">목표달성률 (*)</p>';
			rewardDom += 		'<p class="detail-data">'+ doitData.goal_percent +'%</p>';
			rewardDom += 	'</li>';
			rewardDom += 	'<li>';
			rewardDom += 		'<p class="sub-title important">1인당 최대 지급할 UCD (*)</p>';
			rewardDom += 		'<p class="detail-data">'+ numberWithCommas(doitData.total_reward) +'원</p>';
			rewardDom += 	'</li>';
			rewardDom += 	'<li>';
			rewardDom += 		'<p class="sub-title important">리워드 유형 (*)</p>';
			rewardDom += 		'<p class="detail-data">개인 '+ persnal + ' : 단체 ' + group +'</p>';
			rewardDom += 	'</li>';
			rewardDom += 	'<li>';
			rewardDom += 		'<p class="sub-title important">주간빈도 (*)</p>';
			rewardDom += 		'<p class="detail-data">'+ doitData.action_dayofweek +'</p>';
			rewardDom += 	'</li>';
			rewardDom += '</ul>';
		}

		rewardList.html(rewardDom);
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
					previous: '<i class="fas fa-angle-double-left"></i>'
					,next: '<i class="fas fa-angle-double-right"></i>'
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
			select: 'multi',
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
		getList();

	}

	function getList()
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


