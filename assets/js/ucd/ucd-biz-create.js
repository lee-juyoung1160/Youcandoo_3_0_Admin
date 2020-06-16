
	const bizName		= $("#bizName");
	const assort 		= $("input[name=radio-division]");
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
		assort.eq(0).prop("checked", true);
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
				url: api.listBizName,
				type:"POST",
				headers: headers,
				dataSrc: "",
				global: false,
				data: function (d) {
					return JSON.stringify({"keyword" : modalBizName.val()});
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
					url: api.updateBizUcd,
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
		let contract = '['+modalFrom.val()+' ~ '+modalTo.val()+']';
		contract += '['+contractTitle.val().trim()+']';
		contract += ':'+contractAmount.val();
		let param = {
			"company_uuid" : g_bizUuid
			,"division" : $("input[name=radio-division]:checked").val()
			,"amount" : amount.val().trim()
			,"description" : contract
		}

		return JSON.stringify(param);
	}

	function validation()
	{
		if (isEmpty(amount.val()))
		{
			alert('UCD는 '+message.required);
			amount.focus();
			return false;
		}

		if (amount.val() > 100000000)
		{
			alert('UCD는 '+message.required);
			amount.focus();
			return false;
		}

		if (isEmpty(modalFrom.val()))
		{
			alert('프로모션 기간(시작일)은 '+message.required);
			modalFrom.focus();
			return false;
		}

		if (isEmpty(modalTo.val()))
		{
			alert('프로모션 기간(종료일)은 '+message.required);
			modalTo.focus();
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


