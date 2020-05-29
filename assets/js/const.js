
	const message = {
		emptyId : '아이디를 입력해주세요.'
		,emptyPassword : '비밀번호를 입력해주세요.'
		,emptyList : '조회된 목록이 없습니다.'
		,searching : '검색 중..'
		,create : '등록하시겠습니까?'
		,modify : '수정하시겠습니까?'
		,delete : '삭제하시겠습니까?'
		,change : '변경하시겠습니까?'
		,input : '입력해주세요.'
		,required : '필수항목입니다.'
		,notEqual : '일치하지 않습니다.'
		,invalidFile : '지원하지 않는 파일 형식입니다.'
		,doubleChk : '확인해주세요.'
		,select : '선택해주세요.'
		,needMore : '추가해주세요.'
		,maxAddFive : '최대 5개까지 등록 가능합니다.'
		,maxAddFour : '최대 4개까지 등록 가능합니다.'
		,maxAddThree : '최대 3개까지 등록 가능합니다.'
		,createReward : '리워드 조건을 생성해주세요'
		,deleteTop : '상단고정을 해제하시겠습니까?'
		,insertTop : '상단고정을 설정하시겠습니까?'
		,overCntTop : '상단고정은 최대 3개까지 설정할 수 있습니다.'
		,compareActionTime: '인증시작시간은 인증종료시간 이전으로 설정해야 합니다.'
		,onlyAlphabet: '영문만 입력할 수 있습니다.'
		,ajaxError: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
		,compareMinMaxUser: '최소인원은 최대인원을 초과할 수 없습니다.'
		,completePost: '이미 답변이 등록된 문의 글입니다. 상세페이지로 이동합니다.'
		,overBudget: '총 UCD는 프로모션 예산을 초과할 수 없습니다.'
		,overDuration: '인증기간은 프로모션 기간을 초과할 수 없습니다.'
		,minimumPassCode: '참가코드는 최소 4자리 이상 입력해야 합니다.'
	}

	const headers = { "Authorization" : "9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7" };
	const baseApiUrl = 'https://api.youcandoo.co.kr/v1.0/admin/';
	const api = {
		listBizName : baseApiUrl+'keyword/getCompanyName'
		,getProfile : baseApiUrl+'admin/get'
		,updateProfile : baseApiUrl+'admin/update/pwd'

		,listUser : baseApiUrl+'user/list'
		,inactiveUser : baseApiUrl+'user/inactive'

		,createBiz : baseApiUrl+'biz/create'
		,deleteBiz : ''
		,updateBiz : ''
		,listBiz : baseApiUrl+'biz/list'

		,createPromotion : baseApiUrl+'promotion/create'
		,detailPromotion : baseApiUrl+'promotion/getPromotion'
		,involveDoitPromotion : baseApiUrl+'promotion/getDoit'
		,updatePromotion : baseApiUrl+''
		,listPromotion : baseApiUrl+'promotion/list'

		,createDoit : baseApiUrl+'doit/create'
		,detailDoit : baseApiUrl+'doit/detail'
		,updateDoit : baseApiUrl+''
		,listDoit : baseApiUrl+'doit/list'
		,involvePromotion : baseApiUrl+'promotion/getCompanyPromotion'
		,involveReward : baseApiUrl+'promotion/getPromotionReward'
		,selectReward : baseApiUrl+'promotion/getReward'
		,involveAction : baseApiUrl+'doit/get/action'

		,createNotice : baseApiUrl+'notice/create'
		,detailNotice : baseApiUrl+'notice/detail'
		,updateNotice : ''
		,listNotice : baseApiUrl+'notice/list'
		,topNotice : baseApiUrl+'notice/changeTop'
		,createEvent : baseApiUrl+'event/create'
		,detailEvent : baseApiUrl+'event/detail'
		,updateEvent : ''
		,listEvent : baseApiUrl+'event/list'
		,createFaq : baseApiUrl+'faq/create'
		,detailFaq : baseApiUrl+'faq/detail'
		,updateFaq : ''
		,getFaqType : baseApiUrl+'faq/type'
		,listFaq : baseApiUrl+'faq/list'
		,commentQna : baseApiUrl+'qna/comment'
		,detailQna : baseApiUrl+'qna/detail'
		,listQna : baseApiUrl+'qna/list'
		,getQnaType : baseApiUrl+'qna/type'
		,createProhibition : baseApiUrl+'prohibition/create'
		,deleteProhibition : baseApiUrl+'prohibition/delete'
		,updateProhibition : baseApiUrl+''
		,listProhibition : baseApiUrl+'prohibition/list'

		,createAdmin : baseApiUrl+'admin/create'
		,deleteAdmin : baseApiUrl+'admin/delete'
		,listAdmin : baseApiUrl+'admin/list'
		,activeAdmin : baseApiUrl+'admin/active'
		,inactiveAdmin : baseApiUrl+'admin/inactive'
		,createAdminAuth : baseApiUrl+'auth/create'
		,deleteAdminAuth : baseApiUrl+'auth/delete'
		,updateAdminAuth : baseApiUrl+'auth/update'
		,listAdminAuth : baseApiUrl+'auth/list'
		,setAdminAuth : baseApiUrl+'auth/set/menu'
		,getAdminAuth : baseApiUrl+'auth/get/menu'
	}

	const label = {
		createDoitUser : '사용자 두잇 개설 허용'
		,createDoitAdmin : '기업만 두잇 개설 허용'
		,exposure : '노출'
		,unexpose : '비노출'
		,regular : '일반'
		,promotion : '프로모션'
		,image : '사진'
		,video : '영상'
		,voice : '음성'
		,previous : '<i class="fas fa-angle-double-left"></i>'
		,next : '<i class="fas fa-angle-double-right"></i>'
		,memo : '<i class="fas fa-thumbtack"></i>'
	}

	const page = {
		listUser : '/user/lists'

		,listBiz : '/biz/lists'
		,createBiz : '/biz/create'

		,listPromo : '/pro/lists'
		,createPromo : '/pro/create'
		,detailPromo : '/pro/detail/'
		,updatePromo : '/pro/update/'

		,createDoit : '/doit/create'
		,listDoit : '/doit/lists'
		,detailDoit : '/doit/detail/'
		,updateDoit : '/doit/update/'

		,listNotice : '/service/notice/list'
		,createNotice : '/service/notice/create'
		,detailNotice : '/service/notice/detail/'
		,updateNotice : '/service/notice/update/'
		,listEvent : '/service/event/list'
		,createEvent : '/service/event/create'
		,detailEvent : '/service/event/detail/'
		,updateEvent : '/service/event/update/'
		,listFaq : '/service/faq/list'
		,createFaq : '/service/faq/create'
		,detailFaq : '/service/faq/detail/'
		,updateFaq : '/service/faq/update/'
		,listInquiry : '/service/inquiry/list'
		,commentInquiry : '/service/inquiry/update/'
		,detailInquiry : '/service/inquiry/detail/'
		,listProhibition : '/service/prohibition'

		,listAdmin : '/admin/lists'
		,createAdmin : '/admin/create'

		,listAuth : '/admin/auth'
	}
