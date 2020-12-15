
    const search 		= $(".search");
    const reset 		= $(".reset");
    const dataTable		= $("#dataTable");
    const searchType 	= $("#search_type");
    const keyword		= $("#keyword");

    $( () => {
        getChartData();
        /** 이벤트 **/
        search			.on("click", function () { onSubmitSearch(); });
        reset			.on("click", function () { initSearchForm(); });
        selPageLength	.on("change", function () { onSubmitSearch(); });
        modalCloseBtn	.on('click', function () { modalFadeout(); });
        modalLayout		.on('click', function () { modalFadeout(); });
        modalTab		.on('click', function (event) { onClickModalTab(event.target); });
    });

    function getChartData()
    {
        let url = api.getDailyTotal;
        let errMsg = `차트 데어터${message.ajaxLoadError}`
        let param = JSON.stringify({
            "year": yearEl2.val(),
            "month" : monthEl2.val()
        });
        let callback = g_page_type === 'init' ? initDailyTotalUserChart : updateDailyTotalUserChart;

        ajaxRequestWithJsonData(false, url, param, callback, errMsg, false);
    }

    function initDailyTotalUserChart(data)
    {
        let { user, doit } = data.data;
        let dataset = [{
            type : 'line',
            data : user,
            label : '누적 회원 수',
            yAxisID : 'leftY',
            fill : false,
            /*order : 1,*/
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
            fill : false,
            /*order : 2,*/
            barPercentage : 0.5,
            backgroundColor: color.mintSky
        }];

        let options = {
            plugins: {
                labels: {
                    render: function (args) {
                        return '';
                    }
                }
            },
            legend: {
                position: 'bottom',
                align: 'end',
                labels: {
                    boxWidth: 12
                },
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
                mode : 'label',
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
                            if (Math.floor(value) === value)
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
                            if (Math.floor(value) === value)
                                return convertNumberToKvalue(value);
                        }
                    }
                }]
            },
            maintainAspectRatio : false
        }

        dailyTotalCtx = initChart(dailyTotal, chartType.bar, getDayNames(yearEl2.val(), monthEl2.val()), dataset, options);
    }

    function updateDailyTotalUserChart(data)
    {
        let { user, doit } = data.data;

        dailyTotalCtx.data.labels = getDayNames(yearEl2.val(), monthEl2.val());
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