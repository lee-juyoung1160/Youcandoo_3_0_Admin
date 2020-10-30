
	const typeEl 		= $("#type");
	const nicknameEl 	= $("#nickname");
	const likeEl 		= $("#like");
	const reportEl 		= $("#report");
	const contentEl 	= $("#content");
	const doitTitleEl 	= $("#doitTitle");
	const totalCount	= $(".data-num");
	const selPageLength	= $("#selPageLength");
	const commentWarp 	= $("#commentWarp");
	const pagination	= $("#dataTable_paginate");
	let currentPage = 1;

	$( () => {
		/** n개씩 보기 초기화 (initSearchForm 이후에 와야 함) **/
		initPageLength(selPageLength);
		/** 상세 **/
		getDetail();
		/** 이벤트 **/
		selPageLength.on('change', function () { onChangeSelPageLength() });
	});

	/** 기본정보 **/
	function getDetail()
	{
		let url 	= api.detailTalk;
		let errMsg 	= `두잇톡 ${label.detailContent}${message.ajaxError}`;
		let param   = {
			"board_uuid" : "BRI-89B26258-3B5A-5BE2-A66A-CF2C2B41DFBA"
			,"page" : currentPage
			,"limit" : Number(selPageLength.val())
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDeatilCallback, errMsg, false);
	}

	function getDeatilCallback(data)
	{
		if (isSuccessResp(data))
		{
			totalCount.html(data.comment.size);
			buildDeatail(data)
			buildPagination(data);
		}
		else
			sweetError(invalidResp(data));
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
							<button onclick="viewLargeComments(this)" id="${board_comment_uuid}" type="button" class="btn-comment" ${hasComment}>
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

	function buildPagination(data)
	{
		let totalCount  = data.comment.size;
		let lastPage	= Math.ceil(totalCount / selPageLength.val());

		pagination.html(paginate(currentPage, lastPage));
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		currentPage = $(obj).data('page');

		getDetail();
	}

	function onChangeSelPageLength()
	{
		currentPage = 1;
		getDetail();
	}

	let g_board_comment_uuid;
	let g_comment_element;
	function viewLargeComments(obj)
	{
		g_board_comment_uuid = obj.id;
		g_comment_element = $(obj).closest('.card');
		getLargeCommentsRequest();
	}

	function getLargeCommentsRequest()
	{
		let url = api.listLargeComment;
		let errMsg 	= `대댓글 ${message.ajaxLoadError}`;
		let param = {
			"board_comment_uuid": g_board_comment_uuid,
			"page": "1",
			"limit": "10"
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), buildLargeComments, errMsg, false);
	}

	function buildLargeComments(data)
	{
		$(".open-box").remove();

		let largeCommentsEl =
			`<div class="open-box">
				<div class="container">
					<ul class="comment-wrap">`
						for (let { nickname, comment_text, is_blind, created } of data.data)
						{
							let btnBlindEl = is_blind === 'Y' ? `<i class="fas fa-eye"></i> 블라인드해제` : `<i class="fas fa-eye-slash"></i> 블라인드처리`
							largeCommentsEl +=
								`<li>
									<div class="left-wrap">
										└
										<strong class="nickname">${nickname}</strong>
										<p class="comment-2">${comment_text}</p>
									</div>
									<div class="right-wrap">
										<span class="date">${created}</span>
										<button type="button" class="btn-blind">
											${btnBlindEl}
										</button>
									</div>
								</li>`
						}
		largeCommentsEl	+=
					`</ul>
				</div>
			</div>`

		g_comment_element.append(largeCommentsEl);
	}
