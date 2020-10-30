
	const typeEl 		= $("#type");
	const nicknameEl 	= $("#nickname");
	const likeEl 		= $("#like");
	const reportEl 		= $("#report");
	const contentEl 	= $("#content");
	const doitTitleEl 	= $("#doitTitle");
	const commentWarp 	= $("#commentWarp");

	$( () => {
		/** 상세 **/
		getDetail();
		/** 이벤트 **/
	});

	/** 기본정보 **/
	function getDetail()
	{
		let url 	= api.detailTalk;
		let errMsg 	= `두잇톡 ${label.detailContent}${message.ajaxError}`;
		let param   = {
			"board_uuid" : "BRI-89B26258-3B5A-5BE2-A66A-CF2C2B41DFBA"
			,"page" : 1
			,"limit" : 10
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDeatilCallback, errMsg, false);
	}

	function getDeatilCallback(data)
	{
		isSuccessResp(data) ? buildDeatail(data) : sweetError(invalidResp(data));
	}

	function buildDeatail(_data)
	{
		let { board_uuid, doit_title, is_notice, like, nickname, report, text_body } = _data.data;

		typeEl.html(is_notice === 'Y' ? '공지' : '일반');
		nicknameEl.html(nickname);
		likeEl.html(numberWithCommas(like));
		reportEl.html(numberWithCommas(report));
		contentEl.html(text_body);
		doitTitleEl.html(`<a href="${page.detailDoit}">${doit_title}</a>`);

		let commentEl = '';
		let comments = _data.comment.data;
		for (let { board_comment_uuid, nickname, comment_text, comment_count, created} of comments)
		{
			let hasComment = Number(comment_count) > 0 ? '' : 'disabled';
			commentEl +=
				`<div class="card">
					<div class="card-body line-aqua">
						<div class="row">
							<div class="flex-container left-wrap">
								<div class="col">
									<strong class="nickname">${nickname}</strong>
								</div>
								<div class="col">
									<p class="comment-1">${comment_text}</p>
								</div>
							</div>
						</div>
						<div class="row">
							<button type="button" class="btn-comment" ${hasComment}>
								<i class="fas fa-comment"></i> <span>${numberWithCommas(comment_count)}</span>
							</button>
						</div>
	
						<div class="right-wrap">
							<div class="flex-container">
								<div class="col">
									<span class="date">${created}</span>
								</div>
								<div class="col">
									<button type="button" class="btn-blind"><i class="fas fa-eye-slash"></i> 블라인드처리</button>
								</div>
							</div>
						</div>
					</div>
				</div>`
		}

		commentWarp.html(commentEl);
	}

	let g_board_comment_uuid;
	function onClickComment(obj)
	{
		g_board_comment_uuid = "BCU-132A269B-480C-34DD-4DE8-70C824C96C48"//$(obj).data('uuid');
		detailChildCommentRequest();
	}

	function detailChildCommentRequest()
	{
		let url = api.listChildComment;
		let errMsg 	= `대댓글 ${message.ajaxLoadError}`;
		let param = {
			"board_comment_uuid": g_board_comment_uuid,
			"page": "1",
			"limit": "10"
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDeatilCallback, errMsg, false);
	}
