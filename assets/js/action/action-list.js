
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const searchType 	= $("#search_type");
	const keyword		= $("#keyword");
	const status		= $("input[name=chk-status]");
	const report		= $("input[name=radio-report]");
	const selPageLength = $("#selPageLength");
	const select		= $("select");
	const actionTopDom	= $("#actionTopDom");
	const dataNum		= $(".data-num");
	const actionWrap	= $("#actionWrap");
	const pagination	= $("#dataTable_paginate");
	const btnWarnRed	= $(".warning-btn");
	const btnWarnYellow	= $(".yellow-btn");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const causeBy		= $("#selCauseBy");
	const btnSubmitWarn	= $("#btnSubmitWarn");

	let g_warn_type;
	$(document).ready(function () {
		/** 데이트피커 초기화 **/
		initSearchDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		getActions();
		/** 이벤트 **/
		$("body")    	.on("keydown", function (event) { onKeydownSearchActions(event); });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		status			.on("click", function () { onChangeChkStatus(this); });
		selPageLength	.on("change", function () { getActions(); });
		dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
		btnWarnYellow	.on('click', function () { onClickBtnWarn(); g_warn_type = 'Y'; });
		btnWarnRed		.on('click', function () { onClickBtnWarn(); g_warn_type = 'R'; });
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		btnSubmitWarn	.on('click', function () { onSubmitWarn(); });
	});

	function initSearchForm()
	{
		keyword.val('');
		status.prop("checked", true);
		report.eq(0).prop("checked", true);
		select.each(function () {
			$(this).children().eq(0).prop("selected", true);
			onChangeSelectOption($(this));
		});

		/** 검색범위 초기화 **/
		onClickActiveAloneDayBtn($(".btn_week"));
	}

	function initModal()
	{
		causeBy.children().eq(0).prop("selected", true);
		onChangeSelectOption(causeBy);
	}

	function onClickBtnWarn()
	{
		if (isCheckedTarget())
			modalFadein();
	}

	function isCheckedTarget()
	{
		let count = $("input[name=chk-warn]:checked").length;
		if (count === 0)
		{
			alert('발송대상을 '+message.select);
			return false;
		}

		return true;
	}

	function onSubmitWarn()
	{
		let url  = g_warn_type === 'Y' ? api.setYellow : api.setRed;

		if (confirm('경고장을 '+message.send))
		{
			$.ajax({
				url: url,
				type: "POST",
				async: false,
				headers: headers,
				dataType: 'json',
				data: warnParams(),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
					{
						modalFadeout();
						getActions();
					}
					else
						alert(invalidResp(data));
				},
				error: function (request, status) {
					alert(label.submit+message.ajaxError);
				},
			});
		}
	}

	function warnParams()
	{
		let uuids = [];
		$("input[name=chk-warn]").each(function () {
			if ($(this).is(":checked"))
				uuids.push($(this).val());
		})

		let param = {
			"action_list" : uuids
			,"description" : causeBy.val()
		}

		return JSON.stringify(param);
	}

	function cancelWarn(type, uuid)
	{
		let url = type === 'Y' ? api.cancelYellow : api.cancelRed;
		let param = {
			"action_uuid" : uuid
		}

		if (confirm('경고장 발송을 '+message.cancel))
		{
			$.ajax({
				url: url,
				type: "POST",
				headers: headers,
				dataType: 'json',
				data: JSON.stringify(param),
				success: function(data) {
					alert(getStatusMessage(data));
					if (isSuccessResp(data))
						getActions();
				},
				error: function (request, status) {
					alert(label.cancel+message.ajaxError);
				}
			});
		}
	}

	function onKeydownSearchActions(event)
	{
		if (event.keyCode === 13)
			getActions();
	}

	function onChangeChkStatus(obj)
	{
		let checkedCount = $("input[name=chk-status]:checked").length;
		if (checkedCount === 0)
		{
			alert(message.minimumChecked);
			$(obj).prop("checked", true);
		}
	}

	function params()
	{
		let statusParam = [];
		status.each(function () {
			if ($(this).is(':checked'))
				statusParam.push($(this).val())
		});

		let param = {
			"limit" : selPageLength.val()
			,"page" : currentPage
			,"from_date" : dateFrom.val()
			,"to_date" : dateTo.val()
			,"search_type" : searchType.val()
			,"keyword" : keyword.val()
			,"status" : statusParam
			,"is_report" : $('input[name=radio-report]:checked').val()
		}

		return JSON.stringify(param);
	}

	function getActions()
	{
		$.ajax({
			url: api.listAction,
			type: "POST",
			headers: headers,
			dataType: 'json',
			data: params(),
			success: function(data) {
				if (isSuccessResp(data))
				{
					buildPagination(data);
					buildList(data);
				}
				else
					alert(invalidResp(data));
			},
			error: function (request, status) {
				alert(label.list+message.ajaxLoadError);
			}
		});
	}

	function buildList(data)
	{
		let actions    = data.data;
		let dataLen    = actions.length;
		let totalCount = data.recordsTotal
		let actionDom  = '<p class="empty-message">인증 정보가 없습니다.</p>';

		/** total count **/
		dataNum.html(totalCount);

		if (totalCount > 0)
		{
			actionTopDom.show();
			actionDom = '';
			for (let i=0; i<dataLen; i++)
			{
				let action    = actions[i];
				let actionId  = "action_"+i;
				let successYn = action.success === 'Y' ? '성공' : '실패';
				let resourceType = action.resource_type;
				let warnDesc = '';
				let warnImage = '';
				let actionImage = '<img class="detail-img" src="'+action.url+'" alt="인증 이미지입니다.">';
				if (isEmpty(action.url))
					actionImage = '<img class="detail-img" src="/assets/images/no-image.jpg" alt="인증 이미지입니다.">';
				if (resourceType === 'voice')
					actionImage = '<img class="detail-img" src="/assets/images/voice.jpg" alt="인증 이미지입니다.">';
				let button = '<button onclick="modalFadein();" class="warning-btn" type="button" data-uuid="'+action.action_uuid+'">경고장</button>';
				if (action.yellow_card === 'Y')
				{
					warnImage = '<img src="/assets/images/yellow-card.png" alt="">';
					warnDesc = action.yellow_card_description;
					button = '<button onclick="cancelWarn(\'Y\',\''+action.action_uuid+'\');" class="card-btn clear-yellow-btn" type="button">옐로카드 취소</button>';
				}
				if (action.red_card === 'Y')
				{
					warnImage = '<img src="/assets/images/red-card.png" alt="">';
					warnDesc = action.red_card_description;
					button = '<button onclick="cancelWarn(\'R\',\''+action.action_uuid+'\');" class="card-btn clear-red-btn" type="button">레드카드 취소</button>';
				}
				if (action.yellow_card === 'Y' && action.red_card === 'Y')
				{
					warnImage = '<img src="/assets/images/rad-yellow-card.png" alt="">';
					warnDesc = action.red_card_description;
					button = '<button onclick="cancelWarn(\'R\',\''+action.action_uuid+'\');" class="card-btn clear-red-btn" type="button">레드카드 취소</button>';
				}

				if (i===0 || i%5 === 0)
					actionDom += '<ul class="cert-contents clearfix">';

				actionDom += '<li>';
				actionDom += 	'<div class="top clearfix">';
				actionDom += 		'<div class="checkbox-wrap">';
				actionDom += 			'<input type="checkbox" id="'+actionId+'" name="chk-warn" value="'+action.action_uuid+'"/>';
				actionDom += 			'<label for="'+actionId+'"><span></span></label>';
				actionDom += 		'</div>';
				actionDom += 		'<span class="success-text">'+successYn+'</span>';
				actionDom += 		'<i class="warning-icon fas fa-exclamation-triangle">';
				actionDom +=        '<span>신고 : <span class="cert-data-num">'+action.report_count+'</span></span></i>';
				actionDom += 	'</div>';
				actionDom += 	'<div class="thumbnail-wrap">';
				if (action.yellow_card === 'Y' || action.red_card === 'Y')
				{
					actionDom += 	'<div class="error">';
					actionDom += 		'<p class="error-text">';
					actionDom += 			'<i>';
					actionDom += 				warnImage;
					actionDom += 			'</i>';
					actionDom += 				warnDesc;
					actionDom += 		'</p>';
					actionDom += 		'<div class="card-wrap">';
					actionDom += 			button;
					actionDom += 		'</div>';
					actionDom += 	'</div>';
				}
				actionDom += 		actionImage;
				actionDom += 	'</div>';
				actionDom += 	'<div class="text-wrap">';
				actionDom += 		'<p class="title">'+action.doit_title+'</p>';
				actionDom += 		'<a href="#">'+action.user_name+'</a>';
				actionDom += 		'<p class="date">'+action.action_datetime+'</p>';
				actionDom += 	'</div>';
				actionDom += '</li>';

				if (i>0 && (i+1)%5 === 0)
					actionDom += '</ul>';
			}
		}
		else actionTopDom.hide();

		actionWrap.html(actionDom);
	}

	let currentPage = 1;
	function buildPagination(data)
	{
		let totalCount  = data.recordsTotal;
		let last		= Math.ceil(totalCount / selPageLength.val());
		let pageLength  = 7;
		if (last <= 10)
			pageLength = last
		let i;

		let pageDom = '';
		if (currentPage === 1)
			pageDom += '<a class="paginate_button previous" id="dataTable_previous">';
		else
			pageDom += '<a onclick="onClickPageNum(this)" class="paginate_button previous" data-page="'+(currentPage-1)+'" id="dataTable_previous">';
		pageDom +=     label.previous;
		pageDom += '</a>';
		pageDom += '<span>';
		if (last <= 10)
		{
			for (i=1; i<=pageLength; i++)
			{
				if (last > 1 && currentPage === i)
					pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+i+'">'+i+'</a>';
				else
					pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
			}
		}
		else
		{
			for (i=1; i<=pageLength; i++)
			{
				if (currentPage < 5)
				{
					if (last > 1 && currentPage === i)
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+i+'">'+i+'</a>';
					else
					{
						if (pageLength === i)
						{
							pageDom += '<span class="ellipsis">…</span>';
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+last+'">'+last+'</a>';
						}
						else
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
					}
				}
				else if (currentPage >= 5 && currentPage <= last - 4)
				{
					if (i === 1)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
						pageDom += '<span class="ellipsis">…</span>';
					}

					if (currentPage === i)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="' + (i - 1) + '">' + (i - 1) + '</a>';
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="' + i + '">' + i + '</a>';
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="' + (i + 1) + '">' + (i + 1) + '</a>';
					}

					if (pageLength === i)
					{
						pageDom += '<span class="ellipsis">…</span>';
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+last+'">'+last+'</a>';
					}
				}
				else if (currentPage > last - 4)
				{
					if (i === 1)
					{
						pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+i+'">'+i+'</a>';
						pageDom += '<span class="ellipsis">…</span>';
					}

					if (i >= pageLength - 4)
					{
						if (currentPage === last-(pageLength-i))
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button current" data-page="'+(last-(pageLength-i))+'">'+(last-(pageLength-i))+'</a>';
						else
							pageDom += '<a onclick="onClickPageNum(this);" class="paginate_button" data-page="'+(last-(pageLength-i))+'">'+(last-(pageLength-i))+'</a>';
					}
				}
			}
		}
		pageDom += '</span>';
		if (last === currentPage)
			pageDom += '<a class="paginate_button next" id="dataTable_next">';
		else
			pageDom += '<a onclick="onClickPageNum(this)" class="paginate_button next" data-page="'+(currentPage+1)+'" id="dataTable_next">';
		pageDom += 	   label.next;
		pageDom += '</a>';

		pagination.html(pageDom);
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		currentPage = $(obj).data('page');

		getActions();
	}

	function onSubmitSearch()
	{
		getActions();
	}
