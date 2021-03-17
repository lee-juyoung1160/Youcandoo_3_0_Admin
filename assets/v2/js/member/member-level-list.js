
	import { headers } from '../modules/request.js';
	import { api } from '../modules/api-url.js';
	import {cardLevel1, cardLevel2, cardLevel3, cardLevel4, cardLevel5, cardLevelSpecial, selPageLength,} from '../modules/elements.js';
	import { sweetError } from  '../modules/alert.js';
	import {initPageLength} from "../modules/common.js";
	import {initTableDefaultConfig, buildTotalCount, toggleBtnPreviousAndNextOnTable,} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 목록 불러오기 **/
		//buildTable();
		/** 이벤트 **/
		cardLevel1	.on("click", function () { onClickBtnCard(this); });
		cardLevel2	.on("click", function () { onClickBtnCard(this); });
		cardLevel3	.on("click", function () { onClickBtnCard(this); });
		cardLevel4	.on("click", function () { onClickBtnCard(this); });
		cardLevel5	.on("click", function () { onClickBtnCard(this); });
		cardLevelSpecial.on("click", function () { onClickBtnCard(this); });
	});

	function onClickBtnCard(obj)
	{
		toggleActive(obj);
	}

	function toggleActive(obj)
	{
		$(".row.top .card").removeClass('active');
		$(obj).addClass('active');
	}

	function buildTable()
	{
		dataTable.empty();

		dataTable.DataTable({
			ajax : {
				url: api.levelMemberList,
				type: "POST",
				headers: headers,
				dataFilter: function(data){
					let json = JSON.parse(data);
					json.recordsTotal = json.count;
					json.recordsFiltered = json.count;

					return JSON.stringify(json);
				},
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "기업 ID",    	data: "company_uuid",  	width: "40%" }
				,{title: "기업명", 		data: "nickname",		width: "25%",
					render: function (data, type, row, meta) {
						let detailUrl = page.detailBiz + row.idx;
						return `<a href="${detailUrl}">${data}</a>`;
					}
				}
				,{title: "등록일",    	data: "created",  		width: "15%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: Number(selPageLength.val()),
			select: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
				buildTotalCount(this);
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function tableParams()
	{
		const param = {
			"search_type" : selSearchType.val(),
			"keyword" : keyword.val().trim(),
			"page": _currentPage,
			"limit": selPageLength.val(),
		}

		return JSON.stringify(param);
	}
