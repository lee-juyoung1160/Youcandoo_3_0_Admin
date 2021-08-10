(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),n=$(".datepicker"),o=$(".date-from"),r=$(".date-to"),s=$("#selDateType"),l=$("#selSearchType"),d=($("input[name=chk-type]"),$("input[name=chk-status]")),c=($("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),p=$("#btnSearch"),m=$("#btnReset"),u=($("#btnSubmit"),$("#btnCancel"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),g=$("#selSort"),b=$("#dataTable"),f=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory")),h=($("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$("#btnJoinMembers"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBan"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("#versionDigit"),$("#versionDecimal"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))});function y(e,t,a){return new Promise(((i,n)=>{$.ajax({global:e,url:t,type:"POST",headers:h,contentType:"text/plain",dataType:"json",data:a,success:function(e){i(e)},error:function(e,t,a){n(a)},complete:function(e,t){}})}))}function v(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function T(e){return 0===function(e){return e.status}(e)}function k(e){return e.msg}const D=`${api_server_url}/v3/`,L={saveUserUcdFromXlsx:D+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:D+"ucd/set/charge/user/system",saveUserUcdByBiz:D+"ucd/set/charge/user/company",saveDoitUcdBySystem:D+"ucd/set/charge/doit/system",saveDoitUcdByBiz:D+"ucd/set/charge/doit/company",saveBizUcd:D+"ucd/set/charge/company/system",dashboardSummary:D+"main/dashboard",dashboardSummaryList:D+"main/dashboard/get/list",dashboardMoreLeader:D+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:D+"main/dashboard/get/doitRanklist",getProfile:D+"admin/get",updatePassword:D+"admin/update/pwd",memberList:D+"profile/get/list",detailMember:D+"profile/get/detail/info",levelUp:D+"profile/set/levelUp",levelDown:D+"profile/set/levelDown",cancelPartner:D+"profile/set/releasePartner",levelInfo:D+"profile/get/level",levelHistory:D+"profile/get/level/history",deviceInfo:D+"profile/get/device/info",memberDoitList:D+"profile/get/doit",memberCategoryList:D+"profile/get/category",memberActionList:D+"profile/get/action",memberActionDetail:D+"profile/get/detail/action",countPerLevel:D+"level/get/count",memberLevelList:D+"level/get/list",unlinkMemberList:D+"profile/get/unlink",changedMemberList:D+"profile/get/changed",badgeList:D+"badge/get/list",createBadge:D+"badge/create",detailBadge:D+"badge/get/detail/info",deleteBadge:D+"badge/delete",updateBadge:D+"badge/update",categoryList:D+"category/list",createCategory:D+"category/create",detailCategory:D+"category/detail",reorderCategory:D+"category/update/sequence",deleteCategory:D+"category/delete",updateCategory:D+"category/update",subCategoryList:D+"subcategory/list",createSubCategory:D+"subcategory/create",updateSubCategoryDoitImg:D+"subcategory/set/doit/image",deleteSubCategory:D+"subcategory/delete",reorderSubCategory:D+"subcategory/update/sequence",editSubCategory:D+"subcategory/update",keywordList:D+"keyword/get/list",createKeyword:D+"keyword/create",updateKeyword:D+"keyword/update",doitSponsorList:D+"doit/get/company",doitList:D+"doit/list",doitSetRecommend:D+"doit/set/recommend",createDoit:D+"doit/create",createDoitCategoryList:D+"category/exposure/list",detailDoit:D+"doit/detail",updateDoit:D+"doit/update",deleteDoit:D+"doit/delete",openDoit:D+"doit/set/open",stopDoit:D+"doit/set/stop",getDoitUcd:D+"ucd/get/doit",getUcdDoitList:D+"ucd/get/doit/list",missionList:D+"mission/get/list",createMission:D+"mission/create",detailMission:D+"mission/get/detail/info",updateMission:D+"mission/update",deleteMission:D+"mission/delete",joinMemberList:D+"member/get/list",infoJoinMember:D+"member/get/profile",rewardMemberList:D+"ucd/get/reward/profile",createReward:D+"ucd/set/reward/profile",countMember:D+"member/get/count",banMember:D+"member/set/retire",applyMemberList:D+"member/get/applylist",approvalMember:D+"member/get/applyConfirm",rejectMember:D+"member/get/applyReject",actionList:D+"action/get/list",detailAction:D+"action/get/detail/info",sendWarning:D+"action/set/yellow",cancelWarning:D+"action/set/yellowCancel",actionCommentList:D+"action/get/commentList",createActionComment:D+"action/set/insertComment",deleteActionComment:D+"action/set/deleteComment",actionReplyList:D+"action/get/comment/child/list",talkList:D+"board/get/list",createTalk:D+"board/create",detailTalk:D+"board/get/detail/info",updateTalk:D+"board/update",deleteTalk:D+"board/delete",talkCommentList:D+"board/get/commentList",createTalkComment:D+"board/set/insertComment",deleteTalkComment:D+"board/set/deleteComment",talkReplyList:D+"board/get/comment/child/list",pickList:D+"recommend/list",previewList:D+"recommend/get/doit",searchDoitList:D+"recommend/get/doit/list",reorderPick:D+"recommend/set",createPick:D+"recommend/create",updatePick:D+"recommend/update",detailPick:D+"recommend/detail",bizList:D+"biz/get/list",createBiz:D+"biz/create",detailBiz:D+"biz/get/detail/info",bizDoitList:D+"biz/get/detail/doit",bizUcdList:D+"ucd/list/get/company",updateBiz:D+"biz/update",getBizUcd:D+"ucd/get/company",noticeList:D+"notice/get/list",createNotice:D+"notice/create",detailNotice:D+"notice/get/detail/info",updateNotice:D+"notice/update",deleteNotice:D+"notice/delete",faqType:D+"faq/get/type",faqList:D+"faq/get/list",createFaq:D+"faq/create",detailFaq:D+"faq/get/detail/info",updateFaq:D+"faq/update",deleteFaq:D+"faq/delete",reorderFaq:D+"faq/set/orders",inquiryList:D+"qna/get/list",updateInquiry:D+"qna/set/insertComment",detailInquiry:D+"qna/get/detail/info",reportActionList:D+"report/get/action/list",actionReportReasonList:D+"report/get/action/descriptionList",reportTalkList:D+"report/get/board/list",talkReportReasonList:D+"report/get/board/descriptionList",blindTalk:D+"report/set/blind",bannerList:D+"banner/get/list",createBanner:D+"banner/create",detailBanner:D+"banner/get/detail/info",updateBanner:D+"banner/update",reorderBanner:D+"banner/set/orders",targetEventList:D+"banner/get/event/list",targetDoitList:D+"banner/get/doit/list",targetNoticeList:D+"banner/get/notice/list",storyList:D+"story/get/list",createStory:D+"story/create",detailStory:D+"story/get/detail/info",updateStory:D+"story/update",reorderStory:D+"story/set/orders",eventList:D+"event/get/list",createEvent:D+"event/create",detailEvent:D+"event/get/detail/info",deleteEvent:D+"event/delete",updateEvent:D+"event/update",customEvent:D+"event/popup/get/list",customEventProfile:D+"event/popup/get/profile",pushList:D+"push/list",cancelPush:D+"push/set/cancel",createPush:D+"push/create",pushTargetNotice:D+"push/get/notice",pushTargetEvent:D+"push/get/event",pushTargetDoit:D+"push/get/doit",pushTargetMember:D+"push/get/profile",pushTargetMemberFromXlsx:D+"excel/import/notification/profile",popupList:D+"popup/get/list",createPopup:D+"popup/create",detailPopup:D+"popup/get/detail/info",updatePopup:D+"popup/update",deletePopup:D+"popup/delete",errorList:D+"error/list",updateError:D+"error/update",createEncryption:D+"operate/set/encryption",createDecryption:D+"operate/set/decryption",versionList:D+"operate/get/version/list",createVersion:D+"operate/version/create",deleteVersion:D+"operate/version/delete",getMemberForSaveUcd:D+"ucd/get/user/list",getMemberFromXlsx:D+"excel/import/profile",getDoitFromXlsx:D+"excel/import/doit",ucdChargeList:D+"ucd/list/get/charge",systemWalletType:D+"ucd/get/system/type",systemWalletList:D+"ucd/list/get/system",doitWalletList:D+"ucd/list/get/doit",memberWalletList:D+"ucd/list/get/user",pendingWalletList:D+"ucd/list/get/transfer",giftList:D+"gift/get/list",reorderGiftList:D+"gift/get/orderList",reorderGift:D+"gift/set/orders",createGift:D+"gift/create",ktGoodsList:D+"gift/get/kt/goods",detailGift:D+"gift/get/detail/info",updateGift:D+"gift/update",applyGiftList:D+"exchange/get/list",sendGifticon:D+"exchange/set/confirm",sendGeneralGift:D+"exchange/set/send",rejectGift:D+"exchange/set/reject",resendGift:D+"exchange/set/resend",getGiftBalance:D+"exchange/get/money",sendGiftList:D+"exchange/get/sendList",sendGiftStatusList:D+"exchange/get/payment",updateGiftSendMemo:D+"exchange/set/insertMemo",adminList:D+"admin/list",detailAdmin:D+"admin/detail",updateAdmin:D+"admin/update",deleteAdmin:D+"admin/delete",authBizList:D+"auth/get/biz/list",approvalAdmin:D+"admin/approval",authList:D+"auth/list",getMenuWithAuth:D+"auth/get/menu",setMenuWithAuth:D+"auth/set/menu",createAuth:D+"auth/create",deleteAuth:D+"auth/delete",promotionList:D+"promotion/get/list",createPromotion:D+"promotion/create",detailPromotion:D+"promotion/get/detail",updatePromotion:D+"promotion/update",deletePromotion:D+"promotion/delete",promotionDoitList:D+"promotion/get/doit/list"},w={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},S=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function C(e){S.fire({icon:"info",title:e})}function M(e){Swal.fire({icon:"error",html:e})}const x="목록이 없습니다.",A="을(를) 불러올 수 없습니다.";function U(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function W(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function I(){return window.location.pathname}const N="/v2/member/detail",B="/v2/doit/detail/";function P(e){const t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return`${t}-${U(a)}-${U(i)}`}function _(){return P(new Date)}function q(){o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-3),P(e)}()),r.val(_())}function F(){n.datepicker("option","minDate","2020-07-01"),n.datepicker("option","maxDate","+3M")}function E(){i.removeClass("active")}let z,R,G=1;function j(){E(),F(),q(),t.each((function(){$(this).children().eq(0).prop("selected",!0)})),c.val(""),d.prop("checked",!0)}function O(){G=1;let e=b.DataTable();e.page.len(Number(u.val())),e.ajax.reload(),F()}function J(){const e={doit_uuid:R,is_recommend:z};y(!0,L.doitSetRecommend,JSON.stringify(e)).then((async function(e,t,a){!function(e,t){Swal.fire({toast:!0,position:"center",icon:T(e)?"success":"error",title:v(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&T(e)&&t()}))}(e,K)})).catch((e=>M("기본정보을(를) 불러올 수 없습니다.")))}function K(){!function(e){let t=e.DataTable();t.ajax.reload(null,!1),0===t.data().length&&t.page("last").draw("page"),$("input[name=chk-row]").prop("checked",!1),$("#checkAll").prop("checked",!1)}(b)}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:x,zeroRecords:x,processing:"검색 중..",paginate:{previous:w.previous,next:w.next}}}),n.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:w.monthNames,dayNames:w.dayNames,dayNamesMin:w.dayNames}),u.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),y(!1,L.categoryList,JSON.stringify({keyword:""})).then((async function(e,t,a){T(e)?(await function(e){e.data.map((e=>f.append(`<option value="${e.category_uuid}">${e.category_title}</option>`)))}(e),await function(){const e=window.performance.getEntriesByType("navigation")[0],t=W(e)?window.performance.navigation.type:e.type;let a=!1;return"back_forward"!==t&&2!==t||sessionStorage.getItem("page")===I()&&(a=!0),a}()?function(){let e=JSON.parse(sessionStorage.getItem("param"));o.val(e.from_date),r.val(e.to_date),c.val(e.keyword),d.each((function(){$(this).prop("checked",e.doit_status.indexOf($(this).val())>-1)})),s.val(e.date_type),l.val(e.search_type),f.val(e.category_uuid),g.val(e.order_by),u.val(e.limit),G=e.page}():j(),await void b.DataTable({ajax:{url:L.doitList,type:"POST",headers:h,dataFilter:function(e){let t=JSON.parse(e);return T(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],C(k(t))),JSON.stringify(t)},data:function(e){return function(){let e=[];d.each((function(){$(this).is(":checked")&&e.push($(this).val())}));const t={date_type:s.val(),from_date:o.val(),to_date:r.val(),search_type:l.val(),keyword:c.val().trim(),page:G,limit:u.val(),doit_status:e,category_uuid:f.val(),order_by:g.val()};return function(e){e=W(e)?"":JSON.stringify(e),sessionStorage.setItem("param",e),sessionStorage.setItem("page",I())}(t),JSON.stringify(t)}()},error:function(e,t){M(w.list+A)}},columns:[{title:"카테고리",data:"category_title",width:"10%"},{title:"세부 카테고리",data:"subcategory_title",width:"15%"},{title:"두잇명",data:"doit_title",width:"20%",render:function(e,t,a,i){return`<a href="${B}${a.idx}" class="line-clamp-1" style="max-width: 280px;">${e}</a>`}},{title:"리더",data:"nickname",width:"20%",render:function(e,t,a,i){return"Y"===a.is_company?w.bizIcon+e:`<a data-uuid="${a.profile_uuid}">${e}</a>`}},{title:"생성일",data:"created",width:"8%",render:function(e){return e.substring(0,10)}},{title:"오픈일",data:"opened",width:"8%",render:function(e){return e.substring(0,10)}},{title:"참여인원",data:"member_cnt",width:"7%"},{title:"상태",data:"doit_status",width:"7%",render:function(e){return function(e){switch(e){case"create":return"생성";case"open":return"진행중";case"stop":return"운영정지";case"delete":return"삭제"}}(e)}},{title:"추천기능",data:"doit_uuid",width:"5%",render:function(e,t,a,i){return function(e){let t="Y"===e.is_recommend?"checked":"";return`<div class="toggle-btn-wrap">\n\t\t\t\t<div class="toggle-btn on">\n\t\t\t\t\t<input data-uuid="${e.doit_uuid}" type="radio" class="checkbox ${t}">\n\t\t\t\t\t<div class="knobs"></div>\n\t\t\t\t\t<div class="layer"></div>\n\t\t\t\t</div>\n\t\t\t</div>`}(a)}}],serverSide:!0,paging:!0,pageLength:Number(u.val()),select:!1,destroy:!1,initComplete:function(){var e;$(this).on("page.dt",(function(){G=function(e){let t=$(e).DataTable().page.info();return t.start/t.length+1}(this)})),e=G,$(this).DataTable().page(e-1).draw("page")},fnRowCallback:function(e,t){$(e).children().eq(3).find("a").on("click",(function(){!function(e){let t=$("<form></form>");t.prop("method","post"),t.prop("action",N),t.append($("<input/>",{type:"hidden",name:"is_store",value:!0})),t.append($("<input/>",{type:"hidden",name:"profile_uuid",value:e})),t.appendTo("body"),t.trigger("submit")}($(this).data("uuid"))})),$(e).children().eq(8).find("input").on("click",(function(){var e;z=$(this).hasClass("checked")?"N":"Y",R=$(this).data("uuid"),e=J,Swal.fire({text:"변경하시겠습니까?",showCancelButton:!0,confirmButtonText:w.confirm,cancelButtonText:w.cancel}).then((t=>{t.value&&e()}))}))},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=W(i=function(e){return e.DataTable().page.info().recordsTotal}(e))||isNaN(i)?0:i.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");var i;$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}})):C(k(e))})).catch((e=>M(w.list+A))),e.on("keydown",(function(e){!function(e){13===e.keyCode&&O()}(e)})),o.on("change",(function(){r.datepicker("option","minDate",new Date(o.datepicker("getDate"))),E()})),r.on("change",(function(){o.datepicker("option","maxDate",new Date(r.datepicker("getDate"))),E()})),u.on("change",(function(){O()})),g.on("change",(function(){O()})),p.on("click",(function(){O()})),m.on("click",(function(){j()})),i.on("click",(function(){var e;e=this,E(),$(e).addClass("active"),$(e).hasClass("today")?n.val(_()):$(e).hasClass("week")?(o.val(function(){const e=new Date;return e.setDate(e.getDate()-6),P(e)}()),r.val(_())):$(e).hasClass("month")?(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-1),P(e)}()),r.val(_())):$(e).hasClass("months")&&q()})),d.on("click",(function(){0===$("input[name='"+this.name+"']:checked").length&&(C("최소 하나 이상의 값을 선택해야 합니다."),$(this).prop("checked",!0))}))}))})();