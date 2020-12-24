
    const selYear   = $('#selYear');
    const selMonth  = $('#selMonth');
    const sendCount = $("#sendCount");
    const sendAmount = $("#sendAmount");
    const tableBody = $("#tableBody");
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;

    /** 로드 바로 실행 **/
    $(() => {
        /** 페이 초기화 **/
        initPage();
        /** 이벤트 **/
        selYear     .on('change', function () { getList(); });
        selMonth    .on('change', function () { getList(); });
    });

    function initPage()
    {
        initSelectBox();
        getList();
    }

    function initSelectBox()
    {
        initSelectBoxYear(year);
        initSelectBoxMonth(month);
    }

    function initSelectBoxYear(_year)
    {
        selYear.empty();

        let defaultYear  = 2020;

        for (defaultYear; defaultYear <= _year; defaultYear++)
            selYear.prepend(`<option value="${defaultYear}">${defaultYear}년</option>`);

        onChangeSelectOption(selYear);
    }

    function initSelectBoxMonth(_month)
    {
        selMonth.empty();

        let i = 1;

        for (i; i <= 12; i++)
        {
            let selected = i === Number(_month) ? 'selected' : '';
            selMonth.prepend(`<option ${selected} value="${appendZero(i)}">${appendZero(i)}월</option>`);
        }

        onChangeSelectOption(selMonth);
    }

    function getList()
    {
        let url = api.dashboardGift;
        let errMsg = label.list+message.ajaxLoadError;
        let param = {
            "year" : selYear.val()
            ,"month": selMonth.val()
        }
        ajaxRequestWithJsonData(true, url, JSON.stringify(param), getListSuccessCallback, errMsg, false);
    }

    function getListSuccessCallback(data)
    {
        isSuccessResp(data) ? buildGrid(data) : sweetToast(invalidResp(data));
    }

    function buildGrid(data)
    {
        sendCount.html(numberWithCommas(data.GiftTotalCount));
        sendAmount.html(numberWithCommas(data.GiftTotalUcd));

        let trEl = '';
        for (let { gift_name, total_gift_qty, total_gift_ucd } of data.data)
        {
            trEl +=
                `<tr>
                    <td>${gift_name}</td>
                    <td>${total_gift_qty}</td>
                    <td>${numberWithCommas(total_gift_ucd)}</td>
                </tr>`
        }

        tableBody.html(trEl);
    }
