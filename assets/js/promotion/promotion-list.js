
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#dateType");
	const searchType 	= $("#searchType");
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const isBanner 		= $("input[name=radio-banner]");
	const status 		= $("input[name=chk-status]");
	const xlsxExport 	= $(".excel-btn");
	const select		= $("select");
	const btnDelete		= $("#btnDelete");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 테이블 데이터 로드 **/
		buildGrid();
		/** 이벤트 **/
		$("body")    	.on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		status			.on("click", function () { onChangeChkStatus(this); });
		selPageLength	.on("change", function () { buildGrid(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnDelete		.on("click", function () { deletePromotion(); });
		xlsxExport		.on("click", function () { onClickExcelBtn(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		isBanner.eq(0).prop("checked", true);
		status.prop("checked", true);
		initSelectOption();
		initSearchDateRange();
		initDayBtn();
	}

	let _page = 1;
	function setHistoryForm()
	{
		let historyParams = getHistoryParam();

		keyword.val(historyParams.keyword);
		dateFrom.val(historyParams.fromDate);
		dateTo.val(historyParams.toDate);
		dateType.val(historyParams.dateType);
		onChangeSelectOption(dateType);
		searchType.val(historyParams.searchType);
		onChangeSelectOption(searchType);
		status.each(function () {
			if (historyParams.status.indexOf($(this).val()) !== -1)
				$(this).prop("checked", true);
		});
		isBanner.each(function () {
			if ($(this).val() === historyParams.is_banner)
				$(this).prop("checked", true);
		});
		selPageLength.val(historyParams.limit);
		onChangeSelectOption(selPageLength);

		_page = historyParams.page;
	}

	function onChangeChkStatus(obj)
	{
		let checkedCount = $("input[name=chk-status]:checked").length;
		if (checkedCount === 0)
		{
			alert(message.minimumChecked);
			$(obj).prop("checked", true);
		}
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
					return tableParams();
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "기업", 			data: "nickname",    		width: "15%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "프로모션명", 	data: "promotion_title",    width: "30%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "프로모션 예산", 	data: "budget_ucd",     width: "15%",    orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "잔여예산", 	data: "remain_budget_ucd", 	width: "15%",    orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "프로모션 기간", data: "start_date",    	   	width: "20%",    orderable: false,   className: "text-center cursor-default",
					render: function (data, type, row, meta) {
						return row.start_date + ' ~ ' + row.end_date;
					}
				}
				,{title: "프로모션 상태", data: "status",   	 		width: "10%",    orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return getPromotionStatusName(data);
					}
				}
				,{title: "배너 여부", 	data: "is_banner",    		width: "10%",    orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return data === 'Y' ? label.exposure : label.unexpose;
					}
				}
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
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				let table = dataTable.DataTable();
				dataTable.on('page.dt', function (e, settings) {
					let info = table.page.info();
					_page = (info.start / info.length) + 1;
				});

				table.page(_page-1).draw( 'page' );
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(dataTable);
			}
		});
	}
	
	function tableParams()
	{
		let statusParam = [];
		status.each(function () {
			if ($(this).is(':checked'))
				statusParam.push($(this).val())
		});

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"dateType" : dateType.val()
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
			,"is_banner" : $("input[name=radio-banner]:checked").val()
			,"status" : statusParam
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let checkDom = $(nRow).children().eq(0);
		let titleDom  = $(nRow).children().eq(2);
		let btnDom 	  = $(nRow).children().eq(7);
		let detailUrl = page.detailPromo+aData.idx;

		/** 대기 상태가 아닌 경우 체크박스 삭제 **/
		if (aData.status !== 'pending')
			$(checkDom).children().prop('disabled', true);
		/** 제목에 클릭 상세 이동 **/
		$(titleDom).html('<a href="'+detailUrl+'">'+aData.promotion_title+'</a>');
		/** 배너보기 버튼 **/
		/*let bannerUrl = aData.banner_image_url;
		let listUrl   = aData.list_image_url;
		let introUrl  = aData.intro_image_url;
		let innerDom = '<button onclick="viewImage(this);" type="button" class="more-info-btn" data-banner="'+bannerUrl+'" data-list="'+listUrl+'" data-intro="'+introUrl+'">보기</button>';
		btnDom.html(innerDom);*/
	}

	function onSubmitSearch()
	{
		_page = 1;
		reloadTable(dataTable);
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
			dataType: "json",
			headers: headers,
			data: excelParams(),
			success: function(data) {
				setExcelData("프로모션목록", "프로모션목록", data.data);
			},
			error: function (request, status) {
				alert(label.download+message.ajaxError);
			}
		});
	}

	function excelParams()
	{
		let statusParam = [];
		status.each(function () {
			if ($(this).is(':checked'))
				statusParam.push($(this).val())
		});

		let param = {
			"limit" : 20000
			,"page" : 1
			,"dateType" : dateType.val()
			,"fromDate" : dateFrom.val()
			,"toDate" : dateTo.val()
			,"searchType" : searchType.val()
			,"keyword" : keyword.val()
			,"is_banner" : $("input[name=radio-banner]:checked").val()
			,"status" : statusParam
		}

		return JSON.stringify(param);
	}

	function deletePromotion()
	{
		if (delValidation())
		{
			if (confirm(message.delete))
			{
				$.ajax({
					url: api.deletePromotion,
					type: "POST",
					headers: headers,
					dataType: 'json',
					data: delParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							tableReloadAndStayCurrentPage(dataTable);
					},
					error: function (request, status) {
						alert(label.delete+message.ajaxError);
					},
				});
			}
		}
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			alert('삭제할 대상을 목록에서 '+message.select);
			return false;
		}

		return true;
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"promotion_uuid" : selectedData.promotion_uuid
		};

		return JSON.stringify(param)
	}

