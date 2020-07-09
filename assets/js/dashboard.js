
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
        ,cancelType : ['취소', '삭제']
    }
    const colorLine = ['rgb(0,122,255)', 'rgba(0, 0, 0, 0)'];
    const backgroundColorDoughnut = ['rgb(0, 48, 135)', 'rgb(0, 122, 255)'];
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
        getCertMonthYearData();
        getYearData();
        GetDoitStatus();
        GetUserStatus();
        GetUcd();
        /** 월단위 셀렉박스 이벤트 **/
        yearSelectBox.addEventListener('change', function () {
            getYearData();
            monthlyChart.destroy();
        });
        certMonthSelectBox.addEventListener('change', function () {
            getCertMonthYearData();
            certLineChart.destroy();
        });
        certYearSelectBox.addEventListener('change', function () {
            getCertMonthYearData();
            certLineChart.destroy();
        });
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
    function GetDoitStatus() {
        $.ajax({
            url: api.getDoitStat,
            headers: headers,
            dataType: 'JSON',
            type: 'POST',
            error: function () {
                alert('두잇 상태 도넛 차트 데이터'+ message.ajaxLoadError);
            },
            success: function (getDoughnutData) {
                if (isSuccessResp(getDoughnutData))
                {
                    let respData    = getDoughnutData.data;
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
                else
                    alert(invalidResp(getDoughnutData));
            }
        });
    }

    function buildDoitDoughnutChart(target, label, data1, data2)
    {
        new Chart(target, {
            type: 'doughnut',
            data: {
                labels : label,
                datasets: [{
                    data: [data1, data2],
                    backgroundColor: backgroundColorDoughnut,
                    hoverBorderColor: backgroundColorDoughnut,
                }]
            },
            responsive: false,
            options: options.options,
        });
    }

    /** 가입자 현황 데이터 **/
    function GetUserStatus() {
        $.ajax({
            url: api.getUserStat,
            headers: headers,
            dataType: 'JSON',
            type: 'POST',
            error: function (d) {
                alert('가입자 현황'+ message.ajaxLoadError);
            },
            success: function (userStatus) {
                if (isSuccessResp(userStatus))
                {
                    let newUser   = document.getElementById('new-user');
                    let joinUser  = document.getElementById('join-user');
                    let leaveUser = document.getElementById('leave-user');
                    let totalUser = document.getElementById('total-user');

                    newUser.textContent   = numberWithCommas(userStatus.data.new_user);
                    joinUser.textContent  = numberWithCommas(userStatus.data.join_user);
                    leaveUser.textContent = numberWithCommas(userStatus.data.leave_user);
                    totalUser.textContent = userStatus.data.total_user;

                    counter("user");
                }
                else
                    alert(invalidResp(userStatus));
            }
        });
    }

    /** UCD 관련 차트 데이터 **/
    function GetUcd() {
        $.ajax({
            url: api.getUcdStat,
            headers: headers,
            dataType: 'JSON',
            type: 'POST',
            error: function (d) {
                alert('UCD 정보'+ message.ajaxLoadError);
            },
            success: function (ucdData) {
                if (isSuccessResp(ucdData))
                {
                    let ucdUser      = document.getElementById('ucd-user');
                    let ucdDoit      = document.getElementById('ucd-doit');
                    let ucdCompany   = document.getElementById('ucd-company');
                    let ucdPromotion = document.getElementById('ucd-promotion');

                    ucdUser.textContent      = ucdData.data.user;
                    ucdDoit.textContent      = ucdData.data.doit;
                    ucdCompany.textContent   = ucdData.data.company;
                    ucdPromotion.textContent = ucdData.data.promotion;

                    counter("ucd");
                }
                else
                    alert(invalidResp(ucdData));
            }
        });
    }

    /** 월단위로 등록된 두잇 **/
    let monthlyChart;
    function getYearData() {
        $.ajax({
            url: api.getMonthlyDoit,
            headers: headers,
            dataType: 'JSON',
            type: 'POST',
            data: JSON.stringify({'year': yearSelectBox.value}),
            error: function () {
                alert('월 단위 두잇 데이터'+ message.ajaxLoadError);
            },
            success: function (monthData) {
                monthlyChart = new Chart(monthlyMixedChart, {
                    type: 'bar',
                    data: {
                        datasets: [{
                            label: '일반',
                            data: monthData.data.user,
                            backgroundColor: backgroundColorDoughnut[0],
                        }, {
                            label: '프로모션',
                            data: monthData.data.company,
                            backgroundColor: backgroundColorDoughnut[1],
                        }, {
                            label: 'Total',
                            data: monthData.data.total,
                            type: 'line',
                            borderColor: colorLine[0],
                            borderWidth : 2.2,
                            pointBackgroundColor: 'rgba(255,255,255,1)',
                            backgroundColor: colorLine[1]
                        },
                        ],
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    options: {
                        legend: {
                            align: 'start',
                            position: 'top',
                            responsive: 'false',
                            maintainAspectRatio: 'false',
                        },
                        scales: {
                            yAxes: [{ticks: {beginAtZero: true}}]
                        }
                    },
                });
            }
        });
    }

    /** 일 단위 인증 수 **/
    let certLineChart;
    function getCertMonthYearData() {
        let param = {
            'month': certMonthSelectBox.value,
            'year' : certYearSelectBox.value
        };
        $.ajax({
            url: api.getDailyAction,
            headers: headers,
            dataType: 'JSON',
            type: 'POST',
            data: JSON.stringify(param),
            error: function () {
                alert('일 단위 인증 데이터'+ message.ajaxLoadError);
            },
            success: function (certMonthData) {
                certLineChart = new Chart(certMonthChart, {
                    type: 'line',
                    data: {
                        datasets: [{
                           data: certMonthData.data.result,
                            lineTension: 0,
                            borderColor: colorLine[0],
                            borderWidth : 2.2,
                            pointBackgroundColor: 'rgba(255,255,255,1)',
                            backgroundColor: colorLine[1],
                        }],
                        labels: certMonthData.data.day
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


