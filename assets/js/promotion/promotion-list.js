
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#dateType");
	const searchType 	= $("#searchType");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const xlsxExport 	= $(".excel-btn");
	const select		= $("select");
	const dataNum		= $(".data-num");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 테이블 데이터 로드 **/
		buildGrid();

		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { buildGrid(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		xlsxExport		.on("click", function () { onClickExcelBtn(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});

		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listPromotion,
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
				{title: "기업", 			data: "nickname",    		   width: "15%",    orderable: false,   className: "text-center" }
				,{title: "프로모션명", 	data: "promotion_title",       width: "30%",    orderable: false,   className: "text-center" }
				,{title: "프로모션기간", 	data: "start_date",    		   width: "20%",    orderable: false,   className: "text-center" }
				,{title: "프로모션예산", 	data: "budget_ucd",    		   width: "15%",    orderable: false,   className: "text-center",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "프로모션잔여예산", 	data: "remain_budget_ucd", width: "15%",    orderable: false,   className: "text-center",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "배너 여부", 	data: "is_banner",    width: "10%",    orderable: false,   className: "text-center"}
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
			,"dateType" : dateType.val()
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
		}

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let titleDom  = $(nRow).children().eq(1);
		let periodDom = $(nRow).children().eq(2);
		let btnDom 	  = $(nRow).children().eq(5);
		let detailUrl = '/pro/detail/'+aData.idx;

		/** 제목에 a 태그 추가 **/
		titleDom.html('<a href="'+detailUrl+'">'+aData.promotion_title+'</a>');

		/** 프로모션 기간 **/
		periodDom.html(aData.start_date +' ~ '+aData.end_date);

		/** 배너보기 버튼 **/
		let bannerUrl = aData.banner_image_url;
		let listUrl   = aData.list_image_url;
		let introUrl  = aData.intro_image_url;
		let innerDom = '<button onclick="viewImage(this);" type="button" class="more-infor-btn" data-banner="'+bannerUrl+'" data-list="'+listUrl+'" data-intro="'+introUrl+'">보기</button>';
		btnDom.html(innerDom);
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	function viewImage(obj)
	{
		let bannerImage = $(obj).data('banner');
		let listImage   = $(obj).data('list');
		let introImage  = $(obj).data('intro');

		let modal = '';
		modal += '<div id="viewImageModal" class="modal-content modal-01" style="display: block;">';
		modal += 	'<div class="wrap">';
		modal += 		'<i onclick="removeModal();" class="close-btn fas fa-times-circle"></i>';
		modal += 		'<p class="modal-title">프로모션 이미지</p>';
		modal += 		'<ul class="modal-information">';
		modal += 			'<li>';
		modal += 				'<p class="sub-title">배너 및 리스트</p>';
		modal += 				'<p class="data-contents">';
		modal += 					'<img src="'+bannerImage+'" alt="배너 및 소개 이미지">';
		modal +=	 			'</p>';
		modal += 			'</li>';
		modal += 			'<li>';
		modal += 				'<p class="sub-title">소개이미지</p>';
		modal += 				'<p class="data-contents">';
		modal += 					'<img src="'+introImage+'" alt="소개이미지">';
		modal += 				'</p>';
		modal += 			'</li>';
		modal += 		'</ul>';
		modal += 	'</div>';
		modal += '</div>';
		modal += '<div onclick="removeModal();" id="modalBackDrop" class="modal-layout" style="display: block;"></div>';

		$('body').append(modal);
	}

	function removeModal()
	{
		$("#viewImageModal").remove();
		$("#modalBackDrop").remove();
	}

	function onClickExcelBtn()
	{
		getExcelData();
	}

	function getExcelData()
	{
		$.ajax({
			url: api.listPromotion,
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
			"limit" : 20000
			,"page" : 1
			,"dateType" : dateType.val()
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
		}

		return JSON.stringify(param);
	}


