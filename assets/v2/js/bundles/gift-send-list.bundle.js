(()=>{"use strict";const t=$("body"),e=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),n=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),i=$(".datepicker"),o=$(".date-from"),r=$(".date-to"),s=$("#selDateType"),d=$("#selSearchType"),l=($("input[name=chk-type]"),$("input[name=chk-status]")),c=$("input[name=radio-type]"),m=($("input[name=radio-status]"),$("#keyword")),p=$("#btnSearch"),u=$("#btnReset"),g=$("#btnSubmit"),b=$("#btnCancel"),h=($("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),f=($("#selSort"),$("#dataTable")),y=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo")),k=($("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$("#selStartHour"),$("#selStartMinute"),$("#selEndHour"),$("#selEndMinute"),$(".modal-btn"),$(".modal-close")),v=$(".modal-content"),T=$(".modal-bg"),w=$("#modalDetail"),D=($("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#currentPassword"),$("#changePassword"),$("#changePasswordCheck"),$("#passwordExpired"),$("#passwordChangeId"),$("#btnChangeLater"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#selUpdateStartHour"),$("#selUpdateStartMinute"),$("#selUpdateEndHour"),$("#selUpdateEndMinute"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("#searchMemberFrom"),$("#searchMemberTo"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#modalMemo"),$("#searchTab li"),$("#ongoingRankTable"),$("#totalRankTable"),$("#btnRefreshTotalRank"),$("#btnRefreshOngoingRank"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#btnReward"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#modalReward"),$("#rewardTable"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selSearchTypeInAction"),$("#keywordInAction"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("input[name=radio-comment-attach-type]"),$("#commentAttachmentWrap"),$("#btnCommentEmoji"),$("#commentEmojiWrap"),$("#commentEmojiCategory"),$("#previewEmoji"),$("#btnCancelCommentEmoji"),$("input[name=radio-action-attach-type]"),$("#actionAttachmentWrap"),$("#btnActionEmoji"),$("#actionEmojiWrap"),$("#actionEmojiCategory"),$("#previewActionEmoji"),$("#btnCancelActionEmoji"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("input[name=chk-special-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("input[name=chk-notice-type]"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("input[name=chk-update-special-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#baseDateWrap"),$("#btnSearchNickname"),$("#btnSearchTarget"),$("#modalSearchMember"),$("#targetTable"),$("#searchTable"),$("#addedTable"),$("#selWeekly"),$("#dateRange"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#selVocType"),$("#selVocTypeDetail"),$("#selRiskGrade"),$("#vocType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#isDel"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#customEvent"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo")),L=($("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent")),C=$("#modalCancel"),S=($("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#leaveDate"),$("#loginDate"),$("#balance")),M=($("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))});function x(t,e,a){return new Promise(((n,i)=>{$.ajax({global:t,url:e,type:"POST",headers:M,contentType:"text/plain",dataType:"json",data:a,success:function(t){n(t)},error:function(t,e,a){i(a)},complete:function(t,e){}})}))}function U(t){let e=t.msg,a=t.status;return[30034,30035,30308].indexOf(a)>-1&&(e=`선택한 이미지 사이즈는 ${t.data.width} x ${t.data.height} 입니다.\n                 ${t.msg}`),e}function A(t){return 0===function(t){return t.status}(t)}const W=`${api_server_url}/v3/`,I={saveUserUcdFromXlsx:W+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:W+"ucd/set/charge/user/system",saveUserUcdByBiz:W+"ucd/set/charge/user/company",saveDoitUcdFromXlsx:W+"ucd/set/charge/doit/system/excel",saveDoitUcdBySystem:W+"ucd/set/charge/doit/system",saveDoitUcdByBiz:W+"ucd/set/charge/doit/company",saveBizUcd:W+"ucd/set/charge/company/system",dashboardSummary:W+"main/dashboard",dashboardSummaryList:W+"main/dashboard/get/list",dashboardMoreLeader:W+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:W+"main/dashboard/get/doitRanklist",getProfile:W+"admin/get",updatePassword:W+"admin/update/pwd",updatePasswordLater:W+"admin/update/setPasswordUpdated",memberList:W+"profile/get/list",detailMember:W+"profile/get/detail/info",levelUp:W+"profile/set/levelUp",levelDown:W+"profile/set/levelDown",cancelPartner:W+"profile/set/releasePartner",levelInfo:W+"profile/get/level",levelHistory:W+"profile/get/level/history",deviceInfo:W+"profile/get/device/info",memberDoitList:W+"profile/get/doit",memberCategoryList:W+"profile/get/category",memberActionList:W+"profile/get/action",memberActionDetail:W+"profile/get/detail/action",countPerLevel:W+"level/get/count",memberLevelList:W+"level/get/list",unlinkMemberList:W+"profile/get/unlink",changedMemberList:W+"profile/get/changed",badgeList:W+"badge/get/list",createBadge:W+"badge/create",detailBadge:W+"badge/get/detail/info",deleteBadge:W+"badge/delete",updateBadge:W+"badge/update",categoryList:W+"category/list",createCategory:W+"category/create",detailCategory:W+"category/detail",reorderCategory:W+"category/update/sequence",deleteCategory:W+"category/delete",updateCategory:W+"category/update",subCategoryList:W+"subcategory/list",createSubCategory:W+"subcategory/create",updateSubCategoryDoitImg:W+"subcategory/set/doit/image",deleteSubCategory:W+"subcategory/delete",reorderSubCategory:W+"subcategory/update/sequence",editSubCategory:W+"subcategory/update",keywordList:W+"keyword/get/list",createKeyword:W+"keyword/create",updateKeyword:W+"keyword/update",doitSponsorList:W+"doit/get/company",doitList:W+"doit/list",doitSetRecommend:W+"doit/set/recommend",createDoit:W+"doit/create",createDoitCategoryList:W+"category/exposure/list",detailDoit:W+"doit/detail",updateDoit:W+"doit/update",deleteDoit:W+"doit/delete",openDoit:W+"doit/set/open",stopDoit:W+"doit/set/stop",getDoitUcd:W+"ucd/get/doit",getUcdDoitList:W+"ucd/get/doit/list",getDoitRewardList:W+"ucd/get/reward/doit",missionList:W+"mission/get/list",createMission:W+"mission/create",detailMission:W+"mission/get/detail/info",updateMission:W+"mission/update",deleteMission:W+"mission/delete",joinMemberList:W+"member/get/list",infoJoinMember:W+"member/get/profile",rewardMemberList:W+"ucd/get/reward/list",createReward:W+"ucd/set/reward/profile/condition",countMember:W+"member/get/count",blockMember:W+"member/set/retire/ban",banMember:W+"member/set/retire",applyMemberList:W+"member/get/applylist",approvalMember:W+"member/get/applyConfirm",rejectMember:W+"member/get/applyReject",blockMemberList:W+"member/get/retire/ban/list",cancelBlockMember:W+"member/set/retire/ban/cancel",createBlockMemo:W+"member/set/retire/ban/memo",rankMember:W+"doit/get/member/rank",actionList:W+"action/get/list",detailAction:W+"action/get/detail/info",sendWarning:W+"action/set/yellow",cancelWarning:W+"action/set/yellowCancel",actionCommentList:W+"action/get/commentList",createActionComment:W+"action/set/insertComment",deleteActionComment:W+"action/set/deleteComment",actionReplyList:W+"action/get/comment/child/list",talkList:W+"board/get/list",createTalk:W+"board/create",detailTalk:W+"board/get/detail/info",updateTalk:W+"board/update",deleteTalk:W+"board/delete",talkCommentList:W+"board/get/commentList",createTalkComment:W+"board/set/insertComment",deleteTalkComment:W+"board/set/deleteComment",talkReplyList:W+"board/get/comment/child/list",emojiList:W+"emoticon/get",pickList:W+"recommend/list",previewList:W+"recommend/get/doit",searchDoitList:W+"recommend/get/doit/list",reorderPick:W+"recommend/set",createPick:W+"recommend/create",updatePick:W+"recommend/update",detailPick:W+"recommend/detail",getWeek:W+"doit/rank/get/week",rankList:W+"doit/rank/get/list",createRank:W+"doit/rank/set",targetRankList:W+"doit/rank/popup/get",copyRank:W+"doit/rank/set/copy",bizList:W+"biz/get/list",createBiz:W+"biz/create",detailBiz:W+"biz/get/detail/info",bizDoitList:W+"biz/get/detail/doit",bizUcdList:W+"ucd/list/get/company",updateBiz:W+"biz/update",getBizUcd:W+"ucd/get/company",noticeList:W+"notice/get/list",createNotice:W+"notice/create",detailNotice:W+"notice/get/detail/info",updateNotice:W+"notice/update",deleteNotice:W+"notice/delete",faqType:W+"faq/get/type",faqList:W+"faq/get/list",createFaq:W+"faq/create",detailFaq:W+"faq/get/detail/info",updateFaq:W+"faq/update",deleteFaq:W+"faq/delete",reorderFaq:W+"faq/set/orders",inquiryList:W+"qna/get/list",updateInquiry:W+"qna/set/insertComment",detailInquiry:W+"qna/get/detail/info",deleteInquiry:W+"qna/delete",xlsxOutInquiry:W+"excel/export/qna",reportActionList:W+"report/get/action/list",actionReportReasonList:W+"report/get/action/descriptionList",reportTalkList:W+"report/get/board/list",talkReportReasonList:W+"report/get/board/descriptionList",blindTalk:W+"report/set/blind",bannerList:W+"banner/get/list",createBanner:W+"banner/create",detailBanner:W+"banner/get/detail/info",updateBanner:W+"banner/update",reorderBanner:W+"banner/set/orders",targetEventList:W+"banner/get/event/list",targetDoitList:W+"banner/get/doit/list",targetNoticeList:W+"banner/get/notice/list",storyList:W+"story/get/list",createStory:W+"story/create",detailStory:W+"story/get/detail/info",updateStory:W+"story/update",reorderStory:W+"story/set/orders",eventList:W+"event/get/list",createEvent:W+"event/create",detailEvent:W+"event/get/detail/info",deleteEvent:W+"event/delete",updateEvent:W+"event/update",customEvent:W+"event/popup/get/list",customEventProfile:W+"event/popup/get/profile",createCustomEvent:W+"event/popup/set",pushList:W+"push/list",cancelPush:W+"push/set/cancel",createPush:W+"push/create",pushTargetNotice:W+"push/get/notice",pushTargetEvent:W+"push/get/event",pushTargetDoit:W+"push/get/doit",pushTargetMember:W+"push/get/profile",pushTargetMemberFromXlsx:W+"excel/import/notification/profile",popupList:W+"popup/get/list",createPopup:W+"popup/create",detailPopup:W+"popup/get/detail/info",updatePopup:W+"popup/update",deletePopup:W+"popup/delete",inviteList:W+"invite/list",errorList:W+"error/list",updateError:W+"error/update",createEncryption:W+"operate/set/encryption",createDecryption:W+"operate/set/decryption",versionList:W+"operate/get/version/list",createVersion:W+"operate/version/create",deleteVersion:W+"operate/version/delete",logList:W+"log/get/list",getMemberForSaveUcd:W+"ucd/get/user/list",getMemberFromXlsx:W+"excel/import/profile",getDoitFromXlsx:W+"excel/import/doit",ucdChargeList:W+"ucd/list/get/charge",systemWalletType:W+"ucd/get/system/type",systemWalletList:W+"ucd/list/get/system",doitWalletList:W+"ucd/list/get/doit",memberWalletList:W+"ucd/list/get/user",pendingWalletList:W+"ucd/list/get/transfer",giftList:W+"gift/get/list",reorderGiftList:W+"gift/get/orderList",reorderGift:W+"gift/set/orders",createGift:W+"gift/create",ktGoodsList:W+"gift/get/kt/goods",detailGift:W+"gift/get/detail/info",updateGift:W+"gift/update",applyGiftList:W+"exchange/get/list",sendGifticon:W+"exchange/set/confirm",sendGeneralGift:W+"exchange/set/send",rejectGift:W+"exchange/set/reject",resendGift:W+"exchange/set/resend",getGiftBalance:W+"exchange/get/money",sendGiftList:W+"exchange/get/sendList",sendGiftStatusList:W+"exchange/get/payment",updateGiftSendMemo:W+"exchange/set/insertMemo",adminList:W+"admin/list",detailAdmin:W+"admin/detail",updateAdmin:W+"admin/update",deleteAdmin:W+"admin/delete",authBizList:W+"auth/get/biz/list",approvalAdmin:W+"admin/approval",authList:W+"auth/list",getMenuWithAuth:W+"auth/get/menu",setMenuWithAuth:W+"auth/set/menu",createAuth:W+"auth/create",deleteAuth:W+"auth/delete",promotionList:W+"promotion/get/list",createPromotion:W+"promotion/create",detailPromotion:W+"promotion/get/detail",updatePromotion:W+"promotion/update",closePromotion:W+"promotion/set/end",promotionDoitList:W+"promotion/get/doit/list",promotionProceedList:W+"promotion/get/proceed/list",setDoitPromotion:W+"promotion/set/doit",cancelDoitPromotion:W+"promotion/set/release"},P={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",specialNotice:"중요 공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},B=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:t=>{t.addEventListener("mouseenter",Swal.stopTimer),t.addEventListener("mouseleave",Swal.resumeTimer)}});function N(t){B.fire({icon:"info",title:t})}function E(t,e){Swal.fire({toast:!0,position:"center",icon:A(t)?"success":"error",title:U(t),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&A(t)&&e()}))}function q(t){Swal.fire({icon:"error",html:t})}function R(t,e){Swal.fire({text:t,showCancelButton:!0,confirmButtonText:P.confirm,cancelButtonText:P.cancel}).then((t=>{t.value&&e()}))}const F="목록이 없습니다.",j=" 처리 중, 오류가 발생했습니다.";function z(t){return Number(t)<10?t.toString().padStart(2,"0"):t}function G(t){return null==t||t.hasOwnProperty("length")&&0===t.length||t.constructor===Object&&0===Object.keys(t).length||t.constructor===String&&""===t.trim()}function _(t){return G(t)||isNaN(t)?0:t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}const O="/v2/member/detail";function K(){v.fadeOut(),T.fadeOut(),$("body").css("overflow-y","auto")}function J(){$("body").css("overflow-y","hidden")}function H(t){const e=t.getFullYear(),a=t.getMonth()+1,n=t.getDate();return`${e}-${z(a)}-${z(n)}`}function X(){return H(new Date)}function Y(){o.val(function(){const t=new Date;return t.setDate(t.getDate()-6),H(t)}()),r.val(X())}function Q(){n.removeClass("active")}const V={};let Z,tt=new Swiper(".swiper-container");function et(){Q(),i.datepicker("option","minDate","2020-07-01"),i.datepicker("option","maxDate","today"),Y(),e.each((function(){$(this).children().eq(0).prop("selected",!0)})),m.val(""),c.eq(0).prop("checked",!0),l.eq(0).prop("checked",!0),l.eq(1).prop("checked",!0),l.eq(2).prop("checked",!0)}function at(){let t=f.DataTable();t.page.len(Number(h.val())),t.ajax.reload()}function nt(){const t={exchange_list:[rt()],memo:y.val().trim()};x(!0,I.rejectGift,JSON.stringify(t)).then((async function(t,e,a){await E(t,it)})).catch((t=>q(P.cancel+j)))}function it(){K(),at()}function ot(){const t={tr_id:Z};x(!0,I.resendGift,JSON.stringify(t)).then((async function(t,e,a){await E(t,at)})).catch((t=>q("재발송 처리 중, 오류가 발생했습니다.")))}function rt(){const t=f.DataTable().rows(".selected").data()[0];return G(t)?"":t.exchange_uuid}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:F,zeroRecords:F,processing:"검색 중..",paginate:{previous:P.previous,next:P.next}}}),i.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:P.monthNames,dayNames:P.dayNames,dayNamesMin:P.dayNames}),h.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),et(),f.DataTable({ajax:{url:I.sendGiftList,type:"POST",headers:M,dataFilter:function(t){let e=JSON.parse(t);return S.text(`${_(e.totalUCD)} UCD`),A(e)?(e.recordsTotal=e.count,e.recordsFiltered=e.count):(e.data=[],N(function(t){return t.msg}(e))),JSON.stringify(e)},data:function(t){let e=[];l.each((function(){$(this).is(":checked")&&e.push($(this).val())}));const a={date_type:s.val(),from_date:o.val(),to_date:r.val(),search_type:d.val(),keyword:m.val().trim(),page:t.start/t.length+1,limit:h.val(),gift_type:$("input[name=radio-type]:checked").val(),status:e};return JSON.stringify(a)},error:function(t,e){q(P.list+"을(를) 불러올 수 없습니다.")}},columns:[{title:"상품유형",data:"goods_code",width:"5%",render:function(t){return G(t)?P.gift:P.gifticon}},{title:"상품명",data:"gift_name",width:"18%"},{title:"신청자",data:"nickname",width:"20%",render:function(t,e,a,n){return`<a data-uuid="${a.profile_uuid}">${t}</a>`}},{title:"신청수량",data:"qty",width:"5%"},{title:"금액(UCD)",data:"ucd",width:"8%",render:function(t,e,a,n){return _(t)}},{title:"승인/발송/취소일시",data:"updated",width:"12%"},{title:"예약일시",data:"reserved",width:"12%",render:function(t,e,a,n){return G(a.goods_code)||"취소"===a.status?P.dash:t}},{title:"상태",data:"status",width:"5%"},{title:"상세내역",data:"exchange_uuid",width:"5%",render:function(t,e,a,n){return a.coupon.length>0?`<a class="view-detail" data-uuid="${t}">보기</a>`:P.dash}},{title:"메모",data:"memo",width:"5%",render:function(t,e,a,n){return function(t){return G(t.memo)?P.dash:`<i class="tooltip-mark fas fa-sticky-note"><span class="tooltip-txt left">${t.memo}</span></i>`}(a)}},{title:"",data:"exchange_uuid",width:"5%",render:function(t,e,a,n){return`<div class="checkbox-wrap"><input type="checkbox" name="chk-row" id="${i=n.row}"/><label for="${i}"><span></span></label></div>`;var i}}],serverSide:!0,paging:!0,pageLength:Number(h.val()),select:{style:"single",selector:":checkbox"},destroy:!1,initComplete:function(){$(this).on("select.dt",(function(t,e,a,n){$("input[name=chk-row]").eq(n).prop("checked",!0)})),$(this).on("deselect.dt",(function(t,e,a,n){$("input[name=chk-row]").eq(n).prop("checked",!1)}))},fnRowCallback:function(t,e){$(t).children().eq(8).find("a").on("click",(function(){w.fadeIn(),T.fadeIn(),J(),function(t){const e=$(t).data("uuid"),{coupons:a}=V[e];!G(a)&&a.length>0&&(L.empty(),a.map((t=>{const{gift_image_url:e,goodsCd:a,brandNm:n,goodsNm:i,sellPriceAmt:o,recverTelNo:r,validPrdEndDt:s,pinStatusNm:d,sendStatusCd:l,tr_id:c}=t,m="발행"===d?`<div class="right-wrap gift-resand">\n\t\t\t\t\t\t\t<button type="button" data-trid="${c}" class="btn-sm btn-teal btn-resend">재발송</button>\n\t\t\t\t\t\t</div>`:"",p=`<div class="swiper-slide">\n\t\t\t\t\t\t<table class="detail-table">\n\t\t\t\t\t\t\t<colgroup>\n\t\t\t\t\t\t\t\t<col style="width: 20%;">\n\t\t\t\t\t\t\t\t<col style="width: 80%;">\n\t\t\t\t\t\t\t</colgroup>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>상품이미지</th>\n\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t<div class="detail-img-wrap">\n\t\t\t\t\t\t\t\t\t\t\t<img src="${e}" alt="">\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>상품코드</th>\n\t\t\t\t\t\t\t\t\t<td>${G(a)?P.dash:a}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>상품명</th>\n\t\t\t\t\t\t\t\t\t<td>[${G(n)?P.dash:n}] ${G(i)?P.dash:i}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>판매단가</th>\n\t\t\t\t\t\t\t\t\t<td>${_(o)}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>수신자 번호</th>\n\t\t\t\t\t\t\t\t\t<td>${G(r)?P.dash:r}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>유효기간 만료일</th>\n\t\t\t\t\t\t\t\t\t<td>${$=s,G($)?"":`${$.substring(0,4)}-${$.substring(4,6)}-${$.substring(6,8)} ${$.substring(8,10)}:${$.substring(10,12)}:${$.substring(12,14)}`}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>발송 상태</th>\n\t\t\t\t\t\t\t\t\t<td>${G(l)?P.dash:l}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>쿠폰 상태</th>\n\t\t\t\t\t\t\t\t\t<td>${G(d)?P.dash:d}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t${m}\n\t\t\t\t\t</div>`;var $;L.append(p)}))),$("img").on("error",(function(){$(this).attr("src",P.noImage)})),tt.destroy(!0,!0),tt=new Swiper(".swiper-container",{spaceBetween:10,pagination:{el:".swiper-pagination",clickable:!0}}),$(".btn-resend").on("click",(function(){!function(t){Z=$(t).data("trid"),R("발송하시겠습니까?",ot)}(this)}))}(this)})),e.coupon.length>0&&Object.assign(V,{[e.exchange_uuid]:{coupons:e.coupon}}),"취소"===e.status&&$(t).addClass("minus-pay"),"승인"!==e.status&&$(t).children().eq(10).find("input").prop("disabled",!0),$(t).children().eq(2).find("a").on("click",(function(){!function(t){let e=$("<form></form>");e.prop("method","post"),e.prop("action",O),e.append($("<input/>",{type:"hidden",name:"is_store",value:!0})),e.append($("<input/>",{type:"hidden",name:"profile_uuid",value:t})),e.appendTo("body"),e.trigger("submit")}($(this).data("uuid"))}))},drawCallback:function(t){!function(t){const e=$(t).parent().siblings().find(".data-num"),a=_(function(t){return t.DataTable().page.info().recordsTotal}(t));$(e).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),t.on("keydown",(function(t){!function(t){"none"===$(C).css("display")&&13===t.keyCode&&at()}(t)})),o.on("change",(function(){r.datepicker("option","minDate",new Date(o.datepicker("getDate"))),Q()})),r.on("change",(function(){o.datepicker("option","maxDate",new Date(r.datepicker("getDate"))),Q()})),h.on("change",(function(){at()})),p.on("click",(function(){at()})),u.on("click",(function(){et()})),n.on("click",(function(){var t;t=this,Q(),$(t).addClass("active"),$(t).hasClass("today")?i.val(X()):$(t).hasClass("week")?Y():$(t).hasClass("month")?(o.val(function(){const t=new Date;return t.setMonth(t.getMonth()-1),H(t)}()),r.val(X())):$(t).hasClass("months")?(o.val(function(){const t=new Date;return t.setMonth(t.getMonth()-3),H(t)}()),r.val(X())):(o.val("2021-07-01"),r.val(X()))})),k.on("click",(function(){K()})),T.on("click",(function(){K()})),D.on("click",(function(){onSubmitUpdateMemo()})),b.on("click",(function(){(!G(rt())||(N("대상을 선택해주세요."),0))&&(C.fadeIn(),T.fadeIn(),J(),y.val(""),y.trigger("focus"))})),g.on("click",(function(){R("취소하시겠습니까?",nt)})),l.on("click",(function(){0===$("input[name='"+this.name+"']:checked").length&&(N("최소 하나 이상의 값을 선택해야 합니다."),$(this).prop("checked",!0))}))}))})();