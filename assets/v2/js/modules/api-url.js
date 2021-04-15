
    const baseApiUrl = 'https://adminapi.youcandoo.co.kr/v3/';
    export const api = {
        getProfile : baseApiUrl + 'admin/get',
        updatePassword : baseApiUrl + 'admin/update',

        memberList : baseApiUrl + 'member/list',
        detailMember : baseApiUrl + 'member/detail',
        memberActionList : baseApiUrl + 'member/action/list',
        levelMemberList : baseApiUrl + 'member/level/list',

        categoryList : baseApiUrl + 'category/list',
        createCategory : baseApiUrl + 'category/create',
        detailCategory : baseApiUrl + 'category/detail',
        reorderCategory : baseApiUrl + 'category/update/sequence',
        deleteCategory : baseApiUrl + 'category/delete',
        updateCategory : baseApiUrl + 'category/update',

        subCategoryList : baseApiUrl + 'subcategory/list',
        createSubCategory : baseApiUrl + 'subcategory/create',
        deleteSubCategory : baseApiUrl + 'subcategory/delete',
        reorderSubCategory : baseApiUrl + 'subcategory/update/sequence',

        keywordList : baseApiUrl + 'keyword/get/list',
        createKeyword : baseApiUrl + 'keyword/create',

        doitSponsorList : baseApiUrl + 'doit/get/company',
        doitList : baseApiUrl + 'doit/list',
        createDoit : baseApiUrl + 'doit/create',
        detailDoit : baseApiUrl + 'doit/detail',
        updateDoit : baseApiUrl + 'doit/update',
        deleteDoit : baseApiUrl + 'doit/delete',
        openDoit : baseApiUrl + 'doit/set/open',
        stopDoit : baseApiUrl + 'doit/set/stop',

        missionList : baseApiUrl + 'mission/get/list',
        createMission : baseApiUrl + 'mission/create',
        detailMission : baseApiUrl + 'mission/get/detail/info',
        updateMission : baseApiUrl + 'mission/update',
        deleteMission : baseApiUrl + 'mission/delete',

        joinMemberList : baseApiUrl + 'member/get/list',
        infoJoinMember : baseApiUrl + 'member/get/profile',
        countMember : baseApiUrl + 'member/get/count',
        banMember : baseApiUrl + 'member/set/retire',
        applyMemberList : baseApiUrl + 'member/get/applylist',

        actionList : baseApiUrl + 'action/get/list',
        detailAction : baseApiUrl + 'action/get/detail/info',
        sendWarning : baseApiUrl + 'action/set/yellow',
        actionCommentList : baseApiUrl + 'action/get/commentList',
        createActionComment : baseApiUrl + 'action/set/insertComment',
        deleteActionComment : baseApiUrl + 'action/set/deleteComment',

        talkList : baseApiUrl + 'talk',
        detailTalk : baseApiUrl + 'talk/detail',

        pickList : baseApiUrl + 'recommend/list',
        previewList : baseApiUrl + 'recommend/get/doit',
        searchDoitList : baseApiUrl + 'recommend/get/doit/list',
        reorderPick : baseApiUrl + 'recommend/set',
        createPick : baseApiUrl + 'recommend/create',
        updatePick : baseApiUrl + 'recommend/update',
        detailPick : baseApiUrl + 'recommend/detail',

        bizList : baseApiUrl + 'biz/get/list',
        createBiz : baseApiUrl + 'biz/create',
        detailBiz : baseApiUrl + 'biz/get/detail/info',
        updateBiz : baseApiUrl + 'biz/update',
        createBizUcd : baseApiUrl + 'biz/set/ucd/increment',

        noticeList : baseApiUrl + 'notice/list',
        createNotice : baseApiUrl + 'notice/create',
        detailNotice : baseApiUrl + 'notice/detail',
        updateNotice : baseApiUrl + 'notice/update',
        deleteNotice : baseApiUrl + 'notice/delete',
        topNotice : baseApiUrl + 'notice/top',

        faqList : baseApiUrl + 'faq/list',
        createFaq : baseApiUrl + 'faq/create',
        detailFaq : baseApiUrl + 'faq/detail',
        updateFaq : baseApiUrl + 'faq/update',
        deleteFaq : baseApiUrl + 'faq/delete',

        inquiryList : baseApiUrl + 'inquiry/list',
        createInquiry : baseApiUrl + 'inquiry/create',
        detailInquiry : baseApiUrl + 'inquiry/detail',
        updateInquiry : baseApiUrl + 'inquiry/update',

        prohibitionList : baseApiUrl + 'prohibition',
        createProhibition : baseApiUrl + 'prohibition/create',
        deleteProhibition : baseApiUrl + 'prohibition/delete',

        bannerList : baseApiUrl + 'banner/get/list',
        createBanner : baseApiUrl + 'banner/create',
        detailBanner : baseApiUrl + 'banner/get/detail/info',
        updateBanner : baseApiUrl + 'banner/update',
        /*deleteBanner : baseApiUrl + 'banner/delete',*/
        reorderBanner : baseApiUrl + 'banner/set/orders',
        targetEventList : baseApiUrl + 'banner/get/doit/list',
        targetDoitList : baseApiUrl + 'banner/get/doit/list',
        targetNoticeList : baseApiUrl + 'banner/get/doit/list',

        storyList : baseApiUrl + 'story/get/list',
        createStory : baseApiUrl + 'story/create',
        detailStory : baseApiUrl + 'story/get/detail/info',
        updateStory : baseApiUrl + 'story/update',
        /*deleteStory : baseApiUrl + 'story/delete',*/
        reorderStory : baseApiUrl + 'story/set/orders',

        eventList : baseApiUrl + 'event/list',
        createEvent : baseApiUrl + 'event/create',
        detailEvent : baseApiUrl + 'event/detail',
        updateEvent : baseApiUrl + 'event/update',

        pushList : baseApiUrl + 'push',
        createPush : baseApiUrl + 'push/create',

        popupList : baseApiUrl + 'popup',
        createPopup : baseApiUrl + 'popup/create',
        detailPopup : baseApiUrl + 'popup/detail',

        errorList : baseApiUrl + 'error/list',
        updateError : baseApiUrl + 'error/update',

        ucdChargeList : baseApiUrl + 'ucd/charge/list',
        createMemberUcd : baseApiUrl + 'ucd/charge/create',
        getMember : baseApiUrl + '',
        getMemberFromXlsx : baseApiUrl + '',
        systemWalletList : baseApiUrl + 'ucd/system/list',
        doitWalletList : baseApiUrl + 'ucd/doit/list',
        memberWalletList : baseApiUrl + 'ucd/member/list',
        pendingWalletList : baseApiUrl + 'ucd/pending/list',

        giftList : baseApiUrl + 'gift/list',
        createGift : baseApiUrl + 'gift/create',
        detailGift : baseApiUrl + 'gift/detail',
        updateGift : baseApiUrl + 'gift/update',
        deleteGift : baseApiUrl + 'gift/delete',
        applyGiftList : baseApiUrl + 'gift/list',

        adminList : baseApiUrl + 'admin/list',
        detailAdmin : baseApiUrl + 'admin/detail',
        updateAdmin : baseApiUrl + 'admin/update',
        deleteAdmin : baseApiUrl + 'admin/delete',
        authList : baseApiUrl + 'auth/list',
        createAuth : baseApiUrl + 'auth/list',
        deleteAuth : baseApiUrl + 'auth/delete',
    }

    const fileUploadBaseUrl = 'https://fileuploader.youcandoo.co.kr/file/upload/';
    export const fileApi = {
        single : fileUploadBaseUrl+'single'
        ,event : fileUploadBaseUrl+'event'
        ,doit : fileUploadBaseUrl+'doit'
        ,promotion : fileUploadBaseUrl+'promotion'
    }

    const fileUploadBaseUrlV2 = 'https://adminupload.youcandoo.co.kr/file/upload/';
    export const fileApiV2 = {
        single : fileUploadBaseUrlV2+'single'
        ,multi : fileUploadBaseUrlV2+'multi'
        ,event : fileUploadBaseUrlV2+'event'
        ,mission : fileUploadBaseUrlV2+'mission'
    }