
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable			= $("#dataTable")
	const searchType 		= $("#search_type");
	const keyword 			= $("#keyword");
	/*const selPageLength 	= $("#selPageLength");*/
	const btnDelete			= $("#btnDelete");
	const btnReorder		= $("#btnReorder");
	const btnSubmit			= $("#btnSubmit");

	$( () => {
		/** 입력 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		/*initPageLength(selPageLength);*/
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		/*selPageLength	.on("change", function () { onSubmitSearch(); });*/
		btnSubmit		.on('click', function () { onSubmitCategory(); });
		btnDelete		.on("click", function () { deleteCategory(); });
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
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*5)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*50)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*30)+'px');
		$(tdElement[3]).css("width", Math.ceil(($(el).width()/100)*10)+'px');
		return $(el);
	}

	function initSearchForm()
	{
		keyword.val('');
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listDoitCategory,
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
				{title: tableCheckAllDom(), 			data: "idx",   			width: "5%",     className: "cursor-default",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				}
				,{title: "카테고리명", 	data: "category",    	width: "50%",  	 className: "cursor-default",
					render: function (data, type, row, meta) {
						let detailUrl	= page.detailDoitCategory + row.idx;
						return `<a href="${detailUrl}">${row.category}</a>`;
					}
				}
				,{title: "이미지",    		data: "",  				width: "30%",    className: "cursor-default",
					render: function (data, type, row, meta) {
						return buildImage(row);
					}
				}
				,{title: "노출여부",    	data: "is_blind",  		width: "10%",    className: "cursor-default",
					render: function (data, type, row, meta) {
						return buildSwitch(row);
					}
				}
			],
			language: {
				emptyTable: message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: 30,
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: false,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setBannerRowAttributes(nRow, aData)
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function setBannerRowAttributes(nRow, aData)
	{
		$(nRow).attr('data-category', aData.category);
	}

	function tableParams()
	{
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"limit" : info.length
			,"page" : _page
			,"type" : searchType.val()
			,"keyword" : keyword.val().trim()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildImage(data)
	{
		return (
			`<div class="category-img">
				<img src="/assets/images/thumbnail.png" alt="카테고리 이미지">
			</div>`
		)
	}

	function buildSwitch(data)
	{
		/** 노출여부 컬럼에 on off 스위치 **/
		let checked   = data.is_blind === 'Y' ? 'checked' : '';
		return (
			`<div class="toggle-btn-wrap">
				<div class="toggle-btn on">
					<input onclick="changeStatus(this)" data-idx="${data.idx}" type="radio" class="checkbox ${checked}">
					<div class="knobs"></div>
					<div class="layer"></div>
				</div>
			</div>`
		)
	}

	let changeParams;
	function changeStatus(obj)
	{
		changeParams   = {
			"idx" : $(obj).data('idx'),
			"is_blind" : $(obj).hasClass('checked') ? 'N' : 'Y'
		};

		sweetConfirm(`상태를 ${message.change}`, changeRequest);
	}

	function changeRequest()
	{
		let url     = api.updateDoitCategory;
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

	/** 카테고리 삭제 **/
	function deleteCategory()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteDoitCategory;
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
	}

	function onSubmitReorder()
	{
		sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		let rows = getBannerRows();
		let categorys = [];
		for (let i=0; i<rows.length; i++)
		{
			let category = $(rows[i]).data('category');
			if (isEmpty(category)) continue;

			categorys.push(category);
		}

		let param   = JSON.stringify({ "category_data" : categorys });
		let url 	= api.reorderDoitCategory;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, param, reorderReqCallback, errMsg, false);
	}

	function reorderReqCallback(data)
	{
		sweetToastAndCallback(data, onSubmitSearch);
	}

	function reorderValidation()
	{
		let rows = getBannerRows();
		let categorys = [];
		for (let i=0; i<rows.length; i++)
		{
			let category = $(rows[i]).data('category');
			if (isEmpty(category)) continue;

			categorys.push(category);
		}
		if (categorys.length === 0)
		{
			sweetToast("정렬할 카테고리가 없습니다.");
			return false;
		}

		return true;
	}

	function getBannerRows()
	{
		return dataTable.find('tbody').children();
	}