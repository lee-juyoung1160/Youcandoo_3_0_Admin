
	import {actionCommentCount, actionContent, actionCreated, actionDetailForm, actionLikeCount, actionListForm, actionsWrap, actionThumbnail,
		chkActionStatus, modalBackdrop, modalReplyAction, modalWarning, searchActionDateFrom, searchActionDateTo, selActionMissions,} from "../modules/elements.js";
	import {initSelectOption, overflowHidden, onErrorImage} from "../modules/common.js";
	import {api} from "../modules/api-url.js";
	import {label} from "../modules/label.js";
	import {message} from "../modules/message.js";
	import {g_doit_uuid} from "./doit-detail-info.js";
	import {ajaxRequestWithJsonData, isSuccessResp} from "../modules/request.js";
	import {sweetToast} from "../modules/alert.js";

	export function showActionListForm()
	{
		actionListForm.show();
		actionDetailForm.hide();
	}

	export function showDetailAction()
	{
		actionDetailForm.show();
		actionListForm.hide();
	}

	export function initSearchActionForm()
	{
		searchActionDateFrom.datepicker("setDate", "-6D");
		searchActionDateTo.datepicker("setDate", "today");
		chkActionStatus.eq(0).prop('checked', true);
		chkActionStatus.eq(1).prop('checked', true);
		chkActionStatus.eq(2).prop('checked', true);
		initSelectOption();
	}

	export function getMissionListForAction()
	{
		const url = api.missionList;
		const errMsg = `미션 목록 ${message.ajaxLoadError}`;
		const param = {
			"doit_uuid" : g_doit_uuid
		}

		ajaxRequestWithJsonData(false, url, JSON.stringify(param), getMissionListForActionCallback, errMsg, false);
	}

	function getMissionListForActionCallback(data)
	{
		isSuccessResp(data) ? buildSelActionMission(data) : sweetToast(data.msg);
	}

	function buildSelActionMission(data)
	{
		const missions = data.data;
		let options = '<option value="all">전체</option>';
		if (missions.length > 0)
			missions.map(obj => { options += `<option value="${obj.mission_uuid}">${obj.mission_title}</option>` });

		selActionMissions.html(options);

		getActionList();
	}

	export function getActionList()
	{
		/*const url = api.actionList;
		const errMsg = label.list+message.ajaxLoadError;
		let actionStatus = [];
		chkActionStatus.each(function () {
			if ($(this).is(":checked"))
				actionStatus.push($(this).val())
		})
		const param = {
			"doit_uuid" : g_doit_uuid,
			"date_type" : selActionDateType.val(),
			"from_date" : searchActionDateFrom.val(),
			"to_date" : searchActionDateTo.val(),
			"mission_uuid" : selMissions.val(),
			"state" : actionStatus
		}

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getActionListCallback, errMsg, false);*/
		buildActions();
	}

	function getActionListCallback(data)
	{
		isSuccessResp(data) ? buildActions(data) : sweetToast(data.msg);
	}

	function buildActions(data)
	{
		let actionEl = '';
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

		$(".img-wrap").on('click', function () { onClickAction(this); })
	}

	function onClickAction(obj)
	{
		showDetailAction();
		//getDetailAction(obj);
	}

	function getDetailAction(obj)
	{
		const url = api.detailAction;
		const errMsg = label.detailContent + message.ajaxLoadError;
		const param = { "uuid" : $(obj).data('uuid') };

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), getDetailActionCallback, errMsg, false);
	}

	function getDetailActionCallback(data)
	{
		isSuccessResp(data) ? buildDetailAction(data) : sweetToast(data.msg);
	}

	function buildDetailAction(data)
	{
		actionCreated.text();
		actionLikeCount.text();
		actionCommentCount.text();
		actionThumbnail.attr('src', '');
		actionContent.text();j

		onErrorImage();

		buildActionComments();
	}

	function buildActionComments(data)
	{
		`<div class="card">
			<div class="top clearfix">
				<p class="title">
					유캔두 <span class="desc-sub">2020-02-02 00:00:00</span>
				</p>
				<div class="right-wrap">
					<button type="button" class="btn-xs btn-danger">삭제</button>
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
				<span><i class="fas fa-comments"></i>  <a class="link">111</a></span>
				<a id="testReplyAction" class="link">답글달기</a>
				<!-- 답글달기 -->
				<div class="modal-content comments-creat" id="modalReplyAction">
					<div class="modal-header clearfix">
						<h5>답글달기</h5>
						<i class="modal-close">×</i>
					</div>
					<div class="modal-body">
						<table class="detail-table">
							<colgroup>
								<col style="width: 20%;">
								<col style="width: 70%;">
							</colgroup>
							<tr>
								<td colspan="2">
									<div class="textarea-wrap">
										<textarea id="replyAction" class="length-input" maxlength="100" rows="4" placeholder="댓글을 입력해주세요."></textarea>
										<p class="length-count-wrap"><span class="count-input">0</span>/100</p>
									</div>
								</td>
							</tr>
							<tr>
								<th>
									첨부파일
								</th>
								<td>
									<div class="file-wrap preview-image">
										<input class="upload-name" value="파일선택" disabled="disabled">
										<label for="replyActionImage">업로드</label>
										<input type="file" id="replyActionImage" class="upload-hidden">
									</div>
									<div class="detail-img-wrap">
										<img src="/assets/v2/img/profile-1.png" alt="프로필이미지">
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<div class="right-wrap">
										<button id="btnSubmitActionReply" type="button" class="btn-sm btn-primary">등록</button>
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>

			<div class="comments-wrap">
				<ul>
					<li>
						<div class="top clearfix">
							<p class="title">
								ㄴ 베리네모카 <span class="desc-sub">2020-02-02 00:00:00</span>
							</p>
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
						</div>
						<div class="detail-data">
							대박사건... 인증계를 뒤집어놓으셨다...!
						</div>
					</li>
				</ul>
			</div>
		</div>`
	}

	export function onClickModalWarnOpen()
	{
		modalWarning.fadeIn();
		modalBackdrop.fadeIn();
		overflowHidden();
	}

	export function onClickModalReplyActionOpen()
	{
		modalReplyAction.fadeIn();
		overflowHidden();
	}

