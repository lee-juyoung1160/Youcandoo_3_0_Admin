
    const issuanceUcd   = $('#issuanceUcd');
    const rewardUcd     = $('#rewardUcd');
    const budgetUcd    = $('#budgetUcd');
    const doitUcd       = $('#doitUcd');
    const exchangeUcd   = $('#exchangeUcd');
    const cancelUcd     = $('#cancelUcd');
    const selYear       = $('#selYear');
    const selMonth      = $('#selMonth');
    const dailyInfo     = $('#dailyInfo');
    const summaryWrap   = $('#summaryWrap');
    /*const userUcd   = $('#userUcd');
    const bizUcd    = $('#bizUcd');*/
    const grid      = $("#grid");
    let g_ucd_type  = 'create';

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
        budgetUcd   .on('click', function () { g_ucd_type = 'budget'; onClickLiElement(this); });
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
        let budgetTotalEl  = budgetUcd.find('span');
        let doitTotalEl     = doitUcd.find('span');
        let exchangeTotalEl = exchangeUcd.find('span');
        let cancelTotalEl   = cancelUcd.find('span');

        $(issuanceTotalEl).text(issuanceTotal);
        countAnimation($(issuanceTotalEl));
        $(rewardTotalEl).text(rewardPromo+rewardDoit);
        countAnimation($(rewardTotalEl));
        $(budgetTotalEl).text(balance);
        countAnimation($(budgetTotalEl));
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

        dailyChart  = initChart(dailyInfo, chartType.line, xLabel, dataset, chartOptions.options);
        dailyChart.options.scales.yAxes[0].ticks.callback = ticksCallback;
    }

    function ticksCallback(value, index, values)
    {
        let isOverK = Number(value) >= 1000
        value = isOverK ? Number(value) / 1000 : Number(value);
        return isOverK ? numberWithCommas(value)+'k' : numberWithCommas(value);
    }

    function buildSummary(data)
    {
        let summaryData = getSummaryData(data);
        let innerEl = '';
        let i = 0;
        for (i; i<summaryData.text.length; i++)
        {
            let txt = summaryData.text[i];
            let ucd = summaryData.data[i];

            innerEl += '<dl>'
            innerEl +=   '<dt class="title">'+txt+'</dt>';
            innerEl +=   i === 0 ? '<dd class="ucd-text total-text">' : '<dd class="ucd-text">';
            innerEl +=      '<img src="/assets/images/icon_ucd_s.png" alt="아이콘">';
            innerEl +=      '<span id="totalUcd">'+numberWithCommas(ucd)+'</span>';
            innerEl +=   '</dd>';
            innerEl += '</dl>';
        }

        summaryWrap.html(innerEl);
    }

    function buildGrid(data)
    {
        let rowLength = data.data.data.length;
        let rows = getGrid(data);
        let i = 0
        let innerEl = '';
        innerEl += '<thead>'
        innerEl +=    '<tr>'
        for (i; i<rows.text.length; i++)
        {
            let txt = rows.text[i];

            innerEl +=   '<th>'+txt+'</th>';
        }
        innerEl +=     '</tr>';
        innerEl += '</thead>';
        innerEl += '<tbody>';
        innerEl +=    rowLength > 0 ? rows.el : '<tr><td colspan="'+rows.text.length+'"><p class="result-message">조회결과가 없습니다.</p></td></tr>';
        innerEl += '</tbody>';

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

    function getSummaryData(data)
    {
        let summaryData = data.data.total;

        switch(g_ucd_type)
        {
            case 'create':
                return {
                    text : ['전체', '개인충전', '기업충전']
                    ,data : [Number(summaryData.user_ucd) + Number(summaryData.company_ucd), Number(summaryData.user_ucd), Number(summaryData.company_ucd)]
                };
            case 'reward':
                return {
                    text : ['전체', '일반 두잇', '프로모션 두잇', '인당 평균 적립액']
                    ,data : [Number(summaryData.total_ucd), Number(summaryData.promotion_ucd), Number(summaryData.doit_ucd), Number(summaryData.avg)]
                };
            case 'budget':
                return {
                    text : ['전체']
                    ,data : [Number(summaryData.ucd)]
                };
            case 'doit':
                return {
                    text : ['전체']
                    ,data : [Number(summaryData.ucd)]
                };
            case 'exchange':
                return {
                    text : ['전체', '인당 평균 교환 UCD']
                    ,data : [Number(summaryData.ucd), Number(summaryData.avg)]
                };
            case 'cancel':
                return {
                    text : ['전체']
                    ,data : [Number(summaryData.ucd)]
                };
            default:
                return {
                    text : ['전체', '개인충전', '기업충전']
                    ,data : [Number(summaryData.user_ucd) + Number(summaryData.company_ucd), Number(summaryData.user_ucd), Number(summaryData.company_ucd)]
                };
        }
    }

    function getGrid(data)
    {
        let rows = data.data.data;
        let rowEl = '';
        let i = 0;

        switch(g_ucd_type)
        {
            case 'create':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    let user = row.user_ucd;
                    let company = row.company_ucd;
                    let tot = Number(user)+Number(company);
                    rowEl += '<tr>';
                    rowEl +=   '<td class="cursor-default">'+row.created_date+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(tot)+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(user)+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(company)+'</td>';
                    rowEl += '</tr>';
                }

                return {
                    text : ['일자', '전체', '개인충전', '기업충전']
                    ,el : rowEl
                };

            case 'reward':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    let avg = row.avg;
                    let doit = row.doit_ucd;
                    let promotion = row.promotion_ucd;
                    let tot = Number(doit)+Number(promotion);
                    rowEl += '<tr>';
                    rowEl +=   '<td class="cursor-default">'+row.created_date+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(tot)+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(doit)+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(promotion)+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(avg)+'</td>';
                    rowEl += '</tr>';
                }

                return {
                    text : ['일자', '전체', '일반 두잇', '프로모션 두잇', '인당 평균 적립액']
                    ,el : rowEl
                };

            case 'budget':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    rowEl += '<tr>';
                    rowEl +=   '<td class="cursor-default">'+row.created_date+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(row.ucd)+'</td>';
                    rowEl += '</tr>';
                }

                return {
                    text : ['일자', '전체']
                    ,el : rowEl
                };
            case 'doit':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    rowEl += '<tr>';
                    rowEl +=   '<td class="cursor-default">'+row.created_date+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(row.ucd)+'</td>';
                    rowEl += '</tr>';
                }

                return {
                    text : ['일자', '전체']
                    ,el : rowEl
                };
            case 'exchange':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    rowEl += '<tr>';
                    rowEl +=   '<td class="cursor-default">'+row.created_date+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(row.ucd)+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(row.avg)+'</td>';
                    rowEl += '</tr>';
                }

                return {
                    text : ['일자', '전체', '인당 평균 교환 UCD']
                    ,el : rowEl
                };
            case 'cancel':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    rowEl += '<tr>';
                    rowEl +=   '<td class="cursor-default">'+row.created_date+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(row.ucd)+'</td>';
                    rowEl += '</tr>';
                }

                return {
                    text : ['일자', '전체']
                    ,el : rowEl
                };
            default:
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    let user = row.user_ucd;
                    let company = row.company_ucd;
                    let tot = Number(user)+Number(company);
                    rowEl += '<tr>';
                    rowEl +=   '<td class="cursor-default">'+row.created_date+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(tot)+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(user)+'</td>';
                    rowEl +=   '<td class="cursor-default">'+numberWithCommas(company)+'</td>';
                    rowEl += '</tr>';
                }

                return {
                    text : ['일자', '전체', '개인충전', '기업충전']
                    ,el : rowEl
                };
        }
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
                    lineTension: 0.4,
                    borderColor: color.mintSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.mintSkyA
                }, {
                    label: label.biz,
                    data: chartData.company,
                    lineTension: 0.4,
                    borderColor: color.jyBlue,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.jyBlueA
                }];
            case 'reward':
                return [{
                    label: label.regular,
                    data: chartData.doit,
                    lineTension: 0.4,
                    borderColor: color.mintSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.mintSkyA
                }, {
                    label: label.promotion,
                    data: chartData.promotion,
                    lineTension: 0.4,
                    borderColor: color.jyBlue,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.jyBlueA
                }];
            case 'budget':
                return [{
                    label: '프로모션 예산',
                    data: chartData.ucd,
                    lineTension: 0.4,
                    borderColor: color.jyBlue,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.jyBlueA
                }];
            case 'doit':
                return [{
                    label: '두잇 개설',
                    data: chartData.ucd,
                    lineTension: 0.4,
                    borderColor: color.jyBlue,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.jyBlueA
                }];
            case 'exchange':
                return [{
                    label: '상품교환',
                    data: chartData.ucd,
                    lineTension: 0.4,
                    borderColor: color.jyBlue,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.jyBlueA
                }];
            case 'cancel':
                return [{
                    label: '취소',
                    data: chartData.ucd,
                    lineTension: 0.4,
                    borderColor: color.jyBlue,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.jyBlueA
                }];
            default:
                return [{
                    label: label.personal,
                    data: chartData.user,
                    lineTension: 0.4,
                    borderColor: color.jyBlue,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.jyBlueA
                }, {
                    label: label.biz,
                    data: chartData.company,
                    lineTension: 0.4,
                    borderColor: color.mintSky,
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.mintSkyA
                }];
        }
    }

    function getApiUrl()
    {
        switch(g_ucd_type)
        {
            case 'create':
                return api.issuanceUcd;
            case 'reward':
                return api.rewardUcd;
            case 'budget':
                return api.budgetUcd;
            case 'doit':
                return api.doitCreateUcd;
            case 'exchange':
                return api.exchangeUcd;
            case 'cancel':
                return api.cancelUcd;
            default:
                return api.issuanceUcd;
        }
    }