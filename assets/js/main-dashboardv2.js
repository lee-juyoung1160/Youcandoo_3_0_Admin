
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
    const applyDoit     = $('#applyDoit');
    const cancelAttend  = $('#cancelAttend');
    const actionCount   = $('#actionCount');
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
    const yearEl  = $("#selYear");
    const monthEl = $("#selMonth");

    /** 현재 연도-월-일 구하기 **/
    /** 로드 바로 실행 **/
    $(() => {
        initMinMaxDate();
        initSelectBox();
        setBaseDate();
        initPage();

        datePrev.on('click', function () { onClickPrev(this); });
        dateNext.on('click', function () { onClickNext(this); });
        yearEl  .on('change', function () { onChangeSelectBox(this); });
        monthEl .on('change', function () { onChangeSelectBox(this); });
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

    function onChangeSelectBox()
    {
        g_page_type = 'update';
        getDailyActions();
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
        getPopularDoit();
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
        let url = api.getDoitOpenStatus
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
        let summaryData = data.data.data;
        applyDoit.html(numberWithCommas(summaryData.모집중));
        cancelAttend.html(numberWithCommas(summaryData.진행중));
        actionCount.html(numberWithCommas(summaryData.개설취소));
        avgAttend.html(numberWithCommas(summaryData.모집실패));
    }

    function getDoitClosedStatus()
    {
        let url = api.getDoitOpenStatus
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
        let { general_cnt, promotion_cnt, total_cnt } = data.data.chart;
        let dataset = [{
            data : [general_cnt, promotion_cnt]
            ,backgroundColor : [color.mintSky, color.jyBlue]
        }]

        doughnutCtx3 = initChart(doughnut3, chartType.doughnut, chartLabels.successYn, dataset, chartOptions.doughnutOptions);
        Number(total_cnt) ? setTotalCountInPie(doughnutCtx3, total_cnt) : noDataToDisplay(doughnutCtx3);
        setDoitClosedSummary(data);
    }

    function updateDoitClosedStatus(data)
    {
        let { general_cnt, promotion_cnt, total_cnt } = data.data.chart;

        doughnutCtx3.data.datasets[0].data = [general_cnt, promotion_cnt];
        doughnutCtx3.update();
        Number(total_cnt) ? setTotalCountInPie(doughnutCtx3, total_cnt) : noDataToDisplay(doughnutCtx3);
        setDoitClosedSummary(data);
    }

    function setDoitClosedSummary(data)
    {
        let summaryData = data.data.data;
        successDoit.html(numberWithCommas(summaryData.모집중));
        failDoit.html(numberWithCommas(summaryData.진행중));
        avgSuccess.html(`${Number(summaryData.개설취소).toFixed(1)}<em>%</em>`);
        reviewCount.html(numberWithCommas(summaryData.모집실패));
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
        let datas = data.data.result;
        let xLabel  = getDayNames(yearEl.val(), monthEl.val());
        let dataset = [{
            data : datas,
            lineTension: 0.1,
            borderColor: color.jyBlue,
            borderWidth : 2,
            pointBackgroundColor: color.jyBlue,
            backgroundColor: color.black
        }];

        dailyActionCtx = initChart(dailyActions, chartType.line, xLabel, dataset, chartOptions.noLegend);
    }

    function updateDailyActionChart(data)
    {
        let datas = data.data.result;
        let xLabel  = getDayNames(yearEl.val(), monthEl.val());

        dailyActionCtx.data.labels = xLabel;
        dailyActionCtx.data.datasets[0].data = datas;
        dailyActionCtx.update();
    }

    function setTotalCountInPie(chartCtx, data)
    {
        chartCtx.options.elements.center.text = numberWithCommas(data);
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

    function getDayNames(_year, _month)
    {
        let lastDayNum  = getLastDayNumber(Number(_year), Number(_month));
        let dayNames    = [];
        for (let i=1; i<=lastDayNum; i++)
            dayNames.push(i+'일');

        return dayNames;
    }