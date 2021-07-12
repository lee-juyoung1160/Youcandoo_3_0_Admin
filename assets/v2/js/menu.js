    import { api } from './modules/api-url-v1.js';
    import { btnMenuToggle, mainMenu, subMenu, section, sideBar, btnScrollTop } from "./modules/elements.js";
    import { getPathName } from "./modules/utils.js";
    import { fadeinLoader, fadeoutLoader } from "./modules/common.js";

    $(window)       .on("scroll", function () { toggleScrollTopButton(); });
    $(document)     .ajaxStart(function () { fadeinLoader(); });
    $(document)     .ajaxComplete(function () { fadeoutLoader(); });
    btnScrollTop    .on("click", function () { moveScrollTop(this); });
    btnMenuToggle   .on('click', function () { toggleSideMenu(this); });
    mainMenu        .on('click', function () { onClickMainMenu(this); });
    subMenu         .on('click', function () { onClickSubMenu(this); });
    activeMenu();

    function toggleScrollTopButton()
    {
        let sectionHeight = $("section").height() * 0.15;
        let top = $(window).scrollTop();

        top > sectionHeight ? btnScrollTop.fadeIn() : btnScrollTop.fadeOut();
    }

    function moveScrollTop()
    {
        $("html, body").animate({ scrollTop : 0 }, 400);
    }

    function onClickMainMenu(obj)
    {
        $(obj).parent('li').siblings().removeClass('active');
        $(obj).parent('li').addClass('active');
    }

    function onClickSubMenu(obj)
    {
        $(obj).addClass('active');
    }

    function activeMenu()
    {
        let pathName = getPathName();
        let menuList = $('nav').find('a');
        $(menuList).each(function () {
            let menuPath = $(this).attr('href');
            if (pathName === menuPath)
                $(this).parents('li').addClass('active');
        })
    }

    function toggleSideMenu(obj)
    {
        $(obj).toggleClass('btn-toggle');
        sideBar.toggleClass('open');
        section.toggleClass('wide-content');
    }

    /** 사이드 메뉴 세팅 **/
    function getLeftMenuByAuthCode()
    {
        let param   = JSON.stringify({"code" : sessionAuthCode.val()});
        let url     = api.getMenuByAuth;
        let errMsg  = '메뉴 '+label.list+message.ajaxLoadError;

    }

    function getLeftMenuByAuthCodeCallback(data)
    {
        isSuccessResp(data) ? getLeftMenuByAuthCodeSuccess(data) : sweetError(invalidResp(data));
    }

    function getLeftMenuByAuthCodeSuccess(data)
    {
        buildMenuByAuthCode(data);
        activeMenu();
    }

    /** 권한별 메뉴 생성 **/
    function buildMenuByAuthCode(data)
    {
        let keys   	= Object.getOwnPropertyNames(data.data);
        let menuDom = '';
        for (let i=0; i<keys.length; i++)
        {
            let key   	 = keys[i];
            let mainIcon = data.data[key].icon;
            let mainName = data.data[key].name;
            let mainView = data.data[key].view;
            let children = data.data[key].children;
            let target   = 'menu_'+i;
            if (mainView === true)
            {
                /*if (isOuterIp() && isPrivateMenu(mainName)) continue;*/
                if (isOuterIp() && isAccessDeniedUcdUserBiz() && isPrivateMenu(mainName)) continue;

                menuDom +=
                    `<li onclick="onClickActiveParentMenu(this);" class="menu-btn" data-target="${target}">
                            <div class="btn-wrap clearfix">
                                <i class="far ${mainIcon}"></i>
                                <span>${mainName}</span>
                                <i class="fas fa-chevron-right arrow-i"></i>
                            </div>
                            <ul class="menu-btn-list ${target}">`
                if (children)
                {
                    let subKeys = Object.getOwnPropertyNames(children);
                    for (let j=0; j<subKeys.length; j++)
                    {
                        let subKey   = subKeys[j];
                        let subName  = children[subKey].name;
                        let menuPath = children[subKey].path;
                        let subView  = children[subKey].view;

                        if (subView === true)
                        {
                            menuDom += `<li onclick="onClickChildMenu(this);"><a href="${menuPath}">${subName}</a></li>`
                            buildAccessibleMenus(menuPath);
                        }
                    }
                }
                menuDom +=
                    `</ul>
                            <div class="bar"></div>
                        </li>`
            }
        }

        sideMenu.html(menuDom);

        accessDeniedAuth();
    }

    let accessibleMenus = ['/', '/main', '/main/', '/admin/mypage'];
    function buildAccessibleMenus(_auth)
    {
        /**
         * 현재 관리자 > 권한설정 메뉴에서 상세보기 권한, 수정 권한은 설정할 수 없음
         * 등록 권한은 일부 페이지만(promotion, doit) 설정 가능
         * 목록 권한은 모두 설정 가능.
         * 목록 권한만 있는 사용자가 권한이 없는(등록, 수정) 페이지의 url직접 접근할 경우 페이지 노출 됨.
         * 그것을 막고자 어쩔 수 없이 이 로직이 생김.
         * **/

        accessibleMenus.push(_auth);

        /** 프로모션등록, 두잇등록 권한이 있으면 수정 권한 추가 **/
        let customAccessiblePages = ['/promotion/create', '/doit/create'];
        if (customAccessiblePages.indexOf(_auth) !== -1)
            accessibleMenus.push(_auth.replace('create', 'update'));

        /** 프로모션 목록, 두잇 목록 권한이 있으면 상세 권한 추가 **/
        let customAccessiblePages1 = ['/promotion', '/doit', '/doit/v2', '/promotion/brand'];
        if (customAccessiblePages1.indexOf(_auth) !== -1)
            accessibleMenus.push(_auth + '/detail');

        if ('/doit/v2' === _auth)
            accessibleMenus.push('/doit/detail');

        if ('/promotion/brand' === _auth)
        {
            accessibleMenus.push('/promotion/detail');
            accessibleMenus.push('/doit/info');
        }

        /** 그 외 메뉴들은 목록 권한이 있으면 등록, 수정, 상세 권한 추가 **/
        let customAccessiblePages2 =
            ['/user',
                '/biz',
                '/marketing/event',
                '/marketing/push',
                '/marketing/popup',
                '/service/notice',
                '/service/faq',
                '/service/inquiry',
                '/admin',
                '/doit/category',
                '/doit/recommend',
                '/doit/recommends',
                '/doit/talk',
                '/operate/account',
                '/gift',];
        if (customAccessiblePages2.indexOf(_auth) !== -1)
        {
            accessibleMenus.push(_auth + '/create');
            accessibleMenus.push(_auth + '/update');
            accessibleMenus.push(_auth + '/detail');

            if (_auth === '/service/faq')
                accessibleMenus.push(_auth + '/sort');
        }

        if (_auth === '/ucd/sales') accessibleMenus.push('/ucd/create/biz');
        if (_auth === '/ucd/charge') accessibleMenus.push('/ucd/create/user');
        if (_auth === '/ucd/cancel') accessibleMenus.push('/ucd/cancel/user');
        if (_auth === '/ucd/withdraw') accessibleMenus.push('/ucd/withdraw/user');
        if (_auth === '/operate/log')
        {
            accessibleMenus.push(_auth+'/api_list');
            accessibleMenus.push(_auth+'/api_url');
            accessibleMenus.push(_auth+'/api_php_error');
            accessibleMenus.push(_auth+'/api_apache_error');
            accessibleMenus.push(_auth+'/api_process');
        }
    }

    /** 권한 별 접근 가능 페이지 **/
    function accessDeniedAuth()
    {
        let pathName = getPathName();
        if (pathName.includes('update') || pathName.includes('detail') || pathName.includes('info'))
        {
            pathName = pathName.replace(pathName.split('/').reverse()[0], '');
            pathName = pathName.slice(0, -1);
        }

        if (accessibleMenus.indexOf(pathName) === -1)
        {
            alert(message.accessDenied);
            location.href = '/';
        }
    }

    function isAccessDeniedUcdUserBiz()
    {
        /** 2020.08.20
         *  재택근무로 추가된 로직. 원래는 아래 펑션(ip)만으로 처리했으나 권한까지 추가 됨.
         * **/
        let accessibleAuths = ['smg', 'mg', 'dev'];
        /*if ($("#env").val() === 'development') accessibleAuths.push('dev')*/
        return accessibleAuths.indexOf(sessionAuthCode.val()) === -1;
    }

    function isOuterIp()
    {
        return innerIps.indexOf(sessionUserIp.val()) === -1;
    }

    function isPrivateMenu(_menuName)
    {
        return privateMenus.indexOf(_menuName) !== -1;
    }

