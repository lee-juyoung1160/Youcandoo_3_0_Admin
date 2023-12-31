
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const keyword		= $("#keyword");
	const selPageLength = $("#selPageLength");
	const btnCancel 	= $("#btnCancel");

	/** modal **/
	const detail 		= $("#detail");
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");

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
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnCancel		.on("click", function () { cancelPush(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		initSearchDateRange();
		initMaxDateToday();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listPush,
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
				{title: "", 				data: "idx",   					width: "5%",    className: "no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				},
				{title: "발송여부", 			data: "push_status",    		width: "5%" }
				,{title: "발송대상 ", 		data: "push_type", 	  			width: "5%",
					render: function (data) {
						return data === 'all' ? '전체' : '개인';
					}
				}
				,{title: "등록일", 			data: "created_datetime",		width: "7%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
				,{title: "발송(예약)일시", 	data: "reserve_send_datetime",  width: "10%" }
				,{title: "고유 ID", 			data: "message_id",  			width: "15%", 	className: "no-sort",
					render: function (data) {
						return `<div>
								 	<input type="text" class="input-copy" style="width: 150px" value="${data}" readonly>
								 	<i class="fas fa-copy" onclick="copyToClipboard(this);"></i>
								</div>`;
					}
				}
				,{title: "푸시 본문", 		data: "send_message",  			width: "15%",   className: "no-sort",
					render: function (data) {
						return `<a onclick="onClickDetail(this);" data-detail="${data}" class="line-clamp">${data}</a>`;
					}
				}
				,{title: "스토어", 			data: "store",    	  			width: "5%",
					render: function (data) {
						return data === 'all' ? '전체' : data;
					}
				}
				,{title: "구분", 		data: "category",  			  		width: "5%",
					render: function (data) {
						return getPushCategory(data);
					}
				}
				,{title: "도착페이지", 		data: "category_target",  		width: "25%",   className: "no-sort",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? '-' : `[${row.target_name}] ${row.target_title}`
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
			destroy: true,
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

	function onClickDetail(obj)
	{
		modalFadein();
		detail.html($(obj).data('detail'));
	}

	function tableParams()
	{
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"limit" : Number(selPageLength.val())
			,"page" : _page
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"keyword" : keyword.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function setRowAttributes(nRow, aData)
	{
		let checkDom = $(nRow).children().eq(0);
		let { is_del, send_yn } = aData;
		if (is_del === 'Y' || send_yn === 'Y')
			$(checkDom).children().prop('disabled', true);
	}

	function getPushCategory(data)
	{
		if (data === 'notice') return '공지';
		if (data === 'event') return '이벤트';
		else return '일반';
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
		initMaxDateToday();
	}

	function cancelPush()
	{
		if (cancelValidation())
			sweetConfirm(message.cancel, cancelRequest);
	}

	function cancelRequest()
	{
		let url 	= api.cancelPush;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, cancelParams(), cancelReqCallback, errMsg, false);
	}

	function cancelParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"idx" : selectedData.idx
		};

		return JSON.stringify(param)
	}

	function cancelReqCallback(data)
	{
		sweetToastAndCallback(data, cancelSuccess);
	}

	function cancelSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function cancelValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast(`대상을 목록에서 ${message.select}`);
			return false;
		}

		return true;
	}

