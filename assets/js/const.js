
	const message = {
		emptyId : '아이디를 입력해주세요.'
		,emptyPassword : '비밀번호를 입력해주세요.'
		,emptyList : '조회된 목록이 없습니다.'
		,searching : '검색 중..'
		,create : '등록하시겠습니까?'
		,modify : '수정하시겠습니까?'
		,delete : '삭제하시겠습니까?'
		,input : '입력해주세요.'
		,required : '필수항목입니다.'
		,notEqual : '일치하지 않습니다.'
		,invalidFile : '지원하지 않는 파일 형식입니다.'
		,doubleChk : '확인해주세요.'
		,select : '선택해주세요.'
		,needMore : '추가해주세요.'
		,maxReward : '최대 5개까지 등록 가능합니다.'
		,maxTag : '최대 5개까지 등록 가능합니다.'
		,maxNotice : '최대 4개까지 등록 가능합니다.'
		,createReward : '리워드 조건을 생성해주세요'
		,deleteTop : '상단고정을 해제하시겠습니까?'
		,insertTop : '상단고정을 설정하시겠습니까?'
		,overCntTop : '상단고정은 최대 3개까지 설정할 수 있습니다.'
		,compareActionTime: '인증시작시간은 인증종료시간 이전으로 설정해야 합니다.'
		,onlyAlphabet: '영문만 입력할 수 있습니다.'
		,cantLoadList: '목록을 불러오지 못했습니다. 관리자에게 문의하세요.'
		,compareMinMaxUser: '최소인원은 최대인원을 초과할 수 없습니다.'
	}

	const headers = { "Authorization" : "9c3a60d74726c4e1cc0732fd280c89dbf80a344e7c3dc2c4ad4fdf12b97e52c7" };
	const baseApiUrl = 'https://api.youcandoo.co.kr/v1.0/admin/';
	const api = {
		listBizName : baseApiUrl+'keyword/getCompanyName'
		,getProfile : baseApiUrl+'admin/get'
		,updateProfile : baseApiUrl+'admin/update/pwd'
		,createAdmin : baseApiUrl+'admin/create'
		,deleteAdmin : baseApiUrl+'admin/delete'
		,listAdmin : baseApiUrl+'admin/list'
		,createAdminAuth : baseApiUrl+'auth/create'
		,deleteAdminAuth : baseApiUrl+'auth/delete'
		,updateAdminAuth : baseApiUrl+'auth/update'
		,listAdminAuth : baseApiUrl+'auth/list'
		,setAdminAuth : baseApiUrl+'auth/set/menu'
		,getAdminAuth : baseApiUrl+'auth/get/menu'
		,createBiz : baseApiUrl+'biz/create'
		,deleteBiz : ''
		,updateBiz : ''
		,listBiz : baseApiUrl+'biz/list'
		,createEvent : baseApiUrl+'event/create'
		,detailEvent : baseApiUrl+'event/detail'
		,updateEvent : ''
		,listEvent : baseApiUrl+'event/list'
		,createFaq : baseApiUrl+'faq/create'
		,detailFaq : baseApiUrl+'faq/detail'
		,updateFaq : ''
		,listFaq : baseApiUrl+'faq/list'
		,createNotice : baseApiUrl+'notice/create'
		,detailNotice : baseApiUrl+'notice/detail'
		,updateNotice : ''
		,listNotice : baseApiUrl+'notice/list'
		,topNotice : baseApiUrl+'notice/changeTop'
		,commentQna : baseApiUrl+'qna/comment'
		,detailQna : baseApiUrl+'qna/detail'
		,listQna : baseApiUrl+'qna/list'
		,getQnaType : baseApiUrl+'qna/type'
		,createPromotion : baseApiUrl+'promotion/create'
		,detailPromotion : baseApiUrl+'promotion/getPromotion'
		,involveDoitPromotion : baseApiUrl+'promotion/getDoit'
		,updatePromotion : baseApiUrl+''
		,listPromotion : baseApiUrl+''
		,listUser : baseApiUrl+'user/list'
		,createProhibition : baseApiUrl+'prohibition/create'
		,deleteProhibition : baseApiUrl+'prohibition/delete'
		,updateProhibition : baseApiUrl+''
		,listProhibition : baseApiUrl+'prohibition/list'
		,createDoit : baseApiUrl+'doit/create'
		,detailDoit : baseApiUrl+''
		,updateDoit : baseApiUrl+''
		,listDoit : baseApiUrl+''
		,involvePromotion : baseApiUrl+'promotion/getCompanyPromotion'
		,involveReward : baseApiUrl+'promotion/getPromotionReward'
		,selectReward : baseApiUrl+'promotion/getReward'
	}

	const label = {
		createDoitUser : '사용자 두잇 개설 허용'
		,createDoitAdmin : '기업만 두잇 개설 허용'
		,exposure : '노출'
		,unexpose : '비노출'
		,previous : '<i class="fas fa-angle-double-left"></i>'
		,next : '<i class="fas fa-angle-double-right"></i>'
	}
