(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword"),$("#btnSearch"),$("#btnReset"),$("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate")),a=($("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList")),i=$("#btnBack"),o=($("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable"),$("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage")),n=($("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure")),r=($("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price")),s=($("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid")),l=$("#giftName"),d=($("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate")),c=$("#giftType"),m=($("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))}),p=`${api_server_url}/v3/`,u={saveUserUcdFromXlsx:p+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:p+"ucd/set/charge/user/system",saveUserUcdByBiz:p+"ucd/set/charge/user/company",saveDoitUcdBySystem:p+"ucd/set/charge/doit/system",saveDoitUcdByBiz:p+"ucd/set/charge/doit/company",saveBizUcd:p+"ucd/set/charge/company/system",dashboardSummary:p+"main/dashboard",dashboardSummaryList:p+"main/dashboard/get/list",dashboardMoreLeader:p+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:p+"main/dashboard/get/doitRanklist",getProfile:p+"admin/get",updatePassword:p+"admin/update/pwd",memberList:p+"profile/get/list",detailMember:p+"profile/get/detail/info",levelUp:p+"profile/set/levelUp",levelDown:p+"profile/set/levelDown",cancelPartner:p+"profile/set/releasePartner",levelInfo:p+"profile/get/level",levelHistory:p+"profile/get/level/history",deviceInfo:p+"profile/get/device/info",memberDoitList:p+"profile/get/doit",memberCategoryList:p+"profile/get/category",memberActionList:p+"profile/get/action",memberActionDetail:p+"profile/get/detail/action",countPerLevel:p+"level/get/count",memberLevelList:p+"level/get/list",unlinkMemberList:p+"profile/get/unlink",changedMemberList:p+"profile/get/changed",badgeList:p+"badge/get/list",createBadge:p+"badge/create",detailBadge:p+"badge/get/detail/info",deleteBadge:p+"badge/delete",updateBadge:p+"badge/update",categoryList:p+"category/list",createCategory:p+"category/create",detailCategory:p+"category/detail",reorderCategory:p+"category/update/sequence",deleteCategory:p+"category/delete",updateCategory:p+"category/update",subCategoryList:p+"subcategory/list",createSubCategory:p+"subcategory/create",updateSubCategoryDoitImg:p+"subcategory/set/doit/image",deleteSubCategory:p+"subcategory/delete",reorderSubCategory:p+"subcategory/update/sequence",editSubCategory:p+"subcategory/update",keywordList:p+"keyword/get/list",createKeyword:p+"keyword/create",updateKeyword:p+"keyword/update",doitSponsorList:p+"doit/get/company",doitList:p+"doit/list",doitSetRecommend:p+"doit/set/recommend",createDoit:p+"doit/create",createDoitCategoryList:p+"category/exposure/list",detailDoit:p+"doit/detail",updateDoit:p+"doit/update",deleteDoit:p+"doit/delete",openDoit:p+"doit/set/open",stopDoit:p+"doit/set/stop",getDoitUcd:p+"ucd/get/doit",getUcdDoitList:p+"ucd/get/doit/list",missionList:p+"mission/get/list",createMission:p+"mission/create",detailMission:p+"mission/get/detail/info",updateMission:p+"mission/update",deleteMission:p+"mission/delete",joinMemberList:p+"member/get/list",infoJoinMember:p+"member/get/profile",rewardMemberList:p+"ucd/get/reward/profile",createReward:p+"ucd/set/reward/profile",countMember:p+"member/get/count",blockMember:p+"member/set/retire/ban",banMember:p+"member/set/retire",applyMemberList:p+"member/get/applylist",approvalMember:p+"member/get/applyConfirm",rejectMember:p+"member/get/applyReject",blockMemberList:p+"member/get/retire/ban/list",cancelBlockMember:p+"member/set/retire/ban/cancel",actionList:p+"action/get/list",detailAction:p+"action/get/detail/info",sendWarning:p+"action/set/yellow",cancelWarning:p+"action/set/yellowCancel",actionCommentList:p+"action/get/commentList",createActionComment:p+"action/set/insertComment",deleteActionComment:p+"action/set/deleteComment",actionReplyList:p+"action/get/comment/child/list",talkList:p+"board/get/list",createTalk:p+"board/create",detailTalk:p+"board/get/detail/info",updateTalk:p+"board/update",deleteTalk:p+"board/delete",talkCommentList:p+"board/get/commentList",createTalkComment:p+"board/set/insertComment",deleteTalkComment:p+"board/set/deleteComment",talkReplyList:p+"board/get/comment/child/list",pickList:p+"recommend/list",previewList:p+"recommend/get/doit",searchDoitList:p+"recommend/get/doit/list",reorderPick:p+"recommend/set",createPick:p+"recommend/create",updatePick:p+"recommend/update",detailPick:p+"recommend/detail",bizList:p+"biz/get/list",createBiz:p+"biz/create",detailBiz:p+"biz/get/detail/info",bizDoitList:p+"biz/get/detail/doit",bizUcdList:p+"ucd/list/get/company",updateBiz:p+"biz/update",getBizUcd:p+"ucd/get/company",noticeList:p+"notice/get/list",createNotice:p+"notice/create",detailNotice:p+"notice/get/detail/info",updateNotice:p+"notice/update",deleteNotice:p+"notice/delete",faqType:p+"faq/get/type",faqList:p+"faq/get/list",createFaq:p+"faq/create",detailFaq:p+"faq/get/detail/info",updateFaq:p+"faq/update",deleteFaq:p+"faq/delete",reorderFaq:p+"faq/set/orders",inquiryList:p+"qna/get/list",updateInquiry:p+"qna/set/insertComment",detailInquiry:p+"qna/get/detail/info",reportActionList:p+"report/get/action/list",actionReportReasonList:p+"report/get/action/descriptionList",reportTalkList:p+"report/get/board/list",talkReportReasonList:p+"report/get/board/descriptionList",blindTalk:p+"report/set/blind",bannerList:p+"banner/get/list",createBanner:p+"banner/create",detailBanner:p+"banner/get/detail/info",updateBanner:p+"banner/update",reorderBanner:p+"banner/set/orders",targetEventList:p+"banner/get/event/list",targetDoitList:p+"banner/get/doit/list",targetNoticeList:p+"banner/get/notice/list",storyList:p+"story/get/list",createStory:p+"story/create",detailStory:p+"story/get/detail/info",updateStory:p+"story/update",reorderStory:p+"story/set/orders",eventList:p+"event/get/list",createEvent:p+"event/create",detailEvent:p+"event/get/detail/info",deleteEvent:p+"event/delete",updateEvent:p+"event/update",customEvent:p+"event/popup/get/list",customEventProfile:p+"event/popup/get/profile",pushList:p+"push/list",cancelPush:p+"push/set/cancel",createPush:p+"push/create",pushTargetNotice:p+"push/get/notice",pushTargetEvent:p+"push/get/event",pushTargetDoit:p+"push/get/doit",pushTargetMember:p+"push/get/profile",pushTargetMemberFromXlsx:p+"excel/import/notification/profile",popupList:p+"popup/get/list",createPopup:p+"popup/create",detailPopup:p+"popup/get/detail/info",updatePopup:p+"popup/update",deletePopup:p+"popup/delete",errorList:p+"error/list",updateError:p+"error/update",createEncryption:p+"operate/set/encryption",createDecryption:p+"operate/set/decryption",versionList:p+"operate/get/version/list",createVersion:p+"operate/version/create",deleteVersion:p+"operate/version/delete",logList:p+"log/get/list",getMemberForSaveUcd:p+"ucd/get/user/list",getMemberFromXlsx:p+"excel/import/profile",getDoitFromXlsx:p+"excel/import/doit",ucdChargeList:p+"ucd/list/get/charge",systemWalletType:p+"ucd/get/system/type",systemWalletList:p+"ucd/list/get/system",doitWalletList:p+"ucd/list/get/doit",memberWalletList:p+"ucd/list/get/user",pendingWalletList:p+"ucd/list/get/transfer",giftList:p+"gift/get/list",reorderGiftList:p+"gift/get/orderList",reorderGift:p+"gift/set/orders",createGift:p+"gift/create",ktGoodsList:p+"gift/get/kt/goods",detailGift:p+"gift/get/detail/info",updateGift:p+"gift/update",applyGiftList:p+"exchange/get/list",sendGifticon:p+"exchange/set/confirm",sendGeneralGift:p+"exchange/set/send",rejectGift:p+"exchange/set/reject",resendGift:p+"exchange/set/resend",getGiftBalance:p+"exchange/get/money",sendGiftList:p+"exchange/get/sendList",sendGiftStatusList:p+"exchange/get/payment",updateGiftSendMemo:p+"exchange/set/insertMemo",adminList:p+"admin/list",detailAdmin:p+"admin/detail",updateAdmin:p+"admin/update",deleteAdmin:p+"admin/delete",authBizList:p+"auth/get/biz/list",approvalAdmin:p+"admin/approval",authList:p+"auth/list",getMenuWithAuth:p+"auth/get/menu",setMenuWithAuth:p+"auth/set/menu",createAuth:p+"auth/create",deleteAuth:p+"auth/delete",promotionList:p+"promotion/get/list",createPromotion:p+"promotion/create",detailPromotion:p+"promotion/get/detail",updatePromotion:p+"promotion/update",closePromotion:p+"promotion/set/end",promotionDoitList:p+"promotion/get/doit/list",promotionProceedList:p+"promotion/get/proceed/list",setDoitPromotion:p+"promotion/set/doit",cancelDoitPromotion:p+"promotion/set/release"},b=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}),g="/v2/gift",y="/v2/gift/update/";function f(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}const h=("/",window.location.pathname.split("/").reverse()[0]);$((()=>{!function(){const e={idx:h};var t,a;(!0,t=u.detailGift,a=JSON.stringify(e),new Promise(((e,i)=>{$.ajax({global:true,url:t,type:"POST",headers:m,contentType:"text/plain",dataType:"json",data:a,success:function(t){e(t)},error:function(e,t,a){i(a)},complete:function(e,t){}})}))).then((async function(e,t,a){var i;!function(e){return 0===function(e){return e.status}(e)}(e)?(i=function(e){return e.msg}(e),b.fire({icon:"info",title:i})):function(e){const{gift_uuid:t,gift_name:a,gift_ucd:i,gift_image_url:m,end_date:p,is_exposure:u,goods_code:b}=e.data;var g;c.text(f(b)?"일반상품":"기프티콘"),s.text(t),l.text(a),r.text(`${g=i,f(g)||isNaN(g)?0:g.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")} UCD`),o.attr("src",m),d.text(f(b)?"-":p),n.text(u),$("img").on("error",(function(){$(this).attr("src","/assets/v2/img/no-image.jpg")}))}(e)})).catch((e=>("상세 내용을(를) 불러올 수 없습니다.",void Swal.fire({icon:"error",html:"상세 내용을(를) 불러올 수 없습니다."}))))}(),i.on("click",(function(){history.back()})),a.on("click",(function(){location.href=g})),t.on("click",(function(){location.href=y+h}))}))})();