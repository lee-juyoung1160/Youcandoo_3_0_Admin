
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

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		modalBizName	.on('keyup', function () { reloadTable(dataTable); });
		bizName			.on('click', function () { onClickBizName(); });
		promoFrom		.on('change', function () { onChangePromoFrom(); });
		btnSubmit		.on("click", function () { onSubmitUcd(); });
	});

	function initComponent()
	{
		division.eq(0).prop("checked", true);
		amount.focus();
	}

	function initModal()
	{
		modalBizName.val('');
		modalBizName.focus();
	}

	/** 기업 검색 **/
	function onClickBizName()
	{
		modalFadein();
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
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기업명",	data: "value",    orderable: false,   className: "text-center" }
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
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		/** 기업명에 클릭이벤트 추가 **/
		$(nRow).attr('onClick', 'setSelectedBiz(\''+aData.key+'\',\''+aData.value+'\')');
	}

	/** 모달에서 기업명 클릭 했을 때 **/
	let g_bizUuid;
	function setSelectedBiz(uuid, name)
	{
		g_bizUuid = uuid;
		bizName.val(name);
		modalFadeout();
	}

	function onChangePromoFrom()
	{
		promoTo.datepicker("option", "minDate", new Date(promoFrom.datepicker("getDate")));
	}

	function onSubmitUcd()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createBizUcd,
					type: "POST",
					headers: headers,
					dataType: 'json',
					data: ucdParams(),
					success: function(data) {
						alert(getStatusMessage(data))
						if (isSuccessResp(data))
							location.href = page.listUcdSales;
					},
					error: function (request, status) {
						alert(label.submit+message.ajaxError);
					}
				});
			}
		}
	}

	function ucdParams()
	{
		let param = {
			"company_uuid" : g_bizUuid
			,"division" : $("input[name=radio-division]:checked").val()
			,"amount" : amount.val().trim()
			,"start_date" : promoFrom.val()
			,"end_date" : promoTo.val()
			,"contract_name" : contractTitle.val().trim()
			,"contract_price" : contractAmount.val()
			,"created_user" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}

	function validation()
	{
		if (isEmpty(bizName.val()))
		{
			alert('기명명은 '+message.required);
			onClickBizName();
			return false;
		}

		if (isEmpty(amount.val()))
		{
			alert('UCD는 '+message.required);
			amount.focus();
			return false;
		}

		if (amount.val() > 100000000)
		{
			alert('UCD는 '+message.maxAvailableUcd);
			amount.focus();
			return false;
		}

		if (isEmpty(promoFrom.val()))
		{
			alert('프로모션 기간(시작일)은 '+message.required);
			promoFrom.focus();
			return false;
		}

		if (isEmpty(promoTo.val()))
		{
			alert('프로모션 기간(종료일)은 '+message.required);
			promoTo.focus();
			return false;
		}

		if (isEmpty(contractTitle.val()))
		{
			alert('계약명은 '+message.required);
			contractTitle.focus();
			return false;
		}

		if (isEmpty(contractAmount.val()))
		{
			alert('계약 금액은 '+message.required);
			contractAmount.focus();
			return false;
		}

		return true;
	}


