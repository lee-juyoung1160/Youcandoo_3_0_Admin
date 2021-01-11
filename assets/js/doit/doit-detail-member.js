
    /** 참여자정보 탭 **/
    const search 		= $(".search");
    const reset 		= $(".reset");
    const keyword		= $("#keyword")
    const joinCount 	= $("#joinCount");
    const goal 			= $("#goal");
    const avg 			= $("#avg");
    const forecast 		= $("#forecast");
    const saving 		= $("#saving");
    const doitMemberBtnWrap	= $("#doitMemberBtnWrap");
    const joinUserTable		= $("#joinUserTable")
    const selPageLengthForUser   = $("#selPageLengthForUser");
    /*const btnXlsxOutForUser   = $("#btnXlsxOutForUser");*/

    /****************
     * 참여자정보탭 관련
     * **************/
    function initSearchForm()
    {
        keyword.val('');
    }

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
                    return tableParams(d);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: tableCheckAllDom(), data: "",   			width: "5%",    visible: false,
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
                ,{title: "총 인증 횟수", 		data: "todo",    		width: "8%",    visible: false }
                ,{title: "인증한 횟수", 		data: "total",    		width: "8%",    visible: false }
                ,{title: "성공", 	  		data: "success",    	width: "5%",    visible: false }
                ,{title: "실패",  	  		data: "fail",   		width: "5%",    visible: false }
                ,{title: "신고",  	  		data: "report",   		width: "5%",    visible: false }
                ,{title: "옐로카드",    		data: "yellow",   		width: "5%",    visible: false }
                ,{title: "레드카드",    		data: "red",   			width: "5%",    visible: false }
                ,{title: "평균달성률(%)", 	    data: "avg_percent",    width: "8%",    visible: false,
                    render: function (data) {
                        return Math.floor(Number(data));
                    }
                }
                ,{title: "적립리워드(UCD)",  	data: "total_reward",   width: "8%",    visible: false,
                    render: function (data) {
                        return numberWithCommas(data);
                    }
                }
                ,{title: "신청정보", 		    data: "",   width: "10%",    visible: false,
                    render: function (data) {
                        return `<a onclick="">보기</a>`;
                    }
                }
            ],
            serverSide: true,
            paging: true,
            pageLength: Number(selPageLengthForUser.val()),
            select: false,
            destroy: true,
            initComplete: function () {
                appendButtons();
                toggleColumns();
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

    function onClickBtnApproval()
    {

    }

    function onClickBtnReject()
    {

    }

    function onClickBtnBan()
    {

    }

    function appendButtons()
    {
        if (g_is_created_by_biz && g_doit_status === '모집중')
        {
            const buttons =
                `<button onclick="onClickBtnApproval()" class="btn-info" type="button"><i class="fas fa-check-circle"></i>참여 승인</button>
                <button onclick="onClickBtnReject()" class="btn-warning" type="button"><i class="fas fa-hand-paper"></i>참여 거절</button>
                <button onclick="onClickBtnBan()" class="btn-danger" type="button"><i class="fas fa-ban"></i>강퇴</button>`;

            doitMemberBtnWrap.html(buttons)
        }
    }

    function toggleColumns()
    {
        const table = joinUserTable.DataTable();
        if (g_is_created_by_biz && g_doit_status === '모집중')
        {
            table.column(0).visible(true);
            table.column(12).visible(true);
        }
        else
        {
            table.column(3).visible(true);
            table.column(4).visible(true);
            table.column(5).visible(true);
            table.column(6).visible(true);
            table.column(7).visible(true);
            table.column(8).visible(true);
            table.column(9).visible(true);
            table.column(10).visible(true);
            table.column(11).visible(true);
        }
    }
