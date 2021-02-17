
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword 		= $("#keyword");
	/*const btnDelete		= $("#btnDelete");*/
	const btnReorder	= $("#btnReorder");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 입력 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		/*btnDelete		.on("click", function () { deleteGift(); });*/
		btnReorder		.on("click", function () { onSubmitReorder(); });
		dataTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	});

	function addAttrDragonElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*25)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		$(tdElement[3]).css("width", Math.ceil(($(el).width()/100)*15)+'px');
		$(tdElement[4]).css("width", Math.ceil(($(el).width()/100)*15)+'px');
		return $(el);
	}

	function initSearchForm()
	{
		initSelectOption();
		keyword.val('');
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listGift,
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
				/*{title: tableCheckAllDom(), 	data: "idx",   		width: "5%",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				},*/
				{title: "상품코드", 		data: "gift_uuid",    		width: "25%" }
				,{title: "상품명", 		data: "gift_name",    		width: "25%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailGift+row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "금액(UCD)",	data: "gift_ucd",  			width: "20%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "이미지",    	data: "gift_image_url",  	width: "15%",
					render: function (data, type, row, meta) {
						return buildImage(data);
					}
				}
				,{title: "노출여부",    	data: "is_exposure",  		width: "10%",
					render: function (data, type, row, meta) {
						return buildSwitch(row);
					}
				}
			],
			serverSide: true,
			paging: false,
			/*select: {
				style: 'multi',
				selector: ':checkbox'
			},*/
			select: false,
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

	function setRowAttributes(nRow, aData)
	{
		$(nRow).prop('id', aData.gift_uuid);
		$(nRow).attr('data-exposure', aData.is_exposure);
	}

	function buildImage(data)
	{
		return `<div class="category-img"><img src="${data}" alt="" onerror="onErrorImage(this)"></div>`
	}

	function buildSwitch(data)
	{
		/** 노출여부 컬럼에 on off 스위치 **/
		let checked = data.is_exposure === 'Y' ? 'checked' : '';
		return (
			`<div class="toggle-btn-wrap">
				<div class="toggle-btn on">
					<input onclick="changeStatus(this)" data-uuid="${data.gift_uuid}" type="radio" class="checkbox ${checked}">
					<div class="knobs"></div>
					<div class="layer"></div>
				</div>
			</div>`
		)
	}

	/** 노출여부 변경 **/
	let changeParams;
	function changeStatus(obj)
	{
		changeParams   = {
			"gift_uuid" : $(obj).data('uuid'),
			"is_exposure" : $(obj).hasClass('checked') ? 'N' : 'Y'
		};

		sweetConfirm(`상태를 ${message.change}`, changeRequest);
	}

	function changeRequest()
	{
		let url     = api.updateGift;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, JSON.stringify(changeParams), changeStatusCallback, errMsg, false);
	}

	function changeStatusCallback(data)
	{
		sweetToastAndCallback(data, changeStatusSuccess);
	}

	function changeStatusSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	/** 상품 삭제 **/
	/*function deleteGift()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteGift;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg, false);
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
	}

	function deleteSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			sweetToast(`대상을 목록에서 ${message.select}`);
			return false;
		}

		return true;
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		let idxs = [];
		for (let i=0; i<selectedData.length; i++)
		{
			let idx = selectedData[i].idx;
			idxs.push(idx);
		}

		let delParam = {
			"idx_list" : idxs
		};

		return JSON.stringify(delParam)
	}*/

	/** 상품 정렬 **/
	function onSubmitReorder()
	{
		sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		let uuids 	= getRowsUuid();
		let param   = JSON.stringify({ "gift_list" : uuids });
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
		let uuids = getRowsUuid();
		if (uuids.length === 0)
		{
			sweetToast("정렬할 상품(노출된 상품)이 없습니다.");
			return false;
		}

		return true;
	}

	function getRowsUuid()
	{
		let rows = dataTable.find('tbody').children();
		let uuids = [];
		for (let i=0; i<rows.length; i++)
		{
			let uuid = rows[i].id;
			let exposure = $(rows[i]).data('exposure');

			if (isEmpty(uuid) || exposure === 'N') continue;
			uuids.push(uuid);
		}

		return uuids;
	}