
	const nickname	= $("#nickname");
	const selectedUserCount 	= $("#selectedUserCount");
	const selectedUserTableBody = $("#selectedUserTableBody");
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
	const dataTable		= $("#dataTable");
	const btnMoveRight	= $("#btnMoveRight");
	const btnAddUser	= $("#btnAddUser");
	const movedUserTableBody = $("#movedUserTableBody")

	$(document).ready(function () {
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		modalNickname	.on('keyup', function () { getUser(); });
		nickname		.on('click', function () { onClickBizName(); });
		btnMoveRight	.on('click', function () { onClickMoveRightUser(); });
		btnAddUser		.on('click', function () { onClickAddUser(); });
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
		getUser();
	}

	function getUser()
	{
		dataTable.DataTable({
			ajax : {
				url: api.getNickname,
				type:"POST",
				headers: headers,
				global: false,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: tableCheckAllDom(), 	data: "profile_uuid",   width: "5%",     orderable: false,   className: "text-center",
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				}
				,{title: "닉네임",	data: "nickname",    width: "35%", 	 orderable: false,   className: "text-center cursor-default" }
				,{title: "보유UCD",	data: "ucd.total",   width: "55%", 	 orderable: false,   className: "text-center cursor-default",
					render: function (data, type, row, meta) {
						let innerDom = '';
						innerDom += '<div class="user-ucd">';
						innerDom += 	'<strong>'+numberWithCommas(data)+'</strong>';
						innerDom += 	'(ⓒ'+row.ucd.cash+' / ⓟ'+row.ucd.point+')';
						innerDom += '</div>';
						return innerDom;
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
			ordering: false,
			order: [],
			info: false,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
			}
		});
	}

	function tableParams()
	{
		let table = dataTable.DataTable();
		let info = table.page.info();
		let _limit = info.length;
		let _page = (info.start / info.length) + 1;
		let param = {
			"limit" : _limit
			,"page" : _page
			,"keyword" : modalNickname.val()
		}
		return JSON.stringify(param);
	}

	function onClickMoveRightUser()
	{
		if (moveValidation())
		{
			let table 		 = dataTable.DataTable();
			let selectedData = table.rows('.selected').data();
			let moveUserDom = '';

			for (let i=0; i<selectedData.length; i++)
			{
				let detail = selectedData[i];
				let profileId = detail.profile_uuid;
				let nick = detail.nickname;
				let cash = detail.ucd.cash;
				let point = detail.ucd.point;
				let total = detail.ucd.total;
				moveUserDom += '<tr data-uuid="'+profileId+'">';
				moveUserDom +=     '<td>'+nick+'</td>';
				moveUserDom += 	   '<td>';
				moveUserDom += 	   	   '<div class="user-ucd">';
				moveUserDom += 	       	   '<strong>'+numberWithCommas(total)+'UCD</strong>(ⓒ'+numberWithCommas(cash)+' / ⓟ'+numberWithCommas(point)+')';
				moveUserDom += 		   '</div>';
				moveUserDom += 	   '</td>';
				moveUserDom += 	   '<td><i onclick="removeRow(this);" class="far fa-times-circle"></i></td>';
				moveUserDom += '<tr>';
			}

			movedUserTableBody.append(moveUserDom);
		}
	}

	function removeRow(obj)
	{
		$(obj).closest('tr').remove();
	}

	function moveValidation()
	{
		let table 		 = $("#dataTable").DataTable();
		let selectedData = table.rows('.selected').data();

		if (isEmpty(selectedData))
		{
			alert('대상을 목록에서 '+message.select);
			return false;
		}

		if (hasDuplicateId())
		{
			alert(message.alreadyHasUser);
			return false;
		}

		return true;
	}

	function hasDuplicateId()
	{
		let result = false;
		let table 		 = $("#dataTable").DataTable();
		let selectedData = table.rows('.selected').data();

		let movedUser = [];
		$("#movedUserTableBody").find('tr').each(function () {
			movedUser.push($(this).data("uuid"));
		});

		for (let i=0; i<selectedData.length; i++)
		{
			let detail = selectedData[i];
			let profileId = detail.profile_uuid;

			if (movedUser.indexOf(profileId) !== -1)
				result = true;
		}

		return result;
	}

	function onClickAddUser()
	{
		let selectedRow = movedUserTableBody.find('tr');
		let selectedUserDom = '';

		for (let i=0; i<selectedRow.length; i++)
		{
			selectedUserDom += '';
			selectedUserDom += '';
			selectedUserDom += '';
			selectedUserDom += '';
			selectedUserDom += '';
			selectedUserDom += '';
		}


		selectedUserCount.html(selectedRow.length);

		selectedRow

	}

	function onSubmitUcd()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createUserUcd,
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

