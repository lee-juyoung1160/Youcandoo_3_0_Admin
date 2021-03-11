
    /** 공통 엘리먼트 **/
    export const body       = $('body');
    export const section    = $('section');
    export const selectEls  = $('select');
    export const img        = $('img');
    export const btnMenuToggle   = $('.side-toggle-btn');
    export const sideBar    = $('aside.main-menu');
    export const mainMenu   = $('.main-mnu');
    export const subMenu    = $('.sub-mnu li');
    export const sessionUserId   = $("#sessionUserid");
    export const sessionUserIp   = $("#sessionUserIp");
    export const sessionAuthCode = $("#sessionAuthCode");
    export const sessionIsDept   = $("#sessionIsDept");
    export const sessionDeptName = $("#sessionDeptName");
    export const environment     = $("#env");
    export const loader          = $("#loader");
    export const btnScrollTop    = $("#btnScrollTop");
    export const btnXlsxImport   = $("#btnXlsxImport");
    export const btnXlsxExport   = $("#btnXlsxExport");

    export const dateButtons    = $(".date-btn .btn");
    export const datePicker     = $(".datepicker");
    export const dateFrom       = $(".date-from");
    export const dateTo         = $(".date-to");
    export const selDateType    = $("#selDateType");
    export const selSearchType  = $("#selSearchType");
    export const chkType    = $("input[name=chk-type]");
    export const chkStatus  = $("input[name=chk-status]");
    export const rdoType    = $("input[name=radio-type]");
    export const rdoStatus  = $("input[name=radio-status]");
    export const keyword 	= $("#keyword");
    export const btnSearch 	= $("#btnSearch");
    export const btnReset 	= $("#btnReset");
    export const btnSubmit	= $("#btnSubmit");
    export const btnCancel	= $("#btnCancel");
    export const btnCreate	= $("#btnCreate");
    export const btnUpdate	= $("#btnUpdate");
    export const btnDelete	= $("#btnDelete");
    export const btnAdd	    = $("#btnAdd");
    export const btnList	= $("#btnList");
    export const btnBack	= $("#btnBack");

    export const selPageLength = $("#selPageLength");
    export const selSort    = $("#selSort");
    export const dataTable  = $("#dataTable");
    export const pagination = $("#dataTable_paginate");

    export const thumbnail  = $("#thumbnail");
    export const amount     = $("#amount");
    export const nickname   = $("#nickname");
    export const memo       = $("#memo");
    export const title      = $("#title");
    export const content    = $("#content");
    export const contentImage  = $("#contentImage");
    export const reserveDate = $("#reserveDate");
    export const rdoOsType = $("input[name=radio-os-type]");
    export const osType = $("#osType");
    export const version = $("#version");
    export const isExposure	    = $("#isExposure");
    export const rdoExposure	= $("input[name=radio-exposure]");
    export const exposureDate   = $("#exposureDate");
    export const link = $("#link");

    export const lengthInput  = $(".length-input");
    export const inputNumber  = $(".only-num");
    export const inputNumberWithZero = $(".only-num-with-zero");

    /** 모달 **/
    export const modalOpen      = $('.modal-btn');
    export const modalClose     = $('.modal-close');
    export const modalContent   = $('.modal-content');
    export const modalBackdrop  = $('.modal-bg');
    export const modalDetail    = $('#modalDetail');

    /** 로그인, 관리자등록, 2차인증 **/
    export const userid     = $("#userid");
    export const password   = $("#password");
    export const passwordCheck    = $("#passwordCheck");
    export const useremail  = $("#useremail");
    export const username   = $("#username");
    export const qrImg      = $("#qrImg");
    export const otpNum     = $("#otpNum");
    export const secret     = $("#secret");
    export const type       = $("#type");
    export const btnLogin   = $("#btnLogin");
    export const btnJoin    = $("#btnJoin");
    export const btnSignIn    = $("#btnSignIn");

    /** 카테고리 **/
    export const updateTable    = $("#updateTable");
    export const categoryTitle 	= $("#categoryTitle");
    export const categoryIcon	= $("#categoryIcon");
    export const isEstablish	= $("#isEstablish");
    export const rdoEstablish	= $("input[name=radio-establish]");
    export const subCategoryTitle = $("#subCategoryTitle");

    /** 두잇 **/
    export const sponsor        = $("#sponsor");
    export const doitSponsor    = $(".doit-sponsor");
    export const sponsorUuid    = $("#sponsorUuid");
    export const selCategory    = $("#selCategory");
    export const selSubcategory = $("#selSubcategory");
    export const doitTitle      = $("#doitTitle");
    export const doitKeyword    = $("#doitKeyword");
    export const doitDesc       = $("#doitDesc");
    export const rdoPublicType  = $("input[name=radio-public-type]");
    export const chkIsApply     = $("input[name=chk-is-apply]");
    export const chkIsAnswer    = $("input[name=chk-is-answer]");
    export const chkIsQuestion  = $("input[name=chk-is-question]");
    export const doitQuestion   = $("#doitQuestion");
    export const doitImage      = $("#doitImage");
    export const doitKeywords   = $("#doitKeywords");
    export const btnDoitOpen    = $("#btnDoitOpen");
    export const btnDoitDelete  = $("#btnDoitDelete");
    export const btnDoitStop    = $("#btnDoitStop");
    export const tabUl          = $("#tabUl");
    export const tabContents    = $(".tab-contents");
    export const category       = $("#category");
    export const publicType     = $("#publicType");
    export const isApply        = $("#isApply");
    export const isAnswer       = $("#isAnswer");
    export const doitInfoForm   = $("#doitInfoForm");
    export const doitUpdateForm = $("#doitUpdateForm");
    export const infoDoitTitle = $("#infoDoitTitle");
    export const infoDoitDesc  = $("#infoDoitDesc");
    export const infoDoitKeywords = $("#infoDoitKeywords");
    export const infoQuestion  = $("#infoQuestion");
    export const doitThumbnail = $(".doit-image");
    export const btnAddKeyword = $("#btnAddKeyword");
    export const btnSubmitUpdateDoit = $("#btnSubmitUpdateDoit");
    export const btnUpdateDoit   = $("#btnUpdateDoit");

    export const btnCreateMission   = $("#btnCreateMission");
    export const btnSubmitMission   = $("#btnSubmitMission");
    export const btnMissionList   = $("#btnMissionList");
    export const btnUpdateMission   = $("#btnUpdateMission");
    export const btnSubmitUpdateMission = $("#btnSubmitUpdateMission");
    export const btnDeleteMission   = $("#btnDeleteMission");
    export const missionListForm    = $("#missionListForm");
    export const missionDetailForm  = $("#missionDetailForm");
    export const missionCreateForm  = $("#missionCreateForm");
    export const missionUpdateForm  = $("#missionUpdateForm");
    export const missionTable       = $("#missionTable");
    export const missionTitle       = $("#missionTitle");

    export const btnCreateTalk   = $("#btnCreateTalk");
    export const createTalkModal = $("#createTalkModal");
    export const talkListForm   = $("#talkListForm");
    export const talkDetailForm = $("#talkDetailForm");
    export const talkUpdateForm = $("#talkUpdateForm");
    export const talk = $("#talk");
    export const talkImage = $("#talkImage");
    export const chkNoticeTalk = $("input[name=chk-notice-talk]");

    /** 비즈 **/
    export const doitTable = $("#doitTable");
    export const ucdTable = $("#ucdTable");
    export const selPageLengthDoit = $("#selPageLengthDoit");
    export const selPageLengthUcd = $("#selPageLengthUcd");
    export const bizNo = $("#bizNo");
    export const bizWeb = $("#bizWeb");

    /** 배너 **/
    export const bannerTitle = $("#bannerTitle");
    export const selTargetType = $("#selTargetType");
    export const targetUrl = $("#targetUrl");
    export const bannerImage = $("#bannerImage");

    /** 유캔두 픽 **/
    export const previewTitle = $("#previewTitle");
    export const curationTitle = $("#curationTitle");

    /** 공지 **/
    export const chkTopNotice = $("input[name=chk-top-notice]");
    export const isTop = $("#isTop");
    /** FAQ **/
    export const selFaqType = $("#selFaqType");
    export const faqType = $("#faqType");
    /** 금지어 **/
    export const banWords = $("#banWords");
    /** 문의 **/
    export const selInquiryType = $("#selInquiryType");
    export const deviceInfo = $("#deviceInfo");
    export const answer = $("#answer");
    export const manager = $("#manager");
    export const answerDate = $("#answerDate");
    /** 인증 **/
    export const actionsWrap = $("#actionsWrap");
    export const modalWarning = $("#modalWarning");
    /** 톡 **/
    export const rdoReport = $("input[name=radio-report]");
    /** 푸시 **/
    export const rdoReserveType = $("input[name=radio-reserve-type]");
    export const reserveTime = $("#reserveTime");
    export const rdoTargetPageType = $("input[name=radio-target-page-type]");
    export const targetPage = $("#targetPage");
    export const rdoReceiveType = $("input[name=radio-receive-type]");
    export const rdoTargetMemberType = $("input[name=radio-target-member-type]");
    export const modalTargetPage = $("#modalTargetPage");
    export const modalTargetMember = $("#modalTargetMember");
    export const btnModalTargetMemberOpen = $("#btnModalTargetMemberOpen");

    /** 팝업 **/
    export const versionDigit = $("#versionDigit");
    export const versionDecimal = $("#versionDecimal");
    export const rdoViewOption = $("input[name=radio-view-option]");
    export const startTime = $("#startTime");
    export const endTime = $("#endTime");
    export const viewOption = $("#viewOption");

    /** 이벤트 **/
    export const selEventType = $("#selEventType");
    export const eventType = $("#eventType");
    export const eventDate = $("#eventDate");
    export const notice = $("#notice");
    export const thumbnailImage = $("#thumbnailImage");
    export const thumbnailImgThumbnail= $("#thumbnailImgThumbnail");

    /** 상품 **/
    export const price = $("#price");
    export const selHour = $("#selHour");
    export const selMinute = $("#selMinute");
    export const btnSendGeneral = $("#btnSendGeneral");
    export const btnSendGift = $("#btnSendGift");
    export const modalGift = $("#modalGift");
    export const modalGeneral = $("#modalGeneral");
    export const generalMemo = $("#generalMemo");
    export const btnSubmitGift = $("#btnSubmitGift");
    export const btnSubmitGeneral = $("#btnSubmitGeneral");
