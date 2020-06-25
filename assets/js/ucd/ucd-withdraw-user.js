
	const btnModalOpen	= $("#btnModalOpen");
	const selectedUserCount 	= $("#selectedUserCount");
	const selectedUserTableBody = $("#selectedUserTableBody");
	const resultBox = $(".result_box");
	const btnOpenResult = $(".btn-open-result");
	const target	= $("#target");
	const amount	= $("#amount");
	const content 	= $("#content");
	const btnSubmit	= $("#btnSubmit");

	/** modal **/
	const search 		= $(".search");
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
		$("body")    	.on("keydown", function (event) { onKeydownSearch(event) });
		search    		.on("click", function () { onSubmitSearch() });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnModalOpen	.on('click', function () { onClickModalOpen(); });
		btnMoveRight	.on('click', function () { onClickMoveRightUser(); });
		btnAddUser		.on('click', function () { onClickAddUser(); });
		btnOpenResult	.on("click", function () { onClickToggleOpen(this); });
		btnSubmit		.on("click", function () { onSubmitUcd(); });
	});

	function initComponent()
	{
		amount.focus();
	}

	function initModal()
	{
		modalNickname.val('');
		modalNickname.focus();
	}

	function onSubmitSearch()
	{
		getUser();
	}

	function onClickToggleOpen(obj)
	{
		$(obj).next('.table-wrap').slideToggle();
		$(obj).toggleClass('on');
	}

	/** 기업 검색 **/
	function onClickModalOpen()
	{
		initModal();
		modalFadein();
		getUser();
		buildMovedUser();
	}

	function buildMovedUser()
	{
		movedUserTableBody.empty();

		let selectedRow = selectedUserTableBody.find('tr');

		let moveUserDom = '';
		$(selectedRow).each(function () {
			let profileId = $(this).data('uuid');
			let nick = $(this).data('nick');
			let total = $(this).data('total');
			let cash = $(this).data('cash');
			let point = $(this).data('point');

			moveUserDom += '<tr data-uuid="'+profileId+'" data-nick="'+nick+'" data-cash="'+cash+'" data-point="'+point+'" data-total="'+total+'">';
			moveUserDom +=     '<td>'+nick+'</td>';
			moveUserDom += 	   '<td>';
			moveUserDom += 	   	   '<div class="user-ucd">';
			moveUserDom += 	       	   '<strong>'+numberWithCommas(total)+'UCD</strong>(ⓒ'+numberWithCommas(cash)+' / ⓟ'+numberWithCommas(point)+')';
			moveUserDom += 		   '</div>';
			moveUserDom += 	   '</td>';
			moveUserDom += 	   '<td><i onclick="removeRow(this); calculateSelectedCount();" class="far fa-times-circle"></i></td>';
			moveUserDom += '</tr>';
		});

		movedUserTableBody.append(moveUserDom);
	}

	function getUser()
	{
		dataTable.DataTable({
			ajax : {
				url: api.getNickname,
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
				{title: tableCheckAllDom(), 	data: "profile_uuid",   width: "5%",     orderable: false,
					render: function (data) {
						return multiCheckBoxDom(data);
					}
				}
				,{title: "닉네임",	data: "nickname",    width: "35%", 	 orderable: false,   className: "cursor-default" }
				,{title: "보유UCD",	data: "ucd.total",   width: "55%", 	 orderable: false,   className: "cursor-default",
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
				dataTable.on( 'page.dt', function () {
					$("#checkAll").prop('checked', false);
				});
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
				moveUserDom += '<tr data-uuid="'+profileId+'" data-nick="'+nick+'" data-cash="'+cash+'" data-point="'+point+'" data-total="'+total+'">';
				moveUserDom +=     '<td>'+nick+'</td>';
				moveUserDom += 	   '<td>';
				moveUserDom += 	   	   '<div class="user-ucd">';
				moveUserDom += 	       	   '<strong>'+numberWithCommas(total)+'UCD</strong>(ⓒ'+numberWithCommas(cash)+' / ⓟ'+numberWithCommas(point)+')';
				moveUserDom += 		   '</div>';
				moveUserDom += 	   '</td>';
				moveUserDom += 	   '<td><i onclick="removeRow(this);" class="far fa-times-circle"></i></td>';
				moveUserDom += '</tr>';
			}

			movedUserTableBody.append(moveUserDom);
		}
	}

	function moveValidation()
	{
		let table 		 = dataTable.DataTable();
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
		let table 		 = dataTable.DataTable();
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

	function removeRow(obj)
	{
		$(obj).closest('tr').remove();
	}

	function onClickAddUser()
	{
		buildSelectedUser();
		modalFadeout();
		resultBox.show();
	}

	function buildSelectedUser()
	{
		let selectedRow = movedUserTableBody.find('tr');
		let selectedUserDom = '';

		$(selectedRow).each(function () {
			let profileId = $(this).data('uuid');
			let nick = $(this).data('nick');
			let total = $(this).data('total');
			let cash = $(this).data('cash');
			let point = $(this).data('point');

			selectedUserDom += '<tr data-uuid="'+profileId+'" data-nick="'+nick+'" data-cash="'+cash+'" data-point="'+point+'" data-total="'+total+'">';
			selectedUserDom +=     '<td>'+nick+'</td>';
			selectedUserDom += 	   '<td>';
			selectedUserDom += 	   	   '<div class="user-ucd">';
			selectedUserDom += 	       	   '<strong>'+numberWithCommas(total)+'UCD</strong>(ⓒ'+numberWithCommas(cash)+' / ⓟ'+numberWithCommas(point)+')';
			selectedUserDom += 		   '</div>';
			selectedUserDom += 	   '</td>';
			selectedUserDom += 	   '<td><i style="color: #ec5c5c;" onclick="removeRow(this); calculateSelectedCount();" class="far fa-times-circle"></i></td>';
			selectedUserDom += '</tr>';
		});

		selectedUserCount.html(selectedRow.length);

		selectedUserTableBody.html(selectedUserDom);
	}

	function calculateSelectedCount()
	{
		let count = selectedUserTableBody.find('tr').length;

		if (count === 0)
			resultBox.hide();

		selectedUserCount.html(count);
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
							location.href = page.listUcdWithdraw;
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
		let uuids = [];
		selectedUserTableBody.find('tr').each(function () {
			uuids.push($(this).data('uuid'));
		});

		let param = {
			"profile_uuid" : uuids
			,"division" : 1
			,"amount" : amount.val().trim()
			,"description" : content.val().trim()
			,"created_user" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}

	function validation()
	{
		let count = selectedUserTableBody.find('tr').length;

		if (count === 0)
		{
			alert('출금대상을 '+message.addOn);
			onClickModalOpen();
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
			alert('UCD는 '+message.maxAvailableUserUcd);
			amount.focus();
			return false;
		}

		if (isEmpty(content.val()))
		{
			alert('내용은 '+message.required);
			content.focus();
			return false;
		}

		if (isOverBalance())
		{
			alert(message.overBalanceWithdraw);
			return false;
		}

		return true;
	}

	function isOverBalance()
	{
		let result = false;
		let withdraw = Number(amount.val());
		selectedUserTableBody.children().each(function () {
			let balance = $(this).data('total');
			if (withdraw > balance)
				result = true;
		});

		return result;
	}


