
	import { ajaxRequestWithJson, isSuccessResp, invalidResp, headers } from '../modules/ajax-request.js'
	import { api } from '../modules/api-url.js';
	import {
		btnBack, btnList, btnModalUcd, modalUcd, amount, memo, modalActionDetail, modalClose, modalBackdrop,
		lengthInput, ulDoitTab, openedDoitWrap, joinedDoitWrap, pagination, actionsWrap, profileId, contact,
		userNickname, useremail, balance, isAuth, userLevel, totalActionCount, hiddenProfileId, deviceInfoTableBody,
		openedDoitTable, joinedDoitTable, modalActionContentWrap, modalActionDesc, modalActionExampleWrap,
		modalActionExampleDesc, modalActionWarningReason, btnSubmitSaveUcd, description, ucdInfoTable,
		categoryWrap, ulLevelTab, levelInfoWrap, levelHistoryWrap, openedDoitCount, openedDoitAction,
		levelTable, btnLevelWrap, isStore, modalLevelUp, levelUpReason, btnSubmit, createDate, leaveDate,
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import {copyToClipboard, fadeoutModal, historyBack, limitInputLength, overflowHidden, paginate, onErrorImage} from "../modules/common.js";
	import {initTableDefaultConfig, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import {isEmpty, initInputNumber, isNegative, numberWithCommas} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const g_profile_uuid = isEmpty(hiddenProfileId.val()) ? sessionStorage.getItem('pid') : hiddenProfileId.val();
	const is_store = isStore.val();
	if (is_store) sessionStorage.setItem('pid', g_profile_uuid.toString());

	$( () => {
		initTableDefaultConfig();
		moveSection();
		/** 상세 불러오기 **/
		getBasicInfo();
		getLevelInfo();
		getDeviceInfo();
		getCategory();
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
		ulLevelTab		.on('click', function (event) { onClickLevelTab(event); });
		btnSubmitSaveUcd.on('click', function () { onSubmitSaveUcd(); })
		btnSubmit		.on('click', function () { onSubmitLevelUp(); })
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
		const param = { "profile_uuid" : g_profile_uuid }

		ajaxRequestWithJson(true, api.detailMember, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildBasicInfo(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`기본정보${message.ajaxLoadError}`));
	}

	function buildBasicInfo(data)
	{
		const { profile_uuid, nickname, phone, email, joined, deactived, is_auth, ucd } = data.data;

		profileId.text(profile_uuid);
		contact.text(phone);
		userNickname.text(nickname);
		useremail.text(email);
		createDate.text(joined);
		leaveDate.text(isEmpty(deactived) ? label.dash : deactived);
		balance.text(numberWithCommas(ucd));
		isAuth.text(is_auth);
	}

	function onClickLevelTab(event)
	{
		const selectedTab = $(event.target);
		const target = $(selectedTab).data('target');

		switch (target) {
			case '#levelInfoWrap' :
				getLevelInfo();
				break;
			case '#levelHistoryWrap' :
				getLevelHistory();
				break;
		}

		selectedTab.siblings().removeClass('active');
		selectedTab.addClass('active');
		levelInfoWrap.hide();
		levelHistoryWrap.hide();
		$(target).show();
	}

	function getLevelInfo()
	{
		const param = { "profile_uuid" : g_profile_uuid }

		ajaxRequestWithJson(false, api.levelInfo, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildLevelInfo(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`레벨정보${message.ajaxLoadError}`));
	}

	function buildLevelInfo(data)
	{
		const { level_name, level, total_doit_action_count, create_doit_count, action_count } = data.data;
		toggleBtnLevel(level);
		userLevel.text(level_name);
		totalActionCount.text(numberWithCommas(action_count));
		openedDoitCount.text(numberWithCommas(create_doit_count));
		openedDoitAction.text(numberWithCommas(total_doit_action_count));
	}

	function getLevelHistory()
	{
		const param = { "profile_uuid" : g_profile_uuid }

		ajaxRequestWithJson(false, api.levelHistory, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildLeveTable(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`레벨 변경 내역을 ${message.ajaxLoadError}`));
	}

	function buildLeveTable(data)
	{
		levelTable.DataTable({
			data: data.data,
			columns: [
				{title: "레벨명",    	data: "level_name",  	width: "20%" }
				,{title: "담당자", 	data: "reason",			width: "20%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data.split('||')[0];
					}
				}
				,{title: "사유", 	data: "reason",			width: "40%",
					render: function (data) {
						return isEmpty(data) ? label.dash : data.split('||')[1];
					}
				}
				,{title: "설정일시", 	data: "created",		width: "20%" }
			],
			serverSide: false,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
			}
		});
	}

	function getDeviceInfo()
	{
		const param = { "profile_uuid" : g_profile_uuid }

		ajaxRequestWithJson(true, api.deviceInfo, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildDeviceInfo(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`기기정보${message.ajaxLoadError}`));
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

	function getCategory()
	{
		const param = { "profile_uuid" : g_profile_uuid }

		ajaxRequestWithJson(true, api.memberCategoryList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildCategory(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`관심카테고리${message.ajaxLoadError}`));
	}

	function buildCategory(data)
	{
		if (!isEmpty(data.data) && data.data.length > 0)
		{
			let categoryEl = '';
			data.data.map(obj => {
				const {category_title, subcategory_info} = obj;
				let subCategoryEl = '';
				if (!isEmpty(subcategory_info) && subcategory_info.length > 0)
				{
					subcategory_info.map(subCategory => {
						subCategoryEl += `<li>#<span>${subCategory.subcategory_title}</span></li>`
					})
				}

				categoryEl +=
					`<tr>
						<th>${category_title}</th>
						<td>
							<ul class="tag-list clearfix">
								${subCategoryEl}
							</ul>
						</td>
					</tr>`
			})

			categoryWrap.html(categoryEl);
		}
		else
		{
			categoryWrap.parent().hide();
			categoryWrap.parent().after('<div class="card"><p class="message">관심 카테고리가 없습니다.</p></div>')
		}
	}

	function onClickDoitTab(event)
	{
		const selectedTab = $(event.target);
		const target = $(selectedTab).data('target');

		switch (target) {
			case '#openedDoitWrap' :
				getOpenedDoit();
				break;
			case '#joinedDoitWrap' :
				getJoinedDoit();
				break;
		}

		selectedTab.siblings().removeClass('active');
		selectedTab.addClass('active');
		openedDoitWrap.hide();
		joinedDoitWrap.hide();
		$(target).show();
	}

	function getOpenedDoit()
	{
		openedDoitTable.DataTable({
			ajax : {
				url: api.memberDoitList,
				type:"POST",
				headers: headers,
				global: false,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

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

	/** 두잇 참여정보 **/
	function getJoinedDoit()
	{
		joinedDoitTable.DataTable({
			ajax : {
				url: api.memberDoitList,
				type:"POST",
				headers: headers,
				global: false,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

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

		ajaxRequestWithJson(true, api.memberActionList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await  getActionsCallback(data);
			})
			.catch(reject => sweetError(`인증 정보${message.ajaxLoadError}`));
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
				if (contents_type === label.image)
					actionContentImage = contents_url;
				else if (contents_type === label.audio)
					actionContentImage = label.voiceImage
				else if (contents_type === label.video)
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
		onErrorImage();
		$(".action-image-wrap").on('click', function () { onClickAction(this); })
	}

	function buildPagination(data)
	{
		const totalCount  = data.count;
		const lastPage = Math.ceil(totalCount / 30);

		pagination.html(paginate(_actionCurrentPage, lastPage));

		$(".paginate_button").not('.disabled').on('click', function () { onClickPageNum(this); })
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
		const param = { "action_uuid" : g_action_uuid }

		ajaxRequestWithJson(true, api.memberActionDetail, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildModalActionDetail(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`인증 정보${message.ajaxLoadError}`));
	}

	function buildModalActionDetail(data)
	{
		const {action_contents_type, action_contents_url, action_description, example_contents_type, example_contents_url, example_description, is_yellow, yellow_reason} = data.data;

		let contentEL = '';
		switch (action_contents_type) {
			case label.image :
				contentEL = `<div class="img-wrap"><img src="${action_contents_url}" alt=""></div>`
				break;
			case label.video :
				contentEL = `<div class="video-wrap"><video controls><source src="${action_contents_url}"/></video></div>`
				break;
			case label.audio :
				contentEL = `<div class="audio-wrap"><img src="${label.voiceImage}" alt=""><audio controls><source src="${action_contents_url}"/></audio></div>`
				break;
		}
		let exampleEl = '';
		switch (example_contents_type) {
			case label.image :
				exampleEl = `<div class="img-wrap"><img src="${example_contents_url}" alt=""></div>`
				break;
			case label.video :
				exampleEl = `<div class="video-wrap"><video controls><source src="${example_contents_url}"/></video></div>`
				break;
			case label.audio :
				exampleEl = `<div class="audio-wrap"><img src="${label.voiceImage}" alt=""><audio controls><source src="${example_contents_url}"/></audio></div>`
				break;
		}
		modalActionContentWrap.html(contentEL);
		modalActionDesc.text(action_description);
		modalActionWarningReason.text(is_yellow === 'Y' ? yellow_reason : label.dash);
		modalActionExampleWrap.html(exampleEl);
		modalActionExampleDesc.text(example_description);
		onErrorImage();
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
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.data.count;
						json.recordsFiltered = json.data.count;
						json.data = json.data.list;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(data));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"from_date" : "",
						"to_date" : "",
						"search_type" : "profile_uuid",
						"keyword" : g_profile_uuid,
						"page" : (d.start / d.length) + 1,
						"limit" : d.length
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
				,{title: "UCD", 	data: "value",			width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "일시",    	data: "created",  		width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: 30,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				if (isNegative(aData.value))
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
		const param = {
			"profile_uuid" : [ g_profile_uuid ],
			"value" : amount.val().trim(),
			"description" : description.val().trim(),
		}

		ajaxRequestWithJson(true, api.saveUserUcdBySystem, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, saveUcdSuccess);
			})
			.catch(reject => sweetError(label.submit + message.ajaxError));
	}

	function saveUcdSuccess()
	{
		fadeoutModal();
		getBasicInfo();
		getMemberUcdHistory();
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

	function toggleBtnLevel(level)
	{
		let btnLevels = '';
		switch (level) {
			case '1' :
				btnLevels = `<button id="btnPartner" type="button" class="btn-sm btn-outline-secondary"><i class="fas fa-star"></i> Lv.파트너 설정</button>`;
				break;
			case '2' :
				btnLevels = `<button id="btnPartner" type="button" class="btn-sm btn-outline-secondary"><i class="fas fa-star"></i> Lv.파트너 설정</button>`;
				break;
			case '3' :
				btnLevels = `<button id="btnPartner" type="button" class="btn-sm btn-outline-secondary"><i class="fas fa-star"></i> Lv.파트너 설정</button>`;
				break;
			case '4' :
				btnLevels = `<button id="btnPartner" type="button" class="btn-sm btn-outline-secondary"><i class="fas fa-star"></i> Lv.파트너 설정</button>
							<button id="btnLevelUp" type="button" class="btn-sm btn-outline-warning"><i class="fas fa-level-up-alt"></i> Lv.레전드로 승급</button>`;
				break;
			case '5' :
				btnLevels = `<button id="btnPartner" type="button" class="btn-sm btn-outline-secondary"><i class="fas fa-star"></i> Lv.파트너 설정</button>
							<button id="btnLevelDown" type="button" class="btn-sm btn-outline-orange"><i class="fas fa-level-down-alt"></i> Lv.마스터로 강등</button>`;
				break;
			case '6' :
				btnLevels = `<button id="btnCancel" type="button" class="btn-sm btn-outline-orange"><i class="fas fa-level-down-alt"></i> Lv.파트너 해제</button>`;
				break;
		}

		btnLevelWrap.html(btnLevels);

		$("#btnLevelWrap button").on('click', function () { onClickBtnLevel(this) });
	}

	let levelApi;
	let level;
	let btnId;
	function onClickBtnLevel(obj)
	{
		btnId = obj.id;
		levelApi = getLevelApiUrl(btnId);
		level = calculateLevel(btnId);
		(btnId === 'btnPartner' || btnId === 'btnLevelUp' ) ? fadeinModalLevelUp() : sweetConfirm(getConfirmMessage(btnId), levelRequest);
	}

	function fadeinModalLevelUp()
	{
		modalLevelUp.fadeIn();
		modalBackdrop.fadeIn();
		levelUpReason.val('');
		levelUpReason.trigger('focus');
	}

	function onSubmitLevelUp()
	{
		if (isEmpty(levelUpReason.val()))
		{
			sweetToast(`사유는 ${message.required}`);
			return;
		}
		sweetConfirm(getConfirmMessage(btnId), levelRequest);
	}

	function levelRequest()
	{
		const param = { "profile_uuid" : g_profile_uuid }
		if (!isEmpty(level)) param["level"] = level;
		if (Number(level) >= 5) param["reason"] = levelUpReason.val().trim();

		ajaxRequestWithJson(true, levelApi, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				fadeoutModal();
				await sweetToastAndCallback(data, getLevelInfo);
			})
			.catch(reject => sweetError(`레벨${message.ajaxError}`));
	}

	function calculateLevel(btnId)
	{
		switch (btnId) {
			case 'btnPartner' :
				return 6;
			case 'btnLevelUp' :
				return 5;
			case 'btnLevelDown'	:
				return 4;
			case 'btnCancel' :
				return '';
		}
	}

	function getLevelApiUrl(btnId)
	{
		switch (btnId) {
			case 'btnLevelUp' :
				return api.levelUp;
			case 'btnLevelDown'	 :
				return api.levelDown;
			case 'btnCancel'	 :
				return api.cancelPartner;
			default :
				return api.levelUp;
		}
	}

	function getConfirmMessage(btnId)
	{
		switch (btnId) {
			case 'btnLevelUp' :
				return '확인을 누르면 레전드로 승급합니다.';
			case 'btnLevelDown'	 :
				return '확인을 누르면 마스터로 강등합니다.';
			case 'btnCancel'	 :
				return '확인을 누르면 파트너 등급을 해제합니다.';
			default :
				return '확인을 누르면 파트너 등급으로 설정합니다.';
		}
	}
