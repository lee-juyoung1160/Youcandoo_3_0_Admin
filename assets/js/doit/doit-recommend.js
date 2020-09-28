
	const recommendedTable	= $("#recommendedTable");
	const btnSubmit		= $("#btnSubmit");
	const keyword		= $("#keyword");
	const btnAdd		= $("#btnAdd");
	const doitTable		= $("#doitTable");

	$( () => {
		/** 추천 두잇 데이터 로드 **/
		buildRecommended();
		getDoit();
		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam("");
		/** 이벤트 **/
		btnAdd			.on("click", function () { addRecommend(); });
		keyword    		.on("keyup", function () { onSubmitSearch(); });
		btnSubmit		.on("click", function () { onSubmitRecommend(); });
		recommendedTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	});

	function disableSort()
	{
		recommendedTable.find('tbody').sortable("option", "disabled", true);
	}

	function enableSort()
	{
		recommendedTable.find('tbody').sortable("option", "disabled", false);
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

	let g_recommend = [];
	function buildRecommended()
	{
		recommendedTable.DataTable({
			ajax : {
				url: api.listDoitRecommend,
				type:"POST",
				headers: headers,
				data: "",
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "",		data: "doit_uuid",		width: "10%",   className: "",
					render: function (data, type, row, meta) {
						return buildThumbnail(row);
					}
				}
				,{title: "", 	data: "doit_uuid",    	width: "65%",   className: "",
					render: function (data, type, row, meta) {
						return buildRecommendDetail(row);
					}
				}
				,{title: "", 	data: "doit_status",    width: "15%",    className: "cursor-default",
					render: function (data) {
						return buildDoitStatus(data);
					}
				}
				,{title: "", 	data: "doit_uuid", 		width: "5%",    className: "cursor-default",
					render: function (data) {
						return `<i onclick="removeRow(this);" onmouseenter="disableSort();" onmouseleave="enableSort();" data-uuid="${data}" class="far fa-times-circle"></i>`
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
			paging: false,
			ordering: false,
			order: [],
			info: false,
			select: false,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: false,
			initComplete: function () {
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

	function getDoit()
	{
		doitTable.DataTable({
			ajax : {
				url: api.listDoitNonRecommend,
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

		let vacancy = 3 - ids.length;

		if (isEmpty(selectedData))
		{
			sweetToast(`추가할 두잇을 ${message.select}`);
			return false;
		}

		if (selectedData.length > vacancy)
		{
			let msg = `추천 두잇은 ${message.maxAddThree}
						추가할 수 있는 두잇 수: ${vacancy}`
			sweetToast(msg);
			return false;
		}

		return true;
	}

	function getRecommendRows()
	{
		let recommended = recommendedTable.DataTable();
		return recommended.data().any() ? recommendedTable.find('tbody').children() : 0;
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
		/*if (submitValidation())*/
		sweetConfirm(message.create, createRequest);
	}

	function createRequest()
	{
		let rows 	= recommendedTable.find('tbody').children();
		let ids 	= [];
		for (let i=0; i<rows.length; i++)
			ids.push(rows[i].id)

		let param   = JSON.stringify({ "recommend_list" : ids });
		let url 	= api.updateDoitRecommend;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, param, createReqCallback, errMsg, false);
	}

	function createReqCallback(data)
	{
		sweetToastAndCallback(data, createSuccess);
	}

	function createSuccess()
	{
		let table = recommendedTable.DataTable();
		table.ajax.reload();
	}

	/*function submitValidation()
	{
		let rows = getRecommendRows();
		if (rows.length === 0)
		{
			sweetToast("두잇을 "+message.addOn);
			return false;
		}

		return true;
	}*/