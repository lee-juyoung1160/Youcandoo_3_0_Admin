
    const tomorrowDoughnut  = document.getElementById('tomorrow-doughnut');
    const todayDoughnut     = document.getElementById('today-doughnut');
    const endDoughnut       = document.getElementById('end-doughnut');
    const cancelDoughnut    = document.getElementById('cancel-doughnut');
    const endUserEl     = document.getElementById('end-user');
    const endCompanyEl  = document.getElementById('end-company');
    const endTotalEl    = document.getElementById('end-total');
    const ingUserEl     = document.getElementById('ing-user');
    const ingCompanyEl  = document.getElementById('ing-company');
    const ingTotalEl    = document.getElementById('ing-total');
    const preUserEl     = document.getElementById('pre-user');
    const preCompanyEl  = document.getElementById('pre-company');
    const preTotalEl    = document.getElementById('pre-total');
    const cancelEl      = document.getElementById('cancle');
    const deleteEl      = document.getElementById('delete');
    const cancelTotalEl     = document.getElementById('total');
    const monthlyMixedChart = document.getElementById('monthly-mixedChart');
    const certMonthChart    = document.getElementById('cert-month-chart');
    /** 차트 레이아웃 구성 공통 부분 **/
    const options = {
        options: {
            maintainAspectRatio: false,
            legend: {
                align: 'start',
                labels: {
                    fontSize: 12,
                    boxWidth: 10,
                    hoverBorderWidth: 900
                }
            }
        }
    }
    const labels = {
        doitType : ['일반', '프로모션']
        ,cancelType : ['모집실패', '개설취소']
        ,monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    }
    const color = {
        colorLine : ['rgb(0,122,255)', 'rgba(0, 0, 0, 0)']
        ,backgroundColorDoughnut : ['rgb(0, 48, 135)', 'rgb(0, 122, 255)']
        ,white : 'rgba(255,255,255,1)'
    };
    /** 셀렉박스 + 레이블 **/
    const yearSelectBox = document.getElementById('doit-year-select');
    const yearLabel = document.querySelector('.year-label');
    const certMonthSelectBox = document.getElementById('cert-month-select');
    const certMonthLabel = document.querySelector('.cert-month-label');
    const certYearSelectBox = document.getElementById('cert-year-select');
    const certYearLabel = document.querySelector('.cert-year-label');

    /** 현재 연도-월-일 구하기 **/
    let day = new Date();
    let year = day.getFullYear();
    let month = day.getMonth() + 1;
    let date = day.getDate();
    let hours = day.getHours();
    let minutes = day.getMinutes();
    let result = document.getElementById('today-date');

    /** 넘버 -> 문자열 바뀌고, 0 붙이기 **/
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    result.textContent = year + '.' + month + '.' + date + '. ' + hours + ':' + minutes + ' 기준';

    /** 새해 기준 새로운 단위 차트 생성 **/
    /** 현재 연도 및 월 값 넣고 그리기 **/
    yearLabel.textContent = yearSelectBox.value = year + "년";
    yearSelectBox.append(new Option( year+ "년", year));
    certYearLabel.textContent = certYearSelectBox.value = year + "년";
    certYearSelectBox.append(new Option( year+ "년", year));
    certMonthLabel.textContent = certMonthSelectBox.value = month + "월";
    certMonthSelectBox.append(new Option( month+ "월", month));

    /** 새해될때 셀렉박스 및 값 추가 **/
    let defaultYear = 2020;
    for (year; defaultYear < year; year++) {
        yearSelectBox.append(new Option( year+1+ "년", year+1));
        certYearSelectBox.append(new Option( year+1+ "년", year+1));
    }

    /** 로드 바로 실행 **/
    document.addEventListener("DOMContentLoaded", function () {
        getDailyActions();
        getMonthlyDoit();
        getDoitStatus();
        getUserStatus();
        getUcdStatus();
        /** 월단위 셀렉박스 이벤트 **/
        yearSelectBox       .addEventListener('change', function () { getMonthlyDoit(); });
        certMonthSelectBox  .addEventListener('change', function () { getDailyActions(); });
        certYearSelectBox   .addEventListener('change', function () { getDailyActions(); });
    });

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
        let endData     = respData.end;
        let ingData     = respData.ing;
        let preData     = respData.pre;
        let cancelData  = respData.cancle;

        buildDoitDoughnutChart(endDoughnut, labels.doitType, endData.user_cnt, endData.company_cnt);
        buildDoitDoughnutChart(todayDoughnut, labels.doitType, ingData.user_cnt, ingData.company_cnt);
        buildDoitDoughnutChart(tomorrowDoughnut, labels.doitType, preData.user_cnt, preData.company_cnt);
        buildDoitDoughnutChart(cancelDoughnut, labels.cancelType, cancelData.cancle, cancelData.delete);

        endUserEl.textContent    = numberWithCommas(endData.user_cnt);
        endCompanyEl.textContent = numberWithCommas(endData.company_cnt);
        endTotalEl.textContent   = endData.total_cnt;

        ingUserEl.textContent    = numberWithCommas(ingData.user_cnt);
        ingCompanyEl.textContent = numberWithCommas(ingData.company_cnt);
        ingTotalEl.textContent   = ingData.total_cnt;

        preUserEl.textContent    = numberWithCommas(preData.user_cnt);
        preCompanyEl.textContent = numberWithCommas(preData.company_cnt);
        preTotalEl.textContent   = preData.total_cnt;

        cancelEl.textContent     = numberWithCommas(cancelData.cancle);
        deleteEl.textContent     = numberWithCommas(cancelData.delete);
        cancelTotalEl.textContent = cancelData.total;

        counter("doit");
    }

    function buildDoitDoughnutChart(target, label, data1, data2)
    {
        new Chart(target, {
            type: 'doughnut',
            data: {
                labels : label,
                datasets: [{
                    data: [data1, data2],
                    backgroundColor: color.backgroundColorDoughnut,
                    hoverBorderColor: color.backgroundColorDoughnut,
                }]
            },
            responsive: false,
            options: options.options,
        });
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
        let errMsg  = '월 단위 두잇 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, param, getMonthlyDoitCallback, errMsg, false);
    }

    function getMonthlyDoitCallback(data)
    {
        isSuccessResp(data) ? getMonthlyDoitSuccess(data) : sweetToast(invalidResp(data));
    }

    function getMonthlyDoitSuccess(data)
    {
        new Chart(monthlyMixedChart, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: '일반',
                        data: data.data.user,
                        backgroundColor: color.backgroundColorDoughnut[0],
                    },
                    {
                        label: '프로모션',
                        data: data.data.company,
                        backgroundColor: color.backgroundColorDoughnut[1],
                    },
                    {
                        label: 'Total',
                        data: data.data.total,
                        type: 'line',
                        borderColor: color.colorLine[0],
                        borderWidth : 2.2,
                        pointBackgroundColor: color.white,
                        backgroundColor: color.colorLine[1]
                    }
                ],
                labels: labels.monthNames
            },
            options: {
                responsive: 'false',
                maintainAspectRatio: 'false',
                legend: {
                    align: 'end',
                    position: 'top'
                },
                scales: {
                    yAxes: [{ticks: {beginAtZero: true}}]
                }
            }
        });
    }

    /** 일 단위 인증 수 **/
    function getDailyActions() {

        let param = {
            'month': certMonthSelectBox.value,
            'year' : certYearSelectBox.value
        }

        let url     = api.getDailyAction;
        let errMsg  = '일 단위 인증 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDailyActionsCallback, errMsg, false);
    }

    function getDailyActionsCallback(data)
    {
        isSuccessResp(data) ? getDailyActionsSuccess(data) : sweetToast(invalidResp(data));
    }

    function getDailyActionsSuccess(data)
    {
        new Chart(certMonthChart, {
            type: 'line',
            data: {
                datasets: [{
                    data: data.data.result,
                    lineTension: 0,
                    borderColor: color.colorLine[0],
                    borderWidth : 2.2,
                    pointBackgroundColor: color.white,
                    backgroundColor: color.colorLine[1],
                }],
                labels: data.data.day
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{ticks: {beginAtZero: true}}]
                }
            }
        });
    }

    /** 프로모션 진행 현황 **/
    /*let proStatusChart = new Chart(proStatusDoughnut, {
        type: doughnutType,
        data: {
            labels: ['진행', '완료'],
            datasets: [{
                data: [10, 20],
                backgroundColor: ['rgb(0, 48, 135)', 'rgba(125, 125, 125, 0.2)'],
                   hoverBorderColor: backgroundColorDoughnut,
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
                borderColor: colorLine[0],
                pointBackgroundColor: colorLine[0],
                backgroundColor: colorLine[1]
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


