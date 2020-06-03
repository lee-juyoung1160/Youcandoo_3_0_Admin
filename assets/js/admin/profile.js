
	const btnProfileModify  = $("#btnProfileModify");
	const myProfile			= $("#myProfile");
	const myId 				= $("#myId");
	const myName 			= $("#myName");
	const myEmail 			= $("#myEmail");
	const password 			= $("#password");
	const passwordChk 		= $("#passwordChk");
	const passwordChkTxt	= $("#passwordChkTxt");
	const btnSubmit 		= $("#btnSubmit");
	const search 			= $(".search");
	const reset 			= $(".reset");
	const selPageLength		= $("#selPageLength");
	const dataNum			= $(".data-num");
	const dataTable			= $("#dataTable");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 검색 폼 초기화 **/
		initSearchForm();
		/** 나의 정보 **/
		getProfile();
		/** 나의 이력 **/
		getLog();
		/** 이벤트 **/
		btnProfileModify	.on('click', function () { toggleProfile(this); })
		btnSubmit			.on('click', function () { onSubmitProfile(this); })
		search				.on("click", function () { getLog(); });
		reset				.on("click", function () { initSearchForm(); });
		selPageLength		.on("change", function () { getLog(); });
		dayButtons      	.on("click", function () { onClickActiveAloneDayBtn(this); });
		password      		.on("keyup", function () { onKeyupPassword(); });
		passwordChk      	.on("keyup", function () { onKeyupPasswordChk(); });
	});

	function initSearchForm()
	{
		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	/** 프로필 상세 영역 toggle **/
	function toggleProfile(obj)
	{
		$(obj).toggleClass('active');
		myProfile.toggleClass('active');
	}

	function onKeyupPassword()
	{
		passwordChk.val('');
		passwordChkTxt.html('');
	}

	function onKeyupPasswordChk()
	{
		if (password.val() !== passwordChk.val())
			passwordChkTxt.html('비밀번호가 일지하지 않습니다.');
		else
			passwordChkTxt.html('');
	}

	function getProfile()
	{
		$.ajax({
			url: api.getProfile,
			type: "POST",
			headers : headers,
			dataType: 'json',
			data: JSON.stringify({"userid" : sessionUserId.val()}),
			success: function(data) {
				if (isSuccessResp(data))
					buildProfile(data)
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert(message.ajaxError);
			}
		});
	}

	function buildProfile(data)
	{
		let detail = data.data;

		myId.html(detail.userid);
		myName.html(detail.name);
		myEmail.html(detail.email);
	}

	function validation()
	{
		if (isEmpty(password.val()))
		{
			alert('비밀번호는 ' + message.required);
			password.focus();
			return false;
		}

		if (isEmpty(passwordChk.val()))
		{
			alert('비밀번호 확인을 ' + message.input);
			passwordChk.focus();
			return false;
		}

		if (password.val() !== passwordChk.val())
		{
			alert('비밀번호를 ' + message.doubleChk);
			passwordChk.focus();
			return false;
		}

		return true;
	}

	function updateParams()
	{
		let param = {
			"userid" : sessionUserId.val()
			,"password" : password.val().trim()
		}

		return JSON.stringify(param);
	}

	function onSubmitProfile()
	{
		if (validation())
		{
			if (confirm(message.modify))
			{
				$.ajax({
					url: api.updateProfile,
					type: "POST",
					headers : headers,
					dataType: 'json',
					data: updateParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							getProfile();
					},
					error: function (request, status) {
						alert(message.ajaxError);
					}
				});
			}
		}
	}

	function getLog()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listMyLog,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams(d);
				},
				error: function (request, status) {
					alert(message.ajaxError);
				}
			},
			columns: [
				{title: "경로", 		data: "url",   	 			width: "40%",      	orderable: false,   className: "text-center cursor-default" }
				,{title: "날짜", 	data: "datetime",   		width: "15%", 		orderable: false,   className: "text-center cursor-default" }
				,{title: "구분", 	data: "access_type_name",	width: "15%",    	orderable: false,   className: "text-center cursor-default" }
				,{title: "활동", 	data: "action",      		width: "15%",    	orderable: false,   className: "text-center cursor-default" }
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
			pageLength: Number(selPageLength.val()),
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader:false,
			destroy: true,
			initComplete: function () {
				let table = dataTable.DataTable();
				let info = table.page.info();

				dataNum.text(info.recordsTotal);
			},
			fnRowCallback: function( nRow, aData ) {
			}
		});
	}

	function tableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"userid" : sessionUserId.val()
		}

		return JSON.stringify(param);
	}