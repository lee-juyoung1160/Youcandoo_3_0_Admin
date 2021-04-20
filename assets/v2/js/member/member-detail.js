
	import { ajaxRequestWithJsonData, isSuccessResp, headers } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
	btnBack,
	btnList,
	btnModalUcd,
	modalUcd,
	amount,
	content,
	memo,
	modalClose,
	modalBackdrop,
	lengthInput,
	ulDoitTab,
	openedDoitWrap,
	joinedDoitWrap,
	selPageLength,
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
	deviceInfoTableBody, openedDoitTable, joinedDoitTable,
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {
		copyToClipboard,
		fadeoutModal,
		historyBack,
		limitInputLength,
		overflowHidden,
		paginate
	} from "../modules/common.js";
	import { initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
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
		/** 이벤트 **/
		amount 			.on("propertychange change keyup paste input", function () { initInputNumber(this); });
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		btnModalUcd		.on('click', function () { onClickBtnModalUcd(); });
		modalClose		.on("click", function () { fadeoutModal(); });
		modalBackdrop	.on("click", function () { fadeoutModal(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		ulDoitTab		.on("click", function (event) { onClickDoitTab(event); });
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
		content.val('');
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
		totalActionCount.text(action_count);
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
		const errMsg = `인증정보 ${label.list} ${message.ajaxLoadError}`;
		const param = {
			"limit" : g_action_page_length
			,"page" : actionCurrentPage
			,"profile_uuid" : g_profile_uuid
			,"doit_all" : true
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
		const actions = data.data;
		const actionsLength = actions.length;
		const totalCount = data.count;
		let actionEl = '<p class="empty-message">인증 정보가 없습니다.</p>';

		for (let i=0; i<12; i++)
		{
			if (i===0 || i%6 === 0)
				actionEl += '<div class="row">';

			actionEl +=
				`<div class="col-2 auth-item">
                    <div class="card">
                        <div class="top clearfix">
                            <div class="checkbox-wrap">
                                <input id="c15" type="checkbox" name="cb">
                                <label for="c15"><span></span></label>
                            </div>
                            <div class="right-wrap">
                                <span><i class="fas fa-exclamation-triangle"></i> 111</span>
                            </div>
                        </div>
                        <div class="img-wrap">
                            <img src="/assets/v2/img/profile-1.png" alt="">
                        </div>
                        <p class="title">두잇며어엉두잇며어엉두잇며어엉두잇며어엉두잇며어엉두잇며어엉</p>
                        <span class="nick-name">열심히사는강아지열심히사는강아지</span>
                        <span class="date">2020-02-02</span>
                        <strong class="red-card"><img src="/assets/v2/img/red-card.png" alt=""></strong>
                    </div>
                </div>`

			if (i>0 && (i+1)%6 === 0)
				actionEl += '</div>';
		}

		actionsWrap.html(actionEl);

		$(".img-wrap").on('click', function () { viewDetail(this); })
	}

	function buildPagination(data)
	{
		const totalCount  = data.count;
		const lastPage = Math.ceil(totalCount / selPageLength.val());

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

	function viewActionDetail()
	{
		modalActionDetail.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

	function getMemberUcdHistory()
	{
		usageHisTable.DataTable({
			ajax : {
				url: api.listUserUsageUcd,
				type:"POST",
				global: false,
				headers: headers,
				data: function (d) {
					const param = {
						"limit" : d.length
						,"page" : (d.start / d.length) + 1
						,"profile_uuid" : g_profile_uuid
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError('UCD 사용내역 '+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "유형", 		data: "ucd_type",   width: "10%" }
				,{title: "구분", 	data: "division",   width: "10%" }
				,{title: "금액", 	data: "amount",		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "제목", 	data: "title",   	width: "15%" }
				,{title: "내용", 	data: "description",width: "30%" }
				,{title: "일시", 	data: "created",   	width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: 10,
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}

		});
	}

	function setRowAttributes(nRow, aData)
	{
		if (isNegative(aData.amount))
			$(nRow).addClass('minus-pay');
	}


	function goListPage()
	{
		location.href = page.listMember;
	}


