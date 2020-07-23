
	/*const search 		= $(".search");
	const reset 		= $(".reset");*/
	const marketSearch	= $("input[name=radio-market-search]");
	const dataTable		= $("#dataTable")
	const selPageLength = $("#selPageLength");
	const btnDelete		= $("#btnDelete");
	/** modal **/
	const btnOpenModal	= $("#btnOpenModal");
	const forceUpdate	= $("input[name=radio-forceupdate]");
	const marketModal	= $("input[name=radio-market]");
	const digit			= $("#digit");
	const decimal		= $("#decimal");
	const btnSubmit		= $("#btnSubmit");
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");

	$( () => {
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		digit     		.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); validDigit(this);});
		decimal     	.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		/*search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });*/
		marketSearch	.on("click", function () { onSubmitSearch(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnOpenModal	.on('click', function () { onClickModalOpen(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmit		.on('click', function () { onSubmitAppVersion(); });
		btnDelete		.on("click", function () { deleteAppVersion(); });
	});

	function validDigit(obj)
	{
		let inputValue = $(obj).val();
		let inputValueArr = inputValue.split("");
		if (inputValueArr[0] == 0)
			$(obj).val(0);
	}

	function initSearchForm()
	{
		marketSearch.eq(0).prop('checked' ,true);
	}

	function onClickModalOpen()
	{
		modalFadein();
		initModal();
	}

	function initModal()
	{
		forceUpdate.eq(0).prop('checked' ,true);
		marketModal.eq(0).prop('checked' ,true);
		digit.val('');
		decimal.val('');
		digit.trigger('focus');
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listAppVersion,
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
				{title: "", 		data: "idx",   			  width: "5%",     className: "no-sort",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				}
				,{title: "마켓",   	data: "store",     		  width: "20%",    className: "cursor-default no-sort" }
				,{title: "버전", 	data: "target_version",   width: "30%",    className: "cursor-default" }
				,{title: "강제여부",  data: "force_update",     width: "20%",    className: "cursor-default",
					render: function (data) {
						return Number(data) === 1 ? '선택' : '강제';
					}
				}
				,{title: "등록일시",  data: "datetime",     	  width: "15%",    className: "cursor-default" }
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
			paging: true,
			pageLength: Number(selPageLength.val()),
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
			fixedHeader: false,
			destroy: false,
			initComplete: function () {
				dataTable.on( 'page.dt', function () {
					$("#checkAll").prop('checked', false);
				});

				initTableSorter(dataTable);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(dataTable);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"store" : $("input[name=radio-market-search]:checked").val()
			,"limit" : Number(selPageLength.val())
			,"page" : _page
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	/** 앱 버전 등록 **/
	function onSubmitAppVersion()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		$.ajax({
			url: api.createAppVersion,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: addParams(),
			success: function(data) {
				sweetToastAndCallback(data, createSuccess);
			},
			error: function (request, status) {
				sweetError(label.submit+message.ajaxError);
			},
		});
	}

	function createSuccess()
	{
		modalFadeout();
		buildGrid();
	}

	function addParams()
	{
		let param = {
			"force_update" : $("input[name=radio-forceupdate]:checked").val()
			,"store" : $("input[name=radio-market]:checked").val()
			,"target_version" : digit.val()+'.'+decimal.val()
		}

		return JSON.stringify(param);
	}

	function validation()
	{
		if (isEmpty(digit.val()))
		{
			sweetToast('버전은 '+message.required)
			digit.trigger('focus');
			return false;
		}

		if (isEmpty(decimal.val()))
		{
			sweetToast('버전은 '+message.required)
			decimal.trigger('focus');
			return false;
		}

		return true;
	}

	/** 앱 버전 삭제 **/
	function deleteAppVersion()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		$.ajax({
			url: api.deleteAppVersion,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: delParams(),
			success: function(data) {
				sweetToastAndCallback(data, deleteSuccess);
			},
			error: function (request, status) {
				sweetError(label.delete+message.ajaxError);
			},
		});
	}

	function deleteSuccess()
	{
		tableReloadAndStayCurrentPage(dataTable);
	}

	function delValidation()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		if (isEmpty(selectedData))
		{
			sweetToast('대상을 목록에서 '+message.select);
			return false;
		}

		return true;
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data()[0];

		let delParam = {
			"idx" : selectedData.idx
		};

		return JSON.stringify(delParam)
	}