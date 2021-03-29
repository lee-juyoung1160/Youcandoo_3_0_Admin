
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList,} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import { historyBack, onErrorImage} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const talkIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		//getDetail();
		/** 이벤트 **/
		btnBack	 .on('click', function () { historyBack(); });
		btnList	 .on('click', function () { goListPage(); });
	});

	function getDetail()
	{
		const url = api.detailTalk;
		const errMsg = label.detailContent+message.ajaxLoadError;
		const param = {
			"idx" : talkIdx
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetToast(data.msg);
	}

	let g_notice_uuid;
	function buildDetail(data)
	{
		const { profile_uuid, nickname } = data.data;

		g_biz_uuid = profile_uuid;

		`<div class="card blind">
			<div class="top clearfix">
				<p class="title">
					유캔두 <span class="desc-sub">2020-02-02 00:00:00</span>
				</p>
				<div class="right-wrap">
					<button type="button" class="btn-xs btn-orange"><i class="fas fa-eye"></i> 블라인드 해제</button>
				</div>
			</div>
			<div class="detail-data">
				대박사건... 인증계를 뒤집어놓으셨다...!
			</div>
			<div class="img-wrap">
				<img src="/assets/v2/img/profile-1.png" alt="">
			</div>
			<div class="bottom">
				<span><i class="fas fa-heart"></i> 111</span>
				<span><i class="fas fa-comments"></i> 111</span>
			</div>

			<div class="comments-wrap">
				<ul>
					<li class="blind">
						<div class="top clearfix">
							<p class="title">
								ㄴ 베리네모카 <span class="desc-sub">2020-02-02 00:00:00</span>
							</p>
							<div class="right-wrap">
								<button type="button" class="btn-xs btn-orange"><i class="fas fa-eye"></i> 블라인드 해제</button>
							</div>
						</div>
						<div class="detail-data">
							대박사건... 인증계를 뒤집어놓으셨다...!
						</div>
						<div class="img-wrap">
							<img src="/assets/v2/img/profile-1.png" alt="">
						</div>
					</li>
					<li>
						<div class="top clearfix">
							<p class="title">
								ㄴ 깐깐찡어 <span class="desc-sub">2020-02-02 00:00:00</span>
							</p>
							<div class="right-wrap">
								<button type="button" class="btn-xs btn-warning"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>
							</div>
						</div>
						<div class="detail-data">
							대박사건... 인증계를 뒤집어놓으셨다...!
						</div>
					</li>
				</ul>
			</div>
		</div>`

		onErrorImage();
	}

	function onSubmitBlindTalk()
	{
		sweetConfirm(message.change, blindRequest);
	}

	function blindRequest()
	{
		const url = api;
		const errMsg = label.delete + message.ajaxError;
		const param = {
			"notice_uuid" : g_notice_uuid,
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), blindReqCallback, errMsg, false);
	}

	function blindReqCallback(data)
	{
		sweetToastAndCallback(data, blindSuccess)
	}

	function blindSuccess()
	{

	}

	function goListPage()
	{
		location.href = page.listTalk;
	}


