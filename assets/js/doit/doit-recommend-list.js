
	const dataTable			= $("#dataTable")
	const btnDelete			= $("#btnDelete");
	const btnReorder		= $("#btnReorder");
	const btnSubmit			= $("#btnSubmit");
	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");

	$( () => {
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		btnSubmit		.on('click', function () { onSubmitRecommend(); });
		btnDelete		.on("click", function () { deleteRecommend(); });
		btnReorder		.on("click", function () { onSubmitReorder(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
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
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*80)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*10)+'px');
		return $(el);
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listDoitRecommendv2,
				type: "POST",
				headers: headers,
				data: {},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: tableCheckAllDom(), 	data: "idx",   		width: "5%",     className: "cursor-default",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				}
				,{title: "큐레이션", 	data: "title",    			width: "60%",  	 className: "cursor-default",
					render: function (data, type, row, meta) {
						let detailUrl	= page.updateDoitRecommend + row.idx;
						return `<a href="${detailUrl}">${row.title}</a>`;
					}
				}
				,{title: "추천 두잇 목록",    	data: "idx",  		width: "20%",    className: "cursor-default",
					render: function (data, type, row, meta) {
						return `<a onclick="viewRecommends(${data})">목록보기</a>`;
					}
				}
				,{title: "노출여부",    	data: "is_exposure",  		width: "10%",    className: "cursor-default",
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
			paging: false,
			/*pageLength: 30,*/
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
				setRowAttributes(nRow, aData)
			},
			drawCallback: function (settings) {
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		$(nRow).attr('data-uuid', aData.recommend_uuid);
	}

	function viewRecommends(idx)
	{
		/*let url = api.detailDoitRecommend;
		let errMsg = label.list + message.ajaxLoadError;
		let param = { "idx" : idx };

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), viewRecommendsCallback, errMsg, false);*/

		modalFadein();
	}

	function viewRecommendsCallback(data)
	{

	}

	function buildSwitch(data)
	{
		/** 개설가능여부 컬럼에 on off 스위치 **/
		let checked   = data.is_exposure === 'Y' ? 'checked' : '';
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
			"is_exposure" : $(obj).hasClass('checked') ? 'N' : 'Y'
		};

		sweetConfirm(`상태를 ${message.change}`, changeRequest);
	}

	function changeRequest()
	{
		let url     = api.exposureDoitRecommend;
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

	/** 추천두잇 삭제 **/
	function deleteRecommend()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteNotice;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg, false);
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let param = {
			"idx" : selectedData.idx
		};

		return JSON.stringify(param)
	}

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
	}

	function deleteSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function onSubmitReorder()
	{
		if (reorderValidation())
			sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		let rows = getRows();
		let recommends = [];
		for (let i=0; i<rows.length; i++)
		{
			let recommend = $(rows[i]).data("uuid");
			if (isEmpty(recommend)) continue;

			recommends.push(recommend);
		}

		let param   = { "recommend_list" : recommends };
		let url 	= api.reorderDoitRecommend;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), reorderReqCallback, errMsg, false);
	}

	function reorderReqCallback(data)
	{
		sweetToastAndCallback(data, onSubmitSearch);
	}

	function reorderValidation()
	{
		let rows = getRows();
		let recommends = [];
		for (let i=0; i<rows.length; i++)
		{
			let recommend = $(rows[i]).data("uuid");
			if (isEmpty(recommend)) continue;

			recommends.push(recommend);
		}
		if (recommends.length === 0)
		{
			sweetToast("정렬할 추천 두잇이 없습니다.");
			return false;
		}

		return true;
	}

	function getRows()
	{
		return dataTable.find('tbody').children();
	}