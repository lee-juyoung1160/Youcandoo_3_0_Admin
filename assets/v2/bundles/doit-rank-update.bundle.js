(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),a=$("#btnSearch"),i=($("#btnReset"),$("#btnSubmit")),n=($("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd")),o=($("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable")),r=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title")),s=($("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input")),l=($(".only-num"),$("#selStartHour"),$("#selStartMinute"),$("#selEndHour"),$("#selEndMinute"),$(".modal-btn"),$(".modal-close")),d=$(".modal-content"),c=$(".modal-bg"),p=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable")),m=($("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#selUpdateStartHour"),$("#selUpdateStartMinute"),$("#selUpdateEndHour"),$("#selUpdateEndMinute"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#modalMemo"),$("#searchTab li"),$("#ongoingRankTable"),$("#totalRankTable"),$("#btnRefreshTotalRank"),$("#btnRefreshOngoingRank"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#btnReward"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#modalReward"),$("#rewardTable"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selSearchTypeInAction"),$("#keywordInAction"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#report"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-report]"),$("input[name=chk-special-notice-report]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("input[name=chk-notice-type]"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-report]"),$("input[name=chk-update-special-notice-report]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#baseDateWrap"),$("#btnSearchNickname"),$("#btnSearchTarget"),$("#modalSearchMember"),$("#targetTable"),$("#searchTable"),$("#addedTable"),$("#selWeekly"),$("#dateRange")),u=($("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#isDel"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#leaveDate"),$("#loginDate"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))});function g(e,t,a){return new Promise(((i,n)=>{$.ajax({global:e,url:t,type:"POST",headers:u,contentType:"text/plain",dataType:"json",data:a,success:function(e){i(e)},error:function(e,t,a){n(a)},complete:function(e,t){}})}))}function b(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function h(e){return 0===function(e){return e.status}(e)}function f(e){return e.msg}const y=`${api_server_url}/v3/`,k={saveUserUcdFromXlsx:y+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:y+"ucd/set/charge/user/system",saveUserUcdByBiz:y+"ucd/set/charge/user/company",saveDoitUcdFromXlsx:y+"ucd/set/charge/doit/system/excel",saveDoitUcdBySystem:y+"ucd/set/charge/doit/system",saveDoitUcdByBiz:y+"ucd/set/charge/doit/company",saveBizUcd:y+"ucd/set/charge/company/system",dashboardSummary:y+"main/dashboard",dashboardSummaryList:y+"main/dashboard/get/list",dashboardMoreLeader:y+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:y+"main/dashboard/get/doitRanklist",getProfile:y+"admin/get",updatePassword:y+"admin/update/pwd",memberList:y+"profile/get/list",detailMember:y+"profile/get/detail/info",levelUp:y+"profile/set/levelUp",levelDown:y+"profile/set/levelDown",cancelPartner:y+"profile/set/releasePartner",levelInfo:y+"profile/get/level",levelHistory:y+"profile/get/level/history",deviceInfo:y+"profile/get/device/info",memberDoitList:y+"profile/get/doit",memberCategoryList:y+"profile/get/category",memberActionList:y+"profile/get/action",memberActionDetail:y+"profile/get/detail/action",countPerLevel:y+"level/get/count",memberLevelList:y+"level/get/list",unlinkMemberList:y+"profile/get/unlink",changedMemberList:y+"profile/get/changed",badgeList:y+"badge/get/list",createBadge:y+"badge/create",detailBadge:y+"badge/get/detail/info",deleteBadge:y+"badge/delete",updateBadge:y+"badge/update",categoryList:y+"category/list",createCategory:y+"category/create",detailCategory:y+"category/detail",reorderCategory:y+"category/update/sequence",deleteCategory:y+"category/delete",updateCategory:y+"category/update",subCategoryList:y+"subcategory/list",createSubCategory:y+"subcategory/create",updateSubCategoryDoitImg:y+"subcategory/set/doit/image",deleteSubCategory:y+"subcategory/delete",reorderSubCategory:y+"subcategory/update/sequence",editSubCategory:y+"subcategory/update",keywordList:y+"keyword/get/list",createKeyword:y+"keyword/create",updateKeyword:y+"keyword/update",doitSponsorList:y+"doit/get/company",doitList:y+"doit/list",doitSetRecommend:y+"doit/set/recommend",createDoit:y+"doit/create",createDoitCategoryList:y+"category/exposure/list",detailDoit:y+"doit/detail",updateDoit:y+"doit/update",deleteDoit:y+"doit/delete",openDoit:y+"doit/set/open",stopDoit:y+"doit/set/stop",getDoitUcd:y+"ucd/get/doit",getUcdDoitList:y+"ucd/get/doit/list",getDoitRewardList:y+"ucd/get/reward/doit",missionList:y+"mission/get/list",createMission:y+"mission/create",detailMission:y+"mission/get/detail/info",updateMission:y+"mission/update",deleteMission:y+"mission/delete",joinMemberList:y+"member/get/list",infoJoinMember:y+"member/get/profile",rewardMemberList:y+"ucd/get/reward/list",createReward:y+"ucd/set/reward/profile/condition",countMember:y+"member/get/count",blockMember:y+"member/set/retire/ban",banMember:y+"member/set/retire",applyMemberList:y+"member/get/applylist",approvalMember:y+"member/get/applyConfirm",rejectMember:y+"member/get/applyReject",blockMemberList:y+"member/get/retire/ban/list",cancelBlockMember:y+"member/set/retire/ban/cancel",createBlockMemo:y+"member/set/retire/ban/memo",rankMember:y+"doit/get/member/rank",actionList:y+"action/get/list",detailAction:y+"action/get/detail/info",sendWarning:y+"action/set/yellow",cancelWarning:y+"action/set/yellowCancel",actionCommentList:y+"action/get/commentList",createActionComment:y+"action/set/insertComment",deleteActionComment:y+"action/set/deleteComment",actionReplyList:y+"action/get/comment/child/list",talkList:y+"board/get/list",createTalk:y+"board/create",detailTalk:y+"board/get/detail/info",updateTalk:y+"board/update",deleteTalk:y+"board/delete",talkCommentList:y+"board/get/commentList",createTalkComment:y+"board/set/insertComment",deleteTalkComment:y+"board/set/deleteComment",talkReplyList:y+"board/get/comment/child/list",pickList:y+"recommend/list",previewList:y+"recommend/get/doit",searchDoitList:y+"recommend/get/doit/list",reorderPick:y+"recommend/set",createPick:y+"recommend/create",updatePick:y+"recommend/update",detailPick:y+"recommend/detail",getWeek:y+"doit/rank/get/week",rankList:y+"doit/rank/get/list",createRank:y+"doit/rank/set",targetRankList:y+"doit/rank/popup/get",copyRank:y+"doit/rank/set/copy",bizList:y+"biz/get/list",createBiz:y+"biz/create",detailBiz:y+"biz/get/detail/info",bizDoitList:y+"biz/get/detail/doit",bizUcdList:y+"ucd/list/get/company",updateBiz:y+"biz/update",getBizUcd:y+"ucd/get/company",noticeList:y+"notice/get/list",createNotice:y+"notice/create",detailNotice:y+"notice/get/detail/info",updateNotice:y+"notice/update",deleteNotice:y+"notice/delete",faqType:y+"faq/get/type",faqList:y+"faq/get/list",createFaq:y+"faq/create",detailFaq:y+"faq/get/detail/info",updateFaq:y+"faq/update",deleteFaq:y+"faq/delete",reorderFaq:y+"faq/set/orders",inquiryList:y+"qna/get/list",updateInquiry:y+"qna/set/insertComment",detailInquiry:y+"qna/get/detail/info",deleteInquiry:y+"qna/delete",xlsxOutInquiry:y+"excel/export/qna",reportActionList:y+"report/get/action/list",actionReportReasonList:y+"report/get/action/descriptionList",reportTalkList:y+"report/get/board/list",talkReportReasonList:y+"report/get/board/descriptionList",blindTalk:y+"report/set/blind",bannerList:y+"banner/get/list",createBanner:y+"banner/create",detailBanner:y+"banner/get/detail/info",updateBanner:y+"banner/update",reorderBanner:y+"banner/set/orders",targetEventList:y+"banner/get/event/list",targetDoitList:y+"banner/get/doit/list",targetNoticeList:y+"banner/get/notice/list",storyList:y+"story/get/list",createStory:y+"story/create",detailStory:y+"story/get/detail/info",updateStory:y+"story/update",reorderStory:y+"story/set/orders",eventList:y+"event/get/list",createEvent:y+"event/create",detailEvent:y+"event/get/detail/info",deleteEvent:y+"event/delete",updateEvent:y+"event/update",customEvent:y+"event/popup/get/list",customEventProfile:y+"event/popup/get/profile",pushList:y+"push/list",cancelPush:y+"push/set/cancel",createPush:y+"push/create",pushTargetNotice:y+"push/get/notice",pushTargetEvent:y+"push/get/event",pushTargetDoit:y+"push/get/doit",pushTargetMember:y+"push/get/profile",pushTargetMemberFromXlsx:y+"excel/import/notification/profile",popupList:y+"popup/get/list",createPopup:y+"popup/create",detailPopup:y+"popup/get/detail/info",updatePopup:y+"popup/update",deletePopup:y+"popup/delete",errorList:y+"error/list",updateError:y+"error/update",createEncryption:y+"operate/set/encryption",createDecryption:y+"operate/set/decryption",versionList:y+"operate/get/version/list",createVersion:y+"operate/version/create",deleteVersion:y+"operate/version/delete",logList:y+"log/get/list",getMemberForSaveUcd:y+"ucd/get/user/list",getMemberFromXlsx:y+"excel/import/profile",getDoitFromXlsx:y+"excel/import/doit",ucdChargeList:y+"ucd/list/get/charge",systemWalletType:y+"ucd/get/system/type",systemWalletList:y+"ucd/list/get/system",doitWalletList:y+"ucd/list/get/doit",memberWalletList:y+"ucd/list/get/user",pendingWalletList:y+"ucd/list/get/transfer",giftList:y+"gift/get/list",reorderGiftList:y+"gift/get/orderList",reorderGift:y+"gift/set/orders",createGift:y+"gift/create",ktGoodsList:y+"gift/get/kt/goods",detailGift:y+"gift/get/detail/info",updateGift:y+"gift/update",applyGiftList:y+"exchange/get/list",sendGifticon:y+"exchange/set/confirm",sendGeneralGift:y+"exchange/set/send",rejectGift:y+"exchange/set/reject",resendGift:y+"exchange/set/resend",getGiftBalance:y+"exchange/get/money",sendGiftList:y+"exchange/get/sendList",sendGiftStatusList:y+"exchange/get/payment",updateGiftSendMemo:y+"exchange/set/insertMemo",adminList:y+"admin/list",detailAdmin:y+"admin/detail",updateAdmin:y+"admin/update",deleteAdmin:y+"admin/delete",authBizList:y+"auth/get/biz/list",approvalAdmin:y+"admin/approval",authList:y+"auth/list",getMenuWithAuth:y+"auth/get/menu",setMenuWithAuth:y+"auth/set/menu",createAuth:y+"auth/create",deleteAuth:y+"auth/delete",promotionList:y+"promotion/get/list",createPromotion:y+"promotion/create",detailPromotion:y+"promotion/get/detail",updatePromotion:y+"promotion/update",closePromotion:y+"promotion/set/end",promotionDoitList:y+"promotion/get/doit/list",promotionProceedList:y+"promotion/get/proceed/list",setDoitPromotion:y+"promotion/set/doit",cancelDoitPromotion:y+"promotion/set/release"},T=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function w(e){T.fire({icon:"info",title:e})}function v(e){Swal.fire({icon:"error",html:e})}const L="목록이 없습니다.",D="/v2/doit/rank";function S(){d.fadeOut(),c.fadeOut(),$("body").css("overflow-y","auto")}function C(e){let t=$(e).val().length,a=$(e).prop("maxLength");t>a&&a>0&&($(e).val($(e).val().slice(0,a)),t=a),$(e).next().find(".count-input").text(t)}function M(){$("img").on("error",(function(){$(this).attr("src","/assets/v2/img/no-image.jpg")}))}function x(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function U(e){return x(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}let A=[],_=[],W=!0;const B=("/",window.location.pathname.split("/").reverse()[0]);function P(){const e=o.DataTable();e.page.len(5),e.ajax.reload()}function R(){p.DataTable({data:_,columns:[{title:"썸네일",data:"doit_image_url",width:"5%",render:function(e){return`<div class="list-img-wrap doit-img-wrap"><img src="${e}" alt=""></div>`}},{title:"두잇명",data:"doit_title",width:"22%"},{title:"리더",data:"nickname",width:"20%"},{title:"참여자 수",data:"join_user",width:"8%",render:function(e){return U(e)}},{title:"리더 연속 인증 수",data:"ongoing_action_count",width:"10%",render:function(e){return U(e)}},{title:"리더 커뮤니티지수",data:"community_score",width:"10%",render:function(e){return U(e)}},{title:"인당 열정지수",data:"grit_per_person",width:"10%",render:function(e){return Math.round(100*Number(e))/100}},{title:"오픈일",data:"opened",width:"10%",render:function(e){return e.slice(0,10)}},{title:"",data:"doit_uuid",width:"5%",render:function(e,t,a,i){return`<button type="button" class="btn-xs btn-text-red delete-btn" data-rownum="${i.row}"><i class="fas fa-minus-circle"></i></button>`}}],language:{emptyTable:"두잇을 추가해주세요.\n(최소5개 ~ 최대30개)"},serverSide:!1,paging:!1,select:!1,destroy:!0,initComplete:function(){W||function(e){let t=e.DataTable();t.ajax.reload(null,!1),0===t.data().length&&t.page("last").draw("page"),$("input[name=chk-row]").prop("checked",!1),$("#checkAll").prop("checked",!1)}(o)},fnRowCallback:function(e,t){$(e).attr("id",t.doit_uuid),$(e).attr("data-join_user",t.join_user),$(e).attr("data-grit",t.grit),$(e).attr("data-grit_per_person",t.grit_per_person),$(e).attr("data-profile_uuid",t.profile_uuid),$(e).attr("data-score",t.score),$(e).attr("data-ongoing_action_count",t.ongoing_action_count),$(e).attr("data-community_score",t.community_score),$(e).children().eq(8).find("button").on("click",(function(){!function(e){let t=p.DataTable();t.row($(e).closest("tr")).remove().draw(!1),A.length=0,_.length=0;const a=t.rows().data();if(a.length>0)for(let e=0;e<a.length;e++)_.push({...a[e]}),A.push(a[e].doit_uuid)}(this)})),"Y"===t.is_new&&$(e).addClass("selected")},drawCallback:function(e){M()}})}function I(){p.find("tbody").sortable({helper:function(e,t){return function(e){let t=$(e).children();return $(t[0]).css("width",Math.ceil($(e).width()/100*5)+"px"),$(t[1]).css("width",Math.ceil($(e).width()/100*22)+"px"),$(t[2]).css("width",Math.ceil($(e).width()/100*20)+"px"),$(t[3]).css("width",Math.ceil($(e).width()/100*8)+"px"),$(t[4]).css("width",Math.ceil($(e).width()/100*10)+"px"),$(t[5]).css("width",Math.ceil($(e).width()/100*10)+"px"),$(t[6]).css("width",Math.ceil($(e).width()/100*10)+"px"),$(t[7]).css("width",Math.ceil($(e).width()/100*10)+"px"),$(t[8]).css("width",Math.ceil($(e).width()/100*5)+"px"),$(e)}(t)}})}function q(){const e=p.find("tbody").children();let t=[];for(let a=0;a<e.length;a++)t.push({ranking:a+1,doit_uuid:e[a].id,join_user:$(e[a]).data("join_user"),grit:$(e[a]).data("grit"),grit_per_person:$(e[a]).data("grit_per_person"),profile_uuid:$(e[a]).data("profile_uuid"),score:$(e[a]).data("score"),ongoing_action_count:$(e[a]).data("ongoing_action_count"),community_score:$(e[a]).data("community_score")});const a={week:B,title:r.val().trim(),doit_list:t};g(!0,k.createRank,JSON.stringify(a)).then((async function(e,t,a){await function(e,t){Swal.fire({toast:!0,position:"center",icon:h(e)?"success":"error",title:b(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&h(e)&&t()}))}(e,F)})).catch((e=>v("수정 처리 중, 오류가 발생했습니다.")))}function F(){location.href=D}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:L,zeroRecords:L,processing:"검색 중..",paginate:{previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>'}}}),g(!0,`${k.rankList}/${B}`,null).then((async function(e,t,a){h(e)?function(e){(function(e){r.val(e.title),m.text(`${e.start_date} ~ ${e.end_date}`),$(".length-input").each((function(){C(this)}))})(e),e.data.map((e=>{_.push({...e}),A.push(e.doit_uuid)})),R(),I()}(e):w(f(e))})).catch((e=>v("상세 내용을(를) 불러올 수 없습니다."))),s.on("propertychange change keyup paste input",(function(){C(this)})),l.on("click",(function(){S()})),c.on("click",(function(){S()})),n.on("click",(function(){d.fadeIn(),c.fadeIn(),$("body").css("overflow-y","hidden"),t.val(""),W?o.DataTable({ajax:{url:k.targetRankList,type:"POST",headers:u,global:!1,dataFilter:function(e){let t=JSON.parse(e);return h(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],w(f(t))),JSON.stringify(t)},data:function(e){const a={page:e.start/e.length+1,limit:e.length,doit_title:t.val().trim()};return JSON.stringify(a)},error:function(e,t){v("목록을(를) 불러올 수 없습니다.")}},columns:[{title:"썸네일",data:"doit_image_url",width:"10%",render:function(e){return`<div class="list-img-wrap doit-img-wrap"><img src="${e}" alt=""></div>`}},{title:"두잇명",data:"doit_title",width:"35%"},{title:"리더",data:"nickname",width:"25%"},{title:"참여자 수",data:"join_user",width:"10%",render:function(e){return U(e)}},{title:"오픈일",data:"opened",width:"15%",render:function(e){return e.slice(0,10)}},{title:"",data:"doit_uuid",width:"5%",render:function(e,t,a,i){return`<div class="checkbox-wrap"><input type="checkbox" name="chk-row" id="${n=i.row}"/><label for="${n}"><span></span></label></div>`;var n}}],serverSide:!0,paging:!0,pageLength:5,select:{style:"single",selector:":checkbox"},destroy:!0,initComplete:function(){$(this).on("select.dt",(function(e,t,a,i){!function(e,t){if(_.length>=30)return w("최대 30개까지 등록 가능합니다."),e.rows(t).deselect(),void $("input[name=chk-row]").eq(t).prop("checked",!1);(function(e){let t=[];t.push({...e,is_new:"Y"}),_=t.concat(_),A.push(e.doit_uuid),R()})(e.rows(t).data()[0]),p.find("tbody").sortable("destroy"),I()}(t,i)}))},fnRowCallback:function(e,t){const a=$(e).children().eq(5).find("input");A.indexOf(t.doit_uuid)>-1&&$(a).prop("disabled",!0)},drawCallback:function(e){M(),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}):P(),W=!1})),a.on("click",(function(){P()})),i.on("click",(function(){var e;(_.length<5?(w("두잇을 5개 이상 등록해주세요."),0):x(r.val())?(w("랭킹 명을 입력해주세요."),r.trigger("focus"),0):0!==_.length||(w("두잇을 추가해주세요."),0))&&("수정하시겠습니까?",e=q,Swal.fire({text:"수정하시겠습니까?",showCancelButton:!0,confirmButtonText:"확인",cancelButtonText:"취소"}).then((t=>{t.value&&e()})))}))}))})();