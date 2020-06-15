
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

		/** 프로모션정보탭 **/
		const promoInfo		= $("#promoInfo");
		const promoTable	= $("#promoTable");
		const promoTotalCount		= $("#promoTotalCount");
		const selPageLengthForPromo	= $("#selPageLengthForPromo");

		/** UCD정보탭 **/
		const ucdInfo		= $("#ucdInfo");
		const ucdTable		= $("#ucdTable");
		const ucdTotalCount			= $("#ucdTotalCount");
		const selPageLengthForUcd	= $("#selPageLengthForUcd");

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
			modalCloseBtn	.on('click', function () { modalFadeout(); });
			modalLayout		.on('click', function () { modalFadeout(); });
			goUpdate		.on("click", function () { goUpdatePage(); })
			tabPromo		.on("click", function () { onClickTabPromo(); });
			tabUcd			.on("click", function () { onClickTabUcd(); });
			selPageLengthForPromo.on("change", function () { reloadTable(promoTable); });
			selPageLengthForUcd.on("change", function () { reloadTable(ucdTable); });
			btnSubmit		.on("click", function () { onSubmitUcdRegist(); });
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
			getUcdLog();
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
					headers: headers,
					data: function (d) {
						return promoTableParams(d);
					},
					error: function (request, status) {
						alert(label.list+message.ajaxLoadError);
					}
				},
				columns: [
					{title: "프로모션명", 	data: "promotion_title",   	width: "24%",     orderable: false,   className: "text-center cursor-default" }
					,{title: "프로모션 예산", data: "budget_ucd",   		width: "15%",     orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "잔여예산", 	data: "remain_budget_ucd",  width: "15%",     orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "기간", 		data: "start_date",   		width: "24%",     orderable: false,   className: "text-center cursor-default" }
					,{title: "프로모션 상태", data: "status",   			width: "10%",     orderable: false,   className: "text-center cursor-default",
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
				},
				fnRowCallback: function( nRow, aData ) {
					setPromotionRowAttributes(nRow, aData);
				},
				drawCallback: function (settings) {
					buildTotalCount(promoTable);
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

		function setPromotionRowAttributes(nRow, aData)
		{
			let titleDom = $(nRow).children().eq(0);
			let periodDom = $(nRow).children().eq(3);
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
					url: api.listBizUcd,
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
					{title: "유형", 	data: "ucd_type",   	width: "10%",     orderable: false,   className: "text-center cursor-default" }
					,{title: "구분", data: "division",   	width: "10%",     orderable: false,   className: "text-center cursor-default" }
					,{title: "금액", data: "amount",   		width: "15%",     orderable: false,   className: "text-center cursor-default",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "제목", data: "title",  		width: "15%",     orderable: false,   className: "text-center cursor-default" }
					,{title: "내용", data: "description",   	width: "30%",     orderable: false,   className: "text-center cursor-default" }
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
				,"company_uuid" : g_bizUuid
			}

			return JSON.stringify(param);
		}

		function setUcdRowAttributes(nRow, aData)
		{
			if (isNegative(aData.amount))
				$(nRow).addClass('minus-pay');
		}

		function goUpdatePage()
		{
			const pathName	= getPathName();
			const bizIdx	= splitReverse(pathName, '/');

			location.href = page.updateBiz+bizIdx;
		}

		function onSubmitUcdRegist()
		{
			if (validation())
			{
				if (confirm(message.create))
				{
					$.ajax({
						url: api.updateBizUcd,
						type: "POST",
						headers: headers,
						dataType: 'json',
						data: ucdParams(),
						success: function(data) {
							alert(getStatusMessage(data))
							if (isSuccessResp(data))
							{
								balance.html(numberWithCommas(data.data));
								getUcdLog();
								modalFadeout();
							}
						},
						error: function (request, status) {
							alert('기업 보유 UCD'+message.ajaxError);
						}
					});
				}
			}
		}

		function ucdParams()
		{
			let param = {
				"company_uuid" : g_bizUuid
				,"division" : $("input[name=radio-division]:checked").val()
				,"amount" : amount.val().trim()
				,"description" : content.val().trim()
			}

			return JSON.stringify(param);
		}

		function validation()
		{
			if (isEmpty(amount.val()))
			{
				alert('UCD는 '+message.required);
				amount.focus();
				return false;
			}

			if (isEmpty(content.val()))
			{
				alert('내용은 '+message.required);
				content.focus();
				return false;
			}

			return true;
		}
