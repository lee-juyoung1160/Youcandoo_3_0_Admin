
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type")
	const searchType 	= $("#search_type");
	const keyword 		= $("#keyword");
	const sendStatus	= $("input[name=chk-send-status]");
	const selPageLength	= $("#selPageLength");
	const balanceEl		= $("#balance");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const modalContentWrap	= $("#modalContentWrap");

	let g_exchange_uuid;

	$( () => {
		/** 잔액 **/
		initBalance();
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		/*buildGrid();*/
		/** 이벤트 **/
		/*$("body")  .on("keydown", function (event) { onKeydownSearch(event) });*/
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
	});

	function initBalance()
	{
		let url = api.getBalanceGift;
		let errMsg = `잔액 ${message.ajaxLoadError}`;

		ajaxRequestWithJsonData(false, url, null, initBalanceSuccessCallback, errMsg, false);
	}

	function initBalanceSuccessCallback(data)
	{
		let { money } = data.data;
		balanceEl.html(numberWithCommas(money));
	}

	function initSearchForm()
	{
		keyword.val('');
		sendStatus.eq(0).prop('checked', true);
		sendStatus.eq(1).prop('checked', true);
		initSelectOption();
		initSearchDateRange();
		initMaxDateToday();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listApplyGift,
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
				{title: "상태",    		data: "exchange_status",  	width: "5%",	className: 'no-sort' }
				,{title: "신청자", 		data: "nickname",    		width: "20%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailUser}${row.user_idx}">${data}</a>`;
					}
				}
				,{title: "상품명", 		data: "gift_name",    		width: "20%" }
				,{title: "신청수량",    	data: "gift_qty",  			width: "5%",	className: 'no-sort' }
				,{title: "금액(UCD)",	data: "exchange_ucd",  		width: "10%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "상세내역",    	data: "exchange_uuid",  	width: "10%",
					render: function (data, type, row, meta) {
						return `<a onclick="modalDetailOpen();">보기</a>`;
					}
				}
				,{title: "발송일시",    	data: "created_datetime",  	width: "10%" }
				,{title: "재발송",   data: "exchange_uuid",  	width: "10%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						let disabled = row.exchange_status === '승인' ? '' : 'disabled';
						return `<button onclick="onClickResendGift(this);" data-uuid="${data}" class="btn-info" type="button" ${disabled}>재발송</button>`;
					}
				}
				,{title: "취소",   data: "exchange_uuid",  	width: "10%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						let disabled = row.exchange_status === '승인' ? '' : 'disabled';
						return `<button onclick="onClickResendGift(this);" data-uuid="${data}" class="btn-info" type="button" ${disabled}>재발송</button>`;
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

		let status = [];
		sendStatus.each(function () {
			if ($(this).is(":checked"))
				status.push($(this).val())
		})

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"date_type" : dateType.val()
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val().trim()
			,"status" : status
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

	function modalDetailOpen()
	{
		initModalContent();
		initSwipe();
		modalFadein();
	}

	function initModalContent()
	{
		let modalContentEl = '';
		for (let i=0; i<2; i++)
		{
			modalContentEl +=
				`<div class="swiper-slide gift-send-detail">
				<span class="gift-send-thum">
					<img src="https://youcandoo.yanadoocdn.com/gift/22862a3e83c4772aa8f6c1a561ccb90a/a6c05406790eabf90cf8cc1d57ecc947.jpg" alt="">
				</span>
				<ol>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="sub-title">상품코드</p>
							</div>
							<div class="col-2">
								<p class="detail-data">0002224446</p>
							</div>
						</div>
					</li>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="sub-title">상품명</p>
							</div>
							<div class="col-2">
								<p class="detail-data">스타벅스 아메리카노 Tall</p>
							</div>
						</div>
					</li>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="sub-title">판매단가</p>
							</div>
							<div class="col-2">
								<p class="detail-data">4,900원</p>
							</div>
						</div>
					</li>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="sub-title">수신자 번호</p>
							</div>
							<div class="col-2">
								<p class="detail-data">010-****-1160</p>
							</div>
						</div>
					</li>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="sub-title">유효기간 만료일</p>
							</div>
							<div class="col-2">
								<p class="detail-data">2022-12-31</p>
							</div>
						</div>
					</li>
					<li>
						<div class="col-wrap clearfix">
							<div class="col-1">
								<p class="sub-title">발송 상태</p>
							</div>
							<div class="col-2">
								<p class="detail-data">발송 완료</p>
							</div>
						</div>
					</li>
				</ol>
				<div class="btn-wrap">
					<button class="btn-danger" type="button"><i class="fas fa-ban"></i> 발송 취소</button>
					<button class="btn-info" type="button"><i class="fas fa-reply-all"></i> 재발송</button>
				</div>
			</div>`
		}

		modalContentWrap.html(modalContentEl);
	}

	let swiper;
	function initSwipe()
	{
		swiper = new Swiper('.swiper-container', {
			spaceBetween: 10,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			}
		});
	}

	function onClickResendGift(obj)
	{
		g_exchange_uuid = $(obj).data('uuid');

		sweetConfirm(message.send, resendAllGiftRequest);
	}

	function resendAllGiftRequest()
	{
		let url = api.sendGift;
		let errMsg = label.send+message.ajaxError;
		let param = { "exchange_uuid" : g_exchange_uuid };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), resendAllSuccessCallback, errMsg, false);
	}

	function resendAllSuccessCallback(data)
	{
		if (isSuccessResp(data))
		{
			sweetToast(data.msg);
			initBalance();
			tableReloadAndStayCurrentPage(dataTable);
		}
		else
		 	sweetToast(data.api_message);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}
