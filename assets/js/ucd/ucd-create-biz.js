
	const bizName		= $("#bizName");
	const division 		= $("input[name=radio-division]");
	const amount		= $("#amount");
	const promoFrom		= $("#promoFrom");
	const promoTo		= $("#promoTo");
	const contractTitle	= $("#contractTitle");
	const contractAmount = $("#contractAmount");
	const btnSubmit 	= $("#btnSubmit");

	/** 기업검색 modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const modalBizName	= $("#modalBizName");
	const dataTable		= $("#dataTable")

	$( () => {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		modalBizName	.on('keyup', function () { onKeyupSearchBiz(); });
		bizName			.on('click', function () { onClickBizName(); });
		promoFrom		.on('change', function () { onChangePromoFrom(); });
		btnSubmit		.on("click", function () { onSubmitUcd(); });
	});

	function initComponent()
	{
		division.eq(0).prop("checked", true);
		amount.trigger('focus');
	}

	function initModal()
	{
		modalBizName.val('');
		modalBizName.trigger('focus');
	}

	/** 기업 검색 **/
	function onClickBizName()
	{
		modalFadein();
		initModal();
		getBiz();
	}

	function getBiz()
	{
		dataTable.DataTable({
			ajax : {
				url: api.getBizName,
				type:"POST",
				headers: headers,
				dataSrc: "",
				global: false,
				data: function (d) {
					return JSON.stringify({"keyword" : modalBizName.val()});
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기업명",	data: "value",    orderable: false }
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
			ordering: false,
			order: [],
			info: false,
			select: false,
			scrollY: 200,
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
		/** 기업명에 클릭이벤트 추가 **/
		$(nRow).attr('onClick', `setSelectedBiz("${aData.key}", "${aData.value}")`);
	}

	/** 모달에서 기업명 클릭 했을 때 **/
	let g_bizUuid;
	function setSelectedBiz(uuid, name)
	{
		g_bizUuid = uuid;
		bizName.val(name);
		modalFadeout();
	}

	function onKeyupSearchBiz()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function onChangePromoFrom()
	{
		promoTo.datepicker("option", "minDate", new Date(promoFrom.datepicker("getDate")));
	}

	function onSubmitUcd()
	{
		if (validation())
			sweetConfirmWithContent(confirmContent(), createRequest);
	}

	function confirmContent()
	{
		let checkedLabel = $("input[name=radio-division]:checked").prop('labels');
		return (
			`<ul class="modal-information">
				<li>
					<p class="sub-title">기업명</p>
					<p class="data-contents">${bizName.val()}</p>
				<li>
				<li>
					<p class="sub-title">구분</p>
					<p class="data-contents">${$(checkedLabel).text()}</p>
				<li>
				<li>
					<p class="sub-title">${$(checkedLabel).text()} UCD</p>
					<p class="data-contents">${numberWithCommas(amount.val())} UCD</p>
				<li>
				<li>
					<p class="sub-title">기간</p>
					<p class="data-contents">${promoFrom.val()} ${label.tilde} ${promoTo.val()}</p>
				<li>
				<li>
					<p class="sub-title">계약명</p>
					<p class="data-contents">${contractTitle.val().trim()}</p>
				<li>
				<li>
					<p class="sub-title">계약금액</p>
					<p class="data-contents">${numberWithCommas(contractAmount.val())} 원</p>
				<li>
			</ul>
			<p class="confirm-message">${message.create}</p>`
		)
	}

	function createRequest()
	{
		let url 	= api.createBizUcd;
		let errMsg 	= label.submit+message.ajaxError;

		ajaxRequestWithJsonData(true, url, ucdParams(), createReqCallback, errMsg, false);
	}

	function ucdParams()
	{
		let param = {
			"company_uuid" : g_bizUuid
			,"division" : $("input[name=radio-division]:checked").val()
			,"amount" : amount.val()
			,"start_date" : promoFrom.val()
			,"end_date" : promoTo.val()
			,"contract_name" : contractTitle.val().trim()
			,"contract_price" : contractAmount.val()
			,"created_user" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listUcdSales;
	}

	function validation()
	{
		if (isEmpty(bizName.val()))
		{
			sweetToast(`기명명은 ${message.required}`);
			onClickBizName();
			return false;
		}

		if (isEmpty(amount.val()))
		{
			sweetToast(`UCD는 ${message.required}`);
			amount.trigger('focus');
			return false;
		}

		if (amount.val() > 100000000)
		{
			sweetToast(`UCD는 ${message.maxAvailableBizUcd}`);
			amount.trigger('focus');
			return false;
		}

		if (isEmpty(promoFrom.val()))
		{
			sweetToast(`프로모션 기간(시작일)은 ${message.required}`);
			promoFrom.trigger('focus');
			return false;
		}

		if (isEmpty(promoTo.val()))
		{
			sweetToast(`프로모션 기간(종료일)은 ${message.required}`);
			promoTo.trigger('focus');
			return false;
		}

		if (isEmpty(contractTitle.val()))
		{
			sweetToast(`계약명은 ${message.required}`);
			contractTitle.trigger('focus');
			return false;
		}

		if (isEmpty(contractAmount.val()))
		{
			sweetToast(`계약 금액은 ${message.required}`);
			contractAmount.trigger('focus');
			return false;
		}

		return true;
	}


