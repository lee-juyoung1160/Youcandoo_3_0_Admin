(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport")),a=($(".date-btn .btn"),$(".datepicker")),n=($(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword"),$("#btnSearch"),$("#btnReset"),$("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable"),$("#dataTable_paginate")),i=($("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$("#selStartHour"),$("#selStartMinute"),$("#selEndHour"),$("#selEndMinute"),$(".modal-btn"),$(".modal-close")),o=$(".modal-content"),r=$(".modal-bg"),s=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#selUpdateStartHour"),$("#selUpdateStartMinute"),$("#selUpdateEndHour"),$("#selUpdateEndMinute"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#modalMemo"),$("#searchTab li"),$("#ongoingRankTable"),$("#totalRankTable"),$("#btnRefreshTotalRank"),$("#btnRefreshOngoingRank"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#btnReward"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#modalReward"),$("#rewardTable"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selSearchTypeInAction"),$("#keywordInAction"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("input[name=radio-comment-attach-type]"),$("#commentAttachmentWrap"),$("#btnCommentEmoji"),$("#commentEmojiWrap"),$("#commentEmojiCategory"),$("#previewEmoji"),$("#btnCancelCommentEmoji"),$("input[name=radio-action-attach-type]"),$("#actionAttachmentWrap"),$("#btnActionEmoji"),$("#actionEmojiWrap"),$("#actionEmojiCategory"),$("#previewActionEmoji"),$("#btnCancelActionEmoji"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("input[name=chk-special-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("input[name=chk-notice-type]"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("input[name=chk-update-special-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#baseDateWrap"),$("#btnSearchNickname"),$("#btnSearchTarget"),$("#modalSearchMember"),$("#targetTable"),$("#searchTable"),$("#addedTable"),$("#selWeekly"),$("#dateRange"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#selVocType"),$("#selVocTypeDetail"),$("#selRiskGrade"),$("#vocType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#isDel"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#customEvent"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#leaveDate"),$("#loginDate"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary")),l=$("#dateToSummary"),d=$("#dateFromSummaryList"),c=$("#dateToSummaryList"),p=$("#btnRefreshMission"),m=$("#btnRefreshCategory"),u={Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))};function g(e,t,a){return new Promise(((n,i)=>{$.ajax({global:e,url:t,type:"POST",headers:u,contentType:"text/plain",dataType:"json",data:a,success:function(e){n(e)},error:function(e,t,a){i(a)},complete:function(e,t){}})}))}function b(e){return 0===function(e){return e.status}(e)}function f(e){return e.msg}const h=`${api_server_url}/v3/`,y={saveUserUcdFromXlsx:h+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:h+"ucd/set/charge/user/system",saveUserUcdByBiz:h+"ucd/set/charge/user/company",saveDoitUcdFromXlsx:h+"ucd/set/charge/doit/system/excel",saveDoitUcdBySystem:h+"ucd/set/charge/doit/system",saveDoitUcdByBiz:h+"ucd/set/charge/doit/company",saveBizUcd:h+"ucd/set/charge/company/system",dashboardSummary:h+"main/dashboard",dashboardSummaryList:h+"main/dashboard/get/list",dashboardMoreLeader:h+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:h+"main/dashboard/get/doitRanklist",getProfile:h+"admin/get",updatePassword:h+"admin/update/pwd",memberList:h+"profile/get/list",detailMember:h+"profile/get/detail/info",levelUp:h+"profile/set/levelUp",levelDown:h+"profile/set/levelDown",cancelPartner:h+"profile/set/releasePartner",levelInfo:h+"profile/get/level",levelHistory:h+"profile/get/level/history",deviceInfo:h+"profile/get/device/info",memberDoitList:h+"profile/get/doit",memberCategoryList:h+"profile/get/category",memberActionList:h+"profile/get/action",memberActionDetail:h+"profile/get/detail/action",countPerLevel:h+"level/get/count",memberLevelList:h+"level/get/list",unlinkMemberList:h+"profile/get/unlink",changedMemberList:h+"profile/get/changed",badgeList:h+"badge/get/list",createBadge:h+"badge/create",detailBadge:h+"badge/get/detail/info",deleteBadge:h+"badge/delete",updateBadge:h+"badge/update",categoryList:h+"category/list",createCategory:h+"category/create",detailCategory:h+"category/detail",reorderCategory:h+"category/update/sequence",deleteCategory:h+"category/delete",updateCategory:h+"category/update",subCategoryList:h+"subcategory/list",createSubCategory:h+"subcategory/create",updateSubCategoryDoitImg:h+"subcategory/set/doit/image",deleteSubCategory:h+"subcategory/delete",reorderSubCategory:h+"subcategory/update/sequence",editSubCategory:h+"subcategory/update",keywordList:h+"keyword/get/list",createKeyword:h+"keyword/create",updateKeyword:h+"keyword/update",doitSponsorList:h+"doit/get/company",doitList:h+"doit/list",doitSetRecommend:h+"doit/set/recommend",createDoit:h+"doit/create",createDoitCategoryList:h+"category/exposure/list",detailDoit:h+"doit/detail",updateDoit:h+"doit/update",deleteDoit:h+"doit/delete",openDoit:h+"doit/set/open",stopDoit:h+"doit/set/stop",getDoitUcd:h+"ucd/get/doit",getUcdDoitList:h+"ucd/get/doit/list",getDoitRewardList:h+"ucd/get/reward/doit",missionList:h+"mission/get/list",createMission:h+"mission/create",detailMission:h+"mission/get/detail/info",updateMission:h+"mission/update",deleteMission:h+"mission/delete",joinMemberList:h+"member/get/list",infoJoinMember:h+"member/get/profile",rewardMemberList:h+"ucd/get/reward/list",createReward:h+"ucd/set/reward/profile/condition",countMember:h+"member/get/count",blockMember:h+"member/set/retire/ban",banMember:h+"member/set/retire",applyMemberList:h+"member/get/applylist",approvalMember:h+"member/get/applyConfirm",rejectMember:h+"member/get/applyReject",blockMemberList:h+"member/get/retire/ban/list",cancelBlockMember:h+"member/set/retire/ban/cancel",createBlockMemo:h+"member/set/retire/ban/memo",rankMember:h+"doit/get/member/rank",actionList:h+"action/get/list",detailAction:h+"action/get/detail/info",sendWarning:h+"action/set/yellow",cancelWarning:h+"action/set/yellowCancel",actionCommentList:h+"action/get/commentList",createActionComment:h+"action/set/insertComment",deleteActionComment:h+"action/set/deleteComment",actionReplyList:h+"action/get/comment/child/list",talkList:h+"board/get/list",createTalk:h+"board/create",detailTalk:h+"board/get/detail/info",updateTalk:h+"board/update",deleteTalk:h+"board/delete",talkCommentList:h+"board/get/commentList",createTalkComment:h+"board/set/insertComment",deleteTalkComment:h+"board/set/deleteComment",talkReplyList:h+"board/get/comment/child/list",emojiList:h+"emoticon/get",pickList:h+"recommend/list",previewList:h+"recommend/get/doit",searchDoitList:h+"recommend/get/doit/list",reorderPick:h+"recommend/set",createPick:h+"recommend/create",updatePick:h+"recommend/update",detailPick:h+"recommend/detail",getWeek:h+"doit/rank/get/week",rankList:h+"doit/rank/get/list",createRank:h+"doit/rank/set",targetRankList:h+"doit/rank/popup/get",copyRank:h+"doit/rank/set/copy",bizList:h+"biz/get/list",createBiz:h+"biz/create",detailBiz:h+"biz/get/detail/info",bizDoitList:h+"biz/get/detail/doit",bizUcdList:h+"ucd/list/get/company",updateBiz:h+"biz/update",getBizUcd:h+"ucd/get/company",noticeList:h+"notice/get/list",createNotice:h+"notice/create",detailNotice:h+"notice/get/detail/info",updateNotice:h+"notice/update",deleteNotice:h+"notice/delete",faqType:h+"faq/get/type",faqList:h+"faq/get/list",createFaq:h+"faq/create",detailFaq:h+"faq/get/detail/info",updateFaq:h+"faq/update",deleteFaq:h+"faq/delete",reorderFaq:h+"faq/set/orders",inquiryList:h+"qna/get/list",updateInquiry:h+"qna/set/insertComment",detailInquiry:h+"qna/get/detail/info",deleteInquiry:h+"qna/delete",xlsxOutInquiry:h+"excel/export/qna",reportActionList:h+"report/get/action/list",actionReportReasonList:h+"report/get/action/descriptionList",reportTalkList:h+"report/get/board/list",talkReportReasonList:h+"report/get/board/descriptionList",blindTalk:h+"report/set/blind",bannerList:h+"banner/get/list",createBanner:h+"banner/create",detailBanner:h+"banner/get/detail/info",updateBanner:h+"banner/update",reorderBanner:h+"banner/set/orders",targetEventList:h+"banner/get/event/list",targetDoitList:h+"banner/get/doit/list",targetNoticeList:h+"banner/get/notice/list",storyList:h+"story/get/list",createStory:h+"story/create",detailStory:h+"story/get/detail/info",updateStory:h+"story/update",reorderStory:h+"story/set/orders",eventList:h+"event/get/list",createEvent:h+"event/create",detailEvent:h+"event/get/detail/info",deleteEvent:h+"event/delete",updateEvent:h+"event/update",customEvent:h+"event/popup/get/list",customEventProfile:h+"event/popup/get/profile",createCustomEvent:h+"event/popup/set",pushList:h+"push/list",cancelPush:h+"push/set/cancel",createPush:h+"push/create",pushTargetNotice:h+"push/get/notice",pushTargetEvent:h+"push/get/event",pushTargetDoit:h+"push/get/doit",pushTargetMember:h+"push/get/profile",pushTargetMemberFromXlsx:h+"excel/import/notification/profile",popupList:h+"popup/get/list",createPopup:h+"popup/create",detailPopup:h+"popup/get/detail/info",updatePopup:h+"popup/update",deletePopup:h+"popup/delete",inviteList:h+"invite/list",errorList:h+"error/list",updateError:h+"error/update",createEncryption:h+"operate/set/encryption",createDecryption:h+"operate/set/decryption",versionList:h+"operate/get/version/list",createVersion:h+"operate/version/create",deleteVersion:h+"operate/version/delete",logList:h+"log/get/list",getMemberForSaveUcd:h+"ucd/get/user/list",getMemberFromXlsx:h+"excel/import/profile",getDoitFromXlsx:h+"excel/import/doit",ucdChargeList:h+"ucd/list/get/charge",systemWalletType:h+"ucd/get/system/type",systemWalletList:h+"ucd/list/get/system",doitWalletList:h+"ucd/list/get/doit",memberWalletList:h+"ucd/list/get/user",pendingWalletList:h+"ucd/list/get/transfer",giftList:h+"gift/get/list",reorderGiftList:h+"gift/get/orderList",reorderGift:h+"gift/set/orders",createGift:h+"gift/create",ktGoodsList:h+"gift/get/kt/goods",detailGift:h+"gift/get/detail/info",updateGift:h+"gift/update",applyGiftList:h+"exchange/get/list",sendGifticon:h+"exchange/set/confirm",sendGeneralGift:h+"exchange/set/send",rejectGift:h+"exchange/set/reject",resendGift:h+"exchange/set/resend",getGiftBalance:h+"exchange/get/money",sendGiftList:h+"exchange/get/sendList",sendGiftStatusList:h+"exchange/get/payment",updateGiftSendMemo:h+"exchange/set/insertMemo",adminList:h+"admin/list",detailAdmin:h+"admin/detail",updateAdmin:h+"admin/update",deleteAdmin:h+"admin/delete",authBizList:h+"auth/get/biz/list",approvalAdmin:h+"admin/approval",authList:h+"auth/list",getMenuWithAuth:h+"auth/get/menu",setMenuWithAuth:h+"auth/set/menu",createAuth:h+"auth/create",deleteAuth:h+"auth/delete",promotionList:h+"promotion/get/list",createPromotion:h+"promotion/create",detailPromotion:h+"promotion/get/detail",updatePromotion:h+"promotion/update",closePromotion:h+"promotion/set/end",promotionDoitList:h+"promotion/get/doit/list",promotionProceedList:h+"promotion/get/proceed/list",setDoitPromotion:h+"promotion/set/doit",cancelDoitPromotion:h+"promotion/set/release"},k={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",specialNotice:"중요 공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},v=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function T(e){v.fire({icon:"info",title:e})}function D(e){Swal.fire({icon:"error",html:e})}const L="목록이 없습니다.",w="을(를) 불러올 수 없습니다.";function _(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function S(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function C(e){return S(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}const x="/v2/member/detail",M="/v2/doit/detail/";function A(){o.fadeOut(),r.fadeOut(),$("body").css("overflow-y","auto")}function U(e){const t=e.getFullYear(),a=e.getMonth()+1,n=e.getDate();return`${t}-${_(a)}-${_(n)}`}function W(){return U(new Date)}function I(){const e=new Date;return e.setDate(e.getDate()-6),U(e)}let E,N,B={fileName:"sample.xlsx",sheetName:"Sheet1",jsonData:[]};let R=!1,P=1;function F(){const e={from_date:s.val(),to_date:l.val()};g(!0,y.dashboardSummary,JSON.stringify(e)).then((async function(e,t,a){b(e)?(function(e){const{sign_up_count:t,level2_member_count:a,action_count:n,create_doit_count:i,total_app_down_count:o,total_sign_up_count:r,total_give_ucd:s}=e.data;$("#signupCount").text(C(t)),$("#level2Count").text(C(a)),$("#actionCount").text(C(n)),$("#openDoitCount").text(C(i)),$("#downloadCount").text(C(o)),$("#memberCount").text(C(r)),$("#issuedUcd").text(C(s))}(e),R||(J(e),H(e),function(e){const t=$("#leaderRank"),{leader_rank:a}=e.data;t.empty(),!S(a)&&a.length>0&&(a.map(((e,a)=>{const{ranking:n,nickname:i,profile_uuid:o,rank_diff:r}=e,s=`<li class="clearfix">\n                        ${0===a?'<i class="fas fa-crown rank-first"></i>':""}\n                        <div class="left-wrap">\n                            <span><em class="rank-num ${a<3?"rank-top":""}">${n}</em></span>\n                            <a class="rank-title link leader-nickname" data-uuid="${o}">${i}</a>\n                        </div>\n                        <div class="right-wrap ${0===r?k.dash:r>0?"rank-up":"rank-down"}">\n                            <i class="fas ${0===r?"":r>0?"fa-caret-up":"fa-caret-down"}"></i> ${0===r?k.dash:Math.abs(r)}\n                        </div>\n                    </li>`;t.append(s)})),$(".leader-nickname").on("click",(function(){j(this)})))}(e),function(e){const t=$("#doitRank"),{doit_rank:a}=e.data;t.empty(),!S(a)&&a.length>0&&a.map(((e,a)=>{const{idx:n,ranking:i,doit_title:o,rank_diff:r}=e,s=`<li class="clearfix">\n                        ${0===a?'<i class="fas fa-crown rank-first"></i>':""}\n                        <div class="left-wrap">\n                            <span><em class="rank-num ${a<3?"rank-top":""}">${i}</em></span>\n                            <a href="${M}${n}" class="rank-title link">${o}</a>\n                        </div>\n                        <div class="right-wrap ${0===r?k.dash:r>0?"rank-up":"rank-down"}">\n                            <i class="fas ${0===r?"":r>0?"fa-caret-up":"fa-caret-down"}"></i> ${0===r?k.dash:Math.abs(r)}\n                        </div>\n                    </li>`;t.append(s)}))}(e))):T(f(e))})).catch((e=>D("데이터을(를) 불러올 수 없습니다.")))}function j(e){!function(e){let t=$("<form></form>");t.prop("method","post"),t.prop("action",x),t.append($("<input/>",{type:"hidden",name:"is_store",value:!0})),t.append($("<input/>",{type:"hidden",name:"profile_uuid",value:e})),t.appendTo("body"),t.trigger("submit")}($(e).data("uuid"))}function q(e){o.fadeIn(),r.fadeIn(),$("body").css("overflow-y","hidden"),P=1,$("#modalTitle").text(""),$("#modalRank").empty(),"btnMoreLeader"===e.id?z():G()}function z(){const e={page:P,limit:10};g(!1,y.dashboardMoreLeader,JSON.stringify(e)).then((async function(e,t,a){b(e)?(function(e){if(!S(e.data)&&e.data.length>0){let t="";e.data.map(((e,a)=>{const{ranking:n,nickname:i,profile_uuid:o,rank_diff:r}=e;t+=`<li class="clearfix">\n                        ${0===a&&1===P?'<i class="fas fa-crown rank-first"></i>':""}\n                        <div class="left-wrap">\n                            <span><em class="rank-num ${1===P&&a<3?"rank-top":""}">${n}</em></span>\n                            <a class="rank-title link leader-nickname" data-uuid="${o}">${i}</a>\n                        </div>\n                        <div class="right-wrap ${0===r?k.dash:r>0?"rank-up":"rank-down"}">\n                            <i class="fas ${0===r?"":r>0?"fa-caret-up":"fa-caret-down"}"></i> ${0===r?k.dash:Math.abs(r)}\n                        </div>\n                    </li>`})),$("#modalTitle").text("리더 랭킹"),$("#modalRank").html(t),$(".leader-nickname").on("click",(function(){j(this)}))}}(e),O(e)):T(f(e))})).catch((e=>D("데이터을(를) 불러올 수 없습니다.")))}function G(){const e={page:P,limit:10};g(!1,y.dashboardMoreDoit,JSON.stringify(e)).then((async function(e,t,a){b(e)?(function(e){if(!S(e.data)&&e.data.length>0){let t="";e.data.map(((e,a)=>{const{idx:n,ranking:i,doit_title:o,rank_diff:r}=e;t+=`<li class="clearfix">\n                        ${1===P&&0===a?'<i class="fas fa-crown rank-first"></i>':""}\n                        <div class="left-wrap">\n                            <span><em class="rank-num ${1===P&&a<3?"rank-top":""}">${i}</em></span>\n                            <a href="${M}${n}" class="rank-title link">${o}</a>\n                        </div>\n                        <div class="right-wrap ${0===r?k.dash:r>0?"rank-up":"rank-down"}">\n                            <i class="fas ${0===r?"":r>0?"fa-caret-up":"fa-caret-down"}"></i> ${0===r?k.dash:Math.abs(r)}\n                        </div>\n                    </li>`})),$("#modalTitle").text("두잇 랭킹"),$("#modalRank").html(t)}}(e),O(e)):T(f(e))})).catch((e=>D("데이터을(를) 불러올 수 없습니다.")))}function O(e){const t=e.count,a=Math.ceil(t/10);n.html(function(e,t){let a,n,i,o="";if(o+=1===e?`<a class="paginate_button btn_paginate previous disabled" id="dataTable_previous">${k.previous}</a><span>`:`<a class="paginate_button btn_paginate previous" data-page="${e-1}" id="dataTable_previous">${k.previous}</a><span>`,t<=7)for(a=1;a<=t;a++)n=t>1&&e===a?"current":"",o+=`<a class="paginate_button btn_paginate ${n}" data-page="${a}">${a}</a>`;else if(e<5)for(a=1;a<=7;a++)n=t>1&&e===a?"current":"",i=7===a?t:a,o+=6===a?'<span class="ellipsis">…</span>':`<a class="paginate_button btn_paginate ${n}" data-page="${i}">${i}</a>`;else if(e>=5&&e<=t-4)for(a=1;a<=t;a++)1===a&&(o+=`<a class="paginate_button btn_paginate" data-page="${a}">${a}</a>\n\t\t\t\t\t\t\t<span class="ellipsis">…</span>`),e===a&&(o+=`<a class="paginate_button btn_paginate" data-page="${a-1}">${a-1}</a>\n\t\t\t\t\t\t\t<a class="paginate_button btn_paginate current" data-page="${a}">${a}</a>\n\t\t\t\t\t\t\t<a class="paginate_button btn_paginate" data-page="${a+1}">${a+1}</a>`),t===a&&(o+=`<span class="ellipsis">…</span>\n\t\t\t\t\t\t\t<a class="paginate_button btn_paginate" data-page="${t}">${t}</a>`);else if(e>t-4)for(a=1;a<=7;a++)n=e===t-(7-a)?"current":"",i=a>=3?t-(7-a):a,o+=2===a?'<span class="ellipsis">…</span>':`<a class="paginate_button btn_paginate ${n}" data-page="${i}">${i}</a>`;return o+=t===e||0===Number(t)?`</span><a class="paginate_button btn_paginate next disabled" id="dataTable_next">${k.next}</a>`:`</span><a class="paginate_button btn_paginate next" data-page="${e+1}" id="dataTable_next">${k.next}</a>`,o}(P,a)),$(".btn_paginate").not(".disabled").on("click",(function(){var e;e=this,$(e).siblings().removeClass("current"),$(e).addClass("current"),P=$(e).data("page"),"리더 랭킹"===$("#modalTitle").text()?z():G()}))}function X(e){const t={from_date:s.val(),to_date:l.val()};g(!0,y.dashboardSummary,JSON.stringify(t)).then((async function(t,a,n){if(b(t))switch(e.id){case"btnRefreshMission":E.destroy(),H(t);break;case"btnRefreshCategory":N.destroy(),J(t)}else T(f(t))})).catch((e=>D("데이터을(를) 불러올 수 없습니다.")))}function J(e){const t=$("#categorySummary"),{category_rate:a}=e.data,n=["#BED661","#89E894","#78D5E3","#7AF5F5","#34DDDD","#FE8402","#41924B","#FFCC00"];let i=[],o=[];t.empty(),!S(a)&&a.length>0&&a.map(((e,a)=>{const{category_title:r,count:s,rate:l}=e,d=`<li>\n                        <div class="left-wrap">\n                            <i class="color-box" style="background-color: ${n[a]}"></i>\n                            <span>${r}</span>\n                        </div>\n                        <div class="right-wrap">\n                            <strong class="data-num-s">${C(l)}%</strong> (${C(s)})\n                        </div>\n                    </li>`;t.append(d),i.push(r),o.push(s)}));const r=document.getElementById("categoryChart");N=new Chart(r,{type:"pie",data:{datasets:[{labels:i,data:o,borderWidth:1,backgroundColor:n}]},options:{responsive:!1,legend:{display:!1},plugins:{tooltip:{callbacks:{label:e=>e.dataset.labels[e.dataIndex]}}}}})}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:L,zeroRecords:L,processing:"검색 중..",paginate:{previous:k.previous,next:k.next}}}),a.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:k.monthNames,dayNames:k.dayNames,dayNamesMin:k.dayNames}),s.val(I()),l.val(W()),d.val(I()),c.val(W()),a.datepicker("option","minDate","2020-07-01"),a.datepicker("option","maxDate","today"),F(),$("#summaryTable").DataTable({ajax:{url:y.dashboardSummaryList,type:"POST",headers:u,global:!1,dataFilter:function(e){let t=JSON.parse(e);return b(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],T(f(t))),JSON.stringify(t)},data:function(e){const t={from_date:d.val(),to_date:c.val(),page:e.start/e.length+1,limit:e.length};return JSON.stringify(t)},error:function(e,t){D(k.list+w)}},columns:[{title:"일자",data:"basedate",width:"10%"},{title:"앱 설치",data:"app_down_count",width:"9%",render:function(e){return C(e)}},{title:"회원 가입",data:"sign_up_count",width:"9%",render:function(e){return C(e)}},{title:"두잇 가입",data:"doit_sign_up_count",width:"9%",render:function(e){return C(e)}},{title:"인증",data:"action_count",width:"9%",render:function(e){return C(e)}},{title:"인증 댓글",data:"action_comment_count",width:"9%",render:function(e){return C(e)}},{title:"커뮤니티",data:"board_count",width:"9%",render:function(e){return C(e)}},{title:"커뮤니티 댓글",data:"board_comment_count",width:"9%",render:function(e){return C(e)}},{title:"연속인증 21+",data:"ongoing_user_count",width:"9%",render:function(e){return C(e)}},{title:"연속인증 66+",data:"ongoing_user_count_66",width:"9%",render:function(e){return C(e)}},{title:"연속인증 100+",data:"ongoing_user_count_100",width:"9%",render:function(e){return C(e)}}],serverSide:!0,paging:!0,pageLength:30,select:!1,destroy:!0,initComplete:function(){},fnRowCallback:function(e,t){},drawCallback:function(e){$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),i.on("click",(function(){A()})),r.on("click",(function(){A()})),s.on("change",(function(){R=!0,F()})),l.on("change",(function(){s.datepicker("option","maxDate",new Date(l.datepicker("getDate"))),R=!0,F()})),d.on("change",(function(){Q()})),c.on("change",(function(){d.datepicker("option","maxDate",new Date(c.datepicker("getDate"))),Q()})),m.on("click",(function(){X(this)})),p.on("click",(function(){X(this)})),$("#btnMoreLeader").on("click",(function(){q(this)})),$("#btnMoreDoit").on("click",(function(){q(this)})),t.on("click",(function(){g(!0,"리더 랭킹"===$("#modalTitle").text()?y.dashboardMoreLeader:y.dashboardMoreDoit,JSON.stringify({page:1,limit:20})).then((async function(e,t,a){b(e)?function(e){const t=$("#modalTitle").text(),a=`${t}_${function(e,t){let a=e.getFullYear().toString(),n=(e.getMonth()+1).toString(),i=e.getDate().toString(),o="";try{o=a+""+(n[1]?n:"0"+n[0])+(i[1]?i:"0"+i[0])}catch(e){}return o}(new Date)}`,n=e.data.map((e=>{switch(t){case"리더 랭킹":return{랭킹:e.ranking,"프로필 아이디":e.profile_uuid,닉네임:e.nickname,"연속인증 수":e.ongoing_action_count,"게시글 수":e.board_count,"게시글 댓글 수":e.board_comment_count,"인증 댓글 수":e.action_comment_count,총점:e.score};case"두잇 랭킹":return{랭킹:e.ranking,두잇명:e.doit_title,"두잇 아이디":e.doit_uuid,"누적 인증 수":e.total_action_count,"게시글 수":e.board_count,"게시글 댓글 수":e.board_comment_count,"인증 댓글 수":e.action_comment_count,"두잇 그릿지수":e.grit}}}));var i,o,r;o=t,r=n,S(i=a)||(B.fileName=`${i}.xlsx`),S(o)||(B.sheetName=o),S(r)||(B.jsonData=r),function(){try{let e=XLSX.utils.book_new(),t=XLSX.utils.json_to_sheet(B.jsonData);XLSX.utils.book_append_sheet(e,t,B.sheetName),XLSX.writeFile(e,B.fileName)}catch(e){console.log(e)}}()}(e):T(f(e))})).catch((e=>D("데이터을(를) 불러올 수 없습니다.")))}))}));let K=0;function H(e){const t=$("#missionSummary"),{create_mission_rate:a}=e.data;if(t.empty(),!S(a)){const{count:e,register_mission_rate:n,unregistered_mission_rate:i}=a,o=[n,i],r=["#BED661","#89E894"],s=["등록","미등록"];K=e>1e5?`${C(Math.round(e/1e3))}k`:C(e).toString(),o.map(((e,a)=>{const n=`<li>\n                        <div class="left-wrap">\n                            <i class="color-box" style="background-color: ${r[a]}"></i>\n                            <span>${s[a]}</span>\n                        </div>\n                        <div class="right-wrap">\n                            <strong class="data-num-s">${e}%</strong>\n                        </div>\n                    </li>`;t.append(n)}));const l=document.getElementById("missionChart");E=new Chart(l,{type:"doughnut",data:{datasets:[{labels:["등록","미등록"],data:[n,i],borderWidth:1,backgroundColor:r}]},options:{responsive:!1,legend:{display:!1},plugins:{tooltip:{callbacks:{label:e=>e.dataset.labels[e.dataIndex]}}}},plugins:[Y]})}}const Y={id:"centerText",afterDraw(e,t,a){const{ctx:n}=e;n.restore(),n.font="36px Roboto, Helvetica, Arial, sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillText(K,150,160),n.save()}};function Q(){$("#summaryTable").DataTable().ajax.reload()}})();