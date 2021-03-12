
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
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
	lengthInput, ulDoitTab, openedDoitWrap, joinedDoitWrap
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import {fadeoutModal, historyBack, limitInputLength, overflowHidden} from "../modules/common.js";
	import {isEmpty, initInputNumber} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		moveSection();
		/** 상세 불러오기 **/
		//getMemberInfo();
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

	function getMemberInfo()
	{
		const url = api.detailMember;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : memberIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_profile_uuid;
	function buildDetail(data)
	{
		const { profile_uuid, is_exposure } = data.data;

		g_profile_uuid = profile_uuid;

		calculateInputLength();
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
		//target === '#openedDoitWrap' ? getOpenedDoit() : getJoinedDoit();
	}

	function getOpenedDoit()
	{
		openedTable.DataTable({
			ajax : {
				url: api.listUserOpened,
				type:"POST",
				headers: headers,
				data: function (d) {
					return openedDoitParams(d);
				},
				error: function (request, status) {
					sweetError('두잇개설 '+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "두잇명", 		data: "doit_title",   	width: "25%" }
				,{title: "리워드 UCD", 	data: "reward_ucd",		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "사용 UCD", 	data: "use_ucd",   		width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "참여자 수", 	data: "member_cnt",   	width: "10%",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "목표달성률(%)", data: "goal_percent",   width: "10%",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "평균달성률(%)", data: "avg_percent",   	width: "10%",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "인증기간", data: "action_start_datetime",  width: "20%",
					render: function (data, type, row, meta) {
						return `${row.action_start_datetime} ${label.tilde} ${row.action_end_datetime}`;
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

	function openedDoitParams(d)
	{
		let param = {
			"limit" : d.length
			,"page" : (d.start / d.length) + 1
			,"profile_uuid" : g_profile_uuid
		}

		return JSON.stringify(param);
	}

	/** 두잇 참여정보 **/
	function getJoinedDoit()
	{
		joinedTable.DataTable({
			ajax : {
				url: api.listUserJoined,
				type:"POST",
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
					sweetError(`두잇참여 ${label.list} ${message.ajaxLoadError}`);
				}
			},
			columns: [
				{title: "두잇명", 		data: "doit_title",   				width: "19%",	className: "cursor-pointer" }
				,{title: "진행상태", 	data: "doit_status",    			width: "5%",	className: "cursor-pointer" }
				,{title: "리워드 UCD", 	data: "reward_ucd",   				width: "8%",	className: "cursor-pointer",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "적립 UCD", 	data: "use_ucd",   					width: "8%",	className: "cursor-pointer",
					render: function (data) {
						return isEmpty(data) ? label.dash : numberWithCommas(data);
					}
				}
				,{title: "목표달성률(%)", data: "goal_percent",   			width: "8%",	className: "cursor-pointer",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "평균달성률(%)", data: "avg_percent",   				width: "8%",	className: "cursor-pointer",
					render: function (data) {
						return Math.floor(Number(data));
					}
				}
				,{title: "인증기간", 	data: "action_start_datetime",  	width: "14%",	className: "cursor-pointer",
					render: function (data, type, row, meta) {
						return `${row.action_start_datetime} ${label.tilde} ${row.action_end_datetime}`;
					}
				}
				,{title: "인증 가능 시간", data: "action_allow_start_time", 	width: "12%",	className: "cursor-pointer",
					render: function(data, type, row, meta) {
						return `${row.action_allow_start_time} ${label.tilde} ${row.action_allow_end_time}`;
					}
				}
				,{title: "인증요일", 	data: "action_dayofweek",  			width: "10%",	className: "cursor-pointer" }
				,{title: "인증방법", 	data: "action_resource_type",  		width: "5%",	className: "cursor-pointer",
					render: function (data) {
						switch (data) {
							case 'image':
								return '사진';
							case 'video':
								return '영상';
							case 'voice':
								return '음성';
							default:
								return '';
						}
					}
				}
				,{title: "갤러리허용",	data: "allow_gallery_image",		width: "6%",	className: "cursor-pointer",
					render: function (data, type, row, meta) {
						return row.action_resource_type === 'image' ? data : label.dash;
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
				setJoinDoitRowAttribute(nRow, aData);
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function goListPage()
	{
		location.href = page.listMember;
	}


