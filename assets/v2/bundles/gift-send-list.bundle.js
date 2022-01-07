(()=>{"use strict";const t=$("body"),e=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),n=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),i=$(".datepicker"),o=$(".date-from"),r=$(".date-to"),s=$("#selDateType"),d=$("#selSearchType"),l=($("input[name=chk-type]"),$("input[name=chk-status]")),c=$("input[name=radio-type]"),m=($("input[name=radio-status]"),$("#keyword")),p=$("#btnSearch"),u=$("#btnReset"),g=$("#btnSubmit"),b=$("#btnCancel"),f=($("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),h=($("#selSort"),$("#dataTable")),y=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo")),v=($("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close")),k=$(".modal-content"),T=$(".modal-bg"),D=$("#modalDetail"),L=($("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#report"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-report]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-report]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo")),w=($("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent")),C=$("#modalCancel"),S=($("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))});function M(t,e,a){return new Promise(((n,i)=>{$.ajax({global:t,url:e,type:"POST",headers:S,contentType:"text/plain",dataType:"json",data:a,success:function(t){n(t)},error:function(t,e,a){i(a)},complete:function(t,e){}})}))}function x(t){let e=t.msg,a=t.status;return[30034,30035,30308].indexOf(a)>-1&&(e=`선택한 이미지 사이즈는 ${t.data.width} x ${t.data.height} 입니다.\n                 ${t.msg}`),e}function U(t){return 0===function(t){return t.status}(t)}const A=`${api_server_url}/v3/`,W={saveUserUcdFromXlsx:A+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:A+"ucd/set/charge/user/system",saveUserUcdByBiz:A+"ucd/set/charge/user/company",saveDoitUcdBySystem:A+"ucd/set/charge/doit/system",saveDoitUcdByBiz:A+"ucd/set/charge/doit/company",saveBizUcd:A+"ucd/set/charge/company/system",dashboardSummary:A+"main/dashboard",dashboardSummaryList:A+"main/dashboard/get/list",dashboardMoreLeader:A+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:A+"main/dashboard/get/doitRanklist",getProfile:A+"admin/get",updatePassword:A+"admin/update/pwd",memberList:A+"profile/get/list",detailMember:A+"profile/get/detail/info",levelUp:A+"profile/set/levelUp",levelDown:A+"profile/set/levelDown",cancelPartner:A+"profile/set/releasePartner",levelInfo:A+"profile/get/level",levelHistory:A+"profile/get/level/history",deviceInfo:A+"profile/get/device/info",memberDoitList:A+"profile/get/doit",memberCategoryList:A+"profile/get/category",memberActionList:A+"profile/get/action",memberActionDetail:A+"profile/get/detail/action",countPerLevel:A+"level/get/count",memberLevelList:A+"level/get/list",unlinkMemberList:A+"profile/get/unlink",changedMemberList:A+"profile/get/changed",badgeList:A+"badge/get/list",createBadge:A+"badge/create",detailBadge:A+"badge/get/detail/info",deleteBadge:A+"badge/delete",updateBadge:A+"badge/update",categoryList:A+"category/list",createCategory:A+"category/create",detailCategory:A+"category/detail",reorderCategory:A+"category/update/sequence",deleteCategory:A+"category/delete",updateCategory:A+"category/update",subCategoryList:A+"subcategory/list",createSubCategory:A+"subcategory/create",updateSubCategoryDoitImg:A+"subcategory/set/doit/image",deleteSubCategory:A+"subcategory/delete",reorderSubCategory:A+"subcategory/update/sequence",editSubCategory:A+"subcategory/update",keywordList:A+"keyword/get/list",createKeyword:A+"keyword/create",updateKeyword:A+"keyword/update",doitSponsorList:A+"doit/get/company",doitList:A+"doit/list",doitSetRecommend:A+"doit/set/recommend",createDoit:A+"doit/create",createDoitCategoryList:A+"category/exposure/list",detailDoit:A+"doit/detail",updateDoit:A+"doit/update",deleteDoit:A+"doit/delete",openDoit:A+"doit/set/open",stopDoit:A+"doit/set/stop",getDoitUcd:A+"ucd/get/doit",getUcdDoitList:A+"ucd/get/doit/list",missionList:A+"mission/get/list",createMission:A+"mission/create",detailMission:A+"mission/get/detail/info",updateMission:A+"mission/update",deleteMission:A+"mission/delete",joinMemberList:A+"member/get/list",infoJoinMember:A+"member/get/profile",rewardMemberList:A+"ucd/get/reward/profile",createReward:A+"ucd/set/reward/profile",countMember:A+"member/get/count",blockMember:A+"member/set/retire/ban",banMember:A+"member/set/retire",applyMemberList:A+"member/get/applylist",approvalMember:A+"member/get/applyConfirm",rejectMember:A+"member/get/applyReject",blockMemberList:A+"member/get/retire/ban/list",cancelBlockMember:A+"member/set/retire/ban/cancel",actionList:A+"action/get/list",detailAction:A+"action/get/detail/info",sendWarning:A+"action/set/yellow",cancelWarning:A+"action/set/yellowCancel",actionCommentList:A+"action/get/commentList",createActionComment:A+"action/set/insertComment",deleteActionComment:A+"action/set/deleteComment",actionReplyList:A+"action/get/comment/child/list",talkList:A+"board/get/list",createTalk:A+"board/create",detailTalk:A+"board/get/detail/info",updateTalk:A+"board/update",deleteTalk:A+"board/delete",talkCommentList:A+"board/get/commentList",createTalkComment:A+"board/set/insertComment",deleteTalkComment:A+"board/set/deleteComment",talkReplyList:A+"board/get/comment/child/list",pickList:A+"recommend/list",previewList:A+"recommend/get/doit",searchDoitList:A+"recommend/get/doit/list",reorderPick:A+"recommend/set",createPick:A+"recommend/create",updatePick:A+"recommend/update",detailPick:A+"recommend/detail",bizList:A+"biz/get/list",createBiz:A+"biz/create",detailBiz:A+"biz/get/detail/info",bizDoitList:A+"biz/get/detail/doit",bizUcdList:A+"ucd/list/get/company",updateBiz:A+"biz/update",getBizUcd:A+"ucd/get/company",noticeList:A+"notice/get/list",createNotice:A+"notice/create",detailNotice:A+"notice/get/detail/info",updateNotice:A+"notice/update",deleteNotice:A+"notice/delete",faqType:A+"faq/get/type",faqList:A+"faq/get/list",createFaq:A+"faq/create",detailFaq:A+"faq/get/detail/info",updateFaq:A+"faq/update",deleteFaq:A+"faq/delete",reorderFaq:A+"faq/set/orders",inquiryList:A+"qna/get/list",updateInquiry:A+"qna/set/insertComment",detailInquiry:A+"qna/get/detail/info",deleteInquiry:A+"qna/delete",reportActionList:A+"report/get/action/list",actionReportReasonList:A+"report/get/action/descriptionList",reportTalkList:A+"report/get/board/list",talkReportReasonList:A+"report/get/board/descriptionList",blindTalk:A+"report/set/blind",bannerList:A+"banner/get/list",createBanner:A+"banner/create",detailBanner:A+"banner/get/detail/info",updateBanner:A+"banner/update",reorderBanner:A+"banner/set/orders",targetEventList:A+"banner/get/event/list",targetDoitList:A+"banner/get/doit/list",targetNoticeList:A+"banner/get/notice/list",storyList:A+"story/get/list",createStory:A+"story/create",detailStory:A+"story/get/detail/info",updateStory:A+"story/update",reorderStory:A+"story/set/orders",eventList:A+"event/get/list",createEvent:A+"event/create",detailEvent:A+"event/get/detail/info",deleteEvent:A+"event/delete",updateEvent:A+"event/update",customEvent:A+"event/popup/get/list",customEventProfile:A+"event/popup/get/profile",pushList:A+"push/list",cancelPush:A+"push/set/cancel",createPush:A+"push/create",pushTargetNotice:A+"push/get/notice",pushTargetEvent:A+"push/get/event",pushTargetDoit:A+"push/get/doit",pushTargetMember:A+"push/get/profile",pushTargetMemberFromXlsx:A+"excel/import/notification/profile",popupList:A+"popup/get/list",createPopup:A+"popup/create",detailPopup:A+"popup/get/detail/info",updatePopup:A+"popup/update",deletePopup:A+"popup/delete",errorList:A+"error/list",updateError:A+"error/update",createEncryption:A+"operate/set/encryption",createDecryption:A+"operate/set/decryption",versionList:A+"operate/get/version/list",createVersion:A+"operate/version/create",deleteVersion:A+"operate/version/delete",logList:A+"log/get/list",getMemberForSaveUcd:A+"ucd/get/user/list",getMemberFromXlsx:A+"excel/import/profile",getDoitFromXlsx:A+"excel/import/doit",ucdChargeList:A+"ucd/list/get/charge",systemWalletType:A+"ucd/get/system/type",systemWalletList:A+"ucd/list/get/system",doitWalletList:A+"ucd/list/get/doit",memberWalletList:A+"ucd/list/get/user",pendingWalletList:A+"ucd/list/get/transfer",giftList:A+"gift/get/list",reorderGiftList:A+"gift/get/orderList",reorderGift:A+"gift/set/orders",createGift:A+"gift/create",ktGoodsList:A+"gift/get/kt/goods",detailGift:A+"gift/get/detail/info",updateGift:A+"gift/update",applyGiftList:A+"exchange/get/list",sendGifticon:A+"exchange/set/confirm",sendGeneralGift:A+"exchange/set/send",rejectGift:A+"exchange/set/reject",resendGift:A+"exchange/set/resend",getGiftBalance:A+"exchange/get/money",sendGiftList:A+"exchange/get/sendList",sendGiftStatusList:A+"exchange/get/payment",updateGiftSendMemo:A+"exchange/set/insertMemo",adminList:A+"admin/list",detailAdmin:A+"admin/detail",updateAdmin:A+"admin/update",deleteAdmin:A+"admin/delete",authBizList:A+"auth/get/biz/list",approvalAdmin:A+"admin/approval",authList:A+"auth/list",getMenuWithAuth:A+"auth/get/menu",setMenuWithAuth:A+"auth/set/menu",createAuth:A+"auth/create",deleteAuth:A+"auth/delete",promotionList:A+"promotion/get/list",createPromotion:A+"promotion/create",detailPromotion:A+"promotion/get/detail",updatePromotion:A+"promotion/update",closePromotion:A+"promotion/set/end",promotionDoitList:A+"promotion/get/doit/list",promotionProceedList:A+"promotion/get/proceed/list",setDoitPromotion:A+"promotion/set/doit",cancelDoitPromotion:A+"promotion/set/release"},I={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},P=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:t=>{t.addEventListener("mouseenter",Swal.stopTimer),t.addEventListener("mouseleave",Swal.resumeTimer)}});function B(t){P.fire({icon:"info",title:t})}function N(t,e){Swal.fire({toast:!0,position:"center",icon:U(t)?"success":"error",title:x(t),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&U(t)&&e()}))}function q(t){Swal.fire({icon:"error",html:t})}function F(t,e){Swal.fire({text:t,showCancelButton:!0,confirmButtonText:I.confirm,cancelButtonText:I.cancel}).then((t=>{t.value&&e()}))}const E="목록이 없습니다.",R=" 처리 중, 오류가 발생했습니다.";function z(t){return Number(t)<10?t.toString().padStart(2,"0"):t}function G(t){return null==t||t.hasOwnProperty("length")&&0===t.length||t.constructor===Object&&0===Object.keys(t).length||t.constructor===String&&""===t.trim()}function _(t){return G(t)||isNaN(t)?0:t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}const j="/v2/member/detail";function O(){k.fadeOut(),T.fadeOut(),$("body").css("overflow-y","auto")}function K(){$("body").css("overflow-y","hidden")}function J(t){const e=t.getFullYear(),a=t.getMonth()+1,n=t.getDate();return`${e}-${z(a)}-${z(n)}`}function X(){return J(new Date)}function Y(){o.val(function(){const t=new Date;return t.setDate(t.getDate()-6),J(t)}()),r.val(X())}function H(){n.removeClass("active")}const Q={};let V,Z=new Swiper(".swiper-container");function tt(){H(),i.datepicker("option","minDate","2020-07-01"),i.datepicker("option","maxDate","today"),Y(),e.each((function(){$(this).children().eq(0).prop("selected",!0)})),m.val(""),c.eq(0).prop("checked",!0),l.eq(0).prop("checked",!0),l.eq(1).prop("checked",!0),l.eq(2).prop("checked",!0)}function et(){let t=h.DataTable();t.page.len(Number(f.val())),t.ajax.reload()}function at(){const t={exchange_list:[ot()],memo:y.val().trim()};M(!0,W.rejectGift,JSON.stringify(t)).then((async function(t,e,a){await N(t,nt)})).catch((t=>q(I.cancel+R)))}function nt(){O(),et()}function it(){const t={tr_id:V};M(!0,W.resendGift,JSON.stringify(t)).then((async function(t,e,a){await N(t,et)})).catch((t=>q("재발송 처리 중, 오류가 발생했습니다.")))}function ot(){const t=h.DataTable().rows(".selected").data()[0];return G(t)?"":t.exchange_uuid}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:E,zeroRecords:E,processing:"검색 중..",paginate:{previous:I.previous,next:I.next}}}),i.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:I.monthNames,dayNames:I.dayNames,dayNamesMin:I.dayNames}),f.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),tt(),h.DataTable({ajax:{url:W.sendGiftList,type:"POST",headers:S,dataFilter:function(t){let e=JSON.parse(t);return U(e)?(e.recordsTotal=e.count,e.recordsFiltered=e.count):(e.data=[],B(function(t){return t.msg}(e))),JSON.stringify(e)},data:function(t){let e=[];l.each((function(){$(this).is(":checked")&&e.push($(this).val())}));const a={date_type:s.val(),from_date:o.val(),to_date:r.val(),search_type:d.val(),keyword:m.val().trim(),page:t.start/t.length+1,limit:f.val(),gift_type:$("input[name=radio-type]:checked").val(),status:e};return JSON.stringify(a)},error:function(t,e){q(I.list+"을(를) 불러올 수 없습니다.")}},columns:[{title:"상품유형",data:"goods_code",width:"5%",render:function(t){return G(t)?I.gift:I.gifticon}},{title:"상품명",data:"gift_name",width:"18%"},{title:"신청자",data:"nickname",width:"20%",render:function(t,e,a,n){return`<a data-uuid="${a.profile_uuid}">${t}</a>`}},{title:"신청수량",data:"qty",width:"5%"},{title:"금액(UCD)",data:"ucd",width:"8%",render:function(t,e,a,n){return _(t)}},{title:"승인/발송/취소일시",data:"updated",width:"12%"},{title:"예약일시",data:"reserved",width:"12%",render:function(t,e,a,n){return G(a.goods_code)||"취소"===a.status?I.dash:t}},{title:"상태",data:"status",width:"5%"},{title:"상세내역",data:"exchange_uuid",width:"5%",render:function(t,e,a,n){return a.coupon.length>0?`<a class="view-detail" data-uuid="${t}">보기</a>`:I.dash}},{title:"메모",data:"memo",width:"5%",render:function(t,e,a,n){return function(t){return G(t.memo)?I.dash:`<i class="tooltip-mark fas fa-sticky-note"><span class="tooltip-txt left">${t.memo}</span></i>`}(a)}},{title:"",data:"exchange_uuid",width:"5%",render:function(t,e,a,n){return`<div class="checkbox-wrap"><input type="checkbox" name="chk-row" id="${i=n.row}"/><label for="${i}"><span></span></label></div>`;var i}}],serverSide:!0,paging:!0,pageLength:Number(f.val()),select:{style:"single",selector:":checkbox"},destroy:!1,initComplete:function(){$(this).on("select.dt",(function(t,e,a,n){$("input[name=chk-row]").eq(n).prop("checked",!0)})),$(this).on("deselect.dt",(function(t,e,a,n){$("input[name=chk-row]").eq(n).prop("checked",!1)}))},fnRowCallback:function(t,e){$(t).children().eq(8).find("a").on("click",(function(){D.fadeIn(),T.fadeIn(),K(),function(t){const e=$(t).data("uuid"),{coupons:a}=Q[e];!G(a)&&a.length>0&&(w.empty(),a.map((t=>{const{gift_image_url:e,goodsCd:a,brandNm:n,goodsNm:i,sellPriceAmt:o,recverTelNo:r,validPrdEndDt:s,pinStatusNm:d,sendStatusCd:l,tr_id:c}=t,m="발행"===d?`<div class="right-wrap gift-resand">\n\t\t\t\t\t\t\t<button type="button" data-trid="${c}" class="btn-sm btn-teal btn-resend">재발송</button>\n\t\t\t\t\t\t</div>`:"",p=`<div class="swiper-slide">\n\t\t\t\t\t\t<table class="detail-table">\n\t\t\t\t\t\t\t<colgroup>\n\t\t\t\t\t\t\t\t<col style="width: 20%;">\n\t\t\t\t\t\t\t\t<col style="width: 80%;">\n\t\t\t\t\t\t\t</colgroup>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>상품이미지</th>\n\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t<div class="detail-img-wrap">\n\t\t\t\t\t\t\t\t\t\t\t<img src="${e}" alt="">\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>상품코드</th>\n\t\t\t\t\t\t\t\t\t<td>${G(a)?I.dash:a}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>상품명</th>\n\t\t\t\t\t\t\t\t\t<td>[${G(n)?I.dash:n}] ${G(i)?I.dash:i}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>판매단가</th>\n\t\t\t\t\t\t\t\t\t<td>${_(o)}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>수신자 번호</th>\n\t\t\t\t\t\t\t\t\t<td>${G(r)?I.dash:r}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>유효기간 만료일</th>\n\t\t\t\t\t\t\t\t\t<td>${$=s,G($)?"":`${$.substring(0,4)}-${$.substring(4,6)}-${$.substring(6,8)} ${$.substring(8,10)}:${$.substring(10,12)}:${$.substring(12,14)}`}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>발송 상태</th>\n\t\t\t\t\t\t\t\t\t<td>${G(l)?I.dash:l}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>쿠폰 상태</th>\n\t\t\t\t\t\t\t\t\t<td>${G(d)?I.dash:d}</td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t${m}\n\t\t\t\t\t</div>`;var $;w.append(p)}))),$("img").on("error",(function(){$(this).attr("src",I.noImage)})),Z.destroy(!0,!0),Z=new Swiper(".swiper-container",{spaceBetween:10,pagination:{el:".swiper-pagination",clickable:!0}}),$(".btn-resend").on("click",(function(){!function(t){V=$(t).data("trid"),F("발송하시겠습니까?",it)}(this)}))}(this)})),e.coupon.length>0&&Object.assign(Q,{[e.exchange_uuid]:{coupons:e.coupon}}),"취소"===e.status&&$(t).addClass("minus-pay"),"승인"!==e.status&&$(t).children().eq(10).find("input").prop("disabled",!0),$(t).children().eq(2).find("a").on("click",(function(){!function(t){let e=$("<form></form>");e.prop("method","post"),e.prop("action",j),e.append($("<input/>",{type:"hidden",name:"is_store",value:!0})),e.append($("<input/>",{type:"hidden",name:"profile_uuid",value:t})),e.appendTo("body"),e.trigger("submit")}($(this).data("uuid"))}))},drawCallback:function(t){!function(t){const e=$(t).parent().siblings().find(".data-num"),a=_(function(t){return t.DataTable().page.info().recordsTotal}(t));$(e).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),t.on("keydown",(function(t){!function(t){"none"===$(C).css("display")&&13===t.keyCode&&et()}(t)})),o.on("change",(function(){r.datepicker("option","minDate",new Date(o.datepicker("getDate"))),H()})),r.on("change",(function(){o.datepicker("option","maxDate",new Date(r.datepicker("getDate"))),H()})),f.on("change",(function(){et()})),p.on("click",(function(){et()})),u.on("click",(function(){tt()})),n.on("click",(function(){var t;t=this,H(),$(t).addClass("active"),$(t).hasClass("today")?i.val(X()):$(t).hasClass("week")?Y():$(t).hasClass("month")?(o.val(function(){const t=new Date;return t.setMonth(t.getMonth()-1),J(t)}()),r.val(X())):$(t).hasClass("months")&&(o.val(function(){const t=new Date;return t.setMonth(t.getMonth()-3),J(t)}()),r.val(X()))})),v.on("click",(function(){O()})),T.on("click",(function(){O()})),L.on("click",(function(){onSubmitUpdateMemo()})),b.on("click",(function(){(!G(ot())||(B("대상을 선택해주세요."),0))&&(C.fadeIn(),T.fadeIn(),K(),y.val(""),y.trigger("focus"))})),g.on("click",(function(){F("취소하시겠습니까?",at)})),l.on("click",(function(){0===$("input[name='"+this.name+"']:checked").length&&(B("최소 하나 이상의 값을 선택해야 합니다."),$(this).prop("checked",!0))}))}))})();