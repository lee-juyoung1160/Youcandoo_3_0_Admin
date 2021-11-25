
    import {ajaxRequestWithJson, headers, invalidResp, isSuccessResp} from "./modules/ajax-request.js";
    import {api} from "./modules/api-url.js";
    import {sweetError, sweetToast, sweetToastAndCallback} from "./modules/alert.js";
    import {message} from "./modules/message.js";
    import {fadeinModal, fadeoutModal, getTodayStr, getWeekAgoStr, initMaxDateToday, initSearchDatepicker, moveToMemberDetail, paginate,} from "./modules/common.js";
    import {getStringFormatToDate, isEmpty, numberWithCommas} from "./modules/utils.js";
    import {label} from "./modules/label.js";
    import {initTableDefaultConfig, toggleBtnPreviousAndNextOnTable} from "./modules/tables.js";
    import {page} from "./modules/page-url.js";
    import {
        dateFromSummary,
        dateToSummary,
        dateFromSummaryList,
        dateToSummaryList,
        modalBackdrop,
        modalClose,
        pagination, btnXlsxExport,
        btnRefreshCategory, btnRefreshMission
    } from "./modules/elements.js";
    import {setExcelData} from "./modules/export-excel.js";

    let missionChartCtx;
    let categoryChartCtx;
    let isSearchAction = false;
    let _currentPage = 1;

    $( () => {
        /** dataTable default config **/
        initTableDefaultConfig();
        initSearchDatepicker();
        initDateRangeWeek();
        initMaxDateToday()
        getSummary();
        buildSummaryTable();
        modalClose.on("click", function () { fadeoutModal(); });
        modalBackdrop.on("click", function () { fadeoutModal(); });
        dateFromSummary.on('change', function () { onChangeSearchDateFromSummary(); });
        dateToSummary.on('change', function () { onChangeSearchDateToSummary(); });
        dateFromSummaryList.on('change', function () { onChangeSearchDateFromSummaryList(); });
        dateToSummaryList.on('change', function () { onChangeSearchDateToSummaryList(); });
        btnRefreshCategory.on('click', function () { getChart(this); });
        btnRefreshMission.on('click', function () { getChart(this); });
        $("#btnMoreLeader").on('click', function () { onClickBtnMore(this); });
        $("#btnMoreDoit").on('click', function () { onClickBtnMore(this) });
        btnXlsxExport.on('click', function () { onClickBtnXlsxExport(); });
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
                    buildSummary(data);
                    if (!isSearchAction)
                    {
                        buildCategoryRateChart(data);
                        buildMissionRateChart(data);
                        buildLeaderRank(data);
                        buildDoitRank(data);
                    }
                }
                else
                    sweetToast(invalidResp(data));
            })
            .catch(reject => sweetError(`데이터${message.ajaxLoadError}`));
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
                            <span><em class="rank-num ${index < 3 ? 'rank-top' : ''}">${ranking}</em></span>
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

    function onClickBtnMore(obj)
    {
        fadeinModal();
        initModal();
        obj.id === 'btnMoreLeader' ? getMoreLeader() : getMoreDoit();
    }

    function initModal()
    {
        _currentPage = 1
        $("#modalTitle").text('');
        $("#modalRank").empty();
    }

    function getMoreLeader()
    {
        const param = {
            "page" : _currentPage,
            "limit" : 10,
        }

        ajaxRequestWithJson(false, api.dashboardMoreLeader, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
               if (isSuccessResp(data))
               {
                   buildMoreLeader(data);
                   buildPagination(data);
               }
               else
                   sweetToast(invalidResp(data));
            })
            .catch(reject => sweetError(`데이터${message.ajaxLoadError}`));
    }

    function buildMoreLeader(data)
    {
        if (!isEmpty(data.data) && data.data.length > 0)
        {
            let leader = '';
            data.data.map((obj, index) => {
                const {ranking, nickname, profile_uuid, rank_diff} = obj;
                leader +=
                    `<li class="clearfix">
                        ${index === 0 && _currentPage === 1 ? '<i class="fas fa-crown rank-first"></i>' : ''}
                        <div class="left-wrap">
                            <span><em class="rank-num ${_currentPage === 1 && index < 3 ? 'rank-top' : ''}">${ranking}</em></span>
                            <a class="rank-title link leader-nickname" data-uuid="${profile_uuid}">${nickname}</a>
                        </div>
                        <div class="right-wrap ${rank_diff === 0 ? label.dash : rank_diff > 0 ? 'rank-up' : 'rank-down'}">
                            <i class="fas ${rank_diff === 0 ? '' : rank_diff > 0 ? 'fa-caret-up' : 'fa-caret-down'}"></i> ${rank_diff === 0 ? label.dash : Math.abs(rank_diff)}
                        </div>
                    </li>`
            })
            $("#modalTitle").text('리더 랭킹')
            $("#modalRank").html(leader);
            $(".leader-nickname").on('click', function () { onClickLeaderNickname(this) });
        }
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
                            <span><em class="rank-num ${index < 3 ? 'rank-top' : ''}">${ranking}</em></span>
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

    function getMoreDoit()
    {
        const param = {
            "page" : _currentPage,
            "limit" : 10,
        }

        ajaxRequestWithJson(false, api.dashboardMoreDoit, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                if (isSuccessResp(data))
                {
                    buildMoreDoit(data);
                    buildPagination(data);
                }
                else
                    sweetToast(invalidResp(data));
            })
            .catch(reject => sweetError(`데이터${message.ajaxLoadError}`));
    }

    function buildMoreDoit(data)
    {
        if (!isEmpty(data.data) && data.data.length > 0)
        {
            let doit = '';
            data.data.map((obj, index) => {
                const {idx, ranking, doit_title, rank_diff} = obj;
                doit +=
                    `<li class="clearfix">
                        ${_currentPage === 1 && index === 0 ? '<i class="fas fa-crown rank-first"></i>' : ''}
                        <div class="left-wrap">
                            <span><em class="rank-num ${_currentPage === 1 && index < 3 ? 'rank-top' : ''}">${ranking}</em></span>
                            <a href="${page.detailDoit}${idx}" class="rank-title link">${doit_title}</a>
                        </div>
                        <div class="right-wrap ${rank_diff === 0 ? label.dash : rank_diff > 0 ? 'rank-up' : 'rank-down'}">
                            <i class="fas ${rank_diff === 0 ? '' : rank_diff > 0 ? 'fa-caret-up' : 'fa-caret-down'}"></i> ${rank_diff === 0 ? label.dash : Math.abs(rank_diff)}
                        </div>
                    </li>`
            })
            $("#modalTitle").text('두잇 랭킹');
            $("#modalRank").html(doit);
        }
    }

    function buildPagination(data)
    {
        const totalCount  = data.count;
        const lastPage = Math.ceil(totalCount / 10);

        pagination.html(paginate(_currentPage, lastPage));

        $(".btn_paginate").not('.disabled').on('click', function () { onClickPageNum(this); })
    }

    function onClickPageNum(obj)
    {
        $(obj).siblings().removeClass('current');
        $(obj).addClass('current');

        _currentPage = $(obj).data('page');

        $("#modalTitle").text() === '리더 랭킹' ? getMoreLeader() : getMoreDoit();
    }

    function getChart(obj)
    {
        const param = {
            'from_date' : dateFromSummary.val(),
            'to_date' : dateToSummary.val(),
        }

        ajaxRequestWithJson(true, api.dashboardSummary, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                if (isSuccessResp(data))
                {
                    switch (obj.id) {
                        case 'btnRefreshMission' :
                            missionChartCtx.destroy();
                            buildMissionRateChart(data);
                            break;
                        case 'btnRefreshCategory' :
                            categoryChartCtx.destroy();
                            buildCategoryRateChart(data);
                            break;
                    }
                }
                else
                    sweetToast(invalidResp(data));
            })
            .catch(reject => sweetError(`데이터${message.ajaxLoadError}`));
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
        categoryChartCtx = new Chart(categoryChart, {
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

    let totalMissionCount = 0;
    function buildMissionRateChart(data)
    {
        const missionSummary = $("#missionSummary");
        const {create_mission_rate} = data.data;

        missionSummary.empty();
        if (!isEmpty(create_mission_rate))
        {
            const {count, register_mission_rate, unregistered_mission_rate} = create_mission_rate;
            const missionRate = [register_mission_rate, unregistered_mission_rate];
            const backgroundColor = ['#BED661', '#89E894'];
            const labels = ['등록', '미등록'];
            totalMissionCount = count > 100000 ? `${numberWithCommas(Math.round(count/1000))}k` : numberWithCommas(count).toString();

            missionRate.map((rate, index) => {
                const mission =
                    `<li>
                        <div class="left-wrap">
                            <i class="color-box" style="background-color: ${backgroundColor[index]}"></i>
                            <span>${labels[index]}</span>
                        </div>
                        <div class="right-wrap">
                            <strong class="data-num-s">${rate}%</strong>
                        </div>
                    </li>`

                missionSummary.append(mission);
            })

            const missionChart = document.getElementById('missionChart');
            missionChartCtx = new Chart(missionChart, {
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
            ctx.fillText(totalMissionCount, 150, 160);
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
                global: false,
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
                        "page" : (d.start / d.length) + 1,
                        "limit" : d.length
                    }

                    return JSON.stringify(param);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: "일자",    	    data: "basedate",  		        width: "10%" }
                ,{title: "앱 설치", 	    data: "app_down_count",	        width: "9%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "회원 가입", 	data: "sign_up_count",		    width: "9%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "두잇 가입", 	data: "doit_sign_up_count",		width: "9%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "인증", 	    data: "action_count",		    width: "9%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "인증 댓글", 	data: "action_comment_count",	width: "9%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "커뮤니티", 	    data: "board_count",		    width: "9%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "커뮤니티 댓글", 	data: "board_comment_count",	width: "9%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "연속인증 21+", 	data: "ongoing_user_count",	    width: "9%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "연속인증 66+", 	data: "ongoing_user_count_66",		width: "9%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "연속인증 100+", data: "ongoing_user_count_100",	    width: "9%",
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

    function initDateRangeWeek()
    {
        dateFromSummary.val(getWeekAgoStr());
        dateToSummary.val(getTodayStr());
        dateFromSummaryList.val(getWeekAgoStr());
        dateToSummaryList.val(getTodayStr());
    }

    function onChangeSearchDateFromSummary()
    {
        isSearchAction = true;
        getSummary();
    }

    function onChangeSearchDateToSummary()
    {
        dateFromSummary.datepicker("option", "maxDate", new Date(dateToSummary.datepicker("getDate")));
        isSearchAction = true;
        getSummary();
    }

    function onChangeSearchDateFromSummaryList()
    {
        reloadSummaryList();
    }

    function onChangeSearchDateToSummaryList()
    {
        dateFromSummaryList.datepicker("option", "maxDate", new Date(dateToSummaryList.datepicker("getDate")));
        reloadSummaryList();
    }

    function reloadSummaryList()
    {
        let table = $("#summaryTable").DataTable();
        table.ajax.reload();
    }

    function onClickBtnXlsxExport()
    {
        const modalTitle = $("#modalTitle").text();
        const url = modalTitle === '리더 랭킹' ? api.dashboardMoreLeader : api.dashboardMoreDoit;
        const param = {
            "page" : 1,
            "limit" : 20,
        }

        ajaxRequestWithJson(true, url, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                isSuccessResp(data) ? downloadRankSuccessCallback(data) : sweetToast(invalidResp(data));
            })
            .catch(reject => sweetError(`데이터${message.ajaxLoadError}`));
    }

    function downloadRankSuccessCallback(data)
    {
        const modalTitle = $("#modalTitle").text();
        const fileName = `${modalTitle}_${getStringFormatToDate(new Date(), '')}`;
        const xlsxData = data.data.map(obj => {
            switch (modalTitle) {
                case '리더 랭킹' :
                    return {
                        '랭킹' : obj.ranking,
                        '프로필 아이디' : obj.profile_uuid,
                        '닉네임' : obj.nickname,
                        '연속인증 수' : obj.ongoing_action_count,
                        '게시글 수' : obj.board_count,
                        '게시글 댓글 수' : obj.board_comment_count,
                        '인증 댓글 수' : obj.action_comment_count,
                        '총점' : obj.score,
                    }
                case '두잇 랭킹' :
                    return {
                        '랭킹' : obj.ranking,
                        '두잇명' : obj.doit_title,
                        '두잇 아이디' : obj.doit_uuid,
                        '누적 인증 수' : obj.total_action_count,
                        '게시글 수' : obj.board_count,
                        '게시글 댓글 수' : obj.board_comment_count,
                        '인증 댓글 수' : obj.action_comment_count,
                        '두잇 그릿지수' : obj.grit,
                    }
            }
        })

        setExcelData(fileName, modalTitle, xlsxData);
    }