(()=>{"use strict";const e=$("body"),t=($("section"),$(".search-wrap select")),a=($("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu"),$("#sessionUserid")),i=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn")),n=$(".datepicker"),o=$(".date-from"),r=$(".date-to"),s=($("#selDateType"),$("#selSearchType")),l=($("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),d=$("#btnSearch"),c=$("#btnReset"),m=($("#btnSubmit"),$("#btnCancel"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength")),p=($("#selSort"),$("#dataTable")),u=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close"),$(".modal-content"),$(".modal-bg"),$("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$("#btnJoinMembers"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBan"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("#versionDigit"),$("#versionDecimal"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:a.val()}))}),g=`${api_server_url}/v3/`,b={saveUserUcdFromXlsx:g+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:g+"ucd/set/charge/user/system",saveUserUcdByBiz:g+"ucd/set/charge/user/company",saveDoitUcdBySystem:g+"ucd/set/charge/doit/system",saveDoitUcdByBiz:g+"ucd/set/charge/doit/company",saveBizUcd:g+"ucd/set/charge/company/system",dashboardSummary:g+"main/dashboard",dashboardSummaryList:g+"main/dashboard/get/list",dashboardMoreLeader:g+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:g+"main/dashboard/get/doitRanklist",getProfile:g+"admin/get",updatePassword:g+"admin/update/pwd",memberList:g+"profile/get/list",detailMember:g+"profile/get/detail/info",levelUp:g+"profile/set/levelUp",levelDown:g+"profile/set/levelDown",cancelPartner:g+"profile/set/releasePartner",levelInfo:g+"profile/get/level",levelHistory:g+"profile/get/level/history",deviceInfo:g+"profile/get/device/info",memberDoitList:g+"profile/get/doit",memberCategoryList:g+"profile/get/category",memberActionList:g+"profile/get/action",memberActionDetail:g+"profile/get/detail/action",countPerLevel:g+"level/get/count",memberLevelList:g+"level/get/list",unlinkMemberList:g+"profile/get/unlink",changedMemberList:g+"profile/get/changed",badgeList:g+"badge/get/list",createBadge:g+"badge/create",detailBadge:g+"badge/get/detail/info",deleteBadge:g+"badge/delete",updateBadge:g+"badge/update",categoryList:g+"category/list",createCategory:g+"category/create",detailCategory:g+"category/detail",reorderCategory:g+"category/update/sequence",deleteCategory:g+"category/delete",updateCategory:g+"category/update",subCategoryList:g+"subcategory/list",createSubCategory:g+"subcategory/create",updateSubCategoryDoitImg:g+"subcategory/set/doit/image",deleteSubCategory:g+"subcategory/delete",reorderSubCategory:g+"subcategory/update/sequence",editSubCategory:g+"subcategory/update",keywordList:g+"keyword/get/list",createKeyword:g+"keyword/create",updateKeyword:g+"keyword/update",doitSponsorList:g+"doit/get/company",doitList:g+"doit/list",doitSetRecommend:g+"doit/set/recommend",createDoit:g+"doit/create",createDoitCategoryList:g+"category/exposure/list",detailDoit:g+"doit/detail",updateDoit:g+"doit/update",deleteDoit:g+"doit/delete",openDoit:g+"doit/set/open",stopDoit:g+"doit/set/stop",getDoitUcd:g+"ucd/get/doit",getUcdDoitList:g+"ucd/get/doit/list",missionList:g+"mission/get/list",createMission:g+"mission/create",detailMission:g+"mission/get/detail/info",updateMission:g+"mission/update",deleteMission:g+"mission/delete",joinMemberList:g+"member/get/list",infoJoinMember:g+"member/get/profile",rewardMemberList:g+"ucd/get/reward/profile",createReward:g+"ucd/set/reward/profile",countMember:g+"member/get/count",banMember:g+"member/set/retire",applyMemberList:g+"member/get/applylist",approvalMember:g+"member/get/applyConfirm",rejectMember:g+"member/get/applyReject",actionList:g+"action/get/list",detailAction:g+"action/get/detail/info",sendWarning:g+"action/set/yellow",cancelWarning:g+"action/set/yellowCancel",actionCommentList:g+"action/get/commentList",createActionComment:g+"action/set/insertComment",deleteActionComment:g+"action/set/deleteComment",actionReplyList:g+"action/get/comment/child/list",talkList:g+"board/get/list",createTalk:g+"board/create",detailTalk:g+"board/get/detail/info",updateTalk:g+"board/update",deleteTalk:g+"board/delete",talkCommentList:g+"board/get/commentList",createTalkComment:g+"board/set/insertComment",deleteTalkComment:g+"board/set/deleteComment",talkReplyList:g+"board/get/comment/child/list",pickList:g+"recommend/list",previewList:g+"recommend/get/doit",searchDoitList:g+"recommend/get/doit/list",reorderPick:g+"recommend/set",createPick:g+"recommend/create",updatePick:g+"recommend/update",detailPick:g+"recommend/detail",bizList:g+"biz/get/list",createBiz:g+"biz/create",detailBiz:g+"biz/get/detail/info",bizDoitList:g+"biz/get/detail/doit",bizUcdList:g+"ucd/list/get/company",updateBiz:g+"biz/update",getBizUcd:g+"ucd/get/company",noticeList:g+"notice/get/list",createNotice:g+"notice/create",detailNotice:g+"notice/get/detail/info",updateNotice:g+"notice/update",deleteNotice:g+"notice/delete",faqType:g+"faq/get/type",faqList:g+"faq/get/list",createFaq:g+"faq/create",detailFaq:g+"faq/get/detail/info",updateFaq:g+"faq/update",deleteFaq:g+"faq/delete",reorderFaq:g+"faq/set/orders",inquiryList:g+"qna/get/list",updateInquiry:g+"qna/set/insertComment",detailInquiry:g+"qna/get/detail/info",reportActionList:g+"report/get/action/list",actionReportReasonList:g+"report/get/action/descriptionList",reportTalkList:g+"report/get/board/list",talkReportReasonList:g+"report/get/board/descriptionList",blindTalk:g+"report/set/blind",bannerList:g+"banner/get/list",createBanner:g+"banner/create",detailBanner:g+"banner/get/detail/info",updateBanner:g+"banner/update",reorderBanner:g+"banner/set/orders",targetEventList:g+"banner/get/event/list",targetDoitList:g+"banner/get/doit/list",targetNoticeList:g+"banner/get/notice/list",storyList:g+"story/get/list",createStory:g+"story/create",detailStory:g+"story/get/detail/info",updateStory:g+"story/update",reorderStory:g+"story/set/orders",eventList:g+"event/get/list",createEvent:g+"event/create",detailEvent:g+"event/get/detail/info",deleteEvent:g+"event/delete",updateEvent:g+"event/update",customEvent:g+"event/popup/get/list",customEventProfile:g+"event/popup/get/profile",pushList:g+"push/list",cancelPush:g+"push/set/cancel",createPush:g+"push/create",pushTargetNotice:g+"push/get/notice",pushTargetEvent:g+"push/get/event",pushTargetDoit:g+"push/get/doit",pushTargetMember:g+"push/get/profile",pushTargetMemberFromXlsx:g+"excel/import/notification/profile",popupList:g+"popup/get/list",createPopup:g+"popup/create",detailPopup:g+"popup/get/detail/info",updatePopup:g+"popup/update",deletePopup:g+"popup/delete",errorList:g+"error/list",updateError:g+"error/update",createEncryption:g+"operate/set/encryption",createDecryption:g+"operate/set/decryption",versionList:g+"operate/get/version/list",createVersion:g+"operate/version/create",deleteVersion:g+"operate/version/delete",getMemberForSaveUcd:g+"ucd/get/user/list",getMemberFromXlsx:g+"excel/import/profile",getDoitFromXlsx:g+"excel/import/doit",ucdChargeList:g+"ucd/list/get/charge",systemWalletType:g+"ucd/get/system/type",systemWalletList:g+"ucd/list/get/system",doitWalletList:g+"ucd/list/get/doit",memberWalletList:g+"ucd/list/get/user",pendingWalletList:g+"ucd/list/get/transfer",giftList:g+"gift/get/list",reorderGiftList:g+"gift/get/orderList",reorderGift:g+"gift/set/orders",createGift:g+"gift/create",ktGoodsList:g+"gift/get/kt/goods",detailGift:g+"gift/get/detail/info",updateGift:g+"gift/update",applyGiftList:g+"exchange/get/list",sendGifticon:g+"exchange/set/confirm",sendGeneralGift:g+"exchange/set/send",rejectGift:g+"exchange/set/reject",resendGift:g+"exchange/set/resend",getGiftBalance:g+"exchange/get/money",sendGiftList:g+"exchange/get/sendList",sendGiftStatusList:g+"exchange/get/payment",updateGiftSendMemo:g+"exchange/set/insertMemo",adminList:g+"admin/list",detailAdmin:g+"admin/detail",updateAdmin:g+"admin/update",deleteAdmin:g+"admin/delete",authBizList:g+"auth/get/biz/list",approvalAdmin:g+"admin/approval",authList:g+"auth/list",getMenuWithAuth:g+"auth/get/menu",setMenuWithAuth:g+"auth/set/menu",createAuth:g+"auth/create",deleteAuth:g+"auth/delete",promotionList:g+"promotion/get/list",createPromotion:g+"promotion/create",detailPromotion:g+"promotion/detail",updatePromotion:g+"promotion/update"},f={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},y=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}),h="목록이 없습니다.";function v(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function T(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function k(e){return T(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function D(e){const t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate();return`${t}-${v(a)}-${v(i)}`}function L(){return D(new Date)}function C(){o.val(function(){const e=new Date;return e.setDate(e.getDate()-6),D(e)}()),r.val(L())}function S(){n.datepicker("option","minDate","2020-07-01"),n.datepicker("option","maxDate","today")}function w(){i.removeClass("active")}function M(){w(),S(),C(),t.each((function(){$(this).children().eq(0).prop("selected",!0)})),l.val("")}function A(){let e=p.DataTable();e.page.len(Number(m.val())),e.ajax.reload(),S()}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:h,zeroRecords:h,processing:"검색 중..",paginate:{previous:f.previous,next:f.next}}}),n.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:f.monthNames,dayNames:f.dayNames,dayNamesMin:f.dayNames}),m.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>'),M(),p.DataTable({ajax:{url:b.doitWalletList,type:"POST",headers:u,dataFilter:function(e){let t=JSON.parse(e);var a;return function(e){return 0===function(e){return e.status}(e)}(t)?(t.recordsTotal=t.data.count,t.recordsFiltered=t.data.count,t.data=t.data.list):(t.data=[],a=function(e){return e.msg}(t),y.fire({icon:"info",title:a})),JSON.stringify(t)},data:function(e){const t={from_date:o.val(),to_date:r.val(),search_type:s.val(),keyword:l.val().trim(),send_type:"doit",receive_type:"doit",page:e.start/e.length+1,limit:e.length};return JSON.stringify(t)},error:function(e,t){var a;a=f.list+"을(를) 불러올 수 없습니다.",Swal.fire({icon:"error",html:a})}},columns:[{title:"두잇명",data:"send_name",width:"21%"},{title:"내용",data:"message",width:"21%"},{title:"실행자",data:"register_name",width:"15%",render:function(e,t,a,i){return T(e)?f.dash:"Y"===a.register_is_company?f.bizIcon+e:e}},{title:"To",data:"receive_name",width:"15%",render:function(e){return T(e)?f.dash:e}},{title:"구분",data:"transfer_type",width:"8%"},{title:"UCD",data:"value",width:"8%",render:function(e,t,a,i){return k(e)}},{title:"지급 일시",data:"sent",width:"12%"}],serverSide:!0,paging:!0,pageLength:Number(m.val()),select:!1,destroy:!0,initComplete:function(){},fnRowCallback:function(e,t){var a;a=t.amount_ucd,-1===Math.sign(a)&&$(e).addClass("minus-pay")},drawCallback:function(e){!function(e){const t=$(e).parent().siblings().find(".data-num"),a=k(function(e){return e.DataTable().page.info().recordsTotal}(e));$(t).text(a)}(this),$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),e.on("keydown",(function(e){!function(e){13===e.keyCode&&A()}(e)})),o.on("change",(function(){r.datepicker("option","minDate",new Date(o.datepicker("getDate"))),w()})),r.on("change",(function(){o.datepicker("option","maxDate",new Date(r.datepicker("getDate"))),w()})),m.on("change",(function(){A()})),d.on("click",(function(){A()})),c.on("click",(function(){M()})),i.on("click",(function(){var e;e=this,w(),$(e).addClass("active"),$(e).hasClass("today")?n.val(L()):$(e).hasClass("week")?C():$(e).hasClass("month")?(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-1),D(e)}()),r.val(L())):$(e).hasClass("months")&&(o.val(function(){const e=new Date;return e.setMonth(e.getMonth()-3),D(e)}()),r.val(L()))}))}))})();