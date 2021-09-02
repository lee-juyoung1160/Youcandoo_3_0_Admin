(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword"),$("#btnSearch"),$("#btnReset"),$("#btnSubmit")),i=($("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate")),a=($("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList")),n=$("#btnBack"),o=($("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable"),$("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount")),r=($("#nickname"),$("#memo"),$("#title")),s=$("#content"),l=$("#contentImage"),d=($("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input")),c=$(".only-num"),p=($(".modal-btn"),$(".modal-close")),m=$(".modal-content"),u=$(".modal-bg"),g=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl")),b=$(".tab-contents"),f=($("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd")),h=($("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable")),y=($("#ucdTable"),$("#selPageLengthDoit")),T=$("#selPageLengthUcd"),v=$("#bizNo"),k=$("#bizWeb"),L=$("#description"),D=$("#btnSupportDoit"),S=$("#btnSupportLeader"),C=($("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance")),w=($("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable")),M=($("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))});function U(e,t,i){return new Promise(((a,n)=>{$.ajax({global:e,url:t,type:"POST",headers:M,contentType:"text/plain",dataType:"json",data:i,success:function(e){a(e)},error:function(e,t,i){n(i)},complete:function(e,t){}})}))}function x(e){let t=e.msg,i=e.status;return[30034,30035,30308].indexOf(i)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function A(e){return 0===function(e){return e.status}(e)}function W(e){return e.msg}const B=`${api_server_url}/v3/`,P={saveUserUcdFromXlsx:B+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:B+"ucd/set/charge/user/system",saveUserUcdByBiz:B+"ucd/set/charge/user/company",saveDoitUcdBySystem:B+"ucd/set/charge/doit/system",saveDoitUcdByBiz:B+"ucd/set/charge/doit/company",saveBizUcd:B+"ucd/set/charge/company/system",dashboardSummary:B+"main/dashboard",dashboardSummaryList:B+"main/dashboard/get/list",dashboardMoreLeader:B+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:B+"main/dashboard/get/doitRanklist",getProfile:B+"admin/get",updatePassword:B+"admin/update/pwd",memberList:B+"profile/get/list",detailMember:B+"profile/get/detail/info",levelUp:B+"profile/set/levelUp",levelDown:B+"profile/set/levelDown",cancelPartner:B+"profile/set/releasePartner",levelInfo:B+"profile/get/level",levelHistory:B+"profile/get/level/history",deviceInfo:B+"profile/get/device/info",memberDoitList:B+"profile/get/doit",memberCategoryList:B+"profile/get/category",memberActionList:B+"profile/get/action",memberActionDetail:B+"profile/get/detail/action",countPerLevel:B+"level/get/count",memberLevelList:B+"level/get/list",unlinkMemberList:B+"profile/get/unlink",changedMemberList:B+"profile/get/changed",badgeList:B+"badge/get/list",createBadge:B+"badge/create",detailBadge:B+"badge/get/detail/info",deleteBadge:B+"badge/delete",updateBadge:B+"badge/update",categoryList:B+"category/list",createCategory:B+"category/create",detailCategory:B+"category/detail",reorderCategory:B+"category/update/sequence",deleteCategory:B+"category/delete",updateCategory:B+"category/update",subCategoryList:B+"subcategory/list",createSubCategory:B+"subcategory/create",updateSubCategoryDoitImg:B+"subcategory/set/doit/image",deleteSubCategory:B+"subcategory/delete",reorderSubCategory:B+"subcategory/update/sequence",editSubCategory:B+"subcategory/update",keywordList:B+"keyword/get/list",createKeyword:B+"keyword/create",updateKeyword:B+"keyword/update",doitSponsorList:B+"doit/get/company",doitList:B+"doit/list",doitSetRecommend:B+"doit/set/recommend",createDoit:B+"doit/create",createDoitCategoryList:B+"category/exposure/list",detailDoit:B+"doit/detail",updateDoit:B+"doit/update",deleteDoit:B+"doit/delete",openDoit:B+"doit/set/open",stopDoit:B+"doit/set/stop",getDoitUcd:B+"ucd/get/doit",getUcdDoitList:B+"ucd/get/doit/list",missionList:B+"mission/get/list",createMission:B+"mission/create",detailMission:B+"mission/get/detail/info",updateMission:B+"mission/update",deleteMission:B+"mission/delete",joinMemberList:B+"member/get/list",infoJoinMember:B+"member/get/profile",rewardMemberList:B+"ucd/get/reward/profile",createReward:B+"ucd/set/reward/profile",countMember:B+"member/get/count",blockMember:B+"member/set/retire/ban",banMember:B+"member/set/retire",applyMemberList:B+"member/get/applylist",approvalMember:B+"member/get/applyConfirm",rejectMember:B+"member/get/applyReject",blockMemberList:B+"member/get/retire/ban/list",cancelBlockMember:B+"member/set/retire/ban/cancel",actionList:B+"action/get/list",detailAction:B+"action/get/detail/info",sendWarning:B+"action/set/yellow",cancelWarning:B+"action/set/yellowCancel",actionCommentList:B+"action/get/commentList",createActionComment:B+"action/set/insertComment",deleteActionComment:B+"action/set/deleteComment",actionReplyList:B+"action/get/comment/child/list",talkList:B+"board/get/list",createTalk:B+"board/create",detailTalk:B+"board/get/detail/info",updateTalk:B+"board/update",deleteTalk:B+"board/delete",talkCommentList:B+"board/get/commentList",createTalkComment:B+"board/set/insertComment",deleteTalkComment:B+"board/set/deleteComment",talkReplyList:B+"board/get/comment/child/list",pickList:B+"recommend/list",previewList:B+"recommend/get/doit",searchDoitList:B+"recommend/get/doit/list",reorderPick:B+"recommend/set",createPick:B+"recommend/create",updatePick:B+"recommend/update",detailPick:B+"recommend/detail",bizList:B+"biz/get/list",createBiz:B+"biz/create",detailBiz:B+"biz/get/detail/info",bizDoitList:B+"biz/get/detail/doit",bizUcdList:B+"ucd/list/get/company",updateBiz:B+"biz/update",getBizUcd:B+"ucd/get/company",noticeList:B+"notice/get/list",createNotice:B+"notice/create",detailNotice:B+"notice/get/detail/info",updateNotice:B+"notice/update",deleteNotice:B+"notice/delete",faqType:B+"faq/get/type",faqList:B+"faq/get/list",createFaq:B+"faq/create",detailFaq:B+"faq/get/detail/info",updateFaq:B+"faq/update",deleteFaq:B+"faq/delete",reorderFaq:B+"faq/set/orders",inquiryList:B+"qna/get/list",updateInquiry:B+"qna/set/insertComment",detailInquiry:B+"qna/get/detail/info",deleteInquiry:B+"qna/delete",reportActionList:B+"report/get/action/list",actionReportReasonList:B+"report/get/action/descriptionList",reportTalkList:B+"report/get/board/list",talkReportReasonList:B+"report/get/board/descriptionList",blindTalk:B+"report/set/blind",bannerList:B+"banner/get/list",createBanner:B+"banner/create",detailBanner:B+"banner/get/detail/info",updateBanner:B+"banner/update",reorderBanner:B+"banner/set/orders",targetEventList:B+"banner/get/event/list",targetDoitList:B+"banner/get/doit/list",targetNoticeList:B+"banner/get/notice/list",storyList:B+"story/get/list",createStory:B+"story/create",detailStory:B+"story/get/detail/info",updateStory:B+"story/update",reorderStory:B+"story/set/orders",eventList:B+"event/get/list",createEvent:B+"event/create",detailEvent:B+"event/get/detail/info",deleteEvent:B+"event/delete",updateEvent:B+"event/update",customEvent:B+"event/popup/get/list",customEventProfile:B+"event/popup/get/profile",pushList:B+"push/list",cancelPush:B+"push/set/cancel",createPush:B+"push/create",pushTargetNotice:B+"push/get/notice",pushTargetEvent:B+"push/get/event",pushTargetDoit:B+"push/get/doit",pushTargetMember:B+"push/get/profile",pushTargetMemberFromXlsx:B+"excel/import/notification/profile",popupList:B+"popup/get/list",createPopup:B+"popup/create",detailPopup:B+"popup/get/detail/info",updatePopup:B+"popup/update",deletePopup:B+"popup/delete",errorList:B+"error/list",updateError:B+"error/update",createEncryption:B+"operate/set/encryption",createDecryption:B+"operate/set/decryption",versionList:B+"operate/get/version/list",createVersion:B+"operate/version/create",deleteVersion:B+"operate/version/delete",logList:B+"log/get/list",getMemberForSaveUcd:B+"ucd/get/user/list",getMemberFromXlsx:B+"excel/import/profile",getDoitFromXlsx:B+"excel/import/doit",ucdChargeList:B+"ucd/list/get/charge",systemWalletType:B+"ucd/get/system/type",systemWalletList:B+"ucd/list/get/system",doitWalletList:B+"ucd/list/get/doit",memberWalletList:B+"ucd/list/get/user",pendingWalletList:B+"ucd/list/get/transfer",giftList:B+"gift/get/list",reorderGiftList:B+"gift/get/orderList",reorderGift:B+"gift/set/orders",createGift:B+"gift/create",ktGoodsList:B+"gift/get/kt/goods",detailGift:B+"gift/get/detail/info",updateGift:B+"gift/update",applyGiftList:B+"exchange/get/list",sendGifticon:B+"exchange/set/confirm",sendGeneralGift:B+"exchange/set/send",rejectGift:B+"exchange/set/reject",resendGift:B+"exchange/set/resend",getGiftBalance:B+"exchange/get/money",sendGiftList:B+"exchange/get/sendList",sendGiftStatusList:B+"exchange/get/payment",updateGiftSendMemo:B+"exchange/set/insertMemo",adminList:B+"admin/list",detailAdmin:B+"admin/detail",updateAdmin:B+"admin/update",deleteAdmin:B+"admin/delete",authBizList:B+"auth/get/biz/list",approvalAdmin:B+"admin/approval",authList:B+"auth/list",getMenuWithAuth:B+"auth/get/menu",setMenuWithAuth:B+"auth/set/menu",createAuth:B+"auth/create",deleteAuth:B+"auth/delete",promotionList:B+"promotion/get/list",createPromotion:B+"promotion/create",detailPromotion:B+"promotion/get/detail",updatePromotion:B+"promotion/update",closePromotion:B+"promotion/set/end",promotionDoitList:B+"promotion/get/doit/list",promotionProceedList:B+"promotion/get/proceed/list",setDoitPromotion:B+"promotion/set/doit",cancelDoitPromotion:B+"promotion/set/release"},I=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function F(e){I.fire({icon:"info",title:e})}function N(e){Swal.fire({icon:"error",html:e})}const z="목록이 없습니다.",q="/v2/biz",E="/v2/biz/update/",R="/v2/biz/support/leader",O="/v2/biz/support/doit",G="/v2/doit/detail/";function _(){m.fadeOut(),u.fadeOut(),$("body").css("overflow-y","auto")}function j(e){e.html('<option value="10">10개씩 보기</ooption>\n            <option selected value="30">30개씩 보기</ooption>\n            <option value="50">50개씩 보기</ooption>\n            <option value="100">100개씩 보기</ooption>\n            <option value="500">500개씩 보기</ooption>\n            <option value="1000">1000개씩 보기</ooption>')}function J(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function K(e){return J(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function X(e){return/^[0-9]*$/g.test(e)}function H(e){const t=$(e).parent().siblings().find(".data-num"),i=K(function(e){return e.DataTable().page.info().recordsTotal}(e));$(t).text(i)}function Q(e){$(e).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(e.api().page.info().pages>0)}const V=("/",window.location.pathname.split("/").reverse()[0]);function Y(){const e={idx:V};U(!0,P.detailBiz,JSON.stringify(e)).then((async function(e,t,i){A(e)?function(e){Z=e.data.profile_uuid,function(e){const{company_number:t,profile_image_url:i,nickname:a,site_url:n,description:o}=e.data;l.attr("src",i),r.text(a),v.text(t),k.html(`<a href="${n}" class="link" target="_blank">${n}</a>`),s.text(o),$("img").on("error",(function(){$(this).attr("src","/assets/v2/img/no-image.jpg")}))}(e),function(){const e={profile_uuid:Z};U(!1,P.getBizUcd,JSON.stringify(e)).then((async function(e,t,i){A(e)?function(e){C.text(K(e.data.ucd))}(e):F(W(e))})).catch((e=>N("보유 UCD 을(를) 불러올 수 없습니다.")))}(),ee()}(e):F(W(e))})).catch((e=>N("상세 내용을(를) 불러올 수 없습니다.")))}let Z;function ee(){h.DataTable({ajax:{url:P.bizDoitList,type:"POST",headers:M,global:!1,dataFilter:function(e){let t=JSON.parse(e);return A(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],F(W(t))),JSON.stringify(t)},data:function(e){const t={profile_uuid:Z,page:e.start/e.length+1,limit:e.length};return JSON.stringify(t)},error:function(e,t){N("두잇목록을(를) 불러올 수 없습니다.")}},columns:[{title:"카테고리",data:"category_title",width:"15%"},{title:"세부 카테고리",data:"subcategory_title",width:"15%"},{title:"두잇명",data:"doit_title",width:"40%",render:function(e,t,i,a){return`<a href="${G}${i.idx}">${e}</a>`}},{title:"개설일",data:"created",width:"10%",render:function(e){return e.substring(0,10)}},{title:"참여인원",data:"member_cnt",width:"10%",render:function(e){return K(e)}},{title:"상태",data:"doit_status",width:"10%",render:function(e){return function(e){switch(e){case"create":return"생성";case"open":return"진행중";case"stop":return"운영정지";case"delete":return"삭제"}}(e)}}],serverSide:!0,paging:!0,pageLength:Number(y.val()),select:!1,destroy:!0,initComplete:function(){},fnRowCallback:function(e,t){},drawCallback:function(e){H(this),Q(this)}})}function te(){w.DataTable({ajax:{url:P.bizUcdList,type:"POST",headers:M,global:!1,dataFilter:function(e){let t=JSON.parse(e);return A(t)?(t.recordsTotal=t.data.count,t.recordsFiltered=t.data.count,t.data=t.data.list):(t.data=[],F(W(t))),JSON.stringify(t)},data:function(e){const t={from_date:"",to_date:"",search_type:"profile_uuid",keyword:Z,page:e.start/e.length+1,limit:e.length};return JSON.stringify(t)},error:function(e,t){N("UCD목록을(를) 불러올 수 없습니다.")}},columns:[{title:"구분",data:"division",width:"10%"},{title:"제목",data:"title",width:"15%"},{title:"내용",data:"description",width:"40%",render:function(e,t,i,a){return J(e)?"-":e}},{title:"UCD",data:"value",width:"10%",render:function(e,t,i,a){return K(e)}},{title:"일시",data:"created",width:"15%"}],serverSide:!0,paging:!0,pageLength:Number(T.val()),select:!1,destroy:!0,initComplete:function(){},fnRowCallback:function(e,t){var i;i=t.value,-1===Math.sign(i)&&$(e).addClass("minus-pay")},drawCallback:function(e){H(this),Q(this)}})}function ie(){const e={profile_uuid:[Z],value:o.val().trim(),description:L.val().trim()};U(!0,P.saveBizUcd,JSON.stringify(e)).then((async function(e,t,i){await function(e,t){Swal.fire({toast:!0,position:"center",icon:A(e)?"success":"error",title:x(e),showConfirmButton:!1,timer:1500}).then((i=>{i.isDismissed&&A(e)&&t()}))}(e,ae)})).catch((e=>N("등록 처리 중, 오류가 발생했습니다.")))}function ae(){_(),Y()}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:z,zeroRecords:z,processing:"검색 중..",paginate:{previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>'}}}),j(y),j(T),Y(),d.on("propertychange change keyup paste input",(function(){!function(e){let t=$(e).val().length,i=$(e).prop("maxLength");t>i&&i>0&&($(e).val($(e).val().slice(0,i)),t=i),$(e).next().find(".count-input").text(t)}(this)})),c.on("propertychange change keyup paste input",(function(){!function(e){let t=$(e).val().split(""),i=t.length,a="";for(let e=0;e<i;e++)0!=t[0]&&X(t[0])||(t[0]=""),X(t[e])&&(a+=t[e]);$(e).val(a)}(this)})),g.on("click",(function(e){!function(e){const t=$(e).data("target");switch(t){case"#tabDoitInfo":ee();break;case"#tabUcdInfo":te()}$(e).siblings().removeClass("active"),$(e).addClass("active"),b.hide(),$(t).show()}(e.target)})),y.on("change",(function(){ee()})),T.on("change",(function(){te()})),f.on("click",(function(){m.fadeIn(),u.fadeIn(),$("body").css("overflow-y","hidden"),o.trigger("focus"),o.val("")})),p.on("click",(function(){_()})),u.on("click",(function(){_()})),n.on("click",(function(){history.back()})),a.on("click",(function(){location.href=q})),i.on("click",(function(){location.href=E+V})),t.on("click",(function(){var e;(J(o.val())?(F("ucd는 필수항목입니다."),o.trigger("focus"),0):!(o.val()>1e8&&(F("최대 1억 UCD까지 가능합니다."),o.trigger("focus"),1)))&&("등록하시겠습니까?",e=ie,Swal.fire({text:"등록하시겠습니까?",showCancelButton:!0,confirmButtonText:"확인",cancelButtonText:"취소"}).then((t=>{t.value&&e()})))})),D.on("click",(function(){!function(){let e=$("<form></form>");e.prop("method","post"),e.prop("action",O),e.append($("<input/>",{type:"hidden",name:"idx",value:V})),e.appendTo("body"),e.trigger("submit")}()})),S.on("click",(function(){!function(){let e=$("<form></form>");e.prop("method","post"),e.prop("action",R),e.append($("<input/>",{type:"hidden",name:"idx",value:V})),e.appendTo("body"),e.trigger("submit")}()}))}))})();