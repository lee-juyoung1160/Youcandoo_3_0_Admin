
	const btnModalOpen	= $("#btnModalOpen");
	const bannerTable	= $("#bannerTable");
	/** modal **/
	const modalLayout	= $(".modal-layout");
	const modalContent  = $(".modal-content");
	const modalCloseBtn	= $(".close-btn");

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
					return tableParams();
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기업", 			data: "nickname",    		width: "15%",    orderable: false,   className: "text-center" }
				,{title: "프로모션명", 	data: "promotion_title",    width: "30%",    orderable: false,   className: "text-center" }
				,{title: "프로모션 예산", 	data: "budget_ucd",     width: "15%",    orderable: false,   className: "text-center",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "잔여예산", 	data: "remain_budget_ucd", 	width: "15%",    orderable: false,   className: "text-center",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "프로모션 기간", data: "start_date",    	   	width: "20%",    orderable: false,   className: "text-center",
					render: function (data, type, row, meta) {
						return row.start_date + ' ~ ' + row.end_date;
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
				selector: 'tr',
				update: false
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				let table = bannerTable.DataTable();
				table.on( 'row-reorder', function ( e, diff, edit ) {
					let row  	  = $.fn.dataTable.tables({ visible: true, api: false });
					console.log(table.tables({visible: true, api: false}))
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
	
	function tableParams()
	{
		let param = {
			"limit" : 10
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
					return tableParams();
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기업", 			data: "nickname",    		width: "15%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "프로모션명", 	data: "promotion_title",    width: "30%",    orderable: false,   className: "text-center cursor-default" }
				,{title: "프로모션 예산", 	data: "budget_ucd",     width: "15%",    orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "잔여예산", 	data: "remain_budget_ucd", 	width: "15%",    orderable: false,   className: "text-center cursor-default",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "프로모션 기간", data: "start_date",    	   	width: "20%",    orderable: false,   className: "text-center cursor-default",
					render: function (data, type, row, meta) {
						return row.start_date + ' ~ ' + row.end_date;
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
			paging: true,
			pageLength: 10,
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
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

