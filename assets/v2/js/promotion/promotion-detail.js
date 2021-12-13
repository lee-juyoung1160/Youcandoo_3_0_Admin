
	import {ajaxRequestWithJson, headers, isSuccessResp, invalidResp} from "../modules/ajax-request.js";
	import { api } from '../modules/api-url.js';
	import {title, btnBack, btnList, btnUpdate, selPageLength, dataTable, btnClose,
		sponsor, promotionDate, createDate} from '../modules/elements.js';
	import {sweetToast, sweetToastAndCallback, sweetConfirm, sweetError} from '../modules/alert.js';
	import {historyBack, onErrorImage, initPageLength,} from "../modules/common.js";
	import {getPathName, splitReverse,} from "../modules/utils.js";
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import { page } from "../modules/page-url.js";
	import {buildTotalCount, initTableDefaultConfig, toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";

	const pathName	= getPathName();
	const promotionIdx	= splitReverse(pathName, '/');

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		/** n개씩 보기 초기화 **/
		initPageLength(selPageLength);
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		selPageLength	.on("change", function () { buildDoitTable(); });
		btnBack	 		.on('click', function () { historyBack(); });
		btnList	 		.on('click', function () { goListPage(); });
		btnUpdate		.on('click', function () { goUpdatePage(); });
		btnClose		.on('click', function () { onSubmitClosePromotion(); });
	});

	function getDetail()
	{
		const param = { "idx" : promotionIdx }

		ajaxRequestWithJson(true, api.detailPromotion, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getDetailSuccess(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	let g_promotion_uuid;
	function getDetailSuccess(data)
	{
		g_promotion_uuid = data.data.promotion_uuid;
		buildDetail(data);
		buildDoitTable();
	}

	function buildDetail(data)
	{
		const { nickname, start_date, end_date, start_time, end_time, created, state } = data.data;

		if (state === '진행중') btnClose.show();
		if (state === '종료')
		{
			btnClose.remove();
			btnUpdate.remove();
		}

		title.html(buildTitle(data));
		sponsor.text(nickname);
		promotionDate.text(`${start_date} ${start_time} ~ ${end_date} ${end_time}`);
		createDate.text(created.substring(0, 10));

		onErrorImage();
	}

	function buildTitle(data)
	{
		const { promotion_title, state } = data.data;

		switch (state) {
			case '대기중' :
				return `<span class="badge badge-info">${state}</span> ${promotion_title}`;
			case '진행중' :
				return `<span class="badge badge-success">${state}</span> ${promotion_title}`;
			case '종료' :
				return `<span class="badge badge-warning">${state}</span> ${promotion_title}`;
			default :
				return `<span class="badge badge-info">${state}</span> ${promotion_title}`;
		}
	}

	function buildDoitTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.promotionDoitList,
				type:"POST",
				headers: headers,
				global: false,
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
						"promotion_uuid" : g_promotion_uuid,
						"page" : (d.start / d.length) + 1,
						"limit" : d.length
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError('두잇'+label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "카테고리",    	data: "category_title",  		width: "20%" }
				,{title: "세부 카테고리",   data: "subcategory_title",  	width: "20%" }
				,{title: "두잇명",    	data: "doit_title",  			width: "40%",
					render: function (data, type, row, meta) {
						return `<a href="${page.detailDoit}${row.doit_idx}">${data}</a>`
					}
				}
				,{title: "리더",   		data: "nickname",  				width: "20%",
					render: function (data, type, row, meta) {
						return row.is_company === 'Y' ? label.bizIcon + data : data;
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

	function onSubmitClosePromotion()
	{
		sweetConfirm(message.close, deleteRequest);
	}

	function deleteRequest()
	{
		const param = { "promotion_uuid" : g_promotion_uuid }

		ajaxRequestWithJson(true, api.closePromotion, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, getDetail);
			})
			.catch(reject => sweetError(label.delete + message.ajaxError));
	}

	function goListPage()
	{
		location.href = page.listPromotion;
	}

	function goUpdatePage()
	{
		location.href = page.updatePromotion + promotionIdx;
	}
