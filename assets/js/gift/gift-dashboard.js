
    /*const selYear       = $('#selYear');
    const selMonth      = $('#selMonth');
    const dailyInfo     = $('#dailyInfo');
    const summaryWrap   = $('#summaryWrap');*/
    /*const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;*/
    const grid          = $("#grid");

    /** 로드 바로 실행 **/
    $(() => {
        /*initSelectBox();*/
        /*initPage();*/
        buildGrid();
        /** 월단위 셀렉박스 이벤트 **/
        /*selYear     .on('change', function () { updatePage(); });
        selMonth    .on('change', function () { updatePage(); });*/
    });

    /*function initSelectBox()
    {
        initSelectBoxYear(year);
        initSelectBoxMonth(month);
    }

    function initSelectBoxYear(_year)
    {
        selYear.empty();

        let defaultYear  = 2020;

        for (defaultYear; defaultYear <= _year; defaultYear++)
            selYear.prepend(`<option value="${defaultYear}">${defaultYear}년</option>`);

        onChangeSelectOption(selYear);
    }

    function initSelectBoxMonth(_month)
    {
        selMonth.empty();

        let i = 1;

        for (i; i <= 12; i++)
        {
            let selected = i === Number(_month) ? 'selected' : '';
            selMonth.prepend(`<option ${selected} value="${appendZero(i)}">${appendZero(i)}월</option>`);
        }

        onChangeSelectOption(selMonth);
    }*/

    function initPage()
    {
        let param = {
            'year' : selYear.val(),
            'month': selMonth.val()
        }

        let url     = api.issuanceUcd;
        let errMsg  = `차트데이터${message.ajaxLoadError}`;

        ajaxRequestWithJsonData(true, url, JSON.stringify(param), initPageCallback, errMsg, false);
    }

    function initPageCallback(data)
    {
        if (isSuccessResp(data))
        {
            initDailyChart(data);
            buildSummary(data);
            buildGrid(data);
        }
    }

    let dailyChart;
    function initDailyChart(data)
    {
        let xLabel  = getDayNames(selYear.val(), selMonth.val());
        let chartData = data.data.chart;
        let dataset = [{
            label: label.personal,
            data: chartData.user,
            fill: false,
            lineTension: 0.1,
            borderColor: color.mintSky,
            borderWidth : 2,
            pointBackgroundColor: color.mintSky,
            backgroundColor: color.black
        }, {
            label: label.biz,
            data: chartData.company,
            fill: false,
            lineTension: 0.1,
            borderColor: color.jyBlue,
            borderWidth : 2,
            pointBackgroundColor: color.jyBlue,
            backgroundColor: color.black
        }];

        dailyChart  = initChart(dailyInfo, chartType.line, xLabel, dataset, chartOptions.withLegendLineOption);
    }

    function buildSummary(data)
    {
        let innerEl =
            `<dl>
                <dt class="title">전체</dt>
                <dd class="ucd-text total-text"><img src="/assets/images/icon_ucd_s.png" alt="아이콘">
                    <span id="totalUcd"></span>
                </dd>
            </dl>
            <dl>
                <dt class="title">개인충전</dt>
                <dd class="ucd-text"><img src="/assets/images/icon_ucd_s.png" alt="아이콘">
                    <span id="userUcd"></span>
                </dd>
            </dl>
            <dl>
                <dt class="title">기업충전</dt>
                <dd class="ucd-text"><img src="/assets/images/icon_ucd_s.png" alt="아이콘">
                    <span id="bizUcd"></span>
                </dd>
            </dl>`

        summaryWrap.html(innerEl);
    }

    function buildGrid(data)
    {
        let innerEl = '';
        innerEl +=
            `<thead>
                <tr>
                   <th>상품</th>
                   <th>발송건수</th>
                   <th>금액</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                   <td>2020-01-01</td>
                   <td>3,000,000</td>
                   <td>3,000,000</td>
                </tr>
            </tbody>`

        grid.html(innerEl);
    }

    function updatePage()
    {
        let param = {
            'year' : selYear.val(),
            'month': selMonth.val()
        }

        let url     = api.issuanceUcd;
        let errMsg  = `차트데이터${message.ajaxLoadError}`;

        ajaxRequestWithJsonData(true, url, JSON.stringify(param), updatePageCallback, errMsg, false);
    }

    function updatePageCallback(data)
    {
        if (isSuccessResp(data))
        {
            updateDailyChart(data);
            buildSummary(data);
            buildGrid(data);
        }
    }

    function updateDailyChart(data)
    {
        dailyChart.data.labels = getDayNames(selYear.val(), selMonth.val());
        dailyChart.options.legend.display = true
        let chartData = data.data.chart;
        dailyChart.data.datasets = [{
            label: label.personal,
            data: chartData.user,
            fill: false,
            lineTension: 0.1,
            borderColor: color.mintSky,
            borderWidth : 2,
            pointBackgroundColor: color.mintSky,
            backgroundColor: color.black
        }, {
            label: label.biz,
            data: chartData.company,
            fill: false,
            lineTension: 0.1,
            borderColor: color.jyBlue,
            borderWidth : 2,
            pointBackgroundColor: color.jyBlue,
            backgroundColor: color.black
        }];

        dailyChart.update();
    }

    function getDayNames(_year, _month)
    {
        let lastDayNum  = getLastDayNumber(Number(_year), Number(_month));
        let dayNames    = [];
        for (let i=1; i<=lastDayNum; i++)
            dayNames.push(i+'일');

        return dayNames;
    }
