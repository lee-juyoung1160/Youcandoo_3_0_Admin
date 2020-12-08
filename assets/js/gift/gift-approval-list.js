
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type")
	const searchType 	= $("#search_type");
	const keyword 		= $("#keyword");
	const approvalStatus	= $("input[name=approval-status]");
	const selPageLength	= $("#selPageLength");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const modalMemo		= $("#memo");
	const btnSubmit		= $("#btnSubmit");

	let g_exchange_uuid;

	$( () => {
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
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		approvalStatus	.on("click", function () { atLeastOneChecked(this); });
		btnSubmit       .on("click", function () { onSubmitUpdateMemo(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		approvalStatus.eq(0).prop('checked', true);
		approvalStatus.eq(1).prop('checked', true);
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
				/*{title: tableCheckAllDom(), 	data: "",   		width: "5%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return multiCheckBoxDom(meta.row);
					}
				},*/
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
				,{title: "신청일시",    	data: "created_datetime",  	width: "12%" }
				,{title: "승인(취소)일시",    	data: "app_datetime",  		width: "12%" }
				,{title: "메모",    		data: "memo",  				width: "5%",	className: 'no-sort',
					render: function (data, type, row, meta) {
						return buildMemo(row);
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
		approvalStatus.each(function () {
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
		modalFadein();

		let memo = $(obj).data('memo');

		g_exchange_uuid = obj.id;
		modalMemo.val(memo);
		modalMemo.trigger('focus');
	}

	function onSubmitUpdateMemo()
	{
		sweetConfirm(message.modify, updateMemoRequest);
	}

	function updateMemoRequest()
	{
		let url 	= api.updateMemoGift;
		let errMsg 	= label.modify+message.ajaxError;
		let param   = {
			"exchange_uuid" : g_exchange_uuid,
			"memo" : modalMemo.val()
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

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}
