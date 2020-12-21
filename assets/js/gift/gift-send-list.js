
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type")
	const searchType 	= $("#search_type");
	const keyword 		= $("#keyword");
	const status		= $("input[name=chk-send-status]");
	const giftType		= $("input[name=radio-gift-type]");
	const selPageLength	= $("#selPageLength");

	/** 상세보기 모달 **/
	const modalDetail 	= $("#modalDetail");
	const modalContentWrap	= $("#modalContentWrap");
	/** 메모 모달 **/
	const modalMemo 	= $("#modalMemo");
	const memoEl		= $("#memo");
	const btnSubmitMemo	= $("#btnSubmitMemo");
	/** modal 공통 **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");

	$( () => {
		/** swipe initialize **/
		initSwipe();
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		/*$("body")  .on("keydown", function (event) { onKeydownSearch(event) });*/
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		status			.on("click", function () { atLeastOneChecked(this); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnSubmitMemo	.on('click', function () { onSubmitUpdateMemo(); });
	});

	let swipe;
	function initSwipe()
	{
		swipe = new Swiper('.swiper-container');
	}

	function initSearchForm()
	{
		keyword.val('');
		status.eq(0).prop('checked', true);
		status.eq(1).prop('checked', true);
		status.eq(2).prop('checked', true);
		giftType.eq(0).prop('checked', true);
		initSelectOption();
		initSearchDateRange();
		initMaxDateToday();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listSendGift,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "상품유형",    	data: "gift_type",  		width: "7%" }
				,{title: "상품명", 		data: "gift_name",    		width: "13%" }
				,{title: "신청자", 		data: "nickname",    		width: "15%",
					render: function (data, type, row, meta) {
						return `<a class="line-clamp" style="max-width: 210px;" href="${page.detailUser}${row.user_idx}">${data}</a>`;
					}
				}
				,{title: "신청수량",    	data: "gift_qty",  			width: "5%",	className: 'no-sort' }
				,{title: "금액(UCD)",	data: "exchange_ucd",  		width: "7%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "상태",    		data: "exchange_status",  	width: "5%" }
				,{title: "발송/취소일시",   data: "app_datetime", 		width: "12%" }
				,{title: "예약일시",    	data: "reservation_datetime", 	width: "12%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "상세내역",    	data: "exchange_uuid",  	width: "5%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return (row.exchange_status === '발송완료' && row.gift_type === '기프티콘')
							? `<a onclick="modalDetailOpen(this);" data-uuid="${data}">보기</a>`
							: label.dash;
					}
				}
				,{title: "메모",    		data: "",  				width: "5%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return buildMemo(row);
					}
				}
				,{title: "재발송",   		data: "exchange_uuid",  	width: "7%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return (row.exchange_status === '발송완료' && row.gift_type === '기프티콘')
							?`<button onclick="onSubmitResendGift(this);" 
									data-uuid="${data}"
									data-trid=""
									class="btn-info" 
									type="button">재발송</button>`
							: label.dash;
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: false,
			initComplete: function () {
				initTableSorter(this);
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;
		let sendStatus = [];
		status.each(function () {
			if ($(this).is(":checked"))
				sendStatus.push($(this).val())
		})

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val().trim()
			,"status" : sendStatus
			,"gift_type" : $("input[name=radio-gift-type]:checked").val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		if (aData.exchange_status === '취소')
			$(nRow).addClass('minus-pay');
	}

	function buildMemo(data)
	{
		let memo = data.memo;
		let memoEl = '';
		memoEl +=
			`<div class="tooltip">`
		if (!isEmpty(memo))
			memoEl +=
				`<i onmouseover="mouseoverMemo(this);" 
					onmouseleave="mouseoutMemo(this);" 
					class="fas fa-check-circle tooltip-mark on" 
					style="cursor:pointer;"></i>
				<i class="fas fa-edit" onclick="onClickUpdateMemo(this)" data-memo="${memo}" id="${data.exchange_uuid}"></i>`;
		else
			memoEl +=
				`<i class="fas fa-check-circle tooltip-mark" style="cursor: default;"></i>
				<i class="fas fa-edit" onclick="onClickUpdateMemo(this)" data-memo="${memo}" id="${data.exchange_uuid}"></i>`;
		memoEl +=
			`<div class="tooltip-hover-text" style="display: none;">
					<strong>memo</strong>
					<p>${memo}</p>
				</div>
			</div>`

		return memoEl;
	}

	function mouseoverMemo(obj)
	{
		$(obj).siblings('.tooltip-hover-text').show();
	}

	function mouseoutMemo(obj)
	{
		$(obj).siblings('.tooltip-hover-text').hide();
	}

	function onClickUpdateMemo(obj)
	{
		modalMemoFadein();

		g_exchange_uuid = obj.id;
		let memo = $(obj).data('memo');
		memoEl.val(memo);
		memoEl.trigger('focus');
	}

	function modalMemoFadein()
	{
		modalLayout.fadeIn();
		modalMemo.fadeIn();
		overflowHidden();
	}

	function onSubmitUpdateMemo()
	{
		sweetConfirm(message.create, updateMemoRequest);
	}

	function updateMemoRequest()
	{
		let url 	= api.updateMemoGift;
		let errMsg 	= label.modify+message.ajaxError;
		let param   = {
			"exchange_uuid" : g_exchange_uuid,
			"memo" : memoEl.val().trim()
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), updateMemoReqCallback, errMsg, false);
	}

	function updateMemoReqCallback(data)
	{
		sweetToastAndCallback(data, updateMemoReqSuccess);
	}

	function updateMemoReqSuccess()
	{
		modalFadeout();
		tableReloadAndStayCurrentPage(dataTable);
	}

	function modalDetailOpen(obj)
	{
		g_send_id = $(obj).data('uuid');
		requestModalDetailContent(obj);
		modalDetailFadein();
	}

	function modalDetailFadein()
	{
		modalLayout.fadeIn();
		modalDetail.fadeIn();
		overflowHidden();
	}

	function requestModalDetailContent(obj)
	{
		let url = api.detailSendGift;
		let errMsg = `발송 상세${message.ajaxError}`;
		let param = { "exchange_uuid" : $(obj).data('uuid') };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), buildModalContent, errMsg, false );
	}

	function buildModalContent(data)
	{
		let modalContentEl = '';
		for (let { coupon_bool, goodsCd, goodsNm, sellPriceAmt, recverTelNo, sendStatusCd, pinStatusNm, validPrdEndDt, tr_id } of data.data)
		{
			if (coupon_bool)
			{
				let btnEl = pinStatusNm === '발행'
					? `<div class="btn-wrap">
						<button onclick="onSubmitResendGift(this);" data-uuid="${g_send_id}" data-trid="${tr_id}" class="btn-info" type="button">
							<i class="fas fa-reply-all"></i> 재발송
						</button>
					</div>`
					: '';
				modalContentEl +=
					`<div class="swiper-slide gift-send-detail">
					<ol>
						<li>
							<div class="col-wrap clearfix">
								<div class="col-1">
									<p class="sub-title">상품코드</p>
								</div>
								<div class="col-2">
									<p class="detail-data">${goodsCd}</p>
								</div>
							</div>
						</li>
						<li>
							<div class="col-wrap clearfix">
								<div class="col-1">
									<p class="sub-title">거래코드</p>
								</div>
								<div class="col-2">
									<p class="detail-data">${tr_id}</p>
								</div>
							</div>
						</li>
						<li>
							<div class="col-wrap clearfix">
								<div class="col-1">
									<p class="sub-title">상품명</p>
								</div>
								<div class="col-2">
									<p class="detail-data">${goodsNm}</p>
								</div>
							</div>
						</li>
						<li>
							<div class="col-wrap clearfix">
								<div class="col-1">
									<p class="sub-title">판매단가</p>
								</div>
								<div class="col-2">
									<p class="detail-data">${numberWithCommas(sellPriceAmt)}</p>
								</div>
							</div>
						</li>
						<li>
							<div class="col-wrap clearfix">
								<div class="col-1">
									<p class="sub-title">수신자 번호</p>
								</div>
								<div class="col-2">
									<p class="detail-data">${recverTelNo}</p>
								</div>
							</div>
						</li>
						<li>
							<div class="col-wrap clearfix">
								<div class="col-1">
									<p class="sub-title">유효기간 만료일</p>
								</div>
								<div class="col-2">
									<p class="detail-data">${formattingToCouponExpireDate(validPrdEndDt)}</p>
								</div>
							</div>
						</li>
						<li>
							<div class="col-wrap clearfix">
								<div class="col-1">
									<p class="sub-title">발송 상태</p>
								</div>
								<div class="col-2">
									<p class="detail-data">${sendStatusCd} (${pinStatusNm})</p>
								</div>
							</div>
						</li>
					</ol>
					${btnEl}
				</div>`
			}
			else
			{
				modalContentEl +=
					`<div class="swiper-slide gift-send-detail">
					<ol>
						<li>
							<div class="col-wrap clearfix">
								<div class="col-1">
									<p class="sub-title">거래코드</p>
								</div>
								<div class="col-2">
									<p class="detail-data">${tr_id}</p>
								</div>
							</div>
						</li>
						<li>
							<div class="col-wrap clearfix">
								<div class="col-1">
									<p class="sub-title">발송 상태</p>
								</div>
								<div class="col-2">
									<p class="detail-data">쿠폰 발송 전 또는 조회할 수 없는 쿠폰입니다.
										만약 예약발송일시 기준으로 30분이 지났다면 KT 비즈에 문의해주세요.
									</p>
								</div>
							</div>
						</li>
					</ol>
				</div>`
			}
		}

		modalContentWrap.html(modalContentEl);

		buildSwipe();
	}

	function buildSwipe()
	{
		swipe.destroy(true, true);
		swipe = new Swiper('.swiper-container', {
			spaceBetween: 10,
			pagination : {
				el: '.swiper-pagination',
				clickable: true
			}
		});
	}

	let g_send_id;
	let g_tr_id;
	function onSubmitResendGift(obj)
	{
		g_send_id = $(obj).data('uuid');
		g_tr_id = $(obj).data('trid');

		sweetConfirm(message.send, resendGiftRequest);
	}

	function resendGiftRequest()
	{
		let url = api.resendGift;
		let errMsg = label.send+message.ajaxError;
		let param = { "exchange_uuid" : g_send_id };
		if (!isEmpty(g_tr_id))
			param["tr_id"] = g_tr_id;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), resendAndRefundSuccessCallback, errMsg, false);
	}

	/*function onSubmitRefundGift(obj)
	{
		g_send_id = $(obj).data('uuid');
		g_tr_id = $(obj).data('trid');

		sweetConfirm(message.cancel, refundGiftRequest);
	}

	function refundGiftRequest()
	{
		let url = api.refundGift;
		let errMsg = label.cancel+message.ajaxError;
		let param = { "exchange_uuid" : g_send_id };
		if (!isEmpty(g_tr_id))
			param["tr_id"] = g_tr_id;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), resendAndRefundSuccessCallback, errMsg, false);
	}*/

	function resendAndRefundSuccessCallback(data)
	{
		isSuccessResp(data) ? sweetToastAndCallback(data, pageRefresh) : sweetToast(data.api_message);
	}

	function pageRefresh()
	{
		modalFadeout();
		tableReloadAndStayCurrentPage(dataTable);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}

	function formattingToCouponExpireDate(x)
	{
		return `${x.substring(0, 4)}-${x.substring(4, 6)}-${x.substring(6, 8)} ${x.substring(8, 10)}:${x.substring(10, 12)}:${x.substring(12, 14)}`;
	}
