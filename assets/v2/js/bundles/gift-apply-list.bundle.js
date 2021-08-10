(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),n=$(".datepicker"),o=$(".date-from"),r=$(".date-to"),s=$("#selDateType"),l=$("#selSearchType"),c=($("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]")),d=($("input[name=radio-status]"),$("#keyword")),p=$("#btnSearch"),m=$("#btnReset"),u=($("#btnSubmit"),$("#btnCancel")),g=($("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),b=($("#selSort"),$("#dataTable")),f=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo")),h=($("#title"),$("#content"),$("#contentImage"),$("#reserveDate")),y=($("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close")),v=$(".modal-content"),k=$(".modal-bg"),T=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$("#btnJoinMembers"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBan"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("#versionDigit"),$("#versionDecimal"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour")),D=$("#selMinute"),L=$("#btnSendGeneral"),w=$("#btnSendGift"),S=$("#modalGift"),C=$("#modalGeneral"),M=$("#generalMemo"),x=$("#btnSubmitGift"),A=$("#btnSubmitGeneral"),U=($("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance")),W=($("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))});function I(e,t,a){return new Promise(((i,n)=>{$.ajax({global:e,url:t,type:"POST",headers:W,contentType:"text/plain",dataType:"json",data:a,success:function(e){i(e)},error:function(e,t,a){n(a)},complete:function(e,t){}})}))}function N(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function B(e){return 0===function(e){return e.status}(e)}function P(e){return e.msg}const q=`${api_server_url}/v3/`,F={saveUserUcdFromXlsx:q+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:q+"ucd/set/charge/user/system",saveUserUcdByBiz:q+"ucd/set/charge/user/company",saveDoitUcdBySystem:q+"ucd/set/charge/doit/system",saveDoitUcdByBiz:q+"ucd/set/charge/doit/company",saveBizUcd:q+"ucd/set/charge/company/system",dashboardSummary:q+"main/dashboard",dashboardSummaryList:q+"main/dashboard/get/list",dashboardMoreLeader:q+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:q+"main/dashboard/get/doitRanklist",getProfile:q+"admin/get",updatePassword:q+"admin/update/pwd",memberList:q+"profile/get/list",detailMember:q+"profile/get/detail/info",levelUp:q+"profile/set/levelUp",levelDown:q+"profile/set/levelDown",cancelPartner:q+"profile/set/releasePartner",levelInfo:q+"profile/get/level",levelHistory:q+"profile/get/level/history",deviceInfo:q+"profile/get/device/info",memberDoitList:q+"profile/get/doit",memberCategoryList:q+"profile/get/category",memberActionList:q+"profile/get/action",memberActionDetail:q+"profile/get/detail/action",countPerLevel:q+"level/get/count",memberLevelList:q+"level/get/list",unlinkMemberList:q+"profile/get/unlink",changedMemberList:q+"profile/get/changed",badgeList:q+"badge/get/list",createBadge:q+"badge/create",detailBadge:q+"badge/get/detail/info",deleteBadge:q+"badge/delete",updateBadge:q+"badge/update",categoryList:q+"category/list",createCategory:q+"category/create",detailCategory:q+"category/detail",reorderCategory:q+"category/update/sequence",deleteCategory:q+"category/delete",updateCategory:q+"category/update",subCategoryList:q+"subcategory/list",createSubCategory:q+"subcategory/create",updateSubCategoryDoitImg:q+"subcategory/set/doit/image",deleteSubCategory:q+"subcategory/delete",reorderSubCategory:q+"subcategory/update/sequence",editSubCategory:q+"subcategory/update",keywordList:q+"keyword/get/list",createKeyword:q+"keyword/create",updateKeyword:q+"keyword/update",doitSponsorList:q+"doit/get/company",doitList:q+"doit/list",doitSetRecommend:q+"doit/set/recommend",createDoit:q+"doit/create",createDoitCategoryList:q+"category/exposure/list",detailDoit:q+"doit/detail",updateDoit:q+"doit/update",deleteDoit:q+"doit/delete",openDoit:q+"doit/set/open",stopDoit:q+"doit/set/stop",getDoitUcd:q+"ucd/get/doit",getUcdDoitList:q+"ucd/get/doit/list",missionList:q+"mission/get/list",createMission:q+"mission/create",detailMission:q+"mission/get/detail/info",updateMission:q+"mission/update",deleteMission:q+"mission/delete",joinMemberList:q+"member/get/list",infoJoinMember:q+"member/get/profile",rewardMemberList:q+"ucd/get/reward/profile",createReward:q+"ucd/set/reward/profile",countMember:q+"member/get/count",banMember:q+"member/set/retire",applyMemberList:q+"member/get/applylist",approvalMember:q+"member/get/applyConfirm",rejectMember:q+"member/get/applyReject",actionList:q+"action/get/list",detailAction:q+"action/get/detail/info",sendWarning:q+"action/set/yellow",cancelWarning:q+"action/set/yellowCancel",actionCommentList:q+"action/get/commentList",createActionComment:q+"action/set/insertComment",deleteActionComment:q+"action/set/deleteComment",actionReplyList:q+"action/get/comment/child/list",talkList:q+"board/get/list",createTalk:q+"board/create",detailTalk:q+"board/get/detail/info",updateTalk:q+"board/update",deleteTalk:q+"board/delete",talkCommentList:q+"board/get/commentList",createTalkComment:q+"board/set/insertComment",deleteTalkComment:q+"board/set/deleteComment",talkReplyList:q+"board/get/comment/child/list",pickList:q+"recommend/list",previewList:q+"recommend/get/doit",searchDoitList:q+"recommend/get/doit/list",reorderPick:q+"recommend/set",createPick:q+"recommend/create",updatePick:q+"recommend/update",detailPick:q+"recommend/detail",bizList:q+"biz/get/list",createBiz:q+"biz/create",detailBiz:q+"biz/get/detail/info",bizDoitList:q+"biz/get/detail/doit",bizUcdList:q+"ucd/list/get/company",updateBiz:q+"biz/update",getBizUcd:q+"ucd/get/company",noticeList:q+"notice/get/list",createNotice:q+"notice/create",detailNotice:q+"notice/get/detail/info",updateNotice:q+"notice/update",deleteNotice:q+"notice/delete",faqType:q+"faq/get/type",faqList:q+"faq/get/list",createFaq:q+"faq/create",detailFaq:q+"faq/get/detail/info",updateFaq:q+"faq/update",deleteFaq:q+"faq/delete",reorderFaq:q+"faq/set/orders",inquiryList:q+"qna/get/list",updateInquiry:q+"qna/set/insertComment",detailInquiry:q+"qna/get/detail/info",reportActionList:q+"report/get/action/list",actionReportReasonList:q+"report/get/action/descriptionList",reportTalkList:q+"report/get/board/list",talkReportReasonList:q+"report/get/board/descriptionList",blindTalk:q+"report/set/blind",bannerList:q+"banner/get/list",createBanner:q+"banner/create",detailBanner:q+"banner/get/detail/info",updateBanner:q+"banner/update",reorderBanner:q+"banner/set/orders",targetEventList:q+"banner/get/event/list",targetDoitList:q+"banner/get/doit/list",targetNoticeList:q+"banner/get/notice/list",storyList:q+"story/get/list",createStory:q+"story/create",detailStory:q+"story/get/detail/info",updateStory:q+"story/update",reorderStory:q+"story/set/orders",eventList:q+"event/get/list",createEvent:q+"event/create",detailEvent:q+"event/get/detail/info",deleteEvent:q+"event/delete",updateEvent:q+"event/update",customEvent:q+"event/popup/get/list",customEventProfile:q+"event/popup/get/profile",pushList:q+"push/list",cancelPush:q+"push/set/cancel",createPush:q+"push/create",pushTargetNotice:q+"push/get/notice",pushTargetEvent:q+"push/get/event",pushTargetDoit:q+"push/get/doit",pushTargetMember:q+"push/get/profile",pushTargetMemberFromXlsx:q+"excel/import/notification/profile",popupList:q+"popup/get/list",createPopup:q+"popup/create",detailPopup:q+"popup/get/detail/info",updatePopup:q+"popup/update",deletePopup:q+"popup/delete",errorList:q+"error/list",updateError:q+"error/update",createEncryption:q+"operate/set/encryption",createDecryption:q+"operate/set/decryption",versionList:q+"operate/get/version/list",createVersion:q+"operate/version/create",deleteVersion:q+"operate/version/delete",getMemberForSaveUcd:q+"ucd/get/user/list",getMemberFromXlsx:q+"excel/import/profile",getDoitFromXlsx:q+"excel/import/doit",ucdChargeList:q+"ucd/list/get/charge",systemWalletType:q+"ucd/get/system/type",systemWalletList:q+"ucd/list/get/system",doitWalletList:q+"ucd/list/get/doit",memberWalletList:q+"ucd/list/get/user",pendingWalletList:q+"ucd/list/get/transfer",giftList:q+"gift/get/list",reorderGiftList:q+"gift/get/orderList",reorderGift:q+"gift/set/orders",createGift:q+"gift/create",ktGoodsList:q+"gift/get/kt/goods",detailGift:q+"gift/get/detail/info",updateGift:q+"gift/update",applyGiftList:q+"exchange/get/list",sendGifticon:q+"exchange/set/confirm",sendGeneralGift:q+"exchange/set/send",rejectGift:q+"exchange/set/reject",resendGift:q+"exchange/set/resend",getGiftBalance:q+"exchange/get/money",sendGiftList:q+"exchange/get/sendList",sendGiftStatusList:q+"exchange/get/payment",updateGiftSendMemo:q+"exchange/set/insertMemo",adminList:q+"admin/list",detailAdmin:q+"admin/detail",updateAdmin:q+"admin/update",deleteAdmin:q+"admin/delete",authBizList:q+"auth/get/biz/list",approvalAdmin:q+"admin/approval",authList:q+"auth/list",getMenuWithAuth:q+"auth/get/menu",setMenuWithAuth:q+"auth/set/menu",createAuth:q+"auth/create",deleteAuth:q+"auth/delete",promotionList:q+"promotion/get/list",createPromotion:q+"promotion/create",detailPromotion:q+"promotion/get/detail",updatePromotion:q+"promotion/update",deletePromotion:q+"promotion/delete",promotionDoitList:q+"promotion/get/doit/list"},G={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},E=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function z(e){E.fire({icon:"info",title:e})}function R(e,t){Swal.fire({toast:!0,position:"center",icon:B(e)?"success":"error",title:N(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&B(e)&&t()}))}function _(e){Swal.fire({icon:"error",html:e})}function j(e,t){Swal.fire({text:e,showCancelButton:!0,confirmButtonText:G.confirm,cancelButtonText:G.cancel}).then((e=>{e.value&&t()}))}const O="목록이 없습니다.",K="검색 중..",J="취소하시겠습니까?",X="발송하시겠습니까?",Y="선택해주세요.",H="예약발송일시는 현재시간 이후로 설정해야 합니다.",Q=" 처리 중, 오류가 발생했습니다.",V="을(를) 불러올 수 없습니다.";function Z(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function ee(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function te(e){return ee(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function ae(e,t,a){return e.split(t).join(a)}const ie="/v2/member/detail";function ne(){v.fadeOut(),k.fadeOut(),$("body").css("overflow-y","auto")}function oe(){$("body").css("overflow-y","hidden")}function re(e){const t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return`${t}-${Z(a)}-${Z(i)}`}function se(){return re(new Date)}function le(){o.val(function(){const e=new Date;return e.setDate(e.getDate()-6),re(e)}()),r.val(se())}function ce(){i.removeClass("active")}function de(e){let t=0;const a=$(e).children("tbody").find(":checkbox");a.each((function(){$(this).is(":checked")&&t++})),a.length===t?$("#checkAll").prop("checked",!0):pe()}function pe(){$("#checkAll").prop("checked",!1)}let me;function ue(){ce(),n.datepicker("option","minDate","2020-07-01"),n.datepicker("option","maxDate","today"),le(),t.each((function(){$(this).children().eq(0).prop("selected",!0)})),d.val(""),c.eq(0).prop("checked",!0)}function $e(){let e=b.DataTable();e.page.len(Number(g.val())),e.ajax.reload(),pe()}function ge(e){me=e.id,be()&&(C.fadeIn(),k.fadeIn(),oe(),C.find("h5").text("btnSendGeneral"===me?"메모(일반상품 발송)":"메모(신청취소)"),M.val(""),M.trigger("focus"))}function be(){if(0===ve().length)return z(`대상을 ${Y}`),!1;let e;return"btnSendGift"===me&&function(){let e=!1;const t=b.DataTable().rows(".selected").data();for(let a=0;a<t.length;a++)ee(t[a].goods_code)&&(e=!0);return e}()?(e="기프티콘(상품유형)만 선택해주세요.",z(e),!1):"btnSendGeneral"!==me||!function(){let e=!1;const t=b.DataTable().rows(".selected").data();for(let a=0;a<t.length;a++)ee(t[a].goods_code)||(e=!0);return e}()||(e="일반상품(상품유형)만 선택해주세요.",z(e),!1)}function fe(){const e={exchange_list:ve(),reservation_date:ae(h.val(),"-",""),reservation_time:T.val()+D.val(),memo:f.val().trim()};I(!0,F.sendGifticon,JSON.stringify(e)).then((async function(e,t,a){await R(e,ye)})).catch((e=>_(G.reserve+Q)))}function he(){const e="btnSendGeneral"===me?F.sendGeneralGift:F.rejectGift,t={exchange_list:ve(),memo:M.val().trim()};I(!0,e,JSON.stringify(t)).then((async function(e,t,a){await R(e,ye)})).catch((e=>_(Q)))}function ye(){ne(),pe(),$e()}function ve(){const e=b.DataTable().rows(".selected").data();let t=[];for(let a=0;a<e.length;a++){const i=e[a].exchange_uuid;t.push(i)}return t}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:O,zeroRecords:O,processing:K,paginate:{previous:G.previous,next:G.next}}}),n.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:G.monthNames,dayNames:G.dayNames,dayNamesMin:G.dayNames}),g.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),ue(),I(!1,F.getGiftBalance,null).then((async function(e,t,a){B(e)?function(e){U.text(te(e.data.money))}(e):z(P(e))})).catch((e=>_(`잔액 ${V}`))),b.DataTable({ajax:{url:F.applyGiftList,type:"POST",headers:W,dataFilter:function(e){let t=JSON.parse(e);return B(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],z(P(t))),JSON.stringify(t)},data:function(e){const t={date_type:s.val(),from_date:o.val(),to_date:r.val(),search_type:l.val(),keyword:d.val().trim(),gift_type:$("input[name=radio-type]:checked").val(),status:G.pending,page:e.start/e.length+1,limit:g.val()};return JSON.stringify(t)},error:function(e,t){_(G.list+V)}},columns:[{title:"상품유형",data:"goods_code",width:"10%",render:function(e){return ee(e)?G.gift:G.gifticon}},{title:"상품명",data:"gift_name",width:"25%"},{title:"신청수량",data:"qty",width:"5%"},{title:"금액(UCD)",data:"ucd",width:"10%",render:function(e,t,a,i){return te(e)}},{title:"신청자",data:"nickname",width:"25%",render:function(e,t,a,i){return`<a data-uuid="${a.profile_uuid}">${e}</a>`}},{title:"신청일시",data:"created",width:"15%"},{title:'<div class="checkbox-wrap"><input type="checkbox" id="checkAll"/><label for="checkAll"><span></span></label></div>',data:"exchange_uuid",width:"5%",render:function(e,t,a,i){return`<div class="checkbox-wrap"><input type="checkbox" name="chk-row" id="${n=i.row}"/><label for="${n}"><span></span></label></div>`;var n}}],serverSide:!0,paging:!0,pageLength:Number(g.val()),select:{style:"multi",selector:":checkbox"},destroy:!1,initComplete:function(){$(this).on("page.dt",(function(){pe()})),$("#checkAll").on("click",(function(){!function(e){const t=$(e).closest("table"),a=$(t).DataTable(),i=$(e).is(":checked");$("input[name=chk-row]").prop("checked",i),i?a.rows().select():a.rows().deselect()}(this)})),$(this).on("select.dt",(function(e,t,a,i){$("input[name=chk-row]").eq(i).prop("checked",!0),de(this)})),$(this).on("deselect.dt",(function(e,t,a,i){$("input[name=chk-row]").eq(i).prop("checked",!1),de(this)}))},fnRowCallback:function(e,t){$(e).children().eq(4).find("a").on("click",(function(){!function(e){let t=$("<form></form>");t.prop("method","post"),t.prop("action",ie),t.append($("<input/>",{type:"hidden",name:"is_store",value:!0})),t.append($("<input/>",{type:"hidden",name:"profile_uuid",value:e})),t.appendTo("body"),t.trigger("submit")}($(this).data("uuid"))}))},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=te(function(e){return e.DataTable().page.info().recordsTotal}(e));$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),e.on("keydown",(function(e){!function(e){13===e.keyCode&&$e()}(e)})),o.on("change",(function(){r.datepicker("option","minDate",new Date(o.datepicker("getDate"))),ce()})),r.on("change",(function(){o.datepicker("option","maxDate",new Date(r.datepicker("getDate"))),ce()})),g.on("change",(function(){$e()})),p.on("click",(function(){$e()})),m.on("click",(function(){ue()})),i.on("click",(function(){var e;e=this,ce(),$(e).addClass("active"),$(e).hasClass("today")?n.val(se()):$(e).hasClass("week")?le():$(e).hasClass("month")?(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-1),re(e)}()),r.val(se())):$(e).hasClass("months")&&(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-3),re(e)}()),r.val(se()))})),L.on("click",(function(){ge(this)})),w.on("click",(function(){me=this.id,be()&&(S.fadeIn(),k.fadeIn(),oe(),h.datepicker("setDate","today"),h.datepicker("option","minDate","today"),h.datepicker("option","maxDate","1M"),T.val("12"),D.val("00"))})),u.on("click",(function(){ge(this)})),y.on("click",(function(){ne()})),k.on("click",(function(){ne()})),A.on("click",(function(){j("btnSendGeneral"===me?X:J,he)})),x.on("click",(function(){(function(){const e=ae(h.val(),"-","")+(T.val()+D.val()),t=function(e,t){let a=e.getFullYear().toString(),i=(e.getMonth()+1).toString(),n=e.getDate().toString(),o="";try{o=a+""+(i[1]?i:"0"+i[0])+(n[1]?n:"0"+n[0])}catch(e){}return o}(new Date)+(Z((new Date).getHours()).toString()+Z((new Date).getMinutes()).toString());return!(Number(e)<Number(t)&&(z(H),1))})()&&j(X,fe)}))}))})();