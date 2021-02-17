
    $(function (){

        /* 레프트메뉴 열고 닫기 */
        $('.side-toggle-btn').on('click', function(){
            $(this).toggleClass('btn-toggle');
            $('aside').toggleClass('aside-open');
            $('section').toggleClass('wide-content');
        });

        /* 레프트메뉴 */
        /*$('.main-mnu').on('click', function(){
            $('.sub-mnu').hide();
            $('.main-mnu').removeClass('active');
            $(this).addClass('active');
            $(this).siblings('.sub-mnu').show();
        });*/

        $('.sub-mnu li').on('click', function(){
            $(this).addClass('active');
        });

        /* 모달 */
        $('.modal-btn').on('click', function(){
            $('.modal-content').fadeIn();
            $('.modal-bg').fadeIn();
        });
        $('.modal-close').on('click', function(){
            $('.modal-content').hide();
            $('.modal-bg').fadeOut();
        });
        $('.modal-bg').on('click', function(){
            $('.modal-content').hide();
            $('.modal-bg').fadeOut();
        });

        activeMenu();
    });

    function onClickParentMenu(obj)
    {
        $(obj).siblings().removeClass('active');
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