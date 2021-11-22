(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword"),$("#btnSearch"),$("#btnReset"),$("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate")),i=$("#btnSubmitUpdate"),a=($("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable")),n=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close")),o=$(".modal-content"),r=$(".modal-bg"),s=$("#modalDetail"),l=$("#modalUpdate"),d=($("#modalCreate"),$("#modalImage")),c=($("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable")),m=($("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))});function p(e,t,i){return new Promise(((a,n)=>{$.ajax({global:e,url:t,type:"POST",headers:m,contentType:"text/plain",dataType:"json",data:i,success:function(e){a(e)},error:function(e,t,i){n(i)},complete:function(e,t){}})}))}function u(e){let t=e.msg,i=e.status;return[30034,30035,30308].indexOf(i)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function b(e){return 0===function(e){return e.status}(e)}const g=`${api_server_url}/v3/`,f={saveUserUcdFromXlsx:g+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:g+"ucd/set/charge/user/system",saveUserUcdByBiz:g+"ucd/set/charge/user/company",saveDoitUcdBySystem:g+"ucd/set/charge/doit/system",saveDoitUcdByBiz:g+"ucd/set/charge/doit/company",saveBizUcd:g+"ucd/set/charge/company/system",dashboardSummary:g+"main/dashboard",dashboardSummaryList:g+"main/dashboard/get/list",dashboardMoreLeader:g+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:g+"main/dashboard/get/doitRanklist",getProfile:g+"admin/get",updatePassword:g+"admin/update/pwd",memberList:g+"profile/get/list",detailMember:g+"profile/get/detail/info",levelUp:g+"profile/set/levelUp",levelDown:g+"profile/set/levelDown",cancelPartner:g+"profile/set/releasePartner",levelInfo:g+"profile/get/level",levelHistory:g+"profile/get/level/history",deviceInfo:g+"profile/get/device/info",memberDoitList:g+"profile/get/doit",memberCategoryList:g+"profile/get/category",memberActionList:g+"profile/get/action",memberActionDetail:g+"profile/get/detail/action",countPerLevel:g+"level/get/count",memberLevelList:g+"level/get/list",unlinkMemberList:g+"profile/get/unlink",changedMemberList:g+"profile/get/changed",badgeList:g+"badge/get/list",createBadge:g+"badge/create",detailBadge:g+"badge/get/detail/info",deleteBadge:g+"badge/delete",updateBadge:g+"badge/update",categoryList:g+"category/list",createCategory:g+"category/create",detailCategory:g+"category/detail",reorderCategory:g+"category/update/sequence",deleteCategory:g+"category/delete",updateCategory:g+"category/update",subCategoryList:g+"subcategory/list",createSubCategory:g+"subcategory/create",updateSubCategoryDoitImg:g+"subcategory/set/doit/image",deleteSubCategory:g+"subcategory/delete",reorderSubCategory:g+"subcategory/update/sequence",editSubCategory:g+"subcategory/update",keywordList:g+"keyword/get/list",createKeyword:g+"keyword/create",updateKeyword:g+"keyword/update",doitSponsorList:g+"doit/get/company",doitList:g+"doit/list",doitSetRecommend:g+"doit/set/recommend",createDoit:g+"doit/create",createDoitCategoryList:g+"category/exposure/list",detailDoit:g+"doit/detail",updateDoit:g+"doit/update",deleteDoit:g+"doit/delete",openDoit:g+"doit/set/open",stopDoit:g+"doit/set/stop",getDoitUcd:g+"ucd/get/doit",getUcdDoitList:g+"ucd/get/doit/list",missionList:g+"mission/get/list",createMission:g+"mission/create",detailMission:g+"mission/get/detail/info",updateMission:g+"mission/update",deleteMission:g+"mission/delete",joinMemberList:g+"member/get/list",infoJoinMember:g+"member/get/profile",rewardMemberList:g+"ucd/get/reward/profile",createReward:g+"ucd/set/reward/profile",countMember:g+"member/get/count",blockMember:g+"member/set/retire/ban",banMember:g+"member/set/retire",applyMemberList:g+"member/get/applylist",approvalMember:g+"member/get/applyConfirm",rejectMember:g+"member/get/applyReject",blockMemberList:g+"member/get/retire/ban/list",cancelBlockMember:g+"member/set/retire/ban/cancel",actionList:g+"action/get/list",detailAction:g+"action/get/detail/info",sendWarning:g+"action/set/yellow",cancelWarning:g+"action/set/yellowCancel",actionCommentList:g+"action/get/commentList",createActionComment:g+"action/set/insertComment",deleteActionComment:g+"action/set/deleteComment",actionReplyList:g+"action/get/comment/child/list",talkList:g+"board/get/list",createTalk:g+"board/create",detailTalk:g+"board/get/detail/info",updateTalk:g+"board/update",deleteTalk:g+"board/delete",talkCommentList:g+"board/get/commentList",createTalkComment:g+"board/set/insertComment",deleteTalkComment:g+"board/set/deleteComment",talkReplyList:g+"board/get/comment/child/list",pickList:g+"recommend/list",previewList:g+"recommend/get/doit",searchDoitList:g+"recommend/get/doit/list",reorderPick:g+"recommend/set",createPick:g+"recommend/create",updatePick:g+"recommend/update",detailPick:g+"recommend/detail",bizList:g+"biz/get/list",createBiz:g+"biz/create",detailBiz:g+"biz/get/detail/info",bizDoitList:g+"biz/get/detail/doit",bizUcdList:g+"ucd/list/get/company",updateBiz:g+"biz/update",getBizUcd:g+"ucd/get/company",noticeList:g+"notice/get/list",createNotice:g+"notice/create",detailNotice:g+"notice/get/detail/info",updateNotice:g+"notice/update",deleteNotice:g+"notice/delete",faqType:g+"faq/get/type",faqList:g+"faq/get/list",createFaq:g+"faq/create",detailFaq:g+"faq/get/detail/info",updateFaq:g+"faq/update",deleteFaq:g+"faq/delete",reorderFaq:g+"faq/set/orders",inquiryList:g+"qna/get/list",updateInquiry:g+"qna/set/insertComment",detailInquiry:g+"qna/get/detail/info",deleteInquiry:g+"qna/delete",reportActionList:g+"report/get/action/list",actionReportReasonList:g+"report/get/action/descriptionList",reportTalkList:g+"report/get/board/list",talkReportReasonList:g+"report/get/board/descriptionList",blindTalk:g+"report/set/blind",bannerList:g+"banner/get/list",createBanner:g+"banner/create",detailBanner:g+"banner/get/detail/info",updateBanner:g+"banner/update",reorderBanner:g+"banner/set/orders",targetEventList:g+"banner/get/event/list",targetDoitList:g+"banner/get/doit/list",targetNoticeList:g+"banner/get/notice/list",storyList:g+"story/get/list",createStory:g+"story/create",detailStory:g+"story/get/detail/info",updateStory:g+"story/update",reorderStory:g+"story/set/orders",eventList:g+"event/get/list",createEvent:g+"event/create",detailEvent:g+"event/get/detail/info",deleteEvent:g+"event/delete",updateEvent:g+"event/update",customEvent:g+"event/popup/get/list",customEventProfile:g+"event/popup/get/profile",pushList:g+"push/list",cancelPush:g+"push/set/cancel",createPush:g+"push/create",pushTargetNotice:g+"push/get/notice",pushTargetEvent:g+"push/get/event",pushTargetDoit:g+"push/get/doit",pushTargetMember:g+"push/get/profile",pushTargetMemberFromXlsx:g+"excel/import/notification/profile",popupList:g+"popup/get/list",createPopup:g+"popup/create",detailPopup:g+"popup/get/detail/info",updatePopup:g+"popup/update",deletePopup:g+"popup/delete",errorList:g+"error/list",updateError:g+"error/update",createEncryption:g+"operate/set/encryption",createDecryption:g+"operate/set/decryption",versionList:g+"operate/get/version/list",createVersion:g+"operate/version/create",deleteVersion:g+"operate/version/delete",logList:g+"log/get/list",getMemberForSaveUcd:g+"ucd/get/user/list",getMemberFromXlsx:g+"excel/import/profile",getDoitFromXlsx:g+"excel/import/doit",ucdChargeList:g+"ucd/list/get/charge",systemWalletType:g+"ucd/get/system/type",systemWalletList:g+"ucd/list/get/system",doitWalletList:g+"ucd/list/get/doit",memberWalletList:g+"ucd/list/get/user",pendingWalletList:g+"ucd/list/get/transfer",giftList:g+"gift/get/list",reorderGiftList:g+"gift/get/orderList",reorderGift:g+"gift/set/orders",createGift:g+"gift/create",ktGoodsList:g+"gift/get/kt/goods",detailGift:g+"gift/get/detail/info",updateGift:g+"gift/update",applyGiftList:g+"exchange/get/list",sendGifticon:g+"exchange/set/confirm",sendGeneralGift:g+"exchange/set/send",rejectGift:g+"exchange/set/reject",resendGift:g+"exchange/set/resend",getGiftBalance:g+"exchange/get/money",sendGiftList:g+"exchange/get/sendList",sendGiftStatusList:g+"exchange/get/payment",updateGiftSendMemo:g+"exchange/set/insertMemo",adminList:g+"admin/list",detailAdmin:g+"admin/detail",updateAdmin:g+"admin/update",deleteAdmin:g+"admin/delete",authBizList:g+"auth/get/biz/list",approvalAdmin:g+"admin/approval",authList:g+"auth/list",getMenuWithAuth:g+"auth/get/menu",setMenuWithAuth:g+"auth/set/menu",createAuth:g+"auth/create",deleteAuth:g+"auth/delete",promotionList:g+"promotion/get/list",createPromotion:g+"promotion/create",detailPromotion:g+"promotion/get/detail",updatePromotion:g+"promotion/update",closePromotion:g+"promotion/set/end",promotionDoitList:g+"promotion/get/doit/list",promotionProceedList:g+"promotion/get/proceed/list",setDoitPromotion:g+"promotion/set/doit",cancelDoitPromotion:g+"promotion/set/release"},y=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function h(e){y.fire({icon:"info",title:e})}function T(e){Swal.fire({icon:"error",html:e})}const k="목록이 없습니다.",L="/v2/marketing/story/update/";function v(){o.fadeOut(),r.fadeOut(),$("body").css("overflow-y","auto")}function D(){$("body").css("overflow-y","hidden")}function S(){$("img").on("error",(function(){$(this).attr("src","/assets/v2/img/no-image.jpg")}))}function C(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}let w=[];function M(){p(!0,f.storyList,null).then((async function(e,t,i){b(e)?function(e){e.recordsTotal=e.count,e.recordsFiltered=e.count,function(e){a.DataTable({data:e.data,columns:[{title:"썸네일",data:"story_image_url",width:"20%",render:function(e,t,i,a){const n=C(e)?"":[".jpeg",".jpg",".png"].includes(e)>-1?e:"";return`<div class="list-img-wrap banner-img-wrap" data-url="${n}"><img src="${n}" alt=""></div>`}},{title:"제목",data:"story_title",width:"30%"},{title:"이동 페이지",data:"story_url",width:"30%",render:function(e,t,i,a){return C(e)?"-":e}},{title:"노출여부",data:"is_exposure",width:"10%"},{title:"수정",data:"story_uuid",width:"10%",render:function(e,t,i,a){return`<button type="button" class="btn-xs btn-teal btn-update" id="${i.idx}">수정</button>`}}],serverSide:!1,paging:!1,select:!1,destroy:!0,initComplete:function(){$(".banner-img-wrap").on("click",(function(){W(this)})),$(".btn-update").on("click",(function(){location.href=L+this.id}))},fnRowCallback:function(e,t){"Y"===t.is_exposure&&w.push(t)},drawCallback:function(e){S()}})}(e)}(e):h(function(e){return e.msg}(e))})).catch((e=>T("목록을(를) 불러올 수 없습니다.")))}function U(){const e={story_uuid:x()};p(!0,f.reorderStory,JSON.stringify(e)).then((async function(e,t,i){await function(e,t){Swal.fire({toast:!0,position:"center",icon:b(e)?"success":"error",title:u(e),showConfirmButton:!1,timer:1500}).then((i=>{i.isDismissed&&b(e)&&t()}))}(e,A)})).catch((e=>T("수정 처리 중, 오류가 발생했습니다.")))}function A(){v(),M()}function x(){const e=c.find("tbody").children();let t=[];for(let i=0;i<e.length;i++){let a=$(e[i]).data("uuid");C(a)||t.push(a)}return t}function W(e){d.attr("src",""),s.fadeIn(),r.fadeIn(),D(),d.attr("src",$(e).data("url")),S()}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:k,zeroRecords:k,processing:"검색 중..",paginate:{previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>'}}}),M(),t.on("click",(function(){l.fadeIn(),r.fadeIn(),D(),c.DataTable({data:w,columns:[{title:"썸네일",data:"story_image_url",width:"20%",render:function(e,t,i,a){const n=C(e)?"":[".jpeg",".jpg",".png"].includes(e)>-1?e:"";return`<div class="list-img-wrap banner-img-wrap" data-url="${n}"><img src="${n}" alt=""></div>`}},{title:"제목",data:"story_title",width:"70%"}],serverSide:!1,paging:!1,select:!1,destroy:!0,scrollY:450,scrollCollapse:!0,initComplete:function(){c.find("tbody").sortable({helper:function(e,t){return function(e){let t=$(e).children();return $(t[0]).css("width",Math.ceil($(e).width()/100*20)+"px"),$(t[1]).css("width",Math.ceil($(e).width()/100*70)+"px"),$(e)}(t)}})},fnRowCallback:function(e,t){$(e).attr("data-uuid",t.story_uuid)},drawCallback:function(e){S()}})})),n.on("click",(function(){v()})),r.on("click",(function(){v()})),i.on("click",(function(){var e;(0!==x().length||(h(k),0))&&("변경하시겠습니까?",e=U,Swal.fire({text:"변경하시겠습니까?",showCancelButton:!0,confirmButtonText:"확인",cancelButtonText:"취소"}).then((t=>{t.value&&e()})))})),$(".btn-xs.btn-teal").on("click",(function(){location.href=L})),$(".banner-img-wrap").on("click",(function(){W(this)}))}))})();