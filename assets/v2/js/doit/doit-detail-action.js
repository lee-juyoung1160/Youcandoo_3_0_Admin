
	import {
	actionDetailForm,
	actionListForm,
	actionsWrap,
	chkActionStatus,
	modalBackdrop,
	modalReplyAction,
	modalWarning,
	searchActionDateFrom,
	searchActionDateTo, selActionMissions,
} from "../modules/elements.js";
	import {initSelectOption, overflowHidden} from "../modules/common.js";
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

	export function onClickAction()
	{
		actionDetailForm.show();
		actionListForm.hide();
		viewDetail();
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

	export function viewDetail()
	{

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

