(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader")),a=($("#btnScrollTop"),$("#btnXlsxImport")),i=$("#btnXlsxExport"),n=($(".date-btn .btn"),$(".datepicker")),o=($(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),r=$("#btnSearch"),s=($("#btnReset"),$("#btnSubmit")),l=($("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable")),d=($("#dataTable_paginate"),$("#totalCount")),c=($("#thumbnail"),$("#amount"),$("#nickname")),m=($("#memo"),$("#title"),$("#content")),p=($("#contentImage"),$("#reserveDate")),u=($("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$("#selStartHour"),$("#selStartMinute"),$("#selEndHour"),$("#selEndMinute"),$(".modal-btn"),$(".modal-close")),g=$(".modal-content"),b=$(".modal-bg"),f=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable")),h=($("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#selUpdateStartHour"),$("#selUpdateStartMinute"),$("#selUpdateEndHour"),$("#selUpdateEndMinute"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#searchTab li"),$("#ongoingRankTable"),$("#totalRankTable"),$("#btnRefreshTotalRank"),$("#btnRefreshOngoingRank"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid")),y=($("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#isDel"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]")),v=($("#reserveTime"),$("input[name=radio-target-page-type]")),k=$("#targetPage"),T=($("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]")),D=$("#modalTargetPage"),w=$("#modalTargetMember"),L=$("#btnModalTargetMemberOpen"),S=$("#memberTable"),C=($("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour")),M=$("#selMinute"),x=($("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))});function I(e,t,a){return new Promise(((i,n)=>{$.ajax({global:e,url:t,type:"POST",headers:x,contentType:"text/plain",dataType:"json",data:a,success:function(e){i(e)},error:function(e,t,a){n(a)},complete:function(e,t){}})}))}function U(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function A(e){return 0===function(e){return e.status}(e)}function P(e){return e.msg}const W=`${api_server_url}/v3/`,_={saveUserUcdFromXlsx:W+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:W+"ucd/set/charge/user/system",saveUserUcdByBiz:W+"ucd/set/charge/user/company",saveDoitUcdBySystem:W+"ucd/set/charge/doit/system",saveDoitUcdByBiz:W+"ucd/set/charge/doit/company",saveBizUcd:W+"ucd/set/charge/company/system",dashboardSummary:W+"main/dashboard",dashboardSummaryList:W+"main/dashboard/get/list",dashboardMoreLeader:W+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:W+"main/dashboard/get/doitRanklist",getProfile:W+"admin/get",updatePassword:W+"admin/update/pwd",memberList:W+"profile/get/list",detailMember:W+"profile/get/detail/info",levelUp:W+"profile/set/levelUp",levelDown:W+"profile/set/levelDown",cancelPartner:W+"profile/set/releasePartner",levelInfo:W+"profile/get/level",levelHistory:W+"profile/get/level/history",deviceInfo:W+"profile/get/device/info",memberDoitList:W+"profile/get/doit",memberCategoryList:W+"profile/get/category",memberActionList:W+"profile/get/action",memberActionDetail:W+"profile/get/detail/action",countPerLevel:W+"level/get/count",memberLevelList:W+"level/get/list",unlinkMemberList:W+"profile/get/unlink",changedMemberList:W+"profile/get/changed",badgeList:W+"badge/get/list",createBadge:W+"badge/create",detailBadge:W+"badge/get/detail/info",deleteBadge:W+"badge/delete",updateBadge:W+"badge/update",categoryList:W+"category/list",createCategory:W+"category/create",detailCategory:W+"category/detail",reorderCategory:W+"category/update/sequence",deleteCategory:W+"category/delete",updateCategory:W+"category/update",subCategoryList:W+"subcategory/list",createSubCategory:W+"subcategory/create",updateSubCategoryDoitImg:W+"subcategory/set/doit/image",deleteSubCategory:W+"subcategory/delete",reorderSubCategory:W+"subcategory/update/sequence",editSubCategory:W+"subcategory/update",keywordList:W+"keyword/get/list",createKeyword:W+"keyword/create",updateKeyword:W+"keyword/update",doitSponsorList:W+"doit/get/company",doitList:W+"doit/list",doitSetRecommend:W+"doit/set/recommend",createDoit:W+"doit/create",createDoitCategoryList:W+"category/exposure/list",detailDoit:W+"doit/detail",updateDoit:W+"doit/update",deleteDoit:W+"doit/delete",openDoit:W+"doit/set/open",stopDoit:W+"doit/set/stop",getDoitUcd:W+"ucd/get/doit",getUcdDoitList:W+"ucd/get/doit/list",missionList:W+"mission/get/list",createMission:W+"mission/create",detailMission:W+"mission/get/detail/info",updateMission:W+"mission/update",deleteMission:W+"mission/delete",joinMemberList:W+"member/get/list",infoJoinMember:W+"member/get/profile",rewardMemberList:W+"ucd/get/reward/profile",createReward:W+"ucd/set/reward/profile",countMember:W+"member/get/count",blockMember:W+"member/set/retire/ban",banMember:W+"member/set/retire",applyMemberList:W+"member/get/applylist",approvalMember:W+"member/get/applyConfirm",rejectMember:W+"member/get/applyReject",blockMemberList:W+"member/get/retire/ban/list",cancelBlockMember:W+"member/set/retire/ban/cancel",lankMember:W+"doit/get/member/rank",actionList:W+"action/get/list",detailAction:W+"action/get/detail/info",sendWarning:W+"action/set/yellow",cancelWarning:W+"action/set/yellowCancel",actionCommentList:W+"action/get/commentList",createActionComment:W+"action/set/insertComment",deleteActionComment:W+"action/set/deleteComment",actionReplyList:W+"action/get/comment/child/list",talkList:W+"board/get/list",createTalk:W+"board/create",detailTalk:W+"board/get/detail/info",updateTalk:W+"board/update",deleteTalk:W+"board/delete",talkCommentList:W+"board/get/commentList",createTalkComment:W+"board/set/insertComment",deleteTalkComment:W+"board/set/deleteComment",talkReplyList:W+"board/get/comment/child/list",pickList:W+"recommend/list",previewList:W+"recommend/get/doit",searchDoitList:W+"recommend/get/doit/list",reorderPick:W+"recommend/set",createPick:W+"recommend/create",updatePick:W+"recommend/update",detailPick:W+"recommend/detail",bizList:W+"biz/get/list",createBiz:W+"biz/create",detailBiz:W+"biz/get/detail/info",bizDoitList:W+"biz/get/detail/doit",bizUcdList:W+"ucd/list/get/company",updateBiz:W+"biz/update",getBizUcd:W+"ucd/get/company",noticeList:W+"notice/get/list",createNotice:W+"notice/create",detailNotice:W+"notice/get/detail/info",updateNotice:W+"notice/update",deleteNotice:W+"notice/delete",faqType:W+"faq/get/type",faqList:W+"faq/get/list",createFaq:W+"faq/create",detailFaq:W+"faq/get/detail/info",updateFaq:W+"faq/update",deleteFaq:W+"faq/delete",reorderFaq:W+"faq/set/orders",inquiryList:W+"qna/get/list",updateInquiry:W+"qna/set/insertComment",detailInquiry:W+"qna/get/detail/info",deleteInquiry:W+"qna/delete",reportActionList:W+"report/get/action/list",actionReportReasonList:W+"report/get/action/descriptionList",reportTalkList:W+"report/get/board/list",talkReportReasonList:W+"report/get/board/descriptionList",blindTalk:W+"report/set/blind",bannerList:W+"banner/get/list",createBanner:W+"banner/create",detailBanner:W+"banner/get/detail/info",updateBanner:W+"banner/update",reorderBanner:W+"banner/set/orders",targetEventList:W+"banner/get/event/list",targetDoitList:W+"banner/get/doit/list",targetNoticeList:W+"banner/get/notice/list",storyList:W+"story/get/list",createStory:W+"story/create",detailStory:W+"story/get/detail/info",updateStory:W+"story/update",reorderStory:W+"story/set/orders",eventList:W+"event/get/list",createEvent:W+"event/create",detailEvent:W+"event/get/detail/info",deleteEvent:W+"event/delete",updateEvent:W+"event/update",customEvent:W+"event/popup/get/list",customEventProfile:W+"event/popup/get/profile",pushList:W+"push/list",cancelPush:W+"push/set/cancel",createPush:W+"push/create",pushTargetNotice:W+"push/get/notice",pushTargetEvent:W+"push/get/event",pushTargetDoit:W+"push/get/doit",pushTargetMember:W+"push/get/profile",pushTargetMemberFromXlsx:W+"excel/import/notification/profile",popupList:W+"popup/get/list",createPopup:W+"popup/create",detailPopup:W+"popup/get/detail/info",updatePopup:W+"popup/update",deletePopup:W+"popup/delete",errorList:W+"error/list",updateError:W+"error/update",createEncryption:W+"operate/set/encryption",createDecryption:W+"operate/set/decryption",versionList:W+"operate/get/version/list",createVersion:W+"operate/version/create",deleteVersion:W+"operate/version/delete",logList:W+"log/get/list",getMemberForSaveUcd:W+"ucd/get/user/list",getMemberFromXlsx:W+"excel/import/profile",getDoitFromXlsx:W+"excel/import/doit",ucdChargeList:W+"ucd/list/get/charge",systemWalletType:W+"ucd/get/system/type",systemWalletList:W+"ucd/list/get/system",doitWalletList:W+"ucd/list/get/doit",memberWalletList:W+"ucd/list/get/user",pendingWalletList:W+"ucd/list/get/transfer",giftList:W+"gift/get/list",reorderGiftList:W+"gift/get/orderList",reorderGift:W+"gift/set/orders",createGift:W+"gift/create",ktGoodsList:W+"gift/get/kt/goods",detailGift:W+"gift/get/detail/info",updateGift:W+"gift/update",applyGiftList:W+"exchange/get/list",sendGifticon:W+"exchange/set/confirm",sendGeneralGift:W+"exchange/set/send",rejectGift:W+"exchange/set/reject",resendGift:W+"exchange/set/resend",getGiftBalance:W+"exchange/get/money",sendGiftList:W+"exchange/get/sendList",sendGiftStatusList:W+"exchange/get/payment",updateGiftSendMemo:W+"exchange/set/insertMemo",adminList:W+"admin/list",detailAdmin:W+"admin/detail",updateAdmin:W+"admin/update",deleteAdmin:W+"admin/delete",authBizList:W+"auth/get/biz/list",approvalAdmin:W+"admin/approval",authList:W+"auth/list",getMenuWithAuth:W+"auth/get/menu",setMenuWithAuth:W+"auth/set/menu",createAuth:W+"auth/create",deleteAuth:W+"auth/delete",promotionList:W+"promotion/get/list",createPromotion:W+"promotion/create",detailPromotion:W+"promotion/get/detail",updatePromotion:W+"promotion/update",closePromotion:W+"promotion/set/end",promotionDoitList:W+"promotion/get/doit/list",promotionProceedList:W+"promotion/get/proceed/list",setDoitPromotion:W+"promotion/set/doit",cancelDoitPromotion:W+"promotion/set/release"},N={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},B=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function F(e){B.fire({icon:"info",title:e})}function R(e){Swal.fire({icon:"error",html:e})}const q="목록이 없습니다.",E="을(를) 불러올 수 없습니다.";function j(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function z(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}const O="/v2/marketing/push";function G(){g.fadeOut(),b.fadeOut(),$("body").css("overflow-y","auto")}function X(){$("body").css("overflow-y","hidden")}function J(){return function(e){const t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return`${t}-${j(a)}-${j(i)}`}(new Date)}function K(e){(function(e){const t=$(e).parent().siblings(".detail-img-wrap");t.length>0&&t.remove()})(e),$(e).val(null),$(e).siblings(".upload-name").val("파일선택")}let H={fileName:"sample.xlsx",sheetName:"Sheet1",jsonData:[]};let Y=[],Q=[],V=!0;function Z(){l.DataTable().destroy(),l.empty(),l.DataTable({ajax:{url:te(),type:"POST",global:!1,headers:x,dataFilter:function(e){let t=JSON.parse(e);return A(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],F(P(t))),JSON.stringify(t)},data:function(e){const t={limit:e.length,page:e.start/e.length+1,keyword:o.val().trim()};return JSON.stringify(t)},error:function(e,t){R(N.list+E)}},columns:ee(),serverSide:!0,paging:!0,pageLength:5,select:!1,destroy:!0,initComplete:function(){},fnRowCallback:function(e,t){!function(e,t){let a,i;switch($("input[name=radio-target-page-type]:checked").val()){case"event":case"doit":case"notice":a=t.id,i=t.title}$(e).attr("data-id",a),$(e).attr("data-name",i),$(e).on("click",(function(){k.val($(this).data("name")),h.val($(this).data("id")),G()}))}(e,t)}})}function ee(){switch($("input[name=radio-target-page-type]:checked").val()){case"notice":return[{title:"제목",data:"title",width:"100%"}];case"event":return[{title:"구분",data:"event_type",width:"20%"},{title:"제목",data:"title",width:"80%"}];case"doit":return[{title:"두잇명",data:"title",width:"100%"}]}}function te(){switch($("input[name=radio-target-page-type]:checked").val()){case"notice":return _.pushTargetNotice;case"event":return _.pushTargetEvent;case"doit":return _.pushTargetDoit}}function ae(){if(z(c.val()))return F("닉네임을 입력해주세요."),void c.trigger("focus");const e=S.DataTable();e.page.len(5),e.ajax.reload()}function ie(){f.DataTable({data:Q,columns:[{title:"닉네임",data:"nickname",width:"35%"},{title:"PID",data:"profile_uuid",width:"36%"},{title:"두잇알림",data:"noti_doit",width:"8%"},{title:"마케팅알림",data:"noti_marketing",width:"8%"},{title:"공지알림",data:"noti_notice",width:"8%"},{title:"",data:"profile_uuid",width:"5%",render:function(e,t,a,i){return`<button type="button" class="btn-xs btn-text-red delete-btn" data-rownum="${i.row}"><i class="fas fa-minus-circle"></i></button>`}}],serverSide:!1,paging:!0,pageLength:30,select:!1,destroy:!0,initComplete:function(){!function(e){let t=e.DataTable();t.ajax.reload(null,!1),0===t.data().length&&t.page("last").draw("page"),$("input[name=chk-row]").prop("checked",!1),$("#checkAll").prop("checked",!1)}(S)},fnRowCallback:function(e,t){$(e).attr("id",t.profile_uuid),$(e).children().eq(5).find("button").on("click",(function(){f.DataTable().row($(this).closest("tr")).remove().draw(!1),ne(),oe()}))},drawCallback:function(e){}})}function ne(){Y.length=0,Q.length=0;const e=f.DataTable().rows().data();if(e.length>0)for(let t=0;t<e.length;t++){const{profile_uuid:a,nickname:i,noti_doit:n,noti_marketing:o,noti_notice:r}=e[t];Y.push(a),Q.push({profile_uuid:a,nickname:i,noti_notice:r,noti_marketing:o,noti_doit:n})}}function oe(){var e;d.text(z(e=Q.length)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))}function re(e){if(z(e))return void F("파일 내용을 양식에 맞게 입력해주세요.");const t={profile_uuid:e};I(!0,_.pushTargetMemberFromXlsx,JSON.stringify(t)).then((async function(e,t,a){A(e)?function(e){!z(e.data)&&e.data.list.length>0&&(Q=e.data.list,Y.length=0,e.data.list.map((e=>Y.push(e.profile_uuid)))),ie(),oe()}(e):F(P(e))})).catch((e=>R("회원목록을(를) 불러올 수 없습니다.")))}function se(){const e=me()?`${p.val()} ${C.val()}:${M.val()}:00`:`${function(e,t){let a=e.getFullYear().toString(),i=(e.getMonth()+1).toString(),n=e.getDate().toString(),o="";try{o=a+"-"+(i[1]?i:"0"+i[0])+"-"+(n[1]?n:"0"+n[0])}catch(e){}return o}(new Date)} ${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`,t={reserve_type:$("input:radio[name=radio-reserve-type]:checked").val(),send_type:$("input:radio[name=radio-receive-type]:checked").val(),send_datetime:e,send_profile_type:$("input:radio[name=radio-target-member-type]:checked").val(),send_profile:ce()?Y:[],target_type:$("input:radio[name=radio-target-page-type]:checked").val(),target:de()?h.val():"",store:$("input:radio[name=radio-os-type]:checked").val(),message:m.val().trim(),icon_type:$("input:radio[name=radio-icon-type]:checked").val(),category:$("input:radio[name=radio-type]:checked").val()};I(!0,_.createPush,JSON.stringify(t)).then((async function(e,t,a){await function(e,t){Swal.fire({toast:!0,position:"center",icon:A(e)?"success":"error",title:U(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&A(e)&&t()}))}(e,le)})).catch((e=>R(N.submit+" 처리 중, 오류가 발생했습니다.")))}function le(){location.href=O}function de(){const e=$("input[name=radio-target-page-type]:checked").val();return-1!==["event","notice","doit"].indexOf(e)}function ce(){return"individual"===$("input[name=radio-target-member-type]:checked").val()}function me(){return"reserve"===$("input[name=radio-reserve-type]:checked").val()}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:q,zeroRecords:q,processing:"검색 중..",paginate:{previous:N.previous,next:N.next}}}),n.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:N.monthNames,dayNames:N.dayNames,dayNamesMin:N.dayNames,minDate:0}),n.val(J()),function(e){let t="";for(let e=0;e<24;e++)t+=`<option selected value="${j(e)}">${e}시</ooption>`;e.html(t)}(C),function(e){let t="";for(let e=0;e<60;e++)t+=`<option selected value="${j(e)}">${j(e)}분</ooption>`;e.html(t)}(M),k.on("click",(function(){D.fadeIn(),b.fadeIn(),X(),Z()})),y.on("change",(function(){me()?$(this).parent().siblings().show():$(this).parent().siblings().hide(),C.val("12"),M.val("00")})),v.on("change",(function(){k.val(""),h.val(""),de()?$(this).parent().siblings().show():$(this).parent().siblings().hide()})),T.on("change",(function(){var e;e=this,f.DataTable().rows().remove().draw(!1),ne(),oe(),"all"===$(e).val()?$(e).parent().siblings().hide():$(e).parent().siblings().show()})),L.on("click",(function(){!function(e){const t=$(e).siblings("input");if(z($(t).val()))return F("닉네임을 입력해주세요."),void c.trigger("focus");w.fadeIn(),b.fadeIn(),X(),c.val($(t).val().trim()),V?S.DataTable({ajax:{url:_.pushTargetMember,type:"POST",headers:x,global:!1,dataFilter:function(e){let t=JSON.parse(e);return A(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],F(P(t))),JSON.stringify(t)},data:function(e){const t={page:e.start/e.length+1,limit:e.length,keyword:c.val().trim()};return JSON.stringify(t)},error:function(e,t){R(N.list+E)}},columns:[{title:"닉네임",data:"nickname",width:"35%"},{title:"PID",data:"profile_uuid",width:"36%"},{title:"두잇알림",data:"noti_doit",width:"8%"},{title:"마케팅알림",data:"noti_marketing",width:"8%"},{title:"공지알림",data:"noti_notice",width:"8%"},{title:"",data:"profile_uuid",width:"5%",render:function(e,t,a,i){return`<div class="checkbox-wrap"><input type="checkbox" name="chk-row" id="${n=i.row}"/><label for="${n}"><span></span></label></div>`;var n}}],serverSide:!0,paging:!0,pageLength:5,select:{style:"single",selector:":checkbox"},destroy:!0,initComplete:function(){$(this).on("select.dt",(function(e,t,a,i){!function(e,t){!function(e){const{profile_uuid:t,nickname:a,noti_doit:i,noti_marketing:n,noti_notice:o}=e;let r=[];r.push({profile_uuid:t,nickname:a,noti_notice:o,noti_marketing:n,noti_doit:i}),Q=r.concat(Q);let s=[];s.push(t),Y=s.concat(Y),ie(),oe()}(e.rows(t).data()[0])}(t,i)}))},fnRowCallback:function(e,t){const a=$(e).children().eq(5).find("input");Y.indexOf(t.profile_uuid)>-1&&$(a).prop("disabled",!0)},drawCallback:function(e){!function(e){$(e).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(e.api().page.info().pages>0)}(this)}}):ae(),V=!1}(this)})),u.on("click",(function(){G()})),b.on("click",(function(){G()})),s.on("click",(function(){var e;(function(){const e=(new Date).getTime(),t=new Date(`${p.val()} ${C.val()}:${M.val()}:00`).getTime();return me()&&e>t?(F("발송 시간은 현재시간 이후로 설정해야 합니다."),C.trigger("focus"),!1):ce()&&0===Y.length?(F("발송 대상은 필수항목입니다."),!1):de()&&z(k.val())?(F("발송 구분은 필수항목입니다."),!1):!z(m.val())||(F("내용은 필수항목입니다."),m.trigger("focus"),!1)})()&&("등록하시겠습니까?",e=se,Swal.fire({text:"등록하시겠습니까?",showCancelButton:!0,confirmButtonText:N.confirm,cancelButtonText:N.cancel}).then((t=>{t.value&&e()})))})),a.on("change",(function(){!function(e){if(!function(e){if(e.files[0]){let t=e.files[0].type,a=["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];return $.inArray(t,a)>=0}}(e))return F("엑셀(.xlsx) 파일을 선택해주세요."),void K(e);(function(e,a){t.show();let i=new FileReader;i.onload=function(e){const n=i.result,o=XLSX.read(n,{type:"binary"});let r=[];try{o.SheetNames.map((e=>{r.push(...XLSX.utils.sheet_to_json(o.Sheets[e],{header:1,range:0,blankrows:!1,defval:null,raw:!0}))}))}catch(e){t.hide()}let s=[];r.map((e=>{z(e[0])||s.push(e[0])})),a(s)},i.readAsBinaryString(e.files[0])})(e,re),K(e)}(this)})),i.on("click",(function(){var e,t,a;t="회원목록",a=[{PID:"","":"<<<---여기부터"},{PID:"","":"PID(프로필아이디)를"},{PID:"","":"이런 방식으로(줄을 바꿔가며)"},{PID:"","":"채우면 됩니다."},{PID:"","":"아!"},{PID:"","":"물론,"},{PID:"","":"첫행부터 채워도"},{PID:"","":"괜찮아요."}],z(e="회원일괄등록양식")||(H.fileName=`${e}.xlsx`),z(t)||(H.sheetName=t),z(a)||(H.jsonData=a),function(){let e=XLSX.utils.book_new(),t=XLSX.utils.json_to_sheet(H.jsonData);XLSX.utils.book_append_sheet(e,t,H.sheetName),XLSX.writeFile(e,H.fileName)}()})),o.on("propertychange change keyup paste input",(function(){Z()})),r.on("click",(function(){ae()}))}))})();