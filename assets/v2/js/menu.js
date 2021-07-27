
    import { api } from './modules/api-url-v1.js';
    import {btnMenuToggle, section, sideBar, btnScrollTop, sessionAuthCode, mainMenu} from "./modules/elements.js";
    import {getPathName, isEmpty} from "./modules/utils.js";
    import { fadeinLoader, fadeoutLoader } from "./modules/common.js";
    import {ajaxRequestWithJson, invalidResp, isSuccessResp} from "./modules/ajax-request.js";
    import {sweetError, sweetToast} from "./modules/alert.js";
    import {message} from "./modules/message.js";

    $(document)     .ajaxStart(function () { fadeinLoader(); });
    $(document)     .ajaxComplete(function () { fadeoutLoader(); });
    $(window)       .on("scroll", function () { toggleShowBtnScrollTop(); });
    btnScrollTop    .on("click", function () { moveScrollTop(this); });
    btnMenuToggle   .on('click', function () { toggleSideMenu(this); });
    getMenu();

    /** 사이드 메뉴 세팅 **/
    function getMenu()
    {
        const param = {"code" : sessionAuthCode.val()};

        ajaxRequestWithJson(false, api.getMenuWithAuth, JSON.stringify(param))
            .then( async function( data, textStatus, jqXHR ) {
                await isSuccessResp(data) ? buildMenu(data) : sweetToast(invalidResp(data));
                await activeMenu();
                await validAccessiblePage();
            })
            .catch(reject => sweetError(`메뉴를${message.ajaxLoadError}`));
    }

    function buildMenu(data)
    {
        if (data.data)
        {
            const menus = data.data;
            const mainKeys = Object.getOwnPropertyNames(menus);
            if (!isEmpty(mainKeys) && mainKeys.length > 0)
            {
                mainMenu.empty();
                mainKeys.map(mainKey => {
                    const {name, icon, view, children} = menus[mainKey];

                    if (!view) return;

                    const subKeys = Object.getOwnPropertyNames(children);
                    let subMenu = '';
                    if (!isEmpty(subKeys) && subKeys.length > 0)
                    {
                        subKeys.map(subKey => {
                            if (!children[subKey].view) return;
                            subMenu += `<li><a href="${children[subKey].path}">${children[subKey].name}</a></li>`
                            appendAccessiblePages(children[subKey].path);
                        })
                    }

                    const menuEl =
                        `<li>
                            <div class="main-mnu">
                                <i class="${icon}"></i>
                                <span>${name}</span>
                                <i class="fas fa-chevron-right arrow-i"></i>
                                <div class="bar"></div>
                            </div>
                            <ul class="sub-mnu">
                                ${subMenu}
                            </ul>
                        </li>`

                    mainMenu.append(menuEl);
                })

                mainMenu.children().on('click', function () { onClickMainMenu(this); });
                mainMenu.find('a').on('click', function () { onClickSubMenu(this); });
            }
        }
    }

    let accessiblePages = ['/v2', '/v2/main', '/v2/auth/mypage'];
    function appendAccessiblePages(_auth)
    {
        /**
         * 현재 관리자 > 권한관리 메뉴에서 등록, 상세, 수정 권한은 설정할 수 없음
         * doit 페이지만 등록 권한을 설정할 수 있음.
         * 목록에 접근 권한이 있는 사용자에게 등록, 상세, 수정 페이지 접근 권한을 주기 위해 이 로직이 생김.
         * **/

        accessiblePages.push(_auth);

        const defaultAccessiblePages =  [
            '/v2/member',
            '/v2/member/badge',
            '/v2/doit/pick',
            '/v2/doit/category',
            '/v2/marketing/banner',
            '/v2/marketing/story',
            '/v2/marketing/event',
            '/v2/marketing/push',
            '/v2/marketing/popup',
            '/v2/report/talk',
            '/v2/gift',
            '/v2/service/notice',
            '/v2/service/faq',
            '/v2/service/inquiry',
            '/v2/admin',
            '/v2/operate/version',
        ];
        switch (_auth) {
            case '/v2/biz' :
                accessiblePages.push(_auth + '/support/doit');
                accessiblePages.push(_auth + '/support/leader');
                accessiblePages.push(_auth + '/detail');
                break;
            case '/v2/doit' :
                accessiblePages.push(_auth + '/detail');
                break;
            case '/v2/ucd/charge' :
                accessiblePages.push('/v2/ucd/create');
                break;
            default :
                if (defaultAccessiblePages.indexOf(_auth) > -1)
                {
                    accessiblePages.push(_auth + '/create');
                    accessiblePages.push(_auth + '/update');
                    accessiblePages.push(_auth + '/detail');
                }
        }
    }

    /** 권한 별 접근 가능 페이지 validation **/
    function validAccessiblePage()
    {
        let pathName = getPathName();
        if (pathName !== '/v2/member/detail' && (pathName.includes('update') || pathName.includes('detail')))
            pathName = pathName.replace(`/${pathName.split('/').pop()}`, '');

        if (accessiblePages.indexOf(pathName) === -1)
        {
            alert(message.accessDenied);
            location.href = '/v2';
        }
    }

    function onClickMainMenu(obj)
    {
        $(obj).siblings().removeClass('active');
        $(obj).addClass('active');
    }

    function onClickSubMenu(obj)
    {
        $(obj).addClass('active');
    }

    function activeMenu()
    {
        const pathName = getPathName();
        mainMenu.find('a').each(function () {
            const menuPath = $(this).attr('href');
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

    function toggleShowBtnScrollTop()
    {
        const sectionHeight = $("section").height() * 0.15;
        const top = $(window).scrollTop();

        top > sectionHeight ? btnScrollTop.fadeIn() : btnScrollTop.fadeOut();
    }

    function moveScrollTop()
    {
        $("html, body").animate({ scrollTop : 0 }, 400);
    }
