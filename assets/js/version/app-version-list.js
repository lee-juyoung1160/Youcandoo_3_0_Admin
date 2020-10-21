
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
		/** dataTable default config **/
		initTableDefault();
		/** 이벤트 **/
		authCheck()
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		digit     		.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); validDigit(this);});
		decimal     	.on("propertychange change keyup paste input", function () { initInputNumberWithZero(this); });
		marketSearch	.on("click", function () { onSubmitSearch(); });
		selPageLength	.on("change", function () { onSubmitSearch(); });
		btnOpenModal	.on('click', function () { onClickModalOpen(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmit		.on('click', function () { onSubmitAppVersion(); });
		btnDelete		.on("click", function () { deleteAppVersion(); });
	});

	function authCheck()
	{
		let creatableIds = ['grace', 'leo', 'david', 'serin'];
		if (creatableIds.indexOf(sessionUserId.val()) === -1)
		{
			btnOpenModal.remove();
			btnSubmit.remove();
		}
	}

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
				,{title: "마켓",   	data: "store",     		  width: "20%",    className: "no-sort" }
				,{title: "버전", 	data: "target_version",   width: "30%" }
				,{title: "강제여부",  data: "force_update",     width: "20%",
					render: function (data) {
						return Number(data) === 1 ? '선택' : '강제';
					}
				}
				,{title: "등록일시",  data: "datetime",     	  width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				dataTable.on( 'page.dt', function () {
					$("#checkAll").prop('checked', false);
				});

				initTableSorter(this);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
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
		let url 	= api.createAppVersion;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, addParams(), createReqCallback, errMsg, false);
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

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		modalFadeout();
		buildGrid();
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
		let url 	= api.deleteAppVersion;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg, false);
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

	function deleteReqCallback(data)
	{
		sweetToastAndCallback(data, deleteSuccess);
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
