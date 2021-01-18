
    /** 참여자정보 탭 **/
    const searchJoinMember	= $("#searchJoinMember");
    const keywordJoinMember	= $("#keywordJoinMember")
    const joinCount 	= $("#joinCount");
    const goal 			= $("#goal");
    const avg 			= $("#avg");
    const forecast 		= $("#forecast");
    const saving 		= $("#saving");
    const btnBan 		= $("#btnBan");
    const joinUserTable		= $("#joinUserTable");
    const selPageLengthForUser   = $("#selPageLengthForUser");
    const modalApplyDetail    = $("#modalApplyDetail");
    const modalApplyNickname  = $("#modalApplyNickname");
    const modalApplyQuestion  = $("#modalApplyQuestion");
    const modalApplyAnswer    = $("#modalApplyAnswer");
    const modalApplyCreated   = $("#modalApplyCreated");
    const modalApprovalCreate = $("#modalApprovalCreate");

    function getJoinMemberTotal()
    {
        let url 	= api.totalJoinMember;
        let param   = JSON.stringify({"doit_uuid" : g_doit_uuid});
        let errMsg 	= label.detailContent+message.ajaxLoadError;

        ajaxRequestWithJsonData(true, url, param, getJoinMemberTotalCallback, errMsg, false);
    }

    function getJoinMemberTotalCallback(data)
    {
        isSuccessResp(data) ? setJoinMemberTotal(data) : sweetError(invalidResp(data));
    }

    function setJoinMemberTotal(data)
    {
        let detail = data.data;

        joinCount.html(numberWithCommas(detail.member_cnt));
        goal.html(Math.floor(detail.goal_percent));
        avg.html(Math.floor(detail.avg_percent));
        forecast.html(numberWithCommas(detail.total_reward));
        saving.html(numberWithCommas(detail.save_reward));
    }

    function getJoinMember()
    {
        joinUserTable.DataTable({
            ajax : {
                url: api.listJoinMember,
                type:"POST",
                headers: headers,
                data: function (d) {
                    return joinUserTableParams(d);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: tableCheckAllDom(), data: "nickname",   	width: "5%",
                    render: function (data, type, row, meta) {
                        return multiCheckBoxDom(meta.row);
                    }
                }
                ,{title: "닉네임", 			data: "nickname",    	width: "15%" }
                ,{title: "프로필ID", 		    data: "profile_uuid",   width: "15%",
                    render: function (data) {
                        return `<div>
								 	<input type="text" class="input-copy" style="width: 150px" value="${data}" readonly>
								 	<i class="fas fa-copy" onclick="copyToClipboard(this);"></i>
								</div>`;
                    }
                }
                ,{title: "총 인증 수", 		data: "todo",    		width: "5%" }
                ,{title: "인증한 횟수", 		data: "total",    		width: "7%" }
                ,{title: "성공", 	  		data: "success",    	width: "5%" }
                ,{title: "실패",  	  		data: "fail",   		width: "5%" }
                ,{title: "신고",  	  		data: "report",   		width: "5%" }
                ,{title: "옐로카드",    		data: "yellow",   		width: "5%" }
                ,{title: "레드카드",    		data: "red",   			width: "5%" }
                ,{title: "평균달성률(%)", 	    data: "avg_percent",    width: "8%",
                    render: function (data) {
                        return Math.floor(Number(data));
                    }
                }
                ,{title: "적립리워드(UCD)",  	data: "total_reward",   width: "8%",
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "신청정보", 		    data: "nickname",       width: "5%",
                    render: function (data, type, row, meta) {
                        return `<a onclick="viewApplyDetail(this)"
                                   data-nickname=""
                                   >보기</a>`;
                    }
                }
            ],
            serverSide: true,
            paging: true,
            pageLength: Number(selPageLengthForUser.val()),
            select: false,
            destroy: true,
            initComplete: function () {
                toggleJoinTableColumns();
            },
            fnRowCallback: function( nRow, aData ) {
            },
            drawCallback: function (settings) {
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
    }

    function joinUserTableParams(d)
    {
        let param = {
            "limit" : d.length
            ,"page" : (d.start / d.length) + 1
            ,"doit_uuid" : g_doit_uuid
            ,"nickname": keywordJoinMember.val()
        }

        return JSON.stringify(param);
    }

    function viewApplyDetail(obj)
    {
        modalApplyNickname.html();
        modalApplyQuestion.html();
        modalApplyAnswer.html();
        modalApplyCreated.html();
        modalApprovalCreate.html();

        modalLayout.fadeIn();
        modalApplyDetail.fadeIn();
        overflowHidden();
    }

    function joinUserValidation()
    {
        let table 	 	 = joinUserTable.DataTable();
        let selectedData = table.rows('.selected').data()[0];
        if (isEmpty(selectedData))
        {
            sweetToast(`대상을 ${message.select}`);
            return false;
        }

        return true;
    }

    function onClickBtnBan()
    {
        if (joinUserValidation())
            sweetConfirm(message.ban, banUserRequest);
    }

    function banUserRequest()
    {
        let url = "";
        let errMsg = message.ajaxError;


    }

    function toggleJoinTableColumns()
    {
        const table = joinUserTable.DataTable();
        if (!g_is_created_by_biz || g_doit_status !== '모집중' || g_is_apply !== 'Y')
        {
            table.column(0).visible(false);
            table.column(12).visible(false);
        }
    }