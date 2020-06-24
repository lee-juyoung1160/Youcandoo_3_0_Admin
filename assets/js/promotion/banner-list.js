
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

	$(document).ready(function () {
		/** 배너 테이블 데이터 로드 **/
		buildBanners();
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
	});

	function onClickModalOpen()
	{
		modalFadein();
	}

	function initModal()
	{
		keyword.val('');
		getPromo();
	}

	function buildBanners()
	{
		bannerTable.DataTable({
			ajax : {
				url: api.listBanner,
				type:"POST",
				async: false,
				/*dataSrc: "data.promotion",*/
				headers: headers,
				data: "",
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "배너이미지",		data: "list_image_url",		width: "25%",    orderable: false,   className: "text-center",
					render: function (data) {
						return '<img class="pro-banner" src="'+data+'" alt="">';
					}
				}
				,{title: "기업", 		data: "nickname",    		width: "15%",    orderable: false,   className: "text-center" }
				,{title: "프로모션명", 	data: "promotion_title",    width: "20%",    orderable: false,   className: "text-center" }
				,{title: "", 			data: "promotion_uuid",    	width: "5%",     orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return '<i onclick="removeRow(this)" data-uuid="'+data+'" class="far fa-times-circle"></i>';
					}
				}
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing : message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: false,
			/*pageLength: 10,*/
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: false,
			rowReorder: {
				selector: 'td:not(:last-child)',
				update: false
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				let table = bannerTable.DataTable();
				if (!table.data().any())
					bannerTable.find('tbody').children().remove();
				/** row reorder drag and drop 이벤트 **/
				/*table.on( 'row-reorder', function ( e, diff, edit ) { onSubmitBanner(); });*/
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
		if (confirm(message.delete))
		{
			$(targetId).remove();

			updateBanner();
		}
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
		{
			if (confirm(message.create))
			{
				updateBanner();
			}
		}
	}

	function submitValidation()
	{
		let rows = getBannerRows();
		if (rows.length === 0)
		{
			alert("배너를 "+message.addOn);
			onClickModalOpen();
			return false;
		}

		return true;
	}

	function updateBanner()
	{
		let rows = getBannerRows();
		let ids = [];
		for (let i=0; i<rows.length; i++)
			ids.push(rows[i].id)

		$.ajax({
			url: api.updateBanner,
			type: "POST",
			async: false,
			global: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({ "promotion_list" : ids }),
			success: function(data) {
				if (isSuccessResp(data))
				{
					modalFadeout();
					toggleDisabledBtnOpenModal();
					buildBanners();
				}
				else invalidResp(data);
			},
			error: function (request, status) {
				alert(label.modify+message.ajaxError);
				buildBanners();
			},
		});
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
					return modalParams();
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 	data: "promotion_uuid",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				},
				{title: "배너이미지",		data: "list_image_url",		width: "25%",    orderable: false,   className: "text-center",
					render: function (data) {
						return '<img class="pro-banner" src="'+data+'" alt="">';
					}
				}
				,{title: "기업", 		data: "nickname",    		width: "15%",    orderable: false,   className: "text-center" }
				,{title: "프로모션명", 	data: "promotion_title",    width: "20%",    orderable: false,   className: "text-center" }
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing : message.searching
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
			scrollY: 375,
			scrollCollapse: true,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
			}
		});
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
		getPromo();
	}

	function addBanners()
	{
		if (addValidation())
		{
			if (confirm(message.create))
			{
				buildAddBanner();

				updateBanner();
			}
		}
	}

	function buildAddBanner()
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
			rowDom += '<tr role="row" class="" id="'+uuid+'">'
			rowDom += 	'<td class=" text-center">'
			rowDom += 		'<img class="pro-banner" src="'+imageUrl+'" alt="">'
			rowDom += 	'</td>'
			rowDom += 	'<td class="text-center">'+bizName+'</td>'
			rowDom += 	'<td class="text-center">'+title+'</td>'
			rowDom += 	'<td class="text-center cursor-default">'
			rowDom += 		'<i onclick="removeRow(this)" data-uuid="'+uuid+'" class="far fa-times-circle"></i>'
			rowDom += 	'</td>'
			rowDom += '</tr>'
		}

		let targetTableBody = bannerTable.find('tbody');
		targetTableBody.append(rowDom);
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
			alert('대상을 목록에서 '+message.select);
			return false;
		}

		if (selectedData.length > vacancy)
		{
			alert('배너는 '+message.maxAddFive+'\n추가 가능한 배너 갯수: '+vacancy);
			return false;
		}

		return true;
	}

