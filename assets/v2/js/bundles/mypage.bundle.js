(()=>{"use strict";const e=`${api_server_url}/v3/`,t={saveUserUcdFromXlsx:e+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:e+"ucd/set/charge/user/system",saveUserUcdByBiz:e+"ucd/set/charge/user/company",saveDoitUcdBySystem:e+"ucd/set/charge/doit/system",saveDoitUcdByBiz:e+"ucd/set/charge/doit/company",saveBizUcd:e+"ucd/set/charge/company/system",dashboardSummary:e+"main/dashboard",dashboardSummaryList:e+"main/dashboard/get/list",dashboardMoreLeader:e+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:e+"main/dashboard/get/doitRanklist",getProfile:e+"admin/get",updatePassword:e+"admin/update/pwd",memberList:e+"profile/get/list",detailMember:e+"profile/get/detail/info",levelUp:e+"profile/set/levelUp",levelDown:e+"profile/set/levelDown",cancelPartner:e+"profile/set/releasePartner",levelInfo:e+"profile/get/level",levelHistory:e+"profile/get/level/history",deviceInfo:e+"profile/get/device/info",memberDoitList:e+"profile/get/doit",memberCategoryList:e+"profile/get/category",memberActionList:e+"profile/get/action",memberActionDetail:e+"profile/get/detail/action",countPerLevel:e+"level/get/count",memberLevelList:e+"level/get/list",unlinkMemberList:e+"profile/get/unlink",changedMemberList:e+"profile/get/changed",badgeList:e+"badge/get/list",createBadge:e+"badge/create",detailBadge:e+"badge/get/detail/info",deleteBadge:e+"badge/delete",updateBadge:e+"badge/update",categoryList:e+"category/list",createCategory:e+"category/create",detailCategory:e+"category/detail",reorderCategory:e+"category/update/sequence",deleteCategory:e+"category/delete",updateCategory:e+"category/update",subCategoryList:e+"subcategory/list",createSubCategory:e+"subcategory/create",updateSubCategoryDoitImg:e+"subcategory/set/doit/image",deleteSubCategory:e+"subcategory/delete",reorderSubCategory:e+"subcategory/update/sequence",editSubCategory:e+"subcategory/update",keywordList:e+"keyword/get/list",createKeyword:e+"keyword/create",updateKeyword:e+"keyword/update",doitSponsorList:e+"doit/get/company",doitList:e+"doit/list",doitSetRecommend:e+"doit/set/recommend",createDoit:e+"doit/create",createDoitCategoryList:e+"category/exposure/list",detailDoit:e+"doit/detail",updateDoit:e+"doit/update",deleteDoit:e+"doit/delete",openDoit:e+"doit/set/open",stopDoit:e+"doit/set/stop",getDoitUcd:e+"ucd/get/doit",getUcdDoitList:e+"ucd/get/doit/list",missionList:e+"mission/get/list",createMission:e+"mission/create",detailMission:e+"mission/get/detail/info",updateMission:e+"mission/update",deleteMission:e+"mission/delete",joinMemberList:e+"member/get/list",infoJoinMember:e+"member/get/profile",rewardMemberList:e+"ucd/get/reward/profile",createReward:e+"ucd/set/reward/profile",countMember:e+"member/get/count",blockMember:e+"member/set/retire/ban",banMember:e+"member/set/retire",applyMemberList:e+"member/get/applylist",approvalMember:e+"member/get/applyConfirm",rejectMember:e+"member/get/applyReject",blockMemberList:e+"member/get/retire/ban/list",cancelBlockMember:e+"member/set/retire/ban/cancel",actionList:e+"action/get/list",detailAction:e+"action/get/detail/info",sendWarning:e+"action/set/yellow",cancelWarning:e+"action/set/yellowCancel",actionCommentList:e+"action/get/commentList",createActionComment:e+"action/set/insertComment",deleteActionComment:e+"action/set/deleteComment",actionReplyList:e+"action/get/comment/child/list",talkList:e+"board/get/list",createTalk:e+"board/create",detailTalk:e+"board/get/detail/info",updateTalk:e+"board/update",deleteTalk:e+"board/delete",talkCommentList:e+"board/get/commentList",createTalkComment:e+"board/set/insertComment",deleteTalkComment:e+"board/set/deleteComment",talkReplyList:e+"board/get/comment/child/list",pickList:e+"recommend/list",previewList:e+"recommend/get/doit",searchDoitList:e+"recommend/get/doit/list",reorderPick:e+"recommend/set",createPick:e+"recommend/create",updatePick:e+"recommend/update",detailPick:e+"recommend/detail",bizList:e+"biz/get/list",createBiz:e+"biz/create",detailBiz:e+"biz/get/detail/info",bizDoitList:e+"biz/get/detail/doit",bizUcdList:e+"ucd/list/get/company",updateBiz:e+"biz/update",getBizUcd:e+"ucd/get/company",noticeList:e+"notice/get/list",createNotice:e+"notice/create",detailNotice:e+"notice/get/detail/info",updateNotice:e+"notice/update",deleteNotice:e+"notice/delete",faqType:e+"faq/get/type",faqList:e+"faq/get/list",createFaq:e+"faq/create",detailFaq:e+"faq/get/detail/info",updateFaq:e+"faq/update",deleteFaq:e+"faq/delete",reorderFaq:e+"faq/set/orders",inquiryList:e+"qna/get/list",updateInquiry:e+"qna/set/insertComment",detailInquiry:e+"qna/get/detail/info",deleteInquiry:e+"qna/delete",reportActionList:e+"report/get/action/list",actionReportReasonList:e+"report/get/action/descriptionList",reportTalkList:e+"report/get/board/list",talkReportReasonList:e+"report/get/board/descriptionList",blindTalk:e+"report/set/blind",bannerList:e+"banner/get/list",createBanner:e+"banner/create",detailBanner:e+"banner/get/detail/info",updateBanner:e+"banner/update",reorderBanner:e+"banner/set/orders",targetEventList:e+"banner/get/event/list",targetDoitList:e+"banner/get/doit/list",targetNoticeList:e+"banner/get/notice/list",storyList:e+"story/get/list",createStory:e+"story/create",detailStory:e+"story/get/detail/info",updateStory:e+"story/update",reorderStory:e+"story/set/orders",eventList:e+"event/get/list",createEvent:e+"event/create",detailEvent:e+"event/get/detail/info",deleteEvent:e+"event/delete",updateEvent:e+"event/update",customEvent:e+"event/popup/get/list",customEventProfile:e+"event/popup/get/profile",pushList:e+"push/list",cancelPush:e+"push/set/cancel",createPush:e+"push/create",pushTargetNotice:e+"push/get/notice",pushTargetEvent:e+"push/get/event",pushTargetDoit:e+"push/get/doit",pushTargetMember:e+"push/get/profile",pushTargetMemberFromXlsx:e+"excel/import/notification/profile",popupList:e+"popup/get/list",createPopup:e+"popup/create",detailPopup:e+"popup/get/detail/info",updatePopup:e+"popup/update",deletePopup:e+"popup/delete",errorList:e+"error/list",updateError:e+"error/update",createEncryption:e+"operate/set/encryption",createDecryption:e+"operate/set/decryption",versionList:e+"operate/get/version/list",createVersion:e+"operate/version/create",deleteVersion:e+"operate/version/delete",logList:e+"log/get/list",getMemberForSaveUcd:e+"ucd/get/user/list",getMemberFromXlsx:e+"excel/import/profile",getDoitFromXlsx:e+"excel/import/doit",ucdChargeList:e+"ucd/list/get/charge",systemWalletType:e+"ucd/get/system/type",systemWalletList:e+"ucd/list/get/system",doitWalletList:e+"ucd/list/get/doit",memberWalletList:e+"ucd/list/get/user",pendingWalletList:e+"ucd/list/get/transfer",giftList:e+"gift/get/list",reorderGiftList:e+"gift/get/orderList",reorderGift:e+"gift/set/orders",createGift:e+"gift/create",ktGoodsList:e+"gift/get/kt/goods",detailGift:e+"gift/get/detail/info",updateGift:e+"gift/update",applyGiftList:e+"exchange/get/list",sendGifticon:e+"exchange/set/confirm",sendGeneralGift:e+"exchange/set/send",rejectGift:e+"exchange/set/reject",resendGift:e+"exchange/set/resend",getGiftBalance:e+"exchange/get/money",sendGiftList:e+"exchange/get/sendList",sendGiftStatusList:e+"exchange/get/payment",updateGiftSendMemo:e+"exchange/set/insertMemo",adminList:e+"admin/list",detailAdmin:e+"admin/detail",updateAdmin:e+"admin/update",deleteAdmin:e+"admin/delete",authBizList:e+"auth/get/biz/list",approvalAdmin:e+"admin/approval",authList:e+"auth/list",getMenuWithAuth:e+"auth/get/menu",setMenuWithAuth:e+"auth/set/menu",createAuth:e+"auth/create",deleteAuth:e+"auth/delete",promotionList:e+"promotion/get/list",createPromotion:e+"promotion/create",detailPromotion:e+"promotion/get/detail",updatePromotion:e+"promotion/update",closePromotion:e+"promotion/set/end",promotionDoitList:e+"promotion/get/doit/list",promotionProceedList:e+"promotion/get/proceed/list",setDoitPromotion:e+"promotion/set/doit",cancelDoitPromotion:e+"promotion/set/release"},a=($("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword"),$("#btnSearch"),$("#btnReset"),$("#btnSubmit")),o=($("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable"),$("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid")),n=$("#password"),r=$("#passwordCheck"),s=$("#passwordCheckTxt"),l=$("#useremail"),d=$("#username"),c=($("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),"취소"),m={Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))};function p(e,t,a){return new Promise(((i,o)=>{$.ajax({global:e,url:t,type:"POST",headers:m,contentType:"text/plain",dataType:"json",data:a,success:function(e){i(e)},error:function(e,t,a){o(a)},complete:function(e,t){}})}))}function u(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function b(e){return 0===function(e){return e.status}(e)}const g=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function y(e){g.fire({icon:"info",title:e})}function f(e){Swal.fire({icon:"error",html:e})}function h(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function T(){const e=CryptoJS.SHA512(n.val().trim()),i={userid:a.val(),password:e.toString()};p(!0,t.updatePassword,JSON.stringify(i)).then((async function(e,t,a){await function(e,t){Swal.fire({toast:!0,position:"center",icon:b(e)?"success":"error",title:u(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&b(e)&&t()}))}(e,k)})).catch((e=>f("수정 처리 중, 오류가 발생했습니다.")))}function k(){n.val(""),r.val("")}$((()=>{!function(){const e={userid:a.val()};p(!0,t.getProfile,JSON.stringify(e)).then((async function(e,t,a){b(e)?function(e){o.text(e.data.userid),d.text(e.data.name),l.text(e.data.email)}(e):y(function(e){return e.msg}(e))})).catch((e=>f("상세 내용을(를) 불러올 수 없습니다.")))}(),n.on("keyup",(function(){r.val(""),s.text("")})),r.on("keyup",(function(){n.val()!==r.val()?s.text("비밀번호가 일치하지 않습니다."):s.text("")})),i.on("click",(function(){var e;(h(n.val())?(y("비밀번호는 필수항목입니다."),n.trigger("focus"),0):h(r.val())?(y("비밀번호 확인을 입력해주세요."),r.trigger("focus"),0):n.val()!==r.val()?(y("비밀번호와 비밀번호 확인이 일치하지 않습니다."),r.trigger("focus"),0):function(){const e=n.val().trim();return/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/.test(e)&&!/(0123)|(1234)|(2345)|(3456)|(4567)|(5678)|(6789)|(7890)/.test(e)&&!/(\w)\1\1\1/.test(e)}()||(y("비밀번호 형식을 확인해주세요."),n.trigger("focus"),0))&&("수정하시겠습니까?",e=T,Swal.fire({text:"수정하시겠습니까?",showCancelButton:!0,confirmButtonText:"확인",cancelButtonText:c}).then((t=>{t.value&&e()})))}))}))})();