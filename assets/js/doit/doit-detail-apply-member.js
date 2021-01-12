
    /** 참여신청자정보 탭 **/
    const searchApplyMember    = $("#searchApplyMember");
    const keywordApplyMember   = $("#keywordApplyMember")
    const doitMemberBtnWrap	= $("#doitMemberBtnWrap");
    const btnApproval	    = $("#btnApproval")
    const btnReject	        = $("#btnReject")
    const applyUserTable	= $("#applyUserTable")
    const selPageLengthForApplyUser = $("#selPageLengthForApplyUser");

    function getApplyMember()
    {
        applyUserTable.DataTable({
            ajax : {
                url: api.listJoinMember,
                type:"POST",
                headers: headers,
                data: function (d) {
                    return tableParams(d);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: tableCheckAllDom(), data: "nickname",   	width: "5%",     visible: false,
                    render: function (data, type, row, meta) {
                        return multiCheckBoxDom(meta.row);
                    }
                }
                ,{title: "참여상태",    		data: "nickname",       width: "10%",    visible: false }
                ,{title: "닉네임", 			data: "nickname",    	width: "20%" }
                ,{title: "프로필ID", 		    data: "profile_uuid",   width: "15%",
                    render: function (data) {
                        return `<div>
								 	<input type="text" class="input-copy" style="width: 150px" value="${data}" readonly>
								 	<i class="fas fa-copy" onclick="copyToClipboard(this);"></i>
								</div>`;
                    }
                }
                ,{title: "질문", 		    data: "nickname",       width: "15%" }
                ,{title: "답변", 		    data: "nickname",       width: "15%" }
                ,{title: "신청일시", 		    data: "nickname",       width: "15%" }
            ],
            serverSide: true,
            paging: true,
            pageLength: Number(selPageLengthForApplyUser.val()),
            select: false,
            destroy: true,
            initComplete: function () {
                toggleApplyTableColumns();
            },
            fnRowCallback: function( nRow, aData ) {
            },
            drawCallback: function (settings) {
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
    }

    function tableParams(d)
    {
        let param = {
            "limit" : d.length
            ,"page" : (d.start / d.length) + 1
            ,"doit_uuid" : g_doit_uuid
            ,"nickname": keyword.val()
        }

        return JSON.stringify(param);
    }

    function applyUserValidation()
    {
        let table 	 	 = applyUserTable.DataTable();
        let selectedData = table.rows('.selected').data()[0];
        if (isEmpty(selectedData))
        {
            sweetToast(`대상을 ${message.select}`);
            return false;
        }

        return true;
    }

    function hasPendingUser()
    {
        let result = false;
        let table 		 = applyUserTable.DataTable();
        let selectedData = table.rows('.selected').data();

        for (let i=0; i<selectedData.length; i++)
        {
            let goodsCode = selectedData[i].goods_code;
            if (isEmpty(goodsCode))
                result = true;
        }

        return result;
    }

    function hasApprovalUser()
    {
        let result = false;
        let table 		 = applyUserTable.DataTable();
        let selectedData = table.rows('.selected').data();

        for (let i=0; i<selectedData.length; i++)
        {
            let goodsCode = selectedData[i].goods_code;
            if (!isEmpty(goodsCode))
                result = true;
        }

        return result;
    }

    function onClickBtnApproval()
    {
        if (applyUserValidation())
            sweetConfirm(message.approve, approvalUserRequest);
    }

    function onClickBtnReject()
    {
        if (applyUserValidation())
            sweetConfirm(message.reject, approvalUserRequest);
    }

    function approvalUserRequest()
    {
        let url = "";
        let errMsg = message.ajaxError;


    }

    function toggleApplyTableColumns()
    {
        const table = applyUserTable.DataTable();
        if (!g_is_created_by_biz || g_doit_status !== '모집중')
            table.column(0).visible(false);
    }
