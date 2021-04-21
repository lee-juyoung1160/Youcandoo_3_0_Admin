
	import { ajaxRequestWithJsonData, isSuccessResp, headers } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
		btnBack,
		btnList,
		btnModalUcd,
		modalUcd,
		amount,
		memo,
		modalActionDetail,
		modalClose,
		modalBackdrop,
		lengthInput,
		ulDoitTab,
		openedDoitWrap,
		joinedDoitWrap,
		pagination,
		actionsWrap,
		profileId,
		contact,
		userNickname,
		useremail,
		balance,
		isAuth,
		userLevel,
		totalActionCount,
		hiddenProfileId,
		deviceInfoTableBody,
		openedDoitTable,
		joinedDoitTable,
		modalActionContentWrap,
		modalActionDesc,
		modalActionExampleWrap,
		modalActionExampleDesc,
		modalActionWarningReason,
		btnSubmitSaveUcd,
		description, ucdInfoTable
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {copyToClipboard, fadeoutModal, historyBack, limitInputLength, overflowHidden, paginate} from "../modules/common.js";
	import {initTableDefaultConfig, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import {isEmpty, initInputNumber, isNegative, numberWithCommas} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const g_profile_uuid = hiddenProfileId.val();

	$( () => {
		initTableDefaultConfig();
		moveSection();
		/** 상세 불러오기 **/
		getBasicInfo();
		getDeviceInfo();
		getOpenedDoit();
		getActions();
		getMemberUcdHistory();
		/** 이벤트 **/
		amount 			.on('propertychange change keyup paste input', function () { initInputNumber(this); });
		lengthInput 	.on('propertychange change keyup paste input', function () { limitInputLength(this); });
		btnModalUcd		.on('click', function () { onClickBtnModalUcd(); });
		modalClose		.on('click', function () { fadeoutModal(); });
		modalBackdrop	.on('click', function () { fadeoutModal(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		ulDoitTab		.on('click', function (event) { onClickDoitTab(event); });
		btnSubmitSaveUcd.on('click', function () { onSubmitSaveUcd(); })
	});

	function moveSection()
	{
		$('[data-moveto]').on('click', function (event) {
			const targetSection = $(this).data('moveto');
			const $offsetTop = $('#' + targetSection).offset().top;

			$('html, body').stop().animate({
				scrollTop: $offsetTop -180
			}, 300);

			event.preventDefault();
			event.stopPropagation();
		});
	}

	function onClickBtnModalUcd()
	{
		modalUcd.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		initModalUcd();
	}

	function initModalUcd()
	{
		amount.trigger('focus');
		amount.val('');
		description.val('');
		memo.val('');
	}

	function getBasicInfo()
	{
		const url = api.detailMember;
		const errMsg = `기본정보${message.ajaxLoadError}`;
		const param = {
			"profile_uuid" : g_profile_uuid
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getBasicInfoCallback, errMsg, false);
	}

	function getBasicInfoCallback(data)
	{
		isSuccessResp(data) ? buildBasicInfo(data) : sweetToast(data.msg);
	}

	function buildBasicInfo(data)
	{
		const { profile_uuid, nickname, phone, email, is_auth, level, ucd, action_count } = data.data;

		profileId.text(profile_uuid);
		contact.text(phone);
		userNickname.text(nickname);
		useremail.text(email);
		balance.text(numberWithCommas(ucd));
		isAuth.text(is_auth);
		userLevel.text(level);
		totalActionCount.text(numberWithCommas(action_count));
	}

	function getDeviceInfo()
	{
		const url = api.deviceInfo;
		const errMsg = `기기정보${message.ajaxLoadError}`;
		const param = {
			"profile_uuid" : g_profile_uuid
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDeviceInfoCallback, errMsg, false);
	}

	function getDeviceInfoCallback(data)
	{
		isSuccessResp(data) ? buildDeviceInfo(data) : sweetToast(data.msg);
	}

	function buildDeviceInfo(data)
	{
		if (!isEmpty(data.data) && data.data.length > 0)
		{
			let deviceInfoEl = '';
			data.data.map(obj => {
				const {device, client_id, device_token, created} = obj;
				deviceInfoEl +=
					`<tr>
						<td>${device}</td>
						<td>${client_id}</td>
						<td>
							<div><input type="text" class="input-copy" style="width: 150px" value="${device_token}" readonly=""><i class="fas fa-copy"></i></div>
						</td>
						<td>${created}</td>
					</tr>`
			})

			deviceInfoTableBody.html(deviceInfoEl);

			$(".fas.fa-copy").on('click', function () { copyToClipboard(this); });
		}
	}

	function onClickDoitTab(event)
	{
		const selectedTab = $(event.target);
		const target = $(selectedTab).data('target')

		selectedTab.siblings().removeClass('active');
		selectedTab.addClass('active');
		openedDoitWrap.hide();
		joinedDoitWrap.hide();
		$(target).show();
		target === '#openedDoitWrap' ? getOpenedDoit() : getJoinedDoit();
	}

	function getOpenedDoit()
	{
		openedDoitTable.DataTable({
			ajax : {
				url: api.memberDoitList,
				type:"POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"doit_type" : "leader"
						,"profile_uuid" : g_profile_uuid
						,"limit" : d.length
						,"page" : (d.start / d.length) + 1
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError('두잇개설 '+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "두잇명", 		data: "doit_title",   	width: "35%" }
				,{title: "참여 인원", 	data: "member_cnt",   	width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "오픈일", 		data: "opened",  		width: "15%",
					render: function (data, type, row, meta) {
						return data.substring(0, 10);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	/** 두잇 참여정보 **/
	function getJoinedDoit()
	{
		joinedDoitTable.DataTable({
			ajax : {
				url: api.memberDoitList,
				type:"POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"doit_type" : "member"
						,"profile_uuid" : g_profile_uuid
						,"limit" : d.length
						,"page" : (d.start / d.length) + 1
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(`두잇참여 ${label.list} ${message.ajaxLoadError}`);
				}
			},
			columns: [
				{title: "두잇명", 		data: "doit_title",   	width: "35%" }
				,{title: "상태", 		data: "doit_status",    width: "10%",
					render: function (data) {
						switch (data) {
							case 'create' : return '생성';
							case 'open' : return '진행중';
							case 'stop' : return '운영정지';
							case 'delete' : return '삭제';
						}
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	let _actionCurrentPage = 1;
	function getActions()
	{
		const url = api.memberActionList;
		const errMsg = `인증 정보${message.ajaxLoadError}`;
		const param = {
			"limit" : 30
			,"page" : _actionCurrentPage
			,"profile_uuid" : g_profile_uuid
		}

		// if (!isEmpty(_doit_uuid))
		// {
		// 	param.doit_all = false;
		// 	param["doit_uuid"] = _doit_uuid;
		// }

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getActionsCallback, errMsg, false);
	}

	function getActionsCallback(data)
	{
		if (isSuccessResp(data))
		{
			buildActions(data);
			buildPagination(data);
		}
		else
			sweetToast(data.msg);
	}

	function buildActions(data)
	{
		let actionEl = '<div class="card"><p class="message">인증 정보가 없습니다.</p></div>';

		if (!isEmpty(data.data) && data.data.length > 0)
		{
			actionEl = '';

			data.data.map((obj, index) => {
				const { action_uuid, like_count, comment_count, report_count, doit_title, nickname, action_date, is_yellow, contents_type, contents_url, thumbnail_url} = obj;

				const warningEl = is_yellow === 'Y' ? `<strong class="red-card"><img src="${label.redCardImage}" alt=""></strong>` : '';

				let actionContentImage;
				if (contents_type === 'image')
					actionContentImage = contents_url;
				else if (contents_type === 'voice')
					actionContentImage = label.voiceImage
				else if (contents_type === 'video')
					actionContentImage = thumbnail_url;

				if (index===0 || index%6 === 0)
					actionEl += '<div class="row">';

				actionEl +=
					`<div class="col-2 auth-item">
						<div class="card">
							<div class="top clearfix">
								<div class="right-wrap">
									<span><i class="fas fa-heart"></i> ${like_count}</span>
									<span><i class="fas fa-comment"></i> ${comment_count}</span>
									<span><i class="fas fa-exclamation-triangle"></i> ${report_count}</span>
								</div>
							</div>
							<div class="img-wrap action-image-wrap" data-uuid="${action_uuid}">
								<img src="${actionContentImage}" alt="">
							</div>
							<p class="title">${doit_title}</p>
							<span class="nick-name">${nickname}</span>
							<span class="date">${action_date}</span>
							${warningEl}
						</div>
					</div>`

				if (index>0 && (index+1)%6 === 0)
					actionEl += '</div>';
			})
		}

		actionsWrap.html(actionEl);

		$(".action-image-wrap").on('click', function () { onClickAction(this); })
	}

	function buildPagination(data)
	{
		const totalCount  = data.count;
		const lastPage = Math.ceil(totalCount / 30);

		pagination.html(paginate(_actionCurrentPage, lastPage));

		$(".paginate_button").on('click', function () { onClickPageNum(this); })
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		_actionCurrentPage = $(obj).data('page');

		getActions();
	}

	let g_action_uuid;
	function onClickAction(obj)
	{
		g_action_uuid = $(obj).data('uuid');
		modalActionDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
		getDetailAction();
	}

	function getDetailAction()
	{
		const url = api.memberActionDetail;
		const errMsg = `인증 정보${message.ajaxLoadError}`;
		const param = {
			"action_uuid" : g_action_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailActionCallback, errMsg, false);
	}

	function getDetailActionCallback(data)
	{
		isSuccessResp(data) ? buildModalActionDetail(data) : sweetToast(data.msg);
	}

	function buildModalActionDetail(data)
	{
		const {action_contents_type, action_contents_url, action_description, example_contents_url, example_description, yellow_reason} = data.data;

		let contentEL = '';
		let exampleEl = '';
		switch (action_contents_type) {
			case 'image' :
				contentEL = `<div class="img-wrap"><img src="${action_contents_url}" alt=""></div>`
				exampleEl = `<div class="img-wrap"><img src="${example_contents_url}" alt=""></div>`
				break;
			case 'video' :
				contentEL = `<div class="video-wrap"><video controls><source src="${action_contents_url}"/></video></div>`
				exampleEl = `<div class="video-wrap"><video controls><source src="${example_contents_url}"/></video></div>`
				break;
			case 'voice' :
				contentEL = `<div class="audio-wrap"><img src="${label.voiceImage}" alt=""><audio controls><source src="${action_contents_url}"/></audio></div>`
				exampleEl = `<div class="audio-wrap"><img src="${label.voiceImage}" alt=""><audio controls><source src="${example_contents_url}"/></audio></div>`
				break;
		}
		modalActionContentWrap.html(contentEL);
		modalActionDesc.text(action_description);
		modalActionWarningReason.text(isEmpty(yellow_reason) ? label.dash : yellow_reason);
		modalActionExampleWrap.html(exampleEl);
		modalActionExampleDesc.text(example_description);
	}

	function getMemberUcdHistory()
	{
		ucdInfoTable.DataTable({
			ajax : {
				url: api.memberWalletList,
				type:"POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.data.count;
					json.recordsFiltered = json.data.count;
					json.data = json.data.list;

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"from_date" : "",
						"to_date" : "",
						"search_type" : "profile_uuid",
						"keyword" : g_profile_uuid,
						"page" : (d.start / d.length) + 1
						,"limit" : d.length
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError('UCD'+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분",    	data: "division",  		width: "10%" }
				,{title: "제목",    	data: "title",  		width: "15%" }
				,{title: "내용",    	data: "description",  	width: "40%",
					render: function (data, type, row, meta) {
						return isEmpty(data) ? label.dash : data;
					}
				}
				,{title: "UCD", 	data: "amount_ucd",		width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "일시",    	data: "created",  		width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				if (isNegative(aData.amount_ucd))
					$(nRow).addClass('minus-pay');
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function onSubmitSaveUcd()
	{
		if (saveUcdValid())
			sweetConfirm(message.create, saveUcdRequest);
	}

	function saveUcdRequest()
	{
		const url = api.saveUcdForUser;
		const errMsg = label.submit + message.ajaxError;
		const param = {
			"profile_list" : [ g_profile_uuid ],
			"value" : amount.val().trim(),
			"description" : description.val().trim(),
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), saveUcdReqCallback, errMsg, false);
	}

	function saveUcdReqCallback(data)
	{
		sweetToastAndCallback(data, saveUcdSuccess);
	}

	function saveUcdSuccess()
	{
		fadeoutModal();
		getBasicInfo();
	}

	function saveUcdValid()
	{
		if (isEmpty(amount.val()))
		{
			sweetToast(`UCD는 ${message.required}`);
			amount.trigger('focus');
			return false;
		}

		if (Number(amount.val()) > 1000000)
		{
			sweetToast(message.maxAvailableUserUcd);
			amount.trigger('focus');
			return false;
		}

		if (isEmpty(description.val()))
		{
			sweetToast(`내용은 ${message.required}`);
			description.trigger('focus');
			return false;
		}

		return true;
	}

	function goListPage()
	{
		location.href = page.listMember;
	}


