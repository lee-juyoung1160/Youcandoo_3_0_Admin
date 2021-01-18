
    /** 참여신청자정보 탭 **/
    const searchApplyMember    = $("#searchApplyMember");
    const keywordApplyMember   = $("#keywordApplyMember")
    const publicQuestionBox	   = $("#publicQuestionBox");
    const privateQuestionBox   = $("#privateQuestionBox");
    const btnApproval	    = $("#btnApproval")
    const btnReject	        = $("#btnReject")
    const applyUserTable	= $("#applyUserTable")
    const selPageLengthForApplyUser = $("#selPageLengthForApplyUser");

    function getApplyMember()
    {
        applyUserTable.DataTable({
            ajax : {
                url: api.listApplyMember,
                type:"POST",
                headers: headers,
                data: function (d) {
                    return applyUserTableParams(d);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: tableCheckAllDom(), data: "profile_uuid",   width: "5%",
                    render: function (data, type, row, meta) {
                        return multiCheckBoxDom(meta.row);
                    }
                }
                ,{title: "닉네임", 			data: "nickname",    	width: "20%" }
                ,{title: "프로필ID", 		    data: "profile_uuid",   width: "15%",
                    render: function (data) {
                        return `<div>
								 	<input type="text" class="input-copy" style="width: 150px" value="${data}" readonly>
								 	<i class="fas fa-copy" onclick="copyToClipboard(this);"></i>
								</div>`;
                    }
                }
                ,{title: "비공개 답변", 		data: "private_answer", width: "20%",   className: "line-clamp-wrap",
                    render: function (data) {
                        return isEmpty(data) ? label.dash : buildDetailAnswer(data);
                    }
                }
                ,{title: "공개 답변", 		data: "public_answer",  width: "20%",   className: "line-clamp-wrap",
                    render: function (data) {
                        return isEmpty(data) ? label.dash : buildDetailAnswer(data);
                    }
                }
                ,{title: "신청일시", 		    data: "apply_date",     width: "15%" }
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
                buildQuestionBox(settings.json);
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
    }

    function applyUserTableParams(d)
    {
        let param = {
            "limit" : Number(selPageLengthForApplyUser.val())
            ,"page" : (d.start / d.length) + 1
            ,"doit_uuid" : g_doit_uuid
            ,"nickname": keywordApplyMember.val()
        }

        return JSON.stringify(param);
    }

    function buildDetailAnswer(data)
    {
        return `<div class="line-clamp" style="max-width: 300px" onclick="viewDetailAnswer(this);">${data}</div>
                <div class="tooltip-hover-text">
                    <i class="fas fa-times" onclick="closeTooltip(this);"></i>
                    <p>${data}</p>
                </div>`;
    }

    function viewDetailAnswer(obj)
    {
        $(".tooltip-hover-text").hide();
        $(obj).siblings().show();
    }

    function closeTooltip(obj)
    {
        $(obj).parent().hide();
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

    function buildQuestionBox(data)
    {
        let { private_question, public_question } = data.question;
        privateQuestionBox.html(isEmpty(private_question) ? label.dash : private_question);
        publicQuestionBox.html(isEmpty(public_question) ? label.dash : public_question);
    }

    function toggleApplyTableColumns()
    {
        const table = applyUserTable.DataTable();
        if (!g_is_created_by_biz || g_doit_status !== '모집중')
            table.column(0).visible(false);
    }
