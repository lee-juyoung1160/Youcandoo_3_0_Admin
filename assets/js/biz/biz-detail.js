
		const btnUcdManualRegist	= $("#btnUcdManualRegist");
		const bizProfileImg	= $("#bizProfileImg");
		const bizName 		= $("#bizName");
		const bizNumber		= $("#bizNumber");
		const bizLink		= $("#bizLink");
		const bizDesc		= $("#bizDesc");
		const balance		= $("#balance");
		/*const cash			= $("#cash");
		const point			= $("#point");*/
		const goUpdate		= $("#goUpdate");
		const tabPromo		= $("#tabPromo");
		const tabUcd		= $("#tabUcd");
		const promoInfo		= $("#promoInfo");
		const ucdInfo		= $("#ucdInfo");
		const selPageLengthForPromo	= $("#selPageLengthForPromo");
		const selPageLengthForUcd	= $("#selPageLengthForUcd");
		const promoTable	= $("#promoTable");
		const ucdTable		= $("#ucdTable");
		const promoTotalCount	= $("#promoTotalCount");
		const ucdTotalCount		= $("#ucdTable");

		/** modal **/
		const modalCloseBtn = $(".close-btn");
		const modalLayout 	= $(".modal-layout");
		const modalContent 	= $(".modal-content");
		const division		= $("input[name=radio-division]");
		const amount		= $("#amount");
		const content		= $("#content");
		const btnSubmit		= $("#btnSubmit");

		$(document).ready(function () {
			/** 상세 불러오기 **/
			getDetail();
			/** 보유 UCD **/
			getBizBalance();
			/** 프로모션 정보 **/
			getInvolvePromo();
			/** 이벤트 **/
			btnUcdManualRegist	.on("click", function () { modalFadein(); })
			goUpdate	.on("click", function () { goUpdatePage(); })
			tabPromo	.on("click", function () { onClickTabPromo(); });
			tabUcd		.on("click", function () { onClickTabUcd(); });
		});

		function initModal()
		{
			division.eq(0).prop('checked', true);
			amount.val('');
			content.val('');
			amount.focus();
		}

		function onClickTabPromo()
		{
			promoInfo.show();
			ucdInfo.hide();
			tabUcd.removeClass('active');
			tabPromo.addClass('active');
			getInvolvePromo();
		}

		function onClickTabUcd()
		{
			ucdInfo.show();
			promoInfo.hide();
			tabPromo.removeClass('active');
			tabUcd.addClass('active');
			//getUcdLog();
		}

		function getDetail()
		{
			$.ajax({
				url: api.detailBiz,
				type: "POST",
				async: false,
				data: params(),
				headers: headers,
				dataType: 'json',
				success: function(data) {
					if (isSuccessResp(data))
						buildDetail(data);
					else
						alert(invalidResp(data))
				},
				error: function (request, status) {
					alert(label.detail+message.ajaxLoadError);
				}
			});
		}

		function params()
		{
			const pathName	= getPathName();
			const bizIdx	= splitReverse(pathName, '/');

			return JSON.stringify({"idx" : bizIdx});
		}

		let g_bizUuid;
		function buildDetail(data)
		{
			let detail = data.data;
			g_bizUuid = detail.company_uuid;
			bizProfileImg.attr('src', detail.image_path);
			bizName.html(detail.company_name);
			bizNumber.html(detail.company_number);
			bizLink.html('<a class="detail-data" href="'+detail.url+'" target="_blank">'+detail.url+'</a>');
			bizDesc.html(detail.contents);

			getBizBalance();
			getInvolvePromo();
		}

		function getBizBalance()
		{
			$.ajax({
				url: api.getBalance,
				type: "POST",
				headers: headers,
				dataType: 'json',
				data: JSON.stringify({"company_uuid" : g_bizUuid}),
				success: function(data) {
					if (isSuccessResp(data))
					{
						let totalBalance = Number(data.data.cash) + Number(data.data.point);

						balance.html(numberWithCommas(totalBalance));
						/*cash.html(numberWithCommas(data.data.cash));
						point.html(numberWithCommas(data.data.point));*/
					}
					else
						alert(invalidResp(data));
				},
				error: function (request, status) {
					alert('기업 보유 UCD'+message.ajaxError);
				}
			});
		}

		function getInvolvePromo()
		{
			promoTable.DataTable({
				ajax : {
					url: api.involveBizPromotion,
					type: "POST",
					async: false,
					headers: headers,
					data: function (d) {
						return promoTableParams(d);
					},
					error: function (request, status) {
						alert(label.list+message.ajaxLoadError);
					}
				},
				columns: [
					{title: "No", 			data: "idx",   				width: "4%",      orderable: false,   className: "text-center" }
					,{title: "프로모션명", 	data: "promotion_title",   	width: "24%",     orderable: false,   className: "text-center" }
					,{title: "프로모션 예산", data: "budget_ucd",   		width: "15%",     orderable: false,   className: "text-center",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "잔여예산", 	data: "remain_budget_ucd",  width: "15%",     orderable: false,   className: "text-center",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "기간", 		data: "start_date",   		width: "24%",     orderable: false,   className: "text-center" }
					,{title: "프로모션 상태", data: "status",   			width: "10%",     orderable: false,   className: "text-center",
						render: function (data) {
							return getPromotionStatusName(data);
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
				pageLength: Number(selPageLengthForPromo.val()),
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
					let table = promoTable.DataTable();
					let info = table.page.info();

					promoTotalCount.html(info.recordsTotal);
				},
				fnRowCallback: function( nRow, aData ) {
					setRowAttributes(nRow, aData);
				}
			});
		}

		function promoTableParams(d)
		{
			let param = {
				"limit" : d.length
				,"page" : (d.start / d.length) + 1
				,"company_uuid" : g_bizUuid
			}

			return JSON.stringify(param);
		}

		function setRowAttributes(nRow, aData)
		{
			let titleDom = $(nRow).children().eq(1);
			let periodDom = $(nRow).children().eq(4);
			let detailUrl = page.detailPromo+aData.idx;

			/** 제목에 a 태그 추가 **/
			$(titleDom).html('<a href="'+detailUrl+'">'+aData.promotion_title+'</a>');
			/** 프로모션 기간 **/
			$(periodDom).html(aData.start_date+' ~ '+aData.end_date);
		}

		function getUcdLog()
		{
			ucdTable.DataTable({
				ajax : {
					url: api.involveBizPromotion,
					type: "POST",
					async: false,
					headers: headers,
					data: function (d) {
						return ucdTableParams(d);
					},
					error: function (request, status) {
						alert(label.list+message.ajaxLoadError);
					}
				},
				columns: [
					{title: "No", 			data: "idx",   				width: "4%",      orderable: false,   className: "text-center" }
					/*,{title: "프로모션명", 	data: "promotion_title",   	width: "24%",     orderable: false,   className: "text-center" }
					,{title: "프로모션 예산", data: "budget_ucd",   		width: "15%",     orderable: false,   className: "text-center",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "잔여예산", 	data: "remain_budget_ucd",  width: "15%",     orderable: false,   className: "text-center",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "기간", 		data: "start_date",   		width: "24%",     orderable: false,   className: "text-center" }
					,{title: "프로모션 상태", data: "status",   			width: "10%",     orderable: false,   className: "text-center",
						render: function (data) {
							return getPromotionStatusName(data);
						}
					}*/
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
					let table = promoTable.DataTable();
					let info = table.page.info();

					ucdTotalCount.html(info.recordsTotal);
				},
				fnRowCallback: function( nRow, aData ) {
				}
			});
		}

		function ucdTableParams(d)
		{
			let param = {
				"limit" : d.length
				,"page" : (d.start / d.length) + 1
				,"company_uuid" : g_bizUuid
			}

			return JSON.stringify(param);
		}

		function goUpdatePage()
		{
			const pathName	= getPathName();
			const bizIdx	= splitReverse(pathName, '/');

			location.href = page.updateBiz+bizIdx;
		}


