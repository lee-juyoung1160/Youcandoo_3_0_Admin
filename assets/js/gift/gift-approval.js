
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const dateType		= $("#date_type")
	const searchType 	= $("#search_type");
	const keyword 		= $("#keyword");
	const approvalStatus	= $("input[name=chk-approval-status]");
	const selPageLength	= $("#selPageLength");
	const btnApproval	= $("#btnApproval");
	const btnCancel		= $("#btnCancel");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 입력 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 뒤로가기 액션일때 검색폼 세팅 **/
		if (isBackAction()) setHistoryForm();
		/** 목록 불러오기 **/
		/*buildGrid();*/
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		/*search			.on("click", function () { onSubmitSearch(); });*/
		reset			.on("click", function () { initSearchForm(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		/*btnApproval	.on("click", function () { onClickApproval(); });*/
		/*btnCancel		.on("click", function () { onClickCancel(); });*/
	});

	function initSearchForm()
	{
		keyword.val('');
		approvalStatus.eq(0).prop('checked', true);
		approvalStatus.eq(1).prop('checked', false);
		approvalStatus.eq(2).prop('checked', false);
		initSelectOption();
		initSearchDateRange();
		initMaxDateToday();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listGiftApproval,
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
				{title: tableCheckAllDom(), 	data: "idx",   		width: "5%",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				},
				{title: "신청자", 		data: "nickname",    		width: "25%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailUser+row.user_idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "상품명", 		data: "gift_name",    		width: "20%" }
				,{title: "금액(UCD)",	data: "gift_ucd",  			width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "승인여부",    	data: "is_approval",  		width: "10%" }
				,{title: "신청일시",    	data: "gift_name",  		width: "15%" }
				,{title: "승인일시",    	data: "gift_name",  		width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: false,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData)
			},
			drawCallback: function (settings) {
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		$(nRow).attr('data-gift', aData.gift_uuid);
	}

	function tableParams()
	{
		let param = {
			"search_type" : searchType.val()
			,"keyword" : keyword.val().trim()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	/** 승인 **/
	function onClickApproval()
	{
		sweetConfirm(message.approve, approvalRequest);
	}

	function approvalRequest()
	{
		let uuids = getCheckedRowsUuid();
		let param   = JSON.stringify({ "uuid" : uuids });
		let url 	= api.reorderGift;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, param, reorderReqCallback, errMsg, false);
	}

	function reorderReqCallback(data)
	{
		sweetToastAndCallback(data, onSubmitSearch);
	}

	function reorderValidation()
	{
		let uuids = getCheckedRowsUuid();
		if (uuids.length === 0)
		{
			sweetToast("정렬할 상품이 없습니다.");
			return false;
		}

		return true;
	}

	function getCheckedRowsUuid()
	{
		let rows = dataTable.find('tbody').children();

		let uuids = [];
		for (let i=0; i<rows.length; i++)
		{
			let uuid = $(rows[i]).data('uuid');
			if (isEmpty(uuid)) continue;
			uuids.push(uuid);
		}

		return uuids;
	}