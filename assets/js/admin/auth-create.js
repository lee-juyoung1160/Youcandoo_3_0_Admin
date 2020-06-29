
	const authList		= $("#authList");
	const btnSubmitAuth	= $("#btnSubmitAuth");
	const authModalOpen = $(".auth-modal-open")
	const modalLayout	= $(".modal-layout");
	const modalContent  = $(".modal-content");
	const modalCloseBtn	= $(".close-btn");
	const authCode 		= $("#authCode");
	const authName 		= $("#authName");
	const authMenuArea 	= $("#authMenuArea");
	const btnSubmit 	= $("#btnSubmit");

	$(document).ready(function () {
		/** 권한 목록 **/
		getAuthList();
		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam("");
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		authModalOpen	.on('click', function () { onClickModalOpen(); })
		btnSubmitAuth	.on('click', function () { onSubmitAuth(); })
		btnSubmit		.on('click', function () { onSubmitAuthMenu(); })
	});

	function onClickModalOpen()
	{
		initModal();
		modalFadein();
	}

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
				url: api.deleteAuth,
				type: "POST",
				headers: headers,
				dataType: 'json',
				data : JSON.stringify({"code" : selectedAuthCode()}),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
						getAuthList();
				},
				error: function (request, status) {
					alert(label.delete+message.ajaxError);
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
			url: api.listAuth,
			type: "POST",
			headers : headers,
			dataType: 'json',
			success: function(data) {
				if (isSuccessResp(data))
					buildAuthList(data)
				else
					alert(invalidResp(data));
			},
			error: function (xhr, status) {
				alert('권한 '+label.list+message.ajaxLoadError);
			},
			complete: function (xhr, status) {
				getMenuByAuthCode();
			}
		});
	}

	function buildAuthList(data)
	{
		authList.empty();

		let details  = data.data;
		let liDom = '';
		for (let i=0; i<details.length; i++)
		{
			let code = details[i].code;
			let name = details[i].name;
			i === 0 ? liDom += '<li class="on" data-code="'+code+'">' : liDom += '<li data-code="'+code+'">';
			liDom	+=	'<button onclick="onClickBtnAuth(this);" data-code="'+code+'" class="auth-list-btn" type="button">';
			liDom	+=  	name;
			liDom	+= 	'</button>';
			liDom	+= 	'<i onclick="deleteAuth();" class="delete-btn far fa-times-circle"></i>';
			liDom 	+=	'</li>';
		}

		authList.html(liDom);
	}

	function onClickBtnAuth(obj)
	{
		authList.find('li').removeClass('on');
		$(obj).parent().addClass('on');

		getMenuByAuthCode();
	}

	function getMenuByAuthCode()
	{
		$.ajax({
			url: api.getMenuByAuth,
			type: "POST",
			headers : headers,
			dataType: 'json',
			data : JSON.stringify({"code" : selectedAuthCode()}),
			success: function(data) {
				if (isSuccessResp(data))
					buildAuthMenu(data)
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert('메뉴 '+label.list+message.ajaxLoadError);
			}
		});
	}

	function buildAuthMenu(data)
	{
		authMenuArea.empty();

		let keys   	  = Object.getOwnPropertyNames(data.data);
		let isChecked = '';
		let menuDom	  = '';
		let count 	  = 0;

		for (let i=0; i<keys.length; i++)
		{
			let key   	  	  = keys[i];
			let menuName   	  = data.data[key].name;
			let children   	  = data.data[key].children;
			let parentChkId   = "pChkId_"+i;
			let chkName 	  = "chkNm_"+i;
			isChecked	  	  = data.data[key].view ? 'checked' : '';

			menuDom += '<li>';
			menuDom += 	'<ol class="auth-nav">';
			menuDom += 		'<li class="clearfix">';
			menuDom += 			'<div class="main-menu">';
			menuDom += 				'<div class="checkbox-wrap">';
			menuDom += 					'<input onclick="onClickParentChk(this)" data-key="'+key+'" type="checkbox" id="'+parentChkId+'" name="'+chkName+'" '+isChecked+'/>';
			menuDom += 					'<label for="'+parentChkId+'"><span></span>'+menuName+'</label>';
			menuDom += 				'</div>';
			menuDom += 			'</div>';
			menuDom += 			'<ul class="sub-menu">';
			if (children)
			{
				let subKeys = Object.getOwnPropertyNames(children);
				for (let j=0; j<subKeys.length; j++)
				{
					let subKey  		= subKeys[j];
					let childMenuName   = children[subKey].name;
					let childChkId 		= "cChkId_"+count;
					isChecked	  	    = children[subKey].view ? 'checked' : '';

					menuDom += '<li>';
					menuDom += 	'<div class="checkbox-wrap">';
					menuDom += 		'<input onclick="onClickChildChk(this);" data-key="'+subKey+'" type="checkbox" id="'+childChkId+'" name="'+chkName+'" '+isChecked+'/>';
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
		let parent  = $('.main-menu input[name="'+chkName+'"]');

		element.each(function () {
			if ($(this).is(':checked'))
				count++;
		})

		if (count === 0)
			$('input[name="'+chkName+'"]').prop('checked', false);
		else if (count > 0)
			parent.prop('checked', true);
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
					url: api.createAuth,
					type: "POST",
					headers : headers,
					dataType: 'json',
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
						alert(label.submit+message.ajaxError);
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
				url: api.setMenuByAuth,
				type: "POST",
				headers : headers,
				dataType: 'json',
				data: menuParams(),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
						getAuthList();
				},
				error: function (request, status) {
					alert(label.submit+message.ajaxError);
				}
			});
		}
	}

	function menuParams()
	{
		let mainMenuDom = authMenuArea.find('.main-menu');
		let mainChkBox  = $(mainMenuDom).find('input:checkbox');
		let keyArr 		= [];
		let mainObj 	= {};
		$(mainChkBox).each(function () {

			let key	= $(this).data("key");
			let mainChkNm	  = this.name;
			let subMenuChkbox = $('.sub-menu input[name="'+mainChkNm+'"]');
			let subObj = {};

			$(subMenuChkbox).each(function () {

				let subkey	= $(this).data("key");
				let view = $(this).is(":checked");

				subObj[subkey] = {
					view
				}
			});

			keyArr.push(key);

			let view = $(this).is(":checked")
			mainObj[key] = {
				view
				,"children" : subObj
			};
		});

		let param = {
			"code" : selectedAuthCode()
			,"menu" : mainObj
		}

		return JSON.stringify(param);
	}
