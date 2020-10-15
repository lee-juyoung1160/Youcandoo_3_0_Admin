
	const recommendTitle	= $("#recommendTitle");
	const exposure		= $("input[name=radio-exposure]");
	const recommendedTable	= $("#recommendedTable");
	const btnSubmit		= $("#btnSubmit");
	const keyword		= $("#keyword");
	const btnAdd		= $("#btnAdd");
	const doitTable		= $("#doitTable");
	let g_recommend = [];

	$( () => {
		initForm();
		initSortTable();
		/** 추천 두잇 데이터 로드 **/
		getDoit();
		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam("");
		/** 이벤트 **/
		btnAdd		.on("click", function () { addRecommend(); });
		keyword    	.on("keyup", function () { onSubmitSearch(); });
		btnSubmit	.on("click", function () { onSubmitRecommend(); });
	});

	function initForm()
	{
		recommendTitle.trigger("focus");
		exposure.eq(0).prop('checked', true);
	}

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

	function removeRow(obj)
	{
		let doitUuid = $(obj).data('uuid');
		let targetId = "#"+doitUuid

		$(targetId).remove();

		initDisableCheckbox();
		tableReloadAndStayCurrentPage(doitTable);
	}

	function getDoit()
	{
		doitTable.DataTable({
			ajax : {
				url: api.listDoitRecommendSearch,
				type:"POST",
				global: false,
				headers: headers,
				data: function (d) {
					return doitParams();
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
						return buildDetail(row);
					}
				}
			],
			language: {
				emptyTable : message.emptyList
				,zeroRecords: message.emptyList
				,processing: message.searching
				,paginate: {
					previous: label.previous
					,next: label.next
				}
			},
			processing: false,
			serverSide: true,
			paging: true,
			pageLength: 5,
			/*pagingType: "simple_numbers_no_ellipses",*/
			ordering: false,
			order: [],
			info: false,
			select: {
				style: 'multi',
				selector: ':checkbox'
			},
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
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

	function buildDetail(data)
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

	function doitParams()
	{
		let table = doitTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;

		let param = {
			"page" : _page
			,"limit" : info.length
			,"doit_title" : keyword.val()
			,"recommend_uuid" : ""
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
		/*if (addValidation())
		{*/
			let table 		 = doitTable.DataTable();
			let selectedData = table.rows('.selected').data();
			let rowDom = '';

			for (let i=0; i<selectedData.length; i++)
			{
				let uuid 	  = selectedData[i].doit_uuid;
				let imageUrl  = selectedData[i].doit_image_url;
				let title 	  = selectedData[i].doit_title;
				let tags 	  = selectedData[i].doit_tags;
				tags = tags.split(',');
				let nickname  = selectedData[i].nickname;
				let memberCnt = selectedData[i].member_count;

				rowDom +=
					`<tr id="${uuid}">
						<td>
							<div class="doit-thumbnail">
								<img src="${imageUrl}" alt="" onerror="onErrorImage(this);">
							</div>
						</td>
						<td>
							<div class="doit-detail-info">
								<ul class="tag clearfix">`
				for (let j=0; j<tags.length; j++)
				{
					let tag = tags[j];
					if (!isEmpty(tag))
						rowDom += 	`<li>${tag}</li>`
				}
				rowDom +=
								`</ul>
								<p class="doit-tit">${title}</p>
								<p class="doit-leader"><strong>개설자 : </strong><span>${nickname}</span></p>
								<p class="doit-num"><strong>참여자 수: </strong><span>${memberCnt}</span></p>
						</td>
						<td>
							<div class="doit-state">
								<span class="icon-state">모집중</span>
							</div>
						</td>
						<td class="cursor-default">
							<i onclick="removeRow(this);" 
								onmouseenter="disableSort();" 
								onmouseleave="enableSort();" 
								data-uuid="${uuid}" 
								class="far fa-times-circle"></i>
						</td>
					</tr>`
			}

			let targetTableBody = recommendedTable.find('tbody');
			targetTableBody.append(rowDom);

			initDisableCheckbox();
			tableReloadAndStayCurrentPage(doitTable);
			recommendedTable.find('tbody').sortable("destroy");
			initSortTable();
		/*}*/
	}

	/*function addValidation()
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
			let msg = `추천 두잇은 ${message.maxAddFive}
						추가할 수 있는 두잇 수: ${vacancy}`
			sweetToast(msg);
			return false;
		}

		return true;
	}*/

	/*function getRecommendRows()
	{
		let recommended = recommendedTable.DataTable();
		return recommended.data().any() ? recommendedTable.find('tbody').children() : 0;
	}*/

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
			"title" : recommendTitle.val().trim(),
			"is_exposure" : $("input[name=radio-exposure]:checked").val(),
			"doit_uuid" : ids
		};
		let url 	= api.createDoitRecommend;
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
			sweetToast(`추천명은 ${message.required}`);
			return false;
		}

		let rows = recommendedTable.find('tbody').children();
		if (rows.length === 0)
		{
			sweetToast(`두잇을 ${message.addOn}`);
			return false;
		}

		return true;
	}