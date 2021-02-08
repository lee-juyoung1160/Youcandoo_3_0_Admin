
    /** 리뷰정보탭 **/
    const reviewTable		= $("#reviewTable");
    const selPageLengthForReview	= $("#selPageLengthForReview");
    const btnXlsxOutForReview   = $("#btnXlsxOutForReview");
    /** 리뷰상세 modal **/
    const modalDetailReview		= $("#modalDetailReview");
    const modalReviewContent	= $("#modalReviewContent");
    const modalReviewTitle		= $("#modalReviewTitle");
    const modalReviewStarWrap	= $("#modalReviewStarWrap");
    const modalReviewReport		= $("#modalReviewReport");
    const modalReviewUser		= $("#modalReviewUser");
    const modalReviewCreated	= $("#modalReviewCreated");
    const modalReviewBlind		= $("#modalReviewBlind");

    /****************
     * 리뷰정보탭 관련
     * **************/
    function getInvolveReview()
    {
        reviewTable.DataTable({
            ajax : {
                url: api.listReview,
                type: "POST",
                headers: headers,
                data: function (d) {
                    return reviewParams(d);
                },
                error: function (request, status) {
                    sweetError(label.list+message.ajaxLoadError);
                }
            },
            columns: [
                {title: "리뷰내용", 		data: "review_text",	width: "30%",
                    render: function (data, type, row, meta) {
                        return buildReviewDetail(row);
                    }
                }
                ,{title: "평점", 		data: "rating",    		width: "10%",
                    render: function (data) {
                        return buildStar(data);
                    }
                }
                ,{title: "신고", 		data: "report_count",   width: "10%" }
                ,{title: "블라인드 여부", data: "is_blind",    	width: "10%",
                    render: function (data) {
                        return data === 'Y' ? label.blind : label.unblind;
                    }
                }
                ,{title: "작성일시", 	data: "created",    	width: "15%" }
                ,{title: "작성자", 		data: "nickname",    	width: "15%" }
            ],
            serverSide: true,
            paging: true,
            pageLength: Number(selPageLengthForReview.val()),
            select: false,
            destroy: true,
            initComplete: function () {
            },
            fnRowCallback: function( nRow, aData ) {
            },
            drawCallback: function (settings) {
                buildTotalCount(this);
                toggleBtnPreviousAndNextOnTable(this);
            }
        });
    }

    function buildStar(rating)
    {
        let starEl = '<ol class="star-wrap" style="float: inherit;">';
        for (let i=0; i<5; i++)
        {
            let active = i < Number(rating) ? 'on' : '';
            starEl += `<li class="${active}"><i class="fas fa-star" style="cursor:default;"></i></li>`
        }
        starEl += '</ol>'

        return starEl;
    }

    function reviewParams(d)
    {
        let param = {
            "limit" : d.length
            ,"page" : (d.start / d.length) + 1
            ,"from_date" : ""
            ,"to_date" : ""
            ,"search_type" : "doit_uuid"
            ,"keyword" : g_doit_uuid
            ,"rating_list" : [1,2,3,4,5]
            ,"is_report" : "ALL"
            ,"is_blind" : "ALL"
        }

        return JSON.stringify(param);
    }

    function buildReviewDetail(data)
    {
        return (
            `<a onclick="modalDetailReviewFadein(this);"
                    class="line-clamp more-info-btn"
                    data-detail="${data.review_text}"
                    data-title="${replaceDoubleQuotes(data.doit_title)}"
                    data-rating="${data.rating}"
                    data-report="${data.report_count}"
                    data-nickname="${data.nickname}"
                    data-blind="${data.is_blind}"
                    data-created="${data.created}"
                    >${data.review_text}</a>`
        )
    }

    function modalDetailReviewFadein(obj)
    {
        modalLayout.fadeIn();
        modalDetailReview.fadeIn();
        overflowHidden();
        initModalDetailReview(obj);
    }

    function initModalDetailReview(obj)
    {
        let detail = $(obj).data('detail');
        let title = $(obj).data('title');
        let rating = $(obj).data('rating');
        let report = $(obj).data('report');
        let nickname = $(obj).data('nickname');
        let created = $(obj).data('created');
        let blind = $(obj).data('blind');

        modalReviewContent.html(detail);
        modalReviewTitle.html(title);
        modalReviewStarWrap.find('li').each(function (index) {
            index < rating ? $(this).addClass('on') : $(this).removeClass('on');
        });
        modalReviewReport.html(report);
        modalReviewUser.html(nickname);
        modalReviewCreated.html(created.substring(0, 10));
        modalReviewBlind.html(blind);
    }
