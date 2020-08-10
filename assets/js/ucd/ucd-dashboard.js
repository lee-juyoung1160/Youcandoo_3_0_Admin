
    const issuanceUcd   = $('#issuanceUcd');
    const accumulateUcd = $('#accumulateUcd');
    const balanceUcd    = $('#balanceUcd');
    const doitUcd       = $('#doitUcd');
    const exchangeUcd   = $('#exchangeUcd');
    const cancelUcd     = $('#cancelUcd');
    const select    = $('select');
    const selYear   = $('#selYear');
    const selMonth  = $('#selMonth');
    const dailyInfo = $('#dailyInfo');

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
        /*initDetailChart();*/
        getDetailSuccess();
        /** 월단위 셀렉박스 이벤트 **/
        issuanceUcd     .on('click', function () { onClickLiElement(this); });
        accumulateUcd   .on('click', function () { onClickLiElement(this); });
        balanceUcd      .on('click', function () { onClickLiElement(this); });
        doitUcd         .on('click', function () { onClickLiElement(this); });
        exchangeUcd     .on('click', function () { onClickLiElement(this); });
        cancelUcd       .on('click', function () { onClickLiElement(this); });
        /*selYear       .on('click', function () { updateDetailChart(); });
        selMonth   .on('click', function () { updateDetailChart(); });*/
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
        let url     = api.summaryUcd;
        let errMsg  = '상단 UCD 누적 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, null, getSummaryUcdCallback, errMsg, false);
    }

    function getSummaryUcdCallback(data)
    {
        isSuccessResp(data) ? getSummaryUcdSuccess(data) : sweetToast(invalidResp(data));
    }

    function getSummaryUcdSuccess(data)
    {
        console.log(data)
        let detail = data.data;
        let issuancePersonal = detail.payment.company_ucd;
        let issuanceBiz      = detail.payment.user_ucd;
        let issuanceTotal    = Number(issuancePersonal) + Number(issuanceBiz);

        let rewardPromo = Number(detail.reward.promotion_ucd);
        let rewardDoit  = Number(detail.reward.doit_ucd);
        let rewardAvg   = Number(detail.reward.avg_ucd);

        let balance     = detail.promotion.ucd;

        let doitCreate  = detail.create.ucd;

        let exchangeTotal = detail.exchange.ucd;
        let exchangeAvg   = detail.exchange.avg_ucd;

        let cancel      = detail.cancel.ucd;

    }

    /** 상세정보 차트 초기화 **/
    function initDetailChart()
    {
        let param = {
            'month': certMonthSelectBox.value,
            'year' : certYearSelectBox.value
        }

        let url     = api.getDailyAction;
        let errMsg  = '차트 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
    }

    function getDetailCallback(data)
    {
        isSuccessResp(data) ? getDetailSuccess(data) : sweetToast(invalidResp(data));
    }

    let detailChart;
    function getDetailSuccess()
    {
        let lastDayNum = getLastDayNumber(year, month);
        let label = [];
        for (let i=1; i<=lastDayNum; i++)
            label.push(i+'일');

        let dataset = [{
            label: '개인',
            data: ['10', '20', '30', '40', '50'],
            backgroundColor: color.dodgerBlue
        }, {
            label: '기업',
            data: ['50', '60', '70', '80', '90'],
            backgroundColor: color.prussianBlue
        }];

        detailChart = initChart(dailyInfo, chartType.bar, label, dataset, options.barOptions);
    }

    function updateDetailChart()
    {
        let param = {
            'month': certMonthSelectBox.value,
            'year' : certYearSelectBox.value
        }

        let url     = api.getDailyAction;
        let errMsg  = '일 별 인증 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, JSON.stringify(param), updateDetailChartCallback, errMsg, false);
    }

    function updateDetailChartCallback(_data)
    {
        /** 개인 **/
        detailChart.data.datasets[0].data = _data.data.result;
        /** 기업 **/
        detailChart.data.datasets[1].data = _data.data.result;
        detailChart.update();
    }

    function updateMonthlyDoitChart()
    {
        let param   = JSON.stringify({'year' : yearSelectBox.value});
        let url     = api.getMonthlyDoit;
        let errMsg  = '월 별 두잇 개설 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, param, updateMonthlyDoitChartCallback, errMsg, false);
    }

    function updateMonthlyDoitChartCallback(_data)
    {
        /** 전체 **/
        monthlyDoitChart.data.datasets[2].data = _data.data.total;
        /** 일반 **/
        monthlyDoitChart.data.datasets[0].data = _data.data.user;
        /** 프로모션 **/
        monthlyDoitChart.data.datasets[1].data = _data.data.company;
        monthlyDoitChart.update();
    }

    function onClickLiElement(obj)
    {
        console.log($(obj))
        toggleActive(obj);
    }

    function toggleActive(obj)
    {
        $(obj).siblings().removeClass('on');
        $(obj).addClass('on');
    }
