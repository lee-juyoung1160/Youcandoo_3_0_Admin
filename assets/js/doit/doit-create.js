
	const doitTitle		= $("#doitTitle");
	const bizName 		= $("#bizName");
	const selPromo 		= $("#selPromo");
	const selReward 	= $("#selReward");
	const btnPromoInfo 	= $("#btnPromoInfo");
	const selectedRewardArea    = $("#selectedRewardArea")
	const maxUser 		= $("#maxUser");
	const chkExtraReward		= $("input[name=chkExtraReward]");
	const extraReward	= $("#ucd-area");
	const inputTag		= $("#inputTag");
	const addTag		= $("#addTag");
	const tagList		= $("#tagList");
	const introFileType = $("input[name=radio-intro-type]");
	const introFileArea	= $("#introFileArea");
	const doitFrom	    = $("#doitFrom");
	const doitTo	    = $("#doitTo");
	const startTime	    = $("#startTime");
	const endTime	    = $("#endTime");
	const chkAccessUser = $("input[name=chkAccessUser]");
	const privateCode 	= $("#privateCode");
	const exampleType 	= $("input[name=radio-example-type]");
	const exampleDesc 	= $("#exampleDesc");
	const doitDesc 		= $("#doitDesc");
	const exampleArea 	= $("#exampleArea");
	const btnSubmit		= $("#btnSubmit");

	/** modal **/
	const modalReward		= $("#modalReward");
	const btnAddReward 		= $("#btnAddReward");
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const modalRwrdTitle 	= $('#modalRwrdTitle');
	const certCount  		= $('#certCount');
	const goalRate  		= $('#goalRate');
	const maxUcd  		 	= $('#maxUcd');
	const individualRate  	= $('#individualRate');
	const groupRate  		= $('#groupRate');


	$(document).ready(function () {

		introFileType	.on('change', function () { onChangeIntroType(this); });
		btnPromoInfo	.on('click', function () { modalFadein(); });
		modalCloseBtn	.on('click', function () { modalFadein(); });
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
		initTimepicker();
		initComponent();
		onChangeExampleType(exampleType.eq(0));
	});

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
		console.log(doitDateTo)
		doitTo.val(doitDateTo);
	}

	function initTimepicker()
	{
		startTime.timepicker({
			timeFormat: 'HH:mm',
			interval: 1,
			dropdown: true,
			scrollbar: true,
			defaultTime: '00:00'
		});

		endTime.timepicker({
			timeFormat: 'HH:mm',
			interval: 1,
			dropdown: true,
			scrollbar: true,
			defaultTime: '23:59'
		});
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
		modalRwrdTitle.val('');
		doitFrom.val('');
		doitTo.val('');
		certCount.val('');
		goalRate.val('');
		maxUcd.val('');
		individualRate.val('');
		groupRate.val('');
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
		let tagLen = tagList.find('li').length;
		let introImageFile		= $("#introImage")[0].files;
		let introVideoFile;
		if ($("#introVideo").length > 0)
			introVideoFile		= $("#introVideo")[0].files;
		let example				= $("#exampleFile")[0].files;
		let exampleVideoFile;
		if ($("#exampleVideo").length > 0)
			exampleVideoFile	= $("#exampleVideo")[0].files;

		if (isEmpty(doitTitle.val()))
		{
			alert('두잇명은 ' + message.required);
			doitTitle.focus();
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
console.log(doitFrom)
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

		if (isEmpty(doitDesc.val()))
		{
			alert('소개글은 '+message.required);
			doitDesc.focus();
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
		formData.append('doit-title', doitTitle.val());
		formData.append('company-uuid', "COM-79C9A1F7-FB63-F2E3-3317-A70A01A99B03");
		formData.append('promotion-uuid', "PRO-5F3D9D6F-CC51-BEA1-808F-08FDEC3CC54D");
		formData.append('reward-uuid', "RWD-B5AF1890-F09F-DBDD-66CF-6BDFBEE59F7B");
		formData.append('max-user', maxUser.val());
		formData.append('doit-tags', paramTag.toString());
		formData.append('intro-resource-type', $('input:radio[name=radio-intro-type]:checked').val());
		formData.append('intro-image-file', paramIntroImage);
		formData.append('intro-video-file', paramIntroVideo);
		formData.append('action-start-date', doitFrom.val());
		formData.append('action-end-date', doitTo.val());
		formData.append('action-allow-start-time', startTime.val());
		formData.append('action-allow-end-time', endTime.val());
		formData.append('private-code', privateCode.val());
		formData.append('action-example-resource-type', $('input:radio[name=radio-example-type]:checked').val());
		formData.append('action-example-image-file', paramExample);
		formData.append('action-example-video-file', paramExampleVideo);
		formData.append('action-example-voice-file', paramExampleVoice);
		formData.append('action-description', exampleDesc.val());
		formData.append('doit-description', doitDesc.val());

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
						console.log(data);
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
		console.log(bizName.val())
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
				return false;
			},
			select: function( event, ui ) {
				bizUuid = ui.item.key;
				getInvolvePromo();
			},
			matchContains: true,
			delay: 300,
			minLength: 2
		});
	}

	function getInvolvePromo()
	{
		console.log(bizUuid);
		$.ajax({
			url: api.involvePromotion,
			type: "POST",
			async: false,
			headers: headers,
			data: JSON.stringify({"company_uuid" : bizUuid}),
			success: function(data) {
				console.log("onChangeBizName");
				console.log(data);
				selPromo.empty();
				if (isSuccessResp(data))
				{
					selPromo.find('option').eq(0).prop('selected', true);
					selReward.find('option').eq(0).prop('selected', true);
					selPromo.empty();
					selReward.empty();
					selectedRewardArea.empty();
					buildOptionPromo(data);
				}
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildOptionPromo(data)
	{
		let jsonData = JSON.parse(data);
		let respData = jsonData.data;
		let dataLen  = respData.length;
		let optionPromoDom = '<option value="">프로모션 선택</option>';

		if (dataLen > 0)
		{
			for (let i=0; i<dataLen; i++)
			{
				let uuid  = respData[i].promotion_uuid;
				let title = respData[i].promotion_title;
				optionPromoDom += '<option value="'+ uuid +'">'+ title +'</option>';
			}
		}

		selPromo.html(optionPromoDom);
	}

	function onChangeSelPromo()
	{
		console.log("promotion_uuid : " + selPromo.val());
		onChangeSelectOption(selPromo);
		$.ajax({
			url: api.involveReward,
			type: "POST",
			async: false,
			headers: headers,
			data: JSON.stringify({"promotion_uuid" : selPromo.val()}),
			success: function(data) {
				console.log(data);
				if (isSuccessResp(data))
				{
					selReward.empty();
					buildOptionReward(data);
				}
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildOptionReward(data)
	{
		let jsonData = JSON.parse(data);
		let respData = jsonData.data;
		let dataLen  = respData.length;
		let optionRewardDom = '<option value="">리워드 조건 생성 목록 선택</option>';

		if (dataLen > 0)
		{
			for (let i=0; i<dataLen; i++)
			{
				let uuid  = respData[i].reward_uuid;
				let title = respData[i].title;
				optionRewardDom += '<option value="'+ uuid +'">'+ title +'</option>';
			}
		}

		selReward.html(optionRewardDom);
	}

	function onChangeSelReward()
	{
		console.log("reward_uuid : " + selReward.val());
		onChangeSelectOption(selPromo);
		$.ajax({
			url: api.selectReward,
			type: "POST",
			async: false,
			headers: headers,
			data: JSON.stringify({"reward_uuid" : selReward.val()}),
			success: function(data) {
				console.log(data);
				if (isSuccessResp(data))
				{
					selectedRewardArea.empty();
					buildSelectedReward(data);
				}
			},
			error: function (request, status) {
				console.log(status);
			}
		});
	}

	function buildSelectedReward(data)
	{
		let jsonData = JSON.parse(data);
		let respData = jsonData.data;
		let selectedRewardDom = '';
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
		selectedRewardDom += 	'<p class="cap"><span>1인당 최대 UCD : </span>'+ respData.total_reward +'</p>';
		selectedRewardDom += '</div>';
		selectedRewardDom += '</div>';
		selectedRewardDom += '<div class="fixed">';
		selectedRewardDom += 	'<p class="cap"><span>주간빈도 : </span>'+ respData.action_dayofweek +'</p>';
		selectedRewardDom += '</div>';

		selectedRewardArea.html(selectedRewardDom);
	}

	/** 소개 이미지/영상 라디오 선탵할 때 파일 업로드 컴포넌트 생성 **/
	function onChangeIntroType(obj)
	{
		let introType = $(obj).val();
		let introText = $("label[for='"+obj.id+"']").text();
		let introFileDom = '';
		introFileDom += '<p class="cap important">두잇 소개 방법 중 <span>'+introText+'</span>를(을) 선택하셨습니다. <span>영상</span> 및 썸네일을 업로드 해주세요!</p>'
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
		fileDom += 	'<p class="cap">썸네일 (* 이미지 사이즈: 650 x 650)</p>';
		fileDom += 	'<input class="upload-name" value="파일선택" disabled="disabled" >';
		fileDom += 	'<label for="exampleFile">업로드</label>';
		fileDom += 	'<input type="file" id="exampleFile" class="upload-hidden" onchange="onChangeFile(this)">';
		fileDom += '</div>';

		exampleArea.html(fileDom);
	}