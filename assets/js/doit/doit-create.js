
	const doitTitle			= $("#doitTitle");
	const bizName 			= $("#bizName");
	const selPromo 			= $("#selPromo");
	const selReward 		= $("#selReward");
	const btnPromoInfo 		= $("#btnPromoInfo");
	const selectedRewardArea    = $("#selectedRewardArea")
	const maxUser 			= $("#maxUser");
	const chkExtraReward	= $("input[name=chkExtraReward]");
	const extraReward		= $("#ucd-area");
	const inputTag			= $("#inputTag");
	const addTag			= $("#addTag");
	const tagList			= $("#tagList");
	const introFileType 	= $("input[name=radio-intro-type]");
	const introFileArea		= $("#introFileArea");
	const doitFrom	    	= $("#doitFrom");
	const doitTo	    	= $("#doitTo");
	const startTime	    	= $("#startTime");
	const endTime	    	= $("#endTime");
	const chkAccessUser 	= $("input[name=chkAccessUser]");
	const privateCode 		= $("#privateCode");
	const exampleType 		= $("input[name=radio-example-type]");
	const exampleDesc 		= $("#exampleDesc");
	const doitDesc 			= $("#doitDesc");
	const exampleArea 		= $("#exampleArea");
	const labelSelPromo 	= $("label[for='selPromo']");
	const labelSelReward 	= $("label[for='selReward']");
	const btnSubmit			= $("#btnSubmit");

	/** modal **/
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");

	$(document).ready(function () {
		introFileType	.on('change', function () { onChangeIntroType(this); });
		btnPromoInfo	.on('click', function () { onClickBtnPromoInfo(); });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		addTag			.on('click', function () { onClickAddTag(); });
		bizName			.on('keyup', function () { onKeyupBizName(); });
		selPromo		.on('change', function () { onChangeSelPromo(); });
		selReward		.on('change', function () { onChangeSelReward(); });
		chkExtraReward	.on('change', function () { toggleActive(extraReward); });
		chkAccessUser	.on('change', function () { toggleActive($(".code-wrap")); });
		exampleType		.on('change', function () { onChangeExampleType(this); });
		doitFrom		.on('change', function () { onChangeDateFrom(); });
		btnSubmit		.on('click', function () { onSubmitDoit(); });

		initInputDatepicker();
		initComponent();
		onChangeIntroType(introFileType.eq(0));
		onChangeExampleType(exampleType.eq(0));
	});

	function onClickBtnPromoInfo()
	{
		if (isEmpty(selPromo.val()))
		{
			alert('프로모션을 '+message.select);
			return;
		}
		else
		{
			modalFadein();

			$.ajax({
				url: api.detailPromotion,
				type: "POST",
				headers: headers,
				data: JSON.stringify({"promotion_idx" : "29"}),
				success: function(data) {
					if (isSuccessResp(data))
						buildPromoInfo(data);
					else
						alert(invalidResp(data));
				},
				error: function (request, status) {
					console.log(status);
				}
			});
		}
	}

	function buildPromoInfo(data)
	{

	}

	/** 인증기간 종료일 자동 세팅 **/
	function onChangeDateFrom()
	{
		let doitFromDate = new Date(doitFrom.datepicker("getDate"));
		let duration = $("#duration").text();
		let doitDateTo;

		if (isEmpty(duration))
		{
			alert("두잇 유형을 "+message.select);
			doitFrom.val('');
			bizName.focus();
			return;
		}

		doitFromDate.setDate(doitFromDate.getDate() + Number(duration));
		doitDateTo = stringFormatToDate(doitFromDate, '-');

		doitTo.val(doitDateTo);
	}

	function initComponent()
	{
		doitTitle.focus();
		doitTitle.val('');
		bizName.val('');
		selPromo.find('option').eq(0).prop('selected', true);
		selReward.find('option').eq(0).prop('selected', true);
		maxUser.val('');
		inputTag.val('');
		introFileType.eq(0).prop('checked', true);
		onChangeIntroType(introFileType);
		doitTo.datepicker('option', 'disabled', true);
		exampleType.eq(0).prop('checked', true);
	}

	function initModal()
	{

	}

	function onClickAddTag()
	{
		if (addTagValidation())
		{
			let tagDom = '';
			tagDom += '<li>';
			tagDom += 	'#<span class="tag-name">'+inputTag.val()+'</span>';
			tagDom += 	'<i class="delete-btn far fa-times-circle" onclick="removeTagDom(this);"></i>';
			tagDom += '</li>';

			tagList.append(tagDom);
		}
	}

	function addTagValidation()
	{
		let tagLen = tagList.find('li').length;

		if (isEmpty(inputTag.val()))
		{
			alert('태그를 '+message.input);
			inputTag.focus();
			return false;
		}

		if (tagLen > 5)
		{
			alert('태그는 '+message.maxTag);
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
		let tagLen 				= tagList.find('li').length;
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

		if (isEmpty(tagLen < 1))
		{
			alert('태그를 ' + message.needMore);
			return false;
		}

		if (introImageFile.length === 0)
		{
			alert('두잇 소개 이미지는 ' + message.required);
			return false;
		}

		if ($('input:radio[name=radio-doit-type]:checked').val() === 'video' && introVideoFile.length === 0)
		{
			alert('두잇 소개 영상은 ' + message.required);
			return false;
		}

		if (isEmpty(bizName.val()))
		{
			alert('기업명은 ' + message.required);
			bizName.focus();
			return false;
		}

		if (isEmpty(selPromo.val()))
		{
			alert('프로모션은 ' + message.required);
			selPromo.focus();
			return false;
		}

		if (isEmpty(selReward.val()))
		{
			alert('리워드 조건은 ' + message.required);
			selReward.focus();
			return false;
		}

		if (isEmpty(maxUser.val()))
		{
			alert('최대모집인원은 ' + message.required);
			maxUser.focus();
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

		if ($("input[name=chkAccessUser]").is(':checked') && isEmpty(privateCode.val()))
		{
			alert('참가코드는 '+message.required);
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
		tagList.find('li').each(function () {
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
		formData.append('max-user', maxUser.val().trim());
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

		return formData;
	}

	function onSubmitDoit()
	{
		if (validation())
		{
			if (confirm(message.create))
			{
				$.ajax({
					url: api.createDoit,
					type: "POST",
					headers: headers,
					processData: false,
					contentType: false,
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = '/doit/lists'
					},
					error: function (request, status) {
						console.log(status);
					}
				});
			}
		}
	}

	function toggleActive(obj)
	{
		$(obj).toggleClass('active');
	}

	let bizUuid;
	function onKeyupBizName()
	{
		buildOptionPromo();
		buildOptionReward();
		buildSelectedReward();
		autoCompleteBizName();
	}

	function autoCompleteBizName()
	{
		bizName.autocomplete({
			source: function (request, response) {
				$.ajax({
					url: api.listBizName,
					type: "POST",
					async: false,
					headers: headers,
					data: JSON.stringify({"keyword" : bizName.val()}),
					success: function(data) {
						response($.map(JSON.parse(data), function(item) {
							return {
								label: item.value,
								value: item.value,
								key: item.key
							}
						}));
					},
					error: function (xhr, status, error) {
						console.log(error)
					}
				});
			},
			focus: function( event, ui ) {
				console.log(ui.item)
				event.preventDefault();
				return false;
			},
			select: function( event, ui ) {
				bizUuid = ui.item.key;
				getInvolvePromo();
			},
			matchContains: true,
			autoFocus: true,
			delay: 300,
			minLength: 1
		});
	}

	function getInvolvePromo()
	{
		$.ajax({
			url: api.involvePromotion,
			type: "POST",
			async: false,
			headers: headers,
			data: JSON.stringify({"company_uuid" : bizUuid}),
			success: function(data) {
					buildOptionPromo(data);
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildOptionPromo(data)
	{
		labelSelPromo.text('프로모션 선택');
		let optionPromoDom = '<option value="">프로모션 선택</option>';
		if (!isEmpty(data) && isSuccessResp(data))
		{
			let jsonData = JSON.parse(data);
			let respData = jsonData.data;
			let dataLen  = respData.length;

			if (dataLen > 0)
			{
				for (let i=0; i<dataLen; i++)
				{
					let uuid  = respData[i].promotion_uuid;
					let title = respData[i].promotion_title;

					optionPromoDom += '<option value="'+ uuid +'">'+ title +'</option>';
				}
			}
		}
		selPromo.html(optionPromoDom);
	}

	function onChangeSelPromo()
	{
		buildSelectedReward();
		$.ajax({
			url: api.involveReward,
			type: "POST",
			async: false,
			headers: headers,
			data: JSON.stringify({"promotion_uuid" : selPromo.val()}),
			success: function(data) {
				buildOptionReward(data);
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildOptionReward(data)
	{
		labelSelReward.text('리워드 조건 생성 목록 선택');
		let optionRewardDom = '<option value="">리워드 조건 생성 목록 선택</option>';
		if (!isEmpty(data) && isSuccessResp(data))
		{
			let jsonData = JSON.parse(data);
			let respData = jsonData.data;
			let dataLen  = respData.length;

			if (dataLen > 0)
			{
				for (let i=0; i<dataLen; i++)
				{
					let uuid  = respData[i].reward_uuid;
					let title = respData[i].title;
					optionRewardDom += '<option value="'+ uuid +'">'+ title +'</option>';
				}
			}
		}
		selReward.html(optionRewardDom);
	}

	function onChangeSelReward()
	{
		$.ajax({
			url: api.selectReward,
			type: "POST",
			async: false,
			headers: headers,
			data: JSON.stringify({"reward_uuid" : selReward.val()}),
			success: function(data) {
					buildSelectedReward(data);
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildSelectedReward(data)
	{
		selectedRewardArea.hide();
		let selectedRewardDom = '';
		if (!isEmpty(data) && isSuccessResp(data))
		{
			let jsonData = JSON.parse(data);
			let respData = jsonData.data;
			selectedRewardDom += '<li class="reward-type clearfix">';
			selectedRewardDom += '<p class="sub-title"><i class="far fa-check-square" style="color:#007aff; "></i> 선택하신  프로모션 관련 리워드 조건입니다.</p>';
			selectedRewardDom += '<div class="fixed">';
			selectedRewardDom += 	'<p class="cap"><span>인증기간 : </span><span id="duration">'+respData.action_duration+'</span></p>';
			selectedRewardDom += '</div>';
			selectedRewardDom += '<div class="fixed">';
			selectedRewardDom += 	'<p class="cap"><span>하루인증횟수 : </span>'+respData.action_daily_allow+'</p>';
			selectedRewardDom += '</div>';
			selectedRewardDom += '<div class="fixed">';
			selectedRewardDom += 	'<p class="cap"><span>목표달성률 : </span>'+respData.goal_percent+'</p>';
			selectedRewardDom += '</div>';
			selectedRewardDom += 	'<p class="cap"><span>리워드 유형 : </span>개인 '+ respData.person_percent +' : 단체 '+respData.group_percent +'</p>';
			selectedRewardDom += '</div>';
			selectedRewardDom += '<div class="fixed">';
			selectedRewardDom += 	'<p class="cap"><span>두잇당 최대 인원 : </span>'+ respData.max_user_limit +'명</p>';
			selectedRewardDom += '</div>';
			selectedRewardDom += '<div class="fixed">';
			selectedRewardDom += 	'<p class="cap"><span>1인당 최대 UCD : </span>'+ respData.total_reward +'</p>';
			selectedRewardDom += '</div>';
			selectedRewardDom += '</div>';
			selectedRewardDom += '<div class="fixed">';
			selectedRewardDom += 	'<p class="cap"><span>주간빈도 : </span>'+ respData.action_dayofweek +'</p>';
			selectedRewardDom += '</div>';
			selectedRewardDom += '<p class="sub-title"><i class="fas fa-coins" style="color:#007aff; "></i> 잔여 프로모션 예산</p>';
			selectedRewardDom += '<div class="fixed">';
			selectedRewardDom += 	'<p class="cap">현재까지 남은 잔여 UCD는 ';
			selectedRewardDom += 	'<span style="font-size: 19px; font-weight: 600; color: #007aff;">'+numberWithCommas(respData.remain_budget_ucd)+' UCD</span> 입니다.';
			selectedRewardDom += 	'</p>';
			selectedRewardDom += '</div>';
			selectedRewardDom += '</li>';

			selectedRewardArea.html(selectedRewardDom);
			selectedRewardArea.show();
		}
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
		introFileDom += 	'<input type="file" id="introImage" class="upload-hidden" onchange="onChangeFile(this)">';
		introFileDom += '</div>';
		if (introType === 'video')
		{
			introFileDom += '<div class="filebox preview-image">';
			introFileDom += 	'<p class="cap">영상</p>';
			introFileDom += 	'<input class="upload-name" value="파일선택" disabled="disabled" >';
			introFileDom += 	'<label for="introVideo">업로드</label>';
			introFileDom += 	'<input type="file" id="introVideo" class="upload-hidden" onchange="onChangeFile(this)">';
			introFileDom += '</div>';
		}

		introFileArea.html(introFileDom);
	}

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
		fileDom += 	'<input type="file" id="exampleFile" class="upload-hidden" onchange="onChangeFile(this)">';
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
		fileDom += 		'<input type="file" id="exampleFile" class="upload-hidden" onchange="onChangeFile(this)">';
		fileDom += 	'</div>';
		fileDom += 	'<div class="filebox preview-image">';
		fileDom += 		'<p class="cap">영상</p>';
		fileDom += 		'<input class="upload-name" value="파일선택" disabled="disabled">';
		fileDom += 		'<label for="exampleVideo">업로드</label>';
		fileDom += 		'<input type="file" id="exampleVideo" class="upload-hidden" onchange="onChangeFile(this)">';
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
		fileDom += 	'<input type="file" id="exampleFile" class="upload-hidden" onchange="onChangeFile(this)">';
		fileDom += '</div>';

		exampleArea.html(fileDom);
	}