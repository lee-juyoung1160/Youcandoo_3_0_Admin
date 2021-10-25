
    import {
        doitTitle,
        amount,
        nickname,
        actionCount,
        description,
        selRewardType,
        datePicker,
        dateFrom,
        dateTo,
        modalClose,
        modalBackdrop,
        btnSearch,
        keyword,
        modalSearchMember,
        baseDateWrap,
        btnSearchTarget,
        lengthInput,
        totalCount,
        searchTable,
        targetTable,
        btnSearchNickname, addedTable, btnSubmit, balance
    } from "../modules/elements.js";
    import {sweetConfirm, sweetError, sweetToast, sweetToastAndCallback} from "../modules/alert.js";
    import {message} from "../modules/message.js";
    import {
        getPathName,
        getStringFormatToDate,
        initInputNumber,
        isEmpty,
        numberWithCommas,
        splitReverse
    } from "../modules/utils.js";
    import {ajaxRequestWithJson, headers, invalidResp, isSuccessResp} from "../modules/ajax-request.js";
    import {api} from "../modules/api-url.js";
    import {fadeoutModal, limitInputLength} from "../modules/common.js";
    import {label} from "../modules/label.js";
    import {
        buildTotalCount,
        checkBoxElement,
        initTableDefaultConfig,
        tableReloadAndStayCurrentPage,
        toggleBtnPreviousAndNextOnTable
    } from "../modules/tables.js";
    import {page} from "../modules/page-url.js";

    const pathName	= getPathName();
    const doitIdx = splitReverse(pathName, '/');
    let addedUsers = [];
    let addedUserObj = [];
    let initialize = true;

    $(() => {
        /** dataTable default config **/
        initTableDefaultConfig();
        initDatepicker();
        initDateRange();
        getDetail();
        amount.on("propertychange change keyup paste input", function () { initInputNumber(this); });
        actionCount.on("propertychange change keyup paste input", function () { initInputNumber(this); });
        lengthInput.on('propertychange change keyup paste input', function () { limitInputLength(this); });
        modalClose.on('click', function () { fadeoutModal(); });
        modalBackdrop.on('click', function () { fadeoutModal(); });
        btnSearchNickname.on('click', function () { onClickBtnSearchNickname(this); });
        btnSearch.on('click', function () { onSubmitSearchMember(); })
        selRewardType.on('change', function () { onChangeSelRewardType(); });
        btnSearchTarget.on('click', function () { onClickBtnSearchTarget(); });
        btnSubmit.on('click', function () { onSubmitReward(); });
    })

    function getDetail()
    {
        const param = { "idx" : doitIdx };

        ajaxRequestWithJson(true, api.detailDoit, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                isSuccessResp(data) ? getDetailCallback(data) : sweetToast(invalidResp(data));
            })
            .catch(reject => sweetError(label.detailContent + message.ajaxLoadError));
    }

    let g_doit_uuid;
    function getDetailCallback(data)
    {
        const { doit_uuid, doit_title } = data.data;

        g_doit_uuid = doit_uuid;
        doitTitle.text(doit_title);
        getDoitBalance();
    }

    function getDoitBalance()
    {
        const param = { "doit_uuid" : g_doit_uuid }

        ajaxRequestWithJson(false, api.getDoitUcd, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                isSuccessResp(data) ? buildBalance(data) : sweetToast(invalidResp(data));
            })
            .catch(reject => sweetError(`두잇 UCD ${message.ajaxLoadError}`));
    }

    function buildBalance(data)
    {
        balance.text(`${numberWithCommas(data.data.ucd)} UCD`);
    }

    function onChangeSelRewardType()
    {
        dateFrom.val('');
        dateTo.val('');
        nickname.val('');
        actionCount.val('');
        description.val('');
        totalCount.text(0);
        let targetTableInstance = targetTable.DataTable();
        targetTableInstance.destroy();
        targetTable.empty();
        let addedTableInstance = addedTable.DataTable();
        addedTableInstance.destroy();
        addedTable.empty();

        switch (selRewardType.val()) {
            case 'user' :
                baseDateWrap.hide();
                nickname.parent().show();
                nickname.trigger('focus');
                actionCount.parent().hide();
                break;
            case 'all' :
                baseDateWrap.show();
                dateTo.prop('disabled', true);
                nickname.parent().hide();
                actionCount.parent().hide();
                break;
            default :
                baseDateWrap.show();
                dateTo.prop('disabled', false);
                nickname.parent().hide();
                actionCount.parent().show();
                actionCount.trigger('focus');
                break;
        }
    }


    function onClickBtnSearchTarget()
    {
        const isSearchAll = selRewardType.val() === 'all';
        if (!isSearchAll && isEmpty(actionCount.val()))
        {
            sweetToast(`인증 횟수를 ${message.input}`);
            actionCount.trigger('focus');
            return;
        }

        if (!isSearchAll && isEmpty(dateTo.val()))
        {
            sweetToast(`조회 기준일은 ${message.required}`);
            dateTo.trigger('focus');
            return;
        }

        buildTargetTable();
    }

    function buildTargetTable()
    {
        targetTable.show();
        targetTable.DataTable({
            ajax : {
                url: api.rewardMemberList,
                type:"POST",
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
                        "doit_uuid" : g_doit_uuid
                        ,"type" : selRewardType.val()
                        ,"page" : (d.start / d.length) + 1
                        ,"limit" : d.length
                    }

                    switch (selRewardType.val()) {
                        case 'all' :
                            break;
                        default :
                            param['type_value'] = actionCount.val().trim();
                            param['basedate'] = dateTo.val();
                    }

                    return JSON.stringify(param);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: "닉네임",		data: "profile",   	width: "30%",
                    render: function (data) {
                        return data.nickname;
                    }
                }
                ,{title: "PID",		data: "profile",    width: "45%",
                    render: function (data) {
                        return data.profile_uuid;
                    }
                }
                ,{title: "인증횟수",	data: "profile",   	width: "20%",
                    render: function (data) {
                        return numberWithCommas(data.action_count);
                    }
                }
            ],
            serverSide: true,
            paging: true,
            pageLength: 30,
            select: false,
            destroy: true,
            initComplete: function () {
                const table = targetTable.DataTable();
                const tableData = table.rows().data();
                if (!isEmpty(tableData) && tableData.length > 0)
                {
                    const descText = tableData.length === 1 ? `${tableData[0].profile.nickname}` : `${tableData[0].profile.nickname} 외 ${tableData.length -1}명`
                    description.val(descText);
                }


                table.column(2).visible(!selRewardType.val() === 'all');
            },
            fnRowCallback: function( nRow, aData ) {
            },
            drawCallback: function (settings) {
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
    }

    function onClickBtnSearchNickname(obj)
    {
        if (isEmpty(nickname.val()))
        {
            sweetToast(`닉네임을 ${message.input}`);
            nickname.trigger('focus');
            return;
        }

        modalSearchMember.fadeIn();
        modalBackdrop.fadeIn();

        const inputValue = $(obj).siblings('input').val();
        keyword.val(inputValue);
        initialize ? buildSearchTable() : onSubmitSearchMember();
        initialize = false;
    }

    function onSubmitSearchMember()
    {
        if (isEmpty(keyword.val()))
        {
            sweetToast(`닉네임을 ${message.input}`);
            keyword.trigger('focus');
            return;
        }

        const table = searchTable.DataTable();
        table.page.len(5);
        table.ajax.reload();
    }

    function buildSearchTable()
    {
        searchTable.DataTable({
            ajax : {
                url: api.rewardMemberList,
                type:"POST",
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
                        "doit_uuid" : g_doit_uuid
                        ,"type" : selRewardType.val()
                        ,"type_value" : keyword.val().trim()
                        ,"page" : (d.start / d.length) + 1
                        ,"limit" : d.length
                    }

                    return JSON.stringify(param);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: "닉네임",		data: "profile",   	width: "40%",
                    render: function (data) {
                        return data.nickname;
                    }
                }
                ,{title: "PID",		data: "profile",    width: "55%",
                    render: function (data) {
                        return data.profile_uuid;
                    }
                }
                ,{title: '', 		data: "profile",   width: "5%",
                    render: function (data, type, row, meta) {
                        return checkBoxElement(meta.row);
                    }
                }
            ],
            serverSide: true,
            paging: true,
            pageLength: 5,
            select: {
                style: 'single',
                selector: ':checkbox'
            },
            destroy: true,
            initComplete: function () {
                $(this).on( 'select.dt', function ( e, dt, type, indexes ) { onClickCheckBox(dt, indexes);});
            },
            fnRowCallback: function( nRow, aData ) {
                /** 이미 추가된 경우 체크박스 disabled **/
                const checkboxEl = $(nRow).children().eq(2).find('input');
                if (addedUsers.indexOf(aData.profile.profile_uuid) > -1)
                    $(checkboxEl).prop('disabled', true);
            },
            drawCallback: function (settings) {
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
    }

    function onClickCheckBox(dt, indexes)
    {
        const selectedData = dt.rows(indexes).data()[0];
        addUser(selectedData);
    }

    function addUser(data)
    {
        const {profile_uuid, nickname} = data.profile;
        let userObj = [];
        userObj.push({ "profile_uuid" : profile_uuid, "nickname" : nickname });
        addedUserObj = userObj.concat(addedUserObj);

        let users = [];
        users.push(profile_uuid);
        addedUsers = users.concat(addedUsers);

        buildUpdateTable();
        displayCountAddedUser();
    }

    function buildUpdateTable()
    {
        addedTable.show();
        addedTable.DataTable({
            data: addedUserObj,
            columns: [
                {title: "닉네임", 		data: "nickname",		width: "40%" }
                ,{title: "PID",    		data: "profile_uuid",  	width: "50%" }
                ,{title: "",    		data: "profile_uuid",  	width: "10%",
                    render: function (data, type, row, meta) {
                        return `<button type="button" class="btn-xs btn-text-red delete-btn" data-rownum="${meta.row}"><i class="fas fa-minus-circle"></i></button>`;
                    }
                }
            ],
            serverSide: false,
            paging: true,
            pageLength: 30,
            select: false,
            destroy: true,
            initComplete: function () {
                tableReloadAndStayCurrentPage(searchTable);
            },
            fnRowCallback: function( nRow, aData ) {
                $(nRow).attr('id', aData.profile_uuid);
                $(nRow).children().eq(2).find('button').on('click', function () { removeRow(this); });
            },
            drawCallback: function (settings) {
            }
        });
    }

    function removeRow(obj)
    {
        let table = addedTable.DataTable();
        table.row($(obj).closest('tr')).remove().draw(false);

        initAddedUserData();
        displayCountAddedUser();
    }

    function initAddedUserData()
    {
        addedUsers.length = 0;
        addedUserObj.length = 0;

        let table = addedTable.DataTable();
        const tableData = table.rows().data();
        if (tableData.length > 0)
        {
            for (let i=0; i<tableData.length; i++)
            {
                const {profile_uuid, nickname} = tableData[i];

                addedUsers.push(profile_uuid)
                addedUserObj.push({ "profile_uuid" : profile_uuid, "nickname" : nickname });
            }
        }
    }

    function displayCountAddedUser()
    {
        totalCount.text(numberWithCommas(addedUserObj.length));
        if (addedUserObj.length > 0)
        {
            const descText = addedUserObj.length === 1 ? `${addedUserObj[0].nickname}` : `${addedUserObj[0].nickname} 외 ${addedUserObj.length -1}명`
            description.val(descText);
        }
        else
            description.val('');
    }

    function onSubmitReward()
    {
        if (validation())
            sweetConfirm(message.create, rewardRequest);
    }

    function validation()
    {
        const date = new Date();
        const currentHour = date.getHours();
        if (currentHour >= 0 && currentHour <= 6)
        {
            sweetToast('등록 가능한 시간이 아닙니다.(0 ~ 6시 등록 불가)');
            return false;
        }

        if (['user', 'all'].indexOf(selRewardType.val()) === -1 && isEmpty(actionCount.val()))
        {
            sweetToast(`인증 횟수를 ${message.input}`);
            actionCount.trigger('focus');
            return false;
        }

        if (['user', 'all'].indexOf(selRewardType.val()) === -1 && isEmpty(dateTo.val()))
        {
            sweetToast(`기준일은 ${message.required}`);
            dateTo.trigger('focus');
            return false;
        }

        if (selRewardType.val() === 'user' && getAddedProfileFromTableRow().length === 0)
        {
            sweetToast(`적립 대상을 ${message.select}`);
            return false;
        }

        if (isEmpty(amount.val()))
        {
            sweetToast(`적립 UCD를 ${message.input}`);
            amount.trigger('focus');
            return false;
        }

        if (Number(amount.val()) > 1000000)
        {
            sweetToast(message.maxAvailableUserUcd);
            amount.trigger('focus');
            return false;
        }

        if (isEmpty(description.val()))
        {
            sweetToast(`적립 대상을 ${message.doubleChk}`);
            return false;
        }

        return true;
    }

    function rewardRequest()
    {
        const param = {
            "doit_uuid" : g_doit_uuid,
            "description" : description.val().trim(),
            "value" : amount.val().trim(),
            "type" : selRewardType.val(),
        }

        if (selRewardType.val() === 'user')
            param["profile_uuid"] = getAddedProfileFromTableRow();

        if (['user', 'all'].indexOf(selRewardType.val()) === -1)
        {
            param["type_value"] = actionCount.val().trim();
            param["basedate"] = dateTo.val();
        }

        ajaxRequestWithJson(true, api.createReward, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await sweetToastAndCallback(data, rewardReqCallback);
            })
            .catch(reject => sweetError(label.submit + message.ajaxError));
    }

    function rewardReqCallback()
    {
        location.href = page.detailDoit + doitIdx;
    }

    function getAddedProfileFromTableRow()
    {
        let profileUuids = [];
        const table = addedTable.DataTable();
        const selectedData = table.rows().data();
        if (!isEmpty(selectedData) && selectedData.length > 0)
        {
            for (let i=0; i<selectedData.length; i++)
            {
                const uuid = selectedData[i].profile_uuid;
                profileUuids.push(uuid);
            }
        }

        return profileUuids;
    }

     function initDatepicker()
    {
        datePicker.datepicker({
            dateFormat: "yy-mm-dd"
            ,changeYear: true
            ,showMonthAfterYear: true
            ,monthNames: label.monthNames
            ,dayNames: label.dayNames
            ,dayNamesMin: label.dayNames
            ,onSelect : function (dateText, inst) {
                let date = new Date(dateText);
                const selectedDay = date.getDate();
                let fromDate = '';
                switch (selRewardType.val()) {
                    case 'weekly' :
                        date.setDate(selectedDay -6);
                        fromDate = getStringFormatToDate(date, '-');
                        break;
                    case 'monthly' :
                        date.setDate(selectedDay -29);
                        fromDate = getStringFormatToDate(date, '-');
                        break;
                }

               dateFrom.val(fromDate);
            }
        });
    }

    function initDateRange()
    {
        let date = new Date();
        const hour = date.getHours();
        const minDate = '-7';
        const maxDate = hour < 6 ? '-2' : '-1';

        datePicker.datepicker("option", "minDate", minDate);
        datePicker.datepicker("option", "maxDate", maxDate);
    }