
	const authList		= $("#authList");
	const btnSubmitAuth	= $("#btnSubmitAuth");
	const authModalOpen = $(".auth-modal-open")
	const modalLayout	= $(".modal-layout");
	const modalContent  = $(".modal-content");
	const modalCloseBtn	= $(".close-btn");
	const authCode 		= $("#authCode");
	const authName 		= $("#authName");
	const authMenuArea 	= $("#authMenuArea");
	const btnDeleteAuth = $("#btnDeleteAuth");
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {
		getAuthList();

		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		authModalOpen	.on('click', function () { modalFadein(); })
		btnSubmitAuth	.on('click', function () { onSubmitAuth(); })
		btnDeleteAuth	.on('click', function () { deleteAuth(); })
		btnSubmit		.on('click', function () { onSubmitAuthMenu(); })
	});

	function initModal()
	{
		authCode.focus();
		authCode.val('');
		authName.val('');
	}

	function deleteAuth()
	{
		if (confirm(message.delete))
		{
			$.ajax({
				url: api.deleteAdminAuth,
				type: "POST",
				headers : headers,
				data : JSON.stringify({"code" : selectedAuthCode()}),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
						getAuthList();
				},
				error: function (request, status) {
					console.log(status);
				}
			});
		}
	}

	function selectedAuthCode()
	{
		let retCode = '';
		authList.find('li').each(function () {
			if ($(this).hasClass('on'))
				retCode = $(this).data('code');
		});
		return retCode;
	}

	function getAuthList()
	{
		$.ajax({
			url: api.listAdminAuth,
			type: "POST",
			headers : headers,
			success: function(data) {
				if (isSuccessResp(data))
					buildAuthList(data)
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildAuthList(data)
	{
		authList.empty();

		let jsonData  = JSON.parse(data);
		let respData  = jsonData.data;
		let liDom = '';
		for (let i=0; i<respData.length; i++)
		{
			let code = respData[i].code;
			let name = respData[i].name;
			i === 0 ? liDom += '<li class="on" data-code="'+code+'">' : liDom += '<li data-code="'+code+'">';
			liDom	+=	'<button onclick="onClickBtnAuth(this);" data-code="'+code+'" class="auth-list-btn" type="button">'+name+'</button>';
			liDom 	+=	'</li>';
		}

		authList.html(liDom);

		/** 선택된 권한의 메뉴를 가져옴 **/
		getAuthMenu();
	}

	function onClickBtnAuth(obj)
	{
		authList.find('li').removeClass('on');
		$(obj).parent().addClass('on');

		getAuthMenu();
	}

	function getAuthMenu()
	{
		$.ajax({
			url: api.getAdminAuth,
			type: "POST",
			headers : headers,
			data : JSON.stringify({"code" : selectedAuthCode()}),
			success: function(data) {
				if (isSuccessResp(data))
					buildAuthMenu(data)
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildAuthMenu(data)
	{
		authMenuArea.empty();
		let jsonData  = JSON.parse(data);
		let respData  = jsonData.data.menu;
		let isChecked = '';
		let menuDom	  = '';
		let len 	  = respData.length;
		let count 	  = 0;
		for (let i=0; i<len; i++)
		{
			let menuData   	  = respData[i];
			let menuName   	  = menuData.name;
			let childLen   	  = menuData.children.length;
			let parentChkId   = "pChkId_"+i;
			let chkName 	  = "chkNm_"+i;
			isChecked	  	  = menuData.view ? 'checked' : '';

			menuDom += '<li>';
			menuDom += 	'<ol class="auth-nav">';
			menuDom += 		'<li class="clearfix">';
			menuDom += 			'<div class="main-menu">';
			menuDom += 				'<div class="checkbox-wrap">';
			menuDom += 					'<input onclick="onClickParentChk(this)" type="checkbox" id="'+parentChkId+'" name="'+chkName+'" '+isChecked+'/>';
			menuDom += 					'<label for="'+parentChkId+'"><span></span>'+menuName+'</label>';
			menuDom += 				'</div>';
			menuDom += 			'</div>';
			menuDom += 			'<ul class="sub-menu">';
			if (childLen > 0)
			{
				for (let j=0; j<childLen; j++)
				{
					let childData  		= menuData.children[j];
					let childMenuName   = childData.name;
					let childPath		= childData.path;
					let childChkId 		= "cChkId_"+count;
					isChecked	  	    = childData.view ? 'checked' : '';

					menuDom += '<li>';
					menuDom += 	'<div class="checkbox-wrap">';
					menuDom += 		'<input onclick="onClickChildChk(this);" data-path="'+childPath+'" type="checkbox" id="'+childChkId+'" name="'+chkName+'" '+isChecked+'/>';
					menuDom += 		'<label for="'+childChkId+'"><span></span>'+childMenuName+'</label>';
					menuDom += 	'</div>';
					menuDom += '</li>';

					count++;
				}
			}
			menuDom += 			'</ul>';
			menuDom += 		'</li>';
			menuDom += 	'</ol>';
			menuDom += '</li>';
		}

		authMenuArea.html(menuDom);
	}

	function onClickParentChk(obj)
	{
		let chkName = $(obj).attr('name');
		if ($(obj).is(':checked'))
			$('input[name="'+chkName+'"]').prop('checked', true);
		else
			$('input[name="'+chkName+'"]').prop('checked', false);
	}

	function onClickChildChk(obj)
	{
		let count   = 0;
		let chkName = $(obj).attr('name');
		let element = $('.sub-menu input[name="'+chkName+'"]');

		element.each(function () {
			if ($(this).is(':checked'))
				count++;
		})

		if (count === 0)
			$('input[name="'+chkName+'"]').prop('checked', false);

		if (element.length === count)
			$('input[name="'+chkName+'"]').prop('checked', true);
	}

	function validation()
	{
		if (isEmpty(authCode.val()))
		{
			alert('권한코드는 ' + message.required);
			authCode.focus();
			return false;
		}

		if (isEmpty(authName.val()))
		{
			alert('권한명은 ' + message.required);
			authName.focus();
			return false;
		}

		if (!isAlphabet(authCode.val()))
		{
			alert('권한코드는 '+message.onlyAlphabet)
			authCode.focus();
			return false;
		}

		return true;
	}

	function authParams()
	{
		let param = {
			"code" : authCode.val().trim().toLocaleLowerCase()
			,"name" : authName.val().trim()
		}

		return JSON.stringify(param);
	}

	function onSubmitAuth()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createAdminAuth,
					type: "POST",
					headers : headers,
					data: authParams(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
						{
							modalFadeout();
							getAuthList();
						}
					},
					error: function (request, status) {
						console.log(status);
					}
				});
			}
		}
	}

	function onSubmitAuthMenu()
	{
		if (confirm(message.create))
		{
			$.ajax({
				url: api.setAdminAuth,
				type: "POST",
				headers : headers,
				data: menuParams(),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
					{
						getAuthList();
					}
				},
				error: function (request, status) {
					console.log(status);
				}
			});
		}
	}

	function menuParams()
	{
		let mainMenuDom = authMenuArea.find('.main-menu');
		let mainChkBox  = $(mainMenuDom).find('input:checkbox');
		let menu = [];
		$(mainChkBox).each(function () {

			let mainChkId 	  = this.id;
			let mainChkNm	  = this.name;
			let mainChkLabel  = $("label[for='"+mainChkId+"']").text();
			let children 	  = [];
			let subMenuChkbox = $('.sub-menu input[name="'+mainChkNm+'"]');

			$(subMenuChkbox).each(function () {
				let subChkId 	= this.id;
				let subChkLabel = $("label[for='"+subChkId+"']").text();
				children.push({
					"name" : subChkLabel
					,"view" : $(this).is(":checked")
					,"path" : $(this).data("path")
				});
			});

			menu.push({
				"name" : mainChkLabel
				,"view" : $(this).is(":checked")
				,"children" : children
			});

		});

		let param = {
			"code" : selectedAuthCode()
			,"menu" : menu
		}

		return JSON.stringify(param);
	}