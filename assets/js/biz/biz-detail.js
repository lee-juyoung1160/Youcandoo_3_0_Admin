
	const btnUcdModalOpen	= $("#btnUcdModalOpen");
	const bizProfileImg	= $("#bizProfileImg");
	const bizName 		= $("#bizName");
	const bizNumber		= $("#bizNumber");
	const bizLink		= $("#bizLink");
	const bizDesc		= $("#bizDesc");
	const balance		= $("#balance");
	const goUpdate		= $("#goUpdate");
	const tabPromo		= $("#tabPromo");
	const tabUcd		= $("#tabUcd");
	const ulTab			= $("#ulTab");
	const tabContent	= $(".tab-content");

	/** 프로모션정보탭 **/
	const promoTable	= $("#promoTable");
	const selPageLengthForPromo	= $("#selPageLengthForPromo");

	/** UCD정보탭 **/
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

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** n개씩보기 셀렉트 박스 초기화 **/
		initPageLength(selPageLengthForPromo);
		initPageLength(selPageLengthForUcd);
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
		ulTab			.on("click", function (event) { onClickTab(event); });
		selPageLengthForPromo	.on("change", function () { getInvolvePromo(); });
		selPageLengthForUcd		.on("change", function () { getUcdLog() });
		btnSubmit		.on("click", function () { onSubmitUcd(); });
	});

	function onChangeModalFrom()
	{
		modalTo.datepicker("option", "minDate", new Date(modalFrom.datepicker("getDate")));
	}

	function onClickModalContractOpen()
	{
		modalLayout.fadeIn();
		modalContract.fadeIn();
		overflowHidden();
		initModalContract();
	}

	function initModalContract()
	{
		division.eq(0).prop('checked', true);
		amount.val('');
		amount.trigger('focus');
		modalFrom.val('');
		modalTo.val('');
		contractAmount.val('');
		contractTitle.val('');
	}

	function onClickTab(e)
	{
		let clickedEl = $(e.target);
		let target = $(clickedEl).data('target')

		clickedEl.siblings().removeClass('active');
		clickedEl.addClass('active');
		tabContent.hide();
		$(target).show();
		clickedEl.hasClass('promotion') ? getInvolvePromo() : getUcdLog();
	}

	function getDetail()
	{
		let url 	= api.detailBiz;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, params(), getDetailCallback, errMsg, getInvolvePromo);
	}

	function params()
	{
		const pathName	= getPathName();
		const bizIdx	= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : bizIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
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
		bizLink.html(`<a class="detail-data" href="${detail.url}" target="_blank">${detail.url}</a>`);
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
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "프로모션명", 	data: "promotion_title",   	width: "24%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailPromo+row.idx;
						return '<a href="'+detailUrl+'">' + data + '</a>';
					}
				}
				,{title: "프로모션 예산", data: "budget_ucd",   		width: "15%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "잔여예산", 	data: "remain_budget_ucd",  width: "15%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "기간", 		data: "start_date",   		width: "24%",
					render: function (data, type, row, meta) {
						return `${data} ${label.tilde} ${row.end_date}`;
					}
				}
				,{title: "프로모션 상태", data: "status",   			width: "10%",
					render: function (data) {
						return getPromotionStatusName(data);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForPromo.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
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
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "유형", 	data: "ucd_type",   	width: "10%" }
				,{title: "구분", data: "division",   	width: "10%" }
				,{title: "금액", data: "amount",   		width: "15%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "제목", data: "title",  		width: "15%" }
				,{title: "내용", data: "description",   	width: "30%",
					render: function (data, type, row, meta) {
						let result = data;
						if (row.division === '충전' || row.division === '취소')
						{
							let term 	= isEmpty(data) ? label.dash : `${data[0]} ${label.tilde} ${data[1]}`;
							let title   = isEmpty(data) ? label.dash : data[2];
							let amount  = isEmpty(data) ? label.dash: data[3];

							result = `<a onclick="btnModalDescOpen(this);" 
										data-term="${term}" 
										data-title="${title}" 
										data-amount="${amount}">${title}</a>`
						}

						return result;
					}
				}
				,{title: "일시", data: "created",   		width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForUcd.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setUcdRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
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
		modalLayout.fadeIn();
		modalDesc.fadeIn();
		overflowHidden();
		initModalDesc(obj);
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
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let url 	= api.createBizUcd;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, ucdParams(), createReqCallback, errMsg, false);
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

	function createReqCallback(data)
	{
		if (isSuccessResp(data))
		{
			balance.html(numberWithCommas(data.data));
			g_balance = data.data;
		}

		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		getUcdLog();
		modalFadeout();
	}

	function validation()
	{
		if (isEmpty(amount.val()))
		{
			sweetToast(`UCD는 ${message.required}`);
			amount.trigger('focus');
			return false;
		}

		if (amount.val() > 100000000)
		{
			sweetToast(`UCD는 ${message.maxAvailableBizUcd}`);
			amount.trigger('focus');
			return false;
		}

		let _division = $("input[name=radio-division]:checked").val()
		if ((Number(_division) === 1 || Number(_division) === 2) && amount.val() > g_balance)
		{
			let msg = `취소 UCD는 ${message.overBalance}
						보유 UCD: ${numberWithCommas(g_balance)}
						입력한 UCD: ${numberWithCommas(amount.val())}`
			sweetToast(msg);
			amount.trigger('focus');
			return false;
		}

		if (isEmpty(modalFrom.val()))
		{
			sweetToast(`프로모션 기간(시작일)은 ${message.required}`);
			modalFrom.trigger('focus');
			return false;
		}

		if (isEmpty(modalTo.val()))
		{
			sweetToast(`프로모션 기간(종료일)은 ${message.required}`);
			modalTo.trigger('focus');
			return false;
		}

		if (isEmpty(contractTitle.val()))
		{
			sweetToast(`계약명은 ${message.required}`);
			contractTitle.trigger('focus');
			return false;
		}

		if (isEmpty(contractAmount.val()))
		{
			sweetToast(`계약 금액은 ${message.required}`);
			contractAmount.trigger('focus');
			return false;
		}

		return true;
	}
