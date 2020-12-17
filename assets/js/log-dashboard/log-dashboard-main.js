
    const ulTab		    = $("#ulTab");
    const yearEl2       = $("#selYear2");
    const monthEl2      = $("#selMonth2");
    const dailyTotal    = $('#dailyTotalUser');
    let dailyTotalCtx;
    const topTenWrap    = $("#topTenWrap");

    let g_page_type = 'init';
    let g_alias     = 'api'

    $( () => {
        initSelectBox();
        initPage();
        /** 이벤트 **/
        ulTab.on("click", function (event) { onClickTab(event.target); });
        yearEl2  .on('change', function () { onChangeSelectBoxForDailyTotal(); });
        monthEl2 .on('change', function () { onChangeSelectBoxForDailyTotal(); });
    });

    function initSelectBox()
    {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;

        initSelectBoxYear(year);
        initSelectBoxMonth(month)
    }

    function initSelectBoxYear(_year)
    {
        let defaultYear  = 2020;
        for (defaultYear; defaultYear <= _year; defaultYear++)
            $(".select-year").prepend(`<option value="${defaultYear}">${defaultYear}년</option>`);

        onChangeSelectOption(yearEl2);
    }

    function initSelectBoxMonth(_month)
    {
        let i = 1;
        for (i; i <= 12; i++)
        {
            let selected = i === Number(_month) ? 'selected' : '';
            $(".select-month").prepend(`<option ${selected} value="${appendZero(i)}">${appendZero(i)}월</option>`);
        }

        onChangeSelectOption(monthEl2);
    }

    function initPage()
    {
        getChartData();
        getTopTen();
    }

    function onClickTab(target)
    {
        if ($(target).prop('tagName') === 'P')
            target = $(target).parent('li');

        g_alias = $(target).data('alias');

        toggleOnAndOffTab(target);
        getTopTen();
    }

    function toggleOnAndOffTab(target)
    {
        $(target).siblings().removeClass('on');
        $(target).addClass('on');
    }

    function getTopTen()
    {
        let url = api.listApiPopular;
        let errMsg = `top 10 ${message.ajaxError}`;
        let param = {
            "alias" : g_alias
            ,"limit" : 10
        }

        ajaxRequestWithJsonData(true, url, JSON.stringify(param), getTopTenSuccessCallback, errMsg, false);
    }

    function getTopTenSuccessCallback(data)
    {
        isSuccessResp(data) ? buildTopTen(data) : sweetToast(invalidResp(data));
    }

    function buildTopTen(data)
    {
        let topTenEl = '';
        let keys = Object.getOwnPropertyNames(data.data);

        for (let i=0; i<keys.length; i++)
        {
            let key = keys[i];
            let pageUrl = `/operate/log/${g_alias}_${key}`;
            let keyData = data.data[key];
            let columnNames = Object.getOwnPropertyNames(keyData[0]);

            if (i===0 || i%2 === 0)
                topTenEl += '<div class="row row-2">';

            topTenEl +=
                `<div class="col box">
                    <div class="content-inner">
                        <div class="box-top clearfix">
                            <p class="data-title">${key.toUpperCase()}
                                <span class="sub-title">최근 30일 기준</span>
                            </p>
                            <a href="${pageUrl}" class="btn-more">더보기 <i class="fas fa-chevron-right"></i></a>
                        </div>
                        <div class="box-contents">
                            <table>
                                <colgroup>
                                    <col style="width: 10%">
                                    <col style="width: 40%">
                                    <col style="width: 45%">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th></th>`
                                        columnNames.map(value => {
                                            topTenEl += `<th>${value}</th>`;
                                        });
                                    `</tr>
                                </thead>
                                <tbody>`
                                    for (let j=0; j<keyData.length; j++)
                                    {
                                        let rowData = keyData[j];
                                        let rowKeys = Object.getOwnPropertyNames(rowData);

                                        topTenEl +=
                                            `<tr>
                                                <td><strong class="rank"><em>${j+1}</em></strong></td>`
                                                rowKeys.map(value => {
                                                    topTenEl += `<td>${rowData[value]}</td>`
                                                });
                                            `</tr>`
                                    }
                    topTenEl +=
                                `</tbody>
                            </table>
                        </div>
                    </div>
                </div>`

            if ((i+1)%2 === 0)
                topTenEl += '</div>';
        }

        topTenWrap.html(topTenEl);
    }

    function onChangeSelectBoxForDailyTotal()
    {
        g_page_type = 'update';
        getChartData();
    }

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