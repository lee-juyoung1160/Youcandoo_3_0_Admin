
	import {headers, ajaxRequestWithJsonData, isSuccessResp} from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {
		body,
		dateButtons,
		dataTable,
		dateFrom,
		dateTo,
		btnCancel,
		keyword,
		selPageLength,
		btnSearch,
		btnReset,
		selSearchType,
		memo,
		btnSubmitMemo,
		rdoType,
		chkStatus,
		modalBackdrop,
		modalDetail,
		modalClose,
		selDateType,
		modalDetailContent,
		modalCancel,
		btnSubmit,
	} from '../modules/elements.js';
	import {sweetError, sweetToast, sweetConfirm, sweetToastAndCallback} from '../modules/alert.js';
	import {
		onClickDateRangeBtn,
		initDayBtn,
		initSearchDatepicker,
		initSearchDateRangeWeek,
		initMaxDateToday,
		initPageLength,
		initSelectOption, moveToMemberDetail,
		fadeoutModal, overflowHidden, onChangeSearchDateFrom, onChangeSearchDateTo, onErrorImage, atLeastChecked
	} from "../modules/common.js";
	import { isEmpty, numberWithCommas, isDisplay } from "../modules/utils.js";
	import {
		initTableDefaultConfig,
		buildTotalCount,
		toggleBtnPreviousAndNextOnTable,
		checkBoxElement
	} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";

	const couponObjects = {};
	let swipe = new Swiper('.swiper-container');

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		initSearchDatepicker();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		initSearchForm();
		/** 목록 불러오기 **/
		buildTable();
		/** 이벤트 **/
		body  			.on("keydown", function (event) { onKeydownSearch(event) });
		dateFrom.on('change', function () { onChangeSearchDateFrom(); });
		dateTo.on('change', function () { onChangeSearchDateTo(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSearch 		.on("click", function () { onSubmitSearch(); });
		btnReset		.on("click", function () { initSearchForm(); });
		dateButtons		.on("click", function () { onClickDateRangeBtn(this); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnSubmitMemo	.on("click", function () { onSubmitUpdateMemo(); });
		btnCancel		.on("click", function () { onClickBtnCancel(); });
		btnSubmit		.on("click", function () { onSubmitCancelGift(); });
		chkStatus		.on('click', function () { atLeastChecked(this); });
	});

	function initSearchForm()
	{
		initDayBtn();
		initMaxDateToday();
		initSearchDateRangeWeek();
		initSelectOption();
		keyword.val('');
		rdoType.eq(0).prop('checked', true);
		chkStatus.eq(0).prop('checked', true);
		chkStatus.eq(1).prop('checked', true);
		chkStatus.eq(2).prop('checked', true);
	}

	function onKeydownSearch(event)
	{
		if (!isDisplay(modalCancel) && event.keyCode === 13)
			onSubmitSearch();
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.sendGiftList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(json.msg);
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					let sendStatus = [];
					chkStatus.each(function () {
						if ($(this).is(":checked"))
							sendStatus.push($(this).val())
					})
					const param = {
						"date_type" : selDateType.val(),
						"from_date" : dateFrom.val(),
						"to_date" : dateTo.val(),
						"search_type": selSearchType.val(),
						"keyword" : keyword.val().trim(),
						"page" : (d.start / d.length) + 1,
						"limit": selPageLength.val(),
						"gift_type": $("input[name=radio-type]:checked").val(),
						"status" : sendStatus
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "상품유형",    	data: "goods_code",  	width: "5%",
					render: function (data) {
						return isEmpty(data) ? label.gift : label.gifticon;
					}
				}
				,{title: "상품명", 		data: "gift_name",    	width: "15%" }
				,{title: "신청자", 		data: "nickname",    	width: "20%",
					render: function (data, type, row, meta) {
						return `<a data-uuid="${row.profile_uuid}">${data}</a>`;
					}
				}
				,{title: "신청수량",    	data: "qty",  			width: "5%" }
				,{title: "금액(UCD)",	data: "ucd",  			width: "8%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "승인/발송/취소일시",   data: "updated", 		width: "13%" }
				,{title: "예약일시",   		data: "reserved", 		width: "13%",
					render: function (data, type, row, meta) {
						return isEmpty(row.goods_code) ? label.dash : data;
					}
				}
				,{title: "상태",    			data: "status",  		width: "5%" }
				,{title: "상세내역",    		data: "exchange_uuid",  width: "5%",
					render: function (data, type, row, meta) {
						return row.coupon.length > 0 ? `<a class="view-detail" data-uuid="${data}">보기</a>` : label.dash;
					}
				}
				,{title: "메모",    			data: "memo",  			width: "5%",
					render: function (data, type, row, meta) {
						return buildMemo(row);
					}
				}
				,{title: "",				data: "exchange_uuid",  width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: false,
			initComplete: function () {
				dataTable.on( 'select.dt', function ( e, dt, type, indexes ) { $("input[name=chk-row]").eq(indexes).prop('checked', true); });
				dataTable.on( 'deselect.dt', function ( e, dt, type, indexes ) { $("input[name=chk-row]").eq(indexes).prop('checked', false) });
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).children().eq(8).find('a').on('click', function () { viewDetail(this); });
				if (aData.coupon.length > 0) Object.assign(couponObjects, { [aData.exchange_uuid] : { "coupons" : aData.coupon } });
				if (aData.status === '취소') $(nRow).addClass('minus-pay');
				if (aData.status !== '승인') $(nRow).children().eq(10).find('input').prop('disabled', true);
				/** 닉네임 클릭이벤트 **/
				$(nRow).children().eq(2).find('a').on('click', function () { onClickNickname(this); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildMemo(data)
	{
		const previewEL = isEmpty(data.memo) ? label.dash : `<i class="tooltip-mark fas fa-sticky-note"><span class="tooltip-txt left">${data.memo}</span></i>`;
		return `${previewEL}`;
				//<button class="btn-i btn-text-teal" data-uuid="${data.exchange_uuid}" data-memo="${data.memo}"><i class="fas fa-edit"></i></button>
	}

	function onClickNickname(obj)
	{
		moveToMemberDetail($(obj).data('uuid'));
	}

	function viewDetail(obj)
	{
		modalDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		buildDetail(obj);
	}

	function buildDetail(obj)
	{
		const exchangeId = $(obj).data('uuid');
		const { coupons } = couponObjects[exchangeId];
		if (!isEmpty(coupons) && coupons.length > 0)
		{
			modalDetailContent.empty();
			coupons.map(obj => {
				const {gift_image_url, goodsCd, brandNm, goodsNm, sellPriceAmt, recverTelNo, validPrdEndDt, pinStatusNm, sendStatusCd, tr_id} = obj;
				const btnResend = pinStatusNm === '발행'
					? `<div class="right-wrap gift-resand">
							<button type="button" data-trid="${tr_id}" class="btn-sm btn-teal btn-resend">재발송</button>
						</div>`
					: '';
 				const couponEl =
					`<div class="swiper-slide">
						<table class="detail-table">
							<colgroup>
								<col style="width: 20%;">
								<col style="width: 80%;">
							</colgroup>
							<tbody>
								<tr>
									<th>상품이미지</th>
									<td>
										<div class="detail-img-wrap">
											<img src="${gift_image_url}" alt="">
										</div>
									</td>
								</tr>
								<tr>
									<th>상품코드</th>
									<td>${goodsCd}</td>
								</tr>
								<tr>
									<th>상품명</th>
									<td>[${brandNm}] ${goodsNm}</td>
								</tr>
								<tr>
									<th>판매단가</th>
									<td>${numberWithCommas(sellPriceAmt)}</td>
								</tr>
								<tr>
									<th>수신자 번호</th>
									<td>${recverTelNo}</td>
								</tr>
								<tr>
									<th>유효기간 만료일</th>
									<td>${formattingToCouponExpireDate(validPrdEndDt)}</td>
								</tr>
								<tr>
									<th>발송 상태</th>
									<td>${sendStatusCd}</td>
								</tr>
								<tr>
									<th>쿠폰 상태</th>
									<td>${pinStatusNm}</td>
								</tr>
							</tbody>
						</table>
						${btnResend}
					</div>`

				modalDetailContent.append(couponEl);
			})
		}
		onErrorImage();
		initSwipe();

		$(".btn-resend").on('click', function () { onClickBtnResend(this); });
	}

	function initSwipe()
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

	function onClickBtnCancel()
	{
		if (cancelValid())
		{
			modalCancel.fadeIn();
			modalBackdrop.fadeIn();
			overflowHidden();
			initModalCancel();
		}
	}

	function initModalCancel()
	{
		memo.val('');
		memo.trigger('focus');
	}

	function cancelValid()
	{
		if (isEmpty(getSelectedExchangeId()))
		{
			sweetToast(`대상을 ${message.select}`);
			return false;
		}

		return true;
	}

	function onSubmitCancelGift()
	{
		sweetConfirm(message.cancel, cancelRequest);
	}

	function cancelRequest()
	{
		const url = api.rejectGift;
		const errMsg = label.cancel+message.ajaxError;
		const param  = {
			"exchange_list" : [getSelectedExchangeId()],
			"memo" : memo.val().trim()
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), cancelReqCallback, errMsg, false);
	}

	function cancelReqCallback(data)
	{
		sweetToastAndCallback(data, cancelSuccess);
	}

	function cancelSuccess()
	{
		fadeoutModal();
		onSubmitSearch();
	}

	let g_tr_id;
	function onClickBtnResend(obj)
	{
		g_tr_id = $(obj).data('trid');
		sweetConfirm(message.send, resendRequest);
	}

	function resendRequest()
	{
		const url = api.resendGift;
		const errMsg = `재발송${message.ajaxError}`;
		const param  = {
			"tr_id" : g_tr_id,
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), resendReqCallback, errMsg, false);
	}

	function resendReqCallback(data)
	{
		sweetToastAndCallback(data, onSubmitSearch);
	}

	function getSelectedExchangeId()
	{
		const table = dataTable.DataTable();
		const selectedData = table.rows('.selected').data()[0];

		return isEmpty(selectedData) ? '' : selectedData.exchange_uuid;
	}

	function formattingToCouponExpireDate(x)
	{
		return `${x.substring(0, 4)}-${x.substring(4, 6)}-${x.substring(6, 8)} ${x.substring(8, 10)}:${x.substring(10, 12)}:${x.substring(12, 14)}`;
	}
