
    const selYear   = $('#selYear');
    const selMonth  = $('#selMonth');
    const dataTable = $("#dataTable");
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;

    /** 로드 바로 실행 **/
    $(() => {
        /** 셀렉트박스 초기화 **/
        initSelectBox();
        /** dataTable default config **/
        initTableDefault();
        /** 목록 불러오기 **/
        buildGrid();
        /** 이벤트 **/
        selYear     .on('change', function () { onChangeSelectBox(); });
        selMonth    .on('change', function () { onChangeSelectBox(); });
    });

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

    function onChangeSelectBox()
    {
        let table = dataTable.DataTable();
        table.ajax.reload();
    }

    function buildGrid()
    {
        dataTable.DataTable({
            ajax : {
                url: api.dashboardGift,
                type: "POST",
                headers: headers,
                data: function (d) {
                    return tableParams();
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: "상품", 		data: "gift_name",   		width: "33%" }
                ,{title: "발송건 수", data: "total_gift_qty",   	width: "33%" }
                ,{title: "금액",	    data: "total_gift_ucd",  	width: "33%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
            ],
            serverSide: true,
            paging: false,
            select: false,
            destroy: false,
            initComplete: function () {
            },
            fnRowCallback: function( nRow, aData ) {
            },
            drawCallback: function (settings) {
            }
        });
    }

    function tableParams()
    {
        let param = {
            "year" : selYear.val()
            ,"month": selMonth.val()
        }

        return JSON.stringify(param);
    }

