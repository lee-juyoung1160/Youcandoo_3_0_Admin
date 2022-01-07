
	import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {
		btnBack, btnList, commentCount, likeCount, talkAttachWrap, talkCreated, userNickname,
		content, talkCommentWrap, doitTitle, modalAttachContentWrap, modalClose, modalBackdrop,
	} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import {fadeinModal, fadeoutModal, historyBack, onErrorImage} from "../modules/common.js";
	import { getPathName, splitReverse, isEmpty } from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	const pathName	= getPathName();
	const actionIdx	= splitReverse(pathName, '/');

	$( () => {
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnBack.on('click', function () { historyBack(); });
		btnList.on('click', function () { goListPage(); });
		modalClose.on("click", function () { fadeoutModal(); });
		modalBackdrop.on("click", function () { fadeoutModal(); });
	});

	function getDetail()
	{
		const param = { "idx" : actionIdx }

		ajaxRequestWithJson(true, api.detailAction, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getDetailCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_action_uuid;
	function getDetailCallback(data)
	{
		const { action_uuid, comment_cnt} = data.data;
		g_action_uuid = action_uuid;
		buildDetail(data);
		Number(comment_cnt) > 0 ? getTalkComments() : talkCommentWrap.siblings().remove();
	}


	function buildDetail(data)
	{
		const { nickname, action_description, comment_cnt, like_count, action_date, doit_title,doit_idx  } = data.data;

		doitTitle.html(`<a href="${page.detailDoit}${doit_idx}" class="link">${doit_title}</a>`)
		userNickname.text(nickname);
		talkCreated.text(action_date);
		likeCount.text(like_count);
		commentCount.text(comment_cnt);
		content.text(action_description);
		talkAttachWrap.html(buildTalkAttachWrap(data.data));

		onErrorImage();
	}

	function buildTalkAttachWrap(data)
	{
		const {contents_type, contents_url} = data;
		switch (contents_type) {
			case label.image :
				return `<div class="detail-img-wrap talk-file-img view-detail-talk-attach" data-url="${contents_url}" data-type="${contents_type}">
							<img src="${contents_url}" alt="">
						</div>`;
			case label.audio :
				return `<audio controls><source src="${contents_url}"></audio>`;
			case label.video :
				return `<video controls><source src="${contents_url}"></video>`;
			default :
				return label.dash;
		}
	}

	const g_talk_comment_page_length = 10;
	let g_talk_comment_last_idx = 0;
	let g_talk_comment_page_num = 1;
	let g_talk_comment_page_size = 1;
	function getTalkComments()
	{
		const param = {
			"action_uuid" : g_action_uuid,
			"size" : g_talk_comment_page_length,
			"last_idx" : g_talk_comment_last_idx
		}

		ajaxRequestWithJson(false, api.actionCommentList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? buildTalkComments(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`댓글 목록${message.ajaxLoadError}`));
	}

	function buildTalkComments(data)
	{
		if ($('#btnViewMore').length > 0) $('#btnViewMore').remove();

		if (!isEmpty(data.data) && data.data.length > 0)
		{
			g_talk_comment_page_size = Math.ceil(Number(data.count)/g_talk_comment_page_length);

			data.data.map((obj, index, arr) => {
				const {idx, comment_uuid, created, nickname, is_company, is_blind, comment_body, comment_cnt, recomment_data, emoticon, attach} = obj;

				if (arr.length - 1 === index)
					g_talk_comment_last_idx = idx;

				const isBlindComment = is_blind === 'Y';
				const btnBlindComment = isBlindComment
					? `<button type="button" class="btn-xs btn-orange btn-display" id="${comment_uuid}" data-uuid="${comment_uuid}">
						 <i class="fas fa-eye"></i> 블라인드 해제
					   </button>`
					: `<button type="button" class="btn-xs btn-warning btn-blind" id="${comment_uuid}" data-uuid="${comment_uuid}">
						 <i class="fas fa-eye-slash"></i> 블라인드 처리
					   </button>`;
				const commentEl =
					`<div class="card">
						<div class="top clearfix">
							<p class="title">
								${is_company === 'Y' ? label.bizIcon + nickname : nickname} <span class="desc-sub">${created}</span>
							</p>
							<div class="right-wrap">
								${is_company === 'Y' ? '' : btnBlindComment}
							</div>
						</div>
						${buildCommentEmoticon(emoticon)}
						${buildCommentAttachment(attach)}
						${buildCommentBody(comment_body)}
						<div class="bottom">
							<span><i class="fas fa-comments"></i> ${comment_cnt}</span>
						</div>
			
						<div class="comments-wrap">
							<ul>
								${(recomment_data.length > 0) ? buildReply({recomment_data, comment_cnt}) : ''}
							</ul>
						</div>
					</div>`

				talkCommentWrap.append(commentEl);
			})

			buildPagination();

			$('#btnViewMore').on('click', function () { onClickViewMore(); });
			$('.btn-blind').on('click', function () { onClickBtnBlind(this); });
			$('.btn-display').on('click', function () { onClickBtnBlind(this); });
			$('.btn-viewmore-reply').on('click', function () { onClickBtnViewMoreReply(this); });
			$('.comment-attach-wrap').off().on('click', function () { onClickAttachment(this); });
		}
	}

	function buildCommentBody(comment)
	{
		return isEmpty(comment) ? '' : `<div class="detail-data">${comment}</div>`;
	}

	function buildCommentEmoticon(emoticon)
	{
		let emojiElement = '';
		if (!isEmpty(emoticon) && emoticon.length > 0)
			emoticon.map(obj => emojiElement += `<div class="emoticon-view-wrap"><img src="${obj.emoticon_file_url}" alt="이모티콘"></div>`);

		return emojiElement;
	}

	function buildCommentAttachment(attach)
	{
		let attachElement = '';
		if (!isEmpty(attach) && attach.length > 0)
		{
			attach.map(obj => {
				const {contents_type, contents_url, thumbnail_url} = obj;
				attachElement += contents_type === label.audio
					? `<audio controls="controls"><source src="${contents_url}"/></audio>`
					: `<div class="img-wrap comment-attach-wrap" data-type="${contents_type}" data-url="${contents_url}"><img src="${thumbnail_url}" alt="첨부 파일"></div>`;
			})
		}

		return attachElement;
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

	function onClickAttachment(obj)
	{
		fadeinModal();
		let contentEl = ''
		switch ($(obj).data('type')) {
			case label.image :
				contentEl = `<div class="image-wrap"><img src="${$(obj).data('url')}" alt=""></div>`;
				break;
			case label.video :
				contentEl = `<div class="video-wrap"><video controls><source src="${$(obj).data('url')}"></video></div>`;
				break;
		}
		modalAttachContentWrap.html(contentEl);
		onErrorImage();
	}

	function onClickViewMore()
	{
		g_talk_comment_page_num++
		getTalkComments();
	}

	function buildReply({recomment_data, comment_cnt})
	{
		let repliesEl = ''
		recomment_data.slice(0).reverse().map((obj, index, arr) => {
			const {comment_uuid, is_blind, is_company, parent_comment_uuid, created, nickname, comment_body, emoticon, attach} = obj;
			const btnBlindReply = is_blind === 'Y'
				? `<button type="button" class="btn-xs btn-orange btn-display" id="${comment_uuid}" data-uuid="${comment_uuid}">
							 <i class="fas fa-eye"></i> 블라인드 해제
						   </button>`
				: `<button type="button" class="btn-xs btn-warning btn-blind" id="${comment_uuid}" data-uuid="${comment_uuid}">
							 <i class="fas fa-eye-slash"></i> 블라인드 처리
						   </button>`;
			const lastIdx = recomment_data[arr.length - 1].idx;

			if (comment_cnt > 5 && index ===0)
				repliesEl +=
					`<button type="button"
							 class="btn-more btn-viewmore-reply"
							 data-parent="${parent_comment_uuid}"
							 data-last="${lastIdx}"
							 data-size="${comment_cnt}">이전 답글 더보기 <i class="fas fa-sort-down"></i></button>`;

			repliesEl +=
				`<li>
					<div class="top clearfix">
						<p class="title">
							ㄴ ${is_company === 'Y' ? label.bizIcon + nickname : nickname} 
							<span class="desc-sub">${created}</span>
						</p>
						<div class="right-wrap">
							${is_company === 'Y' ? '' : btnBlindReply}
						</div>
					</div>
					${buildCommentEmoticon(emoticon)}
					${buildCommentAttachment(attach)}
					${buildCommentBody(comment_body)}
				</li>`
		})

		return repliesEl;
	}

	let appendReplyTarget;
	function onClickBtnViewMoreReply(obj)
	{
		appendReplyTarget = $(obj);

		const param = {
			"parent_comment_uuid" : $(obj).data('parent'),
			"last_idx" : $(obj).data('last'),
			"size" : $(obj).data('size')
		}

		ajaxRequestWithJson(true, api.actionReplyList, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? appendReply(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`답글 목록${message.ajaxLoadError}`));
	}

	function appendReply(data)
	{
		let appendReplyEl = ''
		data.data.slice(0).reverse().map(obj => {
			const {comment_uuid, is_blind, is_company, created, nickname, comment_body, emoticon, attach} = obj;
			const isBlindReply = is_blind === 'Y';
			const btnBlindReply = isBlindReply
				? `<button type="button" class="btn-xs btn-orange btn-display" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye"></i> 블라인드 해제</button>`
				: `<button type="button" class="btn-xs btn-warning btn-blind" id="${comment_uuid}" data-uuid="${comment_uuid}"><i class="fas fa-eye-slash"></i> 블라인드 처리</button>`;

			appendReplyEl +=
				`<li>
					<div class="top clearfix">
						<p class="title">
							ㄴ ${is_company === 'Y' ? label.bizIcon + nickname : nickname} 
							<span class="desc-sub">${created}</span>
						</p>
						<div class="right-wrap">
							${is_company === 'Y' ? '' : btnBlindReply}
						</div>
					</div>
					${buildCommentEmoticon(emoticon)}
					${buildCommentAttachment(attach)}
					${buildCommentBody(comment_body)}
				</li>`
		})

		appendReplyTarget.after(appendReplyEl);
		appendReplyTarget.remove();
		$('.btn-blind').on('click', function () { onClickBtnBlind(this); });
		$('.btn-display').on('click', function () { onClickBtnBlind(this); });
		$('.comment-attach-wrap').off().on('click', function () { onClickAttachment(this); });
	}

	let g_is_blind;
	let g_blind_uuid;
	let btn_id;
	function onClickBtnBlind(obj)
	{
		btn_id = obj.id;
		g_is_blind = $(obj).hasClass('btn-blind') ? 'Y' : 'N';
		g_blind_uuid = $(obj).data('uuid');
		const msg = $(obj).hasClass('btn-blind') ? message.blind : message.display;
		sweetConfirm(msg, blindRequest);
	}

	function blindRequest()
	{
		const param = {
			"is_blind" : g_is_blind,
			"board" : [],
			"board_comment" : [],
			"action_comment" : [g_blind_uuid]
		}

		ajaxRequestWithJson(true, api.blindTalk, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, blindSuccess);
			})
			.catch(reject => sweetError(`블라인드${message.ajaxError}`));
	}

	function blindSuccess() {
		const btnEl = $(`#${btn_id}`);
		if (g_is_blind === 'Y')
		{
			btnEl.removeClass('btn-warning btn-blind');
			btnEl.addClass('btn-orange btn-display');
			btnEl.html(`<i class="fas fa-eye"></i> 블라인드 해제`);
		}
		else
		{
			btnEl.removeClass('btn-orange btn-display');
			btnEl.addClass('btn-warning btn-blind');
			btnEl.html(`<i class="fas fa-eye-slash"></i> 블라인드 처리`);
		}
	}

	function goListPage()
	{
		location.href = page.listTalk;
	}
