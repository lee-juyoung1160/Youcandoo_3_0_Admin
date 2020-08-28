
	const dataTable			= $("#dataTable")
	const categoryName		= $("#categoryName");
	const selPageLength 	= $("#selPageLength");
	const btnDelete			= $("#btnDelete");
	const btnSubmit			= $("#btnSubmit");

	$( () => {
		/** 입력 폼 초기화 **/
		/*initInputForm();*/
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		/*initPageLength(selPageLength);*/
		/** 목록 불러오기 **/
		/*buildGrid();*/
		/** 이벤트 **/
		/*selPageLength	.on("change", function () { onSubmitSearch(); });
		btnSubmit		.on('click', function () { onSubmitCategory(); });
		btnDelete		.on("click", function () { deleteCategory(); });*/
	});

	function initInputForm()
	{
		keyword.val('');
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listProhibition,
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
				{title: '', 	data: "idx",   width: "5%",     className: "cursor-default",
					render: function (data) {
						return singleCheckBoxDom(data);
					}
				}
				,{title: "금칙어", 	data: "word",    	  	   width: "80%",  	className: "cursor-default" }
				,{title: "노출여부", 	data: "word",    	  	   width: "80%",  	className: "cursor-default" }
				,{title: "노여부",    data: "is_active",     	  width: "10%",     className: "cursor-default no-sort",
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
			"limit" : Number(selPageLength.val())
			,"page" : _page
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function buildSwitch(data)
	{
		/** 노출여부 컬럼에 on off 스위치 **/
		let checked   = data.is_active === 'Y' ? 'checked' : '';
		return (
			`<div class="toggle-btn-wrap">
				<div class="toggle-btn on">
					<input onclick="changeStatus(this)" data-userid="${data.userid}" type="radio" class="checkbox ${checked}">
					<div class="knobs"></div>
					<div class="layer"></div>
				</div>
			</div>`
		)
	}

	function changeStatus(obj)
	{
		let param   = JSON.stringify({"idx" : $(obj).data('idx')});
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, changeApi, param, changeStatusCallback, errMsg, false);
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
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	/** 카테고리 등록 **/
	function onSubmitCategory()
	{
		if (validation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let url = api.createProhibition;
		let errMsg = label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, createParams(), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		onSubmitSearch();
	}

	function createParams()
	{
		let param = {
			"category_name" : categoryName.val().trim()
			,"is_exposure" : $("input[name=radio-exposure]:checked").val()
			,"create_user" : sessionUserId.val()
		};

		return JSON.stringify(param);
	}

	function validation()
	{
		if (isEmpty(categoryName.val().trim()))
		{
			sweetToast(`카테고리명은 ${message.required}`);
			categoryName.trigger('focus');
			return false;
		}

		return true;
	}

	/** 카테고리 삭제 **/
	function deleteCategory()
	{
		if (delValidation())
			sweetConfirm(message.delete, deleteRequest);
	}

	function deleteRequest()
	{
		let url 	= api.deleteProhibition;
		let errMsg 	= label.delete+message.ajaxError;

		ajaxRequestWithJsonData(true, url, delParams(), deleteReqCallback, errMsg, false);
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
		let selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			sweetToast(`대상을 목록에서 ${message.select}`);
			return false;
		}

		return true;
	}

	function delParams()
	{
		let table 		 = dataTable.DataTable();
		let selectedData = table.rows('.selected').data();

		let params = [];
		for (let i=0; i<selectedData.length; i++)
		{
			let idx = selectedData[i].idx;
			params.push(idx);
		}

		let delParam = {
			"idx_list" : params
		};

		return JSON.stringify(delParam)
	}