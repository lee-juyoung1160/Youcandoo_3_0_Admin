(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),o=$(".datepicker"),n=$(".date-from"),r=$(".date-to"),s=($("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),l=$("#btnSearch"),d=$("#btnReset"),c=$("#btnSubmit"),m=$("#btnCancel"),p=($("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable")),u=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname")),g=($("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable")),b=($("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))});function f(e){return 0===function(e){return e.status}(e)}function y(e){return e.msg}const h=`${api_server_url}/v3/`,T={saveUserUcdFromXlsx:h+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:h+"ucd/set/charge/user/system",saveUserUcdByBiz:h+"ucd/set/charge/user/company",saveDoitUcdBySystem:h+"ucd/set/charge/doit/system",saveDoitUcdByBiz:h+"ucd/set/charge/doit/company",saveBizUcd:h+"ucd/set/charge/company/system",dashboardSummary:h+"main/dashboard",dashboardSummaryList:h+"main/dashboard/get/list",dashboardMoreLeader:h+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:h+"main/dashboard/get/doitRanklist",getProfile:h+"admin/get",updatePassword:h+"admin/update/pwd",memberList:h+"profile/get/list",detailMember:h+"profile/get/detail/info",levelUp:h+"profile/set/levelUp",levelDown:h+"profile/set/levelDown",cancelPartner:h+"profile/set/releasePartner",levelInfo:h+"profile/get/level",levelHistory:h+"profile/get/level/history",deviceInfo:h+"profile/get/device/info",memberDoitList:h+"profile/get/doit",memberCategoryList:h+"profile/get/category",memberActionList:h+"profile/get/action",memberActionDetail:h+"profile/get/detail/action",countPerLevel:h+"level/get/count",memberLevelList:h+"level/get/list",unlinkMemberList:h+"profile/get/unlink",changedMemberList:h+"profile/get/changed",badgeList:h+"badge/get/list",createBadge:h+"badge/create",detailBadge:h+"badge/get/detail/info",deleteBadge:h+"badge/delete",updateBadge:h+"badge/update",categoryList:h+"category/list",createCategory:h+"category/create",detailCategory:h+"category/detail",reorderCategory:h+"category/update/sequence",deleteCategory:h+"category/delete",updateCategory:h+"category/update",subCategoryList:h+"subcategory/list",createSubCategory:h+"subcategory/create",updateSubCategoryDoitImg:h+"subcategory/set/doit/image",deleteSubCategory:h+"subcategory/delete",reorderSubCategory:h+"subcategory/update/sequence",editSubCategory:h+"subcategory/update",keywordList:h+"keyword/get/list",createKeyword:h+"keyword/create",updateKeyword:h+"keyword/update",doitSponsorList:h+"doit/get/company",doitList:h+"doit/list",doitSetRecommend:h+"doit/set/recommend",createDoit:h+"doit/create",createDoitCategoryList:h+"category/exposure/list",detailDoit:h+"doit/detail",updateDoit:h+"doit/update",deleteDoit:h+"doit/delete",openDoit:h+"doit/set/open",stopDoit:h+"doit/set/stop",getDoitUcd:h+"ucd/get/doit",getUcdDoitList:h+"ucd/get/doit/list",missionList:h+"mission/get/list",createMission:h+"mission/create",detailMission:h+"mission/get/detail/info",updateMission:h+"mission/update",deleteMission:h+"mission/delete",joinMemberList:h+"member/get/list",infoJoinMember:h+"member/get/profile",rewardMemberList:h+"ucd/get/reward/profile",createReward:h+"ucd/set/reward/profile",countMember:h+"member/get/count",blockMember:h+"member/set/retire/ban",banMember:h+"member/set/retire",applyMemberList:h+"member/get/applylist",approvalMember:h+"member/get/applyConfirm",rejectMember:h+"member/get/applyReject",blockMemberList:h+"member/get/retire/ban/list",cancelBlockMember:h+"member/set/retire/ban/cancel",actionList:h+"action/get/list",detailAction:h+"action/get/detail/info",sendWarning:h+"action/set/yellow",cancelWarning:h+"action/set/yellowCancel",actionCommentList:h+"action/get/commentList",createActionComment:h+"action/set/insertComment",deleteActionComment:h+"action/set/deleteComment",actionReplyList:h+"action/get/comment/child/list",talkList:h+"board/get/list",createTalk:h+"board/create",detailTalk:h+"board/get/detail/info",updateTalk:h+"board/update",deleteTalk:h+"board/delete",talkCommentList:h+"board/get/commentList",createTalkComment:h+"board/set/insertComment",deleteTalkComment:h+"board/set/deleteComment",talkReplyList:h+"board/get/comment/child/list",pickList:h+"recommend/list",previewList:h+"recommend/get/doit",searchDoitList:h+"recommend/get/doit/list",reorderPick:h+"recommend/set",createPick:h+"recommend/create",updatePick:h+"recommend/update",detailPick:h+"recommend/detail",bizList:h+"biz/get/list",createBiz:h+"biz/create",detailBiz:h+"biz/get/detail/info",bizDoitList:h+"biz/get/detail/doit",bizUcdList:h+"ucd/list/get/company",updateBiz:h+"biz/update",getBizUcd:h+"ucd/get/company",noticeList:h+"notice/get/list",createNotice:h+"notice/create",detailNotice:h+"notice/get/detail/info",updateNotice:h+"notice/update",deleteNotice:h+"notice/delete",faqType:h+"faq/get/type",faqList:h+"faq/get/list",createFaq:h+"faq/create",detailFaq:h+"faq/get/detail/info",updateFaq:h+"faq/update",deleteFaq:h+"faq/delete",reorderFaq:h+"faq/set/orders",inquiryList:h+"qna/get/list",updateInquiry:h+"qna/set/insertComment",detailInquiry:h+"qna/get/detail/info",deleteInquiry:h+"qna/delete",reportActionList:h+"report/get/action/list",actionReportReasonList:h+"report/get/action/descriptionList",reportTalkList:h+"report/get/board/list",talkReportReasonList:h+"report/get/board/descriptionList",blindTalk:h+"report/set/blind",bannerList:h+"banner/get/list",createBanner:h+"banner/create",detailBanner:h+"banner/get/detail/info",updateBanner:h+"banner/update",reorderBanner:h+"banner/set/orders",targetEventList:h+"banner/get/event/list",targetDoitList:h+"banner/get/doit/list",targetNoticeList:h+"banner/get/notice/list",storyList:h+"story/get/list",createStory:h+"story/create",detailStory:h+"story/get/detail/info",updateStory:h+"story/update",reorderStory:h+"story/set/orders",eventList:h+"event/get/list",createEvent:h+"event/create",detailEvent:h+"event/get/detail/info",deleteEvent:h+"event/delete",updateEvent:h+"event/update",customEvent:h+"event/popup/get/list",customEventProfile:h+"event/popup/get/profile",pushList:h+"push/list",cancelPush:h+"push/set/cancel",createPush:h+"push/create",pushTargetNotice:h+"push/get/notice",pushTargetEvent:h+"push/get/event",pushTargetDoit:h+"push/get/doit",pushTargetMember:h+"push/get/profile",pushTargetMemberFromXlsx:h+"excel/import/notification/profile",popupList:h+"popup/get/list",createPopup:h+"popup/create",detailPopup:h+"popup/get/detail/info",updatePopup:h+"popup/update",deletePopup:h+"popup/delete",errorList:h+"error/list",updateError:h+"error/update",createEncryption:h+"operate/set/encryption",createDecryption:h+"operate/set/decryption",versionList:h+"operate/get/version/list",createVersion:h+"operate/version/create",deleteVersion:h+"operate/version/delete",logList:h+"log/get/list",getMemberForSaveUcd:h+"ucd/get/user/list",getMemberFromXlsx:h+"excel/import/profile",getDoitFromXlsx:h+"excel/import/doit",ucdChargeList:h+"ucd/list/get/charge",systemWalletType:h+"ucd/get/system/type",systemWalletList:h+"ucd/list/get/system",doitWalletList:h+"ucd/list/get/doit",memberWalletList:h+"ucd/list/get/user",pendingWalletList:h+"ucd/list/get/transfer",giftList:h+"gift/get/list",reorderGiftList:h+"gift/get/orderList",reorderGift:h+"gift/set/orders",createGift:h+"gift/create",ktGoodsList:h+"gift/get/kt/goods",detailGift:h+"gift/get/detail/info",updateGift:h+"gift/update",applyGiftList:h+"exchange/get/list",sendGifticon:h+"exchange/set/confirm",sendGeneralGift:h+"exchange/set/send",rejectGift:h+"exchange/set/reject",resendGift:h+"exchange/set/resend",getGiftBalance:h+"exchange/get/money",sendGiftList:h+"exchange/get/sendList",sendGiftStatusList:h+"exchange/get/payment",updateGiftSendMemo:h+"exchange/set/insertMemo",adminList:h+"admin/list",detailAdmin:h+"admin/detail",updateAdmin:h+"admin/update",deleteAdmin:h+"admin/delete",authBizList:h+"auth/get/biz/list",approvalAdmin:h+"admin/approval",authList:h+"auth/list",getMenuWithAuth:h+"auth/get/menu",setMenuWithAuth:h+"auth/set/menu",createAuth:h+"auth/create",deleteAuth:h+"auth/delete",promotionList:h+"promotion/get/list",createPromotion:h+"promotion/create",detailPromotion:h+"promotion/get/detail",updatePromotion:h+"promotion/update",closePromotion:h+"promotion/set/end",promotionDoitList:h+"promotion/get/doit/list",promotionProceedList:h+"promotion/get/proceed/list",setDoitPromotion:h+"promotion/set/doit",cancelDoitPromotion:h+"promotion/set/release"},v={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},k=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function D(e){k.fire({icon:"info",title:e})}function L(e){Swal.fire({icon:"error",html:e})}const C="목록이 없습니다.",S="을(를) 불러올 수 없습니다.";function M(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function w(e){return null==(t=e)||t.hasOwnProperty("length")&&0===t.length||t.constructor===Object&&0===Object.keys(t).length||t.constructor===String&&""===t.trim()||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");var t}function A(e){const t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return`${t}-${M(a)}-${M(i)}`}function U(){return A(new Date)}function x(){n.val(function(){const e=new Date;return e.setMonth(e.getMonth()-1),A(e)}()),r.val(U())}function W(){o.datepicker("option","minDate","2020-07-01"),o.datepicker("option","maxDate","+3M")}function P(){i.removeClass("active")}function I(e){const t=$(e).parent().siblings().find(".data-num"),a=w(function(e){return e.DataTable().page.info().recordsTotal}(e));$(t).text(a)}function B(e){$(e).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(e.api().page.info().pages>0)}let N;function F(){P(),W(),x(),t.each((function(){$(this).children().eq(0).prop("selected",!0)})),s.val(""),s.trigger("focus")}function q(){R(),W(),P();let e=p.DataTable();e.page.len(30),e.ajax.reload()}function E(e){N=$(e).data("uuid"),g.DataTable({ajax:{url:T.customEventProfile,type:"POST",headers:b,global:!1,dataFilter:function(e){let t=JSON.parse(e);return f(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],D(y(t))),JSON.stringify(t)},data:function(e){const t={event_uuid:N,nickname:u.val().trim(),page:e.start/e.length+1,limit:e.length};return JSON.stringify(t)},error:function(e,t){L(v.list+S)}},columns:[{title:"닉네임",data:"nickname",width:"35%"},{title:"PID",data:"profile_uuid",width:"45%"},{title:"참여일시",data:"created",width:"20%"}],serverSide:!0,paging:!0,pageLength:30,select:!1,destroy:!0,initComplete:function(){},fnRowCallback:function(e,t){},drawCallback:function(e){I(this),B(this)}})}function R(){u.val("")}function z(){let e=g.DataTable();e.page.len(30),e.ajax.reload()}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:C,zeroRecords:C,processing:"검색 중..",paginate:{previous:v.previous,next:v.next}}}),o.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:v.monthNames,dayNames:v.dayNames,dayNamesMin:v.dayNames}),F(),p.DataTable({ajax:{url:T.customEvent,type:"POST",headers:b,dataFilter:function(e){let t=JSON.parse(e);return f(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count,0===t.count&&(N="",z())):(t.data=[],D(y(t)),N="",z()),JSON.stringify(t)},data:function(e){const t={from_date:n.val(),to_date:r.val(),title:s.val().trim(),page:e.start/e.length+1,limit:e.length};return JSON.stringify(t)},error:function(e,t){L(v.list+S)}},columns:[{title:"제목",data:"title",width:"65%"},{title:"기간",data:"event_uuid",width:"35%",render:function(e,t,a,i){return`${a.start_date} ~ ${a.end_date}`}}],serverSide:!0,paging:!0,pageLength:30,select:{style:"single",selector:"tr",toggleable:!1},destroy:!0,initComplete:function(){},fnRowCallback:function(e,t,a){$(e).attr("data-uuid",t.event_uuid),$(e).off().on("click",(function(){E(this)})),0===a&&(p.DataTable().row(a).select(),E($(e)))},drawCallback:function(e){I(this),B(this)}}),e.on("keydown",(function(e){!function(e){if(13===e.keyCode)switch(e.target.id){case"keyword":q();break;case"nickname":z()}}(e)})),n.on("change",(function(){r.datepicker("option","minDate",new Date(n.datepicker("getDate"))),P()})),r.on("change",(function(){n.datepicker("option","maxDate",new Date(r.datepicker("getDate"))),P()})),l.on("click",(function(){q()})),d.on("click",(function(){F()})),c.on("click",(function(){z()})),m.on("click",(function(){R()})),i.on("click",(function(){var e;e=this,P(),$(e).addClass("active"),$(e).hasClass("today")?o.val(U()):$(e).hasClass("week")?(n.val(function(){const e=new Date;return e.setDate(e.getDate()-6),A(e)}()),r.val(U())):$(e).hasClass("month")?x():$(e).hasClass("months")&&(n.val(function(){const e=new Date;return e.setMonth(e.getMonth()-3),A(e)}()),r.val(U()))}))}))})();