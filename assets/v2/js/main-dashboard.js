
    import {ajaxRequestWithJson, headers, invalidResp, isSuccessResp} from "./modules/ajax-request.js";
    import {api} from "./modules/api-url-v1.js";
    import {sweetError, sweetToast} from "./modules/alert.js";
    import {message} from "./modules/message.js";
    import { getTodayStr, getWeekAgoStr, initMaxDateToday, initSearchDatepicker, moveToMemberDetail,
    } from "./modules/common.js";
    import {isEmpty, numberWithCommas} from "./modules/utils.js";
    import {label} from "./modules/label.js";
    import {initTableDefaultConfig, toggleBtnPreviousAndNextOnTable} from "./modules/tables.js";
    import {page} from "./modules/page-url.js";

    const dateFromSummary = $("#dateFromSummary");
    const dateToSummary = $("#dateToSummary");
    const dateFromSummaryList = $("#dateFromSummaryList");
    const dateToSummaryList = $("#dateToSummaryList");

    $( () => {
        /** dataTable default config **/
        initTableDefaultConfig();
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
                if (isSuccessResp(data))
                {
                    await buildSummary(data);
                    await buildLeaderRank(data);
                    await buildDoitRank(data);
                    await buildCategoryRateChart(data);
                    await buildMissionRateChart(data);
                }
                else
                    sweetToast(invalidResp(data));
            })
            .catch(reject => sweetToast(`데이터${message.ajaxLoadError}`));
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

    function buildLeaderRank(data)
    {
        const leaderRankEl = $("#leaderRank");
        const {leader_rank} = data.data;

        leaderRankEl.empty();
        if (!isEmpty(leader_rank) && leader_rank.length > 0)
        {
            leader_rank.map((obj, index) => {
                const {ranking, nickname, profile_uuid, rank_diff} = obj;
                const leader =
                    `<li class="clearfix">
                        ${index === 0 ? '<i class="fas fa-crown rank-first"></i>' : ''}
                        <div class="left-wrap">
                            <span><em class="rank-num">${ranking}</em></span>
                            <a class="rank-title link leader-nickname" data-uuid="${profile_uuid}">${nickname}</a>
                        </div>
                        <div class="right-wrap ${rank_diff === 0 ? label.dash : rank_diff > 0 ? 'rank-up' : 'rank-down'}">
                            <i class="fas ${rank_diff === 0 ? '' : rank_diff > 0 ? 'fa-caret-up' : 'fa-caret-down'}"></i> ${rank_diff === 0 ? label.dash : Math.abs(rank_diff)}
                        </div>
                    </li>`

                leaderRankEl.append(leader);
            })

            $(".leader-nickname").on('click', function () { onClickLeaderNickname(this) });
        }
    }

    function onClickLeaderNickname(obj)
    {
        moveToMemberDetail($(obj).data('uuid'));
    }

    function buildDoitRank(data)
    {
        const doitRankEl = $("#doitRank");
        const {doit_rank} = data.data;

        doitRankEl.empty();
        if (!isEmpty(doit_rank) && doit_rank.length > 0)
        {
            doit_rank.map((obj, index) => {
                const {idx, ranking, doit_title, rank_diff} = obj;
                const leader =
                    `<li class="clearfix">
                        ${index === 0 ? '<i class="fas fa-crown rank-first"></i>' : ''}
                        <div class="left-wrap">
                            <span><em class="rank-num">${ranking}</em></span>
                            <a href="${page.detailDoit}${idx}" class="rank-title link">${doit_title}</a>
                        </div>
                        <div class="right-wrap ${rank_diff === 0 ? label.dash : rank_diff > 0 ? 'rank-up' : 'rank-down'}">
                            <i class="fas ${rank_diff === 0 ? '' : rank_diff > 0 ? 'fa-caret-up' : 'fa-caret-down'}"></i> ${rank_diff === 0 ? label.dash : Math.abs(rank_diff)}
                        </div>
                    </li>`

                doitRankEl.append(leader);
            })
        }
    }

    function buildCategoryRateChart(data)
    {
        const categorySummary = $("#categorySummary");
        const {category_rate} = data.data;
        const backgroundColor = ['#BED661', '#89E894', '#78D5E3', '#7AF5F5', '#34DDDD', '#FE8402', '#41924B', '#FFCC00'];
        let labels = [];
        let categoryCount = [];
        categorySummary.empty();
        if (!isEmpty(category_rate) && category_rate.length > 0)
        {
            category_rate.map((obj, index) => {
                const {category_title, count, rate} = obj;
                const category =
                    `<li>
                        <div class="left-wrap">
                            <i class="color-box" style="background-color: ${backgroundColor[index]}"></i>
                            <span>${category_title}</span>
                        </div>
                        <div class="right-wrap">
                            <strong class="data-num-s">${numberWithCommas(rate)}%</strong> (${numberWithCommas(count)})
                        </div>
                    </li>`

                categorySummary.append(category);
                labels.push(category_title);
                categoryCount.push(count);
            })
        }

        const categoryChart = document.getElementById('categoryChart');
        new Chart(categoryChart, {
            type: 'pie',
            data: {
                datasets: [{
                    labels: labels,
                    data: categoryCount,
                    borderWidth: 1,
                    backgroundColor: backgroundColor,
                }]
            },
            options: {
                responsive: false,
                legend: {
                    display: false
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (tooltipItems) => {
                                return tooltipItems.dataset.labels[tooltipItems.dataIndex];
                            },
                        }
                    }
                },
            }
        });
    }

    let totalMissions = 0;
    function buildMissionRateChart(data)
    {
        const {create_mission_rate} = data.data;
        const backgroundColor = ['#BED661', '#89E894'];

        if (!isEmpty(create_mission_rate))
        {
            const {count, register_mission_rate, unregistered_mission_rate} = create_mission_rate;
            totalMissions = count > 100000 ? `${numberWithCommas(Math.round(count/1000))}k` : numberWithCommas(count).toString();
            const missionChart = document.getElementById('missionChart');
            new Chart(missionChart, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        labels: ['등록', '미등록'],
                        data: [register_mission_rate, unregistered_mission_rate],
                        borderWidth: 1,
                        backgroundColor: backgroundColor,
                    }]
                },
                options: {
                    responsive: false,
                    legend: {
                        display: false
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (tooltipItems) => {
                                    return tooltipItems.dataset.labels[tooltipItems.dataIndex];
                                },
                            }
                        },
                    },
                },
                plugins: [centerText]
            });
        }
    }

    const centerText = {
        id: 'centerText',
        afterDraw(chart, args, options) {
            const {ctx} = chart;
            ctx.restore();
            ctx.font = "36px Roboto, Helvetica, Arial, sans-serif"
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(totalMissions, 150, 160);
            ctx.save();
        }
    };

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
                        "from_date" : dateFromSummaryList.val(),
                        "to_date" : dateToSummaryList.val(),
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
                {title: "일자",    	    data: "basedate",  		        width: "10%" }
                ,{title: "앱 설치", 	    data: "app_down_count",	        width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "회원 가입", 	data: "sign_up_count",		    width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "두잇 가입", 	data: "doit_sign_up_count",		width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "인증", 	    data: "action_count",		    width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "인증 댓글", 	data: "action_comment_count",	width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "커뮤니티", 	    data: "board",		            width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "커뮤니티 댓글", 	data: "board_comment_count",	width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "두잇 개설", 	data: "create_doit_count",		width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "미션 등록", 	data: "create_mission_count",	width: "10%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
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
        let table = $("#summaryTable").DataTable();
        table.ajax.reload();
    }
