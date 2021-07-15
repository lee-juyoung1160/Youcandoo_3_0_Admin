
    import {ajaxRequestWithJson, headers, invalidResp, isSuccessResp} from "./modules/ajax-request.js";
    import {api} from "./modules/api-url-v1.js";
    import {sweetError, sweetToast} from "./modules/alert.js";
    import {message} from "./modules/message.js";
    import {
        getTodayStr, getWeekAgoStr, initMaxDateToday, initSearchDatepicker,
    } from "./modules/common.js";
    import {numberWithCommas} from "./modules/utils.js";
    import {label} from "./modules/label.js";
    import { toggleBtnPreviousAndNextOnTable} from "./modules/tables.js";

    const dateFromSummary = $("#dateFromSummary");
    const dateToSummary = $("#dateToSummary");
    const dateFromSummaryList = $("#dateFromSummaryList");
    const dateToSummaryList = $("#dateToSummaryList");

    $( () => {
        initSearchDatepicker();
        initDateRangeWeek();
        initMaxDateToday()
        getSummary();
        buildSummaryTable();
        dateFromSummary.on('change', function () { onChangeSearchDateFromSummary(); });
        dateToSummary.on('change', function () { onChangeSearchDateToSummary(); });
        dateFromSummaryList.on('change', function () { onChangeSearchDateFromSummaryList(); });
        dateToSummaryList.on('change', function () { onChangeSearchDateToSummaryList(); });
    });

    function getSummary()
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

    function buildSummaryTable()
    {
        $("#summaryTable").DataTable({
            ajax : {
                url: api.dashboardSummaryList,
                type: "POST",
                headers: headers,
                dataFilter: function(data){
                    let json = JSON.parse(data);
                    if (isSuccessResp(json))
                    {
                        json.recordsTotal = json.count;
                        json.recordsFiltered = json.count;
                    }
                    else
                    {
                        json.data = [];
                        sweetToast(invalidResp(json));
                    }

                    return JSON.stringify(json);
                },
                data: function (d) {
                    const param = {
                        "from_date" : dateFrom.val(),
                        "to_date" : dateTo.val(),
                        "page" : (d.start / d.length) + 1
                        ,"limit" : d.length
                    }

                    return JSON.stringify(param);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: "닉네임",    	data: "nickname",  		width: "20%",
                    render: function (data, type, row, meta) {
                        return `<a data-uuid="${row.profile_uuid}">${data}</a>`;
                    }
                }
                ,{title: "PID", 	data: "profile_uuid",	width: "55%" }
                ,{title: "사용여부", 	data: "is_active",		width: "10%" }
                ,{title: "가입일시", 	data: "created",		width: "15%" }
            ],
            serverSide: true,
            paging: true,
            pageLength: 30,
            select: false,
            destroy: true,
            initComplete: function () {
            },
            fnRowCallback: function( nRow, aData ) {
            },
            drawCallback: function (settings) {
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
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
    }

    function onChangeSearchDateToSummary()
    {
        dateFromSummary.datepicker("option", "maxDate", new Date(dateToSummary.datepicker("getDate")));
        getSummary();
    }

    function onChangeSearchDateFromSummaryList()
    {
        dateToSummaryList.datepicker("option", "minDate", new Date(dateFromSummaryList.datepicker("getDate")));
    }

    function onChangeSearchDateToSummaryList()
    {
        dateFromSummaryList.datepicker("option", "maxDate", new Date(dateToSummaryList.datepicker("getDate")));
    }