
    import {
        actionTimes,
        amount,
        nickname,
        actionCount,
        description,
        selRewardType,
        rewardMemberTable,
        datePicker,
        dateFrom,
        dateTo,
        modalClose,
        modalBackdrop,
        btnSearch,
        keyword,
        dataTable, modalSearchMember, baseDateWrap, btnSearchTarget,
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
    import {fadeoutModal} from "../modules/common.js";
    import {label} from "../modules/label.js";
    import {checkBoxElement, toggleBtnPreviousAndNextOnTable} from "../modules/tables.js";

    const pathName	= getPathName();
    const doitIdx = splitReverse(pathName, '/');
    let initialize = true;

    $(() => {
        initDatepicker();
        initDateRange();
        getDetail();
        amount.on("propertychange change keyup paste input", function () { initInputNumber(this); });
        modalClose.on('click', function () { fadeoutModal(); });
        modalBackdrop.on('click', function () { fadeoutModal(); });
        $("#btnSearchNickname").on('click', function () { onClickBtnSearchNickname(this); });
        // btnSearch.on('click', function () { onSubmitSearchMember(); })
        selRewardType.on('change', function () { onChangeSelRewardType(); });
        btnSearchTarget.on('change', function () { onClickBtnSearchTarget(); });
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
    }

    function onChangeSelRewardType()
    {
        dateFrom.val('');
        dateTo.val('');
        nickname.val('');
        actionCount.val('');

        switch (selRewardType.val()) {
            case 'user' :
                baseDateWrap.hide();
                nickname.parent().show();
                nickname.trigger('focus');
                actionCount.parent().hide();
                break;
            case 'all' :
                baseDateWrap.hide();
                nickname.parent().hide();
                actionCount.parent().hide();
                break;
            default :
                baseDateWrap.show();
                nickname.parent().hide();
                actionCount.parent().show();
                actionCount.trigger('focus');
                break;
        }
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

        // const inputValue = $(obj).siblings('input').val();
        // keyword.val(inputValue);
        // initialize ? buildSearchMemberTable() : onSubmitSearchMember();
        // initialize = false;
    }

    function onSubmitSearchMember()
    {
        if (isEmpty(keyword.val()))
        {
            sweetToast(`닉네임을 ${message.input}`);
            keyword.trigger('focus');
            return;
        }

        const table = dataTable.DataTable();
        table.page.len(5);
        table.ajax.reload();
    }

    function buildSearchMemberTable()
    {
        dataTable.DataTable({
            ajax : {
                url: api.getMemberForSaveUcd,
                type:"POST",
                headers: headers,
                global: false,
                dataFilter: function(data){
                    let json = JSON.parse(data);
                    if (isSuccessResp(json))
                    {
                        json.recordsTotal = json.data.count;
                        json.recordsFiltered = json.data.count;
                        json.data = json.data.list;
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
                        "page" : (d.start / d.length) + 1
                        ,"limit" : d.length
                        ,"search_type" : "nickname"
                        ,"keyword" : keyword.val().trim()
                    }

                    return JSON.stringify(param);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: "닉네임",		data: "nickname",    	width: "30%" }
                ,{title: "PID",		data: "profile_uuid",   width: "45%" }
                ,{title: "보유UCD",	data: "ucd",   			width: "20%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: '', 		data: "profile_uuid",   width: "5%",
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
                const checkboxEl = $(nRow).children().eq(3).find('input');
                if (addedUsers.indexOf(aData.profile_uuid) > -1)
                    $(checkboxEl).prop('disabled', true);
            },
            drawCallback: function (settings) {
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
    }

    function onClickBtnSearchTarget()
    {

    }

    function onSubmitReward()
    {
        if (validation())
            sweetConfirm(message.create, rewardRequest);
    }

    function validation()
    {
        if (isEmpty(description.val()))
        {
            sweetToast(`내용은 ${message.required}`);
            description.trigger('focus');
            return false;
        }

        if (isEmpty(amount.val()))
        {
            sweetToast(`적립 UCD는 ${message.required}`);
            amount.trigger('focus');
            return false;
        }

        if (Number(amount.val()) > 1000000)
        {
            sweetToast(message.maxAvailableUserUcd);
            amount.trigger('focus');
            return false;
        }

        if (selRewardType.val() === 'user' && getSelectedIdsFromTableRow().length === 0)
        {
            sweetToast(`적립 대상을 ${message.select}`);
            return false;
        }

        if (['user', 'all'].indexOf(selRewardType.val()) === -1 && isEmpty(actionTimes.val()))
        {
            sweetToast(`인증 횟수를 ${message.input}`);
            return false;
        }

        return true;
    }

    function rewardRequest()
    {
        const param = {
            "doit_uuid" : g_doit_uuid,
            "description" : content.val().trim(),
            "value" : amount.val().trim(),
            "type" : selRewardType.val(),
        }

        if (selRewardType.val() === 'user')
            param["profile_uuid"] = getSelectedIdsFromTableRow();

        if (['user', 'all'].indexOf(selRewardType.val()) === -1)
            param["type_value"] = actionTimes.val().trim();

        ajaxRequestWithJson(true, api.createReward, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await sweetToastAndCallback(data, fadeoutModal);
            })
            .catch(reject => sweetError(label.submit + message.ajaxError));
    }

    function getSelectedIdsFromTableRow()
    {
        let profileUuids = [];
        const rewardTable = rewardMemberTable.DataTable();
        const selectedData = rewardTable.rows('.selected').data();
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
                const selectedDay = date.getDate()
                date.setDate(selectedDay -20)
                const fromDate = getStringFormatToDate(date, '-');
               dateFrom.val(fromDate);
            }
        });
    }

    function initDateRange()
    {
        let date = new Date();
        const hour = date.getHours();
        const minDate = hour < 6 ? '-5' : '-6';

        datePicker.datepicker("option", "minDate", minDate);
        datePicker.datepicker("option", "maxDate", "today");
    }