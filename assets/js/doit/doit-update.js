
	const bizName 			= $("#bizName");
	const selPromo 			= $("#selPromo");
	const selReward 		= $("#selReward");
	const labelSelPromo 	= $("label[for='selPromo']");
	const selectedReward    = $("#selectedReward")
	const labelSelReward 	= $("label[for='selReward']");
	const doitTitle			= $("#doitTitle");
	const doitDesc 			= $("#doitDesc");
	const inputTag			= $("#inputTag");
	const btnAddTag			= $("#btnAddTag");
	const addedTags			= $("#addedTags");
	const introFileType 	= $("input[name=radio-intro-type]");
	const introFileArea		= $("#introFileArea");
	const minAvailable 		= $("#minAvailable");
	const maxAvailable 		= $("#maxAvailable");
	const recruit 			= $("#recruit");
	const chkExtraReward	= $("input[name=chkExtraReward]");
	const extraReward		= $("#ucd-area");
	const ucdAreWrap		= $("#ucd-area-wrap");
	const doitFrom	    	= $("#doitFrom");
	const doitTo	    	= $("#doitTo");
	const startTime	    	= $("#startTime");
	const endTime	    	= $("#endTime");
	const chkAccessUser 	= $("input[name=chkAccessUser]");
	const privateCode 		= $("#privateCode");
	const exampleType 		= $("input[name=radio-example-type]");
	const exampleArea 		= $("#exampleArea");
	const exampleDesc 		= $("#exampleDesc");
	const openYn 			= $("input[name=radio-open-yn]");
	const btnSubmit			= $("#btnSubmit");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const dataTable		= $("#dataTable");
	const modalBizName	= $("#modalBizName");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 두잇 상세정보 **/
		getDoit();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		modalBizName	.on('keyup', function () { getBiz(); });
		bizName			.on('click', function () { onClickBizName(); });
		selPromo		.on('change', function () { onChangeSelPromo(); });
		selReward		.on('change', function () { onChangeSelReward(); });
		btnAddTag		.on('click', function () { onClickAddTag(); });
		introFileType	.on('change', function () { onChangeIntroType(this); });
		chkExtraReward	.on('change', function () { toggleActive(ucdAreWrap); });
		chkAccessUser	.on('change', function () { toggleActive($(".code-wrap")); });
		exampleType		.on('change', function () { onChangeExampleType(this); });
		/*btnSubmit		.on('click', function () { onSubmitUpdateDoit(); });*/
	});

	function getDoit()
	{
		$.ajax({
			url: api.detailDoit,
			type: "POST",
			async: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"idx" : idx}),
			success: function(data) {
				if (isSuccessResp(data))
					buildDoitDetail(data);
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert(label.detailContent+message.ajaxLoadError);
			},
		});
	}

	let g_doit_uuid;
	function buildDoitDetail(data) {
		let detail = data.data;
console.log(detail)
		g_doit_uuid = detail.doit_uuid;

		bizName.val(detail.company_name);
		doitTitle.val(detail.doit_title);
		doitDesc.val(detail.doit_description);

		let tag = replaceAll(detail.doit_tags, '#', '');
		let tags = tag.split(',');
		let tagDom = '';
		if (!isEmpty(tags))
		{
			for (let i = 0; i < tags.length; i++)
			{
				tagDom += '<li>';
				tagDom += 	'#<span class="tag-name added-tag">'+tags[i]+'</span>';
				tagDom += 	'<i class="delete-btn far fa-times-circle" onclick="removeTagDom(this);"></i>';
				tagDom += '</li>';
			}
			addedTags.html(tagDom);
		}

		introFileType.each(function () {
			if ($(this).val() === detail.intro_resouce_type)
			{
				$(this).prop('checked', true);
				onChangeIntroType(this);
			}
		});
		minAvailable.html(detail.min_user);
		maxAvailable.html(detail.max_user);
		if (!isEmpty(detail.group_reward_description))
		{
			chkExtraReward.prop("checked", true);
			toggleActive(ucdAreWrap);
			extraReward.val(detail.group_reward_description);
		}
		doitFrom.val(detail.action_start_datetime);
		doitTo.val(detail.action_end_datetime);
		startTime.val(detail.action_allow_start_time.substring(0, 5));
		endTime.val(detail.action_allow_end_time.substring(0, 5));
		if (!isEmpty(detail.private_code))
		{
			chkAccessUser.prop("checked", true);
			toggleActive($(".code-wrap"));
		}
		exampleType.each(function () {
			if ($(this).val() === detail.action_resource_type)
			{
				$(this).prop('checked', true);
				onChangeExampleType(this);
			}
		});
		exampleDesc.val(detail.action_description);
	}

	function toggleActive(obj)
	{
		$(obj).toggleClass('active');
	}

	function removeTagDom(obj)
	{
		$(obj).parent().remove();
	}

	/** 소개 이미지/영상 라디오 선탵할 때 파일 업로드 컴포넌트 생성 **/
	function onChangeIntroType(obj)
	{
		let introType = $(obj).val();
		let introText = $("label[for='"+$(obj).attr("id")+"']").text();
		let introFileDom = '';
		introFileDom += '<p class="cap important">두잇 소개 방법 중 <span>'+introText+'</span>를(을) 선택하셨습니다.';
		if (introType === 'video')
			introFileDom += '<span>영상</span> 및 썸네일을 업로드 해주세요!</p>';
		else
			introFileDom += '<span>사진</span>을 업로드 해주세요!</p>';
		introFileDom += '<div class="filebox preview-image">';
		introFileDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
		introFileDom += 	'<input class="upload-name" value="파일선택" disabled="disabled">';
		introFileDom += 	'<label for="introImage">업로드</label>';
		introFileDom += 	'<input type="file" id="introImage" class="upload-hidden" data-width="650" data-height="650" data-oper="eq" onchange="onChangeValidationImage(this)">';
		introFileDom += '</div>';
		if (introType === 'video')
		{
			introFileDom += '<div class="filebox preview-image">';
			introFileDom += 	'<p class="cap">영상</p>';
			introFileDom += 	'<input class="upload-name" value="파일선택" disabled="disabled" >';
			introFileDom += 	'<label for="introVideo">업로드</label>';
			introFileDom += 	'<input type="file" id="introVideo" class="upload-hidden" onchange="onChangeValidationVideo(this)">';
			introFileDom += '</div>';
		}

		introFileArea.html(introFileDom);
	}

	/** 인증예시타입 라디오 체인지 이벤트 **/
	function onChangeExampleType(obj)
	{
		exampleArea.empty();

		let exampleType = $(obj).val();
		if (exampleType === 'image')
			buildExampleImage();
		else if (exampleType === 'video')
			buildExampleVideo();
		else if (exampleType === 'voice')
			buildExampleVoice();
	}

	function buildExampleImage()
	{
		let fileDom = '';
		fileDom += '<div class="filebox preview-image">';
		fileDom += 	'<p class="cap important">인증 방법 중 <span>사진</span>을 선택하셨습니다. <span>사진</span>을 업로드 해주세요!</p>';
		fileDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
		fileDom += 	'<input class="upload-name" value="파일선택" disabled="disabled" >';
		fileDom += 	'<label for="exampleFile">업로드</label>';
		fileDom += 	'<input type="file" id="exampleFile" class="upload-hidden" data-width="650" data-height="650" data-oper="eq" onchange="onChangeValidationImage(this)">';
		fileDom += '</div>';

		exampleArea.html(fileDom);
	}

	function buildExampleVideo()
	{
		let fileDom = '';
		fileDom += '<div class="wrap">';
		fileDom += 	'<p class="cap important">인증 방법 중 <span>영상</span>을 선택하셨습니다. <span>영상</span> 및 썸네일을 업로드 해주세요!</p>';
		fileDom += 	'<div class="filebox preview-image">';
		fileDom += 		'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
		fileDom += 		'<input class="upload-name" value="파일선택" disabled="disabled">';
		fileDom += 		'<label for="exampleFile">업로드</label>';
		fileDom += 		'<input type="file" id="exampleFile" class="upload-hidden" data-width="650" data-height="650" data-oper="eq" onchange="onChangeValidationImage(this)">';
		fileDom += 	'</div>';
		fileDom += 	'<div class="filebox preview-image">';
		fileDom += 		'<p class="cap">영상</p>';
		fileDom += 		'<input class="upload-name" value="파일선택" disabled="disabled">';
		fileDom += 		'<label for="exampleVideo">업로드</label>';
		fileDom += 		'<input type="file" id="exampleVideo" class="upload-hidden" onchange="onChangeValidationVideo(this)">';
		fileDom += 	'</div>';
		fileDom += '</div>';

		exampleArea.html(fileDom);
	}

	function buildExampleVoice()
	{
		let fileDom = '';
		fileDom += '<div class="filebox preview-image">';
		fileDom += 	'<p class="cap important">인증 방법 중 <span>음성 녹음</span>을 선택하셨습니다. <span>음성 녹음</span>을 업로드 해주세요!</p>';
		fileDom += 	'<input class="upload-name" value="파일선택" disabled="disabled" >';
		fileDom += 	'<label for="exampleFile">업로드</label>';
		fileDom += 	'<input type="file" id="exampleFile" class="upload-hidden" onchange="onChangeValidationAudio(this)">';
		fileDom += '</div>';

		exampleArea.html(fileDom);
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

	let bizUuid;
	function setSelectedBiz(uuid, name)
	{
		bizUuid = uuid;
		bizName.val(name);
		minAvailable.html('0');
		maxAvailable.html('0');
		getInvolvePromo();
		buildOptionReward();
		modalFadeout();
	}

	function initModal()
	{
		modalBizName.val('');
		modalBizName.focus();
	}

	/** 태그 추가 이벤트 **/
	function onClickAddTag()
	{
		if (addTagValidation())
		{
			let inputValue = inputTag.val().trim();
			let tagArr = [];
			$(".added-tag").each(function () {
				tagArr.push($(this).text());
			});

			if (isEmpty(tagArr) || tagArr.indexOf(inputValue) === -1)
			{
				let tagDom = '';
				tagDom += '<li>';
				tagDom += 	'#<span class="tag-name added-tag">'+inputValue+'</span>';
				tagDom += 	'<i class="delete-btn far fa-times-circle" onclick="removeTagDom(this);"></i>';
				tagDom += '</li>';

				addedTags.append(tagDom);

				inputTag.val('');
				inputTag.focus();
			}
		}
	}

	function addTagValidation()
	{
		let tagLen = addedTags.find('li').length;

		if (isEmpty(inputTag.val()))
		{
			alert('태그를 '+message.input);
			inputTag.focus();
			return false;
		}

		let splitInput = inputTag.val().split('');
		if (splitInput.indexOf(',') !== -1)
		{
			alert('태그에 , 를 포함할 수 없습니다.');
			return false;
		}

		if (splitInput.indexOf('#') !== -1)
		{
			alert('태그에 # 을 포함할 수 없습니다.');
			return false;
		}

		if (tagLen >= 3)
		{
			alert('태그는 '+message.maxAddThree);
			return false;
		}

		return true;
	}

	function removeTagDom(obj)
	{
		$(obj).parent().remove();
	}

	function validation()
	{
		let tagLen 				= addedTags.find('li').length;
		let introVideoDom 		= $("#introVideo");
		let introImageFile		= $("#introImage")[0].files;
		let introVideoFile;
		if (introVideoDom.length > 0)
			introVideoFile		= introVideoDom[0].files;
		let exampleVideoDom		= $("#exampleVideo");
		let example				= $("#exampleFile")[0].files;
		let exampleVideoFile;
		if (exampleVideoDom.length > 0)
			exampleVideoFile	= exampleVideoDom[0].files;


		if (isEmpty(doitTitle.val()))
		{
			alert('두잇명은 ' + message.required);
			doitTitle.focus();
			return false;
		}

		if (isEmpty(doitDesc.val()))
		{
			alert('소개글은 '+message.required);
			doitDesc.focus();
			return false;
		}

		if (tagLen === 0)
		{
			alert('태그를 ' + message.needMore);
			return false;
		}

		if (introImageFile.length === 0)
		{
			alert('두잇 소개 이미지는 ' + message.required);
			return false;
		}

		if ($('input:radio[name=radio-intro-type]:checked').val() === 'video' && introVideoFile.length === 0)
		{
			alert('두잇 소개 영상은 ' + message.required);
			return false;
		}

		if (isEmpty(bizName.val()))
		{
			alert('기업명은 ' + message.required+'\n두잇 유형에서 기업명을 '+message.select);
			bizName.focus();
			return false;
		}

		if (isEmpty(selPromo.val()))
		{
			alert('프로모션은 ' + message.required+'\n두잇 유형에서 프로모션을 '+message.select);
			selPromo.focus();
			return false;
		}

		if (isEmpty(selReward.val()))
		{
			alert('리워드 조건은 ' + message.required+'\n두잇 유형에서 리워드 조건을 '+message.select);
			selReward.focus();
			return false;
		}

		/*if (isEmpty(recruit.val()))
		{
			alert('모집 인원은 ' + message.required);
			recruit.focus();
			return false;
		}*/

		/*if (Number(recruit.val()) > Number(g_max_user_limit) || Number(recruit.val()) < Number(g_min_user_limit))
		{
			alert('모집 인원은 ' + message.invalidRecruitCount);
			recruit.focus();
			return false;
		}*/

		if ($("input[name=chkExtraReward]").is(':checked') && isEmpty(extraReward.val()))
		{
			alert('추가리워드를 '+message.input);
			extraReward.focus();
			return false;
		}

		if (isEmpty(doitFrom.val()))
		{
			alert('인증기간(시작일)은 '+message.required);
			doitFrom.focus();
			return false;
		}

		if (isEmpty(doitTo.val()))
		{
			alert('인증기간(종료일)은 '+message.required);
			doitTo.focus();
			return false;
		}

		if (isEmpty(startTime.val()))
		{
			alert('인증시간(시작)은 '+message.required);
			startTime.focus();
			return false;
		}

		if (isEmpty(endTime.val()))
		{
			alert('인증시간(종료)은 '+message.required);
			endTime.focus();
			return false;
		}

		let actionStartTime	= Number(replaceAll(startTime.val(), ':', ''));
		let actionEndTime	= Number(replaceAll(endTime.val(), ':', ''));
		if (actionStartTime > actionEndTime)
		{
			alert(message.compareActionTime)
			startTime.focus();
			return false;
		}

		if (chkAccessUser.is(':checked') && isEmpty(privateCode.val()))
		{
			alert('참가코드를 '+message.input);
			privateCode.focus();
			return false;
		}

		if (chkAccessUser.is(':checked') && privateCode.val().trim().length < 4)
		{
			alert(message.minimumPassCode);
			privateCode.focus();
			return false;
		}

		if (example.length === 0)
		{
			alert('인증 예시는 ' + message.required);
			return false;
		}

		if ($('input:radio[name=radio-example-type]:checked').val() === 'video' && exampleVideoFile.length === 0)
		{
			alert('인증 예시 영상은 ' + message.required);
			return false;
		}

		if (isEmpty(exampleDesc.val()))
		{
			alert('인증 예시 설명은 '+message.required);
			exampleDesc.focus();
			return false;
		}

		return true;
	}

	function params()
	{
		let paramTag = [];
		addedTags.find('li').each(function () {
			paramTag.push($(this).text());
		})
		let paramIntroImage 	= $("#introImage")[0].files[0];
		let paramIntroVideo 	= '';
		if ($("#introVideo").length > 0)
			paramIntroVideo 	= $("#introVideo")[0].files[0];
		let paramExample		= $("#exampleFile")[0].files[0];
		let paramExampleVideo 	= '';
		if ($("#exampleVideo").length > 0)
			paramExampleVideo	= $("#exampleVideo")[0].files[0];
		let paramExampleVoice	= '';
		if ($('input:radio[name=radio-example-type]:checked').val() === 'voice')
			paramExampleVoice	= $("#exampleFile")[0].files[0];
		let formData  = new FormData();
		formData.append('doit-title', doitTitle.val().trim());
		formData.append('company-uuid', bizUuid);
		formData.append('promotion-uuid', selPromo.val().trim());
		formData.append('reward-uuid', selReward.val().trim());
		formData.append('min-user', g_min_user_limit);
		formData.append('max-user', g_max_user_limit);
		formData.append('doit-tags', paramTag.toString());
		formData.append('intro-resource-type', $('input:radio[name=radio-intro-type]:checked').val());
		formData.append('intro-image-file', paramIntroImage);
		formData.append('intro-video-file', paramIntroVideo);
		formData.append('action-start-date', doitFrom.val());
		formData.append('action-end-date', doitTo.val());
		formData.append('action-allow-start-time', startTime.val()+':00');
		formData.append('action-allow-end-time', endTime.val()+':59');
		formData.append('private-code', privateCode.val().trim());
		formData.append('action-example-resource-type', $('input:radio[name=radio-example-type]:checked').val());
		formData.append('action-example-image-file', paramExample);
		formData.append('action-example-video-file', paramExampleVideo);
		formData.append('action-example-voice-file', paramExampleVoice);
		formData.append('action-description', exampleDesc.val().trim());
		formData.append('doit-description', doitDesc.val().trim());
		if ($("#chkExtraReward").is(':checked'))
		{
			formData.append('group-reward-description', $("#ucd-area").val().trim())
		}

		return formData;
	}

	function onSubmitUpdateDoit()
	{
		if (validation())
		{
			if (confirm(message.modify))
			{
				$.ajax({
					url: api.updateDoit,
					type: "POST",
					headers: headers,
					processData: false,
					contentType: false,
					dataType: 'json',
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listDoit
					},
					error: function (request, status) {
						alert(label.modify+message.ajaxError);
					}
				});
			}
		}
	}