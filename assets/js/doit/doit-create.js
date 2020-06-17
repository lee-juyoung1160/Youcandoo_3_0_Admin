
	const doitTitle			= $("#doitTitle");
	const doitDesc 			= $("#doitDesc");
	const inputTag			= $("#inputTag");
	const btnAddTag			= $("#btnAddTag");
	const addedTags			= $("#addedTags");
	const introFileType 	= $("input[name=radio-intro-type]");
	const introFileArea		= $("#introFileArea");
	const bizName 			= $("#bizName");
	const selPromo 			= $("#selPromo");
	const selReward 		= $("#selReward");
	const labelSelPromo 	= $("label[for='selPromo']");
	const selectedReward    = $("#selectedReward")
	const labelSelReward 	= $("label[for='selReward']");
	const minAvailable 		= $("#minAvailable");
	const maxAvailable 		= $("#maxAvailable");
	/*const recruit 			= $("#recruit");*/
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
	const modalCloseBtn 	= $(".close-btn");
	const modalLayout 		= $(".modal-layout");
	const modalContent 		= $(".modal-content");
	const dataTable		= $("#dataTable");
	const modalBizName	= $("#modalBizName");

	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initInputDatepicker();
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 소개 파일 영역 초기화 **/
		onChangeIntroType(introFileType.eq(0));
		/** 인증예시 파일 영역 초기화 **/
		onChangeExampleType(exampleType.eq(0));
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		modalBizName	.on('keyup', function () { getBiz(); });
		btnAddTag		.on('click', function () { onClickAddTag(); });
		introFileType	.on('change', function () { onChangeIntroType(this); });
		bizName			.on('click', function () { onClickBizName(); });
		selPromo		.on('change', function () { onChangeSelPromo(); });
		selReward		.on('change', function () { onChangeSelReward(); });
		chkExtraReward	.on('change', function () { toggleActive(ucdAreWrap); });
		chkAccessUser	.on('change', function () { toggleActive($(".code-wrap")); });
		exampleType		.on('change', function () { onChangeExampleType(this); });
		doitFrom		.on('change', function () { onChangeDateFrom(); });
		btnSubmit		.on('click', function () { onSubmitDoit(); });
	});

	/** 인증기간 종료일 자동 세팅 **/
	function onChangeDateFrom()
	{
		let doitFromDate = doitFrom.datepicker("getDate");
		let duration = g_duration;

		if (isEmpty(duration))
		{
			alert("리워드 조건을 "+message.select);
			doitFrom.val('');
			return;
		}

		doitFromDate.setDate(doitFromDate.getDate() + (Number(duration) - 1));
		let doitToDate = getStringFormatToDate(doitFromDate, '-');

		doitTo.val(doitToDate);
	}

	function initComponent()
	{
		doitTitle.focus();
		doitTitle.val('');
		bizName.val('');
		buildOptionPromo();
		buildOptionReward();
		/*recruit.val('');*/
		inputTag.val('');
		introFileType.eq(0).prop('checked', true);
		onChangeIntroType(introFileType);
		doitTo.datepicker('option', 'disabled', true);
		exampleType.eq(0).prop('checked', true);
		openYn.eq(0).prop('checked', true);
	}

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
				checkInputLength(inputTag);
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

	function toggleActive(obj)
	{
		$(obj).toggleClass('active');
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
				url: api.getBizName,
				type:"POST",
				headers: headers,
				dataSrc: "",
				global: false,
				data: function (d) {
					return JSON.stringify({"keyword" : modalBizName.val()});
				},
				error: function (request, status) {
					alert(label.list+message.ajaxLoadError);
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
		selectedReward.empty();
		getInvolvePromo();
		buildOptionReward();
		modalFadeout();
	}

	function initModal()
	{
		modalBizName.val('');
		modalBizName.focus();
	}

	function getInvolvePromo()
	{
		$.ajax({
			url: api.involvePromotion,
			type: "POST",
			async: false,
			global: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"company_uuid" : bizUuid}),
			success: function(data) {
					buildOptionPromo(data);
			},
			error: function (request, status) {
				alert('프로모션 '+label.list+message.ajaxLoadError);
			}
		});
	}

	function buildOptionPromo(data)
	{
		labelSelPromo.text('프로모션 선택');
		let optionPromoDom = '<option value="">프로모션 선택</option>';
		if (!isEmpty(data) && !isEmpty(data.data) && isSuccessResp(data))
		{
			let details = data.data;
			let dataLen = details.length;

			if (dataLen > 0)
			{
				for (let i=0; i<dataLen; i++)
				{
					let uuid  = details[i].promotion_uuid;
					let title = details[i].promotion_title;

					optionPromoDom += '<option value="'+ uuid +'">'+ title +'</option>';
				}
			}
		}
		selPromo.html(optionPromoDom);
	}

	function onChangeSelPromo()
	{
		selectedReward.empty();
		$.ajax({
			url: api.involveReward,
			type: "POST",
			async: false,
			global: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"promotion_uuid" : selPromo.val()}),
			success: function(data) {
				buildOptionReward(data);
			},
			error: function (request, status) {
				alert('리워드 '+label.list+message.ajaxLoadError);
			}
		});
	}

	function buildOptionReward(data)
	{
		labelSelReward.text('리워드 조건 생성 목록 선택');
		let optionRewardDom = '<option value="">리워드 조건 생성 목록 선택</option>';
		if (!isEmpty(data) && !isEmpty(data.data) && isSuccessResp(data))
		{
			let details = data.data;
			let dataLen = details.length;

			if (dataLen > 0)
			{
				for (let i=0; i<dataLen; i++)
				{
					let uuid  = details[i].reward_uuid;
					let title = details[i].title;

					optionRewardDom += '<option value="'+ uuid +'">'+ title +'</option>';
				}
			}
		}
		selReward.html(optionRewardDom);
	}

	function onChangeSelReward()
	{
		selectedReward.empty();
		$.ajax({
			url: api.getReward,
			type: "POST",
			async: false,
			global: false,
			headers: headers,
			dataType: 'json',
			data: JSON.stringify({"reward_uuid" : selReward.val()}),
			success: function(data) {
					buildSelectedReward(data);
			},
			error: function (request, status) {
				alert('리워드 '+label.detailContent+message.ajaxLoadError);
			}
		});
	}

	let g_min_user_limit;
	let g_max_user_limit;
	let g_duration;
	function buildSelectedReward(data)
	{
		let selectedRewardDom = '';
		if (!isEmpty(data) && !isEmpty(data.data) && isSuccessResp(data))
		{
			let detail = data.data;

			if (detail.remain_budget_ucd < 1)
			{
				alert(message.notEnoughBudget);
				getInvolvePromo();
				buildOptionReward();
				return;
			}

			g_duration = detail.action_duration;

			/** 프로모션 종료일로 두잇 인증기간 시작일 최대 값 세팅 **/
			doitFrom.datepicker("option", "maxDate", new Date(detail.end_date));

			selectedRewardDom += '<li class="reward-type clearfix">';
			selectedRewardDom += 	'<p class="sub-title"><i class="far fa-check-square" style="color:#007aff; "></i> 선택하신  프로모션 관련 리워드 조건입니다.</p>';
			selectedRewardDom += 	'<div class="fixed">';
			selectedRewardDom += 		'<p class="cap"><span>인증기간 : </span><span id="duration">'+detail.action_duration+'일</span></p>';
			selectedRewardDom += 	'</div>';
			selectedRewardDom += 	'<div class="fixed">';
			selectedRewardDom += 		'<p class="cap"><span>모집인원 : </span>'+detail.min_user_limit+' ~ '+detail.max_user_limit+'명</p>';
			selectedRewardDom += 	'</div>';
			selectedRewardDom += 	'<div class="fixed">';
			selectedRewardDom += 		'<p class="cap"><span>하루인증횟수 : </span>'+detail.action_daily_allow+'회</p>';
			selectedRewardDom += 	'</div>';
			selectedRewardDom += 	'<div class="fixed">';
			selectedRewardDom += 		'<p class="cap"><span>목표달성률 : </span>'+detail.goal_percent+'%</p>';
			selectedRewardDom += 	'</div>';
			selectedRewardDom += 	'<div class="fixed">';
			selectedRewardDom += 		'<p class="cap"><span>리워드 유형 : </span>개인 '+ detail.person_percent +'% : 단체 '+detail.group_percent +'%</p>';
			selectedRewardDom += 	'</div>';
			selectedRewardDom += 	'<div class="fixed">';
			selectedRewardDom += 		'<p class="cap"><span>1인당 최대 UCD : </span>'+ numberWithCommas(detail.total_reward) +' UCD</p>';
			selectedRewardDom += 	'</div>';
			selectedRewardDom += 	'<div class="fixed">';
			selectedRewardDom += 		'<p class="cap"><span>주간빈도 : </span>'+ detail.action_dayofweek +'</p>';
			selectedRewardDom += 	'</div>';
			selectedRewardDom += 	'<p class="sub-title"><i class="fas fa-coins" style="color:#007aff; "></i> 잔여 프로모션 예산</p>';
			selectedRewardDom += 	'<div class="fixed">';
			selectedRewardDom += 		'<p class="cap">현재까지 남은 잔여 UCD는 ';
			selectedRewardDom += 			'<span style="font-size: 19px; font-weight: 600; color: #007aff;">'+numberWithCommas(detail.remain_budget_ucd)+' UCD</span> 입니다.';
			selectedRewardDom += 		'</p>';
			selectedRewardDom += 	'</div>';
			selectedRewardDom += '</li>';

			selectedReward.html(selectedRewardDom);

			/** 모집인원 가이드(프로모션에서 설정한 최대 못집인원을 표출시켜 줌) **/
			minAvailable.html(detail.min_user_limit);
			maxAvailable.html(detail.max_user_limit);
			g_min_user_limit = detail.min_user_limit;
			g_max_user_limit = detail.max_user_limit;
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

		if (chkExtraReward.is(':checked') && isEmpty(extraReward.val()))
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

		if (chkAccessUser.is(':checked') && privateCode.val().trim().length !== 4)
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
		/*let extraRewardValue = '';
		if (chkExtraReward.is(':checked'))
			extraRewardValue = extraReward.val().trim();
		formData.append('group-reward-description', extraRewardValue);*/
		if (chkExtraReward.is(':checked'))
			formData.append('group-reward-description', extraReward.val().trim());

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
					dataType: 'json',
					data: params(),
					success: function(data) {
						alert(getStatusMessage(data));
						if (isSuccessResp(data))
							location.href = page.listDoit
					},
					error: function (request, status) {
						alert(label.submit+message.ajaxError);
					}
				});
			}
		}
	}