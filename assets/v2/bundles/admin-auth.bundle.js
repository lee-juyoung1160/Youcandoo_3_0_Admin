(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker"),$(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword"),$("#btnSearch"),$("#btnReset"),$("#btnSubmit")),a=($("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable"),$("#dataTable_paginate"),$("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input")),n=($(".only-num"),$(".modal-btn")),i=$(".modal-close"),o=$(".modal-content"),r=$(".modal-bg"),s=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$(".btn-join-members"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$(".ban-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#selBlockMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBlockMembers"),$("#blockMemberForm"),$("#btnBan"),$("#btnSubmitBan"),$("#btnCancelBlock"),$("#blockMemberTable"),$("#modalBan"),$("input[name=chk-block]"),$("#banReasonWrap"),$("input[name=radio-reason]"),$("#banReason"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#report"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-report]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-report]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap")),l=$("#authCode"),c=$("#authName"),d=$("#btnSubmitAuth"),m=$("#menuWrap");function p(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#keywordWrap"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),$("#dateFromSummary"),$("#dateToSummary"),$("#dateFromSummaryList"),$("#dateToSummaryList"),$("#btnRefreshMission"),$("#btnRefreshCategory");const u="등록하시겠습니까?",b={Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))};function g(e,t,a){return new Promise(((n,i)=>{$.ajax({global:e,url:t,type:"POST",headers:b,contentType:"text/plain",dataType:"json",data:a,success:function(e){n(e)},error:function(e,t,a){i(a)},complete:function(e,t){}})}))}function h(e){let t=e.msg,a=e.status;return[30034,30035,30308].indexOf(a)>-1&&(t=`선택한 이미지 사이즈는 ${e.data.width} x ${e.data.height} 입니다.\n                 ${e.msg}`),t}function f(e){return 0===function(e){return e.status}(e)}function y(e){return e.msg}const k=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function T(e){k.fire({icon:"info",title:e})}function v(e,t){Swal.fire({toast:!0,position:"center",icon:f(e)?"success":"error",title:h(e),showConfirmButton:!1,timer:1500}).then((a=>{a.isDismissed&&f(e)&&t()}))}function L(e){Swal.fire({icon:"error",html:e})}function D(e,t){Swal.fire({text:e,showCancelButton:!0,confirmButtonText:"확인",cancelButtonText:"취소"}).then((e=>{e.value&&t()}))}function S(){o.fadeOut(),r.fadeOut(),$("body").css("overflow-y","auto")}const C=`${api_server_url}/v3/`,w={saveUserUcdFromXlsx:C+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:C+"ucd/set/charge/user/system",saveUserUcdByBiz:C+"ucd/set/charge/user/company",saveDoitUcdBySystem:C+"ucd/set/charge/doit/system",saveDoitUcdByBiz:C+"ucd/set/charge/doit/company",saveBizUcd:C+"ucd/set/charge/company/system",dashboardSummary:C+"main/dashboard",dashboardSummaryList:C+"main/dashboard/get/list",dashboardMoreLeader:C+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:C+"main/dashboard/get/doitRanklist",getProfile:C+"admin/get",updatePassword:C+"admin/update/pwd",memberList:C+"profile/get/list",detailMember:C+"profile/get/detail/info",levelUp:C+"profile/set/levelUp",levelDown:C+"profile/set/levelDown",cancelPartner:C+"profile/set/releasePartner",levelInfo:C+"profile/get/level",levelHistory:C+"profile/get/level/history",deviceInfo:C+"profile/get/device/info",memberDoitList:C+"profile/get/doit",memberCategoryList:C+"profile/get/category",memberActionList:C+"profile/get/action",memberActionDetail:C+"profile/get/detail/action",countPerLevel:C+"level/get/count",memberLevelList:C+"level/get/list",unlinkMemberList:C+"profile/get/unlink",changedMemberList:C+"profile/get/changed",badgeList:C+"badge/get/list",createBadge:C+"badge/create",detailBadge:C+"badge/get/detail/info",deleteBadge:C+"badge/delete",updateBadge:C+"badge/update",categoryList:C+"category/list",createCategory:C+"category/create",detailCategory:C+"category/detail",reorderCategory:C+"category/update/sequence",deleteCategory:C+"category/delete",updateCategory:C+"category/update",subCategoryList:C+"subcategory/list",createSubCategory:C+"subcategory/create",updateSubCategoryDoitImg:C+"subcategory/set/doit/image",deleteSubCategory:C+"subcategory/delete",reorderSubCategory:C+"subcategory/update/sequence",editSubCategory:C+"subcategory/update",keywordList:C+"keyword/get/list",createKeyword:C+"keyword/create",updateKeyword:C+"keyword/update",doitSponsorList:C+"doit/get/company",doitList:C+"doit/list",doitSetRecommend:C+"doit/set/recommend",createDoit:C+"doit/create",createDoitCategoryList:C+"category/exposure/list",detailDoit:C+"doit/detail",updateDoit:C+"doit/update",deleteDoit:C+"doit/delete",openDoit:C+"doit/set/open",stopDoit:C+"doit/set/stop",getDoitUcd:C+"ucd/get/doit",getUcdDoitList:C+"ucd/get/doit/list",missionList:C+"mission/get/list",createMission:C+"mission/create",detailMission:C+"mission/get/detail/info",updateMission:C+"mission/update",deleteMission:C+"mission/delete",joinMemberList:C+"member/get/list",infoJoinMember:C+"member/get/profile",rewardMemberList:C+"ucd/get/reward/profile",createReward:C+"ucd/set/reward/profile",countMember:C+"member/get/count",blockMember:C+"member/set/retire/ban",banMember:C+"member/set/retire",applyMemberList:C+"member/get/applylist",approvalMember:C+"member/get/applyConfirm",rejectMember:C+"member/get/applyReject",blockMemberList:C+"member/get/retire/ban/list",cancelBlockMember:C+"member/set/retire/ban/cancel",actionList:C+"action/get/list",detailAction:C+"action/get/detail/info",sendWarning:C+"action/set/yellow",cancelWarning:C+"action/set/yellowCancel",actionCommentList:C+"action/get/commentList",createActionComment:C+"action/set/insertComment",deleteActionComment:C+"action/set/deleteComment",actionReplyList:C+"action/get/comment/child/list",talkList:C+"board/get/list",createTalk:C+"board/create",detailTalk:C+"board/get/detail/info",updateTalk:C+"board/update",deleteTalk:C+"board/delete",talkCommentList:C+"board/get/commentList",createTalkComment:C+"board/set/insertComment",deleteTalkComment:C+"board/set/deleteComment",talkReplyList:C+"board/get/comment/child/list",pickList:C+"recommend/list",previewList:C+"recommend/get/doit",searchDoitList:C+"recommend/get/doit/list",reorderPick:C+"recommend/set",createPick:C+"recommend/create",updatePick:C+"recommend/update",detailPick:C+"recommend/detail",bizList:C+"biz/get/list",createBiz:C+"biz/create",detailBiz:C+"biz/get/detail/info",bizDoitList:C+"biz/get/detail/doit",bizUcdList:C+"ucd/list/get/company",updateBiz:C+"biz/update",getBizUcd:C+"ucd/get/company",noticeList:C+"notice/get/list",createNotice:C+"notice/create",detailNotice:C+"notice/get/detail/info",updateNotice:C+"notice/update",deleteNotice:C+"notice/delete",faqType:C+"faq/get/type",faqList:C+"faq/get/list",createFaq:C+"faq/create",detailFaq:C+"faq/get/detail/info",updateFaq:C+"faq/update",deleteFaq:C+"faq/delete",reorderFaq:C+"faq/set/orders",inquiryList:C+"qna/get/list",updateInquiry:C+"qna/set/insertComment",detailInquiry:C+"qna/get/detail/info",deleteInquiry:C+"qna/delete",reportActionList:C+"report/get/action/list",actionReportReasonList:C+"report/get/action/descriptionList",reportTalkList:C+"report/get/board/list",talkReportReasonList:C+"report/get/board/descriptionList",blindTalk:C+"report/set/blind",bannerList:C+"banner/get/list",createBanner:C+"banner/create",detailBanner:C+"banner/get/detail/info",updateBanner:C+"banner/update",reorderBanner:C+"banner/set/orders",targetEventList:C+"banner/get/event/list",targetDoitList:C+"banner/get/doit/list",targetNoticeList:C+"banner/get/notice/list",storyList:C+"story/get/list",createStory:C+"story/create",detailStory:C+"story/get/detail/info",updateStory:C+"story/update",reorderStory:C+"story/set/orders",eventList:C+"event/get/list",createEvent:C+"event/create",detailEvent:C+"event/get/detail/info",deleteEvent:C+"event/delete",updateEvent:C+"event/update",customEvent:C+"event/popup/get/list",customEventProfile:C+"event/popup/get/profile",pushList:C+"push/list",cancelPush:C+"push/set/cancel",createPush:C+"push/create",pushTargetNotice:C+"push/get/notice",pushTargetEvent:C+"push/get/event",pushTargetDoit:C+"push/get/doit",pushTargetMember:C+"push/get/profile",pushTargetMemberFromXlsx:C+"excel/import/notification/profile",popupList:C+"popup/get/list",createPopup:C+"popup/create",detailPopup:C+"popup/get/detail/info",updatePopup:C+"popup/update",deletePopup:C+"popup/delete",errorList:C+"error/list",updateError:C+"error/update",createEncryption:C+"operate/set/encryption",createDecryption:C+"operate/set/decryption",versionList:C+"operate/get/version/list",createVersion:C+"operate/version/create",deleteVersion:C+"operate/version/delete",logList:C+"log/get/list",getMemberForSaveUcd:C+"ucd/get/user/list",getMemberFromXlsx:C+"excel/import/profile",getDoitFromXlsx:C+"excel/import/doit",ucdChargeList:C+"ucd/list/get/charge",systemWalletType:C+"ucd/get/system/type",systemWalletList:C+"ucd/list/get/system",doitWalletList:C+"ucd/list/get/doit",memberWalletList:C+"ucd/list/get/user",pendingWalletList:C+"ucd/list/get/transfer",giftList:C+"gift/get/list",reorderGiftList:C+"gift/get/orderList",reorderGift:C+"gift/set/orders",createGift:C+"gift/create",ktGoodsList:C+"gift/get/kt/goods",detailGift:C+"gift/get/detail/info",updateGift:C+"gift/update",applyGiftList:C+"exchange/get/list",sendGifticon:C+"exchange/set/confirm",sendGeneralGift:C+"exchange/set/send",rejectGift:C+"exchange/set/reject",resendGift:C+"exchange/set/resend",getGiftBalance:C+"exchange/get/money",sendGiftList:C+"exchange/get/sendList",sendGiftStatusList:C+"exchange/get/payment",updateGiftSendMemo:C+"exchange/set/insertMemo",adminList:C+"admin/list",detailAdmin:C+"admin/detail",updateAdmin:C+"admin/update",deleteAdmin:C+"admin/delete",authBizList:C+"auth/get/biz/list",approvalAdmin:C+"admin/approval",authList:C+"auth/list",getMenuWithAuth:C+"auth/get/menu",setMenuWithAuth:C+"auth/set/menu",createAuth:C+"auth/create",deleteAuth:C+"auth/delete",promotionList:C+"promotion/get/list",createPromotion:C+"promotion/create",detailPromotion:C+"promotion/get/detail",updatePromotion:C+"promotion/update",closePromotion:C+"promotion/set/end",promotionDoitList:C+"promotion/get/doit/list",promotionProceedList:C+"promotion/get/proceed/list",setDoitPromotion:C+"promotion/set/doit",cancelDoitPromotion:C+"promotion/set/release"};function M(){g(!1,w.authList,null).then((async function(e,t,a){f(e)?(await function(e){s.empty(),!p(e.data)&&e.data.length>0&&(e.data.map(((e,t)=>{const{code:a,name:n}=e,i=`<tr class="name-row ${0===t?"selected":""}" data-code="${a}">\n                        <td><a class="auth-name">${n}</a></td>\n                        <td>\n                            <button type="button" class="btn-xs btn-text-red btn-delete-auth" data-code="${a}">\n                                <i class="fas fa-minus-circle"></i>\n                            </button>\n                        </td>\n                    </tr>`;s.append(i)})),$(".auth-name").on("click",(function(){$(".name-row").removeClass("selected"),$(this).closest(".name-row").addClass("selected"),A()})),$(".btn-delete-auth").on("click",(function(){P=$(this).data("code"),D("삭제하시겠습니까?",B)})))}(e),await A()):T(y(e))})).catch((e=>L("권한목록을을(를) 불러올 수 없습니다.")))}function A(){const e={code:I()};g(!0,w.getMenuWithAuth,JSON.stringify(e)).then((async function(e,t,a){f(e)?function(e){if(m.find("tr").remove(),e.data){const t=e.data,a=Object.getOwnPropertyNames(t);!p(a)&&a.length>0&&(a.map(((e,a)=>{const{name:n,view:i,children:o}=t[e],r=Object.getOwnPropertyNames(o);let s="";!p(r)&&r.length>0&&r.map((t=>{s+=`<div class="checkbox-wrap">\n                                    <input id="${t}_${a}" data-key="${t}" type="checkbox" name="${e}" class="chk-sub-menu" ${o[t].view?"checked":""}>\n                                    <label for="${t}_${a}"><span></span>${o[t].name}</label>\n                                </div>`}));const l=`<tr>\n                            <th>\n                                <div class="checkbox-wrap">\n                                    <input id="${e}" data-key="${e}" type="checkbox" name="${e}" class="chk-main-menu" ${i?"checked":""}>\n                                    <label for="${e}"><span></span>${n}</label>\n                                </div>\n                            </th>\n                            <td>\n                                ${s}\n                            </td>\n                        </tr>`;m.append(l)})),$(".chk-main-menu").on("change",(function(){!function(e){const t=$(e).attr("name"),a=$(e).is(":checked");$(`input[name=${t}]`).prop("checked",a)}(this)})),$(".chk-sub-menu").on("change",(function(){!function(e){const t=$(e).attr("name"),a=$(`input[name=${t}].chk-main-menu`),n=$(`input[name=${t}].chk-sub-menu:checked`);a.prop("checked",n.length>0)}(this)})))}}(e):T(y(e))})).catch((e=>L("메뉴 목록을을(를) 불러올 수 없습니다.")))}function U(){let e={};$(".chk-main-menu").each((function(){const t=$(`input[name=${this.name}].chk-sub-menu`);let a={};t.each((function(){a[$(this).data("key")]={view:$(this).is(":checked")}})),e[$(this).data("key")]={view:$(this).is(":checked"),children:a}}));const t={code:I(),menu:e};g(!0,w.setMenuWithAuth,JSON.stringify(t)).then((async function(e,t,a){await v(e,A)})).catch((e=>L("메뉴 목록을을(를) 불러올 수 없습니다.")))}function W(){const e={name:c.val().trim(),code:l.val().trim()};g(!0,w.createAuth,JSON.stringify(e)).then((async function(e,t,a){await v(e,x)})).catch((e=>L("권한 목록을을(를) 불러올 수 없습니다.")))}function x(){S(),M()}let P;function B(){const e={code:P};g(!0,w.deleteAuth,JSON.stringify(e)).then((async function(e,t,a){await v(e,M)})).catch((e=>L("삭제 처리 중, 오류가 발생했습니다.")))}function I(){return $(".name-row.selected").data("code")}$((()=>{M(),a.on("propertychange change keyup paste input",(function(){!function(e){let t=$(e).val().length,a=$(e).prop("maxLength");t>a&&a>0&&($(e).val($(e).val().slice(0,a)),t=a),$(e).next().find(".count-input").text(t)}(this)})),n.on("click",(function(){o.fadeIn(),r.fadeIn(),$("body").css("overflow-y","hidden"),l.trigger("focus"),l.val(""),c.val("")})),i.on("click",(function(){S()})),r.on("click",(function(){S()})),d.on("click",(function(){(p(l.val())?(T("권한 코드는 필수항목입니다."),l.trigger("focus"),0):!p(c.val())||(T("권한명은 필수항목입니다."),c.trigger("focus"),0))&&D(u,W)})),t.on("click",(function(){D(u,U)}))}))})();