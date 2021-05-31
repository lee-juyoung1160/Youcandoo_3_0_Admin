
    const baseApiUrl = 'https://adminapi.youcandoo.co.kr/v3/';
    export const api = {
        saveUserUcdBySystem : baseApiUrl + 'ucd/set/charge/user/system',
        saveUserUcdByBiz : baseApiUrl + 'ucd/set/charge/user/company',
        saveDoitUcdBySystem : baseApiUrl + 'ucd/set/charge/doit/system',
        saveDoitUcdByBiz : baseApiUrl + 'ucd/set/charge/doit/company',
        saveBizUcd : baseApiUrl + 'ucd/set/charge/company/system',

        getProfile : baseApiUrl + 'admin/get',
        updatePassword : baseApiUrl + 'admin/update',

        memberList : baseApiUrl + 'profile/get/list',
        detailMember : baseApiUrl + 'profile/get/detail/info',
        levelUp : baseApiUrl + 'profile/set/levelUp',
        levelDown : baseApiUrl + 'profile/set/levelDown',
        cancelPartner : baseApiUrl + 'profile/set/releasePartner',
        levelInfo : baseApiUrl + 'profile/get/level',
        levelHistory : baseApiUrl + 'profile/get/level/history',
        deviceInfo : baseApiUrl + 'profile/get/device/info',
        memberDoitList : baseApiUrl + 'profile/get/doit',
        memberCategoryList : baseApiUrl + 'profile/get/category',
        memberActionList : baseApiUrl + 'profile/get/action',
        memberActionDetail : baseApiUrl + 'profile/get/detail/action',
        countPerLevel : baseApiUrl + 'level/get/count',
        memberLevelList : baseApiUrl + 'level/get/list',

        badgeList : baseApiUrl + 'badge/get/list',
        createBadge : baseApiUrl + 'badge/create',
        detailBadge : baseApiUrl + 'badge/get/detail/info',
        deleteBadge : baseApiUrl + 'badge/delete',
        updateBadge : baseApiUrl + 'badge/update',

        categoryList : baseApiUrl + 'category/list',
        createCategory : baseApiUrl + 'category/create',
        detailCategory : baseApiUrl + 'category/detail',
        reorderCategory : baseApiUrl + 'category/update/sequence',
        deleteCategory : baseApiUrl + 'category/delete',
        updateCategory : baseApiUrl + 'category/update',

        subCategoryList : baseApiUrl + 'subcategory/list',
        createSubCategory : baseApiUrl + 'subcategory/create',
        updateSubCategoryDoitImg : baseApiUrl + 'subcategory/set/doit/image',
        deleteSubCategory : baseApiUrl + 'subcategory/delete',
        reorderSubCategory : baseApiUrl + 'subcategory/update/sequence',

        keywordList : baseApiUrl + 'keyword/get/list',
        createKeyword : baseApiUrl + 'keyword/create',

        doitSponsorList : baseApiUrl + 'doit/get/company',
        doitList : baseApiUrl + 'doit/list',
        createDoit : baseApiUrl + 'doit/create',
        createDoitCategoryList : baseApiUrl + 'category/exposure/list',
        detailDoit : baseApiUrl + 'doit/detail',
        updateDoit : baseApiUrl + 'doit/update',
        deleteDoit : baseApiUrl + 'doit/delete',
        openDoit : baseApiUrl + 'doit/set/open',
        stopDoit : baseApiUrl + 'doit/set/stop',
        getDoitUcd : baseApiUrl + 'ucd/get/doit',
        getUcdDoitList : baseApiUrl + 'ucd/get/doit/list',

        missionList : baseApiUrl + 'mission/get/list',
        createMission : baseApiUrl + 'mission/create',
        detailMission : baseApiUrl + 'mission/get/detail/info',
        updateMission : baseApiUrl + 'mission/update',
        deleteMission : baseApiUrl + 'mission/delete',

        joinMemberList : baseApiUrl + 'member/get/list',
        infoJoinMember : baseApiUrl + 'member/get/profile',
        rewardMemberList : baseApiUrl + 'ucd/get/reward/profile',
        createReward : baseApiUrl + 'ucd/set/reward/profile',
        countMember : baseApiUrl + 'member/get/count',
        banMember : baseApiUrl + 'member/set/retire',
        applyMemberList : baseApiUrl + 'member/get/applylist',

        actionList : baseApiUrl + 'action/get/list',
        detailAction : baseApiUrl + 'action/get/detail/info',
        sendWarning : baseApiUrl + 'action/set/yellow',
        cancelWarning : baseApiUrl + 'action/set/yellowCancel',
        actionCommentList : baseApiUrl + 'action/get/commentList',
        createActionComment : baseApiUrl + 'action/set/insertComment',
        deleteActionComment : baseApiUrl + 'action/set/deleteComment',

        talkList : baseApiUrl + 'board/get/list',
        createTalk: baseApiUrl + 'board/create',
        detailTalk : baseApiUrl + 'board/get/detail/info',
        updateTalk : baseApiUrl + 'board/update',
        deleteTAlk : baseApiUrl + 'board/delete',
        talkCommentList : baseApiUrl + 'board/get/commentList',
        createTalkComment : baseApiUrl + 'board/set/insertComment',
        deleteTalkComment : baseApiUrl + 'board/set/deleteComment',

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
        bizDoitList : baseApiUrl + 'biz/get/detail/doit',
        bizUcdList : baseApiUrl + 'ucd/list/get/company',
        updateBiz : baseApiUrl + 'biz/update',
        getBizUcd : baseApiUrl + 'ucd/get/company',

        noticeList : baseApiUrl + 'notice/get/list',
        createNotice : baseApiUrl + 'notice/create',
        detailNotice : baseApiUrl + 'notice/get/detail/info',
        updateNotice : baseApiUrl + 'notice/update',
        deleteNotice : baseApiUrl + 'notice/delete',

        faqList : baseApiUrl + 'faq/get/list',
        createFaq : baseApiUrl + 'faq/create',
        detailFaq : baseApiUrl + 'faq/get/detail/info',
        updateFaq : baseApiUrl + 'faq/update',
        deleteFaq : baseApiUrl + 'faq/delete',
        reorderFaq : baseApiUrl + 'faq/set/orders',

        inquiryList : baseApiUrl + 'qna/get/list',
        updateInquiry : baseApiUrl + 'qna/set/insertComment',
        detailInquiry : baseApiUrl + 'qna/get/detail/info',

        reportActionList : baseApiUrl + 'report/get/action/list',
        actionReportReasonList : baseApiUrl + 'report/get/action/descriptionList',

        reportTalkList : baseApiUrl + 'report/get/board/list',
        talkReportReasonList : baseApiUrl + 'report/get/board/descriptionList',
        blindTalk : baseApiUrl + 'report/set/blind',

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

        eventList : baseApiUrl + 'event/get/list',
        createEvent : baseApiUrl + 'event/create',
        detailEvent : baseApiUrl + 'event/get/detail/info',
        deleteEvent : baseApiUrl + 'event/delete',
        updateEvent : baseApiUrl + 'event/update',

        pushList : baseApiUrl + 'push',
        createPush : baseApiUrl + 'push/create',

        popupList : baseApiUrl + 'popup',
        createPopup : baseApiUrl + 'popup/create',
        detailPopup : baseApiUrl + 'popup/detail',

        errorList : baseApiUrl + 'error/list',
        updateError : baseApiUrl + 'error/update',

        createEncryption : baseApiUrl + 'operate/set/encryption',
        createDecryption : baseApiUrl + 'operate/set/decryption',

        getMemberForSaveUcd : baseApiUrl + 'ucd/get/user/list',
        getMemberFromXlsx : baseApiUrl + 'excel/import/profile',
        getDoitFromXlsx : baseApiUrl + 'excel/import/doit',
        ucdChargeList : baseApiUrl + 'ucd/list/get/charge',
        systemWalletList : baseApiUrl + 'ucd/list/get/system',
        doitWalletList : baseApiUrl + 'ucd/list/get/doit',
        memberWalletList : baseApiUrl + 'ucd/list/get/user',
        pendingWalletList : baseApiUrl + 'ucd/list/get/transfer',

        giftList : baseApiUrl + 'gift/get/list',
        reorderGiftList : baseApiUrl + 'gift/get/orderList',
        reorderGift : baseApiUrl + 'gift/set/orders',
        createGift : baseApiUrl + 'gift/create',
        detailGift : baseApiUrl + 'gift/get/detail/info',
        updateGift : baseApiUrl + 'gift/update',
        applyGiftList : baseApiUrl + 'exchange/get/list',
        sendGiftList : baseApiUrl + 'exchange/get/sendList',
        sendGiftStatusList : baseApiUrl + 'exchange/get/payment',
        updateGiftSendMemo : baseApiUrl + 'exchange/set/insertMemo',

        adminList : baseApiUrl + 'admin/list',
        detailAdmin : baseApiUrl + 'admin/detail',
        updateAdmin : baseApiUrl + 'admin/update',
        deleteAdmin : baseApiUrl + 'admin/delete',
        authList : baseApiUrl + 'auth/list',
        createAuth : baseApiUrl + 'auth/list',
        deleteAuth : baseApiUrl + 'auth/delete',
    }

    const fileUploadBaseUrlV2 = 'https://adminupload.youcandoo.co.kr/file/upload/';
    export const fileApiV2 = {
        single : fileUploadBaseUrlV2+'single'
        ,multi : fileUploadBaseUrlV2+'multi'
        ,event : fileUploadBaseUrlV2+'event'
        ,mission : fileUploadBaseUrlV2+'mission'
    }