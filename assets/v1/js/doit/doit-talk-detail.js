
	const typeEl 		= $("#type");
	const nicknameEl 	= $("#nickname");
	const likeEl 		= $("#like");
	const reportEl 		= $("#report");
	const contentEl 	= $("#content");
	const doitTitleEl 	= $("#doitTitle");
	const delYnEl	 	= $("#delYn");
	const totalCount	= $(".data-num");
	const selPageLength	= $("#selPageLength");
	const commentWarp 	= $("#commentWarp");
	const pagination	= $("#dataTable_paginate");
	const pathname 		= window.location.pathname;
	const idx 			= pathname.split('/').reverse()[0];
	let currentPage = 1;

	$( () => {
		/** n개씩 보기 초기화 **/
		setPageLength();
		/** 상세 **/
		getDetail();
		/** 댓글 **/
		getComments();
		/** 이벤트 **/
		selPageLength.on('change', function () { onChangeSelPageLength() });
	});

	function setPageLength()
	{
		let options = '';
		options += '<option value="10">10개씩 보기</ooption>';
		options += '<option selected value="30">30개씩 보기</ooption>';
		options += '<option value="50">50개씩 보기</ooption>';

		selPageLength.html(options);
		onChangeSelectOption(selPageLength);
	}

	/** 기본정보 **/
	function getDetail()
	{
		let url 	= api.detailTalk;
		let errMsg 	= `두잇톡 ${label.detailContent}${message.ajaxError}`;
		let param   = { "idx" : idx };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDeatilCallback, errMsg, false);
	}

	function getDeatilCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	function buildDetail(_data)
	{
		let { doit_idx, doit_title, talk_type, like, nickname, user_idx, report, contents, is_del } = _data.data;

		let createUser = nickname.includes('@') ? nickname : `<a href="${page.detailUser}${user_idx}">${nickname}</a>`;

		typeEl.html(talk_type);
		nicknameEl.html(createUser);
		likeEl.html(numberWithCommas(like));
		reportEl.html(numberWithCommas(report));
		delYnEl.html(is_del);
		contentEl.html(contents);
		doitTitleEl.html(`<a href="${page.detailDoit}${doit_idx}">${doit_title}</a>`);
	}

	function getComments()
	{
		let url 	= api.listComment;
		let errMsg 	= `댓글 목록 ${message.ajaxLoadError}`;
		let param   = {
			"idx" : idx
			,"page" : currentPage
			,"limit" : Number(selPageLength.val())
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getCommentsCallback, errMsg, false);
	}

	function getCommentsCallback(data)
	{
		buildComments(data);
		buildPagination(data);
	}

	function buildComments(data)
	{
		let commentEl = '';
		if (isSuccessResp(data))
		{
			let comments = data.data;
			if (comments.length > 0)
			{
				for (let { comment_idx, board_comment_uuid, nickname, contents, comment_count, is_blind, created} of comments)
				{
					let hasComment = Number(comment_count) > 0 ? '' : 'disabled';
					let blindYn = is_blind === 'Y' ? 'N' : 'Y';
					let blindText = is_blind === 'Y' ? '블라인드해제' : '블라인드처리';
					let blindClass = is_blind === 'Y' ? 'blind' : '';
					let blindIcon = is_blind === 'Y' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
					commentEl +=
						`<div class="card">
							<div class="card-body line-aqua ${blindClass}">
								<div class="row">
									<div class="flex-container left-wrap">
										<div class="col">
											<strong class="nickname">${nickname}</strong>
										</div>
										<div class="col">
											<p class="comment-1">${contents}</p>
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
											<button onclick="toggleBlind(this)" 
													data-idx="${comment_idx}" 
													data-blind="${blindYn}"
													data-type="parent"
													type="button"
													class="btn-blind ${blindClass}">
												${blindIcon} ${blindText}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>`
				}
			}
			else
				commentEl += `<p class="empty-message">작성된 댓글이 없습니다.</p>`
		}
		else
			sweetError(invalidResp(data));

		totalCount.html(data.size);
		commentWarp.html(commentEl);
	}

	function buildPagination(data)
	{
		let totalCount  = data.size;
		let lastPage	= Math.ceil(totalCount / selPageLength.val());

		pagination.html(paginate(currentPage, lastPage));
	}

	function onClickPageNum(obj)
	{
		$(obj).siblings().removeClass('current');
		$(obj).addClass('current');

		currentPage = $(obj).data('page');

		getComments();
	}

	function onChangeSelPageLength()
	{
		currentPage = 1;
		getComments();
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
			"board_comment_uuid": g_board_comment_uuid
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
						for (let { comment_idx, nickname, contents, is_blind, created } of data.data)
						{
							let blindYn = is_blind === 'Y' ? 'N' : 'Y';
							let blindText = is_blind === 'Y' ? '블라인드해제' : '블라인드처리';
							let blindClass = is_blind === 'Y' ? 'blind' : '';
							let blindIcon = is_blind === 'Y' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
							largeCommentsEl +=
								`<li class="${blindClass}">
									<div class="left-wrap">
										└
										<strong class="nickname">${nickname}</strong>
										<p class="comment-2">${contents}</p>
									</div>
									<div class="right-wrap">
										<span class="date">${created}</span>
										<button onclick="toggleBlind(this)" 
												data-idx="${comment_idx}" 
												data-blind="${blindYn}" 
												data-type="child"
												type="button"
												class="btn-blind ${blindClass}">
											${blindIcon} ${blindText}
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

	let g_blind_idx;
	let g_blind_yn;
	let g_comment_type;
	function toggleBlind(obj)
	{
		g_blind_idx = $(obj).data('idx');
		g_blind_yn = $(obj).data('blind');
		g_comment_type = $(obj).data('type');

		sweetConfirm(message.change, blindRequest);
	}

	function blindRequest()
	{
		let url = api.blindComment;
		let errMsg = `블라인드 ${message.ajaxError}`;
		let param = {
			"idx" : g_blind_idx,
			"is_blind" : g_blind_yn
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), toggleBlindCallback, errMsg, false);
	}

	function toggleBlindCallback(data)
	{
		sweetToastAndCallback(data, toggleSuccess);
	}

	function toggleSuccess()
	{
		g_comment_type === 'parent' ? getComments() : getLargeCommentsRequest();
	}
