(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),n=$(".datepicker"),o=$(".date-from"),r=$(".date-to"),s=$("#selDateType"),l=($("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]")),d=($("input[name=radio-status]"),$("#keyword")),c=$("#btnSearch"),p=$("#btnReset"),m=($("#btnSubmit"),$("#btnCancel"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),u=($("#selSort"),$("#dataTable")),g=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close")),b=$(".modal-content"),f=$(".modal-bg"),h=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$("#btnJoinMembers"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBan"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk")),y=$("#btnDisplayTalk"),v=($("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason")),k=$("#reasonTable"),T=$("input[name=radio-report]"),D=($("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("#versionDigit"),$("#versionDecimal"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))});function L(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function w(e){return 0===function(e){return e.status}(e)}function S(e){return e.msg}const C=`${api_server_url}/v3/`,M={saveUserUcdFromXlsx:C+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:C+"ucd/set/charge/user/system",saveUserUcdByBiz:C+"ucd/set/charge/user/company",saveDoitUcdBySystem:C+"ucd/set/charge/doit/system",saveDoitUcdByBiz:C+"ucd/set/charge/doit/company",saveBizUcd:C+"ucd/set/charge/company/system",dashboardSummary:C+"main/dashboard",dashboardSummaryList:C+"main/dashboard/get/list",dashboardMoreLeader:C+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:C+"main/dashboard/get/doitRanklist",getProfile:C+"admin/get",updatePassword:C+"admin/update/pwd",memberList:C+"profile/get/list",detailMember:C+"profile/get/detail/info",levelUp:C+"profile/set/levelUp",levelDown:C+"profile/set/levelDown",cancelPartner:C+"profile/set/releasePartner",levelInfo:C+"profile/get/level",levelHistory:C+"profile/get/level/history",deviceInfo:C+"profile/get/device/info",memberDoitList:C+"profile/get/doit",memberCategoryList:C+"profile/get/category",memberActionList:C+"profile/get/action",memberActionDetail:C+"profile/get/detail/action",countPerLevel:C+"level/get/count",memberLevelList:C+"level/get/list",unlinkMemberList:C+"profile/get/unlink",changedMemberList:C+"profile/get/changed",badgeList:C+"badge/get/list",createBadge:C+"badge/create",detailBadge:C+"badge/get/detail/info",deleteBadge:C+"badge/delete",updateBadge:C+"badge/update",categoryList:C+"category/list",createCategory:C+"category/create",detailCategory:C+"category/detail",reorderCategory:C+"category/update/sequence",deleteCategory:C+"category/delete",updateCategory:C+"category/update",subCategoryList:C+"subcategory/list",createSubCategory:C+"subcategory/create",updateSubCategoryDoitImg:C+"subcategory/set/doit/image",deleteSubCategory:C+"subcategory/delete",reorderSubCategory:C+"subcategory/update/sequence",editSubCategory:C+"subcategory/update",keywordList:C+"keyword/get/list",createKeyword:C+"keyword/create",updateKeyword:C+"keyword/update",doitSponsorList:C+"doit/get/company",doitList:C+"doit/list",doitSetRecommend:C+"doit/set/recommend",createDoit:C+"doit/create",createDoitCategoryList:C+"category/exposure/list",detailDoit:C+"doit/detail",updateDoit:C+"doit/update",deleteDoit:C+"doit/delete",openDoit:C+"doit/set/open",stopDoit:C+"doit/set/stop",getDoitUcd:C+"ucd/get/doit",getUcdDoitList:C+"ucd/get/doit/list",missionList:C+"mission/get/list",createMission:C+"mission/create",detailMission:C+"mission/get/detail/info",updateMission:C+"mission/update",deleteMission:C+"mission/delete",joinMemberList:C+"member/get/list",infoJoinMember:C+"member/get/profile",rewardMemberList:C+"ucd/get/reward/profile",createReward:C+"ucd/set/reward/profile",countMember:C+"member/get/count",banMember:C+"member/set/retire",applyMemberList:C+"member/get/applylist",approvalMember:C+"member/get/applyConfirm",rejectMember:C+"member/get/applyReject",actionList:C+"action/get/list",detailAction:C+"action/get/detail/info",sendWarning:C+"action/set/yellow",cancelWarning:C+"action/set/yellowCancel",actionCommentList:C+"action/get/commentList",createActionComment:C+"action/set/insertComment",deleteActionComment:C+"action/set/deleteComment",actionReplyList:C+"action/get/comment/child/list",talkList:C+"board/get/list",createTalk:C+"board/create",detailTalk:C+"board/get/detail/info",updateTalk:C+"board/update",deleteTalk:C+"board/delete",talkCommentList:C+"board/get/commentList",createTalkComment:C+"board/set/insertComment",deleteTalkComment:C+"board/set/deleteComment",talkReplyList:C+"board/get/comment/child/list",pickList:C+"recommend/list",previewList:C+"recommend/get/doit",searchDoitList:C+"recommend/get/doit/list",reorderPick:C+"recommend/set",createPick:C+"recommend/create",updatePick:C+"recommend/update",detailPick:C+"recommend/detail",bizList:C+"biz/get/list",createBiz:C+"biz/create",detailBiz:C+"biz/get/detail/info",bizDoitList:C+"biz/get/detail/doit",bizUcdList:C+"ucd/list/get/company",updateBiz:C+"biz/update",getBizUcd:C+"ucd/get/company",noticeList:C+"notice/get/list",createNotice:C+"notice/create",detailNotice:C+"notice/get/detail/info",updateNotice:C+"notice/update",deleteNotice:C+"notice/delete",faqType:C+"faq/get/type",faqList:C+"faq/get/list",createFaq:C+"faq/create",detailFaq:C+"faq/get/detail/info",updateFaq:C+"faq/update",deleteFaq:C+"faq/delete",reorderFaq:C+"faq/set/orders",inquiryList:C+"qna/get/list",updateInquiry:C+"qna/set/insertComment",detailInquiry:C+"qna/get/detail/info",reportActionList:C+"report/get/action/list",actionReportReasonList:C+"report/get/action/descriptionList",reportTalkList:C+"report/get/board/list",talkReportReasonList:C+"report/get/board/descriptionList",blindTalk:C+"report/set/blind",bannerList:C+"banner/get/list",createBanner:C+"banner/create",detailBanner:C+"banner/get/detail/info",updateBanner:C+"banner/update",reorderBanner:C+"banner/set/orders",targetEventList:C+"banner/get/event/list",targetDoitList:C+"banner/get/doit/list",targetNoticeList:C+"banner/get/notice/list",storyList:C+"story/get/list",createStory:C+"story/create",detailStory:C+"story/get/detail/info",updateStory:C+"story/update",reorderStory:C+"story/set/orders",eventList:C+"event/get/list",createEvent:C+"event/create",detailEvent:C+"event/get/detail/info",deleteEvent:C+"event/delete",updateEvent:C+"event/update",customEvent:C+"event/popup/get/list",customEventProfile:C+"event/popup/get/profile",pushList:C+"push/list",cancelPush:C+"push/set/cancel",createPush:C+"push/create",pushTargetNotice:C+"push/get/notice",pushTargetEvent:C+"push/get/event",pushTargetDoit:C+"push/get/doit",pushTargetMember:C+"push/get/profile",pushTargetMemberFromXlsx:C+"excel/import/notification/profile",popupList:C+"popup/get/list",createPopup:C+"popup/create",detailPopup:C+"popup/get/detail/info",updatePopup:C+"popup/update",deletePopup:C+"popup/delete",errorList:C+"error/list",updateError:C+"error/update",createEncryption:C+"operate/set/encryption",createDecryption:C+"operate/set/decryption",versionList:C+"operate/get/version/list",createVersion:C+"operate/version/create",deleteVersion:C+"operate/version/delete",getMemberForSaveUcd:C+"ucd/get/user/list",getMemberFromXlsx:C+"excel/import/profile",getDoitFromXlsx:C+"excel/import/doit",ucdChargeList:C+"ucd/list/get/charge",systemWalletType:C+"ucd/get/system/type",systemWalletList:C+"ucd/list/get/system",doitWalletList:C+"ucd/list/get/doit",memberWalletList:C+"ucd/list/get/user",pendingWalletList:C+"ucd/list/get/transfer",giftList:C+"gift/get/list",reorderGiftList:C+"gift/get/orderList",reorderGift:C+"gift/set/orders",createGift:C+"gift/create",ktGoodsList:C+"gift/get/kt/goods",detailGift:C+"gift/get/detail/info",updateGift:C+"gift/update",applyGiftList:C+"exchange/get/list",sendGifticon:C+"exchange/set/confirm",sendGeneralGift:C+"exchange/set/send",rejectGift:C+"exchange/set/reject",resendGift:C+"exchange/set/resend",getGiftBalance:C+"exchange/get/money",sendGiftList:C+"exchange/get/sendList",sendGiftStatusList:C+"exchange/get/payment",updateGiftSendMemo:C+"exchange/set/insertMemo",adminList:C+"admin/list",detailAdmin:C+"admin/detail",updateAdmin:C+"admin/update",deleteAdmin:C+"admin/delete",authBizList:C+"auth/get/biz/list",approvalAdmin:C+"admin/approval",authList:C+"auth/list",getMenuWithAuth:C+"auth/get/menu",setMenuWithAuth:C+"auth/set/menu",createAuth:C+"auth/create",deleteAuth:C+"auth/delete",promotionList:C+"promotion/get/list",createPromotion:C+"promotion/create",detailPromotion:C+"promotion/get/detail",updatePromotion:C+"promotion/update",deletePromotion:C+"promotion/delete",promotionDoitList:C+"promotion/get/doit/list"},x={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},A=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function U(e){A.fire({icon:"info",title:e})}function I(e){Swal.fire({icon:"error",html:e})}function W(e,t){Swal.fire({text:e,showCancelButton:!0,confirmButtonText:x.confirm,cancelButtonText:x.cancel}).then((e=>{e.value&&t()}))}const N="목록이 없습니다.",_="을(를) 불러올 수 없습니다.";function B(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function P(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function F(e){return P(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function q(){return window.location.pathname}const E="/v2/doit/detail/",z="/v2/report/talk/detail_talk/",R="/v2/report/talk/detail_action/";function O(){b.fadeOut(),f.fadeOut(),$("body").css("overflow-y","auto")}function G(e){const t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return`${t}-${B(a)}-${B(i)}`}function j(){return G(new Date)}function J(){n.val(j())}function K(){i.removeClass("active")}let Y,X,H,Q=1;function V(){K(),n.datepicker("option","minDate","2020-07-01"),n.datepicker("option","maxDate","today"),J(),t.each((function(){$(this).children().eq(0).prop("selected",!0)})),d.val(""),l.eq(0).prop("checked",!0),T.eq(1).prop("checked",!0)}function Z(){Q=1;let e=u.DataTable();e.page.len(Number(m.val())),e.ajax.reload()}function ee(){return 0!==$("input[name=chk-row]:checked").length||(U("대상을 선택해주세요."),!1)}function te(){const e=u.DataTable().rows(".selected").data(),t="talk"===$("input[name=radio-type]:checked").val();let a=[],i=[],n=[];for(let o=0;o<e.length;o++)t?P(e[o].comment_uuid)?a.push(e[o].board_uuid):i.push(e[o].comment_uuid):n.push(e[o].comment_uuid);const o={is_blind:H,board:a,board_comment:i,action_comment:n};var r,s;(!0,r=M.blindTalk,s=JSON.stringify(o),new Promise(((e,t)=>{$.ajax({global:true,url:r,type:"POST",headers:D,contentType:"text/plain",dataType:"json",data:s,success:function(t){e(t)},error:function(e,a,i){t(i)},complete:function(e,t){}})}))).then((async function(e,t,a){await function(e,t){Swal.fire({toast:!0,position:"center",icon:w(e)?"success":"error",title:L(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&w(e)&&t()}))}(e,ae)})).catch((e=>I("블라인드 처리 중, 오류가 발생했습니다.")))}function ae(){!function(e){let t=e.DataTable();t.ajax.reload(null,!1),0===t.data().length&&t.page("last").draw("page"),$("input[name=chk-row]").prop("checked",!1),$("#checkAll").prop("checked",!1)}(u)}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:N,zeroRecords:N,processing:"검색 중..",paginate:{previous:x.previous,next:x.next}}}),n.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:x.monthNames,dayNames:x.dayNames,dayNamesMin:x.dayNames}),m.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),function(){const e=window.performance.getEntriesByType("navigation")[0],t=P(e)?window.performance.navigation.type:e.type;let a=!1;return"back_forward"!==t&&2!==t||sessionStorage.getItem("page")===q()&&(a=!0),a}()?function(){let e=JSON.parse(sessionStorage.getItem("param"));o.val(e.from_date),r.val(e.to_date),d.val(e.keyword),l.each((function(){$(this).prop("checked",e.talk_division===$(this).val())})),T.each((function(){$(this).prop("checked",e.report_status===$(this).val())})),s.val(e.date_type),m.val(e.limit),Q=e.page}():V(),u.DataTable({ajax:{url:M.reportTalkList,type:"POST",headers:D,dataFilter:function(e){let t=JSON.parse(e);return w(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],U(S(t))),JSON.stringify(t)},data:function(e){return function(){const e={date_type:s.val(),from_date:o.val(),to_date:r.val(),page:Q,limit:m.val(),talk_division:$("input[name=radio-type]:checked").val(),report_status:$("input[name=radio-report]:checked").val()};return function(e){e=P(e)?"":JSON.stringify(e),sessionStorage.setItem("param",e),sessionStorage.setItem("page",q())}(e),JSON.stringify(e)}()},error:function(e,t){I(x.list+_)}},columns:[{title:"두잇명",data:"doit_title",width:"21%",render:function(e,t,a,i){return`<a href="${E}${a.doit_idx}" class="link">${e}</a>`}},{title:"유형",data:"talk_type",width:"5%"},{title:"작성자",data:"nickname",width:"15%",render:function(e,t,a,i){return"Y"===a.is_company?x.bizIcon+e:e}},{title:"내용",data:"contents",width:"20%",render:function(e,t,a,i){return`<a class="line-clamp-1" style="max-width: 300px;" href="${"talk"===$("input[name=radio-type]:checked").val()?z:R}${a.board_idx}">${e}</a>`}},{title:"댓글수",data:"comment_cnt",width:"4%",render:function(e){return F(e)}},{title:"좋아요",data:"like_count",width:"4%",render:function(e){return F(e)}},{title:"신고",data:"report_count",width:"4%",render:function(e,t,a,i){const n=P(a.comment_uuid),o=P(a.comment_uuid)?a.board_uuid:a.comment_uuid;return Number(e)>0?`<a class="report-count" data-isboard="${n}" data-uuid="${o}">${F(e)}</a>`:e}},{title:"블라인드",data:"is_blind",width:"5%"},{title:"작성일",data:"created",width:"8%",render:function(e){return e.substring(0,10)}},{title:"",data:"board_idx",width:"4%",render:function(e,t,a,i){return`<div class="checkbox-wrap"><input type="checkbox" name="chk-row" id="${n=i.row}"/><label for="${n}"><span></span></label></div>`;var n}}],serverSide:!0,paging:!0,pageLength:Number(m.val()),select:{style:"multi",selector:":checkbox"},destroy:!0,initComplete:function(){var e;$(this).on("page.dt",(function(){Q=function(e){let t=$(e).DataTable().page.info();return t.start/t.length+1}(this)})),e=Q,$(this).DataTable().page(e-1).draw("page")},fnRowCallback:function(e,t){$(e).children().eq(6).find("a").on("click",(function(){Y=$(this).data("isboard"),X=$(this).data("uuid"),v.fadeIn(),f.fadeIn(),$("body").css("overflow-y","hidden"),k.DataTable({ajax:{url:M.talkReportReasonList,type:"POST",headers:D,global:!1,dataFilter:function(e){let t=JSON.parse(e);return w(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],U(S(t))),JSON.stringify(t)},data:function(e){const t={board_uuid:Y?X:"",comment_uuid:Y?"":X};return JSON.stringify(t)},error:function(e,t){I(x.list+_)}},columns:[{title:"일자",data:"created",width:"25%"},{title:"사유",data:"report_description",width:"75%"}],serverSide:!0,paging:!1,select:!1,scrollY:450,scrollCollapse:!0,destroy:!0})}))},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=F(function(e){return e.DataTable().page.info().recordsTotal}(e));$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),e.on("keydown",(function(e){!function(e){13===e.keyCode&&Z()}(e)})),g.on("click",(function(){O()})),f.on("click",(function(){O()})),o.on("change",(function(){r.datepicker("option","minDate",new Date(o.datepicker("getDate"))),K()})),r.on("change",(function(){o.datepicker("option","maxDate",new Date(r.datepicker("getDate"))),K()})),m.on("change",(function(){Z()})),c.on("click",(function(){Z()})),p.on("click",(function(){V()})),i.on("click",(function(){var e;e=this,K(),$(e).addClass("active"),$(e).hasClass("today")?J():$(e).hasClass("week")?(o.val(function(){const e=new Date;return e.setDate(e.getDate()-6),G(e)}()),r.val(j())):$(e).hasClass("month")?(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-1),G(e)}()),r.val(j())):$(e).hasClass("months")&&(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-3),G(e)}()),r.val(j()))})),h.on("click",(function(){H="Y",ee()&&W("블라인드하시겠습니까?",te)})),y.on("click",(function(){H="N",ee()&&W("블라인드 해제하시겠습니까?",te)}))}))})();