
	const bizName 		= $("#bizName");
	const promoName 	= $("#promoName");
	const budget 		= $("#budget");
	const period 		= $("#period");
	const banner 		= $("#banner");
	const thumbnail 	= $("#thumbnail");
	const createType 	= $("#createType");
	const isExposure 	= $("#isExposure");
	const rewardList    = $("#rewardList");

	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type");
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const inputRadio	= $("input:radio");
	const inputCheck	= $("input:checkbox");
	const select		= $("select");
	const dataNum		= $(".data-num");
	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];


	$(document).ready(function () {

		/** 프로모션 상세정보 **/
		getPromotion();
		/** 데이트피커 초기화 **/
		//initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		//initSearchForm();

		//xlsxExport		.on("click", function () { onClickExcelBtn(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		inputRadio.each(function (index) {
			if (index === 0)
				$(this).prop("checked", true);
		});
		inputCheck.prop("checked", true);
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});

		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
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
				if (getStatusCode(data) === 30000)
				{
					buildPromoDetail(data);
				}
				else
					alert(data.message);
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
			rewardDom += 		'<p class="detail-data">'+ doitData.action_dailiy_allow +'회</p>';
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

	function getDoit()
	{
		$("#dataTable").DataTable({
			ajax : {
				url: api.listPromotion,
				type:"POST",
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
				{title: "닉네임", 	data: "nickname",    name: "nickname",    orderable: false,   className: "text-center" }
				,{title: "등록일", 	data: "created",     name: "created",     orderable: false,   className: "text-center",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
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
				console.log(aData);
			}
		});
	}
	
	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			//,type_opt : $('#selType').val()
		}

		return {"data": JSON.stringify(param)};
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom = $(nRow).children().eq(0);
		let movePageUrl = 'javascript:movePageUrl(\'/mod/doit/'+aData.idx+'\')';

		// 제목에 a 태그 추가
		titleDom.html('<a href="'+movePageUrl+'">'+aData.nickname+'</a>');
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
			url: apiUrl,
			type: "POST",
			data: excelParams(),
			success: function(data) {
				setExcelData("프로모션목록", "프로모션목록", data);
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
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			//,type_opt : $('#selType').val()
		}

		return {"data": JSON.stringify(param)};
	}


