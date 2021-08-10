(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),o=$(".datepicker"),n=$(".date-from"),r=$(".date-to"),s=$("#selDateType"),l=$("#selSearchType"),d=($("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),c=$("#btnSearch"),m=$("#btnReset"),p=($("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),u=($("#selSort"),$("#dataTable")),g=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$("#btnJoinMembers"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBan"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("#versionDigit"),$("#versionDecimal"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#promotionDate"),$("#createDate"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))}),b=`${api_server_url}/v3/`,f={saveUserUcdFromXlsx:b+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:b+"ucd/set/charge/user/system",saveUserUcdByBiz:b+"ucd/set/charge/user/company",saveDoitUcdBySystem:b+"ucd/set/charge/doit/system",saveDoitUcdByBiz:b+"ucd/set/charge/doit/company",saveBizUcd:b+"ucd/set/charge/company/system",dashboardSummary:b+"main/dashboard",dashboardSummaryList:b+"main/dashboard/get/list",dashboardMoreLeader:b+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:b+"main/dashboard/get/doitRanklist",getProfile:b+"admin/get",updatePassword:b+"admin/update/pwd",memberList:b+"profile/get/list",detailMember:b+"profile/get/detail/info",levelUp:b+"profile/set/levelUp",levelDown:b+"profile/set/levelDown",cancelPartner:b+"profile/set/releasePartner",levelInfo:b+"profile/get/level",levelHistory:b+"profile/get/level/history",deviceInfo:b+"profile/get/device/info",memberDoitList:b+"profile/get/doit",memberCategoryList:b+"profile/get/category",memberActionList:b+"profile/get/action",memberActionDetail:b+"profile/get/detail/action",countPerLevel:b+"level/get/count",memberLevelList:b+"level/get/list",unlinkMemberList:b+"profile/get/unlink",changedMemberList:b+"profile/get/changed",badgeList:b+"badge/get/list",createBadge:b+"badge/create",detailBadge:b+"badge/get/detail/info",deleteBadge:b+"badge/delete",updateBadge:b+"badge/update",categoryList:b+"category/list",createCategory:b+"category/create",detailCategory:b+"category/detail",reorderCategory:b+"category/update/sequence",deleteCategory:b+"category/delete",updateCategory:b+"category/update",subCategoryList:b+"subcategory/list",createSubCategory:b+"subcategory/create",updateSubCategoryDoitImg:b+"subcategory/set/doit/image",deleteSubCategory:b+"subcategory/delete",reorderSubCategory:b+"subcategory/update/sequence",editSubCategory:b+"subcategory/update",keywordList:b+"keyword/get/list",createKeyword:b+"keyword/create",updateKeyword:b+"keyword/update",doitSponsorList:b+"doit/get/company",doitList:b+"doit/list",doitSetRecommend:b+"doit/set/recommend",createDoit:b+"doit/create",createDoitCategoryList:b+"category/exposure/list",detailDoit:b+"doit/detail",updateDoit:b+"doit/update",deleteDoit:b+"doit/delete",openDoit:b+"doit/set/open",stopDoit:b+"doit/set/stop",getDoitUcd:b+"ucd/get/doit",getUcdDoitList:b+"ucd/get/doit/list",missionList:b+"mission/get/list",createMission:b+"mission/create",detailMission:b+"mission/get/detail/info",updateMission:b+"mission/update",deleteMission:b+"mission/delete",joinMemberList:b+"member/get/list",infoJoinMember:b+"member/get/profile",rewardMemberList:b+"ucd/get/reward/profile",createReward:b+"ucd/set/reward/profile",countMember:b+"member/get/count",banMember:b+"member/set/retire",applyMemberList:b+"member/get/applylist",approvalMember:b+"member/get/applyConfirm",rejectMember:b+"member/get/applyReject",actionList:b+"action/get/list",detailAction:b+"action/get/detail/info",sendWarning:b+"action/set/yellow",cancelWarning:b+"action/set/yellowCancel",actionCommentList:b+"action/get/commentList",createActionComment:b+"action/set/insertComment",deleteActionComment:b+"action/set/deleteComment",actionReplyList:b+"action/get/comment/child/list",talkList:b+"board/get/list",createTalk:b+"board/create",detailTalk:b+"board/get/detail/info",updateTalk:b+"board/update",deleteTalk:b+"board/delete",talkCommentList:b+"board/get/commentList",createTalkComment:b+"board/set/insertComment",deleteTalkComment:b+"board/set/deleteComment",talkReplyList:b+"board/get/comment/child/list",pickList:b+"recommend/list",previewList:b+"recommend/get/doit",searchDoitList:b+"recommend/get/doit/list",reorderPick:b+"recommend/set",createPick:b+"recommend/create",updatePick:b+"recommend/update",detailPick:b+"recommend/detail",bizList:b+"biz/get/list",createBiz:b+"biz/create",detailBiz:b+"biz/get/detail/info",bizDoitList:b+"biz/get/detail/doit",bizUcdList:b+"ucd/list/get/company",updateBiz:b+"biz/update",getBizUcd:b+"ucd/get/company",noticeList:b+"notice/get/list",createNotice:b+"notice/create",detailNotice:b+"notice/get/detail/info",updateNotice:b+"notice/update",deleteNotice:b+"notice/delete",faqType:b+"faq/get/type",faqList:b+"faq/get/list",createFaq:b+"faq/create",detailFaq:b+"faq/get/detail/info",updateFaq:b+"faq/update",deleteFaq:b+"faq/delete",reorderFaq:b+"faq/set/orders",inquiryList:b+"qna/get/list",updateInquiry:b+"qna/set/insertComment",detailInquiry:b+"qna/get/detail/info",reportActionList:b+"report/get/action/list",actionReportReasonList:b+"report/get/action/descriptionList",reportTalkList:b+"report/get/board/list",talkReportReasonList:b+"report/get/board/descriptionList",blindTalk:b+"report/set/blind",bannerList:b+"banner/get/list",createBanner:b+"banner/create",detailBanner:b+"banner/get/detail/info",updateBanner:b+"banner/update",reorderBanner:b+"banner/set/orders",targetEventList:b+"banner/get/event/list",targetDoitList:b+"banner/get/doit/list",targetNoticeList:b+"banner/get/notice/list",storyList:b+"story/get/list",createStory:b+"story/create",detailStory:b+"story/get/detail/info",updateStory:b+"story/update",reorderStory:b+"story/set/orders",eventList:b+"event/get/list",createEvent:b+"event/create",detailEvent:b+"event/get/detail/info",deleteEvent:b+"event/delete",updateEvent:b+"event/update",customEvent:b+"event/popup/get/list",customEventProfile:b+"event/popup/get/profile",pushList:b+"push/list",cancelPush:b+"push/set/cancel",createPush:b+"push/create",pushTargetNotice:b+"push/get/notice",pushTargetEvent:b+"push/get/event",pushTargetDoit:b+"push/get/doit",pushTargetMember:b+"push/get/profile",pushTargetMemberFromXlsx:b+"excel/import/notification/profile",popupList:b+"popup/get/list",createPopup:b+"popup/create",detailPopup:b+"popup/get/detail/info",updatePopup:b+"popup/update",deletePopup:b+"popup/delete",errorList:b+"error/list",updateError:b+"error/update",createEncryption:b+"operate/set/encryption",createDecryption:b+"operate/set/decryption",versionList:b+"operate/get/version/list",createVersion:b+"operate/version/create",deleteVersion:b+"operate/version/delete",getMemberForSaveUcd:b+"ucd/get/user/list",getMemberFromXlsx:b+"excel/import/profile",getDoitFromXlsx:b+"excel/import/doit",ucdChargeList:b+"ucd/list/get/charge",systemWalletType:b+"ucd/get/system/type",systemWalletList:b+"ucd/list/get/system",doitWalletList:b+"ucd/list/get/doit",memberWalletList:b+"ucd/list/get/user",pendingWalletList:b+"ucd/list/get/transfer",giftList:b+"gift/get/list",reorderGiftList:b+"gift/get/orderList",reorderGift:b+"gift/set/orders",createGift:b+"gift/create",ktGoodsList:b+"gift/get/kt/goods",detailGift:b+"gift/get/detail/info",updateGift:b+"gift/update",applyGiftList:b+"exchange/get/list",sendGifticon:b+"exchange/set/confirm",sendGeneralGift:b+"exchange/set/send",rejectGift:b+"exchange/set/reject",resendGift:b+"exchange/set/resend",getGiftBalance:b+"exchange/get/money",sendGiftList:b+"exchange/get/sendList",sendGiftStatusList:b+"exchange/get/payment",updateGiftSendMemo:b+"exchange/set/insertMemo",adminList:b+"admin/list",detailAdmin:b+"admin/detail",updateAdmin:b+"admin/update",deleteAdmin:b+"admin/delete",authBizList:b+"auth/get/biz/list",approvalAdmin:b+"admin/approval",authList:b+"auth/list",getMenuWithAuth:b+"auth/get/menu",setMenuWithAuth:b+"auth/set/menu",createAuth:b+"auth/create",deleteAuth:b+"auth/delete",promotionList:b+"promotion/get/list",createPromotion:b+"promotion/create",detailPromotion:b+"promotion/get/detail",updatePromotion:b+"promotion/update",closePromotion:b+"promotion/set/end",promotionDoitList:b+"promotion/get/doit/list"},y={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},h=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}),v="목록이 없습니다.";function T(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function k(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function D(){return window.location.pathname}function L(e){const t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return`${t}-${T(a)}-${T(i)}`}function S(){return L(new Date)}function C(){n.val(function(){const e=new Date;return e.setMonth(e.getMonth()-3),L(e)}()),r.val(S())}function w(){i.removeClass("active")}let M=1;function A(){w(),C(),t.each((function(){$(this).children().eq(0).prop("selected",!0)})),d.val("")}function U(){M=1;let e=u.DataTable();e.page.len(Number(p.val())),e.ajax.reload()}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:v,zeroRecords:v,processing:"검색 중..",paginate:{previous:y.previous,next:y.next}}}),o.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:y.monthNames,dayNames:y.dayNames,dayNamesMin:y.dayNames}),p.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),function(){const e=window.performance.getEntriesByType("navigation")[0],t=k(e)?window.performance.navigation.type:e.type;let a=!1;return"back_forward"!==t&&2!==t||sessionStorage.getItem("page")===D()&&(a=!0),a}()?function(){const e=JSON.parse(sessionStorage.getItem("param"));s.val(e.date_type),n.val(e.from_date),r.val(e.to_date),l.val(e.search_type),d.val(e.keyword),p.val(e.limit),M=e.page}():A(),u.DataTable({ajax:{url:f.promotionList,type:"POST",headers:g,dataFilter:function(e){let t=JSON.parse(e);var a;return function(e){return 0===function(e){return e.status}(e)}(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],a=function(e){return e.msg}(t),h.fire({icon:"info",title:a})),JSON.stringify(t)},data:function(e){return function(){const e={date_type:s.val(),from_date:n.val(),to_date:r.val(),search_type:l.val(),keyword:d.val().trim(),page:M,limit:p.val()};return function(e){e=k(e)?"":JSON.stringify(e),sessionStorage.setItem("param",e),sessionStorage.setItem("page",D())}(e),JSON.stringify(e)}()},error:function(e,t){var a;a=y.list+"을(를) 불러올 수 없습니다.",Swal.fire({icon:"error",html:a})}},columns:[{title:"프로모션명",data:"promotion_title",width:"30%",render:function(e,t,a,i){return`<a href="/v2/promotion/detail/${a.idx}">${e}</a>`}},{title:"스폰서",data:"nickname",width:"25%"},{title:"이미지",data:"promotion_image_url",width:"15%",render:function(e){return`<div class="list-img-wrap"><img src="${e}" alt=""></div>`}},{title:"기간",data:"start_date",width:"20%",render:function(e,t,a,i){return`${a.start_date} ~ ${a.end_date}`}},{title:"상태",data:"state",width:"10%"}],serverSide:!0,paging:!0,pageLength:Number(p.val()),select:!1,destroy:!1,initComplete:function(){var e;$(this).on("page.dt",(function(){M=function(e){let t=$(e).DataTable().page.info();return t.start/t.length+1}(this)})),e=M,$(this).DataTable().page(e-1).draw("page")},fnRowCallback:function(e,t){},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=k(i=function(e){return e.DataTable().page.info().recordsTotal}(e))||isNaN(i)?0:i.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");var i;$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),e.on("keydown",(function(e){!function(e){13===e.keyCode&&U()}(e)})),n.on("change",(function(){r.datepicker("option","minDate",new Date(n.datepicker("getDate"))),w()})),r.on("change",(function(){n.datepicker("option","maxDate",new Date(r.datepicker("getDate"))),w()})),p.on("change",(function(){U()})),c.on("click",(function(){U()})),m.on("click",(function(){A()})),i.on("click",(function(){var e;e=this,w(),$(e).addClass("active"),$(e).hasClass("today")?o.val(S()):$(e).hasClass("week")?(n.val(function(){const e=new Date;return e.setDate(e.getDate()-6),L(e)}()),r.val(S())):$(e).hasClass("month")?(n.val(function(){const e=new Date;return e.setMonth(e.getMonth()-1),L(e)}()),r.val(S())):$(e).hasClass("months")&&C()}))}))})();