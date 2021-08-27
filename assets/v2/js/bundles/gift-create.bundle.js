(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword")),a=$("#btnSearch"),i=($("#btnReset"),$("#btnSubmit")),n=($("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable")),o=($("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage")),r=($("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input")),s=($(".only-num"),$(".modal-btn")),l=$(".modal-close"),d=$(".modal-content"),c=$(".modal-bg"),m=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price")),p=($("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName")),u=($("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]")),g=$("#selectGiftName"),b=$("#goodsCode"),f=$("#ktImageUrl"),h=($("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))});function y(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function v(e){return 0===function(e){return e.status}(e)}function T(e){return e.msg}const k=`${api_server_url}/v3/`,L={saveUserUcdFromXlsx:k+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:k+"ucd/set/charge/user/system",saveUserUcdByBiz:k+"ucd/set/charge/user/company",saveDoitUcdBySystem:k+"ucd/set/charge/doit/system",saveDoitUcdByBiz:k+"ucd/set/charge/doit/company",saveBizUcd:k+"ucd/set/charge/company/system",dashboardSummary:k+"main/dashboard",dashboardSummaryList:k+"main/dashboard/get/list",dashboardMoreLeader:k+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:k+"main/dashboard/get/doitRanklist",getProfile:k+"admin/get",updatePassword:k+"admin/update/pwd",memberList:k+"profile/get/list",detailMember:k+"profile/get/detail/info",levelUp:k+"profile/set/levelUp",levelDown:k+"profile/set/levelDown",cancelPartner:k+"profile/set/releasePartner",levelInfo:k+"profile/get/level",levelHistory:k+"profile/get/level/history",deviceInfo:k+"profile/get/device/info",memberDoitList:k+"profile/get/doit",memberCategoryList:k+"profile/get/category",memberActionList:k+"profile/get/action",memberActionDetail:k+"profile/get/detail/action",countPerLevel:k+"level/get/count",memberLevelList:k+"level/get/list",unlinkMemberList:k+"profile/get/unlink",changedMemberList:k+"profile/get/changed",badgeList:k+"badge/get/list",createBadge:k+"badge/create",detailBadge:k+"badge/get/detail/info",deleteBadge:k+"badge/delete",updateBadge:k+"badge/update",categoryList:k+"category/list",createCategory:k+"category/create",detailCategory:k+"category/detail",reorderCategory:k+"category/update/sequence",deleteCategory:k+"category/delete",updateCategory:k+"category/update",subCategoryList:k+"subcategory/list",createSubCategory:k+"subcategory/create",updateSubCategoryDoitImg:k+"subcategory/set/doit/image",deleteSubCategory:k+"subcategory/delete",reorderSubCategory:k+"subcategory/update/sequence",editSubCategory:k+"subcategory/update",keywordList:k+"keyword/get/list",createKeyword:k+"keyword/create",updateKeyword:k+"keyword/update",doitSponsorList:k+"doit/get/company",doitList:k+"doit/list",doitSetRecommend:k+"doit/set/recommend",createDoit:k+"doit/create",createDoitCategoryList:k+"category/exposure/list",detailDoit:k+"doit/detail",updateDoit:k+"doit/update",deleteDoit:k+"doit/delete",openDoit:k+"doit/set/open",stopDoit:k+"doit/set/stop",getDoitUcd:k+"ucd/get/doit",getUcdDoitList:k+"ucd/get/doit/list",missionList:k+"mission/get/list",createMission:k+"mission/create",detailMission:k+"mission/get/detail/info",updateMission:k+"mission/update",deleteMission:k+"mission/delete",joinMemberList:k+"member/get/list",infoJoinMember:k+"member/get/profile",rewardMemberList:k+"ucd/get/reward/profile",createReward:k+"ucd/set/reward/profile",countMember:k+"member/get/count",blockMember:k+"member/set/retire/ban",banMember:k+"member/set/retire",applyMemberList:k+"member/get/applylist",approvalMember:k+"member/get/applyConfirm",rejectMember:k+"member/get/applyReject",blockMemberList:k+"member/get/retire/ban/list",cancelBlockMember:k+"member/set/retire/ban/cancel",actionList:k+"action/get/list",detailAction:k+"action/get/detail/info",sendWarning:k+"action/set/yellow",cancelWarning:k+"action/set/yellowCancel",actionCommentList:k+"action/get/commentList",createActionComment:k+"action/set/insertComment",deleteActionComment:k+"action/set/deleteComment",actionReplyList:k+"action/get/comment/child/list",talkList:k+"board/get/list",createTalk:k+"board/create",detailTalk:k+"board/get/detail/info",updateTalk:k+"board/update",deleteTalk:k+"board/delete",talkCommentList:k+"board/get/commentList",createTalkComment:k+"board/set/insertComment",deleteTalkComment:k+"board/set/deleteComment",talkReplyList:k+"board/get/comment/child/list",pickList:k+"recommend/list",previewList:k+"recommend/get/doit",searchDoitList:k+"recommend/get/doit/list",reorderPick:k+"recommend/set",createPick:k+"recommend/create",updatePick:k+"recommend/update",detailPick:k+"recommend/detail",bizList:k+"biz/get/list",createBiz:k+"biz/create",detailBiz:k+"biz/get/detail/info",bizDoitList:k+"biz/get/detail/doit",bizUcdList:k+"ucd/list/get/company",updateBiz:k+"biz/update",getBizUcd:k+"ucd/get/company",noticeList:k+"notice/get/list",createNotice:k+"notice/create",detailNotice:k+"notice/get/detail/info",updateNotice:k+"notice/update",deleteNotice:k+"notice/delete",faqType:k+"faq/get/type",faqList:k+"faq/get/list",createFaq:k+"faq/create",detailFaq:k+"faq/get/detail/info",updateFaq:k+"faq/update",deleteFaq:k+"faq/delete",reorderFaq:k+"faq/set/orders",inquiryList:k+"qna/get/list",updateInquiry:k+"qna/set/insertComment",detailInquiry:k+"qna/get/detail/info",reportActionList:k+"report/get/action/list",actionReportReasonList:k+"report/get/action/descriptionList",reportTalkList:k+"report/get/board/list",talkReportReasonList:k+"report/get/board/descriptionList",blindTalk:k+"report/set/blind",bannerList:k+"banner/get/list",createBanner:k+"banner/create",detailBanner:k+"banner/get/detail/info",updateBanner:k+"banner/update",reorderBanner:k+"banner/set/orders",targetEventList:k+"banner/get/event/list",targetDoitList:k+"banner/get/doit/list",targetNoticeList:k+"banner/get/notice/list",storyList:k+"story/get/list",createStory:k+"story/create",detailStory:k+"story/get/detail/info",updateStory:k+"story/update",reorderStory:k+"story/set/orders",eventList:k+"event/get/list",createEvent:k+"event/create",detailEvent:k+"event/get/detail/info",deleteEvent:k+"event/delete",updateEvent:k+"event/update",customEvent:k+"event/popup/get/list",customEventProfile:k+"event/popup/get/profile",pushList:k+"push/list",cancelPush:k+"push/set/cancel",createPush:k+"push/create",pushTargetNotice:k+"push/get/notice",pushTargetEvent:k+"push/get/event",pushTargetDoit:k+"push/get/doit",pushTargetMember:k+"push/get/profile",pushTargetMemberFromXlsx:k+"excel/import/notification/profile",popupList:k+"popup/get/list",createPopup:k+"popup/create",detailPopup:k+"popup/get/detail/info",updatePopup:k+"popup/update",deletePopup:k+"popup/delete",errorList:k+"error/list",updateError:k+"error/update",createEncryption:k+"operate/set/encryption",createDecryption:k+"operate/set/decryption",versionList:k+"operate/get/version/list",createVersion:k+"operate/version/create",deleteVersion:k+"operate/version/delete",logList:k+"log/get/list",getMemberForSaveUcd:k+"ucd/get/user/list",getMemberFromXlsx:k+"excel/import/profile",getDoitFromXlsx:k+"excel/import/doit",ucdChargeList:k+"ucd/list/get/charge",systemWalletType:k+"ucd/get/system/type",systemWalletList:k+"ucd/list/get/system",doitWalletList:k+"ucd/list/get/doit",memberWalletList:k+"ucd/list/get/user",pendingWalletList:k+"ucd/list/get/transfer",giftList:k+"gift/get/list",reorderGiftList:k+"gift/get/orderList",reorderGift:k+"gift/set/orders",createGift:k+"gift/create",ktGoodsList:k+"gift/get/kt/goods",detailGift:k+"gift/get/detail/info",updateGift:k+"gift/update",applyGiftList:k+"exchange/get/list",sendGifticon:k+"exchange/set/confirm",sendGeneralGift:k+"exchange/set/send",rejectGift:k+"exchange/set/reject",resendGift:k+"exchange/set/resend",getGiftBalance:k+"exchange/get/money",sendGiftList:k+"exchange/get/sendList",sendGiftStatusList:k+"exchange/get/payment",updateGiftSendMemo:k+"exchange/set/insertMemo",adminList:k+"admin/list",detailAdmin:k+"admin/detail",updateAdmin:k+"admin/update",deleteAdmin:k+"admin/delete",authBizList:k+"auth/get/biz/list",approvalAdmin:k+"admin/approval",authList:k+"auth/list",getMenuWithAuth:k+"auth/get/menu",setMenuWithAuth:k+"auth/set/menu",createAuth:k+"auth/create",deleteAuth:k+"auth/delete",promotionList:k+"promotion/get/list",createPromotion:k+"promotion/create",detailPromotion:k+"promotion/get/detail",updatePromotion:k+"promotion/update",closePromotion:k+"promotion/set/end",promotionDoitList:k+"promotion/get/doit/list",promotionProceedList:k+"promotion/get/proceed/list",setDoitPromotion:k+"promotion/set/doit",cancelDoitPromotion:k+"promotion/set/release"},D="https://fileuploader.youcandoo.co.kr/",S={single:D+"single",multi:D+"multi",double:D+"double",event:D+"event",mission:D+"mission"},w="image",C=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function M(e){C.fire({icon:"info",title:e})}function U(e){Swal.fire({icon:"error",html:e})}const A="목록이 없습니다.",x="지원하지 않는 브라우져입니다.";function W(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function P(e){return/^[0-9]*$/g.test(e)}const B="/v2/gift";function I(){d.fadeOut(),c.fadeOut(),$("body").css("overflow-y","auto")}function F(e){if(!function(e){if(e.files[0]){let t=e.files[0].type,a=["image/jpeg","image/png"];return $.inArray(t,a)>=0}}(e)&&e.files[0])M("지원하지 않는 파일 형식입니다."),R(e);else if(function(e){if(e.files[0]){const t=10485760;return e.files[0].size>t}}(e)&&e.files[0])M("10MB 이하의 파일을 선택해주세요."),R(e);else{const t=W($(e).data("compare"))?"":$(e).data("compare"),a=W($(e).data("width"))?0:Number($(e).data("width")),i=W($(e).data("height"))?0:Number($(e).data("height")),n=new Image;e.files[0]?(n.src=window.URL.createObjectURL(e.files[0]),n.onload=function(){const n=`업로드 가능한 이미지 사이즈를 확인해주세요.<br>\n                                         선택한 이미지 사이즈: ${this.width} x ${this.height}<br>\n                                         업로드 가능한 이미지 사이즈: ${a} x ${i}`;"같음"!==t||this.width===a&&this.height===i?"이상"===t&&(this.width<a||this.height<i)||"이하"===t&&(this.width>a||this.height>i)?(U(n),R(e)):function(e,t){window.FileReader?e.files&&e.files[0]?(function(e){const t=e.files[0].name;$(e).siblings(".upload-name").val(t)}(e),t===w&&(E(e),function(e){let t=new FileReader;t.readAsDataURL(e.files[0]),t.onload=function(){const a=`<div class="detail-img-wrap"><img src="${t.result}" alt=""></div>`;$(e).parent().after(a)}}(e))):R(e):M(x)}(e,w):(U(n),R(e))}):R(e)}}function R(e){E(e),$(e).val(null),$(e).siblings(".upload-name").val("파일선택")}function E(e){const t=$(e).parent().siblings(".detail-img-wrap");t.length>0&&t.remove()}function q(){n.DataTable({ajax:{url:L.ktGoodsList,type:"POST",global:!1,headers:h,dataFilter:function(e){let t=JSON.parse(e);return v(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],M(T(t))),JSON.stringify(t)},data:function(e){const a={limit:e.length,page:e.start/e.length+1,keyword:t.val().trim(),search_type:"goods_name"};return JSON.stringify(a)},error:function(e,t){U("목록을(를) 불러올 수 없습니다.")}},columns:[{title:"상품코드",data:"goods_code",width:"25%"},{title:"상품명",data:"goods_name",width:"25%"},{title:"브랜드명",data:"brand_name",width:"20%"},{title:"판매종료일시",data:"end_date",width:"20%"},{title:"이미지",data:"goods_img_b",width:"10%",render:function(e,t,a,i){return`<div class="list-img-wrap"><img src="${e}" alt=""></div>`}}],serverSide:!0,paging:!0,pageLength:5,select:!1,destroy:!0,initComplete:function(){$("img").on("error",(function(){$(this).attr("src","/assets/v2/img/no-image.jpg")}))},fnRowCallback:function(e,t){$(e).attr("data-code",t.goods_code),$(e).attr("data-url",t.goods_img_b),$(e).attr("data-name",`[${t.brand_name}] ${t.goods_name}`),$(e).on("click",(function(){var e;e=this,g.val($(e).data("name")),b.val($(e).data("code")),f.val($(e).data("url")),function(e){R(o),o.parent().siblings(".detail-img-wrap").remove();const t=`<div class="detail-img-wrap"><img src="${e}" alt=""></div>`;o.parent().after(t)}($(e).data("url")),I()}))}})}function N(){let e=new FormData;var t,a;e.append("file",o[0].files[0]),(!0,t=S.single,a=e,new Promise(((e,i)=>{$.ajax({url:t,type:"POST",global:true,processData:!1,contentType:!1,headers:h,dataType:"json",data:a,success:function(t){e(t)},error:function(e,t,a){i(a)},complete:function(e,t){}})}))).then((async function(e,t,a){v(e)?z(e):M(T(e))})).catch((e=>U("이미지 등록 처리 중, 오류가 발생했습니다.")))}function z(e){if(W(e)||v(e)){const i="Y"===$("input[name=radio-manual]:checked").val(),n={gift_name:i?p.val().trim():g.val().trim(),gift_ucd:m.val().trim(),is_exposure:$("input[name=radio-exposure]:checked").val()};W(e)||(n.gift_image_url=e.image_urls.file),i||(n.goods_code=b.val().trim(),n.kt_gift_image_url=f.val().trim()),(!0,t=L.createGift,a=JSON.stringify(n),new Promise(((e,i)=>{$.ajax({global:true,url:t,type:"POST",headers:h,contentType:"text/plain",dataType:"json",data:a,success:function(t){e(t)},error:function(e,t,a){i(a)},complete:function(e,t){}})}))).then((async function(e,t,a){await function(e,t){Swal.fire({toast:!0,position:"center",icon:v(e)?"success":"error",title:y(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&v(e)&&t()}))}(e,_)})).catch((e=>U("상세 내용을(를) 불러올 수 없습니다.")))}else M(e.msg);var t,a}function _(){location.href=B}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:A,zeroRecords:A,processing:"검색 중..",paginate:{previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>'}}}),s.on("click",(function(){d.fadeIn(),c.fadeIn(),$("body").css("overflow-y","hidden"),t.val(""),q()})),l.on("click",(function(){I()})),c.on("click",(function(){I()})),m.on("propertychange change keyup paste input",(function(){!function(e){let t=$(e).val().split(""),a=t.length,i="";for(let e=0;e<a;e++)0!=t[0]&&P(t[0])||(t[0]=""),P(t[e])&&(i+=t[e]);$(e).val(i)}(this)})),r.on("propertychange change keyup paste input",(function(){!function(e){let t=$(e).val().length,a=$(e).prop("maxLength");t>a&&a>0&&($(e).val($(e).val().slice(0,a)),t=a),$(e).next().find(".count-input").text(t)}(this)})),o.on("change",(function(){F(this)})),u.on("change",(function(){"Y"===$(this).val()?(p.parent().show(),g.parent().hide(),p.trigger("focus")):(g.parent().show(),p.parent().hide()),R(o),p.val(""),g.val(""),b.val(""),f.val("")})),a.on("click",(function(){q()})),i.on("click",(function(){!function(){if(function(){const e="Y"===$("input[name=radio-manual]:checked").val();if(e&&W(p.val()))return M("상품명은 필수항목입니다."),p.trigger("focus"),!1;if(!e&&W(g.val()))return M("상품명은 필수항목입니다."),g.trigger("focus"),!1;if(W(m.val()))return M("금액은 필수항목입니다."),m.trigger("focus"),!1;const t=o[0].files;return!e||0!==t.length||(M("상품 이미지는 필수항목입니다."),!1)}()){const t=0===o[0].files.length?z:N;"등록하시겠습니까?",e=t,Swal.fire({text:"등록하시겠습니까?",showCancelButton:!0,confirmButtonText:"확인",cancelButtonText:"취소"}).then((t=>{t.value&&e()}))}var e}()}))}))})();