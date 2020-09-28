
	const btnOpenModal	= $("#btnOpenModal");
	const bannerTable	= $("#bannerTable");
	const btnSubmit		= $("#btnSubmit");
	/** modal **/
	const modalLayout	= $(".modal-layout");
	const modalContent  = $(".modal-content");
	const modalCloseBtn	= $(".close-btn");
	const dataTable		= $("#dataTable");
	const btnSearch		= $(".search-btn");
	const searchType	= $("#searchType");
	const keyword		= $("#keyword");
	const btnAdd		= $("#btnAdd");

	$( () => {
		/** 배너 테이블 데이터 로드 **/
		buildBanners();
		/*getPromo();*/
		/** 배너추가 버튼 toggle disable **/
		toggleDisabledBtnOpenModal();
		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam("");
		/** 이벤트 **/
		modalCloseBtn	.on("click", function () { modalFadeout(); });
		modalLayout		.on("click", function () { modalFadeout(); });
		btnOpenModal	.on("click", function () { onClickModalOpen(); });
		btnSearch		.on("click", function () { onSubmitSearch(); });
		keyword    		.on("keyup", function () { onSubmitSearch(); });
		btnAdd			.on("click", function () { addBanners(); });
		btnSubmit		.on("click", function () { onSubmitBanner(); });
		bannerTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragOnElement(el);
			}
		});
	});

	function addAttrDragOnElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*40)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*25)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*25)+'px');
		$(tdElement[3]).css("width", Math.ceil(($(el).width()/100)*5)+'px');
		return $(el);
	}

	function onClickModalOpen()
	{
		modalFadein();
		initModal();
	}

	let g_banners = [];
	function initModal()
	{
		keyword.val('');
		g_banners.length = 0;
		bannerTable.find('tbody').children().each(function () {
			g_banners.push(this.id);
		});

		getPromo();
	}

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
				{title: "배너이미지",		data: "list_image_url",		width: "40%",
					render: function (data) {
						return `<img class="pro-banner" src="${data}" alt="">`;
					}
				}
				,{title: "기업", 		data: "nickname",    		width: "25%" }
				,{title: "프로모션명", 	data: "promotion_title",    width: "25%" }
				,{title: "", 			data: "promotion_uuid",    	width: "5%",   className: "cursor-default",
					render: function (data) {
						return `<i onclick="removeRow(this)" data-uuid="${data}" class="far fa-times-circle"></i>`;
					}
				}
			],
			language: {
				emptyTable : message.emptyList
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
			ordering: false,
			order: [],
			info: false,
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: false,
			initComplete: function () {
				let table = bannerTable.DataTable();
				if (!table.data().any())
					bannerTable.find('tbody').children().remove();
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
	}

	function removeRow(obj)
	{
		let promoUuid = $(obj).data('uuid');
		let targetId = "#"+promoUuid

		$(targetId).remove();

		toggleDisabledBtnOpenModal();
	}

	function getBannerRows()
	{
		return bannerTable.find('tbody').children();
	}

	function toggleDisabledBtnOpenModal()
	{
		if (isFull())
		{
			btnOpenModal.addClass('disabled');
			btnOpenModal.prop('disabled', true);
		}
		else
		{
			btnOpenModal.removeClass('disabled');
			btnOpenModal.prop('disabled', false);
		}
	}

	function isFull()
	{
		let result = false;
		let rows = getBannerRows();
		if (rows.length >= 5)
			result = true;

		return result;
	}

	function onSubmitBanner()
	{
		if (submitValidation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let rows 	= getBannerRows();
		let ids 	= [];
		for (let i=0; i<rows.length; i++)
			ids.push(rows[i].id)

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
		toggleDisabledBtnOpenModal();
		let table = bannerTable.DataTable();
		table.ajax.reload();
	}

	function submitValidation()
	{
		let rows = getBannerRows();
		if (rows.length === 0)
		{
			sweetToast("배너를 "+message.addOn);
			onClickModalOpen();
			return false;
		}

		return true;
	}

	function getPromo()
	{
		dataTable.empty();
		dataTable.DataTable({
			ajax : {
				url: api.listNonBanner,
				type:"POST",
				global: false,
				headers: headers,
				data: function (d) {
					return modalParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 	data: "promotion_uuid",   width: "5%",     orderable: false,
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				},
				{title: "배너이미지",		data: "list_image_url",		width: "25%",    orderable: false,
					render: function (data) {
						return `<img class="pro-banner" src="${data}" alt="" onerror="onErrorImage(this);">`;
					}
				}
				,{title: "기업", 		data: "nickname",    		width: "15%",    orderable: false }
				,{title: "프로모션명", 	data: "promotion_title",    width: "20%",    orderable: false }
			],
			language: {
				emptyTable : message.emptyList
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
			/*pageLength: 5,*/
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			scrollY: '420px',
			scrollCollapse: true,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
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

		/** 이미 배너 목록에 있는 경우 체크박스 삭제 **/
		if (g_banners.indexOf(aData.promotion_uuid) !== -1)
			$(checkDom).children().prop('disabled', true);
	}

	function modalParams()
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
							<img class="pro-banner" src="${imageUrl}" alt="" onerror="onErrorImage(this);">
						</td>
						<td>${bizName}</td>
						<td>${title}</td>
						<td class="cursor-default">
							<i onclick="removeRow(this)" data-uuid="${uuid}" class="far fa-times-circle"></i>
						</td>
					</tr>`
			}

			let targetTableBody = bannerTable.find('tbody');
			targetTableBody.append(rowDom);

			modalFadeout();

			toggleDisabledBtnOpenModal();
		}
	}

	function addValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();
		let bannerRows 	 = getBannerRows();
		let ids = [];
		for (let i=0; i<bannerRows.length; i++)
			ids.push(bannerRows[i].id)

		let vacancy 	 = 5 - ids.length;

		if (isEmpty(selectedData))
		{
			sweetToast(`대상을 목록에서 ${message.select}`);
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

