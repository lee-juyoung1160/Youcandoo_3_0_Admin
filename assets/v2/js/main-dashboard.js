
    import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "./modules/ajax-request.js";
    import {api} from "./modules/api-url-v1.js";
    import {sweetToast} from "./modules/alert.js";
    import {label} from "./modules/label.js";
    import {message} from "./modules/message.js";
    import {
        getTodayStr,
        getWeekAgoStr,
        initSearchDatepicker,
    } from "./modules/common.js";
    import {numberWithCommas} from "./modules/utils.js";

    const dateFromSummary = $("#dateFromSummary");
    const dateToSummary = $("#dateToSummary");
    const dateFromSummaryList = $("#dateFromSummaryList");
    const dateToSummaryList = $("#dateToSummaryList");

    $( () => {
        initSearchDatepicker();
        initDateRangeWeek();
        getSummaryData();
        dateFromSummary.on('change', function () { onChangeSearchDateFromSummary(); });
        dateToSummary.on('change', function () { onChangeSearchDateToSummary(); });
        dateFromSummaryList.on('change', function () { onChangeSearchDateFromSummaryList(); });
        dateToSummaryList.on('change', function () { onChangeSearchDateToSummaryList(); });
    });

    function getSummaryData()
    {
        const param = {
            'from_date' : dateFromSummary.val(),
            'to_date' : dateToSummary.val(),
        }

        ajaxRequestWithJson(true, api.dashboardSummary, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await isSuccessResp(data) ? buildSummary(data) : sweetToast(invalidResp(data));
            })
            .catch(reject => sweetToast(`${message.ajaxLoadError}`));
    }

    function buildSummary(data)
    {
        const {sign_up_count, level2_member_count, action_count, create_doit_count, total_app_down_count, total_sign_up_count, total_give_ucd} = data.data;
        $("#signupCount").text(numberWithCommas(sign_up_count));
        $("#level2Count").text(numberWithCommas(level2_member_count));
        $("#actionCount").text(numberWithCommas(action_count));
        $("#openDoitCount").text(numberWithCommas(create_doit_count));
        $("#downloadCount").text(numberWithCommas(total_app_down_count));
        $("#memberCount").text(numberWithCommas(total_sign_up_count));
        $("#issuedUcd").text(numberWithCommas(total_give_ucd));
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
            options : options,
        });
    }

    const chartOptions = {
        doughnutOptions: {
            cutoutPercentage : 44,
            legend: {
                align: 'center',
                position: 'left',
                labels: {
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
                    fontFamily: 'Roboto, sans-serif',
                    position: 'default',
                    showActualPercentages: false
                }
            },
            elements: {
                center: {
                    text: '',
                    color: '',
                    fontStyle: 'Roboto',
                    sidePadding: 20, /** Default is 20 (as a percentage) **/
                    maxFontSize: 25,
                    minFontSize: false, /** Default is 18 (in px), set to false and text will not wrap. **/
                    lineHeight: 25 /** Default is 25 (in px), used for when text wraps **/
                }
            }
        },
    }

    function initDateRangeWeek()
    {
        dateFromSummary.val(getWeekAgoStr());
        dateToSummary.val(getTodayStr());
        dateFromSummaryList.val(getWeekAgoStr());
        dateToSummaryList.val(getTodayStr());
    }

    function onChangeSearchDateFromSummary()
    {
        dateToSummary.datepicker("option", "minDate", new Date(dateFromSummary.datepicker("getDate")));
        initDayBtn();
    }

    function onChangeSearchDateToSummary()
    {
        dateFromSummary.datepicker("option", "maxDate", new Date(dateToSummary.datepicker("getDate")));
        initDayBtn();
    }

    function onChangeSearchDateFromSummaryList()
    {
        dateToSummaryList.datepicker("option", "minDate", new Date(dateFromSummaryList.datepicker("getDate")));
        initDayBtn();
    }

    function onChangeSearchDateToSummaryList()
    {
        dateFromSummaryList.datepicker("option", "maxDate", new Date(dateToSummaryList.datepicker("getDate")));
        initDayBtn();
    }