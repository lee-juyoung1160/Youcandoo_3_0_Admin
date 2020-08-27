
	const message = {
		accessDenied : '페이지 접근권한없음. 메인페이지로 이동합니다.'
		,emptyId : '아이디를 입력해주세요.'
		,emptyPassword : '비밀번호를 입력해주세요.'
		,emptyList : '조회된 목록이 없습니다.'
		,searching : '검색 중..'
		,create : '등록하시겠습니까?'
		,modify : '수정하시겠습니까?'
		,delete : '삭제하시겠습니까?'
		,change : '변경하시겠습니까?'
		,cancel : '취소하시겠습니까?'
		,send : '발송하시겠습니까?'
		,input : '입력해주세요.'
		,doubleChk : '확인해주세요.'
		,select : '선택해주세요.'
		,addOn : '추가해주세요.'
		,required : '필수항목입니다.'
		,notEqual : '일치하지 않습니다.'
		,invalidFile : '지원하지 않는 파일 형식입니다.'
		,invalidBrowser: '지원하지 않는 브라우져입니다.'
		,maxJoinPromo : '최대 5회까지 등록 가능합니다.'
		,maxAddFive : '최대 5개까지 등록 가능합니다.'
		,maxAddFour : '최대 4개까지 등록 가능합니다.'
		,maxAddThree : '최대 3개까지 등록 가능합니다.'
		,maxAvailableBizUcd : '최대 1억 UCD까지 가능합니다.'
		,maxAvailableUserUcd : '최대 1백만 UCD까지 가능합니다.'
		,createReward : '리워드 조건을 생성해주세요'
		,deleteTop : '상단고정을 해제하시겠습니까?'
		,insertTop : '상단고정을 설정하시겠습니까?'
		,overCntTop : '상단고정은 최대 3개까지 설정할 수 있습니다.'
		,compareActionTime: '인증시작시간은 인증종료시간 이전으로 설정해야 합니다.'
		,onlyAlphabet: '영문만 입력할 수 있습니다.'
		,ajaxError: ` 처리 중, 일시적인 오류가 발생했습니다.
					잠시 후 다시 시도해주세요.`
		,ajaxLoadError: `을(를) 불러올 수 없습니다.
						잠시 후 다시 시도해주세요.`
		,compareMinMaxUser: '최소인원은 최대인원을 초과할 수 없습니다.'
		,completePost: '이미 답변이 등록된 문의 글입니다. 상세페이지로 이동합니다.'
		,overBudget: '총 UCD는 프로모션 예산을 초과할 수 없습니다.'
		,overBalance: '보유 UCD를 초과할 수 없습니다.'
		,overBalanceWithdraw: `보유 UCD가 출금(취소) UCD보다 작은 사용자가 포함돼있습니다.
								해당 사용자 삭제 후 다시 시도해주세요.`
		,invalidDuration: '인증기간은 최소 7일, 최대 30일까지 입력 가능합니다.'
		,overFrequency: '인증기간을 초과해 선택할 수 없습니다.'
		,overTotalBalance : '기업이 보유한 총 UCD를 초과할 수 없습니다.'
		,minOverMax : '참여자 수 최소값은 참여자 수 최대값을 초과할 수 없습니다.'
		,minimumPassCode: '참가코드는 네 자릿수를 입력해야 합니다.'
		,minimumChecked: '최소 하나 이상의 값을 선택해야 합니다.'
		,promotionNotice1: '프로모션 두잇은 동시에 최대 3개까지 참여 가능합니다.'
		,promotionNotice2: '프로모션 기간이 종료되면 두잇을 개설할 수 없습니다.'
		,promotionNotice3: '프로모션 예산이 모두 소진된 경우 두잇을 개설할 수 없습니다.'
		,cantUpdatePromo: `프로모션을 수정할 수 없습니다.
							목록으로 이동합니다.
							(프로모션 상태가 대기 또는 진행 중일 경우 수정가능)`
		,cantUpdateDoit: `두잇을 수정할 수 없습니다.
							상세페이지로 이동합니다.
							(두잇 상태가 모집 중일 경우 수정가능)`
		,cantUpdateUserDoit: '일반두잇은 수정할 수 없습니다. 상세페이지로 이동합니다.'
		,cantDeleteDoit: '진행상태 : 모집중 / 참여인원 : 0명인 두잇만 삭제할 수 있습니다.'
		,alreadyHasYellow: `이미 옐로카드를 받은 인증이 포함돼 있습니다.
							해당 게시물 체크 해제 후 다시 시도해주세요.`
		,notEnoughBudget: `프로모션 예산이 부족해 두잇을 개설할 수 없습니다.
							기업 또는 프로모션을 다시 선택해주세요.`
		,alreadyHasUser: `이미 추가된 회원이 포함돼 있습니다.
							해당 회원을 체크 해제 후 다시 시도해주세요.`
		,pushHasBeenSent: '선택한 푸시는 이미 발송됐습니다. 발송된 푸시는 취소할 수 없습니다.'
		,moveToCreatePush: '푸시 알림을 등록하시겠습니까?'
	}

	const label = {
		list: '목록'
		, submit: '등록'
		, modify: '수정'
		, delete: '삭제'
		, cancel: '취소'
		, confirm: '확인'
		, pending: '대기'
		, progress: '진행'
		, end: '마감'
		, terminate: '종료'
		, success: '성공'
		, fail: '실패'
		, y: 'Y'
		, n: 'N'
		, nullValue: '-'
		, tilde: '~'
		, slash: '/'
		, lineBreak: '\n'
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
		, biz: '기업'
		, image: '사진'
		, video: '영상'
		, voice: '음성'
		, detailContent: '상세 내용'
		, download: '다운로드'
		, average: '평균'
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
	}

	/** api url **/
	const headers = { "Authorization" : "9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7" };
	const baseApiUrl = 'https://api.youcandoo.co.kr/v1.0/admin/';
	const api = {
		/** 공통 **/
		getBizName : baseApiUrl+'keyword/getCompanyName'
		,getNickname : baseApiUrl+'user/getNickname'
		,getBalance : baseApiUrl+'ucd/status/company'
		/** 대시보드 **/
		,getDoitStat : baseApiUrl+'dashboard/doit/status'
		,getUserStat : baseApiUrl+'dashboard/user/status'
		,getUcdStat : baseApiUrl+'dashboard/ucd'
		,getMonthlyDoit : baseApiUrl+'dashboard/doit/month'
		,getDailyAction : baseApiUrl+'dashboard/action/date'
		,getUserStatus : baseApiUrl+'dashboard/v2/doit/user'
		,getDoitOpenStatus : baseApiUrl+'dashboard/v2/doit/establish'
		,getReportStatus : baseApiUrl+'dashboard/v2/doit/report'
		,getDailyActions : baseApiUrl+'dashboard/v2/doit/action'
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
		,listUserUcd : baseApiUrl+'user/get/ucd/history'
		,listUserOpened : baseApiUrl+'user/get/doit/create'
		,listUserJoined : baseApiUrl+'user/get/doit/join'
		,listDevice : baseApiUrl+'user/get/device'
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
		,deletePromotion : baseApiUrl+'promotion/delete'
		,detailPromotion : baseApiUrl+'promotion/getPromotion'
		,involveDoitPromotion : baseApiUrl+'promotion/getDoit'
		,updatePromotion : baseApiUrl+'promotion/update'
		,listPromotion : baseApiUrl+'promotion/list'
		,listPromotionUcd : baseApiUrl+'promotion/get/ucd'
		,listBanner : baseApiUrl+'promotion/banner/getExposure'
		,listNonBanner : baseApiUrl+'promotion/banner/getNonExposure'
		,updateBanner : baseApiUrl+'promotion/banner/set'
		/** 두잇 **/
		,createDoit : baseApiUrl+'doit/create'
		,deleteDoit : baseApiUrl+'doit/delete'
		,detailDoit : baseApiUrl+'doit/detail'
		,updateDoit : baseApiUrl+'doit/update'
		,listDoit : baseApiUrl+'doit/list'
		,involvePromotion : baseApiUrl+'promotion/getCompanyPromotion'
		,involveReward : baseApiUrl+'promotion/getPromotionReward'
		,getReward : baseApiUrl+'promotion/getReward'
		,listJoinMember : baseApiUrl+'doit/get/member'
		,totalJoinMember : baseApiUrl+'doit/get/member/total'
		,listDoitUcd : baseApiUrl+'doit/get/ucd'
		,listDoitTalk : baseApiUrl+'doit/board/list'
		,updateBlindTalk : baseApiUrl+'doit/board/set/blind'
		,listDoitRecommend : baseApiUrl+'doit/recommend/list'
		,listDoitNonRecommend : baseApiUrl+'doit/recommend/doit'
		,updateDoitRecommend : baseApiUrl+'doit/recommend/set'
		,updateDoitCategory : baseApiUrl+'doit/set/category'
		/** 인증 **/
		,listAction : baseApiUrl+'action/list'
		,setYellow : baseApiUrl+'action/set/yellow'
		,setRed : baseApiUrl+'action/set/red'
		,cancelYellow : baseApiUrl+'action/cancel/yellow'
		,cancelRed : baseApiUrl+'action/cancel/red'
		/** 리뷰 **/
		,listReview : baseApiUrl+'review/list'
		,updateBlind : baseApiUrl+'review/update'
		/** 이벤트 **/
		,createEvent : baseApiUrl+'event/create'
		,deleteEvent : baseApiUrl+'event/delete'
		,detailEvent : baseApiUrl+'event/detail'
		,listEvent : baseApiUrl+'event/list'
		,getEventType : baseApiUrl+'event/type'
		/** 푸시 **/
		,createPush : baseApiUrl+'push/register'
		,listPush : baseApiUrl+'push/list'
		,cancelPush : baseApiUrl+'push/cancel'
		,listPushTargetUser : baseApiUrl+'push/user'
		,listPushTargetPage : baseApiUrl+'push/event'
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
		/** 금칙어 **/
		,createProhibition : baseApiUrl+'prohibition/create'
		,deleteProhibition : baseApiUrl+'prohibition/delete'
		,listProhibition : baseApiUrl+'prohibition/list'
		/** QNA **/
		/*,commentQna : baseApiUrl+'qna/comment'
		,detailQna : baseApiUrl+'qna/detail'
		,listQna : baseApiUrl+'qna/list'
		,getQnaType : baseApiUrl+'qna/type'*/
		/** 관리자 **/
		,createAdmin : baseApiUrl+'admin/create'
		,deleteAdmin : baseApiUrl+'admin/delete'
		,listAdmin : baseApiUrl+'admin/list'
		,activeAdmin : baseApiUrl+'admin/active'
		,inactiveAdmin : baseApiUrl+'admin/inactive'
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
		/** app version **/
		,createAppVersion : baseApiUrl+'version/create'
		,deleteAppVersion : baseApiUrl+'version/delete'
		,listAppVersion : baseApiUrl+'version/list'
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

		,listUcdSales : '/ucd/sales'
		,listUcdUsage : '/ucd/usage'
		,listUcdWithdraw : '/ucd/withdraw'
		,listUcdCharge : '/ucd/charge'
		,listUcdCancel : '/ucd/cancel'

		,listEvent : '/marketing/event'
		,detailEvent : '/marketing/event/detail/'

		,createPush : '/marketing/push/create'
		,listPush : '/marketing/push'

		,listNotice : '/service/notice'
		,detailNotice : '/service/notice/detail/'
		,updateNotice : '/service/notice/update/'

		,listFaq : '/service/faq'
		,detailFaq : '/service/faq/detail/'
		,updateFaq : '/service/faq/update/'

		,listInquiry : '/service/inquiry'
		,commentInquiry : '/service/inquiry/update/'
		,detailInquiry : '/service/inquiry/detail/'

		,listProhibition : '/service/prohibition'

		,listAppVersion : '/service/app/version'

		,listAdmin : '/admin'
		,createAdmin : '/admin/create'

		,listAuth : '/admin/auth'
	}

	const innerIps = ['220.85.113.234'];
	const privateMenus = ['회원', '비즈', 'UCD', 'user', 'biz', 'ucd'];