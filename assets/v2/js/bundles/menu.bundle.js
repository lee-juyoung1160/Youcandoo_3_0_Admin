(()=>{"use strict";const e=`${api_server_url}/v3/`,t={saveUserUcdFromXlsx:e+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:e+"ucd/set/charge/user/system",saveUserUcdByBiz:e+"ucd/set/charge/user/company",saveDoitUcdFromXlsx:e+"ucd/set/charge/doit/system/excel",saveDoitUcdBySystem:e+"ucd/set/charge/doit/system",saveDoitUcdByBiz:e+"ucd/set/charge/doit/company",saveBizUcd:e+"ucd/set/charge/company/system",dashboardSummary:e+"main/dashboard",dashboardSummaryList:e+"main/dashboard/get/list",dashboardMoreLeader:e+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:e+"main/dashboard/get/doitRanklist",getProfile:e+"admin/get",updatePassword:e+"admin/update/pwd",updatePasswordLater:e+"admin/update/setPasswordUpdated",memberList:e+"profile/get/list",detailMember:e+"profile/get/detail/info",levelUp:e+"profile/set/levelUp",levelDown:e+"profile/set/levelDown",cancelPartner:e+"profile/set/releasePartner",levelInfo:e+"profile/get/level",levelHistory:e+"profile/get/level/history",deviceInfo:e+"profile/get/device/info",memberDoitList:e+"profile/get/doit",memberCategoryList:e+"profile/get/category",memberActionList:e+"profile/get/action",memberActionDetail:e+"profile/get/detail/action",countPerLevel:e+"level/get/count",memberLevelList:e+"level/get/list",unlinkMemberList:e+"profile/get/unlink",changedMemberList:e+"profile/get/changed",badgeList:e+"badge/get/list",createBadge:e+"badge/create",detailBadge:e+"badge/get/detail/info",deleteBadge:e+"badge/delete",updateBadge:e+"badge/update",categoryList:e+"category/list",createCategory:e+"category/create",detailCategory:e+"category/detail",reorderCategory:e+"category/update/sequence",deleteCategory:e+"category/delete",updateCategory:e+"category/update",subCategoryList:e+"subcategory/list",createSubCategory:e+"subcategory/create",updateSubCategoryDoitImg:e+"subcategory/set/doit/image",deleteSubCategory:e+"subcategory/delete",reorderSubCategory:e+"subcategory/update/sequence",editSubCategory:e+"subcategory/update",keywordList:e+"keyword/get/list",createKeyword:e+"keyword/create",updateKeyword:e+"keyword/update",doitSponsorList:e+"doit/get/company",doitList:e+"doit/list",doitSetRecommend:e+"doit/set/recommend",createDoit:e+"doit/create",createDoitCategoryList:e+"category/exposure/list",detailDoit:e+"doit/detail",updateDoit:e+"doit/update",deleteDoit:e+"doit/delete",openDoit:e+"doit/set/open",stopDoit:e+"doit/set/stop",getDoitUcd:e+"ucd/get/doit",getUcdDoitList:e+"ucd/get/doit/list",getDoitRewardList:e+"ucd/get/reward/doit",missionList:e+"mission/get/list",createMission:e+"mission/create",detailMission:e+"mission/get/detail/info",updateMission:e+"mission/update",deleteMission:e+"mission/delete",joinMemberList:e+"member/get/list",infoJoinMember:e+"member/get/profile",rewardMemberList:e+"ucd/get/reward/list",createReward:e+"ucd/set/reward/profile/condition",countMember:e+"member/get/count",blockMember:e+"member/set/retire/ban",banMember:e+"member/set/retire",applyMemberList:e+"member/get/applylist",approvalMember:e+"member/get/applyConfirm",rejectMember:e+"member/get/applyReject",blockMemberList:e+"member/get/retire/ban/list",cancelBlockMember:e+"member/set/retire/ban/cancel",createBlockMemo:e+"member/set/retire/ban/memo",rankMember:e+"doit/get/member/rank",actionList:e+"action/get/list",detailAction:e+"action/get/detail/info",sendWarning:e+"action/set/yellow",cancelWarning:e+"action/set/yellowCancel",actionCommentList:e+"action/get/commentList",createActionComment:e+"action/set/insertComment",deleteActionComment:e+"action/set/deleteComment",actionReplyList:e+"action/get/comment/child/list",talkList:e+"board/get/list",createTalk:e+"board/create",detailTalk:e+"board/get/detail/info",updateTalk:e+"board/update",deleteTalk:e+"board/delete",talkCommentList:e+"board/get/commentList",createTalkComment:e+"board/set/insertComment",deleteTalkComment:e+"board/set/deleteComment",talkReplyList:e+"board/get/comment/child/list",emojiList:e+"emoticon/get",pickList:e+"recommend/list",previewList:e+"recommend/get/doit",searchDoitList:e+"recommend/get/doit/list",reorderPick:e+"recommend/set",createPick:e+"recommend/create",updatePick:e+"recommend/update",detailPick:e+"recommend/detail",getWeek:e+"doit/rank/get/week",rankList:e+"doit/rank/get/list",createRank:e+"doit/rank/set",targetRankList:e+"doit/rank/popup/get",copyRank:e+"doit/rank/set/copy",bizList:e+"biz/get/list",createBiz:e+"biz/create",detailBiz:e+"biz/get/detail/info",bizDoitList:e+"biz/get/detail/doit",bizUcdList:e+"ucd/list/get/company",updateBiz:e+"biz/update",getBizUcd:e+"ucd/get/company",noticeList:e+"notice/get/list",createNotice:e+"notice/create",detailNotice:e+"notice/get/detail/info",updateNotice:e+"notice/update",deleteNotice:e+"notice/delete",faqType:e+"faq/get/type",faqList:e+"faq/get/list",createFaq:e+"faq/create",detailFaq:e+"faq/get/detail/info",updateFaq:e+"faq/update",deleteFaq:e+"faq/delete",reorderFaq:e+"faq/set/orders",inquiryList:e+"qna/get/list",updateInquiry:e+"qna/set/insertComment",detailInquiry:e+"qna/get/detail/info",deleteInquiry:e+"qna/delete",xlsxOutInquiry:e+"excel/export/qna",reportActionList:e+"report/get/action/list",actionReportReasonList:e+"report/get/action/descriptionList",reportTalkList:e+"report/get/board/list",talkReportReasonList:e+"report/get/board/descriptionList",blindTalk:e+"report/set/blind",bannerList:e+"banner/get/list",createBanner:e+"banner/create",detailBanner:e+"banner/get/detail/info",updateBanner:e+"banner/update",reorderBanner:e+"banner/set/orders",targetEventList:e+"banner/get/event/list",targetDoitList:e+"banner/get/doit/list",targetNoticeList:e+"banner/get/notice/list",storyList:e+"story/get/list",createStory:e+"story/create",detailStory:e+"story/get/detail/info",updateStory:e+"story/update",reorderStory:e+"story/set/orders",eventList:e+"event/get/list",createEvent:e+"event/create",detailEvent:e+"event/get/detail/info",deleteEvent:e+"event/delete",updateEvent:e+"event/update",customEvent:e+"event/popup/get/list",customEventProfile:e+"event/popup/get/profile",createCustomEvent:e+"event/popup/set",pushList:e+"push/list",cancelPush:e+"push/set/cancel",createPush:e+"push/create",pushTargetNotice:e+"push/get/notice",pushTargetEvent:e+"push/get/event",pushTargetDoit:e+"push/get/doit",pushTargetMember:e+"push/get/profile",pushTargetMemberFromXlsx:e+"excel/import/notification/profile",popupList:e+"popup/get/list",createPopup:e+"popup/create",detailPopup:e+"popup/get/detail/info",updatePopup:e+"popup/update",deletePopup:e+"popup/delete",inviteList:e+"invite/list",errorList:e+"error/list",updateError:e+"error/update",createEncryption:e+"operate/set/encryption",createDecryption:e+"operate/set/decryption",versionList:e+"operate/get/version/list",createVersion:e+"operate/version/create",deleteVersion:e+"operate/version/delete",logList:e+"log/get/list",getMemberForSaveUcd:e+"ucd/get/user/list",getMemberFromXlsx:e+"excel/import/profile",getDoitFromXlsx:e+"excel/import/doit",ucdChargeList:e+"ucd/list/get/charge",systemWalletType:e+"ucd/get/system/type",systemWalletList:e+"ucd/list/get/system",doitWalletList:e+"ucd/list/get/doit",memberWalletList:e+"ucd/list/get/user",pendingWalletList:e+"ucd/list/get/transfer",giftList:e+"gift/get/list",reorderGiftList:e+"gift/get/orderList",reorderGift:e+"gift/set/orders",createGift:e+"gift/create",ktGoodsList:e+"gift/get/kt/goods",detailGift:e+"gift/get/detail/info",updateGift:e+"gift/update",applyGiftList:e+"exchange/get/list",sendGifticon:e+"exchange/set/confirm",sendGeneralGift:e+"exchange/set/send",rejectGift:e+"exchange/set/reject",resendGift:e+"exchange/set/resend",getGiftBalance:e+"exchange/get/money",sendGiftList:e+"exchange/get/sendList",sendGiftStatusList:e+"exchange/get/payment",updateGiftSendMemo:e+"exchange/set/insertMemo",adminList:e+"admin/list",detailAdmin:e+"admin/detail",updateAdmin:e+"admin/update",deleteAdmin:e+"admin/delete",authBizList:e+"auth/get/biz/list",approvalAdmin:e+"admin/approval",authList:e+"auth/list",getMenuWithAuth:e+"auth/get/menu",setMenuWithAuth:e+"auth/set/menu",createAuth:e+"auth/create",deleteAuth:e+"auth/delete",promotionList:e+"promotion/get/list",createPromotion:e+"promotion/create",detailPromotion:e+"promotion/get/detail",updatePromotion:e+"promotion/update",closePromotion:e+"promotion/set/end",promotionDoitList:e+"promotion/get/doit/list",promotionProceedList:e+"promotion/get/proceed/list",setDoitPromotion:e+"promotion/set/doit",cancelDoitPromotion:e+"promotion/set/release"},a=($("body"),$("section")),i=($(".search-wrap select"),$("img"),$(".side-toggle-btn")),o=$("aside.main-menu"),n=$("#mainMenu"),r=$("#sessionUserid"),s=($("#sessionUserIp"),$("#sessionAuthCode")),l=($("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader")),d=$("#btnScrollTop");function c(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function m(){return window.location.pathname}$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword"),$("#btnSearch"),$("#btnReset"),$("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable"),$("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$("#selStartHour"),$("#selStartMinute"),$("#selEndHour"),$("#selEndMinute"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#currentPassword"),$("#changePassword"),$("#changePasswordCheck"),$("#passwordExpired"),$("#passwordChangeId"),$("#btnChangeLater"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#selUpdateStartHour"),$("#selUpdateStartMinute"),$("#selUpdateEndHour"),$("#selUpdateEndMinute"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("#searchMemberFrom"),$("#searchMemberTo"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#modalMemo"),$("#searchTab li"),$("#ongoingRankTable"),$("#totalRankTable"),$("#btnRefreshTotalRank"),$("#btnRefreshOngoingRank"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#btnReward"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#modalReward"),$("#rewardTable"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selSearchTypeInAction"),$("#keywordInAction"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("input[name=radio-comment-attach-type]"),$("#commentAttachmentWrap"),$("#btnCommentEmoji"),$("#commentEmojiWrap"),$("#commentEmojiCategory"),$("#previewEmoji"),$("#btnCancelCommentEmoji"),$("input[name=radio-action-attach-type]"),$("#actionAttachmentWrap"),$("#btnActionEmoji"),$("#actionEmojiWrap"),$("#actionEmojiCategory"),$("#previewActionEmoji"),$("#btnCancelActionEmoji"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("input[name=chk-special-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("input[name=chk-notice-type]"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("input[name=chk-update-special-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#baseDateWrap"),$("#btnSearchNickname"),$("#btnSearchTarget"),$("#modalSearchMember"),$("#targetTable"),$("#searchTable"),$("#addedTable"),$("#selWeekly"),$("#dateRange"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#selVocType"),$("#selVocTypeDetail"),$("#selRiskGrade"),$("#vocType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#isDel"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#customEvent"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#leaveDate"),$("#loginDate"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory");const p={Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:r.val()}))},u=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});$(document).ajaxStart((function(){l.show()})),$(document).ajaxComplete((function(){l.hide()})),$(window).on("scroll",(function(){!function(){const e=.15*$("section").height();$(window).scrollTop()>e?d.fadeIn():d.fadeOut()}()})),d.on("click",(function(){$("html, body").animate({scrollTop:0},400)})),i.on("click",(function(){$(this).toggleClass("btn-toggle"),o.toggleClass("open"),a.toggleClass("wide-content")})),function(){const e={code:s.val()};var a,i;(!1,a=t.getMenuWithAuth,i=JSON.stringify(e),new Promise(((e,t)=>{$.ajax({global:false,url:a,type:"POST",headers:p,contentType:"text/plain",dataType:"json",data:i,success:function(t){e(t)},error:function(e,a,i){t(i)},complete:function(e,t){}})}))).then((async function(e,t,a){var i;!function(e){return 0===function(e){return e.status}(e)}(e)?(i=function(e){return e.msg}(e),u.fire({icon:"info",title:i})):(await function(e){if(e.data){const t=e.data,a=Object.getOwnPropertyNames(t);!c(a)&&a.length>0&&(n.empty(),a.map((e=>{const{name:a,icon:i,view:o,children:r}=t[e];if(!o)return;const s=Object.getOwnPropertyNames(r);let l="";!c(s)&&s.length>0&&s.map((e=>{r[e].view&&(l+=`<li><a href="${r[e].path}">${r[e].name}</a></li>`,function(e){b.push(e);const t=["/v2/member","/v2/member/badge","/v2/doit/pick","/v2/doit/category","/v2/marketing/banner","/v2/marketing/story","/v2/marketing/event","/v2/marketing/push","/v2/marketing/popup","/v2/marketing/customevent","/v2/gift","/v2/service/notice","/v2/service/faq","/v2/service/inquiry","/v2/admin","/v2/operate/version","/v2/doit/rank"];switch(e){case"/v2/biz":b.push(e+"/support/doit"),b.push(e+"/support/leader"),b.push(e+"/update"),b.push(e+"/detail"),b.push(e+"/create");break;case"/v2/promotion":b.push(e+"/detail"),b.push(e+"/update");break;case"/v2/doit":b.push(e+"/detail"),b.push(e+"/reward");break;case"/v2/ucd/charge":b.push("/v2/ucd/create/member");break;case"/v2/ucd/doit":b.push("/v2/ucd/create/doit");break;case"/v2/report/talk":b.push(e+"/detail_talk"),b.push(e+"/detail_action");break;case"/v2/emoticon":b.push(e+"/detail"),b.push(e+"/update");break;default:t.indexOf(e)>-1&&(b.push(e+"/create"),b.push(e+"/update"),b.push(e+"/detail"))}}(r[e].path))}));const d=`<li>\n                            <div class="main-mnu">\n                                <i class="${i}"></i>\n                                <span>${a}</span>\n                                <i class="fas fa-chevron-right arrow-i"></i>\n                                <div class="bar"></div>\n                            </div>\n                            <ul class="sub-mnu">\n                                ${l}\n                            </ul>\n                        </li>`;n.append(d)})),n.children().on("click",(function(){$(this).siblings().removeClass("active"),$(this).addClass("active")})),n.find("a").on("click",(function(){$(this).addClass("active")})))}}(e),await function(){const e=m();n.find("a").each((function(){const t=$(this).attr("href");e===t&&$(this).parents("li").addClass("active")}))}(),await function(){let e=m();"/v2/member/detail"!==e&&(e.includes("update")||e.includes("detail")||e.includes("reward"))&&(e=e.replace(`/${e.split("/").pop()}`,"")),-1===b.indexOf(e)&&(alert("페이지 접근권한없음. 메인페이지로 이동합니다."),location.href="/v2")}())})).catch((e=>("메뉴를을(를) 불러올 수 없습니다.",void Swal.fire({icon:"error",html:"메뉴를을(를) 불러올 수 없습니다."}))))}();let b=["/v2","/v2/main","/v2/auth/mypage"]})();