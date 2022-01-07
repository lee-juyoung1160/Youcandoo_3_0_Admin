(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType")),n=($("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),o=$("#btnSearch"),r=$("#btnReset"),s=($("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),l=($("#selSort"),$("#dataTable")),d=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$("#selStartHour"),$("#selStartMinute"),$("#selEndHour"),$("#selEndMinute"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#selUpdateStartHour"),$("#selUpdateStartMinute"),$("#selUpdateEndHour"),$("#selUpdateEndMinute"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval")),c=($("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#modalMemo"),$("#searchTab li"),$("#ongoingRankTable"),$("#totalRankTable"),$("#btnRefreshTotalRank"),$("#btnRefreshOngoingRank"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#btnReward"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#modalReward"),$("#rewardTable"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selSearchTypeInAction"),$("#keywordInAction"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("input[name=radio-comment-attach-type]"),$("#commentAttachmentWrap"),$("#btnCommentEmoji"),$("#commentEmojiWrap"),$("#commentEmojiCategory"),$("#previewEmoji"),$("#btnCancelCommentEmoji"),$("input[name=radio-action-attach-type]"),$("#actionAttachmentWrap"),$("#btnActionEmoji"),$("#actionEmojiWrap"),$("#actionEmojiCategory"),$("#previewActionEmoji"),$("#btnCancelActionEmoji"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("input[name=chk-special-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("input[name=chk-notice-type]"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("input[name=chk-update-special-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#baseDateWrap"),$("#btnSearchNickname"),$("#btnSearchTarget"),$("#modalSearchMember"),$("#targetTable"),$("#searchTable"),$("#addedTable"),$("#selWeekly"),$("#dateRange"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#selVocType"),$("#selVocTypeDetail"),$("#selRiskGrade"),$("#vocType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#isDel"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#customEvent"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType")),m=($("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#leaveDate"),$("#loginDate"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))});function p(e,t,a){return new Promise(((i,n)=>{$.ajax({global:e,url:t,type:"POST",headers:m,contentType:"text/plain",dataType:"json",data:a,success:function(e){i(e)},error:function(e,t,a){n(a)},complete:function(e,t){}})}))}function u(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function g(e){return 0===function(e){return e.status}(e)}function b(e){return e.msg}const h=`${api_server_url}/v3/`,f={saveUserUcdFromXlsx:h+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:h+"ucd/set/charge/user/system",saveUserUcdByBiz:h+"ucd/set/charge/user/company",saveDoitUcdFromXlsx:h+"ucd/set/charge/doit/system/excel",saveDoitUcdBySystem:h+"ucd/set/charge/doit/system",saveDoitUcdByBiz:h+"ucd/set/charge/doit/company",saveBizUcd:h+"ucd/set/charge/company/system",dashboardSummary:h+"main/dashboard",dashboardSummaryList:h+"main/dashboard/get/list",dashboardMoreLeader:h+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:h+"main/dashboard/get/doitRanklist",getProfile:h+"admin/get",updatePassword:h+"admin/update/pwd",memberList:h+"profile/get/list",detailMember:h+"profile/get/detail/info",levelUp:h+"profile/set/levelUp",levelDown:h+"profile/set/levelDown",cancelPartner:h+"profile/set/releasePartner",levelInfo:h+"profile/get/level",levelHistory:h+"profile/get/level/history",deviceInfo:h+"profile/get/device/info",memberDoitList:h+"profile/get/doit",memberCategoryList:h+"profile/get/category",memberActionList:h+"profile/get/action",memberActionDetail:h+"profile/get/detail/action",countPerLevel:h+"level/get/count",memberLevelList:h+"level/get/list",unlinkMemberList:h+"profile/get/unlink",changedMemberList:h+"profile/get/changed",badgeList:h+"badge/get/list",createBadge:h+"badge/create",detailBadge:h+"badge/get/detail/info",deleteBadge:h+"badge/delete",updateBadge:h+"badge/update",categoryList:h+"category/list",createCategory:h+"category/create",detailCategory:h+"category/detail",reorderCategory:h+"category/update/sequence",deleteCategory:h+"category/delete",updateCategory:h+"category/update",subCategoryList:h+"subcategory/list",createSubCategory:h+"subcategory/create",updateSubCategoryDoitImg:h+"subcategory/set/doit/image",deleteSubCategory:h+"subcategory/delete",reorderSubCategory:h+"subcategory/update/sequence",editSubCategory:h+"subcategory/update",keywordList:h+"keyword/get/list",createKeyword:h+"keyword/create",updateKeyword:h+"keyword/update",doitSponsorList:h+"doit/get/company",doitList:h+"doit/list",doitSetRecommend:h+"doit/set/recommend",createDoit:h+"doit/create",createDoitCategoryList:h+"category/exposure/list",detailDoit:h+"doit/detail",updateDoit:h+"doit/update",deleteDoit:h+"doit/delete",openDoit:h+"doit/set/open",stopDoit:h+"doit/set/stop",getDoitUcd:h+"ucd/get/doit",getUcdDoitList:h+"ucd/get/doit/list",getDoitRewardList:h+"ucd/get/reward/doit",missionList:h+"mission/get/list",createMission:h+"mission/create",detailMission:h+"mission/get/detail/info",updateMission:h+"mission/update",deleteMission:h+"mission/delete",joinMemberList:h+"member/get/list",infoJoinMember:h+"member/get/profile",rewardMemberList:h+"ucd/get/reward/list",createReward:h+"ucd/set/reward/profile/condition",countMember:h+"member/get/count",blockMember:h+"member/set/retire/ban",banMember:h+"member/set/retire",applyMemberList:h+"member/get/applylist",approvalMember:h+"member/get/applyConfirm",rejectMember:h+"member/get/applyReject",blockMemberList:h+"member/get/retire/ban/list",cancelBlockMember:h+"member/set/retire/ban/cancel",createBlockMemo:h+"member/set/retire/ban/memo",rankMember:h+"doit/get/member/rank",actionList:h+"action/get/list",detailAction:h+"action/get/detail/info",sendWarning:h+"action/set/yellow",cancelWarning:h+"action/set/yellowCancel",actionCommentList:h+"action/get/commentList",createActionComment:h+"action/set/insertComment",deleteActionComment:h+"action/set/deleteComment",actionReplyList:h+"action/get/comment/child/list",talkList:h+"board/get/list",createTalk:h+"board/create",detailTalk:h+"board/get/detail/info",updateTalk:h+"board/update",deleteTalk:h+"board/delete",talkCommentList:h+"board/get/commentList",createTalkComment:h+"board/set/insertComment",deleteTalkComment:h+"board/set/deleteComment",talkReplyList:h+"board/get/comment/child/list",emojiList:h+"emoticon/get",pickList:h+"recommend/list",previewList:h+"recommend/get/doit",searchDoitList:h+"recommend/get/doit/list",reorderPick:h+"recommend/set",createPick:h+"recommend/create",updatePick:h+"recommend/update",detailPick:h+"recommend/detail",getWeek:h+"doit/rank/get/week",rankList:h+"doit/rank/get/list",createRank:h+"doit/rank/set",targetRankList:h+"doit/rank/popup/get",copyRank:h+"doit/rank/set/copy",bizList:h+"biz/get/list",createBiz:h+"biz/create",detailBiz:h+"biz/get/detail/info",bizDoitList:h+"biz/get/detail/doit",bizUcdList:h+"ucd/list/get/company",updateBiz:h+"biz/update",getBizUcd:h+"ucd/get/company",noticeList:h+"notice/get/list",createNotice:h+"notice/create",detailNotice:h+"notice/get/detail/info",updateNotice:h+"notice/update",deleteNotice:h+"notice/delete",faqType:h+"faq/get/type",faqList:h+"faq/get/list",createFaq:h+"faq/create",detailFaq:h+"faq/get/detail/info",updateFaq:h+"faq/update",deleteFaq:h+"faq/delete",reorderFaq:h+"faq/set/orders",inquiryList:h+"qna/get/list",updateInquiry:h+"qna/set/insertComment",detailInquiry:h+"qna/get/detail/info",deleteInquiry:h+"qna/delete",xlsxOutInquiry:h+"excel/export/qna",reportActionList:h+"report/get/action/list",actionReportReasonList:h+"report/get/action/descriptionList",reportTalkList:h+"report/get/board/list",talkReportReasonList:h+"report/get/board/descriptionList",blindTalk:h+"report/set/blind",bannerList:h+"banner/get/list",createBanner:h+"banner/create",detailBanner:h+"banner/get/detail/info",updateBanner:h+"banner/update",reorderBanner:h+"banner/set/orders",targetEventList:h+"banner/get/event/list",targetDoitList:h+"banner/get/doit/list",targetNoticeList:h+"banner/get/notice/list",storyList:h+"story/get/list",createStory:h+"story/create",detailStory:h+"story/get/detail/info",updateStory:h+"story/update",reorderStory:h+"story/set/orders",eventList:h+"event/get/list",createEvent:h+"event/create",detailEvent:h+"event/get/detail/info",deleteEvent:h+"event/delete",updateEvent:h+"event/update",customEvent:h+"event/popup/get/list",customEventProfile:h+"event/popup/get/profile",createCustomEvent:h+"event/popup/set",pushList:h+"push/list",cancelPush:h+"push/set/cancel",createPush:h+"push/create",pushTargetNotice:h+"push/get/notice",pushTargetEvent:h+"push/get/event",pushTargetDoit:h+"push/get/doit",pushTargetMember:h+"push/get/profile",pushTargetMemberFromXlsx:h+"excel/import/notification/profile",popupList:h+"popup/get/list",createPopup:h+"popup/create",detailPopup:h+"popup/get/detail/info",updatePopup:h+"popup/update",deletePopup:h+"popup/delete",inviteList:h+"invite/list",errorList:h+"error/list",updateError:h+"error/update",createEncryption:h+"operate/set/encryption",createDecryption:h+"operate/set/decryption",versionList:h+"operate/get/version/list",createVersion:h+"operate/version/create",deleteVersion:h+"operate/version/delete",logList:h+"log/get/list",getMemberForSaveUcd:h+"ucd/get/user/list",getMemberFromXlsx:h+"excel/import/profile",getDoitFromXlsx:h+"excel/import/doit",ucdChargeList:h+"ucd/list/get/charge",systemWalletType:h+"ucd/get/system/type",systemWalletList:h+"ucd/list/get/system",doitWalletList:h+"ucd/list/get/doit",memberWalletList:h+"ucd/list/get/user",pendingWalletList:h+"ucd/list/get/transfer",giftList:h+"gift/get/list",reorderGiftList:h+"gift/get/orderList",reorderGift:h+"gift/set/orders",createGift:h+"gift/create",ktGoodsList:h+"gift/get/kt/goods",detailGift:h+"gift/get/detail/info",updateGift:h+"gift/update",applyGiftList:h+"exchange/get/list",sendGifticon:h+"exchange/set/confirm",sendGeneralGift:h+"exchange/set/send",rejectGift:h+"exchange/set/reject",resendGift:h+"exchange/set/resend",getGiftBalance:h+"exchange/get/money",sendGiftList:h+"exchange/get/sendList",sendGiftStatusList:h+"exchange/get/payment",updateGiftSendMemo:h+"exchange/set/insertMemo",adminList:h+"admin/list",detailAdmin:h+"admin/detail",updateAdmin:h+"admin/update",deleteAdmin:h+"admin/delete",authBizList:h+"auth/get/biz/list",approvalAdmin:h+"admin/approval",authList:h+"auth/list",getMenuWithAuth:h+"auth/get/menu",setMenuWithAuth:h+"auth/set/menu",createAuth:h+"auth/create",deleteAuth:h+"auth/delete",promotionList:h+"promotion/get/list",createPromotion:h+"promotion/create",detailPromotion:h+"promotion/get/detail",updatePromotion:h+"promotion/update",closePromotion:h+"promotion/set/end",promotionDoitList:h+"promotion/get/doit/list",promotionProceedList:h+"promotion/get/proceed/list",setDoitPromotion:h+"promotion/set/doit",cancelDoitPromotion:h+"promotion/set/release"},y=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function T(e){y.fire({icon:"info",title:e})}function k(e){Swal.fire({icon:"error",html:e})}const v="목록이 없습니다.";function L(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function D(){return window.location.pathname}let S,w=1;function C(){t.each((function(){$(this).children().eq(0).prop("selected",!0)})),n.val("")}function M(){w=1;let e=l.DataTable();e.page.len(Number(s.val())),e.ajax.reload()}function x(){const e=U(),t=$(e).children().eq(0).find("select"),i={userid:A().userid,app_user:a.val(),auth_code:$(t).val()};if("biz"===$(t).val()){const t=$(e).children().eq(1).find("select");i.company_idx=$(t).val()}p(!0,f.approvalAdmin,JSON.stringify(i)).then((async function(e,t,a){await function(e,t){Swal.fire({toast:!0,position:"center",icon:g(e)?"success":"error",title:u(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&g(e)&&t()}))}(e,M)})).catch((e=>k("관리자 승인 처리 중, 오류가 발생했습니다.")))}function A(){return l.DataTable().rows(".selected").data()[0]}function U(){return $("#dataTable tbody").children(".selected")}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:v,zeroRecords:v,processing:"검색 중..",paginate:{previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>'}}}),s.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),p(!1,f.authList,null).then((async function(e,t,a){g(e)?(await function(e){let t='<option value="all">전체</option>';!L(e.data)&&e.data.length>0&&e.data.map((e=>{const{code:a,name:i}=e;t+=`<option value="${a}">${i}</option>`})),c.html(t)}(e),await function(){const e=window.performance.getEntriesByType("navigation")[0],t=L(e)?window.performance.navigation.type:e.type;let a=!1;return"back_forward"!==t&&2!==t||sessionStorage.getItem("page")===D()&&(a=!0),a}()?function(){let e=JSON.parse(sessionStorage.getItem("param"));i.val(e.search_type),n.val(e.keyword),c.val(e.auth_code),s.val(e.limit),w=e.page}():C(),await void l.DataTable({ajax:{url:f.adminList,type:"POST",headers:m,dataFilter:function(e){let t=JSON.parse(e);return g(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],T(b(t))),JSON.stringify(t)},data:function(e){return function(){const e={search_type:i.val(),keyword:n.val().trim(),auth_code:c.val(),page:w,limit:s.val()};return function(e){e=L(e)?"":JSON.stringify(e),sessionStorage.setItem("param",e),sessionStorage.setItem("page",D())}(e),JSON.stringify(e)}()},error:function(e,t){k("목록을(를) 불러올 수 없습니다.")}},columns:[{title:"권한",data:"auth_name",width:"10%",render:function(e,t,a,i){return"승인"===a.status?e:function(){const e=c.children();let t='<select class="select-box">';return e.each((function(e){0!==e&&(t+=`<option value="${$(this).val()}">${$(this).text()}</option>`)})),t+="</select>",t}()}},{title:"기업명",data:"company_name",width:"10%",render:function(e,t,a,i){return"승인"===a.status?L(e)?"-":e:"-"}},{title:"이름",data:"name",width:"10%",render:function(e,t,a,i){return`<a href="/v2/admin/detail/${a.idx}">${e}</a>`}},{title:"이메일",data:"email",width:"20%"},{title:"최근 접속",data:"recent_datetime",width:"15%"},{title:"승인여부",data:"status",width:"10%"},{title:"사용여부",data:"is_active",width:"10%"},{title:"",data:"idx",width:"5%",render:function(e,t,a,i){return`<div class="checkbox-wrap"><input type="checkbox" name="chk-row" id="${n=i.row}"/><label for="${n}"><span></span></label></div>`;var n}}],serverSide:!0,paging:!0,pageLength:Number(s.val()),select:{style:"single",selector:":checkbox"},destroy:!0,initComplete:function(){var e;$(this).on("page.dt",(function(){w=function(e){let t=$(e).DataTable().page.info();return t.start/t.length+1}(this)})),e=w,$(this).DataTable().page(e-1).draw("page")},fnRowCallback:function(e,t){"승인"===t.status?$(e).children().eq(7).find("input").prop("disabled",!0):$(e).children().eq(0).find("select").off().on("change",(function(){S=$(this).closest("tr").children().eq(1),"biz"===$(this).val()?p(!1,f.authBizList,null).then((async function(e,t,a){g(e)?function(e){if(!L(e.data)&&e.data.length>0){let t='<select class="select-box">';e.data.map((e=>{const{idx:a,nickname:i}=e;t+=`<option value="${a}">${i}</option>`})),t+="</select>",S.html(t)}}(e):T(b(e))})).catch((e=>k("기업 목록을을(를) 불러올 수 없습니다."))):S.empty()}))},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=L(i=function(e){return e.DataTable().page.info().recordsTotal}(e))||isNaN(i)?0:i.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");var i;$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}})):T(b(e))})).catch((e=>k("권한 목록을을(를) 불러올 수 없습니다."))),e.on("keydown",(function(e){!function(e){13===e.keyCode&&M()}(e)})),s.on("change",(function(){M()})),o.on("click",(function(){M()})),r.on("click",(function(){C()})),d.on("click",(function(){var e;(function(){if(L(A()))return T("대상을 선택해주세요."),!1;const e=U(),t=$(e).children().eq(0).find("select");if(L($(t).val()))return T("권한을 선택해주세요."),$(t).trigger("focus"),!1;const a=$(e).children().eq(1).find("select");return"biz"!==$(t).val()||!L($(a).val())||(T("기업명을 선택해주세요."),$(a).trigger("focus"),!1)})()&&("승인하시겠습니까?",e=x,Swal.fire({text:"승인하시겠습니까?",showCancelButton:!0,confirmButtonText:"확인",cancelButtonText:"취소"}).then((t=>{t.value&&e()})))}))}))})();