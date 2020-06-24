
	const btnModalOpen	= $("#btnModalOpen");
	const bannerTable	= $("#bannerTable");
	/** modal **/
	const modalLayout	= $(".modal-layout");
	const modalContent  = $(".modal-content");
	const modalCloseBtn	= $(".close-btn");
	const dataTable		= $("#dataTable");

	$(document).ready(function () {
		/** 테이블 데이터 로드 **/
		buildGrid();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnModalOpen	.on('click', function () { onClickModalOpen(); });
	});

	function onClickModalOpen()
	{
		modalFadein();
	}

	function initModal()
	{
		getPromo();
	}

	function buildGrid()
	{
		bannerTable.DataTable({
			ajax : {
				url: api.listPromotion,
				type:"POST",
				headers: headers,
				data: function (d) {
					return bannerParams();
				},
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
				,{title: "", 		data: "promotion_uuid",    		width: "5%",    orderable: false,   className: "text-center cursor-default",
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
				update: true
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				let table = bannerTable.DataTable();
				table.on( 'row-reordered', function ( e, diff, edit ) {
					let row  	  = $.fn.dataTable.tables({ visible: true, api: false });
					console.log(table.rows().data())
					console.log(row)
				});
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
			}
		});
	}
	
	function bannerParams()
	{
		let param = {
			"limit" : 5
			,"page" : 1
			,"dateType" : "created_datetime"
			,"fromDate" : "2020-06-17"
			,"toDate" : "2020-06-24"
			,"searchType" : "promotion_title"
			,"keyword" : ""
			,"is_banner" : ""
			,"status" : ["pending", "progress", "terminate", "end"]
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function removeOrder(obj)
	{
		let promoUuid = $(obj).data('uuid');

		if (confirm('배너를 '+message.delete))
		{
			console.log(promoUuid)
		}
	}

	function setRowAttributes(nRow, aData)
	{

	}

	function getPromo()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listPromotion,
				type:"POST",
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
			paging: true,
			pageLength: 5,
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			scrollY: 500,
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
			"limit" : 5
			,"page" : 1
			,"dateType" : "created_datetime"
			,"fromDate" : "2020-06-17"
			,"toDate" : "2020-06-24"
			,"searchType" : "promotion_title"
			,"keyword" : ""
			,"is_banner" : ""
			,"status" : ["pending", "progress", "terminate", "end"]
		}

		return JSON.stringify(param);
	}

