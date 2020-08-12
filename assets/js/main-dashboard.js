
    const baseDate          = $('#today-date');
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
    const certYearSelectBox = document.getElementById('cert-year-select');

    /** 현재 연도-월-일 구하기 **/
    let day = new Date();
    let year = day.getFullYear();
    let month = day.getMonth() + 1;
    let date = day.getDate();
    let hours = day.getHours();
    let minutes = day.getMinutes();

    /** 로드 바로 실행 **/
    document.addEventListener("DOMContentLoaded", function () {
        setBaseDate();
        initSelectBox();
        /** 상단 ucd 정보 **/
        getUcdStatus();
        /** 일 별  인증 수 차트**/
        getDailyActions();
        /** 두잇 진행상태 별 차트 **/
        getDoitStatus();
        /** 월 별 개설 두잇 수 차트 **/
        getMonthlyDoit();
        /** 가입자 현황 정보 **/
        getUserStatus();
        /** 월단위 셀렉박스 이벤트 **/
        yearSelectBox       .addEventListener('change', function () { updateMonthlyDoitChart(); });
        certYearSelectBox   .addEventListener('change', function () { updateDailyActionChart(); });
        certMonthSelectBox  .addEventListener('change', function () { updateDailyActionChart(); });
    });

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
            lineTension: 0,
            borderColor: color.jyBlue,
            borderWidth : 2.2,
            pointBackgroundColor: color.white,
            backgroundColor: color.black
        }];

        dailyActionChart = initChart(certMonthChart, chartType.line, label, dataset, chartOptions.options);
        dailyActionChart.options.legend.display = false;
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
            ,backgroundColor : [color.prussianBlue, color.dodgerBlue]
        }]

        let progressDataset = [{
            data : [ingData.user_cnt, ingData.company_cnt]
            ,backgroundColor : [color.prussianBlue, color.dodgerBlue]
        }]

        let endDataset = [{
            data : [endData.user_cnt, endData.company_cnt]
            ,backgroundColor : [color.prussianBlue, color.dodgerBlue]
        }]

        let cancelDataset = [{
            data : [cancelData.cancle, cancelData.delete]
            ,backgroundColor : [color.prussianBlue, color.dodgerBlue]
        }]

        initChart(pendingCtx, chartType.doughnut, chartLabels.doitType, pendingDataset, chartOptions.doughnutOptions);
        preUserEl   .text(getDoitStatusTextValue(preData.user_cnt));
        preCompanyEl.text(getDoitStatusTextValue(preData.company_cnt));
        preTotalEl  .text(getDoitStatusTextValue(preData.total_cnt));

        initChart(progressingCtx, chartType.doughnut, chartLabels.doitType, progressDataset, chartOptions.doughnutOptions);
        ingUserEl   .text(getDoitStatusTextValue(ingData.user_cnt));
        ingCompanyEl.text(getDoitStatusTextValue(ingData.company_cnt));
        ingTotalEl  .text(getDoitStatusTextValue(ingData.total_cnt));

        initChart(completeCtx, chartType.doughnut, chartLabels.doitType, endDataset, chartOptions.doughnutOptions);
        endUserEl   .text(getDoitStatusTextValue(endData.user_cnt));
        endCompanyEl.text(getDoitStatusTextValue(endData.company_cnt));
        endTotalEl  .text(getDoitStatusTextValue(endData.total_cnt));

        initChart(cancelCtx, chartType.doughnut, chartLabels.cancelType, cancelDataset, chartOptions.doughnutOptions);
        cancelEl        .text(getDoitStatusTextValue(cancelData.cancle));
        deleteEl        .text(getDoitStatusTextValue(cancelData.delete));
        cancelTotalEl   .text(getDoitStatusTextValue(cancelData.total));
    }

    function getDoitStatusTextValue(_value)
    {
        return Number(_value) >= 1000 ? numberWithCommas(Number(_value)/1000)+'k' : numberWithCommas(_value);
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
            lineTension: 0,
            data: data.data.total,
            borderColor: color.jyBlue,
            borderWidth : 2.2,
            pointBackgroundColor: color.white,
            backgroundColor: color.black
        }, {
            label: '일반',
            data: data.data.user,
            backgroundColor: color.prussianBlue
        }, {
            label: '프로모션',
            data: data.data.company,
            backgroundColor: color.dodgerBlue
        }];

        monthlyDoitChart = initChart(monthlyMixedChart, chartType.bar, label.monthNames, dataset, chartOptions.options);
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
