
	const dateToday 	= $(".dateToday");
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const keyword		= $("#keyword");
	const legend =
		`<i class="question-tool far fa-question-circle">
			<span class="hover-text">
				<b>CLICK:</b> 처리 방식 및 대상에 상관없이 동적 링크의 모든 클릭 횟수<br>
				<b>REDIRECT:</b> App Store 또는 Play 스토어로 사용자를 리디렉션하여 앱을 설치 또는 업데이트하거나 기타 대상으로 리디렉션하려고 시도된 횟수<br>
				<b>APP_INSTALL:</b> 실제 설치 횟수(Play 스토어만 지원)<br>
				<b>APP_FIRST_OPEN:</b> 설치 후 처음 연 횟수<br>
				<b>APP_RE_OPEN:</b> 동적 링크로 인해 앱이 다시 열린 횟수
			</span>
		</i>`

	$( () => {
		/** 데이트피커 초기화 **/
		initDatepicker();
		/** 상단 검색 폼 초기화 **/
		initSearchForm();
		/** 목록 불러오기 **/
		buildGrid();
		/** 이벤트 **/
		$("body")  .on("keydown", function (event) { onKeydownSearch(event) });
		search			.on("click", function () { onSubmitSearch(); });
		reset			.on("click", function () { initSearchForm(); });
		dayButtons      .on("click", function () { onClickDayButtons(this); });
		dateToday		.html(getStringFormatToDate(new Date(), '-'));
	});

	function initDatepicker()
	{
		datePicker.datepicker({
			dateFormat: "yy-mm-dd"
			,monthNames: label.monthNames
			,dayNames: label.dayNames
			,dayNamesMin: label.dayNames
			,minDate: "-30d"
			,maxDate: 0
		});

		dateFrom.datepicker("setDate", "-6d");
	}

	function onClickDayButtons(obj)
	{
		dayButtons.removeClass("active");
		$(obj).addClass("active");

		if ($(obj).hasClass("btn_today"))
			datePicker.datepicker("setDate", "today");
		else if ($(obj).hasClass("btn_week"))
			datePicker.datepicker("setDate", "-6d");
		else if ($(obj).hasClass("btn_month"))
			datePicker.datepicker("setDate", "-30");
	}

	function initSearchForm()
	{
		keyword.val('');
		initSelectOption();
		initDayBtn();
	}

	function buildGrid()
	{
		dataTable.DataTable({
			ajax : {
				url: api.listInflow,
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
				{title: "플랫폼", 	data: "platform",    	width: "25%",	className: "cursor-default" }
				,{title: "횟수", 	data: "count",    		width: "25%",	className: "cursor-default" }
				,{title: "이벤트"+legend, 	data: "event",    		width: "25%",	className: "cursor-default" }
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
			pageLength: 30,
			/*pagingType: "simple_numbers_no_ellipses",*/
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
				initTableSorter(this);
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
			}
		});
	}

	function tableParams()
	{
		/*let table = dataTable.DataTable();
		let info = table.page.info();
		let _page = (info.start / info.length) + 1;*/

		let param = {
			"period" : getPeriod()
			,"url" : keyword.val()
		}

		/** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
		setHistoryParam(param);

		return JSON.stringify(param);
	}

	function onSubmitSearch()
	{
		let table = dataTable.DataTable();
		table.ajax.reload();
		datePicker.datepicker("option", "minDate", "-30");
		datePicker.datepicker("option", "maxDate", "today");
	}

	function getPeriod()
	{
		let fromDate = dateFrom.datepicker('getDate');
		let toDate = new Date();
		let diff = Math.abs(toDate.getTime() - fromDate.getTime());
		diff = Math.floor(diff / (1000 * 3600 * 24)) + 1;

		return diff;
	}