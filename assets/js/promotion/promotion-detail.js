
	const ulTab 		= $("#ulTab");
	const tabContent	= $(".tab-content");
	const goUpdate		= $("#goUpdate");

	/** 프로모션 탭 **/
	const bizName 		= $("#bizName");
	const promoName 	= $("#promoName");
	const budget 		= $("#budget");
	const balance 		= $("#balance");
	const period 		= $("#period");
	const promoNotice 	= $("#promoNotice");
	const allowCount	= $("#allowCount");
	const banner 		= $("#banner");
	const intro 		= $("#intro");
	const isExposure 	= $("#isExposure");
	const isGallery 	= $("#isGallery");
	const rewardTab     = $("#rewardTab");
	const rewardDetail  = $("#rewardDetail");

	/** 두잇탭 **/
	const doitTable			= $("#doitTable")
	const selPageLengthForDoit 	= $("#selPageLengthForDoit");

	/** Ucd정보탭 **/
	const ucdTable		= $("#ucdTable")
	const selPageLengthForUcd 	= $("#selPageLengthForUcd");

	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];

	$( () => {
		/** n개씩보기 셀렉트 박스 초기화 **/
		initPageLength(selPageLengthForDoit);
		initPageLength(selPageLengthForUcd);
		/** 프로모션 상세정보 **/
		getDetail();
		/** 이벤트 **/
		ulTab			.on("click", function (event) { onClickTab(event); });
		selPageLengthForDoit.on("change", function () { getInvolveDoit(); });
		selPageLengthForUcd	.on("change", function() { getUcdLog(); });
		goUpdate	.on('click', function () { goUpdatePage(); })
	});

	function onClickTab(e)
	{
		let clickedEl = $(e.target);
		let target = $(clickedEl).data('target')

		clickedEl.siblings().removeClass('active');
		clickedEl.addClass('active');
		tabContent.hide();
		$(target).show();

		if (clickedEl.hasClass('promotion'))
			getDetail()
		else if (clickedEl.hasClass('doit'))
			getInvolveDoit();
		else if (clickedEl.hasClass('ucd'))
			getUcdLog();
	}

	function getDetail()
	{
		let param 	= JSON.stringify({"promotion_idx" : idx});
		let url	 	= api.detailPromotion;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(true, url, param, getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildPromoDetail(data) : sweetError(invalidResp(data));
	}

	let g_promotion_uuid;
	let rewards;
	function buildPromoDetail(data)
	{
		let details 	= data.data;
		let detailPromo	= details.promotion;

		rewards 		= details.reward;

		g_promotion_uuid = detailPromo.promotion_uuid;

		bizName.html(detailPromo.nickname);
		promoName.html(detailPromo.promotion_title);
		budget.html(numberWithCommas(detailPromo.budget_ucd)+'원');
		balance.html(numberWithCommas(detailPromo.remain_budget_ucd));
		period.html(`${detailPromo.start_date} ${label.tilde} ${detailPromo.end_date}`);
		let notices = isEmpty(detailPromo.promotion_notice) ? [] : detailPromo.promotion_notice;
		let noticeDom = '';
		for (let i=0; i<notices.length; i++)
			noticeDom += '<p class="detail-data">- '+notices[i]+'</p>';
		promoNotice.html(noticeDom);
		allowCount.html(detailPromo.promotion_allow_count+'회');
		banner.attr('src', detailPromo.banner_image_url);
		intro.attr('src', detailPromo.intro_image_url);
		isExposure.html(detailPromo.is_banner);
		isGallery.html(detailPromo.allow_gallery_image);

		let rewardLen = rewards.length;
		if (rewardLen)
		{
			let rewardTabDom = '';
			for (let i=0; i<rewardLen; i++)
			{
				let statusOn = i === 0 ? 'on' : '';
				let reward = rewards[i];
				rewardTabDom += '<li onclick="onClickRewardTab(this);" data-idx="'+i+'" class="'+statusOn+'">';
				rewardTabDom += 	'<span class="tag-name">'+reward.title+'</span>';
				rewardTabDom += '</li>';
			}

			rewardTab.html(rewardTabDom);
			onClickRewardTab(rewardTab.find('li').eq(0));
		}

		toggleModifyBtn(detailPromo);
	}

	function toggleModifyBtn(detailPromo)
	{
		if (isPromotionClosed(detailPromo.status))
			goUpdate.remove();
	}

	function isPromotionClosed(_status)
	{
		let updateAvailableStatus = ['pending', 'progress'];

		return updateAvailableStatus.indexOf(_status) === -1;
	}

	function onClickRewardTab(obj)
	{
		toggleActive(obj);
		buildReward(obj)
	}

	function toggleActive(obj)
	{
		rewardTab.find('li').removeClass('on');
		$(obj).addClass('on');
	}

	function buildReward(obj)
	{
		let idx = $(obj).data('idx');
		let { title, action_duration, goal_percent, action_dayofweek } = rewards[idx];
		let ucdInfo = rewards[idx].ucd_info[0];
		let actionDayOfWeek = isEmpty(action_dayofweek) ? '-' : action_dayofweek;
		let detailDom =
			`<li class="reward-1">
				<div class="list-inner">
					<p class="title">
						<strong>${title}</strong>
					</p>
					<div class="col-wrap clearfix">
						<div class="col-1">
							<p class="sub-title">인증기간</p>
						</div>
						<div class="col-2">
							<p class="detail-data">${action_duration}일</p>
						</div>
					</div>
					<div class="col-wrap clearfix">
						<div class="col-1">
							<p class="sub-title">주간빈도</p>
						</div>
						<div class="col-2">
							<p class="detail-data">${actionDayOfWeek}</p>
						</div>
					</div>
					<div class="col-wrap clearfix">
						<div class="col-1">
							<p class="sub-title">목표달성률</p>
						</div>
						<div class="col-2">
							<p class="detail-data">${goal_percent}%</p>
						</div>
					</div>
					<div class="col-wrap">
						<p class="sub-title" style="margin-bottom: 5px;">인당 UCD</p>
						<p class="detail-data">
							<table>
								<colgroup>
									<col style="width:35%;">
									<col style="width:20%;">
									<col style="width:20%;">
								</colgroup>
								<thead>
									<tr>
										<th rowspan="2">참여자 수(명)</th>
										<th colspan="2">인당 UCD</th>
									</tr>
									<tr>
										<th>개인</th>
										<th>단체</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>${numberWithCommas(ucdInfo.min)} ~ ${numberWithCommas(ucdInfo.max)}</td>
										<td><span class="text-right">${numberWithCommas(ucdInfo.person_reward)}</span></td>
										<td><span class="text-right">${numberWithCommas(ucdInfo.group_reward)}</span></td>
									</tr>
								</tbody>
							</table>
						</p>
					</div>
				</div>
			</li>`

		rewardDetail.html(detailDom);
	}

	function getInvolveDoit()
	{
		doitTable.DataTable({
			ajax : {
				url: api.involveDoitPromotion,
				type:"POST",
				headers: headers,
				data: function (d) {
					return doitTableParams(d);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "두잇명", 			data: "doit_title",    			width: "30%",    className: "cursor-default",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailDoit+row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "리워드옵션", 		data: "reward_title",  			width: "10%",    className: "cursor-default" }
				,{title: "참여인원/모집인원", 	data: "max_user",    			width: "10%",    className: "cursor-default",
					render: function (data, type, row, meta) {
						return `${row.doit_member} ${label.slash} ${data}`;
					}
				}
				,{title: "인증기간", 		data: "action_start_datetime",  width: "15%",    className: "cursor-default",
					render: function (data, type, row, meta) {
						return `${data} ${label.tilde} ${row.action_end_datetime}`;
					}
				}
				,{title: "진행상태", 		data: "doit_status",  			width: "10%",    className: "cursor-default" }
				,{title: "개설자", 			data: "nickname",  				width: "15%",    className: "cursor-default" }
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForDoit.val()),
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
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}
	
	function doitTableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"promotion_idx" : idx
		}

		return JSON.stringify(param);
	}

	function getUcdLog()
	{
		ucdTable.DataTable({
			ajax : {
				url: api.listPromotionUcd,
				type: "POST",
				headers: headers,
				data: function (d) {
					return ucdTableParams(d);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분", data: "division",   		width: "10%",     className: "cursor-default" }
                ,{title: "금액", data: "amount",   		width: "10%",     className: "cursor-default",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "제목", data: "title",  		width: "15%",     className: "cursor-default" }
                ,{title: "내용", data: "description",   	width: "25%",     className: "cursor-default" }
                ,{title: "일시", data: "created",   		width: "15%",     className: "cursor-default" }
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLengthForUcd.val()),
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
			},
			fnRowCallback: function( nRow, aData ) {
				setUcdRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function ucdTableParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"promotion_uuid" : g_promotion_uuid
		}

		return JSON.stringify(param);
	}

	function setUcdRowAttributes(nRow, aData)
	{
		if (isNegative(aData.amount))
			$(nRow).addClass('minus-pay');
	}

	function onSubmitSearch()
	{
		buildGrid();
	}

	function goUpdatePage()
	{
		location.href = page.updatePromo+idx;
	}
