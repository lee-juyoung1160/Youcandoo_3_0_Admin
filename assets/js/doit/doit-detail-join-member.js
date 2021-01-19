
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
    const selPageLengthForUser  = $("#selPageLengthForUser");
    const modalApplyDetail      = $("#modalApplyDetail");
    const modalApplyNickname    = $("#modalApplyNickname");
    const modalPrivateQuestion  = $("#modalPrivateQuestion");
    const modalPrivateAnswer    = $("#modalPrivateAnswer");
    const modalPublicQuestion   = $("#modalPublicQuestion");
    const modalPublicAnswer     = $("#modalPublicAnswer");
    const modalApplyCreated     = $("#modalApplyCreated");
    const modalApprovalCreate   = $("#modalApprovalCreate");

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
        applyUserTable.empty();

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
                {title: tableCheckAllDom(), data: "profile_uuid",   width: "5%",
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
                ,{title: "신청정보", 		    data: "profile_uuid",       width: "5%",
                    render: function (data, type, row, meta) {
                        return g_is_apply === 'Y'
                            ?`<a onclick="viewApplyDetail(this)" 
                                 data-nickname="${row.nickname}"
                                 data-applydate="${row.apply_date}"
                                 data-joindate="${row.join_date}"
                                 data-privateque="${replaceDoubleQuotes(row.private_question)}"
                                 data-pubilcque="${replaceDoubleQuotes(row.public_question)}"
                                 data-privateans="${replaceDoubleQuotes(row.private_answer)}"
                                 data-publicans="${replaceDoubleQuotes(row.public_answer)}">보기</a>`
                            : label.dash;
                    }
                }
            ],
            serverSide: true,
            paging: true,
            pageLength: Number(selPageLengthForUser.val()),
            select: {
                style: 'multi',
                selector: ':checkbox'
            },
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
        let nickname = $(obj).data('nickname');
        let applyDate = $(obj).data('applydate');
        let joinDate = $(obj).data('joindate');
        let privateQ = $(obj).data('privateque');
        let publicQ = $(obj).data('pubilcque');
        let privateA = $(obj).data('privateans');
        let publicA = $(obj).data('publicans');

        if (isEmpty(privateQ))
        {
            modalPrivateQuestion.parent().hide();
            modalPrivateAnswer.parent().hide();
        }
        else
        {
            modalPrivateQuestion.parent().show();
            modalPrivateAnswer.parent().show();
        }

        if (isEmpty(publicQ))
        {
            modalPublicQuestion.parent().hide();
            modalPublicAnswer.parent().hide();
        }
        else
        {
            modalPublicQuestion.parent().show();
            modalPublicAnswer.parent().show();
        }

        modalApplyNickname.html(nickname);
        modalPrivateQuestion.html(privateQ);
        modalPrivateAnswer.html(privateA);
        modalPublicQuestion.html(publicQ);
        modalPublicAnswer.html(publicA);
        modalApplyCreated.html(joinDate);
        modalApprovalCreate.html(applyDate);

        modalLayout.fadeIn();
        modalApplyDetail.fadeIn();
        overflowHidden();
    }

    function banUserValidation()
    {
        let table 	 	 = joinUserTable.DataTable();
        let selectedData = table.rows('.selected').data();
        if (isEmpty(selectedData))
        {
            sweetToast(`대상을 ${message.select}`);
            return false;
        }

        return true;
    }

    function onClickBtnBan()
    {
        if (banUserValidation())
            sweetConfirm(message.ban, banUserRequest);
    }

    function banUserRequest()
    {
        let url = api.banDoitMember;
        let errMsg = message.ajaxError;
        let param = {
            "doit_uuid" : g_doit_uuid,
            "profile_uuid" : banUserParams()
        }

        ajaxRequestWithJsonData(true, url, JSON.stringify(param), banUserSuccessCallback, errMsg, false);
    }

    function banUserSuccessCallback(data)
    {
        sweetToastAndCallback(data, banUserSuccess);
    }

    function banUserSuccess()
    {
        getDoitMemberCount();
        tableReloadAndStayCurrentPage(joinUserTable);
    }

    function banUserParams()
    {
        let table = joinUserTable.DataTable();
        let selectedData = table.rows('.selected').data();
        let params = [];
        for (let i=0; i<selectedData.length; i++)
        {
            let profileUuid = selectedData[i].profile_uuid;
            params.push(profileUuid);
        }

        return params;
    }

    function toggleJoinTableColumns()
    {
        const table = joinUserTable.DataTable();
        if (g_doit_status !== '모집중' || (g_doit_status === '모집중' && !g_is_created_by_biz))
            table.column(0).visible(false);
    }
