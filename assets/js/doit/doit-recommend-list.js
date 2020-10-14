
	const dataTable			= $("#dataTable")
	const btnDelete			= $("#btnDelete");
	const btnReorder		= $("#btnReorder");
	const btnSubmit			= $("#btnSubmit");

	$( () => {
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		btnSubmit	.on('click', function () { onSubmitRecommend(); });
		btnDelete	.on("click", function () { deleteRecommend(); });
		btnReorder	.on("click", function () { onSubmitReorder(); });
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
				,{title: "큐레이션", 	data: "title",    		width: "80%",  	 className: "cursor-default" }
				/*,{title: "이미지",    	data: "icon_image_url",  	width: "30%",    className: "cursor-default",
					render: function (data, type, row, meta) {
						return buildImage(data);
					}
				}*/
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
				setBannerRowAttributes(nRow, aData)
			},
			drawCallback: function (settings) {
			}
		});
	}

	function setBannerRowAttributes(nRow, aData)
	{
		$(nRow).attr('data-idx', aData.idx);
	}

	function buildSwitch(data)
	{
		/** 개설가능여부 컬럼에 on off 스위치 **/
		let checked   = data.is_establish === 'Y' ? 'checked' : '';
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
			"is_establish" : $(obj).hasClass('checked') ? 'N' : 'Y'
		};

		sweetConfirm(`상태를 ${message.change}`, changeRequest);
	}

	function changeRequest()
	{
		let url     = api.establishDoitCategory;
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
		sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		let rows = getBannerRows();
		let recommends = [];
		for (let i=0; i<rows.length; i++)
		{
			let category = $(rows[i]).data('idx');
			if (isEmpty(category)) continue;

			recommends.push(category);
		}

		let param   = JSON.stringify({ "recommends" : recommends });
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