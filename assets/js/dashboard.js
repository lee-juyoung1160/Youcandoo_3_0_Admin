/** 현재 연도-월-일 구하기 **/
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let hours = today.getHours();
let minutes = today.getMinutes();
let result = document.getElementById('today-date');

month = month < 10 ? '0' + month : month;
today = today < 10 ? '0' + today : today;
hours = hours < 10 ? '0' + hours : hours;
minutes = minutes < 10 ? '0' + minutes : minutes;

result.textContent = year + '.' + month + '.' + date + '. ' + hours + ':' + minutes + ' 기준';

/** 넘버 total 카운팅 **/
function counter() {
    $('.count.total').each(function () {
        let $this = $(this);
        $({countNum: 0}).animate({
                countNum: $this.text()
            },
            {
                duration: 2000,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                }
            });
    });
};

/** 도넛 차트 관련 (내일, 오늘, 종료) **/
const tomorrowDoughnut = document.getElementById('tomorrow-doughnut');
const todayDoughnut = document.getElementById('today-doughnut');
const endDoughnut = document.getElementById('end-doughnut');
const cancelDoughnut = document.getElementById('cancel-doughnut');
/** 월 단위로 등록된 두잇 **/
const monthlyMixedChart = document.getElementById('monthly-mixedChart');
/** 프로모션 진행 현황 **/
const proStatusDoughnut = document.getElementById('pro-status-doughnut');
/** 리워드 현황 **/
const rewardLine = document.getElementById('reward-line-Chart');
/**  도넛 차트 레이아웃 구성 공통 부분 **/
const backgroundColorDoughnut = ['rgb(0, 48, 135)', 'rgb(0, 122, 255)'];
const options = {options: {maintainAspectRatio: false, legend: {align: 'start', labels: {fontSize: 12, boxWidth: 12}}}};
const doughnutType = 'doughnut';
const labels = ['일반', '프로모션'];
/** 라인 차트 레이아웃 구성 공통 부분 **/
const colorLine = ['rgb(0, 122, 255)', 'rgba(0, 0, 0, 0)'];

/** 예정되는, 진행중인, 완료된 두잇 **/
$.ajax({
    url: "https://api.youcandoo.co.kr/v1.0/admin/dashboard/doit/status",
    headers: {"Authorization": "9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7"},
    dataType: 'JSON',
    type: 'POST',

    error: function () {

    },
    success: function (getDoughnutData) {
        let endChart = new Chart(endDoughnut, {
            type: doughnutType,
            data: {
                labels,
                datasets: [{
                    data: [getDoughnutData.data.end.user_cnt, getDoughnutData.data.end.company_cnt],
                    backgroundColor: backgroundColorDoughnut,
                }]
            },
            options: options.options,
        });
        let todayChart = new Chart(todayDoughnut, {
            type: doughnutType,
            data: {
                labels,
                datasets: [{
                    data: [getDoughnutData.data.ing.user_cnt, getDoughnutData.data.ing.company_cnt],
                    backgroundColor: backgroundColorDoughnut,
                }]
            },
            options: options.options,
        });
        let tomorrowChart = new Chart(tomorrowDoughnut, {
            type: doughnutType,
            data: {
                labels,
                datasets: [{
                    data: [getDoughnutData.data.pre.user_cnt, getDoughnutData.data.pre.company_cnt],
                    backgroundColor: backgroundColorDoughnut,
                }]
            },
            options: options.options,
        });

        let endUserCount = document.getElementById('end-user');
        let endCompanyCount = document.getElementById('end-company');
        let endTotalCount = document.getElementById('end-total');

        let ingUserCount = document.getElementById('ing-user');
        let ingCompanyCount = document.getElementById('ing-company');
        let ingTotalCount = document.getElementById('ing-total');

        let preUserCount = document.getElementById('pre-user');
        let preCompanyCount = document.getElementById('pre-company');
        let preTotalCount = document.getElementById('pre-total');

        endUserCount.textContent = getDoughnutData.data.end.user_cnt;
        endCompanyCount.textContent = getDoughnutData.data.end.company_cnt;
        endTotalCount.textContent = getDoughnutData.data.end.total_cnt;

        ingUserCount.textContent = getDoughnutData.data.ing.user_cnt;
        ingCompanyCount.textContent = getDoughnutData.data.ing.company_cnt;
        ingTotalCount.textContent = getDoughnutData.data.ing.total_cnt;

        preUserCount.textContent = getDoughnutData.data.pre.user_cnt;
        preCompanyCount.textContent = getDoughnutData.data.pre.company_cnt;
        preTotalCount.textContent = getDoughnutData.data.pre.total_cnt;

        counter();
    },
});

let cancelChart = new Chart(cancelDoughnut, {
    type: doughnutType,
    data: {
        labels,
        datasets: [{
            data: [50, 50],
            backgroundColor: backgroundColorDoughnut,
        }]
    },
    options: options.options,
});

/** 월 단위로 등록된 두잇 **/
function getYearData(yearVal) {
    let param = {
        'year': yearVal,
    };
    $.ajax({
        url: "https://api.youcandoo.co.kr/v1.0/admin/dashboard/doit/month",
        headers: {"Authorization": "9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7"},
        dataType: 'JSON',
        type: 'POST',
        data: JSON.stringify(param),

        error: function () {
        },
        success: function (monthData) {
            let monthlyChart = new Chart(monthlyMixedChart, {
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
                        pointBackgroundColor: colorLine[0],
                        backgroundColor: colorLine[1]
                    },
                    ],
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                options: {
                    legend: {
                        align: 'start',
                        position: 'top'
                    }
                }
            });

        }
    });
};
/** 월 단위로 등록된 두잇, 로드 바로 실행 **/
$(document).ready(function () {
    getYearData('2020');
});
/** 월 단위로 등록된 두잇, select option value 가져오기 **/
$('#doit-year-select').change(function () {
    let yearVal = $(this).val();
    getYearData(yearVal);
});

// /** 프로모션 진행 현황 **/
// let proStatusChart = new Chart(proStatusDoughnut, {
//     type: doughnutType,
//     data: {
//         labels: ['진행', '완료'],
//         datasets: [{
//             data: [10, 20],
//             backgroundColor: ['rgb(0, 48, 135)', 'rgba(125, 125, 125, 0.2)'],
//         }]
//     },
//     options: options.options,
// });
//
// /** 리워드 현황 **/
// let rewardStatusChart = new Chart(rewardLine, {
//     type: 'line',
//     data: {
//         datasets: [{
//             label: '프로모션 지급 리워드',
//             data: [20, 20, 30, 40, 35, 40, 80],
//             borderColor: colorLine[0],
//             pointBackgroundColor: colorLine[0],
//             backgroundColor: colorLine[1]
//         }],
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//     },
//     options: {
//         maintainAspectRatio: false,
//         legend: {
//             align: 'start',
//             position: 'top'
//         }
//     }
// });


