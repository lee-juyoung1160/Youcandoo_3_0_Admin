
	const nickname	= $("#nickname");
	const assort 	= $("input[name=radio-assort]");
	const target	= $("#target");
	const ucd		= $("#ucd");
	const content 	= $("#content");

	/** modal **/
	const modalCloseBtn = $(".close-btn");
	const modalLayout 	= $(".modal-layout");
	const modalContent 	= $(".modal-content");
	const modalNickname	= $("#modalNickname");
	const dataTable		= $("#dataTable")

	$(document).ready(function () {
		/** 컴퍼넌트 초기화 **/
		initComponent();
		/** 이벤트 **/
		modalCloseBtn	.on('click', function () { modalFadeout(); });
		modalLayout		.on('click', function () { modalFadeout(); });
		nickname		.on('click', function () { onClickBizName(); });
	});

	function initComponent()
	{
		assort.eq(0).prop("checked", true);
	}

	function initModal()
	{
		nickname.val('');
		nickname.focus();
	}

	/** 기업 검색 **/
	function onClickBizName()
	{
		modalFadein();
	}

	function getUser()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listBizName,
				type:"POST",
				headers: headers,
				dataSrc: "",
				global: false,
				data: function (d) {
					return JSON.stringify({"keyword" : modalBizName.val()});
				}
			},
			columns: [
				{title: "닉네임",	data: "value",    orderable: false,   className: "text-center" }
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
			paging: false,
			ordering: false,
			order: [],
			info: false,
			select: false,
			scrollY: 200,
			scrollCollapse: true,
			lengthChange: false,
			autoWidth: false,
			searching: false,
			fixedHeader: false,
			destroy: true,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
				setRowAttributes(nRow, aData);
			}
		});
	}

	function setRowAttributes(nRow, aData)
	{
		/** 닉네임에 클릭이벤트 추가 **/
		$(nRow).attr('onClick', 'setSelectedNickname(\''+aData.key+'\',\''+aData.value+'\')');
	}

	/** 모달에서 닉네임 클릭 했을 때 **/
	function setSelectedNickname(uuid, name)
	{
		nickname.val(name);
	}


