
	const dataTable	 = $("#dataTable");
	const btnReorder = $("#btnReorder");

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		btnReorder.on("click", function () { onSubmitReorder(); });
		dataTable.find('tbody').sortable({
			helper: function (e, el) {
				return addAttrDragonElement(el);
			}
		});
	});

	function addAttrDragonElement(el)
	{
		let tdElement = $(el).children();
		$(tdElement[0]).css("width", Math.ceil(($(el).width()/100)*10)+'px');
		$(tdElement[1]).css("width", Math.ceil(($(el).width()/100)*20)+'px');
		$(tdElement[2]).css("width", Math.ceil(($(el).width()/100)*55)+'px');
		$(tdElement[3]).css("width", Math.ceil(($(el).width()/100)*10)+'px');
		return $(el);
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listFaq,
				type: "POST",
				headers: headers,
				data: function (d) {
					return tableParams();
				},
				error: function (request, status) {
					sweetError(label.list+message.ajaxLoadError);
				}
			},
			columns: [
				{title: "구분", 		data: "faq_type",   		width: "10%" }
				,{title: "제목", 	data: "title",   			width: "30%" }
				,{title: "내용", 	data: "contents",   		width: "45%",
					render: function (data) {
						return `<div style="max-width: 650px;" class="line-clamp">${data}</div>`;
					}
				}
				,{title: "등록일", 	data: "created_datetime",  	width: "10%",
					render: function (data) {
						return data.substring(0, 10);
					}
				}
			],
			serverSide: true,
			paging: false,
			pageLength: 10000,
			select: false,
			destroy: false,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData)
			},
			drawCallback: function (settings) {
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		$(nRow).prop('id', aData.faq_uuid);
	}

	function tableParams()
	{
		let param = {
			"limit" : 10000
			,"page" : 1
			,"search_type" : "title"
			,"faq_type" : ""
			,"keyword" : ""
			,"is_exposure" : "Y"
		}

		return JSON.stringify(param);
	}

	function onSubmitReorder()
	{
		if (reorderValidation())
			sweetConfirm(message.change, reorderRequest);
	}

	function reorderRequest()
	{
		let uuids = getRowsId();
		let param   = JSON.stringify({ "faq_uuid" : uuids });
		let url 	= api.reorderFaq;
		let errMsg 	= label.modify+message.ajaxError;

		ajaxRequestWithJsonData(true, url, param, reorderReqCallback, errMsg, false);
	}

	function reorderReqCallback(data)
	{
		sweetToastAndCallback(data, reorderSuccess);
	}

	function reorderSuccess()
	{
		sweetConfirmWithCancelCallback('목록페이지로 이동하실래요?', okCallback, cancelCallback);
	}

	function okCallback()
	{
		location.href = '/service/faq';
	}

	function cancelCallback()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
	}

	function reorderValidation()
	{
		let uuids = getRowsId();
		if (uuids.length === 0)
		{
			sweetToast("정렬할 목록이 없습니다.");
			return false;
		}

		return true;
	}

	function getRowsId()
	{
		let rows = dataTable.find('tbody').children();
		let uuids = [];

		for (let i=0; i<rows.length; i++)
		{
			let uuid = rows[i].id;
			if (isEmpty(uuid)) continue;

			uuids.push(uuid);
		}

		return uuids;
	}
