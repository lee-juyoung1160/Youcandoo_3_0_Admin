(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),n=$(".datepicker"),o=$(".date-from"),r=$(".date-to"),s=($("#selDateType"),$("#selSearchType")),l=($("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]")),d=$("#keyword"),c=$("#btnSearch"),m=$("#btnReset"),p=($("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap")),u=$("#selPageLength"),g=($("#selSort"),$("#dataTable")),b=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$("#selStartHour"),$("#selStartMinute"),$("#selEndHour"),$("#selEndMinute"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#currentPassword"),$("#changePassword"),$("#changePasswordCheck"),$("#passwordExpired"),$("#passwordChangeId"),$("#btnChangeLater"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#selUpdateStartHour"),$("#selUpdateStartMinute"),$("#selUpdateEndHour"),$("#selUpdateEndMinute"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("#searchMemberFrom"),$("#searchMemberTo"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#modalMemo"),$("#searchTab li"),$("#ongoingRankTable"),$("#totalRankTable"),$("#btnRefreshTotalRank"),$("#btnRefreshOngoingRank"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#btnReward"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#modalReward"),$("#rewardTable"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selSearchTypeInAction"),$("#keywordInAction"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("input[name=radio-comment-attach-type]"),$("#commentAttachmentWrap"),$("#btnCommentEmoji"),$("#commentEmojiWrap"),$("#commentEmojiCategory"),$("#previewEmoji"),$("#btnCancelCommentEmoji"),$("input[name=radio-action-attach-type]"),$("#actionAttachmentWrap"),$("#btnActionEmoji"),$("#actionEmojiWrap"),$("#actionEmojiCategory"),$("#previewActionEmoji"),$("#btnCancelActionEmoji"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("input[name=chk-special-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("input[name=chk-notice-type]"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("input[name=chk-update-special-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#baseDateWrap"),$("#btnSearchNickname"),$("#btnSearchTarget"),$("#modalSearchMember"),$("#targetTable"),$("#searchTable"),$("#addedTable"),$("#selWeekly"),$("#dateRange"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#selVocType"),$("#selVocTypeDetail"),$("#selRiskGrade"),$("#vocType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#isDel"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#customEvent"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#leaveDate"),$("#loginDate"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))});function h(e){return 0===function(e){return e.status}(e)}function y(e){return e.msg}const f=`${api_server_url}/v3/`,k={saveUserUcdFromXlsx:f+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:f+"ucd/set/charge/user/system",saveUserUcdByBiz:f+"ucd/set/charge/user/company",saveDoitUcdFromXlsx:f+"ucd/set/charge/doit/system/excel",saveDoitUcdBySystem:f+"ucd/set/charge/doit/system",saveDoitUcdByBiz:f+"ucd/set/charge/doit/company",saveBizUcd:f+"ucd/set/charge/company/system",dashboardSummary:f+"main/dashboard",dashboardSummaryList:f+"main/dashboard/get/list",dashboardMoreLeader:f+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:f+"main/dashboard/get/doitRanklist",getProfile:f+"admin/get",updatePassword:f+"admin/update/pwd",updatePasswordLater:f+"admin/update/setPasswordUpdated",memberList:f+"profile/get/list",detailMember:f+"profile/get/detail/info",levelUp:f+"profile/set/levelUp",levelDown:f+"profile/set/levelDown",cancelPartner:f+"profile/set/releasePartner",levelInfo:f+"profile/get/level",levelHistory:f+"profile/get/level/history",deviceInfo:f+"profile/get/device/info",memberDoitList:f+"profile/get/doit",memberCategoryList:f+"profile/get/category",memberActionList:f+"profile/get/action",memberActionDetail:f+"profile/get/detail/action",countPerLevel:f+"level/get/count",memberLevelList:f+"level/get/list",unlinkMemberList:f+"profile/get/unlink",changedMemberList:f+"profile/get/changed",badgeList:f+"badge/get/list",createBadge:f+"badge/create",detailBadge:f+"badge/get/detail/info",deleteBadge:f+"badge/delete",updateBadge:f+"badge/update",categoryList:f+"category/list",createCategory:f+"category/create",detailCategory:f+"category/detail",reorderCategory:f+"category/update/sequence",deleteCategory:f+"category/delete",updateCategory:f+"category/update",subCategoryList:f+"subcategory/list",createSubCategory:f+"subcategory/create",updateSubCategoryDoitImg:f+"subcategory/set/doit/image",deleteSubCategory:f+"subcategory/delete",reorderSubCategory:f+"subcategory/update/sequence",editSubCategory:f+"subcategory/update",keywordList:f+"keyword/get/list",createKeyword:f+"keyword/create",updateKeyword:f+"keyword/update",doitSponsorList:f+"doit/get/company",doitList:f+"doit/list",doitSetRecommend:f+"doit/set/recommend",createDoit:f+"doit/create",createDoitCategoryList:f+"category/exposure/list",detailDoit:f+"doit/detail",updateDoit:f+"doit/update",deleteDoit:f+"doit/delete",openDoit:f+"doit/set/open",stopDoit:f+"doit/set/stop",getDoitUcd:f+"ucd/get/doit",getUcdDoitList:f+"ucd/get/doit/list",getDoitRewardList:f+"ucd/get/reward/doit",missionList:f+"mission/get/list",createMission:f+"mission/create",detailMission:f+"mission/get/detail/info",updateMission:f+"mission/update",deleteMission:f+"mission/delete",joinMemberList:f+"member/get/list",infoJoinMember:f+"member/get/profile",rewardMemberList:f+"ucd/get/reward/list",createReward:f+"ucd/set/reward/profile/condition",countMember:f+"member/get/count",blockMember:f+"member/set/retire/ban",banMember:f+"member/set/retire",applyMemberList:f+"member/get/applylist",approvalMember:f+"member/get/applyConfirm",rejectMember:f+"member/get/applyReject",blockMemberList:f+"member/get/retire/ban/list",cancelBlockMember:f+"member/set/retire/ban/cancel",createBlockMemo:f+"member/set/retire/ban/memo",rankMember:f+"doit/get/member/rank",actionList:f+"action/get/list",detailAction:f+"action/get/detail/info",sendWarning:f+"action/set/yellow",cancelWarning:f+"action/set/yellowCancel",actionCommentList:f+"action/get/commentList",createActionComment:f+"action/set/insertComment",deleteActionComment:f+"action/set/deleteComment",actionReplyList:f+"action/get/comment/child/list",talkList:f+"board/get/list",createTalk:f+"board/create",detailTalk:f+"board/get/detail/info",updateTalk:f+"board/update",deleteTalk:f+"board/delete",talkCommentList:f+"board/get/commentList",createTalkComment:f+"board/set/insertComment",deleteTalkComment:f+"board/set/deleteComment",talkReplyList:f+"board/get/comment/child/list",emojiList:f+"emoticon/get",pickList:f+"recommend/list",previewList:f+"recommend/get/doit",searchDoitList:f+"recommend/get/doit/list",reorderPick:f+"recommend/set",createPick:f+"recommend/create",updatePick:f+"recommend/update",detailPick:f+"recommend/detail",getWeek:f+"doit/rank/get/week",rankList:f+"doit/rank/get/list",createRank:f+"doit/rank/set",targetRankList:f+"doit/rank/popup/get",copyRank:f+"doit/rank/set/copy",bizList:f+"biz/get/list",createBiz:f+"biz/create",detailBiz:f+"biz/get/detail/info",bizDoitList:f+"biz/get/detail/doit",bizUcdList:f+"ucd/list/get/company",updateBiz:f+"biz/update",getBizUcd:f+"ucd/get/company",noticeList:f+"notice/get/list",createNotice:f+"notice/create",detailNotice:f+"notice/get/detail/info",updateNotice:f+"notice/update",deleteNotice:f+"notice/delete",faqType:f+"faq/get/type",faqList:f+"faq/get/list",createFaq:f+"faq/create",detailFaq:f+"faq/get/detail/info",updateFaq:f+"faq/update",deleteFaq:f+"faq/delete",reorderFaq:f+"faq/set/orders",inquiryList:f+"qna/get/list",updateInquiry:f+"qna/set/insertComment",detailInquiry:f+"qna/get/detail/info",deleteInquiry:f+"qna/delete",xlsxOutInquiry:f+"excel/export/qna",reportActionList:f+"report/get/action/list",actionReportReasonList:f+"report/get/action/descriptionList",reportTalkList:f+"report/get/board/list",talkReportReasonList:f+"report/get/board/descriptionList",blindTalk:f+"report/set/blind",bannerList:f+"banner/get/list",createBanner:f+"banner/create",detailBanner:f+"banner/get/detail/info",updateBanner:f+"banner/update",reorderBanner:f+"banner/set/orders",targetEventList:f+"banner/get/event/list",targetDoitList:f+"banner/get/doit/list",targetNoticeList:f+"banner/get/notice/list",storyList:f+"story/get/list",createStory:f+"story/create",detailStory:f+"story/get/detail/info",updateStory:f+"story/update",reorderStory:f+"story/set/orders",eventList:f+"event/get/list",createEvent:f+"event/create",detailEvent:f+"event/get/detail/info",deleteEvent:f+"event/delete",updateEvent:f+"event/update",customEvent:f+"event/popup/get/list",customEventProfile:f+"event/popup/get/profile",createCustomEvent:f+"event/popup/set",pushList:f+"push/list",cancelPush:f+"push/set/cancel",createPush:f+"push/create",pushTargetNotice:f+"push/get/notice",pushTargetEvent:f+"push/get/event",pushTargetDoit:f+"push/get/doit",pushTargetMember:f+"push/get/profile",pushTargetMemberFromXlsx:f+"excel/import/notification/profile",popupList:f+"popup/get/list",createPopup:f+"popup/create",detailPopup:f+"popup/get/detail/info",updatePopup:f+"popup/update",deletePopup:f+"popup/delete",inviteList:f+"invite/list",errorList:f+"error/list",updateError:f+"error/update",createEncryption:f+"operate/set/encryption",createDecryption:f+"operate/set/decryption",versionList:f+"operate/get/version/list",createVersion:f+"operate/version/create",deleteVersion:f+"operate/version/delete",logList:f+"log/get/list",getMemberForSaveUcd:f+"ucd/get/user/list",getMemberFromXlsx:f+"excel/import/profile",getDoitFromXlsx:f+"excel/import/doit",ucdChargeList:f+"ucd/list/get/charge",systemWalletType:f+"ucd/get/system/type",systemWalletList:f+"ucd/list/get/system",doitWalletList:f+"ucd/list/get/doit",memberWalletList:f+"ucd/list/get/user",pendingWalletList:f+"ucd/list/get/transfer",giftList:f+"gift/get/list",reorderGiftList:f+"gift/get/orderList",reorderGift:f+"gift/set/orders",createGift:f+"gift/create",ktGoodsList:f+"gift/get/kt/goods",detailGift:f+"gift/get/detail/info",updateGift:f+"gift/update",applyGiftList:f+"exchange/get/list",sendGifticon:f+"exchange/set/confirm",sendGeneralGift:f+"exchange/set/send",rejectGift:f+"exchange/set/reject",resendGift:f+"exchange/set/resend",getGiftBalance:f+"exchange/get/money",sendGiftList:f+"exchange/get/sendList",sendGiftStatusList:f+"exchange/get/payment",updateGiftSendMemo:f+"exchange/set/insertMemo",adminList:f+"admin/list",detailAdmin:f+"admin/detail",updateAdmin:f+"admin/update",deleteAdmin:f+"admin/delete",authBizList:f+"auth/get/biz/list",approvalAdmin:f+"admin/approval",authList:f+"auth/list",getMenuWithAuth:f+"auth/get/menu",setMenuWithAuth:f+"auth/set/menu",createAuth:f+"auth/create",deleteAuth:f+"auth/delete",promotionList:f+"promotion/get/list",createPromotion:f+"promotion/create",detailPromotion:f+"promotion/get/detail",updatePromotion:f+"promotion/update",closePromotion:f+"promotion/set/end",promotionDoitList:f+"promotion/get/doit/list",promotionProceedList:f+"promotion/get/proceed/list",setDoitPromotion:f+"promotion/set/doit",cancelDoitPromotion:f+"promotion/set/release"},v={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",specialNotice:"중요 공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},T=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function L(e){T.fire({icon:"info",title:e})}function D(e){Swal.fire({icon:"error",html:e})}const C="목록이 없습니다.",S="을(를) 불러올 수 없습니다.";function w(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function M(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function A(e){return M(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function U(e){const t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return`${t}-${w(a)}-${w(i)}`}function x(){return U(new Date)}function W(){o.val(function(){const e=new Date;return e.setDate(e.getDate()-6),U(e)}()),r.val(x())}function P(){i.removeClass("active")}function I(){P(),n.datepicker("option","minDate","2020-07-01"),n.datepicker("option","maxDate","today"),W(),t.each((function(){$(this).children().eq(0).prop("selected",!0)})),d.val(""),$("input[name=chk-type]").each((function(e,t){$(t).prop("checked",!0)})),l.eq(0).prop("checked",!0)}function E(){let e=g.DataTable();e.page.len(Number(u.val())),e.ajax.reload()}$((()=>{var t;$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:C,zeroRecords:C,processing:"검색 중..",paginate:{previous:v.previous,next:v.next}}}),n.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:v.monthNames,dayNames:v.dayNames,dayNamesMin:v.dayNames}),u.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),(!1,t=k.systemWalletType,null,new Promise(((e,a)=>{$.ajax({global:false,url:t,type:"POST",headers:b,contentType:"text/plain",dataType:"json",data:null,success:function(t){e(t)},error:function(e,t,i){a(i)},complete:function(e,t){}})}))).then((async function(e,t,a){h(e)?(await function(e){!M(e.data)&&e.data.length>0&&(e.data.map(((e,t)=>{const a=`<input id="chk${t}" type="checkbox" name="chk-type" value="${e.system}"><label for="chk${t}"><span></span>${e.description}</label>`;p.append(a)})),$("input[name=chk-type]").on("click",(function(){0===$("input[name='"+this.name+"']:checked").length&&(L("최소 하나 이상의 값을 선택해야 합니다."),$(this).prop("checked",!0))})))}(e),await I(),await void g.DataTable({ajax:{url:k.systemWalletList,type:"POST",headers:b,dataFilter:function(e){let t=JSON.parse(e);return h(t)?(t.recordsTotal=t.data.count,t.recordsFiltered=t.data.count,t.data=t.data.list):(t.data=[],L(y(t))),JSON.stringify(t)},data:function(e){let t=[];$("input[name=chk-type]").each((function(){$(this).is(":checked")&&t.push($(this).val())}));const a=$("input[name=radio-status]:checked").val(),i={from_date:o.val(),to_date:r.val(),search_type:s.val(),keyword:d.val().trim(),send_type:t,is_receive:"all"===a?"":"complete"===a?"Y":"N",is_expire:"all"===a?"":"expired"===a?"Y":"N",page:e.start/e.length+1,limit:e.length};return JSON.stringify(i)},error:function(e,t){D(v.list+S)}},columns:[{title:"To",data:"receive_name",width:"30%",render:function(e,t,a,i){switch(a.receive_type){case"doit":return`[${v.doit}] ${e}`;case"profile":return`[${v.profile}] ${e}`;case"charge":return v.charge;case"level":return v.levelup;case"signup":return v.join;default:return`[${a.receive_type}] ${e}`}}},{title:"구분",data:"transfer_type",width:"10%"},{title:"상세 내용",data:"message",width:"30%"},{title:"UCD",data:"value",width:"10%",render:function(e,t,a,i){return A(e)}},{title:"지급 일시",data:"sent",width:"15%"},{title:"상태",data:"status",width:"5%"}],serverSide:!0,paging:!0,pageLength:Number(u.val()),select:!1,destroy:!0,initComplete:function(){},fnRowCallback:function(e,t){},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=A(function(e){return e.DataTable().page.info().recordsTotal}(e));$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}})):L(y(e))})).catch((e=>D("구분을(를) 불러올 수 없습니다."))),e.on("keydown",(function(e){!function(e){13===e.keyCode&&E()}(e)})),o.on("change",(function(){r.datepicker("option","minDate",new Date(o.datepicker("getDate"))),P()})),r.on("change",(function(){o.datepicker("option","maxDate",new Date(r.datepicker("getDate"))),P()})),u.on("change",(function(){E()})),c.on("click",(function(){E()})),m.on("click",(function(){I()})),i.on("click",(function(){var e;e=this,P(),$(e).addClass("active"),$(e).hasClass("today")?n.val(x()):$(e).hasClass("week")?W():$(e).hasClass("month")?(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-1),U(e)}()),r.val(x())):$(e).hasClass("months")?(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-3),U(e)}()),r.val(x())):(o.val("2021-07-01"),r.val(x()))}))}))})();