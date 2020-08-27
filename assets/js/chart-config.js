
    const chartType = {
        doughnut : 'doughnut'
        ,line : 'line'
        ,bar : 'bar'
    }

    const chartLabels = {
        doitType : ['일반', '프로모션']
        ,cancelType : ['모집실패', '개설취소']
        ,successYn : ['성공', '실패']
    }

    const color = {
        white : 'rgba(255,255,255,1)'
        ,black : 'rgba(0, 0, 0, 0)'
        ,darkNavy : 'rgb(0, 0, 102)'
        ,dodgerBlue : 'rgb(0, 122, 255)'
        ,prussianBlue : 'rgba(63, 108, 205)'
        ,mintSky : 'rgb(56, 195, 209)'
        ,mintSkyA : 'rgba(56, 195, 209, 0.4)'
        ,jyBlue : 'rgb(63, 108, 205)'
        ,jyBlueA : 'rgba(63, 108, 205, 0.4)'
    }
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
            cutoutPercentage : 44,
            legend: {
                align: 'center',
                position: 'left',
                labels: {
                    fontSize: 12,
                    boxWidth: 12
                }
            },
            plugins: {
                labels: {
                    render: function (args) {
                        return numberWithCommas(args.value);
                    },
                    fontSize: 14,
                    fontColor: '#fff',
                    fontFamily: "'Roboto', sans-serif",
                    position: 'default',
                    showActualPercentages: false
                }
            },
            elements: {
                center: {
                    text: '',
                    color: color.darkNavy,
                    fontStyle: 'Roboto',
                    sidePadding: 20, /** Default is 20 (as a percentage) **/
                    maxFontSize: 25,
                    minFontSize: false, /** Default is 18 (in px), set to false and text will not wrap. **/
                    lineHeight: 25 /** Default is 25 (in px), used for when text wraps **/
                }
            }
        },
        withLegend: {
            legend: {
                align: 'end',
                position: 'top'
            },
            tooltips : {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return numberWithCommas(tooltipItem.value);
                    }
                }
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            maintainAspectRatio : false
        },
        noLegend: {
            legend: false,
            tooltips : {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return numberWithCommas(tooltipItem.value);
                    }
                }
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            maintainAspectRatio : false
        }
    }

    function noDataToDisplay(chartCtx)
    {
        chartCtx.options.elements.center.text = '-';
    }

    Chart.plugins.register({
        beforeDraw: function(chart) {
            if (chart.config.options.elements.center) {
                /** Get ctx from string **/
                let ctx = chart.chart.ctx;

                /** Get options from the center object in options **/
                let centerConfig = chart.config.options.elements.center;
                let fontStyle = centerConfig.fontStyle || 'sans-serif';
                let txt = centerConfig.text;
                let color = centerConfig.color || '#000';
                let maxFontSize = centerConfig.maxFontSize || 75;
                let sidePadding = centerConfig.sidePadding || 20;
                let sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                /** Start with a base font of 18px **/
                ctx.font = "18px " + fontStyle;

                /** Get the width of the string and also the width of the element minus 10 to give it 5px side padding **/
                let stringWidth = ctx.measureText(txt).width;
                let elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                /** Find out how much the font can grow in width. **/
                let widthRatio = elementWidth / stringWidth;
                let newFontSize = Math.floor(18 * widthRatio);
                let elementHeight = (chart.innerRadius * 2);

                /** Pick a new font size so it will not be larger than the height of label. **/
                let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                let minFontSize = centerConfig.minFontSize;
                let lineHeight = centerConfig.lineHeight || 25;
                let wrapText = false;

                if (minFontSize === undefined) {
                    minFontSize = 18;
                }

                if (minFontSize && fontSizeToUse < minFontSize) {
                    fontSizeToUse = minFontSize;
                    wrapText = true;
                }

                /** Set font settings to draw it correctly. **/
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                let centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = "bold " + fontSizeToUse + "px " + "Roboto";
                ctx.fillStyle = color;

                if (!wrapText) {
                    ctx.fillText(txt, centerX, centerY);
                    return;
                }

                let words = txt.split(' ');
                let line = '';
                let lines = [];

                /** Break words up into multiple lines if necessary **/
                for (let n = 0; n < words.length; n++) {
                    let testLine = line + words[n] + ' ';
                    let metrics = ctx.measureText(testLine);
                    let testWidth = metrics.width;
                    if (testWidth > elementWidth && n > 0) {
                        lines.push(line);
                        line = words[n] + ' ';
                    } else {
                        line = testLine;
                    }
                }

                /** Move the center up depending on line height and number of lines **/
                centerY -= (lines.length / 2) * lineHeight;

                for (let n = 0; n < lines.length; n++) {
                    ctx.fillText(lines[n], centerX, centerY);
                    centerY += lineHeight;
                }
                /** Draw text in center **/
                ctx.fillText(line, centerX, centerY);
            }
        }
    });
