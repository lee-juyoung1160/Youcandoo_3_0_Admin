
	const permission	= $("#selAuth");
	const id			= $("#id");
	const name 			= $("#name");
	const password 		= $("#password");
	const password2		= $("#password2");
	const email 		= $("#email");
	const useYn 		= $('input:radio[name="rdoUseYn"]:checked');
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {
		/** component 초기화 **/
		initComponent();

		btnSubmit.on('click', function () { onSubmitAdmin(); })
	});

	/** input, select 초기화 **/
	function initComponent()
	{
		$("#keyword").val('');
		$("input:radio").each(function (index) {
			if (index === 0)
				$(this).prop("checked", true);
		});
		$("input:checkbox").prop("checked", true);
		$("select").each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});
	}

	function validation()
	{
		if (isEmpty(id.val()))
		{
			alert('아이디는 ' + message.required);
			id.focus();
			return false;
		}

		if (isEmpty(name.val()))
		{
			alert('이름은 ' + message.required);
			name.focus();
			return false;
		}

		if (isEmpty(password.val()))
		{
			alert('비밀번호는 ' + message.required);
			password.focus();
			return false;
		}

		if (password.val().trim() !== password2.val().trim())
		{
			alert('비밀번호가 ' + message.notEqual);
			password.focus();
			return false;
		}

		if (isEmpty(email.val()))
		{
			alert('이메일은 ' + message.required);
			email.focus();
			return false;
		}

		return true;
	}

	function params()
	{
		let formData = new FormData();
		formData.append('id', id.val());
		formData.append('name', name.val());
		formData.append('password', password.val());
		formData.append('permission', permission.val());
		formData.append('email', email.val());
		formData.append('useYn', useYn.val());

		return formData;
	}

	function onSubmitAdmin()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: "/admin",
					type: "POST",
					processData: false,
					contentType: false,
					data: params(),
					success: function(data) {

						if (data.code === 200)
						{

						}
						else
							alert(data.message);
					},
					error: function (request, status) {
						console.log(status);
					}

				});
			}
		}
	}