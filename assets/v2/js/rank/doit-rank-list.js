
	import {ajaxRequestWithJson, invalidResp, isSuccessResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {dataTable, selWeekly, btnUpdate, title, dateRange, btnCreate} from '../modules/elements.js';
	import {sweetError, sweetToast} from '../modules/alert.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty} from "../modules/utils.js";
	import {page} from "../modules/page-url.js";

	let rankObj = [];

	$( () => {
		/** n개씩 보기 초기화 **/
		getWeek();
		/** 이벤트 **/
		selWeekly.on('change', function () { onChangeSelWeekly(); });
		btnUpdate.on('click', function () { onClickBtnUpdate(); });
		btnCreate.on('click', function () { onClickBtnCreate(); });
	});

	function getWeek()
	{
		ajaxRequestWithJson(false, api.getWeek, null)
			.then( async function( data, textStatus, jqXHR ) {
				if (isSuccessResp(data))
				{
					rankObj = data.data;
					await buildSelWeekly();
					await onChangeSelWeekly();
				}
				else
					sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(`주 목록${message.ajaxLoadError}`));
	}

	function buildSelWeekly()
	{
		isEmpty(rankObj)
			? selWeekly.append(`<option value="">${label.dash}</option>`)
			: rankObj.map(rank => selWeekly.append(`<option value="${rank.week}">${rank.week_name}</option>`));
	}

	function buildTitle()
	{
		if (rankObj.length > 0)
		{
			const selectedWeekData = rankObj.filter(rank => rank.week === selWeekly.val());
			if (!isEmpty(selectedWeekData) && selectedWeekData.length > 0)
			{
				const currentDate = new Date();
				const startDate = new Date(selectedWeekData[0].start_date);
				currentDate < startDate ? btnUpdate.show() : btnUpdate.hide();
				title.text(isEmpty(selectedWeekData) ? label.dash : selectedWeekData[0].title);
				dateRange.text(isEmpty(selectedWeekData) ? label.dash : `${selectedWeekData[0].start_date} ~ ${selectedWeekData[0].end_date}`);
			}
		}
	}

	function buildRankTable()
	{
		dataTable.find('tbody').empty();
		if (rankObj.length > 0)
		{
			const selectedWeekData = rankObj.filter(rank => rank.week === selWeekly.val());
			if (!isEmpty(selectedWeekData) && selectedWeekData.length > 0)
			{
				selectedWeekData[0].doit_list.map((doit, index) => {
					const rowEl =
						`<tr>
							<td><p class="lank-num lank-top">${index + 1}</p></td>
							<td class="txt-left"><a href="${page.detailDoit}${doit.idx}">${doit.doit_title}</a></td>
						</tr>`

					dataTable.find('tbody').append(rowEl);
				})
			}
		}
	}

	function onChangeSelWeekly()
	{
		buildTitle();
		buildRankTable();
	}

	function onClickBtnUpdate()
	{
		location.href = page.updateRank + selWeekly.val();
	}

	function onClickBtnCreate()
	{
		const currentDate = new Date();
		const startDate = new Date(isEmpty(rankObj[0]) ? currentDate : rankObj[0].start_date);

		if (currentDate < startDate)
		{
			sweetToast('차주에 예정된 랭킹이 있습니다.');
			return;
		}

		location.href = page.createRank;
	}
