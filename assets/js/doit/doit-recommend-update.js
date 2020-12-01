
	const recommendTitle	= $("#recommendTitle");
	const exposure		= $("input[name=radio-exposure]");
	const recommendedTable	= $("#recommendedTable");
	const btnSubmit		= $("#btnSubmit");
	const keyword		= $("#keyword");
	const btnAdd		= $("#btnAdd");
	const doitTable		= $("#doitTable");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 상세 불러오기 **/
		getDetail();
		/** 이벤트 **/
		btnAdd			.on("click", function () { addRecommend(); });
		keyword    		.on("keyup", function () { onSubmitSearch(); });
		btnSubmit		.on("click", function () { onSubmitRecommend(); });
	});

	function disableSort()
	{
		recommendedTable.find('tbody').sortable("option", "disabled", true);
	}

	function enableSort()
	{
		recommendedTable.find('tbody').sortable("option", "disabled", false);
	}

	function initSortTable()
	{
		recommendedTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	}

	function addAttrDragonElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*10)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*65)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*15)+'px');
		$(tdElement[3]).css("width", Math.ceil(($(el).width()/100)*5)+'px');
		return $(el);
	}

	function getDetail()
	{
		let url 	= api.detailDoitRecommend;
		let errMsg 	= label.detailContent+message.ajaxLoadError;

		ajaxRequestWithJsonData(false, url, detailParams(), getDetailCallback, errMsg, false);
	}

	function detailParams()
	{
		const pathName	= getPathName();
		const recommendIdx	= splitReverse(pathName, '/');

		return JSON.stringify({"idx" : recommendIdx});
	}

	function getDetailCallback(data)
	{
		isSuccessResp(data) ? buildDetail(data) : sweetError(invalidResp(data));
	}

	let g_recommend_uuid;
	function buildDetail(data)
	{
		let { title, is_exposure, recommend_uuid } = data.data.recommend;

		g_recommend_uuid = recommend_uuid;
		recommendTitle.val(title);
		checkInputLength(recommendTitle);
		exposure.each(function () {
			if ($(this).val() === is_exposure)
				$(this).prop('checked', true);
		});
		getDoitSearch();
		buildRecommended(data.data.recommend_doit);
		/** 테이블 drag and drop 정렬 초기화 **/
		initSortTable();
	}

	let g_recommend = [];
	function buildRecommended(_data)
	{
		recommendedTable.DataTable({
			data: _data,
			columns: [
				{title: "",		data: "doit_uuid",		width: "10%",
					render: function (data, type, row, meta) {
						return buildThumbnail(row);
					}
				}
				,{title: "", 	data: "doit_uuid",    	width: "65%",
					render: function (data, type, row, meta) {
						return buildRecommendDetail(row);
					}
				}
				,{title: "", 	data: "doit_status",    width: "15%",
					render: function (data) {
						return buildDoitStatus(data);
					}
				}
				,{title: "", 	data: "doit_uuid", 		width: "5%",
					render: function (data) {
						return `<i onclick="removeRow(this);" onmouseenter="disableSort();" onmouseleave="enableSort();" data-uuid="${data}" class="far fa-times-circle"></i>`
					}
				}
			],
			serverSide: false,
			paging: false,
			select: false,
			destroy: false,
			initComplete: function () {
				/** 데이터 없을 때 조회결과없음 로우 엘리먼트 삭제 **/
				if (!hasDataOnDatatable(this))
					removeEmptyRowFromTable();
			},
			fnRowCallback: function( nRow, aData ) {
				setRecommendedRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
			}
		});
	}

	function buildRecommendDetail(data)
	{
		let title 	  = data.doit_title;
		let tags 	  = data.doit_tags;
		if (!isEmpty(tags))
			tags = tags.split(',');
		let nickname  = data.nickname;
		let memberCnt = data.member_count;

		let detailEl = '';
		detailEl +=
				`<div class="doit-detail-info">
					<ul class="tag clearfix">`
		if (!isEmpty(tags))
		{
			for (let j=0; j<tags.length; j++)
			{
				let tag = tags[j];
				if (!isEmpty(tag))
					detailEl += `<li>${tag}</li>`;
			}
		}

		detailEl +=
				`</ul>
					 <p class="doit-tit">${title}</p>
					 <p class="doit-leader"><strong>개설자 : </strong><span>${nickname}</span></p>
					 <p class="doit-num"><strong>참여자 수: </strong><span>${memberCnt}</span></p>
				</div>`

		return detailEl;
	}

	function buildDoitStatus(data)
	{
		let classOn = '';
		let comment = '';
		if (data !== '모집중')
		{
			classOn = 'on'
			comment = '<em class="state-msg">삭제가 필요합니다.</em>';
		}

		return (
			`<div class="doit-state">
				<span class="icon-state ${classOn}">${data}</span>
				${comment}
			</div>`
		)
	}

	function setRecommendedRowAttributes(nRow, aData)
	{
		$(nRow).prop('id', aData.doit_uuid);
	}

	function removeRow(obj)
	{
		let doitUuid = $(obj).data('uuid');
		let targetId = "#"+doitUuid

		$(targetId).remove();

		initDisableCheckbox();
		tableReloadAndStayCurrentPage(doitTable);
	}

	function getDoitSearch()
	{
		doitTable.DataTable({
			ajax : {
				url: api.listDoitRecommendSearch,
				type:"POST",
				global: false,
				headers: headers,
				data: function (d) {
					return doitSearchParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "", 	data: "doit_uuid",   width: "5px",
					render: function (data, type, row, meta) {
						return multiCheckBoxDom(meta.row);
					}
				},
				{title: "",		data: "doit_uuid",		width: "60px",
					render: function (data, type, row, meta) {
						return buildThumbnail(row);
					}
				}
				,{title: "", 	data: "doit_uuid",
					render: function (data, type, row, meta) {
						return buildDetailRow(row);
					}
				}
			],
			serverSide: true,
			paging: true,
			pageLength: 5,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setDoitRowAttributes(nRow, aData);
			},
			drawCallback: function (settings) {
				toggleBtnPreviousAndNextOnTable(this);
			}
		});
	}

	function buildThumbnail(data)
	{
		return (
			`<div class="doit-thumbnail">
				<img src="${data.doit_image_url}" onerror="onErrorImage(this);">
			</div>`
		)
	}

	function buildDetailRow(data)
	{
		return (
			`<div class="doit-detail-info">
				<p class="doit-tit">${data.doit_title}</p>
				<p class="doit-leader"><strong>개설자 : </strong><span>${data.nickname}</span></p>
				<p class="doit-num"><strong>참여자 수: </strong><span>${data.member_count}</span></p>
			</div>`
		)
	}

	function setDoitRowAttributes(nRow, aData)
	{
		let checkDom = $(nRow).children().eq(0);
		/** 이미 배너 목록에 있는 경우 체크박스 삭제 **/
		if (g_recommend.indexOf(aData.doit_uuid) !== -1)
			$(checkDom).children().prop('disabled', true);
	}

	function doitSearchParams()
	{
		let table = doitTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"page" : _page
			,"limit" : info.length
			,"doit_title" : keyword.val()
			,"recommend_uuid" : g_recommend_uuid
		}

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = doitTable.DataTable();
		table.ajax.reload();
	}

	function addRecommend()
	{
		if (addValidation())
		{
			$(".dataTables_empty").parent().remove();

			let table 		 = doitTable.DataTable();
			let selectedData = table.rows('.selected').data();
			let rowDom = '';

			for (let i=0; i<selectedData.length; i++)
			{
				let { doit_uuid, doit_image_url, doit_title, doit_tags, nickname, member_count } = selectedData[i];
				let tags  = doit_tags.split(',');
				let tagEl = '';
				for (let j=0; j<tags.length; j++)
				{
					let tag = tags[j];
					if (!isEmpty(tag))
						tagEl += `<li>${tag}</li>`
				}
				rowDom +=
					`<tr id="${doit_uuid}">
						<td>
							<div class="doit-thumbnail">
								<img src="${doit_image_url}" alt="" onerror="onErrorImage(this);">
							</div>
						</td>
						<td>
							<div class="doit-detail-info">
								<ul class="tag clearfix">
									tagEl
								</ul>
								<p class="doit-tit">${doit_title}</p>
								<p class="doit-leader"><strong>개설자 : </strong><span>${nickname}</span></p>
								<p class="doit-num"><strong>참여자 수: </strong><span>${member_count}</span></p>
							</div>	
						</td>
						<td>
							<div class="doit-state">
								<span class="icon-state">모집중</span>
							</div>
						</td>
						<td>
							<i onclick="removeRow(this);" 
								onmouseenter="disableSort();" 
								onmouseleave="enableSort();" 
								data-uuid="${doit_uuid}" 
								class="far fa-times-circle"></i>
						</td>
					</tr>`
			}

			let targetTableBody = recommendedTable.find('tbody');
			targetTableBody.append(rowDom);

			initDisableCheckbox();
			tableReloadAndStayCurrentPage(doitTable);
			recommendedTable.find('tbody').sortable("destroy");
			/** 테이블 drag and drop 정렬 초기화 **/
			initSortTable();
		}
	}

	function addValidation()
	{
		let table 		 = doitTable.DataTable();
		let selectedData = table.rows('.selected').data();
		let rows 	 	 = getRecommendRows();

		let ids = [];
		for (let i=0; i<rows.length; i++)
			ids.push(rows[i].id)

		let vacancy = 10 - ids.length;

		if (isEmpty(selectedData))
		{
			sweetToast(`추가할 두잇을 ${message.select}`);
			return false;
		}

		if (selectedData.length > vacancy)
		{
			let msg = `추천 두잇은 ${message.maxAddTen}
						추가할 수 있는 두잇 수: ${vacancy}`
			sweetToast(msg);
			return false;
		}

		return true;
	}

	function getRecommendRows()
	{
		return recommendedTable.find('tbody').children();
	}

	function initDisableCheckbox()
	{
		g_recommend.length = 0;
		recommendedTable.find('tbody').children().each(function () {
			g_recommend.push(this.id);
		});
	}

	function onSubmitRecommend()
	{
		if (submitValidation())
			sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let rows 	= recommendedTable.find('tbody').children();
		let ids 	= [];
		for (let i=0; i<rows.length; i++)
			ids.push(rows[i].id)

		let param   = {
			"recommend_uuid" : g_recommend_uuid,
			"title" : recommendTitle.val().trim(),
			"is_exposure" : $("input[name=radio-exposure]:checked").val(),
			"doit_uuid" : ids
		};
		let url 	= api.updateDoitRecommendv2;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, JSON.stringify(param), createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		location.href = page.listDoitRecommendv2;
	}

	function submitValidation()
	{
		if (isEmpty(recommendTitle.val()))
		{
			sweetToast(`큐레이션명은 ${message.required}`);
			recommendTitle.trigger('focus');
			return false;
		}

		let rows = getRecommendRows();
		if (rows.length === 0)
		{
			sweetToast(`추천 두잇을 ${message.addOn}`);
			return false;
		}

		return true;
	}
