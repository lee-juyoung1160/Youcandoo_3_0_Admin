
	const bannerTable	= $("#bannerTable");
	const btnSubmit		= $("#btnSubmit");
	const dataTable		= $("#dataTable");
	const btnSearch		= $(".search-btn");
	const searchType	= $("#searchType");
	const keyword		= $("#keyword");
	const btnAdd		= $("#btnAdd");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 배너 테이블(왼쪽) 데이터 로드 **/
		buildBanners();
		/** 테이블 drag and drop 정렬 초기화 **/
		initSortTable();
		/** 이벤트 **/
		btnSearch		.on("click", function () { onSubmitSearch(); });
		keyword    		.on("keyup", function () { onSubmitSearch(); });
		btnAdd			.on("click", function () { addBanners(); });
		btnSubmit		.on("click", function () { onSubmitBanner(); });
	});

	function initSortTable()
	{
		bannerTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragOnElement(el);
			}
		});
	}

	function addAttrDragOnElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*30)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*40)+'px');
		$(tdElement[3]).css("width", Math.ceil(($(el).width()/100)*5)+'px');
		return $(el);
	}

	let g_banners = [];
	function buildBanners()
	{
		bannerTable.DataTable({
			ajax : {
				url: api.listBanner,
				type:"POST",
				headers: headers,
				data: "",
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "배너이미지",		data: "list_image_url",		width: "20%",
					render: function (data) {
						return `<div class="pro-thumbnail"><img src="${data}" onerror="onErrorImage(this);" alt=""></div>`;
					}
				}
				,{title: "기업명", 		data: "nickname",    		width: "30%" }
				,{title: "프로모션명", 	data: "promotion_title",    width: "40%" }
				,{title: "", 			data: "promotion_uuid",    	width: "5%",
					render: function (data) {
						return `<i onclick="removeRow(this)" data-uuid="${data}" class="far fa-times-circle"></i>`;
					}
				}
			],
			serverSide: true,
			paging: false,
			select: false,
			destroy: false,
			initComplete: function () {
				/** 데이터 없을 때 조회결과없음 로우 엘리먼트 삭제 **/
				if (!hasDataOnDatatable(this))
					removeEmptyRowFromTable();

				/** 전체 프로모션(오른쪽) 데이터 로드 **/
				getPromo();
			},
			fnRowCallback: function( nRow, aData ) {
				setBannerRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function setBannerRowAttributes(nRow, aData)
	{
		$(nRow).prop('id', aData.promotion_uuid);
		g_banners.push(aData.promotion_uuid);
	}

	function removeRow(obj)
	{
		let promoUuid = $(obj).data('uuid');
		let targetId = "#"+promoUuid

		$(targetId).remove();

		initDisableCheckbox();
		tableReloadAndStayCurrentPage(dataTable);
	}

	function getBannerRowsId()
	{
		let rows = bannerTable.find('tbody').children();
		let ids	= [];
		for (let i=0; i<rows.length; i++)
		{
			if (isEmpty(rows[i].id)) continue;

			ids.push(rows[i].id)
		}

		return ids;
	}

	function initDisableCheckbox()
	{
		g_banners.length = 0;
		bannerTable.find('tbody').children().each(function () {
			g_banners.push(this.id);
		});
	}

	function onSubmitBanner()
	{
		if (submitValidation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let ids 	= getBannerRowsId();
		let param   = JSON.stringify({ "promotion_list" : ids });
		let url 	= api.updateBanner;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, param, createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		let table = bannerTable.DataTable();
		table.ajax.reload(removeEmptyRowFromTable, false);
		onSubmitSearch();
	}

	function submitValidation()
	{
		let ids = getBannerRowsId();
		if (ids.length === 0)
		{
			sweetToast("배너를 "+message.addOn);
			return false;
		}

		return true;
	}

	function getPromo()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listNonBanner,
				type:"POST",
				global: false,
				headers: headers,
				data: function (d) {
					return promoParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 			data: "promotion_uuid",   	width: "5%",
					render: function (data, type, row, meta) {
						return multiCheckBoxDom(meta.row);
					}
				},
				{title: "배너이미지",		data: "list_image_url",		width: "20%",
					render: function (data) {
						return `<div class="pro-thumbnail"><img src="${data}" onerror="onErrorImage(this);" alt=""></div>`;
					}
				}
				,{title: "기업명", 		data: "nickname",    		width: "30%" }
				,{title: "프로모션명", 	data: "promotion_title",    width: "40%" }
			],
			serverSide: true,
			paging: false,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			scrollY: '420px',
			scrollCollapse: true,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		let checkDom = $(nRow).children().eq(0);

		/** 이미 배너 목록에 있는 경우 체크박스 disable **/
		if (g_banners.indexOf(aData.promotion_uuid) !== -1)
			$(checkDom).children().prop('disabled', true);
	}

	function promoParams()
	{
		let param = {
			"search_type" : searchType.val()
			,"keyword" : keyword.val()
		}

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function addBanners()
	{
		if (addValidation())
		{
			let table 		 = dataTable.DataTable();
			let selectedData = table.rows('.selected').data();
			let rowDom = '';
			for (let i=0; i<selectedData.length; i++)
			{
				let uuid = selectedData[i].promotion_uuid;
				let imageUrl = selectedData[i].list_image_url;
				let bizName  = selectedData[i].nickname;
				let title  = selectedData[i].promotion_title;

				rowDom +=
					`<tr role="row" id="${uuid}">
						<td>
							<div class="pro-thumbnail">
								<img class="pro-banner" src="${imageUrl}" alt="" onerror="onErrorImage(this);">
							</div>	
						</td>
						<td>${bizName}</td>
						<td>${title}</td>
						<td>
							<i onclick="removeRow(this)" data-uuid="${uuid}" class="far fa-times-circle"></i>
						</td>
					</tr>`
			}

			let targetTableBody = bannerTable.find('tbody');
			targetTableBody.append(rowDom);

			initDisableCheckbox();
			tableReloadAndStayCurrentPage(dataTable);
			bannerTable.find('tbody').sortable("destroy");
			/** 테이블 drag and drop 정렬 초기화 **/
			initSortTable();
		}
	}

	function addValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();
		let bannerRows 	 = getBannerRowsId();
		let vacancy = 5 - bannerRows.length;

		if (isEmpty(selectedData))
		{
			sweetToast(`추가할 프로모션을 ${message.select}`);
			return false;
		}

		if (selectedData.length > vacancy)
		{
			let msg = `배너는 ${message.maxAddFive}
						추가할 수 있는 배너 수: ${vacancy}`
			sweetToast(msg);
			return false;
		}

		return true;
	}

