
	const nickname	= $("#nickname");
	const uctType 	= $("input[name=radio-ucd-type]");
	const target	= $("#target");
	const amount	= $("#amount");
	const content 	= $("#content");
	const btnSubmit	= $("#btnSubmit");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const modalNickname	= $("#modalNickname");
	const dataTable		= $("#dataTable")

	$(document).ready(function () {
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		nickname		.on('click', function () { onClickBizName(); });
		btnSubmit		.on("click", function () { onSubmitUcd(); });
	});

	function initComponent()
	{
		uctType.eq(0).prop("checked", true);
		amount.focus();
	}

	function initModal()
	{
		nickname.val('');
		nickname.focus();
	}

	/** 기업 검색 **/
	function onClickBizName()
	{
		modalFadein();
		/*getUser();*/
	}

	function getUser()
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
				{title: "닉네임",	data: "value",    orderable: false,   className: "text-center" }
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
		/** 닉네임에 클릭이벤트 추가 **/
		$(nRow).attr('onClick', 'setSelectedNickname(\''+aData.key+'\',\''+aData.value+'\')');
	}

	/** 모달에서 닉네임 클릭 했을 때 **/
	function setSelectedNickname(uuid, name)
	{
		nickname.val(name);
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
							location.href = page.listUcdUsage;
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
		if (isEmpty(nickname.val()))
		{
			alert('닉네임은 '+message.required);
			return false;
		}

		if (isEmpty(amount.val()))
		{
			alert('UCD는 '+message.required);
			amount.focus();
			return false;
		}

		if (amount.val() > 1000000)
		{
			alert('UCD는 '+message.required);
			amount.focus();
			return false;
		}

		if (isEmpty(content.val()))
		{
			alert('내용은 '+message.required);
			content.focus();
			return false;
		}

		return true;
	}

