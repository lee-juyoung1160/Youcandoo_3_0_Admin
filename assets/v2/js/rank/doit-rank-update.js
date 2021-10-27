
	import {ajaxRequestWithJson, headers, invalidResp, isSuccessResp} from '../modules/ajax-request.js';
	import { api } from '../modules/api-url.js';
	import {
		dataTable,
		updateTable,
		btnSubmit,
		btnAdd,
		btnSearch,
		title,
		dateRange,
		keyword,
		modalClose,
		modalBackdrop, lengthInput,
	} from '../modules/elements.js';
	import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from '../modules/alert.js';
	import {fadeoutModal, fadeinModal, limitInputLength, onErrorImage, calculateInputLength} from "../modules/common.js";
	import {
		initTableDefaultConfig,
		toggleBtnPreviousAndNextOnTable,
		checkBoxElement,
		tableReloadAndStayCurrentPage,
	} from '../modules/tables.js';
	import { label } from "../modules/label.js";
	import { message } from "../modules/message.js";
	import {isEmpty, numberWithCommas, getPathName, splitReverse} from "../modules/utils.js";
	import {page} from "../modules/page-url.js";

	let addedDoit = [];
	let addedDoitObj = [];
	let initialize = true;
	const pathName = getPathName();
	const weekOnRank = splitReverse(pathName, '/');

	$( () => {
		/** dataTable default config **/
		initTableDefaultConfig();
		getDetail();
		/** 이벤트 **/
		lengthInput 	.on("propertychange change keyup paste input", function () { limitInputLength(this); });
		modalClose		.on('click', function () { fadeoutModal(); });
		modalBackdrop	.on('click', function () { fadeoutModal(); });
		btnAdd			.on('click', function () { onClickBtnAdd(); });
		btnSearch		.on('click', function () { onSubmitSearchDoit(); });
		btnSubmit		.on('click', function () { onSubmitRank(); });
	});

	function getDetail()
	{
		ajaxRequestWithJson(true, `${api.rankList}/${weekOnRank}`, null)
			.then( async function( data, textStatus, jqXHR ) {
				isSuccessResp(data) ? getDetailCallback(data) : sweetToast(invalidResp(data));
			})
			.catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
	}

	function getDetailCallback(data)
	{
		buildDetail(data);

		data.data.map(doit => {
			const {doit_uuid, doit_title, doit_image_url, nickname, profile_uuid, grit, grit_per_person, score, join_user, opened} = doit;

			addedDoitObj.push({
				"doit_uuid" : doit_uuid,
				"doit_title" : doit_title,
				"doit_image_url" : doit_image_url,
				"nickname" : nickname,
				"profile_uuid" : profile_uuid,
				"grit" : grit,
				"grit_per_person" : grit_per_person,
				"score" : score,
				"join_user" : join_user,
				"opened" : opened
			})

			addedDoit.push(doit_uuid);
		})

		addedDoitObj.sort((a, b) => {
			if (a.grit_per_person === b.grit_per_person)
				return Number(b.join_user) - Number(a.join_user);

			return parseFloat(b.grit_per_person) - parseFloat(a.grit_per_person);
		});

		buildUpdateTable();
	}

	function buildDetail(data)
	{
		title.val(data.title);
		dateRange.text(`${data.start_date} ~ ${data.end_date}`);
		calculateInputLength();
	}

	function onClickBtnAdd()
	{
		fadeinModal();

		// if (addedDoitObj.length > 0)
		// 	addedDoitObj.map(doit => )

		initialize ? buildSearchDoitTable() : onSubmitSearchDoit();
		initialize = false;
	}

	function onSubmitSearchDoit()
	{
		const table = dataTable.DataTable();
		table.page.len(5);
		table.ajax.reload();
	}

	function buildSearchDoitTable()
	{
		dataTable.DataTable({
			ajax : {
				url: api.targetRankList,
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
						"page" : (d.start / d.length) + 1
						,"limit" : d.length
						,"doit_title" : keyword.val().trim()
					}

					return JSON.stringify(param);
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "썸네일",		data: "doit_image_url",    	width: "10%",
					render: function (data) {
						return `<div class="list-img-wrap doit-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "두잇명",	data: "doit_title",    		width: "35%" }
				,{title: "리더",		data: "nickname",    		width: "25%" }
				,{title: "참여자 수",	data: "join_user",   		width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "오픈일",	data: "opened",   			width: "15%",
					render: function (data) {
						return data.slice(0, 10);
					}
				}
				,{title: '', 		data: "doit_uuid",   		width: "5%",
					render: function (data, type, row, meta) {
						return checkBoxElement(meta.row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 5,
			select: {
				style: 'single',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
				onErrorImage();
				$(this).on( 'select.dt', function ( e, dt, type, indexes ) { onClickCheckBox(dt, indexes);});
			},
			fnRowCallback: function( nRow, aData ) {
				/** 이미 추가된 경우 체크박스 disabled **/
				const checkboxEl = $(nRow).children().eq(5).find('input');
				if (addedDoit.indexOf(aData.doit_uuid) > -1)
					$(checkboxEl).prop('disabled', true);
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function onClickCheckBox(dt, indexes)
	{
		if (addedDoitObj.length >= 30)
		{
			sweetToast('최대 30개까지 등록 가능합니다.');
			dt.rows(indexes).deselect();
			$("input[name=chk-row]").eq(indexes).prop('checked', false);
			return;
		}

		const selectedData = dt.rows(indexes).data()[0];
		addUser(selectedData);
	}

	function addUser(data)
	{
		const {doit_uuid, doit_title, doit_image_url, nickname, profile_uuid, grit, grit_per_person, score, join_user, opened} = data;
		addedDoitObj.push({
			"doit_uuid" : doit_uuid,
			"doit_title" : doit_title,
			"doit_image_url" : doit_image_url,
			"nickname" : nickname,
			"profile_uuid" : profile_uuid,
			"grit" : grit,
			"grit_per_person" : grit_per_person,
			"score" : score,
			"join_user" : join_user,
			"opened" : opened,
			"is_new" : 'Y',
		})

		addedDoitObj.sort((a, b) => {
			if (a.grit_per_person === b.grit_per_person)
				return Number(b.join_user) - Number(a.join_user);

			return parseFloat(b.grit_per_person) - parseFloat(a.grit_per_person);
		});

		addedDoit.push(doit_uuid);

		buildUpdateTable();
	}

	function buildUpdateTable()
	{
		updateTable.DataTable({
			data: addedDoitObj,
			columns: [
				{title: "썸네일",			data: "doit_image_url",    	width: "10%",
					render: function (data) {
						return `<div class="list-img-wrap doit-img-wrap"><img src="${data}" alt=""></div>`;
					}
				}
				,{title: "두잇명",		data: "doit_title",    		width: "15%" }
				,{title: "리더",			data: "nickname",    		width: "20%" }
				,{title: "참여자 수",		data: "join_user",   		width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "월간 리더 스코어",	data: "score",    		width: "10%",
					render: function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "월간 열정지수",		data: "grit",  			width: "10%",
					render: function (data) {
						return Math.round(Number(data) * 100) / 100;
					}
				}
				,{title: "인당 열정지수",	data: "grit_per_person",    width: "10%",
					render: function (data) {
						return Math.round(Number(data) * 100) / 100;
					}
				}
				,{title: "오픈일",		data: "opened",   			width: "15%",
					render: function (data) {
						return data.slice(0, 10);
					}
				}
				,{title: "",    		data: "doit_uuid",  		width: "5%",
					render: function (data, type, row, meta) {
						return `<button type="button" class="btn-xs btn-text-red delete-btn" data-rownum="${meta.row}"><i class="fas fa-minus-circle"></i></button>`;
					}
				}
			],
			language: {
				emptyTable: '두잇을 추가해주세요.\n(최소5개 ~ 최대30개)'
			},
			serverSide: false,
			paging: false,
			select: false,
			destroy: true,
			initComplete: function () {
				if (!initialize)
					tableReloadAndStayCurrentPage(dataTable);
			},
			fnRowCallback: function( nRow, aData ) {
				$(nRow).attr('id', aData.doit_uuid);
				$(nRow).children().eq(8).find('button').on('click', function () { removeRow(this); });
				if (aData.is_new === 'Y')
					$(nRow).addClass('selected');
			},
			drawCallback: function (settings) {
				onErrorImage();
			}
		});
	}

	function removeRow(obj)
	{
		let table = updateTable.DataTable();
		table.row($(obj).closest('tr')).remove().draw(false);

		initAddedDoitData();
	}

	function initAddedDoitData()
	{
		addedDoit.length = 0;
		addedDoitObj.length = 0;

		let table = updateTable.DataTable();
		const tableData = table.rows().data();
		if (tableData.length > 0)
		{
			for (let i=0; i<tableData.length; i++)
			{
				const {doit_uuid, doit_title, doit_image_url, nickname, profile_uuid, grit, grit_per_person, score, join_user, opened} = tableData[i];

				addedDoit.push(doit_uuid)
				addedDoitObj.push({
					"doit_uuid" : doit_uuid,
					"doit_title" : doit_title,
					"doit_image_url" : doit_image_url,
					"nickname" : nickname,
					"profile_uuid" : profile_uuid,
					"grit" : grit,
					"grit_per_person" : grit_per_person,
					"score" : score,
					"join_user" : join_user,
					"opened" : opened,
				});
			}

			addedDoitObj.sort((a, b) => {
				if (a.grit_per_person === b.grit_per_person)
					return Number(b.join_user) - Number(a.join_user);

				return parseFloat(b.grit_per_person) - parseFloat(a.grit_per_person);
			});
		}
	}

	function onSubmitRank()
	{
		if (validation())
			sweetConfirm(message.modify, updateRequest)
	}

	function validation()
	{
		if (addedDoitObj.length < 5)
		{
			sweetToast('두잇을 5개 이상 등록해주세요.');
			return false;
		}

		if (isEmpty(title.val()))
		{
			sweetToast(`랭킹 명을 ${message.input}`);
			title.trigger('focus');
			return false;
		}

		if (addedDoitObj.length === 0)
		{
			sweetToast(`두잇을 ${message.addOn}`);
			return false;
		}

		return true;
	}

	function updateRequest()
	{
		const doitList = addedDoitObj.map(doit => {
			return {
				"doit_uuid" : doit.doit_uuid,
				"join_user" : doit.join_user,
				"grit" : doit.grit,
				"grit_per_person" : doit.grit_per_person,
				"profile_uuid" : doit.profile_uuid,
				"score" : doit.score
			}
		})
		const param = {
			"week" : weekOnRank,
			"title" : title.val().trim(),
			"doit_list" : doitList
		}

		ajaxRequestWithJson(true, api.createRank, JSON.stringify(param))
			.then( async function( data, textStatus, jqXHR ) {
				await sweetToastAndCallback(data, updateSuccess);
			})
			.catch(reject => sweetError(label.modify + message.ajaxError));
	}

	function updateSuccess()
	{
		location.href = page.listRank;
	}
