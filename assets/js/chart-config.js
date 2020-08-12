
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
    const chartOptions = {
        doughnutOptions: {
            legend: {
                align: 'center',
                position: 'left',
                labels: {
                    fontSize: 12,
                    boxWidth: 10
                }
            },
            maintainAspectRatio: false
        },
        options: {
            legend: {
                align: 'end',
                position: 'top'
            }
        }
    }

    const chartType = {
        doughnut : 'doughnut'
        ,line : 'line'
        ,bar : 'bar'
    }

    const chartLabels = {
        doitType : ['일반', '프로모션']
        ,cancelType : ['모집실패', '개설취소']
    }

    const color = {
        white : 'rgba(255,255,255,1)'
        ,black : 'rgba(0, 0, 0, 0)'
        ,dodgerBlue : 'rgb(0, 122, 255)'
        ,prussianBlue : 'rgb(0, 48, 135)'
        ,mintSky : 'rgb(56, 195, 209)'
        ,mintSkyA : 'rgba(56, 195, 209, 0.4)'
        ,jyBlue : 'rgba(63, 108, 205)'
        ,jyBlueA : 'rgba(63, 108, 205, 0.4)'
    }