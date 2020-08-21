
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
        getDoitStatus();
        getDailyActions();
        getPopularDoit();
    }

    function updatePage()
    {
        g_page_type = 'update';
        getUserInfo();
        getDoitStatus();
        getDailyActions();
        getPopularDoit();
    }

    function getUserInfo()
    {
        let url = api.getEventType
        let errMsg = `상단 회원데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from" : dateSelected.text(),
            "to" : dateSelected.text()
        });

        ajaxRequestWithJsonData(false, url, param, getUserInfoCallback, errMsg, false);
    }

    function getUserInfoCallback(data)
    {
    
    }
    
    function getDoitStatus()
    {
        let url = api.getEventType
        let errMsg = `두잇현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from" : dateSelected.text(),
            "to" : dateSelected.text()
        });
        let callback = g_page_type === 'init' ? initDoughnut : updateDoughnut;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function initDoughnut(data)
    {
        let dataset = [{
            data : [161, 71]
            ,backgroundColor : [color.jyBlue, color.mintSky]
        }]

        doughnutCtx1 = initChart(doughnut1, chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
        doughnutCtx2 = initChart(doughnut2, chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
        doughnutCtx3 = initChart(doughnut3, chartType.doughnut, chartLabels.successYn, dataset, chartOptions.doughnutOptions);
        doughnutCtx4 = initChart(doughnut4, chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
    }

    function updateDoughnut(data)
    {
        let doughnutData1 = [];
        for (let i=0; i<2; i++) doughnutData1.push(Math.floor(Math.random()*100));
        let doughnutData2 = [];
        for (let i=0; i<2; i++) doughnutData2.push(Math.floor(Math.random()*100));
        let doughnutData3 = [];
        for (let i=0; i<2; i++) doughnutData3.push(Math.floor(Math.random()*100));
        let doughnutData4 = [];
        for (let i=0; i<2; i++) doughnutData4.push(Math.floor(Math.random()*100));

        doughnutCtx1.data.datasets[0].data = doughnutData1;
        doughnutCtx1.update();

        doughnutCtx2.data.datasets[0].data = doughnutData2;
        doughnutCtx2.update();

        doughnutCtx3.data.datasets[0].data = doughnutData3;
        doughnutCtx3.update();

        doughnutCtx4.data.datasets[0].data = doughnutData4;
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
