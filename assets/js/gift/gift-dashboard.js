
    const search 	= $(".search");
    const reset 	= $(".reset");
    const sendCount = $("#sendCount");
    const sendAmount = $("#sendAmount");
    const tableBody = $("#tableBody");

    /** 로드 바로 실행 **/
    $(() => {
        /** 데이트피커 초기화 **/
        initSearchDatepicker();
        /** 페이 초기화 **/
        initSearchForm();
        /** 목록 **/
        getList();
        /** 이벤트 **/
        $("body")  .on("keydown", function (event) { onKeydownSearch(event) });
        search			.on("click", function () { onSubmitSearch(); });
        reset			.on("click", function () { initSearchForm(); });
        dayButtons      .on("click", function () { onClickActiveAloneDayBtn(this); });
    });

    function initSearchForm()
    {
        initSearchDateRange();
        initMaxDateToday();
        initDayBtn();
    }

    function getList()
    {
        let url = api.dashboardGift;
        let errMsg = label.list+message.ajaxLoadError;
        let param = {
            "from_date" : dateFrom.val()
            ,"to_date" : dateTo.val()
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

    function onSubmitSearch()
    {
        getList();
        initMaxDateToday();
    }
