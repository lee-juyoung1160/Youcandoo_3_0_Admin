
    /** 차트 초기화 **/
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
        ,dodgerBlueTranslucent : 'rgba(0, 122, 255, 0.3)'
        ,prussianBlue : 'rgb(0, 48, 135)'
        ,prussianBlueTranslucent : 'rgba(0, 48, 135, 0.3)'
    }