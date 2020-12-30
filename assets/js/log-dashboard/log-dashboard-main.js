
    const ulTab		    = $("#ulTab");
    const selYear       = $("#selYear");
    const selMonth      = $("#selMonth");
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
        selYear  .on('change', function () { onChangeSelectBox(); });
        selMonth .on('change', function () { onChangeSelectBox(); });
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

        onChangeSelectOption(selYear);
    }

    function initSelectBoxMonth(_month)
    {
        let i = 1;
        for (i; i <= 12; i++)
        {
            let selected = i === Number(_month) ? 'selected' : '';
            $(".select-month").prepend(`<option ${selected} value="${appendZero(i)}">${appendZero(i)}월</option>`);
        }

        onChangeSelectOption(selMonth);
    }

    function initPage()
    {
        getChartData();
        getTopTen();
    }

    function onClickTab(target)
    {
        let targetTagName = $(target).prop('tagName');
        if (targetTagName === 'A')
            return;
        else if (targetTagName === 'P')
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
            ,"year" : selYear.val()
            ,"month" : selMonth.val()
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
            let topTenTitle = key.toUpperCase();
            let topTenDesc;
            if (topTenTitle === 'PROCESS')
                topTenDesc = `${selMonth.val()}월에 ${key} time 가장 오래걸린 URL`;
            else if (topTenTitle === 'APACHE_ERROR')
                topTenDesc = `${selMonth.val()}월에 가장 많은 ${key}가 발생한 URL`;
            else if (topTenTitle === 'PHP_ERROR')
                topTenDesc = `${selMonth.val()}월에 가장 많은 ${key}가 발생한 URL`;
            else
                topTenDesc = `${selMonth.val()}월에 가장 많이 조회한 URL`;

            if (i===0 || i%2 === 0)
                topTenEl += '<div class="row row-2">';

            topTenEl +=
                `<div class="col box">
                    <div class="content-inner">
                        <div class="box-top clearfix">
                            <p class="data-title">${topTenTitle}
                                <span class="sub-title">${topTenDesc}</span>
                            </p>
                        </div>
                        <div class="box-contents">`;
                        if (keyData.length > 0)
                        {
                            let columnNames = Object.getOwnPropertyNames(keyData[0]);
                            topTenEl +=
                            `<table>
                                <colgroup>
                                    <col style="width: 5%">
                                    <col style="width: 60%">
                                    <col style="width: 25%">
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
                                                rowKeys.map((value,index ) => {
                                                    let columnValue = (topTenTitle === 'PROCESS' && index === 2)
                                                        ? `<a class="process-link" onclick="moveList(this);" id="${rowData[value]}">보기</a>`
                                                        : rowData[value];
                                                    topTenEl += `<td>${columnValue}</td>`
                                                });
                                            `</tr>`;
                                    }
                            topTenEl +=
                                `</tbody>
                            </table>`;
                        }
                        else
                        {
                            topTenEl +=
                                `<p class="no-contents">목록이 없습니다.</p>`;
                        }
                    topTenEl +=
                        `</div>
                    </div>
                </div>`;

            if ((i+1)%2 === 0)
                topTenEl += '</div>';
        }

        topTenWrap.html(topTenEl);
    }

    function moveList(obj)
    {
        let form   = $("<form></form>");
        form.prop("method", "post");
        form.prop("action", page.listApiLog);
        form.append($("<input/>", { type: 'hidden', name: 'unique_id', value: obj.id }));
        form.appendTo("body");
        form.trigger('submit');
    }

    function onChangeSelectBox()
    {
        g_page_type = 'update';
        getChartData();
        getTopTen();
    }

    function getChartData()
    {
        let url = api.getDailyTotal;
        let errMsg = `차트 데어터${message.ajaxLoadError}`
        let param = JSON.stringify({
            "year": selYear.val(),
            "month" : selMonth.val()
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

        dailyTotalCtx = initChart(dailyTotal, chartType.bar, getDayNames(selYear.val(), selMonth.val()), dataset, options);
    }

    function updateDailyTotalUserChart(data)
    {
        let { user, doit } = data.data;

        dailyTotalCtx.data.labels = getDayNames(selYear.val(), selMonth.val());
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