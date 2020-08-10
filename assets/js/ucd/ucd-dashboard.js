
    const select    = $('select');
    const selYear   = $('#selYear');
    const selMonth  = $('#selMonth');
    const dailyInfo = $('#dailyInfo');

    /** 현재 연도-월-일 구하기 **/
    let day = new Date();
    let year = day.getFullYear();
    let month = day.getMonth() + 1;
    let date = day.getDate();
    let hours = day.getHours();
    let minutes = day.getMinutes();

    /** 로드 바로 실행 **/
    $(() => {
        initSelectBox();
        getUcdInfos();
        /*getDetail();*/
        getDetailSuccess();
        /** 월단위 셀렉박스 이벤트 **/
        /*selYear       .on('click', function () { updateMonthlyDoitChart(); });
        selMonth   .on('click', function () { updateDailyActionChart(); });*/
    });

    let defaultYear  = 2020;
    let defaultMonth = 7;
    function initSelectBox()
    {
        for (defaultYear; defaultYear <= year; defaultYear++)
            selYear.prepend('<option value="'+defaultYear+'">'+defaultYear+'</option>');

        for (defaultMonth; defaultMonth <= month; defaultMonth++)
            selMonth.prepend('<option value="'+appendZero(defaultMonth)+'">'+appendZero(defaultMonth)+'</option>');

        initSelectOption();
    }

    /** 상단 UCD 정보 **/
    function getUcdInfos()
    {
        let url     = api.getDoitStat;
        let errMsg  = '두잇 상태 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, null, getUcdInfosCallback, errMsg, false);
    }

    function getUcdInfosCallback(data)
    {
        isSuccessResp(data) ? getUcdInfosSuccess(data) : sweetToast(invalidResp(data));
    }

    function getUcdInfosSuccess(data)
    {

    }

    /** 상세정보 차트 **/
    function getDetail()
    {
        let param = {
            'month': certMonthSelectBox.value,
            'year' : certYearSelectBox.value
        }

        let url     = api.getDailyAction;
        let errMsg  = '차트 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, JSON.stringify(param), getDetailCallback, errMsg, false);
    }

    function getDetailCallback(data)
    {
        isSuccessResp(data) ? getDetailSuccess(data) : sweetToast(invalidResp(data));
    }

    let detailChart;
    function getDetailSuccess()
    {
        let label = ['1일', '2일', '2일', '2일', '2일'];
        let dataset = [{
            label: '개인',
            data: ['10', '20', '30', '40', '50'],
            backgroundColor: color.dodgerBlue
        }, {
            label: '기업',
            data: ['50', '60', '70', '80', '90'],
            backgroundColor: color.prussianBlue
        }];

        detailChart = initChart(dailyInfo, chartType.bar, label, dataset, options.barOptions);
    }

    let monthlyDoitChart;
    function getMonthlyDoitSuccess(data)
    {
        let dataset = [{
            label: '전체',
            data: data.data.total,
            type: 'line',
            borderColor: color.dodgerBlue,
            borderWidth : 2.2,
            pointBackgroundColor: color.white,
            backgroundColor: color.black
        }, {
            label: '일반',
            data: data.data.user,
            backgroundColor: color.prussianBlue
        }, {
            label: '프로모션',
            data: data.data.company,
            backgroundColor: color.dodgerBlue
        }];

        monthlyDoitChart = initChart(monthlyMixedChart, chartType.bar, label.monthNames, dataset, options.barOptions);
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

    function updateDailyActionChart()
    {
        let param = {
            'month': certMonthSelectBox.value,
            'year' : certYearSelectBox.value
        }

        let url     = api.getDailyAction;
        let errMsg  = '일 별 인증 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, JSON.stringify(param), updateDailyActionChartCallback, errMsg, false);

    }

    function updateDailyActionChartCallback(_data)
    {
        dailyActionChart.data.datasets[0].data = _data.data.result;
        dailyActionChart.update();
    }

    function updateMonthlyDoitChart()
    {
        let param   = JSON.stringify({'year' : yearSelectBox.value});
        let url     = api.getMonthlyDoit;
        let errMsg  = '월 별 두잇 개설 데이터'+ message.ajaxLoadError;

        ajaxRequestWithJsonData(false, url, param, updateMonthlyDoitChartCallback, errMsg, false);
    }

    function updateMonthlyDoitChartCallback(_data)
    {
        /** 전체 **/
        monthlyDoitChart.data.datasets[2].data = _data.data.total;
        /** 일반 **/
        monthlyDoitChart.data.datasets[0].data = _data.data.user;
        /** 프로모션 **/
        monthlyDoitChart.data.datasets[1].data = _data.data.company;
        monthlyDoitChart.update();
    }
