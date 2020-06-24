
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
				dataSrc: "data.promotion",
				headers: headers,
				/*data: function (d) {
					return bannerParams();
				},*/
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
						return '<i onclick="removeOrder(this)" data-uuid="'+data+'" class="far fa-times-circle"></i>';
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
				/*let table = bannerTable.DataTable();
				table.on( 'row-reorder', function ( e, diff, edit ) { onSubmitBanner(); });*/
			},
			fnRowCallback: function( nRow, aData ) {
				setBannerRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function bannerParams()
	{
		return JSON.stringify("");
	}

	function setBannerRowAttributes(nRow, aData)
	{
		$(nRow).prop('id', aData.promotion_uuid);
	}

	function removeOrder(obj)
	{
		let promoUuid = $(obj).data('uuid');
		if (confirm('노출 목록에서 '+message.delete))
			$("#"+promoUuid).remove();
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
		let rows = getBannerRows();
		let ids = [];
		for (let i=0; i<rows.length; i++)
			ids.push(rows[i].id)

		if (sumitValidation())
		{
			if (confirm(message.change))
			{
				$.ajax({
					url: api.updateBanner,
					type: "POST",
					headers: headers,
					dataType: 'json',
					data: JSON.stringify({ "ids" : ids }),
					success: function(data) {
						alert(getStatusMessage(data));
						reloadTable(bannerTable);
					},
					error: function (request, status) {
						alert(label.modify+message.ajaxError);
						reloadTable(bannerTable);
					},
				});
			}
		}
	}

	function sumitValidation()
	{
		let rows = getBannerRows();

		if (rows.length === 0)
		{
			alert("배너는 "+message.required+" 배너를 "+message.needMore);
			onClickModalOpen();
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
					return modalParams();
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 	data: "idx",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return singleCheckBoxDom(data);
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
				style: 'single',
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
			"searchType" : searchType.val()
			,"keyword" : keyword.val()
		}

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		reloadTable(dataTable);
	}

	function addBanners()
	{
		if (addValidation())
		{
			let table 		 = dataTable.DataTable();
			let selectedData = table.rows('.selected').data();

			let params = [];
			for (let i=0; i<selectedData.length; i++)
			{
				let idx = selectedData[i].idx;
				params.push(idx);
			}
		}
	}

	function addValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();
		let bannerRows 	 = getBannerRows();
		let vacancy 	 = 5 - bannerRows.length;
		let ids = [];
		for (let i=0; i<bannerRows.length; i++)
			ids.push(bannerRows[i].id)

		if (isEmpty(selectedData))
		{
			alert('대상을 목록에서 '+message.select);
			return false;
		}

		if (vacancy > selectedData.length)
		{
			alert('배너는 '+message.maxAddFive+'\n추가 가능한 배너 갯수: '+vacancy);
			return false;
		}

console.log(selectedData)

		/*if (ids.indexOf())*/

		return true;
	}

