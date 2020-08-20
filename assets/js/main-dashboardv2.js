
    /*const baseDate          = $('#today-date');
    const ucdUser           = $('#ucd-user');
    const ucdDoit           = $('#ucd-doit');
    const ucdCompany        = $('#ucd-company');
    const ucdPromotion      = $('#ucd-promotion');
    const newUser           = $('#new-user');
    const joinUser          = $('#join-user');
    const leaveUser         = $('#leave-user');
    const totalUser         = $('#total-user');
    const pendingCtx        = $('#pending-doughnut');
    const progressingCtx    = $('#progress-doughnut');
    const completeCtx       = $('#complete-doughnut');
    const cancelCtx         = $('#cancel-doughnut');
    const endUserEl         = $('#end-user');
    const endCompanyEl      = $('#end-company');
    const endTotalEl        = $('#end-total');
    const ingUserEl         = $('#ing-user');
    const ingCompanyEl      = $('#ing-company');
    const ingTotalEl        = $('#ing-total');
    const preUserEl         = $('#pre-user');
    const preCompanyEl      = $('#pre-company');
    const preTotalEl        = $('#pre-total');
    const cancelEl          = $('#cancle');
    const deleteEl          = $('#delete');
    const cancelTotalEl     = $('#total');
    const monthlyMixedChart = $('#monthly-mixedChart');
    const certMonthChart    = $('#cert-month-chart');
    const yearSelectBox = document.getElementById('doit-year-select');
    const certMonthSelectBox = document.getElementById('cert-month-select');
    const certYearSelectBox = document.getElementById('cert-year-select');*/

    const datePrev     = $('#datePrev');
    const dateSelected = $('#dateSelected');
    const dateNext     = $('#dateNext');

    /** 현재 연도-월-일 구하기 **/
    let d = new Date();
    getStringFormatToDate(d, '-');
    dateSelected.html
    /** 로드 바로 실행 **/
    document.addEventListener("DOMContentLoaded", function () {
        doughnutChart();
        /*getDoitStatus();
        /!** 월 별 개설 두잇 수 차트 **!/
        getMonthlyDoit();
        /!** 가입자 현황 정보 **!/
        getUserStatus();
        /!** 월단위 셀렉박스 이벤트 **!/
        yearSelectBox       .addEventListener('change', function () { updateMonthlyDoitChart(); });
        certYearSelectBox   .addEventListener('change', function () { updateDailyActionChart(); });
        certMonthSelectBox  .addEventListener('change', function () { updateDailyActionChart(); });*/
    });

    function doughnutChart() {
        let dataset = [{
            data : [19, 71]
            ,backgroundColor : [color.jyBlue, color.mintSky]
        }]

        initChart($("#doughnut1"), chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
        initChart($("#doughnut2"), chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
        initChart($("#doughnut3"), chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);
        initChart($("#doughnut4"), chartType.doughnut, chartLabels.doitType, dataset, chartOptions.doughnutOptions);


        let lineData = []
        let lineLabel = []
        for (var i = 0; i<31; i++)
        {
            lineLabel.push(i)
            lineData.push(Math.floor(Math.random()*100));
        }
        let lineDataset = [{
            data : lineData,
            barThickness : 10,
            backgroundColor: color.jyBlue
        }];
        initChart($("#dailyActionChart"), chartType.bar, lineLabel, lineDataset, chartOptions.noLegend);
    }

    function setBaseDate()
    {
        let dateTxt = year + '.' + appendZero(month) + '.' + appendZero(date) + '. ' + appendZero(hours) + ':' + appendZero(minutes) + ' 기준';
        baseDate.text(dateTxt);
    }

    let defaultYear  = 2020;
    let defaultMonth = 7;
    function initSelectBox()
    {
        for (defaultYear; defaultYear <= year; defaultYear++)
        {
            yearSelectBox.prepend(new Option( defaultYear + "년", defaultYear.toString()));
            certYearSelectBox.prepend(new Option( defaultYear + "년", defaultYear.toString()));
        }

        for (defaultMonth; defaultMonth <= month; defaultMonth++)
            certMonthSelectBox.prepend(new Option( appendZero(defaultMonth) + "월", appendZero(defaultMonth)));

        initSelectOption();
    }

    /** UCD 정보 **/
    function getUcdStatus() {

        let url     = api.getUcdStat;
        let errMsg  = '가입자 현황'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, null, getUcdCallback, errMsg, false);
    }

    function getUcdCallback(data)
    {
        isSuccessResp(data) ? getUcdSuccess(data) : sweetToast(invalidResp(data));
    }

    function getUcdSuccess(data)
    {
        ucdUser.text(data.data.user);
        countAnimation(ucdUser);
        ucdDoit.text(data.data.doit);
        countAnimation(ucdDoit);
        ucdCompany.text(data.data.company);
        countAnimation(ucdCompany);
        ucdPromotion.text(data.data.promotion);
        countAnimation(ucdPromotion);
    }

    /** 일 별 인증 수 **/
    function getDailyActions()
    {
        let param = {
            'month': certMonthSelectBox.value,
            'year' : certYearSelectBox.value
        }

        let url     = api.getDailyAction;
        let errMsg  = '일 별 인증 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDailyActionsCallback, errMsg, false);
    }

    function getDailyActionsCallback(data)
    {
        isSuccessResp(data) ? getDailyActionsSuccess(data) : sweetToast(invalidResp(data));
    }

    let dailyActionChart;
    function getDailyActionsSuccess(data)
    {
        let label = data.data.day;
        let dataset = [{
            data: data.data.result,
            lineTension: 0.1,
            borderColor: color.jyBlue,
            borderWidth : 2,
            pointBackgroundColor: color.jyBlue,
            backgroundColor: color.black
        }];

        let options = {
            legend: {
                display: false
            },
            tooltips : {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return convertNumberToKvalue(tooltipItem.value);
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };

        dailyActionChart = initChart(certMonthChart, chartType.line, label, dataset, options);
    }

    /** 모집중, 진행중, 완료, 취소된 두잇 **/
    function getDoitStatus()
    {
        let url     = api.getDoitStat;
        let errMsg  = '두잇 상태 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, null, getDoitStatusCallback, errMsg, false);
    }

    function getDoitStatusCallback(data)
    {
        isSuccessResp(data) ? getDoitStatusSuccess(data) : sweetToast(invalidResp(data));
    }

    function getDoitStatusSuccess(data)
    {
        let respData    = data.data;
        let preData     = respData.pre;
        let ingData     = respData.ing;
        let endData     = respData.end;
        let cancelData  = respData.cancle;

        let pendingDataset = [{
            data : [preData.user_cnt, preData.company_cnt]
            ,backgroundColor : [color.jyBlue, color.mintSky]
        }]

        let progressDataset = [{
            data : [ingData.user_cnt, ingData.company_cnt]
            ,backgroundColor : [color.jyBlue, color.mintSky]
        }]

        let endDataset = [{
            data : [endData.user_cnt, endData.company_cnt]
            ,backgroundColor : [color.jyBlue, color.mintSky]
        }]

        let cancelDataset = [{
            data : [cancelData.cancle, cancelData.delete]
            ,backgroundColor : [color.jyBlue, color.mintSky]
        }]

        initChart(pendingCtx, chartType.doughnut, chartLabels.doitType, pendingDataset, chartOptions.doughnutOptions);
        preUserEl   .text(convertNumberToKvalue(preData.user_cnt));
        preCompanyEl.text(convertNumberToKvalue(preData.company_cnt));
        preTotalEl  .text(convertNumberToKvalue(preData.total_cnt));

        initChart(progressingCtx, chartType.doughnut, chartLabels.doitType, progressDataset, chartOptions.doughnutOptions);
        ingUserEl   .text(convertNumberToKvalue(ingData.user_cnt));
        ingCompanyEl.text(convertNumberToKvalue(ingData.company_cnt));
        ingTotalEl  .text(convertNumberToKvalue(ingData.total_cnt));

        initChart(completeCtx, chartType.doughnut, chartLabels.doitType, endDataset, chartOptions.doughnutOptions);
        endUserEl   .text(convertNumberToKvalue(endData.user_cnt));
        endCompanyEl.text(convertNumberToKvalue(endData.company_cnt));
        endTotalEl  .text(convertNumberToKvalue(endData.total_cnt));

        initChart(cancelCtx, chartType.doughnut, chartLabels.cancelType, cancelDataset, chartOptions.doughnutOptions);
        cancelEl        .text(convertNumberToKvalue(cancelData.cancle));
        deleteEl        .text(convertNumberToKvalue(cancelData.delete));
        cancelTotalEl   .text(convertNumberToKvalue(cancelData.total));
    }

    /** 월 별 개설 두잇 **/
    function getMonthlyDoit()
    {
        let param   = JSON.stringify({'year' : yearSelectBox.value});
        let url     = api.getMonthlyDoit;
        let errMsg  = '월 별 두잇 개설 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, param, getMonthlyDoitCallback, errMsg, false);
    }

    function getMonthlyDoitCallback(data)
    {
        isSuccessResp(data) ? getMonthlyDoitSuccess(data) : sweetToast(invalidResp(data));
    }

    let monthlyDoitChart;
    function getMonthlyDoitSuccess(data)
    {
        let dataset = [{
            label: '전체',
            type: 'line',
            lineTension: 0.1,
            data: data.data.total,
            borderColor: color.jyBlue,
            borderWidth : 2,
            pointBackgroundColor: color.jyBlue,
            backgroundColor: color.black
        }, {
            label: '일반',
            data: data.data.user,
            backgroundColor: color.jyBlue
        }, {
            label: '프로모션',
            data: data.data.company,
            backgroundColor: color.mintSky
        }];

        monthlyDoitChart = initChart(monthlyMixedChart, chartType.bar, label.monthNames, dataset, chartOptions.withLegend);
    }

    /** 가입자 현황 **/
    function getUserStatus()
    {
        let url     = api.getUserStat;
        let errMsg  = '가입자 현황'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, null, getUserStatusCallback, errMsg, false);
    }

    function getUserStatusCallback(data)
    {
        isSuccessResp(data) ? getUserStatusSuccess(data) : sweetToast(invalidResp(data));
    }

    function getUserStatusSuccess(data)
    {
        newUser     .text(numberWithCommas(data.data.new_user));
        joinUser    .text(numberWithCommas(data.data.join_user));
        leaveUser   .text(numberWithCommas(data.data.leave_user));
        totalUser   .text(data.data.total_user);

        countAnimation(totalUser);
    }

    /** 일별인증 차트 업데이트(셀렉트박스 이벤트) **/
    function updateDailyActionChart()
    {
        let param = {
            'month': certMonthSelectBox.value,
            'year' : certYearSelectBox.value
        }

        let url     = api.getDailyAction;
        let errMsg  = '일 별 인증 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, JSON.stringify(param), updateDailyActionChartCallback, errMsg, false);
    }

    function updateDailyActionChartCallback(_data)
    {
        dailyActionChart.data.datasets[0].data = _data.data.result;
        dailyActionChart.update();
    }

    /** 월별 개설 두잇 차트 업데이트(셀렉트박스 이벤트) **/
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
