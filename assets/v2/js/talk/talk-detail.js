
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {btnBack, btnList, commentCount, isBlind, likeCount, talkAttachWrap, talkCreated, userNickname, content, talkCommentWrap,} from '../modules/elements.js';
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
		getDetail();
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

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailCallback, errMsg, false);
	}

	let g_talk_uuid;
	function getDetailCallback(data)
	{
		if (isSuccessResp(data))
		{
			const { board_uuid, comment_cnt} = data.data;
			g_talk_uuid = board_uuid;
			buildDetail(data);
			Number(comment_cnt) > 0 ? getTalkComments() : talkCommentWrap.siblings().remove();
		}
		else
			sweetToast(data.msg);
	}


	function buildDetail(data)
	{
		const { nickname, board_body, comment_cnt, like_count, created } = data.data;

		userNickname.text(nickname);
		isBlind.text();
		talkCreated.text(created);
		likeCount.text(like_count);
		commentCount.text(comment_cnt);
		content.text(board_body);
		talkAttachWrap.html(buildTalkAttachWrap(data.data));

		onErrorImage();
	}

	function buildTalkAttachWrap(data)
	{
		const {contents_type, contents_url, thumbnail_url} = data;
		switch (contents_type) {
			case 'image' :
				return `<div class="detail-img-wrap talk-file-img view-detail-talk-attach" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${contents_url}" alt="">
						</div>`;
			case 'voice' :
				return `<audio controls><source src="${contents_url}"></audio>`;
			case 'video' :
				return `<div class="detail-img-wrap talk-file-img view-detail-talk-attach" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${thumbnail_url}" alt="">
						</div>`;
			default :
				return label.dash;
		}
	}

	const g_talk_comment_page_length = 10;
	let g_param_view_page_length = 10;
	let g_talk_comment_last_idx = 0;
	let g_talk_comment_page_num = 1;
	let g_talk_comment_page_size = 1;
	function getTalkComments(_pageLength)
	{
		const url = api.talkCommentList;
		const errMsg = `댓글 목록${message.ajaxLoadError}`;
		const param = {
			"board_uuid" : g_talk_uuid,
			"size" : isEmpty(_pageLength) ? g_talk_comment_page_length : g_param_view_page_length,
			"last_idx" : g_talk_comment_last_idx
		};

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getTalkCommentsCallback, errMsg, false);
	}

	function getTalkCommentsCallback(data)
	{
		isSuccessResp(data) ? buildTalkComments(data) : sweetToast(data.msg);
	}

	function buildTalkComments(data)
	{
		if ($('#btnViewMore').length > 0) $('#btnViewMore').remove();

		if (!isEmpty(data.data) && data.data.length > 0)
		{
			g_talk_comment_page_size = Math.ceil(Number(data.count)/g_talk_comment_page_length);

			data.data.map((obj, index, arr) => {
				const {idx, comment_uuid, created, nickname, profile_uuid, comment_body, comment_cnt, parent_comment_uuid, recomment_data } = obj;

				if (arr.length - 1 === index)
					g_talk_comment_last_idx = idx;

				let repliesEl = ''
				if (recomment_data.length > 0)
				{
					recomment_data.map(replyObj => {
						repliesEl +=
							`<li>
								<div class="top clearfix">
									<p class="title">
										ㄴ ${replyObj.nickname} <span class="desc-sub">${replyObj.created}</span>
									</p>
								</div>
								<div class="detail-data">
									${replyObj.comment_body}
								</div>
							</li>`
					})
				}

				const commentEl =
					`<div class="card">
						<div class="top clearfix">
							<p class="title">
								${nickname} <span class="desc-sub">${created}</span>
							</p>
							<div class="right-wrap">
								<button type="button" class="btn-xs btn-orange"><i class="fas fa-eye"></i> 블라인드 해제</button>
							</div>
						</div>
						<div class="detail-data">
							${comment_body}
						</div>
						<div class="bottom">
							<span><i class="fas fa-heart"></i> 111</span>
							<span><i class="fas fa-comments"></i> ${comment_cnt}</span>
						</div>
			
						<div class="comments-wrap">
							<ul>
								${repliesEl}
							</ul>
						</div>
					</div>`

				talkCommentWrap.append(commentEl);
			})

			buildPagination();

			$('#btnViewMore').on('click', function () { onClickViewMore(); });
		}
	}

	function buildPagination()
	{
		let btnViewMoreEl = ''
		if ($('#btnViewMore').length === 0 && g_talk_comment_page_num !== g_talk_comment_page_size)
			btnViewMoreEl =
				`<button id="btnViewMore" type="button" class="btn-more">더보기(${g_talk_comment_page_num}/${g_talk_comment_page_size}) 
					<i class="fas fa-sort-down"></i>
				</button>`;

		talkCommentWrap.append(btnViewMoreEl);
	}

	function onClickViewMore()
	{
		g_talk_comment_page_num++
		g_param_view_page_length += 10;
		getTalkComments();
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


