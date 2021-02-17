
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable");
	const searchType 	= $("#search_type");
	const keyword 		= $("#keyword");
	const btnOpenMd		= $("#btnOpenMd");
	/** 모달 **/
	const reOrderTable  = $("#reOrderTable");
	const btnReorder	= $("#btbtnReordernSubmit");

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
		btnDelete		.on("click", function () { deleteCategory(); });
		btnReorder		.on("click", function () { onSubmitReorder(); });
		reOrderTable.find('tbody').sortable({
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
				{title: "아이콘",    		data: "icon_image_url",  	width: "30%",
					render: function (data, type, row, meta) {
						return buildImage(data);
					}
				}
				,{title: "카테고리명", 		data: "category",    		width: "40%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailDoitCategory + row.idx;
						return `<a href="${detailUrl}">${row.category}</a>`;
					}
				}
				,{title: "개설가능여부",    	data: "is_establish",  		width: "10%" }
				,{title: "노출여부",    		data: "is_blind",  			width: "10%" }
			],
			serverSide: true,
			paging: false,
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

	function setRowAttributes(nRow, aData)
	{
		$(nRow).attr('data-category', aData.category);
	}

	function tableParams()
	{
		let param = {
			"type" : searchType.val()
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
				<img src="${data}" alt="카테고리 이미지" onerror="onErrorImage(this)">
			</div>`
		)
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function onSubmitReorder()
	{
		sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		let categories = getRowsId();
		let param   = JSON.stringify({ "category_data" : categories });
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
		let categories = getRowsId();
		if (categories.length === 0)
		{
			sweetToast("정렬할 카테고리가 없습니다.");
			return false;
		}

		return true;
	}

	function getRowsId()
	{
		let rows = reOrderTable.find('tbody').children();
		let categories = [];

		for (let i=0; i<rows.length; i++)
		{
			let category = $(rows[i]).data('category');
			if (isEmpty(category)) continue;

			categories.push(category);
		}

		return categories;
	}