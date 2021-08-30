(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword"),$("#btnSearch"),$("#btnReset"),$("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate")),i=($("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList")),a=$("#btnBack"),o=($("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable"),$("#dataTable_paginate"),$("#totalCount"),$("#thumbnail")),n=($("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content")),r=($("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo")),s=($(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close")),l=$(".modal-content"),d=$(".modal-bg"),c=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle")),m=$("#attachmentWrap"),p=$("#answerEl"),u=$("#memoEl"),b=$("#admin"),g=$("#answerDate"),y=($("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname")),f=($("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))}),h=`${api_server_url}/v3/`,T={saveUserUcdFromXlsx:h+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:h+"ucd/set/charge/user/system",saveUserUcdByBiz:h+"ucd/set/charge/user/company",saveDoitUcdBySystem:h+"ucd/set/charge/doit/system",saveDoitUcdByBiz:h+"ucd/set/charge/doit/company",saveBizUcd:h+"ucd/set/charge/company/system",dashboardSummary:h+"main/dashboard",dashboardSummaryList:h+"main/dashboard/get/list",dashboardMoreLeader:h+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:h+"main/dashboard/get/doitRanklist",getProfile:h+"admin/get",updatePassword:h+"admin/update/pwd",memberList:h+"profile/get/list",detailMember:h+"profile/get/detail/info",levelUp:h+"profile/set/levelUp",levelDown:h+"profile/set/levelDown",cancelPartner:h+"profile/set/releasePartner",levelInfo:h+"profile/get/level",levelHistory:h+"profile/get/level/history",deviceInfo:h+"profile/get/device/info",memberDoitList:h+"profile/get/doit",memberCategoryList:h+"profile/get/category",memberActionList:h+"profile/get/action",memberActionDetail:h+"profile/get/detail/action",countPerLevel:h+"level/get/count",memberLevelList:h+"level/get/list",unlinkMemberList:h+"profile/get/unlink",changedMemberList:h+"profile/get/changed",badgeList:h+"badge/get/list",createBadge:h+"badge/create",detailBadge:h+"badge/get/detail/info",deleteBadge:h+"badge/delete",updateBadge:h+"badge/update",categoryList:h+"category/list",createCategory:h+"category/create",detailCategory:h+"category/detail",reorderCategory:h+"category/update/sequence",deleteCategory:h+"category/delete",updateCategory:h+"category/update",subCategoryList:h+"subcategory/list",createSubCategory:h+"subcategory/create",updateSubCategoryDoitImg:h+"subcategory/set/doit/image",deleteSubCategory:h+"subcategory/delete",reorderSubCategory:h+"subcategory/update/sequence",editSubCategory:h+"subcategory/update",keywordList:h+"keyword/get/list",createKeyword:h+"keyword/create",updateKeyword:h+"keyword/update",doitSponsorList:h+"doit/get/company",doitList:h+"doit/list",doitSetRecommend:h+"doit/set/recommend",createDoit:h+"doit/create",createDoitCategoryList:h+"category/exposure/list",detailDoit:h+"doit/detail",updateDoit:h+"doit/update",deleteDoit:h+"doit/delete",openDoit:h+"doit/set/open",stopDoit:h+"doit/set/stop",getDoitUcd:h+"ucd/get/doit",getUcdDoitList:h+"ucd/get/doit/list",missionList:h+"mission/get/list",createMission:h+"mission/create",detailMission:h+"mission/get/detail/info",updateMission:h+"mission/update",deleteMission:h+"mission/delete",joinMemberList:h+"member/get/list",infoJoinMember:h+"member/get/profile",rewardMemberList:h+"ucd/get/reward/profile",createReward:h+"ucd/set/reward/profile",countMember:h+"member/get/count",blockMember:h+"member/set/retire/ban",banMember:h+"member/set/retire",applyMemberList:h+"member/get/applylist",approvalMember:h+"member/get/applyConfirm",rejectMember:h+"member/get/applyReject",blockMemberList:h+"member/get/retire/ban/list",cancelBlockMember:h+"member/set/retire/ban/cancel",actionList:h+"action/get/list",detailAction:h+"action/get/detail/info",sendWarning:h+"action/set/yellow",cancelWarning:h+"action/set/yellowCancel",actionCommentList:h+"action/get/commentList",createActionComment:h+"action/set/insertComment",deleteActionComment:h+"action/set/deleteComment",actionReplyList:h+"action/get/comment/child/list",talkList:h+"board/get/list",createTalk:h+"board/create",detailTalk:h+"board/get/detail/info",updateTalk:h+"board/update",deleteTalk:h+"board/delete",talkCommentList:h+"board/get/commentList",createTalkComment:h+"board/set/insertComment",deleteTalkComment:h+"board/set/deleteComment",talkReplyList:h+"board/get/comment/child/list",pickList:h+"recommend/list",previewList:h+"recommend/get/doit",searchDoitList:h+"recommend/get/doit/list",reorderPick:h+"recommend/set",createPick:h+"recommend/create",updatePick:h+"recommend/update",detailPick:h+"recommend/detail",bizList:h+"biz/get/list",createBiz:h+"biz/create",detailBiz:h+"biz/get/detail/info",bizDoitList:h+"biz/get/detail/doit",bizUcdList:h+"ucd/list/get/company",updateBiz:h+"biz/update",getBizUcd:h+"ucd/get/company",noticeList:h+"notice/get/list",createNotice:h+"notice/create",detailNotice:h+"notice/get/detail/info",updateNotice:h+"notice/update",deleteNotice:h+"notice/delete",faqType:h+"faq/get/type",faqList:h+"faq/get/list",createFaq:h+"faq/create",detailFaq:h+"faq/get/detail/info",updateFaq:h+"faq/update",deleteFaq:h+"faq/delete",reorderFaq:h+"faq/set/orders",inquiryList:h+"qna/get/list",updateInquiry:h+"qna/set/insertComment",detailInquiry:h+"qna/get/detail/info",deleteInquiry:h+"qna/delete",reportActionList:h+"report/get/action/list",actionReportReasonList:h+"report/get/action/descriptionList",reportTalkList:h+"report/get/board/list",talkReportReasonList:h+"report/get/board/descriptionList",blindTalk:h+"report/set/blind",bannerList:h+"banner/get/list",createBanner:h+"banner/create",detailBanner:h+"banner/get/detail/info",updateBanner:h+"banner/update",reorderBanner:h+"banner/set/orders",targetEventList:h+"banner/get/event/list",targetDoitList:h+"banner/get/doit/list",targetNoticeList:h+"banner/get/notice/list",storyList:h+"story/get/list",createStory:h+"story/create",detailStory:h+"story/get/detail/info",updateStory:h+"story/update",reorderStory:h+"story/set/orders",eventList:h+"event/get/list",createEvent:h+"event/create",detailEvent:h+"event/get/detail/info",deleteEvent:h+"event/delete",updateEvent:h+"event/update",customEvent:h+"event/popup/get/list",customEventProfile:h+"event/popup/get/profile",pushList:h+"push/list",cancelPush:h+"push/set/cancel",createPush:h+"push/create",pushTargetNotice:h+"push/get/notice",pushTargetEvent:h+"push/get/event",pushTargetDoit:h+"push/get/doit",pushTargetMember:h+"push/get/profile",pushTargetMemberFromXlsx:h+"excel/import/notification/profile",popupList:h+"popup/get/list",createPopup:h+"popup/create",detailPopup:h+"popup/get/detail/info",updatePopup:h+"popup/update",deletePopup:h+"popup/delete",errorList:h+"error/list",updateError:h+"error/update",createEncryption:h+"operate/set/encryption",createDecryption:h+"operate/set/decryption",versionList:h+"operate/get/version/list",createVersion:h+"operate/version/create",deleteVersion:h+"operate/version/delete",logList:h+"log/get/list",getMemberForSaveUcd:h+"ucd/get/user/list",getMemberFromXlsx:h+"excel/import/profile",getDoitFromXlsx:h+"excel/import/doit",ucdChargeList:h+"ucd/list/get/charge",systemWalletType:h+"ucd/get/system/type",systemWalletList:h+"ucd/list/get/system",doitWalletList:h+"ucd/list/get/doit",memberWalletList:h+"ucd/list/get/user",pendingWalletList:h+"ucd/list/get/transfer",giftList:h+"gift/get/list",reorderGiftList:h+"gift/get/orderList",reorderGift:h+"gift/set/orders",createGift:h+"gift/create",ktGoodsList:h+"gift/get/kt/goods",detailGift:h+"gift/get/detail/info",updateGift:h+"gift/update",applyGiftList:h+"exchange/get/list",sendGifticon:h+"exchange/set/confirm",sendGeneralGift:h+"exchange/set/send",rejectGift:h+"exchange/set/reject",resendGift:h+"exchange/set/resend",getGiftBalance:h+"exchange/get/money",sendGiftList:h+"exchange/get/sendList",sendGiftStatusList:h+"exchange/get/payment",updateGiftSendMemo:h+"exchange/set/insertMemo",adminList:h+"admin/list",detailAdmin:h+"admin/detail",updateAdmin:h+"admin/update",deleteAdmin:h+"admin/delete",authBizList:h+"auth/get/biz/list",approvalAdmin:h+"admin/approval",authList:h+"auth/list",getMenuWithAuth:h+"auth/get/menu",setMenuWithAuth:h+"auth/set/menu",createAuth:h+"auth/create",deleteAuth:h+"auth/delete",promotionList:h+"promotion/get/list",createPromotion:h+"promotion/create",detailPromotion:h+"promotion/get/detail",updatePromotion:h+"promotion/update",closePromotion:h+"promotion/set/end",promotionDoitList:h+"promotion/get/doit/list",promotionProceedList:h+"promotion/get/proceed/list",setDoitPromotion:h+"promotion/set/doit",cancelDoitPromotion:h+"promotion/set/release"},k=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}),v="/v2/member/detail",L="/v2/service/inquiry",D="/v2/service/inquiry/update/";function S(){l.fadeOut(),d.fadeOut(),$("body").css("overflow-y","auto")}function C(){$("img").on("error",(function(){$(this).attr("src","/assets/v2/img/no-image.jpg")}))}function M(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}const w=("/",window.location.pathname.split("/").reverse()[0]);let U;$((()=>{!function(){const e={idx:w};var t,i;(!0,t=T.detailInquiry,i=JSON.stringify(e),new Promise(((e,a)=>{$.ajax({global:true,url:t,type:"POST",headers:f,contentType:"text/plain",dataType:"json",data:i,success:function(t){e(t)},error:function(e,t,i){a(i)},complete:function(e,t){}})}))).then((async function(e,t,i){var a;!function(e){return 0===function(e){return e.status}(e)}(e)?(a=invalidResp(e),k.fire({icon:"info",title:a})):function(e){const{qna_uuid:t,app_version:i,os_version:a,device:s,nickname:f,profile_uuid:h,title:T,contents:k,userid:L,answer:D,answered:S,memo:w}=e.data;U=t,y.html(M(h)?`${f}(비회원)`:`<a style="text-decoration: underline;" data-uuid="${h}">${f}</a>`),r.text(`앱버전: ${i}, os버전: ${a} , 기기: ${s}`),c.text(T),n.text(k),m.html(function(e){const{contents_url:t,attach_count:i}=e.data;let a="";return Number(i)&&t.length>0?t.map((e=>a+=`<div class="img-wrap"><img src="${e}" alt="" class="view-attach"></div>`)):a="-",a}(e)),p.text(D),u.text(M(w)?"-":w),b.text(L),g.text(S),C(),$(".view-attach").on("click",(function(){l.fadeIn(),d.fadeIn(),$("body").css("overflow-y","hidden"),o.attr("src",$(this).prop("src")),C()})),y.find("a").on("click",(function(){!function(e){let t=$("<form></form>");t.prop("method","post"),t.prop("action",v),t.append($("<input/>",{type:"hidden",name:"is_store",value:!0})),t.append($("<input/>",{type:"hidden",name:"profile_uuid",value:e})),t.appendTo("body"),t.trigger("submit")}($(this).data("uuid"))}))}(e)})).catch((e=>("상세 내용을(를) 불러올 수 없습니다.",void Swal.fire({icon:"error",html:"상세 내용을(를) 불러올 수 없습니다."}))))}(),s.on("click",(function(){S()})),d.on("click",(function(){S()})),a.on("click",(function(){history.back()})),i.on("click",(function(){location.href=L})),t.on("click",(function(){location.href=D+w}))}))})();