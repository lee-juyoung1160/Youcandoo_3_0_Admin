(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),n=$(".datepicker"),o=$(".date-from"),r=$(".date-to"),s=($("#selDateType"),$("#selSearchType")),l=($("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),d=$("#btnSearch"),c=$("#btnReset"),p=($("#btnSubmit"),$("#btnCancel"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),m=($("#selSort"),$("#dataTable")),u=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$("#btnJoinMembers"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBan"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("#versionDigit"),$("#versionDecimal"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType")),g=($("#qualification"),$("#difficulty"),$("input[name=radio-open]")),b=($("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))}),f=`${api_server_url}/v3/`,y={saveUserUcdFromXlsx:f+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:f+"ucd/set/charge/user/system",saveUserUcdByBiz:f+"ucd/set/charge/user/company",saveDoitUcdBySystem:f+"ucd/set/charge/doit/system",saveDoitUcdByBiz:f+"ucd/set/charge/doit/company",saveBizUcd:f+"ucd/set/charge/company/system",dashboardSummary:f+"main/dashboard",dashboardSummaryList:f+"main/dashboard/get/list",dashboardMoreLeader:f+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:f+"main/dashboard/get/doitRanklist",getProfile:f+"admin/get",updatePassword:f+"admin/update/pwd",memberList:f+"profile/get/list",detailMember:f+"profile/get/detail/info",levelUp:f+"profile/set/levelUp",levelDown:f+"profile/set/levelDown",cancelPartner:f+"profile/set/releasePartner",levelInfo:f+"profile/get/level",levelHistory:f+"profile/get/level/history",deviceInfo:f+"profile/get/device/info",memberDoitList:f+"profile/get/doit",memberCategoryList:f+"profile/get/category",memberActionList:f+"profile/get/action",memberActionDetail:f+"profile/get/detail/action",countPerLevel:f+"level/get/count",memberLevelList:f+"level/get/list",unlinkMemberList:f+"profile/get/unlink",changedMemberList:f+"profile/get/changed",badgeList:f+"badge/get/list",createBadge:f+"badge/create",detailBadge:f+"badge/get/detail/info",deleteBadge:f+"badge/delete",updateBadge:f+"badge/update",categoryList:f+"category/list",createCategory:f+"category/create",detailCategory:f+"category/detail",reorderCategory:f+"category/update/sequence",deleteCategory:f+"category/delete",updateCategory:f+"category/update",subCategoryList:f+"subcategory/list",createSubCategory:f+"subcategory/create",updateSubCategoryDoitImg:f+"subcategory/set/doit/image",deleteSubCategory:f+"subcategory/delete",reorderSubCategory:f+"subcategory/update/sequence",editSubCategory:f+"subcategory/update",keywordList:f+"keyword/get/list",createKeyword:f+"keyword/create",updateKeyword:f+"keyword/update",doitSponsorList:f+"doit/get/company",doitList:f+"doit/list",doitSetRecommend:f+"doit/set/recommend",createDoit:f+"doit/create",createDoitCategoryList:f+"category/exposure/list",detailDoit:f+"doit/detail",updateDoit:f+"doit/update",deleteDoit:f+"doit/delete",openDoit:f+"doit/set/open",stopDoit:f+"doit/set/stop",getDoitUcd:f+"ucd/get/doit",getUcdDoitList:f+"ucd/get/doit/list",missionList:f+"mission/get/list",createMission:f+"mission/create",detailMission:f+"mission/get/detail/info",updateMission:f+"mission/update",deleteMission:f+"mission/delete",joinMemberList:f+"member/get/list",infoJoinMember:f+"member/get/profile",rewardMemberList:f+"ucd/get/reward/profile",createReward:f+"ucd/set/reward/profile",countMember:f+"member/get/count",banMember:f+"member/set/retire",applyMemberList:f+"member/get/applylist",approvalMember:f+"member/get/applyConfirm",rejectMember:f+"member/get/applyReject",actionList:f+"action/get/list",detailAction:f+"action/get/detail/info",sendWarning:f+"action/set/yellow",cancelWarning:f+"action/set/yellowCancel",actionCommentList:f+"action/get/commentList",createActionComment:f+"action/set/insertComment",deleteActionComment:f+"action/set/deleteComment",actionReplyList:f+"action/get/comment/child/list",talkList:f+"board/get/list",createTalk:f+"board/create",detailTalk:f+"board/get/detail/info",updateTalk:f+"board/update",deleteTalk:f+"board/delete",talkCommentList:f+"board/get/commentList",createTalkComment:f+"board/set/insertComment",deleteTalkComment:f+"board/set/deleteComment",talkReplyList:f+"board/get/comment/child/list",pickList:f+"recommend/list",previewList:f+"recommend/get/doit",searchDoitList:f+"recommend/get/doit/list",reorderPick:f+"recommend/set",createPick:f+"recommend/create",updatePick:f+"recommend/update",detailPick:f+"recommend/detail",bizList:f+"biz/get/list",createBiz:f+"biz/create",detailBiz:f+"biz/get/detail/info",bizDoitList:f+"biz/get/detail/doit",bizUcdList:f+"ucd/list/get/company",updateBiz:f+"biz/update",getBizUcd:f+"ucd/get/company",noticeList:f+"notice/get/list",createNotice:f+"notice/create",detailNotice:f+"notice/get/detail/info",updateNotice:f+"notice/update",deleteNotice:f+"notice/delete",faqType:f+"faq/get/type",faqList:f+"faq/get/list",createFaq:f+"faq/create",detailFaq:f+"faq/get/detail/info",updateFaq:f+"faq/update",deleteFaq:f+"faq/delete",reorderFaq:f+"faq/set/orders",inquiryList:f+"qna/get/list",updateInquiry:f+"qna/set/insertComment",detailInquiry:f+"qna/get/detail/info",reportActionList:f+"report/get/action/list",actionReportReasonList:f+"report/get/action/descriptionList",reportTalkList:f+"report/get/board/list",talkReportReasonList:f+"report/get/board/descriptionList",blindTalk:f+"report/set/blind",bannerList:f+"banner/get/list",createBanner:f+"banner/create",detailBanner:f+"banner/get/detail/info",updateBanner:f+"banner/update",reorderBanner:f+"banner/set/orders",targetEventList:f+"banner/get/event/list",targetDoitList:f+"banner/get/doit/list",targetNoticeList:f+"banner/get/notice/list",storyList:f+"story/get/list",createStory:f+"story/create",detailStory:f+"story/get/detail/info",updateStory:f+"story/update",reorderStory:f+"story/set/orders",eventList:f+"event/get/list",createEvent:f+"event/create",detailEvent:f+"event/get/detail/info",deleteEvent:f+"event/delete",updateEvent:f+"event/update",customEvent:f+"event/popup/get/list",customEventProfile:f+"event/popup/get/profile",pushList:f+"push/list",cancelPush:f+"push/set/cancel",createPush:f+"push/create",pushTargetNotice:f+"push/get/notice",pushTargetEvent:f+"push/get/event",pushTargetDoit:f+"push/get/doit",pushTargetMember:f+"push/get/profile",pushTargetMemberFromXlsx:f+"excel/import/notification/profile",popupList:f+"popup/get/list",createPopup:f+"popup/create",detailPopup:f+"popup/get/detail/info",updatePopup:f+"popup/update",deletePopup:f+"popup/delete",errorList:f+"error/list",updateError:f+"error/update",createEncryption:f+"operate/set/encryption",createDecryption:f+"operate/set/decryption",versionList:f+"operate/get/version/list",createVersion:f+"operate/version/create",deleteVersion:f+"operate/version/delete",getMemberForSaveUcd:f+"ucd/get/user/list",getMemberFromXlsx:f+"excel/import/profile",getDoitFromXlsx:f+"excel/import/doit",ucdChargeList:f+"ucd/list/get/charge",systemWalletType:f+"ucd/get/system/type",systemWalletList:f+"ucd/list/get/system",doitWalletList:f+"ucd/list/get/doit",memberWalletList:f+"ucd/list/get/user",pendingWalletList:f+"ucd/list/get/transfer",giftList:f+"gift/get/list",reorderGiftList:f+"gift/get/orderList",reorderGift:f+"gift/set/orders",createGift:f+"gift/create",ktGoodsList:f+"gift/get/kt/goods",detailGift:f+"gift/get/detail/info",updateGift:f+"gift/update",applyGiftList:f+"exchange/get/list",sendGifticon:f+"exchange/set/confirm",sendGeneralGift:f+"exchange/set/send",rejectGift:f+"exchange/set/reject",resendGift:f+"exchange/set/resend",getGiftBalance:f+"exchange/get/money",sendGiftList:f+"exchange/get/sendList",sendGiftStatusList:f+"exchange/get/payment",updateGiftSendMemo:f+"exchange/set/insertMemo",adminList:f+"admin/list",detailAdmin:f+"admin/detail",updateAdmin:f+"admin/update",deleteAdmin:f+"admin/delete",authBizList:f+"auth/get/biz/list",approvalAdmin:f+"admin/approval",authList:f+"auth/list",getMenuWithAuth:f+"auth/get/menu",setMenuWithAuth:f+"auth/set/menu",createAuth:f+"auth/create",deleteAuth:f+"auth/delete",promotionList:f+"promotion/get/list",createPromotion:f+"promotion/create",detailPromotion:f+"promotion/detail",updatePromotion:f+"promotion/update"},h=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}),T="목록이 없습니다.";function v(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function k(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function L(e){return k(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function D(){return window.location.pathname}function S(e){i.removeClass("active"),$(e).addClass("active"),$(e).hasClass("today")?n.val(w()):$(e).hasClass("week")?(o.val(function(){const e=new Date;return e.setDate(e.getDate()-6),C(e)}()),r.val(w())):$(e).hasClass("month")?(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-1),C(e)}()),r.val(w())):$(e).hasClass("months")&&(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-3),C(e)}()),r.val(w()))}function C(e){const t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return`${t}-${v(a)}-${v(i)}`}function w(){return C(new Date)}let M=1;function A(){t.each((function(){$(this).children().eq(0).prop("selected",!0)})),l.val(""),g.eq(0).prop("checked",!0)}function U(){M=1;let e=m.DataTable();e.page.len(Number(p.val())),e.ajax.reload()}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:T,zeroRecords:T,processing:"검색 중..",paginate:{previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>'}}}),p.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),function(){const e=window.performance.getEntriesByType("navigation")[0],t=k(e)?window.performance.navigation.type:e.type;let a=!1;return"back_forward"!==t&&2!==t||sessionStorage.getItem("page")===D()&&(a=!0),a}()?function(){const e=JSON.parse(sessionStorage.getItem("param"));s.val(e.search_type),l.val(e.keyword),u.val(e.badge_type),g.each((function(){$(this).prop("checked",$(this).val()===e.is_display)})),p.val(e.limit),M=e.page}():A(),m.DataTable({ajax:{url:y.badgeList,type:"POST",headers:b,dataFilter:function(e){let t=JSON.parse(e);var a;return function(e){return 0===function(e){return e.status}(e)}(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],a=function(e){return e.msg}(t),h.fire({icon:"info",title:a})),JSON.stringify(t)},data:function(e){return function(){const e={search_type:s.val(),keyword:l.val().trim(),badge_type:u.val(),is_display:$("input[name=radio-open]:checked").val(),page:M,limit:p.val()};return function(e){e=k(e)?"":JSON.stringify(e),sessionStorage.setItem("param",e),sessionStorage.setItem("page",D())}(e),JSON.stringify(e)}()},error:function(e,t){Swal.fire({icon:"error",html:"목록을(를) 불러올 수 없습니다."})}},columns:[{title:"뱃지명",data:"title",width:"15%",render:function(e,t,a,i){return`<a href="/v2/member/badge/detail/${a.idx}">${e}</a>`}},{title:"설명",data:"description",width:"15%"},{title:"타입",data:"type",width:"10%",render:function(e){switch(e){case"ongoing":return"연속 인증";case"action":return"누적 인증";case"leader":return"리더 랭킹";default:return"-"}}},{title:"취득조건(횟수/순위)",data:"terms",width:"10%",render:function(e){return L(e)}},{title:"난이도",data:"priority",width:"10%",render:function(e){return L(e)}},{title:"이미지",data:"image_url",width:"8%",render:function(e){return`<div class="list-img-wrap"><img src="${e}" alt=""></div>`}},{title:"팝업 이미지",data:"popup_image_url",width:"8%",render:function(e){return`<div class="list-img-wrap"><img src="${e}" alt=""></div>`}},{title:"Lottie 타입",data:"popup_lottie_type",width:"8%"},{title:"공개여부",data:"is_display",width:"5%"},{title:"등록일",data:"created",width:"10%",render:function(e){return e.substring(0,10)}}],serverSide:!0,paging:!0,pageLength:Number(p.val()),select:!1,destroy:!1,initComplete:function(){var e;$(this).on("page.dt",(function(){M=function(e){let t=$(e).DataTable().page.info();return t.start/t.length+1}(this)})),e=M,$(this).DataTable().page(e-1).draw("page")},fnRowCallback:function(e,t){},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=L(function(e){return e.DataTable().page.info().recordsTotal}(e));$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0),$("img").on("error",(function(){$(this).attr("src","/assets/v2/img/no-image.jpg")}))}}),e.on("keydown",(function(e){!function(e){13===e.keyCode&&U()}(e)})),p.on("change",(function(){U()})),d.on("click",(function(){U()})),c.on("click",(function(){A()})),i.on("click",(function(){S(this)}))}))})();