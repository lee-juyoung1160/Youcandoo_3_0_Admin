
	import { ajaxRequestWithJsonData, isSuccessResp } from '../modules/request.js'
	import { api } from '../modules/api-url.js';
	import {
		btnBack,
		btnList,
		commentCount,
		isBlind,
		likeCount,
		talkAttachWrap,
		talkCreated,
		userNickname,
		content,
		talkCommentWrap,
		btnBlinkTalk, btnDisplayTalk,
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm} from '../modules/alert.js';
	import { historyBack, onErrorImage} from "../modules/common.js";
	import {getPathName, splitReverse, isEmpty, numberWithCommas} from "../modules/utils.js";
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
		btnBlinkTalk.on('click', function () { onSubmitBlindTalk(this); });
		btnDisplayTalk.on('click', function () { onSubmitBlindTalk(this) });
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

	let g_board_uuid;
	function buildDetail(data)
	{
		const { board_uuid, nickname, is_company, board_body, comment_cnt, like_count, is_blind, created } = data.data;

		g_board_uuid = board_uuid;

		userNickname.html(is_company === 'Y' ? label.bizIcon + nickname : nickname);
		isBlind.text(is_blind);
		talkCreated.text(created);
		likeCount.text(numberWithCommas(like_count));
		commentCount.text(numberWithCommas(comment_cnt));
		content.text(board_body);
		talkAttachWrap.html(buildTalkAttachWrap(data.data));

		toggleBtnBlind(data);
		onErrorImage();
	}

	function buildTalkAttachWrap(data)
	{
		const {contents_type, contents_url} = data;
		switch (contents_type) {
			case 'image' :
				return `<div class="detail-img-wrap view-detail-talk-attach" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${contents_url}" alt="">
						</div>`;
			case 'voice' :
				return `<audio controls><source src="${contents_url}"></audio>`;
			case 'video' :
				return `<video controls><source src="${contents_url}"></video>`;
			default :
				return label.dash;
		}
	}

	function toggleBtnBlind(data)
	{
		const { is_blind } = data.data;
		if (is_blind === 'Y')
		{
			btnBlinkTalk.hide();
			btnDisplayTalk.show();
		}
		else
		{
			btnBlinkTalk.show();
			btnDisplayTalk.hide();
		}
	}

	let g_is_blind;
	function onSubmitBlindTalk(obj)
	{
		g_is_blind = $(obj).hasClass('btn-blind') ? 'Y' : 'N';
		const msg = $(obj).hasClass('btn-blind') ? message.blind : message.display;
		sweetConfirm(msg, blindRequest);
	}

	function blindRequest()
	{
		const url = api.blindTalk;
		const errMsg = `블라인드${message.ajaxError}`;
		const param = {
			"is_blind" : g_is_blind,
			"board" : [g_board_uuid],
			"board_comment" : [],
			"action_comment" : []
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), blindReqCallback, errMsg, false);
	}

	function blindReqCallback(data)
	{
		sweetToastAndCallback(data, getDetail);
	}

	const g_talk_comment_page_length = 10;
	let g_talk_comment_last_idx = 0;
	let g_talk_comment_page_num = 1;
	let g_talk_comment_page_size = 1;
	function getTalkComments(_pageLength)
	{
		const url = api.talkCommentList;
		const errMsg = `댓글 목록${message.ajaxLoadError}`;
		const param = {
			"board_uuid" : g_talk_uuid,
			"size" : g_talk_comment_page_length,
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
				const {idx, comment_uuid, created, nickname, is_company, profile_uuid, comment_body, is_blind, comment_cnt, parent_comment_uuid, recomment_data } = obj;

				if (arr.length - 1 === index)
					g_talk_comment_last_idx = idx;

				let repliesEl = ''
				if (recomment_data.length > 0)
				{
					recomment_data.map(replyObj => {
						const isBlindReply = replyObj.is_blind === 'Y';
						const btnBlindReply = isBlindReply
							? `<button type="button" class="btn-xs btn-orange btn-display-comment" id="${replyObj.comment_uuid}" data-uuid="${replyObj.comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
							: `<button type="button" class="btn-xs btn-warning btn-blind-comment" id="${replyObj.comment_uuid}" data-uuid="${replyObj.comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
						repliesEl +=
							`<li>
								<div class="top clearfix">
									<p class="title">
										ㄴ ${replyObj.is_company === 'Y' ? label.bizIcon + replyObj.nickname : replyObj.nickname} 
										<span class="desc-sub">${replyObj.created}</span>
									</p>
									<div class="right-wrap">
										${btnBlindReply}
									</div>
								</div>
								<div class="detail-data">
									${replyObj.comment_body}
								</div>
							</li>`
					})
				}

				const isBlindComment = is_blind === 'Y';
				const btnBlindComment = isBlindComment
					? `<button type="button" class="btn-xs btn-orange btn-display-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
					: `<button type="button" class="btn-xs btn-warning btn-blind-comment" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;
				const commentEl =
					`<div class="card">
						<div class="top clearfix">
							<p class="title">
								${is_company === 'Y' ? label.bizIcon + nickname : nickname} <span class="desc-sub">${created}</span>
							</p>
							<div class="right-wrap">
								${btnBlindComment}
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
			$('.btn-blind-comment').on('click', function () { onClickBtnBlindComment(this); });
			$('.btn-display-comment').on('click', function () { onClickBtnBlindComment(this); });
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
		getTalkComments();
	}

	let g_is_blind_comment;
	let g_comment_uuid;
	let btn_id;
	function onClickBtnBlindComment(obj)
	{
		btn_id = obj.id;
		g_is_blind_comment = $(obj).hasClass('btn-blind-comment') ? 'Y' : 'N';
		g_comment_uuid = $(obj).data('uuid');
		const msg = $(obj).hasClass('btn-blind-comment') ? message.blind : message.display;
		sweetConfirm(msg, blindCommentRequest);
	}

	function blindCommentRequest()
	{
		const url = api.blindTalk;
		const errMsg = `블라인드${message.ajaxError}`;
		const param = {
			"is_blind" : g_is_blind_comment,
			"board" : [],
			"board_comment" : [g_comment_uuid],
			"action_comment" : []
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), blindCommentReqCallback, errMsg, false);
	}

	function blindCommentReqCallback(data)
	{
		sweetToastAndCallback(data, blindCommentSuccess)
	}

	function blindCommentSuccess()
	{
		const btnEl = $(`#${btn_id}`);
		if (g_is_blind_comment === 'Y')
		{
			btnEl.removeClass('btn-warning btn-blind-comment');
			btnEl.addClass('btn-orange btn-display-comment');
			btnEl.html(`<i class="fas fa-eye"></i> 블라인드 해제`);
		}
		else
		{
			btnEl.removeClass('btn-orange btn-display-comment');
			btnEl.addClass('btn-warning btn-blind-comment');
			btnEl.html(`<i class="fas fa-eye-slash"></i> 블라인드 처리`);
		}
	}

	function goListPage()
	{
		location.href = page.listTalk;
	}


