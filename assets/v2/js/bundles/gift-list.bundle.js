(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType")),n=($("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),o=$("#btnSearch"),r=$("#btnReset"),s=($("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate")),l=($("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),d=($("#selSort"),$("#dataTable")),c=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn")),m=$(".modal-close"),p=$(".modal-content"),u=$(".modal-bg"),g=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable")),b=($("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))});function f(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function y(e){return 0===function(e){return e.status}(e)}function h(e){return e.msg}const T=`${api_server_url}/v3/`,v={saveUserUcdFromXlsx:T+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:T+"ucd/set/charge/user/system",saveUserUcdByBiz:T+"ucd/set/charge/user/company",saveDoitUcdBySystem:T+"ucd/set/charge/doit/system",saveDoitUcdByBiz:T+"ucd/set/charge/doit/company",saveBizUcd:T+"ucd/set/charge/company/system",dashboardSummary:T+"main/dashboard",dashboardSummaryList:T+"main/dashboard/get/list",dashboardMoreLeader:T+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:T+"main/dashboard/get/doitRanklist",getProfile:T+"admin/get",updatePassword:T+"admin/update/pwd",memberList:T+"profile/get/list",detailMember:T+"profile/get/detail/info",levelUp:T+"profile/set/levelUp",levelDown:T+"profile/set/levelDown",cancelPartner:T+"profile/set/releasePartner",levelInfo:T+"profile/get/level",levelHistory:T+"profile/get/level/history",deviceInfo:T+"profile/get/device/info",memberDoitList:T+"profile/get/doit",memberCategoryList:T+"profile/get/category",memberActionList:T+"profile/get/action",memberActionDetail:T+"profile/get/detail/action",countPerLevel:T+"level/get/count",memberLevelList:T+"level/get/list",unlinkMemberList:T+"profile/get/unlink",changedMemberList:T+"profile/get/changed",badgeList:T+"badge/get/list",createBadge:T+"badge/create",detailBadge:T+"badge/get/detail/info",deleteBadge:T+"badge/delete",updateBadge:T+"badge/update",categoryList:T+"category/list",createCategory:T+"category/create",detailCategory:T+"category/detail",reorderCategory:T+"category/update/sequence",deleteCategory:T+"category/delete",updateCategory:T+"category/update",subCategoryList:T+"subcategory/list",createSubCategory:T+"subcategory/create",updateSubCategoryDoitImg:T+"subcategory/set/doit/image",deleteSubCategory:T+"subcategory/delete",reorderSubCategory:T+"subcategory/update/sequence",editSubCategory:T+"subcategory/update",keywordList:T+"keyword/get/list",createKeyword:T+"keyword/create",updateKeyword:T+"keyword/update",doitSponsorList:T+"doit/get/company",doitList:T+"doit/list",doitSetRecommend:T+"doit/set/recommend",createDoit:T+"doit/create",createDoitCategoryList:T+"category/exposure/list",detailDoit:T+"doit/detail",updateDoit:T+"doit/update",deleteDoit:T+"doit/delete",openDoit:T+"doit/set/open",stopDoit:T+"doit/set/stop",getDoitUcd:T+"ucd/get/doit",getUcdDoitList:T+"ucd/get/doit/list",missionList:T+"mission/get/list",createMission:T+"mission/create",detailMission:T+"mission/get/detail/info",updateMission:T+"mission/update",deleteMission:T+"mission/delete",joinMemberList:T+"member/get/list",infoJoinMember:T+"member/get/profile",rewardMemberList:T+"ucd/get/reward/profile",createReward:T+"ucd/set/reward/profile",countMember:T+"member/get/count",blockMember:T+"member/set/retire/ban",banMember:T+"member/set/retire",applyMemberList:T+"member/get/applylist",approvalMember:T+"member/get/applyConfirm",rejectMember:T+"member/get/applyReject",blockMemberList:T+"member/get/retire/ban/list",cancelBlockMember:T+"member/set/retire/ban/cancel",actionList:T+"action/get/list",detailAction:T+"action/get/detail/info",sendWarning:T+"action/set/yellow",cancelWarning:T+"action/set/yellowCancel",actionCommentList:T+"action/get/commentList",createActionComment:T+"action/set/insertComment",deleteActionComment:T+"action/set/deleteComment",actionReplyList:T+"action/get/comment/child/list",talkList:T+"board/get/list",createTalk:T+"board/create",detailTalk:T+"board/get/detail/info",updateTalk:T+"board/update",deleteTalk:T+"board/delete",talkCommentList:T+"board/get/commentList",createTalkComment:T+"board/set/insertComment",deleteTalkComment:T+"board/set/deleteComment",talkReplyList:T+"board/get/comment/child/list",pickList:T+"recommend/list",previewList:T+"recommend/get/doit",searchDoitList:T+"recommend/get/doit/list",reorderPick:T+"recommend/set",createPick:T+"recommend/create",updatePick:T+"recommend/update",detailPick:T+"recommend/detail",bizList:T+"biz/get/list",createBiz:T+"biz/create",detailBiz:T+"biz/get/detail/info",bizDoitList:T+"biz/get/detail/doit",bizUcdList:T+"ucd/list/get/company",updateBiz:T+"biz/update",getBizUcd:T+"ucd/get/company",noticeList:T+"notice/get/list",createNotice:T+"notice/create",detailNotice:T+"notice/get/detail/info",updateNotice:T+"notice/update",deleteNotice:T+"notice/delete",faqType:T+"faq/get/type",faqList:T+"faq/get/list",createFaq:T+"faq/create",detailFaq:T+"faq/get/detail/info",updateFaq:T+"faq/update",deleteFaq:T+"faq/delete",reorderFaq:T+"faq/set/orders",inquiryList:T+"qna/get/list",updateInquiry:T+"qna/set/insertComment",detailInquiry:T+"qna/get/detail/info",reportActionList:T+"report/get/action/list",actionReportReasonList:T+"report/get/action/descriptionList",reportTalkList:T+"report/get/board/list",talkReportReasonList:T+"report/get/board/descriptionList",blindTalk:T+"report/set/blind",bannerList:T+"banner/get/list",createBanner:T+"banner/create",detailBanner:T+"banner/get/detail/info",updateBanner:T+"banner/update",reorderBanner:T+"banner/set/orders",targetEventList:T+"banner/get/event/list",targetDoitList:T+"banner/get/doit/list",targetNoticeList:T+"banner/get/notice/list",storyList:T+"story/get/list",createStory:T+"story/create",detailStory:T+"story/get/detail/info",updateStory:T+"story/update",reorderStory:T+"story/set/orders",eventList:T+"event/get/list",createEvent:T+"event/create",detailEvent:T+"event/get/detail/info",deleteEvent:T+"event/delete",updateEvent:T+"event/update",customEvent:T+"event/popup/get/list",customEventProfile:T+"event/popup/get/profile",pushList:T+"push/list",cancelPush:T+"push/set/cancel",createPush:T+"push/create",pushTargetNotice:T+"push/get/notice",pushTargetEvent:T+"push/get/event",pushTargetDoit:T+"push/get/doit",pushTargetMember:T+"push/get/profile",pushTargetMemberFromXlsx:T+"excel/import/notification/profile",popupList:T+"popup/get/list",createPopup:T+"popup/create",detailPopup:T+"popup/get/detail/info",updatePopup:T+"popup/update",deletePopup:T+"popup/delete",errorList:T+"error/list",updateError:T+"error/update",createEncryption:T+"operate/set/encryption",createDecryption:T+"operate/set/decryption",versionList:T+"operate/get/version/list",createVersion:T+"operate/version/create",deleteVersion:T+"operate/version/delete",logList:T+"log/get/list",getMemberForSaveUcd:T+"ucd/get/user/list",getMemberFromXlsx:T+"excel/import/profile",getDoitFromXlsx:T+"excel/import/doit",ucdChargeList:T+"ucd/list/get/charge",systemWalletType:T+"ucd/get/system/type",systemWalletList:T+"ucd/list/get/system",doitWalletList:T+"ucd/list/get/doit",memberWalletList:T+"ucd/list/get/user",pendingWalletList:T+"ucd/list/get/transfer",giftList:T+"gift/get/list",reorderGiftList:T+"gift/get/orderList",reorderGift:T+"gift/set/orders",createGift:T+"gift/create",ktGoodsList:T+"gift/get/kt/goods",detailGift:T+"gift/get/detail/info",updateGift:T+"gift/update",applyGiftList:T+"exchange/get/list",sendGifticon:T+"exchange/set/confirm",sendGeneralGift:T+"exchange/set/send",rejectGift:T+"exchange/set/reject",resendGift:T+"exchange/set/resend",getGiftBalance:T+"exchange/get/money",sendGiftList:T+"exchange/get/sendList",sendGiftStatusList:T+"exchange/get/payment",updateGiftSendMemo:T+"exchange/set/insertMemo",adminList:T+"admin/list",detailAdmin:T+"admin/detail",updateAdmin:T+"admin/update",deleteAdmin:T+"admin/delete",authBizList:T+"auth/get/biz/list",approvalAdmin:T+"admin/approval",authList:T+"auth/list",getMenuWithAuth:T+"auth/get/menu",setMenuWithAuth:T+"auth/set/menu",createAuth:T+"auth/create",deleteAuth:T+"auth/delete",promotionList:T+"promotion/get/list",createPromotion:T+"promotion/create",detailPromotion:T+"promotion/get/detail",updatePromotion:T+"promotion/update",closePromotion:T+"promotion/set/end",promotionDoitList:T+"promotion/get/doit/list",promotionProceedList:T+"promotion/get/proceed/list",setDoitPromotion:T+"promotion/set/doit",cancelDoitPromotion:T+"promotion/set/release"},k=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function L(e){k.fire({icon:"info",title:e})}function S(e){Swal.fire({icon:"error",html:e})}const D="목록이 없습니다.",w="/v2/gift/detail/";function C(){p.fadeOut(),u.fadeOut(),$("body").css("overflow-y","auto")}function M(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function U(e){return M(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function A(){return window.location.pathname}let x=1;function W(){t.each((function(){$(this).children().eq(0).prop("selected",!0)})),n.val("")}function P(){x=1;let e=d.DataTable();e.page.len(Number(l.val())),e.ajax.reload()}function B(){const e={gift_uuid:F()};var t,a;(!0,t=v.reorderGift,a=JSON.stringify(e),new Promise(((e,i)=>{$.ajax({global:true,url:t,type:"POST",headers:b,contentType:"text/plain",dataType:"json",data:a,success:function(t){e(t)},error:function(e,t,a){i(a)},complete:function(e,t){}})}))).then((async function(e,t,a){await function(e,t){Swal.fire({toast:!0,position:"center",icon:y(e)?"success":"error",title:f(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&y(e)&&t()}))}(e,I)})).catch((e=>S("수정 처리 중, 오류가 발생했습니다.")))}function I(){C(),P()}function F(){const e=g.find("tbody").children();let t=[];for(let a=0;a<e.length;a++){const i=$(e[a]).data("uuid");M(i)||t.push(i)}return t}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:D,zeroRecords:D,processing:"검색 중..",paginate:{previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>'}}}),l.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),function(){const e=window.performance.getEntriesByType("navigation")[0],t=M(e)?window.performance.navigation.type:e.type;let a=!1;return"back_forward"!==t&&2!==t||sessionStorage.getItem("page")===A()&&(a=!0),a}()?function(){const e=JSON.parse(sessionStorage.getItem("param"));i.val(e.search_type),n.val(e.keyword),l.val(e.limit),x=e.page}():W(),d.DataTable({ajax:{url:v.giftList,type:"POST",headers:b,dataFilter:function(e){let t=JSON.parse(e);return y(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],L(h(t))),JSON.stringify(t)},data:function(e){return function(){const e={search_type:i.val(),keyword:n.val().trim(),page:x,limit:l.val()};return function(e){e=M(e)?"":JSON.stringify(e),sessionStorage.setItem("param",e),sessionStorage.setItem("page",A())}(e),JSON.stringify(e)}()},error:function(e,t){S("목록을(를) 불러올 수 없습니다.")}},columns:[{title:"상품 ID",data:"gift_uuid",width:"25%"},{title:"상품코드",data:"goods_code",width:"10%",render:function(e){return M(e)?"-":e}},{title:"상품명",data:"gift_name",width:"25%",render:function(e,t,a,i){return`<a href="${w+a.idx}">${e}</a>`}},{title:"금액(UCD)",data:"gift_ucd",width:"10%",render:function(e){return U(e)}},{title:"이미지",data:"gift_image_url",width:"10%",render:function(e){return`<div class="list-img-wrap"><img src="${e}" alt=""></div>`}},{title:"판매종료일",data:"end_date",width:"10%",render:function(e){return M(e)?"-":e.slice(0,10)}},{title:"노출여부",data:"is_exposure",width:"10%"}],serverSide:!0,paging:!0,pageLength:Number(l.val()),select:!1,destroy:!0,initComplete:function(){var e;$(this).on("page.dt",(function(){x=function(e){let t=$(e).DataTable().page.info();return t.start/t.length+1}(this)})),e=x,$(this).DataTable().page(e-1).draw("page")},fnRowCallback:function(e,t){},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=U(function(e){return e.DataTable().page.info().recordsTotal}(e));$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),e.on("keydown",(function(e){!function(e){13===e.keyCode&&P()}(e)})),l.on("change",(function(){P()})),o.on("click",(function(){P()})),r.on("click",(function(){W()})),c.on("click",(function(){p.fadeIn(),u.fadeIn(),$("body").css("overflow-y","hidden"),g.DataTable({ajax:{url:v.reorderGiftList,type:"POST",headers:b,dataFilter:function(e){let t=JSON.parse(e);return y(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],L(h(t))),JSON.stringify(t)},data:function(e){},error:function(e,t){S("목록을(를) 불러올 수 없습니다.")}},columns:[{title:"상품명",data:"gift_name",width:"70%",render:function(e,t,a,i){return`<a href="${w+a.idx}">${e}</a>`}},{title:"이미지",data:"gift_image_url",width:"20%",render:function(e){return`<div class="list-img-wrap"><img src="${e}" alt=""></div>`}}],serverSide:!0,paging:!1,select:!1,destroy:!0,scrollY:650,scrollCollapse:!0,initComplete:function(){g.find("tbody").sortable({helper:function(e,t){return function(e){let t=$(e).children();return $(t[0]).css("width",Math.ceil($(e).width()/100*70)+"px"),$(t[1]).css("width",Math.ceil($(e).width()/100*20)+"px"),$(e)}(t)}})},fnRowCallback:function(e,t){$(e).attr("data-uuid",t.gift_uuid)},drawCallback:function(e){}})})),m.on("click",(function(){C()})),u.on("click",(function(){C()})),s.on("click",(function(){var e;(0!==F().length||(L(D),0))&&("변경하시겠습니까?",e=B,Swal.fire({text:"변경하시겠습니까?",showCancelButton:!0,confirmButtonText:"확인",cancelButtonText:"취소"}).then((t=>{t.value&&e()})))}))}))})();