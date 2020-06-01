
		const bizProfileImg	= $("#bizProfileImg");
		const bizName 		= $("#bizName");
		const bizNumber		= $("#bizNumber");
		const bizLink		= $("#bizLink");
		const bizDesc		= $("#bizDesc");
		const goUpdate		= $("#goUpdate");
		const dataNum		= $(".data-num");
		const dataTable		= $("#dataTable");
		const selPageLength	= $("#selPageLength");


		$(document).ready(function () {
			/** 상세 불러오기 **/
			getDetail();

			//goUpdate.on('click', function () { goUpdatePage(); })
		});

		function getDetail()
		{
			$.ajax({
				url: api.detailBiz,
				type: "POST",
				data: params(),
				headers: headers,
				dataType: 'json',
				success: function(data) {
					if (isSuccessResp(data))
						buildDetail(data);
					else
						alert(invalidResp(data))
				},
				error: function (request, status) {
					alert(message.ajaxError);
				}
			});
		}

		function params()
		{
			const pathName	= getPathName();
			const bizIdx	= splitReverse(pathName, '/');

			return JSON.stringify({"idx" : bizIdx});
		}

		let g_bizUuid;
		function buildDetail(data)
		{
			let detail = data.data;
			g_bizUuid = detail.company_uuid;
			bizProfileImg.attr('src', detail.image_path);
			bizName.html(detail.company_name);
			bizNumber.html(detail.company_number);
			bizLink.html('<a class="detail-data" href="'+detail.url+'" target="_blank">'+detail.url+'</a>');
			bizDesc.html(detail.contents);

			getInvolvePromo();
		}

		function getInvolvePromo()
		{
			dataTable.DataTable({
				ajax : {
					url: api.involveBizPromotion,
					type: "POST",
					async: false,
					headers: headers,
					data: function (d) {
						return tableParams(d);
					},
					error: function (request, status) {
						alert(message.ajaxError);
					}
				},
				columns: [
					{title: "No", 			data: "idx",   				width: "4%",      orderable: false,   className: "text-center" }
					,{title: "프로모션명", 	data: "promotion_title",   	width: "24%",     orderable: false,   className: "text-center" }
					,{title: "프로모션 예산", data: "budget_ucd",   		width: "24%",     orderable: false,   className: "text-center",
						render: function (data) {
							return numberWithCommas(data);
						}
					}
					,{title: "기간", 		data: "start_date",   		width: "24%",     orderable: false,   className: "text-center" }
				],
				language: {
					emptyTable : message.emptyList
					,zeroRecords: message.emptyList
					,processing : message.searching
					,paginate: {
						previous: label.previous
						,next: label.next
					}
				},
				processing: false,
				serverSide: true,
				paging: true,
				pageLength: Number(selPageLength.val()),
				/*pagingType: "simple_numbers_no_ellipses",*/
				ordering: false,
				order: [],
				info: false,
				select: false,
				lengthChange: false,
				autoWidth: false,
				searching: false,
				fixedHeader:false,
				destroy: true,
				initComplete: function () {
					let table = dataTable.DataTable();
					let info = table.page.info();

					dataNum.text(info.recordsTotal);
				},
				fnRowCallback: function( nRow, aData ) {
					setRowAttributes(nRow, aData);
				}
			});
		}

		function tableParams(d)
		{
			let param = {
				"limit" : d.length
				,"page" : (d.start / d.length) + 1
				,"company_uuid" : g_bizUuid
			}

			return JSON.stringify(param);
		}

		function setRowAttributes(nRow, aData)
		{
			let titleDom = $(nRow).children().eq(1);
			let periodDom = $(nRow).children().eq(3);
			let detailUrl = page.detailPromo+aData.idx;

			/** 제목에 a 태그 추가 **/
			$(titleDom).html('<a href="'+detailUrl+'">'+aData.promotion_title+'</a>');
			/** 프로모션 기간 **/
			$(periodDom).html(aData.start_date+' ~ '+aData.end_date);
		}

		function goUpdatePage()
		{
			const pathName	= getPathName();
			const bizIdx	= splitReverse(pathName, '/');

			location.href = page.updateBiz+bizIdx;
		}


