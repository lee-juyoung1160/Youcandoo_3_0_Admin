
    const issuanceUcd   = $('#issuanceUcd');
    const rewardUcd     = $('#rewardUcd');
    const budgetUcd     = $('#budgetUcd');
    const doitUcd       = $('#doitUcd');
    const exchangeUcd   = $('#exchangeUcd');
    const cancelUcd     = $('#cancelUcd');
    const selYear       = $('#selYear');
    const selMonth      = $('#selMonth');
    const dailyInfo     = $('#dailyInfo');
    const summaryWrap   = $('#summaryWrap');
    const grid          = $("#grid");
    let g_ucd_type      = 'create';
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;

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

    function initSelectBox()
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
    }

    /** 상단 UCD 누적 정보 **/
    function getSummaryUcd()
    {
        let url    = api.summaryUcd;
        let errMsg = `상단 UCD 누적 데이터${message.ajaxLoadError}`;

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
        let budgetTotalEl   = budgetUcd.find('span');
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
        let dataset = initDataset(data);

        dailyChart  = initChart(dailyInfo, chartType.line, xLabel, dataset, chartOptions.withLegendLineOption);
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
            let totalTextClass = i === 0 ? 'total-text' : '';
            let icon = txt.includes('회원') ? '<i class="fas fa-user"></i>' : '<img src="/assets/images/icon_ucd_s.png" alt="아이콘">';

            innerEl +=
                `<dl>
                    <dt class="title">${txt}</dt>
                    <dd class="ucd-text ${totalTextClass}">
                        ${icon}
                        <span>${numberWithCommas(ucd)}</span>
                    </dd>
                </dl>`
        }

        summaryWrap.html(innerEl);
    }

    function buildGrid(data)
    {
        let rowLength = data.data.data.length;
        let rows = getGrid(data);
        let i = 0
        let innerEl = '';
        innerEl +=
            `<thead>
                <tr>`
        for (i; i<rows.text.length; i++)
            innerEl += `<th>${rows.text[i]}</th>`
        innerEl +=
                `</tr>
            </thead>
            <tbody>`
        innerEl += rowLength > 0 ?
                rows.el : 
                `<tr>
                    <td colspan="${rows.text.length}"><p class="result-message">조회결과가 없습니다.</p></td>
                </tr>`
        innerEl +=
            `</tbody>`

        grid.html(innerEl);
    }

    function onClickLiElement(obj)
    {
        initSelectBox();
        toggleActive(obj);
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
        toggleLegend();
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
                    text : ['전체', '일반 두잇', '프로모션 두잇', '적립받은 회원 수', '인당 평균 적립액']
                    ,data : [Number(summaryData.total_ucd), Number(summaryData.promotion_ucd), Number(summaryData.doit_ucd), Number(summaryData.member), Number(summaryData.avg)]
                };
            case 'budget':
                return {
                    text : ['전체']
                    ,data : [Number(summaryData.ucd)]
                };
            case 'doit':
                return {
                    text : ['전체', '일반', '프로모션', '반환']
                    ,data : [Number(summaryData.ucd), Number(summaryData.doit_ucd), Number(summaryData.promotion_ucd), Number(summaryData.cancel_ucd)]
                };
            case 'exchange':
                return {
                    text : ['전체', '교환한 회원 수', '인당 평균 교환 UCD']
                    ,data : [Number(summaryData.ucd), Number(summaryData.member), Number(summaryData.avg)]
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
                    rowEl +=
                        `<tr>
                            <td class="cursor-default">${row.created_date}</td>
                            <td class="cursor-default">${numberWithCommas(tot)}</td>
                            <td class="cursor-default">${numberWithCommas(user)}</td>
                            <td class="cursor-default">${numberWithCommas(company)}</td>
                        </tr>`
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
                    let member = row.member;
                    let doit = row.doit_ucd;
                    let promotion = row.promotion_ucd;
                    let tot = Number(doit)+Number(promotion);
                    rowEl +=
                        `<tr>
                            <td class="cursor-default">${row.created_date}</td>
                            <td class="cursor-default">${numberWithCommas(tot)}</td>
                            <td class="cursor-default">${numberWithCommas(doit)}</td>
                            <td class="cursor-default">${numberWithCommas(promotion)}</td>
                            <td class="cursor-default">${numberWithCommas(member)}</td>
                            <td class="cursor-default">${numberWithCommas(avg)}</td>
                        </tr>`
                }

                return {
                    text : ['일자', '전체', '일반 두잇', '프로모션 두잇', '적립받은 회원 수', '인당 평균 적립액']
                    ,el : rowEl
                };

            case 'budget':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    rowEl +=
                        `<tr>
                            <td class="cursor-default">${row.created_date}</td>
                            <td class="cursor-default">${numberWithCommas(row.ucd)}</td>
                        </tr>`
                }

                return {
                    text : ['일자', '전체']
                    ,el : rowEl
                };
            case 'doit':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    rowEl +=
                        `<tr>
                            <td class="cursor-default">${row.created_date}</td>
                            <td class="cursor-default">${numberWithCommas(row.total_ucd)}</td>
                            <td class="cursor-default">${numberWithCommas(row.doit_ucd)}</td>
                            <td class="cursor-default">${numberWithCommas(row.promotion_ucd)}</td>
                        </tr>`
                }

                return {
                    text : ['일자', '전체', '일반', '프로모션']
                    ,el : rowEl
                };
            case 'exchange':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    rowEl +=
                        `<tr>
                            <td class="cursor-default">${row.created_date}</td>
                            <td class="cursor-default">${numberWithCommas(row.ucd)}</td>
                            <td class="cursor-default">${numberWithCommas(row.member)}</td>
                            <td class="cursor-default">${numberWithCommas(row.avg)}</td>
                        </tr>`
                }

                return {
                    text : ['일자', '전체', '교환한 회원 수' ,'인당 평균 교환 UCD']
                    ,el : rowEl
                };
            case 'cancel':
                for (i; i<rows.length; i++)
                {
                    let row = rows[i];
                    rowEl +=
                        `<tr>
                            <td class="cursor-default">${row.created_date}</td>
                            <td class="cursor-default">${numberWithCommas(row.ucd)}</td>
                        </tr>`
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
                    rowEl +=
                        `<tr>
                            <td class="cursor-default">${row.created_date}</td>
                            <td class="cursor-default">${numberWithCommas(tot)}</td>
                            <td class="cursor-default">${numberWithCommas(user)}</td>
                            <td class="cursor-default">${numberWithCommas(company)}</td>
                        </tr>`
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
            case 'reward':
                return [{
                    label: label.regular,
                    data: chartData.doit,
                    fill: false,
                    lineTension: 0.1,
                    borderColor: color.mintSky,
                    borderWidth : 2,
                    pointBackgroundColor: color.mintSky,
                    backgroundColor: color.black
                }, {
                    label: label.promotion,
                    data: chartData.promotion,
                    fill: false,
                    lineTension: 0.1,
                    borderColor: color.jyBlue,
                    borderWidth : 2,
                    pointBackgroundColor: color.jyBlue,
                    backgroundColor: color.black
                }];
            case 'budget':
                return [{
                    label: '프로모션 예산',
                    data: chartData.ucd,
                    lineTension: 0.1,
                    borderColor: color.jyBlue,
                    borderWidth : 2,
                    pointBackgroundColor: color.jyBlue,
                    backgroundColor: color.black
                }];
            case 'doit':
                return [{
                    label: '두잇 개설',
                    data: chartData.ucd,
                    lineTension: 0.1,
                    borderColor: color.jyBlue,
                    borderWidth : 2,
                    pointBackgroundColor: color.jyBlue,
                    backgroundColor: color.black
                }];
            case 'exchange':
                return [{
                    label: '상품교환',
                    data: chartData.ucd,
                    fill: false,
                    lineTension: 0.1,
                    borderColor: color.jyBlue,
                    borderWidth : 2,
                    pointBackgroundColor: color.jyBlue,
                    backgroundColor: color.black
                }];
            case 'cancel':
                return [{
                    label: '취소',
                    data: chartData.ucd,
                    fill: false,
                    lineTension: 0.1,
                    borderColor: color.jyBlue,
                    borderWidth : 2,
                    pointBackgroundColor: color.jyBlue,
                    backgroundColor: color.black
                }];
            default:
                return;
        }
    }

    function toggleLegend()
    {
        switch(g_ucd_type) {
            case 'create':
                return dailyChart.options.legend.display = true;
            case 'reward':
                return dailyChart.options.legend.display = true;
            case 'budget':
                return dailyChart.options.legend.display = false;
            case 'doit':
                return dailyChart.options.legend.display = false;
            case 'exchange':
                return dailyChart.options.legend.display = false;
            case 'cancel':
                return dailyChart.options.legend.display = false;
            default:
                return dailyChart.options.legend.display = true;
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