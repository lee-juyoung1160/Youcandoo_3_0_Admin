
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {countLevel1, countLevel2, countLevel3, countLevel4, countLevel5, countLevel6, selPageLength, dataTable,} from '../modules/elements.js';
	import {sweetError, sweetToast} from '../modules/alert.js';
	import {initPageLength} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {numberWithCommas} from "../modules/utils.js";
	import {page} from "../modules/page-url.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 목록 불러오기 **/
		getCountPerLevel();
		buildTable();
		/** 이벤트 **/
		$(".row.top .card").on("click", function () { onClickBtnCard(this); });
		selPageLength.on('change', function () { tableReload(); });
	});

	function onClickBtnCard(obj)
	{
		toggleActive(obj);
		tableReload();
	}

	function tableReload()
	{
		const table = dataTable.DataTable();
		table.page.len(Number(selPageLength.val()));
		table.ajax.reload();
	}

	function toggleActive(obj)
	{
		$(".row.top .card").removeClass('active');
		$(obj).addClass('active');
	}

	function getCountPerLevel()
	{
		ajaxRequestWithJson(false, api.countPerLevel, null)
			.then( async function( data, textStatus, jqXHR ) {
				await isSuccessResp(data) ? buildCountPerLevel(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetToast(`레벨 별 회원 수${message.ajaxError}`));
	}

	function buildCountPerLevel(data)
	{
		const { level1, level2, level3, level4, level5, level6, } = data.data;
		countLevel1.text(numberWithCommas(level1));
		countLevel2.text(numberWithCommas(level2));
		countLevel3.text(numberWithCommas(level3));
		countLevel4.text(numberWithCommas(level4));
		countLevel5.text(numberWithCommas(level5));
		countLevel6.text(numberWithCommas(level6));
	}

	function buildTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.memberLevelList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					if (isSuccessResp(json))
					{
						json.recordsTotal = json.count;
						json.recordsFiltered = json.count;
					}
					else
					{
						json.data = [];
						sweetToast(invalidResp(json));
					}

					return JSON.stringify(json);
				},
				data: function (d) {
					const param = {
						"level" : getLevel(),
						"page": (d.start / d.length) + 1,
						"limit": selPageLength.val(),
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "닉네임",    		data: "nickname",  		width: "40%",
					render: function (data, type, row, meta) {
						return row.is_company === 'Y' ? label.bizIcon + data : `<a data-uuid="${row.profile_uuid}">${data}</a>`;
					}
				}
				,{title: "PID",    		data: "profile_uuid",  	width: "35%" }
				,{title: "누적 인증 수", 	data: "action_count",	width: "10%",
					render: function (data, type, row, meta) {
						return numberWithCommas(data);
					}
				}
				,{title: "가입일시",    	data: "created",  		width: "15%" }
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				if (aData.is_company === 'N')
					$(nRow).children().eq(0).find('a').on('click', function () { onClickNickname(this); });
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function getLevel()
	{
		const selectedEl = $(".row.top .card.active");
		return $(selectedEl)[0].id;
	}

	function onClickNickname(obj)
	{
		let form   = $("<form></form>");
		form.prop("method", "post");
		form.prop("action", page.detailMember);
		form.append($("<input/>", {type: 'hidden', name: 'profile_uuid', value: $(obj).data('uuid')}));
		form.appendTo("body");
		form.trigger('submit');
	}
