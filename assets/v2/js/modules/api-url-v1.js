
    const baseApiUrl = `${api_server_url}/v3/`;
    export const api = {
        saveUserUcdFromXlsx : baseApiUrl + 'ucd/set/charge/user/system/excel',
        saveUserUcdBySystem : baseApiUrl + 'ucd/set/charge/user/system',
        saveUserUcdByBiz : baseApiUrl + 'ucd/set/charge/user/company',
        saveDoitUcdBySystem : baseApiUrl + 'ucd/set/charge/doit/system',
        saveDoitUcdByBiz : baseApiUrl + 'ucd/set/charge/doit/company',
        saveBizUcd : baseApiUrl + 'ucd/set/charge/company/system',

        dashboardSummary : baseApiUrl + 'main/dashboard',
        dashboardSummaryList : baseApiUrl + 'main/dashboard/get/list',
        dashboardMoreLeader : baseApiUrl + 'main/dashboard/get/leaderRanklist',
        dashboardMoreDoit : baseApiUrl + 'main/dashboard/get/doitRanklist',

        getProfile : baseApiUrl + 'admin/get',
        updatePassword : baseApiUrl + 'admin/update/pwd',

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
        unlinkMemberList : baseApiUrl + 'profile/get/unlink',
        changedMemberList : baseApiUrl + 'profile/get/changed',

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
        editSubCategory : baseApiUrl + 'subcategory/update',

        keywordList : baseApiUrl + 'keyword/get/list',
        createKeyword : baseApiUrl + 'keyword/create',
        updateKeyword : baseApiUrl + 'keyword/update',

        doitSponsorList : baseApiUrl + 'doit/get/company',
        doitList : baseApiUrl + 'doit/list',
        doitSetRecommend : baseApiUrl + 'doit/set/recommend',
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
        blockMember : baseApiUrl + 'member/set/retire/ban',
        banMember : baseApiUrl + 'member/set/retire',
        applyMemberList : baseApiUrl + 'member/get/applylist',
        approvalMember : baseApiUrl + 'member/get/applyConfirm',
        rejectMember : baseApiUrl + 'member/get/applyReject',
        blockMemberList : baseApiUrl + 'member/get/retire/ban/list',
        cancelBlockMember : baseApiUrl + 'member/set/retire/ban/cancel',

        actionList : baseApiUrl + 'action/get/list',
        detailAction : baseApiUrl + 'action/get/detail/info',
        sendWarning : baseApiUrl + 'action/set/yellow',
        cancelWarning : baseApiUrl + 'action/set/yellowCancel',
        actionCommentList : baseApiUrl + 'action/get/commentList',
        createActionComment : baseApiUrl + 'action/set/insertComment',
        deleteActionComment : baseApiUrl + 'action/set/deleteComment',
        actionReplyList : baseApiUrl + 'action/get/comment/child/list',

        talkList : baseApiUrl + 'board/get/list',
        createTalk: baseApiUrl + 'board/create',
        detailTalk : baseApiUrl + 'board/get/detail/info',
        updateTalk : baseApiUrl + 'board/update',
        deleteTalk : baseApiUrl + 'board/delete',
        talkCommentList : baseApiUrl + 'board/get/commentList',
        createTalkComment : baseApiUrl + 'board/set/insertComment',
        deleteTalkComment : baseApiUrl + 'board/set/deleteComment',
        talkReplyList : baseApiUrl + 'board/get/comment/child/list',

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

        faqType : baseApiUrl + 'faq/get/type',
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
        reorderBanner : baseApiUrl + 'banner/set/orders',
        targetEventList : baseApiUrl + 'banner/get/event/list',
        targetDoitList : baseApiUrl + 'banner/get/doit/list',
        targetNoticeList : baseApiUrl + 'banner/get/notice/list',

        storyList : baseApiUrl + 'story/get/list',
        createStory : baseApiUrl + 'story/create',
        detailStory : baseApiUrl + 'story/get/detail/info',
        updateStory : baseApiUrl + 'story/update',
        reorderStory : baseApiUrl + 'story/set/orders',

        eventList : baseApiUrl + 'event/get/list',
        createEvent : baseApiUrl + 'event/create',
        detailEvent : baseApiUrl + 'event/get/detail/info',
        deleteEvent : baseApiUrl + 'event/delete',
        updateEvent : baseApiUrl + 'event/update',
        customEvent : baseApiUrl + 'event/popup/get/list',
        customEventProfile : baseApiUrl + 'event/popup/get/profile',

        pushList : baseApiUrl + 'push/list',
        cancelPush : baseApiUrl + 'push/set/cancel',
        createPush : baseApiUrl + 'push/create',
        pushTargetNotice : baseApiUrl + 'push/get/notice',
        pushTargetEvent : baseApiUrl + 'push/get/event',
        pushTargetDoit : baseApiUrl + 'push/get/doit',
        pushTargetMember : baseApiUrl + 'push/get/profile',
        pushTargetMemberFromXlsx : baseApiUrl + 'excel/import/notification/profile',

        popupList : baseApiUrl + 'popup/get/list',
        createPopup : baseApiUrl + 'popup/create',
        detailPopup : baseApiUrl + 'popup/get/detail/info',
        updatePopup : baseApiUrl + 'popup/update',
        deletePopup : baseApiUrl + 'popup/delete',

        errorList : baseApiUrl + 'error/list',
        updateError : baseApiUrl + 'error/update',

        createEncryption : baseApiUrl + 'operate/set/encryption',
        createDecryption : baseApiUrl + 'operate/set/decryption',
        versionList : baseApiUrl + 'operate/get/version/list',
        createVersion : baseApiUrl + 'operate/version/create',
        deleteVersion : baseApiUrl + 'operate/version/delete',

        logList : baseApiUrl + 'log/get/list',

        getMemberForSaveUcd : baseApiUrl + 'ucd/get/user/list',
        getMemberFromXlsx : baseApiUrl + 'excel/import/profile',
        getDoitFromXlsx : baseApiUrl + 'excel/import/doit',
        ucdChargeList : baseApiUrl + 'ucd/list/get/charge',
        systemWalletType : baseApiUrl + 'ucd/get/system/type',
        systemWalletList : baseApiUrl + 'ucd/list/get/system',
        doitWalletList : baseApiUrl + 'ucd/list/get/doit',
        memberWalletList : baseApiUrl + 'ucd/list/get/user',
        pendingWalletList : baseApiUrl + 'ucd/list/get/transfer',

        giftList : baseApiUrl + 'gift/get/list',
        reorderGiftList : baseApiUrl + 'gift/get/orderList',
        reorderGift : baseApiUrl + 'gift/set/orders',
        createGift : baseApiUrl + 'gift/create',
        ktGoodsList : baseApiUrl + 'gift/get/kt/goods',
        detailGift : baseApiUrl + 'gift/get/detail/info',
        updateGift : baseApiUrl + 'gift/update',
        applyGiftList : baseApiUrl + 'exchange/get/list',
        sendGifticon : baseApiUrl + 'exchange/set/confirm',
        sendGeneralGift : baseApiUrl + 'exchange/set/send',
        rejectGift : baseApiUrl + 'exchange/set/reject',
        resendGift : baseApiUrl + 'exchange/set/resend',
        getGiftBalance : baseApiUrl + 'exchange/get/money',
        sendGiftList : baseApiUrl + 'exchange/get/sendList',
        sendGiftStatusList : baseApiUrl + 'exchange/get/payment',
        updateGiftSendMemo : baseApiUrl + 'exchange/set/insertMemo',

        adminList : baseApiUrl + 'admin/list',
        detailAdmin : baseApiUrl + 'admin/detail',
        updateAdmin : baseApiUrl + 'admin/update',
        deleteAdmin : baseApiUrl + 'admin/delete',
        authBizList : baseApiUrl + 'auth/get/biz/list',
        approvalAdmin : baseApiUrl + 'admin/approval',
        authList : baseApiUrl + 'auth/list',
        getMenuWithAuth : baseApiUrl + 'auth/get/menu',
        setMenuWithAuth : baseApiUrl + 'auth/set/menu',
        createAuth : baseApiUrl + 'auth/create',
        deleteAuth : baseApiUrl + 'auth/delete',

        promotionList : baseApiUrl + 'promotion/get/list',
        createPromotion : baseApiUrl + 'promotion/create',
        detailPromotion : baseApiUrl + 'promotion/get/detail',
        updatePromotion : baseApiUrl + 'promotion/update',
        closePromotion : baseApiUrl + 'promotion/set/end',
        promotionDoitList : baseApiUrl + 'promotion/get/doit/list',
        promotionProceedList : baseApiUrl + 'promotion/get/proceed/list',
        setDoitPromotion : baseApiUrl + 'promotion/set/doit',
        cancelDoitPromotion : baseApiUrl + 'promotion/set/release',
    }

    const fileUploadBaseUrlV2 = 'https://adminupload.youcandoo.co.kr/file/upload/';
    export const fileApiV2 = {
        single : fileUploadBaseUrlV2+'single'
        ,multi : fileUploadBaseUrlV2+'multi'
        ,event : fileUploadBaseUrlV2+'event'
        ,mission : fileUploadBaseUrlV2+'mission'
    }