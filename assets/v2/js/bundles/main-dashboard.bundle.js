(()=>{"use strict";$("body"),$("section"),$(".search-wrap select"),$("img"),$(".side-toggle-btn"),$("aside.main-menu"),$("#mainMenu");const e=$("#sessionUserid"),t=($("#sessionUserIp"),$("#sessionAuthCode"),$("#sessionDeptName"),$("#sessionBizIdx"),$("#env"),$("#loader"),$("#btnScrollTop"),$("#btnXlsxImport"),$("#btnXlsxExport"),$(".date-btn .btn"),$(".datepicker")),a=($(".date-from"),$(".date-to"),$("#selDateType"),$("#selSearchType"),$("input[name=chk-type]"),$("input[name=chk-status]"),$("input[name=radio-type]"),$("input[name=radio-status]"),$("#keyword"),$("#btnSearch"),$("#btnReset"),$("#btnSubmit"),$("#btnCancel"),$("#btnClose"),$("#btnCreate"),$("#btnUpdate"),$("#btnSubmitUpdate"),$("#btnDelete"),$("#btnAdd"),$("#btnList"),$("#btnBack"),$("#checkTypeWrap"),$("#selPageLength"),$("#selSort"),$("#dataTable"),$("#dataTable_paginate")),n=($("#totalCount"),$("#thumbnail"),$("#amount"),$("#nickname"),$("#memo"),$("#title"),$("#content"),$("#contentImage"),$("#reserveDate"),$("input[name=radio-os-type]"),$("#osType"),$("#version"),$("#isExposure"),$("input[name=radio-exposure]"),$("#exposureDate"),$("#link"),$("#deviceInfo"),$(".length-input"),$(".only-num"),$(".modal-btn"),$(".modal-close")),i=$(".modal-content"),o=$(".modal-bg"),r=($("#modalDetail"),$("#modalUpdate"),$("#modalCreate"),$("#modalImage"),$("#userid"),$("#password"),$("#passwordCheck"),$("#passwordCheckTxt"),$("#useremail"),$("#username"),$("#imgUrl"),$("#qrImg"),$("#otpNum"),$("#secret"),$("#type"),$("#btnLogin"),$("#btnJoin"),$("#btnSignIn"),$("#updateTable"),$("#categoryTitle"),$("#categoryIcon"),$("#isEstablish"),$("input[name=create-attachment]"),$("input[name=attachment]"),$(".icon-delete-attach"),$("#subCategoryTitle"),$("#modalSubcategory"),$("#modalDoitImage"),$("#modalDoitImageTitle"),$("#btnSubmitImage"),$("#doitUuid"),$("#sponsor"),$(".doit-sponsor"),$("#sponsorUuid"),$("#selCategory"),$("#selSubcategory"),$("#doitTitle"),$("#doitKeyword"),$("#infoMaxUserCount"),$("#maxUserCount"),$("#doitDesc"),$("input[name=radio-public-type]"),$("input[name=chk-is-apply]"),$("input[name=chk-is-answer]"),$("input[name=chk-is-question]"),$("#doitQuestion"),$("#doitImage"),$("#doitKeywords"),$("#btnDoitOpen"),$("#btnDoitDelete"),$("#btnDoitStop"),$("#promotionInfo"),$("#modalPromotion"),$("#promotionTable"),$("#btnPromotion"),$("#btnPromotionCancel"),$("#tabUl"),$(".tab-contents"),$("#category"),$("#publicType"),$("#isApply"),$("#isAnswer"),$("#doitInfoForm"),$("#doitUpdateForm"),$("#infoDoitTitle"),$("#infoDoitDesc"),$("#infoDoitKeywords"),$("#infoQuestion"),$(".doit-image"),$("#btnAddKeyword"),$("#btnSubmitUpdateDoit"),$("#btnUpdateDoit"),$(".btn-doit-list"),$(".btn-mission-list"),$("#btnBackToMissionDetail"),$("#btnCreateMission"),$("#btnSubmitMission"),$("#btnUpdateMission"),$("#btnSubmitUpdateMission"),$("#btnDeleteMission"),$("#missionListForm"),$("#missionDetailForm"),$("#missionCreateForm"),$("#missionUpdateForm"),$("#missionTable"),$("#missionTitle"),$("#missionStartDate"),$("#missionEndDate"),$("input[name=chk-permanent]"),$("#missionStartTime"),$("#missionEndTime"),$("input[name=radio-action-type]"),$("#actionExampleWrap"),$("input[name=chk-gallery-allowed]"),$("#actionExampleDesc"),$("#promise"),$("#updateMissionTitle"),$("#updateMissionStartDate"),$("#updateMissionEndDate"),$("input[name=chk-update-permanent]"),$("#updateMissionStartTime"),$("#updateMissionEndTime"),$("input[name=radio-update-action-type]"),$("input[name=chk-update-gallery-allowed]"),$("#updateExampleWrap"),$("#updateActionExampleDesc"),$("#updatePromise"),$("#infoMissionTitle"),$("#infoMissionDate"),$("#infoMissionTime"),$("#infoActionType"),$("#infoActionExampleWrap"),$("#infoActionExampleDesc"),$("#infoPromise"),$("#joinMemberForm"),$("#pendingMemberForm"),$("#btnJoinMembers"),$("#btnPendingMembers"),$("#applyMemberCountWrap"),$("#totalMemberCount"),$(".apply-member-count"),$("#selMissions"),$("#selMemberFilter"),$("input[name=radio-action-count]"),$("#actionCount"),$("#selJoinMemberPageLength"),$("#selApplyMemberPageLength"),$("#btnSaveUcd"),$("#btnSendNotice"),$("#applyQuestion"),$("#joinMemberTable"),$("#btnApproval"),$("#btnReject"),$("#applyMemberTable"),$("#modalSaveUcd"),$("#saveUcdContent"),$("#selRewardType"),$("#rewardKeyword"),$("#rewardTableWrap"),$("#rewardMemberTable"),$("#actionTimes"),$("#btnSubmitSaveUcd"),$("#modalSendNotice"),$("#notiContent"),$("#selNotiType"),$("#notiKeyword"),$("#notiTableWrap"),$("#notiTable"),$("#btnSubmitNoti"),$("#modalMemberInfo"),$("#modalMemberInfoNickname"),$("#modalMemberInfoJoinDate"),$("#modalMemberInfoQuestion"),$("#modalMemberInfoAnswer"),$("#btnBan"),$("#ucdListForm"),$("#publicWalletBalance"),$("#btnSaveUcdWallet"),$("#searchUcdDateFrom"),$("#searchUcdDateTo"),$("#ucdKeyword"),$("#btnSearchUcd"),$("#btnResetSearchUcd"),$("#selUcdPageLength"),$("#modalSaveUcdWallet"),$("#saveWalletAmount"),$("#saveWalletDesc"),$("#btnSubmitSaveDoitUcd"),$("#btnBackActionList"),$("#actionListForm"),$("#totalActionCount"),$("#selActionPageLength"),$("#selActionDateType"),$("#searchActionDateFrom"),$("#searchActionDateTo"),$("#selActionMissions"),$("input[name=chk-action-status]"),$("#btnSearchAction"),$("#btnResetSearchAction"),$("#btnPullAction"),$("#btnSendWarnings"),$("#btnSendWarning"),$("#actionDetailForm"),$("#actionNickname"),$("#actionCreated"),$("#actionLikeCount"),$("#actionCommentCount"),$("#actionContentWrap"),$("#actionDesc"),$("#warningReason"),$("#actionCommentWrap"),$("#createCommentWrap"),$("#commentAction"),$("#btnSubmitCommentAction"),$("#selReason"),$("#btnSubmitSendWarning"),$("#btnCreateTalk"),$("#modalCreateTalk"),$("#talk"),$("input[name=radio-attach-type]"),$("#talkAttachmentWrap"),$("input[name=chk-notice-talk]"),$("#btnSubmitTalk"),$("#talkListForm"),$("#talkDetailForm"),$("#talkUpdateForm"),$("#searchTalkDateFrom"),$("#searchTalkDateTo"),$("#selTalkDateType"),$("#selTalkPageLength"),$("#btnSearchTalk"),$("#btnResetSearchTalk"),$("#talkTable"),$("#btnBackToTalkList"),$("#btnBackToTalkDetail"),$("#btnBlindTalk"),$("#btnDisplayTalk"),$("#btnDeleteTalk"),$("#btnUpdateTalk"),$("#infoTalkNickname"),$("#infoTalkIsBlind"),$("#infoTalkCreated"),$("#infoTalkLikeCount"),$("#infoTalkCommentCount"),$("#infoTalkContent"),$("#infoTalkAttachWrap"),$("#talkCommentWrap"),$("#createTalkCommentWrap"),$("#commentTalk"),$("#btnSubmitCommentTalk"),$("#updateTalk"),$("input[name=radio-update-attach-type]"),$("#updateTalkAttachWrap"),$("input[name=chk-update-notice-talk]"),$("#btnSubmitUpdateTalk"),$("#modalAttach"),$("#modalAttachContentWrap"),$("#doitTable"),$("#ucdTable"),$("#selPageLengthDoit"),$("#selPageLengthUcd"),$("#bizNo"),$("#bizWeb"),$("#description"),$("#btnSupportDoit"),$("#btnSupportLeader"),$("#targetUrl"),$("#targetPageType"),$("#targetUuid"),$("#historyTable"),$("#previewTitle"),$("#previewTable"),$("#curationTitle"),$("#noticeTitle"),$("#contentImageWrap"),$("#isTop"),$("#selFaqType"),$("#faqType"),$("#faqTitle"),$("#selInquiryType"),$("#inquiryTitle"),$("#attachmentWrap"),$("#answerEl"),$("#memoEl"),$("#admin"),$("#answerDate"),$("#actionsWrap"),$("#modalWarning"),$("#modalReason"),$("#reasonTable"),$("input[name=radio-report]"),$("#isBlind"),$("#talkCreated"),$("#likeCount"),$("#commentCount"),$("#talkAttachWrap"),$("input[name=radio-reserve-type]"),$("#reserveTime"),$("input[name=radio-target-page-type]"),$("#targetPage"),$("input[name=radio-receive-type]"),$("input[name=radio-category]"),$("input[name=radio-icon-type]"),$("input[name=radio-target-member-type]"),$("#modalTargetPage"),$("#modalTargetMember"),$("#btnModalTargetMemberOpen"),$("#memberTable"),$("#popupTitle"),$("#versionDigit"),$("#versionDecimal"),$("input[name=radio-view-option]"),$("#startTime"),$("#endTime"),$("#viewOption"),$("#selEventType"),$("#eventType"),$("#eventTitle"),$("#eventNotice"),$("#eventDate"),$("#thumbnailImage"),$("#eventContentThumbnail"),$("#eventThumbnail"),$("#price"),$("#selHour"),$("#selMinute"),$("#btnSendGeneral"),$("#btnSendGift"),$("#modalGift"),$("#modalGeneral"),$("#generalMemo"),$("#btnSubmitGift"),$("#btnSubmitGeneral"),$("#giftUuid"),$("#giftName"),$("#totalUcd"),$("#btnSubmitMemo"),$("input[name=radio-manual]"),$("#selectGiftName"),$("#goodsCode"),$("#ktImageUrl"),$("#discontinuedDate"),$("#giftType"),$("#modalDetailContent"),$("#modalCancel"),$("#selAuthType"),$("#selBiz"),$("#auth"),$("#name"),$("#isApproval"),$("#bizName"),$("#authWrap"),$("#authCode"),$("#authName"),$("#btnSubmitAuth"),$("#menuWrap"),$("#isStore"),$("#hiddenProfileId"),$("#profileId"),$("#userNickname"),$("#contact"),$("#balance"),$("#isAuth"),$("#levelInfoWrap"),$("#levelHistoryWrap"),$("#ulLevelTab"),$("#userLevel"),$("#openedDoitCount"),$("#openedDoitAction"),$("#levelTable"),$("#btnLevelWrap"),$("#btnModalUcd"),$("#modalUcd"),$("#deviceInfoTableBody"),$("#openedDoitWrap"),$("#openedDoitTable"),$("#joinedDoitWrap"),$("#joinedDoitTable"),$("#categoryWrap"),$("#ucdInfoTable"),$("#ulDoitTab"),$("#modalActionDetail"),$("#modalActionContentWrap"),$("#modalActionDesc"),$("#modalActionWarningReason"),$("#modalActionExampleWrap"),$("#modalActionExampleDesc"),$("#countLevel1"),$("#countLevel2"),$("#countLevel3"),$("#countLevel4"),$("#countLevel5"),$("#countLevel6"),$("#modalLevelUp"),$("#levelUpReason"),$("#selType"),$("#qualification"),$("#difficulty"),$("input[name=radio-open]"),$("#badgeTitle"),$("#badgeType"),$("#isOpen"),$("#popupImage"),$("#popupThumbnail"),$("#lottieType"),$("#inputString"),$("#resultString"),$("#btnEncryption"),$("#btnDecryption"),$("#promotionDate"),$("#createDate"),$("#promotionStatus"),{Authorization:btoa(JSON.stringify({authorization:"9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7",userid:e.val()}))});function s(e,t,a){return new Promise(((n,i)=>{$.ajax({global:e,url:t,type:"POST",headers:r,contentType:"text/plain",dataType:"json",data:a,success:function(e){n(e)},error:function(e,t,a){i(a)},complete:function(e,t){}})}))}function l(e){return 0===function(e){return e.status}(e)}function d(e){return e.msg}const c=`${api_server_url}/v3/`,p={saveUserUcdFromXlsx:c+"ucd/set/charge/user/system/excel",saveUserUcdBySystem:c+"ucd/set/charge/user/system",saveUserUcdByBiz:c+"ucd/set/charge/user/company",saveDoitUcdBySystem:c+"ucd/set/charge/doit/system",saveDoitUcdByBiz:c+"ucd/set/charge/doit/company",saveBizUcd:c+"ucd/set/charge/company/system",dashboardSummary:c+"main/dashboard",dashboardSummaryList:c+"main/dashboard/get/list",dashboardMoreLeader:c+"main/dashboard/get/leaderRanklist",dashboardMoreDoit:c+"main/dashboard/get/doitRanklist",getProfile:c+"admin/get",updatePassword:c+"admin/update/pwd",memberList:c+"profile/get/list",detailMember:c+"profile/get/detail/info",levelUp:c+"profile/set/levelUp",levelDown:c+"profile/set/levelDown",cancelPartner:c+"profile/set/releasePartner",levelInfo:c+"profile/get/level",levelHistory:c+"profile/get/level/history",deviceInfo:c+"profile/get/device/info",memberDoitList:c+"profile/get/doit",memberCategoryList:c+"profile/get/category",memberActionList:c+"profile/get/action",memberActionDetail:c+"profile/get/detail/action",countPerLevel:c+"level/get/count",memberLevelList:c+"level/get/list",unlinkMemberList:c+"profile/get/unlink",changedMemberList:c+"profile/get/changed",badgeList:c+"badge/get/list",createBadge:c+"badge/create",detailBadge:c+"badge/get/detail/info",deleteBadge:c+"badge/delete",updateBadge:c+"badge/update",categoryList:c+"category/list",createCategory:c+"category/create",detailCategory:c+"category/detail",reorderCategory:c+"category/update/sequence",deleteCategory:c+"category/delete",updateCategory:c+"category/update",subCategoryList:c+"subcategory/list",createSubCategory:c+"subcategory/create",updateSubCategoryDoitImg:c+"subcategory/set/doit/image",deleteSubCategory:c+"subcategory/delete",reorderSubCategory:c+"subcategory/update/sequence",editSubCategory:c+"subcategory/update",keywordList:c+"keyword/get/list",createKeyword:c+"keyword/create",updateKeyword:c+"keyword/update",doitSponsorList:c+"doit/get/company",doitList:c+"doit/list",doitSetRecommend:c+"doit/set/recommend",createDoit:c+"doit/create",createDoitCategoryList:c+"category/exposure/list",detailDoit:c+"doit/detail",updateDoit:c+"doit/update",deleteDoit:c+"doit/delete",openDoit:c+"doit/set/open",stopDoit:c+"doit/set/stop",getDoitUcd:c+"ucd/get/doit",getUcdDoitList:c+"ucd/get/doit/list",missionList:c+"mission/get/list",createMission:c+"mission/create",detailMission:c+"mission/get/detail/info",updateMission:c+"mission/update",deleteMission:c+"mission/delete",joinMemberList:c+"member/get/list",infoJoinMember:c+"member/get/profile",rewardMemberList:c+"ucd/get/reward/profile",createReward:c+"ucd/set/reward/profile",countMember:c+"member/get/count",banMember:c+"member/set/retire",applyMemberList:c+"member/get/applylist",approvalMember:c+"member/get/applyConfirm",rejectMember:c+"member/get/applyReject",actionList:c+"action/get/list",detailAction:c+"action/get/detail/info",sendWarning:c+"action/set/yellow",cancelWarning:c+"action/set/yellowCancel",actionCommentList:c+"action/get/commentList",createActionComment:c+"action/set/insertComment",deleteActionComment:c+"action/set/deleteComment",actionReplyList:c+"action/get/comment/child/list",talkList:c+"board/get/list",createTalk:c+"board/create",detailTalk:c+"board/get/detail/info",updateTalk:c+"board/update",deleteTalk:c+"board/delete",talkCommentList:c+"board/get/commentList",createTalkComment:c+"board/set/insertComment",deleteTalkComment:c+"board/set/deleteComment",talkReplyList:c+"board/get/comment/child/list",pickList:c+"recommend/list",previewList:c+"recommend/get/doit",searchDoitList:c+"recommend/get/doit/list",reorderPick:c+"recommend/set",createPick:c+"recommend/create",updatePick:c+"recommend/update",detailPick:c+"recommend/detail",bizList:c+"biz/get/list",createBiz:c+"biz/create",detailBiz:c+"biz/get/detail/info",bizDoitList:c+"biz/get/detail/doit",bizUcdList:c+"ucd/list/get/company",updateBiz:c+"biz/update",getBizUcd:c+"ucd/get/company",noticeList:c+"notice/get/list",createNotice:c+"notice/create",detailNotice:c+"notice/get/detail/info",updateNotice:c+"notice/update",deleteNotice:c+"notice/delete",faqType:c+"faq/get/type",faqList:c+"faq/get/list",createFaq:c+"faq/create",detailFaq:c+"faq/get/detail/info",updateFaq:c+"faq/update",deleteFaq:c+"faq/delete",reorderFaq:c+"faq/set/orders",inquiryList:c+"qna/get/list",updateInquiry:c+"qna/set/insertComment",detailInquiry:c+"qna/get/detail/info",reportActionList:c+"report/get/action/list",actionReportReasonList:c+"report/get/action/descriptionList",reportTalkList:c+"report/get/board/list",talkReportReasonList:c+"report/get/board/descriptionList",blindTalk:c+"report/set/blind",bannerList:c+"banner/get/list",createBanner:c+"banner/create",detailBanner:c+"banner/get/detail/info",updateBanner:c+"banner/update",reorderBanner:c+"banner/set/orders",targetEventList:c+"banner/get/event/list",targetDoitList:c+"banner/get/doit/list",targetNoticeList:c+"banner/get/notice/list",storyList:c+"story/get/list",createStory:c+"story/create",detailStory:c+"story/get/detail/info",updateStory:c+"story/update",reorderStory:c+"story/set/orders",eventList:c+"event/get/list",createEvent:c+"event/create",detailEvent:c+"event/get/detail/info",deleteEvent:c+"event/delete",updateEvent:c+"event/update",customEvent:c+"event/popup/get/list",customEventProfile:c+"event/popup/get/profile",pushList:c+"push/list",cancelPush:c+"push/set/cancel",createPush:c+"push/create",pushTargetNotice:c+"push/get/notice",pushTargetEvent:c+"push/get/event",pushTargetDoit:c+"push/get/doit",pushTargetMember:c+"push/get/profile",pushTargetMemberFromXlsx:c+"excel/import/notification/profile",popupList:c+"popup/get/list",createPopup:c+"popup/create",detailPopup:c+"popup/get/detail/info",updatePopup:c+"popup/update",deletePopup:c+"popup/delete",errorList:c+"error/list",updateError:c+"error/update",createEncryption:c+"operate/set/encryption",createDecryption:c+"operate/set/decryption",versionList:c+"operate/get/version/list",createVersion:c+"operate/version/create",deleteVersion:c+"operate/version/delete",getMemberForSaveUcd:c+"ucd/get/user/list",getMemberFromXlsx:c+"excel/import/profile",getDoitFromXlsx:c+"excel/import/doit",ucdChargeList:c+"ucd/list/get/charge",systemWalletType:c+"ucd/get/system/type",systemWalletList:c+"ucd/list/get/system",doitWalletList:c+"ucd/list/get/doit",memberWalletList:c+"ucd/list/get/user",pendingWalletList:c+"ucd/list/get/transfer",giftList:c+"gift/get/list",reorderGiftList:c+"gift/get/orderList",reorderGift:c+"gift/set/orders",createGift:c+"gift/create",ktGoodsList:c+"gift/get/kt/goods",detailGift:c+"gift/get/detail/info",updateGift:c+"gift/update",applyGiftList:c+"exchange/get/list",sendGifticon:c+"exchange/set/confirm",sendGeneralGift:c+"exchange/set/send",rejectGift:c+"exchange/set/reject",resendGift:c+"exchange/set/resend",getGiftBalance:c+"exchange/get/money",sendGiftList:c+"exchange/get/sendList",sendGiftStatusList:c+"exchange/get/payment",updateGiftSendMemo:c+"exchange/set/insertMemo",adminList:c+"admin/list",detailAdmin:c+"admin/detail",updateAdmin:c+"admin/update",deleteAdmin:c+"admin/delete",authBizList:c+"auth/get/biz/list",approvalAdmin:c+"admin/approval",authList:c+"auth/list",getMenuWithAuth:c+"auth/get/menu",setMenuWithAuth:c+"auth/set/menu",createAuth:c+"auth/create",deleteAuth:c+"auth/delete",promotionList:c+"promotion/get/list",createPromotion:c+"promotion/create",detailPromotion:c+"promotion/get/detail",updatePromotion:c+"promotion/update",closePromotion:c+"promotion/set/end",promotionDoitList:c+"promotion/get/doit/list",promotionProceedList:c+"promotion/get/proceed/list",setDoitPromotion:c+"promotion/set/doit",cancelDoitPromotion:c+"promotion/set/release"},m={list:"목록",submit:"등록",modify:"수정",delete:"삭제",cancel:"취소",confirm:"확인",approval:"승인",pending:"대기",progress:"진행",end:"마감",terminate:"종료",success:"성공",fail:"실패",send:"발송",reserve:"예약",public:"공개",private:"비공개",y:"Y",n:"N",dash:"-",tilde:"~",slash:"/",pendingIcon:'<i class="far fa-calendar"></i>',progressIcon:'<i class="far fa-calendar-check"></i>',endIcon:'<i class="far fa-calendar-times" style="color:#aaa"></i>',terminateIcon:'<i class="fas fa-calendar-times" style="color:#aaa"></i>',exposure:'<i class="fas fa-check-circle" style="color:#007aff"></i>',unexpose:'<i class="fas fa-check-circle" style="color:#aaa"></i>',blind:'<i class="fas fa-eye-slash"></i>',unblind:'<i class="fas fa-eye"></i>',bizIcon:'<img src="/assets/v2/img/icon_sponsor.png" class="icon-sponsor" alt="">',generalDoit:"일반 두잇",general:"일반",notice:"공지",personal:"개인",member:"회원",guest:"비회원",doit:"두잇",profile:"사용자",charge:"충전",levelup:"레벨업",join:"신규가입",biz:"기업",imageKor:"사진",videoKor:"영상",audioKor:"음성",image:"image",video:"video",audio:"audio",detailContent:"상세 내용",download:"다운로드",average:"평균",gifticon:"기프티콘",gift:"일반상품",previous:'<i class="fas fa-angle-double-left"></i>',next:'<i class="fas fa-angle-double-right"></i>',memo:'<i class="fas fa-thumbtack"></i>',fixedTop:'<i class="fas fas fa-bell"></i>',noImage:"/assets/v2/img/no-image.jpg",voiceImage:"/assets/v2/img/voice.jpg",redCardImage:"/assets/v2/img/red-card.png",yellowCardImage:"/assets/v2/img/yellow-card.png",redYellowCardImage:"/assets/v2/img/rad-yellow-card.png",monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],dayNames:["일","월","화","수","목","금","토"],maxDownLoadXlsxCount:3e4},u=Swal.mixin({toast:!0,position:"center",showConfirmButton:!1,timer:1500,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});function g(e){u.fire({icon:"info",title:e})}function b(e){Swal.fire({icon:"error",html:e})}const f="목록이 없습니다.",h="을(를) 불러올 수 없습니다.";function y(e){return Number(e)<10?e.toString().padStart(2,"0"):e}function k(e){return null==e||e.hasOwnProperty("length")&&0===e.length||e.constructor===Object&&0===Object.keys(e).length||e.constructor===String&&""===e.trim()}function v(e){return k(e)||isNaN(e)?0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}const T="/v2/member/detail",D="/v2/doit/detail/";function L(){i.fadeOut(),o.fadeOut(),$("body").css("overflow-y","auto")}function w(e){const t=e.getFullYear(),a=e.getMonth()+1,n=e.getDate();return`${t}-${y(a)}-${y(n)}`}function C(){return w(new Date)}function S(){const e=new Date;return e.setDate(e.getDate()-6),w(e)}const x=$("#dateFromSummary"),M=$("#dateToSummary"),_=$("#dateFromSummaryList"),A=$("#dateToSummaryList");let U=!1,W=1;function I(){const e={from_date:x.val(),to_date:M.val()};s(!0,p.dashboardSummary,JSON.stringify(e)).then((async function(e,t,a){l(e)?(function(e){const{sign_up_count:t,level2_member_count:a,action_count:n,create_doit_count:i,total_app_down_count:o,total_sign_up_count:r,total_give_ucd:s}=e.data;$("#signupCount").text(v(t)),$("#level2Count").text(v(a)),$("#actionCount").text(v(n)),$("#openDoitCount").text(v(i)),$("#downloadCount").text(v(o)),$("#memberCount").text(v(r)),$("#issuedUcd").text(v(s))}(e),U||(function(e){const t=$("#leaderRank"),{leader_rank:a}=e.data;t.empty(),!k(a)&&a.length>0&&(a.map(((e,a)=>{const{ranking:n,nickname:i,profile_uuid:o,rank_diff:r}=e,s=`<li class="clearfix">\n                        ${0===a?'<i class="fas fa-crown rank-first"></i>':""}\n                        <div class="left-wrap">\n                            <span><em class="rank-num ${a<3?"rank-top":""}">${n}</em></span>\n                            <a class="rank-title link leader-nickname" data-uuid="${o}">${i}</a>\n                        </div>\n                        <div class="right-wrap ${0===r?m.dash:r>0?"rank-up":"rank-down"}">\n                            <i class="fas ${0===r?"":r>0?"fa-caret-up":"fa-caret-down"}"></i> ${0===r?m.dash:Math.abs(r)}\n                        </div>\n                    </li>`;t.append(s)})),$(".leader-nickname").on("click",(function(){P(this)})))}(e),function(e){const t=$("#doitRank"),{doit_rank:a}=e.data;t.empty(),!k(a)&&a.length>0&&a.map(((e,a)=>{const{idx:n,ranking:i,doit_title:o,rank_diff:r}=e,s=`<li class="clearfix">\n                        ${0===a?'<i class="fas fa-crown rank-first"></i>':""}\n                        <div class="left-wrap">\n                            <span><em class="rank-num ${a<3?"rank-top":""}">${i}</em></span>\n                            <a href="${D}${n}" class="rank-title link">${o}</a>\n                        </div>\n                        <div class="right-wrap ${0===r?m.dash:r>0?"rank-up":"rank-down"}">\n                            <i class="fas ${0===r?"":r>0?"fa-caret-up":"fa-caret-down"}"></i> ${0===r?m.dash:Math.abs(r)}\n                        </div>\n                    </li>`;t.append(s)}))}(e),function(e){const t=$("#categorySummary"),{category_rate:a}=e.data,n=["#BED661","#89E894","#78D5E3","#7AF5F5","#34DDDD","#FE8402","#41924B","#FFCC00"];let i=[],o=[];t.empty(),!k(a)&&a.length>0&&a.map(((e,a)=>{const{category_title:r,count:s,rate:l}=e,d=`<li>\n                        <div class="left-wrap">\n                            <i class="color-box" style="background-color: ${n[a]}"></i>\n                            <span>${r}</span>\n                        </div>\n                        <div class="right-wrap">\n                            <strong class="data-num-s">${v(l)}%</strong> (${v(s)})\n                        </div>\n                    </li>`;t.append(d),i.push(r),o.push(s)}));const r=document.getElementById("categoryChart");new Chart(r,{type:"pie",data:{datasets:[{labels:i,data:o,borderWidth:1,backgroundColor:n}]},options:{responsive:!1,legend:{display:!1},plugins:{tooltip:{callbacks:{label:e=>e.dataset.labels[e.dataIndex]}}}}})}(e),function(e){const t=$("#missionSummary"),{create_mission_rate:a}=e.data;if(t.empty(),!k(a)){const{count:e,register_mission_rate:n,unregistered_mission_rate:i}=a,o=[n,i],r=["#BED661","#89E894"],s=["등록","미등록"];q=e>1e5?`${v(Math.round(e/1e3))}k`:v(e).toString(),o.map(((e,a)=>{const n=`<li>\n                        <div class="left-wrap">\n                            <i class="color-box" style="background-color: ${r[a]}"></i>\n                            <span>${s[a]}</span>\n                        </div>\n                        <div class="right-wrap">\n                            <strong class="data-num-s">${e}%</strong>\n                        </div>\n                    </li>`;t.append(n)}));const l=document.getElementById("missionChart");new Chart(l,{type:"doughnut",data:{datasets:[{labels:["등록","미등록"],data:[n,i],borderWidth:1,backgroundColor:r}]},options:{responsive:!1,legend:{display:!1},plugins:{tooltip:{callbacks:{label:e=>e.dataset.labels[e.dataIndex]}}}},plugins:[R]})}}(e))):g(d(e))})).catch((e=>b("데이터을(를) 불러올 수 없습니다.")))}function P(e){!function(e){let t=$("<form></form>");t.prop("method","post"),t.prop("action",T),t.append($("<input/>",{type:"hidden",name:"is_store",value:!0})),t.append($("<input/>",{type:"hidden",name:"profile_uuid",value:e})),t.appendTo("body"),t.trigger("submit")}($(e).data("uuid"))}function B(e){i.fadeIn(),o.fadeIn(),$("body").css("overflow-y","hidden"),W=1,$("#modalTitle").text(""),$("#modalRank").empty(),"btnMoreLeader"===e.id?N():F()}function N(){const e={page:W,limit:10};s(!0,p.dashboardMoreLeader,JSON.stringify(e)).then((async function(e,t,a){l(e)?(function(e){if(!k(e.data)&&e.data.length>0){let t="";e.data.map(((e,a)=>{const{ranking:n,nickname:i,profile_uuid:o,rank_diff:r}=e;t+=`<li class="clearfix">\n                        ${0===a&&1===W?'<i class="fas fa-crown rank-first"></i>':""}\n                        <div class="left-wrap">\n                            <span><em class="rank-num ${1===W&&a<3?"rank-top":""}">${n}</em></span>\n                            <a class="rank-title link leader-nickname" data-uuid="${o}">${i}</a>\n                        </div>\n                        <div class="right-wrap ${0===r?m.dash:r>0?"rank-up":"rank-down"}">\n                            <i class="fas ${0===r?"":r>0?"fa-caret-up":"fa-caret-down"}"></i> ${0===r?m.dash:Math.abs(r)}\n                        </div>\n                    </li>`})),$("#modalTitle").text("리더 랭킹"),$("#modalRank").html(t),$(".leader-nickname").on("click",(function(){P(this)}))}}(e),E(e)):g(d(e))})).catch((e=>b("데이터을(를) 불러올 수 없습니다.")))}function F(){const e={page:W,limit:10};s(!0,p.dashboardMoreDoit,JSON.stringify(e)).then((async function(e,t,a){l(e)?(function(e){if(!k(e.data)&&e.data.length>0){let t="";e.data.map(((e,a)=>{const{idx:n,ranking:i,doit_title:o,rank_diff:r}=e;t+=`<li class="clearfix">\n                        ${1===W&&0===a?'<i class="fas fa-crown rank-first"></i>':""}\n                        <div class="left-wrap">\n                            <span><em class="rank-num ${1===W&&a<3?"rank-top":""}">${i}</em></span>\n                            <a href="${D}${n}" class="rank-title link">${o}</a>\n                        </div>\n                        <div class="right-wrap ${0===r?m.dash:r>0?"rank-up":"rank-down"}">\n                            <i class="fas ${0===r?"":r>0?"fa-caret-up":"fa-caret-down"}"></i> ${0===r?m.dash:Math.abs(r)}\n                        </div>\n                    </li>`})),$("#modalTitle").text("두잇 랭킹"),$("#modalRank").html(t)}}(e),E(e)):g(d(e))})).catch((e=>b("데이터을(를) 불러올 수 없습니다.")))}function E(e){const t=e.count,n=Math.ceil(t/10);a.html(function(e,t){let a,n,i,o="";if(o+=1===e?`<a class="paginate_button previous disabled" id="dataTable_previous">${m.previous}</a><span>`:`<a class="paginate_button previous" data-page="${e-1}" id="dataTable_previous">${m.previous}</a><span>`,t<=7)for(a=1;a<=t;a++)n=t>1&&e===a?"current":"",o+=`<a class="paginate_button ${n}" data-page="${a}">${a}</a>`;else if(e<5)for(a=1;a<=7;a++)n=t>1&&e===a?"current":"",i=7===a?t:a,o+=6===a?'<span class="ellipsis">…</span>':`<a class="paginate_button ${n}" data-page="${i}">${i}</a>`;else if(e>=5&&e<=t-4)for(a=1;a<=t;a++)1===a&&(o+=`<a class="paginate_button" data-page="${a}">${a}</a>\n\t\t\t\t\t\t\t<span class="ellipsis">…</span>`),e===a&&(o+=`<a class="paginate_button" data-page="${a-1}">${a-1}</a>\n\t\t\t\t\t\t\t<a class="paginate_button current" data-page="${a}">${a}</a>\n\t\t\t\t\t\t\t<a class="paginate_button" data-page="${a+1}">${a+1}</a>`),t===a&&(o+=`<span class="ellipsis">…</span>\n\t\t\t\t\t\t\t<a class="paginate_button" data-page="${t}">${t}</a>`);else if(e>t-4)for(a=1;a<=7;a++)n=e===t-(7-a)?"current":"",i=a>=3?t-(7-a):a,o+=2===a?'<span class="ellipsis">…</span>':`<a class="paginate_button ${n}" data-page="${i}">${i}</a>`;return o+=t===e||0===Number(t)?`</span><a class="paginate_button next disabled" id="dataTable_next">${m.next}</a>`:`</span><a class="paginate_button next" data-page="${e+1}" id="dataTable_next">${m.next}</a>`,o}(W,n)),$(".paginate_button").not(".disabled").on("click",(function(){var e;e=this,$(e).siblings().removeClass("current"),$(e).addClass("current"),W=$(e).data("page"),"리더 랭킹"===$("#modalTitle").text()?N():F()}))}$((()=>{$.extend(!0,$.fn.dataTable.defaults,{ordering:!1,order:[],info:!1,processing:!1,lengthChange:!1,autoWidth:!1,searching:!1,fixedHeader:!1,language:{emptyTable:f,zeroRecords:f,processing:"검색 중..",paginate:{previous:m.previous,next:m.next}}}),t.datepicker({dateFormat:"yy-mm-dd",changeYear:!0,showMonthAfterYear:!0,monthNames:m.monthNames,dayNames:m.dayNames,dayNamesMin:m.dayNames}),x.val(S()),M.val(C()),_.val(S()),A.val(C()),t.datepicker("option","minDate","2020-07-01"),t.datepicker("option","maxDate","today"),I(),$("#summaryTable").DataTable({ajax:{url:p.dashboardSummaryList,type:"POST",headers:r,global:!1,dataFilter:function(e){let t=JSON.parse(e);return l(t)?(t.recordsTotal=t.count,t.recordsFiltered=t.count):(t.data=[],g(d(t))),JSON.stringify(t)},data:function(e){const t={from_date:_.val(),to_date:A.val(),page:e.start/e.length+1,limit:e.length};return JSON.stringify(t)},error:function(e,t){b(m.list+h)}},columns:[{title:"일자",data:"basedate",width:"10%"},{title:"앱 설치",data:"app_down_count",width:"9%",render:function(e){return v(e)}},{title:"회원 가입",data:"sign_up_count",width:"9%",render:function(e){return v(e)}},{title:"두잇 가입",data:"doit_sign_up_count",width:"9%",render:function(e){return v(e)}},{title:"인증",data:"action_count",width:"9%",render:function(e){return v(e)}},{title:"인증 댓글",data:"action_comment_count",width:"9%",render:function(e){return v(e)}},{title:"커뮤니티",data:"board_count",width:"9%",render:function(e){return v(e)}},{title:"커뮤니티 댓글",data:"board_comment_count",width:"9%",render:function(e){return v(e)}},{title:"두잇 개설",data:"create_doit_count",width:"9%",render:function(e){return v(e)}},{title:"미션 등록",data:"create_mission_count",width:"9%",render:function(e){return v(e)}},{title:"발행 UCD",data:"ucd_amount",width:"9%",render:function(e){return v(e)}}],serverSide:!0,paging:!0,pageLength:30,select:!1,destroy:!0,initComplete:function(){},fnRowCallback:function(e,t){},drawCallback:function(e){$(this).closest(".dataTables_wrapper").find(".dataTables_paginate").toggle(this.api().page.info().pages>0)}}),n.on("click",(function(){L()})),o.on("click",(function(){L()})),x.on("change",(function(){M.datepicker("option","minDate",new Date(x.datepicker("getDate")))})),M.on("change",(function(){x.datepicker("option","maxDate",new Date(M.datepicker("getDate"))),U=!0,I()})),_.on("change",(function(){A.datepicker("option","minDate",new Date(_.datepicker("getDate")))})),A.on("change",(function(){_.datepicker("option","maxDate",new Date(A.datepicker("getDate"))),$("#summaryTable").DataTable().ajax.reload()})),$("#btnMoreLeader").on("click",(function(){B(this)})),$("#btnMoreDoit").on("click",(function(){B(this)}))}));let q=0;const R={id:"centerText",afterDraw(e,t,a){const{ctx:n}=e;n.restore(),n.font="36px Roboto, Helvetica, Arial, sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillText(q,150,160),n.save()}}})();