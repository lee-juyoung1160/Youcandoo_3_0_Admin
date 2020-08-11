
    const issuanceUcd   = $('#issuanceUcd');
    const rewardUcd     = $('#rewardUcd');
    const balanceUcd    = $('#balanceUcd');
    const doitUcd       = $('#doitUcd');
    const exchangeUcd   = $('#exchangeUcd');
    const cancelUcd     = $('#cancelUcd');
    const selYear   = $('#selYear');
    const selMonth  = $('#selMonth');
    const dailyInfo = $('#dailyInfo');
    const totalUcd  = $('#totalUcd');
    const userUcd   = $('#userUcd');
    const bizUcd    = $('#bizUcd');
    const grid      = $("#grid");
    let g_ucd_type  = 'create';

    let chartOptions = {
        legend: {
            align: 'end',
            position: 'top'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        animation: {
            duration: 1000
        }
    }

    /** 현재 연도-월-일 구하기 **/
    let date    = new Date();
    let year    = date.getFullYear();
    let month   = date.getMonth() + 1;
    let day     = date.getDate();
    let hours   = date.getHours();
    let minutes = date.getMinutes();

    /** 로드 바로 실행 **/
    $(() => {
        initSelectBox();
        getSummaryUcd();
        initPage();
        /** sessionStorage에 정보 저장 : 뒤로가기 액션 히스토리 체크용 **/
        setHistoryParam("");
        /** 월단위 셀렉박스 이벤트 **/
        issuanceUcd .on('click', function () { g_ucd_type = 'create'; onClickLiElement(this); });
        rewardUcd   .on('click', function () { g_ucd_type = 'reward'; onClickLiElement(this); });
        balanceUcd  .on('click', function () { g_ucd_type = 'balance'; onClickLiElement(this); });
        doitUcd     .on('click', function () { g_ucd_type = 'doit'; onClickLiElement(this); });
        exchangeUcd .on('click', function () { g_ucd_type = 'exchange'; onClickLiElement(this); });
        cancelUcd   .on('click', function () { g_ucd_type = 'cancel'; onClickLiElement(this); });
        selYear     .on('change', function () { updatePage(); });
        selMonth    .on('change', function () { updatePage(); });
    });

    let defaultYear  = 2020;
    let defaultMonth = 7;
    function initSelectBox()
    {
        for (defaultYear; defaultYear <= year; defaultYear++)
            selYear.prepend('<option value="'+defaultYear+'">'+defaultYear+' 년</option>');

        for (defaultMonth; defaultMonth <= month; defaultMonth++)
            selMonth.prepend('<option value="'+appendZero(defaultMonth)+'">'+appendZero(defaultMonth)+' 월</option>');

        initSelectOption();
    }

    /** 상단 UCD 누적 정보 **/
    function getSummaryUcd()
    {
        let url    = api.summaryUcd;
        let errMsg = '상단 UCD 누적 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, null, getSummaryUcdCallback, errMsg, false);
    }

    function getSummaryUcdCallback(data)
    {
        isSuccessResp(data) ? getSummaryUcdSuccess(data) : sweetToast(invalidResp(data));
    }

    function getSummaryUcdSuccess(data)
    {
        let detail           = data.data;
        let issuancePersonal = detail.payment.company_ucd;
        let issuanceBiz      = detail.payment.user_ucd;
        let issuanceTotal    = Number(issuancePersonal) + Number(issuanceBiz);
        let rewardPromo      = Number(detail.reward.promotion_ucd);
        let rewardDoit       = Number(detail.reward.doit_ucd);
        let balance          = detail.promotion.ucd;
        let createDoit       = detail.create.ucd;
        let exchangeTotal    = detail.exchange.ucd;
        let cancel           = detail.cancel.ucd;

        let issuanceTotalEl = issuanceUcd.find('span');
        let rewardTotalEl   = rewardUcd.find('span');
        let balanceTotalEl  = balanceUcd.find('span');
        let doitTotalEl     = doitUcd.find('span');
        let exchangeTotalEl = exchangeUcd.find('span');
        let cancelTotalEl   = cancelUcd.find('span');

        $(issuanceTotalEl).text(issuanceTotal);
        countAnimation($(issuanceTotalEl));
        $(rewardTotalEl).text(rewardPromo+rewardDoit);
        countAnimation($(rewardTotalEl));
        $(balanceTotalEl).text(balance);
        countAnimation($(balanceTotalEl));
        $(doitTotalEl).text(createDoit);
        countAnimation($(doitTotalEl));
        $(exchangeTotalEl).text(exchangeTotal);
        countAnimation($(exchangeTotalEl));
        $(cancelTotalEl).text(cancel);
        countAnimation($(cancelTotalEl));
    }

    function initPage()
    {
        let param = {
            'year' : selYear.val(),
            'month': selMonth.val()
        }

        let url     = getApiUrl();
        let errMsg  = '데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, JSON.stringify(param), initPageCallback, errMsg, false);
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
        let dataset = initDataset(data);

        dailyChart  = initChart(dailyInfo, chartType.line, xLabel, dataset, chartOptions);
    }

    function buildSummary(data)
    {
        let summaryData = data.data.total;
        let user = Number(summaryData.user_ucd);
        let biz = Number(summaryData.company_ucd);
        let tot = user + biz;

        totalUcd.html(numberWithCommas(tot));
        userUcd.html(numberWithCommas(user));
        bizUcd.html(numberWithCommas(biz));
    }

    function buildGrid(data)
    {
        let rows = data.data.data;
        let i = 0
        let innerEl = '';
        for (i; i<rows.length; i++)
        {
            let row = rows[i];
            let user = row.user_ucd;
            let company = row.company_ucd;
            let tot = Number(user) + Number(company);
            innerEl += '<tr>';
            innerEl +=   '<td class="cursor-default">'+row.date+'</td>';
            innerEl +=   '<td class="cursor-default">'+numberWithCommas(tot)+'</td>';
            innerEl +=   '<td class="cursor-default">'+numberWithCommas(user)+'</td>';
            innerEl +=   '<td class="cursor-default">'+numberWithCommas(company)+'</td>';
            innerEl += '</tr>';
        }

        grid.html(innerEl);
    }

    function onClickLiElement(obj)
    {
        toggleActive(obj);
        initSelectOption();
        updatePage();
    }

    function toggleActive(obj)
    {
        $(obj).siblings().removeClass('on');
        $(obj).addClass('on');
    }

    function updatePage()
    {
        let param = {
            'year' : selYear.val(),
            'month': selMonth.val()
        }

        let url     = getApiUrl();
        let errMsg  = '데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, JSON.stringify(param), updatePageCallback, errMsg, false);
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
        dailyChart.data.datasets = initDataset(data);
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

    function initDataset(data)
    {
        let chartData = data.data.chart;

        switch(g_ucd_type) {
            case 'create':
                return [{
                    label: label.personal,
                    data: chartData.user,
                    /*backgroundColor: color.dodgerBlue*/
                    borderColor: color.wildWatermelon,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }, {
                    label: label.biz,
                    data: chartData.company,
                    /*backgroundColor: color.prussianBlue*/
                    borderColor: color.summerSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }];
            case 'reward':
                return [{
                    label: label.personal,
                    data: chartData.user,
                    /*backgroundColor: color.dodgerBlue*/
                    borderColor: color.wildWatermelon,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }, {
                    label: label.biz,
                    data: chartData.company,
                    /*backgroundColor: color.prussianBlue*/
                    borderColor: color.summerSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }];
            case 'balance':
                return [{
                    label: label.personal,
                    data: chartData.user,
                    /*backgroundColor: color.dodgerBlue*/
                    borderColor: color.wildWatermelon,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }, {
                    label: label.biz,
                    data: chartData.company,
                    /*backgroundColor: color.prussianBlue*/
                    borderColor: color.summerSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }];
            case 'doit':
                return [{
                    label: label.personal,
                    data: chartData.user,
                    /*backgroundColor: color.dodgerBlue*/
                    borderColor: color.wildWatermelon,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }, {
                    label: label.biz,
                    data: chartData.company,
                    /*backgroundColor: color.prussianBlue*/
                    borderColor: color.summerSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }];
            case 'exchange':
                return [{
                    label: label.personal,
                    data: chartData.user,
                    /*backgroundColor: color.dodgerBlue*/
                    borderColor: color.wildWatermelon,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }, {
                    label: label.biz,
                    data: chartData.company,
                    /*backgroundColor: color.prussianBlue*/
                    borderColor: color.summerSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }];
            case 'cancel':
                return [{
                    label: label.personal,
                    data: chartData.user,
                    /*backgroundColor: color.dodgerBlue*/
                    borderColor: color.wildWatermelon,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }, {
                    label: label.biz,
                    data: chartData.company,
                    /*backgroundColor: color.prussianBlue*/
                    borderColor: color.summerSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }];
            default:
                return [{
                    label: label.personal,
                    data: chartData.user,
                    /*backgroundColor: color.dodgerBlue*/
                    borderColor: color.wildWatermelon,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }, {
                    label: label.biz,
                    data: chartData.company,
                    /*backgroundColor: color.prussianBlue*/
                    borderColor: color.summerSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.black
                }];
        }
    }

    function getApiUrl()
    {
        switch(g_ucd_type) {
            case 'create':
                return api.issuanceUcd;
            case 'reward':
                return api.issuanceUcd;
            case 'balance':
                return api.issuanceUcd;
            case 'doit':
                return api.issuanceUcd;
            case 'exchange':
                return api.issuanceUcd;
            case 'cancel':
                return api.issuanceUcd;
            default:
                return api.issuanceUcd;
        }
    }