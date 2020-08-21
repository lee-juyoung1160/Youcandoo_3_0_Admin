
    let minDate;
    let maxDate;
    let doughnutCtx1;
    let doughnutCtx2;
    let doughnutCtx3;
    let doughnutCtx4;
    let dailyActionCtx;
    let g_page_type     = 'init';
    const datePrev      = $('#datePrev');
    const dateSelected  = $('#dateSelected');
    const dateNext      = $('#dateNext');
    const newUser       = $('#newUser');
    const leaveUser     = $('#leaveUser');
    const banUser       = $('#banUser');
    const totalUser     = $('#totalUser');
    const doughnut1     = $('#doughnut1');
    const pendingDoit     = $('#pendingDoit');
    const inProgressDoit  = $('#inProgressDoit');
    const cancelOpenDoit  = $('#cancelOpenDoit');
    const failOpenDoit    = $('#failOpenDoit');
    const doughnut2     = $('#doughnut2');
    const doughnut3     = $('#doughnut3');
    const doughnut4     = $('#doughnut4');
    const dailyActions  = $('#dailyActions');

    /** 현재 연도-월-일 구하기 **/
    /** 로드 바로 실행 **/
    $(() => {
        initMinMaxDate();
        setBaseDate();
        initPage();
        /*doughnutChart();*/

        datePrev       .on('click', function () { onClickPrev(this); });
        dateNext       .on('click', function () { onClickNext(this); });
    })

    function initMinMaxDate()
    {
        let d = new Date();
        maxDate = getStringFormatToDate(d, '-');
        d.setMonth(d.getMonth() - 1)
        minDate = getStringFormatToDate(d, '-');
    }

    function setBaseDate()
    {
        dateSelected.html(getStringFormatToDate(new Date(), '-'));
    }

    function toggleSideButton()
    {
        let selectedDate = dateSelected.text();

        datePrev.removeClass('disabled');
        dateNext.removeClass('disabled');
        if (selectedDate === minDate)
            datePrev.addClass('disabled');

        if (selectedDate === maxDate)
            dateNext.addClass('disabled');
    }

    function onClickPrev(obj)
    {
        if (!$(obj).hasClass('disabled'))
        {
            let d = new Date(dateSelected.text());
            d.setDate(d.getDate() - 1);
            dateSelected.text(getStringFormatToDate(d, '-'));

            toggleSideButton();
            updatePage();
        }
    }

    function onClickNext(obj)
    {
        if (!$(obj).hasClass('disabled'))
        {
            let d = new Date(dateSelected.text());
            d.setDate(d.getDate() + 1);
            dateSelected.text(getStringFormatToDate(d, '-'));

            toggleSideButton();
            updatePage();
        }
    }

    function initPage()
    {
        getUserInfo();
        getDoitOpenStatus();
        getDoitJoinStatus();
        getDoitClosedStatus();
        getReportStatus();
        getDailyActions();
        getPopularDoit();
    }

    function updatePage()
    {
        g_page_type = 'update';
        getUserInfo();
        getDoitOpenStatus();
        getDoitJoinStatus();
        getDoitClosedStatus();
        getReportStatus();
        getDailyActions();
        getPopularDoit();
    }

    function getUserInfo()
    {
        let url = api.getEventType
        let errMsg = `상단 회원데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from_date" : dateSelected.text(),
            "to_date" : dateSelected.text()
        });

        ajaxRequestWithJsonData(false, url, param, getUserInfoCallback, errMsg, false);
    }

    function getUserInfoCallback(data)
    {
    
    }
    
    function getDoitOpenStatus()
    {
        let url = api.getDoitOpenStatus
        let errMsg = `두잇개설현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from_date" : dateSelected.text(),
            "to_date" : dateSelected.text()
        });
        let callback = g_page_type === 'init' ? initDoitOpenStatus : updateDoitOpenStatus;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function initDoitOpenStatus(data)
    {
        let chartData = data.data.chart;
        let dataset = [{
            data : [chartData.general_cnt, chartData.promotion_cnt]
            ,backgroundColor : [color.mintSky, color.jyBlue]
        }]

        doughnutCtx1 = initChart(doughnut1, chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);

        setDoitOpenSummary(data);
    }

    function updateDoitOpenStatus(data)
    {
        let chartData = data.data.chart;

        doughnutCtx1.data.datasets[0].data = [chartData.general_cnt, chartData.promotion_cnt];
        doughnutCtx1.update();

        setDoitOpenSummary(data);
    }

    function setDoitOpenSummary(data)
    {
        let summaryData = data.data.data;
        pendingDoit.html(numberWithCommas(summaryData.모집중));
        inProgressDoit.html(numberWithCommas(summaryData.진행중));
        cancelOpenDoit.html(numberWithCommas(summaryData.개설취소));
        failOpenDoit.html(numberWithCommas(summaryData.모집실패));
    }

    function getDoitJoinStatus()
    {
        let url = api.getDoitOpenStatus
        let errMsg = `두잇참여현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from_date" : dateSelected.text(),
            "to_date" : dateSelected.text()
        });
        let callback = g_page_type === 'init' ? initDoughnut2 : updateDoughnut2;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function getDoitClosedStatus()
    {
        let url = api.getDoitOpenStatus
        let errMsg = `두잇종료현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from_date" : dateSelected.text(),
            "to_date" : dateSelected.text()
        });
        let callback = g_page_type === 'init' ? initDoughnut3 : updateDoughnut3;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function getReportStatus()
    {
        let url = api.getDoitOpenStatus
        let errMsg = `두잇종료현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from_date" : dateSelected.text(),
            "to_date" : dateSelected.text()
        });
        let callback = g_page_type === 'init' ? initDoughnut4 : updateDoughnut4;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }



    function initDoughnut2(data)
    {
        let chartData = data.data.chart;
        let dataset = [{
            data : [chartData.general_cnt, chartData.promotion_cnt]
            ,backgroundColor : [color.mintSky, color.jyBlue]
        }]

        doughnutCtx2 = initChart(doughnut2, chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
    }

    function initDoughnut3(data)
    {
        let chartData = data.data.chart;
        let dataset = [{
            data : [chartData.general_cnt, chartData.promotion_cnt]
            ,backgroundColor : [color.mintSky, color.jyBlue]
        }]

        doughnutCtx3 = initChart(doughnut3, chartType.doughnut, chartLabels.successYn, dataset, chartOptions.doughnutOptions);
    }

    function initDoughnut4(data)
    {
        let chartData = data.data.chart;
        let dataset = [{
            data : [chartData.general_cnt, chartData.promotion_cnt]
            ,backgroundColor : [color.mintSky, color.jyBlue]
        }]

        doughnutCtx4 = initChart(doughnut4, chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
    }



    function updateDoughnut2(data)
    {
        let chartData = data.data.chart;

        doughnutCtx2.data.datasets[0].data = [chartData.general_cnt, chartData.promotion_cnt];
        doughnutCtx2.update();
    }

    function updateDoughnut3(data)
    {
        let chartData = data.data.chart;

        doughnutCtx3.data.datasets[0].data = [chartData.general_cnt, chartData.promotion_cnt];
        doughnutCtx3.update();
    }

    function updateDoughnut4(data)
    {
        let chartData = data.data.chart;

        doughnutCtx4.data.datasets[0].data = [chartData.general_cnt, chartData.promotion_cnt];
        doughnutCtx4.update();
    }

    function getDailyActions()
    {
        let url = api.getEventType
        let errMsg = `두잇현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from" : dateSelected.text(),
            "to" : dateSelected.text()
        });
        let callback = g_page_type === 'init' ? initDailyActionChart : updateDailyActionChart;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function initDailyActionChart(data)
    {
        let barData = []
        let lineLabel = []
        for (var i = 0; i<31; i++)
        {
            lineLabel.push(i)
            barData.push(Math.floor(Math.random()*100));
        }
        let barDataset = [{
            data : barData,
            barThickness : 10,
            backgroundColor: color.jyBlue
        }];

        dailyActionCtx = initChart(dailyActions, chartType.bar, lineLabel, barDataset, chartOptions.noLegend);
    }

    function updateDailyActionChart(data)
    {
        let barData = []
        for (var i = 0; i<31; i++)
            barData.push(Math.floor(Math.random()*100));
        dailyActionCtx.data.datasets[0].data = barData;
        dailyActionCtx.update();
    }

    function getPopularDoit()
    {
        let url = api.getEventType;
        let errMsg = `인기두잇데이터${message.ajaxLoadError}`

        ajaxRequestWithJsonData(false, url, null, getPopularDoitCallback, errMsg, false);
    }

    function getPopularDoitCallback(data)
    {

    }
