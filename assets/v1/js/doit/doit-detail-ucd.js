
    /** UCD정보탭 **/
    const ucdTable		= $("#ucdTable");
    const selPageLengthForUcd	= $("#selPageLengthForUcd");
    const btnXlsxOutForUcd	= $("#btnXlsxOutForUcd");

    /***********
     * UCD 정보 탭 관련
     * *********/
    function getUcdLog()
    {
        ucdTable.DataTable({
            ajax : {
                url: api.listDoitUcd,
                type: "POST",
                headers: headers,
                data: function (d) {
                    return ucdTableParams(d);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: "구분",    data: "division",   		width: "10%" }
                ,{title: "UCD",   data: "amount",   		width: "15%",
                    render: function (data, type, row, meta) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "제목",   data: "title",  			width: "15%" }
                ,{title: "내용",   data: "description",   	width: "25%" }
                ,{title: "닉네임", data: "nickname",   		width: "15%" }
                ,{title: "일시",   data: "created",   		width: "15%" }
            ],
            serverSide: true,
            paging: true,
            pageLength: Number(selPageLengthForUcd.val()),
            select: false,
            destroy: true,
            initComplete: function () {
            },
            fnRowCallback: function( nRow, aData ) {
                setUcdRowAttributes(nRow, aData);
            },
            drawCallback: function (settings) {
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
    }

    function ucdTableParams(d)
    {
        let param = {
            "limit" : d.length
            ,"page" : (d.start / d.length) + 1
            ,"doit_uuid" : g_doit_uuid
        }

        return JSON.stringify(param);
    }

    function setUcdRowAttributes(nRow, aData)
    {
        if (isNegative(aData.amount))
            $(nRow).addClass('minus-pay');
    }