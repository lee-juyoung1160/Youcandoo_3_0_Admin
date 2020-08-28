
    let minDate;
    let maxDate;
    let doughnutCtx1;
    let doughnutCtx2;
    let doughnutCtx3;
    let doughnutCtx4;
    let dailyActionCtx;
    let dailyTotalCtx;
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
    const applyDoit     = $('#applyDoit');
    const actionCount   = $('#actionCount');
    const avgActions    = $('#avgActions');
    const avgAttend     = $('#avgAttend');
    const doughnut3     = $('#doughnut3');
    const successDoit   = $('#successDoit');
    const failDoit      = $('#failDoit');
    const avgSuccess    = $('#avgSuccess');
    const reviewCount   = $('#reviewCount');
    const doughnut4     = $('#doughnut4');
    const yellowCount   = $('#yellowCount');
    const redCount      = $('#redCount');
    const reportCount   = $('#reportCount');
    const userReportCount = $('#userReportCount');
    const dailyActions  = $('#dailyActions');
    const popularDoit   = $('#popularDoit');
    const dailyTotal    = $('#dailyTotalUser');
    const yearEl  = $("#selYear");
    const monthEl = $("#selMonth");
    const yearEl2 = $("#selYear2");
    const monthEl2 = $("#selMonth2");
    const btnReloadPopular = $("#btnReloadPopular");

    /** 현재 연도-월-일 구하기 **/
    /** 로드 바로 실행 **/
    $(() => {
        initMinMaxDate();
        initSelectBox();
        setBaseDate();
        initPage();

        datePrev .on('click', function () { onClickPrev(this); });
        dateNext .on('click', function () { onClickNext(this); });
        yearEl   .on('change', function () { onChangeSelectBoxForDailyActions(); });
        monthEl  .on('change', function () { onChangeSelectBoxForDailyActions(); });
        yearEl2  .on('change', function () { onChangeSelectBoxForDailyTotal(); });
        monthEl2 .on('change', function () { onChangeSelectBoxForDailyTotal(); });
        btnReloadPopular .on('click', function () { onCickReloadPopularDoit(); });
    })

    function initMinMaxDate()
    {
        let d = new Date();
        maxDate = getStringFormatToDate(d, '-');
        d.setMonth(d.getMonth() - 1)
        minDate = getStringFormatToDate(d, '-');
    }

    function initSelectBox()
    {
        let defaultYear  = 2020;
        let defaultMonth = 7;
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;

        for (defaultYear; defaultYear <= year; defaultYear++)
            $(".select-year").prepend(`<option value="${defaultYear}">${defaultYear}년</option>`);

        for (defaultMonth; defaultMonth <= month; defaultMonth++)
            $(".select-month").prepend(`<option value="${appendZero(defaultMonth)}">${appendZero(defaultMonth)}월</option>`);

        initSelectOption();
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

    function onChangeSelectBoxForDailyActions()
    {
        g_page_type = 'update';
        getDailyActions();
    }

    function onChangeSelectBoxForDailyTotal()
    {
        g_page_type = 'update';
        getDailyTotalUser();
    }

    function initPage()
    {
        getUserInfo();
        getDoitOpenStatus();
        getDoitJoinStatus();
        getDoitClosedStatus();
        getReportStatus();
        getDailyActions();
        initPopularDoitBaseDate();
        getPopularDoit();
        getDailyTotalUser();
    }

    function updatePage()
    {
        g_page_type = 'update';
        getUserInfo();
        getDoitOpenStatus();
        getDoitJoinStatus();
        getDoitClosedStatus();
        getReportStatus();
    }

    function getUserInfo()
    {
        let url = api.getUserStatus
        let errMsg = `상단 회원데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from_date" : dateSelected.text(),
            "to_date" : dateSelected.text()
        });

        ajaxRequestWithJsonData(false, url, param, getUserInfoCallback, errMsg, false);
    }

    function getUserInfoCallback(data)
    {
        let { new_user, leave_user, gang_user, total_user } = data.data;

        newUser.html(numberWithCommas(new_user));
        leaveUser.html(numberWithCommas(leave_user));
        banUser.html(numberWithCommas(gang_user));
        totalUser.html(numberWithCommas(total_user));
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
        let { general_cnt, promotion_cnt, total_cnt } = data.data.chart;
        let dataset = [{
            data : [general_cnt, promotion_cnt]
            ,backgroundColor : [color.mintSky, color.jyBlue]
        }]

        doughnutCtx1 = initChart(doughnut1, chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
        Number(total_cnt) ? setTotalCountInPie(doughnutCtx1, total_cnt) : noDataToDisplay(doughnutCtx1);
        setDoitOpenSummary(data);
    }

    function updateDoitOpenStatus(data)
    {
        let { general_cnt, promotion_cnt, total_cnt } = data.data.chart;
        doughnutCtx1.data.datasets[0].data = [general_cnt, promotion_cnt];
        doughnutCtx1.update();
        Number(total_cnt) ? setTotalCountInPie(doughnutCtx1, total_cnt) : noDataToDisplay(doughnutCtx1);
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
        let url = api.getDoitJoinStatus
        let errMsg = `두잇참여현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from_date" : dateSelected.text(),
            "to_date" : dateSelected.text()
        });
        let callback = g_page_type === 'init' ? initDoitJoinStatus : updateDoitJoinStatus;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function initDoitJoinStatus(data)
    {
        let { general_cnt, promotion_cnt, total_cnt } = data.data.chart;
        let dataset = [{
            data : [general_cnt, promotion_cnt]
            ,backgroundColor : [color.mintSky, color.jyBlue]
        }]

        doughnutCtx2 = initChart(doughnut2, chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
        Number(total_cnt) ? setTotalCountInPie(doughnutCtx2, total_cnt) : noDataToDisplay(doughnutCtx2);
        setDoitJoinSummary(data);
    }

    function updateDoitJoinStatus(data)
    {
        let { general_cnt, promotion_cnt, total_cnt } = data.data.chart;

        doughnutCtx2.data.datasets[0].data = [general_cnt, promotion_cnt];
        doughnutCtx2.update();
        Number(total_cnt) ? setTotalCountInPie(doughnutCtx2, total_cnt) : noDataToDisplay(doughnutCtx2);
        setDoitJoinSummary(data);
    }

    function setDoitJoinSummary(data)
    {
        let { request_cnt, action_cnt, join_percent, action_percent } = data.data.data;
        applyDoit.html(numberWithCommas(request_cnt));
        actionCount.html(numberWithCommas(action_cnt));
        avgActions.html(numberWithCommas(`${Number(action_percent).toFixed(1)}<em>%</em>`));
        avgAttend.html(numberWithCommas(`${Number(join_percent).toFixed(1)}<em>%</em>`));
    }

    function getDoitClosedStatus()
    {
        let url = api.getDoitClosedStatus
        let errMsg = `두잇종료현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from_date" : dateSelected.text(),
            "to_date" : dateSelected.text()
        });
        let callback = g_page_type === 'init' ? initDoitClosedStatus : updateDoitClosedStatus;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function initDoitClosedStatus(data)
    {
        let { success, fail, total } = data.data.chart;
        let dataset = [{
            data : [success, fail]
            ,backgroundColor : [color.mintSky, color.jyBlue]
        }]

        doughnutCtx3 = initChart(doughnut3, chartType.doughnut, chartLabels.successYn, dataset, chartOptions.doughnutOptions);
        Number(total) ? setTotalCountInPie(doughnutCtx3, total) : noDataToDisplay(doughnutCtx3);
        setDoitClosedSummary(data);
    }

    function updateDoitClosedStatus(data)
    {
        let { success, fail, total } = data.data.chart;

        doughnutCtx3.data.datasets[0].data = [success, fail];
        doughnutCtx3.update();
        Number(total) ? setTotalCountInPie(doughnutCtx3, total) : noDataToDisplay(doughnutCtx3);
        setDoitClosedSummary(data);
    }

    function setDoitClosedSummary(data)
    {
        let { success, fail, avg_goal_percent, review } = data.data.data;
        successDoit.html(numberWithCommas(success));
        failDoit.html(numberWithCommas(fail));
        avgSuccess.html(`${Number(avg_goal_percent).toFixed(1)}<em>%</em>`);
        reviewCount.html(numberWithCommas(review));
    }

    function getReportStatus()
    {
        let url = api.getReportStatus
        let errMsg = `신고현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "from_date" : dateSelected.text(),
            "to_date" : dateSelected.text()
        });
        let callback = g_page_type === 'init' ? initReportStatus : updateReportStatus;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function initReportStatus(data)
    {
        let { general_cnt, promotion_cnt, total_cnt } = data.data.chart;
        let dataset = [{
            data : [general_cnt, promotion_cnt]
            ,backgroundColor : [color.mintSky, color.jyBlue]
        }]

        doughnutCtx4 = initChart(doughnut4, chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
        Number(total_cnt) ? setTotalCountInPie(doughnutCtx4, total_cnt) : noDataToDisplay(doughnutCtx4);
        setReportSummary(data);
    }

    function updateReportStatus(data)
    {
        let { general_cnt, promotion_cnt, total_cnt } = data.data.chart;

        doughnutCtx4.data.datasets[0].data = [general_cnt, promotion_cnt];
        doughnutCtx4.update();
        Number(total_cnt) ? setTotalCountInPie(doughnutCtx4, total_cnt) : noDataToDisplay(doughnutCtx4);
        setReportSummary(data);
    }

    function setReportSummary(data)
    {
        let { yellow_card_cnt, red_card_cnt, report_cnt } = data.data.data;
        yellowCount.html(numberWithCommas(yellow_card_cnt));
        redCount.html(numberWithCommas(red_card_cnt));
        reportCount.html(numberWithCommas(report_cnt));
        userReportCount.html(numberWithCommas(0));
    }

    function getDailyActions()
    {
        let url = api.getDailyAction;
        let errMsg = `월간인증현황 데이터${message.ajaxLoadError}`;
        let param = JSON.stringify({
            "year": yearEl.val(),
            "month" : monthEl.val()
        });
        let callback = g_page_type === 'init' ? initDailyActionChart : updateDailyActionChart;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function initDailyActionChart(data)
    {
        let { result } = data.data;
        let xLabel  = getDayNames(yearEl.val(), monthEl.val());
        let dataset = [{
            data : result,
            lineTension: 0.1,
            borderColor: color.jyBlue,
            borderWidth : 2,
            pointBackgroundColor: color.jyBlue,
            backgroundColor: color.black
        }];

        dailyActionCtx = initChart(dailyActions, chartType.line, xLabel, dataset, chartOptions.noLegendLineOption);
    }

    function updateDailyActionChart(data)
    {
        let { result } = data.data;
        let xLabel  = getDayNames(yearEl.val(), monthEl.val());

        dailyActionCtx.data.labels = xLabel;
        dailyActionCtx.data.datasets[0].data = result;
        dailyActionCtx.update();
    }

    function setTotalCountInPie(chartCtx, data)
    {
        chartCtx.options.elements.center.text = numberWithCommas(data);
    }

    function onCickReloadPopularDoit()
    {
        initPopularDoitBaseDate();
        getPopularDoit();
    }

    function initPopularDoitBaseDate()
    {
        let d = new Date();
        /*let year     = d.getFullYear();
        let month    = d.getMonth() + 1;
        let date     = d.getDate();*/
        let hours    = d.getHours();
        let minutes  = d.getMinutes();
        let seconds  = d.getSeconds();
        /*let baseDate = `${year}.${appendZero(month)}.${appendZero(date)} ${appendZero(hours)}:${appendZero(minutes)}:${appendZero(seconds)} 참여자 수 기준`*/
        let baseDate = `오늘 ${appendZero(hours)}:${appendZero(minutes)}:${appendZero(seconds)} 참여자 수 기준`

        $("#basis").html(baseDate);
    }

    function getPopularDoit()
    {
        let url = api.getPopularDoits;
        let errMsg = `인기두잇 데이터${message.ajaxLoadError}`

        ajaxRequestWithJsonData(false, url, null, getPopularDoitCallback, errMsg, false);
    }

    function getPopularDoitCallback(data)
    {
        let popularDoits = data.data;
        let innerEl = '';

        popularDoits.map(({ doit_title, cnt }, idx) => {
            let rankFirst = idx === 0 ? '<i class="fas fa-crown rank-first"></i>' : '';
            innerEl +=
                `<li class="clearfix">
                    ${rankFirst}
                    <strong class="rank"><em>${idx+1}</em></strong>
                    <span class="rank-title">${doit_title}</span>
                    <p class="user-num"><i class="fas fa-user"></i>${numberWithCommas(cnt)}</p>
                </li>`
        })

        popularDoit.html(innerEl);
    }
    
    function getDailyTotalUser()
    {
        let url = api.getDailyTotal;
        let errMsg = `일별 누적회원 데이터${message.ajaxLoadError}`
        let param = JSON.stringify({
            "year": yearEl2.val(),
            "month" : monthEl2.val()
        });
        let callback = g_page_type === 'init' ? initDailyTotalUserChart : updateDailyTotalUserChart;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function initDailyTotalUserChart(data)
    {
        let xLabel  = getDayNames(yearEl2.val(), monthEl2.val());
        let { user, doit } = data.data.series;
        let dataset = [{
            data : user,
            label : '누적 회원 수',
            yAxisID: 'leftY',
            lineTension: 0.1,
            borderColor: color.jyBlue,
            borderWidth : 2,
            pointBackgroundColor: color.jyBlue,
            backgroundColor: color.black
        }, {
            type : 'bar',
            data : doit,
            label : '개설 두잇 수',
            yAxisID: 'rightY',
            barPercentage : 0.5,
            /*barThickness : '1',*/
            backgroundColor: color.mintSky
            /*yAxisID: 'rightY',
            lineTension: 0.1,
            borderColor: color.mintSky,
            borderWidth : 2,
            pointBackgroundColor: color.mintSky,
            backgroundColor: color.black*/
        }];

        let options = {
            legend: {
                align: 'center',
                position: 'top',
                onClick: function(e, legendItem) {
                    let index = legendItem.datasetIndex;
                    let ci = this.chart;
                    let meta = ci.getDatasetMeta(index);

                    if (meta.type === 'bar')
                    {
                        let displayRightY = meta.controller.chart.options.scales.yAxes[1].display;
                        meta.controller.chart.options.scales.yAxes[1].display = !displayRightY;
                    }
                    else
                    {
                        let displayLeftY = meta.controller.chart.options.scales.yAxes[0].display;
                        meta.controller.chart.options.scales.yAxes[0].display = !displayLeftY;
                    }

                    meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;

                    ci.update();
                }
            },
            tooltips : {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return numberWithCommas(tooltipItem.value);
                    }
                }
            },
            scales: {
                yAxes: [{
                    id: 'leftY',
                    type: 'linear',
                    position: 'left',
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#3f6ccd',
                        callback: function(value, index, values) {
                            return convertNumberToKvalue(value);
                        }
                    }
                }, {
                    id: 'rightY',
                    type: 'linear',
                    position: 'right',
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#38c3d1',
                        callback: function(value, index, values) {
                            return convertNumberToKvalue(value);
                        }
                    }
                }]
            },
            maintainAspectRatio : false
        }

        dailyTotalCtx = initChart(dailyTotal, chartType.line, xLabel, dataset, options);
    }

    function updateDailyTotalUserChart(data)
    {
        let xLabel  = getDayNames(yearEl2.val(), monthEl2.val());
        let { user, doit } = data.data.series;

        dailyTotalCtx.data.labels = xLabel;
        dailyTotalCtx.data.datasets[0].data = user;
        dailyTotalCtx.data.datasets[1].data = doit;
        dailyTotalCtx.update();
    }
    

    function getDayNames(_year, _month)
    {
        let lastDayNum  = getLastDayNumber(Number(_year), Number(_month));
        let dayNames    = [];
        for (let i=1; i<=lastDayNum; i++)
            dayNames.push(i+'일');

        return dayNames;
    }