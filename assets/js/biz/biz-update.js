
		const bizName 		= $("#bizName");
		const bizNumber		= $("#bizNumber");
		const thumbnailWarp = $(".preview-image");
		const profileImage	= $("#bizProfileImg");
		const bizLink		= $("#bizLink");
		const bizDesc		= $("#bizDesc");
		const btnSubmit		= $("#btnSubmit");

		$(document).ready(function () {
			/** 상세 불러오기 **/
			getDetail();
			/** 이벤트 **/
			profileImage.on('change', function () { onChangeValidationImage(this); });
			btnSubmit	.on('click', function(){ onSubmitBiz(); });
		});

		function getDetail()
		{
			$.ajax({
				url: api.detailBiz,
				type: "POST",
				data: detailParams(),
				headers: headers,
				dataType: 'json',
				success: function(data) {
					if (isSuccessResp(data))
						buildDetail(data);
					else
						alert(invalidResp(data))
				},
				error: function (request, status) {
					alert(label.detailContent+message.ajaxLoadError);
				}
			});
		}

		function detailParams()
		{
			let pathName  = getPathName();
			let bizIdx	  = splitReverse(pathName, '/');

			return JSON.stringify({"idx" : bizIdx});
		}

		function buildDetail(data)
		{
			let detail = data.data;
			let thumbnailDom = '';
			thumbnailDom += '<div class="upload-display">';
			thumbnailDom += 	'<div class="upload-thumb-wrap">';
			thumbnailDom += 		'<img src="'+detail.image_path+'" class="upload-thumb">';
			thumbnailDom += 	'</div>';
			thumbnailDom += '</div>';
			thumbnailWarp.prepend(thumbnailDom);
			bizName.html(detail.company_name);
			bizNumber.html(detail.company_number);
			bizLink.val(detail.url);
			bizDesc.val(detail.contents);
		}

		function validation()
		{
			if (isEmpty(bizLink.val()))
			{
				alert('홈페이지 링크는 ' + message.required);
				bizLink.focus();
				return false;
			}

			if (!isDomainName(bizLink.val()))
			{
				alert('홈페이지 링크 형식을 ' + message.doubleChk);
				bizLink.focus();
				return false;
			}

			if (isEmpty(bizDesc.val()))
			{
				alert('소개내용은 ' + message.required);
				bizDesc.focus();
				return false;
			}

			return true;
		}

		function params()
		{
			let pathName  = getPathName();
			let bizIdx	  = splitReverse(pathName, '/');
			let paramFile = profileImage[0].files[0];
			let formData  = new FormData();
			formData.append('company-idx', bizIdx);
			formData.append('company-url', bizLink.val().trim());
			formData.append('company-contents', bizDesc.val().trim());
			formData.append('company-image', paramFile);

			return formData;
		}

		function onSubmitBiz()
		{
			if (validation())
			{
				if (confirm(message.modify))
				{
					$.ajax({
						url: api.updateBiz,
						type: "POST",
						processData: false,
						contentType: false,
						headers: headers,
						dataType: 'json',
						data: params(),
						success: function(data) {
							alert(getStatusMessage(data));
							if (isSuccessResp(data))
								location.href = page.listBiz
						},
						error: function (request, status) {
							alert(label.submit+message.ajaxError);
						}
					});
				}
			}
		}


