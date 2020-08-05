
    const pendingCtx        = document.getElementById('pending-doughnut');
    const progressingCtx    = document.getElementById('progress-doughnut');
    const completeCtx       = document.getElementById('complete-doughnut');
    const cancelCtx         = document.getElementById('cancel-doughnut');
    const endUserEl         = document.getElementById('end-user');
    const endCompanyEl      = document.getElementById('end-company');
    const endTotalEl        = document.getElementById('end-total');
    const ingUserEl         = document.getElementById('ing-user');
    const ingCompanyEl      = document.getElementById('ing-company');
    const ingTotalEl        = document.getElementById('ing-total');
    const preUserEl         = document.getElementById('pre-user');
    const preCompanyEl      = document.getElementById('pre-company');
    const preTotalEl        = document.getElementById('pre-total');
    const cancelEl          = document.getElementById('cancle');
    const deleteEl          = document.getElementById('delete');
    const cancelTotalEl     = document.getElementById('total');
    const monthlyMixedChart = document.getElementById('monthly-mixedChart');
    const certMonthChart    = document.getElementById('cert-month-chart');
    const yearSelectBox = document.getElementById('doit-year-select');
    const certMonthSelectBox = document.getElementById('cert-month-select');
    const certYearSelectBox = document.getElementById('cert-year-select');

    /** 차트 레이아웃 구성 공통 부분 **/
    const options = {
        doughnutOptions: {
            legend: {
                align: 'start',
                labels: {
                    fontSize: 12,
                    boxWidth: 10,
                    hoverBorderWidth: 900
                }
            },
            maintainAspectRatio: false
        },
        barOptions: {
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
            }
        },
        lineOptions: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }
    const chartType = {
        doughnut : 'doughnut'
        ,line : 'line'
        ,bar : 'bar'
    }
    const labels = {
        doitType : ['일반', '프로모션']
        ,cancelType : ['모집실패', '개설취소']
    }
    const color = {
        white : 'rgba(255,255,255,1)'
        ,black : 'rgba(0, 0, 0, 0)'
        ,dodgerBlue : 'rgb(0, 122, 255)'
        ,prussianBlue : 'rgb(0, 48, 135)'
    };

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
        getDailyActions();
        getMonthlyDoit();
        getDoitStatus();
        getUserStatus();
        getUcdStatus();
        /** 월단위 셀렉박스 이벤트 **/
        yearSelectBox       .addEventListener('change', function () { destroyChart(monthlyDoitChart); getMonthlyDoit(); });
        certYearSelectBox   .addEventListener('change', function () { destroyChart(dailyActionChart); getDailyActions(); });
        certMonthSelectBox  .addEventListener('change', function () { destroyChart(dailyActionChart); getDailyActions(); });
    });

    function setBaseDate()
    {
        let result = document.getElementById('today-date');
        result.textContent = year + '.' + appendZero(month) + '.' + appendZero(date) + '. ' + appendZero(hours) + ':' + appendZero(minutes) + ' 기준';
    }

    function initSelectBox()
    {
        for (year; year >= 2020; year--)
        {
            if (year === 2020)
            {
                yearSelectBox.append(new Option( year + "년", year.toString()));
                certYearSelectBox.append(new Option( year + "년", year.toString()));
            }
            else
            {
                yearSelectBox.prepend(new Option( year + "년", year.toString()));
                certYearSelectBox.prepend(new Option( year + "년", year.toString()));
            }
        }

        onChangeSelectOption($('#cert-year-select'));
        onChangeSelectOption($('#doit-year-select'));

        for (month; month >= 7; month--)
            month === 7 ? certMonthSelectBox.append(new Option( appendZero(month) + "월", appendZero(month))) : certMonthSelectBox.prepend(new Option( appendZero(month) + "월", appendZero(month)));

        onChangeSelectOption($('#cert-month-select'));
    }

    /** 넘버 total 카운팅 **/
    function counter(type) {
        $('.count.total.'+type).each(function () {
            let $this = $(this);
            $({countNum: 0}).animate({
                    countNum: $this.text()
                },
                {
                    duration: 500,
                    easing: 'linear',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(numberWithCommas(this.countNum));
                    }
                });
        });
    }

    /** 모집중, 진행중, 완료, 취소된 두잇 **/
    function getDoitStatus() {

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

        initChart(pendingCtx, chartType.doughnut, labels.doitType, pendingDataset, options.doughnutOptions);
        preUserEl.textContent    = numberWithCommas(preData.user_cnt);
        preCompanyEl.textContent = numberWithCommas(preData.company_cnt);
        preTotalEl.textContent   = preData.total_cnt;

        initChart(progressingCtx, chartType.doughnut, labels.doitType, progressDataset, options.doughnutOptions);
        ingUserEl.textContent    = numberWithCommas(ingData.user_cnt);
        ingCompanyEl.textContent = numberWithCommas(ingData.company_cnt);
        ingTotalEl.textContent   = ingData.total_cnt;

        initChart(completeCtx, chartType.doughnut, labels.doitType, endDataset, options.doughnutOptions);
        endUserEl.textContent    = numberWithCommas(endData.user_cnt);
        endCompanyEl.textContent = numberWithCommas(endData.company_cnt);
        endTotalEl.textContent   = endData.total_cnt;

        initChart(cancelCtx, chartType.doughnut, labels.cancelType, cancelDataset, options.doughnutOptions);
        cancelEl.textContent     = numberWithCommas(cancelData.cancle);
        deleteEl.textContent     = numberWithCommas(cancelData.delete);
        cancelTotalEl.textContent = cancelData.total;

        counter("doit");
    }

    /** 가입자 현황 데이터 **/
    function getUserStatus() {

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
        let newUser   = document.getElementById('new-user');
        let joinUser  = document.getElementById('join-user');
        let leaveUser = document.getElementById('leave-user');
        let totalUser = document.getElementById('total-user');

        newUser.textContent   = numberWithCommas(data.data.new_user);
        joinUser.textContent  = numberWithCommas(data.data.join_user);
        leaveUser.textContent = numberWithCommas(data.data.leave_user);
        totalUser.textContent = data.data.total_user;

        counter("user");
    }

    /** UCD 관련 차트 데이터 **/
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
        let ucdUser      = document.getElementById('ucd-user');
        let ucdDoit      = document.getElementById('ucd-doit');
        let ucdCompany   = document.getElementById('ucd-company');
        let ucdPromotion = document.getElementById('ucd-promotion');

        ucdUser.textContent      = data.data.user;
        ucdDoit.textContent      = data.data.doit;
        ucdCompany.textContent   = data.data.company;
        ucdPromotion.textContent = data.data.promotion;

        counter("ucd");
    }

    /** 월단위로 등록된 두잇 **/
    function getMonthlyDoit() {

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
        let dataset = [
            {
                label: '일반',
                data: data.data.user,
                backgroundColor: color.prussianBlue
            }, {
                label: '프로모션',
                data: data.data.company,
                backgroundColor: color.dodgerBlue
            }, {
                label: '전체',
                data: data.data.total,
                type: 'line',
                borderColor: color.dodgerBlue,
                borderWidth : 2.2,
                pointBackgroundColor: color.white,
                backgroundColor: color.black
            }
        ];

        monthlyDoitChart = initChart(monthlyMixedChart, chartType.bar, label.monthNames, dataset, options.barOptions);
    }

    /** 일 단위 인증 수 **/
    function getDailyActions() {

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
            borderColor: color.dodgerBlue,
            borderWidth : 2.2,
            pointBackgroundColor: color.white,
            backgroundColor: color.black
        }];

        dailyActionChart = initChart(certMonthChart, chartType.line, label, dataset, options.lineOptions);
    }


    function initChart(ctx, type, label, dataset, options)
    {
        return new Chart(ctx,{
            type : type,
            data : {
                labels : label,
                datasets : dataset
            },
            options : options
        });

    }

    function destroyChart(_chart)
    {
        _chart.destroy();
    }

    /** 프로모션 진행 현황 **/
    /*let proStatusChart = new Chart(proStatusDoughnut, {
        type: doughnutType,
        data: {
            labels: ['진행', '완료'],
            datasets: [{
                data: [10, 20],
                backgroundColor: ['rgb(0, 48, 135)', 'rgba(125, 125, 125, 0.2)'],
                   hoverBorderColor: [color.prussianBlue, color.dodgerBlue],
            }]
        },
        options: options.options,
    });*/

    /** 리워드 현황 **/
    /*let rewardStatusChart = new Chart(rewardLine, {
        type: 'line',
        data: {
            datasets: [{
                label: '프로모션 지급 리워드',
                data: [20, 20, 30, 40, 35, 40, 80],
                borderColor: color.white,
                pointBackgroundColor: color.white,
                backgroundColor: color.black
            }],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                align: 'start',
                position: 'top'
            }
        }
    });*/


