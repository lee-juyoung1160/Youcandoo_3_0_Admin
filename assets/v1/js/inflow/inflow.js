
	const dateToday 	= $("#dateToday");
	const search 		= $(".search");
	const reset 		= $(".reset");
	const dataTable		= $("#dataTable")
	const keyword		= $("#keyword");
	const tooltips = {
		click : '클릭 <i class="question-mark far fa-question-circle"><span class="hover-text">처리 방식 및 대상에 상관없이 동적 링크의 모든 클릭 횟수</span></i>',
		redirect : '리다이렉트 <i class="question-mark far fa-question-circle"><span class="hover-text">App Store 또는 Play 스토어로 사용자를 리디렉션하여 앱을 설치 또는 업데이트하거나 기타 대상으로 리디렉션하려고 시도된 횟수</span></i>',
		install : '설치 <i class="question-mark far fa-question-circle"><span class="hover-text">실제 설치 횟수(Play 스토어만 지원)</span></i>',
		first : '오픈 <i class="question-mark far fa-question-circle"><span class="hover-text">설치 후 앱을 처음 연 횟수</span></i>',
		reopen : '재 오픈 <i class="question-mark far fa-question-circle"><span class="hover-text">동적 링크로 인해 앱이 다시 열린 횟수</span></i>'
	}

	$( () => {
		/** dataTable default config **/
		initTableDefault();
		/** 데이트피커 초기화 **/
		initDatepicker();
		initDateRangeLimit();
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
			,minDate: "-29d"
			,maxDate: 0
		});

		datePicker.datepicker("setDate", "-6d");
	}

	function initDateRangeLimit()
	{
		datePicker.datepicker("option", "minDate", "-29d");
		datePicker.datepicker("option", "maxDate", "today");
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
			datePicker.datepicker("setDate", "-29d");
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
				{title: "이벤트", 	data: "event",    	width: "25%",
					render: function (data) {
						switch (data) {
							case 'CLICK' :
								return tooltips.click;
							case 'REDIRECT' :
								return tooltips.redirect;
							case 'APP_INSTALL' :
								return tooltips.install;
							case 'APP_FIRST_OPEN' :
								return tooltips.first;
							case 'APP_RE_OPEN' :
								return tooltips.reopen;
							default :
								return data;
						}
					}
				}
				,{title: "AOS", 	data: "ANDROID",    width: "25%",
					render : function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "IOS", 	data: "IOS",    	width: "25%",
					render : function (data) {
						return numberWithCommas(data);
					}
				}
				,{title: "OTHER", 	data: "OTHER",    	width: "25%",
					render : function (data) {
						return numberWithCommas(data);
					}
				}
			],
			serverSide: true,
			paging: false,
			select: false,
			destroy: false,
			initComplete: function () {
			},
			fnRowCallback: function( nRow, aData ) {
			},
			drawCallback: function (settings) {
			}
		});
	}

	function tableParams()
	{
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
	}

	function getPeriod()
	{
		let fromDate = datePicker.datepicker('getDate');
		let toDate = new Date();
		let diff = Math.abs(toDate.getTime() - fromDate.getTime());
		diff = Math.floor(diff / (1000 * 3600 * 24)) + 1;

		return diff;
	}