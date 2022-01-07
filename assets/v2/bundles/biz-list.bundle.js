(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType")),o=($("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),n=$("#btnSearch"),r=$("#btnReset"),s=($("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),l=($("#selSort"),$("#dataTable")),d=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#report"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-report]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-report]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))}),c=`${api_server_url}/v3/`,m={saveUserUcdFromXlsx:c+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:c+"ucd/set/charge/user/system",saveUserUcdByBiz:c+"ucd/set/charge/user/company",saveDoitUcdBySystem:c+"ucd/set/charge/doit/system",saveDoitUcdByBiz:c+"ucd/set/charge/doit/company",saveBizUcd:c+"ucd/set/charge/company/system",dashboardSummary:c+"main/dashboard",dashboardSummaryList:c+"main/dashboard/get/list",dashboardMoreLeader:c+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:c+"main/dashboard/get/doitRanklist",getProfile:c+"admin/get",updatePassword:c+"admin/update/pwd",memberList:c+"profile/get/list",detailMember:c+"profile/get/detail/info",levelUp:c+"profile/set/levelUp",levelDown:c+"profile/set/levelDown",cancelPartner:c+"profile/set/releasePartner",levelInfo:c+"profile/get/level",levelHistory:c+"profile/get/level/history",deviceInfo:c+"profile/get/device/info",memberDoitList:c+"profile/get/doit",memberCategoryList:c+"profile/get/category",memberActionList:c+"profile/get/action",memberActionDetail:c+"profile/get/detail/action",countPerLevel:c+"level/get/count",memberLevelList:c+"level/get/list",unlinkMemberList:c+"profile/get/unlink",changedMemberList:c+"profile/get/changed",badgeList:c+"badge/get/list",createBadge:c+"badge/create",detailBadge:c+"badge/get/detail/info",deleteBadge:c+"badge/delete",updateBadge:c+"badge/update",categoryList:c+"category/list",createCategory:c+"category/create",detailCategory:c+"category/detail",reorderCategory:c+"category/update/sequence",deleteCategory:c+"category/delete",updateCategory:c+"category/update",subCategoryList:c+"subcategory/list",createSubCategory:c+"subcategory/create",updateSubCategoryDoitImg:c+"subcategory/set/doit/image",deleteSubCategory:c+"subcategory/delete",reorderSubCategory:c+"subcategory/update/sequence",editSubCategory:c+"subcategory/update",keywordList:c+"keyword/get/list",createKeyword:c+"keyword/create",updateKeyword:c+"keyword/update",doitSponsorList:c+"doit/get/company",doitList:c+"doit/list",doitSetRecommend:c+"doit/set/recommend",createDoit:c+"doit/create",createDoitCategoryList:c+"category/exposure/list",detailDoit:c+"doit/detail",updateDoit:c+"doit/update",deleteDoit:c+"doit/delete",openDoit:c+"doit/set/open",stopDoit:c+"doit/set/stop",getDoitUcd:c+"ucd/get/doit",getUcdDoitList:c+"ucd/get/doit/list",missionList:c+"mission/get/list",createMission:c+"mission/create",detailMission:c+"mission/get/detail/info",updateMission:c+"mission/update",deleteMission:c+"mission/delete",joinMemberList:c+"member/get/list",infoJoinMember:c+"member/get/profile",rewardMemberList:c+"ucd/get/reward/profile",createReward:c+"ucd/set/reward/profile",countMember:c+"member/get/count",blockMember:c+"member/set/retire/ban",banMember:c+"member/set/retire",applyMemberList:c+"member/get/applylist",approvalMember:c+"member/get/applyConfirm",rejectMember:c+"member/get/applyReject",blockMemberList:c+"member/get/retire/ban/list",cancelBlockMember:c+"member/set/retire/ban/cancel",actionList:c+"action/get/list",detailAction:c+"action/get/detail/info",sendWarning:c+"action/set/yellow",cancelWarning:c+"action/set/yellowCancel",actionCommentList:c+"action/get/commentList",createActionComment:c+"action/set/insertComment",deleteActionComment:c+"action/set/deleteComment",actionReplyList:c+"action/get/comment/child/list",talkList:c+"board/get/list",createTalk:c+"board/create",detailTalk:c+"board/get/detail/info",updateTalk:c+"board/update",deleteTalk:c+"board/delete",talkCommentList:c+"board/get/commentList",createTalkComment:c+"board/set/insertComment",deleteTalkComment:c+"board/set/deleteComment",talkReplyList:c+"board/get/comment/child/list",pickList:c+"recommend/list",previewList:c+"recommend/get/doit",searchDoitList:c+"recommend/get/doit/list",reorderPick:c+"recommend/set",createPick:c+"recommend/create",updatePick:c+"recommend/update",detailPick:c+"recommend/detail",bizList:c+"biz/get/list",createBiz:c+"biz/create",detailBiz:c+"biz/get/detail/info",bizDoitList:c+"biz/get/detail/doit",bizUcdList:c+"ucd/list/get/company",updateBiz:c+"biz/update",getBizUcd:c+"ucd/get/company",noticeList:c+"notice/get/list",createNotice:c+"notice/create",detailNotice:c+"notice/get/detail/info",updateNotice:c+"notice/update",deleteNotice:c+"notice/delete",faqType:c+"faq/get/type",faqList:c+"faq/get/list",createFaq:c+"faq/create",detailFaq:c+"faq/get/detail/info",updateFaq:c+"faq/update",deleteFaq:c+"faq/delete",reorderFaq:c+"faq/set/orders",inquiryList:c+"qna/get/list",updateInquiry:c+"qna/set/insertComment",detailInquiry:c+"qna/get/detail/info",deleteInquiry:c+"qna/delete",reportActionList:c+"report/get/action/list",actionReportReasonList:c+"report/get/action/descriptionList",reportTalkList:c+"report/get/board/list",talkReportReasonList:c+"report/get/board/descriptionList",blindTalk:c+"report/set/blind",bannerList:c+"banner/get/list",createBanner:c+"banner/create",detailBanner:c+"banner/get/detail/info",updateBanner:c+"banner/update",reorderBanner:c+"banner/set/orders",targetEventList:c+"banner/get/event/list",targetDoitList:c+"banner/get/doit/list",targetNoticeList:c+"banner/get/notice/list",storyList:c+"story/get/list",createStory:c+"story/create",detailStory:c+"story/get/detail/info",updateStory:c+"story/update",reorderStory:c+"story/set/orders",eventList:c+"event/get/list",createEvent:c+"event/create",detailEvent:c+"event/get/detail/info",deleteEvent:c+"event/delete",updateEvent:c+"event/update",customEvent:c+"event/popup/get/list",customEventProfile:c+"event/popup/get/profile",pushList:c+"push/list",cancelPush:c+"push/set/cancel",createPush:c+"push/create",pushTargetNotice:c+"push/get/notice",pushTargetEvent:c+"push/get/event",pushTargetDoit:c+"push/get/doit",pushTargetMember:c+"push/get/profile",pushTargetMemberFromXlsx:c+"excel/import/notification/profile",popupList:c+"popup/get/list",createPopup:c+"popup/create",detailPopup:c+"popup/get/detail/info",updatePopup:c+"popup/update",deletePopup:c+"popup/delete",errorList:c+"error/list",updateError:c+"error/update",createEncryption:c+"operate/set/encryption",createDecryption:c+"operate/set/decryption",versionList:c+"operate/get/version/list",createVersion:c+"operate/version/create",deleteVersion:c+"operate/version/delete",logList:c+"log/get/list",getMemberForSaveUcd:c+"ucd/get/user/list",getMemberFromXlsx:c+"excel/import/profile",getDoitFromXlsx:c+"excel/import/doit",ucdChargeList:c+"ucd/list/get/charge",systemWalletType:c+"ucd/get/system/type",systemWalletList:c+"ucd/list/get/system",doitWalletList:c+"ucd/list/get/doit",memberWalletList:c+"ucd/list/get/user",pendingWalletList:c+"ucd/list/get/transfer",giftList:c+"gift/get/list",reorderGiftList:c+"gift/get/orderList",reorderGift:c+"gift/set/orders",createGift:c+"gift/create",ktGoodsList:c+"gift/get/kt/goods",detailGift:c+"gift/get/detail/info",updateGift:c+"gift/update",applyGiftList:c+"exchange/get/list",sendGifticon:c+"exchange/set/confirm",sendGeneralGift:c+"exchange/set/send",rejectGift:c+"exchange/set/reject",resendGift:c+"exchange/set/resend",getGiftBalance:c+"exchange/get/money",sendGiftList:c+"exchange/get/sendList",sendGiftStatusList:c+"exchange/get/payment",updateGiftSendMemo:c+"exchange/set/insertMemo",adminList:c+"admin/list",detailAdmin:c+"admin/detail",updateAdmin:c+"admin/update",deleteAdmin:c+"admin/delete",authBizList:c+"auth/get/biz/list",approvalAdmin:c+"admin/approval",authList:c+"auth/list",getMenuWithAuth:c+"auth/get/menu",setMenuWithAuth:c+"auth/set/menu",createAuth:c+"auth/create",deleteAuth:c+"auth/delete",promotionList:c+"promotion/get/list",createPromotion:c+"promotion/create",detailPromotion:c+"promotion/get/detail",updatePromotion:c+"promotion/update",closePromotion:c+"promotion/set/end",promotionDoitList:c+"promotion/get/doit/list",promotionProceedList:c+"promotion/get/proceed/list",setDoitPromotion:c+"promotion/set/doit",cancelDoitPromotion:c+"promotion/set/release"},p=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}),u="목록이 없습니다.";function g(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function b(){return window.location.pathname}let y=1;function f(){t.each((function(){$(this).children().eq(0).prop("selected",!0)})),o.val("")}function h(){y=1;let e=l.DataTable();e.page.len(Number(s.val())),e.ajax.reload()}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:u,zeroRecords:u,processing:"검색 중..",paginate:{previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>'}}}),s.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),function(){const e=window.performance.getEntriesByType("navigation")[0],t=g(e)?window.performance.navigation.type:e.type;let a=!1;return"back_forward"!==t&&2!==t||sessionStorage.getItem("page")===b()&&(a=!0),a}()?function(){let e=JSON.parse(sessionStorage.getItem("param"));o.val(e.keyword),s.val(e.limit),y=e.page}():f(),l.DataTable({ajax:{url:m.bizList,type:"POST",headers:d,dataFilter:function(e){let t=JSON.parse(e);var a;return function(e){return 0===function(e){return e.status}(e)}(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],a=function(e){return e.msg}(t),p.fire({icon:"info",title:a})),JSON.stringify(t)},data:function(e){return function(){const e={search_type:i.val(),keyword:o.val().trim(),page:y,limit:s.val()};return function(e){e=g(e)?"":JSON.stringify(e),sessionStorage.setItem("param",e),sessionStorage.setItem("page",b())}(e),JSON.stringify(e)}()},error:function(e,t){Swal.fire({icon:"error",html:"목록을(를) 불러올 수 없습니다."})}},columns:[{title:"기업명",data:"nickname",width:"25%",render:function(e,t,a,i){return`<a href="${"/v2/biz/detail/"+a.idx}"><img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt=""> ${e}</a>`}},{title:"기업 ID",data:"company_uuid",width:"40%"},{title:"등록일",data:"created",width:"15%",render:function(e){return e.substring(0,10)}}],serverSide:!0,paging:!0,pageLength:Number(s.val()),select:!1,destroy:!0,initComplete:function(){var e;$(this).on("page.dt",(function(){y=function(e){let t=$(e).DataTable().page.info();return t.start/t.length+1}(this)})),e=y,$(this).DataTable().page(e-1).draw("page")},fnRowCallback:function(e,t){},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=g(i=function(e){return e.DataTable().page.info().recordsTotal}(e))||isNaN(i)?0:i.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");var i;$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),e.on("keydown",(function(e){!function(e){13===e.keyCode&&h()}(e)})),s.on("change",(function(){h()})),n.on("click",(function(){h()})),r.on("click",(function(){f()}))}))})();