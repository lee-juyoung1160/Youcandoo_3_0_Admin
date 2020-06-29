
		const btnUcdModalOpen	= $("#btnUcdModalOpen");
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
		const selPageLengthForPromo	= $("#selPageLengthForPromo");

		/** UCD정보탭 **/
		const ucdInfo		= $("#ucdInfo");
		const ucdTable		= $("#ucdTable");
		const selPageLengthForUcd = $("#selPageLengthForUcd");

		/** modal **/
		const modalCloseBtn = $(".close-btn");
		const modalLayout 	= $(".modal-layout");
		const modalContent 	= $(".modal-content");
		/** ucd 적립취소 modal **/
		const modalContract	 = $("#modalContract");
		const division		 = $("input[name=radio-division]");
		const amount		 = $("#amount");
		const modalFrom		 = $("#modalFrom");
		const modalTo		 = $("#modalTo");
		const contractTitle	 = $("#contractTitle");
		const contractAmount = $("#contractAmount");
		const btnSubmit		 = $("#btnSubmit");
		/** ucd정보 상세내용 modal **/
		const modalDesc			  = $("#modalDesc");
		const modalPromoTerm      = $("#modalPromoTerm");
		const modalContractTitle  = $("#modalContractTitle");
		const modalContractAmount = $("#modalContractAmount");

		$(document).ready(function () {
			/** 데이트피커 초기화 **/
			initInputDatepicker();
			/** 상세 불러오기 **/
			getDetail();
			/** 이벤트 **/
			btnUcdModalOpen	.on("click", function () { onClickModalContractOpen(); })
			modalCloseBtn	.on('click', function () { modalFadeout(); });
			modalLayout		.on('click', function () { modalFadeout(); });
			modalFrom		.on('change', function () { onChangeModalFrom(); });
			goUpdate		.on("click", function () { goUpdatePage(); })
			tabPromo		.on("click", function () { onClickTabPromo(); });
			tabUcd			.on("click", function () { onClickTabUcd(); });
			selPageLengthForPromo.on("change", function () { getInvolvePromo(); });
			selPageLengthForUcd.on("change", function () { getUcdLog() });
			btnSubmit		.on("click", function () { onSubmitUcd(); });
		});

		function onChangeModalFrom()
		{
			modalTo.datepicker("option", "minDate", new Date(modalFrom.datepicker("getDate")));
		}

		function onClickModalContractOpen()
		{
			initModalContract();
			modalLayout.fadeIn();
			modalContract.fadeIn();
			overflowHidden();
		}

		function initModalContract()
		{
			division.eq(0).prop('checked', true);
			amount.val('');
			amount.focus();
			modalFrom.val('');
			modalTo.val('');
			contractAmount.val('');
			contractTitle.val('');
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
				data: params(),
				headers: headers,
				dataType: 'json',
				success: function(data) {
					if (isSuccessResp(data))
						buildDetail(data);
					else
						alert(invalidResp(data))
				},
				error: function (xhr, status) {
					alert(label.detailContent+message.ajaxLoadError);
				},
				complete: function (xhr, status) {
					getInvolvePromo();
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
		let g_balance;
		function buildDetail(data)
		{
			let detail = data.data;
			let _balance = Number(detail.ucd.cash) + Number(detail.ucd.point);

			g_bizUuid = detail.company_uuid;
			g_balance = _balance;

			bizProfileImg.prop('src', detail.image_path);
			bizName.html(detail.company_name);
			bizNumber.html(detail.company_number);
			bizLink.html('<a class="detail-data" href="'+detail.url+'" target="_blank">'+detail.url+'</a>');
			bizDesc.html(detail.contents);

			balance.html(numberWithCommas(_balance));
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
					{title: "프로모션명", 	data: "promotion_title",   	width: "24%",     orderable: false,   className: "cursor-default" }
					,{title: "프로모션 예산", data: "budget_ucd",   		width: "15%",     orderable: false,   className: "cursor-default",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "잔여예산", 	data: "remain_budget_ucd",  width: "15%",     orderable: false,   className: "cursor-default",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "기간", 		data: "start_date",   		width: "24%",     orderable: false,   className: "cursor-default" }
					,{title: "프로모션 상태", data: "status",   			width: "10%",     orderable: false,   className: "cursor-default",
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
			$(periodDom).html(aData.start_date+label.tilde+aData.end_date);
		}

		function getUcdLog()
		{
			ucdTable.DataTable({
				ajax : {
					url: api.listBizUcd,
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
					{title: "유형", 	data: "ucd_type",   	width: "10%",     orderable: false,   className: "cursor-default" }
					,{title: "구분", data: "division",   	width: "10%",     orderable: false,   className: "cursor-default" }
					,{title: "금액", data: "amount",   		width: "15%",     orderable: false,   className: "cursor-default",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "제목", data: "title",  		width: "15%",     orderable: false,   className: "cursor-default" }
					,{title: "내용", data: "description",   	width: "30%",     orderable: false,   className: "cursor-default",
						render: function (data, type, row, meta) {
							let result = data;
							if (row.division === '충전' || row.division === '취소')
							{
								let term 	= isEmpty(data) ? label.nullValue : data[0]+label.tilde+data[1];
								let title   = isEmpty(data) ? label.nullValue : data[2];
								let amount  = isEmpty(data) ? label.nullValue: data[3];

								result = '<a onclick="btnModalDescOpen(this);" data-term="'+term+'" data-title="'+title+'" data-amount="'+amount+'">'+title+'</a>';
							}

							return result;
						}
					}
					,{title: "일시", data: "created",   		width: "15%",     orderable: false,   className: "cursor-default" }
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

		function btnModalDescOpen(obj)
		{
			initModalDesc(obj);
			modalLayout.fadeIn();
			modalDesc.fadeIn();
			overflowHidden();
		}

		function initModalDesc(obj)
		{
			modalPromoTerm.html($(obj).data('term'));
			modalContractTitle.html($(obj).data('title'));
			modalContractAmount.html(numberWithCommas($(obj).data('amount')));
		}

		function goUpdatePage()
		{
			const pathName	= getPathName();
			const bizIdx	= splitReverse(pathName, '/');

			location.href = page.updateBiz+bizIdx;
		}

		function onSubmitUcd()
		{
			if (validation())
			{
				if (confirm(message.create))
				{
					$.ajax({
						url: api.createBizUcd,
						type: "POST",
						headers: headers,
						dataType: 'json',
						data: ucdParams(),
						success: function(data) {
							alert(getStatusMessage(data))
							if (isSuccessResp(data))
							{
								balance.html(numberWithCommas(data.data));
								g_balance = data.data;
								getUcdLog();
								modalFadeout();
							}
						},
						error: function (request, status) {
							alert(label.submit+message.ajaxError);
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
				,"start_date" : modalFrom.val()
				,"end_date" : modalTo.val()
				,"contract_name" : contractTitle.val().trim()
				,"contract_price" : contractAmount.val()
				,"created_user" : sessionUserId.val()
				,"page_type" : ""
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

			if (amount.val() > 100000000)
			{
				alert('UCD는 '+message.maxAvailableBizUcd);
				amount.focus();
				return false;
			}

			let _division = $("input[name=radio-division]:checked").val()
			if ((Number(_division) === 1 || Number(_division) === 2) && amount.val() > g_balance)
			{
				alert('취소 UCD는 '+message.overBalance+'\n보유 UCD: '+numberWithCommas(g_balance)+'\n입력한 UCD: '+numberWithCommas(amount.val()));
				amount.focus();
				return false;
			}

			if (isEmpty(modalFrom.val()))
			{
				alert('프로모션 기간(시작일)은 '+message.required);
				modalFrom.focus();
				return false;
			}

			if (isEmpty(modalTo.val()))
			{
				alert('프로모션 기간(종료일)은 '+message.required);
				modalTo.focus();
				return false;
			}

			if (isEmpty(contractTitle.val()))
			{
				alert('계약명은 '+message.required);
				contractTitle.focus();
				return false;
			}

			if (isEmpty(contractAmount.val()))
			{
				alert('계약 금액은 '+message.required);
				contractAmount.focus();
				return false;
			}

			return true;
		}
