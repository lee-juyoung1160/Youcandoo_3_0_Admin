
	const message = {
		accessDenied : '페이지 접근권한없음. 메인페이지로 이동합니다.'
		,emptyId : '아이디를 입력해주세요.'
		,emptyPassword : '비밀번호를 입력해주세요.'
		,emptyList : '조회된 목록이 없습니다.'
		,searching : '검색 중..'
		,create : '등록하시겠습니까?'
		,modify : '수정하시겠습니까?'
		,delete : '삭제하시겠습니까?'
		,close : '종료하시겠습니까?'
		,change : '변경하시겠습니까?'
		,cancel : '취소하시겠습니까?'
		,approve : '승인하시겠습니까?'
		,reject : '거절하시겠습니까?'
		,ban : '강퇴하시겠습니까?'
		,send : '발송하시겠습니까?'
		,input : '입력해주세요.'
		,doubleChk : '확인해주세요.'
		,select : '선택해주세요.'
		,addOn : '추가해주세요.'
		,required : '필수항목입니다.'
		,notEqual : '일치하지 않습니다.'
		,invalidFile : '지원하지 않는 파일 형식입니다.'
		,invalidBrowser : '지원하지 않는 브라우져입니다.'
		,overFileSize : '10MB 이하의 파일을 선택해주세요.'
		,maxJoinPromo : '최대 5회까지 등록 가능합니다.'
		,maxAddTen : '최대 10개까지 등록 가능합니다.'
		,maxAddFive : '최대 5개까지 등록 가능합니다.'
		,maxAddFour : '최대 4개까지 등록 가능합니다.'
		,maxAddThree : '최대 3개까지 등록 가능합니다.'
		,maxAvailableBizUcd : '최대 1억 UCD까지 가능합니다.'
		,maxAvailableUserUcd : '최대 1백만 UCD까지 가능합니다.'
		,deleteTop : '상단고정을 해제하시겠습니까?'
		,insertTop : '상단고정을 설정하시겠습니까?'
		,compareActionTime: '인증시작시간은 인증종료시간 이전으로 설정해야 합니다.'
		,compareReserveDatetime: '예약발송일시는 현재시간 이후로 설정해야 합니다.'
		,onlyAlphabet : '영문만 입력할 수 있습니다.'
		,ajaxError : ` 처리 중, 일시적인 오류가 발생했습니다.
					잠시 후 다시 시도해주세요.`
		,ajaxLoadError: `을(를) 불러올 수 없습니다.
						잠시 후 다시 시도해주세요.`
		,compareMinMaxUser : '최소인원은 최대인원을 초과할 수 없습니다.'
		,overBudget : '총 UCD는 프로모션 예산을 초과할 수 없습니다.'
		,overBalance : '보유 UCD를 초과할 수 없습니다.'
		,overBalanceWithdraw : `보유 UCD가 출금(취소) UCD보다 작은 사용자가 포함돼있습니다.
								해당 사용자 삭제 후 다시 시도해주세요.`
		,invalidDuration : '인증기간은 최소 7일, 최대 30일까지 입력 가능합니다.'
		,overTotalBalance : '기업이 보유한 총 UCD를 초과할 수 없습니다.'
		,minOverMax : '참여자 수 최소값은 참여자 수 최대값을 초과할 수 없습니다.'
		,minimumPassCode : '참가코드는 네 자릿수를 입력해야 합니다.'
		,minimumChecked : '최소 하나 이상의 값을 선택해야 합니다.'
		,promotionNotice1 : '프로모션 두잇은 동시에 최대 3개까지 참여 가능합니다.'
		,promotionNotice2 : '프로모션 기간이 종료되면 두잇을 개설할 수 없습니다.'
		,promotionNotice3 : '프로모션 예산이 모두 소진된 경우 두잇을 개설할 수 없습니다.'
		,cantUpdatePromo : `프로모션을 수정할 수 없습니다.
							목록으로 이동합니다.
							(프로모션 상태가 대기 또는 진행 중일 경우 수정가능)`
		,cantUpdateDoit : `두잇을 수정할 수 없습니다.
							상세페이지로 이동합니다.
							(두잇 상태가 모집 중일 경우 수정가능)`
		,cantUpdateUserDoit : '일반두잇은 수정할 수 없습니다. 상세페이지로 이동합니다.'
		,alreadyHasYellow : `이미 옐로카드를 받은 인증이 포함돼 있습니다.
							해당 게시물 체크 해제 후 다시 시도해주세요.`
		,notEnoughBudget : `프로모션 예산이 부족해 두잇을 개설할 수 없습니다.
							기업 또는 프로모션을 다시 선택해주세요.`
		,alreadyHasUser : `이미 추가된 회원이 포함돼 있습니다.
							해당 회원을 체크 해제 후 다시 시도해주세요.`
		,pushHasBeenSent : '선택한 푸시는 이미 발송됐습니다. 발송된 푸시는 취소할 수 없습니다.'
		,moveToCreatePush : '푸시 알림을 등록하시겠습니까?'
	}

	const label = {
		list: '목록'
		, submit: '등록'
		, modify: '수정'
		, delete: '삭제'
		, cancel: '취소'
		, confirm: '확인'
		, approval: '승인'
		, pending: '대기'
		, progress: '진행'
		, end: '마감'
		, terminate: '종료'
		, success: '성공'
		, fail: '실패'
		, send: '발송'
		, reserve: '예약'
		, y: 'Y'
		, n: 'N'
		, dash: '-'
		, tilde: '~'
		, slash: '/'
		, pendingIcon: '<i class="far fa-calendar"></i>'
		, progressIcon: '<i class="far fa-calendar-check"></i>'
		, endIcon: '<i class="far fa-calendar-times" style="color:#aaa"></i>'
		, terminateIcon: '<i class="fas fa-calendar-times" style="color:#aaa"></i>'
		, exposure: '<i class="fas fa-check-circle" style="color:#007aff"></i>'
		, unexpose: '<i class="fas fa-check-circle" style="color:#aaa"></i>'
		, blind: '<i class="fas fa-eye-slash"></i>'
		, unblind: '<i class="fas fa-eye"></i>'
		, regular: '일반'
		, promotion: '프로모션'
		, personal: '개인'
		, member: '회원'
		, guest: '비회원'
		, biz: '기업'
		, image: '사진'
		, video: '영상'
		, voice: '음성'
		, detailContent: '상세 내용'
		, download: '다운로드'
		, average: '평균'
		, gifticon: '기프티콘'
		, gift: '일반상품'
		, previous: '<i class="fas fa-angle-double-left"></i>'
		, next: '<i class="fas fa-angle-double-right"></i>'
		, memo: '<i class="fas fa-thumbtack"></i>'
		, fixedTop: '<i class="fas fas fa-bell"></i>'
		, noImage: '/assets/images/no-image.jpg'
		, voiceImage: '/assets/images/voice.jpg'
		, redCardImage: '/assets/images/red-card.png'
		, yellowCardImage: '/assets/images/yellow-card.png'
		, redYellowCardImage: '/assets/images/rad-yellow-card.png'
		, monthNames : ["1월", "2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
		, dayNames: ["일", "월", "화", "수", "목", "금", "토"]
		, maxDownLoadXlsxCount: 30000
	}

	/** api url **/
	const headers = {
		"Authorization" : btoa(JSON.stringify({ "authorization" : "9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7", "userid" : $("#session_userid").val()}))
	};
 	const baseApiUrl = 'https://adminapi.youcandoo.co.kr/';
	const api = {
		/** 공통 **/
		getBizName : baseApiUrl+'keyword/getCompanyName'
		,getNickname : baseApiUrl+'user/getNickname'
		,getBalance : baseApiUrl+'ucd/status/company'
		/** 회원가입 **/
		,join : baseApiUrl+'/auth/join'
		/** 대시보드 **/
		,getDoitStat : baseApiUrl+'dashboard/doit/status'
		,getUserStat : baseApiUrl+'dashboard/user/status'
		,getUcdStat : baseApiUrl+'dashboard/ucd'
		,getMonthlyDoit : baseApiUrl+'dashboard/doit/month'
		,getDailyAction : baseApiUrl+'dashboard/action/date'
		,getUserStatus : baseApiUrl+'dashboard/v2/doit/user'
		,getDoitOpenStatus : baseApiUrl+'dashboard/v2/doit/establish'
		,getDoitJoinStatus : baseApiUrl+'dashboard/v2/doit/join'
		,getDoitClosedStatus : baseApiUrl+'dashboard/v2/doit/end'
		,getReportStatus : baseApiUrl+'dashboard/v2/doit/report'
		,getDailyActions : baseApiUrl+'dashboard/v2/daily/action'
		,getPopularDoits : baseApiUrl+'dashboard/v2/doit/popular'
		,getDailyTotal : baseApiUrl+'dashboard/v2/daily/chart'
		/** 마이페이지 **/
		,getProfile : baseApiUrl+'admin/get'
		,updateProfile : baseApiUrl+'admin/update/pwd'
		,listMyLog : baseApiUrl+'access/list'
		/** 회원 **/
		,listUser : baseApiUrl+'user/list'
		/*,inactiveUser : baseApiUrl+'user/inactive'*/
		,getUserProfile : baseApiUrl+'user/get/profile'
		,getUserAccount : baseApiUrl+'user/get/account'
		,listUserOpened : baseApiUrl+'user/get/doit/create'
		,listUserJoined : baseApiUrl+'user/get/doit/join'
		,listUserUsageUcd : baseApiUrl+'user/get/ucd/history'
		,listUserAction : baseApiUrl+'user/get/action'
		,listUserDevice : baseApiUrl+'user/get/device'
		/** 비즈 **/
		,createBiz : baseApiUrl+'biz/create'
		,detailBiz : baseApiUrl+'biz/detail'
		,involveBizPromotion : baseApiUrl+'biz/promotion'
		,updateBiz : baseApiUrl+'biz/update'
		,listBiz : baseApiUrl+'biz/list'
		,listBizUcd : baseApiUrl+'biz/ucd'
		/** 프로모션 **/
		,createPromotion : baseApiUrl+'promotion/create'
		,detailPromotion : baseApiUrl+'promotion/getPromotion'
		,involveDoitPromotion : baseApiUrl+'promotion/getDoit'
		,updatePromotion : baseApiUrl+'promotion/update'
		,listPromotion : baseApiUrl+'promotion/list'
		,listPromotionUcd : baseApiUrl+'promotion/get/ucd'
		,listBanner : baseApiUrl+'promotion/banner/getExposure'
		,listNonBanner : baseApiUrl+'promotion/banner/getNonExposure'
		,updateBanner : baseApiUrl+'promotion/banner/set'
		,startPromotion : baseApiUrl+'promotion/start'
		,deletePromotion : baseApiUrl+'promotion/delete'
		,closePromotion : baseApiUrl+'promotion/end'
		/** 두잇 **/
		,createDoit : baseApiUrl+'doit/create'
		,deleteDoit : baseApiUrl+'doit/delete'
		,detailDoit : baseApiUrl+'doit/detail'
		,updateDoit : baseApiUrl+'doit/update'
		,listDoit : baseApiUrl+'doit/list'
		,involvePromotion : baseApiUrl+'promotion/getCompanyPromotion'
		,involveReward : baseApiUrl+'promotion/getPromotionReward'
		,getReward : baseApiUrl+'promotion/getReward'
		/*,listJoinMember : baseApiUrl+'doit/get/member'*/
		,listJoinMember : baseApiUrl+'doit/member/join/member'
		,totalJoinMember : baseApiUrl+'doit/get/member/total'
		,listDoitUcd : baseApiUrl+'doit/get/ucd'
		,getDoitUser : baseApiUrl+'doit/get/count'
		/** 두잇상세: 신청자탭 **/
		,listApplyMember : baseApiUrl+'doit/member/apply/member'
		,approvalDoitMember : baseApiUrl+'doit/member/apply/confirm'
		,rejectDoitMember : baseApiUrl+'doit/member/apply/reject'
		,banDoitMember : baseApiUrl+'doit/member/retire'
		/** 두잇상세: 두잇톡 v1 **/
		/*,listDoitTalk : baseApiUrl+'doit/board/list'
		,updateBlindTalk : baseApiUrl+'doit/board/set/blind'
		,createDoitTalk : baseApiUrl+'doit/board/register'
		,deleteDoitTalk : baseApiUrl+'doit/board/delete'*/
		/** 두잇상세: 두잇톡 v2 **/
		,listDoitTalkV2 : baseApiUrl+'doit/talk/v2/list'
		,listCommentsV2 : baseApiUrl+'doit/talk/v2/comment/list'
		,noticeDoitTalkV2 : baseApiUrl+'doit/talk/v2/notice/get'
		,updateBlindTalkV2 : baseApiUrl+'doit/talk/v2/updateBlind'
		,createTalkV2 : baseApiUrl+'doit/talk/v2/register'
		,deleteTalkV2 : baseApiUrl+'doit/talk/v2/delete'
		,createComments : baseApiUrl+'doit/talk/v2/comment/create'
		/** 두잇톡 관리 **/
		,listTalk : baseApiUrl+'doit/talk/list'
		,listActionTalk : baseApiUrl+'doit/talk/action/list'
		,detailTalk : baseApiUrl+'doit/talk/detail'
		,listComment : baseApiUrl+'doit/talk/commentDetail'
		,listLargeComment : baseApiUrl+'doit/talk/commentsDetail'
		,blindComment : baseApiUrl+'doit/talk/commentUpdate'
		,blindTalk : baseApiUrl+'doit/talk/update'
		/** 추천두잇 v1 **/
		,listDoitRecommend : baseApiUrl+'doit/recommend/list'
		,listDoitNonRecommend : baseApiUrl+'doit/recommend/doit'
		,updateDoitRecommend : baseApiUrl+'doit/recommend/set'
		/** 추천두잇 v2 **/
		,listDoitRecommendv2 : baseApiUrl+'doit/recommend/v2/list'
		,listDoitRecommended : baseApiUrl+'doit/recommend/v2/doitList'
		,listDoitRecommendSearch : baseApiUrl+'doit/recommend/v2/doitSearch'
		,createDoitRecommend : baseApiUrl+'doit/recommend/v2/create'
		,detailDoitRecommend : baseApiUrl+'doit/recommend/v2/detail'
		,updateDoitRecommendv2 : baseApiUrl+'doit/recommend/v2/update'
		,deleteDoitRecommend : baseApiUrl+'doit/recommend/v2//delete'
		,reorderDoitRecommend : baseApiUrl+'doit/recommend/v2/updateOrder'
		,exposureDoitRecommend : baseApiUrl+'doit/recommend/v2/updateIsEstablish'
		/** 두잇 카테고리 **/
		,listDoitCategory : baseApiUrl+'doit/category/list'
		,createDoitCategory : baseApiUrl+'doit/category/set'
		,updateDoitCategory : baseApiUrl+'doit/category/update'
		,detailDoitCategory : baseApiUrl+'doit/category/getCategory'
		,deleteDoitCategory : baseApiUrl+'doit/category/delete'
		,reorderDoitCategory : baseApiUrl+'doit/category/updateOrder'
		,blindDoitCategory : baseApiUrl+'doit/category/updateIsBlind'
		,establishDoitCategory : baseApiUrl+'doit/category/updateIsEstablish'
		,listCategory : baseApiUrl+'category/list'
		,listAllCategory : baseApiUrl+'category/all'
		,changeDoitCategory : baseApiUrl+'doit/updateCategory'
		/** 인증 **/
		,listAction : baseApiUrl+'action/list'
		,setYellow : baseApiUrl+'action/set/yellow'
		,setRed : baseApiUrl+'action/set/red'
		,setReport : baseApiUrl+'action/set/report'
		,cancelYellow : baseApiUrl+'action/cancel/yellow'
		,cancelRed : baseApiUrl+'action/cancel/red'
		/** 리뷰 **/
		,listReview : baseApiUrl+'review/list'
		,updateBlind : baseApiUrl+'review/update'
		/** 이벤트 **/
		,createEvent : baseApiUrl+'event/create'
		,deleteEvent : baseApiUrl+'event/delete'
		,updateEvent : baseApiUrl+'event/update'
		,detailEvent : baseApiUrl+'event/detail'
		,listEvent : baseApiUrl+'event/list'
		,getEventType : baseApiUrl+'event/type'
		/** 푸시 **/
		,createPush : baseApiUrl+'push/register'
		,listPush : baseApiUrl+'push/list'
		,cancelPush : baseApiUrl+'push/cancel'
		,listPushTargetUser : baseApiUrl+'push/user'
		,listPushTargetPageEvent : baseApiUrl+'push/event'
		,listPushTargetPagePromo : baseApiUrl+'push/promotion'
		,listPushTargetPageDoit : baseApiUrl+'push/doit'
		,listTargetUserWithXlsx : baseApiUrl+'excel/import/profile'
		/** dynamic link **/
		,listInflow : baseApiUrl+'marketing/dynamiclink/get'
		/** 팝업 **/
		,createPopup : baseApiUrl+'marketing/popup/set'
		,updatePopup : baseApiUrl+'marketing/popup/update'
		,detailPopup : baseApiUrl+'marketing/popup/detail'
		,deletePopup : baseApiUrl+'marketing/popup/delete'
		,listPopup : baseApiUrl+'marketing/popup/list'
		/** 공지 **/
		,createNotice : baseApiUrl+'notice/create'
		,deleteNotice : baseApiUrl+'notice/delete'
		,detailNotice : baseApiUrl+'notice/detail'
		,updateNotice : baseApiUrl+'notice/update'
		,listNotice : baseApiUrl+'notice/list'
		,topNotice : baseApiUrl+'notice/changeTop'
		/** FAQ **/
		,createFaq : baseApiUrl+'faq/create'
		,deleteFaq : baseApiUrl+'faq/delete'
		,detailFaq : baseApiUrl+'faq/detail'
		,updateFaq : baseApiUrl+'faq/update'
		,listFaq : baseApiUrl+'faq/list'
		,getFaqType : baseApiUrl+'faq/type'
		,reorderFaq : baseApiUrl+'faq/update/order'
		/** 금칙어 **/
		,createProhibition : baseApiUrl+'prohibition/create'
		,deleteProhibition : baseApiUrl+'prohibition/delete'
		,listProhibition : baseApiUrl+'prohibition/list'
		/** 1:1 문의 **/
		,answerInquiry : baseApiUrl+'qna/comment'
		,detailInquiry : baseApiUrl+'qna/detail'
		,listInquiry : baseApiUrl+'qna/list'
		,getInquiryType : baseApiUrl+'inquiry/type'
		/** 상품 **/
		,createGift : baseApiUrl+'gift/create'
		,updateGift : baseApiUrl+'gift/update'
		,detailGift : baseApiUrl+'gift/get'
		,deleteGift : baseApiUrl+'gift/delete'
		,listGift : baseApiUrl+'gift/list'
		,reorderGift : baseApiUrl+'gift/sort'
		,listApplyGift : baseApiUrl+'gift/exchange/list'
		,approvalGift : baseApiUrl+'gift/exchange/confirm'
		,rejectGift : baseApiUrl+'gift/exchange/reject'
		,reserveGift : baseApiUrl+'gift/exchange/reservationSend'
		,updateMemoGift : baseApiUrl+'gift/exchange/memo'
		,getBalanceGift : baseApiUrl+'gift/exchange/biz/get'
		,sendGift : baseApiUrl+'gift/exchange/send'
		,listSendGift : baseApiUrl+'gift/exchange/sendList'
		,detailSendGift : baseApiUrl+'gift/exchange/couponDetail'
		,resendGift : baseApiUrl+'gift/exchange/resend'
		/*,refundGift : baseApiUrl+'gift/exchange/cancel'*/
		,dashboardGift : baseApiUrl+'gift/dashboard/payment'
		/** 관리자 **/
		,createAdmin : baseApiUrl+'admin/create'
		,deleteAdmin : baseApiUrl+'admin/delete'
		,listAdmin : baseApiUrl+'admin/list'
		,activeAdmin : baseApiUrl+'admin/active'
		,inactiveAdmin : baseApiUrl+'admin/inactive'
		,approveAdmin : baseApiUrl+'admin/approval'
		/** 관리자 권한 **/
		,createAuth : baseApiUrl+'auth/create'
		,listAuth : baseApiUrl+'auth/list'
		,deleteAuth : baseApiUrl+'auth/delete'
		/** 관리자 권한 별 메뉴 **/
		,setMenuByAuth : baseApiUrl+'auth/set/menu'
		,getMenuByAuth : baseApiUrl+'auth/get/menu'
		/** UCD **/
		,listUsageUcd : baseApiUrl+'ucd/usage/list'
		,listWithdrawUcd : baseApiUrl+'ucd/withdraw/list'
		,listSalesUcd : baseApiUrl+'ucd/sales/list'
		,listCancelUcd : baseApiUrl+'ucd/cancel/list'
		,listChargeUcd : baseApiUrl+'ucd/charge/list'
		,createBizUcd : baseApiUrl+'ucd/create/company'
		,createUserUcd : baseApiUrl+'ucd/create/user'
		,summaryUcd : baseApiUrl+'ucd/dashboard/summary'
		,issuanceUcd : baseApiUrl+'ucd/dashboard/payment'
		,rewardUcd : baseApiUrl+'ucd/dashboard/reward'
		,budgetUcd : baseApiUrl+'ucd/dashboard/promotion'
		,doitCreateUcd : baseApiUrl+'ucd/dashboard/doit'
		,exchangeUcd : baseApiUrl+'ucd/dashboard/exchange'
		,cancelUcd : baseApiUrl+'ucd/dashboard/cancel'
		,listUserWithXlsx : baseApiUrl+'ucd/excel/import'
		/** app version **/
		,createAppVersion : baseApiUrl+'version/create'
		,deleteAppVersion : baseApiUrl+'version/delete'
		,listAppVersion : baseApiUrl+'version/list'
		/** 계정 **/
		,listAccount : baseApiUrl+'admin/account/list'
		/** 로그 대시보드 **/
		,listApiPopular : baseApiUrl+'logdashboard/api/log/popular'
		,listApiUrl : baseApiUrl+'logdashboard/api/log/list'
		,detailApiUrl : baseApiUrl+'logdashboard/api/log/phpDetail'
		/** 엑셀다운로드 **/
		,xlsxOutDoit : baseApiUrl+'excel/download/doit'
		,xlsxOutDoitReview : baseApiUrl+'excel/download/doit_review'
		,xlsxOutPromoDoit : baseApiUrl+'excel/download/promotion_doit'
		,xlsxOutLeaderRank : baseApiUrl+'excel/download/rank_leader'
	}

	const fileUploadBaseUrl = 'https://fileuploader.youcandoo.co.kr/file/upload/';
	const fileApi = {
		single : fileUploadBaseUrl+'single'
		,event : fileUploadBaseUrl+'event'
		,doit : fileUploadBaseUrl+'doit'
		,promotion : fileUploadBaseUrl+'promotion'
	}

	/** page url **/
	const page = {
		listUser : '/user'
		,detailUser : '/user/detail/'

		,listBiz : '/biz'
		,detailBiz : '/biz/detail/'
		,updateBiz : '/biz/update/'

		,listPromo : '/promotion'
		,detailPromo : '/promotion/detail/'
		,updatePromo : '/promotion/update/'

		,listDoit : '/doit'
		,detailDoit : '/doit/detail/'
		,updateDoit : '/doit/update/'
		,listDoitRecommendv2 : '/doit/recommends'
		,updateDoitRecommend : '/doit/recommends/update/'
		,createRecommendDoit : '/doit/recommends/create'
		,listDoitCategory : '/doit/category'
		,detailDoitCategory : '/doit/category/detail/'
		,updateDoitCategory : '/doit/category/update/'
		,listTalk: '/doit/talk'
		,detailTalk: '/doit/talk/detail/'

		,listGift : '/gift'
		,detailGift : '/gift/detail/'
		,updateGift : '/gift/update/'

		,listUcdSales : '/ucd/sales'
		,listUcdUsage : '/ucd/usage'
		,listUcdWithdraw : '/ucd/withdraw'
		,listUcdCharge : '/ucd/charge'
		,listUcdCancel : '/ucd/cancel'

		,listEvent : '/marketing/event'
		,detailEvent : '/marketing/event/detail/'
		,updateEvent : '/marketing/event/update/'

		,createPush : '/marketing/push/create'
		,listPush : '/marketing/push'

		,listPopup : '/marketing/popup'
		,detailPopup : '/marketing/popup/detail/'
		,updatePopup : '/marketing/popup/update/'

		,listNotice : '/service/notice'
		,detailNotice : '/service/notice/detail/'
		,updateNotice : '/service/notice/update/'

		,listFaq : '/service/faq'
		,detailFaq : '/service/faq/detail/'
		,updateFaq : '/service/faq/update/'

		,listInquiry : '/service/inquiry'
		,updateInquiry : '/service/inquiry/update/'
		,detailInquiry : '/service/inquiry/detail/'

		,listProhibition : '/service/prohibition'

		,listAppVersion : '/service/app/version'

		,listAdmin : '/admin'
		,createAdmin : '/admin/create'

		,listAuth : '/admin/auth'

		,detailAccount : '/operate/account/detail/'

		,listApiLog : '/operate/log/api_list'
	}

	const innerIps = ['220.85.113.234'];
	const privateMenus = ['회원', '비즈', 'UCD', 'user', 'biz', 'ucd'];